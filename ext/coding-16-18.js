// ext/coding-16-18.js  Mind Lab Coding levels 16-18 (60 lessons): data, databases, web, games, AI ideas, ethics, projects
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const mix = (...ms) => () => pick(ms)();
  const MIXS = t => [
    S("Review time!", "🔄", "This lesson mixes ideas you already know. Take your time and think about each one."),
    S("Remember", "🧠", t),
    S("Tip", "💡", "Go slowly. Work one step at a time and write down the values as you go.")
  ];
  const code = lines => `<div style="text-align:left;display:inline-block;font-family:monospace;background:#eef2ff;color:#1a2a55;padding:8px 14px;border-radius:10px;line-height:1.5">${lines.join("<br>")}</div>`;
  const LT = "&lt;", GT = "&gt;";
  const numChoices = (a, spread) => {
    const s = new Set([a]); let t = 0;
    while (s.size < 4 && t++ < 300) { const d = a + ri(-spread, spread); if (d !== a && d >= 0) s.add(d); }
    return shuf([...s]);
  };
  const nk = x => String(x).toLowerCase().replace(/[^a-z0-9]/g, "");
  const strChoices = (right, wrongs) => { const seen = new Set([nk(right)]), out = []; for (const w of wrongs) { if (!seen.has(nk(w))) { seen.add(nk(w)); out.push(w); } } return shuf([right, ...out.slice(0, 3)]); };
  const num = (text, answer, hints, visual) => ({ text, visual, answer, hints });
  const txt = (text, answer, hints, visual) => ({ text, visual, textInput: true, answer, hints });
  const mc = (text, right, wrongs, hints, visual) => ({ text, visual, choices: strChoices(right, wrongs), answer: right, hints });
  const nc = (text, answer, spread, hints, visual) => ({ text, visual, choices: numChoices(answer, spread), answer, hints });
  const yn = (text, ok, hints, visual) => ({ text, visual, choices: ["yes", "no"], answer: ok ? "yes" : "no", hints });
  const lst = a => "[" + a.join(", ") + "]";
  const uniq = (n, lo, hi) => shuf(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, n);
  const sum = a => a.reduce((x, y) => x + y, 0);
  const facts = (items, nudge, example) => () => {
    const [q, r, w, c, v] = pick(items);
    return { text: q, visual: v, choices: strChoices(r, w), answer: r, hints: [nudge, c || nudge, example] };
  };
  const table = (head, rows) => `<table style="border-collapse:collapse;margin:auto;font-size:0.95em"><tr>${head.map(h => `<th style="border:1px solid #889;padding:3px 10px;background:#dde4ff;color:#1a2a55">${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map(c => `<td style="border:1px solid #889;padding:3px 10px">${c}</td>`).join("")}</tr>`).join("")}</table>`;
  const side = (a, b) => `<div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">${a}${b}</div>`;
  const NM = ["Ava", "Ben", "Cleo", "Dan", "Eli", "Fay", "Gus", "Hana", "Ivan", "Jo"];
  const sqlRows = n => { const nm = shuf(NM).slice(0, n), sc = uniq(n, 40, 99); return nm.map((x, i) => [x, ri(6, 8), sc[i]]); };
  const sqlT = r => table(["name", "grade", "score"], r);

  // =====================================================================
  // LEVEL 16
  // =====================================================================
  const mmmQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const n = pick([4, 5, 6]), a = Array.from({ length: n }, () => ri(2, 14));
      a[0] += (n - sum(a) % n) % n;
      return num(`Find the <b>mean</b> (the average) of these numbers:<br><b>${lst(a)}</b>`, sum(a) / n, [
        "The mean shares the total out equally. What do you do with all the numbers first?",
        "Add all the numbers, then divide the total by how many numbers there are.",
        "Example: [2, 4, 6]. The total is 12 and there are 3 numbers, so 12 / 3 = 4. Now do yours."
      ]);
    }
    if (t === 1) {
      const n = pick([5, 7]), a = uniq(n, 1, 30), s = [...a].sort((x, y) => x - y);
      return num(`Find the <b>median</b> (the middle number after sorting):<br><b>${lst(a)}</b>`, s[(n - 1) / 2], [
        "The median needs the numbers in order first. Sort them from smallest to biggest.",
        "After sorting, cross off one number from each end again and again. The one left in the middle is the median.",
        "Example: [9, 2, 5]. Sorted: 2, 5, 9. The middle one is 5. Now do yours."
      ]);
    }
    const m = ri(1, 20), others = uniq(5, 1, 30).filter(x => x !== m).slice(0, ri(3, 4)), a = shuf([...Array(ri(2, 3)).fill(m), ...others]);
    return num(`Find the <b>mode</b> (the number that shows up most often):<br><b>${lst(a)}</b>`, m, [
      "The mode is about counting. Which number appears again and again?",
      "Tally each number. The one with the biggest tally wins.",
      "Example: [3, 7, 3, 9]. The 3 appears twice and the others once, so the mode is 3. Now do yours."
    ]);
  };

  const rangeQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const a = Array.from({ length: 6 }, () => ri(3, 60));
      return num(`The <b>range</b> is the biggest value minus the smallest value.<br>What is the range of <b>${lst(a)}</b>?`, Math.max(...a) - Math.min(...a), [
        "Look for two special numbers in the list. Which two?",
        "Find the largest and the smallest, then subtract: largest minus smallest.",
        "Example: [4, 9, 6]. Largest 9, smallest 4, so the range is 9 - 4 = 5. Now do yours."
      ]);
    }
    if (t === 1) {
      const base = uniq(5, 10, 24), o = pick([2, 3, 55, 60, 70, 80]), a = shuf([...base, o]);
      const ch = shuf([o, ...base.slice(0, 3)]);
      return { text: `One value in this list is an <b>outlier</b> (very different from the rest). Which one?<br><b>${lst(a)}</b>`, choices: ch, answer: o, hints: [
        "Most values are close together. Look for the one that sits far away from the crowd.",
        "Compare each number with its neighbors in size. The outlier is the loner, much bigger or much smaller than the rest.",
        "Example: [11, 12, 13, 90, 12]. Four values are near 12, but one is far away, so that is the outlier. Now do yours."
      ] };
    }
    const base = Array.from({ length: 4 }, () => ri(8, 12)), big = Math.random() < 0.5, nv = big ? pick([40, 50, 60]) : pick([1, 2, 3]);
    return { text: `Four quiz scores are <b>${lst(base)}</b>. A fifth score of <b>${nv}</b> is added. What happens to the <b>mean</b>?`, choices: ["goes up", "goes down", "stays the same"], answer: big ? "goes up" : "goes down", hints: [
      "Compare the new score with the scores that are already there. Is it far above or far below them?",
      "A score above the old average pulls the mean in one direction. A score below it pulls the other way.",
      "Example: scores 5, 5, 5 and a new score of 20. The new score is far above, so the mean rises. Now do yours."
    ] };
  };

  const PETS = ["cats", "dogs", "fish", "birds", "hamsters", "turtles"];
  const freqQ = () => {
    const ks = shuf(PETS).slice(0, 4), vs = uniq(4, 2, 14), rows = ks.map((k, i) => [k, vs[i]]);
    const vis = table(["Favorite pet", "Votes"], rows), t = ri(0, 3);
    const hs = [
      "Find the right row in the table first.",
      "Read across the row for the number of votes. For totals, add the numbers in the second column.",
      "Example: cats 3, dogs 5. Dogs minus cats is 5 - 3 = 2 more votes for dogs. Now do yours."
    ];
    if (t === 0) { const i = ri(0, 3); return num(`How many votes did <b>${ks[i]}</b> get?`, vs[i], hs, vis); }
    if (t === 1) return num("How many votes were cast in total?", sum(vs), hs, vis);
    if (t === 2) { const mx = vs.indexOf(Math.max(...vs)); return mc("Which pet got the most votes?", ks[mx], ks.filter((_, i) => i !== mx), hs, vis); }
    const i = ri(0, 3); let j = ri(0, 3); while (j === i) j = ri(0, 3);
    const [hi, lo] = vs[i] > vs[j] ? [i, j] : [j, i];
    return num(`How many more votes did <b>${ks[hi]}</b> get than <b>${ks[lo]}</b>?`, vs[hi] - vs[lo], hs, vis);
  };

  const pctQ = () => {
    const n = pick([20, 25, 40, 50, 100, 200]), p = pick([10, 20, 25, 30, 40, 50, 60, 75, 80].filter(x => (n * x) % 100 === 0)), k = n * p / 100;
    if (Math.random() < 0.6) return num(`In a class survey, <b>${k}</b> of <b>${n}</b> students said they like coding. What <b>percent</b> is that?`, p, [
      "A percent means 'out of 100'. First make a fraction: part over whole.",
      "Divide the part by the whole, then multiply by 100. (Or find what you multiply the whole by to reach 100.)",
      "Example: 6 out of 20. 6 / 20 = 0.3, and 0.3 * 100 = 30 percent. Now do yours."
    ]);
    return num(`<b>${p}%</b> of <b>${n}</b> players finished the level. How many players finished?`, k, [
      "Percent means out of 100. Turn the percent into a fraction of the whole group.",
      "Multiply the total by the percent, then divide by 100.",
      "Example: 50% of 80 is 80 * 50 / 100 = 40. Now do yours."
    ]);
  };

  const sheetQ = () => {
    const a = Array.from({ length: 3 }, () => ri(1, 12)), b = Array.from({ length: 3 }, () => ri(1, 12));
    const vis = table(["", "A", "B"], [1, 2, 3].map((r, i) => [r, a[i], b[i]]));
    const f = pick([
      ["=SUM(A1:A3)", sum(a)], ["=SUM(B1:B3)", sum(b)], ["=A2 + B2", a[1] + b[1]], ["=A3 * B3", a[2] * b[2]],
      ["=MAX(A1:B3)", Math.max(...a, ...b)], ["=MIN(A1:B3)", Math.min(...a, ...b)], ["=SUM(A1:B2)", a[0] + a[1] + b[0] + b[1]], ["=MAX(A1:B1) - MIN(A1:B1)", Math.max(a[0], b[0]) - Math.min(a[0], b[0])]
    ]);
    return num(`A spreadsheet has the cells shown. What does the formula <b>${f[0]}</b> show?`, f[1], [
      "A cell name is the column letter then the row number, like B2. Find the cells the formula uses.",
      "A:B means a block of cells. SUM adds them, MAX picks the biggest, MIN picks the smallest.",
      "Example: if A1 is 4 and A2 is 6, then =SUM(A1:A2) is 10 and =A1 * A2 is 24. Now do yours."
    ], vis);
  };

  const sqlCountQ = () => {
    const r = sqlRows(7), t = ri(0, 3), x = ri(5, 9) * 10, g = ri(6, 8);
    let q, a;
    if (t === 0) { q = `SELECT COUNT(*) FROM students WHERE score ${GT} ${x};`; a = r.filter(z => z[2] > x).length; }
    else if (t === 1) { q = `SELECT COUNT(*) FROM students WHERE grade = ${g};`; a = r.filter(z => z[1] === g).length; }
    else if (t === 2) { q = "SELECT MAX(score) FROM students;"; a = Math.max(...r.map(z => z[2])); }
    else { q = "SELECT MIN(score) FROM students;"; a = Math.min(...r.map(z => z[2])); }
    return num(`What does this query return?<br>${code([q])}`, a, [
      "Read the query like a sentence. Which rows does the WHERE part keep?",
      "COUNT(*) counts the rows that pass the test. MAX and MIN pick the biggest or smallest value in that column.",
      "Example: table with scores 50, 60, 90. COUNT(*) WHERE score > 55 gives 2, and MAX(score) gives 90. Now do yours."
    ], sqlT(r));
  };

  const sqlOrderQ = () => {
    const r = sqlRows(5), t = ri(0, 2);
    let q, key;
    if (t === 0) { q = "SELECT name FROM students ORDER BY score DESC LIMIT 1;"; key = [...r].sort((x, y) => y[2] - x[2])[0][0]; }
    else if (t === 1) { q = "SELECT name FROM students ORDER BY score ASC LIMIT 1;"; key = [...r].sort((x, y) => x[2] - y[2])[0][0]; }
    else { q = "SELECT name FROM students ORDER BY name ASC LIMIT 1;"; key = r.map(z => z[0]).sort()[0]; }
    return mc(`Which name does this query return?<br>${code([q])}`, key, r.map(z => z[0]).filter(n => n !== key), [
      "ORDER BY sorts the rows. LIMIT 1 keeps only the top row after sorting.",
      "ASC means smallest first (or A to Z). DESC means biggest first (or Z to A). Find the first row of the sorted table.",
      "Example: scores Max 5, Kim 9. ORDER BY score DESC puts Kim first, so LIMIT 1 returns Kim. Now do yours."
    ], sqlT(r));
  };

  const KEYS = [
    ["In a table of students, which column is the best <b>primary key</b>?", "a unique student ID number", ["first name", "grade", "favorite color"], "A primary key must be different for every row and never change."],
    ["In a database table, what is one <b>row</b>?", "one record (one thing)", ["one kind of information", "the name of the table", "a copy of the database"], "Think of one line in a spreadsheet that describes one item."],
    ["In a database table, what is a <b>column</b> (field)?", "one kind of information, like score", ["one whole record", "a backup", "a password"], "It runs up and down and has a heading."],
    ["Which SQL command adds a new row to a table?", "INSERT", ["SELECT", "SORT", "PRINT"], "Think about putting something into the table."],
    ["Which SQL command reads data from a table?", "SELECT", ["INSERT", "DELETE", "SAVE"], "You choose which columns to look at."],
    ["What does the WHERE part of a query do?", "keeps only rows that pass a test", ["sorts the table", "deletes the table", "adds a column"], "It acts like a filter."],
    ["Why does every row need a unique key?", "so each row can be told apart", ["so the table looks pretty", "to make the file smaller", "so names can repeat less"], "Imagine two rows that look exactly the same. Which one would you change?"],
    ["A database table is most like...", "a spreadsheet with named columns", ["a photo album", "a calculator", "a music video"], "It has rows and columns of stored facts."],
    ["What does <b>DELETE FROM pets WHERE id = 3</b> do?", "removes the row whose id is 3", ["removes every row", "adds a pet named 3", "sorts the pets"], "Read the WHERE part: it chooses which rows are affected."]
  ];

  const CODES = [
    ["A web page comes back with status <b>200</b>. What does that mean?", "OK: it worked", ["page not found", "the server broke", "you are not allowed"], "Think of the 'happy' code."],
    ["A web page comes back with status <b>404</b>. What does that mean?", "page not found", ["it worked", "the server broke", "page moved forever"], "The server could not find what was asked for."],
    ["A web page comes back with status <b>500</b>. What does that mean?", "the server had an error", ["page not found", "it worked", "you typed a bad password"], "Codes that start with 5 say the trouble is at the server."],
    ["A web page comes back with status <b>403</b>. What does that mean?", "forbidden: not allowed", ["it worked", "page not found", "the server is busy"], "You asked for something the site will not let you see."],
    ["A web page comes back with status <b>301</b>. What does that mean?", "moved to a new address", ["it worked", "page not found", "the server broke"], "Think of a shop that moved down the street."],
    ["In the web, what is a <b>request</b>?", "a message asking a server for something", ["the answer from the server", "a kind of password", "a web page color"], "It is sent first, before anything comes back."],
    ["In the web, what is a <b>response</b>?", "the server's answer sent back", ["the first message you send", "a typing mistake", "an image file only"], "It comes after the request."],
    ["Codes that start with <b>4</b> (like 404) mostly mean...", "a problem with the request", ["a problem inside the server", "everything is fine", "the page is huge"], "The client asked for something that cannot be given."],
    ["Your browser is called the...", "client", ["server", "router", "database"], "It is the side that asks for things."]
  ];

  const urlQ = () => {
    const proto = pick(["https", "http"]), dom = pick(["games.example", "mapzone.example", "cave.example", "pixel.example"]), p1 = pick(["maps", "play", "levels", "shop"]), p2 = pick(["cave", "forest", "level2", "castle"]);
    const url = `${proto}://${dom}/${p1}/${p2}`, vis = code([url]), t = ri(0, 2);
    const hs = [
      "Split the address into pieces: one before the ://, one right after it, and the rest.",
      "The part before :// says how to talk. The next part up to the first single / is the website's name. Everything after that is the route to one page.",
      "Example: ftp://files.example/docs/a. Before :// is ftp, the site is files.example, and the route is /docs/a. Now do yours."
    ];
    if (t === 0) return mc("In this web address, which part is the <b>protocol</b> (how to talk)?", proto, ["https", "http", dom, p1].filter(x => x !== proto), hs, vis);
    if (t === 1) return mc("In this web address, which part is the <b>domain</b> (the website's name)?", dom, [proto, p1, p2], hs, vis);
    return mc("In this web address, which part is the <b>path</b> (the page inside the site)?", `/${p1}/${p2}`, [`${dom}/${p1}`, `${proto}://`, dom], hs, vis);
  };

  const PHISH = [
    ["An email says: 'Your account closes in 1 hour! Click now!' What is this most likely?", "phishing", ["a gift", "a normal update", "a game level"], "Scammers rush you so you do not think."],
    ["A message seems to be from your bank. What is the safest thing to do?", "open the official app or site yourself", ["click the link in the message", "reply with your password", "forward it to friends"], "Do not use the path the message gives you."],
    ["Someone you do not know asks for your password in a message. You should...", "never share it", ["send it if they say please", "send half of it", "send it if they say it is urgent"], "A password is a secret just for you."],
    ["Which is a common sign of a phishing message?", "urgent threats and spelling mistakes", ["a friendly greeting", "a short message", "a clear and calm tone"], "Scam messages often try to scare you."],
    ["You get an unexpected attachment from an unknown sender. What do you do?", "do not open it and ask a trusted adult", ["open it fast", "open it on every device", "reply asking for more"], "An attachment can hide a harmful program."],
    ["A site address looks like <b>bank.login-check.example</b> but your real bank is at <b>bank.example</b>. The first one is...", "probably fake", ["the real bank", "always safe", "a free gift"], "Compare the main part of the address carefully."],
    ["The padlock in the browser means the connection is encrypted. Does it prove the site is honest?", "no, a fake site can have one too", ["yes, always", "yes, only on weekdays", "it proves it is a bank"], "Encrypted only means other people cannot read the messages."],
    ["Why do scammers add a big countdown or a scary warning?", "so you act before you think", ["to be polite", "to save data", "to make the page faster"], "What do they want you to skip?"]
  ];

  const hpQ = () => {
    const A = ri(8, 15), R = ri(2, 6), dmg = Math.max(1, A - R), H = ri(30, 70);
    const t = ri(0, 1), k = ri(2, 4);
    if (t === 0 && H > k * dmg) return num(`In a game, armor takes <b>${R}</b> away from every hit (but a hit always does at least 1 damage). An enemy hits for <b>${A}</b>. You have <b>${H}</b> HP and get hit <b>${k}</b> times. How many HP are left?`, H - k * dmg, [
      "First work out the damage of ONE hit after the armor takes its share.",
      "One hit does (attack - armor) damage, but never less than 1. Multiply that by the number of hits and take it from the HP.",
      "Example: attack 10, armor 4, so each hit does 6. Three hits do 18. With 50 HP you end with 32. Now do yours."
    ], "🛡️⚔️");
    return num(`Armor takes <b>${R}</b> away from every hit (a hit always does at least 1). An enemy hits for <b>${A}</b>. You have <b>${H}</b> HP. How many hits does it take to bring your HP to 0 or below?`, Math.ceil(H / dmg), [
      "Find the damage of one hit first. Then ask: how many of those fit into your HP?",
      "Divide HP by the damage per hit. If there is a remainder, you need one more hit to finish.",
      "Example: damage 7 per hit, 20 HP. 20 / 7 is 2 with a remainder, so it takes 3 hits. Now do yours."
    ], "🛡️⚔️");
  };

  const comboQ = () => {
    const base = pick([10, 20, 50]), seq = Array.from({ length: 6 }, () => Math.random() < 0.75);
    if (!seq.includes(false)) seq[ri(1, 4)] = false;
    let m = 1, tot = 0;
    seq.forEach(h => { if (h) { tot += base * m; m = Math.min(3, m + 1); } else m = 1; });
    return num(`A combo game gives <b>${base}</b> points per hit times the combo number. The combo starts at 1, goes up by 1 after each hit (up to 3), and a miss resets it to 1 with no points.<br>Hits and misses: <b>${seq.map(h => h ? "✅" : "❌").join(" ")}</b><br>What is the total score?`, tot, [
      "Go one move at a time. Keep track of two things: the score and the combo number.",
      "For a hit: add base * combo to the score, then raise the combo (max 3). For a miss: score stays and combo goes back to 1.",
      "Example: base 10, moves ✅ ✅ ❌ ✅. Scores: 10*1, 10*2, nothing, then combo is 1 again: 10*1. Total 40. Now do yours."
    ]);
  };

  const probQ = () => {
    const t = ri(0, 3);
    if (t === 0) {
      const n = pick([4, 5, 10, 20, 25]), k = ri(1, n - 1);
      return num(`A fair spinner has <b>${n}</b> equal parts and <b>${k}</b> of them are red. If you spin it <b>100</b> times, about how many red results do you expect?`, 100 * k / n, [
        "First find the chance of red: red parts out of all parts.",
        "Turn the chance into a number out of 100 spins: 100 times red parts, divided by all parts.",
        "Example: 1 red part out of 5. In 100 spins we expect 100 / 5 = 20 reds. Now do yours."
      ], "🎡");
    }
    if (t === 1) {
      const n = ri(2, 5);
      return num(`You flip a coin <b>${n}</b> times in a row and write the results (like HTH). How many different result lists are possible?`, 2 ** n, [
        "Each flip has two choices. Think about what happens to the number of lists when you add one more flip.",
        "Every extra flip doubles the number of lists. Start with 2 for one flip and keep doubling.",
        "Example: 2 flips give HH, HT, TH, TT = 4 lists. 3 flips would give 8. Now do yours for a different number of flips."
      ], "🪙");
    }
    if (t === 2) {
      const S = ri(2, 12), w = 6 - Math.abs(S - 7), ex = S === 5 ? 8 : 5;
      return num(`You roll two six-sided dice. In how many different ways can the numbers add up to <b>${S}</b>? (Count 2+5 and 5+2 as different.)`, w, [
        "List the pairs: first die, second die. Start with the smallest possible first die.",
        "Go through first die 1 to 6 and check if the second die needed (sum minus first) is between 1 and 6.",
        `Example: sum ${ex}. Pairs: ${Array.from({ length: 6 }, (_, i) => i + 1).filter(a => ex - a >= 1 && ex - a <= 6).map(a => `${a}+${ex - a}`).join(", ")}. That is ${6 - Math.abs(ex - 7)} ways. Now do yours.`
      ], "🎲🎲");
    }
    const ev = pick([["an even number", 3], ["a number bigger than 4", 2], ["a 6", 1], ["a number smaller than 3", 2], ["not a 1", 5], ["a number bigger than 2", 4]]);
    return num(`A fair six-sided die is rolled. How many of the 6 faces give <b>${ev[0]}</b>?`, ev[1], [
      "Write down all six faces: 1, 2, 3, 4, 5, 6.",
      "Go through the faces one by one and mark the ones that fit the description. Then count the marks.",
      "Example: faces that are odd: 1, 3, 5. That is 3 faces. Now do yours."
    ], "🎲");
  };

  const caseQ = () => {
    const t = ri(0, 4), n = ri(6, 20), p = ri(2, n - 1), on = pick([7, 9, 11, 13, 15]);
    const base = `A program looks for a name in a list of <b>${n}</b> names by checking them one at a time from the start (linear search).`;
    const hs = [
      "Linear search stops as soon as it finds the name, or when the list runs out.",
      "Count how many names are checked up to the stopping point.",
      "Example: list of 8 names. If the name is first, 1 check. If it is last, 8 checks. If it is 5th, 5 checks. Now do yours."
    ];
    if (t === 0) return num(`${base} What is the <b>best case</b> (fewest checks)?`, 1, hs, "🔎");
    if (t === 1) return num(`${base} What is the <b>worst case</b> if the name is in the list (most checks)?`, n, hs, "🔎");
    if (t === 2) return num(`${base} The name is at position <b>${p}</b>. How many names are checked?`, p, hs, "🔎");
    if (t === 3) return num(`${base} The name is NOT in the list. How many names are checked before the program gives up?`, n, hs, "🔎");
    return num(`A list has <b>${on}</b> names and the one you want is equally likely to be at any position. On average, how many checks does linear search take? (Add the positions 1 to ${on} and divide by ${on}.)`, (on + 1) / 2, [
      "The positions run 1, 2, 3, up to the end. The average is the middle of that run.",
      "The average of 1 up to n is halfway between the first and the last number: add them and halve.",
      "Example: for 5 names the positions are 1 to 5. (1+5)/2 = 3 checks on average. Now do yours."
    ], "🔎");
  };

  const accQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      const n = pick([20, 25, 40, 50, 100, 200]), p = pick([60, 70, 75, 80, 85, 90, 95].filter(x => (n * x) % 100 === 0)), k = n * p / 100;
      return num(`A model is tested on <b>${n}</b> new pictures and gets <b>${k}</b> right. What is its <b>accuracy</b> as a percent?`, p, [
        "Accuracy is the share of answers that were right.",
        "Divide the number right by the number tested, then multiply by 100.",
        "Example: 18 right out of 20. 18 / 20 = 0.9, so the accuracy is 90 percent. Now do yours."
      ], "🤖");
    }
    const n = pick([20, 40, 100, 200, 400]), p = pick([70, 75, 80].filter(x => (n * x) % 100 === 0)), tr = n * p / 100;
    if (t === 1) return num(`You have <b>${n}</b> labeled examples. You use <b>${p}%</b> to train and the rest to test. How many are used for <b>training</b>?`, tr, [
      "Find the part of the whole that is used for training.",
      "Multiply the total by the percent and divide by 100.",
      "Example: 50 examples, 60% for training: 50 * 60 / 100 = 30. Now do yours."
    ], "📚");
    return num(`You have <b>${n}</b> labeled examples. You use <b>${p}%</b> to train and the rest to test. How many are kept for <b>testing</b>?`, n - tr, [
      "The training part and the testing part together make the whole set.",
      "Find the training count first (total * percent / 100), then take it away from the total.",
      "Example: 50 examples, 60% for training means 30 train, so 50 - 30 = 20 are kept for testing. Now do yours."
    ], "🧪");
  };

  const BIAS = [
    ["A face tool was tested only on photos of one kind of person. What problem can that cause?", "it may work worse for other people", ["it will run faster", "it will be more fair", "it will never make mistakes"], "Think about who was left out of the test."],
    ["In machine learning, <b>training data</b> is...", "the examples a program learns from", ["the program's name", "the screen it runs on", "the final answer only"], "Programs learn from it before they are used."],
    ["<b>Bias</b> in data means the examples...", "leave out or favor some groups", ["are always perfect", "are all the same size", "are stored in a list"], "Is the picture fair to everyone?"],
    ["What helps make an app fairer?", "test it with many different kinds of people", ["test it with one friend only", "never test it", "hide how it works"], "More variety shows more problems."],
    ["A game can only be played with a mouse. Who might be left out?", "people who cannot use a mouse", ["people who like games", "nobody", "people who own a mouse"], "Good design includes other ways to play."],
    ["A program makes an unfair choice. Who is responsible for fixing it?", "the people who make and run it", ["the program alone", "nobody", "the computer's fan"], "Programs are made by people."],
    ["A chatbot gives an answer that sounds sure. What is a good habit?", "check important facts in a reliable source", ["trust it always", "never read it", "ask it to be quiet"], "Sounding sure is not the same as being right."],
    ["A music app only recommends songs from the most popular artists. What might be missing?", "new and smaller artists", ["any songs at all", "the volume button", "the screen"], "Who never gets a chance to be shown?"]
  ];

  const CT = [
    ["Splitting a big problem into smaller parts is called...", "decomposition", ["abstraction", "debugging", "compiling"], "Think of taking something apart piece by piece."],
    ["Ignoring details you do not need and keeping the important ones is called...", "abstraction", ["decomposition", "typing", "downloading"], "A map shows roads and hides every tree."],
    ["Noticing things that repeat or look alike is called...", "pattern recognition", ["abstraction", "overflow", "formatting"], "You are spotting what is the same."],
    ["A clear step-by-step plan to solve a problem is called an...", "algorithm", ["emoji", "icon", "outlier"], "Recipes and directions are examples."],
    ["Building a racing game. Which is a good small part to build first?", "a car that moves with the keys", ["the credits music", "all 50 tracks", "the advertising"], "Pick a part you can finish and test quickly."],
    ["A subway map ignores the real curves of the tracks. This is an example of...", "abstraction", ["decomposition", "debugging", "a bug"], "It keeps only what riders need."],
    ["Each game level uses the same enemy code with different numbers. Spotting this is...", "pattern recognition", ["abstraction", "debugging", "a syntax error"], "The same idea shows up again and again."],
    ["You write down the steps to make a sandwich so anyone could follow them. You made an...", "algorithm", ["abstraction", "outlier", "icon"], "Steps in order, clear enough for anyone."]
  ];

  const A16 = [mmmQ, rangeQ, freqQ, pctQ, sheetQ, sqlCountQ, sqlOrderQ];
  const lessons16 = [
    L("Mean, median, mode", mmmQ, [S("Three kinds of 'typical'", "📊", "The <b>mean</b> is the average: total divided by how many. The <b>median</b> is the middle after sorting. The <b>mode</b> is the most common value."), S("Examples", "🧮", "[2, 4, 6]: mean = 12 / 3 = 4. [9, 2, 5] sorted is 2, 5, 9, so the median is 5. [3, 7, 3, 9]: the mode is 3."), S("Tip", "💡", "Data scientists use these to describe a lot of numbers with just one. Always sort before you look for the median.")]),
    L("Range and outliers", rangeQ, [S("How spread out?", "↔️", "The <b>range</b> is the biggest value minus the smallest. It tells how spread out the data is."), S("Outliers", "🐘", "An <b>outlier</b> is a value far away from the rest, like one huge score among small ones. It can pull the mean a lot."), S("Tip", "💡", "A score above the old average pulls the mean up. A score below pulls it down. The median is less bothered by outliers.")]),
    L("Reading a frequency table", freqQ, [S("Counting votes", "🗳️", "A <b>frequency table</b> lists each choice and how many times it happened."), S("Reading it", "👀", "Find the row, then read the count. Add the counts for the total. Subtract two counts to compare."), S("Tip", "💡", "Check your total: it should match the number of people who answered.")]),
    L("Percentages from data", pctQ, [S("Out of 100", "💯", "A <b>percent</b> means out of 100. 30% means 30 out of every 100."), S("Two directions", "↔️", "Part to percent: part / whole * 100. Percent to part: whole * percent / 100."), S("Example", "🧮", "6 of 20 players: 6 / 20 = 0.3, so 30%. And 50% of 80 players is 80 * 50 / 100 = 40.")]),
    L("Spreadsheet formulas", sheetQ, [S("Cells have names", "🧾", "A spreadsheet cell is named by its column letter and row number. B2 is column B, row 2."), S("Formulas", "🧮", "A formula starts with =. <b>=SUM(A1:A3)</b> adds cells A1, A2, A3. <b>=MAX</b> and <b>=MIN</b> find the biggest and smallest."), S("Tip", "💡", "A1:B2 means the whole block from A1 to B2, which is four cells.")]),
    L("Asking a table: SELECT", sqlCountQ, [S("Databases", "🗄️", "A <b>database</b> stores data in tables. <b>SQL</b> is the language used to ask questions about it."), S("A query", "❓", "SELECT COUNT(*) FROM students WHERE score > 70; counts the rows where the score is over 70."), S("Tip", "💡", "WHERE is a filter. MAX and MIN find the biggest and smallest value in a column.")]),
    L("Sorting rows: ORDER BY", sqlOrderQ, [S("Sorting", "🔃", "ORDER BY sorts the rows of the answer. ASC is smallest first (or A to Z). DESC is biggest first."), S("LIMIT", "✂️", "LIMIT 1 keeps only the first row after sorting. That is how you find 'the top score'."), S("Example", "🏆", "ORDER BY score DESC LIMIT 1 returns the name with the highest score.")]),
    L("Tables, rows and keys", facts(KEYS, "Think about how a spreadsheet is built, with rows and columns.", "Example: in a table of games, each game is a row, 'title' is a column, and a game ID could be the key."), [S("Parts of a table", "🗂️", "A <b>row</b> is one record (one thing). A <b>column</b> is one kind of information, like name."), S("Keys", "🔑", "A <b>primary key</b> is a column whose value is different in every row, like an ID number."), S("Commands", "⌨️", "SELECT reads, INSERT adds a row, DELETE removes rows, and WHERE picks which rows.")]),
    L("Requests and status codes", facts(CODES, "Think about what a browser and a server say to each other.", "Example: the code 418 does not exist in a normal site. First digit 2 is good news, 4 is a client problem, 5 is a server problem."), [S("Asking the web", "🌐", "Your browser is the <b>client</b>. It sends a <b>request</b>. The <b>server</b> sends back a <b>response</b>."), S("Status codes", "🚦", "<b>200</b> OK, <b>301</b> moved, <b>403</b> not allowed, <b>404</b> not found, <b>500</b> server error."), S("Tip", "💡", "The first digit tells the story: 2 success, 3 moved, 4 problem with the request, 5 problem at the server.")]),
    L("Parts of a web address", urlQ, [S("A web address", "🔗", "It has parts: the <b>protocol</b> (https), the <b>domain</b> (the site's name), and the <b>path</b> (the page inside the site)."), S("Example", "🧩", "In https://games.example/maps/cave the protocol is https, the domain is games.example, and the path is /maps/cave."), S("Tip", "💡", "https means the connection is protected. :// separates the protocol from the rest.")]),
    L("Spotting phishing", facts(PHISH, "Ask yourself: who benefits if I act quickly without thinking?", "Example: an email says 'win a prize, send your password'. Real companies never ask for your password this way."), [S("What is phishing?", "🎣", "<b>Phishing</b> is a fake message that tries to trick you into giving a password or clicking a bad link."), S("Warning signs", "🚩", "Urgent threats, spelling mistakes, strange addresses, and requests for secrets are red flags."), S("What to do", "🛡️", "Do not click or reply. Go to the real site or app yourself and ask a trusted adult.")]),
    L("Game health and armor", hpQ, [S("Damage rules", "⚔️", "Games use simple math for fights. Armor can <b>reduce</b> each hit."), S("Minimum damage", "🛡️", "A common rule: damage = attack - armor, but never less than 1."), S("Example", "🧮", "Attack 10, armor 4: 6 damage per hit. 3 hits = 18. From 50 HP you have 32 left.")]),
    L("Score combos", comboQ, [S("Combos", "🔥", "Many games give a bigger multiplier when you hit again and again without missing."), S("Track two things", "📝", "Keep a running <b>score</b> and the current <b>combo</b>. A hit adds base * combo, then the combo grows. A miss resets it."), S("Example", "🧮", "Base 10: hit (10), hit (20), miss (0), hit (10). Total 40.")]),
    L("Chance and outcomes", probQ, [S("Chance", "🎲", "Probability tells how likely something is. With equal outcomes: chance = good outcomes / all outcomes."), S("Counting outcomes", "🪙", "Each coin flip doubles the number of possible lists: 2 flips give 4, 3 flips give 8."), S("Example", "🧮", "A spinner with 1 red part out of 5 should show red about 20 times in 100 spins.")]),
    L("Best case and worst case", caseQ, [S("Linear search", "🔎", "Linear search checks the items one by one from the start."), S("Cases", "📏", "<b>Best case</b>: the item is first (1 check). <b>Worst case</b>: it is last or missing (all n checks)."), S("Average", "⚖️", "If it could be anywhere, the average is about halfway: (1 + n) / 2 checks.")]),
    L("Training and testing data", accQ, [S("Learn, then test", "🤖", "A model learns from <b>training data</b>. We check it on <b>test data</b> it has never seen."), S("Accuracy", "🎯", "<b>Accuracy</b> = right answers / all answers, usually shown as a percent."), S("Splitting", "✂️", "A common split: 80% to train, 20% to test. With 100 examples that is 80 and 20.")]),
    L("Fair data, fair apps", facts(BIAS, "Ask who might be left out or treated unfairly.", "Example: a voice tool tested only on adults may not understand kids. Testing with many people finds that problem."), [S("Data is made by people", "🧑‍🤝‍🧑", "A program learns from the data it is given. If the data leaves people out, the program may treat them badly."), S("Bias", "⚖️", "<b>Bias</b> means a result is unfair to some group. Programmers must look for it and fix it."), S("Fixing it", "🔧", "Test with many different people, be open about limits, and let humans review important choices.")]),
    L("Four thinking tools", facts(CT, "Match the idea to its name: taking apart, hiding details, spotting repeats, or listing steps.", "Example: planning a school play by splitting it into scenery, costumes and acting is decomposition."), [S("Computational thinking", "🧠", "Programmers use four tools: <b>decomposition</b>, <b>pattern recognition</b>, <b>abstraction</b> and <b>algorithms</b>."), S("What they mean", "🧩", "Decomposition: break it up. Patterns: spot repeats. Abstraction: keep what matters. Algorithm: clear steps."), S("Tip", "💡", "You use them outside coding too, like planning a trip or a party.")]),
    L("Mixed practice", mix(...A16, hpQ, comboQ, probQ, caseQ, accQ), MIXS("mean, median and mode, tables, percents, spreadsheets, SQL, game math, chance and training data.")),
    L("Level 16 Challenge", mix(...A16, hpQ, comboQ, probQ, caseQ, accQ, facts(KEYS, "Think about rows, columns and keys.", "Example: a primary key is a unique ID for each row."), facts(CODES, "Think about the first digit of the code.", "Example: 5xx means a problem on the server side."), facts(PHISH, "Think about what a scammer wants.", "Example: urgent messages asking for a password are a red flag."), facts(BIAS, "Think about who might be left out.", "Example: test an app with many different people."), facts(CT, "Think about the four thinking tools.", "Example: breaking a big job into steps is decomposition."), urlQ), MIXS("everything from level 16: data, databases, web codes and addresses, safety, game rules, chance, training and fairness."))
  ];

  // =====================================================================
  // LEVEL 17
  // =====================================================================
  const weightQ = () => {
    const w = pick([[50, 30, 20], [40, 40, 20], [60, 30, 10], [50, 50, 0]].slice(0, 3)), names = ["tests", "projects", "homework"];
    const sc = w.map(() => ri(5, 10) * 10), tot = sum(w.map((x, i) => x * sc[i])) / 100;
    return num(`A course grade counts ${w.map((x, i) => `<b>${names[i]}</b> ${x}%`).join(", ")}. A student scored ${w.map((_, i) => `${sc[i]} on ${names[i]}`).join(", ")}. What is the weighted final grade?`, tot, [
      "A weighted average gives some parts more power. Each score is multiplied by its share.",
      "Multiply each score by its percent divided by 100, then add the results.",
      "Example: tests 70% with a score of 80, homework 30% with a score of 60: 56 + 18 = 74. Now do yours."
    ]);
  };

  const CTXT = [["points", "hours of practice"], ["height in cm", "weeks of growth"], ["price in coins", "size of the item"], ["speed", "engine level"]];
  const lineQ = () => {
    const m = ri(2, 6), b = ri(0, 10), x = ri(2, 9), c = pick(CTXT), y = m * x + b;
    if (Math.random() < 0.6) return num(`A simple model predicts <b>${c[0]} = ${m} * (${c[1]}) + ${b}</b>. What does it predict when the ${c[1]} is <b>${x}</b>?`, y, [
      "Put the given number in place of the input, then follow the order of operations.",
      "Multiply first, then add the number at the end.",
      "Example: y = 3 * x + 2 with x = 5. 3 * 5 = 15, then 15 + 2 = 17. Now do yours."
    ], "📈");
    return num(`A model predicts <b>${c[0]} = ${m} * (${c[1]}) + ${b}</b>. The prediction is <b>${y}</b>. What was the ${c[1]}?`, x, [
      "Work backwards. Undo the last operation of the formula first.",
      "Subtract the extra number, then divide by the number it was multiplied by.",
      "Example: y = 4 * x + 3 and y = 23. 23 - 3 = 20, and 20 / 4 = 5, so x = 5. Now do yours."
    ], "📈");
  };

  const SAMP = [
    ["To learn what the whole school likes for lunch, who should you ask?", "a random mix of students", ["only your close friends", "only one class", "only the people already in line for pizza"], "A fair sample looks like the whole group."],
    ["A <b>sample</b> is...", "a small part used to learn about the whole", ["the whole group", "a wrong answer", "a kind of chart"], "You cannot ask everyone, so you ask some."],
    ["The whole group you want to learn about is the...", "population", ["sample", "outlier", "column"], "It is the big group, not the small part."],
    ["You ask only fans of a team: 'Is this the best team?' The result is...", "biased", ["perfectly fair", "random", "empty"], "Who did you leave out?"],
    ["A bigger random sample usually gives...", "a more reliable estimate", ["a worse estimate", "no estimate", "a funnier chart"], "More fair data gives a steadier picture."],
    ["Ice cream sales and sunburns both rise in summer. Does ice cream cause sunburn?", "no, the hot sunny weather affects both", ["yes, always", "yes, but only on Mondays", "nobody can say anything"], "Two things rising together may share a third cause."],
    ["<b>Correlation</b> means two things...", "tend to change together", ["always cause each other", "are the same thing", "never change"], "It describes a link, not a cause."],
    ["Which survey question is <b>leading</b> (pushes people to one answer)?", "Don't you agree this game is awesome?", ["Which game do you like best?", "How often do you play?", "What do you like about the game?"], "Look for the question that already hints at the answer."]
  ];

  const cleanQ = () => {
    const base = uniq(4, 1, 20), dup = shuf(base).slice(0, ri(1, 2)), blanks = Array(ri(1, 2)).fill("blank"), all = shuf([...base, ...dup, ...blanks]);
    const nb = all.filter(x => x !== "blank"), u = new Set(nb), t = ri(0, 2);
    const vis = code([`[${all.join(", ")}]`]);
    const hs = [
      "Decide which entries to throw out first: the blanks, the repeats, or both?",
      "Remove the 'blank' entries. For repeats, keep only the first copy of each number. Then count what is left.",
      "Example: [3, blank, 3, 8]. Without blanks: [3, 3, 8]. Without repeats too: [3, 8]. Now do yours."
    ];
    if (t === 0) return num("Data cleaning: remove every <b>blank</b>. How many entries are left?", nb.length, hs, vis);
    if (t === 1) return num("Data cleaning: remove the <b>repeated</b> numbers (keep one copy of each) but leave the blanks in as they are. How many entries are left?", u.size + blanks.length, hs, vis);
    return num("Data cleaning: remove the blanks AND the repeated numbers (keep one copy of each). How many entries are left?", u.size, hs, vis);
  };

  const sqlAndQ = () => {
    const r = sqlRows(8), g = ri(6, 8), x = ri(5, 8) * 10;
    const [q, f] = pick([
      [`grade = ${g} AND score ${GT} ${x}`, z => z[1] === g && z[2] > x],
      [`grade = ${g} OR score ${GT} ${x}`, z => z[1] === g || z[2] > x],
      [`score ${GT} ${x} AND score ${LT} ${x + 20}`, z => z[2] > x && z[2] < x + 20],
      [`grade ${LT} ${g} OR score ${LT} ${x}`, z => z[1] < g || z[2] < x]
    ]);
    return num(`How many rows does this query return?<br>${code([`SELECT * FROM students`, `WHERE ${q};`])}`, r.filter(f).length, [
      "Test each row, one at a time, against the whole condition.",
      "AND needs both parts to be true. OR needs at least one part to be true.",
      "Example: row (grade 7, score 60) with 'grade = 7 AND score > 70' fails (60 is not over 70), but with 'grade = 7 OR score > 70' it passes. Now do yours."
    ], sqlT(r));
  };

  const sqlGroupQ = () => {
    const T = ["Red", "Blue", "Green"], rows = [...T.map(t => [t, ri(1, 9)]), ...Array.from({ length: 4 }, () => [pick(T), ri(1, 9)])];
    const vis = table(["team", "points"], rows), t = ri(0, 2);
    const hs = [
      "Look only at the rows that belong to the team you need.",
      "SUM adds the points of the chosen rows. COUNT(*) counts those rows. GROUP BY does this for every team at once.",
      "Example: rows A 3, B 5, A 4. SUM for team A is 7. COUNT for team A is 2. Now do yours."
    ];
    if (t === 0) { const tm = pick(T); return num(`What does this return?<br>${code([`SELECT SUM(points) FROM scores`, `WHERE team = '${tm}';`])}`, sum(rows.filter(z => z[0] === tm).map(z => z[1])), hs, vis); }
    if (t === 1) { const tm = pick(T); return num(`What does this return?<br>${code([`SELECT COUNT(*) FROM scores`, `WHERE team = '${tm}';`])}`, rows.filter(z => z[0] === tm).length, hs, vis); }
    const tot = T.map(tm => [tm, sum(rows.filter(z => z[0] === tm).map(z => z[1]))]), mx = Math.max(...tot.map(z => z[1]));
    if (tot.filter(z => z[1] === mx).length > 1) return sqlGroupQ();
    const w = tot.find(z => z[1] === mx)[0];
    return mc(`${code([`SELECT team, SUM(points) FROM scores`, `GROUP BY team;`])}<br>Which team has the biggest total?`, w, T.filter(z => z !== w), hs, vis);
  };

  const joinQ = () => {
    const nm = shuf(NM).slice(0, 4), pts = uniq(4, 10, 99), ids = shuf([1, 2, 3, 4]);
    const stu = table(["id", "name"], nm.map((n, i) => [i + 1, n]));
    const scr = table(["student_id", "points"], ids.map(i => [i, pts[i - 1]]));
    const vis = side(`<div><b>students</b><br>${stu}</div>`, `<div><b>scores</b><br>${scr}</div>`);
    const hs = [
      "The two tables are linked by the id. One table gives the name, the other gives the points.",
      "Find the person's id in the students table, then look up that same number in the student_id column of the scores table.",
      "Example: students (1 Zed), (2 Kai). scores: (2, 50), (1, 70). Zed has id 1, so Zed has 70 points. Now do yours."
    ];
    if (Math.random() < 0.6) { const i = ri(0, 3); return num(`The tables are joined on <b>students.id = scores.student_id</b>. How many points does <b>${nm[i]}</b> have?`, pts[i], hs, vis); }
    const mx = pts.indexOf(Math.max(...pts));
    return mc("The tables are joined on <b>students.id = scores.student_id</b>. Who has the <b>most</b> points?", nm[mx], nm.filter((_, i) => i !== mx), hs, vis);
  };

  const runQ = () => {
    if (Math.random() < 0.6) {
      const ms = pick([1, 2, 4, 5, 10, 20, 25]), s = ri(1, 9), steps = s * 1000 / ms;
      return num(`Each step of a program takes <b>${ms}</b> millisecond(s). The program does <b>${steps}</b> steps. How many <b>seconds</b> does it run? (1 second = 1000 milliseconds)`, s, [
        "First find the total time for all steps, in milliseconds.",
        "Multiply steps by the time for one step, then divide by 1000 to turn milliseconds into seconds.",
        "Example: 500 steps of 4 ms is 2000 ms, which is 2 seconds. Now do yours."
      ], "⏱️");
    }
    const steps = pick([100, 200, 250, 500, 1000]), s = ri(1, 5), ms = s * 1000 / steps;
    return num(`A program did <b>${steps}</b> steps and ran for <b>${s}</b> second(s). How many <b>milliseconds</b> did each step take? (1 second = 1000 milliseconds)`, ms, [
      "Change the seconds into milliseconds first.",
      "Total milliseconds divided by the number of steps gives the time per step.",
      "Example: 4000 ms of running with 8000 steps would be... first 4000 / 8000 = half a ms. Pick: 200 steps in 1 s (1000 ms) gives 1000 / 200 = 5 ms. Now do yours."
    ], "⏱️");
  };

  const TRADE = [
    ["A program saves answers it already worked out so it does not repeat the work. It trades...", "more memory for less time", ["more time for less memory", "nothing at all", "speed for more bugs"], "The saved answers have to be kept somewhere."],
    ["Compressing a file before sending it trades...", "some computer work for a smaller size", ["a smaller size for more mistakes", "color for sound", "nothing"], "Squeezing takes effort but makes the file lighter."],
    ["A program is correct but slow. What should you try first?", "find a better algorithm", ["buy a bigger screen", "delete the comments", "rename the variables"], "The biggest gains come from doing less work."],
    ["<b>Profiling</b> a program means...", "measuring which parts are slow", ["making it prettier", "deleting old files", "changing the font"], "You measure before you guess."],
    ["Should you make code faster before it even works correctly?", "no, first make it correct and clear", ["yes, always", "yes, but only at night", "only if it is short"], "A fast wrong answer is still wrong."],
    ["<b>Latency</b> is...", "the delay before data arrives", ["how much data fits per second", "the size of a file", "a kind of password"], "Think of how long you wait."],
    ["<b>Bandwidth</b> is...", "how much data can flow per second", ["the wait for the first byte", "the amount of RAM", "the number of pixels"], "Think of how wide a pipe is."],
    ["For code a team will read for years, which is better?", "clear code even if slightly slower", ["tricky code nobody understands", "code with no names", "code with no tests"], "Who will have to read it later?"]
  ];

  const dlQ = () => {
    const sp = pick([8, 16, 24, 40, 80, 160]), k = ri(2, 20), size = sp * k / 8;
    if (Math.random() < 0.6) return num(`A game file is <b>${size}</b> megabytes (MB). Your connection is <b>${sp}</b> megabits per second (Mbps). How many <b>seconds</b> to download it? (1 byte = 8 bits)`, k, [
      "Speeds are in bits, but file sizes are in bytes. Make the units match first.",
      "Change megabytes into megabits by multiplying by 8, then divide by the speed.",
      "Example: 10 MB is 80 megabits. At 20 Mbps that takes 80 / 20 = 4 seconds. Now do yours."
    ], "⬇️");
    return num(`Your connection is <b>${sp}</b> Mbps. How many <b>megabytes</b> can it download in <b>${k}</b> seconds? (1 byte = 8 bits)`, size, [
      "First find the megabits downloaded: speed times seconds.",
      "Divide the megabits by 8 to get megabytes.",
      "Example: 16 Mbps for 5 seconds is 80 megabits, which is 10 MB. Now do yours."
    ], "⬇️");
  };

  const METH = [
    ["Which HTTP method is used to <b>read</b> a page or data without changing it?", "GET", ["POST", "DELETE", "PUT"], "Think about just looking."],
    ["Which method is usually used to <b>send new data</b>, like a sign-up form?", "POST", ["GET", "DELETE", "HEAD"], "You are creating something new on the server."],
    ["Which method <b>removes</b> data on the server?", "DELETE", ["GET", "POST", "PUT"], "The name says it."],
    ["Which method <b>replaces or updates</b> existing data?", "PUT", ["GET", "DELETE", "HEAD"], "Think about changing something that already exists."],
    ["Which kind of request is safe to repeat many times without changing anything?", "GET", ["POST", "DELETE", "PUT"], "It only reads."],
    ["An API call <b>DELETE /games/5</b> most likely...", "removes game number 5", ["reads game 5", "adds game 5", "renames game 5"], "Read the method first, then the path."],
    ["An API call <b>GET /games/5</b> most likely...", "reads the data for game 5", ["removes game 5", "adds a new game", "replaces game 5"], "Read the method first, then the path."],
    ["A web <b>API</b> is...", "a set of requests programs can send to each other", ["a kind of screen", "a game character", "a type of battery"], "It lets one program talk to another."]
  ];

  const qsQ = () => {
    const D = { item: ["hat", "boot", "cape", "gem"], size: ["1", "2", "3", "5", "7", "9"], color: ["red", "blue", "green"], page: ["1", "2", "4", "8"], sort: ["new", "old"], level: ["3", "5", "8"], mode: ["easy", "hard"], lang: ["en", "es"] };
    const ks = shuf(Object.keys(D)).slice(0, 3), v = ks.map(k => pick(D[k])), i = ri(0, 2);
    return txt(`A page address ends like this:<br>${code([`/shop?${ks.map((k, j) => `${k}=${v[j]}`).join("&")}`])}<br>What is the value of <b>${ks[i]}</b>?`, v[i], [
      "The part after the ? is called the query string. It holds names with values.",
      "Each pair looks like name=value, and the pairs are separated by &. Find the pair with your name.",
      "Example: /find?q=cat&n=4. The value of n is 4 (the part after the = sign). Now do yours."
    ]);
  };

  const AUTH = [
    ["A <b>cookie</b> in your browser is...", "a small piece of data a site asks the browser to keep", ["a virus", "a program that draws", "a type of image"], "Sites use it to remember small things."],
    ["A <b>session</b> lets a site...", "remember that you are logged in", ["change your password", "turn off the internet", "delete the browser"], "Without it you would log in on every click."],
    ["A good site stores passwords as...", "hashes, not plain text", ["plain text for easy reading", "emoji", "photos"], "Even the site's workers should not be able to read them."],
    ["A <b>hash</b> is easy to make but...", "very hard to turn back into the original", ["always easy to reverse", "has no use", "is the same for every input"], "It works like a one-way street."],
    ["<b>Authentication</b> means...", "proving who you are", ["deciding what you may do", "writing code", "copying files"], "Logging in is an example."],
    ["<b>Authorization</b> means...", "deciding what you are allowed to do", ["proving your name", "backing up", "compressing"], "A normal user cannot open the admin page."],
    ["What does <b>HTTPS</b> add to a connection?", "it encrypts the data in transit", ["it makes the site free", "it makes pictures bigger", "it checks the spelling"], "Others on the network cannot read the messages."],
    ["An <b>API key</b> (a secret code for a service) should be...", "kept secret and out of public code", ["posted online for friends", "put in the game page", "shown on screen"], "Anyone who has it can pretend to be you."],
    ["A <b>password manager</b> helps by...", "creating and keeping unique strong passwords", ["sharing passwords with everyone", "removing the need for any password ever", "making one short password"], "One strong, different password for each site."]
  ];

  const hashQ = () => {
    const AL = "abcdefghijklmnopqrstuvwxyz";
    const w = Array.from({ length: ri(3, 5) }, () => AL[ri(0, 25)]).join("");
    const h = sum([...w].map(c => AL.indexOf(c) + 1)) % 10;
    return num(`A toy hash adds up the letter numbers (a=1, b=2, ... z=26) and keeps only the last digit (the sum <b>mod 10</b>). What is the toy hash of <b>${w}</b>?`, h, [
      "First turn each letter into its number in the alphabet.",
      "Add all the numbers. Then keep only the remainder after dividing by 10 (the last digit).",
      "Example: 'bad': b=2, a=1, d=4. Sum 7, and 7 mod 10 = 7. Now do yours."
    ], "#️⃣");
  };

  const physQ = () => {
    const y0 = ri(0, 5), v0 = ri(5, 12), g = ri(1, 3), k = ri(2, 4);
    let y = y0, v = v0;
    for (let i = 0; i < k; i++) { y += v; v -= g; }
    return num(`A jump in a game updates every frame like this: <b>y = y + vy</b>, then <b>vy = vy - ${g}</b>. At the start y = <b>${y0}</b> and vy = <b>${v0}</b>. What is y after <b>${k}</b> frames?`, y, [
      "Keep two boxes, y and vy. In each frame do the two lines in order.",
      "Frame by frame: first add vy to y, then lower vy. The new vy is used in the NEXT frame.",
      "Example: y = 0, vy = 6, gravity 2. Frame 1: y = 6, vy = 4. Frame 2: y = 10, vy = 2. Now do yours."
    ], "🦘");
  };

  const aiQ = () => {
    const lo = ri(2, 4) * 10, r1 = ri(1, 3), r2 = ri(5, 8), hp = ri(5, 100), d = ri(0, 12);
    let a;
    if (hp < lo) a = "flee"; else if (d <= r1) a = "attack"; else if (d <= r2) a = "chase"; else a = "patrol";
    return mc(`An enemy checks its rules from the top and stops at the first rule that is true.<br>${code([`if hp ${LT} ${lo}: flee`, `else if distance ${LT}= ${r1}: attack`, `else if distance ${LT}= ${r2}: chase`, `else: patrol`])}<br>The enemy has hp <b>${hp}</b> and the player is <b>${d}</b> squares away. What does it do?`, a, ["flee", "attack", "chase", "patrol"].filter(x => x !== a), [
      "Start with the first rule. If it is true, stop there.",
      "Only if a rule is false do you move to the next rule. The last line catches everything left over.",
      "Example: rules 'if hp < 20: flee, else if distance <= 2: attack, else: patrol'. hp 50, distance 1: first rule false, second true, so attack. Now do yours."
    ], "👾");
  };

  const neuronQ = () => {
    const w1 = ri(1, 4), w2 = ri(1, 4), x1 = ri(0, 5), x2 = ri(0, 5), th = ri(5, 12), s = w1 * x1 + w2 * x2;
    const info = `A tiny artificial neuron has weights <b>${w1}</b> and <b>${w2}</b>, inputs <b>${x1}</b> and <b>${x2}</b>, and a threshold of <b>${th}</b>.`;
    if (Math.random() < 0.5) return num(`${info} What is the weighted sum (input1 * weight1 + input2 * weight2)?`, s, [
      "Multiply each input by its own weight.",
      "Then add the two products together.",
      "Example: weights 2 and 3, inputs 1 and 4: 2*1 + 3*4 = 2 + 12 = 14. Now do yours."
    ], "🧠");
    return { text: `${info} The neuron outputs 1 if the weighted sum is at least the threshold, otherwise 0. What is the output?`, visual: "🧠", choices: [1, 0], answer: s >= th ? 1 : 0, hints: [
      "First compute the weighted sum by multiplying and adding.",
      "Then compare the sum with the threshold. At least the threshold means one output, below it means the other.",
      "Example: sum 9 with threshold 10 is below, so the output is 0. Sum 10 or more would be 1. Now do yours."
    ] };
  };

  const ETH = [
    ["Before posting a photo of a friend you should...", "ask for their permission", ["post it fast", "tag everyone", "edit their face"], "It is about their picture and their choice."],
    ["<b>Terms of service</b> are...", "the rules you agree to when using a service", ["a type of font", "a game level", "a computer part"], "Most people click 'agree' without reading them."],
    ["An app asks permission to use your camera. This is so that...", "you can choose what to share", ["the app can run faster", "your battery is bigger", "the screen is brighter"], "Think about who is in control."],
    ["A <b>deepfake</b> is...", "a fake video or audio made to look real", ["a very deep hole", "a fast computer", "a backup"], "Do not trust everything you see or hear online."],
    ["<b>Open-source</b> software means...", "its code can be read and shared under a license", ["it can never be changed", "it costs a lot", "it has no author"], "Anyone can look at how it works."],
    ["Copying someone's code without checking the license is...", "not okay: follow the license and give credit", ["always fine", "fine if it is short", "fine at night"], "The author owns their work."],
    ["<b>Data minimization</b> means an app...", "collects only the data it needs", ["collects everything it can", "never saves anything", "sells the data"], "Less collected means less can be lost."],
    ["You see someone being mean to a classmate online. What is a good step?", "do not join in and tell a trusted adult", ["join in", "share it", "ignore it forever"], "Being kind online matters too."]
  ];

  const A17 = [weightQ, lineQ, cleanQ, sqlAndQ, sqlGroupQ, joinQ, runQ, dlQ, qsQ, hashQ, physQ, aiQ, neuronQ];
  const lessons17 = [
    L("Weighted averages", weightQ, [S("Not all scores count the same", "⚖️", "A <b>weighted average</b> gives some parts more power. Tests might count 50% and homework 20%."), S("How to do it", "🧮", "Multiply each score by its share (percent / 100), then add the results."), S("Example", "📝", "Tests 70% with 80, homework 30% with 60: 56 + 18 = 74.")]),
    L("Lines that predict", lineQ, [S("A simple model", "📈", "A model can be a formula: y = m * x + b. Put in x and it predicts y."), S("Predict forward", "➡️", "Multiply first, then add. For y = 3x + 2 and x = 5, y = 17."), S("Work backwards", "⬅️", "If you know y, undo the steps: subtract b, then divide by m.")]),
    L("Samples and surveys", facts(SAMP, "Ask whether the group asked looks like the whole group.", "Example: asking only the school chess club about favorite sports gives a biased sample."), [S("Sample and population", "🧪", "The <b>population</b> is everyone you care about. A <b>sample</b> is the small part you ask."), S("Fair samples", "🎯", "A random, bigger sample is usually fairer and more reliable than a handful of friends."), S("Careful with claims", "⚠️", "Two things that rise together (correlation) do not always cause each other.")]),
    L("Cleaning data", cleanQ, [S("Messy data", "🧹", "Real data has blanks, repeats and mistakes. <b>Cleaning</b> fixes this before analysis."), S("Common steps", "🧽", "Remove blanks, remove repeated rows, and fix obvious typing mistakes."), S("Example", "📝", "[3, blank, 3, 8] becomes [3, 3, 8] without blanks, and [3, 8] without repeats.")]),
    L("SELECT with AND and OR", sqlAndQ, [S("Combine tests", "🔗", "WHERE can join tests. <b>AND</b>: both must be true. <b>OR</b>: at least one must be true."), S("Row by row", "👀", "Check each row against the whole condition and count the ones that pass."), S("Example", "📝", "A row (grade 7, score 60) fails 'grade = 7 AND score > 70' but passes 'grade = 7 OR score > 70'.")]),
    L("Totals and groups", sqlGroupQ, [S("Summaries", "➕", "SQL can add up a column with <b>SUM</b> and count rows with <b>COUNT(*)</b>."), S("GROUP BY", "🧺", "<b>GROUP BY team</b> makes one result for every team, such as each team's total."), S("Example", "📝", "Rows A 3, B 5, A 4: SUM for A is 7, COUNT for A is 2.")]),
    L("Joining two tables", joinQ, [S("Two tables", "🔀", "Data is often split into tables, such as names in one and scores in another."), S("A shared id", "🔑", "A <b>join</b> matches rows with the same id, like students.id = scores.student_id."), S("Example", "📝", "Student 1 is Zed and the scores table says student 1 has 70. Zed has 70 points.")]),
    L("How long will it run?", runQ, [S("Estimating time", "⏱️", "Run time is roughly (number of steps) * (time for one step)."), S("Units", "📏", "1 second = 1000 milliseconds. Convert so both numbers use the same unit."), S("Example", "📝", "500 steps at 4 ms is 2000 ms, which is 2 seconds.")]),
    L("Time, memory and speed", facts(TRADE, "Think about what you give up to get something better.", "Example: keeping a list of answers in memory saves time later. Memory is traded for speed."), [S("Tradeoffs", "⚖️", "Programs trade <b>time</b>, <b>memory</b> and clear code. Gaining one often costs another."), S("Measure first", "📏", "<b>Profile</b> before you optimize. Make it correct, then make it fast where it matters."), S("Words to know", "📚", "<b>Latency</b> is the wait. <b>Bandwidth</b> is how much flows per second.")]),
    L("Download times", dlQ, [S("Bits and bytes", "💾", "Files are measured in bytes (MB). Internet speed is often in bits (Mbps). 1 byte = 8 bits."), S("The formula", "🧮", "Time in seconds = file size in MB * 8 / speed in Mbps."), S("Example", "📝", "10 MB = 80 megabits. At 20 Mbps it takes 4 seconds.")]),
    L("GET, POST and friends", facts(METH, "Think about whether the request reads, creates, updates or removes.", "Example: logging out of a game might send a DELETE for your session. Loading the home page sends a GET."), [S("Methods", "📬", "A web request has a <b>method</b>. <b>GET</b> reads, <b>POST</b> creates, <b>PUT</b> updates, <b>DELETE</b> removes."), S("APIs", "🔌", "An <b>API</b> lets programs talk. GET /games/5 asks for game 5. DELETE /games/5 removes it."), S("Tip", "💡", "GET should never change data, so it is safe to repeat.")]),
    L("Reading query strings", qsQ, [S("Info in the address", "❓", "After a <b>?</b> in a web address comes the <b>query string</b>, like ?color=red&size=3."), S("Name and value", "🏷️", "Each pair is name=value. Pairs are joined with <b>&</b>."), S("Example", "📝", "/find?q=cat&n=4: q is cat, n is 4.")]),
    L("Logins, cookies and hashes", facts(AUTH, "Think about how a site knows who you are and keeps secrets safe.", "Example: when you log in, a session cookie lets the site recognize you on the next click."), [S("Who are you?", "🔐", "<b>Authentication</b> proves who you are. <b>Authorization</b> decides what you can do."), S("Remembering you", "🍪", "A <b>cookie</b> and a <b>session</b> help a site remember you are logged in."), S("Safe passwords", "#️⃣", "Sites store a <b>hash</b>, a one-way scramble, not your real password.")]),
    L("A toy hash", hashQ, [S("A hash", "#️⃣", "A hash function turns any input into a short fixed-size code. Same input, same hash."), S("A toy version", "🧮", "Add up the letter numbers (a=1, b=2, ...) and keep the last digit (mod 10)."), S("Example", "📝", "'bad' = 2 + 1 + 4 = 7, hash 7. Different words can share a toy hash, which real hashes work hard to avoid.")]),
    L("Game physics: jumping", physQ, [S("Frame by frame", "🦘", "Games update positions every frame. A jump uses a speed (vy) that gravity lowers each frame."), S("Two lines", "📝", "y = y + vy moves the character. vy = vy - gravity slows the rise."), S("Example", "🧮", "y = 0, vy = 6, gravity 2. Frame 1: y = 6, vy = 4. Frame 2: y = 10, vy = 2.")]),
    L("Enemy decisions", aiQ, [S("Simple game AI", "👾", "Enemies often follow rules in priority order. The first true rule wins."), S("Order matters", "📋", "Check the top rule first. If it is false, go to the next. The last 'else' catches all the rest."), S("Example", "🧮", "'hp < 20: flee, distance <= 2: attack, else patrol'. With hp 50 and distance 1, the enemy attacks.")]),
    L("A tiny neuron", neuronQ, [S("Inspired by brains", "🧠", "An artificial neuron takes inputs, multiplies each by a <b>weight</b>, and adds them up."), S("Fire or not", "⚡", "If the sum reaches the <b>threshold</b>, the neuron outputs 1. Otherwise 0."), S("Learning", "📚", "Training means adjusting the weights until the answers are right more often.")]),
    L("Rights and responsibilities", facts(ETH, "Think about what is kind, fair and honest.", "Example: asking before sharing someone's photo respects their privacy."), [S("Technology and people", "🤝", "Technology touches real people, so programmers think about privacy, consent and fairness."), S("Rules and credit", "📜", "Follow <b>licenses</b>, give credit, and read the terms before agreeing."), S("Be kind", "💛", "Collect only what you need, never join in being unkind online, and tell a trusted adult if something is wrong.")]),
    L("Mixed practice", mix(...A17.slice(0, 9), qsQ, hashQ, physQ), MIXS("weighted averages, models, cleaning data, SQL, run times, downloads, query strings, hashes, physics and game rules.")),
    L("Level 17 Challenge", mix(...A17, facts(SAMP, "Think about fair samples.", "Example: a random sample is fairer than only friends."), facts(TRADE, "Think about what you give up to gain something.", "Example: memory is traded for speed."), facts(METH, "Think about read, create, update, remove.", "Example: GET reads and DELETE removes."), facts(AUTH, "Think about proving who you are and keeping secrets.", "Example: sites store hashes, not passwords."), facts(ETH, "Think about permission, credit and kindness.", "Example: ask before sharing someone's photo.")), MIXS("everything from level 17: data, queries, performance, the web, security, game logic, neurons and ethics."))
  ];

  // =====================================================================
  // LEVEL 18
  // =====================================================================
  const quartQ = () => {
    const a = uniq(7, 1, 60).sort((x, y) => x - y), sh = shuf(a), t = ri(0, 3);
    const hs = [
      "Sort the numbers first. The quartiles split the sorted list into four parts.",
      "With 7 numbers: the median is the 4th. Q1 is the middle of the three smallest numbers. Q3 is the middle of the three biggest. IQR means Q3 minus Q1.",
      "Example: sorted 2, 4, 5, 8, 9, 12, 15. Median 8, Q1 is 4, Q3 is 12, IQR = 12 - 4 = 8. Now do yours."
    ];
    const lab = ["median", "first quartile Q1", "third quartile Q3", "IQR (Q3 minus Q1)"][t], ans = [a[3], a[1], a[5], a[5] - a[1]][t];
    return num(`Seven values: <b>${lst(sh)}</b>.<br>Q1 is the middle of the lower three values, Q3 is the middle of the upper three values. What is the <b>${lab}</b>?`, ans, hs);
  };

  const confQ = () => {
    const scale = ri(1, 3), [tp, fp] = pick([[9, 1], [8, 2], [3, 1], [6, 4], [4, 1]]), fn = ri(2, 8), tn = ri(10, 40);
    const T = tp * scale, F = fp * scale;
    const vis = table(["", "Said spam", "Said not spam"], [["Really spam", T, fn], ["Really fine", F, tn]]);
    const t = ri(0, 2);
    if (t === 0) return num("A spam filter's results are shown. What <b>percent</b> of the emails it called spam were really spam? (TP / (TP + FP))", Math.round(100 * T / (T + F)), [
      "Look at the 'Said spam' column only: those are the emails it flagged.",
      "Divide the really-spam count in that column by the whole column total, then multiply by 100.",
      "Example: flagged 20, of which 15 were really spam. 15 / 20 = 0.75, so 75 percent. Now do yours."
    ], vis);
    if (t === 1) return num("How many <b>spam emails did the filter miss</b> (spam it called fine)?", fn, [
      "Missed spam is spam the filter did not catch. Which row and column hold it?",
      "Find the row 'Really spam' and read the cell under 'Said not spam'.",
      "Example: in a table where really-spam & said-fine is 6, six spam emails got through. Now find yours."
    ], vis);
    return num("How many <b>good emails were wrongly flagged</b> as spam (false positives)?", F, [
      "A false positive is a good email the filter called spam.",
      "Find the row 'Really fine' and read the cell under 'Said spam'.",
      "Example: if that cell is 3, three good emails were flagged by mistake. Now find yours."
    ], vis);
  };

  const OVER = [
    ["A model remembers its training examples perfectly but fails on new ones. This is called...", "overfitting", ["underfitting", "debugging", "compiling"], "It learned the examples, not the idea."],
    ["Why do we keep a separate <b>test set</b>?", "to check performance on data it has never seen", ["to train it more", "to make the file smaller", "to hide it from users"], "A fair test uses new questions."],
    ["A model too simple to find the pattern is...", "underfitting", ["overfitting", "optimal", "encrypted"], "It misses even the training data."],
    ["Training accuracy is 99% but test accuracy is 60%. What is likely?", "overfitting", ["underfitting", "a perfect model", "a hardware problem"], "Compare how it does on seen versus unseen data."],
    ["<b>Generalizing</b> means...", "doing well on new data", ["memorizing everything", "running faster", "using less memory"], "It is about new examples."],
    ["<b>Labels</b> in training data are...", "the correct answers given with the examples", ["the model's mistakes", "the colors on screen", "random noise"], "A picture of a cat with the label 'cat'."],
    ["Learning from examples that have correct labels is called...", "supervised learning", ["unsupervised learning", "random learning", "copying"], "Someone supervises with right answers."],
    ["Finding groups in data without any labels is called...", "unsupervised learning", ["supervised learning", "typing", "sorting by hand"], "No answers are given in advance."]
  ];

  const percQ = () => {
    const x = ri(1, 5), lr = pick([1, 2]), err = pick([1, -1]), w = ri(1, 6) + (err < 0 ? lr * x : 0), nw = w + lr * err * x;
    return num(`A model updates a weight with the rule <b>new = old + rate * error * input</b>. Old weight = <b>${w}</b>, rate = <b>${lr}</b>, input = <b>${x}</b>, and the error was <b>${err > 0 ? "+1 (it said 0 but should say 1)" : "-1 (it said 1 but should say 0)"}</b>. What is the new weight?`, nw, [
      "Plug the numbers into the rule. Pay attention to whether the error is plus or minus.",
      "Multiply rate, error and input first. Then add that to the old weight (a negative result lowers it).",
      "Example: old 5, rate 1, error -1, input 3: 5 + 1*(-1)*3 = 5 - 3 = 2. Now do yours."
    ], "🧠");
  };

  const TLABS = ["cat", "dog", "fox", "owl", "bat", "hen"];
  const treeQ = () => {
    const [A, B, C, D] = shuf(TLABS), w = ri(3, 8) * 5, lg = ri(2, 5), wt = ri(1, 40), st = Math.random() < 0.5, legs = ri(0, 8);
    const ans = wt > w ? (st ? A : B) : (legs > lg ? C : D);
    return mc(`A small decision tree sorts animals:<br>${code([`if weight ${GT} ${w}:`, `&nbsp;&nbsp;if stripes: ${A}`, `&nbsp;&nbsp;else: ${B}`, "else:", `&nbsp;&nbsp;if legs ${GT} ${lg}: ${C}`, `&nbsp;&nbsp;else: ${D}`])}<br>An animal has weight <b>${wt}</b>, legs <b>${legs}</b> and ${st ? "has stripes" : "no stripes"}. What label does the tree give?`, ans, [A, B, C, D].filter(x => x !== ans), [
      "Start at the top question and follow only the branch that matches the animal.",
      "Answer the first question (heavy or not). That tells you which pair of inside questions to look at. Answer that one and stop at the label.",
      "Example: 'if size > 5: (if red: apple else: pear) else: grape'. A size-8 red fruit goes to the first branch and is red, so apple. Now do yours."
    ], "🌳");
  };

  const kmQ = () => {
    for (;;) {
      const c1 = ri(3, 8), c2 = ri(22, 28), p1 = Array.from({ length: 3 }, () => ri(1, 11)), p2 = Array.from({ length: 3 }, () => ri(19, 31));
      if (sum(p1) % 3 || sum(p2) % 3) continue;
      const all = shuf([...p1, ...p2]);
      if (new Set(all).size < 6) continue;
      const first = Math.random() < 0.5, pts = first ? p1 : p2;
      return num(`<b>k-means</b> groups points around centers. The points are <b>${lst(all)}</b>. The two centers are <b>${c1}</b> and <b>${c2}</b>. Every point joins the nearest center. What is the <b>new center</b> (the mean) of the group that joined center <b>${first ? c1 : c2}</b>?`, sum(pts) / 3, [
        "First decide which points are closer to this center than to the other one.",
        "Collect the points that joined the center, add them up and divide by how many there are.",
        "Example: centers 2 and 20, points 1, 3, 5 join center 2. New center = (1 + 3 + 5) / 3 = 3. Now do yours."
      ], "🎯");
    }
  };

  const DESIGN = [
    ["Storing a customer's whole address again in every order row can cause mismatches. A better design is...", "one customers table linked by an ID", ["a bigger font", "deleting old orders", "a longer password"], "Keep each fact in one place."],
    ["A <b>foreign key</b> is...", "a column that points to a row in another table", ["a broken key", "a password", "the table's name"], "It connects two tables."],
    ["A database <b>index</b> works like...", "a book's index: it finds rows faster", ["a table of colors", "a backup copy", "a lock"], "Think about finding a topic in a thick book."],
    ["Moving coins from player A to player B must be a <b>transaction</b>, which means it...", "finishes completely or does not happen at all", ["happens halfway", "is only a message", "can be undone by anyone"], "Imagine the power going out in the middle."],
    ["One student has many scores. This relation is called...", "one-to-many", ["one-to-one", "many-to-none", "zero-to-zero"], "Count how many rows can belong to one student."],
    ["Searching 1,000,000 rows with no index means...", "checking the rows one by one, which is slow", ["the answer comes instantly", "the search is impossible", "the data is deleted"], "Think of linear search."],
    ["In a database, <b>NULL</b> means...", "no value or unknown", ["the number zero", "the word null", "an error message"], "It is a gap, not a number."],
    ["Why make <b>backups</b> of a database?", "so data can be restored after a loss", ["to make it slower", "to delete duplicates", "to speed up typing"], "Computers can fail."]
  ];

  const bigQ = () => {
    const t = ri(0, 4);
    if (t === 0) { const n = ri(12, 40); return num(`A slow method takes <b>n * n</b> steps. How many steps for n = <b>${n}</b>?`, n * n, hs("n * n", 12, 144, "the formula"), "🐢"); }
    if (t === 1) { const n = ri(5, 10); return num(`A very slow method takes <b>2 to the power n</b> steps (2 multiplied by itself n times). How many steps for n = <b>${n}</b>?`, 2 ** n, [
      "Write 2 as many times as n says and multiply them.",
      "Doubling n times: start at 1 and double n times, or multiply the previous answer by 2 each time.",
      "Example: 2 to the power 4 is 2*2*2*2 = 16. Now do yours."
    ], "🐌"); }
    if (t === 2) { const k = ri(3, 6), n = 2 ** k; return num(`A sorting method takes <b>n * log2(n)</b> steps. (log2 of 8 is 3 because 8 = 2*2*2.) How many steps for n = <b>${n}</b>?`, n * k, [
      "Find log2(n): how many times do you multiply 2 to get n?",
      "Count the doublings from 1 to n to get log2(n). Then multiply n by that count.",
      "Example: n = 16. log2(16) = 4 because 16 = 2*2*2*2. Steps = 16 * 4 = 64. Now do yours."
    ], "🚀"); }
    if (t === 3) { const n = ri(3, 9); return num(`A method takes <b>n * n * n</b> steps. How many steps for n = <b>${n}</b>?`, n ** 3, [
      "Multiply n by itself three times.",
      "First n * n, then multiply that result by n again.",
      "Example: n = 3. 3 * 3 = 9, then 9 * 3 = 27. Now do yours."
    ], "🐢"); }
    const n = ri(5, 20); return num(`A method that compares every pair of items takes <b>n * (n - 1) / 2</b> steps. How many steps for n = <b>${n}</b>?`, n * (n - 1) / 2, [
      "First work out n - 1, then multiply by n.",
      "Divide that product by 2 at the end.",
      "Example: n = 6. 6 * 5 = 30, and 30 / 2 = 15. Now do yours."
    ], "🤝");
    function hs(f, a, b, w) { return [
      `Put the number in place of n in ${f}.`,
      "Multiply the number by itself.",
      "Example: n = 5. 5 * 5 = 25. Now do yours."
    ]; }
  };

  const growQ = () => {
    const p = ri(0, 3), k = ri(2, 3), T = ri(1, 5), d = ["time stays the same no matter the size", "time grows in direct proportion to the size", "time grows with the square of the size", "time grows with the cube of the size"][p], ans = T * k ** p;
    return num(`A program takes <b>${T}</b> second(s) for an input of size N. For this program, ${d}. How many seconds does it take if the input is <b>${k} times</b> bigger?`, ans, [
      "Think about how the time changes when the size gets multiplied.",
      "Direct proportion: multiply the time by the same factor. Square: multiply by the factor twice. Cube: three times. Same time: no change.",
      "Example: 2 s now, size becomes 3 times bigger, square rule: 3 * 3 = 9, so 2 * 9 = 18 s. Now do yours."
    ], "📏");
  };

  const lcsQ = () => {
    const AL = "ABCD", mk = n => Array.from({ length: n }, () => AL[ri(0, 3)]).join("");
    const a = mk(ri(4, 5)), b = mk(ri(4, 5));
    const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = a[i - 1] === b[j - 1] ? d[i - 1][j - 1] + 1 : Math.max(d[i - 1][j], d[i][j - 1]);
    return num(`A <b>common subsequence</b> uses letters that appear in both words in the same order (they do not need to be next to each other). What is the length of the longest one for <b>${a}</b> and <b>${b}</b>?`, d[m][n], [
      "Keep the order of the letters but you may skip letters. Look for matching letters in both words.",
      "Try to match letters of the first word, left to right, with later letters in the second word. Try a few different starting choices and keep the longest.",
      "Example: ABCD and ACD. A, C, D appear in both in order, so the longest is 3. Now do yours."
    ], "🧬");
  };

  const cacheQ = () => {
    const hit = ri(1, 5), miss = pick([20, 50, 100]), k = ri(5, 9);
    return num(`A cache answers fast when it has the data (a <b>hit</b>, ${hit} ms) and slowly when it does not (a <b>miss</b>, ${miss} ms). Out of 10 requests, <b>${k}</b> were hits. What was the total time in ms?`, k * hit + (10 - k) * miss, [
      "Split the 10 requests into hits and misses and time each group.",
      "Hits times the hit time, plus misses times the miss time.",
      "Example: 10 requests, 8 hits at 2 ms and 2 misses at 30 ms: 16 + 60 = 76 ms. Now do yours."
    ], "⚡");
  };

  const ACC = [
    ["Alt text on an image helps...", "people who use screen readers", ["only people with fast computers", "nobody", "only game designers"], "A computer can read it aloud."],
    ["Light gray text on a white background is a problem of...", "low contrast", ["high speed", "too much memory", "wrong spelling"], "It is hard to see."],
    ["Captions on a video help...", "people who cannot hear it, and anyone in a quiet place", ["only people who are asleep", "nobody", "only blind people"], "Words appear with the sound."],
    ["Why should every button work with the keyboard too?", "some people cannot use a mouse", ["mice are banned", "keyboards are faster to build", "to save memory"], "Good design gives more than one way."],
    ["Showing an error only by turning something red can exclude...", "people who are color-blind", ["people who like blue", "everyone with a phone", "nobody"], "Add words or an icon too."],
    ["<b>Responsive design</b> means the page...", "adapts to different screen sizes", ["can only be used on one screen", "always plays music", "uses no images"], "It should look fine on a phone and a big screen."],
    ["A <b>screen reader</b> is a tool that...", "reads page text aloud", ["draws pictures", "types for you", "speeds up the internet"], "It helps people who cannot see the screen."],
    ["Fast flashing lights on a page can...", "be dangerous for some people, so avoid them", ["make the page safer", "save battery", "improve spelling"], "Think about health and safety."]
  ];

  const validQ = () => {
    const R = [
      ["Age: a whole number from 5 to 99", v => /^\d+$/.test(v) && +v >= 5 && +v <= 99, ["12", "4", "100", "abc", "7.5", "99", "5", "-3"]],
      ["Username: 3 to 8 letters, letters only", v => /^[A-Za-z]{3,8}$/.test(v), ["Pixel", "ab", "Dragon77", "robotcoder", "Nova", "x_y_z", "Cat"]],
      ["PIN: exactly 4 digits", v => /^\d{4}$/.test(v), ["1234", "12345", "12a4", "0007", "987", "4821"]],
      ["Score: a whole number from 0 to 100", v => /^\d+$/.test(v) && +v >= 0 && +v <= 100, ["0", "100", "101", "55", "-1", "9.5", "ten"]]
    ];
    const r = pick(R), v = pick(r[2]);
    return yn(`A form checks input with this rule: <b>${r[0]}</b>. Does the input <b>"${v}"</b> pass the rule?`, r[1](v), [
      "Check every part of the rule, one piece at a time: the kind of characters and the size or length.",
      "Both the kind of characters AND the limits must fit. One failing part means the input is rejected.",
      "Example: rule 'a whole number from 1 to 10'. '7' passes. '11' is too big and '2.5' is not whole, so those fail. Now do yours."
    ], "📝");
  };

  const vigQ = () => {
    const W = ["CODE", "GAME", "BYTE", "LOOP", "DATA", "PIXEL", "ROBOT", "LEVEL", "SCORE", "QUEST", "STACK", "ARRAY"], K = ["BC", "DA", "EB", "CAB", "BED", "ACE"];
    const w = pick(W), k = pick(K), c = [...w].map((ch, i) => String.fromCharCode(65 + (ch.charCodeAt(0) - 65 + k.charCodeAt(i % k.length) - 65) % 26)).join("");
    return txt(`The <b>Vigenere cipher</b> shifts each letter by the next letter of a key (A=0, B=1, C=2 ...), repeating the key. Encode <b>${w}</b> with the key <b>${k}</b>. (Type the letters.)`, c, [
      "Each letter of the message gets its own shift. The key letters take turns and repeat.",
      "Turn the key letter into a number (A=0, B=1 ...), then move the message letter forward that many places in the alphabet.",
      "Example: GO with key BC. G shifts 1 to H. O shifts 2 to Q. The code is HQ. Now do yours."
    ], "🔐");
  };

  const xpQ = () => {
    const t = ri(0, 2);
    if (t === 0) {
      let T = ri(150, 1500), lv = 1; while (T >= 100 * lv) { T -= 100 * lv; lv++; }
      let tot = T; // recompute original
      return num(`In a game, going from level n to level n+1 needs <b>100 * n</b> XP (level 1 needs 100, level 2 needs 200, ...). You start at level 1. You earn a total of <b>${orig(lv, T)}</b> XP. What level are you?`, lv, [
        "Take away the XP needed for level 1, then level 2, and so on, as long as you have enough.",
        "Subtract 100, then 200, then 300 ... and stop when what is left is smaller than the next price.",
        "Example: total 700 XP. 700 - 100 = 600, 600 - 200 = 400, 400 - 300 = 100, and 100 is not enough for 400. So the level is 4. Now do yours."
      ], "⭐");
    }
    if (t === 1) {
      let T = ri(30, 700), lv = 1, need = 10; const orig0 = T;
      while (T >= need) { T -= need; need *= 2; lv++; }
      return num(`In another game the XP needed doubles each level: level 1 to 2 needs <b>10</b>, then 20, then 40, then 80, ... You start at level 1 and earn <b>${orig0}</b> XP in total. What level are you?`, lv, [
        "List the prices: 10, 20, 40, 80 ... and subtract them one after another.",
        "Keep subtracting the next price while you still have enough. The level goes up by one each time.",
        "Example: total 100 XP. 100 - 10 = 90, 90 - 20 = 70, 70 - 40 = 30, and 30 is not enough for 80. That was 3 level-ups, so level 4. Now do yours."
      ], "⭐");
    }
    const c = ri(1, 4), T = ri(8, 20);
    return num(`A power can be used on turn 1. After using it you must wait <b>${c}</b> full turn(s) before using it again. If you use it as soon as you can, how many times can you use it in <b>${T}</b> turns?`, Math.floor((T - 1) / (c + 1)) + 1, [
      "After a use, the power is busy for some turns. Work out how many turns pass between two uses.",
      "The gap between uses is the wait plus the turn you use it. Count the uses on turn 1, then turn 1 plus the gap, and so on.",
      "Example: wait 2 turns, 10 turns total. Uses on turns 1, 4, 7, 10. That is 4 uses. Now do yours."
    ], "⏳");
  };
  const orig = (lv, rest) => { let t = rest; for (let i = 1; i < lv; i++) t += 100 * i; return t; };

  const mmQ = () => {
    for (;;) {
      const br = [["A", [ri(1, 9), ri(1, 9)]], ["B", [ri(1, 9), ri(1, 9)]], ["C", [ri(1, 9), ri(1, 9)]]];
      const val = br.map(b => Math.min(...b[1])), mx = Math.max(...val);
      if (val.filter(v => v === mx).length > 1) continue;
      const best = br[val.indexOf(mx)][0], list = br.map(b => `Move ${b[0]}: leaves ${b[1][0]} and ${b[1][1]}`).join("<br>");
      const intro = `You pick a move (A, B or C). Then your opponent picks the leaf with the <b>smaller</b> value for you. You want the biggest result.<br><b>${list}</b>`;
      const hs = [
        "Think two moves ahead. For each of your moves, what will your opponent choose?",
        "For each move, the opponent takes the smaller of its two leaves. Then you choose the move whose result is the biggest.",
        "Example: Move A: 2 and 9 (opponent gives 2). Move B: 5 and 6 (opponent gives 5). Best for you is B with 5. Now do yours."
      ];
      if (Math.random() < 0.5) return num(`${intro}<br>What value do you get if you both play your best?`, mx, hs, "♟️");
      return mc(`${intro}<br>Which move is best for you?`, best, ["A", "B", "C"].filter(x => x !== best), hs, "♟️");
    }
  };

  const PLAN = [
    ["An <b>MVP</b> (minimum viable product) is...", "the smallest version that works and can be tested", ["the biggest version with every feature", "a game's soundtrack", "a bug report"], "Start small."],
    ["A <b>sprint</b> is...", "a short, fixed period of work on chosen tasks", ["a fast typing contest", "a kind of bug", "the end of a project"], "Teams plan work in small time boxes."],
    ["<b>Playtesting</b> means...", "watching real people try your game to find problems", ["fixing the code alone", "writing the story", "selling the game"], "Other eyes find what you miss."],
    ["<b>Feature creep</b> is...", "adding more and more features until the project is never finished", ["a bug that crawls", "removing features", "a fast computer"], "The list keeps growing."],
    ["A <b>prototype</b> is...", "a rough early version used to test an idea", ["the final polished game", "a password", "a bug"], "Try an idea cheaply first."],
    ["A <b>bug tracker</b> is...", "a list of known problems to fix", ["a game character", "a spy tool", "a screen saver"], "You write each problem down."],
    ["A project feels too big. What is a good first step?", "break it into small tasks", ["give up", "start everything at once", "ignore the plan"], "Decomposition helps again."],
    ["A <b>user story</b> like 'As a player I want to save my game' describes...", "what a user needs and why", ["a bug", "a computer part", "the final score"], "It is written from the player's point of view."]
  ];

  const AIE = [
    ["A chatbot sometimes sounds sure but is wrong. What is a good habit?", "check important facts with a reliable source", ["trust it always", "never use any tool", "ask it to guess louder"], "Confidence is not proof."],
    ["Many AI tools learn from work made by artists and writers. What question does this raise?", "credit and permission for creators", ["how loud the speakers are", "how big the monitor is", "nothing at all"], "Who owns the original work?"],
    ["<b>Misinformation</b> is...", "false information that spreads", ["a kind of math", "a fast computer", "a backup"], "It can spread even by accident."],
    ["Training very big AI models uses a lot of...", "electricity", ["paper", "wood", "glue"], "Big computers run for a long time."],
    ["Should an AI alone decide something very important about a person?", "no, a human should review it", ["yes, always", "only when it is raining", "only at night"], "People must stay responsible."],
    ["<b>Transparency</b> in AI means...", "being open about how a system works and what it can do", ["hiding the code", "using clear glass", "making it faster"], "People deserve to know how decisions are made."],
    ["You make a picture with an AI tool and share it. What is honest?", "say that it was made with AI", ["claim you drew it by hand", "hide the tool", "delete the date"], "Tell the truth about how it was made."],
    ["Should you type private details like your address into a chatbot?", "no, keep personal details private", ["yes, it needs them", "yes, to get better answers", "only on weekends"], "You cannot be sure who will see them."],
    ["Automation changes many jobs. What helps people most?", "learning new skills and planning together", ["ignoring it", "banning all machines", "blaming each other"], "Change is easier with preparation."]
  ];

  const A18 = [quartQ, confQ, percQ, treeQ, kmQ, bigQ, growQ, lcsQ, cacheQ, validQ, vigQ, xpQ, mmQ];
  const lessons18 = [
    L("Quartiles and spread", quartQ, [S("Splitting the data", "📊", "Sort the numbers. The <b>median</b> splits them in half. <b>Q1</b> is the middle of the lower half and <b>Q3</b> the middle of the upper half."), S("IQR", "↔️", "<b>IQR</b> = Q3 - Q1. It shows how spread out the middle half of the data is."), S("Example", "📝", "Sorted 2, 4, 5, 8, 9, 12, 15: median 8, Q1 = 4, Q3 = 12, IQR = 8.")]),
    L("Right and wrong guesses", confQ, [S("Four outcomes", "🧮", "A yes/no model can be right or wrong in two ways. A <b>false positive</b> flags something good. A <b>false negative</b> misses something bad."), S("A table", "🗂️", "Count each outcome in a table: really spam or not, called spam or not."), S("Precision", "🎯", "<b>Precision</b> = correct flags / all flags. 15 correct out of 20 flags is 75%.")]),
    L("Overfitting and testing", facts(OVER, "Think about whether the model learned the idea or just memorized.", "Example: a student who memorizes last year's test answers may fail a new test. That is like overfitting."), [S("Memorizing is not learning", "📚", "A model that memorizes its training data is <b>overfit</b>. It does badly on new data."), S("Test it", "🧪", "Keep some data hidden for <b>testing</b>. Good test results mean it can <b>generalize</b>."), S("Kinds of learning", "🧠", "<b>Supervised</b> learning uses labeled examples. <b>Unsupervised</b> learning finds groups without labels.")]),
    L("Learning by nudges", percQ, [S("Adjusting weights", "🔧", "A model learns by nudging its weights after each mistake."), S("A rule", "📝", "new weight = old weight + rate * error * input. The error is +1 or -1."), S("Example", "🧮", "Old 5, rate 1, error -1, input 3: 5 - 3 = 2.")]),
    L("Decision trees", treeQ, [S("Questions in a tree", "🌳", "A <b>decision tree</b> asks yes/no questions and follows branches until it reaches a label."), S("Follow one path", "👣", "Answer the top question, take that branch, answer the next question, and stop at the label."), S("Example", "📝", "'if size > 5: (red: apple, else pear), else grape'. A size-8 red fruit is an apple.")]),
    L("Grouping points: k-means", kmQ, [S("Clusters", "🎯", "<b>Clustering</b> groups similar points without labels. <b>k-means</b> uses k centers."), S("Two steps", "🔁", "1. Each point joins the nearest center. 2. Move each center to the mean of its group. Repeat."), S("Example", "📝", "Centers 2 and 20. Points 1, 3, 5 join center 2. The new center is (1+3+5)/3 = 3.")]),
    L("Designing tables", facts(DESIGN, "Think about keeping each fact in one place and linking tables.", "Example: a games table and a players table can be linked by player_id instead of repeating player details."), [S("Good design", "🏗️", "Keep each fact in one place. Link tables with a <b>foreign key</b>."), S("Speed and safety", "🛡️", "An <b>index</b> speeds up searches. A <b>transaction</b> either finishes completely or not at all."), S("Backups", "💾", "Always keep a backup so you can restore data after a loss.")]),
    L("Counting steps by formula", bigQ, [S("Step formulas", "📐", "We can describe how many steps a method needs with a formula in n, the size of the input."), S("Common ones", "🐢", "n*n (slow), n*n*n (slower), n*log2(n) (good sorting), 2 to the power n (explodes)."), S("Example", "🧮", "n = 16: n*n = 256, n*log2(n) = 16*4 = 64, and 2 to the power 10 is already 1024.")]),
    L("If the input grows", growQ, [S("Scaling up", "📏", "Some programs slow down a little as data grows. Others slow down a lot."), S("Rules of thumb", "🔍", "Same time: no change. Proportional: times the factor. Square: factor twice. Cube: factor three times."), S("Example", "🧮", "2 s now, input 3 times bigger, square rule: 2 * 3 * 3 = 18 s.")]),
    L("Longest common subsequence", lcsQ, [S("Matching letters in order", "🧬", "A <b>subsequence</b> keeps the order but can skip letters. We want the longest one two words share."), S("Used for", "🔬", "Programs that compare files, DNA letters and text changes use this idea."), S("Example", "📝", "ABCD and ACD share A, C, D in order, so the length is 3.")]),
    L("Caches and average time", cacheQ, [S("Caches", "⚡", "A <b>cache</b> keeps recent data close for quick access. A <b>hit</b> is fast, a <b>miss</b> is slow."), S("Total time", "🧮", "total = hits * hit time + misses * miss time."), S("Example", "📝", "8 hits at 2 ms and 2 misses at 30 ms: 16 + 60 = 76 ms.")]),
    L("Accessible design", facts(ACC, "Think about the many different ways people use a page.", "Example: adding alt text to an image makes it useful to someone using a screen reader."), [S("For everyone", "♿", "Good apps work for people with different needs: seeing, hearing, moving and thinking."), S("Easy wins", "✅", "Alt text, captions, good contrast, keyboard use, and not relying on color alone."), S("Tip", "💡", "Design that helps some people usually helps everyone.")]),
    L("Checking user input", validQ, [S("Never trust input", "📝", "Players and users can type anything. A program should <b>validate</b> input before using it."), S("Rules", "✅", "A rule has parts: the kind of characters and the limits. The input must pass all parts."), S("Example", "🧮", "Rule: whole number 1 to 10. '7' passes, '11' is too big, '2.5' is not whole.")]),
    L("Vigenere cipher", vigQ, [S("Stronger than Caesar", "🔐", "The <b>Vigenere cipher</b> uses a key word. Each letter gets its own shift."), S("How", "🔑", "A=0, B=1, C=2 ... The key repeats. Shift each message letter forward by the key letter's number."), S("Example", "📝", "GO with key BC: G+1 = H, O+2 = Q, so HQ.")]),
    L("Levels and cooldowns", xpQ, [S("Game math", "⭐", "Games use formulas for XP, levels and cooldown timers."), S("Level costs", "📈", "The cost may grow by a rule, such as 100 * level, or double each time."), S("Cooldowns", "⏳", "After using a power you wait. Uses happen every (wait + 1) turns.")]),
    L("Thinking ahead: minimax", mmQ, [S("Planning against a smart opponent", "♟️", "Game AIs think about what the opponent will do after each move."), S("Minimax", "🔀", "You choose the move; the opponent picks the worst leaf for you. So each move is worth its <b>smallest</b> leaf."), S("Pick the best", "🏆", "Choose the move whose smallest leaf is biggest.")]),
    L("Planning a project", facts(PLAN, "Think about how real teams build things step by step.", "Example: a team builds a tiny playable version first, tests it, then adds more."), [S("Build in small steps", "🧱", "Start with an <b>MVP</b>, a small version that works. Then improve it."), S("Test with people", "👀", "<b>Playtest</b> with real players and keep a <b>bug tracker</b>."), S("Stay focused", "🎯", "Avoid <b>feature creep</b>. Plan work in short <b>sprints</b>.")]),
    L("AI and society", facts(AIE, "Think about being honest, fair, careful and kind.", "Example: if you share an AI-made picture, say that it is AI-made."), [S("Powerful tools", "🤖", "AI can help, but it can also be wrong, biased or misused."), S("Good habits", "✅", "Check facts, credit creators, protect private information and be honest about AI help."), S("People decide", "🧑", "Important choices about people should have human review.")]),
    L("Mixed practice", mix(...A18.slice(0, 9)), MIXS("quartiles, model results, decision trees, clusters, step formulas, growth, caches, comparing text and more.")),
    L("Level 18 Challenge", mix(...A18, facts(OVER, "Think about learning versus memorizing.", "Example: good test results mean the model generalizes."), facts(DESIGN, "Think about linking tables.", "Example: use a foreign key instead of copying data."), facts(ACC, "Think about different users.", "Example: alt text helps screen readers."), facts(PLAN, "Think about small steps.", "Example: build an MVP first."), facts(AIE, "Think about honesty and care.", "Example: check chatbot answers."), quartQ), MIXS("everything from level 18: statistics, learning models, databases, growth of work, game logic, accessibility, planning and AI ethics."))
  ];

  Object.assign(CODING_LEVELS, { 16: lessons16, 17: lessons17, 18: lessons18 });
})();
