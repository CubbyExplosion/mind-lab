// ext/money-22-24.js  Mind Lab Money Skills levels 22-24 (60 lessons)
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
  const mcL = (title, items, h3, slides) => L(title, () => { const it = pick(items); return mcq(it[0], it[1], it[2], it[3], it[4], h3); }, slides);
  const nm0 = () => pick(NM);

  // ======================= LEVEL 22 (10th grade, second half) =======================
  const l22 = [];

  l22.push(L("APY: the true yearly rate", () => {
    const k = ri(0, 2);
    if (k === 0) {
      const d = pick([1000, 2000, 4000, 5000]), a = pick([2, 3, 4, 4.5, 5]), nm = nm0();
      return q(`${nm} puts ${D(d)} in an account with a ${a}% APY. About how much interest does it earn in one year? (dollars)`, r2(d * a / 100),
        "APY already counts the effect of compounding over a whole year.", "Take the APY percent of the deposit.",
        () => { const e = pick([1000, 3000, 6000]), p = pick([2, 3, 5]); return `Example: ${D(e)} at ${p}% APY earns ${e} × ${p}/100 = ${D(e * p / 100)} in a year. Now do yours.`; });
    }
    if (k === 1) {
      const apr = pick([3, 4, 5, 6]), m = Math.random() < 0.5;
      return mcq(`Two accounts both say ${apr}% APR. Account ${m ? "A" : "B"} adds its interest every month. Account ${m ? "B" : "A"} adds it once a year. After one year, which has more money?`,
        m ? "Account A" : "Account B", [m ? "Account B" : "Account A", "They are exactly equal"],
        "Interest that is added sooner can earn interest of its own.", "Ask which account adds interest more often during the year.",
        "Example: account X adds interest every day and account Y once a year, same APR. Interest on interest starts sooner for X, so X ends with more. Now do yours.");
    }
    return mcq("Which number lets you compare two savings accounts fairly?", "APY", ["APR on its own", "The minimum deposit", "The number of branches"],
      "You want a number for the whole year.", "Pick the number that already counts how often interest is added.",
      "Example: to compare two cars fairly you use one measure that includes everything, like total cost. For accounts, use the yearly yield that includes compounding. Now do yours.");
  }, [["APR and APY", "🏦", "<b>APR</b> is the stated yearly rate. <b>APY</b> (annual percentage yield) is what you really earn in a year after compounding."], ["Why APY is bigger", "📈", "Interest added monthly earns interest too. So the APY is a little higher than the APR."], ["Compare with APY", "✅", "To compare savings accounts, use APY. To compare loans, use APR."]]));

  l22.push(L("Rewards cards and annual fees", () => {
    const nm = nm0(), k = ri(0, 2);
    if (k === 0) {
      let s, c, f; do { s = pick([3000, 5000, 8000, 10000, 12000]); c = pick([2, 3, 4, 5]); f = pick([25, 50, 75, 95]); } while (s * c / 100 <= f);
      return q(`${nm}'s card gives ${c}% cash back and has a ${D(f)} annual fee. ${nm} spends ${D(s)} on it in a year. How many dollars is ${nm} ahead after the fee? (dollars)`, s * c / 100 - f,
        "Find the rewards first, then take away the fee.", "Rewards = spending × the cash-back percent. Then subtract the yearly fee.",
        () => { const a = pick([2000, 4000]), p = pick([2, 3]), g = pick([20, 30]); return `Example: spend ${D(a)} at ${p}% back is ${D(a * p / 100)}. Fee ${D(g)}. Ahead by ${D(a * p / 100 - g)}. Now do yours.`; });
    }
    if (k === 1) {
      const f = pick([50, 75, 100]), c = pick([2, 4, 5]);
      return q(`A card has a ${D(f)} annual fee and gives ${c}% cash back. How many dollars must you spend in a year just for the rewards to equal the fee? (dollars)`, f * 100 / c,
        "Break-even: rewards equal the fee.", "Ask: what amount times the cash-back percent makes the fee? Divide the fee by the percent as a decimal.",
        () => { const g = pick([40, 60]), p = pick([2, 4]); return `Example: fee ${D(g)}, ${p}% back. ${g} ÷ ${p / 100} = ${D(g * 100 / p)}. Now do yours.`; });
    }
    let s, c, f; do { s = pick([2000, 4000, 6000]); c = pick([1, 2, 3]); f = pick([60, 95, 120, 150]); } while (s * c / 100 >= f);
    return q(`A card gives ${c}% cash back and charges a ${D(f)} annual fee. ${nm} only spends ${D(s)} a year on it. How many dollars does ${nm} LOSE after counting rewards and the fee? (dollars)`, f - s * c / 100,
      "When the rewards are smaller than the fee, you lose money.", "Find the rewards, then see how far below the fee they are.",
      () => { const a = pick([1000, 3000]), p = pick([1, 2]), g = pick([80, 100]); return `Example: spend ${D(a)} at ${p}% back is ${D(a * p / 100)}. Fee ${D(g)}. The loss is ${g} - ${a * p / 100} = ${D(g - a * p / 100)}. Now do yours.`; });
  }, [["Cash back", "💳", "Some cards give a percent of your spending back as <b>rewards</b>."], ["Annual fee", "🧾", "Many reward cards charge a yearly <b>annual fee</b>. Rewards must beat the fee to be worth it."], ["Only if you pay in full", "⚠️", "Card interest costs far more than rewards pay. Rewards only make sense if you pay the whole bill each month."]]));

  l22.push(L("Zero-based budget", () => {
    const nm = nm0(), k = ri(0, 2);
    if (k === 0) {
      const inc = pick([2000, 2400, 3000, 3600, 4000]), a = pick([700, 800, 900, 1000]), b = pick([300, 400, 500]), c = pick([150, 200, 250]), d = pick([100, 150, 200]);
      return q(`${nm} earns ${D(inc)} a month and plans: rent ${D(a)}, food ${D(b)}, transport ${D(c)}, fun ${D(d)}. In a zero-based budget every dollar gets a job. How many dollars are still left to assign? (dollars)`, inc - a - b - c - d,
        "Zero-based means income minus all planned spending should reach zero.", "Add the planned amounts, then subtract from the income.",
        () => { const i = pick([1500, 2500]), x = pick([600, 700]), y = pick([200, 300]), z = pick([100, 200]); return `Example: income ${D(i)}, plans ${D(x)}, ${D(y)} and ${D(z)}. Left = ${i} - ${x + y + z} = ${D(i - x - y - z)}. Now do yours.`; });
    }
    if (k === 1) {
      const inc = pick([2500, 3000, 3500]), a = pick([900, 1000, 1100]), b = pick([400, 500]), s = pick([300, 400, 500]);
      return q(`${nm}'s monthly income is ${D(inc)}. The plan so far: housing ${D(a)}, food ${D(b)} and savings ${D(s)}. How many dollars can go to "everything else" so the plan reaches exactly zero? (dollars)`, inc - a - b - s,
        "Every dollar of income needs a job in this kind of budget.", "Subtract all the amounts already planned from the income.",
        () => { const i = pick([2000, 4000]), x = pick([800, 1200]), y = pick([300, 500]), z = pick([200, 400]); return `Example: income ${D(i)}, plans ${D(x)}, ${D(y)}, ${D(z)}. Everything else gets ${i} - ${x + y + z} = ${D(i - x - y - z)}. Now do yours.`; });
    }
    const inc = pick([2000, 2500, 4000]), p = pick([5, 10, 15, 20]);
    return q(`${nm} earns ${D(inc)} a month. After planning all bills, ${D(inc * p / 100)} is left unassigned. What percent of income is not yet assigned? (just the number)`, p,
      "Compare the unassigned part with the whole income.", "Divide the unassigned amount by the income, then multiply by 100.",
      () => { const i = pick([1000, 2000]), l = pick([100, 200]); return `Example: ${D(l)} left out of ${D(i)}: ${l} ÷ ${i} = ${l / i}, so ${l * 100 / i}%. Now do yours.`; });
  }, [["Give every dollar a job", "🧮", "In a <b>zero-based budget</b>, income minus planned spending and saving equals zero. Nothing is left floating."], ["Extra money", "💡", "If money is left over, assign it: savings, a goal, or fun. If you are over, trim a category."], ["Tip", "✏️", "Make the plan <i>before</i> the month starts, then compare it with what really happens."]]));

  l22.push(L("Real interest rate", () => {
    const nm = nm0(), k = ri(0, 2), n = ri(3, 9), i = ri(1, n - 1);
    if (k === 0) return q(`${nm}'s savings earn ${n}% a year. Prices are rising ${i}% a year. Using the simple rule, what is the real rate of return? (percent, just the number)`, n - i,
      "Real means after the effect of rising prices.", "Subtract inflation from the rate the account pays.",
      () => { const a = pick([6, 8]), b = pick([2, 3]); return `Example: pays ${a}%, inflation ${b}%. Real rate = ${a} - ${b} = ${a - b}%. Now do yours.`; });
    if (k === 1) {
      const rr = ri(1, 4), nn = rr + ri(1, 4);
      return q(`A bond pays ${nn}% and its real rate of return is ${rr}%. By the simple rule, what is the inflation rate? (percent, just the number)`, nn - rr,
        "The real rate is the pay rate with inflation taken away.", "The gap between the pay rate and the real rate is the inflation.",
        () => { const a = pick([7, 9]), b = pick([2, 4]); return `Example: pays ${a}%, real rate ${b}%. Inflation = ${a} - ${b} = ${a - b}%. Now do yours.`; });
    }
    const pay = ri(1, 5), inf = ri(1, 6), a = pay > inf ? "grows" : pay < inf ? "shrinks" : "stays the same";
    return mcq(`${nm}'s savings earn ${pay}% a year while prices rise ${inf}% a year. Over the year, ${nm}'s buying power...`, a, ["grows", "shrinks", "stays the same"].filter(x => x !== a),
      "Compare how fast the money grows with how fast prices grow.", "Is the account rate bigger than, smaller than, or equal to the price rise?",
      "Example: money grows 3% but prices rise 5%. Prices win, so you can buy a little less. If money grew faster, you could buy more. Now do yours.");
  }, [["Nominal and real", "🔍", "The <b>nominal</b> rate is what the account says. The <b>real</b> rate is what is left after <b>inflation</b>."], ["Simple rule", "➖", "Real rate ≈ nominal rate − inflation rate. Earn 5% when prices rise 2%: real rate is about 3%."], ["Beating inflation", "🛡️", "If the real rate is below zero, your money buys less each year even though the balance grows."]]));

  l22.push(L("CPI and the inflation rate", () => {
    const k = ri(0, 2), a = pick([100, 200, 400]), p = pick([2, 3, 4, 5, 6, 8]);
    if (k === 0) return q(`The Consumer Price Index (CPI) was ${a} last year and ${a + a * p / 100} this year. What was the inflation rate? (percent, just the number)`, p,
      "Inflation is the percent change in the price index.", "Find the change (new minus old), divide by the old value, then multiply by 100.",
      () => { const x = pick([100, 300]), y = pick([2, 5]); return `Example: CPI goes from ${x} to ${x + x * y / 100}. Change ${x * y / 100}. ${x * y / 100} ÷ ${x} × 100 = ${y}%. Now do yours.`; });
    if (k === 1) {
      const c = pick([100, 200, 400, 500]), pp = pick([2, 3, 4, 5, 10]);
      return q(`A basket of groceries cost ${D(c)} last year. Prices rose ${pp}% since then. What does the same basket cost now? (dollars)`, c + c * pp / 100,
        "Find how much the price went up, then add it on.", "Take the percent of the old price, then add that amount to the old price.",
        () => { const x = pick([100, 300]), y = pick([2, 6]); return `Example: ${D(x)} rising ${y}% adds ${D(x * y / 100)}, so the new price is ${D(x + x * y / 100)}. Now do yours.`; });
    }
    const pp = pick([2, 3, 4, 5]), w = pick([1000, 2000, 5000]);
    return q(`Prices rise ${pp}% in a year. Something that cost ${D(w)} last year costs how many dollars more this year? (dollars)`, r2(w * pp / 100),
      "You want only the amount of the rise, not the new price.", "Take the inflation percent of last year's price.",
      () => { const x = pick([1000, 4000]), y = pick([2, 3]); return `Example: ${D(x)} with a ${y}% rise goes up ${x} × ${y}/100 = ${D(x * y / 100)}. Now do yours.`; });
  }, [["The price index", "🛒", "The <b>CPI</b> tracks the price of a typical basket of things families buy. It is compared with a base year."], ["Inflation rate", "📈", "Inflation rate = (new CPI − old CPI) ÷ old CPI × 100."], ["Why it matters", "💡", "Raises, pensions and some bonds are adjusted using the CPI so buying power keeps up."]]));

  l22.push(L("Present value", () => {
    const nm = nm0(), k = ri(0, 1), pv = pick([200, 400, 500, 1000, 2000]), r = pick([5, 10]);
    if (k === 0) return q(`${nm} is promised ${D(pv * (100 + r) / 100)} in one year. If the bank pays ${r}% a year, how much would ${nm} need to put in the bank today to have the same amount in a year? (dollars)`, pv,
      "Today's money grows. Work backward from the future amount.", "Future amount = today's amount × (1 + the rate as a decimal). So divide the future amount by that.",
      () => { const x = pick([300, 600]), y = pick([10, 20]); return `Example: ${D(x * (100 + y) / 100)} in a year at ${y}% means ${x * (100 + y) / 100} ÷ ${(100 + y) / 100} = ${D(x)} today. Now do yours.`; });
    return q(`${nm} can take ${D(pv)} today or wait a year for a payment. The bank pays ${r}%. What is the least ${nm} should accept next year to be at least as well off? (dollars)`, pv * (100 + r) / 100,
      "Think of what today's money would become if saved.", "Multiply today's amount by (1 + the rate as a decimal).",
      () => { const x = pick([300, 700]), y = pick([10, 20]); return `Example: ${D(x)} at ${y}% grows to ${x} × ${(100 + y) / 100} = ${D(x * (100 + y) / 100)}. Now do yours.`; });
  }, [["Money has a time value", "⏳", "A dollar today is worth more than a dollar next year, because today's dollar can earn interest."], ["Future value", "➡️", "Future value = today's amount × (1 + rate). $100 at 10% becomes $110 in a year."], ["Present value", "⬅️", "<b>Present value</b> works backward: divide the future amount by (1 + rate) to see what it is worth today."]]));

  l22.push(L("Equilibrium price", () => {
    const p0 = pick([3, 4, 5, 6]), q0 = pick([40, 50, 60]), a = pick([5, 10]), b = pick([5, 10]), k = ri(0, 1);
    const rows = [-2, -1, 0, 1, 2].map(d => `$${p0 + d}: buyers want ${q0 - a * d}, sellers offer ${q0 + b * d}`).join("; ");
    if (k === 0) return q(`A market has these prices: ${rows}. At what price does the amount buyers want equal the amount sellers offer? (dollars)`, p0,
      "Look for the row where the two numbers match.", "At the equilibrium the quantity demanded equals the quantity supplied.",
      () => { const x = pick([2, 7]); return `Example: $${x}: buyers want 30, sellers offer 20; $${x + 1}: want 25, offer 25; $${x + 2}: want 20, offer 30. The numbers match at $${x + 1}. Now do yours.`; });
    return q(`A market has these prices: ${rows}. How many items are sold at the equilibrium price? (a number)`, q0,
      "First find the price where buyers and sellers agree.", "At that price both numbers are the same. That shared number is the answer.",
      () => { const x = pick([2, 7]); return `Example: $${x}: buyers want 90, sellers offer 70; $${x + 1}: want 80, offer 80; $${x + 2}: want 70, offer 90. They match at 80 items. Now do yours.`; });
  }, [["Demand and supply", "⚖️", "Buyers want less when the price rises (<b>demand</b>). Sellers offer more when the price rises (<b>supply</b>)."], ["Equilibrium", "🎯", "The <b>equilibrium price</b> is where quantity demanded equals quantity supplied. The market settles there."], ["Find it in a table", "📋", "Scan the rows for the price where the two quantities are the same."]]));

  l22.push(L("Shortage or surplus", () => {
    const p = ri(2, 12), qd = 10 * ri(4, 12), qs = qd + 10 * pick([-3, -2, -1, 1, 2, 3]), k = ri(0, 1);
    if (k === 0) return q(`At a price of ${D(p)}, buyers want ${qd} items and sellers offer ${qs}. By how many items is there a shortage or a surplus? (a number)`, Math.abs(qd - qs),
      "Compare the two numbers and see how far apart they are.", "Subtract the smaller number from the larger one.",
      () => { const a = pick([70, 90]), b = a + pick([20, 30]); return `Example: buyers want ${a}, sellers offer ${b}. The gap is ${b} - ${a} = ${b - a}. Now do yours.`; });
    const a = qd > qs ? "A shortage" : "A surplus";
    return mcq(`At a price of ${D(p)}, buyers want ${qd} items and sellers offer ${qs}. What is there?`, a, ["A shortage", "A surplus", "A perfect balance"].filter(x => x !== a),
      "Which is bigger, what buyers want or what sellers offer?", "If people want more than is offered, that is not enough supply.",
      "Example: buyers want 50 and sellers offer 80. There is more for sale than wanted, so some goods go unsold: a surplus. Now do yours.");
  }, [["Shortage", "📉", "A <b>shortage</b> happens when buyers want more than sellers offer. Prices tend to rise."], ["Surplus", "📦", "A <b>surplus</b> happens when sellers offer more than buyers want. Prices tend to fall."], ["How big", "🔢", "The size is the difference between the two quantities."]]));

  l22.push(mcL("Price floors and ceilings", [
    ["A rule that says a price cannot go ABOVE a set limit is called a price...", "ceiling", ["floor", "average", "trend"], "Think of the top of a room.", "It keeps prices from rising above a limit."],
    ["A rule that says a price cannot go BELOW a set limit is called a price...", "floor", ["ceiling", "tax", "coupon"], "Think of the bottom of a room.", "It keeps prices from falling under a limit."],
    ["A minimum wage is an example of a price...", "floor", ["ceiling", "average", "coupon"], "It is the lowest pay allowed.", "Is it a limit from below or above?"],
    ["If a price ceiling is set BELOW the equilibrium price, the usual result is...", "a shortage", ["a surplus", "a perfect match", "lower demand for everything"], "At the low price, more people want to buy.", "Buyers want more than sellers will offer at that price."],
    ["If a price floor is set ABOVE the equilibrium price, the usual result is...", "a surplus", ["a shortage", "a perfect match", "a tax"], "At the high price, sellers offer more.", "Sellers offer more than buyers want at that price."],
    ["Rent control that holds rents under the market price is an example of a price...", "ceiling", ["floor", "average", "refund"], "It limits how high rent can go.", "Think of a limit on the top."],
    ["Why might a government set a price ceiling?", "to keep an important good affordable", ["to make the good more expensive", "to collect a fee", "to stop all sales"], "What would the lawmakers want for buyers?", "They want people to be able to pay."],
    ["A price limit that is set AT the equilibrium price...", "usually changes nothing", ["always causes a shortage", "always causes a surplus", "ends the market"], "The market was already there.", "No one is pushed away from their choice."]
  ], "Example: a limit on the highest price of bread is a ceiling; a limit on the lowest pay is a floor. Now do yours.",
    [["Limits on price", "🚧", "A <b>price ceiling</b> is the highest price allowed. A <b>price floor</b> is the lowest price allowed."], ["Effects", "⚖️", "A ceiling below the market price causes a <b>shortage</b>. A floor above the market price causes a <b>surplus</b>."], ["Trade-offs", "🤔", "These rules help some people but can create new problems for others. Economists look at both sides."]]));

  l22.push(L("Elasticity of demand", () => {
    const k = ri(0, 2), dp = pick([5, 10, 20, 4]);
    if (k === 0) {
      const r = pick([1, 2, 3, 4]);
      return q(`A shop raises its price by ${dp}% and the quantity bought falls by ${dp * r}%. What is the price elasticity of demand (percent change in quantity ÷ percent change in price, ignore the minus sign)?`, r,
        "Divide one percent change by the other.", "Put the quantity change on top and the price change on the bottom.",
        () => { const x = pick([5, 10]), y = pick([2, 3]); return `Example: price up ${x}%, quantity down ${x * y}%. ${x * y} ÷ ${x} = ${y}. Now do yours.`; });
    }
    if (k === 1) {
      const r = pick([2, 3, 4]);
      return q(`A product has an elasticity of ${r}. If its price rises ${dp}%, by what percent does the quantity bought fall? (just the number)`, dp * r,
        "Elasticity tells how many times bigger the quantity change is than the price change.", "Multiply the price change by the elasticity.",
        () => { const x = pick([3, 6]), y = pick([2, 5]); return `Example: elasticity ${y}, price up ${x}%. Quantity falls ${y} × ${x} = ${x * y}%. Now do yours.`; });
    }
    const pq = pick([[10, 25, "Elastic"], [10, 3, "Inelastic"], [20, 5, "Inelastic"], [5, 15, "Elastic"], [10, 10, "Unit elastic"], [4, 12, "Elastic"], [20, 6, "Inelastic"], [8, 8, "Unit elastic"]]);
    return mcq(`The price of a snack rises ${pq[0]}% and the quantity bought falls ${pq[1]}%. Demand is...`, pq[2], ["Elastic", "Inelastic", "Unit elastic"].filter(x => x !== pq[2]),
      "Compare the size of the two percent changes.", "Is the quantity change bigger than, smaller than, or the same as the price change?",
      "Example: price up 10%, quantity down 30%. The quantity moved more than the price, so buyers are very sensitive to price. Now do yours.");
  }, [["How sensitive are buyers?", "🎚️", "<b>Elasticity</b> = % change in quantity ÷ % change in price (ignore the sign)."], ["Elastic or inelastic", "↔️", "Above 1: <b>elastic</b> (buyers react a lot). Below 1: <b>inelastic</b> (buyers barely react, like for medicine). Equal to 1: unit elastic."], ["Why sellers care", "💡", "If demand is inelastic, a price rise brings in more money. If it is elastic, a rise can lose sales."]]));

  l22.push(L("Average cost per unit", () => {
    const k = ri(0, 2), n = pick([10, 20, 25, 50, 100]), f = ri(2, 9), v = ri(2, 12), nm = nm0();
    if (k === 0) return q(`${nm} pays ${D(f * n)} to set up a business and then ${D(v)} for each item made. What is the average cost per item if ${n} items are made? (dollars)`, f + v,
      "Average cost = total cost ÷ number of items.", "Total cost is the setup cost plus the cost of every item made.",
      () => { const a = pick([10, 20]), b = pick([3, 4]), c = pick([2, 5]); return `Example: setup ${D(a * b)} and ${D(c)} each for ${a} items. Total = ${a * b + a * c}. ${a * b + a * c} ÷ ${a} = ${D(b + c)} each. Now do yours.`; });
    if (k === 1) return q(`A bakery's fixed cost is ${D(f * n)}. Each loaf costs ${D(v)} to bake. What is the total cost of making ${n} loaves? (dollars)`, f * n + v * n,
      "Total cost = fixed cost + all the variable costs.", "Variable cost is the cost per loaf times the number of loaves.",
      () => { const a = pick([100, 200]), b = pick([2, 3]), c = pick([10, 20]); return `Example: fixed ${D(a)}, ${D(b)} each for ${c} items: ${a} + ${b * c} = ${D(a + b * c)}. Now do yours.`; });
    const F = pick([600, 1200]), n1 = pick([10, 20, 30]), n2 = n1 + pick([10, 20, 30]);
    return q(`A shop has ${D(F)} of fixed costs. How many dollars per item does the fixed cost fall when production rises from ${n1} to ${n2} items? (dollars)`, F / n1 - F / n2,
      "Spread the same fixed cost over a different number of items.", "Find fixed cost ÷ items for each number, then see how far apart they are.",
      () => { const f2 = pick([300, 400]), a = pick([10, 20]), b = a * 2; return `Example: ${D(f2)} fixed. ${f2} ÷ ${a} = ${f2 / a} and ${f2} ÷ ${b} = ${f2 / b}. The drop is ${D(f2 / a - f2 / b)}. Now do yours.`; });
  }, [["Fixed and variable", "🏭", "<b>Fixed costs</b> stay the same (rent, machines). <b>Variable costs</b> grow with each item made (materials)."], ["Average cost", "➗", "Average cost per unit = total cost ÷ number of units."], ["Scale", "📉", "Making more spreads the fixed cost over more items, so the average cost per item usually falls."]]));

  l22.push(L("Marginal cost and marginal revenue", () => {
    const k = ri(0, 2), nm = nm0();
    if (k === 0) {
      const base = ri(2, 4), mc = [base, base + 2, base + 4, base + 6, base + 8], c = ri(2, 4), p = mc[c] - 1;
      return q(`${nm} sells each extra mug for ${D(p)}. The cost of making the 1st, 2nd, 3rd, 4th and 5th mug is ${mc.map(D).join(", ")}. How many mugs are worth making (each extra mug must earn more than it costs)? (a number)`, c,
        "Keep making a mug only while it earns more than the extra cost of making it.", "Compare each mug's cost with the selling price, from the first one up, and stop when the cost is too high.",
        () => { const pr = 7; return `Example: price ${D(pr)}, costs ${D(3)}, ${D(5)}, ${D(8)}, ${D(10)}. Mugs 1 and 2 cost less than ${D(pr)}; mug 3 costs more. So 2 are worth making. Now do yours.`; });
    }
    if (k === 1) {
      const n = pick([10, 20, 50, 100]), t = ri(5, 9) * n, m = ri(3, 12);
      return q(`Making ${n} items costs ${D(t)} in total. Making ${n + 1} items costs ${D(t + m)}. What is the marginal cost of the extra item? (dollars)`, m,
        "Marginal means the cost of ONE more.", "Subtract the smaller total cost from the larger one.",
        () => { const a = pick([30, 60]), b = pick([2, 3, 4]); return `Example: ${a} items cost ${D(a * 5)}; ${a + 1} items cost ${D(a * 5 + b)}. The extra one costs ${D(b)}. Now do yours.`; });
    }
    const p = ri(6, 14), mcv = ri(2, p - 1);
    return q(`An extra item sells for ${D(p)} and costs ${D(mcv)} more to make. How much extra profit does that one item add? (dollars)`, p - mcv,
      "Marginal profit is marginal revenue minus marginal cost.", "Subtract the extra cost from the extra revenue.",
      () => { const a = pick([9, 12]), b = pick([4, 5]); return `Example: revenue ${D(a)}, cost ${D(b)}. Extra profit ${D(a - b)}. Now do yours.`; });
  }, [["Marginal means one more", "➕", "<b>Marginal cost</b> is the extra cost of making one more item. <b>Marginal revenue</b> is the extra money from selling it."], ["The rule", "📏", "Keep making more as long as marginal revenue is bigger than marginal cost."], ["Stop point", "🛑", "When one more item costs more than it earns, stop. That is how firms choose how much to make."]]));

  l22.push(L("Opportunity cost in production", () => {
    const k = ri(0, 2), nm = nm0();
    if (k === 0) {
      const a = ri(2, 5), m = ri(2, 4), b = a * m;
      return q(`In an hour, ${nm} can make ${b} bracelets or ${a} keychains. How many bracelets does ${nm} give up to make 1 keychain? (a number)`, m,
        "Opportunity cost is what you give up.", "Divide the bracelets by the keychains for the same hour.",
        () => { const x = pick([2, 3]), y = pick([2, 3, 4]); return `Example: 1 hour makes ${x * y} cards or ${x} posters. One poster costs ${x * y} ÷ ${x} = ${y} cards. Now do yours.`; });
    }
    if (k === 1) {
      const a = ri(2, 5), m = ri(2, 4), b = a * m;
      return q(`In an hour, ${nm} can make ${b} shirts or ${a} hats. What is the opportunity cost of 1 shirt, in hats? (a number, can be a decimal)`, r2(a / b),
        "Now flip it: what is given up to make a shirt?", "Divide the hats by the shirts for the same hour.",
        () => { const x = pick([2, 5]), y = pick([2, 4]); return `Example: 1 hour makes ${x * y} cups or ${x} bowls. One cup costs ${x} ÷ ${x * y} = ${r2(x / (x * y))} bowls. Now do yours.`; });
    }
    let a1, h1, a2, h2;
    do { a1 = ri(2, 8); h1 = ri(2, 8); a2 = ri(2, 8); h2 = ri(2, 8); } while (a1 * h2 === a2 * h1);
    const n2 = pick(NM.filter(x => x !== nm)), ans = a1 / h1 < a2 / h2 ? nm : n2;
    return mcq(`In an hour, ${nm} can make ${a1} scarves or ${h1} hats. ${n2} can make ${a2} scarves or ${h2} hats. Who gives up fewer scarves for each hat?`, ans, [ans === nm ? n2 : nm, "They are the same"],
      "Find how many scarves each person gives up for one hat.", "Divide scarves by hats for each person and compare.",
      "Example: Pat makes 6 mugs or 2 plates (3 mugs per plate). Sid makes 8 mugs or 4 plates (2 mugs per plate). Sid gives up fewer. Now do yours.");
  }, [["What you give up", "🔄", "Time is limited. Making one thing means making less of another. That lost amount is the <b>opportunity cost</b>."], ["Find it", "➗", "If you can make 6 of A or 3 of B in an hour, one B costs 6 ÷ 3 = 2 of A."], ["Comparative advantage", "🤝", "The one with the smaller opportunity cost should make that good. Both sides gain by trading."]]));

  l22.push(L("Market research and samples", () => {
    const k = ri(0, 1), s = pick([20, 25, 50, 100]), y = ri(2, s / 2 - 1), nn = pick([1000, 2000, 5000, 10000]);
    if (k === 0) return q(`${nm0()} asks ${s} people in a town of ${nn.toLocaleString("en-US")} if they would buy a new smoothie. ${y} say yes. If the sample is fair, about how many people in the whole town would buy it? (a number)`, nn * y / s,
      "A fair sample can stand for the whole group.", "Find the fraction who said yes, then take that fraction of the whole town.",
      () => { const a = pick([10, 20]), b = pick([3, 4]), c = pick([500, 1000]); return `Example: ${b} of ${a} say yes in a town of ${c}. ${c} × ${b}/${a} = ${c * b / a}. Now do yours.`; });
    return q(`In a survey of ${s} students, ${y} like a new game idea. What percent liked it? (just the number)`, y * 100 / s,
      "Percent means out of 100.", "Divide the number who liked it by the number surveyed, then multiply by 100.",
      () => { const a = pick([20, 50]), b = pick([3, 7]); return `Example: ${b} of ${a} is ${b} ÷ ${a} × 100 = ${b * 100 / a}%. Now do yours.`; });
  }, [["Ask before you build", "📋", "<b>Market research</b> finds out what customers want before you spend money."], ["Use a sample", "👥", "You can't ask everyone, so ask a <b>sample</b>. Scale up: the share who say yes × the size of the whole group."], ["Fair sample", "⚠️", "Ask a mix of people. Asking only your friends gives a biased answer."]]));

  l22.push(mcL("Protecting ideas", [
    ["Which protects a new invention, like a useful gadget?", "a patent", ["a trademark", "a copyright", "a coupon"], "Think of a new machine or process.", "It gives the inventor sole rights for a limited time."],
    ["Which protects a song, a book or a drawing?", "a copyright", ["a patent", "a trademark", "a fee"], "These are creative works.", "It protects the author's original work."],
    ["Which protects a company's name, logo or slogan?", "a trademark", ["a patent", "a copyright", "a warranty"], "It marks who a product comes from.", "It stops others from using a confusing look-alike."],
    ["Copying someone else's art and selling it as your own breaks their...", "copyright", ["trademark rules about names only", "tax", "warranty"], "The art was made by someone else.", "Creative work is protected by law."],
    ["Why do inventors get patents?", "so others cannot copy the invention for a set time", ["so the invention is free for all", "so no one can ever use it", "to avoid paying taxes"], "A patent is like a head start.", "It rewards the work of inventing."],
    ["A secret recipe a company never tells anyone is called a...", "trade secret", ["trademark", "patent number", "warranty"], "It is protected by keeping it hidden.", "The company simply never tells."],
    ["You make a game. Your friends' games must not use your exact characters and code. This is protected by...", "copyright", ["a warranty", "a coupon", "a trade fee"], "It is original creative work.", "Code and art are both creative works."],
    ["If you start a shop called 'Sunny Snacks', what helps protect that name?", "a trademark", ["a patent", "a copyright on the weather", "a mortgage"], "It protects names and logos in business.", "It tells customers who the seller is."]
  ], "Example: a new bike lock design is an invention (patent); the picture on its box is art (copyright); its brand name is a trademark. Now do yours.",
    [["Ideas have value", "💡", "Businesses own ideas as well as things. The law protects them so creators can earn from their work."], ["Three kinds", "🛡️", "A <b>patent</b> protects inventions. A <b>copyright</b> protects creative works. A <b>trademark</b> protects names and logos."], ["Respect others", "🤝", "Never copy another person's work and sell it. Make your own, or get permission."]]));

  l22.push(mcL("Market structures", [
    ["A market with MANY sellers of nearly identical goods (like wheat) is called...", "perfect competition", ["monopoly", "oligopoly", "a tax"], "Many sellers means no one controls the price.", "The goods are almost the same everywhere."],
    ["A market with only ONE seller and no close substitutes is a...", "monopoly", ["perfect competition", "tax", "co-op of buyers"], "Mono means one.", "With no other seller, buyers have no choice."],
    ["A market with just a FEW big sellers is an...", "oligopoly", ["monopoly", "perfect competition", "auction"], "Oligo means few.", "A few firms share the market."],
    ["Many restaurants, each with different menus, is closest to...", "monopolistic competition", ["monopoly", "oligopoly", "a price ceiling"], "Many sellers, but each tries to stand out.", "Products are similar but not identical."],
    ["Why can a monopoly raise prices more easily?", "buyers have no other seller to choose", ["the government pays them", "it has no costs", "its buyers are fewer"], "Think about what shoppers can do if they dislike the price.", "Without alternatives, buyers must pay or go without."],
    ["Which gives buyers the most choice and the strongest pressure for low prices?", "many competing sellers", ["one seller", "two sellers", "a government list"], "Think about what sellers must do to win customers.", "Sellers must compete on price and quality."],
    ["Laws that stop firms from teaming up to fix prices protect...", "competition", ["monopolies", "tariffs", "interest"], "Teaming up lets sellers charge more.", "Free choice by buyers needs real rivals."],
    ["A local water company that is the only provider in a town is often...", "a natural monopoly", ["perfect competition", "an oligopoly", "a free sample"], "It is costly to build many sets of pipes.", "One provider is cheaper than several."]
  ], "Example: one seller is a monopoly, a few sellers are an oligopoly, and many sellers are competitive. Count the sellers. Now do yours.",
    [["Counting sellers", "🏪", "How a market behaves depends on how many sellers there are."], ["Types", "📚", "<b>Competition</b>: many sellers. <b>Oligopoly</b>: a few. <b>Monopoly</b>: one."], ["Why it matters", "🛒", "More competition usually means lower prices and better service for buyers."]]));

  l22.push(L("GDP growth rate", () => {
    const k = ri(0, 2), a = pick([100, 200, 400, 500, 1000]), g = ri(2, 6);
    if (k === 0) return q(`A country's GDP was $${a} billion last year and $${a + a * g / 100} billion this year. What was the growth rate? (percent, just the number)`, g,
      "Growth rate is the percent change.", "Find the change, divide by last year's GDP, then multiply by 100.",
      () => { const x = pick([100, 200]), y = pick([2, 5]); return `Example: from $${x} billion to $${x + x * y / 100} billion. Change ${x * y / 100}. ${x * y / 100} ÷ ${x} × 100 = ${y}%. Now do yours.`; });
    if (k === 1) return q(`A country's GDP was $${a} billion and grew ${g}% this year. What is this year's GDP, in billions of dollars? (a number)`, a + a * g / 100,
      "Find how much it grew, then add that to the old GDP.", "Take the growth percent of last year's GDP.",
      () => { const x = pick([300, 600]), y = pick([2, 3]); return `Example: ${x} billion growing ${y}% adds ${x * y / 100}, so ${x + x * y / 100} billion. Now do yours.`; });
    return q(`A country's GDP grew ${g}% to $${a + a * g / 100} billion. By how many billion dollars did it grow? (a number)`, a * g / 100,
      "Subtract the old GDP from the new GDP.", "You can first find last year's GDP: divide the new GDP by 1 plus the growth rate.",
      () => { const x = pick([200, 300]), y = pick([2, 4]); return `Example: from ${x} to ${x + x * y / 100} billion grew ${x * y / 100} billion. Now do yours.`; });
  }, [["GDP", "🌎", "<b>GDP</b> is the value of everything a country makes in a year."], ["Growth rate", "📈", "Growth rate = (new GDP − old GDP) ÷ old GDP × 100."], ["Healthy growth", "🌱", "Steady growth usually means more jobs and more income. A shrinking GDP can mean a recession."]]));

  l22.push(mcL("Grace periods and statements", [
    ["If you pay your whole statement balance by the due date, the interest on new purchases is usually...", "zero because of the grace period", ["charged on the whole balance", "double", "added to next month"], "Many cards let you avoid interest if you pay in full.", "The grace period gives time to pay without interest."],
    ["The 'statement balance' is...", "what you owed at the end of the billing cycle", ["your credit limit", "the minimum payment", "your savings"], "It's a snapshot on one day.", "It lists everything owed when the cycle ended."],
    ["Paying only the minimum each month means you...", "will be charged interest on the rest", ["owe nothing more", "avoid all interest", "raise your limit"], "The leftover balance is not paid off.", "Interest is charged on the unpaid part."],
    ["What is a credit card's 'minimum payment'?", "the smallest amount you must pay to stay in good standing", ["the amount that clears the whole balance", "the limit", "a reward"], "It is a floor, not a goal.", "It keeps the account from being late."],
    ["A payment that arrives after the due date can cause...", "a late fee and maybe a worse credit score", ["a bigger credit limit", "free interest", "a tax refund"], "Dates matter on a bill.", "Late means penalties."],
    ["The best habit to avoid card interest is to...", "pay the full statement balance each month", ["pay the minimum", "pay every other month", "skip small bills"], "Think about avoiding unpaid balances.", "No leftover means no interest."],
    ["A 'billing cycle' is...", "the time period of about a month covered by one statement", ["a bike ride", "a yearly fee", "the card's expiry"], "It repeats on a schedule.", "One statement covers one period."],
    ["Which is a reason to check your statement every month?", "to spot charges you don't recognize", ["to raise your score by looking", "to avoid paying", "to earn interest"], "Statements list every purchase.", "Mistakes and fraud show up there."]
  ], "Example: a card says pay in full by the due date and you pay no interest on purchases. Paying part leaves a balance that costs interest. Now do yours.",
    [["The statement", "🧾", "Each month your card sends a <b>statement</b> showing purchases, fees, interest and the amount due."], ["Grace period", "⏰", "If you pay the <b>full statement balance</b> by the due date, you usually pay no interest on new purchases."], ["Best habit", "✅", "Pay in full and on time. Paying only the minimum lets interest pile up."]]));

  l22.push(mixOf("Mixed practice", [l22[0], l22[2], l22[3], l22[5], l22[6], l22[10], l22[13]]));
  l22.push(mixOf("Level 22 Challenge", [l22[1], l22[4], l22[7], l22[8], l22[9], l22[11], l22[12], l22[14], l22[15], l22[16], l22[17]]));

  // ======================= LEVEL 23 (11th grade, first half) =======================
  const l23 = [];

  l23.push(L("Monthly housing cost (PITI)", () => {
    const k = ri(0, 2), p = pick([900, 1100, 1250, 1500, 1800, 2000]), t = pick([2400, 3000, 3600, 4800, 6000]), ins = pick([1200, 1800, 2400]), nm = nm0();
    if (k === 0) return q(`${nm}'s mortgage payment for principal and interest is ${D(p)} a month. Property tax is ${D(t)} a year and homeowners insurance is ${D(ins)} a year, both paid monthly with the loan. What is the total monthly payment? (dollars)`, p + (t + ins) / 12,
      "PITI means principal, interest, taxes and insurance, all paid monthly.", "Change the yearly amounts into monthly amounts, then add everything.",
      () => { const a = pick([1000, 1400]), b = pick([1200, 2400]), c = pick([600, 1200]); return `Example: ${D(a)} + ${b}/12 + ${c}/12 = ${a} + ${b / 12} + ${c / 12} = ${D(a + b / 12 + c / 12)}. Now do yours.`; });
    if (k === 1) return q(`A lender collects property tax of ${D(t)} and insurance of ${D(ins)} each year through the monthly payment. How many dollars a month does that add to the payment? (dollars)`, (t + ins) / 12,
      "Yearly costs are spread over 12 months.", "Add the two yearly amounts, then divide by the number of months in a year.",
      () => { const a = pick([1200, 3600]), b = pick([600, 2400]); return `Example: (${a} + ${b}) ÷ 12 = ${D((a + b) / 12)} a month. Now do yours.`; });
    return q(`A home's monthly payment is ${D(p)} for principal and interest. Taxes plus insurance total ${D(t + ins)} a year. What is the total cost for a whole year of principal, interest, taxes and insurance? (dollars)`, 12 * p + t + ins,
      "Find a year of the monthly payment first.", "Multiply the monthly payment by 12, then add the yearly taxes and insurance.",
      () => { const a = pick([1000, 1500]), b = pick([2400, 3600]); return `Example: ${a} × 12 = ${a * 12}, plus ${b} = ${D(a * 12 + b)}. Now do yours.`; });
  }, [["PITI", "🏠", "A mortgage payment often has four parts: <b>P</b>rincipal, <b>I</b>nterest, <b>T</b>axes and <b>I</b>nsurance."], ["Escrow", "🏦", "The lender may collect taxes and insurance each month in an <b>escrow</b> account and pay those bills for you."], ["Do the math", "➗", "Yearly amount ÷ 12 = the monthly share. Add it to the loan payment."]]));

  l23.push(L("Home equity", () => {
    const k = ri(0, 2), V = pick([200000, 250000, 300000, 400000]), nm = nm0();
    if (k === 0) { const M = V - pick([40000, 50000, 60000, 80000, 100000]);
      return q(`${nm}'s home is worth ${D(V)} and the mortgage balance is ${D(M)}. How much equity does ${nm} have? (dollars)`, V - M,
        "Equity is the part you really own.", "Subtract what you owe from what the home is worth.",
        () => { const a = pick([200000, 350000]), b = pick([120000, 150000]); return `Example: worth ${D(a)}, owe ${D(b)}. Equity ${D(a - b)}. Now do yours.`; }); }
    if (k === 1) { const p = pick([2, 4, 5, 10]), M = pick([100000, 120000, 150000]);
      return q(`${nm} owes ${D(M)} on a home worth ${D(V)}. The home's value rises ${p}%. What is the new equity? (dollars)`, V + V * p / 100 - M,
        "First find the new value of the home.", "New value = old value plus the percent rise. Then subtract the loan.",
        () => { const a = pick([200000, 300000]), b = pick([2, 5]), c = pick([100000, 140000]); return `Example: ${D(a)} up ${b}% is ${D(a + a * b / 100)}. Minus ${D(c)} owed is ${D(a + a * b / 100 - c)}. Now do yours.`; }); }
    const e = pick([20, 25, 30, 40, 50]);
    return q(`A home is worth ${D(V)} and the owner owes ${D(V - V * e / 100)}. What percent of the home's value is the owner's equity? (just the number)`, e,
      "Percent equity compares equity to the whole value.", "Find the equity first, then divide by the home's value and multiply by 100.",
      () => { const a = pick([200000, 400000]), b = pick([25, 50]); return `Example: worth ${D(a)}, equity ${D(a * b / 100)}. ${a * b / 100} ÷ ${a} × 100 = ${b}%. Now do yours.`; });
  }, [["What you own", "🏡", "<b>Equity</b> = home value − loan balance. It's the part of the home that's really yours."], ["It changes", "📈", "Equity grows when you pay down the loan and when the home gains value. It can shrink if the value falls."], ["Down payment", "💰", "A bigger down payment gives you more equity on day one."]]));

  l23.push(L("The 28/36 rule", () => {
    const k = ri(0, 2), m = pick([4000, 5000, 6000, 7500, 8000, 10000]), nm = nm0();
    if (k === 0) return q(`${nm}'s gross income is ${D(m)} a month. A common guideline says housing should be at most 28% of gross monthly income. What is the most for housing each month? (dollars)`, m * 28 / 100,
      "Housing gets a percent of income BEFORE taxes.", "Find 28% of the monthly gross income.",
      () => { const a = pick([3000, 5000]); return `Example: 28% of ${D(a)} is ${a} × 0.28 = ${D(a * 28 / 100)}. Now do yours.`; });
    if (k === 1) { const dd = pick([200, 300, 400]);
      return q(`${nm} earns ${D(m)} a month before taxes. A guideline says ALL debt payments should be at most 36% of that. ${nm} already pays ${D(dd)} a month on other debts. How many dollars of the 36% limit are left for housing? (dollars)`, m * 36 / 100 - dd,
        "Find the total allowed first, then take away what is already used.", "Take 36% of gross monthly income and subtract the other debt payments.",
        () => { const a = pick([3000, 5000]), b = pick([100, 200]); return `Example: 36% of ${D(a)} = ${D(a * 36 / 100)}. Minus ${D(b)} = ${D(a * 36 / 100 - b)}. Now do yours.`; }); }
    const S = m * 12;
    return q(`${nm} earns ${D(S)} a year before taxes. Using the 28% housing guideline, what is the most to spend on housing each month? (dollars)`, S / 12 * 28 / 100,
      "Work in months: income per month first.", "Divide the yearly income by 12, then take 28%.",
      () => { const a = 60000; return `Example: ${D(a)} a year is ${D(a / 12)} a month. 28% is ${D(a / 12 * 28 / 100)}. Now do yours.`; });
  }, [["Guidelines for lenders", "📏", "Lenders often use two ratios. The <b>front-end</b> ratio limits housing to about 28% of gross income. The <b>back-end</b> ratio limits all debt to about 36%."], ["Gross, not take-home", "💼", "Both use income before taxes (gross). Check that the numbers fit your real budget too."], ["Why", "🛡️", "Staying under the limits helps keep a payment affordable and lowers the risk of falling behind."]]));

  l23.push(mcL("Fixed or adjustable rate?", [
    ["A fixed-rate mortgage means the interest rate...", "stays the same for the whole loan", ["changes every month", "is lower each year", "is set by the buyer"], "Fixed means not moving.", "The principal-and-interest payment stays steady."],
    ["An adjustable-rate mortgage (ARM) usually...", "has a rate that can change after a starting period", ["has a rate that never changes", "is always cheaper", "has no interest"], "Adjustable means it can be changed.", "The rate may reset on a schedule."],
    ["Who is more at risk if interest rates rise a lot?", "a borrower with an adjustable rate", ["a borrower with a fixed rate", "the government only", "nobody"], "Which loan can follow rates upward?", "A locked rate cannot jump."],
    ["Why might someone choose an ARM?", "the starting rate is often lower", ["the rate can never go up", "there is no payment", "the bank pays the tax"], "Look for a benefit at the start.", "It may cost less at first."],
    ["Which loan makes budgeting easiest?", "a fixed-rate loan", ["an adjustable-rate loan", "a loan with no payments", "a loan that changes yearly"], "You want a payment you can predict.", "Steady beats surprising for planning."],
    ["If rates fall a lot after you take a fixed-rate loan, you might...", "refinance to a lower rate", ["lose your house", "owe nothing", "get a tax refund"], "You can replace the old loan.", "A new loan can pay off the old one."],
    ["A '5/1 ARM' keeps the same rate for 5 years and then...", "can adjust once a year", ["ends the loan", "becomes free", "is fixed forever"], "The first number is the fixed period.", "The second number tells how often it can change after."],
    ["An ARM's 'rate cap' is...", "a limit on how much the rate can rise", ["a hat for borrowers", "a minimum rate", "the down payment"], "Caps protect the borrower.", "It sets an upper limit on increases."]
  ], "Example: a fixed rate stays the same all loan long; an adjustable rate can change later. Think about whether the payment can move. Now do yours.",
    [["Fixed", "🔒", "A <b>fixed-rate</b> loan keeps the same rate for its whole life. The payment is predictable."], ["Adjustable", "🎚️", "An <b>adjustable-rate</b> loan starts at a set rate and can change later. It might start lower but can rise."], ["Refinance", "🔁", "You can <b>refinance</b>: replace a loan with a new one at a better rate. This has fees, so do the math."]]));

  l23.push(L("Buy now, pay later costs", () => {
    const k = ri(0, 2), nm = nm0(), x = ri(15, 60), f = ri(3, 10), n = pick([4, 6]);
    if (k === 0) return q(`${nm} buys a jacket on a "pay later" plan: ${n} payments of ${D(x)} plus a one-time ${D(f)} service fee. What is the total ${nm} pays? (dollars)`, n * x + f,
      "Add up every payment plus the fee.", "Multiply the payment by how many payments, then add the fee.",
      () => { const a = pick([20, 30]), b = pick([4, 6]), c = pick([5, 8]); return `Example: ${b} payments of ${D(a)} plus ${D(c)} fee = ${b} × ${a} + ${c} = ${D(a * b + c)}. Now do yours.`; });
    if (k === 1) { const p = x * n - f;
      return q(`A game console costs ${D(p)} in a store. On a pay-later plan ${nm} pays ${D(p + f)} in total. How many dollars extra did the plan cost? (dollars)`, f,
        "Compare what you pay with the plain price.", "Subtract the store price from the total paid.",
        () => { const a = pick([200, 300]), b = pick([12, 25]); return `Example: price ${D(a)}, paid ${D(a + b)}. Extra ${D(b)}. Now do yours.`; }); }
    const p = ri(80, 300), l = pick([7, 10, 15, 25]), m = ri(1, 4);
    return q(`A ${D(p)} item is on an "interest-free" plan, but each missed payment adds a ${D(l)} late fee. If ${nm} misses ${m} ${m === 1 ? "payment" : "payments"}, what is the total cost? (dollars)`, p + l * m,
      "Interest-free doesn't mean fee-free.", "Multiply the late fee by the number of misses, then add the price.",
      () => { const a = pick([100, 150]), b = pick([10, 15]), c = pick([2, 3]); return `Example: ${D(a)} item, ${c} misses of ${D(b)}: ${a} + ${b * c} = ${D(a + b * c)}. Now do yours.`; });
  }, [["Pay later", "🛍️", "<b>Buy now, pay later</b> splits a purchase into payments. It can feel painless, but it is still debt."], ["Hidden costs", "🔎", "Look for service fees, late fees and what happens if you miss a payment."], ["Test", "✅", "Ask: could I pay for this today? If not, wait and save. Don't stack many small plans."]]));

  l23.push(L("Standard deduction or itemize?", () => {
    const k = ri(0, 2), sd = pick([12000, 13000, 14000, 15000]);
    let m, c, o; do { m = pick([4000, 6000, 8000, 10000]); c = pick([1000, 2000, 3000]); o = pick([2000, 3000, 4000, 5000]); } while (m + c + o === sd);
    const tot = m + c + o, best = Math.max(sd, tot);
    if (k === 0) return q(`Suppose the standard deduction is ${D(sd)}. A family could itemize: mortgage interest ${D(m)}, charity ${D(c)} and state taxes ${D(o)}. What is the larger deduction they can take? (dollars)`, best,
      "Add the itemized items first.", "Compare the itemized total with the standard deduction. Take the bigger.",
      () => { const a = pick([10000, 11000]), b = pick([4000, 5000]), d = pick([3000, 4000]); return `Example: standard ${D(a)}; items ${D(b)} + ${D(d)} = ${D(b + d)}. The larger is ${D(Math.max(a, b + d))}. Now do yours.`; });
    if (k === 1) return q(`The standard deduction is ${D(sd)} and a taxpayer's itemized deductions add up to ${D(tot)}. How many dollars apart are the two amounts? (dollars)`, Math.abs(sd - tot),
      "You want the gap between the two amounts.", "Subtract the smaller from the larger.",
      () => { const a = pick([12000, 14000]), b = pick([9000, 16000]); return `Example: ${D(a)} and ${D(b)}: gap = ${D(Math.abs(a - b))}. Now do yours.`; });
    const ans = tot > sd ? "Itemize" : "Take the standard deduction";
    return mcq(`The standard deduction is ${D(sd)}. A taxpayer's itemized deductions total ${D(tot)}. Which should they choose to lower taxable income the most?`, ans, ["Itemize", "Take the standard deduction", "Take neither"].filter(x => x !== ans),
      "Choose the option with the bigger deduction.", "Compare the two dollar amounts in the question.",
      "Example: standard deduction $12,000 and itemized $9,000. The standard one is bigger, so use that. Now do yours.");
  }, [["Two choices", "🧾", "You can subtract a flat <b>standard deduction</b>, or add up your own <b>itemized deductions</b> (such as mortgage interest, charity, certain taxes)."], ["Pick the bigger", "⚖️", "A bigger deduction lowers your taxable income more. Most people take the standard one."], ["Amounts change", "📅", "The standard deduction changes by year and by filing status, so check the current figure."]]));

  l23.push(L("Self-employment tax", () => {
    const k = ri(0, 2), e = pick([10000, 20000, 30000, 40000, 50000]), nm = nm0();
    if (k === 0) return q(`In a simple model, a self-employed person pays 15.3% of net earnings for Social Security and Medicare. ${nm} nets ${D(e)} from a business. How much self-employment tax is that? (dollars)`, r2(e * 15.3 / 100),
      "Self-employed people pay both the worker half and the boss half.", "Take 15.3% of the net earnings.",
      () => { const a = pick([10000, 20000]); return `Example: 15.3% of ${D(a)} = ${a} × 0.153 = ${D(a * 15.3 / 100)}. Now do yours.`; });
    if (k === 1) return q(`An employee pays 7.65% of pay toward Social Security and Medicare, and the employer pays another 7.65%. On ${D(e)} of pay, how many dollars does the employee pay? (dollars)`, r2(e * 7.65 / 100),
      "The worker pays half of the total. Look at the worker's rate.", "Take 7.65% of the pay.",
      () => { const a = pick([10000, 20000]); return `Example: 7.65% of ${D(a)} = ${a} × 0.0765 = ${D(a * 7.65 / 100)}. Now do yours.`; });
    return q(`${nm} earns ${D(e)} as a freelancer. Compared with an employee earning ${D(e)}, how many extra dollars of Social Security and Medicare tax does ${nm} pay (the boss's half)? Use 7.65% for each half. (dollars)`, r2(e * 7.65 / 100),
      "The extra is the half an employer would normally pay.", "Take 7.65% of the earnings.",
      () => { const a = pick([10000, 20000]); return `Example: on ${D(a)}, the boss's half is ${a} × 0.0765 = ${D(a * 7.65 / 100)}. Now do yours.`; });
  }, [["Two halves", "👷", "Employees pay 7.65% of pay toward Social Security and Medicare, and the employer pays 7.65% more."], ["On your own", "🧑‍💼", "A self-employed person pays both halves: about 15.3% of net earnings (this is a simplified rate)."], ["Plan ahead", "🗓️", "Nobody takes this out for you, so set money aside from each payment you receive."]]));

  l23.push(L("Estimated quarterly taxes", () => {
    const k = ri(0, 2), nm = nm0();
    if (k === 0) { const t = pick([2400, 3600, 4800, 6000, 8000, 10000]);
      return q(`${nm} expects to owe ${D(t)} in taxes this year on freelance income. Estimated taxes are paid in 4 equal installments. How much is each installment? (dollars)`, t / 4,
        "Four equal payments in a year.", "Divide the yearly tax by the number of payments.",
        () => { const a = pick([3200, 6400]); return `Example: ${D(a)} ÷ 4 = ${D(a / 4)}. Now do yours.`; }); }
    if (k === 1) { const r = pick([2, 3]), t = r * pick([800, 1000, 1500]), p = pick([500, 800, 1000]);
      return q(`${nm} owes ${D(t + p)} in estimated tax for the year and has already paid ${D(p)}. The rest will be split equally over ${r} more payments. How much is each? (dollars)`, t / r,
        "Subtract what is already paid first.", "Then divide the remainder by the number of payments left.",
        () => { const a = pick([4000, 6000]), b = pick([1000, 2000]), c = pick([2, 3]); return `Example: owes ${D(a)}, paid ${D(b)}, ${c} payments: (${a} - ${b}) ÷ ${c} = ${D((a - b) / c)}. Now do yours.`; }); }
    const e = pick([2000, 3000, 4000, 5000]), p = pick([20, 25, 30]);
    return q(`${nm} earns ${D(e)} from freelancing in a quarter and sets aside ${p}% for taxes. How many dollars should ${nm} put aside? (dollars)`, e * p / 100,
      "Set-aside is a percent of what you earn.", "Take the percent set aside of the quarter's earnings.",
      () => { const a = pick([1000, 4000]), b = pick([20, 30]); return `Example: ${b}% of ${D(a)} = ${D(a * b / 100)}. Now do yours.`; });
  }, [["No boss to withhold", "📬", "Freelancers and business owners usually pay <b>estimated taxes</b> four times a year."], ["Spread it out", "🧮", "Estimate the year's tax, then split it into equal installments or set aside a percent of each payment."], ["Be safe", "🏦", "Keep tax money in a separate savings account so it isn't spent by mistake."]]));

  l23.push(mcL("Which insurance covers what?", [
    ["Which insurance pays for doctor and hospital bills?", "health insurance", ["renters insurance", "auto insurance", "term life insurance"], "Think about medical costs.", "It helps with the cost of care."],
    ["Which pays for damage you cause to other people's cars in a crash?", "auto liability insurance", ["health insurance", "renters insurance", "disability insurance"], "It covers harm you cause to others.", "Most places require it to drive."],
    ["Which covers your belongings in a rented apartment if there's a fire or theft?", "renters insurance", ["auto insurance", "term life insurance", "health insurance"], "You don't own the building, only your things.", "It protects your stuff and your liability."],
    ["Which pays your family money if you die while the policy is active?", "life insurance", ["disability insurance", "renters insurance", "health insurance"], "Think about helping people who depend on you.", "It is paid to your beneficiaries."],
    ["Which replaces part of your income if an illness or injury keeps you from working?", "disability insurance", ["life insurance", "auto insurance", "renters insurance"], "Your ability to earn is what is protected.", "It pays you while you can't work."],
    ["Term life insurance covers you...", "for a set number of years", ["for life, always", "only on weekends", "only if you travel"], "Term means a period of time.", "It ends when the term ends."],
    ["Whole life insurance differs from term because it...", "lasts your whole life and costs more", ["is cheaper", "ends in 5 years", "covers cars"], "Whole refers to life.", "It also builds a cash value, which raises the price."],
    ["Why have insurance at all?", "to protect against a loss too big to pay yourself", ["to earn lots of money", "to avoid ever paying anything", "to make claims for fun"], "It is about risk.", "Many people share the cost of rare, big losses."]
  ], "Example: if a question mentions medical bills, think health insurance; a car crash, auto insurance; a rented home, renters insurance. Now do yours.",
    [["Share the risk", "🛡️", "Many people pay a small <b>premium</b>. The few who have a big loss get paid from the shared money."], ["Common kinds", "📚", "<b>Health</b>, <b>auto</b>, <b>renters</b> or <b>home</b>, <b>life</b> and <b>disability</b> insurance each cover a different risk."], ["Term and whole", "⏳", "<b>Term life</b> covers a set number of years and costs less. <b>Whole life</b> lasts your lifetime and costs more."]]));

  l23.push(L("Future value of yearly deposits", () => {
    const k = ri(0, 2), nm = nm0();
    const pr = pick([[5, 400], [10, 100]]), f = pr[0] === 5 ? 1.05 : 1.1, d = pr[1] * ri(1, pr[0] === 5 ? 5 : 20);
    const fv3 = r2(d * (f * f + f + 1)), fv2 = r2(d * (f + 1));
    if (k === 0) return q(`${nm} deposits ${D(d)} at the END of each year for 3 years in an account that earns ${pr[0]}% a year. What is the balance right after the third deposit? (dollars)`, fv3,
      "The first deposit grows for 2 years, the second for 1 year, and the last not at all.", "Grow each deposit by its number of years, then add the three amounts.",
      () => { const a = pick([100, 200]); return `Example: ${D(a)} a year at 10%: ${a} × 1.21 = ${a * 1.21}, plus ${a} × 1.1 = ${a * 1.1}, plus ${a}. Total ${D(a * 1.21 + a * 1.1 + a)}. Now do yours.`; });
    if (k === 1) return q(`${nm} deposits ${D(d)} at the END of each year for 3 years in an account that earns ${pr[0]}% a year. How many dollars of the balance after the third deposit are interest, not deposits? (dollars)`, r2(fv3 - 3 * d),
      "Interest is the total balance minus what was put in.", "First find the final balance, then subtract the three deposits.",
      () => { const a = pick([100, 200]); return `Example: ${D(a)} a year at 10% gives ${D(a * 3.31)}. Deposits were ${D(a * 3)}. Interest ${D(a * 3.31 - a * 3)}. Now do yours.`; });
    return q(`${nm} deposits ${D(d)} at the END of each year for 2 years in an account that earns ${pr[0]}% a year. What is the balance right after the second deposit? (dollars)`, fv2,
      "The first deposit grows for one year. The second has no time to grow.", "Grow the first deposit once, then add the second.",
      () => { const a = pick([100, 200]); return `Example: ${D(a)} a year at 10%: ${a} × 1.1 = ${a * 1.1}, plus ${a} = ${D(a * 2.1)}. Now do yours.`; });
  }, [["Saving every year", "🪙", "Regular deposits are the engine of saving. Each deposit starts growing from the day it goes in."], ["Earlier grows longer", "⏳", "With deposits at the end of each year, the first grows for the most years. Grow each one, then add."], ["Interest vs deposits", "➗", "Interest earned = final balance − everything you deposited."]]));

  l23.push(L("Average yearly growth", () => {
    const k = ri(0, 2), r = pick([10, 20]), n = r === 10 ? pick([2, 3]) : 2, f = 1 + r / 100;
    const a = r === 10 ? (n === 3 ? 1000 * ri(1, 5) : 100 * ri(1, 20)) : 25 * ri(2, 20), b = r2(a * Math.pow(f, n));
    if (k === 0) return q(`An investment grew from ${D(a)} to ${D(b)} in ${n} years, growing by the same percent each year. What was that yearly growth rate? (percent, just the number)`, r,
      "The same percent applied again and again.", `Ask: what yearly multiplier, used ${n} times, turns the start into the end? Turn the multiplier into a percent.`,
      () => { const x = pick([100, 200]); return `Example: ${D(x)} to ${D(x * 1.21)} in 2 years. 1.1 × 1.1 = 1.21, so the multiplier is 1.1, which is 10%. Now do yours.`; });
    if (k === 1) return q(`A balance of ${D(a)} grows ${r}% a year for ${n} years. What is it worth at the end? (dollars)`, b,
      "Each year's growth builds on the last year's balance.", `Multiply by ${f} once for each year.`,
      () => { const x = pick([100, 200]); return `Example: ${D(x)} at 10% for 2 years: ${x} × 1.1 = ${x * 1.1}, then × 1.1 = ${D(x * 1.21)}. Now do yours.`; });
    return q(`A balance of ${D(a)} grows ${r}% a year for 1 year and then another ${r}%. How many dollars did it gain in total? (dollars)`, r2(a * f * f - a),
      "The second gain is bigger than the first because the balance is bigger.", "Find the final balance after both years, then subtract the start.",
      () => { const x = pick([100, 200]); return `Example: ${D(x)} at 10% twice becomes ${D(x * 1.21)}. The gain is ${D(x * 1.21 - x)}. Now do yours.`; });
  }, [["Compound growth", "🌱", "When something grows by the same percent each year, each year's growth is bigger than the last."], ["Average yearly rate", "📊", "The <b>compound annual growth rate (CAGR)</b> is the steady yearly rate that gets you from the start to the end."], ["Check it", "✅", "Multiply the start by (1 + rate) once per year. If you land on the end value, the rate is right."]]));

  l23.push(mcL("Market ups and downs", [
    ["A 'bull market' is when stock prices are generally...", "rising", ["falling", "frozen", "closed"], "Bulls thrust their horns upward.", "Think of the market going up."],
    ["A 'bear market' is when stock prices are generally...", "falling", ["rising", "frozen", "doubled"], "Bears swipe downward.", "Think of the market going down."],
    ["'Volatility' describes...", "how much prices jump up and down", ["how many stocks exist", "the tax rate", "the price of a company"], "It's about the size of the swings.", "Bumpy rides have high volatility."],
    ["Which approach usually works best for long-term investors during a drop?", "stay calm and stick to the plan", ["sell everything in a panic", "borrow to buy more", "stop checking forever"], "Strong reactions often cost money.", "Markets have recovered from past drops, though not always quickly."],
    ["What is 'diversification'?", "spreading money across many investments", ["putting all money in one stock", "avoiding investing", "borrowing money"], "Don't put all eggs in one basket.", "Many different holdings reduce risk."],
    ["An 'index fund' tries to...", "match a whole market index", ["beat every investor", "own just one stock", "avoid all risk"], "It follows a list of many companies.", "It's passive and low-cost."],
    ["Past performance of an investment...", "does not guarantee future results", ["promises the same return", "is always bad", "is illegal to show"], "Markets change.", "No one can promise next year's return."],
    ["Money you will need in 1 year is better kept in...", "a savings account or similar safe place", ["a risky stock", "a stock tip from a stranger", "a scheme promising 50% returns"], "Short time means you can't wait out drops.", "Safe and available beats high return."]
  ], "Example: if prices fall for a long time, that is a bear market; if they rise, a bull market. Now do yours.",
    [["Up and down", "🐂", "Markets rise (<b>bull</b>) and fall (<b>bear</b>). Both happen many times over the years."], ["Volatility", "🎢", "Prices bounce more in the short run than in the long run."], ["Smart habits", "🧭", "Invest money you won't need soon, spread it out, and keep costs low. No investment is guaranteed."]]));

  l23.push(L("Stock splits", () => {
    const k = ri(0, 2), r = pick([2, 3, 4, 5]), sh = pick([10, 20, 30, 50]), pr = r * pick([20, 30, 40, 50]), nm = nm0();
    if (k === 0) return q(`A company does a ${r}-for-1 stock split. ${nm} owned ${sh} shares. How many shares does ${nm} own after the split? (a number)`, sh * r,
      "Each old share turns into more shares.", "Multiply the shares by the split number.",
      () => { const a = pick([10, 20]), b = pick([2, 3]); return `Example: ${b}-for-1 split with ${a} shares gives ${a} × ${b} = ${a * b}. Now do yours.`; });
    if (k === 1) return q(`A stock costs ${D(pr)} a share. The company does a ${r}-for-1 split. What is the price per share right after the split? (dollars)`, pr / r,
      "The company is worth the same; there are just more shares.", "Divide the old price by the split number.",
      () => { const a = pick([60, 120]), b = pick([2, 3]); return `Example: ${D(a)} with a ${b}-for-1 split is ${a} ÷ ${b} = ${D(a / b)}. Now do yours.`; });
    return q(`${nm} owns ${sh} shares worth ${D(pr)} each. After a ${r}-for-1 split, what is the total value of ${nm}'s shares? (dollars)`, sh * pr,
      "A split changes the number of shares and the price, but not the total.", "Total value is the same before and after, so use the shares and price you were given.",
      () => { const a = pick([5, 8]), b = pick([30, 40]); return `Example: ${a} shares at ${D(b)} = ${D(a * b)}. After a split into more shares at a lower price, the total is still ${D(a * b)}. Now do yours.`; });
  }, [["Cutting the pie", "🍕", "A <b>stock split</b> turns each share into several. A 2-for-1 split doubles your shares."], ["Price falls to match", "🏷️", "The price per share falls by the same factor, so the company's value does not change."], ["Why do it?", "🤔", "Lower share prices feel easier to buy. But a split doesn't make you richer or poorer by itself."]]));

  l23.push(L("Contribution margin", () => {
    const k = ri(0, 2), nm = nm0();
    if (k === 0) { const p = ri(8, 40), v = ri(2, p - 2);
      return q(`${nm} sells a candle for ${D(p)}. Wax and wick cost ${D(v)} per candle. What is the contribution margin per candle? (dollars)`, p - v,
        "It's what each sale contributes toward covering fixed costs and profit.", "Subtract the variable cost from the selling price.",
        () => { const a = pick([12, 20]), b = pick([5, 7]); return `Example: price ${D(a)}, variable cost ${D(b)}. Margin ${D(a - b)}. Now do yours.`; }); }
    if (k === 1) { const p = ri(8, 30), v = ri(2, p - 2), n = pick([20, 40, 50, 100]);
      return q(`Each item sells for ${D(p)} and has ${D(v)} of variable cost. After selling ${n} items, how many dollars have the sales contributed toward fixed costs and profit? (dollars)`, (p - v) * n,
        "Find the contribution of one item first.", "Multiply the margin per item by the number sold.",
        () => { const a = pick([10, 14]), b = pick([4, 6]), c = pick([10, 30]); return `Example: (${a} - ${b}) × ${c} = ${D((a - b) * c)}. Now do yours.`; }); }
    let p, v, r;
    do { p = pick([20, 40, 50, 80]); r = pick([25, 40, 50, 60, 75]); v = p * (100 - r) / 100; } while (!Number.isInteger(v));
    return q(`A product sells for ${D(p)} and has ${D(v)} of variable cost. What percent of the price is the contribution margin? (just the number)`, r,
      "Percent margin compares the margin to the price.", "Find price minus variable cost, divide by the price, then multiply by 100.",
      () => { const a = pick([10, 30]), b = pick([2, 3]); return `Example: price ${D(a)}, margin ${D(a * b / 10)}: ${a * b / 10} ÷ ${a} × 100 = ${b * 10}%. Now do yours.`; });
  }, [["After variable costs", "🕯️", "<b>Contribution margin</b> = price − variable cost per item. It's what each sale adds toward fixed costs and profit."], ["Percent form", "%", "Margin percent = margin ÷ price × 100."], ["Why it helps", "🔧", "Compare products: the one with the bigger margin helps the business more per sale."]]));

  l23.push(L("Break-even revenue", () => {
    const k = ri(0, 2), m = pick([20, 25, 40, 50]), F = pick([2000, 3000, 4000, 6000]), nm = nm0();
    if (k === 0) return q(`${nm}'s shop has ${D(F)} of fixed costs a month and keeps ${m}% of every sales dollar after variable costs. How many dollars of sales are needed to break even? (dollars)`, F * 100 / m,
      "At break-even, margin earned equals fixed costs.", "Divide the fixed costs by the margin as a decimal.",
      () => { const a = pick([1000, 3000]), b = pick([20, 50]); return `Example: fixed ${D(a)}, margin ${b}%. ${a} ÷ ${b / 100} = ${D(a * 100 / b)}. Now do yours.`; });
    if (k === 1) { const g = pick([500, 1000]);
      return q(`A shop has ${D(F)} of fixed costs a month and keeps ${m}% of every sales dollar after variable costs. How many dollars of sales are needed to earn a ${D(g)} profit? (dollars)`, (F + g) * 100 / m,
        "Margin must cover the fixed costs AND the profit.", "Add the fixed costs and the profit goal, then divide by the margin as a decimal.",
        () => { const a = pick([1000, 3000]), b = pick([20, 50]), c = pick([200, 500]); return `Example: (${a} + ${c}) ÷ ${b / 100} = ${D((a + c) * 100 / b)}. Now do yours.`; });
    }
    const s = F * 100 / m;
    return q(`A shop has sales of ${D(s)} in a month, keeps ${m}% of sales after variable costs, and has ${D(F)} of fixed costs. What is the profit? (dollars)`, 0 + (s * m / 100 - F),
      "Margin earned minus fixed costs is the profit.", "Find the margin dollars first, then subtract the fixed costs.",
      () => { const a = pick([1000, 2000]), b = pick([20, 50]); return `Example: sales ${D(a * 100 / b * 2)}, margin ${b}%, fixed ${D(a)}: margin ${D(a * 2)}, profit ${D(a)}. Now do yours.`; });
  }, [["The break-even point", "⚖️", "<b>Break-even</b> is where profit is zero: the margin earned just covers fixed costs."], ["In dollars of sales", "💵", "Break-even sales = fixed costs ÷ margin percent (as a decimal)."], ["Profit goal", "🎯", "To earn a profit, add the goal to the fixed costs before dividing."]]));

  l23.push(L("Price and revenue", () => {
    const k = ri(0, 2);
    let base, sl, prices, best, ok;
    do {
      base = pick([100, 120, 150]); sl = pick([4, 5, 6]);
      prices = shuf([4, 5, 6, 7, 8, 9, 10, 11, 12, 14]).slice(0, 4).sort((a, b) => a - b);
      best = prices.reduce((b, p) => (p * (base - sl * p) > b * (base - sl * b) ? p : b), prices[0]);
      ok = prices.filter(p => p * (base - sl * p) === best * (base - sl * best)).length === 1 && base - sl * prices[3] > 0;
    } while (!ok);
    const units = p => base - sl * p, rev = p => p * units(p);
    const rows = prices.map(p => `${D(p)}: ${units(p)} sold`).join("; ");
    if (k === 0) return mcq(`A seller tests prices. ${rows}. Which price brings in the most revenue?`, D(best), prices.filter(p => p !== best).map(D),
      "Revenue = price × units sold for each price.", "Work out the revenue for every price and compare them.",
      "Example: $5: 20 sold (revenue 100); $8: 15 sold (revenue 120). The higher revenue is at $8. Now do yours.");
    if (k === 1) return q(`A seller tests prices. ${rows}. What is the largest revenue among these prices? (dollars)`, rev(best),
      "Find the revenue for each price.", "Multiply price by units sold for each row and pick the biggest.",
      () => { const a = pick([3, 4]), b = pick([30, 40]), c = pick([5, 6]), d = pick([20, 25]); return `Example: ${D(a)} × ${b} = ${a * b}; ${D(c)} × ${d} = ${c * d}. The larger is ${D(Math.max(a * b, c * d))}. Now do yours.`; });
    const p2 = pick(prices);
    return q(`At a price of ${D(p2)} a store sells ${units(p2)} items. What is the revenue? (dollars)`, rev(p2),
      "Revenue is all the money from sales.", "Multiply the price by the number sold.",
      () => { const a = pick([3, 4]), b = pick([30, 40]); return `Example: ${D(a)} × ${b} = ${D(a * b)}. Now do yours.`; });
  }, [["A higher price isn't always best", "🏷️", "Raise the price and fewer people buy. Revenue = price × units sold."], ["Compare", "📋", "Work out the revenue at each price and see which is highest."], ["Profit too", "🧮", "Real firms also look at costs. The best revenue price may not be the best profit price."]]));

  l23.push(L("Investors and ownership", () => {
    const k = ri(0, 2), s = pick([10, 20, 25, 40]), I = pick([20000, 50000, 100000]), nm = nm0();
    if (k === 0) return q(`An investor gives ${nm}'s startup ${D(I)} for ${s}% of the company. That means the company is valued at how many dollars with the new money? (dollars)`, I * 100 / s,
      "If a part is worth some dollars, the whole is bigger.", "Divide the investment by the share as a decimal.",
      () => { const a = pick([10000, 30000]), b = pick([10, 20]); return `Example: ${D(a)} for ${b}% means ${a} ÷ ${b / 100} = ${D(a * 100 / b)}. Now do yours.`; });
    if (k === 1) return q(`${nm} owns all of a company and sells ${s}% to an investor. What percent does ${nm} still own? (just the number)`, 100 - s,
      "All the shares add up to 100%.", "Take the share sold away from 100.",
      () => { const a = pick([15, 30]); return `Example: sell ${a}%, keep 100 - ${a} = ${100 - a}%. Now do yours.`; });
    const V = pick([200000, 400000, 500000, 1000000]);
    return q(`A company is valued at ${D(V)}. An investor wants ${s}% of it. How many dollars does the investor put in? (dollars)`, V * s / 100,
      "The investor pays for their slice of the value.", "Take the share percent of the company's value.",
      () => { const a = pick([100000, 300000]), b = pick([10, 20]); return `Example: ${b}% of ${D(a)} = ${D(a * b / 100)}. Now do yours.`; });
  }, [["Selling a slice", "🍰", "A startup can sell part of itself (<b>equity</b>) to investors in return for money."], ["Valuation", "🏷️", "If $10,000 buys 10%, the whole company is valued at $100,000."], ["Trade-off", "⚖️", "You keep less of the company, but the new money may help it grow bigger."]]));

  l23.push(L("Inventory turnover", () => {
    const k = ri(0, 2), t = ri(2, 8), A = pick([5000, 10000, 20000, 25000]), nm = nm0();
    if (k === 0) return q(`${nm}'s shop sold goods that cost ${D(A * t)} to buy during the year (cost of goods sold). The average inventory was ${D(A)}. What is the inventory turnover? (times per year)`, t,
      "Turnover tells how many times the stock was sold and replaced.", "Divide the cost of goods sold by the average inventory.",
      () => { const a = pick([4000, 6000]), b = pick([3, 5]); return `Example: COGS ${D(a * b)}, average inventory ${D(a)}. ${a * b} ÷ ${a} = ${b}. Now do yours.`; });
    if (k === 1) { const tt = pick([2, 3, 4, 6, 12]);
      return q(`A store turns over its inventory ${tt} times a year. About how many months does an item stay in stock, on average? (a number)`, 12 / tt,
        "A year has 12 months.", "Divide 12 by the number of turns in a year.",
        () => { const a = pick([2, 6]); return `Example: ${a} turns a year means 12 ÷ ${a} = ${12 / a} months in stock. Now do yours.`; }); }
    return q(`A shop's average inventory is ${D(A)} and it turns over ${t} times a year. What was the cost of goods sold for the year? (dollars)`, A * t,
      "Turnover = COGS ÷ average inventory. You need the COGS.", "Multiply the turnover by the average inventory.",
      () => { const a = pick([4000, 8000]), b = pick([3, 5]); return `Example: ${b} turns on ${D(a)} stock is ${a} × ${b} = ${D(a * b)}. Now do yours.`; });
  }, [["Stock on shelves", "📦", "<b>Inventory</b> is the goods a business holds to sell. Unsold stock ties up money."], ["Turnover", "🔁", "Inventory turnover = cost of goods sold ÷ average inventory."], ["Fast or slow", "🐇", "A high turnover means goods sell quickly. Very low turnover can mean too much stock."]]));

  l23.push(mixOf("Mixed practice", [l23[0], l23[1], l23[4], l23[7], l23[9], l23[12], l23[13], l23[14]]));
  l23.push(mixOf("Level 23 Challenge", [l23[2], l23[3], l23[5], l23[6], l23[8], l23[10], l23[11], l23[15], l23[16], l23[17]]));

  // ======================= LEVEL 24 (11th grade, second half) =======================
  const l24 = [];

  l24.push(L("Adding up GDP", () => {
    const k = ri(0, 2), C = pick([600, 700, 800, 900]), I = pick([150, 200, 250]), G = pick([200, 250, 300]), X = pick([100, 150, 200]), M = pick([80, 120, 160]);
    const gdp = C + I + G + X - M;
    if (k === 0) return q(`In billions of dollars: consumer spending C = ${C}, investment I = ${I}, government spending G = ${G}, exports X = ${X}, imports M = ${M}. What is GDP = C + I + G + (X − M)? (billions)`, gdp,
      "Add the four parts of spending, with net exports as exports minus imports.", "Work out X − M first, then add C, I and G.",
      () => { const a = pick([500, 700]), b = pick([100, 200]), c = pick([150, 250]), d = pick([60, 90]), e = pick([30, 50]); return `Example: C ${a}, I ${b}, G ${c}, X ${d}, M ${e}: ${a} + ${b} + ${c} + (${d} - ${e}) = ${a + b + c + d - e}. Now do yours.`; });
    if (k === 1) return q(`A country has GDP of ${gdp} billion, C = ${C}, I = ${I}, G = ${G} and exports X = ${X}. How many billion dollars are the imports (M)? (a number)`, M,
      "GDP = C + I + G + X − M. Put the known numbers in.", "Add C, I, G and X, then subtract GDP to see how much was taken away by imports.",
      () => { const a = pick([400, 600]), b = pick([100, 150]), c = pick([100, 200]), d = pick([50, 70]), e = pick([20, 40]); return `Example: GDP ${a + b + c + d - e} with C ${a}, I ${b}, G ${c}, X ${d}: M = ${a} + ${b} + ${c} + ${d} - ${a + b + c + d - e} = ${e}. Now do yours.`; });
    return q(`Consumer spending is ${C}, investment ${I} and government spending ${G} (billions). Exports are ${X} and imports ${M}. How many billion dollars is the total of C + I + G (domestic spending) before trade? (a number)`, C + I + G,
      "Leave out exports and imports.", "Add the first three numbers only.",
      () => { const a = pick([300, 500]), b = pick([100, 200]), c = pick([50, 80]); return `Example: ${a} + ${b} + ${c} = ${a + b + c}. Now do yours.`; });
  }, [["Four kinds of spending", "🧩", "GDP = <b>C</b> (consumers) + <b>I</b> (business investment) + <b>G</b> (government) + <b>(X − M)</b> (exports minus imports)."], ["Net exports", "🚢", "Exports bring money in. Imports send spending out. Net exports = X − M."], ["Why useful", "📈", "The parts show where growth is coming from."]]));

  l24.push(L("GDP per person", () => {
    const k = ri(0, 1), pop = pick([10, 20, 25, 50]), nm = pick(["Northia", "Bluland", "Greenvale", "Sunreach"]);
    if (k === 0) { const g = pick([200, 300, 500, 600, 800]);
      return q(`${nm} has GDP of ${g} billion dollars and ${pop} million people. What is the GDP per person? (dollars)`, g * 1000 / pop,
        "Per person means share each person gets if you divide equally.", "Billions → millions: 1 billion is 1,000 million. Divide GDP in millions by the population in millions.",
        () => { const a = pick([100, 400]), b = pick([10, 20]); return `Example: ${a} billion = ${a * 1000} million. ${a * 1000} ÷ ${b} = ${D(a * 1000 / b)} per person. Now do yours.`; }); }
    const per = pick([20000, 30000, 40000, 50000]);
    return q(`${nm} has ${pop} million people and a GDP per person of ${D(per)}. What is its total GDP, in billions of dollars? (a number)`, per * pop / 1000,
      "Total = per-person amount × number of people.", "Multiply, then change millions of dollars into billions by dividing by 1,000.",
      () => { const a = pick([10000, 20000]), b = pick([10, 30]); return `Example: ${D(a)} × ${b} million = ${a * b} million = ${a * b / 1000} billion. Now do yours.`; });
  }, [["A fair share", "👥", "<b>GDP per person</b> = GDP ÷ population. It shows the average output per person."], ["Careful with units", "🔢", "1 billion = 1,000 million. Make sure both numbers use the same unit before dividing."], ["Limits", "⚠️", "It's an average. It doesn't show how fairly the money is shared."]]));

  l24.push(mcL("Fiscal and monetary policy", [
    ["Changes to government taxes and spending are called...", "fiscal policy", ["monetary policy", "trade policy", "weather policy"], "Think about the government budget.", "Congress and the President decide it."],
    ["Changes to interest rates and the money supply by the central bank are called...", "monetary policy", ["fiscal policy", "tax policy", "budget policy"], "Think of the central bank.", "It's about money and interest rates."],
    ["To slow a fast-rising inflation, the central bank might...", "raise interest rates", ["lower interest rates", "print free money", "ban all loans"], "Make borrowing cost more.", "Higher costs of loans cool spending."],
    ["To help a weak economy, the central bank might...", "lower interest rates", ["raise interest rates", "close banks", "raise all taxes"], "Make borrowing easier.", "Cheaper loans encourage spending."],
    ["A government cutting taxes and boosting spending to help growth is using...", "fiscal policy", ["monetary policy", "barter", "tariffs"], "Taxes and spending belong to the budget.", "It is run by lawmakers."],
    ["Which group sets fiscal policy in the US?", "Congress and the President", ["The Federal Reserve", "banks", "stock exchanges"], "Elected leaders.", "They pass budgets and tax laws."],
    ["Which group sets monetary policy in the US?", "the Federal Reserve", ["Congress", "the Supreme Court", "city councils"], "It's a central bank.", "It is often called the Fed."],
    ["A government deficit happens when...", "it spends more than it collects in a year", ["it collects more than it spends", "it has no budget", "it prints coins"], "Compare spending and revenue.", "Spending is higher than income."]
  ], "Example: if the topic is taxes and government spending, it's fiscal; if it's interest rates from the central bank, it's monetary. Now do yours.",
    [["Two tools", "🛠️", "<b>Fiscal policy</b> is the government's taxes and spending. <b>Monetary policy</b> is the central bank's control of interest rates and money."], ["Cooling or warming", "🌡️", "Lower rates or taxes can warm a weak economy. Higher rates or taxes can cool one that is overheating."], ["Trade-offs", "⚖️", "Each choice has side effects, such as higher debt or slower growth."]]));

  l24.push(mcL("Types of unemployment", [
    ["Someone between jobs who is looking for a better one has...", "frictional unemployment", ["structural unemployment", "cyclical unemployment", "no unemployment type"], "They are in a short gap.", "It happens even in a good economy."],
    ["Workers whose skills no longer match the jobs available face...", "structural unemployment", ["frictional unemployment", "cyclical unemployment", "seasonal pay"], "Skills and jobs don't line up.", "New technology or industries can cause it."],
    ["Job losses caused by a recession are...", "cyclical unemployment", ["frictional unemployment", "structural unemployment", "seasonal unemployment"], "It follows the ups and downs of the economy.", "It rises when the economy is weak."],
    ["A ski instructor out of work in summer has...", "seasonal unemployment", ["cyclical unemployment", "structural unemployment", "frictional unemployment"], "The job depends on the time of year.", "Seasons repeat."],
    ["Retraining workers for new industries helps reduce...", "structural unemployment", ["seasonal changes", "inflation", "tariffs"], "Give them skills for the jobs that exist.", "Skills mismatch is the problem."],
    ["Who counts as unemployed in the official rate?", "people without a job who are actively looking", ["everyone without a job", "children", "retired people"], "They want to work and are searching.", "Not all non-workers are counted."],
    ["Unemployment that is always present to some degree, even in a healthy economy, is called...", "the natural rate", ["a depression", "a tariff", "a surplus"], "People always change jobs.", "Some unemployment is normal."],
    ["A good way to protect your own job prospects is to...", "keep learning new skills", ["stop applying", "avoid changing", "ignore trends"], "Skills help you adapt.", "Changing industries reward learners."]
  ], "Example: a short gap between two jobs is frictional; a recession is cyclical; skills out of date is structural. Now do yours.",
    [["Why people are out of work", "🔎", "<b>Frictional</b>: between jobs. <b>Structural</b>: skills don't match. <b>Cyclical</b>: the economy is weak. <b>Seasonal</b>: depends on the season."], ["Natural rate", "📊", "Some unemployment always exists, because people move and industries change."], ["Be ready", "🎓", "Learning skills that are in demand makes it easier to find work."]]));

  l24.push(mcL("The Federal Reserve", [
    ["The Federal Reserve is the...", "central bank of the United States", ["largest store", "tax office", "stock exchange"], "It is a bank for banks and the government.", "It guides money and interest rates."],
    ["One of the Fed's main goals is stable prices, which means keeping...", "inflation low and steady", ["prices at zero", "all prices equal", "salaries fixed"], "Prices should not jump around.", "The Fed aims for about 2% a year."],
    ["The Fed's other main goal, besides stable prices, is...", "maximum employment", ["maximum taxes", "closing banks", "free loans for all"], "It wants jobs for people who want them.", "Employment is half of its mission."],
    ["The Fed's main tool is to set a target for...", "short-term interest rates", ["the price of bread", "stock prices", "tax rates"], "Banks lend to each other at it.", "It affects loan costs across the economy."],
    ["When the Fed raises its rate, loans usually...", "cost more", ["cost less", "disappear", "become free"], "Borrowing gets more expensive.", "Other rates follow it."],
    ["The Fed is designed to be independent so that...", "decisions are not driven by election politics", ["it can ignore all laws", "it can spend freely", "it can print unlimited money for friends"], "Think of long-term decisions.", "It's insulated from short-term pressure."],
    ["Banks must keep some money safe and be supervised. The Fed helps by...", "supervising many banks", ["opening new shops", "giving away money", "setting tax laws"], "It checks that banks are sound.", "Regulation protects savers."],
    ["Printing a huge amount of money without making more goods would most likely cause...", "inflation", ["lower prices", "more jobs forever", "lower interest rates forever"], "More money chasing the same goods.", "Prices tend to rise."]
  ], "Example: the central bank's two big goals are stable prices and maximum employment. Now do yours.",
    [["The central bank", "🏛️", "The <b>Federal Reserve</b> (the Fed) is the US central bank. It was created in 1913."], ["Two goals", "🎯", "Keep prices stable (about 2% inflation) and keep employment high."], ["Its tool", "🔧", "It moves a short-term interest rate up or down to speed up or slow down the economy."]]));

  l24.push(L("Tariffs and trade", () => {
    const k = ri(0, 2), P = pick([10, 20, 40, 50, 80, 100]), t = pick([5, 10, 20, 25]), n = pick([100, 200, 500, 1000]);
    if (k === 0) return q(`A tariff is a tax on imports. A jacket made abroad costs ${D(P)} to import. The tariff is ${t}%. What is the cost of the jacket after the tariff? (dollars)`, r2(P + P * t / 100),
      "The tariff adds to the price.", "Find the tariff percent of the price, then add it on.",
      () => { const a = pick([20, 60]), b = pick([10, 50]); return `Example: ${D(a)} with a ${b}% tariff adds ${D(a * b / 100)}, so ${D(a + a * b / 100)}. Now do yours.`; });
    if (k === 1) return q(`A tariff of ${t}% is placed on imported toys that cost ${D(P)} each. How many dollars of tariff is paid per toy? (dollars)`, r2(P * t / 100),
      "Tariff is a percent of the item's price.", "Take the tariff percent of the price.",
      () => { const a = pick([30, 90]), b = pick([10, 20]); return `Example: ${b}% of ${D(a)} = ${D(a * b / 100)}. Now do yours.`; });
    return q(`A country imports ${n} items priced at ${D(P)} each and charges a ${t}% tariff. How many dollars of tariff money does the government collect? (dollars)`, r2(n * P * t / 100),
      "First find the tariff on one item.", "Multiply the tariff on one item by the number of items.",
      () => { const a = pick([10, 20]), b = pick([10, 50]), c = pick([100, 200]); return `Example: ${b}% of ${D(a)} = ${D(a * b / 100)}. Times ${c} items = ${D(a * b / 100 * c)}. Now do yours.`; });
  }, [["A tax on imports", "🚢", "A <b>tariff</b> is a tax on goods that come from other countries."], ["Who pays?", "💵", "The importer pays first, but the cost often passes to shoppers as higher prices."], ["Why use them?", "⚖️", "Governments may use tariffs to protect local jobs or to raise money. Many economists note they can also raise prices and reduce choice."]]));

  l24.push(mcL("Strong and weak dollar", [
    ["When the dollar becomes stronger, it buys...", "more foreign currency", ["less foreign currency", "the same amount always", "nothing"], "A strong currency has more buying power abroad.", "Your dollar goes further."],
    ["A stronger dollar makes imported goods...", "cheaper for US buyers", ["more expensive for US buyers", "free", "unchanged"], "A dollar stretches further abroad.", "US shoppers pay less in dollars."],
    ["A stronger dollar makes US exports...", "more expensive for foreign buyers", ["cheaper for foreign buyers", "free", "unchanged"], "Foreign buyers need more of their own money for each dollar.", "It becomes harder to sell abroad."],
    ["A weaker dollar helps US exporters because their goods...", "become cheaper for foreign buyers", ["become pricier", "must be given away", "can't be sold"], "Foreign money buys more dollars.", "Goods priced in dollars cost them less."],
    ["If 1 euro = 1.10 dollars and the euro becomes worth 1.20 dollars, the dollar has...", "weakened against the euro", ["strengthened against the euro", "not changed", "disappeared"], "More dollars are needed for one euro.", "A euro costs more dollars now."],
    ["A trip to Europe is cheapest for an American when the dollar is...", "strong", ["weak", "closed", "borrowed"], "A stronger dollar buys more euros.", "Your hotel costs fewer dollars."],
    ["Exchange rates move because of...", "supply and demand for currencies", ["the weather only", "store hours", "the size of coins"], "Currencies are traded like goods.", "Demand changes the price."],
    ["A company that sells mainly abroad usually prefers...", "a weaker home currency", ["a much stronger home currency", "no customers", "high tariffs on itself"], "It wants its goods to look cheap to foreigners.", "A weaker currency gives it an advantage."]
  ], "Example: if your money buys more foreign money, imports cost you less and your exports cost foreigners more. Now do yours.",
    [["A currency's strength", "💱", "A <b>strong</b> dollar buys more foreign money. A <b>weak</b> dollar buys less."], ["Imports and exports", "🚢", "A strong dollar makes imports cheaper but exports harder to sell. A weak dollar does the opposite."], ["Winners and losers", "🔁", "Travelers and importers like a strong dollar. Exporters like a weaker one."]]));

  l24.push(mcL("The business cycle", [
    ["The four stages of the business cycle are expansion, peak, contraction and...", "trough", ["tariff", "deficit", "rebate"], "It's the low point.", "After it the economy turns back up."],
    ["During an expansion, the economy is usually...", "growing", ["shrinking", "closed", "frozen"], "More goods and jobs.", "GDP is rising."],
    ["A peak is the...", "high point before the economy starts to shrink", ["lowest point", "beginning", "tax deadline"], "The top of the wave.", "After it, a contraction can begin."],
    ["A common rule of thumb says a recession is...", "a significant fall in economic activity lasting more than a few months", ["a single bad day", "a big sale", "a price rise"], "It's more than a short dip.", "Often seen as two quarters of falling GDP."],
    ["During a recession, businesses often...", "cut back and lay off workers", ["hire more", "raise all prices", "never change"], "Fewer sales cause cuts.", "Unemployment tends to rise."],
    ["Which is a typical sign of a recession?", "rising unemployment", ["rising wages for all", "more factories opening", "falling unemployment"], "Think about jobs.", "Fewer people can find work."],
    ["Recoveries start at the...", "trough", ["peak", "top", "end of the tax year"], "The turning point from down to up.", "The lowest point."],
    ["To prepare for the business cycle, households should...", "keep an emergency fund", ["spend everything", "borrow more for fun", "ignore saving"], "Savings protect you in bad times.", "Cushion for a job loss."]
  ], "Example: the economy rises (expansion), tops out (peak), falls (contraction), bottoms out (trough), then rises again. Now do yours.",
    [["Waves", "🌊", "The economy moves in waves: <b>expansion</b>, <b>peak</b>, <b>contraction</b>, <b>trough</b>, then expansion again."], ["Recession", "📉", "A <b>recession</b> is a broad slowdown: output and jobs fall for months."], ["Be ready", "🛟", "An emergency fund and steady skills help you through the down parts."]]));

  l24.push(mcL("Externalities and public goods", [
    ["A cost or benefit that falls on people who didn't choose it is called...", "an externality", ["a coupon", "a loan", "a refund"], "It spills onto others.", "The buyer and seller don't pay or gain it."],
    ["Factory pollution that harms nearby neighbors is a...", "negative externality", ["positive externality", "public good", "tax credit"], "It causes a cost to others.", "The neighbors pay without a choice."],
    ["A neighbor's beautiful garden that everyone enjoys is a...", "positive externality", ["negative externality", "tariff", "loan"], "It gives a benefit to others.", "Others gain without paying."],
    ["A good that everyone can use and no one can be kept from using, like a lighthouse, is a...", "public good", ["private good", "luxury", "tariff"], "Many people share it.", "It is hard to charge individuals."],
    ["Why does the market often fail to supply public goods well?", "people can use them without paying", ["they are too cheap to make", "nobody wants them", "they are illegal"], "Why pay if you can enjoy it free?", "Free riders enjoy it without paying."],
    ["Taxing pollution is a way to...", "make the polluter pay the cost", ["reward pollution", "stop all trade", "raise wages"], "Put the cost on the cause.", "It pushes them to cut pollution."],
    ["Vaccination protects the person and others around them. This is a...", "positive externality", ["negative externality", "private tax", "tariff"], "Benefits spill over to others.", "Others gain from it too."],
    ["Public goods are often paid for with...", "taxes", ["coupons", "tips", "cash prizes"], "Collective payment.", "Everyone chips in through the government."]
  ], "Example: if people outside the deal bear a cost it's a negative externality; if they get a benefit it's positive. Now do yours.",
    [["Outside effects", "🌫️", "An <b>externality</b> is a cost or benefit felt by people who weren't part of the deal."], ["Negative and positive", "↔️", "Pollution is a <b>negative</b> externality. A neighbor's garden is a <b>positive</b> one."], ["Public goods", "🚦", "<b>Public goods</b> (like street lights) are used by all, so they are usually paid for with taxes."]]));

  l24.push(L("Customer acquisition cost", () => {
    const k = ri(0, 2), nm = nm0(), c = ri(5, 40), n = pick([20, 40, 50, 100, 200]);
    if (k === 0) return q(`${nm} spends ${D(c * n)} on advertising and gains ${n} new customers. What is the customer acquisition cost (CAC) per customer? (dollars)`, c,
      "CAC is the cost to win each new customer.", "Divide the money spent by the number of new customers.",
      () => { const a = pick([8, 12]), b = pick([30, 50]); return `Example: spend ${D(a * b)} for ${b} customers: ${a * b} ÷ ${b} = ${D(a)}. Now do yours.`; });
    if (k === 1) return q(`It costs ${D(c)} to win each new customer. How many dollars will ${nm} need to spend to win ${n} customers? (dollars)`, c * n,
      "Cost per customer times how many customers.", "Multiply the CAC by the number of customers.",
      () => { const a = pick([9, 14]), b = pick([20, 50]); return `Example: ${D(a)} × ${b} = ${D(a * b)}. Now do yours.`; });
    const c2 = c + ri(3, 10);
    return mcq(`${nm} tries two ads. Ad A wins ${n} customers for ${D(c * n)}. Ad B wins ${n} customers for ${D(c2 * n)}. Which has the lower cost per customer?`, "Ad A", ["Ad B", "They are the same"],
      "The customers won are the same, so compare what each ad cost.", "Cost per customer = money spent ÷ customers won.",
      "Example: ad X costs $400 for 20 customers ($20 each) and ad Y costs $600 for 20 ($30 each). The cheaper one wins. Now do yours.");
  }, [["Winning customers", "📣", "<b>Customer acquisition cost (CAC)</b> = marketing spend ÷ new customers won."], ["Compare channels", "📊", "Compare the CAC of different ads. Spend more on the ones with the lowest CAC."], ["Not too high", "⚖️", "CAC must be lower than the profit a customer brings in, or the business loses money."]]));

  l24.push(L("Customer lifetime value", () => {
    const k = ri(0, 2), nm = nm0();
    if (k === 0) { const a = ri(5, 25), b = ri(2, 12), y = ri(2, 5);
      return q(`${nm}'s customers spend ${D(a)} per order and place ${b} orders a year. A typical customer stays ${y} years. What total will a customer spend over their lifetime? (dollars)`, a * b * y,
        "Lifetime means over all the years they buy.", "Multiply the order amount, the orders per year and the number of years.",
        () => { const x = pick([10, 20]), z = pick([3, 4]), w = pick([2, 3]); return `Example: ${D(x)} × ${z} orders × ${w} years = ${D(x * z * w)}. Now do yours.`; }); }
    if (k === 1) { const cac = ri(5, 20), r = ri(2, 6);
      return q(`A customer's lifetime value (LTV) is ${D(cac * r)} and the customer acquisition cost (CAC) is ${D(cac)}. How many times bigger is LTV than CAC? (a number)`, r,
        "Compare the two by division.", "Divide the lifetime value by the acquisition cost.",
        () => { const x = pick([10, 20]), y = pick([3, 5]); return `Example: LTV ${D(x * y)}, CAC ${D(x)}: ${x * y} ÷ ${x} = ${y}. Now do yours.`; }); }
    const cac = ri(10, 40), ltv = cac + ri(10, 80);
    return q(`A customer is worth ${D(ltv)} over their lifetime and cost ${D(cac)} to win. How many dollars of profit does this customer bring? (dollars)`, ltv - cac,
      "Profit is what's left after the cost.", "Subtract the cost to win the customer from the lifetime value.",
      () => { const x = pick([100, 200]), y = pick([30, 60]); return `Example: ${D(x)} - ${D(y)} = ${D(x - y)}. Now do yours.`; });
  }, [["Worth over time", "🕰️", "<b>Lifetime value (LTV)</b> is the total a customer is worth to you over all the time they buy."], ["Compare with CAC", "⚖️", "If LTV is much higher than CAC, winning customers pays off. Many businesses look for at least 3 times."], ["Keep them", "💛", "Happy customers stay longer, and that raises LTV."]]));

  l24.push(L("Return on ad spend", () => {
    const k = ri(0, 2), s = pick([200, 500, 1000, 2000]), roas = ri(3, 8), nm = nm0();
    if (k === 0) return q(`${nm} spends ${D(s)} on ads and the ads bring in ${D(s * roas)} of sales. What is the return on ad spend (ROAS = sales ÷ ad spend)? (a number)`, roas,
      "It tells how many dollars of sales each ad dollar made.", "Divide the sales by the ad spend.",
      () => { const a = pick([100, 300]), b = pick([2, 5]); return `Example: ads ${D(a)}, sales ${D(a * b)}: ${a * b} ÷ ${a} = ${b}. Now do yours.`; });
    if (k === 1) return q(`An ad campaign has a ROAS of ${roas}. ${nm} spends ${D(s)} on it. How many dollars of sales should come in? (dollars)`, s * roas,
      "ROAS tells sales per ad dollar.", "Multiply the ad spend by the ROAS.",
      () => { const a = pick([300, 400]), b = pick([3, 5]); return `Example: ${D(a)} at ROAS ${b} gives ${a} × ${b} = ${D(a * b)}. Now do yours.`; });
    const m = pick([40, 50, 60]);
    return q(`Ads cost ${D(s)} and bring in ${D(s * roas)} of sales. ${nm}'s products have a ${m}% margin before ad costs. What is the profit after paying for the ads? (dollars)`, s * roas * m / 100 - s,
      "Margin is the part of sales left after product costs.", "Find the margin dollars, then subtract the ad spend.",
      () => { const a = pick([100, 200]), b = pick([5, 6]); return `Example: ads ${D(a)}, sales ${D(a * b)}, 50% margin: ${a * b / 2} - ${a} = ${D(a * b / 2 - a)}. Now do yours.`; });
  }, [["Do ads pay?", "📣", "<b>ROAS</b> = sales from ads ÷ ad spend. A ROAS of 4 means $4 of sales per $1 of ads."], ["Sales aren't profit", "🧾", "After product costs, a ROAS of 2 may still lose money if the margin is under 50%."], ["Test small", "🧪", "Try small ad budgets first, then grow what works."]]));

  l24.push(L("Franchise costs", () => {
    const k = ri(0, 2), F = pick([20000, 30000, 50000]), r = pick([4, 5, 6, 8]), s = pick([100000, 150000, 200000, 250000, 300000]), nm = nm0();
    if (k === 0) return q(`${nm} buys a franchise and must pay the owner a royalty of ${r}% of sales. Sales for the year are ${D(s)}. How many dollars of royalty is that? (dollars)`, s * r / 100,
      "A royalty is a share of sales paid to the brand owner.", "Take the royalty percent of the yearly sales.",
      () => { const a = pick([100000, 200000]), b = pick([5, 6]); return `Example: ${b}% of ${D(a)} = ${D(a * b / 100)}. Now do yours.`; });
    if (k === 1) return q(`A franchise charges a one-time fee of ${D(F)} and a ${r}% royalty on sales. In year 1 sales are ${D(s)}. What are the total franchise payments in year 1? (dollars)`, F + s * r / 100,
      "There is a one-time fee and a yearly percent of sales.", "Find the royalty, then add the one-time fee.",
      () => { const a = pick([10000, 15000]), b = pick([100000, 200000]), c = pick([4, 5]); return `Example: ${D(a)} + ${c}% of ${D(b)} = ${a} + ${b * c / 100} = ${D(a + b * c / 100)}. Now do yours.`; });
    return q(`A franchise has a one-time fee of ${D(F)} and a ${r}% royalty. Sales are ${D(s)} each year. What are the total payments over 3 years? (dollars)`, F + 3 * s * r / 100,
      "The fee is paid once. The royalty is paid every year.", "Multiply the yearly royalty by 3, then add the one-time fee once.",
      () => { const a = pick([10000, 20000]), b = pick([100000, 200000]), c = pick([5, 6]); return `Example: ${D(a)} + 3 × ${c}% of ${D(b)} = ${a} + ${3 * b * c / 100} = ${D(a + 3 * b * c / 100)}. Now do yours.`; });
  }, [["Using a famous brand", "🍔", "A <b>franchise</b> lets you run a business under an established brand and system."], ["Costs", "💵", "You usually pay a one-time <b>franchise fee</b> and an ongoing <b>royalty</b>, a percent of your sales."], ["Weigh it up", "⚖️", "You get a proven plan but keep less of each sales dollar and must follow the owner's rules."]]));

  l24.push(L("The true cost of an employee", () => {
    const k = ri(0, 2), w = pick([12, 16, 20, 24, 28, 30, 40]), p = pick([10, 20, 25, 30, 35]), nm = nm0();
    const wage = w * 2080;
    if (k === 0) return q(`${nm} hires a full-time worker (2,080 hours a year) at ${D(w)} an hour. Taxes and benefits add ${p}% on top of wages. What is the total yearly cost of the worker? (dollars)`, r2(wage * (100 + p) / 100),
      "The cost is more than just the paycheck.", "Find a year of wages (rate × 2,080), then add the extra percent.",
      () => { const a = pick([10, 20]), b = pick([10, 20]); return `Example: ${D(a)} × 2,080 = ${D(a * 2080)}; add ${b}% = ${D(a * 2080 * (100 + b) / 100)}. Now do yours.`; });
    if (k === 1) return q(`A worker earns ${D(w)} an hour. Taxes and benefits add ${p}% to the cost. What is the real cost per hour of employing that worker? (dollars)`, r2(w * (100 + p) / 100),
      "Add the extra percent to the hourly wage.", "Multiply the wage by 1 plus the percent as a decimal.",
      () => { const a = pick([10, 20]), b = pick([10, 20]); return `Example: ${D(a)} with ${b}% extra: ${a} × ${(100 + b) / 100} = ${D(a * (100 + b) / 100)}. Now do yours.`; });
    return q(`A worker's wages are ${D(wage)} a year. Taxes and benefits add ${p}%. How many dollars a year do the taxes and benefits cost the employer? (dollars)`, r2(wage * p / 100),
      "You want only the extra, not the total.", "Take the extra percent of the yearly wages.",
      () => { const a = pick([40000, 60000]), b = pick([10, 20]); return `Example: ${b}% of ${D(a)} = ${D(a * b / 100)}. Now do yours.`; });
  }, [["More than a paycheck", "🧑‍🏭", "An employer also pays payroll taxes, insurance, and often benefits like paid leave."], ["Burden rate", "➕", "These extras often add 20% to 30% to wages. This is the 'burden' on top of pay."], ["Plan for it", "📝", "Before hiring, budget the true cost, not just the hourly wage. A full-time year is about 2,080 hours."]]));

  l24.push(mcL("Liquidity", [
    ["'Liquid' money is money you can...", "turn into cash quickly without losing value", ["never spend", "only use abroad", "only earn at a bank"], "Think about how fast you can get cash.", "Quick and easy to cash."],
    ["Which is the MOST liquid?", "cash", ["a house", "a car", "an antique collection"], "It's already money.", "No selling is needed."],
    ["Which is the LEAST liquid?", "a house", ["a savings account", "cash", "a checking account"], "It takes weeks or months to sell.", "Selling involves lots of steps."],
    ["Why keep an emergency fund in a liquid account?", "you can get it right away when needed", ["it earns the most", "it's hard to touch", "it's untaxed"], "Emergencies can't wait.", "Quick access matters."],
    ["A 5-year CD that charges a penalty for early withdrawal is...", "less liquid than a savings account", ["more liquid than cash", "completely liquid", "the same as a checking account"], "Penalties make it harder to use early.", "You must wait or pay."],
    ["Selling a stock on a major exchange usually takes...", "a short time", ["a year", "ten years", "never"], "Stocks trade every business day.", "They are fairly liquid."],
    ["Putting all your savings into a business you own makes you...", "less liquid", ["more liquid", "totally liquid", "debt-free"], "It's hard to sell quickly.", "Your money is tied up."],
    ["Which order goes from MOST to LEAST liquid?", "cash, savings account, stocks, house", ["house, stocks, savings account, cash", "stocks, cash, house, savings account", "savings account, house, cash, stocks"], "Start with the easiest to spend.", "End with the slowest to sell."]
  ], "Example: cash can be spent right now, so it's the most liquid. A house takes a long time to sell, so it's the least. Now do yours.",
    [["How fast is it cash?", "💧", "<b>Liquidity</b> means how quickly something can be turned into cash without losing much value."], ["Examples", "📚", "Cash and checking are very liquid. Stocks are fairly liquid. Houses and cars are not."], ["Keep some liquid", "🛟", "Hold your emergency fund where you can reach it fast."]]));

  l24.push(mcL("Social Security and Medicare", [
    ["Social Security retirement benefits are mainly paid for by...", "payroll taxes on workers and employers", ["lottery wins", "your bank account", "tariffs only"], "Look at your paycheck deductions.", "FICA taxes fund it."],
    ["Medicare is mainly a health insurance program for...", "people age 65 and older", ["children under 5", "everyone under 30", "only soldiers"], "It starts at a certain age.", "Most people qualify at 65."],
    ["To qualify for Social Security retirement benefits, you generally need...", "about 10 years of work (40 credits)", ["a college degree", "to own a house", "to be a citizen of another country"], "You have to have paid in.", "Work history counts."],
    ["Claiming Social Security later (up to age 70) usually gives...", "a bigger monthly check", ["a smaller monthly check", "no check at all", "a tax refund"], "Waiting is rewarded.", "Delay raises the monthly amount."],
    ["Social Security alone is designed to replace...", "only part of your working income", ["all your working income", "double your income", "nothing"], "Plan for more than that.", "It is only one of the pieces."],
    ["You can claim reduced Social Security retirement benefits as early as age...", "62", ["50", "18", "40"], "Early claims get smaller checks.", "It's in the early sixties."],
    ["Why should young workers still save for retirement themselves?", "Social Security replaces only part of income", ["Social Security pays too much", "Saving is illegal", "It's free money"], "Count on more than one source.", "Savings fill the gap."],
    ["The 'FICA' line on your pay stub is for...", "Social Security and Medicare", ["state parking", "union dues", "the lottery"], "It's one of the payroll taxes.", "Two big programs for older people and workers."]
  ], "Example: Social Security is funded by payroll taxes and replaces part of your income; Medicare is health insurance for 65+. Now do yours.",
    [["Payroll taxes", "🧾", "Workers and employers pay <b>FICA</b> taxes. They fund <b>Social Security</b> (retirement, disability, survivors) and <b>Medicare</b> (health insurance for people 65+)."], ["Timing matters", "⏳", "You can claim from age 62 at a reduced amount, or wait up to 70 for more."], ["Not enough alone", "🧱", "Social Security replaces only part of your income, so also save through a retirement plan."]]));

  l24.push(mcL("Wills and beneficiaries", [
    ["A will is a document that says...", "who gets your property after you die", ["how much tax you pay", "your bank balance", "your credit score"], "It's about passing things on.", "It guides who receives your property."],
    ["The person named to carry out a will is the...", "executor", ["borrower", "landlord", "cosigner"], "They carry out the instructions.", "They handle the estate."],
    ["A 'beneficiary' on a retirement account is...", "the person who receives it if you die", ["the person who owns the bank", "your lender", "your landlord"], "Think of who benefits.", "You name them on the account form."],
    ["Beneficiary forms on accounts usually...", "override what your will says about that account", ["are ignored", "are only for kids", "must be notarized by a bank"], "They are direct instructions to the account.", "The account follows its own form."],
    ["A 'power of attorney' lets someone...", "make certain decisions for you if you can't", ["spend your money without limit", "become your boss", "own your house"], "It names a trusted person.", "It is used when you can't act."],
    ["Why should you review beneficiaries after big life changes?", "so the right people receive the money", ["to avoid all taxes", "to earn interest", "to raise credit scores"], "Life changes, and so can your choices.", "Old forms can be out of date."],
    ["Dying without a will is called...", "dying intestate", ["dying insured", "dying solvent", "dying executed"], "It means without a will.", "State laws then decide who gets what."],
    ["Estate planning is best done...", "before you need it", ["only when very old", "after a crisis only", "never"], "Plans work when made ahead.", "It's about preparing early."]
  ], "Example: a will says who gets your property; a beneficiary form on an account names who receives that account. Now do yours.",
    [["A plan for later", "📜", "A <b>will</b> says who gets your property. An <b>executor</b> carries it out."], ["Name beneficiaries", "👤", "Accounts like retirement plans and life insurance let you name a <b>beneficiary</b>. That form usually decides who gets the money."], ["Keep it current", "🔄", "Review these papers after big life events. Ask a trusted adult or professional for help."]]));

  l24.push(mcL("Safe places for savings", [
    ["Bank deposits in the US are protected by FDIC insurance up to...", "$250,000 per depositor, per bank, per ownership category", ["$250 in total", "any amount", "$25,000 across all banks"], "There is a limit.", "It's a quarter of a million dollars."],
    ["A Treasury bill is a loan to...", "the US government", ["a store", "a stranger online", "a bank customer"], "It's a government security.", "It is backed by the government."],
    ["I bonds from the US government are designed so the rate...", "adjusts with inflation", ["never changes", "falls with inflation", "is chosen by lottery"], "They try to keep pace with prices.", "Inflation is part of the formula."],
    ["A CD (certificate of deposit) usually pays more than regular savings but...", "charges a penalty for early withdrawal", ["has no rate", "is not insured", "can't be opened"], "You agree to leave money for a term.", "Taking it out early costs you."],
    ["A high-yield savings account is...", "a savings account with a higher interest rate", ["a risky stock", "a loan", "a credit card"], "It's still a savings account.", "Often at online banks."],
    ["Which is NOT guaranteed to hold its value?", "a stock", ["an insured savings account", "a Treasury bill held to maturity", "an insured CD"], "Think about price swings.", "Its price can go up or down."],
    ["For an emergency fund, the best features are...", "safety and easy access", ["the highest possible risk", "being locked for 30 years", "no insurance"], "You'll need it at short notice.", "Safe and available."],
    ["An offer promising huge, guaranteed returns with no risk is most likely...", "a scam", ["a Treasury bill", "an insured account", "a savings plan"], "If it sounds too good to be true...", "Safe returns are modest."]
  ], "Example: for money you can't afford to lose or will need soon, pick insured or government-backed options. Now do yours.",
    [["Safe choices", "🛡️", "Insured savings and CDs (FDIC), Treasury bills and I bonds are very safe places for money you will need."], ["Safety vs return", "⚖️", "Safer places pay less. Riskier ones like stocks can pay more but can lose value."], ["Beware of scams", "🚩", "No one can promise big returns with no risk. Check the details with a trusted adult."]]));

  l24.push(mixOf("Mixed practice", [l24[0], l24[1], l24[9], l24[10], l24[11], l24[12], l24[13], l24[5]]));
  l24.push(mixOf("Level 24 Challenge", [l24[2], l24[3], l24[4], l24[6], l24[7], l24[8], l24[14], l24[15], l24[16], l24[17]]));

  Object.assign(MONEY_LEVELS, { 22: l22, 23: l23, 24: l24 });
})();
