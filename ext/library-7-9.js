// ext/library-7-9.js  Mind Lab Library Skills, levels 7-9 (60 lessons)
(() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const lead = s => String(s).replace(/<[^>]+>/g, "").replace(/^[^A-Za-z0-9]+/, "")[0].toUpperCase();

  const PL = (title, v, intro, tip, rows, o = {}) => {
    const pairs = rows.map(r => { const [t, d, e] = r.split("::"); return { t, d, e }; });
    const make = () => {
      const cur = pick(pairs), rest = pairs.filter(x => x !== cur), ex = pick(rest);
      const exh = `Example: "${ex.t}" goes with "${ex.d}". Now do yours.`;
      if (Math.random() < 0.5) return {
        text: `${o.qd || "Which word fits?"}<br><b>${cur.d}</b>`, visual: cur.e, choices: shuf([cur.t, ...S(rest, 2).map(x => x.t)]), answer: cur.t,
        hints: ["Think back to the lesson. Which word fits this?", `The answer starts with "${lead(cur.t)}".`, exh]
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
  const SPL = ["Rivera", "Cruz", "Lee", "Patel", "Ortiz", "Nguyen", "Brown", "Hall", "Kim", "Gray", "Lopez", "Young", "Diaz", "Ward", "Fox", "Stone", "Baker", "Moore", "Reed", "Allen"];
  const FN = ["Amy", "Ben", "Cora", "Dan", "Eli", "Fay", "Gus", "Ivy", "Jay", "Kim", "Leo", "Mia", "Noah", "Pam", "Ron", "Sam", "Tia", "Zoe"];

  const sortCall = () => {
    const make = () => {
      const n1 = ri(2, 9) * 100 + ri(0, 8) * 10, n2 = n1 + ri(1, 4) * 10;
      let ls; do { ls = S(SPL, 3).map(x => x.slice(0, 3).toUpperCase()); } while (new Set(ls.map(x => x[0])).size < 3);
      const bs = shuf([[n1, ls[0]], [n1, ls[1]], [n2, ls[2]]]);
      const srt = bs.slice().sort((a, b) => a[0] - b[0] || (a[1] < b[1] ? -1 : 1)), last = Math.random() < 0.4;
      const lab = b => `${b[0]} ${b[1]}`;
      return {
        text: `Fact books are shelved by number first. If two books have the <b>same number</b>, the letters (the author's name) break the tie in ABC order. Which book comes <b>${last ? "last" : "first"}</b>?`,
        visual: "🏷️", choices: bs.map(lab), answer: lab(last ? srt[2] : srt[0]),
        hints: ["Compare the numbers first. Then look at the letters only for books with the same number.", `Two books share the number ${n1}. Put those two in ABC order by their letters, then decide where the other book fits.`, "Example: 590 BEE, 590 OWL and 600 ANT. 590 comes before 600, and B comes before O, so the order is 590 BEE, 590 OWL, 600 ANT. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Number, then letters", v: "636 FOX", t: "A call number has a Dewey number and letters from the author's name. The number comes first." },
      { h: "A tie", v: "590 BEE · 590 OWL", t: "When two books have the same number, put them in ABC order by the letters." },
      { h: "Tip", v: "💡", t: "Numbers first, letters second. Check the smaller number before you look at the letters." }
    ];
    return { title: "Shelve by call number", make };
  };

  const dueDate = () => {
    const make = () => {
      const d = ri(1, 9), w = ri(1, 3), wt = w === 1 ? "1 week" : `${w} weeks`, ans = d + w * 7;
      return {
        text: `You borrow a book on <b>June ${d}</b>. You may keep it for <b>${wt}</b>. On what day of June is it due? (Type the number.)`, visual: "📅", answer: ans,
        hints: ["One week is 7 days. First change the weeks into days.", `${wt} is ${w * 7} days. Count that many days forward from the day you borrowed the book.`, "Example: borrowed on May 3 for 1 week. 1 week is 7 days, and 3 + 7 = 10, so it is due May 10. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Due dates", v: "📅", t: "Library items have a due date. You need to bring them back by then." },
      { h: "Weeks to days", v: "1 week = 7 days", t: "Loans are often 1, 2 or 3 weeks. Multiply the weeks by 7 to get days. Then count forward from the day you borrowed it." },
      { h: "Tip", v: "💡", t: "Write the due date on a bookmark so you do not forget." }
    ];
    return { title: "Find the due date", make };
  };

  const lateFines = () => {
    const make = () => {
      const rate = pick([5, 10, 15, 20, 25]), days = ri(2, 9), total = rate * days;
      if (Math.random() < 0.55) return {
        text: `A library charges <b>${rate} cents</b> for each day a book is late. Your book is <b>${days} days</b> late. How many cents is the fine?`, visual: "⏰", answer: total,
        hints: ["Each late day costs the same amount, so use multiplying.", `Find ${days} groups of ${rate} cents.`, "Example: 4 days late at 12 cents a day. 4 x 12 = 48 cents. Now do yours."]
      };
      return {
        text: `A library charges <b>${rate} cents</b> for each day a book is late. Your fine is <b>${total} cents</b>. How many days late is the book?`, visual: "⏰", answer: days,
        hints: ["The fine is the cost per day times the number of days. Work backward.", `Ask: how many groups of ${rate} fit into ${total}? Use dividing.`, "Example: a fine of 48 cents at 12 cents a day. 48 ÷ 12 = 4 days. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Late fines", v: "⏰", t: "Some libraries charge a small fee for each day a book is late. Others do not, but returning books on time helps everyone." },
      { h: "Fine = rate x days", v: "10 x 3 = 30", t: "Multiply the cents per day by the number of days late." },
      { h: "Work backward", v: "30 ÷ 10 = 3", t: "To find the days, divide the fine by the cents per day." }
    ];
    return { title: "Late fines", make };
  };

  const SETS = [["cats", "dogs", "birds"], ["frogs", "ponds", "insects"], ["moon", "stars", "planets"], ["bread", "soup", "pies"], ["rivers", "lakes", "oceans"], ["castles", "knights", "maps"]];
  const booleanCount = () => {
    const make = () => {
      const terms = pick(SETS), op = pick(["AND", "OR", "NOT"]), [t1, t2] = S(terms, 2);
      let books, cnt;
      do {
        books = "ABCDEF".split("").map(l => { let tg = terms.filter(() => Math.random() < 0.5); if (!tg.length) tg = [pick(terms)]; return { l, tg }; });
        cnt = books.filter(b => { const h1 = b.tg.includes(t1), h2 = b.tg.includes(t2); return op === "AND" ? h1 && h2 : op === "OR" ? h1 || h2 : h1 && !h2; }).length;
      } while (cnt < 1 || cnt > 5);
      const how = { AND: `A book must be about both ${t1} and ${t2}.`, OR: `A book counts if it has ${t1}, or ${t2}, or both.`, NOT: `A book counts if it has ${t1} but does not have ${t2}.` }[op];
      const ex = { AND: "Example: X has pets and toys, Y has only toys, Z has only pets. 'pets AND toys' finds only X.", OR: "Example: X has pets and toys, Y has only toys, Z has only pets. 'pets OR toys' finds X, Y and Z.", NOT: "Example: X has pets and toys, Y has only toys, Z has only pets. 'pets NOT toys' finds only Z." }[op];
      return {
        text: `A library has 6 books with these topics:<br>${books.map(b => `Book ${b.l}: ${b.tg.join(", ")}`).join("<br>")}<br><br>How many books does the search <b>${t1} ${op} ${t2}</b> find?`, visual: "🔍", answer: cnt,
        hints: [`Look at the little word ${op} between the search words. It tells you how to combine them.`, `${how} Check books A to F one at a time and count the ones that match.`, `${ex} Now do yours.`]
      };
    };
    make.teach = () => [
      { h: "AND, OR, NOT", v: "🔍", t: "These words are called <b>Boolean operators</b>. They help a catalog search find just what you need." },
      { h: "What each one does", v: "AND = both · OR = either · NOT = leave out", t: "<b>AND</b> finds items with both words. <b>OR</b> finds items with either word. <b>NOT</b> leaves out the second word." },
      { h: "Tip", v: "💡", t: "AND makes your search narrower. OR makes it wider." }
    ];
    return { title: "Count the search results", make };
  };

  const BT = ["Ocean Life", "The Stars Above", "How Rockets Work", "Rivers of the World", "Insects Up Close", "A Guide to Birds", "Weather Watchers", "The Story of Money", "Caves and Canyons", "Plants That Eat Bugs"];
  const PUB = ["Sunrise Press", "Blue Door Books", "Maple Press", "Harbor House", "Green Hill Books"];
  const WS = ["Kids Science Hub", "World Atlas Online", "Nature Notes", "History for Kids", "Space Facts"];
  const cite = kind => {
    const make = () => {
      const f = pick(FN), l = pick(SPL.filter(x => x !== f)), t = pick(BT), p = pick(PUB), w = pick(WS), y = ri(2005, 2024);
      let right, wr, info;
      if (kind === "book") {
        info = `Author: ${f} ${l}<br>Title: ${t}<br>Publisher: ${p}<br>Year: ${y}`;
        right = `${l}, ${f}. ${t}. ${p}, ${y}.`;
        wr = [`${f} ${l}. ${t}. ${p}, ${y}.`, `${l}, ${f}. ${p}. ${t}, ${y}.`, `${t}. ${l}, ${f}. ${y}, ${p}.`, `${l}, ${f}. ${y}. ${t}. ${p}.`];
      } else {
        info = `Author: ${f} ${l}<br>Page title: "${t}"<br>Website: ${w}<br>Year: ${y}`;
        right = `${l}, ${f}. "${t}." ${w}, ${y}.`;
        wr = [`${f} ${l}. "${t}." ${w}, ${y}.`, `"${t}." ${l}, ${f}. ${w}, ${y}.`, `${l}, ${f}. ${w}. "${t}," ${y}.`, `${l}, ${f}. "${t}." ${y}, ${w}.`];
      }
      return {
        text: `Which is the correct way to list this ${kind === "book" ? "book" : "web page"} in a source list?<br><br>${info}`, visual: "📋", choices: shuf([right, ...S(wr, 2)]), answer: right,
        hints: ["Check the order of the parts, and how the author's name is written.", "Look at the author's name first. A source list puts the last name first, then a comma.", kind === "book" ? "Example: Author Dev Shah, title Rivers, publisher Oak Press, year 2010. Listed: Shah, Dev. Rivers. Oak Press, 2010. Now do yours." : "Example: Author Dev Shah, page \"Rivers\", website Earth Hub, year 2010. Listed: Shah, Dev. \"Rivers.\" Earth Hub, 2010. Now do yours."]
      };
    };
    make.teach = kind === "book" ? () => [
      { h: "Cite a book", v: "📋", t: "A citation tells readers where a fact came from. Each school may use a slightly different style, so follow your teacher's style." },
      { h: "One simple pattern", v: "Last, First. Title. Publisher, Year.", t: "Put the author's <b>last name first</b>, then the title, the publisher and the year." },
      { h: "Tip", v: "💡", t: "Copy the details from the title page and the copyright page of the book." }
    ] : () => [
      { h: "Cite a web page", v: "🌐", t: "Web pages need citations too. Your teacher may ask for a style, so check." },
      { h: "One simple pattern", v: "Last, First. \"Page title.\" Website, Year.", t: "Put the author's <b>last name first</b>, then the page title in quotation marks, the website name and the year." },
      { h: "Tip", v: "💡", t: "If a page has no author or date, that is a clue to look for a better source." }
    ];
    return { title: kind === "book" ? "Cite a book" : "Cite a web page", make };
  };

  const DN = [
    ["a book about dogs", "636.7"], ["a book about the planets", "523.4"], ["a book about weather", "551.5"], ["a book about insects", "595.7"],
    ["a book about dinosaurs", "567.9"], ["a cookbook", "641.5"], ["a book about baseball", "796.357"], ["a book of American poems", "811"],
    ["a book about the history of the United States", "973"], ["a book of folktales", "398.2"], ["a book about sharks", "597.3"], ["a book about spiders", "595.4"]
  ];
  const deweyNum = () => {
    const make = () => {
      const cur = pick(DN), rest = DN.filter(x => x !== cur);
      if (Math.random() < 0.5) return {
        text: `Which call number fits <b>${cur[0]}</b>?`, visual: "🔢", choices: shuf([cur[1], ...S(rest, 2).map(x => x[1])]), answer: cur[1],
        hints: ["Decide which of the ten big Dewey groups the topic belongs to.", "Remember: 300s people and customs, 500s science, 600s technology and cooking, 700s art and sports, 800s literature, 900s history and geography. Then look at the first digit of each choice.", "Example: a book of world maps is 912, because maps belong to the 900s (geography). Now do yours."]
      };
      return {
        text: `A book is shelved at <b>${cur[1]}</b>. It is most likely...`, visual: "🔢", choices: shuf([cur[0], ...S(rest, 2).map(x => x[0])]), answer: cur[0],
        hints: ["Look at the hundreds digit, the first number, first.", "Remember: 300s people and customs, 500s science, 600s technology and cooking, 700s art and sports, 800s literature, 900s history and geography.", "Example: a book at 912 is about maps, because 900s are geography and history. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Zoom in with decimals", v: "636.7", t: "Dewey numbers get more exact after the dot. 636 is animals on the farm and at home. 636.7 is dogs." },
      { h: "Some to know", v: "523.4 planets · 551.5 weather · 595.7 insects<br>641.5 cooking · 796 sports · 973 U.S. history", t: "The first digit gives the big group. The rest narrows it to one topic." },
      { h: "Tip", v: "💡", t: "Find the hundreds group first, then think about the smaller topic." }
    ];
    return { title: "Match topic and number", make };
  };

  const outOfOrder = () => {
    const make = () => {
      const base = S([...Array(88).keys()].map(i => 100 + i * 10), 5).sort((a, b) => a - b).map(n => `${n + ri(0, 9)}.${ri(1, 9)}`);
      const [i, j] = pick([[1, 3], [3, 1], [0, 2], [2, 0], [2, 4], [4, 2], [0, 3], [3, 0], [1, 4], [4, 1]]);
      const arr = base.slice(), [x] = arr.splice(i, 1); arr.splice(j, 0, x);
      const choices = shuf([x, ...S(base.filter(b => b !== x), 3)]);
      return {
        text: `A cart of fact books should go in number order from left to right:<br><b>${arr.join(" &nbsp; ")}</b><br><br>Exactly one book is out of place. Which one?`, visual: "🛒", choices, answer: x,
        hints: ["Read from left to right. Each number should be bigger than the one before it.", "Find a spot where a number is smaller than the number just before it. The book that does not belong is one of the two at that spot.", "Example: 210.5 &nbsp; 530.2 &nbsp; 340.1 &nbsp; 600.8. The numbers go down at 340.1, and 530.2 is too big for its place, so 530.2 is out of place. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Shelf reading", v: "🛒 → 📚", t: "Librarians check that books are in the right order. This is called <b>shelf reading</b>." },
      { h: "Look for a drop", v: "340 ... 530 ... 210", t: "Numbers should always go up from left to right. If a number is smaller than the one before it, something is wrong." },
      { h: "Tip", v: "💡", t: "Take out the book that, once removed, makes the rest line up correctly." }
    ];
    return { title: "Find the misshelved book", make };
  };

  const planner = () => {
    const make = () => {
      const pd = pick([10, 15, 20, 25, 30, 40]), days = ri(6, 15), total = pd * days;
      if (Math.random() < 0.5) return {
        text: `Your book has <b>${total} pages</b>. You read <b>${pd} pages</b> each day. How many days will you need to finish it?`, visual: "📖", answer: days,
        hints: ["Think about how many groups of the daily pages fit into the whole book.", `Divide the ${total} pages by ${pd}.`, "Example: a 84-page book at 12 pages a day. 84 ÷ 12 = 7 days. Now do yours."]
      };
      const done = ri(1, 4), left = days - done;
      return {
        text: `Your book has <b>${total} pages</b>. You have read <b>${pd * done} pages</b> and you read <b>${pd} pages</b> each day. How many more days to finish?`, visual: "📖", answer: left,
        hints: ["First find how many pages are left to read.", `Pages left = ${total} minus ${pd * done}. Then divide by ${pd} pages a day.`, "Example: a 84-page book, 24 pages read, 12 pages a day. 84 - 24 = 60 pages left, and 60 ÷ 12 = 5 days. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Plan your reading", v: "📖", t: "A reading plan helps you finish a book or a research source on time." },
      { h: "Divide it up", v: "84 ÷ 12 = 7", t: "Divide the pages by the pages you read each day to find the number of days." },
      { h: "Pages left", v: "84 - 24 = 60", t: "If you have already read some, take those pages away first. Then divide what is left." }
    ];
    return { title: "Plan your reading", make };
  };

  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const readChart = () => {
    const make = () => {
      const vals = S([...Array(36).keys()].map(i => i + 5), 5);
      const rows = DAYS.map((d, i) => `${d}: ${vals[i]} books checked out`).join("<br>");
      const head = `<b>Books checked out this week</b><br>${rows}<br><br>`;
      const r = ri(0, 3);
      if (r === 0 || r === 1) {
        const most = r === 0, tgt = vals.indexOf(most ? Math.max(...vals) : Math.min(...vals));
        return {
          text: `${head}Which day had the <b>${most ? "most" : "fewest"}</b> books checked out?`, visual: "📊", choices: shuf([DAYS[tgt], ...S(DAYS.filter((_, i) => i !== tgt), 2)]), answer: DAYS[tgt],
          hints: ["Look at all five numbers and compare them.", `Which number is the ${most ? "biggest" : "smallest"}? Then read the day on that line.`, `Example: Mon 8, Tue 15, Wed 11. The ${most ? "most is 15, so Tuesday" : "fewest is 8, so Monday"}. Now do yours.`]
        };
      }
      if (r === 2) {
        const [a, b] = S([0, 1, 2, 3, 4], 2).sort((x, y) => vals[y] - vals[x]);
        return {
          text: `${head}How many <b>more</b> books were checked out on ${DAYS[a]} than on ${DAYS[b]}?`, visual: "📊", answer: vals[a] - vals[b],
          hints: ["Find both days in the list. 'How many more' means subtract.", `Take the number for ${DAYS[b]} away from the number for ${DAYS[a]}.`, "Example: Monday 30 and Tuesday 18. 30 - 18 = 12 more. Now do yours."]
        };
      }
      return {
        text: `${head}How many books were checked out in <b>all five days</b>?`, visual: "📊", answer: vals.reduce((s, x) => s + x, 0),
        hints: ["'In all' means add all the numbers together.", "Add them two at a time and keep a running total.", "Example: 12 + 9 + 20 = 41 (12 + 9 = 21, then 21 + 20 = 41). Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Libraries count things", v: "📊", t: "Libraries keep numbers: books borrowed, visitors, and more. Reading them helps the library plan." },
      { h: "Compare and subtract", v: "30 - 18 = 12", t: "To find the biggest or smallest, compare the numbers. To find how many more, subtract." },
      { h: "Totals", v: "12 + 9 + 20", t: "To find the total, add all the numbers." }
    ];
    return { title: "Read a library chart", make };
  };

  // ================= LEVEL 7 =================
  const L7 = [
    PL("The ten Dewey groups", "🔢", "The Dewey Decimal System sorts fact books into ten big groups. Each group starts at a hundreds number.", "Learn the groups in order: 000, 100, 200 and on up to 900.", [
      "000::general works and computers::💻", "100::thoughts, feelings and the mind (philosophy and psychology)::🧠", "200::religions and beliefs::🕊️", "300::people, government and how we live (social science)::🏛️", "400::languages::🗣️", "500::science and math::🔬", "600::technology, cooking and health::🔧", "700::art, music and sports::🎨", "800::literature, like poems and plays::📜", "900::history, geography and travel::🌍"
    ], { qd: "Which Dewey group fits?", qt: "What is on these shelves?" }),
    SC("What goes where?", "🧭", "To find where a fact book lives, think about its subject. Then match the subject to one of the ten Dewey groups.", "Ask what the book is mostly about. Is it science, cooking, art, stories, languages or history?", "A book about how to paint with watercolors belongs in the 700s, the art group.", [
      "A book about how volcanoes form is found in the...|500s (science)|700s (art and sports)|900s (history)",
      "A cookbook of soups is found in the...|600s (technology and cooking)|800s (literature)|400s (languages)",
      "A book of poems is found in the...|800s (literature)|500s (science)|600s (technology)",
      "A book to learn French words is found in the...|400s (languages)|300s (people and government)|700s (art and sports)",
      "A book on how to draw cartoons is found in the...|700s (art and sports)|500s (science)|900s (history)",
      "A book about the history of Egypt is found in the...|900s (history and geography)|600s (technology)|800s (literature)",
      "A beginner's book on computer coding is found in the...|000s (general works and computers)|800s (literature)|500s (science)",
      "A book of soccer tips is found in the...|700s (art and sports)|400s (languages)|500s (science)",
      "A book about how bees live is found in the...|500s (science)|300s (people and government)|700s (art and sports)"
    ]),
    sortCall(),
    dueDate(),
    SC("Alphabetize letter by letter", "🔤", "To put words in ABC order, compare them one letter at a time. If the first letters match, check the second, and so on. A short word comes before a longer word that starts the same way.", "Compare from the left, one letter at a time. If one word runs out of letters first, it comes first.", "'Cart' comes before 'carton', because the letters match and 'cart' is shorter.", [
      "Which word comes first in ABC order?|ice|icicle|icing",
      "Which word comes last in ABC order?|icing|ice|icicle",
      "Which word comes first in ABC order?|treat|tree|trick",
      "Which word comes last in ABC order?|trick|treat|tree",
      "Which word comes first in ABC order?|plan|plane|planet",
      "Which word comes last in ABC order?|planet|plan|plane",
      "Which word comes first in ABC order?|bake|baker|bakery",
      "Which word fits between 'sand' and 'sandwich'?|sandal|sane|sandwiches"
    ]),
    PL("Places in the library", "🏛️", "A library has different areas and tools. Each one has its own job.", "If you are lost, ask a librarian at the help desk.", [
      "circulation desk::where you check out and return books::🧾", "reference desk::where a librarian helps with research questions::❓", "stacks::the shelves where most books are kept::📚", "periodicals::magazines and newspapers::📰", "media section::DVDs and audiobooks::🎧", "catalog::the search tool that lists every item and where it is::💻"
    ], { qd: "Which library place is this?", qt: "What is this for?" }),
    PL("Parts of a book", "📖", "Fact books have parts in the front and in the back. Each part has a different job.", "Check the front for the big picture, and the back for the extras.", [
      "title page::shows the title, author and publisher::📄", "preface::a note from the author before the book begins::📝", "table of contents::lists chapters and their starting pages::📑", "appendix::extra information added at the back::📎", "bibliography::a list of sources the author used::📚", "index::an ABC list of topics with page numbers::🔤", "glossary::a short dictionary of hard words in the book::📘"
    ], { qd: "Which book part is this?", qt: "What is this book part?" }),
    SC("Use the index", "🔤", "The index is at the back of a book. It lists topics in ABC order with the pages where each one appears.", "Think about how an index is arranged and what the numbers and small words in it mean.", "An entry 'volcano, 8, 22-25' means volcanoes are on page 8 and on pages 22 through 25.", [
      "An index says: tadpole, 14, 31-33. Which pages talk about tadpoles?|Page 14, and pages 31 through 33|Only page 14|Pages 14 through 31",
      "'See also' in an index means...|Look at another entry for more on the topic|The topic is wrong|The page is missing",
      "An entry with 20-24 means...|The topic runs from page 20 to page 24|Twenty minus twenty-four|There are twenty-four chapters",
      "Where is the index usually found?|At the back of the book|Before the title page|On the cover",
      "How is an index ordered?|In ABC order|By page number|By word length",
      "Small indented words under a main entry, like 'frogs' then 'food', are...|Subtopics that point to more exact pages|Mistakes|Chapter titles",
      "The index is different from the table of contents because the index...|Lists topics in ABC order|Lists chapters in order|Is at the front"
    ]),
    SC("Text features at work", "🧩", "Nonfiction books have special parts that make facts easier to find and understand.", "Match the job to the feature: naming, showing, explaining, comparing or timing.", "To see how a heart pumps blood, I look at a labeled diagram.", [
      "You want to know what a picture shows. Read the...|caption|index|glossary",
      "You want to see where a new topic starts. Look at the...|headings|dedication|copyright date",
      "A small box beside the text adds extra facts. It is a...|sidebar|caption|title page",
      "A labeled drawing of a flower's parts is a...|diagram|index|timeline",
      "A line with dates showing events in order is a...|timeline|map key|glossary",
      "A hard word is in bold. Where can you check its meaning?|The glossary|The table of contents|The map",
      "You want to compare numbers quickly. A good feature is a...|graph or table|dedication|spine label",
      "Words in bold or italics usually show...|That a word is important|Mistakes|Page numbers"
    ]),
    PL("Kinds of sources", "🗂️", "A source is where you get information. Libraries have many kinds.", "Pick the source that matches your question.", [
      "encyclopedia::facts on many topics, in ABC order::📚", "atlas::a book of maps::🗺️", "almanac::facts, lists and numbers, updated every year::📅", "periodical::a magazine or newspaper that comes out on a schedule::📰", "database::a searchable collection of articles that a library provides::💽", "e-book::a book you read on a screen::📱"
    ], { qd: "Which source is this?", qt: "What is this source?" }),
    SC("Pick the right source", "🏆", "Different questions need different sources. Think about what you need: facts, a map, a meaning, a life story or the newest news.", "Say your job in a few words, then pick the source built for that job.", "To see which countries touch the Atlantic Ocean, I use an atlas.", [
      "You want today's weather. Best source?|A weather report from today|An encyclopedia from long ago|A fairy tale",
      "You want to see where Brazil is. Best source?|An atlas|A cookbook|A joke book",
      "You want this year's list of facts and records. Best source?|A new almanac|A story book|A dictionary",
      "You want to learn how a hurricane forms. Best source?|A science book about weather|A mystery novel|A poem about rain",
      "You want to know how to say 'rendezvous'. Best source?|A dictionary|An atlas|A biography",
      "You want another word for 'angry'. Best source?|A thesaurus|An atlas|An almanac",
      "You want to read about the life of Marie Curie. Best source?|A biography|A cookbook|An atlas",
      "You want recent news from your town. Best source?|A local newspaper|A very old book|A dictionary"
    ]),
    PL("Kinds of stories", "🎭", "Stories come in many genres. Knowing the genre helps you pick books you enjoy.", "Ask: is it true or made up? Is it real, magical, funny or in verse?", [
      "historical fiction::a made-up story set in a real time in the past::🏰", "fantasy::a story with magic or imaginary worlds::🐉", "biography::a true story of a person's life::🧑", "poetry::writing with rhythm and short lines::🪶", "drama::a story written to be acted out as a play::🎭", "tall tale::a funny story full of huge exaggerations::🤠", "myth::an old story that explains something about the world::⚡", "graphic novel::a story told with pictures and speech bubbles::💬"
    ], { qd: "Which kind of book is this?", qt: "What kind of book is this?" }),
    SC("Fact or opinion?", "⚖️", "A fact can be proved or checked. An opinion tells what someone thinks or feels. Words like best, worst, should and too show opinions.", "Can you check it with a ruler, a book or a clock? Then it is a fact. If it is a feeling, it is an opinion.", "'Penguins live in the Southern Hemisphere' is a fact. 'Penguins are the cutest birds' is an opinion.", [
      "Which sentence is a fact?|A spider has eight legs.|Spiders are scary.|Spiders are the worst.",
      "Which sentence is an opinion?|Soccer is more fun than chess.|Soccer is played with a ball.|A soccer team has players.",
      "Which sentence is a fact?|Mars is the fourth planet from the Sun.|Mars is the coolest planet.|Mars is boring to look at.",
      "Which sentence is an opinion?|Everyone should read more.|Libraries lend books.|Books have pages.",
      "Which sentence is a fact?|The Nile is a river in Africa.|The Nile is the prettiest river.|You must visit the Nile.",
      "Which sentence is an opinion?|This book is too long.|This book has 300 pages.|This book was printed in 2019.",
      "A claim with words like 'always' or 'never' may be...|An overstatement to check|Always true|A page number",
      "Opinion words include...|best, worst, should|Tuesday, March, twelve|add, subtract, divide"
    ]),
    SC("Better search words", "🔍", "A good search uses the most important words. If you get too many results, add an exact word. If you get none, check spelling or try a synonym.", "Choose words that name your topic. Make them more exact for fewer results, or more general for more.", "Too many results for 'trees'? Try 'oak tree leaves'.", [
      "You want to know how much sleep kids need. Best key words?|kids sleep hours|how much the|a an it",
      "'Animals' is too broad. A narrower search is...|animals of the rainforest|the animals|animal",
      "'Red-eyed tree frog night calls in March' finds nothing. Try...|tree frog sounds|frog|red",
      "The catalog finds nothing for 'dolfin'. Try...|dolphin|dolfins|dolfin dolfin",
      "Searching 'car' gives too much. Which is more exact?|electric car batteries|cars|car car",
      "Another word to try for 'kids' is...|children|adults|elders",
      "Searching 'planet' shows every planet. To learn about only Saturn, search...|Saturn rings|planet|space",
      "Quotation marks around words, like \"blue whale\", search for...|The exact words together|Only the first word|Nothing"
    ]),
    SC("Notes in your own words", "📝", "Good notes are short and in your own words. Write one fact at a time and the source it came from. If you copy exact words, put them in quotation marks.", "Pick the note that keeps the key idea but does not copy the sentence.", "Book: 'Octopuses have three hearts.' Note: octopus, 3 hearts, source Ocean Life.", [
      "Book says: 'The monarch butterfly travels thousands of miles each fall to reach warm places.' Best note?|Monarchs fly far south for warmth in fall|The monarch butterfly travels thousands of miles each fall to reach warm places|I like butterflies",
      "Book says: 'Honeybees communicate by dancing.' Best note?|Bees dance to share information|Honeybees communicate by dancing|Bees are pretty",
      "Book says: 'A camel can go many days without drinking water.' Best note?|Camels can last long without water|A camel can go many days without drinking water|Camels are brown",
      "Why write notes in your own words?|It helps you understand and avoids copying|It makes notes longer|It uses more ink",
      "Each note card should hold...|One fact and its source|A whole chapter|Only drawings",
      "If you copy exact words in your notes, you must use...|Quotation marks|Parentheses only|Nothing special",
      "Which is a good short note?|Whales, breathe air, come up to surface|Whales are large marine mammals that must rise to the water's surface to breathe air|Whales are cool"
    ]),
    PL("Parts of an outline", "🗒️", "An outline is a plan for your report. It shows your main ideas and the facts that go under them.", "Big ideas get Roman numerals. Smaller ideas get letters. Facts get numbers.", [
      "topic::what the whole report is about::🎯", "main heading::a big point, marked I, II, III::🔠", "subtopic::a smaller point under a big one, marked A, B, C::🔡", "detail::a fact that supports a subtopic, marked 1, 2, 3::🔢", "introduction::how the report begins::🚪", "conclusion::how the report ends::🏁"
    ], { qd: "Which outline part is this?", qt: "What is this outline part?" }),
    SC("Stay safe online", "🛡️", "The internet is a great place for facts, but you need to be careful. Keep private things private, be wary of tricks, and tell a trusted grown-up if something feels wrong.", "Ask: could this be a trick? Does it ask for private things? When unsure, stop and ask a grown-up.", "A pop-up says my computer is broken. I close it and tell a grown-up.", [
      "A strong password is...|Long, with mixed letters and numbers, and kept secret|Your pet's name|123456",
      "An email says 'You won a prize! Send your address!' You...|Do not answer and tell a grown-up|Send it|Forward it",
      "A pop-up says your computer is broken and to call a number. You...|Close it and tell a grown-up|Call the number|Pay them",
      "A stranger in a game chat wants a private chat. You...|Stop replying and tell a grown-up|Go private|Tell them your school",
      "Which can you share safely online?|Your favorite color|Your home address|Your password",
      "A message has a link you did not expect, even from a friend. You...|Ask before you click|Click it|Send it to everyone",
      "After using a library computer, you should...|Log out and close your pages|Leave your accounts open|Save your password",
      "Someone online says 'Do not tell anyone about this.' You...|Tell a trusted grown-up|Keep the secret|Reply yes"
    ]),
    SC("Give credit and respect copyright", "©️", "Authors, artists and musicians own what they make. This is called copyright. When you use their ideas or pictures, ask a grown-up, give credit and never say it is yours.", "Respect the person who made it: credit them, quote carefully and ask when you are unsure.", "A report uses a fact from a book. The writer lists the book at the end.", [
      "Who owns a story an author wrote?|The author or the publisher|Anyone who reads it|Nobody",
      "Can you copy a whole book to give to friends?|No, that breaks copyright|Yes|Only on Fridays",
      "Copyright means...|The creator has rights to their work|Anyone can copy it|Libraries own all books",
      "To use a picture in a school report, you should...|Ask a grown-up and say where it came from|Say you drew it|Cut it from a library book",
      "Making your own drawing for a report is...|Great, because it is yours|Not allowed|Plagiarism",
      "A short quote with quotation marks and its source is...|Fine and honest|Stealing|Not allowed",
      "You use facts from a website. You should...|List the website as a source|Hide where it came from|Say you knew it all"
    ])
  ];

  // ================= LEVEL 8 =================
  const L8 = [
    SC("AND, OR, NOT", "🔍", "Boolean operators are special words that combine search words. AND finds items with both words. OR finds items with either word. NOT leaves out a word.", "AND narrows a search, OR widens it, and NOT removes something you do not want.", "'pizza AND cheese' finds pages with both words. 'pizza OR cheese' finds pages with either one.", [
      "You search 'cats AND dogs'. The results mention...|Both cats and dogs|Only cats|Neither",
      "You search 'cats OR dogs'. The results mention...|Cats, dogs, or both|Only both together|Neither",
      "You search 'jaguar NOT car'. This tries to...|Leave out results about cars|Find only cars|Add more cars",
      "Which word usually gives MORE results?|OR|AND|NOT",
      "Adding another needed word with AND makes your results...|Fewer|More|The same",
      "'bread OR rolls' finds items about...|Bread, rolls, or both|Only bread and rolls together|Neither",
      "'moon NOT cheese' finds pages about the moon that...|Do not mention cheese|Mention cheese|Mention only cheese",
      "AND, OR and NOT are called...|Boolean operators|Guide words|Call numbers"
    ]),
    booleanCount(),
    PL("Dewey 600s and 700s", "🔧", "The 600s and 700s are full of how-to and fun books. Smaller numbers inside each group are for smaller topics.", "Think of the activity first: staying healthy, building, cooking, drawing, music or sports.", [
      "610::health and medicine::🩺", "620::engineering and machines::🏗️", "630::farming and growing food::🚜", "640::home life and cooking::🍳", "690::building houses::🧱", "740::drawing::✏️", "780::music::🎵", "790::sports and games::⚽", "750::painting::🖼️"
    ], { qd: "Which number fits?", qt: "What is on these shelves?" }),
    lateFines(),
    PL("Dewey 900s: places and history", "🌍", "The 900s are for geography and history. The tens number tells where or when.", "Picture a world map. Each place has its own number.", [
      "910::geography and travel::🧳", "930::ancient history::🏺", "940::history of Europe::🏰", "950::history of Asia::🏯", "960::history of Africa::🌍", "970::history of North America::🗽", "980::history of South America::🦙"
    ], { qd: "Which number fits?", qt: "What is on these shelves?" }),
    SC("Primary or secondary?", "🏺", "A primary source comes from someone who lived or saw the event, like a diary or a photograph. A secondary source tells about an event later, like a textbook.", "Ask: was the writer there at the time, or are they telling us about it afterward?", "A letter written by a pilot in the year it happened is primary. A book about flight written today is secondary.", [
      "A diary written by a girl who lived long ago is a...|Primary source|Secondary source",
      "A textbook chapter about the Moon landing is a...|Secondary source|Primary source",
      "A photograph taken at the event is a...|Primary source|Secondary source",
      "An encyclopedia article about castles is a...|Secondary source|Primary source",
      "A letter written by a sailor to his family at the time is a...|Primary source|Secondary source",
      "A video interview with a person who saw an event is a...|Primary source|Secondary source",
      "A biography of a president written today is a...|Secondary source|Primary source",
      "A primary source comes from...|Someone who saw or lived the event|Someone who read about it later|A made-up story"
    ]),
    SC("What a web address tells you", "🌐", "The ending of a web address, called the domain, gives clues. But a clue is not proof, so always check more.", "Use the ending as one clue only. Then still check the author, the date and other sources.", ".edu often means a school or college, but a student can still make mistakes, so I check more.", [
      "A web address ending in .gov usually means...|A government site|A game site|A store",
      "A web address ending in .edu usually means...|A school or college|A shop|A cartoon site",
      ".org is often used by...|Nonprofit groups, but almost anyone can get one|Only museums|Only the government",
      ".com is often used by...|Businesses|Only schools|Only governments",
      "A padlock and 'https' mean...|The connection is private, not that the facts are true|The facts are true|It is a government site",
      "A page ending in .edu is...|Not always right, so still check it|Always correct|A game",
      "Before you trust a site, you should...|Check who wrote it and why|Count its ads|Look at its colors"
    ]),
    SC("Test your source", "✅", "Not every source is good. Ask who wrote it, when, why, and whether the facts are supported by evidence.", "Find the problem or the good sign: out of date, no author, trying to sell, or backed by evidence.", "A page with no date about the newest phone may be old, so I look for a newer source.", [
      "A page was last updated twelve years ago and is about the newest phones. The problem?|It may be out of date|It is too colorful|It is too short",
      "A blog does not name the author. The problem?|You cannot tell if the writer knows the topic|It is too long|It is too true",
      "A site sells a vitamin and says it cures everything. The problem?|It may be trying to sell, so it could exaggerate|It has a title|It is too quiet",
      "An article lists the experts and sources it used. This is...|A good sign|A bad sign|Not important",
      "The same fact appears in three trusted sources. This is...|Strong evidence|Weak evidence|Proof it is an opinion",
      "Why does an author's purpose matter?|It shows if they want to teach, sell or persuade|It sets the font|It sets the price",
      "A museum website with named experts is...|Likely reliable, but still worth comparing|Always perfect|Always fake"
    ]),
    SC("Bias and point of view", "⚖️", "Bias is leaning to one side. A writer can show bias with strong words or by leaving out facts. Read more than one source to see the whole picture.", "Look for strong feeling words and for only one side of the story.", "'The mayor's terrible plan' sounds biased. 'The mayor's plan' is neutral.", [
      "A team's fan page says 'We were robbed!' This shows...|A one-sided point of view|Neutral reporting|A map",
      "Which sentence is more neutral?|The team lost 3 to 2.|The team lost because of terrible luck.|The awful team lost.",
      "Which words show strong feelings?|amazing, awful, disgusting|table, river, book|Monday, Tuesday",
      "A cereal ad says 'the best breakfast'. Why check other sources?|The ad wants to sell cereal|Ads never talk|Cereal is small",
      "To see a fair picture, you should...|Read more than one source|Read only one|Ask no one",
      "Bias means...|Leaning toward one side|Being short|Being old",
      "Which headline sounds biased?|Mayor's terrible plan ruins everything|Town meeting held on Tuesday|New library hours begin",
      "A writer shows only facts that support one side. This is...|Biased|Balanced|Impossible"
    ]),
    SC("Paraphrase or plagiarize?", "✍️", "Plagiarism is using someone's words or ideas as if they were yours. To paraphrase, say the idea in your own words and still name the source. Use quotation marks for exact words.", "Check: are the words really different, and is the source named?", "Changing only two words of a sentence is not a real paraphrase, so I rewrite the whole idea.", [
      "You copy two sentences from a website without quotation marks. This is...|Plagiarism|Paraphrasing|A summary",
      "Putting an idea in your own words and naming the source is...|Paraphrasing|Plagiarism|Guessing",
      "Changing only a few words and keeping the rest the same is...|Still too close to copying|A perfect paraphrase|A citation",
      "Exact words from a source need...|Quotation marks and the source|Nothing|A new font",
      "Which is the best paraphrase of 'Wolves hunt in packs to bring down large animals'?|Wolves work as a team to catch big prey|Wolves hunt in packs to bring down large animals|Wolves are fuzzy",
      "Does a paraphrase need a source?|Yes, the idea still came from someone|No|Only for sports",
      "If you are unsure whether you copied too much, you can...|Ask your teacher or librarian|Hide it|Add more copying"
    ]),
    cite("book"),
    SC("Library services", "🏛️", "Libraries offer more than books. You can reserve items, borrow from other libraries, read e-books and ask experts for help.", "Think about what each service lets you do.", "A hold on a popular book puts my name on the waiting list.", [
      "A hold lets you...|Reserve a book that someone else has|Keep a book forever|Hide a book",
      "Interlibrary loan lets you...|Borrow a book from another library|Print books|Buy snacks",
      "To keep a book longer, you can often...|Renew it if no one is waiting|Ignore the due date|Hide it",
      "A library database gives you...|Articles you can search|Only fairy tales|Free toys",
      "A librarian can help you...|Find reliable information|Write your report for you|Grade your test",
      "A library card lets you...|Borrow items|Take a free trip|Get a new book every hour",
      "An audiobook is a book you...|Listen to|Eat|Hold up",
      "Many library e-books...|Return themselves when they are due|Must be mailed back|Turn into paper"
    ]),
    PL("Research words", "🎓", "Researchers use special words. Knowing them helps you plan and talk about your work.", "Say each word, then say it in a sentence about your own report.", [
      "topic::the subject you research::🎯", "source::where you found information::📖", "evidence::facts that back up an idea::🧾", "citation::a note that tells where information came from::🔗", "paraphrase::saying an idea in your own words::✍️", "plagiarism::using someone's work as if it were yours::🚫", "bias::favoring one side unfairly::⚖️"
    ], { qd: "Which research word is this?", qt: "What does this word mean?" }),
    SC("Plan with an outline", "🗒️", "An outline puts your ideas in order before you write. I, II and III are main ideas. A, B and C are smaller points under them.", "Big ideas go first, with smaller points under them. Everything should match your topic.", "For a report on owls: I. Where owls live, II. What owls eat, III. How owls hunt.", [
      "In an outline, I. and II. mark...|Main ideas|Tiny details|Page numbers",
      "Letters A, B and C in an outline mark...|Subtopics|Titles|Dates",
      "Which is a good main heading for a report on frogs?|Life cycle|Green|Frog",
      "An outline helps you...|Plan the order before you write|Skip the research|Copy faster",
      "Which fits under 'II. Food' in a report on owls?|A. Owls eat mice and insects|A. Owls live in trees|A. Owls have big eyes",
      "Which does NOT fit in a report about owls' food?|How a tennis racket is made|What owls eat|How owls swallow their food",
      "The conclusion of a report...|Wraps up the main points|Starts the topic|Is only the source list"
    ]),
    SC("Your digital footprint", "👣", "Your digital footprint is the trail you leave online. What you post can last a long time and be seen by others, so think before you post.", "Ask: would I be okay if my family and teacher saw this? Keep private things private.", "Before posting a photo of my friend, I ask my friend and a grown-up.", [
      "Your digital footprint is...|The trail of things you post and do online|Your shoe size|A file icon",
      "Once posted, a picture can be...|Copied and seen by others|Erased from the whole internet at once|Seen only by you",
      "Before you post, think: would I be okay if...|My teacher and family saw it|Nobody saw it|Only one friend saw it",
      "Which is safer in a public profile?|A nickname that does not show your name|Your phone number|Your school name",
      "Privacy settings let you...|Choose who can see your things|Make posts louder|Fix typos",
      "Someone online asks what school you go to. You...|Do not answer and tell a grown-up|Tell them|Send a map",
      "Posting that your family is away on vacation could...|Tell strangers your home is empty|Be fine for everyone|Help you cook",
      "Posting a friend's picture without asking is...|Not kind, so ask first|Always fine|Only wrong if it is funny"
    ]),
    SC("Ads and sponsored content", "📢", "Some results and videos are ads or sponsored, which means a company paid for them. Their goal is to get you to buy something or do something.", "Look for words like Ad or Sponsored and ask what the page wants from you.", "A video where a star praises a snack because they were paid is an ad.", [
      "A search result marked 'Ad' or 'Sponsored' was...|Paid for by a company|Picked by a librarian|Always the most accurate",
      "A video where a star says 'I love this snack' because they were paid is...|An ad|A research source|A textbook",
      "An ad's main goal is to...|Get you to buy or do something|Teach unbiased facts|Check homework",
      "'Limited time! Only 3 left!' is trying to...|Make you hurry to buy|Teach you|Help you think",
      "A site covered in flashing 'Download now!' buttons may be...|Tricking you|Safe|A library",
      "Where can you find checked, ad-free information?|Library databases|Pop-up ads|Random links",
      "Before clicking an ad, you should...|Ask a grown-up|Click fast|Share it",
      "A product review written by the company that sells it may be...|Biased|Neutral|Always wrong"
    ]),
    SC("When sources disagree", "🤝", "Sometimes two sources give different facts. Do not just pick one. Check more sources, look at dates and look for evidence.", "Find a third trusted source, check the dates, and trust evidence more than opinions.", "Two books give different heights for a tower. I check a third book and the newest one.", [
      "Two sources give different heights for a tower. You should...|Check a third trusted source|Pick the one you like|Guess a number",
      "For a fast-changing topic, which source is usually better?|The newer one|The older one|The thicker one",
      "One source gives evidence and one gives only opinions. Trust more...|The one with evidence|The louder one|The shorter one",
      "Sources that agree with each other...|Make a fact more likely true|Make it false|Mean nothing",
      "If you cannot settle a disagreement, you can write...|That sources disagree, and explain both|Nothing at all|A made-up number",
      "A librarian can help you...|Find another reliable source|Choose your opinion|Change the facts",
      "Which is stronger evidence?|Measured numbers from experts|A rumor|A guess"
    ]),
    SC("Skim and scan", "👀", "Skimming is reading quickly to get the main idea. Scanning is looking fast for one word, number or fact. Both save time in research.", "Skim for the big idea. Scan when you hunt for a specific fact.", "To find the year a bridge opened, I scan for numbers.", [
      "Skimming means...|Reading quickly to get the main idea|Reading every word slowly|Counting pages",
      "Scanning means...|Looking quickly for a certain word or fact|Reading for fun|Drawing",
      "To find a date in a long page, you...|Scan for numbers|Read only the last line|Read it upside down",
      "Before reading a chapter, preview the...|Headings and pictures|Last page only|Price",
      "Which helps you check what you understood?|Retell the key points in your own words|Count the words|Read faster",
      "You skim a page and it is not about your topic. You...|Move on to another source|Copy it|Keep it just in case",
      "Bold headings help you...|Find the part you need|Hide the topic|Skip reading"
    ])
  ];

  // ================= LEVEL 9 =================
  const L9 = [
    PL("Dewey: more groups", "🔢", "Dewey numbers go deeper than the hundreds. Here are some from the 000s to the 300s.", "Say the number and the topic together a few times.", [
      "004::computers::💻", "020::libraries and information::🏛️", "030::general encyclopedias::📚", "070::news and journalism::📰", "150::psychology::🧠", "320::government and politics::🏛️", "330::money and economics::💰", "394::customs and holidays::🎉", "398::folklore and fairy tales::🧚"
    ], { qd: "Which Dewey number fits?", qt: "What is on these shelves?" }),
    deweyNum(),
    outOfOrder(),
    planner(),
    SC("Primary, secondary or tertiary?", "🏺", "A primary source comes straight from the time or person. A secondary source studies or explains it later. Some sources, like encyclopedias, gather facts from other sources.", "Ask: was this made during the event, or later by someone studying it?", "A scientist's lab notebook is primary. A magazine article about her work is secondary.", [
      "A recording of a speech made on the day it was given is a...|Primary source|Secondary source",
      "A history textbook about the Roman Empire is a...|Secondary source|Primary source",
      "A map drawn by an explorer on a voyage is a...|Primary source|Secondary source",
      "A newspaper article written the day of an event is usually a...|Primary source|Secondary source",
      "A documentary made years later about an event is a...|Secondary source|Primary source",
      "A scientist's own lab notebook is a...|Primary source|Secondary source",
      "A museum object from the time, like a tool or a coin, is a...|Primary source|Secondary source",
      "An encyclopedia mostly collects information from...|Other sources|Only the writer's memory|Nowhere"
    ]),
    SC("Read sideways", "↔️", "Lateral reading means leaving a page to see what other sources say about it. Before trusting a stranger's site, check what trusted sources say about the site and the claim.", "Open a new search and see what reliable sources say. Do not trust a page's claims about itself.", "A site claims a shocking discovery. I search for it and see if trusted news and experts mention it.", [
      "Lateral reading means...|Leaving the page to check what other sources say about it|Reading sideways|Reading only the footer",
      "A site you do not know claims a shocking discovery. First, you...|Search for what trusted sources say|Share it|Believe it",
      "To learn who runs a website, you can check its About page and...|Other sources that talk about it|Its font|Its ad|",
      "A big claim appears on only one site. It is...|Worth double-checking|Surely true|Certain",
      "A post has thousands of likes. Does that make it true?|No, likes are not evidence|Yes|Only if it is red",
      "Searching a claim with the words 'fact check' can...|Show if others have checked it|Delete it|Make it true",
      "A page says it is 'the most trusted site ever'. You should...|Check what other sources say about it|Believe it because it says so|Trust the logo"
    ].map(r => r.replace(/\|$/, ""))),
    SC("Spotting misinformation", "🚩", "Misinformation is false information. It spreads fast online. Clickbait, old pictures used as new, and posts that make you very angry can all be signs.", "Slow down. Check who made it, where it began and what trusted sources say before you share.", "A shocking headline with no source makes me pause and check before I share.", [
      "A headline says 'You will not believe this!' It is probably...|Clickbait|A summary|A bibliography",
      "An old photo shared as if it were from today is...|Misleading|Accurate|Neutral",
      "A post makes you very angry and says 'share now!' You should...|Pause and check first|Share it|Comment angrily",
      "Pictures can be edited. So you should...|Check where the picture first appeared|Always trust pictures|Never look at pictures",
      "False information shared on purpose to trick people is...|Disinformation|Documentation|A dictionary",
      "Satire sites make up funny news. Their stories are...|Jokes, not real news|Real news|Textbooks",
      "A web address that misspells a well-known site's name is a sign of...|A possible fake|A good source|A library"
    ]),
    SC("Persuasion tricks", "🎣", "Some messages try to push you instead of teaching you. Watch for pressure, loaded words, and only the facts that help one side.", "Ask what the message wants you to do, and what it leaves out.", "'Everyone is buying it!' tries to make me follow the crowd, but I still need proof.", [
      "'Everyone is buying it, so you should too!' is a...|Bandwagon appeal|Fact|Citation",
      "A famous star tells you to buy a drink. This is a...|Celebrity endorsement|Textbook|Index",
      "A graph shows only the one month that looks best. This is...|Cherry-picking|Fair|A caption",
      "'Hurry, only today!' creates...|Pressure|Information|A citation",
      "Words like 'disaster' or 'miracle' are...|Loaded words that sway feelings|Neutral words|Page numbers",
      "A good reader asks of an ad...|What does it want me to do?|What color is it?|How loud is it?",
      "A claim without any evidence should make you ask...|Where is the proof?|Can I believe it?|Who clicked it?"
    ]),
    SC("Five checks for a source", "✅", "A good test for any source has five checks: relevance (fits my question), accuracy (correct), currency (up to date), authority (who wrote it) and purpose (why it was made).", "Match the problem to the check: topic, mistakes, date, writer or reason.", "A 2003 page on the newest phones fails the currency check.", [
      "A page about Africa when your question is about Asia fails the check for...|Relevance|Currency|Authority",
      "A 2005 page about the newest tablets fails the check for...|Currency (being up to date)|Relevance|Purpose",
      "A page with no author or credentials fails the check for...|Authority|Currency|Relevance",
      "A page full of mistakes that other sources contradict fails the check for...|Accuracy|Relevance|Currency",
      "A page written to sell a product, not to teach, raises a question about...|Purpose|Relevance|Currency",
      "The five checks are relevance, accuracy, currency, authority and...|Purpose|Color|Length",
      "Authority asks...|Who wrote this, and do they know the topic?|Is it new?|Is it short?",
      "Currency asks...|Is it up to date?|Is it about my topic?|Who paid for it?"
    ]),
    PL("Parts of a citation", "🔗", "A citation has pieces that let a reader find your source again.", "Collect each piece while you read, not later.", [
      "author::the person or group who wrote it::✍️", "title::the name of the book or page::🏷️", "publisher::the company that made the book::🏢", "publication year::when it came out::📅", "URL::the web address of a page::🌐", "page number::where a fact is inside a book::#️⃣", "date accessed::the day you visited a web page::🗓️"
    ], { qd: "Which citation part is this?", qt: "What is this citation part?" }),
    cite("web"),
    SC("Quotes and in-text credit", "💬", "When you use a source in your writing, mark it. Exact words go in quotation marks. A short note like (Lee 24) can show the author and page. A full list of sources goes at the end.", "Exact words need quotation marks. Facts that are not common knowledge need a source.", "'Whales are mammals' (Cruz 12) shows the fact came from page 12 of Cruz's work.", [
      "(Lee 24) after a sentence means...|The fact came from page 24 of a source by Lee|Lee is 24 years old|There are 24 sentences",
      "Quotation marks around words mean...|They are exactly the source's words|They are yours|They are a title",
      "Where does the full list of sources go?|At the end of the report|Right after the title|Nowhere",
      "Why mark your sources inside the report?|So readers can find where facts came from|To make it longer|To hide mistakes",
      "Which probably needs a source?|Over four million kids joined a program last year|The Earth has one Moon|Fish live in water",
      "Which is common knowledge that rarely needs a source?|The Sun is a star|A rare statistic from a study|A direct quote from an expert",
      "A quote should be...|Short and used to support your point|Your whole report|Changed to sound better"
    ]),
    SC("Use search filters", "🎛️", "Library catalogs and databases have filters. You can narrow results by date, format, reading level or language.", "Pick the filter that fits what you want to change about the results.", "Too many old results? Filter by date to see only recent ones.", [
      "You want only recent articles. Use the filter for...|Date|Spine color|Page weight",
      "You want only audiobooks. Use the filter for...|Format|Date|Author's age",
      "You want books in Spanish. Use the filter for...|Language|Format|Date",
      "You want an easier book on the same topic. Use the filter for...|Reading level|Language|Price",
      "A filter makes the list of results...|Shorter and more exact|Longer|Disappear forever",
      "Too many results from long ago. A good filter is...|Publication date|Title letters|Cover color",
      "You want to see only books on the shelf today. Filter for...|Available now|Checked out|Oldest"
    ]),
    readChart(),
    SC("Organize your notes", "🗃️", "Sort your note cards into piles by subtopic. Each card holds one fact and a source number. Then your outline almost writes itself.", "One fact per card, labeled with its source, sorted by subtopic.", "Cards about food go in one pile, and cards about habitat go in another.", [
      "Each note card should have...|One fact and the source|Many facts and no source|Only a picture",
      "To organize cards, you can...|Sort them into piles by subtopic|Toss them in a bag|Put them in random order",
      "Why label each card with its source?|So you can cite it later|For decoration|To make it longer",
      "A card with two different topics should be...|Split into two cards|Thrown away|Copied twice",
      "Cards you will not use because they are off topic can be...|Set aside|Copied anyway|Forced into the report",
      "After sorting cards, the piles can become the...|Main parts of your outline|Title page only|Glossary",
      "A source number on a card helps you...|Match the fact to your source list|Count the cards|Change the fact"
    ]),
    SC("Write it clearly", "✏️", "A good paragraph has one main idea. The first sentence, the topic sentence, tells it. Details support it. Transition words like first, next and however link ideas.", "Every sentence in a paragraph should help the topic sentence.", "Topic sentence: 'Owls are skilled night hunters.' Details: sharp hearing, quiet wings, strong claws.", [
      "Which is the best topic sentence about how owls hunt?|Owls are skilled night hunters.|Owls.|I like owls.",
      "Which is a transition word?|However|Table|Seven",
      "A paragraph should have...|One main idea with supporting details|Ten different topics|No details",
      "A conclusion should...|Wrap up the main points|Add a brand new topic|Copy a source",
      "Which sentence belongs in a paragraph about how bees make honey?|Bees collect nectar and store it in the hive.|Bats fly at night.|Frogs hop on land.",
      "Which transition shows order?|First, next, finally|But, though, yet|Because, so, since",
      "After you write, a good step is to...|Reread and fix mistakes|Hide your report|Skip the title"
    ]),
    SC("Scams and strangers online", "🛡️", "Scammers send tricky messages to steal private information or money. Real helpers never ask for secrets. Stop, do not reply, and tell a trusted grown-up.", "If a message rushes you, asks for private things or says keep it secret, stop and tell a grown-up.", "A text says 'Click to claim your prize!' I do not click, and I tell a grown-up.", [
      "An email pretends to be from a company and asks for your password. This is...|Phishing, so do not reply|A normal request|A prize",
      "A stranger in a game offers you free gifts if you chat in private. You...|Stop replying and tell a grown-up|Say yes|Give your name",
      "A link says 'You won a free game console!' You...|Do not click and tell a grown-up|Click quickly|Share it",
      "A message says 'Do this now or your account will close!' It is trying to...|Rush you into a mistake|Help you|Teach you",
      "Real companies and libraries...|Do not ask you to share your password in a message|Often ask for passwords by text|Need your home address",
      "Someone asks for a photo of you and says keep it secret. You...|Say no and tell a grown-up right away|Send one|Send a silly one",
      "You think you clicked a bad link. You...|Tell a grown-up right away|Hide it|Click more"
    ]),
    SC("Copyright, public domain and sharing", "©️", "Copyright protects what creators make. Some works are in the public domain, which means anyone can use them. Creative Commons licenses say how a creator allows others to use their work. When unsure, ask.", "Find out who owns the work and what the license says. Give credit, and ask a grown-up if you are not sure.", "A drawing with a license that says 'use with credit' can be used if I name the artist.", [
      "A work in the public domain...|Can be used by anyone|Belongs to the librarian|Is always a photo",
      "A Creative Commons license tells you...|How you may use the creator's work|The price of the book|The library's hours",
      "A song you like is not marked free to use. Before using it in a project, you...|Ask a grown-up and the owner for permission|Copy it anyway|Say you wrote it",
      "Copyright usually protects...|Creators' original work|Facts alone|Common words",
      "Using a few quoted lines with credit in a school report is usually...|Allowed, but ask your teacher|Never allowed|The same as stealing",
      "Making your own picture for your project means...|You own it and need no permission|You must ask the librarian|It is plagiarism",
      "You are unsure whether you can use something. You...|Ask a grown-up|Use it and hope|Hide where it came from"
    ])
  ];

  Object.assign(LIBRARY_LEVELS, {
    7: lvl(7, L7, [0, 2, 4, 6, 9, 12]),
    8: lvl(8, L8, [0, 1, 4, 6, 7, 11]),
    9: lvl(9, L9, [0, 1, 2, 5, 7, 12])
  });
})();
