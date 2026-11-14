// ext/money-28-30.js  Mind Lab Money Skills levels 28-30 (60 lessons): intermediate economics and finance (college years 1-2)
(() => {
  const NM = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
  const D = x => (Number.isInteger(x) ? "$" + x.toLocaleString("en-US") : "$" + x.toFixed(2));
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
  const mcL = (title, items, slides) => L(title, () => { const it = pick(items); return mcq(it[0], it[1], it[2], it[3], it[4], it[5]); }, slides);
  const nL = (title, gens, slides) => L(title, () => pick(gens)(), slides);
  const nm0 = () => pick(NM);
  const K = n => n.toLocaleString("en-US");

  // ======================= LEVEL 28 (college year 1, second half) =======================
  const l28 = [];

  l28.push(nL("The trial balance", [
    () => { let a, b, c, x, y, z, T; do { a = pick([200, 300, 400, 500]); b = pick([100, 150, 250]); c = pick([50, 80, 120]); T = a + b + c; z = pick([100, 150, 200, 250]); x = pick([100, 200, 300]); y = T - x - z; } while (y <= 0);
      return q(`A trial balance lists debit balances of ${D(a)}, ${D(b)} and ${D(c)}. The credit balances are ${D(x)}, ${D(y)} and one more. What must the last credit balance be for the trial balance to balance? (dollars)`, z,
        "A trial balance only works when both sides match.", "Add all the debits, then subtract the credits you already know.",
        () => { const p = pick([300, 500]), r = pick([200, 400]), s = pick([150, 250]); return `Example: debits total ${D(p + r)}. Known credits: ${D(s)}. Missing credit = ${D(p + r)} - ${D(s)} = ${D(p + r - s)}. Now do yours.`; }); },
    () => { const a = pick([400, 600, 900]), b = pick([150, 250, 350]), c = pick([75, 125, 225]);
      return q(`In a trial balance, Cash has a debit balance of ${D(a)}, Equipment ${D(b)} and Rent Expense ${D(c)}. What are the total debits? (dollars)`, a + b + c,
        "Assets and expenses normally have debit balances.", "Add the three debit balances together.",
        () => { const p = pick([100, 200]), r = pick([300, 500]), s = pick([40, 60]); return `Example: ${D(p)} + ${D(r)} + ${D(s)} = ${D(p + r + s)}. Now do yours.`; }); },
    () => { const T = pick([5000, 8000, 12000]), cr = pick([2000, 3000, 4500]), nm = nm0();
      return q(`${nm}'s books show total debits of ${D(T)} and the liabilities and equity credits so far add up to ${D(cr)}. How much more credit is needed to balance? (dollars)`, T - cr,
        "Every debit must have an equal credit somewhere.", "Take the debit total and subtract the credits already counted.",
        () => { const a = pick([900, 1500]), b = pick([300, 600]); return `Example: debits ${D(a)}, credits ${D(b)}, missing credit = ${D(a - b)}. Now do yours.`; }); }
  ], [["Two sides, one total", "⚖️", "In double-entry bookkeeping every entry has equal <b>debits and credits</b>, so total debits always equal total credits."], ["The trial balance", "📋", "A <b>trial balance</b> lists every account balance. If debits and credits differ, there is a mistake to find."], ["What it can't catch", "🔍", "A balanced trial balance does not prove the books are right. An entry put in the wrong account can still balance."]]));

  l28.push(nL("Net accounts receivable", [
    () => { const ar = pick([20000, 25000, 40000, 50000]), p = pick([2, 4, 5, 10]); return q(`A company has ${D(ar)} in accounts receivable and estimates ${p}% will never be collected. What is the allowance for doubtful accounts in dollars? (dollars)`, ar * p / 100,
        "The allowance is the part you expect NOT to collect.", "Take the percent of the receivables.",
        () => { const a = pick([10000, 30000]), b = pick([3, 6]); return `Example: ${b}% of ${D(a)} = ${D(a * b / 100)}. Now do yours.`; }); },
    () => { const ar = pick([30000, 45000, 60000, 80000]), al = pick([1500, 2000, 3000, 4000]); return q(`Accounts receivable are ${D(ar)} and the allowance for doubtful accounts is ${D(al)}. What is net accounts receivable, the amount expected to be collected? (dollars)`, ar - al,
        "Net means after taking away the part that will probably not be paid.", "Subtract the allowance from the gross receivables.",
        () => { const a = pick([12000, 18000]), b = pick([600, 900]); return `Example: ${D(a)} - ${D(b)} = ${D(a - b)}. Now do yours.`; }); },
    () => { const ar = pick([40000, 50000, 80000]), p = pick([2, 5, 10]); return q(`Receivables are ${D(ar)}. The company expects ${p}% to be uncollectible. What net amount does it expect to collect? (dollars)`, ar - ar * p / 100,
        "Find the expected loss first, then take it away from the total.", "Net = gross - (percent × gross).",
        () => { const a = pick([20000, 30000]), b = pick([5, 10]); return `Example: ${a} - ${b}% of ${a} = ${a} - ${a * b / 100} = ${a - a * b / 100}. Now do yours.`; }); }
  ], [["Not everyone pays", "🧾", "Customers who buy on credit create <b>accounts receivable</b>. Some of them will never pay."], ["The allowance", "🛡️", "The <b>allowance for doubtful accounts</b> is an estimate of the unpaid part. It is subtracted from receivables."], ["Net receivables", "➖", "<b>Net receivables = gross receivables - allowance</b>. This is the amount the company really expects to collect."]]));

  l28.push(nL("Cost of goods sold", [
    () => { const B = pick([2000, 3000, 5000]), P = pick([10000, 14000, 20000]), E = pick([1000, 2000, 4000]); return q(`A shop starts with ${D(B)} of inventory, buys ${D(P)} more during the year and ends with ${D(E)}. What is the cost of goods sold? (dollars)`, B + P - E,
        "Goods the shop had to sell, minus the ones still on the shelf, were sold.", "Beginning inventory + purchases - ending inventory.",
        () => { const a = pick([1000, 1500]), b = pick([6000, 8000]), c = pick([500, 800]); return `Example: ${a} + ${b} - ${c} = ${a + b - c}. Now do yours.`; }); },
    () => { const S = pick([30000, 40000, 50000, 60000]), C = pick([18000, 22000, 28000]); return q(`Sales are ${D(S)} and the cost of goods sold is ${D(C)}. What is the gross profit? (dollars)`, S - C,
        "Gross profit is what is left after paying only for the goods.", "Sales minus cost of goods sold.",
        () => { const a = pick([25000, 35000]), b = pick([15000, 20000]); return `Example: ${a} - ${b} = ${a - b}. Now do yours.`; }); },
    () => { const B = pick([2000, 3000, 5000]), P = pick([10000, 14000, 20000]), C = pick([5000, 7000, 9000]); return q(`Beginning inventory is ${D(B)}, purchases are ${D(P)} and cost of goods sold is ${D(C)}. What is the ending inventory? (dollars)`, B + P - C,
        "What is left over after the sales is the ending inventory.", "Add beginning inventory and purchases, then take away the cost of goods sold.",
        () => { const a = pick([1000, 2500]), b = pick([7000, 9000]), c = pick([6000, 8000]); return `Example: ${a} + ${b} - ${c} = ${a + b - c}. Now do yours.`; }); }
  ], [["Goods available", "📦", "<b>Goods available for sale</b> = beginning inventory + purchases."], ["COGS", "🏷️", "<b>COGS = beginning inventory + purchases - ending inventory</b>. It is the cost of what was actually sold."], ["Gross profit", "💵", "<b>Gross profit = sales - COGS</b>. Operating costs like rent are taken out after this."]]));

  l28.push(nL("Days sales outstanding", [
    () => { const s = pick([73000, 146000, 219000, 365000]), d = pick([20, 30, 45, 60]); return q(`Yearly credit sales are ${D(s)} and accounts receivable are ${D(s * d / 365)}. Using 365 days, how many days sales are outstanding (DSO)? (days)`, d,
        "DSO says how many days it takes on average to collect from customers.", "DSO = receivables ÷ sales × 365.",
        () => { const a = pick([36500, 73000]), b = pick([10, 25]); return `Example: sales ${D(a)}, receivables ${D(a * b / 365)}. DSO = ${a * b / 365} ÷ ${a} × 365 = ${b} days. Now do yours.`; }); },
    () => { const s = pick([73000, 146000, 219000]), d = pick([15, 30, 40, 60]); return q(`A firm has yearly credit sales of ${D(s)} and a DSO of ${d} days. How much is in accounts receivable? (dollars, 365-day year)`, s * d / 365,
        "Turn the formula around: receivables come from DSO and sales.", "Receivables = sales ÷ 365 × DSO.",
        () => { const a = pick([36500, 109500]), b = pick([20, 50]); return `Example: sales ${D(a)}, DSO ${b}. Daily sales = ${a / 365}. Receivables = ${a / 365} × ${b} = ${a * b / 365}. Now do yours.`; }); },
    () => { const s = pick([73000, 146000, 219000]), d = pick([20, 30, 45]); return q(`A company sells ${D(s)} on credit in a 365-day year. It collects after ${d} days on average. About how many dollars of sales does it make per day? (dollars)`, s / 365,
        "Spread the whole year's sales evenly over the days.", "Divide yearly sales by 365.",
        () => { const a = pick([36500, 109500]); return `Example: ${D(a)} ÷ 365 = ${D(a / 365)} per day. Now do yours.`; }); }
  ], [["Slow payers", "⏳", "<b>Days sales outstanding (DSO)</b> measures how many days customers take to pay."], ["The formula", "🧮", "<b>DSO = accounts receivable ÷ credit sales × 365</b>."], ["Why it matters", "💧", "A lower DSO means cash comes in faster. A rising DSO can warn of customers who pay late."]]));

  l28.push(nL("Declining-balance depreciation", [
    () => { const c = pick([10000, 20000, 25000, 50000]), n = pick([4, 5, 10]); return q(`A machine costs ${D(c)} and has a ${n}-year life. Double-declining-balance uses twice the straight-line rate. What is year-1 depreciation? (dollars)`, c * 2 / n,
        "Straight-line rate is one divided by the number of years.", "Double the rate, then apply it to the full cost in year 1.",
        () => { const a = pick([30000, 12000]), b = pick([3, 6]); return `Example: life ${b} years, rate = 2 ÷ ${b}. Year 1 = ${a} × 2 ÷ ${b} = ${a * 2 / b}. Now do yours.`; }); },
    () => { const c = pick([10000, 20000, 50000]), n = pick([4, 5, 10]), d1 = c * 2 / n; return q(`A ${D(c)} machine uses double-declining-balance over ${n} years. Year-1 depreciation is ${D(d1)}. What is year-2 depreciation? (dollars)`, (c - d1) * 2 / n,
        "In year 2 the rate is applied to what is left, not the original cost.", "Book value after year 1 times the doubled rate.",
        () => { const a = pick([8000, 16000]), b = 4, d = a * 2 / b; return `Example: cost ${a}, 4-year life, year 1 = ${d}. Book value ${a - d}. Year 2 = ${a - d} × 2 ÷ 4 = ${(a - d) / 2}. Now do yours.`; }); },
    () => { const c = pick([10000, 20000, 50000]), n = pick([4, 5, 10]), d1 = c * 2 / n; return q(`A ${D(c)} machine uses double-declining-balance over ${n} years. What is its book value at the end of year 1? (dollars)`, c - d1,
        "Book value is cost minus the depreciation taken so far.", "First find year-1 depreciation using twice the straight-line rate.",
        () => { const a = pick([6000, 18000]), b = 3, d = a * 2 / b; return `Example: cost ${a}, 3-year life. Year 1 = ${a} × 2 ÷ 3 = ${d}, so book value = ${a} - ${d} = ${a - d}. Now do yours.`; }); }
  ], [["Faster write-off", "📉", "<b>Declining-balance</b> depreciation takes bigger amounts in the early years, when the asset is newest."], ["Double rate", "✌️", "Double-declining uses <b>2 ÷ life</b> as the rate and applies it to the current book value (cost minus depreciation so far)."], ["Same total", "🔁", "Over the whole life the total depreciation is still the cost (minus any salvage value). Only the timing changes."]]));

  l28.push(mcL("Accruals and deferrals", [
    ["A company pays $12,000 for a year of insurance on January 1. At that moment the payment is recorded as...", "a prepaid expense (an asset)", ["an expense for the full amount", "a liability"], "Did the company get something that still has value ahead?", "The coverage will be used up over the year, so the cost waits until then.", "Example: paying 6 months of rent in advance is first stored as an asset, then moved to expense month by month. Now do yours."],
    ["Employees worked the last week of December but are paid in January. At year-end the company records...", "accrued wages (a liability)", ["prepaid wages (an asset)", "unearned revenue"], "The work happened before the cash moved.", "Money is owed, so which side of the balance sheet does it go on?", "Example: a company owes interest it has not paid yet; that is an accrued liability. Now do yours."],
    ["A customer pays $600 in advance for a 12-month subscription not yet delivered. The company records...", "unearned revenue (a liability)", ["revenue for the full $600 now", "an accrued expense"], "The company has the cash but still owes the service.", "Revenue is only counted once the service is delivered.", "Example: a gym gets a year's fee in January; it owes 12 months of service. Now do yours."],
    ["A bank earned interest on a deposit in December but will receive it in January. December records...", "accrued revenue (an asset)", ["unearned revenue", "a prepaid expense"], "The money was earned but is not yet in hand.", "Something is owed TO the company, so it is a claim it owns.", "Example: work finished in December and billed in January is accrued revenue. Now do yours."],
    ["Which is an example of a deferral rather than an accrual?", "paying a year of rent up front", ["wages earned but not yet paid", "interest earned but not yet received"], "In a deferral the cash moves FIRST.", "Look for the choice where the payment happened before the use.", "Example: buying a 2-year software license today is a deferral. Now do yours."],
    ["An accrual means recording income or expense...", "before the cash moves", ["only when the cash moves", "once a year"], "It is about when the event happened, not when money changed hands.", "Accrual accounting matches things to the period they belong to.", "Example: December electricity used and paid in January is recorded in December. Now do yours."],
    ["Unearned revenue becomes revenue when...", "the company delivers the product or service", ["the customer pays", "the year ends automatically"], "Revenue is about earning, not receiving.", "Think of what the customer is waiting for.", "Example: a school gets a year's tuition up front and earns it month by month as it teaches. Now do yours."]
  ], [["Timing differences", "🕒", "Cash does not always move in the same period as the event. Accrual accounting fixes the timing."], ["Accruals", "📬", "An <b>accrual</b> records something that has happened but has not been paid yet: wages owed, interest earned."], ["Deferrals", "📦", "A <b>deferral</b> is cash paid or received first: prepaid insurance (asset), unearned revenue (liability). It is recognized later."]]));

  l28.push(mcL("Bonds at a discount or premium", [
    ["A bond pays a 4% coupon but new bonds pay 6%. The old bond will sell at a...", "discount (below face value)", ["premium (above face value)", "price equal to face value"], "Would buyers pay full price for a lower payment than they can get elsewhere?", "A weaker payment needs a lower price to be attractive.", "Example: a 3% bond when new ones pay 5% sells below its face value. Now do yours."],
    ["A bond pays a 7% coupon but the market rate is 5%. The bond will sell at a...", "premium (above face value)", ["discount (below face value)", "price equal to face value"], "Compare what it pays with what new bonds pay.", "A better-than-market payment is worth extra.", "Example: an 8% bond when the market rate is 6% sells above its face value. Now do yours."],
    ["A bond's coupon rate equals the market rate. It sells at...", "par (face value)", ["a discount", "a premium"], "There is no gain or loss in switching to a new bond.", "Equal payments mean no reason to pay extra or less.", "Example: a 5% bond when the market rate is 5% sells at face value. Now do yours."],
    ["A bond sells at a premium. This tells you its coupon rate is...", "above current market yields", ["below current market yields", "zero"], "A premium means buyers are paying extra for it.", "What would make buyers pay extra?", "Example: bonds trading above face value are paying more than new bonds do. Now do yours."],
    ["A company issues a bond at a discount. At issue it receives...", "less than the face value", ["more than the face value", "exactly the face value"], "Discount means a reduced price.", "The company still repays the full face amount at maturity.", "Example: a $1,000 bond sold for $920 gives the issuer $920 today. Now do yours."],
    ["A $1,000 face-value bond was bought for $950 and now matures. The holder receives...", "$1,000", ["$950", "$1,050"], "Maturity repays a fixed amount written on the bond.", "That amount is the face value, not the price paid.", "Example: a bond bought for $980 still repays its $1,000 face at maturity. Now do yours."],
    ["As a discount bond gets closer to maturity, its price usually...", "moves up toward face value", ["moves down toward zero", "stays far below face value"], "At maturity the price must equal what the bond repays.", "The gap closes as time passes.", "Example: a bond at $900 with 10 years left drifts toward $1,000 as maturity nears. Now do yours."]
  ], [["Coupon vs market", "🎟️", "A bond's <b>coupon rate</b> is fixed. The <b>market rate</b> changes. The price adjusts so buyers earn the market rate."], ["Discount and premium", "↕️", "Coupon below market: the bond sells at a <b>discount</b>. Coupon above market: a <b>premium</b>. Equal: <b>par</b>."], ["Pull to par", "🎯", "As maturity nears, the price moves toward the <b>face value</b>, which is repaid at the end."]]));

  l28.push(nL("Times interest earned", [
    () => { const i = pick([2000, 5000, 10000]), t = pick([2, 3, 4, 6]); return q(`A company has operating profit (EBIT) of ${D(i * t)} and interest expense of ${D(i)}. What is its times interest earned ratio? (a number)`, t,
        "It shows how many times profit could pay the interest bill.", "TIE = EBIT ÷ interest expense.",
        () => { const a = pick([3000, 4000]), b = pick([2, 5]); return `Example: EBIT ${D(a * b)}, interest ${D(a)}. TIE = ${a * b} ÷ ${a} = ${b}. Now do yours.`; }); },
    () => { const i = pick([2000, 5000, 10000]), t = pick([2, 3, 5]); return q(`A firm pays ${D(i)} a year in interest and its times interest earned ratio is ${t}. What is its EBIT? (dollars)`, i * t,
        "Turn the ratio around to find the profit.", "EBIT = TIE × interest expense.",
        () => { const a = pick([1000, 4000]), b = pick([4, 6]); return `Example: interest ${D(a)}, TIE ${b}, so EBIT = ${a} × ${b} = ${a * b}. Now do yours.`; }); },
    () => { const t = pick([1, 2, 4, 8]), i = pick([3000, 6000]); return q(`Company A earns ${D(i * t)} before interest and taxes and owes ${D(i)} in interest. How many times can it cover its interest? (a number)`, t,
        "Divide what it earns by what it owes in interest.", "A ratio under 1 would mean it can't even pay the interest from profit.",
        () => { const a = pick([2500, 5000]), b = pick([3, 5]); return `Example: ${a * b} ÷ ${a} = ${b}. Now do yours.`; }); }
  ], [["Can it pay the interest?", "🏦", "Lenders want to know if profits are big enough to cover interest."], ["The ratio", "➗", "<b>Times interest earned = EBIT ÷ interest expense</b>."], ["Reading it", "🚦", "A high ratio means a safe cushion. A ratio near or below 1 is a warning sign."]]));

  l28.push(nL("Asset turnover", [
    () => { const b = pick([40000, 60000, 80000]), e = pick([60000, 80000, 100000]), t = pick([1, 2, 3]), av = (b + e) / 2; return q(`A company's assets were ${D(b)} at the start of the year and ${D(e)} at the end. Its sales were ${D(av * t)}. What is its asset turnover? (a number)`, t,
        "First find the average amount of assets for the year.", "Asset turnover = sales ÷ average total assets.",
        () => { const a = 50000, c = 70000, s = pick([60000, 120000]); return `Example: average assets = (${a} + ${c}) ÷ 2 = 60000. Sales ${s}, so turnover = ${s} ÷ 60000 = ${s / 60000}. Now do yours.`; }); },
    () => { const av = pick([50000, 80000, 100000]), t = pick([1, 2, 3, 4]); return q(`Average total assets are ${D(av)} and asset turnover is ${t}. What are the sales? (dollars)`, av * t,
        "Turnover tells how many dollars of sales each asset dollar made.", "Sales = turnover × average assets.",
        () => { const a = pick([20000, 40000]), c = pick([2, 5]); return `Example: ${a} × ${c} = ${a * c}. Now do yours.`; }); },
    () => { const b = pick([40000, 60000]), e = pick([80000, 100000, 120000]); return q(`Total assets were ${D(b)} at the start of a year and ${D(e)} at the end. What were the average total assets? (dollars)`, (b + e) / 2,
        "An average uses both the beginning and ending amounts.", "Add them and divide by two.",
        () => { const a = pick([30000, 50000]), c = pick([70000, 90000]); return `Example: (${a} + ${c}) ÷ 2 = ${(a + c) / 2}. Now do yours.`; }); }
  ], [["Using assets well", "🏭", "<b>Asset turnover</b> shows how many dollars of sales a company makes from each dollar of assets."], ["The formula", "🧮", "<b>Asset turnover = sales ÷ average total assets</b>. Average assets = (beginning + ending) ÷ 2."], ["Compare like with like", "🔎", "Grocery stores turn assets over fast; utilities with giant plants turn them slowly. Compare firms in the same industry."]]));

  l28.push(nL("Profitability index", [
    () => { const p = pick([[250, 200], [150, 100], [300, 200], [120, 100], [450, 300], [90, 100]]); return q(`A project costs ${D(p[1])} thousand. The present value of its future cash inflows is ${D(p[0])} thousand. What is the profitability index? (a number)`, r2(p[0] / p[1]),
        "It compares what the project returns, in today's money, with what it costs.", "PI = present value of inflows ÷ initial cost.",
        () => { const a = pick([[160, 100], [300, 250]]); return `Example: ${a[0]} ÷ ${a[1]} = ${r2(a[0] / a[1])}. Now do yours.`; }); },
    () => { const a = pick([100, 200, 300]), b = pick([100, 200]), c = pick([100, 200, 250]); return q(`A project pays ${D(r2(a * 1.1))} in year 1 and ${D(r2(b * 1.21))} in year 2, discounted at 10%. Their present values are ${D(a)} and ${D(b)}. The project costs ${D(c)}. What is the profitability index? (a number)`, r2((a + b) / c),
        "Add up the present values of the inflows first.", "Then divide that total by the starting cost.",
        () => { const x = 150, y = 100, z = 125; return `Example: present values ${x} + ${y} = ${x + y}, cost ${z}, PI = ${x + y} ÷ ${z} = ${r2((x + y) / z)}. Now do yours.`; }); },
    () => { const c = pick([200, 400, 500]), p = pick([1.25, 1.5, 2]); return q(`A project costs ${D(c)} thousand and has a profitability index of ${p}. What is the present value of its inflows, in thousands? (thousands of dollars)`, r2(c * p),
        "Turn the PI formula around.", "Present value of inflows = PI × initial cost.",
        () => { const a = pick([100, 300]), b = pick([1.2, 1.5]); return `Example: cost ${a}, PI ${b}, inflows = ${a} × ${b} = ${r2(a * b)}. Now do yours.`; }); }
  ], [["Value per dollar", "💲", "The <b>profitability index (PI)</b> shows the present value you get for each dollar invested."], ["The rule", "📏", "<b>PI = PV of inflows ÷ initial cost</b>. If PI is above 1, the NPV is positive."], ["When money is limited", "🎒", "If a firm can only fund some projects, ranking by PI picks the most value per dollar."]]));

  l28.push(mcL("Capital budgeting rules", [
    ["A project's NPV is positive. Under the NPV rule the firm should...", "accept it", ["reject it", "wait for payback to equal zero"], "Positive NPV means value is added after paying the required return.", "Think about whether the project creates or destroys value.", "Example: a project with NPV of +$20,000 adds $20,000 in value, so accept. Now do yours."],
    ["A project has an IRR of 14% and the hurdle rate is 10%. The IRR rule says to...", "accept it", ["reject it", "ignore the hurdle rate"], "Compare the project's return with the required return.", "A return above the requirement passes the test.", "Example: IRR 12% against a 9% hurdle passes. Now do yours."],
    ["Two mutually exclusive projects have the same risk. A has NPV $40,000 and B has NPV $55,000. Choose...", "B, because it adds more value", ["A, because it is smaller", "both of them"], "Mutually exclusive means only one can be chosen.", "Pick the one that adds the most value.", "Example: NPV $10,000 vs NPV $30,000 for the same cost: pick the higher NPV. Now do yours."],
    ["A project has a profitability index of 0.9. The firm should...", "reject it, because inflows are worth less than the cost", ["accept it, because PI is positive", "accept it, because 0.9 is close to 1"], "Compare the index with the break-even level.", "A value under the break-even level means present value falls short of cost.", "Example: PI of 0.8 means $0.80 of value per $1 spent, so reject. Now do yours."],
    ["If the discount rate is raised, a project's NPV usually...", "gets smaller", ["gets larger", "does not change"], "Future cash is worth less when discounted at a higher rate.", "The cost is paid today, but the inflows are later.", "Example: $110 in a year is worth $100 at 10% but only $95.65 at 15%. Now do yours."],
    ["Why do many finance teachers prefer NPV to simple payback?", "NPV counts all cash flows and the time value of money", ["NPV is faster to calculate", "NPV ignores risk"], "Think about what payback leaves out.", "Payback stops counting after the cost is recovered.", "Example: two projects can have the same payback but very different later cash. Now do yours."],
    ["Capital rationing means...", "the firm has limited funds and must choose the best projects", ["every project must be accepted", "projects are chosen at random"], "'Rationing' means there is not enough to go around.", "So the firm must rank and select.", "Example: with $1 million for $3 million of good projects, only some can go ahead. Now do yours."]
  ], [["Decision rules", "🧭", "Firms use rules to decide on projects: <b>NPV &gt; 0</b>, <b>IRR &gt; hurdle rate</b>, <b>PI &gt; 1</b> all say 'accept'."], ["Choosing between projects", "⚖️", "When only one project can be chosen (mutually exclusive), pick the one with the <b>higher NPV</b>."], ["Why NPV leads", "🏆", "NPV uses all the cash flows, accounts for timing and measures value added in dollars."]]));

  l28.push(nL("Cost of equity from dividends", [
    () => { const t = pick([[2, 50], [2, 40], [1, 25], [4, 80], [3, 60], [3, 30]]), g = pick([3, 4, 5, 6]); return q(`A stock costs ${D(t[1])} and will pay a dividend of ${D(t[0])} next year. Dividends are expected to grow ${g}% a year. What is the cost of equity (r = D1 ÷ P + g)? (percent)`, r2(t[0] / t[1] * 100 + g),
        "The cost of equity is the dividend yield plus the growth rate.", "Find the dividend yield as a percent first: D1 divided by price.",
        () => { const a = pick([[2, 40], [1, 20]]), b = pick([2, 5]); return `Example: yield = ${a[0]} ÷ ${a[1]} = ${r2(a[0] / a[1] * 100)}%. Add growth ${b}% to get ${r2(a[0] / a[1] * 100 + b)}%. Now do yours.`; }); },
    () => { const t = pick([[2, 50], [2, 40], [1, 25], [4, 80]]), g = pick([2, 3, 5]); const d0 = t[0] / (1 + g / 100); return q(`A firm will pay next year's dividend (D1) of ${D(t[0])} on a share priced at ${D(t[1])}. If its cost of equity is ${r2(t[0] / t[1] * 100 + g)}%, what dividend growth rate (percent) does the model assume? (percent)`, g,
        "Turn the formula around: growth is what is left after the dividend yield.", "g = r - (D1 ÷ P), all in percent.",
        () => { const a = pick([[1, 20], [3, 60]]), b = pick([4, 6]); return `Example: yield ${r2(a[0] / a[1] * 100)}%, cost of equity ${r2(a[0] / a[1] * 100 + b)}%, so g = ${b}%. Now do yours.`; }); }
  ], [["What shareholders expect", "📈", "The <b>cost of equity</b> is the return shareholders require. For a stock with growing dividends, the model gives it directly."], ["The formula", "🧮", "<b>r = D1 ÷ P + g</b>: next year's dividend yield plus the expected growth rate."], ["A simple model", "⚠️", "This works only for steady dividend growers. Many companies pay no dividends, so other models are used too."]]));

  l28.push(nL("Dividend discount model", [
    () => { const D1 = pick([1, 2, 3, 4, 5]), sp = pick([2, 4, 5, 10]), g = pick([2, 3, 4, 5]); return q(`A stock pays a dividend of ${D(D1)} next year. Investors require ${g + sp}% and dividends grow ${g}% a year forever. What is the stock worth using P = D1 ÷ (r - g)? (dollars)`, D1 * 100 / sp,
        "The price depends on the dividend and the gap between required return and growth.", "Subtract growth from the required return, as a decimal, then divide the dividend by it.",
        () => { const a = pick([2, 6]), b = pick([4, 5]); return `Example: dividend ${D(a)}, r - g = ${b}% = ${b / 100}. Price = ${a} ÷ ${b / 100} = ${D(a * 100 / b)}. Now do yours.`; }); },
    () => { const sp = pick([4, 5, 8]), P = pick([20, 40, 50]), g = pick([2, 3, 4]); return q(`A stock is worth ${D(P)} and investors require ${g + sp}% with ${g}% dividend growth. What next-year dividend does the model imply? (dollars)`, r2(P * sp / 100),
        "Rearrange P = D1 ÷ (r - g) to find the dividend.", "D1 = price × (r - g), with the gap as a decimal.",
        () => { const a = pick([30, 60]), b = pick([5, 10]); return `Example: price ${D(a)}, r - g = ${b}%. D1 = ${a} × ${b / 100} = ${D(r2(a * b / 100))}. Now do yours.`; }); },
    () => { const D1 = pick([2, 3]), g = pick([2, 4]), r1 = g + 4, r2_ = g + 8; return q(`Two investors value a stock paying ${D(D1)} next year with ${g}% growth. Investor A requires ${r1}%. What is the value to Investor A, who requires the lower return? (dollars)`, D1 * 25,
        "The gap between required return and growth is what matters.", "Gap = r - g. The smaller the gap, the larger the value.",
        () => { const a = pick([1, 4]); return `Example: dividend ${D(a)}, gap 5% gives ${D(a * 20)}; gap 10% would give ${D(a * 10)}. Now do yours.`; }); }
  ], [["Value from dividends", "💰", "The <b>dividend discount model</b> says a stock is worth the present value of all future dividends."], ["Constant growth", "📐", "If dividends grow at a steady rate g forever: <b>P = D1 ÷ (r - g)</b>. It only works when r is bigger than g."], ["Sensitive", "🎚️", "Small changes in r or g change the price a lot, so the model gives rough guides, not exact answers."]]));

  l28.push(nL("Cash conversion cycle", [
    () => { const di = pick([40, 50, 60]), ds = pick([25, 30, 40]), dp = pick([20, 25, 30, 35]); return q(`A company holds inventory for ${di} days (DIO), collects from customers in ${ds} days (DSO) and pays suppliers in ${dp} days (DPO). What is its cash conversion cycle? (days)`, di + ds - dp,
        "The cycle is how long cash is tied up between paying and collecting.", "Add the inventory and collection days, then subtract the days taking to pay suppliers.",
        () => { const a = 45, b = 30, c = pick([15, 25]); return `Example: ${a} + ${b} - ${c} = ${a + b - c} days. Now do yours.`; }); },
    () => { const di = pick([40, 50, 60]), ds = pick([25, 30, 40]), cc = pick([30, 45, 50]); return q(`A company has DIO ${di} days, DSO ${ds} days and a cash conversion cycle of ${cc} days. How many days does it take to pay suppliers (DPO)? (days)`, di + ds - cc,
        "Turn the formula around to find the days payable.", "DPO = DIO + DSO - cycle length.",
        () => { const a = 50, b = 30, c = pick([40, 55]); return `Example: DIO ${a}, DSO ${b}, cycle ${c}: DPO = ${a} + ${b} - ${c} = ${a + b - c}. Now do yours.`; }); }
  ], [["Cash in limbo", "⏱️", "A firm buys inventory, sells it, then waits for payment. Cash is tied up during that time."], ["The formula", "🧮", "<b>Cash conversion cycle = DIO + DSO - DPO</b> (inventory days + collection days - payment days)."], ["Shorter is better", "⚡", "A shorter cycle means the business needs less money to run. Negotiating longer payment terms with suppliers shortens it."]]));

  l28.push(nL("Risk of two outcomes", [
    () => { const a = pick([10, 14, 18, 20]), b = pick([-6, -2, 2, 4]); return q(`An investment returns ${a}% in a good year and ${b}% in a bad year, each equally likely. What is its expected return? (percent)`, (a + b) / 2,
        "Equal chances mean a simple average.", "Add the two returns and divide by two.",
        () => { const x = pick([8, 12]), y = pick([0, 4]); return `Example: (${x} + ${y}) ÷ 2 = ${(x + y) / 2}%. Now do yours.`; }); },
    () => { const m = pick([4, 6, 8]), s = pick([2, 4, 6, 10]); return q(`An investment returns ${m + s}% or ${m - s}% with equal chances. The standard deviation measures the typical distance from the average. What is it? (percent)`, s,
        "Find the average first, then see how far each outcome is from it.", "With two equal outcomes, each is the same distance from the average.",
        () => { const a = pick([3, 7]), b = pick([5, 9]); return `Example: returns ${a + b}% and ${a - b}%. Average ${a}%, each is ${b} away, so SD is ${b}%. Now do yours.`; }); },
    () => { const s1 = pick([4, 6]), s2 = pick([10, 14]); return q(`Fund A has a standard deviation of ${s1}% and Fund B has ${s2}%. By how many percentage points is B's standard deviation higher? (points)`, s2 - s1,
        "A bigger standard deviation means more up-and-down.", "Subtract the smaller from the larger.",
        () => { const a = pick([5, 7]), b = pick([12, 15]); return `Example: ${b} - ${a} = ${b - a}. Now do yours.`; }); }
  ], [["Average and spread", "🎢", "Two numbers describe an investment: the <b>expected return</b> (average) and the <b>standard deviation</b> (how bumpy)."], ["Two equal outcomes", "🪙", "If a return is either high or low with equal chance, the average is the middle. The standard deviation is half the gap between them."], ["More spread, more risk", "📊", "A higher standard deviation means results can land far from the average, up or down."]]));

  l28.push(mcL("Diversification", [
    ["Risk that affects only one company, such as a factory fire, is called...", "unsystematic (company-specific) risk", ["systematic (market) risk", "inflation risk only"], "It is not shared by the whole market.", "It can be reduced by holding many different companies.", "Example: a lawsuit hurting one firm is company-specific. Now do yours."],
    ["Risk that affects the whole market, like a recession, is called...", "systematic (market) risk", ["unsystematic risk", "company-specific risk"], "It hits nearly everything at once.", "Owning more stocks does not remove it.", "Example: a sharp rise in interest rates touches most firms. Now do yours."],
    ["Which risk can diversification reduce?", "company-specific risk", ["market-wide risk", "both fully"], "Think about what spreading money across firms cancels out.", "Bad news at one firm is offset by other firms.", "Example: if one of 50 firms stumbles, the other 49 soften the blow. Now do yours."],
    ["Holding 30 stocks in different industries compared with holding one stock gives...", "less company-specific risk", ["more company-specific risk", "no change in any risk"], "Spreading out reduces the damage of one failure.", "Compare one basket with many baskets.", "Example: an egg basket with 12 eggs breaks worse than 12 separate baskets. Now do yours."],
    ["Putting all savings into stocks of a single industry is risky because...", "one industry-wide problem hurts every holding", ["stocks never rise", "industries have no risk"], "The holdings may all react to the same event.", "That is not much spreading.", "Example: a fall in oil prices hits all oil companies together. Now do yours."],
    ["Diversification works best when assets...", "do not all move together", ["move exactly together", "are all identical"], "If one falls, you want another to hold steady or rise.", "Look at how closely the investments follow each other.", "Example: umbrella and sunscreen sellers do well in different weather. Now do yours."],
    ["Diversification can't remove...", "the risk the whole market shares", ["every kind of risk", "risk from a single company"], "Some risk hits everything at once.", "It's the part you are paid to take.", "Example: a market crash lowers almost all stocks. Now do yours."]
  ], [["Don't bet on one thing", "🧺", "<b>Diversifying</b> means spreading money across many investments."], ["Two kinds of risk", "⚡", "<b>Company-specific risk</b> can be spread away. <b>Market (systematic) risk</b> cannot."], ["Not moving together", "🔀", "The less assets move in step, the more diversification helps."]]));

  l28.push(nL("Operating leverage", [
    () => { const oi = pick([10000, 20000, 30000]), d = pick([2, 3, 4]); return q(`A company's contribution margin is ${D(oi * d)} and its operating income is ${D(oi)}. What is its degree of operating leverage (contribution margin ÷ operating income)? (a number)`, d,
        "This ratio shows how strongly profit reacts to sales.", "Divide the contribution margin by operating income.",
        () => { const a = pick([5000, 15000]), b = pick([2, 5]); return `Example: ${a * b} ÷ ${a} = ${b}. Now do yours.`; }); },
    () => { const d = pick([2, 3, 4, 5]), s = pick([2, 4, 5, 10]); return q(`A firm has an operating leverage of ${d}. If sales rise ${s}%, by about what percent does operating income rise? (percent)`, d * s,
        "High leverage magnifies changes in sales.", "% change in operating income = leverage × % change in sales.",
        () => { const a = pick([2, 6]), b = pick([3, 5]); return `Example: leverage ${a}, sales up ${b}%, so profit up ${a} × ${b} = ${a * b}%. Now do yours.`; }); },
    () => { const oi = pick([8000, 12000, 20000]), d = pick([2, 3, 5]); return q(`Operating income is ${D(oi)} and operating leverage is ${d}. What is the contribution margin? (dollars)`, oi * d,
        "Turn the ratio around.", "Contribution margin = leverage × operating income.",
        () => { const a = pick([4000, 6000]), b = pick([3, 4]); return `Example: ${a} × ${b} = ${a * b}. Now do yours.`; }); }
  ], [["Fixed costs matter", "🏗️", "Firms with large <b>fixed costs</b> keep more of each extra sale as profit, but they also lose more when sales fall."], ["The measure", "🧮", "<b>Degree of operating leverage = contribution margin ÷ operating income</b>."], ["Magnifier", "🔍", "<b>% change in operating income = DOL × % change in sales</b>. It works in both directions."]]));

  l28.push(nL("Cash budget", [
    () => { const b = pick([4000, 6000, 8000]), r = pick([10000, 14000, 20000]), p = pick([9000, 11000, 13000]); return q(`A shop begins the month with ${D(b)}, expects ${D(r)} in cash receipts and ${D(p)} in cash payments. What is its expected ending cash? (dollars)`, b + r - p,
        "Start with cash on hand, add what comes in, take out what goes out.", "Beginning cash + receipts - payments.",
        () => { const x = pick([3000, 5000]), y = pick([7000, 9000]), z = pick([6000, 8000]); return `Example: ${x} + ${y} - ${z} = ${x + y - z}. Now do yours.`; }); },
    () => { const b = pick([4000, 5000]), r = pick([10000, 12000]), p = pick([12000, 14000]); const end = b + r - p, mn = end + pick([2000, 3000, 4000]); return q(`A firm expects ending cash of ${D(end)} but wants a minimum of ${D(mn)}. How much must it borrow to reach the minimum? (dollars)`, mn - end,
        "Compare the expected cash with the target.", "Borrow the shortfall: minimum minus expected ending cash.",
        () => { const a = pick([1500, 2500]), c = pick([4000, 5500]); return `Example: expected ${a}, minimum ${c}, borrow ${c} - ${a} = ${c - a}. Now do yours.`; }); }
  ], [["Planning cash", "🗓️", "A <b>cash budget</b> forecasts cash coming in and going out, month by month."], ["The formula", "🧮", "<b>Ending cash = beginning cash + receipts - payments</b>."], ["Spot gaps early", "🚧", "If ending cash falls below the minimum the business wants, it can arrange a loan before it runs short."]]));

  l28.push(mixOf("Mixed practice", [l28[0], l28[1], l28[2], l28[3], l28[4], l28[5], l28[6], l28[7]]));
  l28.push(mixOf("Level 28 Challenge", [l28[8], l28[9], l28[10], l28[11], l28[12], l28[13], l28[14], l28[15], l28[16], l28[17]]));

  // ======================= LEVEL 29 (college year 2, first half) =======================
  const l29 = [];

  l29.push(nL("Holding period return", [
    () => { const s = pick([50, 100, 200, 250]), p = pick([4, 6, 8, 10, 12]), d = r2(s * 0.02), e = r2(s * (1 + p / 100) - d); return q(`A share is bought for ${D(s)}, pays ${D(d)} in dividends and is sold for ${D(e)}. What is the holding period return? (percent)`, p,
        "The gain comes from both the price change and the dividends.", "HPR = (ending price - starting price + dividends) ÷ starting price × 100.",
        () => { const a = pick([40, 80]), b = a + 4, c = 2; return `Example: bought ${D(a)}, sold ${D(b)}, dividends ${D(c)}. Gain = ${b - a + c}. HPR = ${b - a + c} ÷ ${a} × 100 = ${r2((b - a + c) / a * 100)}%. Now do yours.`; }); },
    () => { const s = pick([40, 50, 80]), p = pick([10, 25, 50]); return q(`A fund share bought for ${D(s)} is later worth ${D(r2(s * (1 + p / 100)))} and paid no income. What was the return? (percent)`, p,
        "Return is the gain compared with what you paid.", "Gain ÷ starting value × 100.",
        () => { const a = pick([20, 60]), b = pick([5, 15]); return `Example: ${D(a)} grows to ${D(a + b)}; gain ${b}, ${b} ÷ ${a} × 100 = ${r2(b / a * 100)}%. Now do yours.`; }); }
  ], [["Total return", "🎁", "An investment can pay you in two ways: the <b>price rises</b> and it pays <b>dividends or interest</b>."], ["The formula", "🧮", "<b>HPR = (ending value - starting value + income) ÷ starting value</b>. Multiply by 100 for a percent."], ["Include everything", "✅", "Looking only at the price change misses the income part of the return."]]));

  l29.push(nL("Arithmetic average return", [
    () => { const m = pick([4, 6, 8, 10]), d1 = pick([2, 5, 8]), d2 = pick([3, 6, 12]); const a = shuf([m + d1, m - d1, m + d2, m - d2]); return q(`A fund returned ${a.map(x => x + "%").join(", ")} in four years. What was its arithmetic average yearly return? (percent)`, m,
        "Add the four yearly returns, keeping the signs, then share equally.", "Total ÷ 4.",
        () => { const x = [pick([5, 7]), pick([9, 11]), pick([1, 3]), pick([13, 15])]; const s = x.reduce((u, v) => u + v, 0); return `Example: ${x.join(" + ")} = ${s}. ${s} ÷ 4 = ${s / 4}%. Now do yours.`; }); },
    () => { const m = pick([5, 6, 8]), t = m * 3; const a = pick([2, 4]), b = pick([1, 3]); return q(`A stock returned ${m + a}% in year 1 and ${m - a - b}% in year 2. Its three-year average was ${m}%. What was year 3's return? (percent)`, t - (m + a) - (m - a - b),
        "The three returns must add up to three times the average.", "Subtract the two known returns from the total.",
        () => { const x = 6, y = 4, z = 3; return `Example: average ${x} over ${z} years = ${x * z} total. Known ${y} and ${y + 2}; the last = ${x * z - y - y - 2}. Now do yours.`; }); }
  ], [["The simple average", "➕", "The <b>arithmetic average</b> adds the returns and divides by how many there are."], ["Average of what?", "🎯", "It describes a typical single year. It does not tell you what your money actually grew by over several years."], ["Ups and downs", "📉", "Because of compounding, steady growth ends higher than ups and downs with the same arithmetic average."]]));

  l29.push(nL("The Sharpe ratio", [
    () => { const S = pick([0.5, 1, 1.5, 2]), sd = pick([4, 8, 10, 12, 20]), rf = pick([1, 2, 3, 4]); return q(`A fund returned ${rf + S * sd}% with a standard deviation of ${sd}%. The risk-free rate is ${rf}%. What is its Sharpe ratio? (a number)`, S,
        "The Sharpe ratio measures reward per unit of risk.", "(Return - risk-free rate) ÷ standard deviation.",
        () => { const a = pick([[9, 3, 6], [14, 4, 5]]); return `Example: return ${a[0]}%, risk-free ${a[1]}%, SD ${a[2]}%. (${a[0]} - ${a[1]}) ÷ ${a[2]} = ${r2((a[0] - a[1]) / a[2])}. Now do yours.`; }); },
    () => { const S = pick([0.5, 1, 1.5]), sd = pick([8, 10, 12]), rf = pick([2, 3]); return q(`A portfolio has a Sharpe ratio of ${S}, a standard deviation of ${sd}% and the risk-free rate is ${rf}%. What is its return? (percent)`, rf + S * sd,
        "Work backwards from the formula.", "Return = risk-free rate + Sharpe × standard deviation.",
        () => { const a = pick([[1, 4, 6], [2, 5, 10]]); return `Example: Sharpe ${a[0] / 2 + 0.5}, SD ${a[2]}%, risk-free ${a[1]}%. Return = ${a[1]} + ${a[0] / 2 + 0.5} × ${a[2]} = ${r2(a[1] + (a[0] / 2 + 0.5) * a[2])}%. Now do yours.`; }); },
    () => { const rp = pick([8, 10, 12, 14]), rf = pick([2, 3, 4]); return q(`A fund returned ${rp}% while the risk-free rate was ${rf}%. How many percentage points of excess return did it earn? (points)`, rp - rf,
        "Excess return means the extra reward above a safe investment.", "Subtract the risk-free rate from the fund's return.",
        () => { const a = pick([9, 13]), b = pick([1, 3]); return `Example: ${a} - ${b} = ${a - b}. Now do yours.`; }); }
  ], [["Reward for risk", "🏅", "The <b>Sharpe ratio</b> measures extra return earned for each unit of risk taken."], ["The formula", "🧮", "<b>Sharpe = (portfolio return - risk-free rate) ÷ standard deviation</b>."], ["Comparing funds", "⚖️", "A higher Sharpe ratio means better risk-adjusted performance. A fund with a big return and huge risk can still score low."]]));

  l29.push(nL("Portfolio beta", [
    () => { const w = pick([25, 40, 50, 60, 75]), b1 = pick([0.5, 1, 1.5, 2]), b2 = pick([0.5, 1, 1.5]); return q(`A portfolio is ${w}% in a stock with beta ${b1} and ${100 - w}% in a stock with beta ${b2}. What is the portfolio beta? (a number)`, r2(w / 100 * b1 + (100 - w) / 100 * b2),
        "Portfolio beta is a weighted average of the betas.", "Multiply each beta by its share of the portfolio, then add.",
        () => { const a = pick([[50, 1.2, 0.8], [30, 1, 2]]); return `Example: ${a[0]}% × ${a[1]} + ${100 - a[0]}% × ${a[2]} = ${r2(a[0] / 100 * a[1])} + ${r2((100 - a[0]) / 100 * a[2])} = ${r2(a[0] / 100 * a[1] + (100 - a[0]) / 100 * a[2])}. Now do yours.`; }); },
    () => { const w = pick([20, 40, 50, 60, 80]), b = pick([1.5, 2, 1.25]); return q(`${w}% of a portfolio is in a stock with beta ${b} and the rest is in cash, which has a beta of 0. What is the portfolio beta? (a number)`, r2(w / 100 * b),
        "Cash adds nothing to market sensitivity.", "Beta of the stock times its share of the portfolio.",
        () => { const a = pick([30, 70]), c = pick([1, 2]); return `Example: ${a}% × ${c} = ${r2(a / 100 * c)}. Now do yours.`; }); }
  ], [["Sensitivity to the market", "🌊", "<b>Beta</b> measures how much a stock tends to move when the market moves. Beta 1 means moves with the market; 2 means twice as much."], ["Portfolios", "🧺", "<b>Portfolio beta = sum of (weight × beta)</b> for each holding."], ["Cash lowers beta", "🧊", "Holding cash (beta 0) pulls the portfolio beta down."]]));

  l29.push(mcL("Correlation and diversification", [
    ["Two assets with a correlation of +1 move...", "perfectly together", ["in opposite directions", "independently"], "The sign of the number tells direction; the size tells how tightly.", "The maximum value means a perfect match.", "Example: two coins that always land the same way are perfectly in step. Now do yours."],
    ["Two assets with a correlation of -1 move...", "exactly opposite to each other", ["exactly together", "with no pattern"], "A minus sign means the opposite direction.", "The maximum size means a perfect opposite.", "Example: a seesaw is perfectly opposite. Now do yours."],
    ["Two assets with a correlation near 0 have...", "no clear linear relationship", ["a perfect link", "opposite moves every time"], "The number is in the middle of its range.", "Knowing one tells you almost nothing about the other.", "Example: a stock's return and the number of leaves on a tree have no real link. Now do yours."],
    ["Which pair gives the biggest diversification benefit?", "correlation of -0.5", ["correlation of +0.9", "correlation of +1.0"], "Look for assets that do NOT move together.", "Lower correlation means more cancelling out.", "Example: of correlations +0.8, +0.2, -0.3, the -0.3 pair helps most. Now do yours."],
    ["For two assets with correlation +1, the portfolio's standard deviation equals...", "the weighted average of their standard deviations", ["less than the weighted average", "more than the weighted average"], "Perfectly matching moves leave nothing to cancel.", "So there is no diversification gain.", "Example: two identical funds mixed together have the same risk as either one. Now do yours."],
    ["Correlation can take values from...", "-1 to +1", ["0 to 1", "-100 to +100"], "It has a lowest and highest possible value, both with a sign.", "The extremes are perfect opposite and perfect match.", "Example: correlations like 0.3 and -0.7 are fine; 2.5 is impossible. Now do yours."],
    ["Stocks in the same industry usually have a correlation that is...", "positive and fairly high", ["close to -1", "exactly zero"], "They face the same customers, costs and news.", "So they often rise and fall together.", "Example: two airlines tend to react alike to fuel prices. Now do yours."]
  ], [["Moving in step", "🕺", "<b>Correlation</b> measures how two assets move relative to each other, from -1 to +1."], ["Lower is better", "🧩", "The lower the correlation, the more the ups of one offset the downs of the other, so the portfolio is calmer."], ["No free lunch at +1", "🚫", "If correlation is +1, mixing assets does not reduce risk below the average of their risks."]]));

  l29.push(nL("Duration and bond prices", [
    () => { const d = pick([2, 4, 5, 7]), y = pick([0.5, 1, 2]); return q(`A bond has a duration of ${d} years. If interest rates rise by ${y} percentage point${y === 1 ? "" : "s"}, by about what percent does its price fall? (percent)`, r2(d * y),
        "Duration estimates how sensitive the price is to rates.", "% price change ≈ duration × change in yield.",
        () => { const a = pick([3, 6]), b = pick([1, 3]); return `Example: duration ${a}, yield up ${b} point: price falls about ${a} × ${b} = ${a * b}%. Now do yours.`; }); },
    () => { const P = pick([1000, 500, 2000]), d = pick([3, 4, 5, 8]); return q(`A ${D(P)} bond has a duration of ${d}. Rates rise 1 percentage point. About how many dollars does the price drop? (dollars)`, P * d / 100,
        "Find the percent drop first.", "Then take that percent of the bond's price.",
        () => { const a = pick([800, 1500]), b = pick([2, 6]); return `Example: duration ${b}, so the drop is ${b}%. ${b}% of ${D(a)} = ${D(a * b / 100)}. Now do yours.`; }); },
    () => { const d = pick([2, 5, 6, 9]); return q(`A bond has a duration of ${d}. If interest rates fall by 1 percentage point, by about what percent does its price rise? (percent)`, d,
        "Prices and rates move in opposite directions.", "With a 1-point change, the percent move equals the duration.",
        () => { const a = pick([3, 7]); return `Example: duration ${a}, a 1-point fall in rates raises the price about ${a}%. Now do yours.`; }); }
  ], [["Sensitivity to rates", "📏", "<b>Duration</b> estimates how much a bond's price moves when interest rates change."], ["The rule of thumb", "🧮", "<b>% change in price ≈ -duration × change in yield</b> (in percentage points)."], ["Longer, riskier", "⏳", "Longer maturities and lower coupons mean higher duration, so bigger price swings."]]));

  l29.push(nL("Current yield", [
    () => { const t = pick([[40, 800], [50, 1000], [60, 1200], [80, 1600], [40, 500], [60, 750], [50, 625]]); return q(`A bond pays ${D(t[0])} in interest each year and its market price is ${D(t[1])}. What is its current yield? (percent)`, r2(t[0] / t[1] * 100),
        "Current yield compares the yearly interest to the price you would pay today.", "Annual interest ÷ market price × 100.",
        () => { const a = pick([[30, 600], [45, 900]]); return `Example: ${a[0]} ÷ ${a[1]} × 100 = ${r2(a[0] / a[1] * 100)}%. Now do yours.`; }); },
    () => { const t = pick([[50, 5, 1000], [40, 8, 500], [60, 6, 1000], [30, 5, 600], [45, 5, 900]]); return q(`A bond pays ${D(t[0])} in interest per year and has a current yield of ${t[1]}%. What is its market price? (dollars)`, t[2],
        "Rearrange: price is the interest divided by the yield.", "Price = annual interest ÷ (yield as a decimal).",
        () => { const a = pick([[20, 4, 500], [70, 7, 1000]]); return `Example: ${a[0]} ÷ ${a[1] / 100} = ${a[2]}. Now do yours.`; }); }
  ], [["Income per dollar", "💸", "<b>Current yield</b> is the yearly interest divided by the bond's current price."], ["Not the face value", "🏷️", "A 5% coupon bond on $1,000 pays $50. If it trades at $800, the current yield is $50 ÷ $800 = 6.25%."], ["Not the whole story", "🧩", "Current yield ignores the gain or loss when the bond matures at face value. Yield to maturity includes it."]]));

  l29.push(nL("Option payoffs", [
    () => { const K = pick([40, 50, 60, 80]), s = K + pick([5, 10, 15, 20]); return q(`A call option gives the right to buy a share at the strike price of ${D(K)}. At expiry the share is worth ${D(s)}. What is the payoff of the call? (dollars)`, s - K,
        "The right to buy at a low price is worth the difference.", "Payoff = max(share price - strike, 0).",
        () => { const a = pick([30, 70]), b = pick([8, 12]); return `Example: strike ${D(a)}, share ${D(a + b)}, payoff = ${b}. Now do yours.`; }); },
    () => { const K = pick([40, 50, 60, 80]), s = K - pick([5, 10, 15, 20]); return q(`A put option gives the right to sell a share at the strike price of ${D(K)}. At expiry the share is worth ${D(s)}. What is the payoff of the put? (dollars)`, K - s,
        "The right to sell at a high price is worth the difference.", "Payoff = max(strike - share price, 0).",
        () => { const a = pick([30, 70]), b = pick([6, 14]); return `Example: strike ${D(a)}, share ${D(a - b)}, payoff = ${b}. Now do yours.`; }); },
    () => { const K = pick([40, 50, 60]), pr = pick([2, 3, 4, 6]), s = K - pick([2, 5, 8]); return q(`A call option with a strike of ${D(K)} costs a premium of ${D(pr)}. At expiry the share is worth only ${D(s)}, so the option is worthless. What is the most money the buyer can lose per share? (dollars)`, pr,
        "The buyer is never forced to use the option.", "The worst case is losing only what was paid for the option.",
        () => { const a = pick([30, 70]), b = pick([1, 5]); return `Example: an option bought for a premium of ${D(b)} that expires worthless loses ${D(b)} per share. Now do yours.`; }); },
    () => { const K = pick([40, 50, 60]), pr = pick([2, 3, 5]); return q(`A call option with a strike price of ${D(K)} costs a premium of ${D(pr)}. At what share price at expiry does the buyer break even? (dollars)`, K + pr,
        "The share price must first cover the strike, then the cost of the option.", "Break-even = strike + premium.",
        () => { const a = pick([30, 70]), b = pick([1, 4]); return `Example: strike ${D(a)} + premium ${D(b)} = ${D(a + b)}. Now do yours.`; }); }
  ], [["A right, not a duty", "📜", "An <b>option</b> gives the right, but not the obligation, to buy (a <b>call</b>) or sell (a <b>put</b>) at a set <b>strike price</b>."], ["Payoffs at expiry", "🧮", "<b>Call payoff = max(price - strike, 0)</b>. <b>Put payoff = max(strike - price, 0)</b>."], ["Why they exist", "🛡️", "Companies and investors use options to protect against price moves (hedging). They are complex and can lose all their value, so they need careful study."]]));

  l29.push(nL("Alpha", [
    () => { const rf = pick([2, 3, 4]), pr = pick([4, 6, 8]), b = pick([0.5, 1, 1.5, 2]); return q(`The risk-free rate is ${rf}% and the market's expected return is ${rf + pr}%. What return does CAPM expect for a stock with beta ${b}? (percent)`, r2(rf + b * pr),
        "CAPM starts at the risk-free rate and adds a reward for market risk.", "Expected return = risk-free + beta × (market return - risk-free).",
        () => { const a = pick([[2, 6, 1.5], [3, 4, 2]]); return `Example: ${a[0]} + ${a[2]} × ${a[1]} = ${r2(a[0] + a[2] * a[1])}%. Now do yours.`; }); },
    () => { const rf = pick([2, 3, 4]), pr = pick([4, 6, 8]), b = pick([0.5, 1, 1.5, 2]), a = pick([0, 1, 2, 3, 4]), exp = rf + b * pr; return q(`A fund with beta ${b} returned ${r2(exp + a)}% when the risk-free rate was ${rf}% and the market premium (market return - risk-free) was ${pr} points. What is its alpha, actual return minus CAPM expected return? (points)`, a,
        "Alpha is the extra return beyond what the risk taken would predict.", "First find the CAPM expected return, then subtract it from the actual return.",
        () => { const x = pick([[2, 6, 1, 9], [3, 4, 2, 12]]); const e = x[0] + x[2] * x[1]; return `Example: expected = ${x[0]} + ${x[2]} × ${x[1]} = ${e}%. Actual ${x[3]}%, so alpha = ${x[3] - e}. Now do yours.`; }); }
  ], [["Beating the model", "🏁", "<b>Alpha</b> is the return above (or below) what CAPM says the risk deserved."], ["The formula", "🧮", "<b>Alpha = actual return - [risk-free + beta × (market return - risk-free)]</b>."], ["Hard to find", "🔎", "Lasting positive alpha is rare. Much of what looks like skill turns out to be luck or extra risk."]]));

  l29.push(mcL("The security market line", [
    ["A stock plots above the security market line. Its expected return is...", "higher than the risk justifies", ["lower than the risk justifies", "exactly what CAPM predicts"], "The line shows the required return for each level of beta.", "Above the line means above the requirement.", "Example: a stock offering 12% where the line says 9% sits above the line. Now do yours."],
    ["A stock plots below the security market line. It appears...", "overvalued (return too low for its risk)", ["undervalued", "perfectly priced"], "The return is under the requirement.", "Investors would not accept that return for that risk.", "Example: a stock offering 6% where the line says 9% sits below the line. Now do yours."],
    ["The slope of the security market line is the...", "market risk premium", ["risk-free rate", "stock's alpha"], "How much extra return does each unit of beta add?", "It is the reward for bearing market risk.", "Example: if the market earns 5 points above safe assets, each unit of beta adds 5 points. Now do yours."],
    ["The line crosses the vertical axis (beta = 0) at the...", "risk-free rate", ["market return", "zero percent always"], "What should a risk-free asset earn?", "No market risk means only the safe rate.", "Example: a Treasury bill with beta 0 earns the safe rate. Now do yours."],
    ["The horizontal axis of the security market line shows...", "beta", ["standard deviation", "dividend yield"], "It measures market risk, not total risk.", "It's the sensitivity to the market.", "Example: a stock with beta 1.3 sits at 1.3 on the axis. Now do yours."],
    ["A stock with beta 1 has a required return equal to...", "the market's expected return", ["the risk-free rate", "twice the market return"], "It moves like the market.", "So it should earn the same.", "Example: if the market is expected to earn 9%, a beta-1 stock should too. Now do yours."],
    ["If investors become more risk-averse, the security market line gets...", "steeper", ["flatter", "lower at every beta, including zero"], "They demand more reward per unit of risk.", "That changes the slope.", "Example: a premium rising from 4 to 7 points makes the line climb faster. Now do yours."]
  ], [["Return versus risk", "📈", "The <b>security market line (SML)</b> plots required return against beta."], ["Reading it", "🗺️", "On the line: fairly priced. Above: offers more than required. Below: offers less than required."], ["Parts of the line", "📐", "The <b>intercept</b> is the risk-free rate. The <b>slope</b> is the market risk premium."]]));

  l29.push(nL("PEG ratio", [
    () => { const g = pick([10, 20]), peg = pick([0.5, 1, 1.5, 2]); return q(`A stock has a P/E ratio of ${peg * g} and earnings growth of ${g}% a year. What is its PEG ratio (P/E ÷ growth)? (a number)`, peg,
        "PEG puts the price-to-earnings ratio next to the growth rate.", "Divide the P/E by the growth percent.",
        () => { const a = pick([[30, 15], [12, 6]]); return `Example: ${a[0]} ÷ ${a[1]} = ${r2(a[0] / a[1])}. Now do yours.`; }); },
    () => { const g = pick([10, 20, 25]), peg = pick([1, 2]); return q(`A company's growth is ${g}% a year and its PEG ratio is ${peg}. What is its P/E ratio? (a number)`, peg * g,
        "Turn the PEG formula around.", "P/E = PEG × growth percent.",
        () => { const a = pick([8, 15]), b = pick([1.5, 3]); return `Example: ${b} × ${a} = ${r2(a * b)}. Now do yours.`; }); },
    () => { const e = pick([2, 4, 5]), p = pick([40, 80, 100]); return q(`A share earns ${D(e)} per share and costs ${D(p)}. What is the earnings yield (earnings ÷ price)? (percent)`, r2(e / p * 100),
        "Earnings yield is the P/E ratio flipped upside down.", "EPS divided by price, times 100.",
        () => { const a = pick([[3, 60], [1, 20]]); return `Example: ${a[0]} ÷ ${a[1]} × 100 = ${r2(a[0] / a[1] * 100)}%. Now do yours.`; }); }
  ], [["P/E needs context", "🔎", "A high P/E can be fine if the company is growing fast. The <b>PEG ratio</b> adjusts for this."], ["The formula", "🧮", "<b>PEG = P/E ÷ expected annual earnings growth (in percent)</b>."], ["Earnings yield", "🔁", "<b>Earnings yield = EPS ÷ price</b>, the opposite of P/E. A PEG near or under 1 is often seen as reasonable, but growth forecasts can be wrong."]]));

  l29.push(nL("Enterprise value", [
    () => { const c = pick([500, 800, 1200]), d = pick([200, 300, 400]), ca = pick([50, 100, 150]); return q(`A company has a market cap of ${D(c)} million, debt of ${D(d)} million and cash of ${D(ca)} million. What is its enterprise value? (millions of dollars)`, c + d - ca,
        "Enterprise value is the price of the whole business, not just the shares.", "EV = market cap + debt - cash.",
        () => { const a = pick([400, 900]), b = pick([100, 250]), e = pick([30, 70]); return `Example: ${a} + ${b} - ${e} = ${a + b - e}. Now do yours.`; }); },
    () => { const c = pick([500, 800, 1200]), d = pick([200, 300, 400]), ca = pick([50, 100, 150]); return q(`A firm's enterprise value is ${D(c + d - ca)} million. It has debt of ${D(d)} million and cash of ${D(ca)} million. What is its market cap? (millions of dollars)`, c,
        "Reverse the formula.", "Market cap = EV - debt + cash.",
        () => { const a = pick([700, 950]), b = pick([100, 200]), e = pick([50, 80]); return `Example: EV ${a}, debt ${b}, cash ${e}: ${a} - ${b} + ${e} = ${a - b + e}. Now do yours.`; }); }
  ], [["The whole business", "🏢", "<b>Enterprise value (EV)</b> is what it would cost to buy the entire company, including its debt, minus cash you would get."], ["The formula", "🧮", "<b>EV = market capitalization + debt - cash</b>."], ["Why use it", "⚖️", "EV lets you compare companies with different amounts of debt. Ratios like EV/EBITDA are common."]]));

  l29.push(nL("Free cash flow", [
    () => { const o = pick([200, 300, 500, 800]), c = pick([60, 100, 150]); return q(`A company generated ${D(o)} million from operations and spent ${D(c)} million on equipment and buildings (capital expenditures). What is its free cash flow? (millions of dollars)`, o - c,
        "Free cash flow is the cash left after keeping the business running.", "FCF = operating cash flow - capital expenditures.",
        () => { const a = pick([400, 900]), b = pick([100, 250]); return `Example: ${a} - ${b} = ${a - b}. Now do yours.`; }); },
    () => { const t = pick([[5, 100], [8, 200], [12, 300], [20, 400], [9, 300], [10, 500]]); return q(`A company produced ${D(t[0])} million of free cash flow and its market cap is ${D(t[1])} million. What is its FCF yield? (percent)`, r2(t[0] / t[1] * 100),
        "Compare the free cash flow with the price of the company's shares.", "FCF ÷ market cap × 100.",
        () => { const a = pick([[6, 200], [4, 80]]); return `Example: ${a[0]} ÷ ${a[1]} × 100 = ${r2(a[0] / a[1] * 100)}%. Now do yours.`; }); }
  ], [["Cash you can use", "💧", "<b>Free cash flow</b> is the cash a business has left after paying for what it needs to keep or grow its operations."], ["The formula", "🧮", "<b>FCF = operating cash flow - capital expenditures</b>."], ["Why investors like it", "👀", "FCF can be used to pay dividends, repay debt or buy back shares. It is harder to manipulate than accounting profit."]]));

  l29.push(nL("Discounting future cash flows", [
    () => { const a = pick([50, 100, 200]), b = pick([100, 200, 300]); return q(`A company will make free cash flows of ${D(r2(a * 1.1))} million in year 1 and ${D(r2(b * 1.21))} million in year 2. With a 10% discount rate, the present values are ${D(a)} million and ${D(b)} million. What is the total present value? (millions)`, a + b,
        "The value today is the sum of the discounted pieces.", "Add the two present values.",
        () => { const x = pick([60, 120]), y = pick([40, 90]); return `Example: ${x} + ${y} = ${x + y}. Now do yours.`; }); },
    () => { const r = pick([10, 20, 25, 50]), pv = pick([100, 200, 400]); return q(`A cash flow of ${D(r2(pv * (1 + r / 100)))} will arrive in one year. At a ${r}% discount rate, what is it worth today? (dollars)`, pv,
        "Future money is worth less today.", "Divide by 1 plus the rate (as a decimal).",
        () => { const a = pick([[110, 10], [150, 50]]); return `Example: ${a[0]} ÷ ${1 + a[1] / 100} = ${r2(a[0] / (1 + a[1] / 100))}. Now do yours.`; }); },
    () => { const pv = pick([100, 200]), r = pick([10, 20]); return q(`A company is expected to generate ${D(r2(pv * (1 + r / 100)))} of free cash flow next year and its total value today is ${D(pv)} (just from that one year). What discount rate does that assume? (percent)`, r,
        "Value today is smaller than the future cash by exactly the discount.", "Rate = (future ÷ present) - 1, as a percent.",
        () => { const a = pick([[120, 100], [165, 150]]); return `Example: ${a[0]} ÷ ${a[1]} = ${r2(a[0] / a[1])}, minus 1 = ${r2(a[0] / a[1] - 1)}, which is ${r2((a[0] / a[1] - 1) * 100)}%. Now do yours.`; }); }
  ], [["Value comes from cash", "🔮", "In a <b>discounted cash flow (DCF)</b> valuation, a business is worth the present value of its future free cash flows."], ["Step by step", "🪜", "Discount year 1 by (1 + r), year 2 by (1 + r)², and so on. Then add them up."], ["Garbage in, garbage out", "⚠️", "Forecasts and discount rates are guesses. A small change in either can change the value a lot."]]));

  l29.push(nL("The cost of fund fees", [
    () => { const b = pick([10000, 25000, 50000, 100000]), f = pick([0.1, 0.2, 0.5, 1]); return q(`A fund charges an expense ratio of ${f}% a year. On a ${D(b)} investment, how many dollars is the yearly fee? (dollars)`, r2(b * f / 100),
        "The fee is a percent of the money you have in the fund.", "Multiply the balance by the ratio as a decimal.",
        () => { const a = pick([20000, 40000]), c = pick([0.5, 0.25]); return `Example: ${c}% of ${D(a)} = ${D(r2(a * c / 100))}. Now do yours.`; }); },
    () => { const b = pick([20000, 50000, 100000]), fa = pick([0.05, 0.1, 0.2]), fb = pick([0.8, 1, 1.2]); return q(`Fund A charges ${fa}% a year and Fund B charges ${fb}%. On ${D(b)}, how many more dollars per year does Fund B cost? (dollars)`, r2(b * (fb - fa) / 100),
        "Find the gap in fees first.", "Apply the percent gap to the balance.",
        () => { const a = pick([10000, 30000]), c = pick([0.9, 0.4]); return `Example: a ${c}-point gap on ${D(a)} = ${D(r2(a * c / 100))}. Now do yours.`; }); },
    () => { const g = pick([6, 7, 8, 9]), f = pick([0.1, 0.25, 0.5, 1]); return q(`A fund's investments earned ${g}% before costs and its expense ratio is ${f}%. What return do investors get after the fee? (percent)`, r2(g - f),
        "The fee is taken out of the return.", "Subtract the expense ratio from the gross return.",
        () => { const a = pick([5, 10]), b = pick([0.2, 0.5]); return `Example: ${a} - ${b} = ${r2(a - b)}%. Now do yours.`; }); }
  ], [["Small percents, big money", "🐜", "<b>Expense ratio</b> is the yearly fee a fund takes, as a percent of your money."], ["Fees compound too", "📉", "Over decades a 1% fee can cost a large share of the final balance, because the lost money would have earned returns too."], ["Compare before you choose", "🧐", "Funds that track the same index can charge very different fees. Lower fees mean more of the return stays with the investor."]]));

  l29.push(nL("Rebalancing", [
    () => { const V = pick([10000, 20000, 50000]), t = pick([50, 60, 70]), d = pick([5, 10]); return q(`A portfolio worth ${D(V)} has a target of ${t}% stocks. Stocks have grown so they now make up ${t + d}%. How many dollars of stocks should be sold to get back to target? (dollars)`, V * d / 100,
        "Find the extra percent, then turn it into dollars.", "The percent above target times the portfolio value.",
        () => { const a = pick([30000, 40000]), b = pick([5, 10]); return `Example: ${b}% too much of ${D(a)} = ${D(a * b / 100)} to sell. Now do yours.`; }); },
    () => { const V = pick([10000, 20000, 50000]), t = pick([50, 60, 70]); return q(`A portfolio worth ${D(V)} has a target of ${t}% stocks and the rest in bonds. How many dollars should be in bonds after rebalancing? (dollars)`, V * (100 - t) / 100,
        "The two shares must add up to the whole.", "Bond share = 100% minus the stock share.",
        () => { const a = pick([30000, 40000]), b = pick([60, 80]); return `Example: ${D(a)} with ${b}% stocks leaves ${100 - b}% in bonds = ${D(a * (100 - b) / 100)}. Now do yours.`; }); }
  ], [["Drifting apart", "🧭", "Different investments grow at different speeds, so your mix drifts away from your plan."], ["Rebalancing", "⚖️", "<b>Rebalancing</b> means selling some of what has grown too large and buying what has shrunk, to return to the target mix."], ["Why do it", "🛟", "It keeps risk near the level chosen. Selling in a taxable account can create taxes, so some people rebalance with new contributions."]]));

  l29.push(nL("After-tax returns", [
    () => { const r = pick([6, 8, 10, 12]), t = pick([10, 20, 25, 50]); return q(`An investment returns ${r}% before tax and the tax rate on its earnings is ${t}%. What is the after-tax return? (percent)`, r2(r * (1 - t / 100)),
        "Taxes take a share of the return.", "Multiply the return by (1 - tax rate).",
        () => { const a = pick([[10, 20], [8, 25]]); return `Example: ${a[0]} × (1 - ${a[1] / 100}) = ${r2(a[0] * (1 - a[1] / 100))}%. Now do yours.`; }); },
    () => { const g = pick([1000, 2000, 5000]), t = pick([10, 15, 20]); return q(`${nm0()} sells an investment for a gain of ${D(g)}, taxed at ${t}%. How many dollars of tax is due? (dollars)`, g * t / 100,
        "Tax is a percent of the gain, not of the whole sale.", "Gain times the tax rate.",
        () => { const a = pick([3000, 4000]), b = pick([15, 25]); return `Example: ${b}% of ${D(a)} = ${D(a * b / 100)}. Now do yours.`; }); },
    () => { const g = pick([1000, 2000, 5000]), t = pick([10, 15, 20]); return q(`An investment sale has a gain of ${D(g)} and the tax rate on gains is ${t}%. How many dollars does the investor keep from the gain? (dollars)`, g - g * t / 100,
        "Work out the tax, then subtract it.", "Gain - (gain × rate).",
        () => { const a = pick([2000, 6000]), b = pick([10, 20]); return `Example: ${a} - ${b}% of ${a} = ${a} - ${a * b / 100} = ${a - a * b / 100}. Now do yours.`; }); }
  ], [["Keep what's left", "🧾", "What matters is the return <b>after</b> tax and fees."], ["The formula", "🧮", "<b>After-tax return = pre-tax return × (1 - tax rate)</b>."], ["Different accounts, different tax", "🗂️", "Gains held longer than a year are usually taxed at lower rates in the U.S., and retirement accounts can delay or avoid tax. Rules change, so check current ones."]]));

  l29.push(mcL("Asset allocation basics", [
    ["Money you will need in two years is generally best kept in...", "stable, short-term holdings", ["all stocks", "one volatile stock"], "A short deadline leaves no time to recover from a fall.", "Safety matters more than growth here.", "Example: tuition due next year should not depend on the stock market. Now do yours."],
    ["A longer time horizon generally allows...", "more exposure to stocks", ["no stocks at all", "only cash"], "Time gives investments a chance to recover from dips.", "Think about how much risk can be absorbed.", "Example: a 30-year saver can ride out bad years better than a 2-year saver. Now do yours."],
    ["Asset allocation means...", "how money is split among stocks, bonds, cash and other assets", ["picking one winning stock", "timing the market"], "It's about the big categories, not single picks.", "It's the mix of the whole portfolio.", "Example: 60% stocks, 30% bonds, 10% cash is an allocation. Now do yours."],
    ["Which asset class has historically had the highest long-run average return, with the largest ups and downs?", "stocks", ["savings accounts", "short-term government bills"], "Higher expected reward comes with more bumpiness.", "The safest ones tend to earn the least.", "Example: bonds usually fall between stocks and cash for both return and risk. Now do yours."],
    ["Risk tolerance describes...", "how much loss someone can handle, financially and emotionally", ["how much money someone has", "how old someone is"], "It is about ability and willingness to take losses.", "It is not a number in a bank account.", "Example: two people with equal savings may feel very differently about a 20% drop. Now do yours."],
    ["A target-date fund usually, as its date approaches,...", "shifts gradually toward safer assets", ["moves everything into stocks", "stops investing"], "The goal date gets closer, so the time to recover shrinks.", "Think of how the risk is changed.", "Example: a fund aimed at 2060 holds more stocks today than one aimed at 2030. Now do yours."],
    ["Studies suggest most of the difference in long-run portfolio returns comes from...", "the split among asset classes", ["picking the hottest stock", "timing every trade"], "The big choices tend to matter more than the small ones.", "It's the overall mix.", "Example: a portfolio with 90% stocks acts very differently from one with 30% stocks, whatever the picks. Now do yours."]
  ], [["The big decision", "🥧", "<b>Asset allocation</b> is how a portfolio is divided among stocks, bonds, cash and other assets."], ["Time and tolerance", "⏰", "A longer time horizon and higher risk tolerance usually mean more stocks. Short deadlines call for steadier holdings."], ["General education", "📚", "These are general ideas, not advice for any one person. Plans should match goals, time and comfort with risk."]]));

  l29.push(mixOf("Mixed practice", [l29[0], l29[1], l29[2], l29[3], l29[4], l29[5], l29[6], l29[7]]));
  l29.push(mixOf("Level 29 Challenge", [l29[8], l29[9], l29[10], l29[11], l29[12], l29[13], l29[14], l29[15], l29[16], l29[17]]));

  // ======================= LEVEL 30 (college year 2, second half) =======================
  const l30 = [];

  l30.push(mcL("IS-LM: goods and money markets", [
    ["The central bank increases the money supply. In the IS-LM model the LM curve shifts right, which tends to...", "lower interest rates and raise output", ["raise interest rates and lower output", "raise both interest rates and output"], "More money in the system makes borrowing cheaper.", "Cheaper borrowing encourages spending on investment.", "Example: if the money supply shrinks, the LM curve shifts left, rates rise and output falls. Now do yours."],
    ["Government spending increases. The IS curve shifts...", "right, raising output and interest rates", ["left, lowering output", "right, lowering interest rates"], "More spending means more demand for goods.", "More output raises the demand for money, pushing rates the same way as output.", "Example: a tax cut also shifts IS right, raising output and rates. Now do yours."],
    ["The IS curve shows combinations of interest rate and output where...", "the goods market is in equilibrium", ["the money market is in equilibrium", "the labor market is in equilibrium"], "IS stands for investment and saving.", "It is about spending on goods and services.", "Example: the LM curve is the counterpart for the money market. Now do yours."],
    ["The LM curve shows combinations of interest rate and output where...", "the money market is in equilibrium", ["the goods market is in equilibrium", "the budget is balanced"], "LM stands for liquidity and money.", "It balances money supply with money demand.", "Example: the IS curve is the counterpart for the goods market. Now do yours."],
    ["A tax increase shifts the IS curve...", "left, lowering output and interest rates", ["right, raising output", "left, raising interest rates"], "Taxes take spending power from households.", "Less demand means lower output, which also reduces money demand.", "Example: a spending cut moves the curve the same way as a tax rise. Now do yours."],
    ["Why does the IS curve slope downward?", "higher interest rates reduce investment, so output falls", ["higher rates raise investment", "output has no link to rates"], "Think about what a higher rate does to borrowing for new projects.", "Less investment spending means less total demand.", "Example: a firm that finds a loan too costly cancels a new factory. Now do yours."],
    ["The central bank tightens policy, shifting the LM curve left. In the short run this tends to...", "raise interest rates and lower output", ["lower rates and raise output", "leave rates unchanged"], "Tight money means borrowing is more costly.", "That slows spending.", "Example: the reverse, loosening, shifts LM right. Now do yours."]
  ], [["Two markets at once", "🔀", "The <b>IS-LM model</b> combines the goods market (IS curve) and the money market (LM curve) to find output and the interest rate."], ["Fiscal shifts IS", "🏛️", "Changes in government spending or taxes move the <b>IS</b> curve. More spending: right. Higher taxes: left."], ["Monetary shifts LM", "🏦", "Changes in the money supply move the <b>LM</b> curve. More money: right, with lower rates."]]));

  l30.push(nL("The Taylor rule", [
    () => { const pi = pick([2, 3, 4, 6]), g = pick([-2, -1, 0, 2, 4]); return q(`A simple Taylor rule sets the policy rate = 2 + inflation + 0.5 × (inflation - 2) + 0.5 × (output gap). Inflation is ${pi}% and the output gap is ${g}%. What policy rate (percent) does the rule suggest?`, r2(2 + pi + 0.5 * (pi - 2) + 0.5 * g),
        "Work out the two adjustment terms: how far inflation is from its target and the output gap.", "Add 2, inflation, half the inflation gap and half the output gap.",
        () => { const a = pick([[3, 2], [5, -2]]); return `Example: inflation ${a[0]}, gap ${a[1]}: 2 + ${a[0]} + 0.5 × ${a[0] - 2} + 0.5 × ${a[1]} = ${r2(2 + a[0] + 0.5 * (a[0] - 2) + 0.5 * a[1])}%. Now do yours.`; }); },
    () => { const x = pick([1, 2, 4]); return q(`Under the rule rate = 2 + inflation + 0.5 × (inflation - 2) + 0.5 × (output gap), the output gap stays the same but inflation rises by ${x} percentage point${x === 1 ? "" : "s"}. By how many points does the suggested policy rate rise? (points)`, 1.5 * x,
        "Inflation appears in two places in the rule.", "Count the full inflation term plus half of the gap term.",
        () => { const a = pick([3, 6]); return `Example: inflation up ${a} adds ${a} (direct) + 0.5 × ${a} = ${a * 1.5} to the rate. Now do yours.`; }); }
  ], [["A rule of thumb", "📏", "The <b>Taylor rule</b> suggests how a central bank might set its interest rate."], ["The pieces", "🧩", "<b>Rate = neutral rate + inflation + 0.5 × (inflation - target) + 0.5 × (output gap)</b>."], ["Leaning against the wind", "🌬️", "Higher inflation or an overheating economy means higher rates. A weak economy means lower rates."]]));

  l30.push(nL("Money, velocity and prices", [
    () => { const M = pick([1000, 2000, 3000, 5000]), V = pick([2, 3, 4, 5]); return q(`An economy has a money supply of ${D(M)} billion and each dollar is spent ${V} times a year (velocity). What is nominal GDP, using M × V = P × Y? (billions of dollars)`, M * V,
        "Total spending equals money times how fast it changes hands.", "Multiply the money supply by the velocity.",
        () => { const a = pick([800, 1500]), b = pick([2, 6]); return `Example: ${a} × ${b} = ${a * b}. Now do yours.`; }); },
    () => { const Y = pick([1000, 2000, 4000]), P = pick([1, 2, 3]), V = pick([2, 4, 5]); return q(`Real output Y is ${K(Y)}, the price level P is ${P} and velocity V is ${V}. What money supply M is needed (M × V = P × Y)? (a number)`, Y * P / V,
        "Rearrange the equation to isolate M.", "M = P × Y ÷ V.",
        () => { const a = pick([[500, 2, 4], [900, 4, 3]]); return `Example: P ${a[1]}, Y ${a[0]}, V ${a[2]}: M = ${a[1]} × ${a[0]} ÷ ${a[2]} = ${a[1] * a[0] / a[2]}. Now do yours.`; }); },
    () => { const PY = pick([6000, 12000, 20000]), M = pick([2000, 3000, 4000]), V = PY / M; return q(`Nominal GDP is ${K(PY)} and the money supply is ${K(M)}. What is the velocity of money? (a number)`, V,
        "Velocity tells how many times each unit of money is used.", "V = nominal GDP ÷ M.",
        () => { const a = pick([[8000, 2000], [9000, 3000]]); return `Example: ${a[0]} ÷ ${a[1]} = ${a[0] / a[1]}. Now do yours.`; }); },
    () => { const m = pick([5, 10, 20]); return q(`In the quantity theory, velocity and real output stay fixed while the money supply grows ${m}%. By about what percent does the price level rise? (percent)`, m,
        "With V and Y fixed, only M and P can change.", "If M × V = P × Y and V and Y stay put, P must change in step with M.",
        () => { const a = pick([4, 8]); return `Example: money up ${a}% with V and Y fixed means prices up about ${a}%. Now do yours.`; }); }
  ], [["Money and spending", "💵", "The <b>equation of exchange</b>: <b>M × V = P × Y</b>. Money supply × velocity = price level × real output."], ["Velocity", "🔄", "<b>Velocity</b> is how many times a unit of money is spent per year: <b>V = P × Y ÷ M</b>."], ["Quantity theory", "📈", "If velocity and output are steady, faster money growth leads to higher prices: that's inflation."]]));

  l30.push(nL("Okun's law", [
    () => { const x = pick([1, 1.5, 2, 3]); return q(`Okun's law says that for each 1 percentage point unemployment is above its natural rate, output is about 2% below potential. Unemployment is ${x} points above the natural rate. How many percent below potential is output? (percent)`, 2 * x,
        "Each point of extra unemployment costs a fixed amount of output.", "Multiply the unemployment gap by 2.",
        () => { const a = pick([0.5, 4]); return `Example: ${a} points × 2 = ${a * 2}%. Now do yours.`; }); },
    () => { const pot = pick([10000, 15000, 20000]), s = pick([2, 4, 6]); return q(`Potential GDP is ${D(pot)} billion and actual output is ${s}% below potential. How many billions of dollars of output are lost? (billions)`, pot * s / 100,
        "Take a percent of potential output.", "Potential GDP × the percent shortfall.",
        () => { const a = pick([8000, 12000]), b = pick([5, 3]); return `Example: ${b}% of ${D(a)} billion = ${D(a * b / 100)} billion. Now do yours.`; }); },
    () => { const x = pick([2, 4, 6, 8]); return q(`Output is ${x}% below potential. Using Okun's law (2% of output per 1 point of unemployment), how many points is unemployment above the natural rate? (points)`, x / 2,
        "Work Okun's law backwards.", "Divide the output gap by 2.",
        () => { const a = pick([10, 5]); return `Example: ${a}% gap ÷ 2 = ${a / 2} points. Now do yours.`; }); }
  ], [["Jobs and output", "👷", "<b>Okun's law</b> links unemployment to lost output."], ["A rule of thumb", "📐", "In the textbook version, each 1 point of unemployment above the natural rate goes with about <b>2% lower output</b> than potential."], ["Rough guide", "🔎", "The exact number varies by country and period. It shows the cost of high unemployment for the whole economy."]]));

  l30.push(nL("Purchasing power parity", [
    () => { const p = pick([2, 4, 5, 10]), rate = pick([3, 5, 10, 25]); return q(`A snack costs ${D(p)} in the United States and ${p * rate} zanis in the fictional country of Zania. What exchange rate (zanis per dollar) does purchasing power parity suggest? (zanis per dollar)`, rate,
        "PPP says the same basket should cost the same once converted.", "Divide the price in zanis by the price in dollars.",
        () => { const a = pick([[3, 6], [8, 4]]); return `Example: costs ${a[0]} dollars here and ${a[0] * a[1]} units there: rate = ${a[0] * a[1]} ÷ ${a[0]} = ${a[1]}. Now do yours.`; }); },
    () => { const rate = pick([4, 5, 8, 10]), p = pick([3, 6, 9, 12]); return q(`The PPP exchange rate is ${rate} zanis per dollar. A book costs ${p * rate} zanis in Zania. What should it cost in dollars? (dollars)`, p,
        "Convert zanis into dollars using the rate.", "Divide the price in zanis by the exchange rate.",
        () => { const a = pick([[5, 20], [2, 50]]); return `Example: ${a[1] * a[0]} units at ${a[1]} per dollar = ${a[0]} dollars. Now do yours.`; }); },
    () => { const rate = pick([2, 4, 5]), p = pick([6, 10, 15]); return q(`The exchange rate is ${rate} zanis per dollar. A tool costs ${D(p)} in the United States. How many zanis is that? (zanis)`, p * rate,
        "Multiply when going toward the smaller unit.", "Dollars × zanis per dollar.",
        () => { const a = pick([[7, 3], [20, 5]]); return `Example: ${a[0]} dollars × ${a[1]} = ${a[0] * a[1]} units. Now do yours.`; }); }
  ], [["The law of one price", "⚖️", "<b>Purchasing power parity (PPP)</b> says an identical basket of goods should cost the same in two countries once converted at the exchange rate."], ["The PPP rate", "🧮", "<b>PPP exchange rate = price in foreign currency ÷ price in dollars</b>."], ["Why prices differ", "🚚", "Shipping, taxes, local services and trade limits keep real exchange rates away from PPP, but the idea helps compare living costs."]]));

  l30.push(mcL("Crowding out and stabilizers", [
    ["Heavy government borrowing pushes up interest rates and reduces private investment. This is called...", "crowding out", ["the multiplier effect", "an automatic stabilizer"], "Private borrowers get pushed aside by a bigger borrower.", "Think of a crowd leaving less room for others.", "Example: if the government sells lots of bonds, firms may find loans costlier. Now do yours."],
    ["Income tax revenue falling automatically in a recession is an example of...", "an automatic stabilizer", ["crowding out", "a policy lag"], "It happens without any new law.", "It softens the swings in the economy by itself.", "Example: unemployment benefits are another. Now do yours."],
    ["Unemployment benefits rising during a recession help the economy by...", "supporting spending without a new law", ["raising interest rates", "reducing the money supply"], "Households still have some income to spend.", "The support is automatic.", "Example: progressive taxes shrink when incomes fall. Now do yours."],
    ["The delay between a problem appearing and a policy taking effect is a...", "policy lag", ["velocity of money", "multiplier"], "Time passes while problems are spotted and laws are passed.", "That's why timing is hard.", "Example: a stimulus law passed after a recession ends can add to a boom. Now do yours."],
    ["Expansionary fiscal policy means...", "raising government spending or cutting taxes", ["raising taxes and cutting spending", "raising the policy interest rate"], "Think of policy that pushes the economy to grow.", "Fiscal means spending and taxes, not interest rates.", "Example: building roads to create jobs is expansionary fiscal policy. Now do yours."],
    ["Contractionary monetary policy usually means the central bank...", "raises interest rates or slows money growth", ["cuts taxes", "increases government spending"], "Monetary means the central bank.", "Contractionary slows spending.", "Example: raising the policy rate to cool inflation. Now do yours."],
    ["Crowding out is likely to be smaller when...", "the economy has a lot of idle resources", ["the economy is already at full capacity", "the central bank raises rates"], "Is there room to grow without pushing out other uses?", "Unused workers and factories can be put to work.", "Example: in a deep slump, government projects use idle capacity. Now do yours."]
  ], [["Fiscal and monetary", "🛠️", "<b>Fiscal policy</b> uses government spending and taxes. <b>Monetary policy</b> uses interest rates and money supply."], ["Crowding out", "🚪", "If government borrowing raises interest rates, it can <b>crowd out</b> private investment."], ["Stabilizers and lags", "⏳", "<b>Automatic stabilizers</b> (progressive taxes, unemployment benefits) work at once. New policies suffer <b>lags</b>."]]));

  l30.push(mcL("Balance of payments", [
    ["A country imports more goods and services than it exports. Its trade balance is in...", "deficit", ["surplus", "perfect balance"], "Compare what goes out with what comes in.", "More bought from abroad than sold abroad.", "Example: buying 90 of foreign goods while selling 70 abroad is a deficit of 20. Now do yours."],
    ["A country that sells more to the world than it buys has a trade...", "surplus", ["deficit", "default"], "Exports exceed imports.", "The opposite of running short.", "Example: exports of 120 and imports of 100 give a surplus of 20. Now do yours."],
    ["The current account mainly records...", "trade in goods and services, income and transfers", ["only stocks and bonds", "only government budgets"], "It tracks the flows of current activity with the world.", "Trade plus income from abroad plus gifts.", "Example: exports, interest from abroad and money sent home all count. Now do yours."],
    ["A current account deficit is financed by...", "net capital inflows from abroad", ["printing foreign money", "ignoring the gap"], "If more is spent abroad, the money must come back some way.", "Foreigners end up holding claims on the country.", "Example: foreigners buying the country's bonds supplies the funds. Now do yours."],
    ["Buying foreign stocks and bonds is recorded in the...", "financial (capital) account", ["current account", "government budget"], "It is about buying assets, not goods.", "Assets sit in a different account from trade.", "Example: a pension fund buying overseas bonds is a financial flow. Now do yours."],
    ["In principle, the balance of payments sums to zero because...", "every transaction has two sides", ["governments force it to", "exchange rates are fixed"], "Think of double-entry bookkeeping.", "Every purchase has a matching payment.", "Example: importing a car (a debit) is matched by paying for it (a credit). Now do yours."],
    ["Money that workers abroad send home to their families is counted in the...", "current account (transfers)", ["financial account only", "government budget"], "It is a one-way payment, not a purchase of assets.", "Gifts and remittances are current flows.", "Example: a worker abroad sending money to relatives is a transfer. Now do yours."]
  ], [["Keeping score with the world", "🌍", "The <b>balance of payments</b> records all of a country's money flows with the rest of the world."], ["Two main accounts", "📒", "The <b>current account</b> (trade, income, transfers) and the <b>financial account</b> (buying and selling assets)."], ["They offset", "⚖️", "A current account deficit is matched by inflows of capital: foreigners lending or buying assets."]]));

  l30.push(mcL("Framing and anchoring", [
    ["Burgers described as '80% lean' sell better than '20% fat'. The meat is identical. This is the...", "framing effect", ["sunk cost fallacy", "law of demand"], "Same facts, different wording.", "The way a choice is described changes reactions.", "Example: 'Save $5' and 'Avoid a $5 fee' can feel different. Now do yours."],
    ["A jacket is shown at '$300, now $120', which feels like a bargain though $120 is its usual price. The $300 acts as a(n)...", "anchor", ["default", "dividend"], "A first number can set a reference point.", "Later numbers are judged against it.", "Example: a restaurant lists a $90 wine first to make a $40 one feel cheap. Now do yours."],
    ["People hate a 'card surcharge' more than they like an equal 'cash discount'. This happens because the first is framed as a...", "loss", ["gain", "tax cut"], "How do people react to paying extra compared with paying less?", "Losses feel stronger than gains.", "Example: 'late fee' feels worse than 'on-time bonus' of the same size. Now do yours."],
    ["Pricing something at $9.99 rather than $10 works partly because people focus on the...", "left-most digit", ["last digit", "weight of the product"], "Which digit do eyes read first?", "A change in the first digit seems bigger.", "Example: $4.99 feels like 'about four dollars'. Now do yours."],
    ["Menu designers place a $60 dish first to make $30 dishes look reasonable. This uses...", "anchoring", ["compound interest", "diversification"], "A high first number shapes comparisons.", "The first number sets the standard.", "Example: a store lists a high 'list price' next to the sale price. Now do yours."],
    ["A program is described as 'saving 40 of 100 jobs' in one version and 'losing 60 of 100 jobs' in another, and people choose differently. This shows...", "that wording can change decisions", ["that jobs have no value", "that math is wrong"], "The facts are the same in both versions.", "Only the description changed.", "Example: 'a 90% success rate' vs '10% failure rate' is the same fact. Now do yours."],
    ["Standard economics assumes the same facts should give the same choice. Framing effects show people are...", "not always perfectly consistent", ["always perfectly rational", "unable to choose"], "Do the same facts always lead to the same choice in real life?", "Behavioral economics studies these gaps.", "Example: people may pick a different plan if it is called a 'discount' or a 'fee'. Now do yours."]
  ], [["Wording matters", "🗣️", "The <b>framing effect</b>: the same facts, described differently, can lead to different choices."], ["Anchors", "⚓", "<b>Anchoring</b> happens when a first number sets the reference point for later judgments."], ["Be a careful chooser", "🧠", "Check the real numbers behind a message. Ask: what would I choose if it were worded the other way?"]]));

  l30.push(mcL("Mental accounting", [
    ["Someone keeps a 'vacation' jar and refuses to use it to pay down a high-interest debt. This is...", "mental accounting", ["diversification", "opportunity cost"], "The person has put money into labeled mental boxes.", "The boxes override what the numbers say.", "Example: keeping a savings pot at 1% while a 20% loan stays unpaid. Now do yours."],
    ["Money is described as 'fungible', meaning...", "a dollar is worth the same whatever its source or label", ["dollars from work are worth more", "money cannot be spent"], "Think about whether the label changes what it can buy.", "Money can be swapped from one use to another.", "Example: $20 from a gift and $20 from a job both buy the same snack. Now do yours."],
    ["A person spends a tax refund freely because it feels like a bonus, though it is their own money returned. This shows...", "mental accounting", ["comparative advantage", "inflation"], "The refund went into a mental box labeled 'extra'.", "The money didn't change, only the label.", "Example: spending a birthday gift more freely than wages. Now do yours."],
    ["Someone earns 3% on savings while paying 20% on a card. A purely rational view says they should...", "pay down the card first", ["keep the savings untouched", "borrow more on the card"], "Compare what each costs or earns.", "Which rate is bigger?", "Example: a 2% savings account against a 15% loan: pay the loan. Now do yours."],
    ["Spending 'found money' more easily than earned money is a sign of...", "mental accounting", ["opportunity cost", "elastic demand"], "Different sources are treated as different pots.", "Rationally, the source shouldn't matter.", "Example: spending a street-found $10 more freely than a wage $10. Now do yours."],
    ["Mental accounting can sometimes help because...", "separate buckets can make saving goals easier to keep", ["it removes all risk", "it earns higher interest"], "Think about the benefit of labeling money for a purpose.", "Labels can build discipline.", "Example: a 'new bike' savings jar helps someone stick with a goal. Now do yours."],
    ["From a strict economist's view, $100 received as a gift card for groceries versus $100 earned should be treated as...", "worth the same", ["worth more as a gift", "worth less as earnings"], "Does the source change what you can buy?", "The groceries cost the same either way.", "Example: $50 from savings and $50 from allowance buy the same thing. Now do yours."]
  ], [["Pots in the head", "🏺", "<b>Mental accounting</b> is treating money differently depending on where it came from or what it is for."], ["Fungible money", "🔄", "Money is <b>fungible</b>: a dollar is a dollar. Labels can lead to choices like saving at 1% while borrowing at 20%."], ["Use it wisely", "🎯", "Buckets can help with discipline, but check whether they cost you money."]]));

  l30.push(mcL("Present bias", [
    ["Someone picks $100 today over $110 tomorrow, but picks $110 in 31 days over $100 in 30 days. This pattern is called...", "present bias (hyperbolic discounting)", ["loss aversion", "risk neutrality"], "The same one-day wait is judged differently depending on how near it is.", "Immediate rewards get extra weight.", "Example: preferring a snack now over a better one tomorrow but the later bigger prize in a month. Now do yours."],
    ["Present bias helps explain why people...", "put off saving for retirement", ["save too much", "always compare prices"], "The benefits are far away and the costs are now.", "Which is more tempting: spending now or saving for later?", "Example: a gym membership unused 'until next month'. Now do yours."],
    ["A commitment device is...", "a choice that locks in future behavior", ["a type of tax", "a government bond"], "It reduces the temptation to change your mind.", "Think of a lock on a snack cupboard.", "Example: a savings account that can't be touched until a set date. Now do yours."],
    ["Under standard (exponential) discounting, patience between today and tomorrow compared with day 30 and day 31 is...", "the same", ["much greater later", "much smaller later"], "The standard model uses a constant rate.", "The delay is the same one day.", "Example: in that model, the trade-off is the same for any one-day delay. Now do yours."],
    ["Which of these is a commitment device?", "a savings plan that blocks withdrawals until a goal date", ["a credit card with no limit", "a sale that ends tonight"], "It should make it harder to spend.", "Look for a restriction that you choose in advance.", "Example: asking an employer to send part of your pay straight into savings. Now do yours."],
    ["Present bias is mostly about...", "overweighting rewards that are immediate", ["ignoring all rewards", "preferring risk"], "The key word is 'present'.", "The now gets extra attention.", "Example: choosing a small treat today over a bigger one next week. Now do yours."],
    ["Automatic monthly transfers to savings work well partly because they...", "remove the need to decide each month", ["raise interest rates", "ignore the budget"], "Fewer chances to give in to the moment.", "The choice is made once, in advance.", "Example: a bill paid automatically is never forgotten. Now do yours."]
  ], [["Now beats later", "🍬", "<b>Present bias</b> means we overvalue rewards that are close in time and undervalue future ones."], ["Changing our minds", "🔁", "We plan to save tomorrow, then spend today. Plans made in advance often break when the moment arrives."], ["Commitment devices", "🔒", "Rules set in advance, like automatic savings, protect your future self from today's temptation."]]));

  l30.push(mcL("Nudges and defaults", [
    ["Automatically enrolling workers in a retirement plan (with the option to leave) raises participation. This uses the power of...", "defaults", ["taxes", "advertising"], "What happens if people do nothing?", "Many people stay with the choice made for them.", "Example: a gym membership that renews unless you cancel works the same way. Now do yours."],
    ["A nudge is...", "a gentle change in how choices are presented that guides without forbidding", ["a law banning a choice", "a large fine"], "It leaves every option open.", "It points, it doesn't push hard.", "Example: putting healthy snacks at eye level. Now do yours."],
    ["Which is a nudge rather than a ban?", "putting healthy snacks at eye level in a cafeteria", ["banning all snacks", "fining people who pick snacks"], "Look for the one that keeps the choice free.", "No rule is forced.", "Example: a calendar reminder for a bill. Now do yours."],
    ["Why do defaults work so well?", "many people stick with the choice made for them (inertia)", ["people love paperwork", "defaults are always the best choice"], "Changing takes effort and attention.", "Doing nothing is easiest.", "Example: most people never change a phone's pre-set ringtone. Now do yours."],
    ["Telling people 'most of your neighbors have already paid their bills' encourages payment. This uses...", "social norms", ["higher interest", "diversification"], "People often copy what others do.", "It shows what is normal.", "Example: hotel cards saying 'most guests reuse towels'. Now do yours."],
    ["A fair concern about defaults is that they...", "may not suit everyone, so leaving should be easy", ["never change behavior", "remove all choices"], "A setting chosen for the average may not fit one person.", "That's why opting out must stay simple.", "Example: an automatic savings rate that is too high for someone with tight finances. Now do yours."],
    ["A simple reminder text sent before a bill is due is an example of...", "a nudge", ["a tax", "a ban"], "It adds a gentle prompt, nothing more.", "It leaves the choice with the person.", "Example: a pop-up reminding you to save. Now do yours."]
  ], [["Design of choices", "🧭", "How choices are arranged affects what people pick. Choice designers use <b>nudges</b>."], ["Defaults", "⚙️", "A <b>default</b> is what happens if you do nothing. Because many people stick with it, defaults can change behavior a lot."], ["Keep it free", "🕊️", "Good nudges leave every option open and make it easy to choose differently."]]));

  l30.push(nL("Retirement income needs", [
    () => { const s = pick([40000, 60000, 80000, 100000]), p = pick([60, 70, 80]); return q(`A worker earns ${D(s)} a year and plans to live on ${p}% of that in retirement (a replacement ratio). How many dollars a year is that? (dollars)`, s * p / 100,
        "The replacement ratio is a share of the pre-retirement pay.", "Take the percent of the salary.",
        () => { const a = pick([50000, 90000]), b = pick([70, 85]); return `Example: ${b}% of ${D(a)} = ${D(a * b / 100)}. Now do yours.`; }); },
    () => { const n = pick([40000, 48000, 60000]), ss = pick([12000, 16000, 20000]), pe = pick([4000, 6000, 8000]); return q(`A retiree wants ${D(n)} a year. Social Security will pay ${D(ss)} and a pension ${D(pe)}. How many dollars a year must come from personal savings? (dollars)`, n - ss - pe,
        "Add up the income sources already planned.", "Subtract them from the target spending.",
        () => { const a = pick([50000, 70000]), b = pick([15000, 20000]), c = pick([5000, 10000]); return `Example: ${a} - ${b} - ${c} = ${a - b - c}. Now do yours.`; }); },
    () => { const n = pick([40000, 50000, 60000]), ss = pick([10000, 15000, 20000, 30000]); return q(`A retiree needs ${D(n)} a year and Social Security covers ${D(ss)}. What percent of the need does Social Security cover? (percent)`, r2(ss / n * 100),
        "Compare the part with the whole.", "Part ÷ whole × 100.",
        () => { const a = pick([[20000, 80000], [15000, 60000]]); return `Example: ${a[0]} ÷ ${a[1]} × 100 = ${r2(a[0] / a[1] * 100)}%. Now do yours.`; }); }
  ], [["Planning for income", "🏖️", "Retirement planning starts with a question: how much yearly income will be needed?"], ["Replacement ratio", "🧮", "Many planners estimate needs as a <b>percent of pre-retirement pay</b>, such as 70% to 80%. Costs like commuting fall but healthcare can rise."], ["Fill the gap", "🧩", "Subtract guaranteed income (Social Security, a pension) from the need. What is left must come from savings. This is general education, not personal advice."]]));

  l30.push(nL("Life-cycle smoothing", [
    () => { const t = pick([[40, 50], [30, 40]]), x = pick([40000, 60000, 80000, 100000]); return q(`A person earns ${D(x)} a year for ${t[0]} working years and lives ${t[1]} years in total. If they spend the same amount each year of life (ignoring interest), how much is that per year? (dollars)`, x * t[0] / t[1],
        "Add up the lifetime earnings first.", "Spread the lifetime total evenly over all years of life.",
        () => { const a = pick([[20, 25, 50000], [30, 40, 20000]]); return `Example: ${a[2]} × ${a[0]} = ${a[2] * a[0]}, ÷ ${a[1]} = ${a[2] * a[0] / a[1]} per year. Now do yours.`; }); },
    () => { const s = pick([10000, 15000, 20000]), t = pick([[40, 20], [30, 15], [30, 20], [40, 25]]); return q(`A worker saves ${D(s)} a year for ${t[0]} years and then spends it evenly over ${t[1]} years of retirement (ignore interest). How much can be spent each retirement year? (dollars)`, s * t[0] / t[1],
        "Total savings is the yearly amount times the years of saving.", "Share that total over the years of retirement.",
        () => { const a = pick([[5000, 20, 10], [8000, 25, 20]]); return `Example: ${a[0]} × ${a[1]} = ${a[0] * a[1]}, ÷ ${a[2]} = ${a[0] * a[1] / a[2]}. Now do yours.`; }); }
  ], [["Smooth spending", "🌊", "The <b>life-cycle hypothesis</b>: people try to keep a steady standard of living, even though income rises and falls over a lifetime."], ["Borrow, save, spend", "🪜", "Young adults may borrow (education), middle-age workers save, and retirees spend what they saved."], ["Simple arithmetic", "🧮", "Ignoring interest: <b>steady spending = lifetime income ÷ years of life</b>. Interest and investing help the real number grow."]]));

  l30.push(nL("Dilution", [
    () => { const a = pick([10, 20, 25]), b = pick([10, 20]); return q(`Founders own 100% of a startup. They sell ${a}% to investors in round one, and then investors take ${b}% of the company in round two. What percent do the founders own now? (percent)`, r2(100 * (1 - a / 100) * (1 - b / 100)),
        "Each round keeps only part of what the founders had before.", "Multiply what remains after round one by what remains after round two.",
        () => { const x = pick([30, 40]), y = pick([10, 20]); return `Example: ${100 - x}% of the company remains, then ${100 - y}% of that: ${r2((100 - x) * (100 - y) / 100)}%. Now do yours.`; }); },
    () => { const p = pick([[800, 200], [900, 100], [750, 250], [600, 400], [700, 300], [950, 50]]); return q(`A startup has ${K(p[0] + p[1])} shares in total. Investors hold ${K(p[1])} of them and the founders hold the rest. What percent do the founders own? (percent)`, r2(p[0] / (p[0] + p[1]) * 100),
        "Ownership is the founders' shares compared with all shares.", "Founder shares ÷ total shares × 100.",
        () => { const a = pick([[500, 500], [900, 300]]); return `Example: ${a[0]} ÷ ${a[0] + a[1]} × 100 = ${r2(a[0] / (a[0] + a[1]) * 100)}%. Now do yours.`; }); },
    () => { const F = pick([800, 900, 600]), N = pick([100, 200, 300]); return q(`Founders own ${K(F)} shares and no one else owns any. The company then issues ${K(N)} new shares to an investor. What percent do the founders own after that? (percent)`, r2(F / (F + N) * 100),
        "New shares make the total larger.", "Founder shares ÷ (old total + new shares) × 100.",
        () => { const a = pick([[400, 100], [1000, 250]]); return `Example: ${a[0]} ÷ (${a[0]} + ${a[1]}) × 100 = ${r2(a[0] / (a[0] + a[1]) * 100)}%. Now do yours.`; }); }
  ], [["A smaller slice", "🍰", "When a company issues new shares, each existing owner's <b>percentage</b> falls. This is <b>dilution</b>."], ["Not always bad", "🌱", "A smaller percent of a much more valuable company can be worth more than a bigger percent of a small one."], ["Math", "🧮", "<b>Ownership % = your shares ÷ total shares</b>. Multiple rounds: multiply the remaining fractions."]]));

  l30.push(nL("Pre-money and post-money", [
    () => { const pre = pick([3, 4, 6, 9]), inv = pick([1, 2]); return q(`A startup is valued at ${D(pre)} million before an investor adds ${D(inv)} million (pre-money). What is the post-money valuation? (millions)`, pre + inv,
        "The new cash adds to the value.", "Post-money = pre-money + investment.",
        () => { const a = pick([5, 10]), b = pick([1, 3]); return `Example: ${a} + ${b} = ${a + b}. Now do yours.`; }); },
    () => { const t = pick([[4, 1], [9, 1], [6, 2], [3, 1], [8, 2]]); return q(`A startup has a pre-money value of ${D(t[0])} million and an investor puts in ${D(t[1])} million. What percent of the company does the investor own after the deal? (percent)`, r2(t[1] / (t[0] + t[1]) * 100),
        "The investor's share is their money compared with the post-money value.", "Investment ÷ (pre-money + investment) × 100.",
        () => { const a = pick([[9, 1], [3, 1]]); return `Example: ${a[1]} ÷ (${a[0]} + ${a[1]}) × 100 = ${r2(a[1] / (a[0] + a[1]) * 100)}%. Now do yours.`; }); },
    () => { const inv = pick([1, 2, 3]), st = pick([10, 20, 25]); return q(`An investor puts in ${D(inv)} million for ${st}% of a company. What is the pre-money valuation? (millions)`, r2(inv * 100 / st - inv),
        "First find what the whole company is worth after the investment.", "Post-money = investment ÷ ownership share. Then take away the investment.",
        () => { const a = pick([[2, 20], [1, 10]]); return `Example: ${a[0]} ÷ ${a[1] / 100} = ${a[0] * 100 / a[1]} post-money, minus ${a[0]} gives ${a[0] * 100 / a[1] - a[0]} pre-money. Now do yours.`; }); }
  ], [["Value before and after", "⏱️", "<b>Pre-money</b> is a company's value before new investment. <b>Post-money</b> is its value right after."], ["Formulas", "🧮", "<b>Post-money = pre-money + investment</b>. <b>Investor's share = investment ÷ post-money</b>."], ["Negotiation", "🤝", "Founders prefer a higher pre-money value because they give up less ownership for the same cash."]]));

  l30.push(mcL("Pass-through or double tax?", [
    ["In a C corporation, profits are taxed at the company level and again when paid out as dividends. This is called...", "double taxation", ["limited liability", "pass-through taxation"], "Two layers of tax on the same profit.", "The company pays, then the shareholder pays.", "Example: a company pays tax on profit, then a shareholder pays tax on the dividend from what is left. Now do yours."],
    ["A sole proprietorship's profits are taxed...", "on the owner's personal tax return", ["only at the company level", "not at all"], "The business and owner are one for tax purposes.", "There is no separate company tax layer.", "Example: a freelancer reports business income on a personal return. Now do yours."],
    ["Limited liability means owners...", "are not personally responsible for business debts beyond their investment", ["are fully responsible for all debts", "cannot sell their shares"], "It limits what owners can lose.", "Personal property is generally protected.", "Example: if an LLC cannot pay a supplier, the owner's house is generally safe. Now do yours."],
    ["Which structure leaves the owner personally liable for business debts?", "sole proprietorship", ["corporation", "LLC"], "Which one makes no separation between the person and the business?", "The other two create a separate legal entity.", "Example: a general partner in a partnership is also personally liable. Now do yours."],
    ["A pass-through entity is one where...", "profits are taxed on the owners' returns, not at the business", ["profits are never taxed", "the business pays twice"], "The tax passes through to the owners.", "No separate business-level income tax.", "Example: partnerships and most LLCs work this way by default. Now do yours."],
    ["Why do startups seeking venture capital usually form C corporations?", "investors and stock options are easier to handle", ["they pay no tax", "owners have unlimited liability"], "Think about what investors want to hold.", "Shares in a standard corporation are simple to issue.", "Example: employees receive stock options in a corporation. Now do yours."],
    ["General partners in a partnership usually...", "are personally liable for the partnership's debts", ["are protected from all debts", "pay double tax"], "They share control and risk.", "Their own property can be reached.", "Example: if the partnership is sued, a general partner can be responsible personally. Now do yours."]
  ], [["Choosing a form", "🏗️", "A business can be a sole proprietorship, partnership, LLC or corporation. Each handles <b>liability</b> and <b>tax</b> differently."], ["Tax paths", "💸", "<b>Pass-through</b> (sole proprietor, partnership, most LLCs): taxed on owners' returns. <b>C corporation</b>: taxed at company level and again on dividends (double taxation)."], ["Liability", "🛡️", "Corporations and LLCs offer <b>limited liability</b>. Sole proprietors are personally on the hook. General education, not legal advice."]]));

  l30.push(mcL("The lean startup", [
    ["MVP in the lean startup method stands for...", "minimum viable product", ["most valuable player", "maximum value price"], "It is the smallest version that lets you learn.", "The 'M' means the least needed.", "Example: a landing page that tests demand before building. Now do yours."],
    ["The purpose of an MVP is...", "to test an idea with real customers quickly and cheaply", ["to impress investors with every feature", "to avoid talking to customers"], "It is for learning, not for finishing.", "Early feedback saves time and money.", "Example: selling 10 hand-made items before opening a factory. Now do yours."],
    ["In a startup, a pivot is...", "a change of strategy based on what was learned", ["closing the company", "copying a competitor exactly"], "It is a turn, not an ending.", "It is driven by evidence from customers.", "Example: a game company moving to teaching tools after finding classroom demand. Now do yours."],
    ["The lean startup loop is...", "build, measure, learn", ["learn, plan, wait", "guess, hide, repeat"], "It starts with making something small.", "Then check the results and use them.", "Example: release a feature, count how many use it, then adjust. Now do yours."],
    ["The best way to find out if people want a product is to...", "ask them to try or pay for an early version", ["ask friends if it sounds nice", "spend a year perfecting it"], "Actions say more than polite opinions.", "Look for real behavior.", "Example: a pre-order is stronger evidence than a compliment. Now do yours."],
    ["Product-market fit means...", "enough customers want the product and keep using it", ["the product has many features", "the price is the lowest"], "It's about demand.", "Customers stay and tell others.", "Example: users returning every week without being reminded. Now do yours."],
    ["Why launch with fewer features?", "to learn sooner and waste less money", ["because customers dislike features", "to avoid competition"], "The goal is quick evidence.", "Features you build that no one wants are expensive.", "Example: testing one lunch item before printing a big menu. Now do yours."]
  ], [["Learn fast", "🚀", "The <b>lean startup</b> approach: test ideas quickly and cheaply before spending big."], ["The loop", "🔁", "<b>Build</b> a small version, <b>measure</b> how people respond, <b>learn</b>, and repeat."], ["Pivot or persevere", "🧭", "If evidence shows the idea isn't working, <b>pivot</b>. If it is, double down."]]));

  l30.push(mcL("How startups are funded", [
    ["Bootstrapping means funding a business with...", "the founder's savings and early revenue", ["venture capital", "a public share sale"], "The prefix 'boot' is about pulling yourself up.", "No outside investors are involved.", "Example: a baker reinvesting early sales to buy a bigger oven. Now do yours."],
    ["An angel investor is...", "a person who invests their own money in early startups", ["a government agency", "a large bank"], "It's an individual, not an institution.", "They often invest before there are many customers.", "Example: a retired founder backing a new company. Now do yours."],
    ["Selling shares of a company in exchange for money is called...", "equity financing", ["debt financing", "bootstrapping"], "The buyer gets ownership.", "It is the opposite of borrowing.", "Example: giving up 10% of the company for $100,000. Now do yours."],
    ["Debt financing means...", "borrowing money that must be repaid with interest, with no ownership given up", ["selling part of the company", "receiving a gift"], "It must be paid back.", "Lenders don't become owners.", "Example: a bank loan to buy equipment. Now do yours."],
    ["An IPO (initial public offering) is...", "a company's first sale of shares to the public on a stock exchange", ["a private loan", "a type of tax"], "'Public' is the clue.", "It is the first time ordinary investors can buy.", "Example: a successful company lists on a stock exchange for the first time. Now do yours."],
    ["Which usually comes first for a young startup?", "seed funding", ["an IPO", "a late-stage round"], "Think of planting before harvest.", "Early money comes before big public sales.", "Example: Seed, then Series A, then later rounds. Now do yours."],
    ["Venture capital firms typically invest in return for...", "ownership shares (equity)", ["fixed monthly interest only", "nothing"], "They take a stake in the company.", "They hope the stake grows in value.", "Example: a fund buying 20% of a startup. Now do yours."]
  ], [["Where does the money come from?", "💼", "Startups can use <b>bootstrapping</b>, <b>angel investors</b>, <b>venture capital</b>, bank <b>loans</b>, or later sell shares publicly in an <b>IPO</b>."], ["Equity vs debt", "⚖️", "<b>Equity</b>: sell ownership, no repayment. <b>Debt</b>: keep ownership, but repay with interest."], ["Trade-offs", "🔍", "Outside money can speed growth but may mean giving up control. General education, not personal advice."]]));

  l30.push(mixOf("Mixed practice", [l30[0], l30[1], l30[2], l30[3], l30[4], l30[5], l30[6], l30[7]]));
  l30.push(mixOf("Level 30 Challenge", [l30[8], l30[9], l30[10], l30[11], l30[12], l30[13], l30[14], l30[15], l30[16], l30[17]]));

  Object.assign(MONEY_LEVELS, { 28: l28, 29: l29, 30: l30 });
})();
