// ext/library-13-15.js  Mind Lab Library Skills, levels 13-15 (60 lessons)
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
  const deweyOrder = () => {
    const make = () => {
      const base = ri(300, 999), vals = [], out = [];
      let guard = 0;
      while (out.length < 3 && guard++ < 200) {
        const len = ri(1, 3);
        let d = "";
        for (let i = 0; i < len; i++) d += ri(i === len - 1 ? 1 : 0, 9);
        const v = parseFloat("0." + d);
        if (!vals.includes(v)) { vals.push(v); out.push(`${base}.${d}`); }
      }
      const sorted = out.slice().sort((a, b) => parseFloat("0." + a.split(".")[1]) - parseFloat("0." + b.split(".")[1]));
      return {
        text: `Three books share the number ${base}. Which one is shelved <b>first</b>?`, visual: "📚", choices: shuf(out), answer: sorted[0],
        hints: ["Dewey numbers with a decimal point are compared digit by digit, not as whole numbers.", "Look at the first digit after the point. The smaller digit goes first. If they tie, look at the next digit. A missing digit counts like zero.", "Example: 220.4, 220.35 and 220.5. The first digits after the point are 4, 3 and 5. The smallest is 3, so 220.35 comes first. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Decimals on the shelf", v: "641.5 or 641.13?", t: "Dewey numbers can have a decimal point. The numbers after the point are read <b>digit by digit</b>, not as one big number." },
      { h: "Compare left to right", v: "641.13 → 1 … 641.5 → 5", t: "Compare the first digit after the point. The smaller digit comes first on the shelf. Only if they match do you look at the next digit." },
      { h: "Tip", v: "💡", t: "Think of it like alphabetizing with digits. .13 starts with 1, so it goes before .5, even though 13 looks bigger than 5." }
    ];
    return { title: "Dewey decimals in order", make };
  };
  const SP = ["AND", "BAR", "BEL", "CAR", "CLA", "DAV", "DUN", "EVA", "FOX", "GRA", "HAL", "HIL", "JON", "KIM", "LEE", "LOP", "MAR", "MIL", "NEL", "OWE", "PAR", "REY", "ROS", "SMI", "SMY", "TAY", "WAL", "WIL"];
  const spineOrder = () => {
    const make = () => {
      const c = S(SP, 3), first = Math.random() < 0.5, sorted = c.slice().sort();
      return {
        text: `These novels have spine labels. FIC means fiction, and the letters are the start of the author's name. Which one is shelved <b>${first ? "first" : "last"}</b>?`, visual: "🏷️", choices: c.map(x => "FIC " + x), answer: "FIC " + (first ? sorted[0] : sorted[2]),
        hints: ["Fiction is shelved alphabetically by the author's name, which is the letters on the label.", "Compare the first letters. If two match, compare the second letters, then the third.", `Example: FIC ADA, FIC BRO and FIC COX. A comes before B and C, so ${first ? "FIC ADA is first" : "FIC COX is last"}. Now do yours.`]
      };
    };
    make.teach = () => [
      { h: "Spine labels", v: "FIC SMI", t: "The label on a book's spine is its address. A novel often says <b>FIC</b> (fiction) and the first letters of the author's last name." },
      { h: "Put labels in order", v: "FIC ADA → FIC BRO", t: "Shelve them in alphabet order, letter by letter. Compare the first letters. If they match, compare the next ones." },
      { h: "Tip", v: "💡", t: "SMA comes before SMI because A comes before I. Go slowly, one letter at a time." }
    ];
    return { title: "Spine labels in order", make };
  };
  const barGraph = () => {
    const DAYS = ["Mon", "Tue", "Wed", "Thu"];
    const make = () => {
      const k = pick([2, 5, 10]), cs = S([1, 2, 3, 4, 5, 6, 7, 8], 4);
      const vis = `<b>Books borrowed</b> (each 📕 = ${k} books)<br>` + DAYS.map((d, i) => `${d} ${"📕".repeat(cs[i])}`).join("<br>");
      const i = ri(0, 3), j = (i + ri(1, 3)) % 4, r = Math.random();
      if (r < 0.4) return {
        text: `How many books were borrowed on <b>${DAYS[i]}</b>?`, visual: vis, answer: cs[i] * k,
        hints: ["Count the 📕 symbols in that day's row.", "Each symbol stands for more than one book, so multiply the number of symbols by the value of one symbol.", "Example: a row with 3 symbols where each is 5 books is 3 × 5 = 15 books. Now do yours."]
      };
      if (r < 0.75) return {
        text: `How many more books were borrowed on <b>${DAYS[cs[i] > cs[j] ? i : j]}</b> than on <b>${DAYS[cs[i] > cs[j] ? j : i]}</b>?`, visual: vis, answer: Math.abs(cs[i] - cs[j]) * k,
        hints: ["Find the book total for each of the two days first.", "Subtract the smaller total from the larger one.", "Example: one row has 6 symbols, another has 2, and each is 5 books. 30 − 10 = 20 more. Now do yours."]
      };
      return {
        text: "Which day had the <b>most</b> books borrowed?", visual: vis, choices: DAYS.slice(), answer: DAYS[cs.indexOf(Math.max(...cs))],
        hints: ["In a bar graph, the longest bar is the biggest number.", "Compare the lengths of the four rows and find the longest one.", "Example: if Mon has 2 symbols, Tue 5, Wed 3 and Thu 1, then the Tue row is the longest. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Read a picture graph", v: "📕📕📕", t: "A graph can use a picture for each group of items. Always check the <b>key</b> to see what one picture is worth." },
      { h: "Use the key", v: "📕 = 5 books", t: "If one 📕 is 5 books, then 4 symbols mean 4 × 5 = 20 books." },
      { h: "Tip", v: "💡", t: "To compare two bars, find each total and then subtract. The longest bar is the biggest." }
    ];
    return { title: "Read a picture graph", make };
  };
  const meanQ = () => {
    const make = () => {
      const a = Array.from({ length: 4 }, () => ri(5, 25)), s = a.reduce((x, y) => x + y, 0);
      let e = ri(5, 25);
      while ((s + e) % 5) e = ri(5, 25);
      return {
        text: `A library counted books returned on five days: <b>${shuf([...a, e]).join(", ")}</b>. What is the average (mean) number per day?`, visual: "📊", answer: (s + e) / 5,
        hints: ["The mean is a fair-share number: what each day would have if all days were equal.", "Add all the numbers together, then divide by how many numbers there are.", "Example: 4, 6 and 8 add to 18, and 18 ÷ 3 = 6. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "The average", v: "📊", t: "The <b>mean</b> (average) tells you what each item would be if everything were shared out evenly." },
      { h: "Add, then divide", v: "4 + 6 + 8 = 18 → 18 ÷ 3 = 6", t: "Add the numbers. Divide by how many numbers you added." },
      { h: "Tip", v: "💡", t: "Count your numbers before dividing. Five numbers means dividing by 5." }
    ];
    return { title: "Find the average", make };
  };
  const readPlan = () => {
    const make = () => {
      const D = pick([10, 15, 20, 25]);
      if (Math.random() < 0.55) {
        const q = ri(3, 8), r = 5, P = D * q + r;
        return {
          text: `Your book has <b>${P}</b> pages. You read <b>${D}</b> pages a day. How many days will it take to finish? (A part day counts as a day.)`, visual: "📖", answer: q + 1,
          hints: ["Divide the pages in the book by the pages you read each day.", "If some pages are left over after dividing, you need one more day for them.", "Example: 50 pages at 20 a day. Two days is 40 pages, and 10 are left over, so you need one more day: 3 days. Now do yours."]
        };
      }
      const n = ri(3, 9), P = D * n;
      return {
        text: `You want to finish a <b>${P}</b>-page book in <b>${n}</b> days. How many pages should you read each day?`, visual: "📖", answer: D,
        hints: ["Share the pages out evenly across the days.", "Divide the number of pages by the number of days.", "Example: 64 pages in 8 days is 64 ÷ 8 = 8 pages a day. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Plan your reading", v: "📖", t: "A reading plan helps you finish a book or a research source on time." },
      { h: "Pages and days", v: "pages ÷ pages per day", t: "Divide the total pages by the pages you read each day. If there is a remainder, add one more day." },
      { h: "Tip", v: "💡", t: "To find pages per day, divide the pages by the number of days instead." }
    ];
    return { title: "Plan your reading", make };
  };
  const mapScale = () => {
    const make = () => {
      const k = pick([2, 5, 10, 20, 25, 50]), n = ri(2, 12);
      if (Math.random() < 0.6) return {
        text: `On a map, <b>1 cm</b> stands for <b>${k} km</b>. Two towns are <b>${n} cm</b> apart on the map. How far apart are they in real life (km)?`, visual: "🗺️", answer: n * k,
        hints: ["The map scale tells you how far one centimeter really is.", "Multiply the distance on the map by what 1 cm stands for.", "Example: if 1 cm = 4 km and two towns are 3 cm apart, 3 × 4 = 12 km. Now do yours."]
      };
      return {
        text: `On a map, <b>1 cm</b> stands for <b>${k} km</b>. Two towns are <b>${n * k} km</b> apart in real life. How many cm apart are they on the map?`, visual: "🗺️", answer: n,
        hints: ["Think about how many map centimeters it takes to cover the real distance.", "Divide the real distance by what 1 cm stands for.", "Example: if 1 cm = 3 km and the real distance is 15 km, 15 ÷ 3 = 5 cm. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Map scale", v: "1 cm = 10 km", t: "A map is a small picture of a big place. The <b>scale</b> tells you how real distances shrink on the map." },
      { h: "Use the scale", v: "map × scale = real", t: "To find the real distance, multiply the map distance by the scale. To find the map distance, divide." },
      { h: "Tip", v: "💡", t: "Always write the units: cm on the map, km in real life." }
    ];
    return { title: "Use a map scale", make };
  };
  const vennCount = () => {
    const make = () => {
      const A = ri(40, 90), B = ri(30, 80), C = ri(5, Math.min(A, B) - 10);
      const [w1, w2] = pick([["dogs", "puppies"], ["cats", "kittens"], ["space", "planets"], ["bridges", "engineering"], ["volcanoes", "lava"]]);
      const info = `A catalog search for <b>${w1}</b> finds ${A} results. A search for <b>${w2}</b> finds ${B}. ${C} results have <b>both</b> words.`;
      if (Math.random() < 0.5) return {
        text: `${info}<br>How many results will <b>${w1} OR ${w2}</b> find?`, visual: "🔎", answer: A + B - C,
        hints: ["OR finds results with either word. A result with both words is only listed once.", "Add the two big totals, then take away the results you counted twice.", "Example: 'cats' 20, 'kittens' 15, both 5. 20 + 15 = 35, then 35 − 5 = 30 results. Now do yours."]
      };
      return {
        text: `${info}<br>How many results will <b>${w1} NOT ${w2}</b> find?`, visual: "🔎", answer: A - C,
        hints: ["NOT removes every result that has the second word.", "Start with all the results for the first word, then subtract the ones that also have the second word.", "Example: 'cats' has 20 results and 5 of them also have 'kittens'. 'cats NOT kittens' is 20 − 5 = 15. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Counting search results", v: "🔎", t: "Search operators change how many results you get. You can even work the numbers out." },
      { h: "OR and NOT", v: "A + B − both", t: "<b>OR</b>: add both totals, then subtract the overlap. <b>NOT</b>: take the first total and subtract the overlap." },
      { h: "Tip", v: "💡", t: "Picture two overlapping circles. The overlap holds the results with both words." }
    ];
    return { title: "How many results?", make };
  };
  const centuryQ = () => {
    const make = () => {
      const c = pick([12, 13, 14, 16, 17, 18, 19, 20, 21]);
      if (Math.random() < 0.5) {
        const y = ri((c - 1) * 100 + 1, c * 100 - 1);
        return {
          text: `A library has a letter written in <b>${y}</b>. Which century is that? (type the number, like 12 for the 12th century)`, visual: "📜", answer: c,
          hints: ["Centuries are counted from 1. The years 1 to 100 are the 1st century.", "Look at the first digits of the year (the hundreds), and add one. Years ending in 00 belong to the century before.", "Example: the year 1492 has 14 hundreds, and 14 + 1 = 15, so it is the 15th century. Now do yours."]
        };
      }
      const right = ri((c - 1) * 100 + 1, c * 100 - 1);
      const wr = S([c - 2, c - 1, c + 1, c + 2].filter(x => x >= 10 && x <= 21), 2).map(x => ri((x - 1) * 100 + 1, x * 100 - 1));
      return {
        text: `Which year is in the <b>${c}th century</b>?`, visual: "📜", choices: shuf([right, ...wr]).map(String), answer: String(right),
        hints: ["Each century covers 100 years, counted from year 1.", "Take the century number minus one and put 'hundred' after it. The years run just above that.", "Example: the 15th century covers 1401 to 1500, because 14 hundreds come before it. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Which century?", v: "1865 → 19th", t: "Centuries are counted from year 1. The 1st century is years 1-100, the 2nd is 101-200, and so on." },
      { h: "Add one", v: "18|65 → 18 + 1", t: "Take the hundreds part of the year and add 1. The year 1865 is in the 19th century." },
      { h: "Tip", v: "💡", t: "The year 2000 is the last year of the 20th century, and 2001 starts the 21st." }
    ];
    return { title: "Name the century", make };
  };
  const MON = ["Jan", "Feb", "Mar", "Apr", "May"];
  const trendQ = () => {
    const make = () => {
      let v, d, m;
      do {
        v = [ri(100, 200)];
        for (let i = 1; i < 5; i++) v.push(v[i - 1] + ri(-30, 60));
        d = v.slice(1).map((x, i) => x - v[i]);
        m = Math.max(...d);
      } while (new Set(v).size < 5 || Math.min(...v) < 40 || m <= 0 || d.filter(x => x === m).length > 1);
      const vis = "<b>Library visitors each month</b><br>" + MON.map((mo, i) => `${mo}: ${v[i]}`).join("<br>");
      const r = Math.random();
      if (r < 0.4) {
        const ups = d.map((x, k) => k).filter(k => d[k] > 0), i = pick(ups);
        return {
          text: `By how many did the number of visitors <b>rise</b> from <b>${MON[i]}</b> to <b>${MON[i + 1]}</b>?`, visual: vis, answer: v[i + 1] - v[i],
          hints: ["Look at the later month and compare it with the earlier month.", "Subtract the earlier month's number from the later month's number.", "Example: 120 in one month and 150 the next is 150 − 120 = 30 more. Now do yours."]
        };
      }
      if (r < 0.7) return {
        text: "Which month had the <b>most</b> visitors?", visual: vis, choices: MON.slice(), answer: MON[v.indexOf(Math.max(...v))],
        hints: ["Look at the number for each month, not the change between months.", "Compare all five numbers and find the biggest one.", "Example: if the months show 90, 120, 105, 99 and 110, the biggest number is 120, so that month wins. Now do yours."]
      };
      const best = d.indexOf(m), names = MON.slice(0, 4).map((mo, i) => `${mo} to ${MON[i + 1]}`);
      return {
        text: "Between which two months did the number of visitors <b>grow the most</b>?", visual: vis, choices: shuf([names[best], ...S(names.filter((_, i) => i !== best), 2)]), answer: names[best],
        hints: ["Growth is how much the number went up from one month to the next.", "Work out the change for each pair of neighbor months, then pick the largest rise.", "Example: 100, 130, 140, 190. The changes are +30, +10 and +50, so the biggest rise is the last pair. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Read a trend", v: "📈", t: "A trend shows how numbers change over time. Look at the change between neighbors." },
      { h: "Find the change", v: "later − earlier", t: "Subtract the earlier number from the later one. Positive means it grew, negative means it fell." },
      { h: "Tip", v: "💡", t: "The biggest change is the biggest jump up, not just the biggest number." }
    ];
    return { title: "Read a trend", make };
  };
  const pctChange = () => {
    const make = () => {
      const up = Math.random() < 0.5;
      let base, p;
      do { base = pick([20, 25, 40, 50, 80, 100, 200, 250, 400]); p = pick([10, 20, 25, 40, 50, 60, 75]); } while ((base * p) % 100 !== 0);
      const nw = up ? base + base * p / 100 : base - base * p / 100;
      return {
        text: `Last year the library lent <b>${base}</b> books on a topic. This year it lent <b>${nw}</b>. By what percent did the number go <b>${up ? "up" : "down"}</b>? (type the number)`, visual: "📈", answer: p,
        hints: ["First find how much the number changed.", "Divide the change by the ORIGINAL number (last year), then multiply by 100.", "Example: from 30 to 36 is a change of 6. 6 ÷ 30 = 0.2, which is 20%. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Percent change", v: "📈", t: "Percent change tells how big a change is compared with where you started." },
      { h: "Three steps", v: "change ÷ original × 100", t: "1) Subtract to find the change. 2) Divide by the <b>original</b> number. 3) Multiply by 100." },
      { h: "Tip", v: "💡", t: "Always divide by the starting number, not the new one." }
    ];
    return { title: "Percent change", make };
  };
  const medianQ = () => {
    const make = () => {
      const n = pick([5, 7]);
      let a;
      do { a = Array.from({ length: n }, () => ri(3, 40)); } while (new Set(a).size < n);
      const so = a.slice().sort((x, y) => x - y), list = `A student counted the pages in ${n} sources: <b>${a.join(", ")}</b>.`;
      if (Math.random() < 0.5) return {
        text: `${list} What is the <b>median</b>?`, visual: "📏", answer: so[(n - 1) / 2],
        hints: ["The median is the middle number when the numbers are in order.", "Put the numbers in order from smallest to largest, then find the one in the very middle.", "Example: 9, 3, 7 in order is 3, 7, 9, and the middle one is 7. Now do yours."]
      };
      return {
        text: `${list} What is the <b>range</b>?`, visual: "📏", answer: so[n - 1] - so[0],
        hints: ["The range tells how spread out the numbers are.", "Subtract the smallest number from the largest number.", "Example: 4, 11 and 6 have a largest of 11 and a smallest of 4, so the range is 11 − 4 = 7. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Median and range", v: "📏", t: "The <b>median</b> is the middle number. The <b>range</b> shows how spread out the numbers are." },
      { h: "Order first", v: "3, 7, 9", t: "Put the numbers in order. The median is in the middle. The range is largest minus smallest." },
      { h: "Tip", v: "💡", t: "The median is not changed much by one super big or super small number, so it is good for data with odd values." }
    ];
    return { title: "Median and range", make };
  };

  // ---------- LEVEL 13 ----------
  const L13 = [
    deweyOrder(),
    spineOrder(),
    PL("Parts of a newspaper", "📰", "A newspaper story has named parts. Knowing them helps you find the facts and credit them.", "The lede holds the most important facts, so read it first.", [
      "headline::the big title of a story::📰", "byline::the line that names who wrote the story::✍️", "dateline::the place a story was reported from, at its start::📍",
      "lede::the opening sentence or two with the key facts::🔑", "caption::words that explain a photo::🖼️", "editorial::a piece giving the newspaper's opinion::💬",
      "sidebar::a small box with extra facts beside a story::🧾", "classifieds::small ads for jobs or things for sale::🏷️"
    ], { qd: "Which newspaper part is this?", qt: "What is this part of a newspaper?" }),
    SC("Magazines, journals and papers", "🗞️", "A periodical comes out again and again on a schedule. Different kinds suit different jobs.", "Match the job to the kind of publication: daily news, long studies, colorful features, or old records.", "To learn what happened in town this morning, use a newspaper, not a dictionary.", [
      "You need today's local election results. Which source fits?|A newspaper|A scholarly journal|An atlas",
      "You need a long, reviewed science study. Which source fits?|A scholarly journal|A comic book|A daily newspaper",
      "You want an illustrated monthly feature with an interview about a hobby. Which fits?|A magazine|A dictionary|A phone directory",
      "You want to read how people described an event a hundred years ago. Which fits?|An old newspaper in an archive|Today's magazine|A new textbook",
      "Which of these is a periodical?|A monthly magazine|A dictionary|A single novel",
      "Why check the date of a newspaper issue?|News changes, so you need to know when it was written|To count the pages|To find the price",
      "Where do libraries often keep very old newspaper issues?|On microfilm or in digital archives|With the picture books|In the lost-and-found",
      "A back issue is...|An older copy of a magazine or paper|A torn page|The last page"
    ]),
    SC("What is an ISBN?", "🔢", "An ISBN is a number that names one edition of a book. Libraries and stores use it to find exactly the right book.", "Think about what the number is for: telling one edition or item apart from all others.", "A paperback and a hardcover of the same story have different ISBNs, because they are different editions.", [
      "An ISBN is a...|Number that identifies one edition of a book|Rule for shelving books|Kind of library card",
      "A hardcover and a paperback of the same title usually have...|Different ISBNs|The same ISBN|No ISBN",
      "Where is the ISBN usually printed?|On the back cover near the barcode and on the copyright page|Inside the index|Only on the spine label",
      "Why search by ISBN?|It finds exactly the edition you want|It lists every book on the topic|It shows reviews",
      "A newer edition of a textbook gets...|A new ISBN|The same ISBN as the old edition|No number at all",
      "Most ISBNs made today have how many digits?|13|8|5",
      "A number called an ISSN identifies...|A whole periodical, like a magazine series|One chapter|One page",
      "Which tells you where an item sits on the shelf?|The call number|The ISBN|The price"
    ]),
    SC("Open and closed questions", "❓", "A closed question has a short fact answer. An open question needs several sources and some thinking, so it makes a better research project.", "Ask yourself: could one fact answer it, or do I need to gather and weigh evidence?", "'What is a whale?' has a quick answer. 'How do whales communicate in the ocean?' needs real research.", [
      "Which is an open research question?|Why did cities grow near rivers?|Is a river wet?|Which river is the longest?",
      "Which is a closed question?|How many moons does Mars have?|How might robots change what we know about Mars?|Why explore Mars?",
      "Which question would start the best project?|How do bees help food crops grow?|Do bees fly?|What color is a bee?",
      "Which word often starts an open question?|Why|Is|Did",
      "Yes-or-no questions are usually...|Too small for a big project|Perfect research questions|Impossible to answer",
      "Which question needs you to weigh evidence?|Should schools start later in the morning?|What time does school start?|How many students are in class?",
      "How could you improve 'Tell me about sharks'?|Ask 'How do sharks find food in the ocean?'|Say 'sharks' twice|Shorten it to 'Sharks'",
      "A good research question is...|Focused, and needs several sources|Answered with one fact|Too big to ever finish"
    ]),
    SC("Notes that keep their sources", "📝", "Every note should remember where it came from. Then you can cite correctly and go back to check the fact.", "Ask: if I read this note next week, could I find exactly where I got it?", "A note says 'Whales can live 70 years (Book 2, p. 14)'. Now you know where to look.", [
      "Why write the source on every note?|So you know where each fact came from|To make notes longer|To use more paper",
      "You copied exact words into your notes. What should you add?|Quotation marks|Nothing|A smiley face",
      "A page number on a note helps you...|Find the fact again and cite the page|Skip citing|Guess the title",
      "Your note is in your own words. Do you still need the source?|Yes, the idea still came from that source|No, they are your words so no credit|Only if it is long",
      "How should you mark your own thoughts in your notes?|Keep them apart from facts from sources|Mix them in without a mark|Write them as quotes",
      "A smart way to keep sources straight is to...|Number each source and put the number on its notes|Mix all notes in one pile|Rely on memory",
      "What goes on a source card?|Author, title, date, and where you found it|Your favorite color|Only the library's address",
      "You cannot find where a note came from. What now?|Find the source again before using it|Use it anyway|Make up a source"
    ]),
    barGraph(),
    meanQ(),
    SC("Filing and alphabetizing", "🔤", "Libraries file titles and names using agreed rules. They help everyone find things in the same place.", "Titles ignore starting words like A, An and The. Names are filed by last name first. Compare letter by letter.", "'The Hobbit' is filed under H, because we skip 'The'.", [
      "'The Hobbit' is filed under which letter?|H|T|B",
      "'A Wrinkle in Time' is filed under which letter?|W|A|T",
      "Which comes first in a title list?|The Apple Tree|Banana Split|They tie",
      "'101 Dalmatians' is often filed as if spelled out. Under which letter?|O (one hundred one)|D|T",
      "Mary Shelley is filed under...|Shelley|Mary|M",
      "Fiction shelves are arranged by...|The author's last name|The title|Cover color",
      "Two authors have the last name Park. What breaks the tie?|The first name|Cover color|Page count",
      "Which name goes between Cole and Cook?|Colt|Cord|Cox"
    ]),
    SC("Author names in a list", "✍️", "A list of sources is usually put in alphabetical order by the author's last name, so the name is written last name first.", "Last name first, then a comma, then the first name. Look at the number of authors.", "Maria Lopez is written as Lopez, Maria.", [
      "How is Maria Lopez listed in a Works Cited list?|Lopez, Maria|Maria Lopez|M. Lopez",
      "Two authors, Sam Chen and Ana Cruz. How does MLA list them?|Chen, Sam, and Ana Cruz|Chen, Sam, Cruz, Ana|Sam Chen and Ana Cruz",
      "Three or more authors, and the first is Lee Park. How does MLA list them?|Park, Lee, et al.|Park, Lee, and others|Lee Park and all",
      "Works Cited entries are arranged...|Alphabetically by the first word, usually the author's last name|By the date you added them|By page number",
      "A source has no author. What does the entry start with?|The title|A blank line|The word Unknown",
      "Which entry comes first in the list?|Adams, Ruth|Baker, Tom|Neither, it is a tie",
      "Why is the last name written first?|So the list can be alphabetized|It sounds nicer|It is shorter",
      "In what order do 'Ruiz, Ana' and 'Ruiz, Ben' appear?|Ana first, by first name|Ben first|Random"
    ]),
    PL("Word parts from the library", "🧩", "Many words in books and libraries are built from word parts. Learn the parts and you can guess new words.", "Look at a long word and split it into parts: bibliography is biblio (book) + graph (write).", [
      "biblio-::book::📚", "graph::write or draw::✏️", "bio-::life::🌱", "auto-::self::🪞", "geo-::earth::🌍", "chron-::time::⏰", "tele-::far away::📡", "-scope::look at or see::🔭"
    ], { qd: "Which word part fits this meaning?", qt: "What does this word part mean?" }),
    SC("Reading book reviews", "⭐", "A review tells what someone thought of a book. A blurb is different: it is written to sell the book.", "Good reviews give reasons and examples. Blurbs on covers are written to make you want the book.", "'I loved how the hero solves the puzzle in chapter 3' gives a reason. 'Best ever!!!' does not.", [
      "What is a book blurb?|A short description on the cover meant to sell the book|A long review by a critic|The index",
      "A review that only says 'Best book ever!!!' is...|Not very helpful because it gives no reasons|Very detailed|A scholarly source",
      "A good review explains...|What the reviewer liked or disliked, and why|Only the price|Only the page count",
      "Who usually writes the blurb?|The publisher or author, to sell the book|An independent critic|The librarian",
      "Why read more than one review?|Different readers notice different things|To make the book longer|Reviews always agree",
      "A review that gives away the ending has a...|Spoiler|Preface|Footnote",
      "Which review is likely more trustworthy?|One with examples from the book|One with only exclamation marks|One that never mentions the book",
      "A star rating shows...|A summary of opinions, not the whole story|Exactly how good it is for you|The book's reading level"
    ]),
    SC("E-books and audiobooks", "🎧", "Libraries lend digital books too. They follow borrowing rules, just like paper books.", "Think about library rules: you need a card, there are limited copies, and loans end on their own.", "A digital loan can end by itself on the due date, so there is no late fee.", [
      "To borrow a library e-book you usually need...|A library card|A bank card|A store coupon",
      "When the loan time ends, a borrowed e-book usually...|Returns itself automatically|Must be mailed back|Charges fines forever",
      "Many e-books have a limited number of copies, so you may...|Place a hold and wait|Download unlimited copies|Photocopy it",
      "Can two people read a one-copy e-book at once?|Often not; it is lent to one reader at a time|Always yes|Only on weekends",
      "An audiobook is...|A book you listen to as it is read aloud|A book with only pictures|A book with no words",
      "You downloaded a loan and have no internet. You can...|Read or listen offline until it expires|Do nothing, it disappears|Send it to friends",
      "Why should you not share a borrowed e-book file?|It is only lent to you for the loan period|Files are too heavy|Sharing makes viruses",
      "Where do you find a library's digital books?|On the library's own website or app|On any random site|In the lost-and-found"
    ]),
    SC("Using shared computers", "🖥️", "Library computers are used by many people. Good habits keep your accounts and information safe.", "Before you leave a shared computer, ask what you would not want the next person to see.", "After checking your email on a library computer, log out so the next person can't open it.", [
      "When you finish on a library computer you should...|Log out of all your accounts|Leave them open for the next person|Only turn off the screen",
      "A shared computer asks to save your password. You should...|Decline|Accept always|Accept for email only",
      "You step away for a minute from a shared computer. Best move?|Log out or lock it|Leave it open|Ask a stranger to watch it",
      "Where should you save your work on a public computer?|On a drive or account you own, then delete the copy|On the desktop forever|In the trash",
      "A pop-up says you won a prize, click here. You should...|Close it and tell a librarian|Click it|Type in your address",
      "Public Wi-Fi is shared with many people, so avoid...|Typing bank or sensitive passwords|Reading the news|Looking up a book",
      "Why close the browser when you are done?|So the next person can't see your pages|To save power only|To fix the screen",
      "You see someone's account still open. What do you do?|Don't read anything and tell a librarian|Read their messages|Post for them"
    ]),
    SC("Headlines and clickbait", "🎣", "Clickbait is a headline built to make you click, with shock or mystery, instead of telling you the facts.", "A good headline tells you what the story is about. Beware of teasers that hide the facts.", "'You won't BELIEVE this!' tells you nothing. 'Library adds weekend hours' tells you the news.", [
      "A clickbait headline tries to...|Get clicks with shock or mystery|Give the facts clearly|List its sources",
      "Which headline is more informative?|City council approves new library budget|You won't BELIEVE what the council did!|The shocking secret of the council",
      "Clickbait often uses ALL CAPS, lots of !!! and...|Vague teasers like 'you won't believe'|Specific dates and numbers|Footnotes",
      "A headline says 'Study shows...'. What do you check?|Read the article to see what the study found|Nothing, believe it|Only the headline's size",
      "The headline and the article disagree. What should you do?|Trust the article's details and check further|Trust the headline|Trust neither forever",
      "What is best before sharing a shocking headline?|Read the whole article and check the source|Share it quickly|Make it shorter",
      "Why do some sites use clickbait?|More clicks can earn them ad money|They want to teach you|Libraries pay them",
      "Who often writes the headline?|An editor, so it may leave out details|Always the scientist|The reader"
    ]),
    readPlan(),
    SC("Organize your digital files", "🗂️", "Research gets messy fast. Clear names, folders and backups keep your work safe and easy to find.", "Make names clear for a future you who has forgotten what is inside, and keep more than one copy.", "A file called 'whales-notes-2026-11-08' is easier to find than 'doc1'.", [
      "A good file name is...|Clear, like 'whales-notes-oct12'|Just 'doc1'|'asdf'",
      "Folders help you...|Group files by project|Make files bigger|Delete files",
      "Why keep a backup copy?|A device can break and lose your files|To use more space|The law says so",
      "Where could a backup go?|A cloud account or a second drive|The same device only|Nowhere",
      "Before changing an important draft, you can...|Save a copy with a new name or date|Delete the old one right away|Rename it 'final final'",
      "File names with dates sort best when written...|Year-month-day, like 2026-11-08|Month names only|With slashes",
      "What is risky?|Keeping the only copy of a project on one USB stick|Saving in two places|Naming files clearly",
      "Why save source links with your notes?|You can find them again and cite them|To hide them|To lose them on purpose"
    ])
  ];

  // ---------- LEVEL 14 ----------
  const L14 = [
    PL("Citation styles", "📘", "Different subjects use different citation styles. The style decides how a citation looks.", "Ask your teacher which style to use, then follow it the same way every time.", [
      "MLA::a style often used in English and the humanities::📘", "APA::a style often used in science and social science::🧪", "Chicago::a style used in history and many books, often with footnotes::📜",
      "Works Cited::the list of sources at the end in MLA style::📋", "References::the list of sources at the end in APA style::📑", "bibliography::a list of sources, the name used in Chicago::📚",
      "footnote::a note at the bottom of a page that gives a source::👣", "in-text citation::a short credit inside your writing, like author and page::💬"
    ]),
    SC("Start with an encyclopedia", "🌐", "An encyclopedia, even an online one, is a good place to start. It gives background and new search words. It is rarely the place to stop.", "Use it to learn the big picture and find leads, then check important claims in other sources.", "Read the overview, note new keywords, then follow the references to deeper sources.", [
      "An online encyclopedia article can help you...|Get background and find new search words|Replace all other research|Be the proof for every claim",
      "The reference list at the bottom of an article is useful because...|It points to sources you can read next|It is decoration|It means the article is perfect",
      "Anyone can edit some wikis. So you should...|Check important facts in other sources|Trust every word|Edit them to match your essay",
      "What shows that an article may have changed recently?|The edit history or 'last updated' date|The font|The title",
      "A warning says the article 'needs more sources'. This means...|Be extra careful with its claims|It is the best page|It is certain",
      "Why use a general encyclopedia early?|To learn the big picture before you narrow your topic|To finish the paper|To avoid reading",
      "A claim has no reference. What can you do?|Look for it in a trusted source before using it|Use it anyway|Delete the page",
      "For a school paper, you usually cite...|The sources you really used, after checking them|Only the first page you see|Nothing"
    ]),
    PL("Kinds of evidence", "🔍", "Evidence is what backs up a claim. Strong writers use different kinds and name the source of each.", "Use more than one kind of evidence, and say where it came from.", [
      "statistic::a number from a study or count::🔢", "expert quote::words from a person who knows the topic well::🎓", "example::one instance that shows the point::🔍",
      "anecdote::a short personal story::🗣️", "eyewitness account::a report from someone who was there::👀", "analogy::a comparison to something familiar::🔗",
      "survey result::answers collected from many people::📊", "case study::a close study of one situation over time::🔬"
    ], { qd: "Which kind of evidence is this?", qt: "What kind of evidence is this?" }),
    PL("Faulty reasoning", "🧠", "A fallacy is a mistake in reasoning that can fool you. Spotting them helps you judge arguments fairly.", "Ask: does the evidence really support the claim, or is the argument playing a trick?", [
      "straw man::twisting someone's view to make it easy to attack::🎯", "false choice::pretending there are only two options when there are more::✌️", "hasty generalization::deciding about everyone from too few examples::🏃",
      "personal attack::insulting the speaker instead of answering the idea::🗯️", "circular reasoning::using the claim itself as its proof::🔄", "slippery slope::claiming one small step will surely lead to disaster::⛷️",
      "popularity appeal::saying it is true because many people believe it::👥", "red herring::bringing up an unrelated topic to distract::🐟"
    ], { qd: "Which fallacy is this?", qt: "What does this fallacy mean?" }),
    PL("Transition words", "🔗", "Transition words connect your ideas so a reader can follow you from one sentence to the next.", "Pick the transition that shows how your ideas are related: add, contrast, reason, result, example or ending.", [
      "however::shows a contrast::↔️", "therefore::shows a result::➡️", "for example::introduces an illustration::🔍", "in addition::adds another point::➕",
      "first::starts a sequence::1️⃣", "in conclusion::signals the ending::🏁", "because::gives a reason::❓", "meanwhile::shows two things happening at the same time::⏱️"
    ], { qd: "Which transition does this job?", qt: "What does this transition do?" }),
    SC("Make a clear slide", "🖼️", "A slide supports your talk. It should be easy to read in a few seconds, with credit for any work that is not yours.", "Think of your audience at the back of the room: what would they see in five seconds?", "One big picture and a short title beats a slide full of tiny sentences.", [
      "A good slide has...|Few words and a clear picture or chart|A full paragraph in tiny type|Ten colors",
      "How many main ideas fit best on one slide?|One|As many as fit|None",
      "Where do you credit an image you did not make?|On the slide or a sources slide|Nowhere|Only in your head",
      "Text on a background should be...|High contrast and easy to read|Close to the background color|Blinking",
      "Reading all the slide text word for word is...|Not ideal; explain it in your own words|The best practice|Required",
      "Which text size helps the back row?|Large|Tiny|Whatever fits",
      "A chart on a slide should have...|A title and labels|No labels|Hidden numbers",
      "Too many animations can...|Distract the audience from the message|Make it clearer|Replace citations"
    ]),
    SC("Breaking news", "⚡", "When news is just breaking, details are still coming in. Early reports can be incomplete or wrong.", "Wait, compare several reliable sources, and look for confirmation before believing or sharing.", "Three trusted outlets reporting the same facts is stronger than one fast post.", [
      "Early reports of breaking news are often...|Incomplete or later corrected|Always complete|Fully checked",
      "What is the best move when news is just breaking?|Wait for several trusted outlets to confirm|Share the first post|Believe the loudest voice",
      "A trusted outlet changes a story with a correction. This shows...|It fixes errors, which is a good sign|It is lying|Nothing",
      "Why do details change in a developing story?|More facts come in as reporters check|Reporters get bored|Facts shrink",
      "A story says 'sources say'. What do you look for?|Confirmation from named, reliable sources|How long it is|Nothing",
      "A viral post has no date. What should you do?|Find out when it was first posted before trusting it|Assume it is new|Share it",
      "Which is better for deep understanding of an event?|Later in-depth reporting and books|The first short post|A rumor",
      "Many outlets repeat the same unconfirmed claim. This may mean...|They copied one original source, so find it|It is definitely true|It is a fact"
    ]),
    mapScale(),
    PL("Creative Commons and permission", "🏷️", "Some creators share their work with a license that says how you may use it. Reading the license keeps you honest and legal.", "No license usually means all rights reserved. When unsure, ask or choose a different image.", [
      "Attribution::you must credit the creator::🏷️", "NonCommercial::you may not use it to make money::🚫", "ShareAlike::share your new work under the same license::🔁", "NoDerivatives::you may share it but not change it::🔒",
      "public domain::no copyright is left, so anyone may use it::🌐", "all rights reserved::you must ask permission before using::⛔", "remix::to change or build on someone's work::🎛️", "permission::an owner's approval to use their work::✅"
    ]),
    vennCount(),
    centuryQ(),
    SC("Quotes with ellipses and brackets", "✂️", "Sometimes a quote is too long. You may trim it or clarify it with small marks, but you must never change what the author meant.", "Marks are tools: one shows words left out, another shows words you added. The meaning must stay the same.", "'The library ... is tall' shows that some words were left out.", [
      "Three dots (...) in a quote show that...|Words were left out|Words were added|The quote is false",
      "Square brackets [ ] in a quote show that...|You added or changed a word to make it clear|Words were removed|A page number follows",
      "You may leave words out of a quote if you...|Use an ellipsis and keep the meaning|Change the meaning|Do it secretly",
      "The original says: 'The library, built in 1920, is tall.' Which correctly leaves out the date?|'The library ... is tall.'|'The library is tall.' with no mark|'The library, built, is tall.'",
      "Words inside quotation marks must be...|Exact, matching the source|Roughly right|Improved",
      "A quote taken out of context can...|Change what the author meant|Make it clearer always|Never be a problem",
      "Quotation marks show that...|The words are exactly someone else's|It is a new idea|It is a title only",
      "In '[The book] was great', the brackets are there to...|Tell the reader what a pronoun stood for|Hide the quote|Add a credit"
    ]),
    PL("Read with a plan: SQ3R", "📖", "SQ3R is a plan for reading nonfiction: Survey, Question, Read, Recite, Review. It helps you remember what you read.", "Before you read, look at the headings and pictures. After you read, say the key points in your own words.", [
      "survey::look over headings, pictures and bold words first::👀", "question::turn headings into questions to answer::❓", "read::read to find the answers::📖", "recite::say the answers aloud in your own words::🗣️",
      "review::go back over the material to remember it::🔁", "reading goal::decide what you want to learn before you read::🎯", "predict::guess what the text will be about::🔮", "summarize::tell the key points briefly::📝"
    ]),
    SC("Fair use at school", "🎓", "Copyright law lets you use small parts of works for school in fair ways. Fair use has limits, and it does not replace giving credit.", "Ask: how much am I using, why, and could it hurt the owner? When unsure, ask.", "Quoting a few lines with credit for a book report is usually fine. Copying the whole book is not.", [
      "A short quote with credit in a school report is usually...|Allowed and expected|Illegal|Rude",
      "Copying a whole workbook to give to friends is...|Not fair use|Fine|Required",
      "Fair use depends on how much you use, why, and...|The effect on the owner's sales|Your height|The weather",
      "You want a photo from a website for your report. Check...|Its license or permission first|Nothing, it is free|Its file size",
      "Which use is more likely fair?|A few lines for a book report|A whole movie posted online|An entire album shared",
      "Does giving credit make copying okay?|Not by itself; you still follow the rules|Yes, always|Only on Mondays",
      "Public domain works are...|Free to use because copyright has ended|Always copyrighted|Secret",
      "If you are unsure about using something, you should...|Ask a teacher or librarian|Use it anyway|Hide it"
    ]),
    PL("Jobs with information", "🧑‍💼", "Many people work to collect, protect and share information. Knowing who does what can help you ask the right person.", "If you have a research question, a reference librarian is a great person to ask.", [
      "librarian::helps people find and use information::📚", "archivist::keeps old records and documents safe::🗄️", "curator::chooses and cares for a museum's collection::🏛️", "cataloger::describes items so the catalog can find them::🏷️",
      "reference librarian::helps with research questions::🙋", "journalist::reports the news::🎙️", "editor::checks and improves writing before it is published::✂️", "data analyst::studies numbers to find patterns::📈"
    ], { qd: "Which job is this?", qt: "What does this person do?" }),
    trendQ(),
    SC("Ask a librarian well", "🙋", "Librarians love research questions. A clear request gets you better help.", "Say what your topic is, what you need, and what you already tried.", "'I am researching tides for science. I tried the catalog and got too many results. Can you help me narrow it?'", [
      "What is the best way to start a help request?|Say your topic, assignment, and what you have tried|Just say 'help'|Walk away",
      "A librarian can help you find...|Sources and search tips|Test answers|Homework done for you",
      "Which follow-up question is good?|Can you show me how you searched?|Can you do it for me?|Is it recess yet?",
      "What will librarians not do?|Do your assignment for you|Show you databases|Explain call numbers",
      "The reference desk is for...|Research questions|Paying fines only|Naps",
      "Many libraries let you ask questions by...|Chat, phone or email on the library's own site|Messages from strangers|Posting your address",
      "Why tell the librarian your due date?|They can suggest the fastest sources|They will grade it|They will extend it",
      "A librarian shows you a method. You should...|Try it and ask more if you get stuck|Ignore it|Forget it"
    ]),
    SC("Meaning from clues", "🧩", "When a word is new, the sentence around it often explains it. These are context clues.", "Look for a definition, a synonym, an example, or a contrast with a word like 'but'.", "'The report was concise, short and clear.' The words after the comma explain 'concise'.", [
      "The librarian was meticulous, checking every label twice. 'Meticulous' means...|Very careful|Sloppy|Sleepy",
      "The atlas was obsolete, so out of date that countries had changed. 'Obsolete' means...|No longer current|Brand new|Very heavy",
      "We trust her because she is credible, always backed by evidence. 'Credible' means...|Believable|Silly|Late",
      "The writer was biased, always leaning unfairly toward one side. 'Biased' means...|Unfair in favor of one side|Neutral|Famous",
      "To verify the fact, she checked a second source to make sure it was true. 'Verify' means...|Confirm|Copy|Hide",
      "The old maps are stored in the archive, a place that keeps records. 'Archive' means...|A place that keeps records|A kind of game|A new road",
      "The directions were ambiguous, with more than one possible meaning. 'Ambiguous' means...|Unclear|Perfect|Funny",
      "Unlike her wordy first draft, the final version was brief and clear. A good word for the final version is...|Concise|Tangled|Noisy"
    ])
  ];

  // ---------- LEVEL 15 ----------
  const L15 = [
    PL("Parts of a research article", "🔬", "Scholarly articles follow a pattern. If you know the parts, you can find what you need fast.", "Read the abstract first. It tells you if the article is worth your time.", [
      "abstract::a short summary at the start::📝", "introduction::explains the question and why it matters::❓", "methods::tells how the study was done::🧪", "results::shows what was found::📊",
      "discussion::explains what the results mean::💭", "references::lists the sources the authors used::📚", "conclusion::the final takeaway::🏁", "limitations::the weak spots, or what the study could not show::⚠️"
    ], { qd: "Which part of an article is this?", qt: "What is this part of a research article?" }),
    SC("Pick the right database", "🗃️", "Library databases hold different kinds of material. Pick one that fits your task, and you will save time.", "Ask what kind of source you need (news, studies, old records or facts) and match it to the database.", "For a recent news story, a news database beats a database of old photographs.", [
      "You want newspaper articles from the past month.|A news database|A database of science studies|A photo archive of the 1800s",
      "You want reviewed studies about plant growth.|A scholarly science database|A news database|A dictionary",
      "You want old letters and photos from a historical event.|A digital archive of primary sources|A recipe site|A math database",
      "You want to see whether the library owns a book.|The library catalog|A news database|An image database",
      "You want a quick definition of a term.|A subject encyclopedia or dictionary database|A journal database|An archive",
      "You want many viewpoints on a debated topic.|A database of opposing viewpoints|A map atlas|A phone directory",
      "You want statistics about a country.|A government or statistics database|A joke site|A novel",
      "Why use library databases instead of open web searches?|They hold vetted articles that are often free with your card|They have more ads|They are less safe"
    ]),
    SC("Keep a search log", "📓", "A search log lists what you tried and what worked. It keeps you from repeating searches and helps you improve.", "Write down enough that someone else could repeat your search and get the same results.", "Log: 'Date, database, search words, results, best article.'", [
      "What goes in a search log?|Search words, database, date, and what you found|Only the final paper|Nothing",
      "Why record searches that failed?|So you don't repeat them and can try new words|To feel bad|It is required",
      "A search gave too many results. Try...|Adding a narrowing word or a filter|Removing all words|Giving up",
      "A search gave zero results. Try...|Fewer or broader words, or a different spelling|A longer sentence|More punctuation",
      "For a helpful article, log...|A full citation or link so you can find it again|Just 'good article'|Its color",
      "Where could you keep a search log?|A notebook or a document|Memory only|A hallway",
      "Why note the date you searched?|Online results change|To look busy|Dates are decoration",
      "Your log shows 12 searches and 3 saved sources. This helps you...|See what worked and what to try next|Count pages|Skip reading"
    ]),
    SC("Follow the trail of sources", "🥾", "A good source lists its own sources. Follow them backward and forward to find more.", "Backward means older works it cited. Forward means newer works that cited it.", "A great article about tides has a long bibliography. Each title in it is a lead.", [
      "Backward chaining means...|Looking at the sources a good article lists in its bibliography|Reading from the last page|Deleting references",
      "Forward chaining means...|Finding newer works that cited the article|Reading the next chapter|Predicting the ending",
      "You found one great article. A quick way to find more is to...|Check its reference list|Close it|Search random words",
      "Which feature shows who cited an article later?|A 'cited by' link in a database|The table of contents|The cover",
      "Why does chaining work?|Experts on a topic cite related good work|It saves ink|It does not work",
      "A reference looks interesting. You should...|Look it up through the library, then judge it yourself|Cite it without reading|Skip it",
      "You only read about a study inside another source. A good move is to...|Try to find the original study|Cite the original anyway without looking|Skip all citing",
      "A very old article has no 'cited by' list. You can still...|Use its bibliography to go backward|Do nothing|Invent a list"
    ]),
    SC("Check what an AI tool says", "🤖", "AI chat tools can write fast, but they can also be wrong or invent details. You are still responsible for what you use.", "Treat an AI answer as a lead, not as proof. Check it in reliable sources.", "If a tool names a book, search the catalog to see whether the book is real.", [
      "AI tools can sound sure but be wrong. So you should...|Check them against reliable sources|Trust them fully|Paste them into your essay",
      "An AI tool names a book as its source. What do you do?|Search the catalog to see if the book exists|Cite it without looking|Assume it is real",
      "Using AI writing and saying you wrote it yourself is...|Dishonest and may break school rules|Fine|The same as citing",
      "AI can invent citations that look real. This is why...|You must find each source yourself|They are always perfect|Format does not matter",
      "A good use of an AI tool, if your teacher allows it, is...|Brainstorming search words, then researching real sources|Writing the whole paper|Making up quotes",
      "Who is responsible for the facts in your paper?|You|The tool|Nobody",
      "Your teacher says not to use AI for an assignment. You...|Follow the rule|Use it secretly|Ask the tool to hide it",
      "To confirm a claim from an AI tool, find...|Two reliable sources that agree|A bigger font|A repeat from the same tool"
    ]),
    pctChange(),
    PL("Science fair words", "🧪", "Science projects use special words. They also appear when you read studies, so you can tell how the research was done.", "A fair test changes only one thing at a time and keeps the rest the same.", [
      "independent variable::the thing you change on purpose::🎚️", "dependent variable::the thing you measure::📏", "control variable::a thing you keep the same::🔒", "hypothesis::a testable prediction::🔮",
      "control group::the group that does not get the change::👥", "sample::the group actually studied::🧺", "data::facts and numbers collected::🗂️", "conclusion::what the evidence shows::🏁"
    ]),
    SC("Which source is newest?", "🕰️", "Information appears in a certain order: news first, then magazines and journals, then books. Newer is not always better, but timing matters.", "Think about how long it takes to write, check and publish each kind of source.", "A news alert comes within minutes. A book about the event may take years.", [
      "After a major event, what usually appears first?|News reports|Textbooks|Encyclopedia entries",
      "What usually takes longest to appear?|A book|A news alert|A short online post",
      "Which is likely most up to date on a fast-changing science field?|A recent journal article|A ten-year-old textbook|An encyclopedia printed years ago",
      "For a topic from ancient history, is newest always best?|Not always; older sources can still be sound, but check new findings|Yes, always|No, never use new ones",
      "A scholarly book that reviews many studies usually appears...|Months or years after the studies|The same day|Before the studies",
      "Why do textbooks lag behind the news?|They take time to write, review and print|Authors forget|Nobody writes them",
      "Where do you look first for today's weather alert?|A news or weather service|A history book|An encyclopedia",
      "Information moves from news to journals to books. Books are...|Later, slower and often more thorough|Faster|The same speed"
    ]),
    PL("Who owns an idea?", "©️", "Different laws protect different kinds of ideas and work. Knowing the terms keeps your research honest.", "Copyright covers creative work, patents cover inventions, trademarks cover brand names and logos.", [
      "copyright::protects creative works like books and songs::📖", "trademark::protects names and logos that identify a brand::™️", "patent::protects a new invention::💡", "license::permission to use something, with rules::📄",
      "fair use::limited use for school, news or criticism::🎓", "plagiarism::passing off someone's work as your own::🚷", "attribution::giving credit to the creator::🏷️", "public domain::work anyone may use freely::🌐"
    ], { qd: "Which term is this?", qt: "What does this term mean?" }),
    PL("Codes that find sources", "📍", "Sources have special codes and labels. Each one is made to help you find or cite the source.", "Copy the code carefully. One wrong character can lead to the wrong place.", [
      "DOI::a permanent code for finding an online article::🔗", "URL::a web address::🌐", "permalink::a stable link that does not change::📌", "call number::tells where an item sits on the library shelf::📍",
      "citation::a note saying where information came from::📝", "barcode::lets the library scan an item::🔖", "metadata::data about an item, like its author and date::🧾", "tag::a keyword label added to an item::#️⃣"
    ], { qd: "Which term is this?", qt: "What is this?" }),
    SC("Pick the right search field", "🔎", "Advanced search lets you choose where to look: title, author, subject, or filters. The right field gives better results.", "Match what you know (a title, a name or a topic) to the field that holds it.", "If you know the author's name, use the author field rather than keyword.", [
      "To find books by a known author, search the...|Author field|Subject field|Publisher field",
      "To find a book whose title you know, choose...|Title|Author|Series",
      "To find all books about volcanoes, use...|Subject|ISBN|Call number",
      "To find one exact edition, use the...|ISBN|Subject|Language",
      "To limit results to books made after 2020, use a...|Date limiter|Author field|Format limiter",
      "To find audiobooks only, use a...|Format limiter|Language limiter|Subject field",
      "To find books written in Spanish, use a...|Language limiter|Format limiter|Author field",
      "Keyword searching looks...|Anywhere in the record|Only in the title|Only in the call number"
    ]),
    PL("Build a paragraph", "🏗️", "A strong paragraph has a point, proof and explanation. Counterarguments make it even stronger.", "After evidence, always explain how it supports your point. Don't just drop in a quote.", [
      "point::the main claim of the paragraph::👉", "evidence::a fact, quote or number that backs it up::🔍", "explanation::tells how the evidence supports the point::💡", "link::connects back to your thesis or the next idea::🔗",
      "counterargument::an opposing view you address fairly::⚖️", "rebuttal::your reply to the opposing view::🛡️", "concluding sentence::wraps up the paragraph::🏁", "citation::credit given for the evidence::📝"
    ]),
    PL("Persuasion appeals", "📣", "Writers persuade in three classic ways: trust, feelings, and logic. Spotting them helps you judge a message.", "Ask: is this trying to win me with trust, with feelings, or with facts and reasons?", [
      "ethos::an appeal to trust in the speaker's credibility::🎓", "pathos::an appeal to feelings::💗", "logos::an appeal to logic and facts::🧮", "audience::the people the message is written for::👥",
      "purpose::the reason an author wrote something::🎯", "tone::the author's attitude shown through word choice::🎭", "claim::the point an author wants you to accept::📌", "rhetoric::the art of persuading with words::🗣️"
    ]),
    SC("Read an infographic", "📊", "Infographics make data look simple, but a pretty picture can hide weak data. Check the source before you trust it.", "Look for who made it, when, where the numbers come from, and whether the scale is fair.", "A graphic with no source and no date is hard to check.", [
      "First check that an infographic lists...|Its sources and date|Its colors|Its font",
      "Big pictures can make a small difference look huge. Check...|The actual numbers and the scale|The icon size|Neither",
      "No source is listed. This means...|You cannot easily verify it|It is perfect|It is official",
      "Which question helps most?|Who made this and why?|Which color is prettiest?|How many icons are there?",
      "The parts of a pie chart should add up to...|100 percent|50 percent|Any number",
      "An infographic from a company selling a product may be...|Biased toward the company|Neutral automatically|Peer-reviewed",
      "To check a statistic from an infographic, you can...|Find the original study or data|Trust the icons|Ask the colors",
      "A title says 'Doubled!' but the numbers went from 1 to 2. What matters?|Tiny starting numbers make big percents|Doubling is always big|Nothing"
    ]),
    SC("Links that disappear", "🔗", "Web pages move, change and vanish. Careful researchers record enough to find a source again.", "Record the author, title, site, date and link, and save a stable or archived copy if you can.", "A DOI keeps working even if a website changes its address.", [
      "Link rot means...|Web links that stop working over time|Old books molding|Computers rusting",
      "To protect against link rot, you can...|Save a copy or archived link and note the date|Hope for the best|Delete your notes",
      "Why write the 'accessed' date in a citation?|Web pages change|It looks fancy|Libraries require it",
      "A DOI or permalink is better because...|It stays stable even if the site moves|It is pretty|It is short",
      "A page you cited is gone. What next?|Look for an archived copy or another source|Keep citing it|Hide it",
      "Which is likely to last longer?|A published article with a DOI|A random blog link|A pop-up",
      "A web archive saves...|Snapshots of pages over time|Only books|Only photos",
      "What do you record for a web source?|Author, title, site, date and link|Only the color|Nothing"
    ]),
    medianQ(),
    SC("Fact or interpretation?", "🏛️", "Historians use facts, but they also interpret them. An interpretation is a conclusion drawn from evidence, and it can be argued.", "A fact can be checked. An interpretation explains or judges, and needs evidence.", "'The treaty was signed in 1783' is a fact. 'The treaty was a success' is an interpretation.", [
      "Which is a fact?|The treaty was signed in 1783|The treaty was unfair|The treaty was a great idea",
      "Two historians read the same letter and reach different conclusions. This is...|Interpretation|Always a fake|A mistake in the date",
      "A good interpretation is supported by...|Evidence from sources|Feelings alone|Popularity",
      "Which phrase signals an interpretation?|This suggests that...|The date was...|It was measured",
      "History books can differ because...|Authors choose which evidence to stress|Facts change randomly|Dates differ every year",
      "To judge an interpretation, ask...|Does the evidence really support it?|Is it long?|Is it famous?",
      "'The explorer was brave.' This is...|An interpretation or opinion|A measured fact|A date",
      "A primary source says one thing and a historian says another. You...|Compare and weigh the evidence|Pick the oldest|Ignore both"
    ]),
    SC("Group projects online", "👥", "Working together on a shared document is a real research skill. Teams need clear credit, fair work and safe sharing.", "Share only with your group and teacher, credit everyone's sources, and be kind when you disagree.", "Use version history to see who changed what and to restore earlier text.", [
      "Version history in a shared document lets you...|See and restore earlier edits|Hide who edited|Delete the document",
      "Each group member should...|Credit their parts and add sources to a shared list|Keep sources private|Copy others",
      "A teammate pastes text from a site with no credit. What do you do?|Kindly tell them and add a citation or reword it|Ignore it|Delete their work",
      "Comments in a shared document are for...|Questions and feedback to the team|Secrets|Ads",
      "How should you name the shared file?|Clearly, with the project and date|'untitled'|'stuff'",
      "Who should be allowed to edit the document?|Only your group and teacher, through school tools|Anyone with the link|Strangers online",
      "Before the due date, check that...|Everyone's part is included and the citations match|The fonts are fancy|Nothing",
      "You disagree with a teammate's idea. You should...|Discuss with evidence and respect|Quietly delete it|Argue loudly"
    ])
  ];

  Object.assign(LIBRARY_LEVELS, {
    13: lvl(13, L13, [0, 1, 2, 7, 8, 9, 16]),
    14: lvl(14, L14, [0, 2, 3, 4, 7, 9, 10, 15]),
    15: lvl(15, L15, [0, 5, 6, 8, 11, 15])
  });
})();
