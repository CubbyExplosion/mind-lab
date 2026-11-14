// ext/library-10-12.js  Mind Lab Library Skills, levels 10-12 (60 lessons)
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
  const holdLine = () => {
    const make = () => {
      const n = ri(3, 9), d = pick([7, 14, 21]);
      return {
        text: `A popular book has a hold line. You are number <b>${n}</b> in line. Each reader keeps the book <b>${d}</b> days. About how many days until it is your turn?`, visual: "⏳", answer: (n - 1) * d,
        hints: ["You wait for the readers ahead of you, not for yourself.", "Count the people ahead of you (one fewer than your number). Then multiply by the days each one keeps the book.", "Example: you are number 3 and each reader keeps it 5 days. Two readers are ahead, so 2 × 5 = 10 days. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Holds and waiting", v: "⏳", t: "When a book is checked out, you can place a <b>hold</b>. You join a line and the library tells you when it is ready." },
      { h: "How long is the wait?", v: "3rd in line → 2 readers ahead", t: "Count the readers ahead of you. Multiply by how many days each one keeps the book." },
      { h: "Tip", v: "💡", t: "Your number minus 1 is how many readers are ahead of you." }
    ];
    return { title: "How long is the hold line?", make };
  };
  const EV = ["the library opened", "the children's room was added", "the first computers arrived", "the reading garden was planted", "the new wing was built", "the story hour began"];
  const timeline = () => {
    const make = () => {
      const y1 = ri(1900, 1990), gap = ri(5, 40), y2 = y1 + gap, [e1, e2] = S(EV, 2);
      if (Math.random() < 0.5) return {
        text: `<b>Library timeline</b><br>${y1}: ${e1}<br>${y2}: ${e2}<br><br>How many years passed between these two events?`, visual: "📅", answer: gap,
        hints: ["A timeline lists events in order by year. Look at the two years.", "Subtract the earlier year from the later year.", "Example: from 1850 to 1872, do 1872 − 1850 = 22 years. Now do yours."]
      };
      return {
        text: `<b>Library timeline</b><br>${y1}: ${e1}<br>${gap} years later: ${e2}<br><br>In what year did the second event happen?`, visual: "📅", answer: y2,
        hints: ["The second event came after the first one, so the year gets bigger.", "Add the number of years to the first year.", "Example: an event in 1850, then 22 years later, is 1850 + 22 = 1872. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Read a timeline", v: "📅", t: "A timeline shows events in the order they happened, with the year for each one." },
      { h: "Years between", v: "1950 → 1975", t: "Subtract the earlier year from the later year: 1975 − 1950 = 25 years." },
      { h: "Tip", v: "💡", t: "To find a later year, add the years. To find how long, subtract." }
    ];
    return { title: "Read a timeline", make };
  };
  const percentQ = () => {
    const make = () => {
      const den = pick([10, 20, 25, 50]), num = ri(1, den - 1), f = 100 / den;
      return {
        text: `In a survey of <b>${den}</b> students, <b>${num}</b> said they visit the library every week. What percent is that? (type the number)`, visual: "📊", answer: num * f,
        hints: ["Percent means 'out of 100'.", `Find what you multiply ${den} by to reach 100. Multiply the top number by the same thing.`, "Example: 1 out of 4. Since 4 × 25 = 100, do 1 × 25 = 25 percent. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Percent", v: "%", t: "Percent means 'out of 100'. 50% is 50 out of every 100, or half." },
      { h: "Make it out of 100", v: "3 out of 20", t: "20 × 5 = 100, so multiply 3 by 5 too. 3 out of 20 is 15%." },
      { h: "Why it matters", v: "🔬", t: "Surveys and studies use percents so groups of different sizes can be compared fairly." }
    ];
    return { title: "Percent in a survey", make };
  };
  const scheduleQ = () => {
    const make = () => {
      const a = ri(3, 7), b = ri(3, 7), c = ri(2, 5), total = a + b + c + ri(2, 9);
      return {
        text: `Your research report is due in <b>${total}</b> days. Finding sources will take ${a} days, taking notes ${b} days, and writing ${c} days. How many days are left over?`, visual: "🗓️", answer: total - a - b - c,
        hints: ["First find how many days all the jobs take together.", "Add the three jobs, then subtract that from the days you have.", "Example: 12 days to work. Jobs take 3, 4 and 2 days. 3 + 4 + 2 = 9, and 12 − 9 = 3 days left. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Plan your time", v: "🗓️", t: "A big project goes better with a schedule. List each job and how many days it needs." },
      { h: "Add, then compare", v: "3 + 4 + 2 = 9", t: "Add the days for all the jobs. Subtract from the days until the due date to see your spare days." },
      { h: "Tip", v: "💡", t: "Spare days are useful for surprises, like a book that is checked out." }
    ];
    return { title: "Plan a research schedule", make };
  };
  const MONTHS = ["January", "February", "March", "April", "May", "June"];
  const tableQ = () => {
    const make = () => {
      const ms = S(MONTHS, 4), vals = S([120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450], 4);
      const tab = ms.map((m, i) => `${m}: ${vals[i]} books borrowed`).join("<br>");
      const i = ri(0, 3); let j; do { j = ri(0, 3); } while (j === i);
      const r = Math.random();
      if (r < 0.34) return {
        text: `<b>Library loans</b><br>${tab}<br><br>How many books were borrowed in ${ms[i]} and ${ms[j]} together?`, visual: "📚", answer: vals[i] + vals[j],
        hints: ["Find the two months in the table.", "Add the two numbers.", "Example: if May had 100 and June had 150, then 100 + 150 = 250. Now do yours."]
      };
      if (r < 0.67) {
        const hi = Math.max(vals[i], vals[j]), lo = Math.min(vals[i], vals[j]);
        return {
          text: `<b>Library loans</b><br>${tab}<br><br>${ms[i]} and ${ms[j]}: how many more books were borrowed in the busier month?`, visual: "📚", answer: hi - lo,
          hints: ["Find the two months in the table and see which number is bigger.", "Subtract the smaller number from the bigger number.", "Example: 250 in one month and 100 in another. 250 − 100 = 150 more. Now do yours."]
        };
      }
      const best = ms[vals.indexOf(Math.max(...vals))];
      return {
        text: `<b>Library loans</b><br>${tab}<br><br>Which month was the busiest?`, visual: "📚", choices: shuf(ms), answer: best,
        hints: ["Busiest means the most books.", "Compare all four numbers. Look for the biggest one.", "Example: Mar 90, Apr 130, May 110. The biggest is 130, so April was busiest. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Read a data table", v: "📋", t: "A table lists numbers next to labels. Find the label first, then read its number." },
      { h: "Compare and combine", v: "Add or subtract", t: "Add to find a total. Subtract to find how many more. Look for the biggest number to find the most." },
      { h: "Tip", v: "💡", t: "Check what the numbers count: books, days, or people." }
    ];
    return { title: "Read a loans table", make };
  };
  const AUTH = ["Rivera, Ana", "Cole, Ty", "Nguyen, Mai", "Brooks, Sam", "Patel, Raj", "Stone, Lily", "Ortiz, Leo", "Baker, Joy"];
  const TIT = ["Desert Life", "Deep Seas", "Tiny Bugs", "Star Maps", "River Tales", "Old Bridges", "Cloud Atlas Kids", "Wild Weather"];
  const PUB = ["Sand Press", "Wave Books", "Leaf House", "Pine Press", "Blue Door Books", "Sun Press", "Maple Books", "North Press"];
  const bibPart = () => {
    const make = () => {
      const a = pick(AUTH), t = pick(TIT), p = pick(PUB), y = String(ri(1995, 2023));
      const kinds = {
        author: ["author", a, "The author's name is written last name first, with a comma.", "Fox, Dee. Night Owls. Pine Hill Books, 2012. The author is Fox, Dee."],
        title: ["title", t, "The title is the name of the book. It comes after the author's name.", "Fox, Dee. Night Owls. Pine Hill Books, 2012. The title is Night Owls."],
        publisher: ["publisher", p, "The publisher is the company that made the book. It comes before the year.", "Fox, Dee. Night Owls. Pine Hill Books, 2012. The publisher is Pine Hill Books."],
        year: ["year", y, "One part is only numbers. It says when the book came out.", "Fox, Dee. Night Owls. Pine Hill Books, 2012. The year is 2012."]
      };
      const [name, ans, clue, ex] = kinds[pick(Object.keys(kinds))];
      return {
        text: `<b>Book citation</b><br><i>${a}. ${t}. ${p}, ${y}.</i><br><br>Which part is the <b>${name}</b>?`, visual: "🔗", choices: shuf([a, t, p, y]), answer: ans,
        hints: ["A citation puts the same parts in the same order every time.", clue, `Example: ${ex} Now do yours.`]
      };
    };
    make.teach = () => [
      { h: "Parts of a citation", v: "🔗", t: "A citation tells a reader exactly which source you used. A book citation has four main parts." },
      { h: "The order", v: "Author. Title. Publisher, Year.", t: "Fox, Dee. Night Owls. Pine Hill Books, 2012." },
      { h: "Tip", v: "💡", t: "Find these on the title page and the copyright page of a book." }
    ];
    return { title: "Find the part of a citation", make };
  };
  const CT = ["Moon Rocks", "Under the Ice", "Tiny Machines", "Rainforest Days", "Bridge Builders", "The Salt Road", "Bird Songs", "Mountain Maps"];
  const CA = ["Hart, Ellen", "Lopez, Max", "Kim, Dara", "Wells, Ned", "Ahmed, Sara", "Frost, Ivy"];
  const CY = [2004, 2008, 2011, 2014, 2016, 2019, 2021];
  const LOC = ["Children's room", "Main floor", "Reference desk", "Young readers", "Upstairs"];
  const CALL = ["551.5 HAR", "523.4 LOP", "629.8 KIM", "598.2 WEL", "624.2 AHM", "910.4 FRO", "621.3 HAR", "577.3 KIM"];
  const catRec = () => {
    const make = () => {
      const t = pick(CT), a = pick(CA), y = pick(CY), loc = pick(LOC), call = pick(CALL), out = Math.random() < 0.5;
      const status = out ? "Checked out, due December 4" : "On the shelf";
      const rec = `<b>Catalog record</b><br>Title: ${t}<br>Author: ${a}<br>Year: ${y}<br>Call number: ${call}<br>Location: ${loc}<br>Status: ${status}`;
      const k = pick(["call", "loc", "year", "avail", "author"]);
      if (k === "call") return {
        text: `${rec}<br><br>What is the call number?`, visual: "💻", choices: shuf([call, ...S(CALL.filter(x => x !== call), 2)]), answer: call,
        hints: ["Find the line in the record that has the right label.", "Look for the line that starts with 'Call number'.", "Example: in a record that says 'Call number: 595.7 OLD', the call number is 595.7 OLD. Now do yours."]
      };
      if (k === "loc") return {
        text: `${rec}<br><br>Where in the library is this book kept?`, visual: "💻", choices: shuf([loc, ...S(LOC.filter(x => x !== loc), 2)]), answer: loc,
        hints: ["The record tells you where to walk.", "Look for the line that starts with 'Location'.", "Example: 'Location: Quiet room' means go to the quiet room. Now do yours."]
      };
      if (k === "year") return {
        text: `${rec}<br><br>In what year was this book published?`, visual: "💻", choices: shuf([y, ...S(CY.filter(x => x !== y), 2)]), answer: y,
        hints: ["Look for a number that is a year.", "Look for the line that starts with 'Year'.", "Example: 'Year: 1999' means it was published in 1999. Now do yours."]
      };
      if (k === "author") return {
        text: `${rec}<br><br>Who wrote this book?`, visual: "💻", choices: shuf([a, ...S(CA.filter(x => x !== a), 2)]), answer: a,
        hints: ["The writer's name is in the record.", "Look for the line that starts with 'Author'.", "Example: 'Author: Reed, Ann' means Ann Reed wrote it. Now do yours."]
      };
      return {
        text: `${rec}<br><br>Can you borrow this book from the shelf right now?`, visual: "💻", choices: ["Yes, it is on the shelf", "No, it is checked out"], answer: out ? "No, it is checked out" : "Yes, it is on the shelf",
        hints: ["The record has a line about what is happening with the book.", "Read the line that starts with 'Status'. It tells you whether the book is there or out.", "Example: 'Status: Checked out, due May 2' means someone has it, so you could place a hold. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Read a catalog record", v: "💻", t: "Every book in the catalog has a record. It lists the title, author, year, call number, location and status." },
      { h: "Find the label", v: "Status: On the shelf", t: "Look for the label you need, like 'Call number' or 'Status'. The answer is right next to it." },
      { h: "Tip", v: "💡", t: "Write the call number down. It leads you to the shelf." }
    ];
    return { title: "Read a catalog record", make };
  };

  // ================= LEVEL 10 =================
  const L10 = [
    PL("Two ways to shelve books", "🔢", "Libraries sort books with a system. Many use Dewey Decimal numbers. Many large and college libraries use Library of Congress letters.", "Dewey starts with numbers. Library of Congress starts with letters.", [
      "Dewey Decimal::sorts books by subject with numbers like 595.7::🔢", "Library of Congress::sorts books with letters then numbers like QL 467::🔤", "call number::the address of a book on the shelf::📍", "Cutter number::a letter and digits made from the author's name::✍️", "classification::sorting books by subject::🗂️"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    PL("Library of Congress letters", "🔤", "In the Library of Congress system, the first letter tells the big subject area.", "Match the letter to its subject. Q is for science.", [
      "Q::science::🔬", "N::fine arts::🎨", "M::music::🎵", "T::technology::⚙️", "P::language and literature::📖", "R::medicine::🩺"
    ], { qd: "Which letter is this subject?", qt: "Which subject does this letter stand for?" }),
    SC("Subject headings", "🏷️", "A subject heading is an official topic word that a catalog uses so every book on one topic is grouped under the same name.", "Think about one agreed topic name that groups books together, even when their titles use different words.", "A book about 'cars' may be listed under the heading 'automobiles', so clicking that heading shows every related book.", [
      "A subject heading is...|An official topic word the catalog uses|A book's price|The author's nickname",
      "You search 'cars' but the catalog uses 'automobiles'. A subject heading helps because it...|Groups books about one topic under one name|Hides the books|Sorts by color",
      "You found one great book. To find more like it, click its...|Subject headings|Barcode|Page count",
      "'See also' in a catalog points you to...|Related topics|The late fees|The librarian's desk",
      "Why can a subject search beat a title search?|A book on your topic may not have the topic word in its title|Titles are always secret|Subjects change daily",
      "To find all books about volcanoes, you can...|Click a subject heading about volcanoes|Search for the word 'book'|Search for a color",
      "If a keyword search finds too little, try...|A different word or a subject heading|The same search again|Giving up"
    ]),
    SC("Who knows this topic?", "🎓", "An author who studied a topic or works in the field has expertise. Expertise makes the facts easier to trust.", "Ask: has this writer studied or worked on this topic? Look for clues about the author.", "A book about whales by a whale scientist is a strong choice.", [
      "Which author is best for a book about the heart?|A doctor who studies hearts|A person who sells shoes|An author with no information",
      "An 'About the author' note helps you see...|If the writer knows the topic|The book's weight|The number of pages",
      "A book on insects is written by an insect scientist. This author has...|Expertise|No sources|A secret",
      "Which is stronger proof of expertise?|Years of study and work on the topic|A funny nickname|A big photo",
      "Where can you often read about the author in a book?|The cover flap or the About the author page|The spine only|The index",
      "A space scientist writes a cooking book. Be careful because...|Their expertise is in a different field|Scientists are never right|Cooking is a topic",
      "A web page has no author listed. You should...|Look for more clues or check another source|Trust it fully|Copy it"
    ]),
    PL("Special reference books", "📚", "Some reference books do special jobs. Learn which one fits your question.", "Match the job to the book: maps, yearly facts, places, or lives.", [
      "almanac::a yearly book of facts, lists and numbers::📅", "atlas::a book of maps::🗺️", "gazetteer::an index of places with facts about them::📍", "biographical dictionary::short life stories of many people::🧑", "thesaurus::lists words with similar meanings::🔁", "encyclopedia::articles on many topics::📚"
    ], { qd: "Which reference book is this?", qt: "What is this reference book for?" }),
    holdLine(),
    timeline(),
    SC("Compare two sources", "⚖️", "Good researchers do not rely on one source. They compare sources to see which facts match and which are different.", "When facts match across good sources, you can trust them more. When they differ, look for more evidence.", "Two books say a bridge opened in 1932. A third site says 1936. I check one more trusted source.", [
      "Two good sources give the same fact. The fact is...|More likely to be right|Wrong|Funny",
      "You need up-to-date facts about computers. A source from last year is usually better than one from...|Thirty years ago|Yesterday|This week",
      "A book and a website disagree about a date. Next you should...|Check a third, trusted source|Pick one by chance|Ignore the question",
      "Why compare several sources?|To see which facts match and which differ|To make research longer|To avoid reading",
      "Source A lists where its facts came from. Source B does not. A is...|Easier to check|Less useful|Always wrong",
      "An expert source and an unknown source disagree. You should...|Look for more evidence|Ignore both|Choose the louder one",
      "Sources agree on the main facts but differ on one small number. You should...|Note the difference and check more|Hide it|Change the numbers"
    ]),
    PL("Quote, paraphrase, summary", "💬", "There are three honest ways to use a source's ideas. Each one needs credit.", "Quote = exact words. Paraphrase = your own words, same idea. Summary = short main points.", [
      "quote::the exact words, in quotation marks::💬", "paraphrase::one idea in your own words::🔄", "summary::the main points, much shorter, in your own words::📝", "citation::the note that credits the source::🔗", "plagiarism::using someone's words or ideas without credit::🚫"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    SC("Catalog or database?", "💻", "The library catalog shows what the library owns. A database is a collection of articles, magazines and more that are organized for research.", "Ask: do I need to find an item the library owns, or an article on a topic?", "To find a magazine article about glaciers, I use a library database.", [
      "To see if your library owns a book, search the...|Library catalog|Spine|Return slot",
      "For magazine and journal articles, a good tool is...|A library database|A shelf label|A bookmark",
      "Databases can give you articles that...|Free web searches may not show|Are not real|Are private diaries",
      "A catalog can tell you whether a book is...|On the shelf or checked out|Funny|Heavy",
      "Which tool best finds a recent newspaper article?|A news database|A map index|A glossary",
      "You need an e-book. The catalog can show...|A way to read it|Only the cover color|Nothing",
      "Why use a library database?|Its articles are organized for research|The articles are random|It has no sources"
    ]),
    PL("Story building blocks", "🧩", "Knowing the parts of a story helps you choose books and talk about them.", "Think of a story you know and find each part in it.", [
      "theme::the big message of a story::💡", "setting::when and where a story happens::🏞️", "plot::the events in a story::🧩", "character::a person or animal in a story::🧒", "conflict::the problem in a story::⚡", "point of view::who is telling the story::👁️"
    ], { qd: "Which story word is this?", qt: "What does this story word mean?" }),
    SC("Is this book just right?", "👆", "Try the five-finger test. Read one page. Hold up a finger for each word you cannot read. 0 or 1 is easy. 2 or 3 is just right. 4 or 5 is too hard for now.", "Count the hard words on one page and match the number to easy, just right or too hard.", "With 2 hard words on the page, the book is just right.", [
      "You count 0 hard words on a page. The book is...|Easy|Just right|Too hard",
      "You count 3 hard words on a page. The book is...|Just right|Too hard|Easy",
      "You count 5 hard words on a page. The book is...|Too hard for now|Just right|Easy",
      "You count 2 hard words on a page. The book is...|Just right|Too hard|Easy",
      "You count 1 hard word on a page. The book is...|Easy|Too hard|Just right",
      "You count 4 hard words on a page. The book is...|Too hard for now|Just right|Easy",
      "A good test uses...|One whole page|One letter|The cover only"
    ]),
    SC("Keep your accounts safe", "🔐", "Passwords protect your accounts. Make them long and hard to guess, use a different one for each account, and share them only with a trusted parent.", "Strong passwords are long, mixed and private. Never use easy ones like a name or a short number.", "A long mix of words, numbers and symbols is strong. 'Sam' is weak.", [
      "Which is the strongest password idea?|A long mix of words, numbers and symbols|Your first name|1234",
      "Who should know your passwords?|You and a trusted parent|Everyone|Your online friends",
      "Should you use one password for everything?|No, use different ones|Yes, it is easier|Only for games",
      "A quiz asks for your home address. You...|Ask a grown-up before sharing|Type it in|Post it",
      "Before leaving a shared library computer, you...|Log out|Leave it open|Save your passwords on it",
      "Your friend asks for your password. You...|Keep it private|Tell them|Post it",
      "Where is it a bad idea to keep a password?|On a note stuck to the screen|In your head|With a trusted parent"
    ]),
    SC("Pictures need credit too", "🖼️", "Photos and drawings have creators, too. Use pictures you made yourself, ones marked free to use, or ones you have permission for. Always say where a picture came from.", "Find out who made it and if you may use it. If you are not sure, ask a grown-up.", "A picture marked 'free to use with credit' can be used if I name the creator.", [
      "A picture has no license. Best choice?|Ask a grown-up or pick one marked free to use|Copy it|Say you drew it",
      "A picture says 'free to use with credit'. You...|Use it and name the creator|Use it and hide the creator|Do not use it",
      "Drawing your own picture means...|You can use it without asking anyone|It must be cited|It is copied",
      "Where do you list picture credits?|Near the picture or in a credits list|Nowhere|On the spine",
      "Why give credit for a photo?|The photographer made it|It looks nice|It is a rule for fun",
      "A friend made a drawing. Before using it you...|Ask your friend|Copy it quietly|Change the name",
      "Credit for a picture should include...|Who made it and where it came from|The size of the file only|A joke"
    ]),
    SC("Interviews", "🎤", "An interview with a person who lived through an event is a primary source. Plan your questions, listen carefully and write down the person's name and the date.", "Open questions that start with what, how or why get longer, richer answers than yes or no questions.", "'What was your favorite part and why?' is better than 'Was it fun?'", [
      "An interview with a person who lived through an event is a...|Primary source|Fiction story|Dictionary",
      "Before an interview you should...|Write your questions|Skip the questions|Guess every answer",
      "Which is the better interview question?|What was your favorite part of the trip and why?|Was it fun?|Yes or no?",
      "After an interview, you should thank the person and...|Check your notes|Throw away the notes|Change what they said",
      "Ask permission before you...|Record or quote them|Say hello|Sit down",
      "You write the person's name and the date. This helps you...|Cite your source|Hide it|Win a prize",
      "Good interview manners include...|Listening carefully|Interrupting|Looking away"
    ]),
    bibPart(),
    tableQ(),
    SC("Learn from audio and video", "🎧", "Videos and audio recordings are sources, too. Note the title, who made it, the date and the time stamp where you heard a fact. Pause and write short notes in your own words.", "Pause often, write short notes in your own words, and record the source details.", "Note: 'Seals dive deep (Ocean Show, 3:20).' That shows the source and the time.", [
      "You take notes from a video. Which detail should you write down?|The title, who made it and the time stamp|Only the length|Nothing",
      "A video speaker says something surprising. You should...|Pause and write a short note in your own words|Copy every word|Skip it",
      "A time stamp is...|The minute and second where something happens|The date the video was deleted|The speaker's age",
      "Who made a video matters because...|It helps you judge if you can trust it|It changes the color|It makes it shorter",
      "A video has no creator and no date. You should be...|Careful and check another source|Sure it is true|Ready to cite it first",
      "A good video note is...|Short and in your own words|Word for word|Missing the source",
      "To learn from a long video, you can...|Pause often to take notes|Skip all the facts|Turn off the sound"
    ])
  ];

  // ================= LEVEL 11 =================
  const L11 = [
    SC("Narrow a broad topic", "🔭", "A topic that is too broad has too much to say. Narrow it by choosing one kind, one place or one time. A narrow topic is easier to research.", "Choose the choice that focuses on one part, one place or one time.", "'Sports' is too broad. 'Why do soccer players warm up?' is narrow.", [
      "Which topic is the narrowest?|How bees keep their hive cool in summer|Animals|Insects",
      "'Space' is too broad. A narrower topic is...|How astronauts exercise on the space station|The universe|Everything in the sky",
      "Which topic is too broad for a short report?|History|The first airplane flight|How a pencil is made",
      "To narrow 'oceans', you could pick...|One ocean animal and how it finds food|All the water on Earth|The word ocean",
      "A topic is too narrow when...|You cannot find enough sources|It has a clear focus|It is a question",
      "Which question is more focused?|How do octopuses protect themselves?|What is science?|Tell me about animals.",
      "Narrowing a topic helps you...|Find the right sources and finish on time|Avoid reading|Skip the outline"
    ]),
    PL("Search symbols", "🔍", "Special symbols and words make searches sharper. Learn what each one does.", "Quotes keep words together. AND adds. OR widens. NOT removes.", [
      "quotation marks::search for an exact phrase::❝", "AND::both words must appear::➕", "OR::either word can appear::↔️", "NOT::leaves out a word::🚫", "asterisk::stands for the ending of a word, like cook*::✳️", "parentheses::group search words together::( )"
    ], { qd: "Which search tool is this?", qt: "What does this search tool do?" }),
    percentQ(),
    PL("Scholarly sources", "🎓", "Scholarly sources are written by experts for other experts. They are often found in library databases.", "Experts checking experts is what makes scholarly sources strong.", [
      "scholarly journal::articles by experts, checked by other experts::🎓", "peer review::experts check an article before it is published::🔍", "abstract::a short summary at the start of an article::📝", "periodical::a magazine or journal that comes out regularly::📰", "editorial::an article that gives the paper's opinion::🗣️", "byline::the line that names the writer::✍️"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    SC("Spot the citation problem", "🔗", "A citation needs all its parts so a reader can find the source again: the author, the title, the publisher and the year.", "Compare each citation with the four parts. Which part is missing?", "'Fox, Dee. Night Owls. 2012.' is missing the publisher.", [
      "Which book citation is missing its year?|Rao, Mia. Desert Life. Sand Press.|Rao, Mia. Desert Life. Sand Press, 2020.|Cole, Ty. Deep Seas. Wave Books, 2018.",
      "Which citation is missing the author?|Space Trips. Star Press, 2019.|Hill, Jo. Space Trips. Star Press, 2019.|Park, Lee. Tiny Bugs. Leaf Books, 2015.",
      "Which citation is missing the title?|Lane, Kit. Maple Books, 2017.|Lane, Kit. River Tales. Maple Books, 2017.|Wu, Ann. Old Roads. Sun Press, 2010.",
      "Which citation is missing the publisher?|Vega, Tom. Cloud Walks. 2013.|Vega, Tom. Cloud Walks. Pine Press, 2013.|Hall, Eva. Big Cats. Oak Books, 2009.",
      "A citation tells a reader...|Where to find your source again|How long the book is|Who bought it",
      "Why list citation parts in the same order each time?|So they are easy to read and compare|To hide the source|To fill space",
      "A web citation also needs...|The website name or address|The Dewey number|The spine label"
    ]),
    SC("Graphs that mislead", "📉", "A graph can trick you. Check the title, the labels and where the numbers start. A bar graph that does not start at zero can make small differences look huge.", "Read the labels and the starting number before you trust the picture.", "A graph with no title or labels cannot be trusted until you find out what it shows.", [
      "A bar graph starts at 90 instead of 0. Small differences look...|Huge|Tiny|Equal",
      "A graph has no title and no labels. You should...|Be careful, since you cannot tell what it shows|Trust it|Copy it",
      "The parts of a pie chart should add up to...|The whole (100%)|Ten|Zero",
      "A line graph is best for showing...|Change over time|Parts of a whole|A map",
      "A bar graph is best for...|Comparing groups side by side|Showing a recipe|Telling a story",
      "Ice cream sales and sunburns both rise in summer. This shows...|Both may be caused by hot weather|Ice cream causes sunburn|Sunburn causes sales",
      "Before trusting a graph, check...|The title, labels and where it starts|Only the colors|Only the size"
    ]),
    SC("Together is not always because", "🔗", "Two things can happen together without one causing the other. Look for a third reason that may explain both. Careful researchers say 'may be linked' unless there is strong proof.", "Ask: could something else explain both?", "Kids with bigger shoes read better, because older kids have bigger feet and read better.", [
      "Kids with bigger shoes score higher on reading tests. The most likely real reason is...|Older kids have bigger feet and read better|Big shoes make you smart|Reading grows feet",
      "More people carry umbrellas on rainy days. The cause of umbrellas is...|Rain|Umbrellas bring rain|Shoes",
      "Libraries with more books have more visitors. Careful researchers say...|The two may be linked, but more proof is needed|Books force people to visit|Visitors make books",
      "Which word shows a careful claim?|May be linked|Always causes|Definitely makes",
      "To show that A causes B, you need...|Strong proof from careful tests|One example|A guess",
      "Two things happen together. This means...|They might be linked, but it does not prove one caused the other|One always causes the other|Nothing at all",
      "A study of 3 kids shows a pattern. It is...|Too small to prove a cause|Perfect proof|Always correct"
    ]),
    SC("Check a photo", "📷", "Photos can be old, edited or used out of place. Ask where a photo came from, when it was taken and who first posted it. Look for the same photo in trusted sources.", "Trace the picture back to where it began, and see what trusted sources say.", "A 'new' storm photo might be five years old. I look for the first place it was posted.", [
      "A photo is shared with a big claim. First you should...|Check where and when it first appeared|Share it fast|Add a joke",
      "A photo can be misleading if it is...|Old or used for a different event|In color|Square",
      "To check a photo, look for it in...|Trusted sources|Random posts|Nowhere",
      "A caption says one thing but the photo seems to show another. You should be...|Careful and look for the original source|Sure the caption is right|Ready to share",
      "Editing programs can make photos...|Look real even when parts are changed|Always show the truth|Smaller only",
      "A real news photo usually has...|A credit and a date|No source|A fake name",
      "You cannot find where a photo came from. You should...|Be careful about trusting it|Trust it|Print it"
    ]),
    SC("Who is behind it?", "🧭", "Ask who made a source and why. A group may want to sell something or win support. That does not make the facts false, but you should check them with other sources.", "Look for clues about who paid for or made the source and what they want.", "A page by a snack company says its snack is the healthiest. I check what neutral sources say.", [
      "A company's page says its toy is the best. You should...|Check what other sources say|Trust it fully|Buy it now",
      "A group wants people to support its cause. Its page may leave out...|The other side of the story|Its name|The date",
      "Conflict of interest means someone may gain from what they say. This can...|Change how fair the source is|Make it more accurate|Make it shorter",
      "A study paid for by a candy maker says candy is healthy. You should...|Look for independent studies|Believe it|Ignore all science",
      "Who made it and why? These are questions about...|The source's purpose|The font|The color",
      "'About us' pages can tell you...|Who runs a site and what it wants|The next lottery numbers|Nothing",
      "An independent group that earns nothing from the result is...|Often a fairer source|Always wrong|Not a source"
    ]),
    PL("Mark up a text", "🖍️", "Annotating means adding notes while you read. It helps you think and remember.", "Use your own marks, but be consistent so you can find them later.", [
      "annotate::to add notes to a text while reading::✍️", "margin::the blank space beside the text::📄", "highlight::mark key words with color::🖍️", "symbol::a mark like ? or ! that has a meaning for you::❓", "key term::an important word to remember::🔑"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    PL("Cornell notes", "🗒️", "Cornell notes split a page into parts. Each part has a job. They are great for studying later.", "Questions on the left, facts on the right, summary at the bottom.", [
      "cue column::the left side, for questions and key words::◀️", "note column::the right side, for facts and details::▶️", "summary::the bottom, a sentence or two about the page::🔽", "heading::the top, with the topic and date::🏷️", "review::reading and quizzing yourself later::🔁"
    ], { qd: "Which part of the notes is this?", qt: "What goes here?" }),
    PL("Kinds of true books", "📘", "Nonfiction has many kinds. Each one tells true things in its own way.", "Who is telling it? Is it a life, a memory, or steps to follow?", [
      "biography::the story of a person's life, told by someone else::🧑", "autobiography::a person's own life story::✍️", "memoir::a personal memory of one part of a life::💭", "essay::a short piece of writing about one subject::📃", "how-to book::steps to make or do something::🛠️", "narrative nonfiction::true events told like a story::📖"
    ], { qd: "Which kind of book is this?", qt: "What kind of book is this?" }),
    SC("Dates and editions", "📅", "A book may show a copyright year, an edition and a printing. A newer edition usually has updated facts. A reprint is the same text printed again.", "Look for the newest edition when facts change over time.", "A 2022 edition of a science book probably has newer facts than its 2008 edition.", [
      "A book says 'Copyright 2015' and 'Second edition 2019'. The newer facts are probably in...|The second edition|The first edition|The cover",
      "A reprint means...|The same text printed again|New chapters added|A translation",
      "A new edition may have...|Updated facts|The same facts always|Fewer pages always",
      "Where do you find the copyright year?|On the copyright page near the front|On the spine label|In the glossary",
      "For computer facts, which book is best?|One published recently|One published fifty years ago|One without a date",
      "'Revised edition' means the book was...|Changed and updated|Thrown away|Written backward",
      "A book about old history may stay useful for a long time because...|The past does not change, though new discoveries can add facts|It has more pages|It is heavier"
    ]),
    PL("Build an argument", "🏗️", "When you write to convince someone, you need a claim, evidence and reasoning.", "Claim = what you think. Evidence = facts. Reasoning = how the facts prove it.", [
      "claim::a statement you want the reader to believe::📢", "evidence::facts that support the claim::🧾", "reasoning::explains how the evidence supports the claim::🔗", "counterclaim::a different view that you answer fairly::↔️", "conclusion::the ending that wraps up the argument::🏁"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    SC("Your data online", "🛡️", "Websites and apps can collect data about you, like what you click. Read the privacy rules with a grown-up, share only what is needed, and use settings that protect you.", "Share as little as possible, and ask a grown-up before you sign up for anything.", "A game asks for my address to make an account. I ask a grown-up and share nothing private.", [
      "A website 'collects data' means it...|Saves information about how you use it|Gives you free books|Deletes your files",
      "Before signing up for a site, you should...|Ask a grown-up to read the rules with you|Click accept right away|Use your real full name",
      "A privacy setting helps you...|Choose who can see your information|Win a prize|Change the font",
      "A site asks for more private information than it needs. You should...|Stop and ask a grown-up|Fill it all in|Post it",
      "Who might see a public post?|Many people, even strangers|Only your friends|Nobody",
      "Terms of service are...|The rules for using a site or app|A recipe|A song",
      "Which is the safest thing to share in an online profile?|Nothing private, like a nickname that is not your real name|Your school and address|Your phone number"
    ]),
    SC("Claim or evidence?", "🧾", "A claim is something a writer wants you to believe. Evidence is the facts, numbers or examples that back it up.", "A claim can be argued. Evidence can be checked.", "'Libraries help kids learn' is a claim. 'Kids who visit weekly score higher on reading tests' is evidence.", [
      "Which is a claim?|School libraries help students learn.|The library has 40 chairs.|Today is Monday.",
      "Which is evidence?|A study found that kids who read daily had higher scores.|Reading is the best.|Everyone loves it.",
      "A claim without evidence is...|Just an opinion until proven|A fact|A citation",
      "Strong evidence is...|Facts from reliable sources|A guess|A rumor",
      "Which sentence is evidence for 'Bike helmets protect heads'?|Tests show helmets reduce head injuries.|Helmets come in many colors.|Bikes have two wheels.",
      "A statement like 'This is the best game ever' is...|An opinion|Evidence|A citation",
      "To back up a claim, you should add...|Facts, numbers or examples with a source|More opinions|Bigger words"
    ]),
    catRec(),
    SC("News, opinion or ad?", "📰", "Not everything you read online or in print is the same kind. A news story reports what happened. An editorial gives opinions. An ad tries to sell something. A review tells what one person thinks.", "Ask what the writer wants: to report, to persuade, to sell, or to review.", "'Buy now and save!' is an ad. 'The city opened a new park today' is news.", [
      "'Buy now and save 20%!' is most likely...|An ad|A news report|A diary",
      "'The city opened a new park today.' is most likely...|A news report|An ad|A poem",
      "'I think the school should have a longer lunch.' is...|An opinion piece|A news report|A map",
      "A book review tells...|What one person thought about a book|The book's price|The call number",
      "An editorial gives...|The paper's opinion|Only numbers|Only photos",
      "A 'sponsored' post means...|A company paid for it|A librarian wrote it|It is a fact sheet",
      "To tell news from opinion, look for...|Facts you can check versus words like 'I think'|The longest article|The brightest picture"
    ])
  ];

  // ================= LEVEL 12 =================
  const L12 = [
    scheduleQ(),
    PL("SIFT: four moves", "🧭", "SIFT is a quick way to check information online or in print. Do the moves in order.", "Stop, Investigate, Find, Trace. Say it as you check.", [
      "Stop::pause before you trust or share::✋", "Investigate the source::find out who is behind it::🔎", "Find better coverage::see what other trusted sources say::📰", "Trace to the original::go back to where the claim began::🧭"
    ], { qd: "Which SIFT move is this?", qt: "What does this SIFT move mean?" }),
    SC("Edited and made-up media", "🎭", "Computers can now make or change pictures, voices and videos so they look real. Ask where it came from. Look for it in trusted sources. Be careful of anything that seems too shocking to be true.", "Slow down and check where it came from before you believe or share it.", "A shocking video appears only on one unknown page. I check whether trusted news sources have it.", [
      "A shocking video appears on only one unknown page. You should...|Check trusted sources before believing it|Share it at once|Believe it",
      "Pictures and voices can be changed by computers so they...|Look or sound real when they are not|Always show the truth|Turn into books",
      "A good first step with a surprising picture is to...|Ask where it came from|Share it|Print it",
      "If no trusted source reports a dramatic event, it may be...|False or unproven|Definitely true|A library rule",
      "Which clue should make you stop and check?|It makes you very angry or shocked and asks you to share fast|It names its source and date|It has a clear caption",
      "A source labeled 'edited for fun' is...|Not a real record of what happened|Always a news report|A primary source",
      "Your best defense against fake media is...|Careful checking and good sources|Fast sharing|Ignoring everything"
    ]),
    SC("Why your search looks different", "🫧", "Search sites and apps often show you results based on what you clicked before. That can trap you in a bubble where you only see some views. Try other words, other tools and different sources to get the whole picture.", "To see the whole picture, look beyond the first results and use different sources.", "I search for the same topic in a library database as well, to see more than my usual results.", [
      "Search results may differ from person to person because...|They can be based on past clicks|Computers pick colors|Libraries decide",
      "A 'filter bubble' means...|You mostly see views like the ones you already saw|A bubble of soap|A library fee",
      "To see more views on a topic, you can...|Use other sources and search words|Always click the first result|Stop searching",
      "The top result is...|Not always the best or most true|Always the most accurate|Chosen by the librarian",
      "A library database results list is often...|Organized for research, not for clicks|Full of ads|Hidden",
      "Why look at several sides of an issue?|To understand it fairly|To make it longer|To avoid deciding",
      "An ad at the top of results is...|Paid placement|Always the best answer|A library book"
    ]),
    SC("Match the citations", "🔗", "Every in-text credit, like (Lee 24), should match one source in your list at the end. If you cite it in the report, it belongs in the list. If it is in the list, you should have used it.", "Check that each mention in the report has a matching full source in the list.", "(Cruz 12) in my report means Cruz must be in my source list.", [
      "Your report says (Cruz 12). The source list must have...|A source by Cruz|Nothing|Your name",
      "Every source in your list should be...|Used in your report|Hidden from readers|Copied from a friend",
      "(Lee 24) shows the fact came from...|Page 24 of a source by Lee|Lee's 24th book|24 sources",
      "A fact is in your report but not in your source list. You should...|Add the source to the list|Delete the list|Ignore it",
      "A source is in your list but you never used it. You should...|Remove it|Leave it hidden|Add a fake quote",
      "The list of sources at the end is often called...|A bibliography or Works Cited|An index|A table of contents",
      "Why match in-text credit and the list?|Readers can find the full source|It makes the report longer|It is a secret code"
    ]),
    SC("Put sources together", "🧵", "Synthesis means combining ideas from several sources into your own point. You do not list sources one by one. You show how they fit together, agree or differ.", "Combine what the sources say into one clear idea of your own, and credit each one.", "Two sources say owls hunt at night and use sharp hearing. I write: 'Owls hunt well in the dark because of their hearing.'", [
      "Synthesis means...|Combining ideas from several sources into your own point|Copying one source|Listing sources only",
      "Which shows synthesis?|Both sources agree that sea ice is shrinking, though they differ on the speed.|Source A says this. Source B says that.|I copied a paragraph.",
      "When two sources disagree, you can...|Explain the difference fairly|Hide one|Pick the shorter one",
      "Your own point should come from...|What the sources show together|A guess|What you want",
      "Do you still cite sources when you synthesize?|Yes, credit each source|No, it is your idea|Only for photos",
      "A good report is mostly...|Your thinking supported by sources|A pile of quotes|A copy of one article",
      "Why use more than one source?|To get a fuller, fairer picture|To make the list longer|Because teachers like long lists"
    ]),
    PL("Copying traps", "🪤", "There are sneaky ways to copy without meaning to. Learn what to watch for.", "Change the ideas into your own words, and always add the credit.", [
      "direct copying::using exact words without quotes or credit::📋", "patchwriting::changing only a few words of the source::🧩", "self-plagiarism::turning in your old work as new work::🔁", "missing citation::using an idea without naming where it came from::❓", "proper paraphrase::your own words, plus a citation::✅"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    SC("Question a primary source", "🏺", "To study a primary source, like a letter or photo from long ago, ask: who made it, when, why, and what does it show? Remember that one person's view is only part of the story.", "Ask who, when, why and what, and remember it is one person's view.", "A diary from 1900 tells what one person saw. I also check other sources for the bigger story.", [
      "Which is a good question to ask about an old letter?|Who wrote it and why?|What color is the paper only?|How heavy is it?",
      "A diary tells...|One person's view of events|Every person's view|Only facts",
      "A photo from 1920 shows a street. What can it tell you?|What the street looked like then|What happened in 2020|Nothing at all",
      "Why check other sources, too?|One source shows only part of the story|Primary sources are always wrong|It is faster",
      "'When was it made?' helps you decide...|How close it was to the events|How tall the author was|The price",
      "A letter written by a person who saw the event is...|A primary source|A textbook|A fiction story",
      "A history book written years later by someone who studied the event is...|A secondary source|A primary source|A diary"
    ]),
    SC("Beyond your own library", "🚚", "If your library does not have what you need, it may borrow it from another library. This is called interlibrary loan. Many libraries also lend e-books and audiobooks you can borrow on a device.", "Ask a librarian: another library or a digital copy may be the answer.", "My library does not own a rare book, so the librarian requests it from another library.", [
      "Your library does not own a book you need. A librarian may be able to...|Borrow it from another library|Print a new one at once|Say it does not exist",
      "Interlibrary loan means...|One library borrows an item from another for you|You lend your own books|You pay a fine",
      "An e-book is borrowed on...|A device like a tablet or computer|A shelf only|A bus",
      "An audiobook lets you...|Listen to a book|Draw a book|Weigh a book",
      "Why plan ahead for an interlibrary loan?|It can take days or weeks to arrive|It arrives before you ask|It never arrives",
      "To ask about an interlibrary loan, you can...|Ask at the help desk|Wait outside|Guess",
      "A digital library loan usually ends...|On its due date, automatically|Never|When you sneeze"
    ]),
    SC("Think of better search words", "💡", "If searches do not work, brainstorm. Think of synonyms, broader words, narrower words, and related words.", "Think of other words that mean nearly the same, or a wider or narrower word.", "For 'kids', I can try 'children' or 'young people'. For 'cars', I can try 'automobiles'.", [
      "Another search word for 'kids' is...|Children|Cars|Clouds",
      "If 'felines' finds too little, a simpler word to try is...|Cats|Rocks|Moons",
      "A broader word than 'poodle' is...|Dog|Tail|Park",
      "A narrower word than 'sport' is...|Soccer|Game|Activity",
      "Too many results. Add a more specific word like...|A particular place or year|The word 'thing'|Nothing",
      "Too few results. Try...|Fewer or different words|More strange words|Spelling mistakes",
      "A related word for 'volcano' might be...|Lava|Violin|Pencil"
    ]),
    PL("Annotated bibliography", "📋", "An annotated bibliography lists each source and then adds a short note about it.", "Citation first, then a short note that summarizes and evaluates.", [
      "citation::the details that identify the source::🔗", "annotation::a short note about what the source says and how useful it is::📝", "summary::the source's main points::📚", "evaluation::how reliable and useful the source is::⚖️", "reflection::how the source fits your project::💭"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    PL("Archives and special collections", "🗄️", "Some libraries keep old records and rare items. Researchers can visit them to see original materials.", "These materials are rare and fragile, so they are handled with care.", [
      "archive::a place that keeps old records and papers::🗄️", "special collection::rare or unique items kept with extra care::💎", "manuscript::a handwritten or typed original document::📜", "finding aid::a guide that lists what is in a collection::🗂️", "microfilm::tiny photos of pages stored on film::🎞️", "digitized::turned into a computer copy::💾"
    ], { qd: "Which word fits?", qt: "What does this mean?" }),
    SC("Write a fair survey question", "📝", "A fair survey question is clear and does not push people toward one answer. Give balanced choices. Ask one thing at a time.", "Look for the question that does not hint at the right answer.", "'Which fruit do you like best: apple, banana or grape?' is fair. 'Don't you agree apples are best?' is not.", [
      "Which is a fair survey question?|Which fruit do you like best: apple, banana or grape?|Don't you agree apples are the best?|Surely everyone loves apples, right?",
      "A question that pushes people toward an answer is called...|Leading|Fair|Balanced",
      "Which question asks one thing at a time?|How often do you visit the library?|How often do you visit the library and what do you read and who goes with you?|Why is the library great?",
      "Choices in a survey should be...|Balanced and clear|Missing options|All the same",
      "Which question is clearer?|How many books did you read this month?|How is it going with stuff?|Reading?",
      "Why test a survey on a few people first?|To find confusing questions|To fill time|To hide the results",
      "A survey that asks only your friends will probably...|Not show what everyone thinks|Be perfect|Be a primary source for all"
    ]),
    SC("Terms and rights online", "📜", "When you use a site or app, you agree to rules called terms of service. Creators also have rights over what they make. Respect both, and ask a grown-up before agreeing to anything.", "Read the rules with a grown-up and respect what others made.", "Before I join a site, a grown-up and I read what it says about my information.", [
      "Terms of service are...|Rules for using a site or app|A kind of font|A library card",
      "Before clicking 'I agree', you should...|Read the rules with a grown-up|Click without looking|Ask a stranger",
      "A creator's rights mean...|Others need permission or a license to use their work|Everyone can copy it|It is public domain always",
      "Sharing a friend's picture online needs...|Their OK and a grown-up's advice|No one's OK|A fake name",
      "A site changes its rules. You should...|Ask a grown-up to look at the change|Ignore it|Click away fast",
      "Downloading a song from an unofficial site might...|Break rules or rights|Be always fine|Make it free forever",
      "Respecting other people's work is part of being...|A good digital citizen|A hacker|A pirate"
    ]),
    SC("How big is the study?", "🔬", "A small group may not show what is true for everyone. A larger, fairly chosen group gives stronger evidence. Look for how many were studied and how they were chosen.", "Think about whether the group is big enough and chosen fairly.", "A poll of 1,000 randomly chosen people tells more than a poll of 5 friends.", [
      "Which poll gives stronger evidence?|1,000 people chosen at random|5 friends|One person",
      "A study of 3 people is usually...|Too small to be sure|Perfect|Huge",
      "A survey that only asks people at a toy store about favorite toys is...|Not fair to everyone|Perfectly fair|A primary source",
      "A good study tells you...|How many were studied and how they were chosen|Only the title|The authors' favorite food",
      "A 'sample' is...|A smaller group that stands for a bigger group|A free book|A library card",
      "A big claim from a tiny study should make you...|Careful and look for more studies|Sure|Quiet",
      "Which sentence is more careful?|Most of the 800 kids surveyed liked reading.|All kids in the world love reading.|Reading is always fun.",
    ]),
    SC("Share your research", "🎤", "A good presentation has a clear main point, a few key words on each slide, helpful pictures with credit, and a list of sources. Practice out loud.", "Keep slides simple, credit every picture, and practice what you will say.", "A slide has a title, three short bullet points and a credited picture.", [
      "A good slide has...|A few key words and a helpful picture|A whole page of tiny text|No point",
      "Where do picture credits go?|On the slide or in a credits slide|Nowhere|On the spine",
      "Before presenting, you should...|Practice out loud|Skip the practice|Read the slides word for word without looking up",
      "Your presentation should start with...|A clear main point or question|A long list of facts|An apology",
      "A last slide often lists...|Your sources|Your favorite color|Your password",
      "Too many words on a slide make it...|Hard to read|Easy to read|Shorter",
      "A chart in your presentation should have...|A title and labels|No numbers|Only a pretty color"
    ]),
    SC("Revise with feedback", "🔁", "Good writers revise. Ask a trusted reader for feedback, listen, and then improve your work. Check facts, organization, and citations again.", "Use feedback to make your work clearer and more accurate, then check it again.", "A classmate says my second paragraph is confusing. I rewrite it with clearer facts.", [
      "Feedback is...|Helpful comments about your work|A late fee|A prize",
      "After you get feedback, you should...|Think about it and improve your work|Delete the project|Argue",
      "Revising means...|Making your work clearer and better|Printing only|Starting a new topic",
      "A good time to check citations is...|After revising, too|Never|Before choosing a topic",
      "Kind, helpful feedback is...|Specific, like 'Add a fact here.'|Just 'It is bad.'|Silence",
      "You find a mistake in a fact. You should...|Fix it and check your source|Leave it|Hide it",
      "Reading your work aloud can help you...|Hear parts that are unclear|Make it louder|Avoid revising"
    ]),
    SC("Say your main point", "🎯", "A thesis statement is one or two sentences that tell your main point. A good thesis can be supported with evidence and is more than a simple fact.", "Choose the sentence that makes a point you can support, not just a fact.", "'School libraries help students become better readers' is a thesis I can prove with evidence.", [
      "Which is the best thesis statement?|School libraries help students become better readers.|Libraries have books.|I like libraries.",
      "A thesis statement tells...|Your main point|Your page count|Your sources only",
      "A thesis should be...|Something you can support with evidence|A simple fact everyone knows|A question only",
      "Which sentence is a fact, not a thesis?|The library opened in 1950.|Libraries are important to communities because they give everyone equal access to knowledge.|Libraries make towns better.",
      "Where does a thesis usually appear?|In the introduction|On the spine|In the index",
      "A weak thesis is...|Too vague, like 'Dogs are interesting.'|Clear and focused|Supported",
      "After writing a thesis, your body paragraphs should...|Support it with evidence|Change topics|Repeat the title"
    ])
  ];

  Object.assign(LIBRARY_LEVELS, {
    10: lvl(10, L10, [0, 2, 4, 6, 8, 10, 14]),
    11: lvl(11, L11, [1, 3, 5, 7, 9, 12]),
    12: lvl(12, L12, [1, 3, 5, 8, 10, 14])
  });
})();
