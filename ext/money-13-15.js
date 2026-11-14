// ext/money-13-15.js  Mind Lab Money Skills levels 13-15 (60 lessons)
(() => {
  const NM = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
  const D = x => (Number.isInteger(x) ? "$" + x : "$" + x.toFixed(2));
  const bal = x => (x < 0 ? "-$" + (-x) : "$" + x);
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

  // ======================= LEVEL 13 (6th grade, first half) =======================
  const l13 = [];
  l13.push(L("Money ratios", () => {
    const [a, b] = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 5], [2, 5], [3, 4], [1, 5]]), k = ri(2, 9), nm = pick(NM);
    const exF = () => { const x = ri(1, 3), y = x + ri(1, 3), n = ri(2, 6); return `Example: a ratio of ${x} saved for every ${y} spent. With ${y * n} spent, there are ${n} groups, so ${x * n} is saved. Now do yours.`; };
    if (Math.random() < 0.5) return q(`${nm} saves $${a} for every $${b} spent. ${nm} spends $${b * k}. How many dollars does ${nm} save?`, a * k,
      "A ratio compares two amounts. Think of the money in equal groups.", "Find how many groups of the spending part fit into the amount spent. Then take that many groups of the saving part.", exF);
    return q(`${nm} saves $${a} for every $${b} spent. ${nm} saves $${a * k} in all. How many dollars does ${nm} spend?`, b * k,
      "A ratio compares two amounts. Think of the money in equal groups.", "Find how many groups of the saving part fit into the amount saved. Then take that many groups of the spending part.", exF);
  }, [["What is a ratio?", "⚖️", "A <b>ratio</b> compares two amounts. \"Save $1 for every $3 you spend\" is the ratio <b>1 : 3</b>."], ["Groups", "🧱", "Think of equal groups. If you spend $12 and the ratio is 1 : 3, you have 4 groups of $3, so you save 4 × $1 = $4."], ["Tip", "💡", "First find <b>how many groups</b>. Then multiply by the other part of the ratio."]]));

  l13.push(L("Ratio tables", () => {
    const [e, pl] = pick([["📓", "notebooks"], ["🍎", "apples"], ["🥤", "drinks"], ["🎟️", "tickets"], ["🍫", "candy bars"], ["🖍️", "crayon boxes"]]), p = ri(2, 9), n1 = ri(2, 6), n2 = n1 + ri(3, 9);
    return q(`${e} ${n1} ${pl} cost $${n1 * p}. At the same price for each, how many dollars do ${n2} ${pl} cost?`, p * n2,
      "The price for each one is the same. Find the price of one first.", "Divide the total cost by the number of items to get the price of one. Then multiply by the new number of items.",
      () => { const a = ri(2, 9), b = ri(2, 6), c = b + ri(3, 9); return `Example: ${b} items cost $${a * b}. One costs ${a * b} ÷ ${b} = $${a}. So ${c} items cost ${c} × ${a} = $${a * c}. Now do yours.`; });
  }, [["Equal rates", "🧮", "If every item costs the same, the cost grows in steps. 2 apples cost $6, 4 apples cost $12, 6 apples cost $18."], ["Ratio table", "📋", "A <b>ratio table</b> lines up numbers of items with their costs. Each row follows the same rate."], ["Tip", "💡", "Find the <b>cost of one</b> (the unit rate), then multiply to get any amount."]]));

  l13.push(L("Order of operations", () => {
    const k = ri(0, 2), nm = pick(NM);
    const exF = () => { const a = ri(2, 9), b = ri(2, 5), c = ri(2, 9); return `Example: $${a} + ${b} × $${c}. Multiply first: ${b} × ${c} = ${b * c}. Then add: ${a} + ${b * c} = $${a + b * c}. Now do yours.`; };
    if (k === 0) { const a = ri(3, 12), b = ri(2, 5), c = ri(2, 6); return q(`${nm} buys a snack for $${a} and ${b} drinks that cost $${c} each. What is the total in dollars? ($${a} + ${b} × $${c})`, a + b * c,
      "Some parts of the problem happen in groups. Which operation should be done before adding?", "Multiplication comes before addition or subtraction (unless there are parentheses).", exF); }
    if (k === 1) { const a = ri(4, 12), b = ri(2, 8), n = ri(2, 5); return q(`${n} friends each buy a ticket for $${a} and a snack for $${b}. What is the total in dollars? (($${a} + $${b}) × ${n})`, (a + b) * n,
      "Parentheses tell you what to do first.", "Work inside the parentheses first. Then multiply by the number of friends.", () => { const x = ri(2, 9), y = ri(2, 9), z = ri(2, 5); return `Example: (${x} + ${y}) × ${z}. Inside first: ${x} + ${y} = ${x + y}. Then ${x + y} × ${z} = ${(x + y) * z}. Now do yours.`; }); }
    const a = ri(4, 12), b = ri(2, 5), c = ri(2, a * b - 1); return q(`${nm} buys ${b} shirts at $${a} each and uses a $${c} coupon. What is the total in dollars? (${b} × $${a} − $${c})`, a * b - c,
      "Think about what happens first: the shirts are bought, then the coupon is used.", "Multiply first to find the cost of the shirts. Then subtract the coupon.", () => { const x = ri(4, 12), y = ri(2, 5), z = ri(1, 3); return `Example: ${y} × ${x} − ${z}. Multiply: ${y * x}. Subtract: ${y * x} − ${z} = ${y * x - z}. Now do yours.`; });
  }, [["Order matters", "🔢", "4 + 3 × 2 is <b>10</b>, not 14. In math we multiply and divide <b>before</b> we add and subtract."], ["Parentheses first", "🧷", "(4 + 3) × 2 = 14. Anything inside <b>parentheses ( )</b> is done first."], ["Money use", "🛒", "Totals with groups, like 3 drinks at $2 each plus a $5 snack, use this order: 5 + 3 × 2 = <b>$11</b>."]]));

  l13.push(L("Cost formulas", () => {
    const [place, unit] = pick([["A skate park", "hour"], ["A bike rental shop", "hour"], ["A bowling alley", "game"], ["A climbing gym", "visit"], ["A pottery studio", "hour"], ["A mini-golf course", "round"]]);
    const f = ri(3, 12), r = ri(2, 9), h = ri(2, 8);
    const exF = () => { const a = ri(3, 12), b = ri(2, 9), c = ri(2, 8); return `Example: C = ${a} + ${b} × n with n = ${c}. Multiply: ${b} × ${c} = ${b * c}. Add: ${a} + ${b * c} = ${a + b * c}. Now do yours.`; };
    if (Math.random() < 0.5) return q(`${place} charges $${f} to get in plus $${r} for each ${unit}. Cost for ${h} ${unit}s, in dollars?`, f + r * h,
      "Some of the cost is paid once and some is paid again for each one. Which part gets multiplied?", "Multiply the cost for each by how many you want, then add the one-time fee.", exF);
    return q(`The formula C = ${f} + ${r} × n gives the cost C in dollars for n ${unit}s at ${place.toLowerCase()}. Find C when n = ${h}.`, f + r * h,
      "Replace the letter n with the number given.", "Do the multiplication first, then add the one-time amount.", exF);
  }, [["A formula", "🧪", "A <b>formula</b> uses a letter for the number that changes. C = 5 + 2 × n means: cost = $5 fee + $2 for each (n) item."], ["Plug in", "🔌", "To use it, put a number in place of the letter. If n = 4: C = 5 + 2 × 4 = 5 + 8 = <b>$13</b>."], ["Fixed and per-unit", "💡", "The number added once is a <b>fixed fee</b>. The number multiplied by n is the cost <b>for each</b>."]]));

  l13.push(L("Debt and negative numbers", () => {
    const k = ri(0, 2), nm = pick(NM);
    const h3 = () => { const a = ri(10, 30), b = a + ri(5, 30); return `Example: owing $${a} and then depositing $${b} leaves ${b} − ${a} = $${b - a} above zero. Now do yours.`; };
    if (k === 0) { const s = ri(10, 60), d = s + ri(5, 60), a = d - s;
      return mcq(`${nm}'s account balance is ${bal(-s)} (${nm} owes $${s}). ${nm} deposits $${d}. What is the new balance?`, bal(a), [bal(-a), bal(d + s), bal(-(d + s))],
        "A negative balance means money is owed. A deposit pays some of the debt.", "Compare the deposit with the debt. Find how far apart they are and ask which side of zero the balance lands on.", h3); }
    if (k === 1) { const b = ri(10, 60), w = b + ri(5, 50);
      return mcq(`${nm} has $${b} in an account and spends $${w} with a debit card that allows overdrafts. What is the new balance?`, bal(b - w), [bal(w - b), bal(w + b), bal(-(w + b))],
        "The spending is more than the money available. Will the balance be above or below zero?", "Find how much more was spent than was in the account. That is the amount below zero.", h3); }
    let s1 = ri(10, 50), s2 = ri(10, 50); if (s1 === s2) s2 += 5;
    return mcq(`${nm} owes $${s1} on one account and $${s2} on another. What is ${nm}'s total balance across both?`, bal(-(s1 + s2)), [bal(s1 + s2), bal(-Math.abs(s1 - s2)), bal(Math.abs(s1 - s2))],
      "Both amounts are debts. Does owing more debts make the total better or worse?", "Debts add together. Put both debts together and keep the sign that means you owe.", h3);
  }, [["Below zero", "🌡️", "A <b>negative number</b> is less than zero. A balance of -$20 means you <b>owe</b> $20."], ["Deposits help", "🏦", "Adding money moves the balance up. Owing $20 and depositing $50 gives <b>+$30</b>."], ["Spending more", "⬇️", "If you spend more than you have, the balance goes below zero. $10 minus $25 is <b>-$15</b>."]]));

  l13.push(L("Comparing balances", () => {
    const vals = []; while (vals.length < 4) { const v = ri(-50, 50); if (!vals.includes(v)) vals.push(v); }
    const low = Math.random() < 0.5, ans = low ? Math.min(...vals) : Math.max(...vals), nm = pick(NM);
    return mcq(`${nm} checks four account balances. Which balance is the ${low ? "LOWEST (worst)" : "HIGHEST (best)"}?`, bal(ans), vals.filter(v => v !== ans).map(bal),
      "Picture a number line with zero in the middle. Which numbers are on the left side, and which on the right?",
      "Numbers farther to the right are greater. Negative numbers farther from zero are less, not more.",
      () => { const a = ri(5, 20), b = ri(5, 20); return `Example: -$${a}, $${b} and -$${a + 5}. On a number line, -$${a + 5} is farthest left, so it is the lowest. Now do yours.`; });
  }, [["The number line", "📏", "On a number line, numbers to the <b>right</b> are greater. Negative numbers sit to the left of zero."], ["Owing more is lower", "📉", "-$30 is <b>less</b> than -$10, because owing $30 is worse than owing $10."], ["Tip", "💡", "Any negative number is less than any positive number, and less than zero."]]));

  l13.push(L("Price per pound", () => {
    const [e, nmf] = pick([["🍎", "Apples"], ["🧀", "Cheese"], ["🍇", "Grapes"], ["🥔", "Potatoes"], ["🍊", "Oranges"], ["🥕", "Carrots"], ["🍌", "Bananas"]]);
    const p = pick([0.5, 1.5, 2.5, 3.5, 0.75, 1.25, 2.25, 3.25, 4.5]), w = ri(2, 10);
    return q(`${e} ${nmf} cost ${D(p)} per pound. How many dollars for ${w} pounds? (You may type decimals like 7.5)`, r2(p * w),
      "The price is for ONE pound. How many pounds are you buying?", "Multiply the price for one pound by the number of pounds. You can multiply the dollars and cents separately.",
      () => { const x = pick([0.5, 1.5, 2.5, 1.25, 2.25]), y = ri(2, 9); return `Example: ${D(x)} per pound for ${y} pounds: ${x} × ${y} = ${D(r2(x * y))}. Now do yours.`; });
  }, [["Multiplying decimals", "✖️", "$2.50 per pound for 4 pounds: 2.50 × 4 = <b>$10.00</b>. Multiply, then place the decimal point."], ["Split it up", "🪓", "$1.25 × 4 is easier as 4 × $1 = $4 and 4 × $0.25 = $1. Total <b>$5</b>."], ["Check", "✅", "Does it make sense? 3 pounds at about $2 each should be about $6."]]));

  l13.push(L("How many can I buy?", () => {
    const [e, n] = pick([["🍬", "candy"], ["✏️", "pencil"], ["🍪", "cookie"], ["🧃", "juice box"], ["🎈", "balloon"], ["🥨", "pretzel"]]);
    const B = ri(5, 30), p = pick([0.25, 0.5, 0.75, 1.25, 1.5, 2.25, 2.5]);
    return q(`${e} You have $${B}. Each ${n} costs ${D(p)}. How many ${n}s can you buy?`, Math.floor(B / p + 1e-9),
      "How many times does the price fit into your money?", "Divide your money by the price of one. Only whole items count, so ignore any leftover part.",
      () => { const m = ri(5, 20), x = pick([0.5, 0.25, 1.5, 2.5]); return `Example: $${m} with each costing ${D(x)}: ${m} ÷ ${x} = ${r2(m / x)}, so you can buy ${Math.floor(m / x + 1e-9)}. Now do yours.`; });
  }, [["Dividing money", "➗", "To find how many items you can buy, <b>divide</b> your money by the price of one."], ["Decimals", "🔢", "$6 ÷ $0.50: there are two 50-cent coins in every dollar, so 6 × 2 = <b>12</b>."], ["Whole items only", "🛍️", "You cannot buy half a pencil. If the answer is 7.6, you can buy <b>7</b>."]]));

  l13.push(L("Percents and decimals", () => {
    const p = pick([5, 8, 12, 15, 20, 25, 35, 40, 45, 60, 75, 85, 90]), k = ri(0, 2);
    if (k === 0) return q(`Write ${p}% as a decimal. (Type it like 0.35)`, r2(p / 100),
      "Percent means \"out of 100\".", "Divide by 100, which moves the decimal point two places to the left.",
      () => { const x = pick([6, 14, 30, 55, 70, 95]); return `Example: ${x}% = ${x} ÷ 100 = ${x / 100}. Now do yours.`; });
    if (k === 1) return q(`Write ${r2(p / 100)} as a percent. (Type just the number.)`, p,
      "A percent is a number out of 100.", "Multiply by 100, which moves the decimal point two places to the right.",
      () => { const x = pick([6, 14, 30, 55, 70, 95]); return `Example: ${x / 100} × 100 = ${x}%. Now do yours.`; });
    return q(`A store takes ${p}% off. To find the discount, you multiply the price by a decimal. What decimal is it?`, r2(p / 100),
      "A discount is a part of the price, and a percent is a number out of 100.", "Turn the percent into a decimal by dividing by 100.",
      () => { const x = pick([6, 14, 30, 55, 70, 95]); return `Example: a ${x}% discount uses the decimal ${x / 100}. Now do yours.`; });
  }, [["Per cent", "💯", "<b>Percent</b> means \"per hundred\". 25% is 25 out of 100, or 0.25."], ["To a decimal", "👈", "To change a percent to a decimal, move the point <b>two places left</b>: 40% = 0.40, 8% = 0.08."], ["Back again", "👉", "To go from a decimal to a percent, move the point two places <b>right</b>: 0.65 = 65%."]]));

  l13.push(L("Percent of an allowance", () => {
    const a = 20 * ri(1, 9), p = pick([10, 20, 25, 30, 40, 50, 60, 75]), nm = pick(NM), what = pick(["savings", "giving", "spending"]);
    return q(`${nm} gets $${a}. ${p}% of it goes to ${what}. How many dollars go to ${what}?`, a * p / 100,
      "Find a part of the whole amount using the percent.", "Change the percent to a decimal (or find 10% first), then multiply by the whole amount.",
      () => { const x = 20 * ri(1, 9), y = pick([10, 20, 25, 50]); return `Example: ${y}% of $${x} = ${y / 100} × ${x} = $${x * y / 100}. Now do yours.`; });
  }, [["Part of a whole", "🥧", "\"25% of $40\" means 25 out of every 100 parts of $40."], ["Decimal times amount", "✖️", "25% = 0.25, and 0.25 × 40 = <b>$10</b>."], ["10% shortcut", "💡", "10% is one tenth. 10% of $60 is $6, so 30% is 3 × $6 = <b>$18</b>."]]));

  l13.push(L("Savings rate", () => {
    let E, p, S2; do { E = pick([20, 25, 40, 50, 80, 100, 200, 250, 400]); p = pick([5, 10, 15, 20, 25, 30, 40, 50]); S2 = E * p / 100; } while (!Number.isInteger(S2));
    const nm = pick(NM);
    return q(`${nm} earned $${E} and saved $${S2}. What percent of the earnings did ${nm} save? (Type just the number.)`, p,
      "Compare the part that was saved to the whole amount earned.", "Divide the amount saved by the amount earned, then multiply by 100 to make it a percent.",
      () => { const e = pick([20, 40, 50, 100]), pp = pick([10, 25, 50, 20]); return `Example: saved $${e * pp / 100} of $${e}. ${e * pp / 100} ÷ ${e} = ${pp / 100}, which is ${pp}%. Now do yours.`; });
  }, [["Savings rate", "🐷", "Your <b>savings rate</b> is the percent of your money that you save."], ["How to find it", "🧮", "Saved ÷ earned × 100. If you earn $50 and save $10: 10 ÷ 50 = 0.2, so <b>20%</b>."], ["Why it matters", "🌱", "Saving a steady percent, like 10% every time, builds up without much effort."]]));

  l13.push(L("Median, mode and range", () => {
    const k = ri(0, 2), nm = pick(NM);
    if (k === 2) { const m = ri(3, 25); const o = []; while (o.length < 4) { const v = ri(3, 25); if (v !== m && !o.includes(v)) o.push(v); }
      return q(`${nm} listed the prices (in dollars) of 7 snacks: ${shuf([m, m, m, ...o]).join(", ")}. What is the MODE (the price that appears most often)?`, m,
        "The mode is about repeats. Which price shows up more than once?", "Look through the list and count how many times each price appears. The mode is the one with the most.",
        () => { const a = ri(3, 25); let b = ri(3, 25); if (b === a) b++; return `Example: ${shuf([a, a, b, 30, 31]).join(", ")}. The number ${a} appears twice and the others once, so the mode is ${a}. Now do yours.`; }); }
    const v = []; while (v.length < 5) { const x = ri(2, 40); if (!v.includes(x)) v.push(x); }
    const s = [...v].sort((a, b) => a - b);
    if (k === 0) return q(`${nm} saved these amounts (in dollars) in 5 weeks: ${shuf(v).join(", ")}. What is the MEDIAN?`, s[2],
      "Put the numbers in order first.", "The median is the middle number once the list is in order from least to greatest.",
      () => { const e = [3, 9, 12, 20, 31].map(x => x + ri(0, 2)); return `Example: ${shuf(e).join(", ")}. In order: ${e.join(", ")}. The middle one is ${e[2]}. Now do yours.`; });
    return q(`${nm} saved these amounts (in dollars) in 5 weeks: ${shuf(v).join(", ")}. What is the RANGE?`, s[4] - s[0],
      "The range tells how spread out the numbers are.", "Find the greatest and the least number, then subtract the least from the greatest.",
      () => { const a = ri(3, 12), b = a + ri(8, 30); return `Example: with the least ${a} and the greatest ${b}, the range is ${b} − ${a} = ${b - a}. Now do yours.`; });
  }, [["Three measures", "📊", "<b>Median</b> = the middle number. <b>Mode</b> = the number that appears most. <b>Range</b> = greatest minus least."], ["Median example", "🔢", "5, 12, 7, 20, 9. In order: 5, 7, 9, 12, 20. The median is <b>9</b>."], ["Mode and range", "🎯", "In 4, 6, 6, 9: the mode is <b>6</b>, and the range is 9 − 4 = <b>5</b>."]]));

  l13.push(L("Check register", () => {
    const start = ri(190, 300), t = [ri(5, 60), ri(5, 60), ri(5, 60)], sg = [pick([1, -1]), pick([1, -1]), pick([1, -1])];
    const names = (s) => s > 0 ? pick(["Birthday gift", "Paycheck", "Sold old games", "Allowance"]) : pick(["Bought shoes", "Bought a book", "Movie night", "Pizza night"]);
    const rows = t.map((x, i) => `${sg[i] > 0 ? "➕" : "➖"} ${names(sg[i])}: ${sg[i] > 0 ? "deposit" : "spent"} $${x}`).join("<br>");
    const fin = start + t.reduce((s, x, i) => s + sg[i] * x, 0);
    return q(`📒 A register starts with $${start}.<br>${rows}<br>What is the balance now, in dollars?`, fin,
      "Money in raises the balance. Money out lowers it. Go one line at a time.", "Start with the opening balance. Add each deposit and subtract each amount spent, in order.",
      () => { const a = ri(100, 150), b = ri(5, 30), c = ri(5, 30); return `Example: start ${a}, deposit ${b}, spend ${c}: ${a} + ${b} = ${a + b}, then ${a + b} − ${c} = ${a + b - c}. Now do yours.`; });
  }, [["A register", "📒", "A <b>check register</b> (or ledger) lists every deposit and payment so you always know your balance."], ["Running balance", "➕➖", "Add deposits, subtract payments. $100 + $20 − $35 = <b>$85</b>."], ["Why keep one", "💡", "Checking your balance helps you avoid spending money you do not have."]]));

  l13.push(L("Overdrafts and fees", () => {
    const a = ri(5, 40), b = a + ri(5, 30), f = pick([25, 30, 35]), nm = pick(NM);
    return q(`${nm}'s account has $${a}. ${nm} pays $${b} with a debit card and the bank allows it, but charges a $${f} overdraft fee. How many dollars below zero is the account now?`, b - a + f,
      "Two things pull the balance down: the payment, and the fee.", "First find how much the payment is over the balance. Then add the fee on top.",
      () => { const x = ri(5, 30), y = x + ri(5, 20), z = pick([25, 30, 35]); return `Example: $${x} in the account, pay $${y}, fee $${z}. Short by ${y} − ${x} = ${y - x}, plus the fee ${z} = ${y - x + z} below zero. Now do yours.`; });
  }, [["Overdraft", "⚠️", "An <b>overdraft</b> happens when you spend more than your balance and the bank pays the difference for you."], ["Fees", "💸", "Banks often charge an <b>overdraft fee</b>, so a small mistake can cost extra money."], ["Avoid it", "🛡️", "Check your balance before paying. A parent can help you link a savings account or set a low-balance alert."]]));

  l13.push(L("Fractions of your money", () => {
    const [n, d] = pick([[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 10], [2, 3], [3, 4], [2, 5]]), E = pick([120, 180, 240, 300, 360, 480, 600]);
    const what = pick(["rent", "food", "savings", "fun"]);
    return q(`A family spends ${n}/${d} of its $${E} weekly money on ${what}. How many dollars is that?`, E * n / d,
      "Split the whole amount into equal parts. The bottom number tells how many.", "Divide the whole amount by the bottom number to get one part. Then multiply by the top number.",
      () => { const e = pick([60, 120, 240]), [x, y] = pick([[1, 4], [3, 4], [2, 3], [1, 5]]); return `Example: ${x}/${y} of $${e}: ${e} ÷ ${y} = ${e / y}, then × ${x} = $${e * x / y}. Now do yours.`; });
  }, [["Parts of a budget", "🍰", "A budget can be shared as fractions. If rent is 1/4 of $400, rent is $100."], ["Divide, then multiply", "➗", "For 3/5 of $200: 200 ÷ 5 = 40 for one part, and 3 × 40 = <b>$120</b>."], ["Fractions and percents", "🔁", "1/2 = 50%, 1/4 = 25%, 1/10 = 10%. They are different ways to write the same part."]]));

  l13.push(mcL("Checking and savings accounts", [
    ["Which account is mainly for money you plan to spend soon, like paying bills with a debit card?", "Checking account", ["Savings account", "Retirement account", "Loan account"], "Think about which account is made for everyday payments.", "This account usually comes with a debit card and lets you pay often and easily."],
    ["Which account is meant for money you want to keep for later, and often earns interest?", "Savings account", ["Checking account", "Credit card account", "Overdraft account"], "Think about where money sits and grows.", "This account usually pays a small amount of interest and is not made for daily spending."],
    ["Why do many families keep an emergency fund in savings?", "It is safe, earns interest and is easy to reach if needed", ["It cannot be used for emergencies", "It earns nothing at all", "It is hidden from the bank"], "An emergency fund should be safe and reachable.", "Look for the choice that mentions both safety and being available when needed."],
    ["A bank account is insured by the government up to a limit (in the US, the FDIC). What does insured mean?", "Your money is protected if the bank fails", ["The bank cannot charge fees", "Your balance grows faster", "Anyone may use your money"], "Insurance is about protection when something goes wrong.", "It is not about earning more or about fees. It is about getting your money back."],
    ["Which action can cause a fee on a checking account?", "Spending more than your balance", ["Making a deposit", "Checking your balance", "Saving a receipt"], "Fees often come from a mistake or from using money you do not have.", "Look for the action that goes past the money you have available."],
    ["What is a debit card connected to?", "Money already in your account", ["Money the bank lends you", "A pretend balance", "Your savings goal"], "A debit card is not a loan.", "When you swipe it, the money comes straight from your own account."],
    ["Savings account interest is paid by...", "The bank, to thank you for keeping money there", ["You, to the bank", "The store you shop at", "The government on your birthday"], "Think about who is using your money while it sits there.", "The bank lends out deposits, and shares a little of the earnings."],
    ["What does an ATM let you do?", "Put in or take out money from your account", ["Change your interest rate", "Erase fees", "Print more money"], "ATM stands for automated teller machine, a machine doing a bank worker's job.", "Think about deposits and withdrawals."],
    ["Which is safer for a large amount of money?", "In a bank account", ["Under a mattress", "In a backpack", "In a jar outside"], "Think about what happens if the money is lost or stolen.", "A place that protects and records your money is best."]
  ], () => { const a = pick(["a lunch card", "a phone bill", "a tuition fund", "a vacation fund"]); return `Example: for ${a}, think whether you need the money soon (checking) or want to keep it growing (savings). Now do yours.`; },
  [["Checking", "💳", "A <b>checking account</b> is for money you use often. You can pay with a debit card, checks or apps."], ["Savings", "🏦", "A <b>savings account</b> keeps money safe and pays <b>interest</b>. It is meant for saving, not daily spending."], ["Insured", "🛡️", "In the US, bank accounts are insured by the FDIC up to $250,000, so your money is protected."]]));

  l13.push(mcL("Short and long-term goals", [
    ["Saving $20 for a game next month is what kind of goal?", "Short-term goal", ["Long-term goal", "Impossible goal", "Emergency goal"], "Think about how soon the goal will be reached.", "Goals that take weeks or a few months are not the longest kind."],
    ["Saving for a car or for college in several years is a...", "Long-term goal", ["Short-term goal", "Daily goal", "Free goal"], "Think about the length of time needed.", "Goals that take many years need patient saving."],
    ["Which goal is SMART (specific, measurable, with a deadline)?", "Save $60 for new shoes in 12 weeks", ["Save some money someday", "Be rich", "Save as much as possible, whenever"], "A good goal has numbers and a date.", "Look for the choice with an amount and a time limit."],
    ["Your goal costs $120. You save $10 a week. Which plan gets you there fastest?", "Save $15 a week instead", ["Save $5 a week", "Save $10 every other week", "Save nothing until later"], "To reach the goal sooner you need to save more each week.", "Find the choice that adds the most each week."],
    ["What is an emergency fund for?", "Surprise costs, like a repair or a broken phone", ["Buying new toys", "Vacations only", "Birthday cards"], "Emergency means something unplanned.", "It is money set aside for unexpected needs, not for wants."],
    ["Which is the best first step toward any money goal?", "Write down the goal and its cost", ["Spend first, think later", "Hide the goal", "Borrow before saving"], "Planning comes before saving.", "You cannot plan without knowing what you are aiming for and how much."],
    ["A goal that is hard to reach can be made easier by...", "Breaking it into smaller steps", ["Giving up the plan", "Never checking progress", "Adding more wants"], "Large things become simple in small pieces.", "Smaller targets along the way keep you moving."],
    ["Why do people track progress toward a goal?", "To see if they are on schedule and stay motivated", ["To avoid ever finishing", "To spend more", "Because banks demand it"], "Tracking tells you where you stand.", "Seeing the numbers helps you adjust and stay encouraged."]
  ], () => { const g = pick([60, 90, 120, 150]); return `Example: to save $${g} in 6 weeks, a good plan puts away $${g / 6} a week. A clear amount and date make a goal easier to reach. Now do yours.`; },
  [["Time matters", "⏳", "<b>Short-term</b> goals take days to months. <b>Long-term</b> goals take years, like college or a car."], ["SMART goals", "🎯", "A strong goal is <b>specific</b>, <b>measurable</b> and has a <b>deadline</b>: \"Save $60 in 12 weeks.\""], ["Small steps", "🪜", "Break big goals into smaller steps and track your progress. An <b>emergency fund</b> is a goal too."]]));

  l13.push(L("Comparing pay rates", () => {
    const ra = ri(6, 18); let rb = ra + pick([-3, -2, -1, 1, 2, 3]); if (rb < 4) rb = ra + 2;
    const h1 = ri(2, 6), h2 = ri(2, 6), [ja, jb] = pick([["mowing lawns", "walking dogs"], ["washing cars", "babysitting"], ["tutoring", "raking leaves"], ["a bake sale", "a garage sale"]]);
    const win = ra > rb ? "Job A" : "Job B";
    return mcq(`Job A (${ja}) pays $${ra * h1} for ${h1} hours. Job B (${jb}) pays $${rb * h2} for ${h2} hours. Which job pays more PER HOUR?`, win, [ra > rb ? "Job B" : "Job A", "They pay the same"],
      "Compare the pay for exactly one hour at each job, not the totals.", "Divide each job's pay by its hours to find the hourly rate. Then compare the two rates.",
      () => { const x = ri(8, 15), y = ri(2, 5), z = ri(2, 5); return `Example: $${x * y} for ${y} hours is $${x} an hour. $${(x + 2) * z} for ${z} hours is $${x + 2} an hour. The second rate is higher. Now do yours.`; });
  }, [["Hourly rate", "⏱️", "To compare jobs, find the <b>pay per hour</b>: total pay ÷ hours worked."], ["Example", "🧮", "$36 for 4 hours is $9 an hour. $50 for 5 hours is $10 an hour. The second job pays <b>more per hour</b>."], ["Bigger total isn't better", "⚠️", "A job with a bigger total may take many more hours. Always compare the same amount of time."]]));

  l13.push(mixOf("Mixed practice", [l13[1], l13[3], l13[9], l13[10], l13[12]]));
  l13.push(mixOf("Level 13 Challenge", [l13[0], l13[2], l13[4], l13[6], l13[7], l13[8], l13[11], l13[13], l13[17]]));

  // ======================= LEVEL 14 (6th grade, second half) =======================
  const l14 = [];
  l14.push(L("How many weeks to save?", () => {
    const a = ri(10, 60), b = ri(4, 15), w = ri(3, 12), nm = pick(NM);
    return q(`${nm} has $${a} and saves $${b} more each week. In how many weeks will ${nm} have $${a + b * w}?`, w,
      "Part of the goal is already saved. How much is still needed?", "Subtract the starting money from the goal. Then divide what is left by the weekly amount.",
      () => { const x = ri(10, 60), y = ri(4, 15), z = ri(3, 12); return `Example: start $${x}, save $${y} a week, goal $${x + y * z}. Needed: ${y * z}. ${y * z} ÷ ${y} = ${z} weeks. Now do yours.`; });
  }, [["An equation", "⚖️", "\"Start with $20, save $5 a week, reach $60\" is the equation 20 + 5 × w = 60."], ["Undo the steps", "↩️", "Work backward: subtract 20 to get 40, then divide by 5 to get <b>w = 8</b> weeks."], ["Check", "✅", "Put 8 back in: 20 + 5 × 8 = 60. It works!"]]));

  l14.push(L("Find the price of one", () => {
    const [e, pl] = pick([["🎟️", "tickets"], ["🧢", "caps"], ["🍕", "slices"], ["🎮", "game tokens"], ["🧁", "cupcakes"]]), n = ri(2, 6), p = ri(3, 15), f = ri(2, 8);
    return q(`${e} ${n} ${pl} plus a $${f} delivery fee cost $${n * p + f} in all. How many dollars does ONE cost?`, p,
      "The fee is not part of the price of the items. Remove it first.", "Subtract the fee from the total. Then divide what is left by the number of items.",
      () => { const a = ri(2, 6), b = ri(3, 15), c = ri(2, 8); return `Example: ${a} items plus a $${c} fee cost $${a * b + c}. ${a * b + c} − ${c} = ${a * b}. Then ${a * b} ÷ ${a} = $${b} each. Now do yours.`; });
  }, [["Total = parts", "🧩", "The total is the items <b>plus</b> the fee: n × price + fee."], ["Undo it", "↩️", "To find the price, undo the steps: first subtract the fee, then divide by how many items."], ["Example", "🛒", "4 hats and a $3 fee cost $27. 27 − 3 = 24, and 24 ÷ 4 = <b>$6</b> each."]]));

  l14.push(L("At most how many?", () => {
    const B = ri(30, 80), f = ri(5, 15), p = ri(2, 6), nm = pick(NM);
    return q(`${nm} has $${B}. Entry to the fair costs $${f}. Each ride ticket costs $${p}. At most how many ride tickets can ${nm} buy?`, Math.floor((B - f) / p),
      "Pay for the entry first. What money is left for tickets?", "Subtract the entry fee from the money. Divide what is left by the ticket price and keep only the whole number.",
      () => { const b = ri(30, 80), a = ri(5, 15), c = ri(2, 6); return `Example: $${b} − $${a} entry = $${b - a}. ${b - a} ÷ ${c} = ${r2((b - a) / c)}, so at most ${Math.floor((b - a) / c)} tickets. Now do yours.`; });
  }, [["At most", "🔝", "\"At most\" means a limit. The cost has to be <b>less than or equal to</b> the money you have."], ["An inequality", "📐", "With $50, a $10 fee and $4 tickets: 10 + 4 × n ≤ 50. So 4n ≤ 40 and n ≤ 10."], ["Whole numbers", "🎟️", "You cannot buy 2.5 tickets. Round <b>down</b> to the next whole ticket."]]));

  l14.push(L("Which plan, and when?", () => {
    const m = ri(3, 12), c = ri(5, 15), d = ri(2, 8), a = c + d, b = m * d;
    return q(`Plan A costs $${a} a month. Plan B has a $${b} sign-up fee plus $${c} a month. After how many months do both plans cost the same in total?`, m,
      "Plan B starts higher but costs less each month. The gap closes a little every month.", "Find how many dollars less per month Plan B costs. See how many months it takes to make up the sign-up fee.",
      () => { const mm = ri(3, 12), cc = ri(5, 15), dd = ri(2, 8); return `Example: Plan B is $${dd} cheaper each month and has a $${mm * dd} fee. ${mm * dd} ÷ ${dd} = ${mm} months to break even. Now do yours.`; });
  }, [["Two plans", "🆚", "Plan A: $10 a month. Plan B: $12 fee + $8 a month. B starts more costly but grows slower."], ["The crossover", "✂️", "Each month B saves $2 compared with A. To cover the $12 fee takes 12 ÷ 2 = <b>6 months</b>."], ["After that", "📉", "After the crossover, Plan B is the cheaper choice. Before it, Plan A is cheaper."]]));

  l14.push(L("Rate of change", () => {
    const s = ri(5, 40), r = ri(3, 12), w1 = ri(1, 4), w2 = w1 + ri(2, 5), y1 = s + r * w1, y2 = s + r * w2, nm = pick(NM), k = ri(0, 2);
    const tbl = `${nm} saves the same amount every week.<br>Week ${w1}: $${y1}<br>Week ${w2}: $${y2}<br>`;
    const exF = () => { const a = ri(2, 4), b = a + ri(2, 4), rr = ri(3, 10), ss = ri(5, 30); return `Example: week ${a} $${ss + rr * a}, week ${b} $${ss + rr * b}. Change in money ${rr * (b - a)}, change in weeks ${b - a}, so ${rr} per week. Now do yours.`; };
    if (k === 0) return q(tbl + "How many dollars is saved each week?", r,
      "Look at how much the money changed, and how many weeks passed.", "Divide the change in dollars by the change in weeks.", exF);
    if (k === 1) return q(tbl + `How many dollars did ${nm} start with (week 0)?`, s,
      "First find the weekly savings. Then think backward to week 0.", "Find the weekly amount, multiply it by the week number in the first line, and subtract that from the first amount.",
      () => { const a = ri(2, 4), rr = ri(3, 10), ss = ri(5, 30); return `Example: week ${a} has $${ss + rr * a} and weekly saving is ${rr}. ${rr} × ${a} = ${rr * a}; ${ss + rr * a} − ${rr * a} = ${ss} to start. Now do yours.`; });
    const w3 = w2 + ri(2, 6);
    return q(tbl + `At the same pace, how many dollars will ${nm} have in week ${w3}?`, s + r * w3,
      "Find the weekly savings first. Then look ahead to the later week.", "Find how many weeks pass from the last week shown. Multiply by the weekly savings and add to the last amount.",
      () => { const a = ri(2, 4), rr = ri(3, 10), ss = ri(5, 30), t = a + ri(2, 5); return `Example: $${ss + rr * a} in week ${a}, saving ${rr} a week. ${t - a} more weeks adds ${rr * (t - a)}: ${ss + rr * t}. Now do yours.`; });
  }, [["Rate of change", "📈", "A <b>rate of change</b> tells how much something changes each step, like dollars saved <b>per week</b>."], ["Finding it", "🧮", "Weeks 2 and 5 have $30 and $51. Money changed by 21 over 3 weeks, so 21 ÷ 3 = <b>$7 a week</b>."], ["On a graph", "📊", "On a graph of savings, the rate of change is how steep the line is."]]));

  l14.push(L("Salary, month and hour", () => {
    const k = ri(0, 3);
    if (k === 0) { const m = ri(15, 60) * 100; return q(`A job pays $${m * 12} a year. About how many dollars is that per month?`, m,
      "A year has 12 months.", "Divide the yearly pay by 12.", () => { const x = ri(15, 60) * 100; return `Example: $${x * 12} a year ÷ 12 = $${x} a month. Now do yours.`; }); }
    if (k === 1) { const w = ri(10, 40); return q(`A job pays $${w} an hour for 40 hours a week and 52 weeks a year. How many dollars is that in one year?`, 2080 * w,
      "First find the number of hours worked in a year.", "Multiply 40 hours by 52 weeks, then multiply by the hourly pay.", () => { const x = ri(10, 40); return `Example: $${x} an hour. 40 × 52 = 2080 hours. 2080 × ${x} = $${2080 * x} a year. Now do yours.`; }); }
    if (k === 2) { const wk = ri(4, 16) * 100; return q(`A salary is $${52 * wk} a year. How many dollars is that per week? (52 weeks)`, wk,
      "A year has 52 weeks.", "Divide the yearly salary by 52.", () => { const x = ri(4, 16) * 100; return `Example: $${52 * x} ÷ 52 = $${x} a week. Now do yours.`; }); }
    const m = ri(15, 80) * 100; return q(`A worker earns $${m} a month. How many dollars is that per year?`, m * 12,
      "A year has 12 months.", "Multiply the monthly pay by 12.", () => { const x = ri(15, 80) * 100; return `Example: $${x} × 12 = $${x * 12} a year. Now do yours.`; });
  }, [["Same pay, different times", "🕒", "Pay can be shown per hour, week, month or year. They all describe the same earnings."], ["Handy numbers", "🔑", "12 months in a year. 52 weeks in a year. 40 hours × 52 weeks = <b>2,080</b> work hours in a full-time year."], ["Example", "🧮", "$20 an hour × 2,080 hours = <b>$41,600</b> a year."]]));

  l14.push(L("Hours of work to afford it", () => {
    const w = ri(8, 20), h = ri(3, 15), [e, n] = pick([["🎮", "game"], ["🎧", "headphones"], ["👟", "sneakers"], ["📱", "phone case"], ["🚲", "bike helmet"]]);
    return q(`${e} A ${n} costs $${w * h}. You earn $${w} an hour after taxes. How many hours must you work to pay for it?`, h,
      "Each hour of work covers part of the price. How many parts are needed?", "Divide the price by the amount you earn each hour.",
      () => { const a = ri(8, 20), b = ri(3, 15); return `Example: a $${a * b} item at $${a} an hour: ${a * b} ÷ ${a} = ${b} hours. Now do yours.`; });
  }, [["Price in work time", "⌛", "Prices can be measured in <b>hours of work</b>. It helps you decide if something is worth it."], ["How to find it", "🧮", "Price ÷ hourly pay (after taxes). A $60 item at $12 an hour is <b>5 hours</b>."], ["Think", "🤔", "Is a game you play once worth 8 hours of work? It is your choice, and a good question to ask."]]));

  l14.push(L("APR and monthly interest", () => {
    const r = pick([6, 12, 18, 24, 30, 36]), k = ri(0, 1);
    if (k === 0) return q(`A credit card has an APR of ${r}%. About what percent interest is charged each month? (APR ÷ 12; you may type decimals)`, r2(r / 12),
      "APR is a yearly rate. A year has several months.", "Divide the yearly rate by the number of months in a year.", () => { const x = pick([12, 24, 36, 6]); return `Example: an APR of ${x}% ÷ 12 = ${r2(x / 12)}% a month. Now do yours.`; });
    const B = 200 * ri(1, 8);
    return q(`A card has an APR of ${r}% and a balance of $${B}. About how many dollars of interest are added for one month? (APR ÷ 12 of the balance)`, B * r / 1200,
      "First find the monthly rate by splitting the yearly rate over the months.", "Turn the monthly rate into a decimal and multiply by the balance.",
      () => { const b = 200 * ri(1, 8), x = pick([12, 24, 36, 6]); return `Example: APR ${x}% is ${r2(x / 12)}% a month. ${r2(x / 12)}% of $${b} = $${r2(b * x / 1200)}. Now do yours.`; });
  }, [["APR", "📆", "<b>APR</b> is the yearly cost of borrowing, shown as a percent."], ["Per month", "÷", "Cards add interest monthly. Monthly rate = APR ÷ 12. An 18% APR is <b>1.5%</b> a month."], ["Example", "🧮", "1.5% of a $200 balance is 0.015 × 200 = <b>$3</b> of interest for the month."]]));

  l14.push(L("Minimum payments", () => {
    const B = 100 * ri(1, 10), p = pick([2, 3, 4, 5]), k = ri(0, 1);
    if (k === 0) return q(`A card's minimum payment is ${p}% of the balance. The balance is $${B}. What is the minimum payment in dollars?`, B * p / 100,
      "A percent of the balance is a part of it.", "Turn the percent into a decimal and multiply by the balance.", () => { const b = 100 * ri(1, 10), x = pick([2, 3, 4, 5]); return `Example: ${x}% of $${b} = ${x / 100} × ${b} = $${b * x / 100}. Now do yours.`; });
    return q(`A card's balance is $${B}. You pay only the minimum, ${p}% of the balance. Ignoring interest, how many dollars of the balance are still unpaid?`, B - B * p / 100,
      "You paid only a small part. Most of the balance remains.", "Find the payment first, then subtract it from the balance.", () => { const b = 100 * ri(1, 10), x = pick([2, 3, 4, 5]); return `Example: ${x}% of $${b} is $${b * x / 100}. ${b} − ${b * x / 100} = $${b - b * x / 100} left. Now do yours.`; });
  }, [["Minimum payment", "💳", "The <b>minimum payment</b> is the smallest amount you must pay each month to avoid a late fee."], ["Example", "🧮", "A 3% minimum on a $400 balance is $12. Then $388 is still owed."], ["The trap", "🪤", "Paying only the minimum keeps you in debt a long time, and interest keeps adding up."]]));

  l14.push(L("Shipping and handling", () => {
    const [e, pl] = pick([["🎧", "earbuds"], ["📚", "books"], ["🧦", "socks"], ["🖍️", "art sets"], ["🧢", "caps"]]), p = ri(5, 25), n = ri(1, 5), T = pick([30, 40, 50]), s = pick([4, 5, 6, 8]);
    const sub = p * n;
    return q(`${e} An online shop charges $${s} shipping, but shipping is FREE when the items cost $${T} or more. You buy ${n} ${pl} at $${p} each. What is the total in dollars?`, sub + (sub < T ? s : 0),
      "First find the cost of the items alone. Then check the shipping rule.", "Compare the items' cost with the free-shipping amount. Add shipping only if the items fall short of it.",
      () => { const a = ri(5, 25), b = ri(1, 5), t = 40, sh = 5; return `Example: ${b} items at $${a} is $${a * b}. Free shipping starts at $${t}, so ${a * b >= t ? "shipping is free: total $" + a * b : "add $" + sh + ": total $" + (a * b + sh)}. Now do yours.`; });
  }, [["Shipping", "📦", "Online orders often add <b>shipping and handling</b> fees to the price of the items."], ["Free shipping rules", "🚚", "Many shops offer free shipping over a set amount, such as $50. Check the subtotal first."], ["Tip", "💡", "Adding a cheap extra item to reach free shipping only helps if you really want it."]]));

  l14.push(L("Outliers and typical values", () => {
    if (Math.random() < 0.3) return mcq("Mia's friends' allowances are $8, $9, $10, $10 and $90. One extreme number is added. Which measure of the 'typical' allowance is changed LEAST by it?", "The median", ["The mean", "The range", "The total"],
      "An extreme value pulls some measures a lot and others barely at all.", "One measure uses every number's size. The other only cares about the middle position.",
      "Example: for 4, 5, 6, 6, 100 the middle number stays 6, but adding everything up and sharing gives 24.2. Now do yours.");
    const base = ri(10, 28), vals = [base, base + ri(0, 4), base + ri(1, 6), base + ri(2, 7)], out = pick([ri(70, 150), 0]);
    const uniq = [...new Set(vals)]; while (uniq.length < 3) uniq.push(base + uniq.length + 8);
    const three = shuf(uniq).slice(0, 3), all = shuf([...three, out]);
    return mcq(`🧾 Monthly game spending for 4 kids (dollars): ${all.join(", ")}. Which amount is the OUTLIER?`, String(out), three.map(String),
      "An outlier is far away from the rest of the numbers.", "Look for the number that does not fit the group. The others are close together.",
      () => { const a = ri(8, 15); return `Example: ${a}, ${a + 2}, ${a + 3} and ${a + 90}. Three are close together, but ${a + 90} is far away, so it is the outlier. Now do yours.`; });
  }, [["Outlier", "🔭", "An <b>outlier</b> is a number far away from the others in a set."], ["Effect", "⚖️", "Outliers pull the <b>mean</b> a lot. The <b>median</b> hardly changes."], ["Example", "🧮", "Allowances $8, $9, $10, $90: the median is $9.50 and the mean is $29.25. The median describes the group better."]]));

  l14.push(L("Budget circle graphs", () => {
    const k = ri(0, 2), nm = pick(NM);
    if (k === 0) { const p = pick([5, 10, 15, 20, 25, 30, 40, 50, 75]); return q(`A circle graph shows ${nm}'s budget. Rent takes ${p}% of the circle. How many degrees is the rent slice? (A whole circle is 360°.)`, 3.6 * p,
      "The whole circle is 100% of the budget and 360 degrees.", "Find the percent of 360. Turn the percent into a decimal and multiply by 360.", () => { const x = pick([10, 20, 25, 50]); return `Example: ${x}% of 360° = ${x / 100} × 360 = ${3.6 * x}°. Now do yours.`; }); }
    if (k === 1) { const p = pick([5, 10, 15, 20, 25, 30, 40, 50, 75]); return q(`A slice of a budget circle graph measures ${3.6 * p}°. What percent of the budget is it? (Type just the number.)`, p,
      "The full circle is 360 degrees, which is 100%.", "Divide the slice's degrees by 360 and multiply by 100.", () => { const x = pick([10, 20, 25, 50]); return `Example: ${3.6 * x}° ÷ 360 = ${x / 100}, which is ${x}%. Now do yours.`; }); }
    const a = ri(20, 40), b = ri(10, 25), c = ri(5, 20); return q(`${nm}'s circle graph: rent ${a}%, food ${b}%, savings ${c}%. The rest is for fun. What percent is for fun?`, 100 - a - b - c,
      "All the slices together make the whole circle.", "Add the listed percents. Subtract that sum from the whole.", () => { const x = ri(20, 40), y = ri(10, 25), z = ri(5, 20); return `Example: ${x}% + ${y}% + ${z}% = ${x + y + z}%. 100 − ${x + y + z} = ${100 - x - y - z}% left. Now do yours.`; });
  }, [["Circle graph", "🥧", "A <b>circle graph</b> shows how a whole budget is split. All slices add to <b>100%</b>."], ["Degrees", "📐", "A full circle is 360°. A 50% slice is 180°; a 25% slice is 90°."], ["Finding the rest", "🧮", "If rent, food and savings add to 80%, the rest is 100 − 80 = <b>20%</b>."]]));

  l14.push(L("Fair shares by ratio", () => {
    const [a, b] = pick([[1, 2], [1, 3], [2, 3], [3, 4], [2, 5], [3, 5], [1, 4]]), part = ri(2, 12), E = (a + b) * part;
    let n1 = pick(NM), n2 = pick(NM); while (n2 === n1) n2 = pick(NM);
    return q(`${n1} and ${n2} run a lemonade stand and share the $${E} profit in the ratio ${a} : ${b} (${n1} gets ${a} parts, ${n2} gets ${b} parts). How many dollars does ${n2} get?`, b * part,
      "Add the parts of the ratio to see how many equal shares there are.", "Divide the profit by the total number of parts to find one part. Multiply by the parts for the person.",
      () => { const x = ri(1, 3), y = x + ri(1, 2), pp = ri(2, 12); return `Example: profit $${(x + y) * pp} in ratio ${x}:${y}. ${x}+${y} = ${x + y} parts; one part is ${pp}. The second person gets ${y} × ${pp} = $${y * pp}. Now do yours.`; });
  }, [["Sharing by ratio", "🤝", "People can share money in a ratio. 1 : 2 means one gets 1 part and the other gets 2 parts."], ["Steps", "🪜", "Add the parts (1 + 2 = 3). Divide the money by 3 to find one part. Then multiply."], ["Example", "🧮", "$30 shared 1 : 2: one part is $10, so the shares are <b>$10 and $20</b>."]]));

  l14.push(L("Money and measurement", () => {
    const k = ri(0, 2);
    if (k === 0) { const p = 4 * ri(1, 8), n = pick([4, 8, 12]); return q(`Cheese costs $${p} per pound. How many dollars for ${n} ounces? (16 ounces = 1 pound)`, p * n / 16,
      "Is the amount you are buying more or less than one pound?", "Find what fraction of a pound it is (ounces out of 16). Then take that fraction of the price.", () => { const x = 4 * ri(1, 8), o = pick([4, 8, 12]); return `Example: $${x} per pound, ${o} oz: ${o}/16 of ${x} = $${x * o / 16}. Now do yours.`; }); }
    if (k === 1) { const d = 4 * ri(1, 6), n = pick([3, 6, 9]); return q(`🥚 A dozen eggs (12) costs $${d}. How many dollars do ${n} eggs cost?`, d * n / 12,
      "A dozen is 12 items. What fraction of a dozen is the amount you want?", "Divide the dozen price by 12 and multiply by the number of eggs, or use the fraction of a dozen.", () => { const x = 4 * ri(1, 6), o = pick([3, 6, 9]); return `Example: $${x} per dozen, ${o} eggs: ${o}/12 of ${x} = $${x * o / 12}. Now do yours.`; }); }
    const g = 4 * ri(2, 8), n = ri(1, 3); return q(`🥛 Milk costs $${g} per gallon (4 quarts). How many dollars for ${n} quart${n > 1 ? "s" : ""}?`, g * n / 4,
      "A gallon is split into smaller equal units. How many?", "Divide the gallon price by 4 to find the price of one quart. Multiply by the number of quarts.", () => { const x = 4 * ri(2, 8), o = ri(1, 3); return `Example: $${x} a gallon is $${x / 4} a quart. ${o} quart(s) cost $${x * o / 4}. Now do yours.`; });
  }, [["Know the units", "📏", "16 ounces = 1 pound. 12 = 1 dozen. 4 quarts = 1 gallon. Prices change with the unit."], ["Use fractions", "🍰", "8 ounces is 8/16 = <b>half</b> a pound. At $6 a pound, that is $3."], ["Check", "✅", "Smaller amounts should cost less than the full-unit price."]]));

  l14.push(L("Phone: price plus plan", () => {
    const m = pick([12, 18, 24]), pa = ri(0, 4) * 50 + 100, pb = ri(0, 4) * 50 + 100, ma = ri(20, 40), mb = ri(20, 40);
    const ta = pa + ma * m, tb = pb + mb * m;
    if (ta === tb) return null;
    return mcq(`📱 Phone A costs $${pa} plus $${ma} a month. Phone B costs $${pb} plus $${mb} a month. Which has the lower total cost over ${m} months?`, ta < tb ? "Phone A" : "Phone B", [ta < tb ? "Phone B" : "Phone A", "They cost the same"],
      "Add both kinds of cost: what you pay up front and what you pay every month.", "Multiply each monthly price by the number of months. Add the up-front price. Then compare.",
      () => { const x = ri(100, 300), y = ri(20, 40), z = ri(10, 24); return `Example: $${x} + $${y} a month for ${z} months = ${x} + ${y * z} = $${x + y * z}. Do this for both phones. Now do yours.`; });
  }, [["Total cost", "📱", "A phone has an up-front price <b>and</b> a monthly plan. The <b>total cost</b> adds them all."], ["Example", "🧮", "$200 + $30 a month for 12 months = 200 + 360 = <b>$560</b>."], ["Compare", "⚖️", "A cheaper phone can cost more over time if its plan is higher. Compare the totals."]]));
  // make phone lesson retry when equal
  { const base = l14[l14.length - 1].make, wrap = () => { let r, i = 0; do { r = base(); } while (!r && i++ < 50); return r; }; wrap.teach = base.teach; l14[l14.length - 1].make = wrap; }

  l14.push(mcL("From barter to digital money", [
    ["Trading corn for shoes with no money is called...", "Barter", ["Banking", "Budgeting", "Borrowing"], "Think of the oldest way to get goods: swapping.", "No coins, no bills, no cards. Just goods for goods."],
    ["What was a big problem with barter?", "You needed someone who had what you wanted AND wanted what you had", ["Everyone had too much money", "Goods were always free", "Nobody needed anything"], "Think about finding the right person to trade with.", "Both people had to want what the other offered at the same time."],
    ["Which of these would be a poor kind of money because it spoils quickly?", "Fresh fruit", ["Metal coins", "Silver pieces", "Paper bills"], "Good money should last.", "Look for something that goes bad in days."],
    ["Saving a $20 bill to spend next month shows money acting as a...", "Store of value", ["Medium of exchange", "Unit of account", "Tax"], "Money is waiting for later here.", "The word you need means holding worth over time."],
    ["Using money to buy a snack instead of trading goods shows money as a...", "Medium of exchange", ["Store of value", "Unit of account", "Interest rate"], "Money is passing from one person to another to complete a trade.", "Think about what money does at the checkout."],
    ["Saying a toy is worth $10 and a book is worth $5 shows money as a...", "Unit of account", ["Medium of exchange", "Store of value", "Tax"], "Prices give things a common measure.", "Money is acting like a ruler for value."],
    ["Which of these came LAST in history?", "Mobile payment apps", ["Metal coins", "Barter", "Paper money"], "Think about which one needs a phone and the internet.", "The newest way to pay uses technology we use today."],
    ["Why are metal coins better than trading goods?", "They are small, last long and everyone accepts them", ["They spoil quickly", "They are hard to count", "They only work for one thing"], "Compare coins with trading cows or grain.", "Look for the answer about being easy to carry, store and use."],
    ["A digital payment means...", "Money moves between accounts using computers", ["You hand over gold", "You swap goods", "You only use coins"], "No cash changes hands.", "Think about what happens behind the scenes when you tap a card."]
  ], () => { const a = pick(["a shell", "a coin", "a card tap"]); return `Example: when someone accepts ${a} as payment for a loaf of bread, it works because both people trust it has value. Now do yours.`; },
  [["Barter", "🔄", "Before money, people used <b>barter</b>: trading goods for goods. It only worked if both people wanted what the other had."], ["Money", "🪙", "Shells, metal coins and later paper money solved this. Money works as a <b>medium of exchange</b>, a <b>store of value</b> and a <b>unit of account</b>."], ["Today", "💳", "Now we also use cards and phone payments. The money is still real, only the way it moves is digital."]]));

  l14.push(mcL("Types of income", [
    ["A lifeguard is paid $14 for every hour worked. This is...", "Wages", ["Salary", "Commission", "Interest"], "Pay depends on hours here.", "It is a rate paid for each hour on the job."],
    ["A teacher is paid a fixed amount each year, in equal parts. This is a...", "Salary", ["Tip", "Commission", "Gift"], "The amount does not depend on exact hours.", "A fixed yearly amount split into regular checks."],
    ["A salesperson earns 5% of each sale. This is...", "Commission", ["Wages", "Allowance", "Interest"], "Her pay rises with what she sells.", "Pay is a percent of sales."],
    ["A savings account adds $3 to your balance. This is...", "Interest", ["Wages", "Tips", "A bill"], "The bank is paying you for keeping money there.", "It is money earned on money you already have."],
    ["A server gets extra money from happy customers. This is...", "Tips", ["Salary", "Interest", "Rent"], "Customers decide the amount.", "It is extra money given for good service."],
    ["A shop owner keeps what is left after paying all costs. This is...", "Profit", ["Wages", "Tips", "Interest"], "Think of money earned minus money spent to run the business.", "It is what remains after expenses."],
    ["Money earned by renting out a room is called...", "Rental income", ["Commission", "Tips", "Allowance"], "Someone pays to use your property.", "Think about landlords."],
    ["Which of these is earned by working a job?", "Wages", ["A found coin", "A prize gift", "A refund"], "Look for money tied to effort.", "Time and work are exchanged for pay."],
    ["Income you receive without working extra hours, such as bank interest, is often called...", "Passive income", ["Overtime", "Tips", "Commission"], "The money arrives without more work at that moment.", "The opposite of income that depends on working extra time."]
  ], () => { const a = pick(["mowing lawns for $10 an hour", "selling cars for 3% of each sale", "a fixed $40,000 a year"]); return `Example: ${a} is a way of earning money. Ask: is the pay tied to hours, to sales, or is it a fixed amount? Now do yours.`; },
  [["Many sources", "💼", "People get money from <b>wages</b> (hourly), <b>salary</b> (fixed), <b>tips</b>, <b>commission</b> (a percent of sales) and more."], ["Money that grows", "🌱", "<b>Interest</b> and <b>profit</b> are other kinds of income. Interest comes from savings, profit from running a business."], ["Which is steady?", "📅", "Salary is steady. Tips and commission can change from week to week."]]));

  l14.push(mcL("Job benefits", [
    ["Which benefit helps pay for doctor visits?", "Health insurance", ["Paid parking", "A uniform", "A name tag"], "Think about care when you are sick.", "It is shared coverage for medical costs."],
    ["Days you can stay home sick and still get paid are called...", "Sick leave", ["Overtime", "Layoffs", "A commission"], "You are not working, but still paid.", "It is paid time for being unwell."],
    ["A company adds $1 to your retirement account for every $1 you add (up to a limit). This is a...", "Retirement match", ["Late fee", "Tax refund", "Tip"], "The employer adds money to match yours.", "It is free money for the future."],
    ["Two jobs both pay $20 an hour. Only one adds health insurance and paid vacation. Which is worth more in total?", "The job with benefits", ["The job without benefits", "They are exactly equal", "It is impossible to tell"], "Think about what you would otherwise have to pay for yourself.", "Benefits have a real dollar value even if they are not in the paycheck."],
    ["Paid vacation means...", "You get paid even when you take time off", ["You pay to leave work", "You work extra hours", "You lose pay"], "Rest without losing income.", "Time away is part of the job's value."],
    ["Why is a retirement match so valuable?", "It adds money without you earning it by working extra", ["It lowers your pay", "It must be repaid", "It ends your job"], "It is a bonus for saving.", "Think about money you receive for free."],
    ["Overtime pay means...", "Extra pay for working more than the regular hours", ["Pay for being late", "A tax on your wages", "A tip from customers"], "More hours worked than normal.", "The rate is higher for the added time."],
    ["Which is NOT a job benefit?", "A big electricity bill at home", ["Paid holidays", "Health insurance", "Tuition help"], "Benefits are things your employer provides.", "One of these is a bill you pay yourself."]
  ], () => { const a = pick(["health insurance", "sick leave", "paid holidays"]); return `Example: ${a} is something the employer gives besides the paycheck. It saves you money you would otherwise pay. Now do yours.`; },
  [["Beyond the paycheck", "🎁", "A job can give <b>benefits</b> as well as pay, such as health insurance, paid vacation and sick leave."], ["Retirement help", "🏖️", "Some employers offer a <b>retirement match</b>: they add money when you save."], ["Compare jobs", "⚖️", "A job with a slightly lower hourly pay but good benefits can be worth more overall."]]));

  l14.push(mixOf("Mixed practice", [l14[0], l14[2], l14[5], l14[8], l14[11]]));
  l14.push(mixOf("Level 14 Challenge", [l14[1], l14[3], l14[4], l14[6], l14[7], l14[9], l14[12], l14[13], l14[14]]));

  // ======================= LEVEL 15 (7th grade, first half) =======================
  const l15 = [];
  l15.push(L("Two discounts in a row", () => {
    const [a, b] = pick([[20, 10], [10, 10], [30, 10], [50, 10], [25, 20], [20, 25], [50, 20], [40, 10]]), P = 100 * ri(1, 6), k = ri(0, 1), fin = P * (100 - a) * (100 - b) / 10000;
    const exF = () => { const x = pick([10, 20]), y = 10, pp = 100 * ri(1, 6); return `Example: $${pp} with ${x}% off gives ${pp * (100 - x) / 100}. Then ${y}% off that: ${pp * (100 - x) / 100} × 0.9 = ${pp * (100 - x) * 90 / 10000}. Now do yours.`; };
    if (k === 0) return q(`A $${P} jacket is ${a}% off. Then a coupon takes another ${b}% off the SALE price. How many dollars do you pay?`, fin,
      "The second discount is taken from the new price, not the original one.", "Find the price after the first discount. Then take the second percent off that new price.", exF);
    return q(`A $${P} jacket is ${a}% off. Then a coupon takes another ${b}% off the SALE price. How many dollars do you save in all?`, P - fin,
      "Saving = original price minus what you pay.", "Find the price after both discounts, then subtract it from the original price.", exF);
  }, [["Step by step", "🏷️", "Take the first discount, then take the second discount from the <b>new</b> price."], ["Not the same as adding", "⚠️", "20% off then 10% off is <b>not</b> 30% off. $100 → $80 → $72, which is 28% off."], ["Shortcut", "💡", "Multiply by the \"percent you pay\" each time: 0.80 × 0.90 = 0.72."]]));

  l15.push(L("Simple interest", () => {
    const P = 100 * ri(2, 30), r = ri(2, 8), t = ri(1, 5), k = ri(0, 1), I = P * r * t / 100;
    const exF = () => { const a = 100 * ri(2, 30), b = ri(2, 8), c = ri(1, 5); return `Example: $${a} at ${b}% for ${c} years: ${a} × 0.0${b} × ${c} = $${a * b * c / 100} interest. Now do yours.`; };
    if (k === 0) return q(`You put $${P} in an account that pays ${r}% simple interest per year. How many dollars of interest will you earn in ${t} year${t > 1 ? "s" : ""}? (I = P × r × t)`, I,
      "Simple interest is earned on the starting amount only, every year the same.", "Turn the rate into a decimal. Multiply the starting amount by the rate and then by the number of years.", exF);
    return q(`You put $${P} in an account that pays ${r}% simple interest per year. How many dollars will the account hold after ${t} year${t > 1 ? "s" : ""}?`, P + I,
      "The account holds your starting money plus the interest earned.", "Find the interest using P × r × t, then add it to the starting amount.", exF);
  }, [["I = P × r × t", "🧮", "<b>Simple interest</b> = principal × rate × time. The principal is the amount you start with."], ["Example", "🏦", "$500 at 4% for 3 years: 500 × 0.04 × 3 = <b>$60</b>. The account has $560."], ["Rate as decimal", "🔢", "Always change the percent to a decimal first: 4% = 0.04."]]));

  l15.push(L("Find the time or the rate", () => {
    const P = 100 * ri(2, 20), t = ri(2, 6), r = ri(2, 8), I = P * r * t / 100, k = ri(0, 1);
    if (k === 0) return q(`A $${P} deposit earned $${I} in simple interest at ${r}% per year. For how many years was it saved?`, t,
      "Interest each year is always the same. How many of those yearly amounts add up to the total?", "Find the interest for ONE year (principal × rate), then divide the total interest by it.",
      () => { const a = 100 * ri(2, 20), b = ri(2, 8), c = ri(2, 6); return `Example: $${a} at ${b}% earns $${a * b / 100} a year. A total of $${a * b * c / 100} is ${a * b * c / 100} ÷ ${a * b / 100} = ${c} years. Now do yours.`; });
    return q(`A $${P} deposit earned $${I} in simple interest over ${t} years. What yearly interest rate is that? (Type just the number.)`, r,
      "First find how much interest was earned in one year.", "Divide the total interest by the years. Then divide by the principal and multiply by 100 to make it a percent.",
      () => { const a = 100 * ri(2, 20), b = ri(2, 8), c = ri(2, 6); return `Example: $${a} earned $${a * b * c / 100} in ${c} years, so ${a * b / 100} a year. ${a * b / 100} ÷ ${a} = ${b / 100}, which is ${b}%. Now do yours.`; });
  }, [["Working backward", "↩️", "I = P × r × t has four parts. If you know three, you can find the missing one."], ["Finding time", "⏳", "Interest per year = P × r. Then <b>time = total interest ÷ interest per year</b>."], ["Finding rate", "📈", "Rate = interest ÷ (principal × time). Multiply by 100 for a percent."]]));

  l15.push(L("Loan payments", () => {
    const k = pick([1, 2, 3, 4]), P = 1200 * k, r = ri(3, 9), t = ri(1, 2), nm = pick(NM);
    return q(`${nm} borrows $${P} for ${t} year${t > 1 ? "s" : ""}. The bank charges ${r}% simple interest per year. The loan plus interest is paid back in equal monthly payments. How many dollars is each payment?`, (P + P * r * t / 100) / (12 * t),
      "The total paid back is more than the amount borrowed.", "Find the total interest, add it to the loan, and then divide by the number of months.",
      () => { const a = 1200 * ri(1, 4), b = ri(3, 9), c = ri(1, 2); return `Example: $${a} at ${b}% for ${c} yr: interest ${a * b * c / 100}, total ${a + a * b * c / 100}, months ${12 * c}, payment ${(a + a * b * c / 100) / (12 * c)}. Now do yours.`; });
  }, [["Paying back", "🏦", "A loan is paid back with <b>interest</b>. The total repaid is bigger than the amount borrowed."], ["Steps", "🪜", "Interest = P × r × t. Total = P + interest. Payment = total ÷ number of months."], ["Example", "🧮", "$1,200 at 5% for 1 year: interest $60, total $1,260, payment 1,260 ÷ 12 = <b>$105</b>."]]));

  l15.push(L("Tax brackets", () => {
    const T = pick([10000, 20000, 30000]), r1 = pick([5, 10]), r2p = pick([15, 20, 25]), E = T + 1000 * ri(1, 30);
    return q(`In a made-up tax system, the first $${T} of income is taxed at ${r1}%. Any income ABOVE $${T} is taxed at ${r2p}%. A worker earns $${E}. How many dollars of tax is that?`, T * r1 / 100 + (E - T) * r2p / 100,
      "Each slice of income gets its own tax rate. Split the income into two parts.", "Tax the first part at the first rate. Then tax only the amount above the line at the higher rate. Add the two taxes.",
      () => { const t = pick([10000, 20000]), a = pick([5, 10]), b = pick([15, 20]), e = t + 1000 * ri(1, 10); return `Example: first $${t} at ${a}% is ${t * a / 100}. The extra ${e - t} at ${b}% is ${(e - t) * b / 100}. Total ${t * a / 100 + (e - t) * b / 100}. Now do yours.`; });
  }, [["Brackets", "🪜", "Many income tax systems use <b>brackets</b>: different slices of income are taxed at different rates."], ["Marginal rate", "✂️", "Only the income <b>above</b> the line gets the higher rate. The first part keeps the lower rate."], ["Why", "🤝", "Taxes pay for schools, roads and community services. This example is made-up to practice."]]));

  l15.push(L("Payroll taxes (FICA)", () => {
    const k = ri(0, 2), nm = pick(NM);
    if (k === 0) { const g = 500 * ri(1, 12); return q(`In the US, workers pay 6.2% of their pay for Social Security. ${nm}'s gross pay is $${g}. How many dollars is the Social Security tax?`, g * 6.2 / 100,
      "Change the percent to a decimal before you multiply.", "Multiply the gross pay by 0.062.", () => { const x = 500 * ri(1, 12); return `Example: 6.2% of $${x} = 0.062 × ${x} = $${r2(x * 0.062)}. Now do yours.`; }); }
    if (k === 1) { const g = 2000 * ri(1, 5); return q(`In the US, workers also pay 1.45% for Medicare. ${nm}'s gross pay is $${g}. How many dollars is the Medicare tax?`, r2(g * 1.45 / 100),
      "Change the percent to a decimal before you multiply.", "Multiply the gross pay by 0.0145.", () => { const x = 2000 * ri(1, 5); return `Example: 1.45% of $${x} = 0.0145 × ${x} = $${r2(x * 0.0145)}. Now do yours.`; }); }
    const g = 2000 * ri(1, 5); return q(`Social Security (6.2%) and Medicare (1.45%) together take 7.65% of pay. ${nm} earns $${g}. How many dollars are left after only these two taxes?`, r2(g - g * 7.65 / 100),
      "First find the amount taken out, then see what remains.", "Multiply gross pay by 0.0765 to find the taxes. Subtract the taxes from the gross pay.", () => { const x = 2000 * ri(1, 5); return `Example: $${x} × 0.0765 = $${r2(x * 0.0765)} taxes. ${x} − ${r2(x * 0.0765)} = $${r2(x - x * 0.0765)}. Now do yours.`; });
  }, [["Payroll taxes", "🧾", "In the US, workers pay <b>FICA</b> taxes out of each paycheck: <b>6.2%</b> for Social Security and <b>1.45%</b> for Medicare."], ["Together", "➕", "6.2% + 1.45% = <b>7.65%</b> of your pay. Your employer pays a share too."], ["Take-home", "💼", "Pay after taxes is called <b>net pay</b>. Pay before taxes is <b>gross pay</b>."]]));

  l15.push(L("Cents per ounce", () => {
    const c = pick([25, 50, 75, 100, 125]), k = ri(1, 4), [e, f] = pick([["🍚", "rice"], ["🥜", "trail mix"], ["🌾", "flour"], ["🍪", "cookie mix"]]);
    return q(`${e} A ${k}-pound bag of ${f} costs $${c * 16 * k / 100}. How many cents does it cost per ounce? (16 ounces = 1 pound)`, c,
      "First find how many ounces are in the whole bag.", "Change the price to cents, then divide by the number of ounces.",
      () => { const x = pick([25, 50, 75]), y = ri(1, 4); return `Example: a ${y}-pound bag costs $${x * 16 * y / 100}. It has ${16 * y} ounces; ${x * 16 * y} cents ÷ ${16 * y} = ${x} cents per ounce. Now do yours.`; });
  }, [["Convert units", "📏", "To compare prices, use the same unit. 16 ounces = 1 pound."], ["Dollars to cents", "💵", "Multiply dollars by 100 to get cents. $8 = 800 cents."], ["Example", "🧮", "A 2-pound bag has 32 ounces. If it costs $8: 800 ÷ 32 = <b>25 cents</b> per ounce."]]));

  l15.push(L("Proportional or not?", () => {
    const k = ri(0, 2), nm = pick(NM);
    if (k === 0) { const r = ri(3, 12), x1 = ri(2, 4), x2 = x1 + ri(2, 5); return q(`${nm}'s pay is proportional to hours worked.<br>${x1} hours: $${r * x1}<br>${x2} hours: $${r * x2}<br>What is the pay per hour (the constant of proportionality)?`, r,
      "Proportional means the same rate every time.", "Divide the pay by the hours for any one row.", () => { const a = ri(3, 12), b = ri(2, 4); return `Example: ${b} hours earn $${a * b}. $${a * b} ÷ ${b} = $${a} per hour. Now do yours.`; }); }
    if (k === 1) { const r = ri(3, 12), x = ri(5, 12); return q(`A plan costs $${r} for each month, with no joining fee. The total cost is proportional to the months. How many dollars for ${x} months?`, r * x,
      "The rate per month stays the same.", "Multiply the cost per month by the number of months.", () => { const a = ri(3, 12), b = ri(5, 12); return `Example: $${a} a month for ${b} months: ${a} × ${b} = $${a * b}. Now do yours.`; }); }
    const f = pick([0, 0, 5, 10, 15]), m = ri(5, 20);
    return mcq(`A club charges ${f ? "$" + f + " to join plus " : ""}$${m} a month. Is the total cost PROPORTIONAL to the number of months?`, f ? "No" : "Yes", [f ? "Yes" : "No"],
      "Ask what the total would be after zero months.", "A proportional rate starts at zero. A one-time joining fee changes that.",
      () => { const a = ri(5, 15); return `Example: $${a} a month with no fee is $0 after 0 months, so it is proportional. With a joining fee it would not start at $0. Now do yours.`; });
  }, [["Proportional", "⚖️", "Two amounts are <b>proportional</b> when one is always the same number times the other: y = k × x."], ["The constant", "🔑", "If 3 tickets cost $12, then k = 12 ÷ 3 = <b>$4</b> each. 10 tickets cost 4 × 10 = $40."], ["Fees break it", "⚠️", "A joining fee means the cost does not start at zero, so it is <b>not</b> proportional."]]));

  l15.push(mcL("Credit card words", [
    ["The most a card lets you borrow is called the...", "Credit limit", ["APR", "Minimum payment", "Grace period"], "It is a top amount that you cannot pass.", "The word for how high your borrowing can go."],
    ["The yearly cost of borrowing on a card, shown as a percent, is the...", "APR", ["Credit limit", "Due date", "Statement"], "It is a yearly rate of interest.", "It is a rate, it is yearly, and it is shown as a percent."],
    ["Time after your statement when paying in full means no interest is the...", "Grace period", ["Credit limit", "Late fee", "Overdraft"], "It is a short window of kindness.", "Pay everything on time within this window and you owe no interest."],
    ["The smallest amount you must pay by the due date is the...", "Minimum payment", ["Credit limit", "Balance", "Fee"], "It keeps your account in good standing, but just barely.", "It is the floor, not the goal."],
    ["Which habit keeps card costs lowest?", "Pay the full statement balance every month", ["Pay only the minimum", "Pay when you remember", "Skip months"], "Interest only builds on balances you carry.", "Choose the habit that leaves nothing for interest to grow on."],
    ["A card has a $500 limit and $320 is charged. How much credit is still available?", "$180", ["$820", "$320", "$500"], "Available credit is what is left of the limit.", "Subtract what you've used from the limit."],
    ["Paying only the minimum each month usually means...", "You pay a lot more interest over time", ["The balance disappears fast", "No interest is charged", "Your limit grows"], "Balance stays high, and interest keeps being added.", "Think about how long a large balance lingers."],
    ["A credit report mostly records...", "How you have borrowed and repaid", ["Your savings password", "Your favorite stores", "Your grades"], "It is a history of borrowing.", "Lenders read it to learn whether you repay on time."],
    ["Which helps build good credit?", "Paying bills on time", ["Missing due dates", "Maxing out the card", "Ignoring statements"], "Lenders like reliability.", "A steady habit of paying as agreed shows you are dependable."]
  ], () => { const a = pick([300, 600, 800]); const b = ri(100, a - 50); return `Example: a $${a} limit with $${b} charged leaves ${a} − ${b} = $${a - b} available. Always match the word to its job. Now do yours.`; },
  [["Borrowing, not income", "💳", "A credit card is a <b>loan</b>. You must pay back what you charge, plus interest if you carry a balance."], ["Key words", "📖", "<b>Credit limit</b> = most you can borrow. <b>APR</b> = yearly interest. <b>Minimum payment</b> = least you can pay."], ["Best habit", "🌟", "Pay the <b>full statement balance</b> by the due date and you usually pay no interest."]]));

  l15.push(L("The minimum payment trap", () => {
    const B = 200 * ri(1, 5), r = pick([12, 18, 24, 36]), m = ri(20, 60), nm = pick(NM);
    return q(`${nm}'s card balance is $${B} with an APR of ${r}%. Each month, interest (APR ÷ 12 of the balance) is added first. Then ${nm} pays $${m}. What is the balance after one month?`, B + B * r / 1200 - m,
      "Interest makes the balance bigger before the payment makes it smaller.", "Find the month's interest. Add it to the balance, then subtract the payment.",
      () => { const b = 200 * ri(1, 5), x = pick([12, 24]), p = ri(20, 60); return `Example: $${b} at ${x}%: interest ${b * x / 1200}. ${b} + ${b * x / 1200} = ${b + b * x / 1200}. Pay ${p}: ${b + b * x / 1200 - p}. Now do yours.`; });
  }, [["Interest first", "📈", "Each month, interest is added to the balance. Then your payment lowers it."], ["Small payments", "🐌", "If you pay only a little more than the interest, the balance goes down very slowly."], ["Example", "🧮", "$400 at 18%: interest $6. Pay $30 and the balance becomes 400 + 6 − 30 = <b>$376</b>."]]));

  l15.push(L("Planned vs actual", () => {
    const b = pick([20, 40, 100, 200, 400]), pct = pick([5, 10, 15, 20, 25, 50]), over = Math.random() < 0.5, a = over ? b + b * pct / 100 : b - b * pct / 100;
    const [cat, e] = pick([["snacks", "🍿"], ["games", "🎮"], ["clothes", "👕"], ["gifts", "🎁"]]);
    if (Math.random() < 0.5) return q(`${e} Budget for ${cat}: $${b}. Actual spending: $${a}. By how many dollars was the spending ${over ? "OVER" : "UNDER"} budget?`, Math.abs(a - b),
      "Compare the planned amount with the actual amount.", "Subtract the smaller number from the larger number.", () => { const x = ri(20, 100), y = ri(5, 30); return `Example: budget ${x}, actual ${x + y}: the difference is ${x + y} − ${x} = ${y}. Now do yours.`; });
    return q(`${e} Budget for ${cat}: $${b}. Actual spending: $${a}. By what percent was the spending ${over ? "OVER" : "UNDER"} budget? (Type just the number.)`, pct,
      "Find how many dollars off the budget you were. Then compare that to the budget.", "Divide the dollar difference by the BUDGET (not the actual) and multiply by 100.",
      () => { const x = pick([20, 40, 100]), y = pick([10, 25, 50]); return `Example: budget $${x}, actual $${x + x * y / 100}: difference ${x * y / 100}; ${x * y / 100} ÷ ${x} = ${y / 100}, so ${y}% over. Now do yours.`; });
  }, [["Plan vs real", "📋", "A budget is a plan. Comparing it to what you really spent shows how well the plan worked."], ["Difference", "➖", "Actual − budget. Positive means <b>over</b> budget; negative means <b>under</b>."], ["Percent", "💯", "Percent over = difference ÷ <b>budget</b> × 100. $4 over a $40 budget is 10% over."]]));

  l15.push(L("Emergency fund goal", () => {
    const E = 100 * ri(5, 30), n = pick([3, 6]), s = 100 * ri(1, 4) * 0 + Math.floor((E * n * ri(10, 70) / 100) / 100) * 100, nm = pick(NM);
    return q(`Experts often suggest saving 3 to 6 months of expenses for emergencies. ${nm}'s family spends $${E} a month and wants ${n} months saved. They have $${s}. How many more dollars do they need?`, E * n - s,
      "First find the whole goal. Then see how far away it is.", "Multiply the monthly expenses by the months wanted. Subtract the money already saved.",
      () => { const a = 100 * ri(5, 30), m = pick([3, 6]), c = 100 * ri(1, 5); return `Example: ${m} months of $${a} is $${a * m}. With $${c} saved, ${a * m} − ${c} = $${a * m - c} still needed. Now do yours.`; });
  }, [["Emergency fund", "🛟", "An <b>emergency fund</b> is money kept for surprises, like a repair or a lost job."], ["How much", "📏", "A common rule is <b>3 to 6 months</b> of living costs. Monthly cost × number of months."], ["Where", "🏦", "Keep it somewhere safe and easy to reach, like a savings account."]]));

  l15.push(L("Yearly costs", () => {
    const items = shuf([["📺 streaming", ri(7, 17)], ["🎵 music", ri(5, 12)], ["🎮 game pass", ri(8, 16)], ["📱 phone plan", ri(20, 45)], ["🏋️ gym", ri(15, 40)]]).slice(0, 3);
    const mo = items.reduce((s, x) => s + x[1], 0), withFee = Math.random() < 0.5, f = 5 * ri(2, 12);
    const list = items.map(x => `${x[0]} $${x[1]} a month`).join(", ");
    return q(`Monthly costs: ${list}.${withFee ? ` There is also a $${f} yearly fee.` : ""} What is the total cost for ONE year, in dollars?`, mo * 12 + (withFee ? f : 0),
      "Add up everything you pay each month first.", `Multiply the monthly total by 12.${withFee ? " Then add the yearly fee." : ""}`,
      () => { const a = ri(5, 20), b = ri(5, 20), c = ri(5, 30); return `Example: ${a} + ${b} + ${c} = ${a + b + c} a month. × 12 = $${(a + b + c) * 12} a year. Now do yours.`; });
  }, [["Small adds up", "🔁", "Small monthly costs add up. $12 a month is $144 a year."], ["Steps", "🪜", "Add the monthly costs together, multiply by 12, and add any yearly fees."], ["Question", "🤔", "Looking at yearly cost helps you decide if each subscription is really worth it."]]));

  l15.push(L("Which account earns more?", () => {
    const PA = 100 * ri(2, 20), PB = 100 * ri(2, 20), rA = ri(2, 8), rB = ri(2, 8), ia = PA * rA / 100, ib = PB * rB / 100;
    if (ia === ib) return null;
    return mcq(`Account A: $${PA} at ${rA}% simple interest. Account B: $${PB} at ${rB}% simple interest. Which earns more interest in ONE year?`, ia > ib ? "Account A" : "Account B", [ia > ib ? "Account B" : "Account A", "They earn the same"],
      "A higher rate does not always win. The amount of money matters too.", "Find the interest for each account (principal × rate). Then compare the two dollar amounts.",
      () => { const x = 100 * ri(2, 10), y = ri(2, 6), z = 100 * ri(2, 10), w = ri(2, 6); return `Example: $${x} at ${y}% earns ${x * y / 100}; $${z} at ${w}% earns ${z * w / 100}. The bigger number wins. Now do yours.`; });
  }, [["Rate and amount", "⚖️", "Interest depends on <b>both</b> the rate and how much money is in the account."], ["Compare dollars", "💵", "$1,000 at 2% earns $20. $400 at 4% earns $16. The lower rate earned more!"], ["Steps", "🪜", "Calculate each account's interest in dollars, then compare."]]));
  { const base = l15[l15.length - 1].make, wrap = () => { let r, i = 0; do { r = base(); } while (!r && i++ < 50); return r; }; wrap.teach = base.teach; l15[l15.length - 1].make = wrap; }

  l15.push(L("Debt-to-income", () => {
    const I = 500 * ri(3, 12), pct = pick([5, 10, 15, 20, 25, 30, 35, 40]), nm = pick(NM);
    return q(`${nm}'s family earns $${I} a month. Their debt payments (car loan and phone) total $${I * pct / 100} a month. What percent of income goes to debt payments? (Type just the number.)`, pct,
      "Compare the debt payments to the whole monthly income.", "Divide debt payments by income and multiply by 100.",
      () => { const i = 500 * ri(3, 12), p = pick([10, 20, 25, 40]); return `Example: $${i * p / 100} of $${i}: ${i * p / 100} ÷ ${i} = ${p / 100}, which is ${p}%. Now do yours.`; });
  }, [["Debt-to-income", "⚖️", "The <b>debt-to-income ratio</b> is monthly debt payments ÷ monthly income, shown as a percent."], ["Why lenders care", "🏦", "A lower ratio means a person has more room in their budget, so lending to them is safer."], ["Example", "🧮", "$300 of payments on $2,000 income is 300 ÷ 2000 = 0.15, or <b>15%</b>."]]));

  l15.push(L("Data plan bills", () => {
    const p = ri(20, 50), g = pick([2, 3, 5, 8, 10]), x = ri(2, 10), u = ri(1, 15), nm = pick(NM);
    return q(`📶 ${nm}'s phone plan costs $${p} a month and includes ${g} GB. Each extra GB costs $${x}. ${nm} used ${u} GB. What is the bill in dollars?`, p + x * Math.max(0, u - g),
      "Check whether the data used is more than what is included.", "If it is more, multiply the extra GB by the extra price and add that to the plan price. If not, just the plan price.",
      () => { const a = ri(20, 50), b = ri(2, 8), c = ri(2, 6), d = ri(3, 12); return `Example: $${a} plan with ${b} GB, extra $${c} per GB, used ${d}: ${d > b ? `${d - b} extra GB costs ${c * (d - b)}, bill ${a + c * (d - b)}` : "no extra, bill " + a}. Now do yours.`; });
  }, [["Tiered pricing", "📶", "Many plans include a set amount of data and charge <b>extra</b> for going over."], ["Steps", "🪜", "Used − included = extra. Extra × extra price + plan price = bill. If you stay under, there is no extra."], ["Tip", "💡", "Wi-Fi at home or school does not use your plan's data."]]));

  l15.push(mcL("Stocks, bonds and funds", [
    ["A tiny piece of ownership in a company is a...", "Stock", ["Bond", "Savings deposit", "Coupon"], "Owning part of a business.", "People who hold it are called shareholders."],
    ["Lending money to a company or government, which pays you interest, is buying a...", "Bond", ["Stock", "Coupon", "Receipt"], "You are the lender here.", "It is a loan you make, not ownership."],
    ["A CD (certificate of deposit) usually means...", "Money kept in a bank for a set time at a fixed rate", ["A compact disc of music", "A risky share", "A free coupon"], "It is a bank product with a set time period.", "Taking money out early can cost a penalty."],
    ["A fund that holds many stocks or bonds in one package is a...", "Mutual or index fund", ["Single stock", "Gift card", "Piggy bank"], "It is like a basket with many things inside.", "One purchase spreads money across lots of companies."],
    ["A dividend is...", "A share of a company's profits paid to its owners", ["A fee charged by banks", "A tax refund", "A lost investment"], "It is a payout.", "Shareholders may receive it from the company."],
    ["Which choice usually has the most risk?", "A single company's stock", ["A savings account", "A CD", "A government savings bond"], "Think about prices that can swing up and down a lot.", "Putting everything on one company is bumpy."],
    ["Spreading money across many different investments is called...", "Diversifying", ["Overdrafting", "Budgeting", "Borrowing"], "Don't put all eggs in one basket.", "It means choosing many different kinds of investments instead of one."],
    ["The usual rule about risk and reward is...", "Higher possible gain usually means higher risk", ["Higher gain always means no risk", "Risk never matters", "Gains are guaranteed"], "There is no free lunch in investing.", "Chances of earning more usually come with chances of losing."],
    ["Why do people with a long time to invest often have an advantage?", "Time can help smooth out ups and downs and let money grow", ["Prices never change", "They pay no taxes", "Risk disappears"], "Years of growth help.", "A longer stretch gives investments room to recover."]
  ], () => { const a = pick(["a bond", "a stock", "a fund"]); return `Example: ${a} is one way to put money to work. Ask: is it ownership, a loan, or a basket of many? That tells you what it is. Now do yours.`; },
  [["Ways to invest", "📈", "A <b>stock</b> is part-ownership. A <b>bond</b> is a loan that pays interest. A <b>fund</b> bundles many investments."], ["Risk and reward", "⚖️", "Investments that might grow more usually carry <b>more risk</b>. Savings accounts are safer but grow slowly."], ["Spread it out", "🧺", "<b>Diversifying</b> (not putting all your money in one place) lowers the risk."]]));

  l15.push(mcL("Smart consumer rights", [
    ["A written promise to fix or replace a product that breaks is a...", "Warranty", ["Receipt", "Coupon", "Tax"], "It protects you after you buy.", "It lasts for a set time."],
    ["Why keep a receipt?", "It proves what you bought and when, for returns", ["It adds value to the item", "It is required to use the item", "It is a coupon"], "A paper trail helps if something goes wrong.", "A store will often ask for proof before a refund."],
    ["Before a big purchase you can avoid regret by...", "Waiting a day or two and comparing prices", ["Buying right away", "Ignoring reviews", "Only reading ads"], "Pause before paying.", "Impulse is the opposite of this."],
    ["A product has hundreds of reviews that all sound the same and are all five stars. What should you think?", "Some may be fake, so check other sources", ["They are all certainly true", "Stars are always correct", "Reviews don't exist"], "Real people write in different ways.", "Be careful when everything looks too perfect."],
    ["What does a return policy tell you?", "When and how you can bring an item back", ["How to make the product", "The product's color", "How to rate it"], "Know it before you pay.", "It sets time limits and conditions."],
    ["Fair trade labels mean...", "Workers and farmers were paid fairly", ["The price is free", "The item is a gift", "The product never breaks"], "Think about the people who make things.", "It is about how producers are treated."],
    ["You are charged twice for the same item. What is the best step?", "Contact the seller with your receipt and ask for a fix", ["Ignore it", "Delete the receipt", "Pay again"], "Speak up politely with proof.", "Most sellers fix honest errors."],
    ["Why read the 'terms and conditions' before agreeing to a subscription?", "It shows costs, renewal and cancel rules", ["It makes the app faster", "It gives you a gift", "It hides the price"], "Details can affect your money.", "It contains the rules you agree to."],
    ["An ad says 'Only 2 left, buy NOW!' This is meant to...", "Make you feel rushed so you buy quickly", ["Teach you about math", "Help you save", "Show the best price"], "Pressure tactics.", "It tries to stop you from thinking it over."]
  ], () => { const a = pick(["a warranty", "a receipt", "a return policy"]); return `Example: ${a} is a tool that protects buyers. Match the question to the protection it gives. Now do yours.`; },
  [["Your rights", "🛡️", "Buyers have tools: <b>receipts</b>, <b>warranties</b> and <b>return policies</b>. Know them before you pay."], ["Spot pressure", "🚨", "Messages like \"Hurry, only 2 left!\" try to rush you. Take time to compare and think."], ["Spend with care", "🤝", "Reading reviews with care, checking terms and picking fair sellers makes you a smart shopper."]]));

  l15.push(mixOf("Mixed practice", [l15[0], l15[1], l15[4], l15[10], l15[12]]));
  l15.push(mixOf("Level 15 Challenge", [l15[2], l15[3], l15[5], l15[6], l15[7], l15[9], l15[11], l15[14], l15[15]]));

  Object.assign(MONEY_LEVELS, { 13: l13, 14: l14, 15: l15 });
})();
