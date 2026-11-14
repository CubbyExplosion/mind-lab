// ext/money-25-27.js  Mind Lab Money Skills levels 25-27 (60 lessons): intro college economics and finance
(() => {
  const NM = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
  const D = x => (Number.isInteger(x) ? "$" + x.toLocaleString("en-US") : "$" + x.toFixed(2));
  const r2 = x => +x.toFixed(2);
  const re = a => new RegExp("(?<![\d.])" + String(a).replace(/\./g, "\.") + "(?![\d])");
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
  // a numeric lesson built from several question styles
  const nL = (title, gens, slides) => L(title, () => pick(gens)(), slides);
  const nm0 = () => pick(NM);
  const K = n => n.toLocaleString("en-US");

  // ======================= LEVEL 25 (12th grade, first half) =======================
  const l25 = [];

  l25.push(mcL("Production possibilities", [
    ["On a production possibilities curve (PPC), a point INSIDE the curve means the economy is...", "using resources inefficiently", ["using resources fully and efficiently", "producing more than is possible"], "Is the economy getting all it could from its resources?", "Inside means there is room to make more of something without making less of something else."],
    ["A point OUTSIDE a production possibilities curve is...", "not reachable with current resources", ["efficient and easy to reach", "a sign of wasted resources"], "The curve marks the limit of what can be made.", "Beyond the limit is something the economy cannot do right now."],
    ["A point ON the production possibilities curve means...", "all resources are used efficiently", ["resources are sitting idle", "the point cannot be reached"], "The curve is the edge of what is possible.", "At the edge nothing is wasted."],
    ["Better technology makes both goods easier to produce. The PPC...", "shifts outward", ["shifts inward", "does not move"], "The economy can now make more of everything.", "A bigger set of possible outputs means the edge moves away from the origin."],
    ["A PPC that bows outward (is curved) shows...", "increasing opportunity cost", ["constant opportunity cost", "no opportunity cost"], "As you make more of one good, the best resources for it get used up.", "Each extra unit costs more of the other good than the last one did."],
    ["A straight-line PPC shows...", "constant opportunity cost", ["increasing opportunity cost", "unlimited resources"], "Check what happens to the trade-off at each step along the line.", "Every step gives up the same amount of the other good."],
    ["A flood destroys many factories. The PPC...", "shifts inward", ["shifts outward", "stays where it was"], "Fewer resources means fewer things can be made.", "The limit of what is possible gets smaller."],
    ["Moving along the PPC from more cars to more bikes shows...", "a trade-off: more bikes means fewer cars", ["both goods can increase for free", "that scarcity has ended"], "Resources used for one good cannot be used for the other.", "On the edge, getting more of one thing costs some of the other."]
  ], "Example: a farm can make wheat or corn. At the edge of its PPC it cannot add wheat without giving up some corn. If it adds a new tractor, the whole edge moves out. Now do yours.",
    [["The PPC", "📈", "A <b>production possibilities curve</b> shows the most of two goods an economy can make with its resources and technology."], ["Inside, on, outside", "🎯", "<b>On</b> the curve: efficient. <b>Inside</b>: wasteful. <b>Outside</b>: not possible yet."], ["Shifts and slopes", "↔️", "New resources or technology shift the curve <b>outward</b>. A bowed shape means <b>increasing opportunity cost</b>."]]));

  l25.push(mcL("Move along or shift?", [
    ["The price of pizza falls and people buy more pizza. This is...", "a movement along the demand curve", ["a shift of the demand curve", "a shift of the supply curve"], "Was it the good's own price that changed?", "A change in a good's own price moves you along the same curve."],
    ["Incomes rise and people want more of a normal good at every price. This is...", "a shift of the demand curve", ["a movement along the demand curve", "a movement along the supply curve"], "Did the good's own price cause the change?", "Something other than price changed how much people want at each price."],
    ["Cheaper fertilizer lets farmers grow more corn at every price. This is...", "a shift of the supply curve", ["a movement along the supply curve", "a shift of the demand curve"], "Who is affected, buyers or sellers?", "The cost of making the good changed, which is not the good's own price."],
    ["A higher price for corn makes farmers grow more. This is...", "a movement along the supply curve", ["a shift of the supply curve", "a shift of the demand curve"], "Which thing changed first, the price or something else?", "The good's own price moved sellers along their curve."],
    ["A new tax on sellers raises their costs. The supply curve...", "shifts left", ["shifts right", "does not move"], "Higher costs make sellers offer fewer goods at each price.", "Less supplied at each price means the curve moves toward less."],
    ["A famous review makes a restaurant very popular. Demand for its meals...", "shifts right", ["shifts left", "moves along the curve only"], "Tastes and popularity are not the price of the meal.", "More people want meals at every price."],
    ["Technology makes phones cheaper to build. The supply curve of phones...", "shifts right", ["shifts left", "does not move"], "Lower costs let sellers offer more at each price.", "More supplied at each price means the curve moves toward more."],
    ["The price of a concert ticket rises. The quantity demanded...", "falls, along the same curve", ["rises, along the same curve", "stays the same because demand shifted"], "Only the ticket's own price changed.", "A higher price means people buy less, and the curve itself stays put."]
  ], "Example: if bread's own price goes up, we slide along the demand curve. If a rumor says flour will vanish, buyers want more bread at every price, so the curve moves. Now do yours.",
    [["Two kinds of change", "🔀", "A change in a good's <b>own price</b> causes a <b>movement along</b> the curve."], ["Shifts", "↔️", "Anything else (income, tastes, costs, technology, taxes) <b>shifts</b> the whole curve."], ["Words to use", "📝", "Along the curve: <b>quantity demanded or supplied</b> changes. A shift: <b>demand or supply</b> changes."]]));

  l25.push(mcL("What shifts demand?", [
    ["Incomes rise. Demand for a NORMAL good...", "increases", ["decreases", "does not change"], "Normal goods are bought more when people have more money.", "More income, more buying of normal goods."],
    ["Incomes rise. Demand for an INFERIOR good (like instant noodles) usually...", "decreases", ["increases", "does not change"], "People can afford to switch to something they like better.", "An inferior good is one bought less as income grows."],
    ["The price of tea (a substitute) rises. Demand for coffee...", "increases", ["decreases", "does not change"], "Buyers look for something to replace the pricey item.", "Substitutes: when one gets dearer, buyers move to the other."],
    ["The price of printers (a complement) rises. Demand for ink...", "decreases", ["increases", "does not change"], "Ink is used together with printers.", "Complements move in the opposite direction when one gets dearer."],
    ["People expect a game console to cost much more next month. Demand for it today...", "increases", ["decreases", "does not change"], "Buyers want to buy before the price goes up.", "Expecting a higher future price pulls buying forward."],
    ["A town's population grows quickly. Demand for housing...", "increases", ["decreases", "does not change"], "Think about the number of buyers in the market.", "A bigger group means more demand at every price."],
    ["A fashion goes out of style. Demand for those clothes...", "decreases", ["increases", "does not change"], "Tastes changed.", "Fewer people want the item at every price."],
    ["The price of the good itself falls. Does the demand curve shift?", "No, only the quantity demanded changes", ["Yes, it shifts right", "Yes, it shifts left"], "A good's own price is the one thing that does not move the curve.", "It moves buyers along the curve instead."]
  ], "Example: when the price of butter rises, some buyers switch to margarine, so demand for margarine rises. Now do yours.",
    [["Demand shifters", "🧭", "Income, tastes, population, prices of related goods and expectations <b>shift</b> demand."], ["Related goods", "🔗", "<b>Substitutes</b> (tea/coffee) move together. <b>Complements</b> (printer/ink) move opposite."], ["Normal and inferior", "⬆️", "Income up: demand for <b>normal</b> goods rises, for <b>inferior</b> goods falls."]]));

  l25.push(nL("Consumer and producer surplus", [
    () => { let w, p; do { w = pick([20, 30, 40, 50, 80]); p = pick([10, 15, 18, 25, 35]); } while (w <= p); const nm = nm0(); return q(`${nm} would pay up to ${D(w)} for a jacket and buys it for ${D(p)}. How many dollars of consumer surplus does ${nm} get? (dollars)`, w - p,
      "Surplus is the gain over what you were ready to pay.", "Subtract the price paid from the most you would pay.",
      () => { const a = pick([60, 90]), b = pick([40, 55]); return `Example: willing to pay ${D(a)}, paid ${D(b)}, so surplus is ${D(a)} - ${D(b)} = ${D(a - b)}. Now do yours.`; }); },
    () => { const c = pick([10, 20, 30, 45]), p = c + pick([5, 10, 15, 25]), nm = nm0(); return q(`${nm} can make a bracelet for ${D(c)} and sells it for ${D(p)}. How many dollars of producer surplus is that? (dollars)`, p - c,
      "Producer surplus is the gain over the lowest price the seller would take.", "Subtract the seller's cost from the selling price.",
      () => { const a = pick([8, 12]), b = a + pick([6, 9]); return `Example: cost ${D(a)}, sold for ${D(b)}, so surplus is ${D(b - a)}. Now do yours.`; }); },
    () => { const Q = pick([10, 20, 40, 60]), M = pick([20, 30, 40, 50]), P = pick([6, 10, 14]); return q(`A demand curve slopes down from ${D(M)} (where no units are bought) to the market price of ${D(P)} at ${Q} units. Consumer surplus is the triangle between the curve and the price line. What is its area in dollars? (dollars)`, r2(0.5 * Q * (M - P)),
      "The area of a triangle is half of base times height.", "The base is the quantity bought. The height is the gap between the top price and the market price.",
      () => { const a = pick([8, 16]), b = pick([30, 50]), c = pick([10, 20]); return `Example: base ${a} units, height ${D(b)} - ${D(c)} = ${D(b - c)}. Area = ½ × ${a} × ${b - c} = ${D(0.5 * a * (b - c))}. Now do yours.`; }); }
  ], [["Consumer surplus", "🛍️", "<b>Consumer surplus</b> = the most a buyer would pay minus the price actually paid."], ["Producer surplus", "🏭", "<b>Producer surplus</b> = the price a seller gets minus the lowest price the seller would accept (cost)."], ["On a graph", "📐", "Surplus shows up as <b>triangles</b> above or below the market price. Area = ½ × base × height."]]));

  l25.push(nL("Normal, luxury and inferior goods", [
    () => { const e = pick([2, 3, 4]), pi = pick([5, 10]); return q(`Income rises ${pi}% and the quantity demanded of a good rises ${e * pi}%. What is the income elasticity of demand? (a number)`, e,
      "Income elasticity = percent change in quantity demanded divided by percent change in income.", "Divide the bigger percent by the smaller one.",
      () => { const a = pick([2, 5]), b = pick([4, 6]); return `Example: income up ${a * 2}% and demand up ${a * 2 * b}% gives ${a * 2 * b} / ${a * 2} = ${b}. Now do yours.`; }); },
    () => { const pi = pick([5, 10, 20]), t = pick(["lux", "nec", "inf"]); const ch = t === "lux" ? pick([2, 3]) * pi : t === "nec" ? pi / 2 : -pi;
      const dir = ch > 0 ? "rises" : "falls";
      return mcq(`Income rises ${pi}% and the quantity demanded of a good ${dir} ${Math.abs(ch)}%. This good is best called...`, t === "lux" ? "a luxury good" : t === "nec" ? "a necessity" : "an inferior good", [t === "lux" ? "a necessity" : "a luxury good", t === "inf" ? "a necessity" : "an inferior good"],
        "Compare the direction and size of the demand change with the income change.", "If demand moves the opposite way it is one kind. If it moves the same way, ask whether it grew by more or less than income did.",
        "Example: income up 10% and demand up 30% is more than income grew, so it is a luxury. Demand up 4% is smaller, so a necessity. Demand down is inferior. Now do yours."); }
  ], [["Income elasticity", "💵", "<b>Income elasticity</b> = % change in quantity demanded ÷ % change in income."], ["Reading the number", "🔢", "Above 1: <b>luxury</b> (demand grows faster than income). Between 0 and 1: <b>necessity</b>. Below 0: <b>inferior</b>."], ["Why it matters", "🏪", "Businesses that sell luxuries often do well in booms and poorly in downturns."]]));

  l25.push(nL("Fixed, variable and average cost", [
    () => { const f = pick([200, 300, 500, 800]), v = pick([4, 5, 6, 10]), n = pick([20, 50, 100]); return q(`A bakery pays ${D(f)} a month in fixed costs and ${D(v)} in variable costs for each loaf. It bakes ${n} loaves. What is its total cost in dollars? (dollars)`, f + v * n,
      "Total cost = fixed cost + variable cost.", "Variable cost is the cost per loaf times the number of loaves.",
      () => { const a = pick([100, 400]), b = pick([2, 3]), c = pick([30, 40]); return `Example: fixed ${D(a)} plus ${D(b)} each for ${c} items is ${a} + ${b * c} = ${D(a + b * c)}. Now do yours.`; }); },
    () => { const n = pick([10, 20, 25, 50]), f = n * pick([4, 6, 8, 10]), v = pick([3, 5, 7]); return q(`A shop has fixed costs of ${D(f)} and variable costs of ${D(v)} per unit. At ${n} units, what is the average total cost per unit? (dollars)`, f / n + v,
      "Average total cost = total cost divided by the number of units.", "Find total cost first (fixed plus variable), then divide by units.",
      () => { const a = pick([2, 4]), u = pick([10, 20]), b = pick([50, 70]); const fx = u * a; return `Example: fixed ${D(fx)} and ${D(b / 10)} per unit at ${u} units: total ${fx} + ${b / 10 * u} = ${fx + b / 10 * u}, divided by ${u} is ${D((fx + b / 10 * u) / u)}. Now do yours.`; }); },
    () => { const n = pick([4, 5, 10]), tc1 = pick([100, 120, 150]), mc = pick([6, 8, 9, 12]); return q(`Making ${n} units costs ${D(tc1)} in total. Making ${n + 1} units costs ${D(tc1 + mc)}. What is the marginal cost of the extra unit? (dollars)`, mc,
      "Marginal cost is the extra cost of one more unit.", "Subtract the smaller total cost from the larger one.",
      () => { const a = pick([200, 250]), b = pick([5, 7]); return `Example: total cost goes from ${D(a)} to ${D(a + b)}, so the extra unit cost ${D(b)}. Now do yours.`; }); }
  ], [["Fixed and variable", "🏭", "<b>Fixed costs</b> do not change with output (rent). <b>Variable costs</b> rise with output (ingredients)."], ["Total and average", "➗", "<b>Total cost</b> = fixed + variable. <b>Average total cost</b> = total cost ÷ units."], ["Marginal cost", "➕", "<b>Marginal cost</b> is the added cost of making one more unit. Spreading fixed cost over more units lowers the average."]]));

  l25.push(nL("Comparative advantage", [
    () => { const ca = pick([2, 3, 4]), pa = ca * pick([2, 3]); const nm = nm0(); return q(`In one hour ${nm} can make ${ca} cakes or ${pa} pizzas. How many pizzas does ${nm} give up to make one cake? (a number)`, pa / ca,
      "Opportunity cost = what you give up. Compare the two ways of using the hour.", "Divide the pizzas per hour by the cakes per hour.",
      () => { const a = pick([5, 6]), b = a * pick([2, 4]); return `Example: ${a} hats or ${b} scarves per hour. One hat costs ${b} / ${a} = ${b / a} scarves. Now do yours.`; }); },
    () => { let ca, pa, cb, pb; do { ca = pick([2, 4, 6]); pa = pick([6, 8, 12]); cb = pick([2, 3, 4]); pb = pick([2, 4, 6]); } while (pa / ca === pb / cb);
      const aWins = pa / ca < pb / cb; return mcq(`In an hour, Ava makes ${ca} cakes or ${pa} pizzas. Ben makes ${cb} cakes or ${pb} pizzas. Who has the comparative advantage in making cakes?`, aWins ? "Ava" : "Ben", [aWins ? "Ben" : "Ava", "Neither, it is a tie"],
        "Find each person's opportunity cost of one cake, measured in pizzas.", "The person who gives up fewer pizzas per cake has the comparative advantage in cakes.",
        "Example: Zoe makes 4 pies or 8 muffins an hour (1 pie costs 2 muffins). Leo makes 2 pies or 8 muffins (1 pie costs 4 muffins). Zoe gives up less, so she has the advantage in pies. Now do yours."); }
  ], [["Opportunity cost", "⚖️", "<b>Opportunity cost</b> is what you give up to get something. Here, how many pizzas one cake costs."], ["Comparative advantage", "🤝", "You have a <b>comparative advantage</b> when your opportunity cost of a good is <b>lower</b> than someone else's."], ["Trade helps both", "🌍", "If each side makes what it gives up least for and they trade, both can end up with more."]]));

  l25.push(nL("The accounting equation", [
    () => { const l = pick([2000, 3500, 5000, 8000]), e = pick([1500, 4000, 6000, 9000]); return q(`A business has liabilities of ${D(l)} and owner's equity of ${D(e)}. What are its total assets? (dollars)`, l + e,
      "Assets = Liabilities + Equity.", "Add what is owed to others and what belongs to the owner.",
      () => { const a = pick([1000, 3000]), b = pick([2500, 4500]); return `Example: liabilities ${D(a)} and equity ${D(b)} give assets of ${D(a + b)}. Now do yours.`; }); },
    () => { const a = pick([9000, 12000, 20000, 35000]), l = pick([2000, 4000, 7000, 8000]); return q(`A company has assets of ${D(a)} and liabilities of ${D(l)}. What is its owner's equity? (dollars)`, a - l,
      "Equity is what is left for the owner after the debts are paid.", "Equity = Assets - Liabilities.",
      () => { const x = pick([10000, 15000]), y = pick([3000, 6000]); return `Example: assets ${D(x)} and liabilities ${D(y)} leave equity of ${D(x - y)}. Now do yours.`; }); },
    () => { const e = pick([5000, 9000, 12000, 20000]), a = e + pick([4000, 7000, 10000, 16000]); return q(`A company has assets of ${D(a)} and owner's equity of ${D(e)}. How much does it owe in liabilities? (dollars)`, a - e,
      "Rearrange the equation to find the debts.", "Liabilities = Assets - Equity.",
      () => { const x = pick([8000, 18000]), y = pick([3000, 5000]); return `Example: assets ${D(x)} and equity ${D(y)} means liabilities of ${D(x - y)}. Now do yours.`; }); }
  ], [["The big equation", "🟰", "<b>Assets = Liabilities + Owner's equity.</b> It must always balance."], ["The parts", "🧩", "<b>Assets</b>: what the business owns. <b>Liabilities</b>: what it owes. <b>Equity</b>: the owner's share."], ["Rearranging", "🔄", "Equity = Assets - Liabilities. Liabilities = Assets - Equity. Use whichever fits the missing piece."]]));

  l25.push(mcL("Debits and credits", [
    ["In double-entry bookkeeping, a debit is recorded on the...", "left side", ["right side", "top of the page"], "Each account is drawn like a T with two sides.", "One word is always the left side and the other is always the right side."],
    ["A company buys equipment. The equipment (an asset) account is increased on the...", "left side (debit)", ["right side (credit)", "neither side"], "Assets increase on the same side where an account's normal balance sits.", "Assets have their normal balance on the left."],
    ["A company earns revenue. The revenue account is increased on the...", "right side (credit)", ["left side (debit)", "neither side"], "Revenue and equity have their normal balance on the opposite side from assets.", "Think of the side that is not the asset side."],
    ["A company pays rent. The rent expense account is increased on the...", "left side (debit)", ["right side (credit)", "neither side"], "Expenses behave like assets in the T-account.", "Expenses have their normal balance on the left."],
    ["A company takes a bank loan. The loan (a liability) account is increased on the...", "right side (credit)", ["left side (debit)", "neither side"], "Liabilities and equity sit on the side opposite assets.", "The normal balance of a liability is on the right."],
    ["A company pays cash for supplies. The cash account (an asset) goes down. That is recorded on the...", "right side (credit)", ["left side (debit)", "neither side"], "Decreases are recorded on the opposite side from increases.", "Assets increase on the left, so they decrease on the other side."],
    ["In every transaction, total debits must equal total...", "credits", ["assets", "expenses"], "The books always balance.", "The two sides are the left-side and right-side entries."],
    ["A company buys a $500 printer with cash. Which two accounts change?", "Equipment goes up, cash goes down", ["Revenue goes up, cash goes down", "Equipment goes up, liabilities go up"], "Pay with cash means cash leaves. What came in?", "One asset is swapped for another asset."]
  ], "Example: a shop sells a $50 item for cash. Cash (asset) goes up on the left side. Sales revenue goes up on the right side. Both sides are $50. Now do yours.",
    [["Two sides", "↔️", "Every account has a <b>left side (debit)</b> and a <b>right side (credit)</b>. Every transaction has equal debits and credits."], ["Increases", "⬆️", "<b>Assets and expenses</b> increase with debits. <b>Liabilities, equity and revenue</b> increase with credits."], ["Decreases", "⬇️", "A decrease goes on the opposite side from an increase. Example: paying out cash is a credit to cash."]]));

  l25.push(mcL("Cash or accrual accounting?", [
    ["A company delivers a product in December but is paid in January. Under ACCRUAL accounting, the revenue is recorded in...", "December", ["January", "Neither month"], "Accrual records the revenue when it is earned.", "When was the product delivered?"],
    ["A company delivers a product in December but is paid in January. Under CASH accounting, the revenue is recorded in...", "January", ["December", "Neither month"], "Cash accounting follows the money.", "When did the money actually arrive?"],
    ["A shop uses electricity in March and pays the bill in April. Under accrual accounting, the expense belongs to...", "March", ["April", "Both months equally"], "Match the expense to when the resource was used.", "Which month did the shop use the power?"],
    ["Which method matches revenue to the expenses that helped earn it?", "Accrual accounting", ["Cash accounting", "Neither method"], "One method cares about timing of earning, not timing of payment.", "It is the one that records things when they are earned or incurred."],
    ["Which method is the simplest, recording things only when cash moves?", "Cash accounting", ["Accrual accounting", "Neither method"], "Look for the one that follows the bank balance.", "It records only when money comes in or goes out."],
    ["A customer pays $1,200 in advance for a year of service. Under accrual accounting, the revenue is earned...", "a little each month as service is given", ["all at once on the day of payment", "only at the end of ten years"], "Revenue is earned as the service is delivered.", "A year of service is delivered over twelve months."],
    ["Large public companies in the US must generally report using...", "accrual accounting", ["cash accounting only", "no set method"], "Accounting standards (GAAP) require matching.", "It is the method that gives a truer picture of performance."],
    ["A company buys goods on credit and has not paid yet. Under cash accounting the purchase...", "is not recorded until the cash is paid", ["is recorded right away", "is never recorded"], "Cash accounting waits for the money to move.", "No cash moved yet."]
  ], "Example: a landscaper mows a lawn in May but the customer pays in June. Accrual books the income in May; cash books it in June. Now do yours.",
    [["Two methods", "🧾", "<b>Cash basis</b> records when money moves. <b>Accrual basis</b> records when revenue is earned and expenses are incurred."], ["Why accrual", "🔗", "Accrual <b>matches</b> revenue with the costs that produced it, so profit is measured fairly."], ["Receivables and payables", "📬", "Under accrual, money owed to you is <b>accounts receivable</b>. Money you owe is <b>accounts payable</b>."]]));

  l25.push(nL("Net income and retained earnings", [
    () => { const r = pick([50000, 80000, 120000, 200000]), e = r - pick([10000, 15000, 25000, 40000]); return q(`A company has revenue of ${D(r)} and total expenses of ${D(e)}. What is its net income? (dollars)`, r - e,
      "Net income is what is left after expenses.", "Net income = revenue - expenses.",
      () => { const a = pick([30000, 60000]), b = pick([20000, 45000]); return `Example: revenue ${D(a + b)} and expenses ${D(b)} gives net income ${D(a)}. Now do yours.`; }); },
    () => { const b = pick([20000, 35000, 50000]), n = pick([8000, 12000, 15000]), d = pick([2000, 3000, 5000]); return q(`A company starts the year with retained earnings of ${D(b)}, earns net income of ${D(n)} and pays dividends of ${D(d)}. What are its ending retained earnings? (dollars)`, b + n - d,
      "Retained earnings are the profits the company has kept.", "Ending = beginning + net income - dividends.",
      () => { const x = pick([10000, 25000]), y = pick([6000, 9000]), z = pick([1000, 2000]); return `Example: ${D(x)} + ${D(y)} - ${D(z)} = ${D(x + y - z)}. Now do yours.`; }); },
    () => { const n = pick([6000, 9000, 14000]), d = pick([1000, 2000, 3000]); return q(`A company earns net income of ${D(n)} and pays out ${D(d)} in dividends. How much of the profit does it keep (add to retained earnings)? (dollars)`, n - d,
      "What is not paid to owners stays in the business.", "Subtract the dividends from net income.",
      () => { const x = pick([5000, 8000]), y = pick([500, 1500]); return `Example: profit ${D(x)} with ${D(y)} paid out keeps ${D(x - y)}. Now do yours.`; }); }
  ], [["Net income", "📊", "<b>Net income</b> = revenue - expenses. It is the company's profit for a period."], ["Dividends", "🎁", "A company may pay part of its profit to owners as <b>dividends</b>."], ["Retained earnings", "🏦", "<b>Retained earnings</b> = profits kept in the business. Ending = beginning + net income - dividends."]]));

  l25.push(nL("Straight-line depreciation", [
    () => { const n = pick([4, 5, 8, 10]), a = pick([1000, 1500, 2000, 3000]), s = pick([0, 1000, 2000]); const c = s + n * a; return q(`A machine costs ${D(c)}, lasts ${n} years and will be worth ${D(s)} at the end. What is the straight-line depreciation expense each year? (dollars)`, a,
      "Spread the part of the cost that will be used up evenly over the years.", "(Cost - salvage value) divided by the useful life in years.",
      () => { const m = pick([3, 6]), x = pick([500, 700]), z = pick([0, 600]); return `Example: cost ${D(z + m * x)}, salvage ${D(z)}, ${m} years: (${z + m * x} - ${z}) / ${m} = ${D(x)} per year. Now do yours.`; }); },
    () => { const n = pick([5, 8, 10]), a = pick([1000, 2000, 3000]), s = pick([1000, 2000]); const c = s + n * a, k = ri(2, n - 1); return q(`A truck bought for ${D(c)} loses ${D(a)} of value each year by straight-line depreciation. What is its book value after ${k} years? (dollars)`, c - k * a,
      "Book value is cost minus the depreciation added up so far.", "Multiply the yearly depreciation by the number of years, then subtract from the cost.",
      () => { const x = pick([12000, 18000]), y = pick([2000, 3000]), t = pick([2, 3]); return `Example: cost ${D(x)}, loses ${D(y)} a year for ${t} years: ${x} - ${y * t} = ${D(x - y * t)}. Now do yours.`; }); }
  ], [["Why depreciate", "🚚", "A machine helps for many years. Instead of expensing all of it at once, the cost is spread over its <b>useful life</b>."], ["Straight-line", "📏", "Yearly depreciation = (cost - salvage value) ÷ useful life."], ["Book value", "📘", "<b>Book value</b> = cost - accumulated depreciation. It does not have to equal market price."]]));

  l25.push(mcL("Aggregate demand and supply", [
    ["Consumer confidence rises and people spend more. Aggregate demand...", "shifts right", ["shifts left", "does not change"], "More spending at every price level.", "Think of total demand for goods and services in the economy."],
    ["The government cuts taxes and households keep more income. Aggregate demand tends to...", "shift right", ["shift left", "stay exactly the same"], "More take-home money means more spending.", "Total spending would rise."],
    ["Oil prices jump, raising costs for many firms. Short-run aggregate supply...", "shifts left", ["shifts right", "does not change"], "Higher costs make firms offer less at each price level.", "Less output is supplied at each price level."],
    ["New technology raises productivity across the whole economy. Long-run aggregate supply...", "shifts right", ["shifts left", "does not change"], "The economy can produce more.", "Compare this with the outward move of a PPC."],
    ["Aggregate demand shifts left (a recession). Output and the price level tend to...", "both fall", ["both rise", "output falls but prices rise"], "Less total demand means less being bought.", "Weak demand also pushes prices down or slows their rise."],
    ["Wages across the economy rise sharply, raising firms' costs. Short-run aggregate supply...", "shifts left", ["shifts right", "does not change"], "Think of what happens to what firms are willing to supply.", "Higher costs reduce supply at each price level."],
    ["Foreign incomes grow and foreigners buy more of a country's exports. Aggregate demand...", "shifts right", ["shifts left", "does not change"], "Exports are part of total spending on the country's goods.", "More spending on its products."],
    ["The government cuts spending sharply. Aggregate demand...", "shifts left", ["shifts right", "does not change"], "Government spending is a part of total demand.", "Less spending in the economy."]
  ], "Example: if people buy more cars and homes at every price level, AD moves right, and output and prices tend to rise. If costs jump, AS moves left and prices rise while output falls. Now do yours.",
    [["AD and AS", "📉", "<b>Aggregate demand (AD)</b> is total spending on an economy's output. <b>Aggregate supply (AS)</b> is total output firms will provide at each price level."], ["Shifts in AD", "➡️", "Consumer spending, investment, government spending and net exports shift AD. More spending moves it <b>right</b>."], ["Shifts in AS", "⬅️", "Input costs, wages, technology and resources shift AS. Higher costs move it <b>left</b>; better technology moves it <b>right</b>."]]));

  l25.push(nL("The spending multiplier", [
    () => { const m = pick([0.5, 0.6, 0.75, 0.8, 0.9]); const mult = r2(1 / (1 - m)); return q(`The marginal propensity to consume (MPC) is ${Math.round(m * 100)}%. What is the spending multiplier, 1 ÷ (1 - MPC)? (a number)`, mult,
      "The multiplier tells how many times a first round of spending gets repeated.", "Find 1 minus the MPC (as a decimal), then divide 1 by that.",
      () => { const a = pick([0.5, 0.75]); return `Example: MPC ${a * 100}% gives 1 ÷ (1 - ${a}) = 1 ÷ ${r2(1 - a)} = ${r2(1 / (1 - a))}. Now do yours.`; }); },
    () => { const m = pick([0.5, 0.75, 0.8, 0.9]), mult = r2(1 / (1 - m)), g = pick([5, 10, 20, 40]); return q(`The MPC is ${Math.round(m * 100)}% and the government spends an extra ${D(g)} billion. By how many billion dollars does total output rise, in all, by this simple model? (billions)`, r2(g * mult),
      "Total change = first round of spending times the multiplier.", "The multiplier is 1 ÷ (1 - MPC).",
      () => { const a = pick([0.5, 0.75]), b = pick([8, 12]); return `Example: MPC ${a * 100}% gives multiplier ${r2(1 / (1 - a))}; ${b} × ${r2(1 / (1 - a))} = ${r2(b / (1 - a))} billion. Now do yours.`; }); },
    () => { const m = pick([50, 60, 75, 80, 90]), g = pick([10, 20, 40]); return q(`A person receives ${D(g)} of extra income and spends ${m}% of it. How many dollars are spent in this first round? (dollars)`, r2(g * m / 100),
      "The MPC is the share of extra income that gets spent.", "Take the MPC percent of the extra income.",
      () => { const a = pick([20, 50]), b = pick([30, 60]); return `Example: ${D(a)} extra and a ${b}% MPC gives ${D(a * b / 100)} spent. Now do yours.`; }); }
  ], [["Spending ripples", "🌊", "One person's spending is another's income. They spend part of it, and so on."], ["MPC", "🛒", "The <b>marginal propensity to consume (MPC)</b> is the share of extra income that is spent."], ["The multiplier", "✖️", "<b>Multiplier = 1 ÷ (1 - MPC).</b> Total change in output = first-round spending × multiplier."]]));

  l25.push(nL("Banks and the money multiplier", [
    () => { const r = pick([5, 10, 20, 25]), d = pick([1000, 2000, 5000, 10000]); return q(`The reserve requirement is ${r}%. A bank gets a new deposit of ${D(d)}. How many dollars must it keep in reserve? (dollars)`, d * r / 100,
      "A reserve requirement is a share of deposits that a bank cannot lend out.", "Take the reserve percent of the deposit.",
      () => { const a = pick([2000, 4000]), b = pick([10, 20]); return `Example: ${b}% of ${D(a)} = ${D(a * b / 100)}. Now do yours.`; }); },
    () => { const r = pick([5, 10, 20, 25]), d = pick([1000, 2000, 5000]); return q(`The reserve requirement is ${r}%. A bank can lend out what is not held in reserve. From a deposit of ${D(d)}, how many dollars can it lend? (dollars)`, d - d * r / 100,
      "First find the reserve, then see what is left.", "Lendable money = deposit - required reserve.",
      () => { const a = pick([3000, 6000]), b = pick([10, 20]); return `Example: reserve ${b}% of ${D(a)} = ${D(a * b / 100)}, so ${D(a - a * b / 100)} can be lent. Now do yours.`; }); },
    () => { const r = pick([5, 10, 20, 25]), d = pick([1000, 2000, 5000]); return q(`With a reserve requirement of ${r}%, the money multiplier is 1 ÷ the reserve ratio. At most, how many dollars can an initial deposit of ${D(d)} grow into across the banking system? (dollars)`, d * 100 / r,
      "Each loan is deposited again and part of it is lent again.", "Multiplier = 1 ÷ (reserve percent as a decimal). Multiply the deposit by it.",
      () => { const a = pick([1000, 3000]), b = pick([10, 20]); return `Example: ${b}% reserve gives a multiplier of ${100 / b}; ${D(a)} × ${100 / b} = ${D(a * 100 / b)}. Now do yours.`; }); }
  ], [["Fractional reserves", "🏦", "Banks keep only a <b>fraction</b> of deposits in reserve and lend the rest."], ["Loans become deposits", "🔁", "A loan gets spent, then deposited in another bank, which lends part of it again."], ["Money multiplier", "✖️", "The most the money supply can grow = initial deposit ÷ reserve ratio. Real banks lend less than this limit."]]));

  l25.push(nL("The labor force", [
    () => { const p = pick([200, 250, 300, 400]), pr = pick([60, 62, 64, 65, 70]); const lf = p * pr / 100; return q(`A country has ${p} million adults of working age, and ${lf} million are in the labor force (working or looking for work). What is the labor force participation rate, as a percent? (percent)`, pr,
      "Participation rate = labor force divided by adult population.", "Divide the labor force by the adult population, then multiply by 100.",
      () => { const a = pick([100, 150]), b = pick([60, 80]); return `Example: ${a * b / 100} million of ${a} million is ${b}%. Now do yours.`; }); },
    () => { const e = pick([90, 114, 135, 190]), u = pick([6, 8, 9, 10]); return q(`A country has ${e} million employed people and ${u} million unemployed people looking for work. How many million people are in the labor force? (millions)`, e + u,
      "The labor force counts people with jobs and people actively looking.", "Add employed and unemployed.",
      () => { const a = pick([50, 70]), b = pick([4, 5]); return `Example: ${a} employed and ${b} unemployed makes a labor force of ${a + b}. Now do yours.`; }); },
    () => { const lf = pick([100, 125, 150, 200]), ur = pick([4, 5, 8, 10]); const u = lf * ur / 100; return q(`A labor force has ${lf} million people, and ${u} million of them are unemployed. What is the unemployment rate, as a percent? (percent)`, ur,
      "Unemployment rate = unemployed divided by the labor force.", "Divide unemployed by the whole labor force (not the whole population).",
      () => { const a = pick([80, 200]), b = pick([5, 10]); return `Example: ${a * b / 100} unemployed out of ${a} is ${b}%. Now do yours.`; }); }
  ], [["Who counts", "👥", "The <b>labor force</b> = employed + unemployed (looking for work). Students, retirees and people not looking are outside it."], ["Participation rate", "📊", "<b>Participation rate</b> = labor force ÷ adult population × 100."], ["Unemployment rate", "🔍", "<b>Unemployment rate</b> = unemployed ÷ labor force × 100."]]));

  l25.push(mcL("Demand-pull or cost-push?", [
    ["Total spending grows faster than the economy can produce, so prices rise. This is...", "demand-pull inflation", ["cost-push inflation", "deflation"], "Is the pressure coming from buyers or from sellers' costs?", "Too much spending chasing too few goods."],
    ["A sharp rise in oil prices raises costs for most firms, so they raise prices. This is...", "cost-push inflation", ["demand-pull inflation", "deflation"], "Is the pressure coming from buyers or from sellers' costs?", "Production costs went up."],
    ["The government and households both spend a lot, and shops sell out of goods and raise prices. This is...", "demand-pull inflation", ["cost-push inflation", "disinflation"], "Look for the source of the extra pressure.", "More spending than output."],
    ["A shortage of a key raw material makes it very expensive for factories, who pass on the cost. This is...", "cost-push inflation", ["demand-pull inflation", "a fall in the price level"], "The cause is on the production side.", "Higher input costs."],
    ["Wages rise faster than productivity across the economy and firms raise prices. This is most like...", "cost-push inflation", ["demand-pull inflation", "falling prices"], "Wages are a cost of making goods.", "Costs rise without more output."],
    ["A boom has everyone buying homes and cars with easy credit, and prices rise. This is most like...", "demand-pull inflation", ["cost-push inflation", "falling prices"], "Is it buyers or costs driving it?", "Strong demand pulls prices up."],
    ["Prices across the economy keep falling over time. This is called...", "deflation", ["inflation", "disinflation, a slower rise in prices"], "The overall price level is moving which way?", "It is the opposite of rising prices."],
    ["Inflation was 6% last year and 3% this year, so prices still rise but more slowly. This is called...", "disinflation", ["deflation", "hyperinflation"], "Prices are still rising.", "The rate of rising has slowed."]
  ], "Example: a drought makes wheat scarce and costly, so bread prices rise: cost-push. A holiday rush with everyone buying more than stores can stock raises prices: demand-pull. Now do yours.",
    [["Inflation", "🎈", "<b>Inflation</b> is a general rise in the price level. <b>Deflation</b> is a general fall."], ["Demand-pull", "🛍️", "<b>Demand-pull</b>: too much total spending chases too few goods."], ["Cost-push", "⛽", "<b>Cost-push</b>: higher production costs (oil, wages, materials) push prices up and often slow output."]]));

  l25.push(nL("Expected value of a project", [
    () => { const p = pick([20, 40, 50, 60, 75, 80]), g = pick([50000, 100000, 200000]); return q(`A business estimates a ${p}% chance that a new product earns ${D(g)} and a ${100 - p}% chance it earns ${D(0)}. What is the expected value (average outcome) in dollars? (dollars)`, g * p / 100,
      "Expected value weights each outcome by how likely it is.", "Multiply the payoff by its probability. Zero outcomes add nothing.",
      () => { const a = pick([10000, 30000]), b = pick([25, 50]); return `Example: ${b}% chance of ${D(a)} and otherwise nothing: ${D(a)} × ${b / 100} = ${D(a * b / 100)}. Now do yours.`; }); },
    () => { const p = pick([50, 60, 80]), g = pick([100, 200, 300]), h = pick([20, 40, 50]); return q(`An investment has a ${p}% chance of returning ${D(g)} and a ${100 - p}% chance of returning ${D(h)}. What is its expected return in dollars? (dollars)`, r2(g * p / 100 + h * (100 - p) / 100),
      "Multiply each outcome by its probability, then add the results.", "Use p times the first payoff plus (1 - p) times the second payoff.",
      () => { const a = pick([100, 400]), b = pick([10, 50]), c = pick([30, 70]); return `Example: ${c}% of ${D(a)} + ${100 - c}% of ${D(b)} = ${D(a * c / 100)} + ${D(b * (100 - c) / 100)} = ${D(a * c / 100 + b * (100 - c) / 100)}. Now do yours.`; }); },
    () => { const p = pick([50, 60, 75]), g = pick([20000, 40000]), c = pick([2000, 4000, 8000]); const ev = g * p / 100; return q(`A project costs ${D(c)} to try. It has a ${p}% chance of paying ${D(g)} and otherwise pays ${D(0)}. What is its expected profit after the cost, in dollars? (dollars)`, ev - c,
      "Find the expected payoff first, then think about the cost.", "Expected profit = (probability × payoff) - cost.",
      () => { const a = pick([10000, 30000]), b = pick([50, 60]), cst = pick([2000, 4000]); return `Example: ${b}% of ${D(a)} is ${D(a * b / 100)}, minus ${D(cst)} cost = ${D(a * b / 100 - cst)}. Now do yours.`; }); }
  ], [["Averaging the future", "🎲", "When results are uncertain, <b>expected value</b> is the probability-weighted average of the outcomes. Businesses use it to compare projects."], ["Calculating", "🧮", "Expected value = (probability 1 × payoff 1) + (probability 2 × payoff 2) + ..."], ["Limits", "⚠️", "It is an average, not a promise. It also ignores how bad a loss would feel, so risk matters too."]]));

  l25.push(mixOf("Mixed practice", [l25[0], l25[1], l25[2], l25[3], l25[4], l25[5], l25[6], l25[7]]));
  l25.push(mixOf("Level 25 Challenge", [l25[8], l25[9], l25[10], l25[11], l25[12], l25[13], l25[14], l25[15], l25[16], l25[17]]));

  // ======================= LEVEL 26 (12th grade, second half) =======================
  const l26 = [];

  l26.push(nL("Budget variance", [
    () => { const P = pick([200, 400, 500, 800, 1000]), ex_ = P * pick([5, 10, 15, 20, 25]) / 100; return q(`A club budgeted ${D(P)} for supplies but actually spent ${D(P + ex_)}. By how many dollars is it over budget? (dollars)`, ex_,
      "Variance is the gap between actual and planned.", "Subtract the planned amount from the actual amount.",
      () => { const a = pick([300, 600]), b = pick([30, 90]); return `Example: planned ${D(a)}, actual ${D(a + b)}: variance ${D(b)} over. Now do yours.`; }); },
    () => { const P = pick([200, 400, 500, 800, 1000]), pc = pick([5, 10, 15, 20, 25]); return q(`A team planned to spend ${D(P)} and actually spent ${D(P + P * pc / 100)}. By what percent of the budget did it overspend? (percent)`, pc,
      "Percent variance compares the gap with the planned amount.", "Divide the overspend by the planned amount, then multiply by 100.",
      () => { const a = pick([200, 500]), b = pick([10, 20]); return `Example: planned ${D(a)}, over by ${D(a * b / 100)}: ${a * b / 100} / ${a} = ${b}%. Now do yours.`; }); },
    () => { const rev = Math.random() < 0.5, more = Math.random() < 0.5, P = pick([1000, 2000, 5000]), A = P + (more ? 1 : -1) * pick([100, 300, 500]);
      const fav = rev ? more : !more;
      return mcq(`A company planned ${rev ? "sales" : "costs"} of ${D(P)} and the actual ${rev ? "sales were" : "costs were"} ${D(A)}. Is this variance favorable or unfavorable?`, fav ? "Favorable" : "Unfavorable", [fav ? "Unfavorable" : "Favorable", "Neither, it is exactly on budget"],
        "Ask whether this change helps or hurts profit.", "Higher sales help profit. Higher costs hurt it.",
        "Example: planned costs of $800 and actual $700 means costs came in lower, which helps profit, so favorable. Now do yours."); }
  ], [["Plan vs actual", "📋", "A <b>budget</b> is a plan. A <b>variance</b> = actual - planned."], ["Percent variance", "📏", "Percent variance = variance ÷ planned × 100."], ["Favorable or not", "👍", "<b>Favorable</b>: helps profit (more sales or lower costs). <b>Unfavorable</b>: hurts profit."]]));

  l26.push(nL("Net worth", [
    () => { const l = pick([2000, 5000, 12000]), a = l + pick([3000, 8000, 15000, 30000]); return q(`A person owns assets worth ${D(a)} and owes ${D(l)} in debts. What is their net worth? (dollars)`, a - l,
      "Net worth is what you own minus what you owe.", "Net worth = assets - liabilities.",
      () => { const x = pick([20000, 45000]), y = pick([6000, 9000]); return `Example: assets ${D(x)} - debts ${D(y)} = ${D(x - y)}. Now do yours.`; }); },
    () => { const l = pick([4000, 9000, 15000]), w = pick([5000, 10000, 20000]); return q(`A person has a net worth of ${D(w)} and debts of ${D(l)}. What are their total assets? (dollars)`, w + l,
      "Rearrange net worth = assets - liabilities.", "Assets = net worth + liabilities.",
      () => { const x = pick([8000, 12000]), y = pick([3000, 7000]); return `Example: net worth ${D(x)} and debts ${D(y)} means assets of ${D(x + y)}. Now do yours.`; }); },
    () => { const ga = pick([2000, 5000, 8000]), gl = ga - pick([500, 1000, 1500]); return q(`In a year, a person's assets rise by ${D(ga)} and their debts rise by ${D(gl)}. By how many dollars does their net worth rise? (dollars)`, ga - gl,
      "Net worth changes by the change in assets minus the change in debts.", "Subtract the increase in debts from the increase in assets.",
      () => { const x = pick([6000, 9000]), y = pick([1000, 2000]); return `Example: assets up ${D(x)}, debts up ${D(y)}: net worth up ${D(x - y)}. Now do yours.`; }); }
  ], [["Personal balance sheet", "🧾", "The <b>accounting equation</b> works for people too: assets are what you own, liabilities are what you owe."], ["Net worth", "💰", "<b>Net worth = assets - liabilities.</b> It can be positive or negative."], ["Growing it", "🌱", "Net worth grows when assets rise faster than debts. This is general education, not advice for any one person."]]));

  l26.push(mcL("Managing risk", [
    ["Choosing not to travel through a dangerous storm is an example of...", "avoiding the risk", ["transferring the risk", "accepting the risk"], "The person removes the chance of the loss entirely.", "They simply do not do the risky thing."],
    ["Wearing a seat belt is an example of...", "reducing the risk", ["avoiding the risk", "transferring the risk"], "The risk is still there but its size shrinks.", "You still drive, but the harm is smaller."],
    ["Buying an insurance policy is an example of...", "transferring the risk", ["avoiding the risk", "accepting the risk"], "Someone else takes on the cost in return for a payment.", "A company agrees to pay in exchange for premiums."],
    ["Setting aside cash to pay for a small repair yourself is an example of...", "accepting (retaining) the risk", ["transferring the risk", "avoiding the risk"], "You keep the cost.", "You are choosing to pay it yourself if it happens."],
    ["Installing smoke alarms and sprinklers in a building is an example of...", "reducing the risk", ["avoiding the risk", "transferring the risk"], "These make fire damage smaller or less likely.", "The building still exists, but the danger is lowered."],
    ["A company decides not to enter a market it finds far too risky. This is...", "avoiding the risk", ["accepting the risk", "reducing the risk"], "It skips the activity altogether.", "No activity, no exposure."],
    ["Insurance works because many people pay in and few claim. This is called...", "pooling risk", ["avoiding risk", "ignoring risk"], "The losses of a few are paid for by the payments of many.", "Spreading the cost across a large group."],
    ["For which loss does insurance make the MOST sense?", "a rare but very expensive loss", ["a small, common loss", "a loss that cannot happen"], "Could you pay it yourself out of savings?", "Choose the loss that would be too big to cover alone."]
  ], "Example: a shop buys fire insurance (transfer), installs alarms (reduce), saves a small repair fund (accept) and avoids storing fireworks (avoid). Now do yours.",
    [["Four ways", "🛡️", "People and companies <b>avoid</b>, <b>reduce</b>, <b>transfer</b> or <b>accept</b> risk."], ["Insurance", "☂️", "Insurance <b>transfers</b> a risk to a company that <b>pools</b> many customers' risks."], ["Match the tool", "🧰", "Insure big, rare losses. Pay small, common ones yourself. This is general information, not advice."]]));

  l26.push(nL("Operating and net margin", [
    () => { const R = pick([200000, 400000, 500000, 1000000]), pc = pick([8, 10, 12, 15, 20]), cg = pick([40, 50, 55]); const oi = R * pc / 100, cogs = R * cg / 100, opx = R - oi - cogs; return q(`A company has revenue of ${D(R)}, cost of goods sold of ${D(cogs)} and operating expenses of ${D(opx)}. What is its operating margin, as a percent? (percent)`, pc,
      "Operating income is what is left after COGS and operating expenses.", "Operating margin = operating income ÷ revenue × 100.",
      () => { const a = pick([100000, 300000]), b = pick([10, 20]); return `Example: revenue ${D(a)} and operating income ${D(a * b / 100)} gives ${a * b / 100} / ${a} = ${b}%. Now do yours.`; }); },
    () => { const R = pick([200000, 400000, 500000, 800000]), n = pick([4, 5, 8, 10, 12]); return q(`A company earns net income of ${D(R * n / 100)} on revenue of ${D(R)}. What is its net margin, as a percent? (percent)`, n,
      "Net margin shows how much of each revenue dollar becomes profit.", "Divide net income by revenue and multiply by 100.",
      () => { const a = pick([500000, 600000]), b = pick([5, 10]); return `Example: net income ${D(a * b / 100)} on revenue ${D(a)} is ${b}%. Now do yours.`; }); },
    () => { const R = pick([300000, 500000, 800000, 1000000]), m = pick([6, 10, 12, 15, 20]); return q(`A company has revenue of ${D(R)} and an operating margin of ${m}%. What is its operating income in dollars? (dollars)`, R * m / 100,
      "A margin is a percent of revenue.", "Take the margin percent of the revenue.",
      () => { const a = pick([200000, 600000]), b = pick([5, 25]); return `Example: ${b}% of ${D(a)} = ${D(a * b / 100)}. Now do yours.`; }); }
  ], [["Margins", "📊", "A <b>margin</b> is a profit measure divided by revenue. It shows profit per dollar of sales."], ["Operating margin", "⚙️", "<b>Operating margin</b> = operating income ÷ revenue. Operating income = revenue - COGS - operating expenses."], ["Net margin", "🧾", "<b>Net margin</b> = net income ÷ revenue. Net income also takes off interest and taxes."]]));

  l26.push(nL("Earnings per share (EPS)", [
    () => { const sh = pick([10, 20, 40, 50]), e = pick([0.5, 1, 1.5, 2, 2.5, 3]); return q(`A company earned ${D(e * sh)} million and has ${sh} million shares. What is its earnings per share? (dollars)`, e,
      "EPS shows the profit that belongs to each share.", "EPS = net income ÷ number of shares.",
      () => { const s = pick([20, 30]), x = pick([2, 4]); return `Example: ${D(s * x)} million over ${s} million shares is ${D(x)} per share. Now do yours.`; }); },
    () => { const sh = pick([10, 20, 40, 50]), e = pick([1, 2, 3, 4]); return q(`A company has ${sh} million shares and an EPS of ${D(e)}. How many million dollars of net income did it earn? (millions)`, e * sh,
      "EPS is profit per share.", "Net income = EPS × number of shares.",
      () => { const s = pick([5, 25]), x = pick([2, 6]); return `Example: ${D(x)} EPS on ${s} million shares is ${D(x * s)} million. Now do yours.`; }); },
    () => { const e = pick([2, 4, 5]), pe = pick([10, 15, 20, 25]); return q(`A stock earns ${D(e)} per share and trades at a price-to-earnings (P/E) ratio of ${pe}. What is its share price in dollars? (dollars)`, e * pe,
      "P/E tells how many dollars buyers pay for each dollar of yearly earnings.", "Price = EPS × P/E.",
      () => { const x = pick([3, 6]), y = pick([8, 12]); return `Example: EPS ${D(x)} and P/E ${y} gives price ${D(x * y)}. Now do yours.`; }); }
  ], [["Per share", "🥧", "A company's profit is split among its shares. <b>EPS = net income ÷ shares outstanding.</b>"], ["P/E ratio", "🏷️", "<b>P/E = price ÷ EPS.</b> It shows how much investors pay for $1 of earnings."], ["Careful", "⚠️", "EPS and P/E describe a company, but they cannot predict its future. This is education, not advice."]]));

  l26.push(nL("Dividend yield and payout", [
    () => { const P = pick([20, 40, 50, 80, 100]), y = pick([1, 2, 2.5, 3, 4, 5]); return q(`A stock costs ${D(P)} a share and pays ${D(r2(P * y / 100))} per share in dividends each year. What is its dividend yield, as a percent? (percent)`, y,
      "Yield compares the yearly dividend with the price.", "Divide the yearly dividend by the share price and multiply by 100.",
      () => { const a = pick([50, 100]), b = pick([2, 4]); return `Example: ${D(a * b / 100)} on a ${D(a)} share is ${b}%. Now do yours.`; }); },
    () => { const e = pick([2, 4, 5, 8]), pc = pick([25, 40, 50, 60]); return q(`A company earns ${D(e)} per share and pays ${D(r2(e * pc / 100))} per share in dividends. What is its payout ratio, as a percent? (percent)`, pc,
      "The payout ratio is the share of earnings paid to owners.", "Divide the dividend per share by EPS, then multiply by 100.",
      () => { const a = pick([10, 20]), b = pick([30, 50]); return `Example: dividend ${D(a * b / 100)} out of EPS ${D(a)} is ${b}%. Now do yours.`; }); },
    () => { const P = pick([40, 50, 80, 100]), y = pick([2, 3, 4, 5]), n = pick([10, 20, 50]); return q(`A stock has a share price of ${D(P)} and a dividend yield of ${y}%. How many dollars of dividends does one share pay per year, for ${n} shares in total? (dollars)`, r2(P * y / 100 * n),
      "Yearly dividend per share = price × yield.", "Then multiply by the number of shares.",
      () => { const a = pick([30, 60]), b = pick([2, 5]), c = pick([4, 8]); return `Example: ${D(a)} × ${b}% = ${D(a * b / 100)} per share; ${c} shares pay ${D(a * b / 100 * c)}. Now do yours.`; }); }
  ], [["Dividends", "💵", "Some companies pay out part of their profit to shareholders as <b>dividends</b>."], ["Dividend yield", "📈", "<b>Yield</b> = yearly dividend per share ÷ share price × 100."], ["Payout ratio", "🥧", "<b>Payout ratio</b> = dividends ÷ earnings. A low ratio means the company keeps more to grow."]]));

  l26.push(nL("Market capitalization", [
    () => { const p = pick([12, 25, 40, 80]), sh = pick([10, 20, 50, 100]); return q(`A company's stock trades at ${D(p)} and it has ${sh} million shares. What is its market capitalization, in millions of dollars? (millions)`, p * sh,
      "Market cap is the market's total value of all the shares.", "Market cap = share price × number of shares.",
      () => { const a = pick([15, 30]), b = pick([20, 40]); return `Example: ${D(a)} × ${b} million = ${D(a * b)} million. Now do yours.`; }); },
    () => { const p = pick([10, 20, 25, 50]), sh = pick([40, 60, 80, 200]); return q(`A company has a market cap of ${D(p * sh)} million and ${sh} million shares. What is its share price? (dollars)`, p,
      "Market cap came from price times shares.", "Divide the market cap by the number of shares.",
      () => { const a = pick([8, 12]), b = pick([50, 100]); return `Example: ${D(a * b)} million over ${b} million shares is ${D(a)} per share. Now do yours.`; }); },
    () => { const sh = pick([20, 40, 50]), p = pick([10, 30]), up = pick([2, 5, 10]); return q(`A company has ${sh} million shares. Its price rises by ${D(up)} per share. By how many millions of dollars does its market cap rise? (millions)`, sh * up,
      "Each share gains the same amount.", "Multiply the gain per share by the number of shares.",
      () => { const a = pick([10, 30]), b = pick([3, 4]); return `Example: ${a} million shares each up ${D(b)} adds ${D(a * b)} million. Now do yours.`; }); }
  ], [["Company size", "🏢", "<b>Market capitalization</b> measures a company's value in the stock market."], ["Formula", "✖️", "<b>Market cap = share price × shares outstanding.</b>"], ["Not the whole story", "🔎", "Market cap is not profit and not sales. A big cap does not mean a company is making money."]]));

  l26.push(nL("Debt-to-equity", [
    () => { const E = pick([200, 400, 500, 1000]), r = pick([0.25, 0.5, 0.75, 1, 1.5, 2]); return q(`A company has debt of ${D(E * r)} thousand and equity of ${D(E)} thousand. What is its debt-to-equity ratio? (a number)`, r,
      "The ratio compares what is borrowed with what the owners put in.", "Divide debt by equity.",
      () => { const a = pick([100, 300]), b = pick([2, 3]); return `Example: debt ${a * b} and equity ${a} gives ${a * b} / ${a} = ${b}. Now do yours.`; }); },
    () => { const A = pick([500, 1000, 2000]), pc = pick([20, 30, 40, 60]); return q(`A company has total assets of ${D(A)} thousand and total debt of ${D(A * pc / 100)} thousand. What percent of its assets are financed by debt? (percent)`, pc,
      "This is the debt ratio.", "Divide total debt by total assets and multiply by 100.",
      () => { const a = pick([400, 800]), b = pick([25, 50]); return `Example: debt ${a * b / 100} on assets ${a} is ${b}%. Now do yours.`; }); },
    () => { const E = pick([200, 400, 800]), r = pick([0.5, 1, 1.5, 2]); return q(`A company has ${D(E * r)} thousand of debt and a debt-to-equity ratio of ${r}. What is its equity in thousands of dollars? (thousands)`, E,
      "D/E = debt ÷ equity, so equity = debt ÷ D/E.", "Divide the debt by the ratio.",
      () => { const a = pick([300, 600]), b = pick([2, 3]); return `Example: debt ${a * b} and ratio ${b} gives equity ${a}. Now do yours.`; }); }
  ], [["Leverage", "🏗️", "<b>Leverage</b> means using borrowed money. A company's mix of debt and equity is its <b>capital structure</b>."], ["Debt-to-equity", "⚖️", "<b>D/E = total debt ÷ shareholders' equity.</b> Above 1 means more debt than equity."], ["Risk", "🎢", "More debt can boost returns, but fixed interest must be paid even in bad years."]]));

  l26.push(nL("Return on equity", [
    () => { const E = pick([200, 400, 500, 800, 1000]), p = pick([5, 8, 10, 12, 15, 20, 25]); return q(`A company earns ${D(E * p / 100)} thousand and has equity of ${D(E)} thousand. What is its return on equity (ROE), as a percent? (percent)`, p,
      "ROE shows profit earned for each dollar the owners invested.", "ROE = net income ÷ equity × 100.",
      () => { const a = pick([300, 600]), b = pick([10, 20]); return `Example: ${a * b / 100} earned on equity ${a} is ${b}%. Now do yours.`; }); },
    () => { const E = pick([200, 400, 500, 1000]), p = pick([10, 12, 15, 20]); return q(`A company has equity of ${D(E)} thousand and an ROE of ${p}%. How many thousand dollars of net income did it earn? (thousands)`, E * p / 100,
      "ROE is a percent of equity.", "Take the ROE percent of equity.",
      () => { const a = pick([400, 800]), b = pick([5, 25]); return `Example: ${b}% of ${a} = ${a * b / 100}. Now do yours.`; }); },
    () => { const E = pick([500, 1000, 2000]), p = pick([8, 10, 12]), n = pick([2, 3]); return q(`A company has equity of ${D(E)} thousand and an ROE of ${p}%. How many thousand dollars of profit does it make in total over ${n} years if equity and ROE stay the same? (thousands)`, E * p / 100 * n,
      "Find one year of profit, then repeat.", "Yearly profit = equity × ROE. Multiply by the years.",
      () => { const a = pick([300, 600]), b = pick([10, 20]), c = pick([2, 4]); return `Example: ${b}% of ${a} = ${a * b / 100} a year; ${c} years is ${a * b / 100 * c}. Now do yours.`; }); }
  ], [["Return on equity", "🏆", "<b>ROE = net income ÷ shareholders' equity × 100.</b> It measures how well a company uses owners' money."], ["Compare", "📊", "A higher ROE means more profit per owner dollar, but debt can inflate it."], ["Inside ROE", "🔍", "Margins, asset use and leverage together build ROE. You will see this in the DuPont idea later."]]));

  l26.push(nL("The interest tax shield", [
    () => { const i = pick([10000, 20000, 50000, 100000]), t = pick([20, 25, 30, 40]); return q(`A company pays ${D(i)} in interest, which is tax-deductible. Its tax rate is ${t}%. How many dollars of tax does the interest save? (dollars)`, i * t / 100,
      "Deducting interest lowers taxable income.", "Tax saved = interest × tax rate.",
      () => { const a = pick([30000, 60000]), b = pick([20, 30]); return `Example: ${D(a)} interest at ${b}% saves ${D(a * b / 100)}. Now do yours.`; }); },
    () => { const r = pick([4, 5, 6, 8, 10]), t = pick([20, 25, 30, 40]); return q(`A company borrows at ${r}% interest and its tax rate is ${t}%. What is its after-tax cost of debt, as a percent? (percent)`, r2(r * (100 - t) / 100),
      "Interest saves tax, so the true cost is lower than the rate.", "After-tax cost = rate × (1 - tax rate).",
      () => { const a = pick([10, 6]), b = pick([20, 50]); return `Example: ${a}% × (1 - ${b / 100}) = ${r2(a * (100 - b) / 100)}%. Now do yours.`; }); },
    () => { const i = pick([10000, 20000, 40000]), t = pick([20, 25, 40]); return q(`A company pays ${D(i)} in interest and its tax rate is ${t}%. What is its interest cost after the tax saving, in dollars? (dollars)`, i * (100 - t) / 100,
      "Part of the interest cost comes back as lower taxes.", "Interest minus the tax saved (interest × tax rate).",
      () => { const a = pick([50000, 80000]), b = pick([20, 30]); return `Example: ${D(a)} less ${b}% saved leaves ${D(a * (100 - b) / 100)}. Now do yours.`; }); }
  ], [["Interest is deductible", "🧾", "A company can subtract interest from its income before computing tax. Dividends are not deductible."], ["Tax shield", "🛡️", "<b>Tax shield = interest × tax rate.</b> It is tax the company does not pay."], ["After-tax cost of debt", "📉", "<b>After-tax cost of debt = rate × (1 - tax rate)</b>, which is lower than the stated rate."]]));

  l26.push(nL("Net present value (NPV)", [
    () => { const r = pick([5, 10, 20]), pv = pick([1000, 2000, 5000]), g = pick([100, 200, 300]); const cf = pv * (100 + r) / 100, I = pv - g; return q(`A project costs ${D(I)} today and pays ${D(cf)} in one year. The discount rate is ${r}%. What is its net present value (NPV)? (dollars)`, g,
      "First bring the future payment back to today's value.", "NPV = payment ÷ (1 + rate) - cost today.",
      () => { const a = pick([1000, 3000]), b = pick([10, 20]), gg = pick([50, 150]); return `Example: pays ${D(a * (100 + b) / 100)} in a year at ${b}%: its value today is ${D(a)}. Cost ${D(a - gg)}, so NPV = ${D(gg)}. Now do yours.`; }); },
    () => { const r = pick([5, 10, 20, 25]), pv = pick([400, 800, 2000, 4000]); return q(`A payment of ${D(pv * (100 + r) / 100)} arrives in one year and the discount rate is ${r}%. What is its present value in dollars? (dollars)`, pv,
      "Present value is the amount today that grows into the future payment.", "Divide the future payment by (1 + rate as a decimal).",
      () => { const a = pick([500, 1500]), b = pick([10, 20]); return `Example: ${D(a * (100 + b) / 100)} in a year at ${b}% is worth ${D(a)} today. Now do yours.`; }); },
    () => { const p1 = pick([500, 1000]), p2 = pick([1000, 2000]), g = pick([100, 200, 300]); return q(`A project costs ${D(p1 + p2 - g)} today. It pays ${D(p1 * 1.1)} after one year and ${D(p2 * 1.21)} after two years. The discount rate is 10% a year. What is its NPV? (dollars)`, g,
      "Discount each payment back to today separately: once for year 1 and twice for year 2.", "Year 1 value = payment ÷ 1.10. Year 2 value = payment ÷ 1.21. Add them, then subtract the cost.",
      () => { const a = pick([300, 600]), b = pick([400, 800]), c = pick([50, 100]); return `Example: ${D(a * 1.1)} in year 1 is worth ${D(a)}, ${D(b * 1.21)} in year 2 is worth ${D(b)}, so total ${D(a + b)}. Cost ${D(a + b - c)}: NPV ${D(c)}. Now do yours.`; }); }
  ], [["Money now vs later", "⏳", "A dollar today is worth more than a dollar later, because today's dollar can earn interest."], ["Discounting", "📉", "<b>Present value = future payment ÷ (1 + r)<sup>n</sup></b>, where r is the discount rate and n is the years."], ["NPV rule", "✅", "<b>NPV = present value of benefits - cost.</b> If NPV is above zero, the project beats the discount rate."]]));

  l26.push(mcL("Bonds and interest rates", [
    ["Market interest rates rise. The price of an existing bond paying a lower fixed rate tends to...", "fall", ["rise", "stay exactly the same"], "New bonds now pay more, so old ones look less attractive.", "Bond prices and market rates move in opposite directions."],
    ["Market interest rates fall. The price of an existing bond with a higher fixed rate tends to...", "rise", ["fall", "stay exactly the same"], "The old bond now pays more than new ones.", "Prices and rates move in opposite directions."],
    ["A bond pays $50 a year in interest and has a face value of $1,000. Its coupon rate is...", "5%", ["50%", "0.5%"], "Coupon rate compares the yearly payment with the face value.", "Divide the yearly payment by the face value, then change it to a percent."],
    ["A bond's face (par) value is...", "the amount repaid at maturity", ["its current market price", "the interest paid each year"], "It is a fixed amount on the bond certificate.", "It comes back to the lender at the end of the term."],
    ["A bond selling for LESS than its face value is selling at a...", "discount", ["premium", "par"], "Compare its price with its face value.", "Lower than face has its own word."],
    ["A bond selling for MORE than its face value is selling at a...", "premium", ["discount", "par"], "Compare its price with its face value.", "Higher than face has its own word."],
    ["Which usually changes MORE in price when rates move by 1 point?", "a 30-year bond", ["a 1-year bond", "they always change equally"], "The longer the wait for repayment, the longer the old rate is stuck.", "Think about the time to maturity."],
    ["Which bond generally carries more risk of not being repaid?", "a lower-rated company bond", ["a US Treasury bond", "an insured savings account"], "Higher risk of default means the issuer must offer more interest.", "Compare a shaky borrower with the government."]
  ], "Example: you hold a 3% bond. If new bonds start paying 5%, buyers would pay less for your 3% bond, so its price falls. If new bonds pay 2%, yours is worth more. Now do yours.",
    [["Bond basics", "📜", "A <b>bond</b> is a loan to a company or government. It pays <b>coupon</b> interest and returns the <b>face value</b> at maturity."], ["Price and rates", "🔃", "When market rates <b>rise</b>, existing bond prices <b>fall</b>. When rates fall, prices rise."], ["Risk and yield", "⚖️", "Riskier borrowers pay higher interest. Longer bonds react more to rate changes."]]));

  l26.push(nL("Expected return of a portfolio", [
    () => { const w = pick([20, 25, 40, 50, 60, 75, 80]), a = pick([6, 8, 10, 12]), b = pick([2, 3, 4, 5]); return q(`A portfolio is ${w}% in fund A (expected return ${a}%) and ${100 - w}% in fund B (expected return ${b}%). What is the portfolio's expected return, as a percent? (percent)`, r2(w * a / 100 + (100 - w) * b / 100),
      "A portfolio's return is a weighted average of its parts.", "Multiply each return by its weight, then add.",
      () => { const x = pick([50, 70]), y = pick([8, 10]), z = pick([2, 4]); return `Example: ${x}% at ${y}% plus ${100 - x}% at ${z}% is ${x * y / 100} + ${(100 - x) * z / 100} = ${r2(x * y / 100 + (100 - x) * z / 100)}%. Now do yours.`; }); },
    () => { const A = pick([2000, 4000, 5000]), B = pick([1000, 3000, 5000]), a = pick([5, 10]), b = pick([2, 4]); return q(`Someone puts ${D(A)} in an investment expected to return ${a}% and ${D(B)} in one expected to return ${b}%. What is the expected total dollar return for the year? (dollars)`, r2(A * a / 100 + B * b / 100),
      "Find the expected dollars from each investment.", "Return in dollars = amount × percent. Then add the two results.",
      () => { const x = pick([1000, 3000]), y = pick([2000, 4000]); return `Example: ${D(x)} at 10% = ${D(x / 10)} and ${D(y)} at 5% = ${D(y / 20)}, total ${D(x / 10 + y / 20)}. Now do yours.`; }); },
    () => { const T = pick([5000, 8000, 10000]), pc = pick([20, 25, 40, 50, 60]); return q(`${D(T * pc / 100)} of a ${D(T)} portfolio is in stocks. What percent of the portfolio is in stocks? (percent)`, pc,
      "A weight is a part divided by the whole.", "Divide the stock amount by the total and multiply by 100.",
      () => { const a = pick([2000, 6000]), b = pick([25, 50]); return `Example: ${D(a * b / 100)} out of ${D(a)} is ${b}%. Now do yours.`; }); }
  ], [["Weights", "⚖️", "A <b>portfolio</b> is a mix of investments. Each one's <b>weight</b> is its share of the total."], ["Expected return", "🧮", "<b>Portfolio expected return = Σ (weight × expected return).</b>"], ["Diversifying", "🧺", "Mixing assets that do not move together can lower swings without lowering the expected return by as much."]]));

  l26.push(mcL("Efficient markets and index funds", [
    ["The efficient market hypothesis says stock prices...", "already reflect available information", ["can be easily predicted from past charts", "never change"], "If news is public, what happens to the price quickly?", "Many investors react to news at once."],
    ["An index fund aims to...", "match the return of a market index", ["beat the market every year", "pick the five best stocks"], "It follows a list of companies rather than choosing winners.", "It tracks a benchmark."],
    ["Index funds usually have low fees mainly because...", "they do not need a team picking stocks", ["they are guaranteed to make money", "they are run by the government"], "Fees pay for work.", "Less research and trading are needed."],
    ["Active funds try to...", "beat a benchmark by choosing investments", ["copy an index exactly", "avoid all risk"], "Managers choose what to hold.", "The goal is to do better than a benchmark."],
    ["Over long periods, many actively managed funds...", "fail to beat their benchmark after fees", ["always beat the market", "never charge fees"], "Fees come out of returns.", "Beating the market consistently is hard."],
    ["Diversification mostly reduces which kind of risk?", "risk specific to one company", ["risk that hits the whole market", "all risk completely"], "Owning many companies smooths out single-company surprises.", "A problem at one firm matters less if it is a small slice."],
    ["Risk that affects the whole market and cannot be diversified away is called...", "market (systematic) risk", ["company (specific) risk", "inflation-proof risk"], "It hits everything at once.", "It is the risk that remains after diversifying."],
    ["If markets are efficient, a rumor everyone has already heard about a company is...", "probably already reflected in the price", ["a sure way to profit", "ignored by the market"], "Think about how many people already know.", "Prices adjust quickly to widely known news."]
  ], "Example: if a stock's good earnings are announced to everyone at once, buyers rush in and the price jumps right away, leaving little room to profit afterward. Now do yours.",
    [["Efficient markets", "⚡", "<b>Efficient market hypothesis</b>: prices quickly reflect public information, so beating the market consistently is hard."], ["Passive vs active", "🧭", "<b>Index funds</b> track an index at low cost. <b>Active funds</b> try to beat it, with higher fees."], ["Two kinds of risk", "🎯", "Diversification cuts <b>company-specific</b> risk. <b>Market risk</b> remains. This is education, not advice."]]));

  l26.push(nL("Deficit versus debt", [
    () => { const d = pick([20, 25, 30, 35]), f = pick([1, 2, 3]); return q(`A government has a debt of ${D(d)} trillion and runs a deficit of ${D(f)} trillion this year. What is its debt at the end of the year, in trillions (assuming nothing else changes)? (trillions)`, d + f,
      "A deficit adds to the debt.", "New debt = old debt + this year's deficit.",
      () => { const a = pick([10, 15]), b = pick([1, 2]); return `Example: debt ${D(a)} trillion plus a ${D(b)} trillion deficit is ${D(a + b)} trillion. Now do yours.`; }); },
    () => { const d = pick([20, 25, 30]), s = pick([1, 2]); return q(`A government has a debt of ${D(d)} trillion and runs a surplus of ${D(s)} trillion this year. What is its debt at the end of the year, in trillions? (trillions)`, d - s,
      "A surplus lets the government pay down some debt.", "New debt = old debt - the surplus.",
      () => { const a = pick([12, 18]), b = pick([1, 3]); return `Example: debt ${D(a)} trillion with a ${D(b)} trillion surplus leaves ${D(a - b)} trillion. Now do yours.`; }); },
    () => { const it = pick([
      ["A budget deficit is...", "spending exceeding revenue in one year", ["total money owed over all years", "revenue exceeding spending"]],
      ["The national debt is...", "the total amount owed from past borrowing", ["one year's gap between spending and revenue", "the same as one year's taxes"]],
      ["A budget surplus is...", "revenue exceeding spending in one year", ["spending exceeding revenue", "the total debt"]],
      ["Which one is a yearly flow, rather than a total owed?", "the deficit", ["the debt", "both are yearly flows"]],
      ["Which one is the total built up over time?", "the debt", ["the deficit", "the surplus"]]]);
      return mcq(it[0], it[1], it[2], "One idea is about a single year; the other adds up the past.", "Flow means a yearly gap; stock means the running total.", "Example: a bathtub gets 3 gallons more than it drains this hour (the flow). The water level in the tub is the total (the stock). Now do yours."); }
  ], [["Deficit", "📉", "A <b>deficit</b> happens when a government spends more than it collects in one year."], ["Debt", "🏔️", "The <b>national debt</b> is the total owed after years of past deficits and surpluses."], ["Flow and stock", "🛁", "Deficit is a yearly <b>flow</b>. Debt is the <b>stock</b>, like the water level in a tub."]]));

  l26.push(nL("Exchange rates and trade", [
    () => { const ex_ = pick([300, 400, 500, 800]), im = ex_ + pick([50, 100, 200]); return q(`A country exports ${D(ex_)} billion of goods and imports ${D(im)} billion. By how many billion dollars do imports exceed exports (its trade deficit)? (billions)`, im - ex_,
      "Net exports = exports - imports.", "Here imports are bigger, so subtract in the other order to get a positive gap.",
      () => { const a = pick([200, 600]), b = pick([30, 80]); return `Example: exports ${D(a)} and imports ${D(a + b)} give a deficit of ${D(b)}. Now do yours.`; }); },
    () => { const rate = pick([0.5, 0.8, 0.9, 1.2, 1.5, 2]), a = pick([100, 200, 500]); return q(`One US dollar buys ${rate} units of a foreign currency. How many units can ${D(a)} buy? (units)`, r2(a * rate),
      "An exchange rate is the price of one currency in terms of another.", "Multiply the dollars by the rate.",
      () => { const x = pick([50, 80]), y = pick([2, 4]); return `Example: at ${y} units per dollar, ${D(x)} buys ${x * y} units. Now do yours.`; }); },
    () => { const it = pick([
      ["The US dollar weakens against other currencies. US exports become...", "cheaper for foreign buyers", ["more expensive for foreign buyers", "unaffected by exchange rates"], "Foreign buyers need fewer of their own coins per dollar.", "Think about what a foreign buyer must pay."],
      ["The US dollar strengthens against other currencies. Imported goods become...", "cheaper for US buyers", ["more expensive for US buyers", "unavailable"], "Each dollar now buys more foreign currency.", "Think about what a US buyer must pay."],
      ["A weaker currency tends to ... a country's exports.", "increase", ["decrease", "make no difference to"], "Cheaper goods abroad mean more buyers.", "Price effect on foreign demand."],
      ["A strong currency makes travel abroad...", "cheaper for those who hold it", ["more expensive for those who hold it", "impossible"], "Their money goes further overseas.", "Each unit of their currency buys more."]]);
      return mcq(it[0], it[1], it[2], it[3], it[4], "Example: if the euro becomes cheaper for dollar holders, European goods cost less in dollars, so imports rise. Now do yours."); }
  ], [["Net exports", "🚢", "<b>Net exports = exports - imports.</b> A negative number is a trade deficit."], ["Exchange rates", "💱", "An <b>exchange rate</b> is the price of one currency in another. Value = amount × rate."], ["Strong and weak", "💪", "A <b>weaker</b> currency makes exports cheaper abroad and imports dearer. A <b>stronger</b> one does the opposite."]]));

  l26.push(mcL("Inflation, jobs and stagflation", [
    ["Stagflation is...", "high inflation together with slow growth and high unemployment", ["falling prices with fast growth", "low inflation with low unemployment"], "The word blends stagnation and inflation.", "Both problems at the same time."],
    ["The short-run Phillips curve suggests that lower unemployment is often linked with...", "higher inflation", ["lower inflation", "no change in inflation"], "A tight job market pushes wages up.", "It describes a trade-off between two things."],
    ["In the long run, the Phillips curve is usually drawn...", "vertical at the natural rate of unemployment", ["sloping up forever", "flat at zero inflation"], "Over time, expectations catch up.", "Unemployment returns to a natural level whatever the inflation."],
    ["The natural rate of unemployment includes...", "frictional and structural unemployment", ["cyclical unemployment only", "no unemployment at all"], "It is the rate when the economy is neither too hot nor too cold.", "It leaves out the business-cycle kind."],
    ["Output below potential output creates...", "a recessionary gap", ["an inflationary gap", "no gap"], "Compare what is produced with what could be.", "The economy is under-using its capacity."],
    ["Output above potential output tends to create...", "upward pressure on inflation", ["downward pressure on inflation", "higher unemployment"], "An overheated economy is straining its resources.", "Demand is beyond capacity."],
    ["Which event best fits stagflation?", "an oil shock with weak growth and rising prices", ["a boom with falling prices", "steady prices and full employment"], "Both prices and joblessness are rising.", "Look for a cost shock to supply."],
    ["If people expect higher inflation, the short-run Phillips curve...", "shifts up", ["shifts down", "does not change"], "Workers ask for bigger raises and firms raise prices.", "Expectations move the whole curve."]
  ], "Example: if unemployment drops very low, workers can demand bigger raises, firms raise prices, and inflation climbs: the Phillips trade-off. Now do yours.",
    [["Phillips curve", "📉", "In the short run, lower unemployment often goes with <b>higher inflation</b>, and the reverse."], ["Natural rate", "📏", "In the long run unemployment returns to its <b>natural rate</b>. Expectations shift the short-run curve."], ["Stagflation", "🥶", "<b>Stagflation</b> = high inflation + weak growth + high unemployment, often after a supply shock like an oil price spike."]]));

  l26.push(mcL("Saving, investment and growth", [
    ["Higher national saving can fund more...", "investment in capital", ["inflation", "price controls"], "Savings are lent to firms.", "Factories and equipment are built with saved money."],
    ["Capital deepening means...", "more capital per worker", ["more workers per factory", "lower prices"], "Workers get more tools.", "Compare equipment to the number of workers."],
    ["Which most raises long-run growth in living standards?", "higher productivity", ["printing more money", "price controls"], "More output from the same hours of work.", "Output per worker."],
    ["Human capital is...", "the skills and knowledge of workers", ["factory machinery", "money in the bank"], "It lives in people.", "Education and training build it."],
    ["Diminishing returns to capital means...", "each extra unit adds less output than the one before", ["capital always loses value", "output falls when capital rises"], "The first machine helps a lot; the hundredth helps less.", "Extra still adds, but by smaller amounts."],
    ["If GDP per person grows about 2% a year, it roughly doubles in about...", "36 years", ["10 years", "72 years"], "Rule of 72: divide 72 by the growth rate.", "72 divided by the yearly percent."],
    ["Technology helps growth by...", "letting workers produce more with the same inputs", ["reducing the number of goods", "removing the need for saving"], "It raises output per hour.", "Better ways of working."],
    ["A country that spends more on schools and training is investing in...", "human capital", ["physical capital only", "natural resources only"], "People's abilities improve.", "Think of skills, not machines."]
  ], "Example: a bakery that saves profit and buys a faster oven can bake more per hour, which raises productivity. Economies grow the same way. Now do yours.",
    [["Sources of growth", "🌱", "Growth comes from more <b>physical capital</b>, more <b>human capital</b>, better <b>technology</b> and more efficient use of resources."], ["Saving funds investment", "🏦", "Money saved in banks and markets is lent to businesses to build capital."], ["Productivity", "⏱️", "<b>Productivity</b> = output per hour. Rising productivity is the key to rising living standards over time."]]));

  l26.push(mixOf("Mixed practice", [l26[0], l26[1], l26[2], l26[3], l26[4], l26[5], l26[6], l26[7]]));
  l26.push(mixOf("Level 26 Challenge", [l26[8], l26[9], l26[10], l26[11], l26[12], l26[13], l26[14], l26[15], l26[16], l26[17]]));

  // ======================= LEVEL 27 (College year 1, first half) =======================
  const l27 = [];

  l27.push(nL("Midpoint elasticity", [
    () => { const dP = pick([2, 4]), dQ = pick(dP === 2 ? [10, 20, 30, 40] : [20, 40, 60, 80]); const E = dQ / (dP * 10);
      return q(`The price of a good rises from ${D(10 - dP / 2)} to ${D(10 + dP / 2)}, and the quantity demanded falls from ${100 + dQ / 2} to ${100 - dQ / 2}. Using the midpoint method, what is the price elasticity of demand (as a positive number)? (a number)`, E,
        "Midpoint method: each percent change uses the average of the old and new values.", "Elasticity = % change in quantity ÷ % change in price, each measured against its own average.",
        () => { const a = pick([20, 40]); return `Example: price from $9 to $11 (average $10, change 20%) and quantity from 110 to 90 (average 100, change 20%) gives 20 / 20 = 1. A different case: quantity change ${a}% against a price change of 20% gives ${a / 20}. Now do yours.`; }); },
    () => { const E = pick([0.5, 0.8, 1, 1.5, 2, 3]), pc = pick([10, 20]); return q(`A good has a price elasticity of demand of ${E}. If its price rises ${pc}%, by what percent does the quantity demanded fall? (percent)`, r2(E * pc),
        "Elasticity links the two percent changes.", "% change in quantity = elasticity × % change in price.",
        () => { const a = pick([2, 3]), b = pick([5, 15]); return `Example: elasticity ${a} and price up ${b}% means quantity down ${a * b}%. Now do yours.`; }); },
    () => { const E = pick([0.4, 0.5, 0.8, 1, 1.5, 2, 3]); const cl = E > 1 ? "elastic" : E < 1 ? "inelastic" : "unit elastic";
      return mcq(`A good has a price elasticity of demand of ${E}. Demand is...`, cl, ["elastic", "inelastic", "unit elastic"].filter(x => x !== cl),
        "Compare the number with 1.", "Above 1, below 1 and exactly 1 each have a name.",
        "Example: a value of 2.5 is above 1, so quantity reacts strongly: elastic. A value of 0.3 is below 1: inelastic. Now do yours."); }
  ], [["Midpoint method", "↔️", "To avoid different answers going up versus down, measure each % change against the <b>average</b> of start and end."], ["Elasticity", "🧮", "<b>E = %Δ quantity ÷ %Δ price</b> (as a positive number)."], ["Elastic or not", "📏", "<b>E &gt; 1</b>: elastic. <b>E &lt; 1</b>: inelastic. <b>E = 1</b>: unit elastic. Raising price raises revenue only when demand is inelastic."]]));

  l27.push(nL("Who pays a tax?", [
    () => { const t = pick([2, 4, 5, 6, 8]), b = ri(1, t - 1); return q(`A tax of ${D(t)} per unit is placed on a good. Buyers end up paying ${D(b)} more per unit than before. How many dollars of the tax per unit do sellers bear? (dollars)`, t - b,
        "The tax burden is split between buyers and sellers.", "Buyers' share + sellers' share = the whole tax.",
        () => { const x = pick([5, 10]), y = pick([1, 4]); return `Example: a ${D(x)} tax where buyers pay ${D(y)} more leaves sellers with ${D(x - y)}. Now do yours.`; }); },
    () => { const t = pick([1, 2, 3, 5]), n = pick([100, 200, 500, 1000]); return q(`A tax of ${D(t)} per unit is placed on a good, and after the tax ${n} units are still sold. How many dollars of tax revenue does the government collect? (dollars)`, t * n,
        "Revenue counts only the units actually sold after the tax.", "Tax revenue = tax per unit × units sold.",
        () => { const a = pick([2, 4]), b = pick([50, 300]); return `Example: ${D(a)} on ${b} units collects ${D(a * b)}. Now do yours.`; }); },
    () => { const it = pick([
      ["Demand is very inelastic and supply is elastic. Who bears more of a per-unit tax?", "buyers", ["sellers", "the government"], "The side that is less able to walk away carries more of the burden.", "Inelastic means hard to adjust."],
      ["Supply is very inelastic and demand is elastic. Who bears more of a per-unit tax?", "sellers", ["buyers", "the government"], "The side that is less able to walk away carries more of the burden.", "Inelastic means hard to adjust."],
      ["The law says sellers must send the tax to the government. Does that decide who really bears the cost?", "No, elasticities decide the split", ["Yes, sellers bear all of it", "Yes, buyers bear all of it"], "Think about who can change their behavior.", "The legal collector and the true burden often differ."],
      ["The same tax is collected from buyers instead of sellers. The economic burden is...", "the same split as before", ["all on sellers", "all on buyers"], "The market adjusts prices.", "Who writes the check does not set who bears the cost."]]);
      return mcq(it[0], it[1], it[2], it[3], it[4], "Example: a tax on gasoline, where drivers have few alternatives in the short run, falls mostly on buyers. A tax on a good with many substitutes falls more on sellers. Now do yours."); }
  ], [["Tax wedge", "🔻", "A per-unit tax puts a <b>wedge</b> between what buyers pay and what sellers keep. Buyers' share + sellers' share = the tax."], ["Elasticity decides", "⚖️", "The <b>less elastic</b> side (harder to switch away) bears more of the burden."], ["Revenue", "🏛️", "Tax revenue = tax per unit × quantity sold after the tax."]]));

  l27.push(nL("Deadweight loss of a tax", [
    () => { const t = pick([2, 4, 5, 10]), dq = pick([10, 20, 40, 50]); return q(`A tax of ${D(t)} per unit cuts the quantity sold by ${dq} units. Deadweight loss is the triangle with the tax as height and the lost units as base. What is its area in dollars? (dollars)`, t * dq / 2,
        "A triangle's area is half of base times height.", "Base = units lost, height = the tax per unit.",
        () => { const a = pick([3, 6]), b = pick([20, 30]); return `Example: tax ${D(a)}, lost ${b} units: ½ × ${a} × ${b} = ${D(a * b / 2)}. Now do yours.`; }); },
    () => { const q0 = pick([100, 200, 500]), q1 = q0 - pick([20, 40, 50]); return q(`Before a tax ${q0} units were sold. After the tax ${q1} are sold. How many units of trade disappeared? (units)`, q0 - q1,
        "Compare the two quantities.", "Subtract the quantity after the tax from the quantity before.",
        () => { const a = pick([300, 400]), b = pick([30, 60]); return `Example: ${a} before and ${a - b} after means ${b} units lost. Now do yours.`; }); },
    () => { const it = pick([
      ["Deadweight loss is...", "the value of mutually beneficial trades that no longer happen", ["the tax revenue the government keeps", "a transfer from buyers to sellers"], "It is a loss for society, not a transfer.", "Some trades stop happening."],
      ["Deadweight loss from a tax is larger when demand and supply are...", "more elastic", ["less elastic", "unaffected by elasticity"], "Elastic means people change behavior a lot.", "More lost trades."],
      ["A very large tax compared with a small one creates a deadweight loss that is...", "much more than proportionally larger", ["smaller", "exactly the same"], "The triangle's base and height both grow.", "The area grows faster than the tax."],
      ["If a good has perfectly inelastic demand, a tax on it creates...", "almost no deadweight loss", ["a very large deadweight loss", "negative deadweight loss"], "Would buyers stop buying?", "Quantity does not change much."]]);
      return mcq(it[0], it[1], it[2], it[3], it[4], "Example: a tax on a good with many substitutes makes many buyers leave, so a lot of trade vanishes. Now do yours."); }
  ], [["Lost trades", "📉", "A tax makes some trades not worth doing. The value of those lost trades is <b>deadweight loss</b>."], ["The triangle", "🔺", "<b>Deadweight loss ≈ ½ × tax per unit × units lost.</b>"], ["Elasticity again", "↔️", "The more elastic the market, the more trades vanish and the bigger the loss."]]));

  l27.push(nL("How a monopoly picks its price", [
    () => { const b = pick([1, 2]), Qs = pick([5, 10, 15, 20]), c = pick([2, 4, 6, 10]); const a = c + 2 * b * Qs; return q(`A monopoly faces demand P = ${a} - ${b}Q and has a constant marginal cost of ${D(c)}. Its marginal revenue is ${a} - ${2 * b}Q. It maximizes profit where MR = MC. What quantity does it sell? (units)`, Qs,
        "Set marginal revenue equal to marginal cost.", "Write the equation, then solve for Q.",
        () => { const bb = 1, cc = pick([3, 5]), qq = pick([4, 7]); return `Example: demand P = ${cc + 2 * qq} - Q, MC = ${cc}. MR = ${cc + 2 * qq} - 2Q = ${cc} gives ${2 * qq} = 2Q, so Q = ${qq}. Now do yours.`; }); },
    () => { const b = pick([1, 2]), Qs = pick([5, 10, 15, 20]), c = pick([2, 4, 6, 10]); const a = c + 2 * b * Qs; return q(`A monopoly faces demand P = ${a} - ${b}Q with a constant marginal cost of ${D(c)}. The profit-maximizing quantity is ${Qs}. What price does it charge? (dollars)`, a - b * Qs,
        "The price comes from the demand curve, not from marginal revenue.", "Put the quantity into the demand equation.",
        () => { const x = pick([30, 50]), y = pick([1, 2]), z = pick([4, 6]); return `Example: demand P = ${x} - ${y}Q at Q = ${z}: P = ${x} - ${y * z} = ${D(x - y * z)}. Now do yours.`; }); },
    () => { const b = pick([1, 2]), Qs = pick([5, 10, 15, 20]), c = pick([2, 4, 6, 10]); const a = c + 2 * b * Qs, P = a - b * Qs; return q(`A monopoly sells ${Qs} units at a price of ${D(P)} and its marginal and average cost is ${D(c)} per unit. What is its profit in dollars? (dollars)`, (P - c) * Qs,
        "Profit per unit is price minus cost.", "Multiply the profit per unit by the number of units.",
        () => { const x = pick([12, 20]), y = pick([5, 8]), z = pick([10, 30]); return `Example: price ${D(x)}, cost ${D(y)}, ${z} units: (${x} - ${y}) × ${z} = ${D((x - y) * z)}. Now do yours.`; }); }
  ], [["Market power", "🏭", "A <b>monopoly</b> is the only seller. To sell more it must lower its price on all units, so <b>marginal revenue is below price</b>."], ["Profit-maximizing rule", "🎯", "Produce where <b>MR = MC</b>. For demand P = a - bQ, MR = a - 2bQ."], ["Then find the price", "🏷️", "Find Q from MR = MC, then read the <b>price off the demand curve</b>. Price ends up above marginal cost."]]));

  l27.push(nL("Game theory: the dilemma", [
    () => { const S = pick([0, 1, 2]), P = pick([3, 4, 5]), R = P + pick([2, 3, 4]), T = R + pick([2, 3, 4]); const nm = pick([["Firm X", "Firm Y"], ["Shop A", "Shop B"]]);
      const setup = `${nm[0]} and ${nm[1]} each choose a High price or a Low price. Yearly profits in millions: both High: ${R} each. Both Low: ${P} each. One Low and the other High: the Low one earns ${T}, the High one earns ${S}.`;
      const k = ri(0, 3);
      if (k === 0) return mcq(setup + ` If ${nm[1]} charges High, what is ${nm[0]}'s best choice?`, "Low price", ["High price", "It makes no difference"],
        "Compare what you earn from each of your two choices, with the other firm's choice fixed.", "Look at the profit numbers for each choice against a High-priced rival.", "Example: if the rival picks A, compare your payoff from B against your payoff from A and take the bigger one. Now do yours.");
      if (k === 1) return mcq(setup + ` If ${nm[1]} charges Low, what is ${nm[0]}'s best choice?`, "Low price", ["High price", "It makes no difference"],
        "Compare what you earn from each of your two choices, with the other firm's choice fixed.", "Look at the profit numbers for each choice against a Low-priced rival.", "Example: if the rival picks A, compare your payoff from B against your payoff from A and take the bigger one. Now do yours.");
      if (k === 2) return mcq(setup + " What is the Nash equilibrium (where neither firm gains by switching alone)?", "Both charge Low", ["Both charge High", "One High, one Low"],
        "Check whether each firm has a choice that is best whatever the rival does.", "If one choice is best every time, both firms will use it.", "Example: if choosing B is best against any rival choice, both players pick B and the outcome is (B, B). Now do yours.");
      return q(setup + " In the Nash equilibrium, how many millions does each firm earn? (millions)", P,
        "First find the choice that is best for each firm whatever the other does.", "Then find the profit when both use that choice.",
        () => { const a = pick([6, 7]); return `Example: if both firms end up in the box where each earns ${a}, then each earns ${a}. Now do yours.`; });
    }
  ], [["Strategic choices", "♟️", "In <b>game theory</b>, each player's best move depends on what the others do."], ["Dominant strategy", "⭐", "A <b>dominant strategy</b> is best whatever the rival does. If both have one, play ends at a <b>Nash equilibrium</b>."], ["Prisoner's dilemma", "🔒", "Each firm cuts its price (best individually), but both end up with less than if they had both kept prices high."]]));

  l27.push(nL("Marginal utility per dollar", [
    () => { const p = pick([2, 3, 4, 5]), k = ri(3, 10); return q(`The next slice of pizza gives ${p * k} utils and costs ${D(p)}. How many utils per dollar is that? (a number)`, k,
        "Compare the extra satisfaction with its price.", "Marginal utility ÷ price.",
        () => { const a = pick([2, 3]), b = pick([4, 12]); return `Example: ${a * b} utils for ${D(a)} is ${b} utils per dollar. Now do yours.`; }); },
    () => { let ma, pa, mb, pb; do { pa = pick([2, 3, 4]); ma = pa * ri(4, 9); pb = pick([2, 5, 6]); mb = pb * ri(3, 8); } while (ma / pa === mb / pb);
      const aWins = ma / pa > mb / pb; return mcq(`Good A gives ${ma} utils for ${D(pa)}. Good B gives ${mb} utils for ${D(pb)}. For the next dollar, which is the better buy?`, aWins ? "Good A" : "Good B", [aWins ? "Good B" : "Good A", "They are equal"],
        "Compare utils per dollar, not just utils.", "Divide each marginal utility by its price and choose the larger result.",
        "Example: Good X gives 30 utils for $5 (6 per dollar). Good Y gives 28 utils for $4 (7 per dollar). Y is the better buy. Now do yours."); },
    () => { const a = pick([20, 24, 30]), d = pick([4, 6]); return q(`The first, second and third slices give ${a}, ${a - d} and ${a - 2 * d} utils. What is the total utility from three slices? (utils)`, 3 * a - 3 * d,
        "Total utility is the sum of each slice's marginal utility.", "Add the three numbers.",
        () => { const x = pick([18, 28]), y = pick([3, 5]); return `Example: ${x}, ${x - y}, ${x - 2 * y} adds up to ${3 * x - 3 * y}. Now do yours.`; }); }
  ], [["Utility", "😋", "Economists measure satisfaction in <b>utils</b>. <b>Marginal utility</b> is the extra satisfaction from one more unit."], ["Diminishing", "⬇️", "Each extra slice usually gives <b>less</b> than the one before."], ["Best use of money", "💲", "Spend the next dollar where <b>MU ÷ price</b> is highest. At the best mix, MU ÷ price is equal across goods."]]));

  l27.push(nL("Diminishing marginal product", [
    () => { const i1 = pick([16, 18, 20, 24]), d = pick([2, 3, 4]); const inc = [i1, i1 - d, i1 - 2 * d, i1 - 3 * d]; const tp = []; let s = 0; inc.forEach(x => { s += x; tp.push(s); });
      const k = ri(2, 4); return q(`A workshop's total output with 1, 2, 3 and 4 workers is ${tp.join(", ")} units. What is the marginal product of worker number ${k}? (units)`, inc[k - 1],
        "Marginal product is the output added by one more worker.", "Subtract the total output with one fewer worker.",
        () => { const a = pick([10, 14]), b = pick([2, 3]); return `Example: totals 10, ${10 + a}: the second worker adds ${a}. Totals ${a + 10}, ${a + 10 + b}: adds ${b}. Now do yours.`; }); },
    () => { const m = [pick([20, 24]), pick([14, 16]), pick([8, 10])]; return q(`The marginal products of workers 1, 2 and 3 are ${m.join(", ")}. What is total output with all three workers? (units)`, m[0] + m[1] + m[2],
        "Total product is the sum of the marginal products.", "Add all three marginal products.",
        () => { const a = pick([9, 12]), b = pick([5, 6]), c = pick([2, 3]); return `Example: ${a}, ${b}, ${c} adds up to ${a + b + c}. Now do yours.`; }); },
    () => { const s = pick([6, 8, 10]), u = pick([2, 4]), r = ri(1, 2); const mp = [s]; for (let i = 0; i < r; i++) mp.push(mp[mp.length - 1] + u); const v = pick([1, 2, 3]); while (mp.length < 6) mp.push(mp[mp.length - 1] - v);
      return q(`The marginal products of workers 1 to 6 are ${mp.join(", ")}. Diminishing marginal returns begin with which worker number? (a number)`, r + 2,
        "Find the first worker who adds less than the worker before.", "Scan the list for the first drop.",
        () => { return `Example: marginal products 4, 6, 5, 3: the first drop is at the third worker, so the answer would be 3. Now do yours.`; }); }
  ], [["Marginal product", "👷", "<b>Marginal product</b> = the extra output from one more worker (total now - total before)."], ["Diminishing returns", "📉", "With other inputs fixed (same kitchen), each added worker eventually adds <b>less</b> than the last."], ["Why it matters", "🏭", "Diminishing returns make marginal cost <b>rise</b> as a firm produces more in the short run."]]));

  l27.push(nL("Inventory: FIFO and LIFO", [
    () => { const c1 = pick([4, 5, 6]), c2 = c1 + pick([1, 2]), c3 = c2 + pick([1, 2]), n = pick([12, 15, 18]); return q(`A shop bought 10 units at ${D(c1)}, then 10 at ${D(c2)}, then 10 at ${D(c3)}. It sold ${n} units. Using FIFO (first in, first out), what is the cost of goods sold? (dollars)`, 10 * c1 + (n - 10) * c2,
        "FIFO assumes the oldest units are sold first.", "Use up the first batch, then take the rest from the second batch.",
        () => { const a = pick([2, 3]), b = a + 1, m = pick([13, 16]); return `Example: 10 units at ${D(a)} then 10 at ${D(b)}, selling ${m} (FIFO): 10 × ${a} + ${m - 10} × ${b} = ${D(10 * a + (m - 10) * b)}. Now do yours.`; }); },
    () => { const c1 = pick([4, 5, 6]), c2 = c1 + pick([1, 2]), c3 = c2 + pick([1, 2]), n = pick([12, 15, 18]); return q(`A shop bought 10 units at ${D(c1)}, then 10 at ${D(c2)}, then 10 at ${D(c3)}. It sold ${n} units. Using LIFO (last in, first out), what is the cost of goods sold? (dollars)`, 10 * c3 + (n - 10) * c2,
        "LIFO assumes the newest units are sold first.", "Use up the last batch, then take the rest from the one before it.",
        () => { const a = pick([2, 3]), b = a + 1, m = pick([13, 16]); return `Example: 10 units at ${D(a)} then 10 at ${D(b)}, selling ${m} (LIFO): 10 × ${b} + ${m - 10} × ${a} = ${D(10 * b + (m - 10) * a)}. Now do yours.`; }); },
    () => { const c1 = pick([4, 5, 6]), c2 = c1 + pick([1, 2]), c3 = c2 + pick([1, 2]), n = pick([12, 15, 18]); return q(`A shop bought 10 units at ${D(c1)}, then 10 at ${D(c2)}, then 10 at ${D(c3)}. It sold ${n} units. Using FIFO, what is the cost of the ${30 - n} units left in inventory? (dollars)`, (20 - n) * c2 + 10 * c3,
        "FIFO leaves the newest units on the shelf.", "Count what remains of the second batch plus all of the last batch.",
        () => { const a = pick([2, 3]), b = a + 1, m = pick([13, 16]); return `Example: 10 at ${D(a)} then 10 at ${D(b)}, sold ${m}: left over ${20 - m} × ${b} = ${D((20 - m) * b)}. Now do yours.`; }); },
    () => mcq("When prices are rising, which inventory method usually reports the LOWER cost of goods sold (and so the higher profit)?", "FIFO", ["LIFO", "Both give the same result"],
      "Which units are counted as sold, the old cheap ones or the new costly ones?", "The oldest units were bought at lower prices when prices rise.",
      "Example: if old units cost $2 and new ones cost $4, selling the old first charges $2 per unit against sales, and profit looks higher. Now do yours.")
  ], [["Which units sold?", "📦", "When goods are bought at different prices, the cost of the units sold depends on the method."], ["FIFO and LIFO", "🔄", "<b>FIFO</b>: oldest units sold first. <b>LIFO</b>: newest units sold first (allowed in the US, not under international IFRS)."], ["Effect", "📈", "When prices rise, FIFO gives lower COGS and higher profit. The leftover inventory is valued at the newest costs."]]));

  l27.push(nL("Adjusting entries", [
    () => { const w = pick([80, 100, 120, 150]), d = pick([2, 3, 4]); return q(`Workers earn ${D(w)} a day for the company. The last ${d} days of the month are unpaid on December 31. How many dollars of wages expense must be accrued? (dollars)`, w * d,
        "Expenses belong to the period when the work was done, even if paid later.", "Daily wage × days worked but unpaid.",
        () => { const a = pick([60, 90]), b = pick([2, 5]); return `Example: ${D(a)} a day for ${b} unpaid days is ${D(a * b)} accrued. Now do yours.`; }); },
    () => { const P = pick([600, 1200, 2400]), m = pick([2, 3, 4, 5]); return q(`On October 1 a company pays ${D(P)} for 12 months of insurance. By December 31, ${m} months have been used. How many dollars of insurance expense should be recorded so far? (dollars)`, P / 12 * m,
        "Only the used part of a prepayment becomes an expense.", "Cost ÷ 12 months, times the months used.",
        () => { const a = pick([480, 960]), b = pick([2, 6]); return `Example: ${D(a)} for a year, ${b} months used: ${a / 12} a month, so ${D(a / 12 * b)}. Now do yours.`; }); },
    () => { const R = pick([600, 1200, 2400]), m = pick([3, 4, 5, 6]); return q(`A customer prepays ${D(R)} for 12 months of service. After ${m} months, how many dollars are still unearned revenue (a liability)? (dollars)`, R - R / 12 * m,
        "Revenue is earned as the service is given. The rest is still owed to the customer.", "Total prepaid minus the part already earned (monthly share × months).",
        () => { const a = pick([720, 1440]), b = pick([3, 5]); return `Example: ${D(a)} for a year, ${b} months given: earned ${D(a / 12 * b)}, unearned ${D(a - a / 12 * b)}. Now do yours.`; }); }
  ], [["Why adjust", "🔧", "At period end, <b>adjusting entries</b> make sure revenue and expenses land in the right period."], ["Accruals", "⏳", "<b>Accrued expenses</b>: used or owed but not yet paid (wages). <b>Accrued revenue</b>: earned but not yet billed."], ["Deferrals", "📅", "<b>Prepaid expenses</b> (insurance) become expenses as used. <b>Unearned revenue</b> becomes revenue as earned."]]));

  l27.push(mcL("The cash flow statement", [
    ["Cash received from customers for sales is reported under...", "operating activities", ["investing activities", "financing activities"], "This is the day-to-day business.", "It comes from the main business."],
    ["Cash paid to employees as wages is reported under...", "operating activities", ["investing activities", "financing activities"], "This is a normal cost of running the business.", "It is part of daily operations."],
    ["Buying a new delivery truck is reported under...", "investing activities", ["operating activities", "financing activities"], "A long-lived asset was bought.", "Buying and selling long-term assets."],
    ["Selling an old building for cash is reported under...", "investing activities", ["operating activities", "financing activities"], "It is a long-term asset.", "Buying and selling long-term assets."],
    ["Borrowing money from a bank is reported under...", "financing activities", ["operating activities", "investing activities"], "It is how the business raises money.", "Debt and equity flows with lenders and owners."],
    ["Issuing new shares of stock for cash is reported under...", "financing activities", ["operating activities", "investing activities"], "Owners are putting money in.", "Debt and equity flows with lenders and owners."],
    ["Paying dividends to shareholders is reported under...", "financing activities", ["operating activities", "investing activities"], "Money goes back to the owners.", "Debt and equity flows with lenders and owners."],
    ["Paying suppliers for goods to resell is reported under...", "operating activities", ["investing activities", "financing activities"], "This is part of the normal buying and selling cycle.", "It is a day-to-day cost."],
    ["Repaying the principal of a loan is reported under...", "financing activities", ["operating activities", "investing activities"], "Debt flows with lenders.", "It is about how the business is funded."]
  ], "Example: a bakery pays $200 for flour (operating), $5,000 for a new oven (investing) and receives a $10,000 loan (financing). Now do yours.",
    [["Why cash flow", "💧", "Profit is not cash. The <b>cash flow statement</b> shows where cash actually came from and went."], ["Three sections", "🗂️", "<b>Operating</b>: day-to-day business. <b>Investing</b>: buying or selling long-term assets. <b>Financing</b>: debt and owners' money."], ["Healthy sign", "✅", "A business with positive operating cash flow can pay its bills from its own operations."]]));

  l27.push(nL("Liquidity and coverage ratios", [
    () => { const CL = pick([100, 200, 400]), qk = pick([0.5, 0.75, 1, 1.5, 2]), inv = pick([50, 100, 150]); return q(`A company has current assets of ${D(CL * qk + inv)} thousand, including ${D(inv)} thousand of inventory, and current liabilities of ${D(CL)} thousand. What is its quick ratio, (current assets - inventory) ÷ current liabilities? (a number)`, qk,
        "The quick ratio leaves out inventory because it can be slow to turn into cash.", "Subtract inventory from current assets first, then divide.",
        () => { const a = pick([100, 200]), b = pick([2, 3]), c = pick([40, 60]); return `Example: current assets ${a * b + c}, inventory ${c}, current liabilities ${a}: (${a * b + c} - ${c}) / ${a} = ${b}. Now do yours.`; }); },
    () => { const i = pick([10, 20, 50, 100]), c = pick([2, 3, 4, 5, 8]); return q(`A company has operating income (EBIT) of ${D(i * c)} thousand and interest expense of ${D(i)} thousand. What is its interest coverage ratio? (a number)`, c,
        "It shows how easily earnings cover interest payments.", "EBIT ÷ interest expense.",
        () => { const a = pick([20, 40]), b = pick([3, 6]); return `Example: EBIT ${a * b} and interest ${a} gives ${b}. Now do yours.`; }); },
    () => { const A = pick([200, 400, 500, 1000]), t = pick([0.5, 1, 1.5, 2, 3]); return q(`A company has revenue of ${D(A * t)} thousand and total assets of ${D(A)} thousand. What is its asset turnover? (a number)`, t,
        "Asset turnover shows how many dollars of sales each asset dollar produces.", "Revenue ÷ total assets.",
        () => { const a = pick([300, 600]), b = pick([2, 3]); return `Example: revenue ${a * b} and assets ${a} gives ${b}. Now do yours.`; }); }
  ], [["Liquidity", "💧", "<b>Quick ratio = (current assets - inventory) ÷ current liabilities.</b> It tests ability to pay short-term bills."], ["Coverage", "🛡️", "<b>Interest coverage = EBIT ÷ interest expense.</b> Higher means interest is easier to pay."], ["Efficiency", "⚙️", "<b>Asset turnover = revenue ÷ total assets.</b> Higher means assets are used more productively."]]));

  l27.push(nL("DuPont analysis of ROE", [
    () => { const m = pick([5, 10, 20]), t = pick([0.5, 1, 2]), lv = pick([1, 2, 3]); return q(`A company has a net margin of ${m}%, an asset turnover of ${t} and an equity multiplier (assets ÷ equity) of ${lv}. By the DuPont formula, what is its ROE, as a percent? (percent)`, r2(m * t * lv),
        "DuPont splits ROE into three parts multiplied together.", "ROE = net margin × asset turnover × equity multiplier.",
        () => { const a = pick([4, 8]), b = pick([2, 3]), c = pick([2, 3]); return `Example: ${a}% × ${b} × ${c} = ${a * b * c}%. Now do yours.`; }); },
    () => { const m = pick([5, 10, 20]), t = pick([1, 2]), lv = pick([2, 3]); return q(`A company has an ROE of ${m * t * lv}%, an asset turnover of ${t} and an equity multiplier of ${lv}. What is its net margin, as a percent? (percent)`, m,
        "Rearrange the DuPont formula.", "Net margin = ROE ÷ (asset turnover × equity multiplier).",
        () => { const a = pick([4, 6]), b = pick([2, 3]), c = pick([2, 5]); return `Example: ROE ${a * b * c}% with turnover ${b} and multiplier ${c}: ${a * b * c} / (${b} × ${c}) = ${a}%. Now do yours.`; }); },
    () => { const it = pick([
      ["In the DuPont formula, which factor measures how much profit is earned on each dollar of sales?", "net profit margin", ["asset turnover", "equity multiplier"], "Think of profit divided by sales.", "It is a margin."],
      ["Which DuPont factor shows how efficiently assets create sales?", "asset turnover", ["net profit margin", "equity multiplier"], "Sales divided by assets.", "It is a turnover."],
      ["Which DuPont factor shows how much the company uses borrowed money?", "equity multiplier", ["net profit margin", "asset turnover"], "Assets divided by equity.", "More debt makes this bigger."],
      ["A company's ROE rises while its margin and turnover stay the same. The likely cause is...", "more leverage", ["lower sales", "lower assets"], "One of the three factors must have changed.", "Neither margin nor turnover moved."]]);
      return mcq(it[0], it[1], it[2], it[3], it[4], "Example: a grocery store has a low margin but a high asset turnover; a luxury shop has a high margin but low turnover. Both can reach a similar ROE. Now do yours."); }
  ], [["Breaking ROE apart", "🧩", "<b>ROE = net margin × asset turnover × equity multiplier</b>, which equals net income ÷ equity."], ["Three levers", "🎛️", "Profitability (margin), efficiency (turnover) and leverage (equity multiplier)."], ["Use", "🔍", "DuPont shows <b>why</b> two companies with similar ROE are different: one may earn it from leverage, the other from margins."]]));

  l27.push(nL("IRR and the hurdle rate", [
    () => { const I = pick([1000, 2000, 4000]), p = pick([5, 8, 10, 12, 15, 20]); return q(`A project costs ${D(I)} today and pays ${D(I * (100 + p) / 100)} in one year. What is its internal rate of return (IRR), as a percent? (percent)`, p,
        "IRR is the discount rate that makes NPV equal zero. For one payment, it is the plain return.", "(Payment - cost) ÷ cost × 100.",
        () => { const a = pick([500, 3000]), b = pick([10, 25]); return `Example: cost ${D(a)}, payment ${D(a * (100 + b) / 100)}: ${a * b / 100} / ${a} = ${b}%. Now do yours.`; }); },
    () => { let p, h; do { p = pick([6, 8, 10, 12, 15]); h = pick([7, 9, 10, 12, 14]); } while (p === h); const ok = p > h;
      return mcq(`A project has an IRR of ${p}%. The company's hurdle rate (minimum required return) is ${h}%. Based on this rule, the company should...`, ok ? "accept the project" : "reject the project", [ok ? "reject the project" : "accept the project", "decide by flipping a coin"],
        "Compare the project's return with the minimum required return.", "Accept only if the return beats the hurdle.",
        "Example: an IRR of 9% against a hurdle of 7% clears the bar, so accept. An IRR of 5% against 8% does not. Now do yours."); },
    () => { const I = pick([1000, 2500, 4000]), p = pick([6, 8, 10, 12, 20]); return q(`To earn an IRR of ${p}% on a one-year project costing ${D(I)}, what payment must arrive after one year? (dollars)`, I * (100 + p) / 100,
        "The payment must return the cost plus the return.", "Cost × (1 + IRR as a decimal).",
        () => { const a = pick([2000, 5000]), b = pick([5, 15]); return `Example: ${D(a)} at ${b}% needs ${D(a)} × ${1 + b / 100} = ${D(a * (100 + b) / 100)}. Now do yours.`; }); }
  ], [["IRR", "🎯", "<b>Internal rate of return</b> is the discount rate that makes a project's <b>NPV zero</b>."], ["Hurdle rate", "🚧", "A company sets a <b>hurdle rate</b>, the least return it will accept. If IRR is above it, the project passes."], ["Same story as NPV", "🔗", "IRR above the hurdle usually means NPV above zero. For one payment after one year, IRR = (payment - cost) ÷ cost."]]));

  l27.push(nL("Weighted average cost of capital", [
    () => { const we = pick([50, 60, 70, 80]), re = pick([8, 10, 12, 15]), rd = pick([3, 4, 5]); return q(`A company is financed ${we}% by equity costing ${re}% and ${100 - we}% by debt with an after-tax cost of ${rd}%. What is its WACC, as a percent? (percent)`, r2(we * re / 100 + (100 - we) * rd / 100),
        "WACC is a weighted average of the costs of each source of money.", "Multiply each source's weight by its cost, then add.",
        () => { const x = pick([60, 70]), y = pick([10, 12]), z = pick([4, 5]); return `Example: ${x}% × ${y}% + ${100 - x}% × ${z}% = ${x * y / 100} + ${(100 - x) * z / 100} = ${r2(x * y / 100 + (100 - x) * z / 100)}%. Now do yours.`; }); },
    () => { const we = pick([50, 60, 70]), re = pick([10, 12, 14]), rd = pick([6, 8, 10]), t = pick([20, 25, 40]); const rdat = rd * (100 - t) / 100; return q(`A company is financed ${we}% by equity costing ${re}% and ${100 - we}% by debt at ${rd}% before tax. The tax rate is ${t}%. What is its WACC, as a percent? (percent)`, r2(we * re / 100 + (100 - we) * rdat / 100),
        "Use the after-tax cost of debt in the formula.", "After-tax debt cost = rate × (1 - tax rate). Then weight and add.",
        () => { const x = pick([60, 80]), y = pick([10, 12]), z = pick([5, 10]), w = pick([20, 50]); return `Example: debt ${z}% pre-tax at a ${w}% tax rate costs ${r2(z * (100 - w) / 100)}% after tax; ${x}% × ${y}% + ${100 - x}% × ${r2(z * (100 - w) / 100)}% = ${r2(x * y / 100 + (100 - x) * z * (100 - w) / 10000)}%. Now do yours.`; }); },
    () => { const E = pick([300, 400, 600, 700]), Dd = 1000 - E; return q(`A company's equity is worth ${D(E)} million and its debt is ${D(Dd)} million. What percent of its financing is equity? (percent)`, E / 10,
        "A weight is a part divided by the whole.", "Equity ÷ (equity + debt), times 100.",
        () => { const a = pick([200, 800]); return `Example: equity ${a} and debt ${1000 - a} makes ${a / 10}% equity. Now do yours.`; }); }
  ], [["Cost of capital", "🏗️", "Companies raise money from <b>equity</b> and <b>debt</b>. Each source has a required return."], ["WACC", "⚖️", "<b>WACC = (E ÷ V) × cost of equity + (D ÷ V) × cost of debt × (1 - tax rate)</b>, where V = D + E."], ["Use", "🎯", "WACC is a typical <b>discount rate</b> for judging projects. A project should earn more than the company's cost of capital."]]));

  l27.push(nL("Leverage and returns", [
    () => { const E = pick([200, 400, 500, 1000]), k = pick([1, 2, 3]), g = pick([8, 10, 12, 15]), i = pick([4, 5, 6]); const A = E * (1 + k); return q(`A business with assets of ${D(A)} thousand is financed by ${D(E)} thousand of equity and ${D(E * k)} thousand of debt at ${i}% interest. The assets earn ${g}% a year. What is the return on equity, as a percent? (percent)`, g + k * (g - i),
        "Profit after interest belongs to the owners.", "Profit = assets × asset return - debt × interest rate. Then divide by equity.",
        () => { const e = 100, kk = 1, gg = 10, ii = 4; return `Example: assets 200 earn ${gg}% = 20, debt 100 costs ${ii}% = 4, profit 16 on equity ${e} is 16%. Now do yours.`; }); },
    () => { const A = pick([1000, 2000]), Dd = pick([400, 500, 600]), g = pick([10, 12, 15]), i = pick([4, 5, 6]); return q(`A business has assets of ${D(A)}, debt of ${D(Dd)} at ${i}% interest, and assets that earn ${g}%. What is its profit after paying interest, in dollars? (dollars)`, r2(A * g / 100 - Dd * i / 100),
        "Find what the assets earn, then take away the interest.", "Assets × return - debt × interest rate.",
        () => { const a = pick([500, 800]), b = pick([200, 300]), c = pick([10, 20]), d = pick([5, 10]); return `Example: assets ${D(a)} at ${c}% earn ${D(a * c / 100)}; debt ${D(b)} at ${d}% costs ${D(b * d / 100)}; profit ${D(a * c / 100 - b * d / 100)}. Now do yours.`; }); },
    () => mcq("A company borrows at 7% and invests the money in assets that earn only 4%. Leverage...", "lowers the return on equity", ["raises the return on equity", "has no effect"],
      "Compare what the assets earn with what the debt costs.", "Money borrowed at a higher cost than it earns eats into the owners' profit.",
      "Example: borrow at 8% to earn 12% adds to the owners' gains; borrow at 8% to earn 5% subtracts from them. Now do yours.")
  ], [["Borrowing to invest", "🏗️", "<b>Leverage</b> uses debt to control more assets with the same equity."], ["Magnifies both ways", "↕️", "If assets earn more than the interest rate, owners gain more. If they earn less, owners lose more."], ["Formula", "🧮", "ROE = (assets × asset return - debt × interest rate) ÷ equity."]]));

  l27.push(nL("CAPM: required return", [
    () => { const rf = pick([2, 3, 4]), rm = rf + pick([4, 5, 6, 8]), b = pick([0.5, 0.8, 1, 1.2, 1.5, 2]); return q(`The risk-free rate is ${rf}%, the expected market return is ${rm}% and a stock's beta is ${b}. By CAPM, what return should investors require, as a percent? (percent)`, r2(rf + b * (rm - rf)),
        "CAPM adds a risk premium to the risk-free rate.", "Required return = risk-free + beta × (market return - risk-free).",
        () => { const x = pick([2, 3]), y = pick([8, 9]), bb = pick([1.5, 2]); return `Example: ${x}% + ${bb} × (${y}% - ${x}%) = ${r2(x + bb * (y - x))}%. Now do yours.`; }); },
    () => { const rf = pick([2, 3, 4]), rm = rf + pick([4, 5, 6, 8]); return q(`The risk-free rate is ${rf}% and the expected market return is ${rm}%. What is the market risk premium, as a percent? (percent)`, rm - rf,
        "The premium is the extra return investors want for taking market risk.", "Market return minus risk-free rate.",
        () => { const a = pick([2, 3]), b = pick([9, 10]); return `Example: ${b}% - ${a}% = ${b - a}%. Now do yours.`; }); },
    () => { const it = pick([
      ["A stock with a beta above 1 tends to...", "move more than the market", ["move less than the market", "move exactly with the market"], "Beta measures sensitivity to market moves.", "Above 1 means amplified."],
      ["A stock with a beta of exactly 1 tends to...", "move with the market", ["move twice as much", "never move"], "Beta of 1 is the market's own level.", "It matches the market."],
      ["A stock with a beta below 1 (but above 0) tends to...", "move less than the market", ["move more than the market", "move opposite to the market"], "It is calmer than the market.", "Below 1 dampens moves."],
      ["Beta measures which kind of risk?", "market risk that cannot be diversified away", ["risk specific to one company only", "the chance of a tax change"], "It compares a stock with the whole market.", "It is the systematic kind."]]);
      return mcq(it[0], it[1], it[2], it[3], it[4], "Example: if the market rises 10% and a stock with beta 1.5 follows typically, the stock tends to rise about 15%. Now do yours."); }
  ], [["Risk and reward", "⚖️", "Investors want extra return for extra risk. <b>CAPM</b> puts a number on it."], ["Formula", "🧮", "<b>Required return = risk-free rate + beta × (market return - risk-free rate).</b>"], ["Beta", "📶", "<b>Beta</b> measures how strongly a stock moves with the market. 1 = same as market, above 1 = bigger swings. General education, not advice."]]));

  l27.push(nL("Perpetuities", [
    () => { const C = pick([30, 50, 60, 100, 120]), r = pick([4, 5, 6, 8, 10]); return q(`An asset pays ${D(C)} every year forever, and the required return is ${r}%. What is it worth today (PV = payment ÷ rate), in dollars? (dollars)`, r2(C * 100 / r),
        "A perpetuity's value is the payment divided by the rate.", "Use the rate as a decimal.",
        () => { const a = pick([20, 40]), b = pick([5, 10]); return `Example: ${D(a)} a year at ${b}%: ${a} ÷ ${b / 100} = ${D(a * 100 / b)}. Now do yours.`; }); },
    () => { const g = pick([1, 2, 3]), d = pick([2, 4, 5, 8]), r = g + d, C = pick([40, 60, 100]); return q(`A stock will pay ${D(C)} next year, and its payments will grow ${g}% a year forever. The required return is ${r}%. Its value is the payment ÷ (rate - growth). What is the value in dollars? (dollars)`, r2(C * 100 / d),
        "With growth, subtract the growth rate from the required return first.", "Value = next payment ÷ (r - g).",
        () => { const a = pick([30, 50]), b = pick([3, 6]), c = pick([2, 4]); return `Example: ${D(a)} next year, r = ${b + c}%, g = ${c}%: ${a} ÷ ${b / 100} = ${D(a * 100 / b)}. Now do yours.`; }); },
    () => { const V = pick([1000, 2000, 5000]), r = pick([4, 5, 6, 8]); return q(`A perpetuity is worth ${D(V)} today when the required return is ${r}%. How many dollars does it pay each year? (dollars)`, V * r / 100,
        "Rearrange: payment = value × rate.", "Take the rate (as a percent) of the value.",
        () => { const a = pick([500, 3000]), b = pick([5, 10]); return `Example: ${D(a)} at ${b}% pays ${D(a * b / 100)} a year. Now do yours.`; }); }
  ], [["Forever payments", "♾️", "A <b>perpetuity</b> pays the same amount every period forever."], ["Value", "💎", "<b>PV = C ÷ r.</b> A $50 yearly payment at 5% is worth $1,000 today."], ["Growing", "🌳", "If payments grow at rate g: <b>PV = C₁ ÷ (r - g)</b>. This idea underlies dividend-based stock valuation."]]));

  l27.push(nL("Why losses hurt more", [
    () => { const V = pick([100, 200, 1000]), u = pick([20, 25, 50, 100]), d = pick([20, 40, 50]); return q(`${D(V)} grows ${u}% in year one, then falls ${d}% in year two. What is the value at the end of year two? (dollars)`, r2(V * (1 + u / 100) * (1 - d / 100)),
        "Each percent change applies to the new value, not the original.", "Multiply by (1 + gain) and then by (1 - loss).",
        () => { const a = pick([200, 400]), b = pick([10, 30]), c = pick([10, 20]); return `Example: ${D(a)} up ${b}% is ${D(a * (100 + b) / 100)}, then down ${c}% is ${D(a * (100 + b) / 100 * (100 - c) / 100)}. Now do yours.`; }); },
    () => { const V = pick([100, 500, 1000]), a = pick([10, 20]), b = pick([10, 20, 30]); return q(`${D(V)} grows ${a}% in year one and ${b}% in year two. What is the value at the end of year two? (dollars)`, r2(V * (1 + a / 100) * (1 + b / 100)),
        "Growth compounds: the second gain applies to the bigger amount.", "Multiply by (1 + first rate) and then by (1 + second rate).",
        () => { const x = pick([200, 400]), y = pick([10, 50]), z = pick([10, 50]); return `Example: ${D(x)} up ${y}% is ${D(x * (100 + y) / 100)}, then up ${z}% is ${D(r2(x * (100 + y) * (100 + z) / 10000))}. Now do yours.`; }); },
    () => { const p = pick([[50, 50], [100, 50], [25, 20], [20, 20], [10, 10], [50, 25]]); const f = (1 + p[0] / 100) * (1 - p[1] / 100); const ans = Math.abs(f - 1) < 1e-9 ? "exactly the same" : f > 1 ? "higher than the start" : "lower than the start";
      return mcq(`An investment rises ${p[0]}% in year one and then falls ${p[1]}% in year two. After two years the value is...`, ans, ["exactly the same", "higher than the start", "lower than the start"].filter(x => x !== ans),
        "Multiply the two growth factors instead of adding the percents.", "A factor above 1 grows the money; a factor below 1 shrinks it. Is the product above, below or at 1?",
        "Example: up 100% then down 50% gives 2 × 0.5 = 1, the same. Up 20% then down 20% gives 1.2 × 0.8 = 0.96, lower. Now do yours."); }
  ], [["Growth factors", "✖️", "A gain of 20% is a factor of <b>1.20</b>. A loss of 20% is a factor of <b>0.80</b>."], ["Multiply, don't add", "🧮", "After two periods, value = start × factor₁ × factor₂."], ["Losses hurt", "📉", "A 50% loss needs a <b>100% gain</b> to get back. Up 20% then down 20% leaves you below the start."]]));

  l27.push(mixOf("Mixed practice", [l27[0], l27[1], l27[2], l27[3], l27[4], l27[5], l27[6], l27[7]]));
  l27.push(mixOf("Level 27 Challenge", [l27[8], l27[9], l27[10], l27[11], l27[12], l27[13], l27[14], l27[15], l27[16], l27[17]]));

  Object.assign(MONEY_LEVELS, { 25: l25, 26: l26, 27: l27 });
})();
