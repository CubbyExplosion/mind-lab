// ext/money-19-21.js  Mind Lab Money Skills levels 19-21 (60 lessons)
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

  // ======================= LEVEL 19 (9th grade, first half) =======================
  const l19 = [];

  l19.push(L("Fixed fee plus rate", () => {
    const nm = nm0(), F = pick([10, 15, 20, 25, 30, 40, 50]), m = pick([3, 4, 5, 6, 8, 10, 12]), n = ri(3, 12), k = ri(0, 2);
    const hh = ["Part of the cost is paid one time. Part is paid again and again.", "Multiply the repeating amount by how many times it repeats, then add the one-time fee."];
    const exF = () => { const f = pick([10, 20, 30]), r = pick([2, 3, 5]), c = ri(2, 9); return `Example: a $${f} fee plus $${r} each time, for ${c} times. ${r} × ${c} = ${r * c}, plus ${f} = $${f + r * c}. Now do yours.`; };
    if (k === 0) return q(`${nm} joins a gym. The joining fee is $${F} and each month costs $${m}. What is the total cost after ${n} months? (dollars)`, F + m * n, hh[0], hh[1], exF);
    if (k === 1) return q(`A ride app charges a $${F} base fare plus $${m} for each mile. How much does a ${n}-mile ride cost? (dollars)`, F + m * n, hh[0], hh[1], exF);
    return q(`A phone repair costs a $${F} checkup plus $${m} per hour of work. What is the bill for ${n} hours of work? (dollars)`, F + m * n, hh[0], hh[1], exF);
  }, [["Fixed plus variable", "🏋️", "Many costs have a <b>fixed</b> part (paid once) and a <b>variable</b> part (grows with use). Total = fixed + rate × amount."], ["As an equation", "✏️", "Write it as <b>y = m·x + b</b>. Here b is the fixed fee, m is the rate, and x is how many months or miles."], ["Example", "🧮", "A $20 fee plus $5 per month for 6 months: 5 × 6 = 30, then 30 + 20 = <b>$50</b>."]]));

  l19.push(L("How long until?", () => {
    const F = pick([20, 30, 40, 60, 80, 100]), m = pick([4, 5, 6, 8, 10]), n = ri(3, 14), T = F + m * n, k = ri(0, 1);
    const hh = ["First take away the part that is paid only once.", "What is left is the repeating cost. Divide it by the cost of one repeat."];
    const exF = () => { const f = pick([10, 20]), r = pick([3, 5]), c = ri(2, 8); return `Example: total $${f + r * c}, fee $${f}, $${r} each month. ${f + r * c} − ${f} = ${r * c}, then ${r * c} ÷ ${r} = ${c} months. Now do yours.`; };
    if (k === 0) return q(`A streaming box costs $${F} to buy and $${m} a month for the service. After how many months will the total spent be $${T}?`, n, hh[0], hh[1], exF);
    return q(`A club charges a $${F} sign-up fee plus $${m} per meeting. You have spent $${T} in all. How many meetings did you go to?`, n, hh[0], hh[1], exF);
  }, [["Work backward", "🔙", "If you know the total, you can find how many times something happened. Undo the steps in reverse order."], ["Two steps", "✌️", "Step 1: subtract the fixed fee. Step 2: divide what is left by the cost of one repeat."], ["Example", "🧮", "Total $65, fee $15, $10 per visit. 65 − 15 = 50, and 50 ÷ 10 = <b>5 visits</b>."]]));

  l19.push(L("Average price paid", () => {
    let a, b, p1, p2, t, i = 0;
    do { a = ri(2, 8); b = ri(2, 8); p1 = ri(10, 40); p2 = ri(10, 40); t = a * p1 + b * p2; } while ((p1 === p2 || t % (a + b) !== 0) && ++i < 500);
    const nm = nm0();
    return q(`${nm} buys ${a} shares of a fund at $${p1} each, and later ${b} more shares at $${p2} each. What is the average price paid per share? (dollars)`, t / (a + b),
      "Find the total money spent, not just the two prices.", "Average price = total spent ÷ total number of shares. Do not just average the two prices.",
      () => { const x = 2, y = 3, u = 10, v = 20; return `Example: ${x} shares at $${u} and ${y} shares at $${v}. Spent ${x * u} + ${y * v} = ${x * u + y * v}. Shares: ${x + y}. ${x * u + y * v} ÷ ${x + y} = $${(x * u + y * v) / (x + y)}. Now do yours.`; });
  }, [["Not all buys are equal", "⚖️", "If you buy more at one price than another, that price counts more. This is a <b>weighted average</b>."], ["The method", "🧮", "Add up all the money spent. Add up all the items bought. Divide money by items."], ["Example", "📈", "2 at $10 and 3 at $20: spent 20 + 60 = 80 for 5 shares. 80 ÷ 5 = <b>$16</b>, not $15."]]));

  l19.push(L("The 50/30/20 plan", () => {
    const I = pick([1000, 1500, 2000, 2500, 3000, 3500, 4000]), c = pick([["needs", 50], ["wants", 30], ["savings", 20]]), nm = nm0();
    return q(`${nm}'s take-home pay is $${I} a month. Using the 50/30/20 plan (50% needs, 30% wants, 20% savings), how many dollars go to ${c[0]}?`, I * c[1] / 100,
      "Turn the percent into a part of the whole pay.", "Multiply the monthly pay by the percent as a decimal (or divide by 100 and multiply).",
      () => { const i = pick([800, 1200, 1600]), p = pick([50, 30, 20]); return `Example: pay $${i}, ${p}% share. ${i} ÷ 100 = ${i / 100}, times ${p} = $${i * p / 100}. Now do yours.`; });
  }, [["A simple split", "🥧", "The <b>50/30/20 plan</b> splits take-home pay: 50% for needs (rent, food), 30% for wants (fun), 20% for savings and debt."], ["Finding a share", "🧮", "Share = pay × percent ÷ 100. For $2,000, 20% savings is 2,000 ÷ 100 × 20 = $400."], ["Just a guide", "🧭", "It is a starting point. If rent is high, you might shrink the wants slice to keep saving."]]));

  l19.push(L("Pay yourself first", () => {
    const W = pick([100, 200, 300, 400, 500]), s = pick([10, 20, 25]), wk = pick([4, 10, 26, 52]), nm = nm0();
    return q(`${nm} earns $${W} a week and moves ${s}% to savings as soon as the paycheck arrives. How much is saved in ${wk} weeks? (dollars)`, W * s / 100 * wk,
      "First find how much is saved from one paycheck.", "One week's savings times the number of weeks gives the total.",
      () => { const w = pick([200, 400]), p = pick([10, 20]), c = pick([5, 10]); return `Example: pay $${w}, save ${p}%, for ${c} weeks. Each week: ${w * p / 100}. ${w * p / 100} × ${c} = $${w * p / 100 * c}. Now do yours.`; });
  }, [["Save first", "🐷", "<b>Pay yourself first</b> means you move savings away right when you are paid, before you spend on anything else."], ["Automatic wins", "🤖", "Set up an automatic transfer. You do not have to remember, and the money is already out of reach."], ["Example", "🧮", "$300 a week, 10% saved: $30 each week. In 10 weeks that is <b>$300</b>."]]));

  l19.push(L("Pre-tax savings", () => {
    const G = pick([1000, 1500, 2000, 2500, 3000]), p = pick([5, 10, 15]), nm = nm0();
    if (Math.random() < 0.5) return q(`${nm}'s paycheck is $${G}. ${p}% goes into a pre-tax retirement account. How much of the paycheck is left to be taxed? (dollars)`, G - G * p / 100,
      "Pre-tax means the money is taken out BEFORE the tax is figured.", "Find the part that goes to retirement, then subtract it from the paycheck.",
      () => { const g = pick([800, 1200]), r = pick([5, 10]); return `Example: pay $${g}, ${r}% pre-tax. ${g * r / 100} goes to retirement. ${g} − ${g * r / 100} = $${g - g * r / 100} taxed. Now do yours.`; });
    return q(`${nm}'s paycheck is $${G}. ${p}% goes into a pre-tax retirement account. How many dollars go into the account?`, G * p / 100,
      "Find a percent of the paycheck.", "Divide the paycheck by 100, then multiply by the percent number.",
      () => { const g = pick([800, 1200]), r = pick([5, 10]); return `Example: pay $${g}, ${r}% saved. ${g} ÷ 100 × ${r} = $${g * r / 100}. Now do yours.`; });
  }, [["Before the tax", "✂️", "Money put into some retirement plans is taken out <b>before</b> income tax. That makes your taxable pay smaller."], ["Two numbers", "🧮", "Saved = pay × percent. Taxed pay = pay − saved."], ["Example", "📉", "Pay $2,000 and save 10% pre-tax: $200 saved, so only <b>$1,800</b> is taxed."]]));

  l19.push(mcL("Opportunity cost", [
    ["You have $20 and choose a new game over a movie night. What is the opportunity cost?", "The movie night you gave up", ["The $20 price tag", "The fun of the new game", "There is no cost"], "Opportunity cost is about what you give up, not only what you pay.", "Look for the best OTHER choice you did not pick."],
    ["A student spends Saturday studying instead of going to the park with friends. What is the opportunity cost?", "The time at the park with friends", ["The grade on the test", "The books", "Nothing"], "It is the thing you gave up to get something else.", "Which good option was left on the table?"],
    ["A city uses an empty lot for a parking garage instead of a playground. What is the opportunity cost?", "The playground that could have been built", ["The cost of concrete", "The cars that park there", "There is none"], "Think of what the same land could have been used for.", "It is the next best use that was not chosen."],
    ["Sam works an extra shift instead of going to a party. What is the opportunity cost?", "The party Sam skipped", ["The extra pay", "The shift itself", "Sam's uniform"], "Opportunity cost is the thing given up.", "Sam picked one option. What was the other?"],
    ["Ivy spends $50 on shoes instead of saving for a bike. What is the opportunity cost?", "The progress toward the bike", ["The shoes", "The price of the store", "Her old shoes"], "It is the benefit you do not get because you chose another path.", "Which goal got pushed back?"],
    ["A bakery uses its oven for cookies this hour instead of bread. What is the opportunity cost?", "The bread it could have baked", ["The cookies sold", "The oven's electricity", "The flour in the cookies"], "The oven can only do one job at a time.", "What job did the oven not do?"],
    ["Max goes to college full time instead of working full time. Which is part of his opportunity cost?", "The wages he could have earned working", ["The college diploma", "His textbooks", "His new friends"], "Think about the other path he could have taken.", "What could he have been paid for doing instead?"],
    ["What is opportunity cost?", "The value of the next best choice you give up", ["The price printed on the tag", "The cheapest choice available", "Money you get back later"], "It is not the price. It is about trade-offs.", "Every choice has another choice you did not make. That is the idea."]
  ], "Example: Mia picks pizza over tacos. The opportunity cost is the tacos she gave up, the next best choice. Now do yours.",
  [["Trade-offs", "🔀", "You cannot do everything. When you choose one thing, you give up another. That is a <b>trade-off</b>."], ["Opportunity cost", "🚪", "<b>Opportunity cost</b> is the value of the next best choice you did not take. It can be money, time or fun."], ["Why it matters", "🧠", "Smart choosers ask: what am I giving up? Sometimes the real cost is bigger than the price tag."]]));

  l19.push(L("Sunk cost trap", () => {
    const sc = [["$12", "a movie ticket", "the movie is boring and you would rather study"], ["$40", "a nonrefundable class", "the class is too hard and your other work is suffering"], ["$25", "a concert ticket", "you feel sick and a friend offers a quieter plan"], ["$60", "a video game", "you stopped enjoying it after an hour"], ["$15", "a theme park entry", "it is pouring rain and rides are closed"], ["$30", "a gym sign-up fee", "you now hate that gym and found a cheaper one you like better"], ["$8", "a meal you ordered", "you are already full"], ["$100", "a repair for an old bike", "the bike now needs another repair that costs more than a new one"]];
    const right = "Ignore the money already spent and compare what is ahead", wr = ["Keep going so the money is not wasted", "Spend even more to make up for it", "Feel guilty and do nothing"];
    if (Math.random() < 0.6) { const s = pick(sc); return mcq(`You paid ${s[0]} for ${s[1]} that you cannot get back. Now ${s[2]}. What is the smartest way to decide?`, right, shuf(wr).slice(0, 2),
      "The money is already gone either way.", "Ask which choice is better from here on, using only what is still ahead.", "Example: Zoe paid for a bad-tasting meal. The cash is gone either way, so she stops eating it if it makes her feel worse. Now do yours."); }
    const t = pick([["$30 you already paid for a nonrefundable class", ["The $10 snack you might buy", "Next month's bus fare", "Your future earnings"]], ["$200 you already spent on a ticket you cannot refund", ["The $20 you could still save", "The bus fare you have not paid", "A sale you might find"]], ["$50 already spent fixing a toy that still does not work", ["The $50 a new toy costs", "The money in your wallet today", "Next week's allowance"]], ["$15 you already paid for a game that you can't return", ["The $15 you could still earn", "A new game's price", "The tax you might pay"]]]);
    return mcq("Which of these is a sunk cost?", t[0], t[1], "A sunk cost is money already spent that you cannot get back.", "Look for the one that has already happened.", "Example: a $9 haircut you already paid for is sunk. Next week's haircut price is not. Now do yours.");
  }, [["Gone is gone", "⚓", "A <b>sunk cost</b> is money or time already spent that you cannot get back, no matter what you do next."], ["The trap", "🪤", "People often keep going just because they already paid. That is the <b>sunk cost trap</b>."], ["A better rule", "✅", "Compare only the <b>future</b> costs and benefits of each choice. Past spending should not change that."]]));

  l19.push(L("What does the next one cost?", () => {
    const t1 = ri(4, 6), i2 = ri(3, 4), i3 = ri(2, 3), i4 = ri(1, 2), tot = [t1, t1 + i2, t1 + i2 + i3, t1 + i2 + i3 + i4], inc = [t1, i2, i3, i4];
    const it = pick(["scoops of ice cream", "tickets", "pages printed", "juice cups"]), k = ri(2, 4);
    const unit = it.split(" ")[0];
    return q(`A shop's total prices are: 1 ${unit === "scoops" ? "scoop" : unit.replace(/s$/, "")} $${tot[0]}, 2 for $${tot[1]}, 3 for $${tot[2]}, 4 for $${tot[3]} (${it}). How much extra does the ${k === 2 ? "2nd" : k === 3 ? "3rd" : "4th"} one cost? (dollars)`, inc[k - 1],
      "You want the extra money for just that one, not the whole total.", "Subtract the total for one fewer from the total for this many.",
      () => { const a = 5, b = 9, c = 12; return `Example: totals $${a}, $${b}, $${c}. The 3rd one adds ${c} − ${b} = $${c - b}. Now do yours.`; });
  }, [["The extra cost", "➕", "<b>Marginal cost</b> is the extra cost of getting one more. It is not the same as the average cost."], ["From totals", "📋", "Extra for the 3rd = total for 3 − total for 2."], ["Why it matters", "🤔", "Choose to buy one more only if the extra benefit is worth the extra cost."]]));

  l19.push(L("Sinking funds", () => {
    const k = ri(0, 2), nm = nm0();
    if (k === 0) { const Y = pick([240, 360, 480, 600, 720, 1200]); return q(`${nm}'s car insurance is $${Y} a year, paid all at once. How much should ${nm} set aside each month to be ready? (dollars)`, Y / 12,
      "A year has a certain number of months. Spread the cost evenly.", "Divide the yearly cost by the number of months in a year.",
      () => { const y = pick([180, 300]); return `Example: a $${y} yearly fee. ${y} ÷ 12 = $${y / 12} a month. Now do yours.`; }); }
    if (k === 1) { const M = pick([25, 40, 50, 75]), m = ri(3, 10); return q(`${nm} sets aside $${M} a month for holiday gifts. How much is in the fund after ${m} months? (dollars)`, M * m,
      "Each month adds the same amount.", "Multiply the monthly amount by the number of months.",
      () => { const a = 20, c = 6; return `Example: $${a} a month for ${c} months is ${a} × ${c} = $${a * c}. Now do yours.`; }); }
    const M = pick([25, 50, 75]), m = ri(3, 12);
    return q(`${nm} needs $${M * m} for a school trip. If ${nm} saves $${M} a month, how many months will it take?`, m,
      "Divide the goal by what you save each time.", "Goal ÷ monthly amount = number of months.",
      () => { const a = 40, c = 5; return `Example: goal $${a * c}, save $${a} a month. ${a * c} ÷ ${a} = ${c} months. Now do yours.`; });
  }, [["Plan for big bills", "🗓️", "A <b>sinking fund</b> is money you set aside bit by bit for a known future cost, like insurance, gifts or a trip."], ["Spread it out", "🧮", "Yearly cost ÷ 12 = monthly amount to set aside."], ["Why use one", "😌", "When the bill arrives, the money is ready. You avoid borrowing or panic."]]));

  l19.push(L("The 30% rent rule", () => {
    const k = ri(0, 1);
    if (k === 0) { const I = pick([1500, 2000, 2500, 3000, 4000, 5000]); return q(`A common guide says rent should be at most 30% of monthly income. If your income is $${I} a month, what is the most rent by this guide? (dollars)`, I * 30 / 100,
      "Find 30% of the income.", "Divide the income by 10, then multiply by 3.",
      () => { const i = pick([1000, 2000]); return `Example: income $${i}. ${i} ÷ 10 = ${i / 10}, times 3 = $${i * 3 / 10}. Now do yours.`; }); }
    const R = pick([600, 900, 1200, 1500, 1800, 2100]);
    return q(`An apartment rents for $${R} a month. If rent should be at most 30% of income, what monthly income is needed? (dollars)`, R / 30 * 100,
      "Rent is 30% of income, so the income is bigger than the rent.", "Divide the rent by 30, then multiply by 100.",
      () => { const r = pick([300, 450]); return `Example: rent $${r}. ${r} ÷ 30 = ${r / 30}, times 100 = $${r / 30 * 100} income. Now do yours.`; });
  }, [["A housing guide", "🏠", "Many advisers say rent should be about <b>30% or less</b> of your income, so you still have money left for other things."], ["Max rent", "🧮", "Max rent = income × 0.30."], ["Income needed", "🔁", "Income needed = rent ÷ 0.30. A $900 rent needs $3,000 a month."]]));

  l19.push(L("Which bank account is cheaper?", () => {
    if (Math.random() < 0.5) { const c = pick([1, 2, 3]), k = ri(4, 10), a = c * k; return q(`Account A charges a $${a} monthly fee. Account B has no monthly fee but charges $${c} for each ATM use. At how many ATM uses a month do they cost the same?`, k,
      "At the break-even point, both accounts cost the same dollars.", "Divide the monthly fee by the cost of one ATM use.",
      () => { const cc = pick([2, 3]), kk = ri(3, 9); return `Example: fee $${cc * kk} versus $${cc} per use. ${cc * kk} ÷ ${cc} = ${kk} uses. Now do yours.`; }); }
    const c = pick([1, 2, 3]), t = ri(3, 12);
    return q(`Account B has no monthly fee but charges $${c} for each ATM use. How much does it cost in a month with ${t} ATM uses? (dollars)`, c * t,
      "Each use costs the same amount.", "Multiply the cost per use by the number of uses.",
      () => { const cc = 2, tt = 5; return `Example: $${cc} per use, ${tt} uses: ${cc} × ${tt} = $${cc * tt}. Now do yours.`; });
  }, [["Fees add up", "🏦", "Some accounts charge a flat monthly fee. Others charge each time you use a service. Compare them with your real habits."], ["Break-even", "⚖️", "Flat fee ÷ cost per use = number of uses where both cost the same."], ["Choose smart", "✅", "Below the break-even, pay-per-use is cheaper. Above it, the flat fee wins."]]));

  l19.push(L("Student loan interest", () => {
    const P = pick([2000, 3000, 4000, 5000, 6000, 8000, 10000]), r = pick([4, 5, 6]), y = ri(1, 4);
    if (Math.random() < 0.5) return q(`An unsubsidized student loan of $${P} has ${r}% simple interest a year. How much interest builds up in ${y} year${y > 1 ? "s" : ""} while still in school? (dollars)`, P * r / 100 * y,
      "Find one year of interest first.", "Yearly interest = loan × rate. Then multiply by the number of years.",
      () => { const p = pick([2000, 4000]), q2 = pick([4, 5]), c = ri(2, 3); return `Example: $${p} at ${q2}%. One year: ${p * q2 / 100}. For ${c} years: ${p * q2 / 100 * c}. Now do yours.`; });
    return q(`An unsubsidized student loan of $${P} has ${r}% simple interest a year. If no payments are made for ${y} year${y > 1 ? "s" : ""} in school, what do you owe then? (dollars)`, P + P * r / 100 * y,
      "You owe the loan plus the interest that built up.", "Find the interest for all the years, then add it to the starting loan.",
      () => { const p = pick([2000, 4000]), q2 = pick([4, 5]), c = ri(2, 3); return `Example: $${p} at ${q2}% for ${c} years: interest ${p * q2 / 100 * c}, total ${p + p * q2 / 100 * c}. Now do yours.`; });
  }, [["Loans grow", "🎓", "On an <b>unsubsidized</b> loan, interest starts building up right away, even while you are in school."], ["Subsidized helps", "🤝", "On a <b>subsidized</b> loan, the government pays the interest while you are in school. You do not owe it."], ["The math", "🧮", "Interest = loan × rate × years. Loan after school = loan + interest."]]));

  l19.push(mcL("Is my bank money safe?", [
    ["What does FDIC insurance protect?", "Money in insured bank accounts if the bank fails", ["Your stocks if prices fall", "Your phone if it breaks", "Your purchases if you lose them"], "It is a promise tied to banks, not to the stock market.", "Think: what happens to deposits if a bank closes?"],
    ["Which of these is covered by FDIC insurance at an insured bank?", "A savings account", ["Shares of stock", "A mutual fund", "A cryptocurrency coin"], "FDIC covers deposits, not investments that can go up or down.", "Look for the one that is a deposit account."],
    ["Which is NOT protected by FDIC insurance?", "Stocks bought through a bank's investing service", ["A checking account", "A savings account", "A certificate of deposit (CD)"], "The covered items are bank deposit accounts.", "Which one can lose value when prices move?"],
    ["The standard FDIC limit is $250,000. What is it per?", "Depositor, per bank, per ownership category", ["Month, per account", "Dollar you earn", "Loan you make"], "The limit is about who owns the money and where.", "It depends on the person, the bank and the type of ownership."],
    ["What is the credit union version of FDIC insurance called?", "NCUA insurance", ["FAA insurance", "SEC insurance", "IRS insurance"], "Credit unions have their own federal insurer.", "The letters stand for National Credit Union Administration."],
    ["A bank fails and your savings account has $10,000 in it. What happens to your money?", "It is protected, since it is under the limit", ["It is gone forever", "You only get half back", "You must buy more insurance first"], "Compare the amount to the standard limit.", "Deposits under the limit at an insured bank are safe."],
    ["How can you tell a bank is FDIC insured?", "It shows the official FDIC sign or says so on its official pages", ["It has a big building", "It has a long name", "It has a nice app"], "Look for an official sign of membership, not looks.", "Real insured banks display a specific official sign."],
    ["Which kind of money is protected only up to the limit per bank?", "Everything you keep in deposit accounts at one bank", ["Cash hidden at home", "Money in a friend's wallet", "Coins in a jar"], "The limit counts what you have in one bank.", "It is about deposits inside a bank."]
  ], "Example: a $5,000 CD at an insured bank is a deposit, so it is covered; $5,000 of stock is not. Now do yours.",
  [["Deposit insurance", "🏦", "<b>FDIC insurance</b> protects money in insured bank accounts if a bank fails. Credit unions have <b>NCUA</b> insurance."], ["The limit", "📏", "The standard limit is <b>$250,000</b> per depositor, per bank, per ownership category."], ["What it skips", "⚠️", "It does not cover stocks, bonds, mutual funds or crypto, because those can change in value."]]));

  l19.push(mcL("Which tax form?", [
    ["Which form tells your employer how much tax to withhold from your pay?", "Form W-4", ["Form W-2", "Form 1099-NEC", "Form 1040"], "It is filled out when you start a job.", "Think about the form you give to your employer."],
    ["Which form does your employer send you after the year ends, showing your yearly wages and taxes withheld?", "Form W-2", ["Form W-4", "Form 1099-NEC", "Form 8"], "It reports what you earned last year.", "It comes FROM the employer to you."],
    ["Which form might a client send a freelancer who was paid for work as a contractor?", "Form 1099-NEC", ["Form W-4", "Form W-2", "Form 4"], "Contractors are not employees.", "Think of who gets paid without being on a payroll."],
    ["Which form is the main individual income tax return many people file?", "Form 1040", ["Form W-4", "Form W-2", "Form 1099-NEC"], "It is the form where you report all income for the year.", "It is the return itself, not a pay document."],
    ["You start a new job. Which form do you fill out for payroll?", "Form W-4", ["Form 1040", "Form W-2", "Form 1099-NEC"], "You fill it out at the start, not at the end of the year.", "It sets how much is held back from each paycheck."],
    ["Your employer reports your yearly wages to you on which form?", "Form W-2", ["Form 1040", "Form W-4", "Form 1099-NEC"], "It is a yearly summary from your employer.", "Think about the document you receive in January."],
    ["Which person normally gets a Form 1099-NEC?", "A freelance designer paid by a client", ["A full-time employee with a salary", "A student with no income", "A baby"], "It is about payments for independent work.", "Who is paid without being on payroll?"],
    ["What do you send in with your tax return to report your income for the whole year?", "Form 1040", ["Form W-4", "Form W-2", "A store receipt"], "It is the main return.", "It collects income from W-2s and 1099s together."]
  ], "Example: a babysitter paid in cash by a family reports that income on her own return. Forms like the 1040 gather all income. Now do yours.",
  [["Paperwork map", "🗂️", "Taxes use a few key forms. Knowing which is which keeps you from getting lost."], ["Employees", "👷", "<b>W-4</b>: you tell your employer how much to withhold. <b>W-2</b>: your employer reports your yearly pay to you."], ["Contractors and returns", "🧾", "<b>1099-NEC</b>: a client reports payments to a contractor. <b>1040</b>: the main yearly income tax return."]]));

  l19.push(L("Taxable income", () => {
    const k = ri(0, 1), I = pick([30000, 36000, 40000, 45000, 50000, 60000]), d = pick([10000, 12000, 14000, 15000]), nm = nm0();
    if (k === 0) return q(`${nm} earned $${I.toLocaleString("en-US")} in a year and has a deduction of $${d.toLocaleString("en-US")}. What is the taxable income?`, I - d,
      "A deduction lowers the income that gets taxed.", "Subtract the deduction from the income.",
      () => { const i = pick([30000, 40000]), dd = 12000; return `Example: income $${i}, deduction $${dd}. ${i} − ${dd} = $${i - dd} taxable. Now do yours.`; });
    const base = pick([20000, 25000, 30000, 40000]), d2 = pick([10000, 12000]);
    return q(`${nm}'s income was $${(base + d2).toLocaleString("en-US")} and the deduction was $${d2.toLocaleString("en-US")}. At a flat 10% rate on taxable income, what is the tax? (dollars)`, base / 10,
      "Figure out taxable income first.", "Taxable income minus deduction, then take 10% of that.",
      () => { const b = 20000, dd = 10000; return `Example: income ${b + dd}, deduction ${dd}. Taxable ${b}. 10% of ${b} is ${b / 10}. Now do yours.`; });
  }, [["Not all income is taxed", "✂️", "A <b>deduction</b> is an amount you may subtract from income before tax is figured. What is left is <b>taxable income</b>."], ["The steps", "🧮", "Taxable income = income − deductions. Then the tax rate is applied to the taxable amount."], ["Example", "📋", "Income $40,000, deduction $12,000: only <b>$28,000</b> is taxed."]]));

  l19.push(L("Credit or deduction?", () => {
    const k = ri(0, 1), nm = nm0();
    if (k === 0) { const T = pick([1500, 2000, 2500, 3000]), c = pick([300, 500, 800, 1000]); return q(`${nm} owes $${T} in tax. ${nm} qualifies for a $${c} tax credit. How much tax is owed after the credit? (dollars)`, T - c,
      "A credit is taken straight off the tax bill.", "Subtract the credit from the tax owed.",
      () => { const t = 1800, cc = 400; return `Example: tax $${t}, credit $${cc}. ${t} − ${cc} = $${t - cc}. Now do yours.`; }); }
    const d = pick([400, 800, 1000, 2000]), r = pick([10, 20, 25]);
    return q(`${nm} gets a $${d} deduction and is in the ${r}% tax rate. About how many dollars of tax does the deduction save?`, d * r / 100,
      "A deduction lowers income, so you save only a part of it in tax.", "Take the tax rate percent of the deduction.",
      () => { const dd = 600, rr = 10; return `Example: deduction $${dd} at ${rr}%. ${dd} × ${rr} ÷ 100 = $${dd * rr / 100} saved. Now do yours.`; });
  }, [["Two helpers", "🤝", "A <b>credit</b> lowers your tax bill dollar for dollar. A <b>deduction</b> lowers your taxable income."], ["Credit math", "🧮", "Tax after credit = tax − credit."], ["Deduction math", "📉", "Tax saved = deduction × tax rate. A $1,000 deduction at 20% saves $200, so a credit of the same size is stronger."]]));

  l19.push(L("Reading a pay stub", () => {
    const k = ri(0, 1), nm = nm0();
    if (k === 0) { const G = pick([400, 500, 600, 750, 800, 900]), n = ri(3, 11); return q(`${nm}'s pay stub shows $${G} gross pay each period. After ${n} pay periods, what does the "year to date" gross pay say? (dollars)`, G * n,
      "Year to date adds up pay since January.", "Multiply the pay for one period by the number of periods so far.",
      () => { const g = 500, c = 4; return `Example: $${g} each period for ${c} periods: ${g} × ${c} = $${g * c}. Now do yours.`; }); }
    const f = pick([["every week", 52], ["every two weeks", 26], ["twice a month", 24], ["once a month", 12]]), G = pick([400, 500, 800, 1000, 1500]);
    return q(`${nm} is paid $${G} gross ${f[0]}. How much is that gross pay in a full year? (dollars)`, G * f[1],
      "How many paychecks does a year have for this schedule?", "Multiply the pay for one check by the number of checks in a year.",
      () => { const g = 300; return `Example: $${g} paid every week, 52 weeks a year: ${g} × 52 = $${g * 52}. Now do yours.`; });
  }, [["Look closely", "🧾", "A pay stub shows <b>gross pay</b> (before deductions), the deductions, and <b>net pay</b> (take-home)."], ["Year to date", "📅", "<b>YTD</b> means the total so far this year. After 5 periods of $600, YTD gross is 5 × 600 = $3,000."], ["Pay schedules", "🗓️", "Weekly is 52 checks a year, every two weeks is 26, twice a month is 24 and monthly is 12."]]));

  l19.push(mixOf("Mixed practice", [l19[0], l19[3], l19[4], l19[9], l19[10], l19[15]]));
  l19.push(mixOf("Level 19 Challenge", [l19[1], l19[2], l19[5], l19[6], l19[7], l19[8], l19[11], l19[12], l19[13], l19[14], l19[16], l19[17]]));

  // ======================= LEVEL 20 (9th grade, second half) =======================
  const l20 = [];

  l20.push(L("Gross margin", () => {
    let R, m, i = 0;
    do { R = pick([20, 25, 40, 50, 80, 100, 200]); m = pick([10, 20, 25, 30, 40, 50, 60]); } while (((R * (100 - m)) % 100 !== 0) && ++i < 200);
    const C = R * (100 - m) / 100, nm = nm0();
    return q(`${nm}'s shop sold goods for $${R} and the goods cost $${C} to make or buy. What is the gross margin as a percent? (number only)`, m,
      "Margin compares the profit to the SALES amount.", "Profit = sales − cost. Then divide the profit by the sales and multiply by 100.",
      () => { const r = 50, c = 40; return `Example: sales $${r}, cost $${c}. Profit ${r - c}. ${r - c} ÷ ${r} = ${(r - c) / r}, so ${(r - c) / r * 100}%. Now do yours.`; });
  }, [["Margin", "📊", "<b>Gross margin</b> = (sales − cost) ÷ sales × 100. It tells how many cents of each sales dollar are left after the goods cost."], ["Example", "🧮", "Sales $80, cost $60. Profit $20. 20 ÷ 80 = 0.25, so the margin is <b>25%</b>."], ["Compare shops", "🏪", "A higher margin means more is left to pay rent, wages and profit."]]));

  l20.push(L("Markup versus margin", () => {
    const pr = pick([[25, 20], [100, 50], [150, 60], [300, 75], [400, 80]]), c = pick([8, 12, 16, 20, 24, 40, 60, 80]), s = c * (100 + pr[0]) / 100, k = ri(0, 1);
    if (k === 0) return q(`A store buys a gadget for $${c} and sells it for $${s}. What is the markup as a percent of the cost? (number only)`, pr[0],
      "Markup compares the profit to the COST.", "Profit = price − cost. Divide the profit by the cost, then multiply by 100.",
      () => { const cc = 10, ss = 15; return `Example: cost $${cc}, price $${ss}. Profit ${ss - cc}. ${ss - cc} ÷ ${cc} = ${(ss - cc) / cc}, so ${(ss - cc) / cc * 100}%. Now do yours.`; });
    return q(`A store buys a gadget for $${c} and sells it for $${s}. What is the margin as a percent of the selling price? (number only)`, pr[1],
      "Margin compares the profit to the SELLING PRICE.", "Profit = price − cost. Divide the profit by the selling price, then multiply by 100.",
      () => { const cc = 10, ss = 20; return `Example: cost $${cc}, price $${ss}. Profit ${ss - cc}. ${ss - cc} ÷ ${ss} = ${(ss - cc) / ss}, so ${(ss - cc) / ss * 100}%. Now do yours.`; });
  }, [["Two percents", "🔀", "The same profit can be shown two ways. <b>Markup</b> = profit ÷ cost. <b>Margin</b> = profit ÷ selling price."], ["Example", "🧮", "Cost $10, price $20. Profit $10. Markup is 10 ÷ 10 = 100%. Margin is 10 ÷ 20 = <b>50%</b>."], ["Rule", "📌", "A markup can be over 100%, but a margin never can be, because profit is never more than the price."]]));

  l20.push(L("Unemployment rate", () => {
    let Lf, rate, i = 0;
    do { Lf = pick([200, 500, 1000, 2000, 2500, 4000]); rate = pick([4, 5, 6, 8, 10, 12]); } while ((Lf * rate) % 100 !== 0 && ++i < 200);
    const U = Lf * rate / 100;
    if (Math.random() < 0.5) return q(`A town has ${Lf} people in the labor force (working or looking for work). ${U} of them are looking for a job but have none. What is the unemployment rate as a percent? (number only)`, rate,
      "The rate compares the jobless group to the whole labor force.", "Divide the number looking for work by the labor force, then multiply by 100.",
      () => { const l = 500, u = 25; return `Example: ${u} jobless in a labor force of ${l}. ${u} ÷ ${l} = ${u / l}, so ${u / l * 100}%. Now do yours.`; });
    return q(`A town has ${Lf} people in its labor force. The unemployment rate is ${rate}%. How many people are unemployed?`, U,
      "Find a percent of the labor force.", "Divide the labor force by 100 and multiply by the rate number.",
      () => { const l = 500, r = 4; return `Example: labor force ${l}, rate ${r}%. ${l} ÷ 100 × ${r} = ${l * r / 100}. Now do yours.`; });
  }, [["A health check", "🏙️", "The <b>unemployment rate</b> shows how much of the labor force is looking for work but cannot find it."], ["The formula", "🧮", "Rate = unemployed ÷ labor force × 100. The labor force is people who have a job or are looking for one."], ["Not everyone counts", "ℹ️", "Students, retirees and people not looking are not in the labor force."]]));

  l20.push(L("Average daily balance", () => {
    let A, B, d1, d2, t, i = 0;
    do { d1 = pick([10, 15, 20]); d2 = 30 - d1; A = ri(1, 9) * 100; B = ri(1, 9) * 100; t = A * d1 + B * d2; } while ((A === B || t % 30 !== 0) && ++i < 500);
    return q(`A credit card balance was $${A} for ${d1} days of a 30-day month, then $${B} for the other ${d2} days. What is the average daily balance? (dollars)`, t / 30,
      "Each balance counts for the number of days it lasted.", "Multiply each balance by its days, add them, then divide by 30.",
      () => { return `Example: $100 for 10 days and $400 for 20 days. 100 × 10 = 1000 and 400 × 20 = 8000. 9000 ÷ 30 = $300. Now do yours.`; });
  }, [["Card interest", "💳", "Many cards figure interest on the <b>average daily balance</b>, not the balance on one day."], ["Weighted by days", "📆", "Balance × days for each stretch, add those up, divide by the days in the month."], ["Why it matters", "🧠", "Paying off a big purchase early in the month lowers the average and the interest."]]));

  l20.push(L("Snowball or avalanche?", () => {
    const nms = shuf(["Card A", "Card B", "Card C"]), bal = shuf([150, 300, 450, 600, 900, 1200, 1800]).slice(0, 3), rate = shuf([12, 15, 18, 21, 24, 27]).slice(0, 3);
    const list = nms.map((n, i) => `${n}: $${bal[i]} at ${rate[i]}%`).join("; ");
    const sn = Math.random() < 0.5;
    const bi = bal.indexOf(Math.min(...bal)), ri2 = rate.indexOf(Math.max(...rate));
    const right = nms[sn ? bi : ri2];
    return mcq(`Your debts are ${list}. Which one do you pay off FIRST with the ${sn ? "debt snowball" : "debt avalanche"} method?`, right, nms.filter(n => n !== right),
      sn ? "This method looks at the size of each balance." : "This method looks at the interest rate of each debt.",
      sn ? "Snowball starts with the smallest balance for quick wins." : "Avalanche starts with the debt that costs the most in interest.",
      "Example: Debt X $100 at 10% and Debt Y $500 at 30%. Snowball pays X first (smallest). Avalanche pays Y first (highest rate). Now do yours.");
  }, [["Two plans", "⛷️", "Both plans pay the minimum on every debt, then put every extra dollar on ONE debt."], ["Snowball", "⛄", "<b>Snowball</b>: pay the smallest balance first. Quick wins keep you motivated."], ["Avalanche", "🏔️", "<b>Avalanche</b>: pay the highest interest rate first. It usually costs the least in interest."]]));

  l20.push(L("Balance transfer", () => {
    const B = pick([1000, 1500, 2000, 2500, 3000, 4000, 5000]), r = pick([18, 20, 24]), f = pick([3, 4, 5]), nm = nm0();
    return q(`${nm} owes $${B} on a card with ${r}% interest a year. A new card offers 0% for a year with a ${f}% transfer fee. Using simple yearly interest, how many dollars does ${nm} save in the first year by moving the balance? (dollars)`, B * (r - f) / 100,
      "Compare the interest avoided to the fee paid.", "Interest saved = balance × old rate. Fee = balance × fee rate. Savings is the difference.",
      () => { const b = 1000, rr = 20, ff = 3; return `Example: $${b}, old ${rr}%, fee ${ff}%. Interest ${b * rr / 100}, fee ${b * ff / 100}. ${b * rr / 100} − ${b * ff / 100} = $${b * (rr - ff) / 100}. Now do yours.`; });
  }, [["Moving a debt", "🔄", "A <b>balance transfer</b> moves debt to a new card, often with a low or 0% rate for a while."], ["The catch", "⚠️", "There is usually a <b>transfer fee</b>, and the low rate ends. If the balance is not paid in time, the high rate returns."], ["Compare", "🧮", "Savings = interest you avoid − fee you pay."]]));

  l20.push(L("Certificates of deposit", () => {
    const P = pick([1200, 2400, 3600, 6000, 12000]), r = pick([2, 3, 4, 5]);
    if (Math.random() < 0.5) { const m = ri(2, 6); return q(`A CD holds $${P} at ${r}% a year. If you break it early, the penalty is ${m} months of interest. How many dollars is the penalty? (monthly interest is the yearly interest divided by 12)`, P / 1200 * r * m,
      "First find a year of interest, then one month.", "Monthly interest × the number of penalty months.",
      () => { const p = 2400, rr = 3, mm = 4; return `Example: $${p} at ${rr}%. Yearly ${p * rr / 100}, monthly ${p * rr / 1200}. Times ${mm} months = $${p * rr / 1200 * mm}. Now do yours.`; }); }
    const y = pick([1, 2, 3, 5]);
    return q(`A CD holds $${P} at ${r}% a year, paid out as simple interest. How much interest does it earn over ${y} year${y > 1 ? "s" : ""}? (dollars)`, P * r / 100 * y,
      "Find one year of interest first.", "Principal × rate gives a year. Multiply by the number of years.",
      () => { const p = 2000, rr = 4, yy = 2; return `Example: $${p} at ${rr}% for ${yy} years: ${p * rr / 100} a year, so $${p * rr / 100 * yy}. Now do yours.`; });
  }, [["A locked savings plan", "🔒", "A <b>certificate of deposit (CD)</b> keeps your money at a bank for a set time at a fixed rate."], ["The trade-off", "⏳", "Rates are often better than regular savings, but taking money out early usually costs a <b>penalty</b>."], ["Math", "🧮", "Interest = principal × rate × years. Monthly interest = yearly interest ÷ 12."]]));

  l20.push(L("Payday loans", () => {
    const f = pick([10, 12, 15, 16, 20]), n = ri(1, 8), nm = nm0();
    const k = ri(0, 1);
    if (k === 0) return q(`A payday lender charges $${f} for every $100 borrowed for two weeks. A year has 26 two-week periods. About what yearly interest rate (APR, as a percent) does that equal? (number only)`, f * 26,
      "Find how many fee periods fit in a year.", "Fee per $100 times 26 periods, shown as a percent of $100.",
      () => { const ff = 5; return `Example: a $${ff} fee per $100 for two weeks. ${ff} × 26 = ${ff * 26}, so about ${ff * 26}% APR. Now do yours.`; });
    return q(`${nm} borrows $${n * 100} from a payday lender that charges $${f} per $100 for two weeks. How many dollars is the fee? (dollars)`, n * f,
      "The fee is charged on every hundred dollars borrowed.", "Count the hundreds, then multiply by the fee per hundred.",
      () => { const nn = 3, ff = 10; return `Example: $${nn * 100} at $${ff} per $100: ${nn} × ${ff} = $${nn * ff}. Now do yours.`; });
  }, [["Short, costly loans", "⚠️", "A <b>payday loan</b> is a small loan due in a couple of weeks. The fee looks small but the yearly rate is huge."], ["Turn it into APR", "🧮", "A $15 fee on $100 for two weeks is 15% each period. With 26 periods, that is about <b>390% APR</b>."], ["Safer ideas", "🛟", "Build an emergency fund, ask a trusted adult, or use a low-rate credit union loan instead."]]));

  l20.push(L("15 years or 30?", () => {
    const p15 = pick([900, 1000, 1100, 1200]), p30 = pick([650, 700, 750, 800]), k = ri(0, 2);
    if (k === 0) return q(`A home loan costs $${p15} a month for 15 years. How much is paid in all? (dollars)`, p15 * 180,
      "Count the months in 15 years.", "Monthly payment × the number of months (12 × 15).",
      () => { const p = 500, y = 10; return `Example: $${p} a month for ${y} years: ${y} × 12 = ${y * 12} months. ${p} × ${y * 12} = $${p * y * 12}. Now do yours.`; });
    if (k === 1) return q(`A home loan costs $${p30} a month for 30 years. How much is paid in all? (dollars)`, p30 * 360,
      "Count the months in 30 years.", "Monthly payment × the number of months (12 × 30).",
      () => { const p = 500, y = 20; return `Example: $${p} a month for ${y} years: ${y} × 12 = ${y * 12} months. ${p} × ${y * 12} = $${p * y * 12}. Now do yours.`; });
    return q(`Loan A: $${p15} a month for 15 years. Loan B: $${p30} a month for 30 years. How many dollars more does Loan B cost in total?`, p30 * 360 - p15 * 180,
      "Find the total paid on each loan first.", "Total = payment × months (15 years is 180 months, 30 years is 360). Then subtract.",
      () => { const a = 800, b = 500; return `Example: 10 years at $${a} (${a * 120}) versus 20 years at $${b} (${b * 240}). Difference ${Math.abs(b * 240 - a * 120)}. Now do yours.`; });
  }, [["Short versus long", "🏡", "A shorter loan has a bigger monthly payment but less time to charge interest. A longer loan has smaller payments but costs more overall."], ["Total paid", "🧮", "Total = monthly payment × number of months. 15 years = 180 months. 30 years = 360 months."], ["Think", "🤔", "Pick what fits your budget, but remember that a lower payment can mean a lot more interest."]]));

  l20.push(L("Buy or lease a car", () => {
    const k = ri(0, 1);
    if (k === 0) { const d = pick([1000, 1500, 2000, 2500]), m = pick([250, 300, 350, 400]), t = pick([24, 36, 48]); return q(`A lease costs $${d} at signing plus $${m} a month for ${t} months. At the end the car is returned. What is the total paid? (dollars)`, d + m * t,
      "Add the one-time payment to all monthly payments.", "Monthly payment × months, then add the money paid at signing.",
      () => { const dd = 1000, mm = 200, tt = 24; return `Example: $${dd} at signing, $${mm} for ${tt} months: ${mm} × ${tt} = ${mm * tt}, plus ${dd} = $${dd + mm * tt}. Now do yours.`; }); }
    const dn = pick([2000, 3000, 4000]), m = pick([400, 500, 600]), t = pick([36, 48]), V = pick([8000, 10000, 12000]);
    return q(`Buying a car: $${dn} down plus $${m} a month for ${t} months. After that the car is still worth $${V}. What is the net cost (total paid minus the car's worth)? (dollars)`, dn + m * t - V,
      "Find everything paid first, then take away what you still own.", "Down payment + monthly payments, then subtract the car's value.",
      () => { const d = 3000, mm = 300, tt = 36, v = 6000; return `Example: $${d} + ${mm} × ${tt} = ${d + mm * tt}. Minus the $${v} value = $${d + mm * tt - v}. Now do yours.`; });
  }, [["Two ways to drive", "🚗", "With a <b>lease</b> you pay to use a car for a time, then give it back. When you <b>buy</b>, you own it when you finish paying."], ["Count everything", "🧮", "Lease total = signing fee + monthly payment × months. For buying, subtract what the car is still worth."], ["Watch out", "🔎", "Leases often limit miles and charge fees for damage. Buying gives freedom but needs a bigger monthly payment."]]));

  l20.push(L("Bond interest", () => {
    const F = pick([1000, 2000, 5000, 10000]), r = pick([2, 3, 4, 5, 6]), y = ri(2, 10), k = ri(0, 2);
    if (k === 0) return q(`A bond has a face value of $${F} and pays ${r}% a year. How much interest does it pay each year? (dollars)`, F * r / 100,
      "Interest is a percent of the face value.", "Divide the face value by 100 and multiply by the rate.",
      () => { const f = 1000, rr = pick([3, 4]); return `Example: $${f} at ${rr}%: ${f} ÷ 100 × ${rr} = $${f * rr / 100}. Now do yours.`; });
    if (k === 1) return q(`A bond has a face value of $${F} and pays ${r}% a year, split into two equal payments a year. How much is each payment? (dollars)`, F * r / 200,
      "Find the yearly interest first.", "Then split it into two payments.",
      () => { const f = 2000, rr = 4; return `Example: $${f} at ${rr}%. Yearly ${f * rr / 100}. Half is $${f * rr / 200}. Now do yours.`; });
    return q(`A bond has a face value of $${F} and pays ${r}% a year. How much interest does it pay in total over ${y} years? (dollars)`, F * r / 100 * y,
      "Find the interest for one year first.", "Multiply yearly interest by the number of years.",
      () => { const f = 1000, rr = 4, yy = 5; return `Example: $${f} at ${rr}% for ${yy} years: ${f * rr / 100} × ${yy} = $${f * rr / 100 * yy}. Now do yours.`; });
  }, [["Lending to a group", "📜", "A <b>bond</b> is a loan to a company or government. They pay you interest and give back the face value at the end."], ["Coupon", "💵", "The yearly interest is the <b>coupon</b>: face value × rate."], ["Example", "🧮", "A $1,000 bond at 4% pays <b>$40</b> a year."]]));

  l20.push(L("Reading stock numbers", () => {
    const e = pick([2, 4, 5, 10]), pe = pick([10, 15, 20, 25]), p = e * pe, sh = pick([2, 5, 10, 50, 100]), k = ri(0, 2);
    if (k === 0) return q(`A company earns $${e} per share and its stock price is $${p}. What is its price-to-earnings (P/E) ratio?`, pe,
      "P/E compares the price to what each share earns.", "Divide the stock price by the earnings per share.",
      () => { const ee = 3, pp = 60; return `Example: price $${pp}, earnings $${ee} per share. ${pp} ÷ ${ee} = ${pp / ee}. Now do yours.`; });
    if (k === 1) return q(`A company's stock price is $${p} and it has ${sh} million shares. What is its market cap in millions of dollars?`, p * sh,
      "Market cap is the value of all shares together.", "Multiply the price of one share by the number of shares.",
      () => { const pp = 20, ss = 4; return `Example: price $${pp}, ${ss} million shares: ${pp} × ${ss} = $${pp * ss} million. Now do yours.`; });
    return q(`A company earned $${e * sh} million in profit and has ${sh} million shares. What are its earnings per share (dollars)?`, e,
      "Share the profit equally among the shares.", "Divide total profit by the number of shares.",
      () => { const pr = 60, ss = 20; return `Example: profit $${pr} million, ${ss} million shares. ${pr} ÷ ${ss} = $${pr / ss} per share. Now do yours.`; });
  }, [["Numbers about a stock", "📈", "<b>Earnings per share</b> = profit ÷ shares. <b>P/E ratio</b> = price ÷ earnings per share."], ["Market cap", "🏢", "<b>Market cap</b> = price per share × number of shares. It is the market's price for the whole company."], ["Example", "🧮", "Price $50, earnings $5 per share: P/E is <b>10</b>. A higher P/E means investors pay more for each dollar earned."]]));

  l20.push(L("Return on investment", () => {
    const b = pick([200, 400, 500, 800, 1000]), g = pick([10, 20, 25, 40, 50]), k = ri(0, 2);
    const profit = b * g / 100;
    if (k === 0) return q(`Zoe bought items for $${b} and sold them for $${b + profit}. What is the return on investment (ROI) as a percent? (number only)`, g,
      "ROI compares the gain to what you put in.", "Gain = sold − bought. Divide the gain by the amount you paid, then multiply by 100.",
      () => { const bb = 100, ss = 130; return `Example: bought $${bb}, sold $${ss}. Gain ${ss - bb}. ${ss - bb} ÷ ${bb} = ${(ss - bb) / bb}, so ${(ss - bb) / bb * 100}%. Now do yours.`; });
    if (k === 1) return q(`Zoe bought items for $${b} and sold them for $${b - profit}. What percent of the money did Zoe lose? (number only)`, g,
      "Percent lost compares the loss to what you paid.", "Loss = bought − sold. Divide the loss by the amount you paid, then multiply by 100.",
      () => { const bb = 100, ss = 70; return `Example: bought $${bb}, sold $${ss}. Loss ${bb - ss}. ${bb - ss} ÷ ${bb} = ${(bb - ss) / bb}, so ${(bb - ss) / bb * 100}%. Now do yours.`; });
    return q(`Zoe wants a ${g}% return on $${b} of items. For how many dollars must they be sold? (dollars)`, b + profit,
      "Find the gain Zoe wants first.", "Gain = cost × the percent. Then add it to the cost.",
      () => { const bb = 200, gg = 10; return `Example: cost $${bb}, ${gg}% return. Gain ${bb * gg / 100}. Sell for ${bb} + ${bb * gg / 100} = $${bb + bb * gg / 100}. Now do yours.`; });
  }, [["Is it paying off?", "💹", "<b>Return on investment (ROI)</b> shows the gain or loss as a percent of the money you put in."], ["The formula", "🧮", "ROI = (gain ÷ amount invested) × 100. A $20 gain on $200 is 10%."], ["Losses too", "⚠️", "A loss is a negative return. A loss of $20 on $200 is a 10% loss."]]));

  l20.push(L("Setting a freelance rate", () => {
    const rate = pick([25, 30, 40, 50, 60, 75]), h = pick([10, 20, 25, 30]), T = rate * h * 50, k = ri(0, 1);
    if (k === 0) return q(`A freelancer wants to earn $${T.toLocaleString("en-US")} in a year. She can bill ${h} hours a week for 50 weeks. What hourly rate is needed? (dollars)`, rate,
      "Find how many billable hours there are in the year.", "Billable hours = hours a week × weeks. Then divide the goal by those hours.",
      () => { const hh = 20, rr = 30; return `Example: goal $${hh * rr * 50} with ${hh} hours × 50 weeks = ${hh * 50} hours. ${hh * rr * 50} ÷ ${hh * 50} = $${rr} an hour. Now do yours.`; });
    return q(`A freelancer charges $${rate} an hour and bills ${h} hours a week for 50 weeks. How much does she earn before expenses and taxes? (dollars)`, rate * h * 50,
      "Find the billable hours in the year first.", "Hours a week × weeks × hourly rate.",
      () => { const hh = 20, rr = 30; return `Example: $${rr} an hour, ${hh} hours × 50 weeks = ${hh * 50} hours. ${rr} × ${hh * 50} = $${rr * hh * 50}. Now do yours.`; });
  }, [["Not every hour is paid", "⏱️", "Freelancers spend time finding clients, answering emails and doing paperwork. Only <b>billable hours</b> earn money."], ["Find the rate", "🧮", "Rate needed = yearly goal ÷ (billable hours per week × weeks)."], ["Plan higher", "📌", "Freelancers also pay their own taxes and buy their own tools, so they plan a rate higher than a job wage."]]));

  l20.push(L("Rental car math", () => {
    const dd = pick([30, 40, 50, 60]), days = ri(2, 6), m = pick([0.25, 0.5]), mi = pick([40, 60, 80, 100, 120, 200]);
    if (Math.random() < 0.5) return q(`A rental car costs $${dd} a day plus $${m.toFixed(2)} a mile. What is the cost for ${days} days and ${mi} miles? (dollars)`, r2(dd * days + m * mi),
      "There is a daily part and a per-mile part.", "Days × daily price, plus miles × price per mile.",
      () => { const d = 40, dy = 3, mm = 0.5, mls = 50; return `Example: $${d} a day for ${dy} days = ${d * dy}. ${mls} miles at $${mm} = ${mm * mls}. Total $${d * dy + mm * mls}. Now do yours.`; });
    const budget = dd * days + m * mi;
    return q(`A rental car costs $${dd} a day plus $${m.toFixed(2)} a mile. You have $${budget} for ${days} days. How many miles can you drive?`, mi,
      "Take away the cost of the days first.", "Divide what is left by the cost of one mile.",
      () => { const d = 40, dy = 2, mm = 0.5, mls = 60; return `Example: $${d * dy + mm * mls} budget, ${dy} days at $${d}. Left ${mm * mls}. ${mm * mls} ÷ ${mm} = ${mls} miles. Now do yours.`; });
  }, [["Two prices in one", "🚙", "Rental cars often charge per day <b>and</b> per mile. Both parts add up."], ["Cost", "🧮", "Cost = days × daily price + miles × mile price."], ["Miles you can afford", "🧭", "Budget − daily cost = money for miles. Divide by the per-mile price."]]));

  l20.push(L("Spread of a data set", () => {
    let v;
    do { v = Array.from({ length: 7 }, () => ri(10, 90)); v.sort((a, b) => a - b); } while (new Set(v).size < 7);
    const k = pick([["median", v[3]], ["Q1 (first quartile)", v[1]], ["Q3 (third quartile)", v[5]], ["interquartile range (IQR = Q3 − Q1)", v[5] - v[1]]]);
    const show = shuf(v).join(", ");
    return q(`Seven weekly spending amounts (dollars) are ${show}. What is the ${k[0]}? (this data has 7 values, so Q1 is the middle of the lowest 3 values and Q3 the middle of the highest 3)`, k[1],
      "Put the numbers in order from least to greatest first.", "The median is the middle number. Q1 and Q3 are the middles of the lower three and upper three.",
      () => { return `Example: 4, 6, 9, 12, 15, 20, 30 in order. The median is 12. Q1 is 6 and Q3 is 20. IQR is 20 − 6 = 14. Now do yours.`; });
  }, [["Beyond the average", "📦", "<b>Quartiles</b> split ordered data into four parts. They show how spread out spending or pay is."], ["Finding them", "🔎", "Order the list. The median is the middle. Q1 is the middle of the lower half. Q3 is the middle of the upper half."], ["IQR", "↔️", "IQR = Q3 − Q1. A small IQR means steady numbers. A big one means they vary a lot."]]));

  l20.push(L("Big money in scientific notation", () => {
    const co = pick([1.2, 2.5, 3.6, 4.5, 7.2, 8, 9.5, 3]), e = ri(4, 9), N = Math.round(co * 10 ** e);
    const k = ri(0, 1);
    if (k === 0) return q(`A company earned $${N.toLocaleString("en-US")}. In scientific notation that is ${co} × 10 to the power of what? (type the exponent)`, e,
      "Count how many places the decimal point must move.", "Move the decimal until one non-zero digit is left of it. The number of moves is the exponent.",
      () => { return `Example: 3,400,000 is 3.4 × 10 to the 6th, because the point moves 6 places. Now do yours.`; });
    return q(`A company earned $${co} × 10^${e}. Write that as a whole number with no commas. (digits only)`, N,
      "The exponent says how many places to move the decimal to the right.", "Move the decimal point right as many places as the exponent, filling with zeros.",
      () => { return `Example: 2.5 × 10^4: move the point 4 places to get 25000. Now do yours.`; });
  }, [["Very big numbers", "🔭", "<b>Scientific notation</b> writes big numbers as <b>a × 10^n</b>, where a is between 1 and 10."], ["Moving the point", "🔢", "The exponent n counts how many places the decimal moves. 4,500,000 = 4.5 × 10^6."], ["Why use it", "✨", "It is easier to compare huge amounts, like company sales or government budgets."]]));

  l20.push(mcL("Credit reports and scores", [
    ["What is the common range of a FICO credit score?", "300 to 850", ["0 to 100", "100 to 1,000", "1 to 10"], "Scores are not on a 100-point scale.", "The lowest possible score is a few hundred."],
    ["Which are the three major credit bureaus?", "Equifax, Experian and TransUnion", ["Equifax, Bankline and Creditbook", "Experian, FICO and Visa", "Visa, Mastercard and Equifax"], "Bureaus collect the information on your credit report.", "They are companies, not card networks."],
    ["Which factor usually affects a credit score the most?", "Paying bills on time", ["The color of your card", "How many friends you have", "Your age"], "Lenders care most about whether you repay.", "It is about your payment record."],
    ["What happens when you check your OWN credit report?", "It is a soft inquiry and does not hurt your score", ["It always drops your score a lot", "The bureau charges a big fee", "Your bank closes your account"], "Looking at your own report is a safe habit.", "Checking yourself is different from applying for new credit."],
    ["When you apply for a new loan, the lender usually does what?", "A hard inquiry, which can lower your score a little", ["Nothing at all", "A soft inquiry that is never recorded", "Deletes your debts"], "Applying for credit leaves a mark.", "It is the type of check that can slightly lower your score."],
    ["How long can late payments usually stay on your credit report?", "About 7 years", ["1 week", "Forever", "Until your next birthday"], "They do not vanish quickly, but they do not stay forever.", "It is measured in years, but fewer than ten."],
    ["Why might you want to check your credit reports?", "To catch mistakes or signs of identity theft", ["To raise your score right away", "To see your friends' scores", "To avoid taxes"], "Reports can contain errors.", "It is about finding things that do not belong to you."],
    ["Using close to your full credit limit usually does what to a score?", "Lowers it", ["Raises it a lot", "Has no effect at all", "Makes it exactly 850"], "Lenders see high use as a sign of strain.", "Lower balances compared to limits are better."]
  ], "Example: a late phone bill can lower a score, while a long history of on-time payments helps. Now do yours.",
  [["Your money record", "📑", "A <b>credit report</b> lists your accounts and payment history. A <b>credit score</b> (FICO is 300 to 850) sums it up."], ["What counts", "⚖️", "Paying on time matters most, then how much of your limit you use, then the length of your history."], ["Inquiries", "🔍", "A <b>soft</b> inquiry (checking yourself) does not hurt. A <b>hard</b> one (applying for credit) can lower it slightly."]]));

  l20.push(mixOf("Mixed practice", [l20[0], l20[2], l20[6], l20[8], l20[11], l20[13]]));
  l20.push(mixOf("Level 20 Challenge", [l20[1], l20[3], l20[4], l20[5], l20[7], l20[9], l20[10], l20[12], l20[14], l20[15], l20[16], l20[17]]));

  // ======================= LEVEL 21 (10th grade, first half) =======================
  const l21 = [];

  l21.push(L("Volume and cost", () => {
    const l = ri(2, 6), w = ri(2, 5), h = ri(1, 4), c = pick([2, 3, 4, 5]);
    if (Math.random() < 0.5) return q(`A garden box is ${l} feet long, ${w} feet wide and ${h} feet deep. How many cubic feet of soil fill it?`, l * w * h,
      "Volume of a box uses three measurements.", "Multiply length × width × height.",
      () => { const a = 3, b = 2, d = 2; return `Example: ${a} by ${b} by ${d} feet: ${a} × ${b} × ${d} = ${a * b * d} cubic feet. Now do yours.`; });
    return q(`A garden box is ${l} feet long, ${w} feet wide and ${h} feet deep. Soil costs $${c} per cubic foot. What does it cost to fill the box? (dollars)`, l * w * h * c,
      "Find the volume first, then the price.", "Volume = length × width × height. Multiply by the cost per cubic foot.",
      () => { const a = 3, b = 2, d = 2, cc = 2; return `Example: ${a} × ${b} × ${d} = ${a * b * d} cubic feet, times $${cc} = $${a * b * d * cc}. Now do yours.`; });
  }, [["Space costs money", "📦", "Soil, concrete and water are sold by volume. Volume of a box = length × width × height."], ["Two steps", "🧮", "Find the volume, then multiply by the price for each unit of volume."], ["Units", "📏", "Feet × feet × feet = <b>cubic feet</b>. Keep all measures in the same unit."]]));

  l21.push(L("Cans and cylinders", () => {
    const r = ri(2, 5), h = ri(3, 10), c = pick([2, 3, 5]);
    if (Math.random() < 0.5) return q(`A round tank has a radius of ${r} feet and is ${h} feet tall. Use 3 for π. How many cubic feet does it hold? (V = π × r × r × h)`, 3 * r * r * h,
      "A cylinder volume uses the radius twice.", "Multiply 3 × r × r × the height.",
      () => { const rr = 2, hh = 5; return `Example: r = ${rr}, h = ${hh}: 3 × ${rr} × ${rr} × ${hh} = ${3 * rr * rr * hh}. Now do yours.`; });
    return q(`A round tank has a radius of ${r} feet and is ${h} feet tall. Use 3 for π. Filling costs $${c} per cubic foot. What is the cost to fill it? (dollars)`, 3 * r * r * h * c,
      "Find how many cubic feet it holds first.", "Volume = 3 × r × r × height. Then multiply by the price per cubic foot.",
      () => { const rr = 2, hh = 5, cc = 2; return `Example: volume 3 × ${rr} × ${rr} × ${hh} = ${3 * rr * rr * hh}, times $${cc} = $${3 * rr * rr * hh * cc}. Now do yours.`; });
  }, [["Round containers", "🥫", "The volume of a cylinder is <b>π × r² × h</b>. Here we use 3 for π to keep the math easy."], ["Radius", "📐", "The radius is half the distance across the circle. r² means r × r."], ["Costing", "🧮", "Once you know the volume, multiply by the price per cubic foot."]]));

  l21.push(L("Both things happen", () => {
    let p1, p2, i = 0;
    do { p1 = pick([10, 20, 25, 40, 50]); p2 = pick([10, 20, 40, 50]); } while ((p1 * p2) % 100 !== 0 && ++i < 200);
    if (Math.random() < 0.6) return q(`The chance a phone breaks this year is ${p1}%. The chance a laptop breaks is ${p2}%. The two events are independent. What is the chance that BOTH break? (percent, number only)`, p1 * p2 / 100,
      "For independent events, you combine the chances by multiplying.", "Change each percent to a decimal, multiply, then change back to a percent.",
      () => { return `Example: 50% and 20%: 0.5 × 0.2 = 0.10, which is 10%. Now do yours.`; });
    const N = pick([1000, 2000, 5000]);
    return q(`In a town of ${N} households, ${p1}% own a boat and ${p2}% own a camper, and the two are independent. About how many households own both?`, Math.round(N * p1 * p2 / 10000),
      "First find the chance of owning both.", "Multiply the two chances as decimals, then multiply by the number of households.",
      () => { return `Example: 50% and 20% of 1000. 0.5 × 0.2 = 0.1, and 0.1 × 1000 = 100 households. Now do yours.`; });
  }, [["Two events", "🎯", "<b>Independent</b> events do not change each other. To find the chance both happen, <b>multiply</b> their chances."], ["Use decimals", "🔢", "20% = 0.2 and 10% = 0.1. Then 0.2 × 0.1 = 0.02, which is 2%."], ["Why it matters", "🛡️", "Insurance and planning use the idea that two rare bad things at once are even rarer."]]));

  l21.push(mcL("Retirement accounts", [
    ["Which account lets you pay tax later and your retirement withdrawals are taxed as income?", "Traditional account", ["Roth account", "Checking account", "Piggy bank"], "One kind gives a tax break now.", "The other kind is taxed first and then grows tax-free."],
    ["Which account is funded with money you already paid tax on and lets qualified withdrawals be tax-free?", "Roth account", ["Traditional account", "Savings bond only", "Credit card"], "The tax comes first, the benefit comes later.", "The name begins with the same letters as a person's name."],
    ["What is a 401(k)?", "A retirement plan offered through an employer", ["A type of credit card", "A bank for kids", "A tax form"], "It is tied to a job.", "Employers sometimes add money to it."],
    ["What does IRA stand for?", "Individual Retirement Account", ["Interest Rate Average", "Internal Revenue Allowance", "Insured Rapid Account"], "It is an account for one person.", "The middle word is about retiring."],
    ["Why is starting retirement savings early so powerful?", "The money has more years to grow", ["The bank pays you to wait", "Taxes disappear", "Prices never change"], "Time is the helper here.", "Growth builds on earlier growth."],
    ["Taking money out of a retirement account very early usually means what?", "Taxes and often a penalty", ["A free bonus", "Double the money", "Nothing happens"], "There are rules to discourage early use.", "Think about costs for breaking the rules."],
    ["Which is usually a good first step with a 401(k) at work?", "Put in enough to get any employer match", ["Ignore it", "Take out a loan to match nothing", "Skip the match"], "Free money is on the table.", "The employer adds when you add."],
    ["A Roth account is best for a person who expects what?", "A higher tax rate later than now", ["To never pay tax", "To stop saving", "To spend everything now"], "Paying the tax now is smart if it will be bigger later.", "Compare the future rate to today's."]
  ], "Example: a worker who expects to be taxed at a lower rate in retirement may like paying the tax later. Now do yours.",
  [["Saving for later", "🧓", "Retirement accounts help you save for the day you stop working. A <b>401(k)</b> is through an employer. An <b>IRA</b> is one you open yourself."], ["Two flavors", "🍨", "<b>Traditional</b>: tax break now, taxes when you withdraw. <b>Roth</b>: tax now, qualified withdrawals tax-free."], ["Rules", "📜", "Withdrawing very early usually triggers taxes and a penalty, so the money is meant to stay put."]]));

  l21.push(L("Vesting", () => {
    const k = ri(0, 1);
    if (k === 0) { const E = pick([1000, 2000, 3000, 4000, 5000]), v = pick([20, 25, 40, 50, 60, 75, 80, 100]); return q(`Your employer put $${E} into your retirement account. You are ${v}% vested. How much of it is yours to keep? (dollars)`, E * v / 100,
      "Vested means the part that is truly yours.", "Take the vested percent of the employer's money.",
      () => { const e = 2000, vv = 50; return `Example: $${e} and ${vv}% vested. ${e} ÷ 100 × ${vv} = $${e * vv / 100}. Now do yours.`; }); }
    const pr = pick([20, 25]), y = ri(1, pr === 20 ? 4 : 3);
    return q(`A plan vests ${pr}% for each year you work there. After ${y} year${y > 1 ? "s" : ""}, what percent are you vested? (number only)`, pr * y,
      "Each year adds the same amount.", "Multiply the percent per year by the number of years.",
      () => { const p = 10, yy = 4; return `Example: ${p}% a year for ${yy} years = ${p * yy}%. Now do yours.`; });
  }, [["Earning your match", "🔑", "Money your employer adds may take time to become yours. This is called <b>vesting</b>."], ["Schedule", "📆", "A plan might vest 20% a year, so you own all after 5 years. Your own contributions are always yours."], ["Math", "🧮", "Your share = employer money × vested percent."]]));

  l21.push(L("Using a trend line", () => {
    const m = pick([20, 25, 30, 40, 50]), b = pick([100, 150, 200, 300]), x = ri(2, 12), S = m * x + b;
    if (Math.random() < 0.5) return q(`A trend line for a savings tracker is S = ${m}x + ${b}, where x is the month number and S is dollars saved. What does it predict for month ${x}? (dollars)`, S,
      "Replace x with the month number.", "Multiply the slope number by the month, then add the starting amount.",
      () => { const mm = 10, bb = 50, xx = 4; return `Example: S = ${mm}x + ${bb} at x = ${xx}: ${mm} × ${xx} + ${bb} = ${mm * xx + bb}. Now do yours.`; });
    return q(`A trend line for a savings tracker is S = ${m}x + ${b}, where x is the month number and S is dollars saved. In which month does it predict $${S}?`, x,
      "Undo the equation step by step.", "Subtract the starting amount, then divide by the slope number.",
      () => { const mm = 10, bb = 50, xx = 6; return `Example: S = ${mm}x + ${bb} = ${mm * xx + bb}. ${mm * xx + bb} − ${bb} = ${mm * xx}, ÷ ${mm} = month ${xx}. Now do yours.`; });
  }, [["A line that fits", "📈", "A <b>line of best fit</b> is a straight line that follows the pattern in data points. It lets you make predictions."], ["Reading it", "🔍", "In <b>y = mx + b</b>, m shows how fast things grow and b is the starting value."], ["Careful", "⚠️", "Predictions far past the data can be wrong. Real life can change."]]));

  l21.push(L("Steady or swingy?", () => {
    let f;
    do { f = [0, 1, 2].map(() => Array.from({ length: 4 }, () => ri(-8, 18))); } while (new Set(f.map(a => Math.max(...a) - Math.min(...a))).size < 3);
    const names = ["Fund A", "Fund B", "Fund C"], rg = f.map(a => Math.max(...a) - Math.min(...a));
    const show = i => `${names[i]}: ${f[i].map(v => v + "%").join(", ")}`;
    const k = ri(0, 2);
    if (k === 2) { const i = ri(0, 2); return q(`Yearly returns for ${names[i]} were ${f[i].map(v => v + "%").join(", ")}. What is the range (highest minus lowest) in percentage points?`, rg[i],
      "Find the highest and the lowest first.", "Subtract the lowest from the highest.",
      () => { return `Example: returns 2, 9, -3, 5. Highest 9, lowest -3. 9 − (−3) = 12. Now do yours.`; }); }
    const wide = k === 0, idx = wide ? rg.indexOf(Math.max(...rg)) : rg.indexOf(Math.min(...rg));
    return mcq(`Yearly returns: ${[0, 1, 2].map(show).join("; ")}. Which fund had the ${wide ? "WIDEST" : "NARROWEST"} swings (range)?`, names[idx], names.filter((_, i) => i !== idx),
      "The range is the highest return minus the lowest return.", "Work out each fund's range, then compare them.",
      "Example: Fund X 2, 9, -3, 5 has range 12. Fund Y 4, 6, 5, 7 has range 3, so Y is steadier. Now do yours.");
  }, [["Risk looks like swings", "🎢", "Two funds can have the same average, but one may bounce much more. The bigger the bounces, the higher the <b>risk</b>."], ["Range", "↔️", "Range = highest − lowest. Subtracting a negative number adds: 9 − (−3) = 12."], ["Choosing", "🧭", "A long-term saver can handle bumps. Someone who needs the money soon prefers a steadier fund."]]));

  l21.push(mcL("Fair samples", [
    ["You want to learn what all students at a school think about lunch. Which sample is best?", "Ask randomly chosen students from every grade", ["Ask only your friends", "Ask only the lunch staff", "Ask only students in line at the pizza stand"], "A good sample looks like the whole group.", "Random selection beats picking people yourself."],
    ["A survey about town spending only asks people at a golf course. What is the problem?", "The sample is biased, since it leaves out many people", ["It is too random", "It is too big", "It is perfect"], "Think about who is NOT asked.", "Do the people asked represent everyone?"],
    ["Which is a larger, better-chosen sample for a poll?", "500 people picked at random across the city", ["3 people who volunteered", "Only people who answered an online ad", "Only the mayor's family"], "Size and fairness both help.", "Self-selected groups are rarely typical."],
    ["A company asks only its happiest customers for reviews. What problem does that cause?", "The results look better than reality", ["The results look worse than reality", "There is no problem", "The company saves money"], "The group was chosen, not random.", "Ask which direction the choice pushes the answers."],
    ["What does bias mean in a survey?", "A result pushed in one direction by how it was done", ["A result that is exactly average", "A very large sample", "A survey with no questions"], "It is about unfairness in the method.", "Something tilts the results."],
    ["A phone company says '9 out of 10 people love us,' but asked only 10 customers they picked. What should you ask?", "How were the 10 people chosen?", ["What color is their logo?", "How big is their office?", "Who designed the ad?"], "Check the method before you trust the number.", "A small, hand-picked group can mislead."],
    ["Which wording is the least biased question?", "How satisfied are you with the service?", ["Don't you agree our great service is the best?", "You love our service, right?", "Isn't our wonderful service amazing?"], "A fair question does not push you toward an answer.", "Look for neutral words."],
    ["Why do pollsters use random samples?", "So every person in the group has an equal chance of being asked", ["So the poll is cheaper", "So the answer is always yes", "So fewer people are asked"], "The goal is fairness.", "Randomness reduces bias."]
  ], "Example: to learn what a whole town thinks, asking every tenth name on the voter list is fairer than asking people at one shop. Now do yours.",
  [["Who did they ask?", "📋", "Data about prices, jobs or opinions comes from <b>samples</b>. A sample is a small group used to learn about a bigger group."], ["Fair or biased", "⚖️", "A good sample is <b>random</b> and big enough. A <b>biased</b> sample leaves out some people or picks the ones who agree."], ["Question wording", "💬", "Neutral questions give honest answers. Leading questions push people to a result."]]));

  l21.push(L("Price times quantity", () => {
    const a = pick([40, 50, 60, 80]), b = pick([2, 4, 5]), nm = nm0();
    const rev = p => p * (a - b * p);
    if (Math.random() < 0.55) { const p = ri(2, Math.floor(a / b) - 2); return q(`${nm}'s shop sells ${a} − ${b}×(price) cups a week when the price is set at that number of dollars. At a price of $${p}, how many dollars of revenue come in per week?`, rev(p),
      "Find how many cups sell at that price first.", "Revenue = price × number sold. Number sold = the formula with the price put in.",
      () => { const aa = 30, bb = 2, pp = 5; return `Example: sells ${aa} − ${bb}×price. At $${pp}: ${aa} − ${bb * pp} = ${aa - bb * pp} sold. Revenue ${pp} × ${aa - bb * pp} = $${pp * (aa - bb * pp)}. Now do yours.`; }); }
    let ps, i = 0, vals;
    do { ps = shuf([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 3); vals = ps.map(rev); } while ((vals.some(v => v <= 0) || new Set(vals).size < 3) && ++i < 500);
    const best = ps[vals.indexOf(Math.max(...vals))];
    return mcq(`${nm}'s shop sells ${a} − ${b}×(price) cups a week at a price in dollars. Which price brings in the MOST revenue?`, "$" + best, ps.filter(p => p !== best).map(p => "$" + p),
      "Work out the revenue at each price.", "Revenue = price × cups sold. Compare all three revenues.",
      "Example: sells 20 − 2×price. At $4: 4 × 12 = 48. At $6: 6 × 8 = 48... try $5: 5 × 10 = 50, so $5 beats both. Now do yours.");
  }, [["A tricky trade-off", "⚖️", "Raise the price and fewer people buy. Lower it and more buy. Revenue = price × quantity sold."], ["Try some prices", "🧮", "Put each price into the demand formula, find the number sold, then multiply."], ["Not the highest price", "📉", "The highest price is not always best. Revenue is often biggest somewhere in the middle."]]));

  l21.push(L("How big a nest egg?", () => {
    const S = pick([20000, 24000, 30000, 36000, 40000, 48000, 60000]), M = pick([2000, 2500, 3000, 3500, 4000, 5000]), N = pick([500000, 750000, 1000000, 1250000, 1500000, 2000000]);
    const k = ri(0, 2);
    if (k === 0) return q(`Using the "25 times" rule of thumb, how much should be saved to support $${S.toLocaleString("en-US")} of spending a year in retirement? (dollars)`, S * 25,
      "The rule says the nest egg is a multiple of yearly spending.", "Multiply yearly spending by 25.",
      () => { const s = 40000; return `Example: yearly spending ${s}. ${s} × 25 = ${s * 25}. Now do yours.`; });
    if (k === 1) return q(`Using the "4% rule", about how much can you safely take out each year from a nest egg of $${N.toLocaleString("en-US")}? (dollars)`, N * 4 / 100,
      "Find 4% of the nest egg.", "Divide by 100, then multiply by 4.",
      () => { const n = 500000; return `Example: ${n} ÷ 100 × 4 = ${n * 4 / 100}. Now do yours.`; });
    return q(`A retiree wants $${M.toLocaleString("en-US")} a month. How many dollars a year is that? Then the 25 times rule gives the nest egg. What nest egg is needed? (dollars)`, M * 12 * 25,
      "Turn the monthly spending into yearly spending first.", "Monthly × 12 gives a year. Multiply that by 25.",
      () => { const m = 3000; return `Example: $${m} a month is ${m * 12} a year. ${m * 12} × 25 = ${m * 12 * 25}. Now do yours.`; });
  }, [["A target number", "🥚", "A <b>nest egg</b> is the savings pile that supports you in retirement."], ["A rule of thumb", "🧮", "The <b>4% rule</b> says you can take about 4% of the pile each year. That means pile ≈ <b>25 × yearly spending</b>."], ["Just a guide", "🧭", "It is a starting estimate. Markets, taxes and lifespan change real plans."]]));

  l21.push(L("Short and long-term gains", () => {
    const G = pick([200, 400, 500, 800, 1000, 1500, 2000]), nm = nm0(), k = ri(0, 2);
    if (k === 0) return q(`${nm} sold a stock held for 5 months and made a $${G} gain. Gains on assets held one year or less are taxed like regular income. At a 22% rate, how much tax is owed? (dollars)`, G * 22 / 100,
      "A short-term gain uses the higher regular rate.", "Find 22% of the gain.",
      () => { const g = 500; return `Example: gain ${g}. ${g} ÷ 100 × 22 = ${g * 22 / 100}. Now do yours.`; });
    if (k === 1) return q(`${nm} sold a stock held for 2 years and made a $${G} gain. Assets held more than a year get a lower long-term rate, here 15%. How much tax is owed? (dollars)`, G * 15 / 100,
      "A long-term gain uses the lower rate.", "Find 15% of the gain.",
      () => { const g = 400; return `Example: gain ${g}. ${g} ÷ 100 × 15 = ${g * 15 / 100}. Now do yours.`; });
    return q(`${nm} has a $${G} gain. Short-term would be taxed at 22%, but waiting past a year would be 15%. How many dollars of tax would waiting save?`, G * 7 / 100,
      "Find the difference between the two rates.", "The rates differ by 7 points. Take that percent of the gain.",
      () => { const g = 300; return `Example: gain ${g}. 22 − 15 = 7 points. ${g} ÷ 100 × 7 = ${g * 7 / 100}. Now do yours.`; });
  }, [["Time changes tax", "⏳", "Profit from selling an investment is a <b>capital gain</b>. Held for a year or less, it is <b>short-term</b>. Held longer, it is <b>long-term</b>."], ["Different rates", "🧮", "Long-term gains usually get a lower tax rate. The rates in these questions are examples."], ["Patience pays", "🌱", "Holding good investments longer can save tax, but only sell when it fits your plan."]]));

  l21.push(mcL("Progressive, regressive or flat?", [
    ["A tax takes a higher percent of income as income rises. What kind of tax is it?", "Progressive", ["Regressive", "Flat", "Optional"], "The percent climbs along with income.", "The word shares a start with 'progress'."],
    ["Everyone pays the same percent of income, no matter how much they earn. What kind of tax is it?", "Flat", ["Progressive", "Regressive", "Voluntary"], "The percent never changes.", "The word describes a level surface."],
    ["A tax takes a bigger share of income from low earners than from high earners. What kind of tax is it?", "Regressive", ["Progressive", "Flat", "Exempt"], "The percent shrinks as income grows.", "It is the opposite of progressive."],
    ["A person earning $20,000 pays $2,000 and a person earning $100,000 pays $10,000. What kind of tax is this?", "Flat (10% each)", ["Progressive", "Regressive", "No tax"], "Compare the percent for each person.", "Divide each tax by its income."],
    ["A person earning $20,000 pays $1,000 (5%) and a person earning $100,000 pays $20,000 (20%). What kind of tax is this?", "Progressive", ["Flat", "Regressive", "Property"], "Look at how the percent changes.", "The rich person's percent is bigger."],
    ["The U.S. federal income tax with brackets is mostly which kind?", "Progressive", ["Flat", "Regressive", "Optional"], "Higher income, higher bracket rates.", "It uses brackets that climb."],
    ["Sales tax is often called regressive. Why?", "It takes a larger share of a low earner's income", ["It is higher for high earners", "It only taxes food", "It is the same for everyone as a share of income"], "Think about how much of their income each person spends.", "Low earners spend most of what they earn."],
    ["A tax is $300 on $3,000 of income for one person and $600 on $6,000 for another. What kind is it?", "Flat (10% each)", ["Progressive", "Regressive", "Free"], "Work out each percent.", "Divide each tax by its income."]
  ], "Example: tax $200 on $2,000 income and $200 on $4,000 income. The share shrinks (10% then 5%), so it is regressive. Now do yours.",
  [["Shape of a tax", "📊", "We name taxes by how the <b>percent</b> of income changes as income grows."], ["Three kinds", "🔺", "<b>Progressive</b>: percent rises with income. <b>Flat</b>: same percent for all. <b>Regressive</b>: percent falls as income rises."], ["How to test", "🧮", "Divide the tax by the income for each person, then compare the percents."]]));

  l21.push(L("Tax on a raise", () => {
    const R = pick([1000, 1500, 2000, 2500, 3000, 4000, 5000]), m = pick([10, 12, 22, 24]), nm = nm0();
    return q(`${nm} gets a $${R} yearly raise. The extra pay is taxed at a ${m}% marginal rate. How many dollars of the raise does ${nm} keep after that tax?`, R * (100 - m) / 100,
      "Find the tax on the raise first.", "Raise minus the tax, or raise × (100 − rate) ÷ 100.",
      () => { const r = 2000, mm = 10; return `Example: raise ${r}, rate ${mm}%. Tax ${r * mm / 100}. ${r} − ${r * mm / 100} = $${r - r * mm / 100} kept. Now do yours.`; });
  }, [["A raise myth", "🙅", "Some people fear a raise will push them into a bracket where they take home less. That does not happen."], ["Marginal rate", "🪜", "Only the dollars inside the higher bracket are taxed at the higher rate. Each extra dollar still leaves you with more."], ["Math", "🧮", "Kept = raise × (100 − rate) ÷ 100."]]));

  l21.push(L("Deficit or surplus", () => {
    const X = pick([200, 300, 400, 500, 600]), Y = X + pick([20, 40, 60, 80, 100]), k = ri(0, 2), D0 = pick([1000, 2000, 3000]);
    if (k === 0) return q(`A government collected $${X} billion in revenue and spent $${Y} billion. How many billion dollars is its deficit?`, Y - X,
      "A deficit means spending is more than revenue.", "Subtract revenue from spending.",
      () => { const x = 300, y = 340; return `Example: revenue ${x}, spending ${y}. ${y} − ${x} = ${y - x} billion. Now do yours.`; });
    if (k === 1) return q(`A town collected $${Y} million and spent $${X} million. How many million dollars is its surplus?`, Y - X,
      "A surplus means revenue is more than spending.", "Subtract spending from revenue.",
      () => { const x = 40, y = 55; return `Example: revenue ${y}, spending ${x}. ${y} − ${x} = ${y - x} million. Now do yours.`; });
    return q(`A country's debt is $${D0} billion. This year it runs a $${Y - X} billion deficit and borrows to cover it. What is the debt afterward in billion dollars?`, D0 + Y - X,
      "Deficits are added to the debt.", "Add the new deficit to the old debt.",
      () => { const d = 500, de = 30; return `Example: debt ${d} plus deficit ${de} = ${d + de}. Now do yours.`; });
  }, [["Income and outgo", "🏛️", "Governments get <b>revenue</b> (mostly taxes) and make <b>spending</b> choices."], ["Deficit and surplus", "⚖️", "<b>Deficit</b>: spending is more than revenue. <b>Surplus</b>: revenue is more than spending."], ["Debt", "🧾", "The <b>debt</b> is the total owed. Each deficit adds to it and a surplus can help pay it down."]]));

  l21.push(L("Cash flow and runway", () => {
    const C = pick([1000, 2000, 3000, 5000]), I = pick([800, 1000, 1500, 2000]), O = I + pick([200, 300, 400, 500]);
    const k = ri(0, 1);
    if (k === 0) { const In = I + pick([200, 400]), Out = pick([600, 800, 1000]); return q(`A small business starts the month with $${C}. It receives $${In} and pays out $${Out} during the month. How much cash does it have at the end? (dollars)`, C + In - Out,
      "Money in raises cash and money out lowers it.", "Start + in − out.",
      () => { const c = 1000, i = 500, o = 300; return `Example: start ${c} + ${i} − ${o} = ${c + i - o}. Now do yours.`; }); }
    let m, d = O - I;
    const runway = pick([3, 4, 5, 6, 8, 10]); const cash = d * runway;
    return q(`A start-up has $${cash} in cash. Each month it takes in $${I} and pays out $${O}. About how many months until the cash runs out?`, runway,
      "Find how much cash is lost per month first.", "Cash lost per month = out − in. Then divide the cash by that.",
      () => { const c = 600, i = 400, o = 500; return `Example: cash ${c}, in ${i}, out ${o}. Loses ${o - i} a month. ${c} ÷ ${o - i} = ${c / (o - i)} months. Now do yours.`; });
  }, [["Cash is king", "💵", "<b>Cash flow</b> is the money moving in and out of a business. A business can look profitable on paper but still run out of cash."], ["End cash", "🧮", "End cash = start cash + money in − money out."], ["Runway", "🛫", "<b>Runway</b> is how many months the cash lasts: cash ÷ monthly loss."]]));

  l21.push(L("Customers who leave", () => {
    const N = pick([200, 400, 500, 800, 1000, 2000]), p = pick([5, 10, 20, 25]), add = pick([20, 50, 80, 100]), nm = nm0();
    if (Math.random() < 0.5) return q(`${nm}'s app has ${N} subscribers. About ${p}% cancel each month (churn). How many cancel this month?`, N * p / 100,
      "Find a percent of the subscribers.", "Divide by 100 and multiply by the churn percent.",
      () => { const n = 400, pp = 5; return `Example: ${n} subscribers, ${pp}% churn. ${n} ÷ 100 × ${pp} = ${n * pp / 100}. Now do yours.`; });
    return q(`${nm}'s app has ${N} subscribers. ${p}% cancel this month, and ${add} new people join. How many subscribers are there at the end of the month?`, N - N * p / 100 + add,
      "Find who leaves first, then remove them and add the new ones.", "Start − cancellations + new people.",
      () => { const n = 400, pp = 10, a = 30; return `Example: ${n} − ${n * pp / 100} + ${a} = ${n - n * pp / 100 + a}. Now do yours.`; });
  }, [["Leaky bucket", "🪣", "<b>Churn</b> is the percent of customers who leave in a period. Subscription businesses must keep adding customers just to stay the same size."], ["The math", "🧮", "Lost = customers × churn percent. End = start − lost + new."], ["Why it matters", "📉", "Even a small monthly churn adds up over a year, so keeping customers is worth money."]]));

  l21.push(L("Comparing job offers", () => {
    const a = pick([42000, 45000, 48000, 50000, 54000]), b = a + pick([2000, 3000, 4000, 5000]), ca = pick([50, 100, 150]), cb = ca + pick([100, 200, 300]);
    const netA = a - 12 * ca, netB = b - 12 * cb;
    if (Math.random() < 0.6 && netA !== netB) return q(`Offer A pays $${a.toLocaleString("en-US")} a year with $${ca} a month in commute costs. Offer B pays $${b.toLocaleString("en-US")} a year with $${cb} a month in commute costs. After commuting costs, how many dollars more per year does the better offer leave you? (dollars)`, Math.abs(netA - netB),
      "Subtract a year of commute costs from each salary.", "A year has 12 months. Then compare the two leftovers.",
      () => { return `Example: Offer X $40,000 with $100 a month commute leaves 40000 − 1200 = 38800. Offer Y $42,000 with $300 a month leaves 42000 − 3600 = 38400. The gap is 400. Now do yours.`; });
    const S = pick([40000, 50000, 60000, 80000]), bo = pick([5, 10, 15]), be = pick([2000, 4000, 6000]);
    return q(`A job pays $${S.toLocaleString("en-US")}, a ${bo}% bonus and benefits worth $${be.toLocaleString("en-US")} a year. What is the total yearly compensation? (dollars)`, S + S * bo / 100 + be,
      "Total compensation includes more than the salary.", "Salary + the bonus amount + the value of benefits.",
      () => { const s = 40000, b2 = 10, v = 2000; return `Example: ${s} + ${s * b2 / 100} + ${v} = ${s + s * b2 / 100 + v}. Now do yours.`; });
  }, [["Look past salary", "💼", "A bigger salary is not always the better offer. Commute costs, bonuses and benefits change what you really get."], ["Costs of working", "🚌", "Net = salary − yearly costs of the job (12 × monthly commute)."], ["Total compensation", "🎁", "Total = salary + bonus + value of benefits like health insurance or retirement match."]]));

  l21.push(mcL("Freezes and fraud alerts", [
    ["What does a credit freeze do?", "Blocks new lenders from seeing your report, so fake accounts are harder to open", ["Erases your debts", "Raises your score", "Closes your current cards"], "It is a lock on access to your report.", "Think about thieves trying to open a new account in your name."],
    ["Does placing a credit freeze hurt your credit score?", "No, it does not", ["Yes, by 100 points", "Yes, it deletes accounts", "Only on weekdays"], "A freeze controls access, not your history.", "Your score depends on your payment behavior."],
    ["Is placing a credit freeze free in the U.S.?", "Yes, it is free", ["No, it costs about $50", "Only for adults over 80", "Only for businesses"], "Federal law makes it free.", "The law was changed to remove fees."],
    ["What does a fraud alert do?", "Tells lenders to verify your identity before opening credit", ["Blocks every new account", "Pays your bills", "Boosts your score"], "It is a warning flag on your file.", "Lenders are asked to take an extra step."],
    ["How long does an initial fraud alert usually last?", "One year", ["One day", "Ten minutes", "Forever"], "It is a short-term alert that can be renewed.", "It lasts about as long as one trip around the sun."],
    ["You want to apply for a new loan after freezing your credit. What should you do?", "Lift the freeze first, then place it again after", ["Never freeze at all", "Skip the loan forever", "Pay a thief to unlock it"], "A freeze can be temporarily removed.", "You control when it is on."],
    ["Does a credit freeze stop someone from using your EXISTING credit card number?", "No, it only protects against new accounts", ["Yes, it stops every kind of fraud", "Yes, and it cancels the card", "It blocks all spending forever"], "A freeze guards the front door for new credit.", "Existing accounts still need watching."],
    ["Who should you tell right away if your information is stolen?", "A parent or trusted adult, and the lenders involved", ["Nobody", "The thief", "Only your friends online"], "Quick action limits damage.", "Get help from someone you trust."]
  ], "Example: Ivy sees a charge she did not make. She tells a trusted adult and her bank, and asks them about a freeze. Now do yours.",
  [["Locking your file", "🔐", "A <b>credit freeze</b> stops lenders from viewing your report, which makes it hard for a thief to open new accounts in your name."], ["Alerts", "🚩", "A <b>fraud alert</b> tells lenders to double-check who is applying. An initial alert lasts about one year."], ["Be ready", "🛟", "Freezes are free and do not hurt your score. Always tell a trusted adult quickly if something looks wrong."]]));

  l21.push(mixOf("Mixed practice", [l21[0], l21[2], l21[4], l21[6], l21[8], l21[12]]));
  l21.push(mixOf("Level 21 Challenge", [l21[1], l21[3], l21[5], l21[7], l21[9], l21[10], l21[11], l21[13], l21[14], l21[15], l21[16], l21[17]]));

  Object.assign(MONEY_LEVELS, { 19: l19, 20: l20, 21: l21 });
})();
