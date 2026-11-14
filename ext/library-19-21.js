// ext/library-19-21.js  Mind Lab Library & Research, levels 19-21 (60 lessons)
(() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const lead = s => String(s).replace(/<[^>]+>/g, "").replace(/^[^A-Za-z0-9]+/, "")[0].toUpperCase();

  const PL = (title, v, intro, tip, rows, o = {}) => {
    const pairs = rows.map(r => { const [t, d, e] = r.split("::"); return { t, d, e }; });
    const make = () => {
      const cur = pick(pairs), rest = pairs.filter(x => x !== cur), ex = pick(rest);
      const exh = `Example: "${ex.t}" goes with "${ex.d}". Now do yours.`;
      if (Math.random() < 0.5) return {
        text: `${o.qd || "Which term fits?"}<br><b>${cur.d}</b>`, visual: cur.e, choices: shuf([cur.t, ...S(rest, 2).map(x => x.t)]), answer: cur.t,
        hints: ["Think back to the lesson. Which term fits this?", `The answer starts with "${lead(cur.t)}".`, exh]
      };
      return {
        text: `${o.qt || "What does this mean?"}<br><b>${cur.t}</b>`, visual: cur.e, choices: shuf([cur.d, ...S(rest, 2).map(x => x.d)]), answer: cur.d,
        hints: ["Think back to the lesson. What did you learn about this?", `The right answer starts with "${lead(cur.d)}".`, exh]
      };
    };
    make.teach = () => [
      { h: title, v, t: intro },
      { h: "Remember these", v: pairs.map(p => `${p.e ? p.e + " " : ""}<b>${p.t}</b>: ${p.d}`).join("<br>"), t: "Read each one slowly, out loud." },
      { h: "Tip", v: "💡", t: tip }
    ];
    return { title, make };
  };
  const SC = (title, v, intro, clue, example, rows) => {
    const items = rows.map(r => r.split("|"));
    const make = () => {
      const [q, a, ...ws] = pick(items);
      return { text: q, choices: shuf([a, ...S(ws, 2)]), answer: a, hints: ["Read every choice slowly and think about what each one means.", clue, `Example: ${example} Now do yours.`] };
    };
    make.teach = () => [{ h: title, v, t: intro }, { h: "Think about it", v: "🤔", t: clue }, { h: "Example", v: "✨", t: example }];
    return { title, make };
  };
  const lvl = (n, ls, mixIdx) => {
    const ms = ls.map(l => l.make);
    const mix = (title, arr) => {
      const f = () => pick(arr)();
      const step = Math.ceil(arr.length / 4);
      f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of some of them, then the quiz." }, ...arr.filter((_, i) => i % step === 0).slice(0, 4).map(m => m.teach()[1])];
      return { title, make: f };
    };
    return [...ls, mix("Mixed practice", mixIdx.map(i => ms[i])), mix(`Level ${n} Challenge`, ms)];
  };

  // ---------- custom makers ----------
  // First names and last names come from two separate lists, so they can never be the same word.
  const FN = ["Amara", "Noel", "Rosa", "Kenji", "Leila", "Dmitri", "Sofia", "Isaac", "Thea", "Bruno", "Camila", "Jonah"];
  const LN = ["Abbott", "Barlow", "Castillo", "Dalton", "Ellis", "Fraser", "Gibson", "Hartley", "Ibarra", "Jacobs", "Kwan", "Lindqvist", "Mercer", "Novak", "Okafor", "Pruitt", "Rivera", "Sandoval", "Tanaka", "Vargas"];
  const people = n => { const fs = S(FN, n), ls = S(LN, n); return fs.map((f, i) => ({ f, l: ls[i] })); };

  // L19: result math with AND / OR / NOT
  const boolCounts = () => {
    const T = [["cats", "dogs"], ["space", "robots"], ["bridges", "tunnels"], ["bees", "flowers"], ["volcanoes", "earthquakes"], ["trains", "planes"], ["oceans", "rivers"], ["music", "dance"]];
    const make = () => {
      const [x, y] = pick(T), c = ri(10, 60), a = c + ri(20, 200), b = c + ri(20, 200), r = Math.random();
      if (r < 0.34) return {
        text: `A catalog finds ${a} results for <b>${x}</b>, ${b} results for <b>${y}</b>, and ${c} results that contain both words. How many results does <b>${x} OR ${y}</b> give?`, visual: "🔎", answer: a + b - c,
        hints: ["OR finds results with either word, but a result with both words should be counted only once.", "Add the two totals, then take away the results that were counted twice.", "Example: \"tea\" has 50 results, \"cake\" has 40, and 10 have both. 50 + 40 − 10 = 80 for OR. Now do yours."]
      };
      if (r < 0.67) return {
        text: `A catalog finds ${a} results for <b>${x}</b>, and ${c} of them also contain the word <b>${y}</b>. How many results does <b>${x} NOT ${y}</b> give?`, visual: "🔎", answer: a - c,
        hints: ["NOT removes every result that contains the second word.", "Start with the first total and take away the results that contain both words.", "Example: \"pens\" has 14 results and 6 of them also have \"ink\". \"pens NOT ink\" leaves 14 − 6 = 8. Now do yours."]
      };
      return {
        text: `Which search will give you the <b>fewest</b> results?`, visual: "🔎", choices: shuf([`${x} AND ${y}`, `${x} OR ${y}`, `${x}`]), answer: `${x} AND ${y}`,
        hints: ["Ask which search adds a requirement and which one adds extra possibilities.", "A result must pass every rule you add. The more rules, the fewer results pass.", "Example: \"tea\" has 50 results, \"cake\" has 40. \"tea OR cake\" gives more than either, while a search needing both words gives fewer than either. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Search result math", v: "A + B − both", t: "<b>AND</b> narrows (both words needed). <b>OR</b> widens (either word). <b>NOT</b> removes results with a word." },
      { h: "OR counts once", v: "50 + 40 − 10 = 80", t: "A result with both words is in both lists. For OR, add the totals and take away the overlap so nothing is counted twice." },
      { h: "NOT takes away", v: "14 − 6 = 8", t: "For \"pens NOT ink\", start with all the pens results and take away those that also mention ink." }
    ];
    return { title: "Search result math", make };
  };

  // L19: APA in-text citations and reference names
  const apaCite = () => {
    const make = () => {
      const Y = ri(2012, 2025);
      if (Math.random() < 0.65) {
        const n = ri(1, 3), ps = people(3), l = ps.map(p => p.l);
        let names, ans, w;
        if (n === 1) { names = `${ps[0].f} ${l[0]}`; ans = `(${l[0]}, ${Y})`; w = [`(${ps[0].f} ${l[0]}, ${Y})`, `(${Y}, ${l[0]})`]; }
        else if (n === 2) { names = `${ps[0].f} ${l[0]} and ${ps[1].f} ${l[1]}`; ans = `(${l[0]} & ${l[1]}, ${Y})`; w = [`(${l[0]} et al., ${Y})`, `(${l[0]}, ${Y})`]; }
        else { names = `${ps[0].f} ${l[0]}, ${ps[1].f} ${l[1]} and ${ps[2].f} ${l[2]}`; ans = `(${l[0]} et al., ${Y})`; w = [`(${l[0]}, ${l[1]}, ${l[2]}, ${Y})`, `(${l[0]} & ${l[1]}, ${Y})`]; }
        return {
          text: `In APA style, which is the correct in-text citation for a ${Y} source written by ${names}?`, visual: "📘", choices: shuf([ans, ...w]), answer: ans,
          hints: ["Count the authors. The number of authors decides how many last names show up.", "Only last names are used, never first names, and the year comes after a comma.", "Example: for a 2010 source by Ann Park and Bo Lee, APA uses (Park & Lee, 2010). For four authors it would be (Park et al., 2010). Now do yours."]
        };
      }
      const p = people(1)[0], ans = `${p.l}, ${p.f[0]}.`;
      return {
        text: `In an APA reference list, how is the author <b>${p.f} ${p.l}</b> written?`, visual: "📘", choices: shuf([ans, `${p.f[0]}. ${p.l}`, `${p.l} ${p.f}`]), answer: ans,
        hints: ["A reference list entry starts with the last name.", "Use the last name, a comma, and only the first initial followed by a period.", "Example: the author Ruth Gold is written as Gold, R. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "APA in-text citations", v: "(Park & Lee, 2010)", t: "In APA style, a citation in your sentence shows the author's <b>last name(s)</b> and the <b>year</b>." },
      { h: "How many authors?", v: "1 · 2 · 3+", t: "One author: (Park, 2010). Two authors: (Park & Lee, 2010). Three or more: (Park et al., 2010)." },
      { h: "In the reference list", v: "Gold, R.", t: "The full entry starts with the last name, a comma and the first initial: Gold, R." }
    ];
    return { title: "APA names and years", make };
  };

  // L19: reading pace math
  const readingPace = () => {
    const make = () => {
      const r = Math.random();
      if (r < 0.4) {
        const R = pick([10, 15, 20, 25, 30]), h = ri(2, 10), P = R * h;
        return {
          text: `A source is ${P} pages long. You read ${R} pages an hour. How many hours will it take?`, visual: "⏱️", answer: h,
          hints: ["Hours = how many groups of your hourly pace fit into the total.", "Divide the total pages by the pages you read in one hour.", "Example: 60 pages at 15 pages an hour is 60 ÷ 15 = 4 hours. Now do yours."]
        };
      }
      if (r < 0.7) {
        const d = ri(3, 9), k = pick([8, 10, 12, 15, 20, 25]), P = d * k;
        return {
          text: `You must read ${P} pages in ${d} days, the same amount each day. How many pages is that per day?`, visual: "📅", answer: k,
          hints: ["Share the total evenly across the days.", "Divide the pages by the number of days.", "Example: 72 pages over 6 days is 72 ÷ 6 = 12 pages a day. Now do yours."]
        };
      }
      const k = pick([10, 15, 20, 25]), ph = ri(1, 3), d = ri(2, 8), P = k * ph * d;
      return {
        text: `A report has ${P} pages. You read ${k} pages an hour and study ${ph} hour${ph > 1 ? "s" : ""} a day. How many days will you need?`, visual: "📆", answer: d,
        hints: ["First find how many pages you finish in one whole day.", "Pages per day = pages per hour × hours per day. Then divide the total by that.", "Example: 90 pages, 10 pages an hour, 3 hours a day. 10 × 3 = 30 pages a day, and 90 ÷ 30 = 3 days. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Plan your pace", v: "pages ÷ pace", t: "To plan reading, turn the total into time. Divide the total pages by how many you read in an hour or a day." },
      { h: "Two steps", v: "15 pages × 2 h = 30", t: "If you read 15 pages an hour for 2 hours, that is 30 pages a day. Then divide the book by 30 to find the days." },
      { h: "Tip", v: "💡", t: "Add a spare day. Reading some days goes slower than you plan." }
    ];
    return { title: "Reading pace planner", make };
  };

  // L20: filters shrink the results
  const narrowResults = () => {
    const make = () => {
      const N = 400 * ri(3, 15), p1 = pick([50, 25, 20, 10]), p2 = pick([50, 25, 20, 10]);
      if (Math.random() < 0.5) return {
        text: `A database search finds ${N} results. You tick “peer reviewed only”, which keeps ${p1}% of them. How many results are left?`, visual: "🗃️", answer: N * p1 / 100,
        hints: ["A filter keeps only part of the results. Find that part.", "Divide the total by 100, then multiply by the percent that is kept.", "Example: 800 results, a filter keeps 25%. 800 ÷ 100 × 25 = 200 left. Now do yours."]
      };
      return {
        text: `A search finds ${N} results. The first filter keeps ${p1}% of them. A second filter keeps ${p2}% of what is left. How many results remain?`, visual: "🗃️", answer: N * p1 * p2 / 10000,
        hints: ["Work in two steps. The second filter works on what the first one left.", "Find the first percent of the total, then find the second percent of that new number.", "Example: 1,000 results; keep 50% gives 500; then keep 20% of 500 gives 100. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Filters shrink results", v: "1,000 → 500 → 100", t: "Each filter you tick (date, scholarly, subject) keeps only a part of the results." },
      { h: "Percent of what is left", v: "50% then 20%", t: "With two filters, the second percent is taken from the smaller number the first filter left, not from the start." },
      { h: "Tip", v: "💡", t: "Too many filters can leave nothing. Add them one at a time and watch the count." }
    ];
    return { title: "Filters shrink results", make };
  };

  // L20: rates per 1,000
  const perCapita = () => {
    const TOWNS = ["Oakton", "Riverby", "Pinewood", "Maplewick", "Stonebridge", "Lakehurst"];
    const make = () => {
      if (Math.random() < 0.55) {
        const k = ri(2, 20), r = ri(2, 40) * 10, nm = pick(TOWNS);
        return {
          text: `${nm} has ${k * 1000} people and ${k * r} library cards. How many library cards is that per 1,000 people?`, visual: "🏘️", answer: r,
          hints: ["A rate compares a count to a fixed group size, here 1,000 people.", "Work out how many thousands of people live in the town, then divide the cards by that number.", "Example: a town of 5,000 people has 150 cards. That is 5 thousands, and 150 ÷ 5 = 30 cards per 1,000. Now do yours."]
        };
      }
      let a, b, kA, rA, kB, rB;
      do { kA = ri(2, 6); rA = ri(150, 300); kB = kA + ri(3, 8); rB = rA - ri(20, 80); } while (rB * kB <= rA * kA);
      [a, b] = S(TOWNS, 2);
      return {
        text: `${a} has ${rA * kA} library cards for ${kA * 1000} people. ${b} has ${rB * kB} cards for ${kB * 1000} people. Which town has <b>more cards per 1,000 people</b>?`, visual: "🏘️",
        choices: shuf([a, b, "They are equal"]), answer: a,
        hints: ["A bigger number of cards does not always mean a bigger rate.", "Find the cards per 1,000 people for each town, then compare the two rates.", "Example: Town X has 200 cards for 2,000 people (100 per 1,000). Town Y has 300 cards for 5,000 people (60 per 1,000). Town X has the higher rate even with fewer cards. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Use rates, not raw counts", v: "per 1,000", t: "A big town will have bigger numbers than a small town. To compare fairly, use a <b>rate</b>, like cards per 1,000 people." },
      { h: "How to find it", v: "cards ÷ thousands", t: "5,000 people is 5 thousands. With 150 cards, 150 ÷ 5 = 30 cards per 1,000 people." },
      { h: "Tip", v: "💡", t: "Always ask: out of how many? A count with no group size can fool you." }
    ];
    return { title: "Fair comparisons: rates", make };
  };

  // L20: speech length
  const speechLength = () => {
    const make = () => {
      const w = pick([100, 120, 130, 150]), m = ri(2, 10);
      if (Math.random() < 0.5) return {
        text: `You speak at ${w} words a minute. About how many words fit a ${m}-minute talk?`, visual: "🎤", answer: w * m,
        hints: ["Words fit in each minute, so you need all the minutes together.", "Multiply the words per minute by the number of minutes.", "Example: at 110 words a minute, a 3-minute talk has 110 × 3 = 330 words. Now do yours."]
      };
      return {
        text: `Your speech has ${w * m} words and you speak at ${w} words a minute. How many minutes will it take?`, visual: "🎤", answer: m,
        hints: ["Minutes = how many times your minute pace fits into the speech.", "Divide the total words by the words per minute.", "Example: 480 words at 120 words a minute is 480 ÷ 120 = 4 minutes. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Time your talk", v: "words ÷ pace", t: "A steady speaking pace is about 100 to 150 words a minute. Knowing your pace tells you how long a speech runs." },
      { h: "Two directions", v: "110 × 3 = 330", t: "Words = pace × minutes. Minutes = words ÷ pace." },
      { h: "Tip", v: "💡", t: "Time yourself out loud. Pauses and slides make real talks run a little longer than the math says." }
    ];
    return { title: "How long is the speech?", make };
  };

  // L21: reading correlation values
  const corrStrength = () => {
    const sg = v => (v < 0 ? "−" : "+") + Math.abs(v).toFixed(1);
    const make = () => {
      const r = Math.random();
      if (r < 0.45) {
        const mags = S([0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1], 3), vals = mags.map(m => (Math.random() < 0.5 ? -m : m)), best = vals.reduce((a, b) => (Math.abs(b) > Math.abs(a) ? b : a));
        return {
          text: `Three studies report correlation values (r). Which one shows the <b>strongest</b> link?`, visual: "📈", choices: vals.map(sg), answer: sg(best),
          hints: ["Strength depends on how far the number is from zero.", "Ignore the plus or minus sign when you judge strength. The sign only shows the direction.", "Example: of +0.3, −0.6 and +0.5, the value −0.6 is farthest from zero, so it is the strongest. Now do yours."]
        };
      }
      if (r < 0.8) {
        const v = pick([0.9, 0.8, 0.7, 0.6, 0.5, 0.4]) * (Math.random() < 0.5 ? -1 : 1), up = v > 0;
        return {
          text: `A study finds r = ${sg(v)} between hours of reading and vocabulary score. As reading hours go up, vocabulary scores tend to...`, visual: "📈", choices: ["go up", "go down", "stay exactly the same"], answer: up ? "go up" : "go down",
          hints: ["The sign of r tells the direction of the link.", "A plus sign means the two move together; a minus sign means they move in opposite directions.", "Example: r = −0.5 between hours of video games and homework done means that as gaming goes up, homework tends to go down. Now do yours."]
        };
      }
      const z = pick([0.0, 0.1, -0.1]), others = S([0.8, -0.7, 0.9, -0.6, 0.5], 2);
      const ans = sg(z === 0 ? 0 : z).replace("−0.1", "−0.1");
      return {
        text: `Which correlation value shows almost <b>no</b> linear link between two things?`, visual: "📈", choices: shuf([ans, ...others.map(sg)]), answer: ans,
        hints: ["Think about which number sits closest to zero.", "A value near zero means the two things hardly move together at all.", "Example: of +0.7, −0.8 and +0.1, the value +0.1 is closest to zero, so it shows almost no link. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Reading r", v: "−1 … 0 … +1", t: "The correlation value <b>r</b> runs from −1 to +1. The <b>sign</b> tells the direction and the <b>size</b> tells the strength." },
      { h: "Strength", v: "−0.9 is strong", t: "Values near 1 or −1 are strong. Values near 0 are weak. So −0.9 is much stronger than +0.2." },
      { h: "Tip", v: "💡", t: "Even a strong correlation does not prove one thing causes the other." }
    ];
    return { title: "Read a correlation value", make };
  };

  // L21: weighted rubric
  const weightedRubric = () => {
    const make = () => {
      const cats = ["Research", "Writing", "Citations", "Presentation"], ws = shuf([40, 30, 20, 10]), sc = cats.map(() => ri(5, 10) * 10);
      const total = sc.reduce((s, x, i) => s + x * ws[i] / 100, 0);
      const desc = cats.map((c, i) => `${c} ${ws[i]}% (score ${sc[i]})`).join(", ");
      if (Math.random() < 0.55) return {
        text: `A project grade is weighted: ${desc}. What is the final grade out of 100?`, visual: "📊", answer: total,
        hints: ["Each score counts only as much as its weight. Find each part first.", "For each category multiply the score by its weight percent (divide by 100), then add the parts.", "Example: Quiz 60% (score 80) and Essay 40% (score 50). 80 × 0.6 = 48 and 50 × 0.4 = 20, so the total is 68. Now do yours."]
      };
      const i = ri(0, 3);
      return {
        text: `A project grade is weighted. ${cats[i]} counts for ${ws[i]}% and you score ${sc[i]} out of 100 there. How many points does ${cats[i]} add to your final grade?`, visual: "📊", answer: sc[i] * ws[i] / 100,
        hints: ["Take the percent of your score that the category is worth.", "Divide the score by 100 and multiply by the weight, or multiply the score by the weight as a decimal.", "Example: Quiz counts 60% and you score 80. 80 × 0.6 = 48 points. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Weighted scores", v: "score × weight", t: "Some parts of a project count more than others. A part's <b>weight</b> says how much of the final grade it is worth." },
      { h: "Add the parts", v: "48 + 20 = 68", t: "Quiz 60% with score 80 gives 80 × 0.6 = 48. Essay 40% with score 50 gives 20. The total is 68." },
      { h: "Tip", v: "💡", t: "The weights should add up to 100%. Spend your effort where the weight is biggest." }
    ];
    return { title: "Weighted rubric math", make };
  };

  // L21: plan backward from the due date
  const backSchedule = () => {
    const make = () => {
      const D = ri(18, 30), a = ri(2, 4), b = ri(2, 3), c = ri(1, 3), T = a + b + c;
      return {
        text: `Your project is due on day ${D} of the month. You need ${a} days to draft, ${b} days to revise and ${c} day${c > 1 ? "s" : ""} to proofread, one step after another, all finished the day before it is due. On which day of the month should you start drafting?`, visual: "🗓️", answer: D - T,
        hints: ["Plan backward from the due date. First find the total working days.", "Add up the days for all the steps, then count back that many days from the due date.", "Example: due on day 20, with 2 + 3 + 1 = 6 days of work. 20 − 6 = day 14 to start. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Backward planning", v: "due date − work days", t: "For a big project, start at the due date and count backward to find your latest start day." },
      { h: "Add the steps", v: "2 + 3 + 1 = 6", t: "Add the days for every step. Subtract that total from the due date to find when to begin." },
      { h: "Tip", v: "💡", t: "Start earlier than the math says. A spare day saves you when something goes wrong." }
    ];
    return { title: "Plan backward from the due date", make };
  };

  // ================= LEVEL 19 =================
  const L19 = [
    SC("Search like a pro", "🔎", "Databases understand special symbols. Quotation marks match an exact phrase. A star (*) stands for missing letters. NOT removes a word, OR adds choices, and parentheses group terms.", "Ask whether each symbol makes the search wider, narrower, or more exact.", "Searching “ocean tides” in quotation marks finds that exact phrase, and tid* finds tide, tides and tidal.", [
      "To search for the exact phrase climate change policy, put the phrase in...|quotation marks|a star|parentheses and NOT",
      "A search for jaguar finds cars and animals. To remove the cars, add...|NOT car|AND car|OR car",
      "Which search finds child, children and childhood?|child*|“child” in quotation marks|child NOT children",
      "What does the * symbol do in a search?|Stands in for missing letters|Removes a word|Makes the words exact",
      "Which search is the most precise?|“solar energy” AND schools|energy|solar OR energy",
      "You want results with either teen or adolescent. Use...|teen OR adolescent|teen AND adolescent|teen NOT adolescent",
      "Parentheses in a search are used to...|group terms together|stop the search|add pictures",
      "Too few results? Try adding...|a synonym joined with OR|more AND words|more NOT words"
    ]),
    boolCounts(),
    SC("Signal phrases", "🗣️", "A signal phrase introduces a quotation or paraphrase and names its source, like “According to historian Ana Ruiz,”. It tells readers who is speaking and why they should listen.", "A signal phrase should tell the reader who is speaking and use a verb that fits what that person does.", "“As scientist Wen Li explains, ‘bees travel far for food.’” The phrase names the speaker and uses a fitting verb.", [
      "Which is a signal phrase?|According to the report,|The sky is blue.|Page twelve",
      "Why use a signal phrase before a quote?|It tells readers who is speaking|It makes the quote longer|It hides the source",
      "Which verb is the most neutral?|states|insists|boasts",
      "Which verb shows strong disagreement?|rejects|mentions|notes",
      "A quote placed in a paper with no introduction is called a...|dropped quote|signal phrase|footnote",
      "A signal phrase usually names the...|speaker or author|printer|font",
      "Which signal phrase is best?|As historian Ana Ruiz explains,|Somebody said that|It is said,",
      "After a signal phrase and quote, you still usually add...|a citation|a joke|a new topic"
    ]),
    apaCite(),
    SC("Quote, paraphrase or summary?", "✍️", "A <b>quotation</b> uses the exact words. A <b>paraphrase</b> restates one idea in your own words and sentence shape. A <b>summary</b> shrinks a long text to its main points. All three need a citation.", "Ask yourself: are they the exact words, a rewording of one idea, or a short version of the whole thing?", "Copying a sentence in quotation marks is a quotation. Rewriting it in your own way is a paraphrase.", [
      "You copy exact words from an author. This is a...|quotation|paraphrase|summary",
      "You restate one idea in your own words and sentence shape. This is a...|paraphrase|quotation|summary",
      "You shrink a whole chapter to a few sentences. This is a...|summary|quotation|paraphrase",
      "Changing a few words but keeping the original sentence shape is...|patchwriting, which is risky|a perfect paraphrase|a quotation",
      "Which one needs quotation marks?|Exact words from an author|A paraphrase|A summary",
      "Which ones need a citation?|All three|Only quotations|Only summaries",
      "Best choice when the exact wording is powerful?|Quote it|Summarize it|Skip it",
      "Best choice for the main point of a long article?|Summary|Quotation|Page number"
    ]),
    SC("Correlation is not cause", "🔗", "When two things change together, that is a <b>correlation</b>. It does not prove one causes the other. A hidden third factor (a <b>confounder</b>) may affect both.", "Look for a hidden factor that could explain both things before you say one caused the other.", "Umbrella sales and muddy shoes both go up on rainy days. Umbrellas do not cause mud; the rain does.", [
      "Ice cream sales and sunburns both rise in summer. This shows...|correlation, not proof of cause|ice cream causes sunburn|sunburn causes ice cream sales",
      "Two things that change together have a...|correlation|conclusion|citation",
      "A hidden factor that affects both things is a...|confounding variable|index|footnote",
      "To show a cause, researchers often use...|a controlled experiment|a guess|a bigger font",
      "Towns with more libraries also have more coffee shops. The best explanation?|Bigger towns have more of both|Libraries make coffee|Coffee builds libraries",
      "Students who sleep more get higher grades. This alone shows...|a link, but not proof sleep causes grades|that sleep surely causes grades|nothing at all",
      "Which phrase is the most careful?|is linked to|definitely causes|always leads to",
      "Correlation means two things...|move together|made each other happen|are not connected"
    ]),
    SC("Misleading graphs", "📉", "Graphs can be drawn to fool you. Check the title, the labels, the units, and where the axis starts. A graph that starts at a number other than zero can make small gaps look huge.", "Look at the axis numbers and labels before you trust the shape.", "Two bars of 98 and 100 look wildly different if the axis starts at 97, but they are almost the same.", [
      "A bar graph's axis starts at 90 instead of 0. This can...|make small differences look big|make it more accurate|hide the title",
      "What should you read first on a graph?|The title and axis labels|Only the colors|The tallest bar",
      "The slices of a pie chart should add up to...|100%|1000%|50%",
      "A line graph is best for showing...|change over time|a family tree|a word's meaning",
      "A graph with no units on the axis is...|hard to trust|perfect|colorful",
      "Stretching a graph tall can make a rise look...|steeper|smaller|older",
      "A 3D pie chart can mislead because...|slices at the front look bigger|it uses color|it has a title",
      "Before trusting a graph, ask:|Where did the data come from?|Is it pretty?|Is it big?"
    ]),
    SC("Check a photo or claim", "🖼️", "Before you share a shocking post, use the SIFT moves: <b>S</b>top, <b>I</b>nvestigate the source, <b>F</b>ind better coverage, and <b>T</b>race claims to the original. A reverse image search can show where a picture first appeared.", "Slow down and trace the claim back to where it began.", "A flood photo shared today may have been taken years ago. Finding its first posting shows when it really happened.", [
      "A reverse image search helps you find...|where a picture first appeared|the picture's price|a spelling mistake",
      "A photo of a storm is shared with a new date. How can you check it?|Find the earliest posting of the photo|Count its likes|Zoom in on the colors",
      "Fact-checking sites...|investigate claims and show their evidence|sell products|only share opinions",
      "Before sharing a shocking post, you should...|pause and check|share fast|add more emojis",
      "Why compare a claim with a second, independent source?|Two separate sources agreeing is stronger|It doubles the likes|It saves time",
      "In SIFT, the T stands for...|Trace it to the original|Tell your friends|Take a screenshot",
      "The first move in SIFT, Stop, means...|pause before you react|delete the post|share it right away",
      "An old photo with a false caption is a case of...|missing context|new context|real news"
    ]),
    SC("Edited and AI-made media", "🎞️", "A <b>deepfake</b> is video or audio made or changed by computer to look real. <b>Provenance</b> means where a source came from and who handled it. Without provenance, be careful.", "Ask who made it, where it first appeared, and whether trusted sources show it too.", "A shocking clip with no original source and no coverage from reliable news is not good evidence.", [
      "A deepfake is...|fake video or audio made to look real|a deep lake|a real recording",
      "A clue that an image may be AI-made is...|odd details like garbled text or strange hands|a caption|a big file size",
      "Best way to check a surprising video?|Look for the original source and trusted coverage|Trust it if it is funny|Trust it if it has many views",
      "Labeling edited images is important because...|viewers know what is real|it looks nicer|it is a color rule",
      "If you cannot verify a clip, you should...|not share it as fact|share it anyway|use it as evidence",
      "Many shares prove a video is real?|No, popularity is not proof|Yes, always|Only if it is funny",
      "Provenance means the...|origin and history of a source|price of a source|font of a source",
      "Which is stronger evidence?|A video traced to its original publisher|A reposted clip with no credit|Just a caption"
    ]),
    SC("Note-taking methods", "🗒️", "Good notes help you think. <b>Cornell notes</b> split a page into cues, notes and a summary. A <b>mind map</b> shows how ideas connect. Whatever the method, record the source and page for every note.", "Pick the method that matches what you need to do with the notes.", "To study for a quiz, write questions in the cue column (Cornell). To see how causes link up, draw a mind map.", [
      "Cornell notes divide the page into cues, notes and a...|summary|cover|index",
      "A mind map is useful for...|seeing how ideas connect|writing long quotes|sorting by alphabet",
      "Putting notes in your own words and marking quotes as quotes helps avoid...|accidental plagiarism|spelling errors|boredom",
      "Each note should record...|its source and page|your mood|the weather",
      "Highlighting everything...|stops showing what matters|is the best method|saves time",
      "A smart note-card habit is...|one idea per card|ten ideas per card|no source on the card",
      "Writing a question beside a note is the cue step in...|Cornell notes|mind maps|bibliographies",
      "Reviewing notes soon after taking them helps you...|remember more|forget more|skip homework"
    ]),
    readingPace(),
    PL("Claim, reason, evidence", "🧱", "An argument has parts. Knowing the parts lets you build your own and test other people's.", "Ask of any argument: what is the claim, why do they think so, and what proof do they give?", [
      "claim::the point you want readers to accept::📣", "reason::why the claim should be believed::💬", "evidence::facts, data or examples that support a reason::📊", "assumption::an unstated idea the argument depends on::❓", "premise::a statement offered as a basis for a conclusion::🧱", "conclusion::what the argument says follows from its parts::🏁"
    ]),
    SC("Government and official data", "🏛️", "Governments collect and publish a lot of data and documents: censuses, laws, court records and reports. These are often free and reliable, but always check the date and how the data was collected.", "Think about who collects the information and whether the address shows an official body.", "A census office counts people across a whole country, so it is a strong source for population numbers.", [
      "Which source usually gives official population counts?|A national statistics or census office|A gossip blog|A fan page",
      "A web address ending in .gov (in the United States) belongs to a...|government agency|shopping site|fan club",
      "A web address ending in .edu is used by a...|college or university|bank|game company",
      "A census counts...|every person or household in a country|a few volunteers|only cities",
      "Primary government documents include...|laws, reports and court records|memes|ads",
      "Government statistics are useful because they are often...|collected in a systematic way|just guesses|secret",
      "Even official data should be checked for...|its date and how it was collected|its font|its color",
      "The official text of a law is best found on...|the government's official site|a social post|a quiz"
    ]),
    SC("Oral history and interviews", "🎙️", "An <b>oral history</b> is a recorded interview in which a person shares memories of the past. It is a primary source. Plan open questions, ask permission to record, and say thank you afterward.", "Think about how to be respectful and prepared, and how to check what you hear.", "Asking an older neighbor “What was it like at your school?” gets a story. A yes-or-no question gets one word.", [
      "An oral history is...|a recorded interview about someone's memories|a spoken poem|a textbook chapter",
      "Before an interview, you should...|prepare open questions and ask permission|surprise the person|skip taking notes",
      "Memory can be imperfect, so compare an interview with...|other sources|nothing|the same person again",
      "You should ask permission before...|recording|saying hello|sitting down",
      "A good interview question is...|open, like “What was it like?”|a yes-or-no question|a leading question",
      "After an interview you should send...|a thank-you|a bill|a quiz",
      "To cite an interview, name...|the person, the date and who interviewed|only the topic|nothing",
      "A person telling their own memories gives a...|primary source|tertiary source|advertisement"
    ]),
    SC("Your digital footprint", "👣", "Your <b>digital footprint</b> is the trail of information about you that is left online. Posts, photos and searches can be copied and can last a long time. Use privacy settings and never share private details with strangers.", "Think before you post: could this be seen by anyone, and could it stay forever?", "Before posting a class photo, ask the people in it. Once it is shared, it can be copied.", [
      "Your digital footprint is...|the trail of information you leave online|a shoe print|the size of an app",
      "Because posts can be copied and last, you should...|think before you post|post faster|never read comments",
      "A strong privacy habit is...|using settings to limit who sees your posts|sharing your passwords|accepting everything",
      "Never share publicly your...|home address and phone number|favorite color|favorite book",
      "A strong password is...|long and unique|your name|1234",
      "If a stranger online asks for private details, you should...|stop replying and tell a trusted adult|answer politely|send a photo",
      "Before posting a group photo, you should...|ask the people in it|tag everyone|hide their names",
      "Search engines may save your...|search history|library card color|desk size"
    ]),
    PL("Misinformation words", "📢", "People use different words for false or twisted information. The difference is often about <b>why</b> it was shared.", "Ask: is it false by mistake, false on purpose, or one-sided on purpose?", [
      "misinformation::false information shared without meaning harm::🙃", "disinformation::false information spread on purpose::🎭", "propaganda::one-sided information meant to push a view::📣", "hoax::a made-up story meant to fool people::🃏", "echo chamber::a place where you only hear views like your own::🔁", "rumor::a story passed along without proof::🗣️"
    ]),
    SC("Loaded search words", "🧲", "The words you type shape what you find. A loaded search like “why is X dangerous” tends to find pages that agree. Neutral words give a fairer picture.", "Check whether the search words already pick a side.", "Search “effects of video games on teens” instead of “why video games ruin teens” to see both sides.", [
      "Which search is more neutral?|effects of video games on teens|dangers of evil video games|why video games ruin teens",
      "Searching for “why X is bad” will mostly find...|pages that agree it is bad|balanced pages|nothing",
      "To see both sides, search the topic plus...|pros and cons|only your opinion|a slogan",
      "Loaded words in a search...|nudge the results toward one side|fix the results|delete ads",
      "Which question is neutral?|Does homework improve learning?|Why is homework useless?|Why is homework essential?",
      "A neutral search term is...|plain words without opinion|slang|words with exclamation points",
      "Which search best checks both sides of school uniforms?|school uniforms advantages and disadvantages|why uniforms are terrible|why uniforms are perfect",
      "If your first search found only one side, you should...|rephrase with neutral words|stop searching|assume it is complete"
    ]),
    SC("Full text or just an abstract?", "📄", "Some database results show only an <b>abstract</b> (a short summary). <b>Full text</b> means you can read the whole article. Do not rely on an article you have only seen the abstract of.", "Ask whether you have really read the article or only a summary of it.", "If a database shows only an abstract, ask your librarian how to get the whole article.", [
      "Full text means...|you can read the whole article|you see only the summary|you see just the title",
      "An abstract-only result gives you...|a short summary, not the whole article|the entire article|a picture",
      "If a database has no full text, a librarian can help with...|interlibrary loan|deleting the record|a new password",
      "An embargo means...|access is delayed for a time|it is free forever|it is banned",
      "Citing an article you saw only as an abstract risks...|missing details and misreporting it|nothing|a better grade",
      "A “limit to full text” filter...|shows only articles you can read in full|shows only titles|deletes records",
      "A stable link or permalink gives you...|a link that keeps working|a short-lived link|no link",
      "If you can read only the abstract, you should...|try to get the full article before relying on it|quote it as if you read it all|ignore all research"
    ])
  ];

  // ================= LEVEL 20 =================
  const L20 = [
    SC("Database limiters and subject terms", "🗃️", "Databases let you narrow results with <b>limiters</b> (date, scholarly, full text) and with <b>subject terms</b>, official labels chosen by indexers who read each article.", "Think about which tool narrows by time, by type, or by official topic.", "Searching the official subject term finds articles about the topic even if they use different words.", [
      "A subject term in a database is chosen by...|indexers who label what an article is about|the reader|the printer",
      "Searching by subject term finds articles that...|are about the topic, even with other wording|have the word in the title only|are free",
      "A date limiter helps you find...|sources from certain years|longer words|more authors",
      "Limiting to scholarly (peer-reviewed) sources removes...|most news and magazine items|all journals|nothing",
      "Sort by relevance puts first the results that...|best match your search|are oldest|are shortest",
      "If all your results are from the wrong field, try the...|subject filter|font|print button",
      "Searching the same idea in different words means using...|synonyms|punctuation|shortcuts",
      "A database thesaurus lists...|its official subject terms|prices|images"
    ]),
    SC("Citation counts and impact", "📈", "A <b>citation count</b> tells how many later works cited a paper. A lot of citations suggests influence, but not that the paper is correct. A <b>reference list</b> goes the other way: it shows the sources a paper used.", "Think about what a count can and cannot prove.", "A new paper has few citations because others have not had time to cite it yet.", [
      "A paper cited by many others is probably...|influential, though it can still be flawed|always correct|brand new",
      "Roughly, a journal's impact factor measures how often its articles are...|cited|printed|translated",
      "Why might a very new paper have few citations?|Others have not had time to cite it|It is bad|It is long",
      "Citation counts can be inflated by...|self-citation and fashionable topics|small fonts|library hours",
      "Citing a paper to criticize it still counts as...|a citation|nothing|a retraction",
      "The best way to judge a paper is...|to read how the study was done|to count citations only|to pick the shortest",
      "A “cited by” link shows...|later works that cite this one|sources it used|its price",
      "A reference list shows...|the sources this paper used|later papers that cite it|nothing"
    ]),
    narrowResults(),
    SC("Define it so you can measure it", "📏", "An <b>operational definition</b> says exactly how you will measure something. “Reading habits” is fuzzy, but “minutes read per day, recorded in a log” can be measured.", "Ask whether two different researchers would measure it the same way.", "“Frequent library user” is vague. “Visits at least twice a week” can be counted.", [
      "An operational definition means...|saying exactly how you will measure something|a medical term|a loose guess",
      "To study reading habits, a clear measure is...|minutes read per day, recorded in a log|how nice reading feels|a general vibe",
      "Which is the least vague?|Fifty-two of 100 students|Lots of students|Some students",
      "Why define terms before a study?|So everyone measures the same thing|To use longer words|To avoid data",
      "A clear definition of frequent library use is...|at least two visits per week|going sometimes|liking libraries",
      "Without clear definitions, two studies of happiness may...|measure different things|be identical|have no results",
      "A good definition is...|specific and measurable|poetic|secret",
      "Screen time from an app log is more exact than...|a guess from memory|a clock|a photo"
    ]),
    SC("Survey question wording", "📋", "How you ask changes the answers. A <b>leading question</b> pushes people toward an answer. A <b>double-barreled question</b> asks two things at once. Good questions are short, neutral and about one idea.", "Check whether the question pushes an answer or asks about two things.", "“Isn't the library great?” leads. “How often do you visit the library?” is neutral.", [
      "A leading question...|pushes people toward a certain answer|asks for a name|is short",
      "Which is a leading question?|Don't you agree the library is awesome?|How often do you visit the library?|What do you do at the library?",
      "A double-barreled question...|asks two things at once|has two answers|is long",
      "Which question is double-barreled?|Is the library clean and quiet?|Is the library quiet?|How often is it open?",
      "Which question is better?|How many books did you read last month?|Do you read a lot, like all smart people?|Isn't reading great?",
      "Answer scales like 1 to 5 help because...|answers can be compared|they look pretty|they are long",
      "Anonymous surveys may get more honest answers because...|people feel safe|they are cheap|they are shorter",
      "Trying a survey on a few people first is called a...|pilot test|final test|mistake"
    ]),
    PL("Types of samples", "🎲", "How you pick people for a study matters. Some ways are fair to the whole group, and some are not.", "Ask: did everyone in the population have a fair chance to be picked?", [
      "random sample::everyone has an equal chance to be picked::🎲", "convenience sample::asking people who are easy to reach::🚶", "stratified sample::sampling each group in fair proportion::🍰", "volunteer sample::people choose to take part themselves::🙋", "population::the whole group you want to learn about::🌍", "sample size::how many people are in the sample::🔢"
    ]),
    SC("What “significant” really means", "🧮", "In statistics, <b>statistically significant</b> means a result is unlikely to be just chance. A small <b>p-value</b> (like 0.01) is stronger evidence against chance than a big one (like 0.30). Significant does not always mean important.", "Separate two questions: is it probably real, and is it big enough to matter?", "A huge study may find a tiny but significant difference that no one would notice in real life.", [
      "“Statistically significant” means a result is unlikely to be...|just chance|large|printed",
      "A tiny effect can be statistically significant. It may be...|real but too small to matter|impossible|huge",
      "Which p-value is stronger evidence against chance?|0.01|0.20|0.50",
      "A small p-value suggests the result...|is unlikely to be by chance alone|proves the theory|is huge",
      "Larger samples make it easier to detect...|small effects|nothing|fewer answers",
      "Researchers often use 0.05 as a...|common cutoff|age limit|price",
      "If a study is not significant, that means...|the data did not give strong evidence of an effect|the effect is zero for sure|the study is fake",
      "Reporting only the significant results hides...|the other tests that were run|nothing|font choices"
    ]),
    perCapita(),
    SC("Triangulation", "🔺", "<b>Triangulation</b> means checking a finding with several different sources or methods. Sources must be <b>independent</b>: they gathered their facts separately, rather than copying each other.", "Ask whether the sources truly gathered their facts separately.", "Three news stories that all copy one press release are really one source, not three.", [
      "Triangulation means checking a finding with...|several different sources or methods|one source three times|a triangle drawing",
      "If three independent sources agree, your confidence...|grows|drops|is zero",
      "Three articles that all copy one press release count as...|really one source|three independent sources|no sources",
      "Combining a survey with interviews is...|using two methods|using no method|a mistake",
      "If sources disagree, you should...|find out why and weigh their evidence|pick the one you like|hide the problem",
      "Independent sources are ones that...|gathered their facts separately|copy each other|share one author",
      "A claim backed by only one source is...|less certain|certain|proved",
      "Why mix methods?|Each method has different weaknesses|It is longer|It looks prettier"
    ]),
    SC("Finding themes in words", "🧵", "Not all data is numbers. In <b>qualitative</b> analysis, researchers <b>code</b> interviews or comments by labeling pieces of text, then look for <b>themes</b>: patterns that appear across many answers.", "Look for what appears again and again, and report fairly how common it is.", "If three of ten interviewees mention cost, say “some participants mentioned cost,” not “everyone.”", [
      "Coding interview answers means...|labeling pieces of text by topic|writing secret messages|counting only the words",
      "A theme is...|a pattern that appears across many answers|a color|one single quote",
      "Qualitative analysis looks for...|meaning and patterns in words|only averages|typing errors",
      "A quote used as an example should be...|typical of the data|the rarest one|made up",
      "Using only the most dramatic quotes may...|misrepresent the whole data|help|do nothing",
      "If three of ten people mention cost, a fair statement is...|some participants mentioned cost|everyone mentioned cost|nobody mentioned cost",
      "A codebook lists...|the labels used and what each means|passwords|prices",
      "Two researchers coding the same text and comparing helps...|check consistency|waste time|hide errors"
    ]),
    PL("Concede and refute", "🤝", "A strong argument admits fair points on the other side and then explains why its own claim still holds. Certain words signal each move.", "First give the other side its due, then turn with a contrast word.", [
      "concede::admit that another view has a good point::🤝", "refute::show that an opposing claim is weaker or wrong::🧱", "however::a word that turns from one idea to a contrast::↔️", "although::a word that starts a concession::⚖️", "nevertheless::in spite of that::➡️", "therefore::shows a result or conclusion::🏁"
    ]),
    SC("Active voice and tight writing", "✂️", "In the <b>active voice</b> the doer comes first: “The librarian found the record.” The passive puts the receiver first: “The record was found by the librarian.” Active sentences are usually shorter and clearer. Cut filler words, too.", "Look for who does the action, and for words you can cut without losing meaning.", "“Due to the fact that” can be cut to “because,” and “was found by the team” to “the team found.”", [
      "Which sentence uses the active voice?|The librarian found the record.|The record was found by the librarian.|The record had been found.",
      "Passive voice puts first the...|receiver of the action|doer of the action|verb alone",
      "Which sentence is more concise?|Many studies show it.|There are many studies that show that it is the case.|It is shown by many studies that exist.",
      "“Due to the fact that” can be shortened to...|because|although|however",
      "“Very unique” is wordy because unique already means...|one of a kind|many|common",
      "Which sentence is stronger?|The data show a rise.|The data are showing something like an increase.|It looks like maybe a rise.",
      "Passive voice can be fine when...|the doer is unknown or unimportant|always|never",
      "Reading your draft aloud helps you find...|wordy sentences|fonts|page numbers"
    ]),
    SC("Academic tone", "🎓", "School and research writing uses a clear, formal, precise tone. Avoid slang and text-speak. Use exact words and numbers. Hedge words like “may” and “suggests” show honest caution.", "Pick the wording that is formal, exact and cautious where it should be.", "“Sales rose 12%” is more precise than “sales went way up.”", [
      "Which sentence is more formal?|The results were unclear.|The results were kinda weird.|The results were wacky.",
      "Academic writing usually avoids...|slang and text-speak|facts|citations",
      "Which wording is more precise?|increased by 12%|went up a lot|got kinda bigger",
      "“I think” can often be replaced by...|a claim backed by evidence|a joke|an emoji",
      "Hedging words like “may” and “suggests” show...|careful honesty about certainty|fear|rudeness",
      "Choose the best word: The study ___ a link.|found|grabbed|got",
      "Writing for a school audience calls for...|a formal, clear tone|texting style|secret code",
      "A technical term should be defined...|the first time you use it|never|only at the end"
    ]),
    PL("Parts of an introduction", "🚪", "A strong introduction does several jobs in a short space. Each part has a name.", "Move from wide to narrow: attention, background, then your claim.", [
      "hook::an opening that catches the reader's attention::🎣", "context::background readers need to follow your topic::🗺️", "thesis::the main claim of the whole paper::🎯", "roadmap::a sentence previewing the order of your ideas::🧭", "stakes::why the topic matters::⚖️"
    ]),
    SC("Strong conclusions", "🏁", "A conclusion should restate your main point in fresh words, pull the ideas together, and say <b>why it matters</b> (“so what?”). It may mention limits and next questions. It should not add a brand-new argument.", "Think about what a reader needs at the end: the point, the meaning, and a feeling of finish.", "Instead of ending with “that is all,” say what readers should think or do next.", [
      "A conclusion should...|restate the main point and say why it matters|add a brand-new argument|stop in the middle of a sentence",
      "What should you avoid in a conclusion?|Brand-new evidence|Pulling ideas together|Echoing your thesis idea",
      "Which ending is stronger?|Saying what to do or think next|Saying “that's all”|Saying sorry",
      "The “so what?” question asks...|why your findings matter|where the title is|what font to use",
      "A conclusion is also a place to mention...|limits and next questions|new quotes|your age",
      "A good conclusion mirrors the...|introduction|font|margin",
      "Compared with the body, a conclusion is usually...|short|longer|empty",
      "Copying your thesis word for word shows...|little thinking, so rephrase it|the best style|a rule"
    ]),
    PL("Revise, edit, proofread", "🛠️", "Good writers improve a paper in rounds. Each round has its own job, and doing them in order saves time.", "Fix big things first and tiny things last. Proofreading comes at the very end.", [
      "drafting::getting your ideas onto the page::✏️", "revising::rethinking the big ideas, order and evidence::🏗️", "editing::improving sentences, word choice and clarity::✂️", "proofreading::fixing the last typos and punctuation errors::🔍", "peer response::comments from a classmate on your draft::💬"
    ]),
    SC("Fit a quote into your writing", "🥪", "Use quotes when the exact wording matters. Build a “quote sandwich”: <b>introduce</b> it, give the <b>quote</b>, then <b>explain</b> what it shows. A very long quote is set apart as a block quote, indented and without quotation marks.", "Think about the three layers around a quote, and keep your own voice in charge.", "Introduce: “As Dr. Lee notes,” quote the key words, then explain why they matter to your point.", [
      "A very long quotation is usually set apart as a...|block quote without quotation marks|footnote|title",
      "Use a direct quote mostly when...|the exact wording matters|you want to save effort|your sources are weak",
      "Quote integration means...|blending the quote smoothly into your own sentence|dropping it in alone|hiding it",
      "After a quote, you should explain...|what it shows|nothing|a new topic",
      "Too many quotes make a paper feel...|like a patchwork of other voices|stronger|shorter",
      "A better habit is to quote...|only the key words|a full page|nothing",
      "The quote sandwich has the layers: introduce, quote, and...|explain|erase|retitle",
      "In your paper, the main voice should be...|yours, with sources supporting it|the quotes|silent"
    ]),
    speechLength()
  ];

  // ================= LEVEL 21 =================
  const L21 = [
    PL("When and how long?", "⏳", "Studies can be designed around time. Some take a snapshot and some follow people for years.", "Ask whether the study looks at one moment or follows the same people over time.", [
      "cross-sectional study::looks at many people at one moment in time::📸", "longitudinal study::follows the same people over a long time::🎞️", "cohort::a group sharing something that is followed together::👥", "retrospective::looking back at past records::⏪", "prospective::planning ahead and following people forward::⏩", "pilot study::a small test run before the real study::🧪"
    ]),
    SC("Experiment or observation?", "🔬", "In an <b>experiment</b>, researchers change something and compare groups. In an <b>observational</b> study they watch what already happens. Only a well-designed experiment can strongly show cause.", "Ask: did the researchers change something, or only watch?", "Giving one class a new study method and keeping another the same is an experiment. Studying last year's grades is observational.", [
      "Researchers assign students to two groups and change one thing. This is...|an experiment|an observation only|a poll",
      "Researchers watch what already happens without changing anything. This is...|an observational study|an experiment|a lab test",
      "Which kind of study can strongly show cause?|A well-designed experiment|An observational study|A rumor",
      "Why can't researchers always run an experiment?|It may be unethical or impractical|Experiments are illegal|No one likes them",
      "The group that does not get the treatment is the...|control group|loud group|extra group",
      "Choosing who gets each treatment by chance is...|random assignment|random sampling|rounding",
      "Studying children's lunches by looking at school records is...|observational|experimental|impossible",
      "A survey that only describes opinions is...|descriptive|a causal experiment|a proof"
    ]),
    PL("Fair tests", "🙈", "Experiments try to stop hopes and guesses from changing the results. These terms describe the tools.", "Fairness means the groups are alike and nobody's expectations leak into the results.", [
      "blind study::participants do not know which group they are in::🙈", "double-blind::neither participants nor researchers know the groups::🙉", "placebo::a fake treatment that looks real::🎭", "random assignment::putting people in groups by chance::🎲", "replication::repeating a study to check the results::🔁", "experimenter effect::researcher expectations accidentally change results::👀"
    ]),
    PL("Validity and reliability", "🎯", "Good measurements are both <b>accurate</b> and <b>steady</b>. Researchers use two words for this.", "Validity is about hitting the right target; reliability is about hitting the same spot every time.", [
      "validity::measuring what you claim to measure::🎯", "reliability::getting consistent results when repeated::🔁", "internal validity::confidence the treatment caused the result::🔬", "external validity::how well results apply to other people and places::🌍", "measurement error::the gap between a measurement and the true value::📏"
    ]),
    corrStrength(),
    SC("Outliers", "🎈", "An <b>outlier</b> is a data point far from the others. It might be a mistake or a real unusual case. Outliers can pull the mean a lot, but the median hardly moves.", "Decide whether it is an error or a real case, and say what you did.", "In 3, 4, 4, 5, 90 the number 90 is an outlier. It drags the mean up but barely moves the median.", [
      "An outlier is...|a data point far from the others|the average|a title",
      "A single huge outlier can pull the mean...|a lot|not at all|to zero",
      "Which measure is less affected by outliers?|median|mean|total",
      "Before removing an outlier, you should...|check if it is an error and report what you did|delete it silently|add more outliers",
      "In 2, 3, 3, 4, 80, the outlier is...|80|2|4",
      "An outlier might be...|a typing error or a real unusual case|always a mistake|always real",
      "Hiding outliers without saying so is...|poor research practice|fine|clever",
      "In a scatter plot, an outlier looks like...|a lone dot far from the cluster|a straight line|a title"
    ]),
    SC("Systematic reviews and meta-analysis", "🧩", "A <b>systematic review</b> gathers all the studies on one question using a stated search plan. A <b>meta-analysis</b> combines their numbers. It is only as good as the studies it includes.", "Think about pooling many studies, and about what could be missing.", "Ten small studies may each be unclear, but pooled together they can show a pattern.", [
      "A systematic review...|collects the studies on a question using a stated search plan|reviews one book|is a poll",
      "A meta-analysis...|combines the numbers from many studies|is one small study|is a story",
      "Why trust a meta-analysis more than one small study?|It pools more data|It is shorter|It has pictures",
      "A meta-analysis is only as good as...|the studies it includes|its font|its length",
      "Publication bias means...|exciting results are more likely to be published|all results are published|no results are published",
      "A review that states its search terms and databases can be...|repeated by others|ignored|shorter",
      "Which sits near the top of the evidence ladder?|A systematic review|An opinion piece|A single anecdote",
      "Inclusion criteria are...|rules for which studies count|titles|prices"
    ]),
    SC("Whose voice is missing?", "🗝️", "Archives mostly hold what powerful people and institutions wrote and kept. Many groups left fewer written records. Historians ask “whose voice is missing?” and look for other evidence such as oral histories, objects and community archives.", "Silence in a record is not the same as absence in real life.", "A city's official records may hardly mention a neighborhood, but its families' letters and stories can fill the gap.", [
      "Archives often keep records made mostly by...|people and institutions with power and resources|everyone equally|animals",
      "If a group left few written records, historians may use...|oral histories, objects or other evidence|nothing|guesses only",
      "Asking “whose voice is missing?” helps you see...|gaps and bias in the record|new fonts|prices",
      "If a source does not mention a group, that means...|the source did not record them|they did not exist|nothing at all",
      "Community archives are...|collections kept by communities about their own history|corporate secrets|spam",
      "To get a fuller picture, use...|several kinds of sources from different viewpoints|one famous source|no sources",
      "A source's point of view is its...|perspective|price|file size",
      "A record written long after an event may reflect...|later memories and views|exact truth|fiction"
    ]),
    SC("Sources in translation", "🌐", "Reading a source translated from another language is common, but translations can lose shades of meaning. Cite the translator, and for key words compare the original or other translations.", "Remember that words do not always map one-to-one between languages.", "When a key term matters, look at how two translators handled it.", [
      "A translated source may lose...|shades of meaning|the date|the ISBN",
      "When you cite a translated work, you also name the...|translator|printer|librarian",
      "When meaning is crucial, check...|the original wording or several translations|none of them|a rhyming dictionary",
      "A word with no exact match in another language shows that...|translation cannot always be exact|languages are the same|dictionaries are wrong",
      "Machine translation is useful for a rough idea but should be...|checked for key terms|trusted blindly|printed",
      "Citing “original work 1920, translation 2005” is done to...|show both dates|hide the source|shorten the list",
      "Reading sources in many languages can...|widen the viewpoints you see|narrow them|slow nothing",
      "Idioms like “raining cats and dogs” translate badly because...|their meaning is not literal|they are rude|they are long"
    ]),
    PL("Deductive and inductive", "⬇️", "Two big ways of reasoning: from a general rule down to a case, or from many cases up to a general idea.", "Deduction goes from the general to the specific. Induction goes from specific cases to a general idea.", [
      "deductive reasoning::moving from a general rule to a specific conclusion::⬇️", "inductive reasoning::moving from specific cases to a general conclusion::⬆️", "premise::a statement taken as a starting point::🧱", "valid argument::the conclusion follows from the premises::✅", "sound argument::valid, with true premises::🏅", "generalization::a broad claim drawn from examples::🌐"
    ]),
    PL("The Toulmin model", "🏗️", "Philosopher Stephen Toulmin described arguments in six parts. They show why good arguments are more than a claim plus a fact.", "The warrant is the bridge between the evidence and the claim.", [
      "claim::the main point being argued::📣", "grounds::the evidence offered::📊", "warrant::the link explaining why the grounds support the claim::🌉", "backing::support for the warrant::🧱", "qualifier::a word like “usually” that limits the claim::🎚️", "rebuttal::a condition under which the claim might not hold::🚧"
    ]),
    SC("Finding common ground", "🕊️", "In a respectful argument you can start with what both sides agree on, restate the other view fairly, then explain your own. Arguing against the <b>strongest</b> form of the other side is honest and persuasive. Disagree with ideas, not people.", "A respectful debater shows they understood the other side before answering it.", "“I see your concern about cost, and I share it. Here is why I still think the plan works.”", [
      "Finding common ground means...|starting with what both sides agree on|ignoring the other side|shouting",
      "Restating the other view fairly shows...|you understand it|you agree with it|you gave up",
      "Which opening is best for a respectful debate?|I see your concern about cost, and I share it.|You are wrong.|Nobody cares.",
      "Agreeing on facts first helps because...|you can focus on the real disagreement|it ends the debate|it is boring",
      "“Steelmanning” means...|arguing against the strongest version of the other view|mocking the other view|ignoring it",
      "A good listener in a debate...|notes the other side's points|interrupts|looks away",
      "Respectful disagreement targets...|ideas, not people|people, not ideas|rules",
      "A calm argument that first restates the other side is called a...|Rogerian argument|pie chart|hoax"
    ]),
    PL("Kinds of plagiarism", "📋", "Plagiarism is more than copying a whole page. It can be sneaky or accidental, and it is still a problem. The cure is careful notes and citing as you go.", "Ask: did I use someone's words, ideas or my own old work without credit?", [
      "direct plagiarism::copying exactly without quotation marks or credit::📋", "patchwriting::swapping a few words but keeping the original structure::🧵", "self-plagiarism::reusing your own old work without saying so::♻️", "mosaic plagiarism::stitching together phrases from several sources::🧩", "accidental plagiarism::forgetting to cite or quote by mistake::😬", "fabrication::inventing data or sources::🚫"
    ]),
    SC("Filter bubbles", "🫧", "Many feeds and video lists choose what to show by guessing what will keep you clicking. This can make a <b>filter bubble</b>: you mostly see views you already like. Different people can get different results for the same search.", "Ask whether the list is built to inform you or to hold your attention.", "A library catalog search shows items that match your words, not what you clicked last week.", [
      "A filter bubble is when feeds...|show mostly what you already like|are made of soap|are library filters",
      "Algorithms often choose items by guessing...|what keeps you clicking|what is true|what is oldest",
      "To see outside your bubble you can...|follow varied, reliable sources|only click likes|stop reading books",
      "An echo chamber...|repeats views you already hold|is a quiet room|is a choir",
      "A recommendation feed is built to...|keep your attention|test your knowledge|check facts",
      "Which is less personalized?|A library catalog search|A social media feed|A video suggestion list",
      "When all your sources agree, check whether...|you have seen other viewpoints|the font is nice|they are long",
      "Comparing results with a classmate for the same search can show...|how results differ by person|nothing|that all are equal"
    ]),
    SC("Access to information", "🌉", "The <b>digital divide</b> is the gap between people who have good internet and devices and people who do not. Libraries, open access research, captions and plain-language summaries help more people get and use information.", "Think about what helps everyone, not only some people, reach information.", "A public library offering free computers and internet helps people who have none at home.", [
      "The digital divide is the gap between people who...|have good internet and devices and those who do not|read and write|live in cities and towns",
      "Public libraries help close the gap by offering...|free computers and internet|expensive subscriptions|no help",
      "Open access means research is...|free to read online|free to burn|closed",
      "Plain-language summaries help...|more people understand research|fewer people|nobody",
      "Captions on videos help...|deaf and hard-of-hearing viewers and many others|nobody|only singers",
      "Information is fairer when...|everyone can find and use it|only some can|none can",
      "A paywall...|blocks content until you pay or log in|plays music|warms a page",
      "Library research databases often give access to material...|you could not afford alone|that is secret|that is broken"
    ]),
    SC("Cookies, terms and data", "🍪", "A <b>cookie</b> is a small file a site saves to remember your visit. <b>Terms of service</b> are the rules you agree to. Free apps often earn money from data, so read what is collected and why, and share only what is needed.", "Think about what a site collects and what you really have to share.", "Before you agree, look for what the app collects and whether you can limit it in settings.", [
      "A cookie is a small file a site saves to...|remember things about your visit|bake bread|delete your files",
      "Terms of service are...|rules you agree to when using a site|ads|jokes",
      "Before agreeing to share data, you should read...|what the site collects and why|only the title|nothing",
      "A privacy setting that limits who sees your profile is...|a safer choice|risky|useless",
      "Free apps may earn money by...|collecting and using data|doing nothing|printing books",
      "On public Wi-Fi you should...|avoid sensitive logins|do all banking|share passwords",
      "Data minimization means...|sharing only what is needed|sharing everything|deleting the internet",
      "If an app asks for access it does not need, you should...|say no or ask a trusted adult|accept quickly|share more"
    ]),
    weightedRubric(),
    backSchedule()
  ];

  Object.assign(LIBRARY_LEVELS, {
    19: lvl(19, L19, [0, 1, 3, 4, 5, 6, 10, 12]),
    20: lvl(20, L20, [0, 2, 5, 6, 7, 9, 11, 17]),
    21: lvl(21, L21, [1, 4, 5, 8, 9, 12, 16, 17])
  });
})();
