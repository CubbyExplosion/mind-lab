// ext/geo-16-18.js : Mind Lab Geography levels 16-18 (60 lessons)
(() => {
  const slide = (h, v, t) => ({ h, v, t });
  const LS = (title, make) => ({ title, make });
  const fmt = n => n.toLocaleString("en-US");
  const first = s => {
    const c = String(s).replace(/^(a|an|the)\s+/i, "").replace(/<[^>]+>/g, "")[0];
    return /[A-Za-z]/.test(c) ? c.toUpperCase() : null;
  };
  const clue = (c, a) => { const f = first(a); return f ? `${c} The answer starts with the letter "${f}".` : `${c} Cross out the choices that cannot be right.`; };

  // Multiple choice. s = 3 slides, n = nudge, c = clue, items = [question, right, "wrong1|wrong2", optional picture]
  const MC = (s, n, c, items) => {
    const make = () => {
      const [q, a, w, v] = pick(items), ex = pick(items.filter(x => x[1] !== a && x[0] !== q));
      const r = { text: q, choices: shuf([a, ...w.split("|")]), answer: a, hints: [n, clue(c, a), `Example: "${ex[0]}" The answer is "${ex[1]}". Now do yours.`] };
      if (v) r.visual = v;
      return r;
    };
    make.teach = () => s.map(x => slide(x[0], x[1], x[2]));
    return make;
  };
  const MX = (lessons, idxs) => {
    const ms = idxs.map(i => lessons[i].make), f = () => pick(ms)();
    f.teach = () => [slide("Review time!", "🔄", "This lesson mixes ideas you already learned. Here is a quick reminder of each one, then the quiz.")].concat(ms.map(m => m.teach()[0]));
    return f;
  };
  const NUM = (s, fn) => { fn.teach = () => s.map(x => slide(x[0], x[1], x[2])); return fn; };
  const uniq = arr => arr.filter((x, i) => arr.indexOf(x) === i);

  // ---------- number makers ----------
  const GDPPP = NUM([
    ["What is GDP?", "💰 🏭", "<b>GDP</b> (gross domestic product) is the value of everything a country makes and sells in one year, both goods and services."],
    ["GDP per person", "➗", "<b>GDP per person</b> = GDP ÷ population. It shows the average amount of money made for each person."],
    ["Example", "📝", "A country has a GDP of $91 billion and 7 million people. $91 billion ÷ 7 million = $13,000 per person. A high number often means richer on average, but it does not show how fairly the money is shared."]
  ], () => {
    const p = pick([2, 4, 5, 10, 20, 25, 40, 50]), k = 5 * ri(1, 12), G = p * k, m = Math.random();
    if (m < 0.4) return {
      text: `A country has a GDP of $${G} billion and ${p} million people. What is its GDP per person, in dollars?`, answer: k * 1000,
      hints: ["GDP per person means the GDP shared out between all the people.", "Divide the GDP by the number of people. A billion is 1,000 times a million.", "Example: GDP $91 billion, 7 million people. 91 billion ÷ 7 million = $13,000 each. Now do yours."]
    };
    if (m < 0.7) return {
      text: `${p} million people live in a country. The GDP per person is $${fmt(k * 1000)}. What is the total GDP, in billions of dollars?`, answer: G,
      hints: ["Total GDP is what all the people make together.", "Multiply the GDP per person by the number of people. Thousands times millions gives billions.", "Example: 7 million people at $13,000 each. 7 x 13 = 91, so the GDP is $91 billion. Now do yours."]
    };
    return {
      text: `A country has a GDP of $${G} billion. The GDP per person is $${fmt(k * 1000)}. How many million people live there?`, answer: p,
      hints: ["The total GDP was shared out among the people.", "Divide the total GDP by the amount for each person. Billions divided by thousands gives millions.", "Example: GDP $91 billion and $13,000 each. 91 ÷ 13 = 7, so there are 7 million people. Now do yours."]
    };
  });

  const RULE70 = NUM([
    ["Doubling time", "📈 ✌️", "If something grows by the same percent every year, it takes a steady time to <b>double</b>. This works for populations and money."],
    ["The rule of 70", "🧮", "<b>Years to double = 70 ÷ growth rate (%)</b>. At 10% growth a population doubles in 70 ÷ 10 = 7 years."],
    ["Using it", "💡", "Growth of 2% a year: 70 ÷ 2 = 35 years to double. A faster rate means a shorter doubling time. After doubling twice, a population is 4 times as big."]
  ], () => {
    const m = Math.random();
    if (m < 0.35) { const r = pick([1, 2, 5, 14, 35]); return {
      text: `A country's population grows ${r}% every year. Using the rule of 70, about how many years will it take to double?`, answer: 70 / r,
      hints: ["Use the rule of 70.", "Divide 70 by the growth rate (the percent).", "Example: growth of 10% a year. 70 ÷ 10 = 7 years to double. Now do yours."]
    }; }
    if (m < 0.65) { const n = pick([2, 5, 14, 35, 70]); return {
      text: `A population doubles in about ${n} years. Using the rule of 70, what is the yearly growth rate (in percent)?`, answer: 70 / n,
      hints: ["Use the rule of 70 backwards.", "Divide 70 by the number of years to double.", "Example: it doubles in 7 years. 70 ÷ 7 = 10, so the growth rate is 10% a year. Now do yours."]
    }; }
    const s = pick([2, 3, 4, 5, 6, 8]), r = pick([1, 2, 5, 14, 35]), k = pick([1, 2]), y = 70 / r * k;
    return {
      text: `A town has ${s} thousand people and grows ${r}% a year. About how many thousand people will it have after ${y} years?`, answer: s * Math.pow(2, k),
      hints: ["First work out how long one doubling takes (70 ÷ the rate). Then count the doublings.", "Count how many doubling times fit in the years. Each doubling multiplies the people by 2.", "Example: 5 thousand people, 10% growth. One doubling = 7 years. In 14 years that is 2 doublings: 5 x 2 x 2 = 20 thousand. Now do yours."]
    };
  });

  const URBAN = NUM([
    ["Urban and rural", "🏙️ 🌾", "<b>Urban</b> places are towns and cities. <b>Rural</b> places are the countryside. Today more than half of all people on Earth live in cities."],
    ["Percent urban", "%", "The <b>urban percent</b> tells how many out of every 100 people live in cities. Urban people = total people x percent ÷ 100."],
    ["Example", "📝", "A country has 150 million people and 14% are urban. 150 x 14 ÷ 100 = 21 million urban people. The rest are rural: 150 - 21 = 129 million."]
  ], () => {
    const T = pick([20, 40, 50, 60, 80, 100, 200, 500]), p = pick([20, 30, 40, 50, 60, 70, 80, 90]), u = T * p / 100, m = Math.random();
    if (m < 0.4) return {
      text: `A country has ${T} million people. ${p}% of them live in cities. How many million people are urban?`, answer: u,
      hints: ["Find the part of the country that lives in cities.", "Multiply the total by the percent, then divide by 100.", "Example: 150 million people, 14% urban. 150 x 14 ÷ 100 = 21 million. Now do yours."]
    };
    if (m < 0.7) return {
      text: `A country has ${T} million people. ${p}% of them live in cities. How many million people live in the countryside (rural)?`, answer: T - u,
      hints: ["The question asks about the people who do NOT live in cities.", "Find the urban people first, then take them away from the total.", "Example: 150 million people, 14% urban = 21 million. Rural = 150 - 21 = 129 million. Now do yours."]
    };
    return {
      text: `A country has ${T} million people and ${u} million of them live in cities. What percent of the people are urban?`, answer: p,
      hints: ["Compare the city people to the whole country.", "Divide the urban people by the total, then multiply by 100.", "Example: 150 million people and 21 million urban. 21 ÷ 150 = 0.14, which is 14%. Now do yours."]
    };
  });

  const GRAPH = NUM([
    ["Bar graphs", "📊", "A <b>bar graph</b> uses bars to compare numbers. A longer bar means a bigger number. Geographers use graphs for rainfall, population and trade."],
    ["Reading a graph", "👀", "Read the <b>title</b> and the <b>units</b> first (such as thousands of visitors). Then compare the bars, or read the number beside each bar."],
    ["Using the numbers", "➕ ➖", "To find <b>how many more</b>, subtract the smaller number from the bigger. To find a <b>total</b>, add the numbers. Example: bars of 7 and 12 differ by 5 and total 19."]
  ], () => {
    const names = shuf(["Park A", "Park B", "Park C", "Park D", "Park E"]), vals = shuf([20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]).slice(0, 5);
    const bars = names.map((n, i) => `<div style="display:flex;align-items:center;gap:6px"><span style="width:56px">${n}</span><span style="display:inline-block;height:14px;background:#4a90d9;width:${vals[i] * 1.5}px"></span><b>${vals[i]}</b></div>`).join("");
    const head = `Visitors to five parks (in thousands per year):${bars}`;
    const order = vals.map((v, i) => i).sort((a, b) => vals[b] - vals[a]);
    const m = Math.random();
    if (m < 0.25) { const a = order[0]; return { text: head + "Which park had the most visitors?", choices: shuf([names[a], ...shuf(names.filter((_, i) => i !== a)).slice(0, 3)]), answer: names[a],
      hints: ["Look for the longest bar.", "Compare the numbers at the end of the bars. The biggest number wins.", "Example: bars of 7, 12 and 9. The biggest is 12, so that bar is the answer. Now do yours."] }; }
    if (m < 0.45) { const a = order[4]; return { text: head + "Which park had the fewest visitors?", choices: shuf([names[a], ...shuf(names.filter((_, i) => i !== a)).slice(0, 3)]), answer: names[a],
      hints: ["Look for the shortest bar.", "Compare the numbers at the end of the bars. The smallest number wins.", "Example: bars of 7, 12 and 9. The smallest is 7, so that bar is the answer. Now do yours."] }; }
    const i = ri(0, 4), j = (i + ri(1, 4)) % 5, hi = Math.max(i, j) === i && vals[i] > vals[j] ? i : (vals[j] > vals[i] ? j : i), lo = hi === i ? j : i;
    if (m < 0.75) return { text: head + `How many thousand more visitors did ${names[hi]} have than ${names[lo]}?`, answer: vals[hi] - vals[lo],
      hints: ["The question asks for a difference.", "Subtract the smaller number from the bigger number.", "Example: bars of 12 and 7. 12 - 7 = 5 more. Now do yours."] };
    return { text: head + `How many thousand visitors did ${names[i]} and ${names[j]} have together?`, answer: vals[i] + vals[j],
      hints: ["Together means putting the numbers together.", "Add the two numbers.", "Example: bars of 12 and 7. 12 + 7 = 19. Now do yours."] };
  });

  const DEPEND = NUM([
    ["Who depends on whom?", "👶 👴", "<b>Dependents</b> are people who are usually too young (under 15) or too old (over 64) to work. <b>Working-age</b> people (15 to 64) earn money and pay taxes."],
    ["Counting dependents", "➕", "Dependents = young + old. Working-age = 100 - dependents (when we count per 100 people). A country with many dependents has a heavier load on its workers."],
    ["Dependency ratio", "⚖️", "<b>Dependency ratio</b> = dependents ÷ working-age people x 100. Example: 20 dependents and 40 workers: 20 ÷ 40 x 100 = 50 dependents for every 100 workers."]
  ], () => {
    const m = Math.random();
    if (m < 0.35) { const y = pick([15, 20, 25, 30, 35]), o = pick([5, 10, 15, 20]); return {
      text: `In a country, ${y} out of every 100 people are under 15 and ${o} out of every 100 are over 64. How many out of every 100 are dependents?`, answer: y + o,
      hints: ["Dependents are the young AND the old.", "Add the two groups together.", "Example: 12 young and 7 old out of 100. 12 + 7 = 19 dependents. Now do yours."]
    }; }
    if (m < 0.65) { const y = pick([15, 20, 25, 30, 35]), o = pick([5, 10, 15, 20]); return {
      text: `In a country, ${y} out of every 100 people are under 15 and ${o} out of every 100 are over 64. How many out of every 100 are working-age (15 to 64)?`, answer: 100 - y - o,
      hints: ["The working-age people are everyone who is not young and not old.", "Add the young and the old, then take that away from 100.", "Example: 12 young and 7 old out of 100. 12 + 7 = 19. 100 - 19 = 81 working-age. Now do yours."]
    }; }
    const c = pick([[50, 25, 25, 100], [80, 12, 8, 25], [80, 5, 15, 25], [40, 45, 15, 150], [40, 40, 20, 150], [50, 10, 40, 100], [50, 35, 15, 100]]);
    return {
      text: `Out of every 100 people, ${c[1]} are under 15, ${c[2]} are over 64 and ${c[0]} are working-age. How many dependents are there for every 100 workers?`, answer: c[3],
      hints: ["Find the dependents first, then compare them with the workers.", "Add the young and the old, divide by the workers, then multiply by 100.", "Example: 20 dependents and 40 workers. 20 ÷ 40 x 100 = 50 dependents for every 100 workers. Now do yours."]
    };
  });

  const TRADE = NUM([
    ["Exports and imports", "🚢 📦", "<b>Exports</b> are goods a country sells to other countries. <b>Imports</b> are goods it buys from other countries."],
    ["Trade balance", "⚖️", "<b>Trade balance</b> = exports - imports. If exports are bigger, the country has a <b>trade surplus</b>. If imports are bigger, it has a <b>trade deficit</b>."],
    ["Example", "📝", "Exports $47 billion, imports $32 billion. 47 - 32 = $15 billion <b>surplus</b>. If the numbers were switched, it would be a $15 billion deficit."]
  ], () => {
    const E = ri(3, 20) * 10, I = ri(3, 20) * 10, m = Math.random();
    const big = Math.max(E, I), small = Math.min(E, I);
    if (E === I) return TRADE();
    if (m < 0.3) return {
      text: `A country exports $${big} billion of goods and imports $${small} billion. What is its trade surplus, in billions of dollars?`, answer: big - small,
      hints: ["A surplus is the extra that is left when we compare what is sold with what is bought.", "Subtract imports from exports.", "Example: exports $47 billion, imports $32 billion. 47 - 32 = $15 billion. Now do yours."]
    };
    if (m < 0.55) return {
      text: `A country exports $${small} billion of goods and imports $${big} billion. What is its trade deficit, in billions of dollars?`, answer: big - small,
      hints: ["A deficit is how much MORE is bought than sold.", "Take the smaller number away from the bigger number.", "Example: exports $32 billion, imports $47 billion. 47 - 32 = $15 billion deficit. Now do yours."]
    };
    if (m < 0.75) { const s = ri(1, 9) * 5 + 3, im = ri(5, 15) * 10; return {
      text: `A country imports $${im} billion and has a trade surplus of $${s} billion. How many billions of dollars does it export?`, answer: im + s,
      hints: ["A surplus means exports are bigger than imports.", "Add the surplus to the imports.", "Example: imports $28 billion and a surplus of $9 billion. Exports = 28 + 9 = $37 billion. Now do yours."]
    }; }
    return {
      text: `A country exports $${E} billion and imports $${I} billion. Does it have a trade surplus or a trade deficit?`, choices: ["A trade surplus", "A trade deficit"], answer: E > I ? "A trade surplus" : "A trade deficit",
      hints: ["Compare the two numbers. Which one is bigger?", "If the country sells more than it buys, that is good for the balance. If it buys more than it sells, it is the other one.", "Example: exports $47 billion and imports $32 billion. Exports are bigger, so it is a surplus. Now do yours."]
    };
  });

  const RATE1000 = NUM([
    ["Rates per 1,000", "👶 📊", "A <b>rate per 1,000</b> tells us how many for every 1,000. The <b>infant mortality rate</b> is the number of babies who die before age 1 for every 1,000 babies born."],
    ["Using a rate", "🧮", "Deaths = births ÷ 1,000 x rate. Example: 4,000 babies are born and the rate is 7 per 1,000. 4,000 ÷ 1,000 = 4 groups of 1,000. 4 x 7 = 28 babies."],
    ["Backwards", "↩️", "To find the rate, work out how many groups of 1,000 there are, then divide the deaths by that. Example: 28 deaths among 4,000 births is 28 ÷ 4 = 7 per 1,000."]
  ], () => {
    const m = Math.random();
    if (m < 0.45) { const B = pick([2000, 5000, 10000, 20000, 50000, 100000]), r = pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]); return {
      text: `In one year ${fmt(B)} babies are born in a region. The infant mortality rate is ${r} per 1,000 births. How many babies die before age 1?`, answer: B / 1000 * r,
      hints: ["First find how many groups of 1,000 there are in the births.", "Multiply the number of groups of 1,000 by the rate.", "Example: 4,000 births and a rate of 7 per 1,000. 4 groups x 7 = 28. Now do yours."]
    }; }
    if (m < 0.8) { const B = pick([1000, 2000, 5000, 10000]), r = pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]); return {
      text: `In a region ${fmt(B)} babies were born and ${B / 1000 * r} died before age 1. What is the infant mortality rate per 1,000 births?`, answer: r,
      hints: ["The rate is for every 1,000 births.", "Divide the deaths by the number of groups of 1,000 births.", "Example: 28 deaths among 4,000 births. 4 groups of 1,000. 28 ÷ 4 = 7 per 1,000. Now do yours."]
    }; }
    const P = pick([2000, 5000, 10000, 20000, 50000]), r = pick([8, 10, 12, 15, 20, 25, 30]); return {
      text: `A town has ${fmt(P)} people. The birth rate is ${r} per 1,000 people. How many babies are born in a year?`, answer: P / 1000 * r,
      hints: ["The birth rate is for every 1,000 people.", "Find the groups of 1,000 people, then multiply by the rate.", "Example: 4,000 people and a rate of 7 per 1,000. 4 x 7 = 28 babies. Now do yours."]
    };
  });

  const WATER = NUM([
    ["How much water do we use?", "🚿 💧", "People use water to drink, cook, wash and flush. In many rich countries one person uses well over 100 liters a day. Where water is scarce, people may have only a few liters."],
    ["Multiply it out", "✖️", "Water used = people x liters each x days. Example: 3 people use 85 liters each per day: 3 x 85 = 255 liters a day. In a week: 255 x 7 = 1,785 liters."],
    ["Saving water", "🌍", "Small savings add up. A short shower, a fixed leaky tap and a full washing machine save water for everyone, and water is a limited resource."]
  ], () => {
    const m = Math.random();
    if (m < 0.3) { const n = ri(2, 6), L = pick([100, 120, 150, 200]); return {
      text: `A family of ${n} people uses ${L} liters of water each per day. How many liters does the whole family use in one day?`, answer: n * L,
      hints: ["Every person uses the same amount.", "Multiply the number of people by the liters for each person.", "Example: 3 people use 85 liters each. 3 x 85 = 255 liters. Now do yours."]
    }; }
    if (m < 0.55) { const n = ri(2, 6), L = pick([100, 120, 150, 200]); return {
      text: `A family of ${n} people uses ${L} liters of water each per day. How many liters does the family use in a week (7 days)?`, answer: n * L * 7,
      hints: ["Find the family's use in one day first.", "Multiply the daily total by 7.", "Example: 3 people use 85 liters each. 3 x 85 = 255 a day. 255 x 7 = 1,785 a week. Now do yours."]
    }; }
    if (m < 0.8) { const L = ri(2, 12) * 5; return {
      text: `A leaking tap wastes ${L} liters every hour. How many liters does it waste in one day (24 hours)?`, answer: L * 24,
      hints: ["There are 24 hours in a day.", "Multiply the liters per hour by the number of hours.", "Example: a tap leaking 7 liters an hour for 24 hours wastes 7 x 24 = 168 liters. Now do yours."]
    }; }
    const N = pick([100, 200, 300, 500]), S = pick([5, 10, 15, 20]); return {
      text: `At a school, each of ${N} students saves ${S} liters of water per day with shorter showers at home. How many liters does the whole school save in 5 days?`, answer: N * S * 5,
      hints: ["Find the savings for one day first.", "Multiply the students by the liters each saves, then multiply by the number of days.", "Example: 40 students save 3 liters each per day. 40 x 3 = 120 a day. In 5 days: 120 x 5 = 600 liters. Now do yours."]
    };
  });

  const COMPOUND = NUM([
    ["Growing on top of growing", "📈", "When a population grows by a percent each year, the second year's growth is a percent of the <b>new, bigger</b> number, not the first number. This is called <b>compound growth</b>."],
    ["Step by step", "🪜", "Example: 400 people grow by 30% a year. Year 1: 400 + 30% of 400 = 400 + 120 = 520. Year 2: 520 + 30% of 520 = 520 + 156 = 676."],
    ["Shrinking too", "📉", "A falling population works the same way, but you take the percent away each year. Always use the number you have at the START of that year."]
  ], () => {
    const P = pick([100, 200, 500, 1000, 2000, 5000]), g = pick([10, 20, 50]), m = Math.random();
    const y1 = P * (100 + g) / 100, y2 = y1 * (100 + g) / 100, d1 = P * (100 - g) / 100;
    if (m < 0.3) return {
      text: `A town has ${fmt(P)} people. It grows by ${g}% in one year. How many people live there after that year?`, answer: y1,
      hints: ["Find the extra people first, then add them on.", "The extra people are the percent of the starting number.", "Example: 400 people grow by 30%. 30% of 400 = 120. 400 + 120 = 520. Now do yours."]
    };
    if (m < 0.7) return {
      text: `A town has ${fmt(P)} people. It grows by ${g}% in the first year and by ${g}% again in the second year. How many people live there after two years?`, answer: y2,
      hints: ["Do the growth one year at a time.", "For year two, take the percent of the NEW number from year one, not the starting number.", "Example: 400 grows by 30%: 520. Then 30% of 520 = 156, so 520 + 156 = 676. Now do yours."]
    };
    return {
      text: `A lake town has ${fmt(P)} people. The population falls by ${g}% in one year, then falls by ${g}% of the new number the next year. How many people are left after two years?`, answer: d1 * (100 - g) / 100,
      hints: ["Take the percent away each year.", "After year one, work out ${g}% of the smaller number. Subtract it again.".replace("${g}", "the same percent"), "Example: 400 falls by 30%: 400 - 120 = 280. Then 30% of 280 = 84, so 280 - 84 = 196. Now do yours."]
    };
  });

  // ================= LEVEL 16 (7th grade, second half) =================
  const l16 = [
    LS("Immigrant, emigrant, refugee", MC([
      ["Moving between countries", "🧳 ✈️", "<b>Migration</b> means moving to live in a new place. Moving to another country is <b>international migration</b>. Moving inside one country is <b>internal migration</b>."],
      ["Two sides of a move", "↔️", "An <b>emigrant</b> leaves a country (think <b>ex</b>it). An <b>immigrant</b> arrives in a new country (think <b>in</b>). It is the same person seen from two countries."],
      ["Refugees", "🛟", "A <b>refugee</b> leaves home to be safe from danger, such as war or a disaster. A <b>tourist</b> only visits for a short time and goes home again."]],
      "Think about whether the person is going out of a country or coming in.", "Think of 'exit' for leaving and 'in' for arriving.",
      [["A person who moves INTO a new country to live there is an...", "Immigrant", "Emigrant|Tourist"], ["A person who leaves their own country to live somewhere else is an...", "Emigrant", "Immigrant|Explorer"],
       ["A family leaves their home because of a war and looks for a safe place. They are...", "Refugees", "Tourists|Commuters"], ["Moving from a village to a city in the same country is called...", "Internal migration", "International migration|Tourism"],
       ["Moving from one country to live in another is...", "International migration", "Internal migration|Commuting"], ["From Mexico's point of view, a Mexican who moves to Canada is an...", "Emigrant", "Immigrant|Refugee"],
       ["From Canada's point of view, a person who arrives from Mexico to live there is an...", "Immigrant", "Emigrant|Nomad"], ["Someone who visits a country for a short holiday is a...", "Tourist", "Immigrant|Emigrant"],
       ["The word 'emigrate' means to...", "Leave a country", "Enter a country|Visit a country"]])),
    LS("Types of economies", MC([
      ["Who decides?", "🏪 🏛️", "An <b>economy</b> is how people make, share and buy things. Different countries decide these things in different ways."],
      ["Four types", "4️⃣", "<b>Traditional</b>: customs and families decide, with farming and trading (<b>barter</b>). <b>Command</b>: the government decides what is made and the prices. <b>Market</b>: businesses and buyers decide, using supply and demand."],
      ["Mixed", "🤝", "Most countries today have a <b>mixed economy</b>. They have private businesses and a government that also runs services like roads, schools and hospitals."]],
      "Think about who makes the big choices: families, the government, buyers and sellers, or a mix.", "Match the key words: customs, government control, supply and demand, or a mix.",
      [["The government decides what is made, how much, and the prices. This is a...", "Command economy", "Market economy|Traditional economy"], ["People follow old customs, farm for themselves and swap goods. This is a...", "Traditional economy", "Command economy|Market economy"],
       ["Businesses and shoppers decide through supply and demand. This is a...", "Market economy", "Command economy|Traditional economy"], ["Most countries today have a...", "Mixed economy", "Pure command economy|Barter economy"],
       ["In a market economy, prices mostly depend on...", "Supply and demand", "The weather|A government list"], ["A country with private shops and also government-run schools and roads has a...", "Mixed economy", "Traditional economy|Command economy"],
       ["Trading goods by swapping them, without money, is called...", "Barter", "Taxes|Exports"], ["Families in a small village grow food for themselves. This is most like a...", "Traditional economy", "Command economy|Market economy"],
       ["Competition between businesses is a key feature of a...", "Market economy", "Command economy|Traditional economy"]])),
    LS("GDP per person", GDPPP),
    LS("Measuring well-being", MC([
      ["More than money", "❤️ 🏥", "Money is only one way to measure how well people live. Geographers also look at health and education. These numbers show a country's <b>quality of life</b>."],
      ["Key measures", "📏", "<b>Literacy rate</b>: the percent of adults who can read and write. <b>Life expectancy</b>: the average number of years a newborn is expected to live. <b>Infant mortality rate</b>: babies who die before age 1 for every 1,000 born."],
      ["HDI", "📊", "The UN's <b>Human Development Index (HDI)</b> joins three things: a long and healthy life, education, and a decent income. Clean water and health clinics help raise these numbers."]],
      "Think about what each measure counts: reading, years of life, or baby deaths.", "Health, education and income are the three parts of the HDI.",
      [["The percent of adults who can read and write is the...", "Literacy rate", "Birth rate|Density"], ["The average number of years a newborn is expected to live is the...", "Life expectancy", "Literacy rate|Growth rate"],
       ["Babies who die before age 1 for every 1,000 born is the...", "Infant mortality rate", "Life expectancy|Literacy rate"], ["The UN's Human Development Index joins income and health with...", "Education", "Land area|Climate"],
       ["Which sign shows better health care?", "Higher life expectancy", "Higher infant mortality|Lower life expectancy"], ["Which of these is NOT a part of the HDI?", "Land area", "Income|Health"],
       ["A country has a very high literacy rate. This means...", "Most adults can read and write", "Most people live in cities|Most people are rich"], ["Compared with rich countries, infant mortality in poor countries is usually...", "Higher", "Lower|The same"],
       ["Clean water, schools and clinics help raise a country's...", "Quality of life", "Land area|Population density"]])),
    LS("Where major religions began", MC([
      ["Religion and place", "🕊️ 🌍", "<b>Religion</b> is a part of culture. Many world religions began in one region and then spread by trade, travel and migration. Geographers study where they began and how they spread."],
      ["Southwest Asia and South Asia", "🕌 ⛪ 🕍", "<b>Judaism</b> and <b>Christianity</b> began in Southwest Asia (the Middle East). <b>Islam</b> began in <b>Mecca</b> on the Arabian Peninsula. <b>Jerusalem</b> is a holy city for all three."],
      ["More origins", "🛕", "<b>Hinduism</b> and <b>Buddhism</b> began in South Asia (India). <b>Sikhism</b> began in the Punjab region of South Asia. <b>Shinto</b> is the traditional religion of Japan."]],
      "Think about which region each religion began in.", "Judaism, Christianity and Islam share a region. Hinduism, Buddhism and Sikhism share another.",
      [["Hinduism began in...", "South Asia", "East Asia|Europe"], ["Buddhism began in...", "South Asia", "Africa|South America"], ["Islam began in the city of...", "Mecca", "Rome|Delhi"], ["Judaism and Christianity began in...", "Southwest Asia", "Northern Europe|East Asia"],
       ["Sikhism began in the Punjab region of...", "South Asia", "Europe|Southwest Asia"], ["Shinto is the traditional religion of...", "Japan", "Egypt|Brazil"], ["Which city is holy to Jews, Christians and Muslims?", "Jerusalem", "Mecca|Varanasi"],
       ["Religions spread across the world mainly by...", "Trade, travel and migration", "Weather|Volcanoes"], ["The Ganges river is sacred in...", "Hinduism", "Shinto|Sikhism only"]])),
    LS("Fronts and air masses", MC([
      ["Air masses", "🌬️ 🌡️", "An <b>air mass</b> is a huge body of air with the same temperature and moisture. A <b>front</b> is the boundary where two different air masses meet. Weather changes at fronts."],
      ["Cold and warm fronts", "🔵 🔴", "A <b>cold front</b> (blue triangles on a map): cold air pushes under warm air, bringing storms and then cooler weather. A <b>warm front</b> (red half-circles): warm air slides over cold air, bringing light rain and then warmer weather."],
      ["Pressure", "📉 📈", "<b>High pressure</b> usually means clear, calm weather. <b>Low pressure</b> usually means clouds, wind and storms. A <b>stationary front</b> does not move, so the same weather can last for days."]],
      "Think about which air is pushing and which air is rising.", "Blue is cold, red is warm. High pressure is calm; low pressure is stormy.",
      [["The boundary between two different air masses is a...", "Front", "Contour line|Delta"], ["Cold air pushing under warm air is a...", "Cold front", "Warm front|Stationary front"], ["Warm air sliding up over cold air is a...", "Warm front", "Cold front|Stationary front"],
       ["After a cold front passes, the temperature usually...", "Drops", "Rises|Stays exactly the same"], ["High pressure usually brings...", "Clear, calm weather", "Storms and clouds|Hurricanes"], ["Low pressure usually brings...", "Clouds and storms", "Clear, calm weather|Dry sunny days"],
       ["On a weather map, blue triangles show a...", "Cold front", "Warm front|Mountain"], ["On a weather map, red half-circles show a...", "Warm front", "Cold front|River"], ["A front that does not move is a...", "Stationary front", "Cold front|Warm front"],
       ["A huge body of air with the same temperature and moisture is an...", "Air mass", "Ocean current|Jet stream"]])),
    LS("Rain shadow", MC([
      ["Air over mountains", "⛰️ ☁️", "Wind carries moist air to a mountain range. The air is pushed up the <b>windward</b> side, cools, and its water vapor turns into clouds and rain. This is <b>orographic rain</b>."],
      ["The dry side", "🏜️", "After the air crosses the top, it has lost most of its water. It sinks down the <b>leeward</b> side, getting warmer and drier. The dry land there is called a <b>rain shadow</b>."],
      ["Examples", "📍", "Deserts of Nevada lie in the rain shadow of California's Sierra Nevada. Patagonia in Argentina is dry because the Andes block moist winds from the Pacific."]],
      "Think about which side the wind hits first and what happens to rising air.", "Rising air cools. Sinking air warms. Which side loses its water?",
      [["The side of a mountain facing the wind is the...", "Windward side", "Leeward side|Rain shadow"], ["The sheltered side of a mountain, away from the wind, is the...", "Leeward side", "Windward side|Summit"],
       ["Rising air cools and its water vapor forms...", "Clouds and rain", "Deserts|Fog on the ground only"], ["The dry area on the leeward side of mountains is called a...", "Rain shadow", "Watershed|Delta"], ["Which side of a mountain range usually gets more rain?", "Windward side", "Leeward side|Both exactly the same"],
       ["Patagonia is dry because the Andes block moist winds from the...", "Pacific Ocean", "Atlantic Ocean|Arctic Ocean"], ["Which dry state lies east of California's Sierra Nevada?", "Nevada", "Oregon|Florida"],
       ["Rain caused by air rising over mountains is called...", "Orographic rain", "Frontal rain|Acid rain"], ["Air that sinks down the leeward side becomes...", "Warmer and drier", "Cooler and wetter|Full of clouds"]])),
    LS("Köppen climate letters", MC([
      ["Five climate groups", "🌡️ 🗺️", "Scientists sort climates by temperature and rain using letters. This is the <b>Köppen system</b>. There are five main groups: A, B, C, D and E."],
      ["The letters", "🔤", "<b>A</b>: tropical (hot and wet, like rainforests). <b>B</b>: dry (deserts and steppes). <b>C</b>: temperate (mild winters). <b>D</b>: continental (cold winters, big changes between seasons). <b>E</b>: polar (always cold)."],
      ["Places", "📍", "Singapore is A. Cairo is B. London and the Mediterranean coast are C. Moscow and Chicago are D. Antarctica is E."]],
      "Think about whether the place is hot, dry, mild, very cold in winter, or always frozen.", "Learn the letters in order: tropical, dry, temperate, continental, polar.",
      [["Köppen group A is...", "Tropical", "Polar|Dry"], ["Köppen group B is...", "Dry", "Tropical|Continental"], ["Köppen group C is...", "Temperate (mild)", "Polar|Dry"], ["Köppen group D is...", "Continental", "Tropical|Temperate"], ["Köppen group E is...", "Polar", "Tropical|Dry"],
       ["Which group does the Amazon rainforest belong to?", "A", "B|E"], ["Which group does the Sahara belong to?", "B", "A|D"], ["Which group does Antarctica belong to?", "E", "C|A"], ["Which group has the coldest winters and big seasonal changes, such as Moscow?", "D", "C|B"],
       ["A mild, rainy climate such as London's belongs to group...", "C", "B|E"]])),
    LS("Soil", MC([
      ["What is soil?", "🌱 🪱", "<b>Soil</b> is made when rock slowly breaks down (weathering) and mixes with <b>humus</b>, which is rotted plants and animals. Soil takes hundreds or thousands of years to form."],
      ["Layers", "🥪", "<b>Topsoil</b> is the dark top layer, rich in humus. It is where plants grow best. <b>Subsoil</b> lies under it, with more clay and minerals. <b>Bedrock</b> is the solid rock below."],
      ["Good and poor soil", "🌾", "<b>Chernozem</b> ('black earth') in Ukraine and Russia is very fertile. Tropical rainforest soil is often poor, because heavy rain washes out nutrients. Farmers protect soil with <b>terraces</b> and <b>contour plowing</b>."]],
      "Think about the layers from the top down.", "Humus is the rich part. Bedrock is at the bottom.",
      [["The dark top layer of soil, best for plants, is the...", "Topsoil", "Bedrock|Subsoil"], ["The solid rock layer under the soil is the...", "Bedrock", "Topsoil|Humus"], ["Rotted plants and animals in soil are called...", "Humus", "Clay|Gravel"],
       ["Soil is formed when rock slowly...", "Breaks down", "Freezes solid|Disappears"], ["The layer just below the topsoil is the...", "Subsoil", "Bedrock|Humus"], ["Chernozem is famous as a very...", "Fertile soil", "Poor soil|Frozen soil"],
       ["Why is tropical rainforest soil often poor?", "Heavy rain washes away nutrients", "It never rains|It is too cold"], ["Farming on stepped fields on hillsides to save soil is called...", "Terracing", "Mining|Fishing"],
       ["Plowing across a slope, not up and down, helps stop soil...", "Erosion", "Weathering of rock|Humus"]])),
    LS("Wetlands and mangroves", MC([
      ["Wet lands", "🌿 💧", "A <b>wetland</b> is land that is covered with water for at least part of the year. A <b>marsh</b> has grasses. A <b>swamp</b> has trees. A <b>bog</b> is soft, mossy and full of peat."],
      ["Why they matter", "🛡️", "Wetlands soak up floods, clean the water, and are home to fish, birds and frogs. Famous ones: the <b>Everglades</b> (Florida), the <b>Pantanal</b> (Brazil), and the <b>Okavango Delta</b> (Botswana)."],
      ["Mangroves", "🌳", "<b>Mangroves</b> are trees that grow in salty water along tropical coasts. Their roots protect shores from storms and are a nursery for young fish."]],
      "Think about wet land and what grows there.", "Marshes have grasses, swamps have trees, bogs have moss.",
      [["Land covered with water for part of the year is a...", "Wetland", "Plateau|Dune"], ["A wetland with mostly trees is a...", "Swamp", "Marsh|Bog"], ["A wetland with mostly grasses is a...", "Marsh", "Swamp|Mesa"], ["The Everglades are a big wetland in...", "Florida", "Alaska|Nevada"],
       ["The Pantanal, the largest tropical wetland, is in...", "Brazil", "Egypt|Japan"], ["The Okavango Delta is in...", "Botswana", "Peru|Norway"], ["Trees that grow in salty water on tropical coasts are...", "Mangroves", "Cacti|Pines"],
       ["Mangrove roots help by...", "Protecting coasts from storms", "Making deserts|Melting glaciers"], ["How do wetlands help during heavy rain?", "They soak up extra water", "They make more rain|They freeze it"]])),
    LS("Plastic and ocean pollution", MC([
      ["Trash in the sea", "🌊 🥤", "Much ocean pollution comes from land. Rivers and wind carry <b>plastic</b> into the sea. Currents gather it into huge areas like the <b>Great Pacific Garbage Patch</b>. Plastic breaks into tiny <b>microplastics</b>."],
      ["Other pollution", "🛢️", "<b>Oil spills</b> coat coasts. Fertilizer washing off farms feeds too many algae, which use up oxygen and make <b>dead zones</b>, like the one in the Gulf of Mexico."],
      ["What can help?", "♻️", "Reduce, reuse and recycle. Use less single-use plastic, keep trash out of drains and rivers, and clean up beaches. Laws and ship rules help too."]],
      "Think about where ocean trash comes from.", "Most of it starts on land and is carried by rivers, wind and currents.",
      [["A huge area of floating trash in the Pacific is the...", "Great Pacific Garbage Patch", "Great Barrier Reef|Ring of Fire"], ["Tiny broken pieces of plastic are called...", "Microplastics", "Minerals|Plankton"], ["Most ocean plastic comes from...", "Land", "Fish|Volcanoes under the sea"],
       ["Fertilizer running into the sea can cause...", "Dead zones", "Icebergs|Tides"], ["A dead zone has too little...", "Oxygen", "Salt|Sunlight at the surface"], ["A spill of oil from a ship or well is an...", "Oil spill", "Algae bloom|Tsunami"],
       ["Which choice helps cut ocean pollution?", "Using less single-use plastic", "Dumping trash in rivers|Burning more oil"], ["The Gulf of Mexico dead zone is fed by fertilizer carried by the...", "Mississippi River", "Nile River|Amazon River"],
       ["The three Rs are reduce, reuse and...", "Recycle", "Remove|Replace"]])),
    LS("Rule of 70", RULE70),
    LS("Urban percent", URBAN),
    LS("Problems of fast-growing cities", MC([
      ["Growing too fast", "🏙️ 🚗", "When many people move to a city quickly, it may not build homes, roads, water pipes and schools fast enough. This causes problems."],
      ["Common problems", "⚠️", "<b>Traffic jams</b> and <b>air pollution</b>. Not enough homes, so people build <b>informal settlements</b> (called slums, shantytowns, or <b>favelas</b> in Brazil). Many lack clean water and sewers."],
      ["Solutions", "💡", "Cities can build <b>public transit</b>, affordable homes, water and sewer pipes, and parks. Good <b>city planning</b> helps."]],
      "Think about what a city needs for each new person.", "Problems come from too little housing, transport and clean water.",
      [["Homes built without permission, often with poor services, are called...", "Informal settlements", "Suburbs|Zoning areas"], ["In Brazil, informal settlements are called...", "Favelas", "Fjords|Oases"], ["Many cars in a growing city cause...", "Traffic jams and air pollution", "Fewer people|Cleaner air"],
       ["A good way to cut traffic is to build...", "Public transit", "More parking only|Longer roads for cars"], ["Without sewers and clean water, people in a city can get...", "Sick", "Taller|Richer"], ["Planning where homes, roads and parks go is called...", "City planning", "Erosion|Irrigation"],
       ["Why do people move to big cities?", "Hope for jobs and schools", "Cities have no people|Farms are always closed"], ["Cheap, safe homes that more people can pay for are called...", "Affordable housing", "Urban sprawl|Zoning laws only"],
       ["Planting parks and trees in a crowded city helps with...", "Heat and pollution", "Earthquakes|Tides"]])),
    LS("Tides", MC([
      ["The pull of the Moon", "🌙 🌊", "<b>Tides</b> are the daily rise and fall of the sea. They are caused mainly by the <b>Moon's gravity</b> pulling on the ocean. The Sun helps a little."],
      ["High and low", "⬆️ ⬇️", "Most coasts have <b>two high tides and two low tides</b> each day. Sea level at <b>high tide</b> is up the beach. At <b>low tide</b> the water goes back out."],
      ["Big and small tides", "🌕 🌑", "At new moon and full moon the Sun, Earth and Moon line up and make extra-big <b>spring tides</b>. At quarter moons we get small <b>neap tides</b>. The Bay of Fundy in Canada has some of the biggest tides in the world."]],
      "Think about what pulls on the ocean from space.", "Gravity from the Moon is the main cause. The tide rises and falls twice a day.",
      [["The main cause of tides is the gravity of the...", "Moon", "Wind|Earth's core"], ["Most coasts have how many high tides in a day?", "Two", "One|Five"], ["When the sea is at its highest on the beach, it is...", "High tide", "Low tide|Neap tide"],
       ["Extra-big tides at new and full moon are called...", "Spring tides", "Neap tides|Tsunamis"], ["Small tides at quarter moons are called...", "Neap tides", "Spring tides|High winds"], ["The Bay of Fundy in Canada is famous for its...", "Huge tides", "Coral reefs|Geysers"],
       ["Tides are the daily rise and fall of the...", "Sea", "Rivers' source|Air"], ["Tidal energy makes electricity from...", "Moving tidal water", "Burning coal|Volcanoes"], ["At low tide, the water has...", "Moved out from the shore", "Come up the beach|Frozen"]])),
    LS("Groundwater and aquifers", MC([
      ["Water under our feet", "💧 🪨", "Rain soaks into the ground and fills the spaces in soil and rock. This is <b>groundwater</b>. The top of the soaked zone is the <b>water table</b>."],
      ["Aquifers", "🛢️", "An <b>aquifer</b> is a layer of underground rock that holds lots of water. People dig <b>wells</b> to pump it. The <b>Ogallala Aquifer</b> lies under the Great Plains of the USA. The <b>Great Artesian Basin</b> is in Australia."],
      ["Careful!", "⚠️", "If we pump out water faster than rain refills it, the water table falls and wells can run dry. A <b>spring</b> is where groundwater comes naturally to the surface."]],
      "Think about water that is under the ground.", "An aquifer stores water. A well takes it out.",
      [["Water stored in the ground is called...", "Groundwater", "Runoff|Surface water"], ["The top of the soaked zone underground is the...", "Water table", "Bedrock|Canopy"], ["An underground layer of rock that holds water is an...", "Aquifer", "Oasis|Atoll"],
       ["People pump groundwater out using a...", "Well", "Delta|Dam"], ["The Ogallala Aquifer lies under the Great Plains of the...", "United States", "Australia|Brazil"], ["The Great Artesian Basin is in...", "Australia", "Canada|Egypt"],
       ["Pumping out water faster than it refills makes the water table...", "Fall", "Rise|Freeze"], ["Groundwater that flows naturally out of the ground is a...", "Spring", "Glacier|Strait"], ["Rain becomes groundwater by...", "Soaking into the ground", "Flowing into space|Freezing in clouds"]])),
    LS("Reading bar graphs", GRAPH),
    LS("Glacier landforms", MC([
      ["Ice that carves", "🧊 ⛰️", "Glaciers are slow rivers of ice. As they move they scrape and carve the land, leaving special landforms when they melt away."],
      ["Carved shapes", "🔺", "A <b>cirque</b> is a bowl-shaped hollow high on a mountain. An <b>arête</b> is a sharp ridge between cirques. A <b>horn</b> is a pointed peak, like the Matterhorn. A <b>U-shaped valley</b> is a wide valley with steep sides."],
      ["Dropped shapes", "🪨", "A <b>moraine</b> is a ridge or pile of rock and soil pushed and dropped by a glacier. An <b>erratic</b> is a big boulder carried far from where it began. A <b>fjord</b> is a glacier valley filled by the sea."]],
      "Think about whether the glacier carved the shape or dropped it.", "Cirques, arêtes, horns and U-shaped valleys are carved. Moraines are dropped.",
      [["A bowl-shaped hollow carved high on a mountain is a...", "Cirque", "Moraine|Delta"], ["A sharp ridge between two cirques is an...", "Arête", "Oasis|Estuary"], ["A pointed mountain peak carved by ice, like the Matterhorn, is a...", "Horn", "Mesa|Spit"],
       ["A wide valley with steep sides carved by a glacier is...", "U-shaped", "V-shaped|Flat-topped"], ["A pile of rock and soil dropped by a glacier is a...", "Moraine", "Cirque|Horn"], ["A big boulder carried far by a glacier is an...", "Erratic", "Arête|Atoll"],
       ["A deep glacier-carved inlet filled by the sea is a...", "Fjord", "Lagoon|Delta"], ["A river valley is usually shaped like a...", "V", "U|Circle"], ["Glaciers shape the land by...", "Scraping and carving", "Burning|Blowing sand"]])),
  ];
  l16.push(LS("Mixed practice", MX(l16, [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 17])));
  l16.push(LS("Level 16 Challenge", MX(l16, [2, 11, 12, 16, 0, 5, 7, 9, 13, 14, 15, 17])));

  // ================= LEVEL 17 (8th grade, first half) =================
  const l17 = [
    LS("The demographic transition", MC([
      ["A country's population story", "👶 ⚰️", "As countries develop, their birth and death rates change in a pattern. This pattern is the <b>demographic transition</b>. It has stages."],
      ["Four stages", "4️⃣", "<b>Stage 1</b>: high birth, high death, small stable population. <b>Stage 2</b>: death rate falls (better food, medicine, clean water) but birth rate stays high, so the population grows fast. <b>Stage 3</b>: birth rate falls, growth slows. <b>Stage 4</b>: low birth, low death, steady population."],
      ["Why births fall", "📉", "Births fall when more children survive, girls go to school, families move to cities, and people choose smaller families. Some countries now have very low birth rates and may shrink."]],
      "Think about which rate changes first, births or deaths.", "Death rates fall first. Birth rates fall later.",
      [["In which stage do both birth and death rates stay high?", "Stage 1", "Stage 2|Stage 4"], ["In which stage does the death rate fall while births stay high?", "Stage 2", "Stage 1|Stage 4"], ["In which stage does the population grow fastest?", "Stage 2", "Stage 1|Stage 4"],
       ["In which stage are birth and death rates both low?", "Stage 4", "Stage 1|Stage 2"], ["What usually falls first in the transition?", "Death rate", "Birth rate|Land area"], ["Which helps lower the death rate?", "Better medicine and clean water", "Fewer schools|More famine"],
       ["Which usually helps lower the birth rate?", "More education for girls", "Fewer doctors|Less food"], ["In stage 3, population growth...", "Slows down", "Speeds up greatly|Stops being counted"], ["The pattern of changing birth and death rates is the...", "Demographic transition", "Water cycle|Rock cycle"]])),
    LS("Fertility and replacement", MC([
      ["Fertility rate", "👪", "The <b>total fertility rate</b> is the average number of children a woman has in her life. It shows how fast a population may grow."],
      ["Replacement level", "⚖️", "About <b>2.1 children per woman</b> keeps a population steady. This is the <b>replacement level</b>. Below it, a population will shrink over time unless people move in. Above it, the population grows."],
      ["Around the world", "🌍", "Fertility is highest in some countries of Africa, like Niger and Chad. Japan and South Korea have fertility far below replacement, so they have aging populations."]],
      "Think about 2.1 as the steady line.", "Above the line grows, below the line shrinks.",
      [["The average number of children a woman has is the...", "Total fertility rate", "Death rate|Density"], ["The number of children per woman that keeps a population steady is about...", "2.1", "0.5|5.0"],
       ["If fertility stays well below 2.1, the population will...", "Shrink over time", "Grow quickly|Stay exactly the same"], ["If fertility is far above 2.1, the population will...", "Grow", "Shrink|Disappear"], ["Which country has fertility far below replacement?", "South Korea", "Niger|Chad"],
       ["Which country has among the highest fertility in the world?", "Niger", "Japan|Italy"], ["A population with many older people and few children is...", "Aging", "Growing very fast|Mostly rural"], ["Educating girls usually makes fertility...", "Fall", "Rise|Stay at 10"],
       ["A country with low fertility can avoid shrinking if...", "People move in", "Fewer people are born|Farms close"]])),
    LS("Dependents and workers", DEPEND),
    LS("Forced and voluntary migration", MC([
      ["Choice or no choice?", "🧳", "<b>Voluntary migration</b> means people choose to move, for work, school or family. <b>Forced migration</b> means people must leave, because of war, disaster or being forced by others."],
      ["Examples", "📜", "The <b>Gold Rush</b> drew people to California by choice. The <b>Great Migration</b> (about 1910 to 1970) saw millions of Black Americans move from the South to northern cities. The <b>Dust Bowl</b> in the 1930s drove farm families west."],
      ["Remember", "🤝", "Refugees and people moved by force had no choice. People who move for jobs usually do. Seasonal workers move for part of the year, then return home."]],
      "Ask yourself: did the people choose to go?", "Words like choose, job and school point to voluntary. War and disaster point to forced.",
      [["Moving to a new city to take a better job is...", "Voluntary migration", "Forced migration|Weather"], ["People who must flee a war are part of...", "Forced migration", "Voluntary migration|A holiday trip"],
       ["The Gold Rush in California drew people by...", "Choice", "Force|A hurricane"], ["The Great Migration saw many Black Americans move from the...", "South to northern cities", "Coast to the desert|North to Canada only"],
       ["The Dust Bowl farm families left the Great Plains because of...", "Drought and dust storms", "A flood from a dam|A gold rush"], ["Workers who move for part of the year and then go home are...", "Seasonal workers", "Refugees|Explorers"],
       ["Moving from a farm to a city in the same country is...", "Internal migration", "International migration|Exporting"], ["A volcano erupts and families leave their homes. This move is...", "Forced", "Voluntary|A tourist trip"],
       ["Students who move to another country to study usually choose to go, so it is...", "Voluntary migration", "Forced migration|A refugee move"]])),
    LS("Nations and states", MC([
      ["Country words", "🏳️", "A <b>state</b> (or country) has borders, a government and people. A <b>nation</b> is a group of people who share a culture, language and history. They are not always the same thing."],
      ["Nation-state", "🎌", "A <b>nation-state</b> is a country where most people belong to one nation, like Japan or Iceland. Many countries have many nations or cultures, like India, Canada and Switzerland. They are <b>multicultural</b>."],
      ["Power", "📜", "<b>Sovereignty</b> means a state rules itself and no one else rules it. A <b>colony</b> is ruled by another country. Many colonies became independent in the 1900s."]],
      "Think about the difference between land and government, and a group of people with a shared culture.", "A state is about borders and rule. A nation is about people and culture.",
      [["A group of people who share culture, language and history is a...", "Nation", "State|Colony"], ["A land with borders and a government is a...", "State (country)", "Nation only|Tribe only"], ["A country where most people belong to one nation is a...", "Nation-state", "Colony|Empire"],
       ["Which country is a nation-state?", "Iceland", "India|Canada"], ["Which country has many cultures and languages?", "India", "Iceland|Japan"], ["Ruling itself with no outside ruler is called...", "Sovereignty", "Migration|Export"],
       ["A land ruled by another country is a...", "Colony", "Nation-state|Capital"], ["A country with many different cultures is called...", "Multicultural", "Landlocked|Volcanic"], ["Switzerland has several languages, so it is...", "Multicultural", "A colony|A nation-state only"]])),
    LS("Enclaves and exclaves", MC([
      ["Odd borders", "🗺️", "Some borders are natural, like rivers or mountains (the Rio Grande between the USA and Mexico). Others are straight lines, like the 49th parallel between the USA and Canada."],
      ["Enclave", "🔵", "An <b>enclave</b> is a country or area completely surrounded by another country. <b>Lesotho</b> is surrounded by South Africa. <b>Vatican City</b> is surrounded by Italy."],
      ["Exclave", "🔶", "An <b>exclave</b> belongs to one country but is cut off from it. <b>Alaska</b> is an exclave of the USA. <b>Kaliningrad</b> is an exclave of Russia."]],
      "Think about being inside another country or cut off from your own.", "Enclave is inside. Exclave is cut off.",
      [["A country completely surrounded by another country is an...", "Enclave", "Exclave|Island"], ["Lesotho is surrounded by...", "South Africa", "Kenya|Egypt"], ["Vatican City is surrounded by...", "Italy", "France|Spain"],
       ["A part of a country cut off from the main country is an...", "Exclave", "Enclave|Estuary"], ["Alaska is an exclave of the...", "United States", "Canada|Russia"], ["Kaliningrad is an exclave of...", "Russia", "Poland|Lithuania"],
       ["A border that follows a river or mountain range is a...", "Natural border", "Straight-line border|Time border"], ["Part of the USA-Canada border follows a straight line called the...", "49th parallel", "Prime Meridian|Equator"], ["The Rio Grande forms part of the border between the USA and...", "Mexico", "Canada|Cuba"]])),
    LS("Landlocked countries", MC([
      ["No coast", "🏔️", "A <b>landlocked</b> country has no coast on the ocean. About 44 countries are landlocked. They must use ports in neighboring countries to ship goods."],
      ["Examples", "📍", "Asia: Mongolia, Nepal, Kazakhstan, Afghanistan. Europe: Switzerland, Austria, Hungary, Czechia. Africa: Ethiopia, Uganda, Chad, Mali. South America: Bolivia and Paraguay."],
      ["Hard and easy", "🚚", "Landlocked countries often pay fees to cross other lands. <b>Rivers</b> and <b>railroads</b> help. Liechtenstein and Uzbekistan are <b>double landlocked</b>: all their neighbors are landlocked too."]],
      "Think about whether the country touches the sea.", "Look for countries in the middle of a continent, away from ocean coasts.",
      [["A country with no ocean coast is...", "Landlocked", "An island|A peninsula"], ["Which country is landlocked?", "Switzerland", "Italy|Portugal"], ["Which country is landlocked?", "Mongolia", "Vietnam|Japan"], ["Which country is landlocked?", "Bolivia", "Chile|Peru"],
       ["Which country is landlocked?", "Ethiopia", "Kenya|Egypt"], ["Which country is landlocked?", "Paraguay", "Uruguay|Brazil"], ["Which country is landlocked?", "Nepal", "India|Bangladesh"], ["Landlocked countries ship goods using ports in...", "Neighboring countries", "Their own coasts|Space"],
       ["Which country is NOT landlocked?", "Poland", "Austria|Hungary"], ["Kazakhstan is the largest...", "Landlocked country", "Island country|Rainforest"]])),
    LS("Trade balance", TRADE),
    LS("Globalization", MC([
      ["A connected world", "🌐 🚢", "<b>Globalization</b> means countries are more connected by trade, travel, money and the internet. Ideas, music and foods now spread around the world fast."],
      ["Supply chains", "🔗 📱", "A phone may be designed in one country, made from parts from many others, and put together somewhere else. This is a <b>supply chain</b>. <b>Multinational companies</b> work in many countries. <b>Container ships</b> make shipping cheap."],
      ["Good and hard", "⚖️", "Globalization can give cheaper goods, new jobs and new ideas. It can also move jobs away from some places, hurt local businesses and cause more pollution from shipping."]],
      "Think about how the world is linked together.", "Trade, travel and the internet link countries.",
      [["Countries becoming more connected through trade and technology is...", "Globalization", "Erosion|Migration only"], ["A company that works in many countries is a...", "Multinational company", "Local shop|Co-op farm"], ["Steel boxes carried on ships make shipping...", "Cheaper", "Impossible|Slower for everything"],
       ["A phone made from parts from many countries shows a...", "Supply chain", "Food web|River basin"], ["One benefit of globalization is...", "Cheaper goods", "No trade|Fewer ideas"], ["One challenge of globalization is...", "Some jobs move to other places", "Everyone becomes rich|Trade stops"],
       ["Which spreads ideas around the world fast?", "The internet", "Earthquakes|Tides"], ["Shipping goods across the sea can add...", "Pollution", "Snow|Soil"], ["When foods, music and styles spread to other countries, it shows...", "Cultural exchange", "Isolation|Desertification"]])),
    LS("Fossil fuels", MC([
      ["Energy from the past", "🛢️ ⛏️", "<b>Fossil fuels</b> formed over millions of years from the remains of ancient plants and tiny sea animals that were buried and squeezed. They are <b>nonrenewable</b>: once we use them, they are gone."],
      ["Three fuels", "3️⃣", "<b>Coal</b> came mostly from ancient swamp plants. <b>Oil</b> (petroleum) and <b>natural gas</b> came mostly from tiny sea life. We burn them for electricity, heating and cars."],
      ["Problems", "☁️", "Burning fossil fuels puts <b>carbon dioxide</b> in the air, which warms the planet. Oil spills can harm the sea. That is why many places add <b>renewable</b> energy such as solar and wind."]],
      "Think about what fossil fuels are made from and how long it takes.", "They took millions of years to form, so we cannot make more quickly.",
      [["Which is a fossil fuel?", "Coal", "Wind|Sunlight"], ["Which is a fossil fuel?", "Natural gas", "Solar power|Water power"], ["Fossil fuels formed from...", "Ancient plants and tiny sea animals", "Volcano ash only|Iron ore"],
       ["Fossil fuels are called nonrenewable because...", "They take millions of years to form", "They are free|They come from the Sun"], ["Coal mostly came from ancient...", "Swamp plants", "Sea sand|Ice"], ["Another name for oil is...", "Petroleum", "Peat moss|Ethanol"],
       ["Burning fossil fuels puts which gas in the air?", "Carbon dioxide", "Helium|Oxygen only"], ["Which is a renewable energy source?", "Wind", "Oil|Coal"], ["Which country is the world's top coal producer?", "China", "Iceland|Norway"]])),
    LS("Evidence of climate change", MC([
      ["Weather and climate", "🌦️ 📈", "<b>Weather</b> is what happens today. <b>Climate</b> is the pattern over 30 years or more. <b>Climate change</b> is a long-term shift in that pattern. Today it is mostly caused by people."],
      ["The evidence", "🔎", "Global average temperatures are rising. Glaciers and ice sheets are melting. Arctic sea ice is shrinking. Sea level is rising. Carbon dioxide in the air has gone from about 280 ppm before factories to over 400 ppm."],
      ["Causes and answers", "🌳 ⚡", "The main causes are burning fossil fuels and cutting down forests. Answers include clean energy, saving energy, public transit and protecting forests."]],
      "Think about what is getting warmer, smaller or higher.", "Temperatures and sea level go up. Glaciers and sea ice go down.",
      [["Weather over many years makes up a place's...", "Climate", "Season|Tide"], ["A long-term shift in climate is called...", "Climate change", "A hurricane|An eclipse"], ["Global average temperatures are...", "Rising", "Falling|Staying exactly the same"],
       ["Glaciers around the world are mostly...", "Shrinking", "Growing|Moving to the Equator"], ["Because of melting ice and warming water, sea level is...", "Rising", "Falling|Staying the same"], ["Which gas increase is the biggest cause of recent warming?", "Carbon dioxide", "Helium|Nitrogen"],
       ["Cutting down forests adds to climate change because trees...", "Take in carbon dioxide", "Make oil|Create volcanoes"], ["Which action can help slow climate change?", "Using clean energy", "Burning more coal|Cutting off rivers"], ["A heat wave on one day shows...", "Weather", "Climate by itself|A new continent"]])),
    LS("El Niño and La Niña", MC([
      ["A Pacific pattern", "🌊 🌡️", "Every few years, the Pacific Ocean near the Equator changes. The winds that blow along the Equator (trade winds) get weaker or stronger. Weather changes around the world."],
      ["El Niño", "🔴", "During <b>El Niño</b> ('the boy' in Spanish) the water in the eastern Pacific becomes warmer than usual. Peru and Ecuador often get heavy rain. Australia and Indonesia often have drought."],
      ["La Niña", "🔵", "During <b>La Niña</b> ('the girl') the eastern Pacific is cooler than usual. Trade winds are stronger. These changes come back every 2 to 7 years."]],
      "Think about whether the water is warmer or cooler than normal.", "El Niño is warm. La Niña is cool.",
      [["During El Niño the eastern Pacific water becomes...", "Warmer than usual", "Cooler than usual|Frozen"], ["During La Niña the eastern Pacific water becomes...", "Cooler than usual", "Warmer than usual|Salt-free"], ["El Niño in Spanish means...", "The boy", "The girl|The storm"],
       ["La Niña in Spanish means...", "The girl", "The boy|The rain"], ["El Niño often brings heavy rain to...", "Peru and Ecuador", "Greenland|Mongolia"], ["El Niño often brings drought to...", "Australia and Indonesia", "Norway|Canada"],
       ["These Pacific patterns return every...", "2 to 7 years", "Day|1,000 years"], ["The winds blowing along the Equator that change are the...", "Trade winds", "Polar winds|Monsoon only"], ["El Niño and La Niña happen in which ocean?", "Pacific Ocean", "Arctic Ocean|Indian Ocean"]])),
    LS("Monsoons", MC([
      ["Winds that change direction", "🌧️ 🌬️", "A <b>monsoon</b> is a wind that changes direction with the seasons. It is strongest in South and Southeast Asia."],
      ["Wet summer, dry winter", "☔ ☀️", "In summer the land heats up and wet winds blow from the ocean to the land. This is the <b>summer monsoon</b>, with heavy rain from about June to September. In winter the wind blows from land to sea, and it is dry."],
      ["Why it matters", "🌾", "Farmers wait for the monsoon to grow crops like rice. Too little rain means drought. Too much means floods. Places like Cherrapunji and Mawsynram in India are some of the wettest on Earth."]],
      "Think about wet wind coming from the sea in summer.", "Summer monsoons come from the sea and bring rain. Winter monsoons come from land and are dry.",
      [["A wind that changes direction with the seasons is a...", "Monsoon", "Tide|Jet stream only"], ["The summer monsoon winds blow from the...", "Ocean to the land", "Land to the ocean|North Pole"], ["The summer monsoon brings...", "Heavy rain", "Dry weather|Snow everywhere"],
       ["The winter monsoon is usually...", "Dry", "Very rainy|Full of hurricanes"], ["Monsoons are strongest in...", "South and Southeast Asia", "Greenland|Northern Europe"], ["Farmers wait for the monsoon to grow crops like...", "Rice", "Only wheat|Ice"],
       ["Too much monsoon rain can cause...", "Floods", "Droughts only|Earthquakes"], ["Too little monsoon rain can cause...", "Drought", "Tsunamis|Glaciers"], ["The summer monsoon rain is mainly from about...", "June to September", "December to February|Only noon"]])),
    LS("Famous volcanoes", MC([
      ["Mountains of fire", "🌋", "A <b>volcano</b> is an opening in the crust where hot rock, ash and gas can erupt. Most are near plate boundaries, like the Ring of Fire."],
      ["Famous ones", "📍", "<b>Vesuvius</b> (Italy) buried the Roman town of Pompeii long ago. <b>Mount St. Helens</b> (Washington state, USA) erupted in 1980. <b>Krakatoa</b> (Indonesia) erupted in 1883. <b>Mount Fuji</b> (Japan) has a famous cone shape."],
      ["More", "🔥", "<b>Mauna Loa</b> in Hawaii is the largest active volcano on Earth. <b>Etna</b> in Sicily is one of the most active in Europe. <b>Kilimanjaro</b> in Tanzania is a volcano and Africa's highest mountain."]],
      "Think about which country or state each volcano is in.", "Match each volcano to its place: Italy, Japan, Indonesia, Hawaii, Tanzania.",
      [["Vesuvius is a volcano in...", "Italy", "Japan|Chile"], ["Mount Fuji is in...", "Japan", "Italy|Peru"], ["Krakatoa is in...", "Indonesia", "Iceland|Mexico"], ["Mount St. Helens is in the U.S. state of...", "Washington", "Hawaii|Maine"],
       ["Mauna Loa is the largest active volcano, in...", "Hawaii", "Alaska|Sicily"], ["Etna is on the island of...", "Sicily", "Crete|Iceland"], ["Kilimanjaro, a volcano, is in...", "Tanzania", "Peru|Nepal"], ["Vesuvius buried the Roman town of...", "Pompeii", "Athens|Cairo"],
       ["Most volcanoes are found near...", "Plate boundaries", "The middle of plates only|The poles only"]])),
    LS("Dams and reservoirs", MC([
      ["Holding back rivers", "🏗️ 💧", "A <b>dam</b> blocks a river. The water behind it forms a <b>reservoir</b>. Dams store water, control floods and make electricity (<b>hydropower</b>)."],
      ["Big dams", "📍", "<b>Hoover Dam</b> (Colorado River, USA) forms Lake Mead. <b>Aswan High Dam</b> (Nile, Egypt) forms Lake Nasser. <b>Three Gorges Dam</b> (Yangtze, China) is the world's biggest hydropower station. <b>Itaipu</b> (Paraná River) lies between Brazil and Paraguay."],
      ["Good and bad", "⚖️", "Dams give power, water for farms and flood control. But they flood land, move people from their homes, and block fish and river mud."]],
      "Think about the river and country that go with each dam.", "A dam makes a reservoir behind it.",
      [["Water stored behind a dam is a...", "Reservoir", "Delta|Estuary"], ["Making electricity from moving water is...", "Hydropower", "Solar power|Coal power"], ["Hoover Dam is on the...", "Colorado River", "Nile River|Yangtze River"],
       ["Aswan High Dam is on the...", "Nile River", "Danube River|Colorado River"], ["Three Gorges Dam is in...", "China", "Brazil|Egypt"], ["Itaipu Dam lies between Brazil and...", "Paraguay", "Peru|Chile"],
       ["Lake Nasser is behind a dam in...", "Egypt", "Sudan only|Kenya"], ["One cost of a big dam is that it...", "Floods land behind it", "Makes the river flow faster|Creates new mountains"], ["A benefit of a dam is...", "Flood control", "More floods|Less water forever"]])),
    LS("Southeast Asia: land and sea", MC([
      ["Two parts", "🌴 🏝️", "<b>Mainland</b> Southeast Asia has Myanmar, Thailand, Laos, Cambodia and Vietnam. <b>Island</b> Southeast Asia has Indonesia, the Philippines, Brunei, Singapore and part of Malaysia."],
      ["Waters", "🌊", "The <b>Mekong River</b> flows through six countries to the South China Sea. The <b>Strait of Malacca</b> is a busy shipping lane between the Malay Peninsula and Sumatra. The region is hot, wet and has monsoons."],
      ["Islands", "🗾", "Indonesia has more than 17,000 islands. The Philippines has over 7,000. <b>Borneo</b> is shared by Indonesia, Malaysia and Brunei. Many volcanoes lie here, on the Ring of Fire."]],
      "Think about mainland, islands and seas.", "Indonesia and the Philippines are made of islands. The Mekong is a great mainland river.",
      [["The big river that flows through six Southeast Asian countries is the...", "Mekong", "Ganges|Danube"], ["The busy shipping lane between Malaysia and Sumatra is the Strait of...", "Malacca", "Gibraltar|Hormuz"], ["Which country has more than 17,000 islands?", "Indonesia", "Thailand|Laos"],
       ["Which country has over 7,000 islands?", "The Philippines", "Cambodia|Myanmar"], ["Borneo is shared by Indonesia, Malaysia and...", "Brunei", "Thailand|Vietnam"], ["Which is on the mainland of Southeast Asia?", "Thailand", "Indonesia|The Philippines"],
       ["The Mekong flows out into the...", "South China Sea", "Arabian Sea|Bay of Bengal"], ["Southeast Asia has many volcanoes because it is on the...", "Ring of Fire", "Equator only|Prime Meridian"], ["The climate of most of Southeast Asia is...", "Hot and wet", "Cold and dry|Polar"]])),
    LS("Nordic lands", MC([
      ["The north of Europe", "🇳🇴 🇸🇪", "The <b>Nordic</b> countries are Norway, Sweden, Finland, Denmark and Iceland. Their capitals are Oslo, Stockholm, Helsinki, Copenhagen and Reykjavik."],
      ["Land", "🏔️", "Norway and Sweden share the <b>Scandinavian Peninsula</b>. Norway has deep <b>fjords</b>. Finland has about 188,000 lakes. <b>Iceland</b> sits on the Mid-Atlantic Ridge with volcanoes and geysers, and uses <b>geothermal</b> energy."],
      ["Light and warmth", "🌅", "North of the Arctic Circle the Sun shines at midnight in summer (<b>midnight sun</b>) and does not rise in deep winter. The warm <b>North Atlantic Current</b> keeps coasts milder than other places at the same latitude."]],
      "Think about the five Nordic countries and what each is known for.", "Fjords are in Norway. Geysers are in Iceland.",
      [["The capital of Norway is...", "Oslo", "Stockholm|Helsinki"], ["The capital of Sweden is...", "Stockholm", "Oslo|Copenhagen"], ["The capital of Finland is...", "Helsinki", "Reykjavik|Oslo"], ["The capital of Denmark is...", "Copenhagen", "Stockholm|Reykjavik"],
       ["The capital of Iceland is...", "Reykjavik", "Helsinki|Oslo"], ["Which country is famous for fjords?", "Norway", "Finland|Denmark"], ["Which country uses geothermal energy from volcanic heat?", "Iceland", "Denmark|Sweden"],
       ["The peninsula shared by Norway and Sweden is the...", "Scandinavian Peninsula", "Iberian Peninsula|Balkan Peninsula"], ["Which warm current keeps Norway's coast mild?", "North Atlantic Current", "Humboldt Current|Labrador Current"],
       ["Finland is known for its thousands of...", "Lakes", "Deserts|Volcanoes"]])),
    LS("Rates per 1,000", RATE1000),
  ];
  l17.push(LS("Mixed practice", MX(l17, [0, 1, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16])));
  l17.push(LS("Level 17 Challenge", MX(l17, [2, 7, 17, 0, 1, 3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16])));

  // ================= LEVEL 18 (8th grade, second half) =================
  const l18 = [
    LS("Why languages spread", MC([
      ["Colonies and languages", "🗣️ 🚢", "From about the 1500s, European countries ruled colonies around the world. The languages of those countries spread, and many are still spoken today."],
      ["Where", "📍", "<b>Spanish</b> is spoken in most of Latin America (Mexico, Argentina, Colombia, Peru). <b>Portuguese</b> in Brazil, Angola and Mozambique. <b>French</b> in Senegal, Ivory Coast and Quebec. <b>English</b> in Australia, Jamaica, Nigeria and more."],
      ["Remember", "💡", "A country's main language often tells us which country once ruled it. People also keep their own local languages and mix them in new ways."]],
      "Think about which European country once ruled the place.", "Brazil and Spanish-speaking lands were ruled by different countries.",
      [["Brazil's main language is...", "Portuguese", "Spanish|French"], ["Mexico's main language is...", "Spanish", "Portuguese|English"], ["Senegal's official language is...", "French", "English|Spanish"],
       ["A country in Africa where Portuguese is the official language is...", "Angola", "Kenya|Ghana"], ["Quebec, a province of Canada, mostly speaks...", "French", "Spanish|Portuguese"], ["Jamaica's official language is...", "English", "Spanish|French"],
       ["Argentina's main language is...", "Spanish", "Portuguese|Italian"], ["Suriname in South America has Dutch as an official language because it was once ruled by the...", "Netherlands", "Spain|Portugal"],
       ["Languages spread to many places mainly through...", "Colonies and trade", "Volcanoes|Tides"]])),
    LS("Sustainable development", MC([
      ["Today and tomorrow", "🌱 🧒", "<b>Sustainable development</b> means meeting the needs of people today without harming the ability of future people to meet theirs."],
      ["Three parts", "3️⃣", "It balances the <b>environment</b> (clean air, water, wildlife), the <b>economy</b> (jobs and money) and <b>society</b> (health, schools, fairness). Using renewable energy and recycling are examples."],
      ["Goals", "🎯", "In 2015 the United Nations set <b>17 Sustainable Development Goals</b> to reach by 2030. They include ending hunger, clean water for all and quality education. <b>Fair trade</b> pays farmers a fair price."]],
      "Think about the needs of people today and people in the future.", "Balance environment, economy and society.",
      [["Meeting today's needs without harming the future is...", "Sustainable development", "Urban sprawl|Globalization only"], ["How many UN Sustainable Development Goals are there?", "17", "7|50"], ["The UN goals aim to be reached by the year...", "2030", "2005|2100"],
       ["Which is one of the three parts of sustainability?", "Environment", "Latitude|Altitude"], ["Using solar and wind power is an example of...", "Sustainable energy", "Nonrenewable energy|Strip mining"], ["Paying farmers a fair price is called...", "Fair trade", "Export tax|Barter"],
       ["Which is a UN goal?", "Clean water for all", "More traffic|Less school"], ["Recycling helps because it...", "Saves resources", "Uses more land|Makes more waste"], ["Cutting down a whole forest with no replanting is...", "Not sustainable", "Sustainable|Renewable"]])),
    LS("Carrying capacity and footprints", MC([
      ["How many can a place support?", "🏞️ 👥", "<b>Carrying capacity</b> is the largest number of living things that an environment can support. Limits include food, water and space."],
      ["Footprints", "👣", "Your <b>ecological footprint</b> measures how much land and water it takes to make what you use and to take in your waste. People in rich countries usually have bigger footprints."],
      ["What helps?", "♻️", "We can make footprints smaller by using less energy, wasting less food, sharing rides and recycling. A smaller footprint means we ask less of the Earth."]],
      "Think about limits such as food, water and space.", "A footprint counts how much of the Earth a person uses.",
      [["The largest number a place can support is its...", "Carrying capacity", "Density|Birth rate"], ["The land and water needed to support one person's way of life is the...", "Ecological footprint", "Fertility rate|Climate zone"],
       ["Which is a limit on carrying capacity?", "Water", "Time zones|Latitude lines"], ["Who usually has a bigger footprint per person?", "People in rich countries", "People in poor countries|Nobody"], ["Wasting less food makes a footprint...", "Smaller", "Bigger|The same"],
       ["Sharing a ride in one car instead of two makes your footprint...", "Smaller", "Bigger|Heavier"], ["If a place has more people than its carrying capacity, resources...", "Run short", "Increase|Never change"],
       ["Carrying capacity can go up when people...", "Find new food or water sources", "Waste more|Burn forests"], ["Which choice has the smallest footprint?", "Walking to school", "Driving alone|Flying"]])),
    LS("Water use", WATER),
    LS("Measuring disasters", MC([
      ["Scales for danger", "📏 🌪️", "Scientists use scales to measure disasters. A bigger number means a stronger event. Each scale is for one kind of disaster."],
      ["Earthquakes", "🌍", "A <b>seismograph</b> records shaking. The <b>Richter</b> (or magnitude) scale measures how strong the quake is. Each whole number up means shaking about 10 times bigger. The <b>Mercalli</b> scale (Roman numerals I to XII) measures the damage people see."],
      ["Storms", "🌀", "The <b>Saffir-Simpson</b> scale rates hurricanes from category 1 to 5 by wind speed. The <b>Enhanced Fujita</b> scale rates tornadoes from EF0 to EF5."]],
      "Match each scale with its kind of disaster.", "Richter: earthquakes. Saffir-Simpson: hurricanes. Fujita: tornadoes.",
      [["The scale that rates hurricanes by wind speed is...", "Saffir-Simpson scale", "Richter scale|Fujita scale"], ["The scale that rates tornadoes is the...", "Enhanced Fujita scale", "Saffir-Simpson scale|Mercalli scale"],
       ["The scale that rates earthquake magnitude is the...", "Richter scale", "Fujita scale|Saffir-Simpson scale"], ["An instrument that records earthquake shaking is a...", "Seismograph", "Thermometer|Barometer"],
       ["A category 5 hurricane is the...", "Strongest", "Weakest|Slowest"], ["Each step up the magnitude scale means shaking about how many times bigger?", "10", "2|100"], ["The Mercalli scale uses...", "Roman numerals", "Colors|Hurricane names"],
       ["The Mercalli scale measures...", "Damage and what people feel", "Wind speed|Rainfall"], ["EF5 is the strongest rating for a...", "Tornado", "Hurricane|Earthquake"]])),
    LS("Tornadoes and severe storms", MC([
      ["Tornado Alley", "🌪️", "A <b>tornado</b> is a rotating column of air that touches the ground. Most tornadoes happen in the central USA, in an area called <b>Tornado Alley</b> (Texas, Oklahoma, Kansas, Nebraska)."],
      ["Why there?", "⛈️", "Warm, moist air from the Gulf of Mexico meets cool, dry air from the Rockies and Canada. This makes huge thunderstorms called <b>supercells</b>, which can spin out tornadoes."],
      ["Staying safe", "🛡️", "A tornado <b>watch</b> means a tornado could form. A tornado <b>warning</b> means one is happening now, so go to a basement or inside room with no windows. Storms can also bring hail, lightning and flooding."]],
      "Think about where warm moist air and cool dry air meet.", "A watch means be ready. A warning means take cover now.",
      [["A rotating column of air touching the ground is a...", "Tornado", "Tsunami|Monsoon"], ["Tornado Alley is mainly in the...", "Central USA", "Western Europe|Northern Canada only"], ["Warm moist air for tornado storms comes from the...", "Gulf of Mexico", "Arctic Ocean|Pacific trench"],
       ["The giant spinning thunderstorms that make tornadoes are called...", "Supercells", "Fronts|Fjords"], ["A tornado WARNING means a tornado...", "Is happening or seen now", "Might form later|Is impossible"], ["A tornado WATCH means a tornado...", "Could form", "Has just hit|Cannot happen"],
       ["Which state is part of Tornado Alley?", "Oklahoma", "Maine|Alaska"], ["The safest place in a house during a tornado is...", "A basement or inside room", "Next to a window|On the roof"], ["Balls of ice that fall from storms are...", "Hail", "Fog|Dew"]])),
    LS("Compound growth", COMPOUND),
    LS("Urban heat islands and microclimates", MC([
      ["Hot cities", "🏙️ 🌡️", "Cities are often hotter than the countryside around them. This is the <b>urban heat island</b> effect. Concrete and dark asphalt soak up heat. There are few plants to cool the air, and cars and buildings give off heat."],
      ["Cooling a city", "🌳", "Planting trees, building parks, <b>green roofs</b> and painting roofs white all help cool a city."],
      ["Microclimates", "📍", "A <b>microclimate</b> is the weather of one small area, such as a valley, a hillside or the shore of a lake. <b>Lake-effect snow</b> falls on land near the Great Lakes when cold air crosses warmer water."]],
      "Think about what absorbs and holds heat in a city.", "Dark pavement heats up. Plants cool the air.",
      [["Cities often being hotter than the countryside is the...", "Urban heat island effect", "Greenhouse layer|Rain shadow"], ["Which absorbs a lot of heat in a city?", "Dark asphalt", "Trees|Lakes"], ["Which helps cool a city?", "Planting trees", "More pavement|More traffic"],
       ["Roofs covered with plants are called...", "Green roofs", "Sea stacks|Moraines"], ["The weather of one small area is a...", "Microclimate", "Climate zone|Biome"], ["Snow falling near the Great Lakes from cold air crossing warm water is...", "Lake-effect snow", "Frontal snow|Orographic snow"],
       ["Painting a roof white helps because it...", "Reflects sunlight", "Absorbs more heat|Makes it rain"], ["A valley that stays colder than the hills around it has its own...", "Microclimate", "Time zone|Hemisphere"], ["Cars, air conditioners and factories add to a city's...", "Heat", "Soil|Snow"]])),
    LS("Invasive species and hotspots", MC([
      ["Species out of place", "🐸 🌿", "A <b>native species</b> belongs in a place naturally. An <b>invasive species</b> is brought in (often by people), spreads fast and harms the local nature. Examples: cane toads in Australia, kudzu vines in the southern USA, zebra mussels in the Great Lakes, Burmese pythons in Florida."],
      ["Biodiversity hotspots", "🔥 🌎", "A <b>biodiversity hotspot</b> has many species found nowhere else but is losing its habitat. Examples: <b>Madagascar</b> (lemurs live only there), the Amazon, the Philippines and the Western Ghats of India."],
      ["Protecting nature", "🛡️", "People protect nature with parks and reserves, rules against bringing in plants or animals, and by saving habitats. <b>Endangered</b> means in danger of dying out."]],
      "Think about whether the species belongs in the place or was brought in.", "Invasive species spread out of control.",
      [["A species brought to a place that spreads and harms nature is...", "Invasive", "Native|Endangered"], ["A species that belongs in a place naturally is...", "Native", "Invasive|Extinct"], ["Cane toads are an invasive problem in...", "Australia", "Norway|Peru"],
       ["Kudzu is an invasive vine in the...", "Southern USA", "Sahara|Arctic"], ["Zebra mussels are an invasive species in the...", "Great Lakes", "Amazon River|Nile Delta"], ["Lemurs are found only in...", "Madagascar", "Brazil|Indonesia"],
       ["A place with many unique species and a lot of habitat loss is a...", "Biodiversity hotspot", "Rain shadow|Reservoir"], ["A species in danger of dying out is...", "Endangered", "Invasive|Common"], ["Which helps protect species?", "National parks and reserves", "Cutting down habitats|Bringing in new species"]])),
    LS("The Green Revolution", MC([
      ["More food from the same land", "🌾 🚜", "The <b>Green Revolution</b> was a big change in farming that began in the 1940s to 1960s. Scientists made new <b>high-yield</b> wheat and rice that grow faster and make more grain."],
      ["Who and where", "🇮🇳 🇲🇽", "It started in Mexico and spread to India and other countries. <b>Norman Borlaug</b> helped breed the new wheat. Farmers also used fertilizer, irrigation and machines."],
      ["Good and hard", "⚖️", "It gave many countries more food and helped fight hunger. But the new seeds needed lots of water, fertilizer and money. Too much fertilizer can pollute rivers. <b>Food security</b> means having reliable access to enough food."]],
      "Think about how farmers got more food from the same land.", "Better seeds, fertilizer and water all helped yields grow.",
      [["The big change in farming that raised crop yields is the...", "Green Revolution", "Industrial Revolution|Gold Rush"], ["Which crops were improved by Green Revolution scientists?", "Wheat and rice", "Cacti and ferns|Rubber trees"], ["The Green Revolution began in Mexico and spread to...", "India", "Greenland|Antarctica"],
       ["A 'high-yield' crop makes...", "More food per field", "Less food per field|Only flowers"], ["Reliable access to enough food is called...", "Food security", "Food chain|Fast food"], ["One cost of the Green Revolution was...", "Needing lots of water and fertilizer", "Having too many wild animals|A cooler planet"],
       ["Too much fertilizer can...", "Pollute rivers", "Cool the air|Remove all rain"], ["Besides new seeds, farmers used...", "Fertilizer and irrigation", "Tents and canoes|Salt and sand"], ["Farming that grows crops to eat at home is...", "Subsistence farming", "Cash crop farming|Fishing"]])),
    LS("Great ports and hubs", MC([
      ["Where ships meet land", "🚢 ⚓", "A <b>port</b> is a place where ships load and unload goods. Most things we buy have traveled by ship in a <b>container</b>. Big ports are near large cities and good transport links."],
      ["Busy ports", "📍", "<b>Shanghai</b> (China) is the world's busiest container port. <b>Singapore</b> is a major hub on the Strait of Malacca. <b>Rotterdam</b> (Netherlands) is Europe's largest port. <b>Los Angeles / Long Beach</b> are the busiest ports in the USA."],
      ["Air hubs", "✈️", "A <b>hub</b> is a place where many routes meet. <b>Atlanta</b> has one of the busiest passenger airports. <b>Dubai</b> is a hub between Europe, Asia and Africa."]],
      "Think about big trading cities by the sea.", "Match each port to its country.",
      [["The world's busiest container port is in...", "Shanghai", "Oslo|Perth"], ["Europe's largest port is...", "Rotterdam", "Marseille|Athens"], ["Rotterdam is in the...", "Netherlands", "Belgium|Denmark"], ["Singapore is a hub on the Strait of...", "Malacca", "Gibraltar|Hormuz"],
       ["Which pair are the USA's busiest ports?", "Los Angeles and Long Beach", "Miami and Boston|Seattle and Maine"], ["Steel boxes used to ship goods are called...", "Containers", "Reservoirs|Canals"], ["A place where many routes meet is a...", "Hub", "Tributary|Peak"],
       ["Atlanta is famous for its busy...", "Airport", "Harbor|Glacier"], ["Dubai is a hub between Europe, Asia and...", "Africa", "Antarctica|Greenland"]])),
    LS("Tourism", MC([
      ["Travel for fun", "🧳 📸", "<b>Tourism</b> is travel for fun, rest or to learn. It is one of the world's biggest industries. <b>France</b> is one of the most visited countries."],
      ["Benefits and costs", "⚖️", "Tourism creates jobs and brings money to hotels, guides, shops and farms. But crowds, litter and building can harm nature and local culture. Too many people can damage coral reefs and old buildings."],
      ["Better tourism", "🌿", "<b>Ecotourism</b> means traveling in ways that protect nature and help local people. Visitors follow rules, stay on trails and buy from local businesses."]],
      "Think about the good and bad effects of visitors.", "Tourism brings money and also crowds.",
      [["Travel for fun, rest or learning is...", "Tourism", "Migration|Commuting"], ["A benefit of tourism is...", "Jobs for local people", "More litter|Empty hotels"], ["A cost of tourism can be...", "Damage to nature", "Fewer jobs|Less money for shops"],
       ["Traveling in ways that protect nature and help local people is...", "Ecotourism", "Mining|Irrigation"], ["Which country is one of the most visited in the world?", "France", "Greenland|Mongolia"], ["Too many visitors can harm...", "Coral reefs", "The Moon|Cloud layers"],
       ["A good rule for visitors in a park is to...", "Stay on the trails", "Pick every flower|Feed all the wildlife"], ["Buying souvenirs from local people helps the...", "Local economy", "Weather|Tectonic plates"], ["People who guide visitors and show them around are...", "Tour guides", "Surveyors|Miners"]])),
    LS("Federal and unitary governments", MC([
      ["Who has the power?", "🏛️", "In a <b>unitary</b> government the central government holds the main power. In a <b>federal</b> government, power is shared between the national government and states or provinces."],
      ["Examples", "📍", "Federal: the <b>USA</b>, <b>Canada</b>, <b>Germany</b>, <b>Mexico</b>, <b>Australia</b>, <b>India</b>, <b>Brazil</b>, <b>Switzerland</b>. Unitary: <b>France</b>, <b>Japan</b>, <b>Italy</b>, <b>Chile</b>."],
      ["Names of regions", "🗺️", "The parts of a country have different names: <b>states</b> (USA), <b>provinces</b> (Canada), <b>cantons</b> (Switzerland), <b>prefectures</b> (Japan), <b>departments</b> (France)."]],
      "Think about whether power is shared with states or held by the center.", "Federal shares power. Unitary keeps it in one place.",
      [["Power shared between a national government and states is a...", "Federal system", "Unitary system|Barter system"], ["Power held mainly by one central government is a...", "Unitary system", "Federal system|Tribal system"],
       ["Which country is federal?", "Canada", "France|Japan"], ["Which country is unitary?", "Japan", "Germany|Australia"], ["Switzerland's regions are called...", "Cantons", "Prefectures|Departments"], ["Japan's regions are called...", "Prefectures", "Provinces|Cantons"],
       ["France's regions include...", "Departments", "Provinces|Cantons"], ["Canada's main regions are called...", "Provinces", "Prefectures|Cantons"], ["Which country is federal?", "Brazil", "Italy|Chile"]])),
    LS("Isolines", MC([
      ["Lines of equal value", "〰️", "An <b>isoline</b> joins points that have the same value. 'Iso' means <b>equal</b>."],
      ["Kinds of isolines", "🌡️ ☔", "<b>Isotherm</b>: equal temperature. <b>Isobar</b>: equal air pressure. <b>Isohyet</b>: equal rainfall. <b>Contour line</b>: equal height above sea level."],
      ["Reading them", "👀", "Isolines never cross. When they are <b>close together</b>, the value changes quickly (a steep slope, or strong winds on a pressure map). When they are <b>far apart</b>, it changes slowly."]],
      "Think about what is equal along each line.", "Therm is heat, bar is pressure, hyet is rain.",
      [["A line joining places with the same temperature is an...", "Isotherm", "Isobar|Isohyet"], ["A line joining places with the same air pressure is an...", "Isobar", "Isotherm|Contour line"], ["A line joining places with the same rainfall is an...", "Isohyet", "Isobar|Isotherm"],
       ["A line joining places with the same height is a...", "Contour line", "Isotherm|Isohyet"], ["The word part 'iso' means...", "Equal", "Cold|Water"], ["Isolines close together show a value that changes...", "Quickly", "Slowly|Never"],
       ["Isolines far apart show a value that changes...", "Slowly", "Quickly|Suddenly"], ["Two isolines of different values...", "Never cross", "Always cross|Join together"], ["On a pressure map, isobars close together mean...", "Strong winds", "Calm winds|Snow only"]])),
    LS("Desert landforms", MC([
      ["Shaped by wind and flash floods", "🏜️", "In deserts, wind moves sand into <b>dunes</b>. A big area of sand dunes is an <b>erg</b>. A <b>playa</b> is a flat dry lake bed. A <b>wadi</b> (or arroyo) is a dry stream bed that can flood after rain. An <b>oasis</b> has water."],
      ["Rock shapes", "🏔️", "A <b>mesa</b> is a flat-topped hill with steep sides ('mesa' is Spanish for table). A <b>butte</b> is a smaller, narrower one. A <b>canyon</b> is a deep valley cut by a river."],
      ["Places", "📍", "<b>Monument Valley</b> on the Arizona-Utah border is famous for its mesas and buttes. The <b>Grand Canyon</b> in Arizona was cut by the Colorado River. The Sahara has huge ergs."]],
      "Think about the shape: sand pile, flat top, or dry stream.", "A butte is a smaller mesa. A wadi is a dry stream bed.",
      [["A pile of sand shaped by wind is a...", "Dune", "Butte|Wadi"], ["A flat-topped hill with steep sides is a...", "Mesa", "Dune|Playa"], ["A smaller, narrower hill than a mesa is a...", "Butte", "Mesa|Erg"], ["A dry stream bed that floods after rain is a...", "Wadi", "Oasis|Plateau"],
       ["A flat dry lake bed in a desert is a...", "Playa", "Dune|Butte"], ["A large sandy desert area with many dunes is an...", "Erg", "Oasis|Mesa"], ["A place in a desert with water is an...", "Oasis", "Playa|Wadi"], ["'Mesa' in Spanish means...", "Table", "Mountain|River"],
       ["Monument Valley is on the border of Arizona and...", "Utah", "Texas|Nevada"]])),
    LS("Caves and karst", MC([
      ["Limestone and water", "🕳️", "Rain is slightly acidic. It slowly dissolves <b>limestone</b> rock, making underground <b>caves</b> and holes called <b>sinkholes</b>. A landscape like this is called <b>karst</b>."],
      ["Cave decorations", "🦇", "Water dripping in a cave leaves minerals. A <b>stalactite</b> hangs from the <b>c</b>eiling. A <b>stalagmite</b> rises from the <b>g</b>round. They can meet and form a column."],
      ["Famous caves", "📍", "<b>Mammoth Cave</b> (Kentucky, USA) is the longest known cave system. <b>Carlsbad Caverns</b> are in New Mexico. The Waitomo caves in New Zealand glow with glowworms."]],
      "Think about rock that water can dissolve.", "C for ceiling, G for ground.",
      [["Landscapes with caves and sinkholes from dissolved rock are...", "Karst", "Moraines|Dunes"], ["Which rock is dissolved by rain to make caves?", "Limestone", "Granite|Coal"], ["A hole where the ground collapses into a cave is a...", "Sinkhole", "Spit|Delta"],
       ["A mineral spike hanging from a cave ceiling is a...", "Stalactite", "Stalagmite|Column"], ["A mineral spike rising from the cave floor is a...", "Stalagmite", "Stalactite|Arch"], ["The longest known cave system is in...", "Kentucky, USA", "Norway|Egypt"], ["Carlsbad Caverns are in...", "New Mexico", "Alaska|Maine"],
       ["Waitomo caves are famous for glowworms in...", "New Zealand", "Canada|Spain"], ["Rain dissolves limestone because rain is slightly...", "Acidic", "Salty|Sweet"]])),
    LS("How islands form", MC([
      ["Three kinds", "🏝️", "Islands form in different ways. <b>Volcanic islands</b> rise from the sea floor when volcanoes build up (Hawaii, Iceland). <b>Continental islands</b> were once part of a mainland (Great Britain). <b>Coral islands</b> are built by tiny animals (the Maldives)."],
      ["Atolls and arcs", "💍", "An <b>atoll</b> is a ring-shaped coral island around a lagoon. An <b>island arc</b> is a curved chain of volcanic islands at a plate boundary, like the Aleutian Islands and Japan."],
      ["Barrier islands", "🏖️", "<b>Barrier islands</b> are long sandy islands built by waves and currents along a coast. They protect the mainland from storms."]],
      "Think about how each island was made: fire, mainland or coral.", "Hawaii is volcanic. Great Britain was once joined to Europe.",
      [["Hawaii is a chain of which kind of island?", "Volcanic", "Coral|Continental"], ["Great Britain is a...", "Continental island", "Volcanic island|Coral atoll"], ["The Maldives are mostly...", "Coral islands", "Volcanic cones|Ice islands"],
       ["A ring-shaped coral island around a lagoon is an...", "Atoll", "Fjord|Isthmus"], ["A curved chain of volcanic islands at a plate boundary is an...", "Island arc", "Barrier island|Atoll"], ["Iceland formed mainly by...", "Volcanoes", "Coral reefs|Glaciers melting"],
       ["Long sandy islands near a coast are...", "Barrier islands", "Atolls|Volcanic arcs"], ["Coral islands are built by...", "Tiny animals", "Wind|Rain"], ["The Aleutian Islands are an example of an...", "Island arc", "Atoll|Barrier island"]])),
    LS("Rivers through many countries", MC([
      ["Rivers cross borders", "🌊 🗺️", "Many rivers cross or form borders, so countries must share them. The <b>Danube</b> in Europe flows through 10 countries on its way to the Black Sea."],
      ["More examples", "📍", "The <b>Nile</b> flows north through Sudan and Egypt to the Mediterranean, and its basin includes 11 countries. The <b>Rhine</b> begins in the Swiss Alps and reaches the North Sea in the Netherlands. The <b>Mekong</b> flows through six countries."],
      ["Sharing water", "🤝", "Countries along a river must agree how to share its water, use dams and keep it clean. The <b>Amazon</b> begins in the Peruvian Andes and flows through Brazil to the Atlantic. The <b>Rio Grande</b> forms part of the USA-Mexico border."]],
      "Think about the countries that each river passes through.", "Danube is in Europe, Nile in Africa, Mekong in Asia, Amazon in South America.",
      [["Which river flows through 10 countries in Europe?", "Danube", "Rhine|Seine"], ["The Danube flows into the...", "Black Sea", "North Sea|Baltic Sea"], ["The Nile flows north to the...", "Mediterranean Sea", "Red Sea|Atlantic Ocean"],
       ["The Rhine begins in the Alps of...", "Switzerland", "Poland|Norway"], ["The Rhine reaches the North Sea in the...", "Netherlands", "Italy|Spain"], ["The Mekong flows through how many countries?", "Six", "Two|Twelve"],
       ["The Amazon begins in the Andes of...", "Peru", "Argentina|Chile"], ["The Rio Grande forms part of the border between the USA and...", "Mexico", "Canada|Cuba"], ["Countries sharing a river must...", "Agree how to share its water", "Close their borders|Move the river"]])),
  ];
  l18.push(LS("Mixed practice", MX(l18, [0, 1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])));
  l18.push(LS("Level 18 Challenge", MX(l18, [3, 6, 0, 1, 2, 4, 5, 7, 9, 10, 12, 13, 14, 15, 16, 17])));

  Object.assign(GEO_LEVELS, { 16: l16, 17: l17, 18: l18 });
})();
