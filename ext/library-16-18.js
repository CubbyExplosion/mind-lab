// ext/library-16-18.js  Mind Lab Library Skills, levels 16-18 (60 lessons)
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
  const FN = ["Maya", "Owen", "Priya", "Liam", "Zoe", "Hugo", "Nina", "Felix", "Ada", "Marcus", "Elena", "Tomas"];
  const LN = ["Brooks", "Carter", "Dixon", "Evans", "Fisher", "Grant", "Hughes", "Ingram", "Jensen", "Keller", "Lopez", "Morgan", "Nash", "Ortiz", "Patel", "Quinn", "Reyes", "Stone", "Turner", "Wells"];
  const people = n => { const fs = S(FN, n), ls = S(LN, n); return fs.map((f, i) => ({ f, l: ls[i] })); };

  const authorsOrder = () => {
    const make = () => {
      const r = Math.random();
      if (r < 0.6) {
        const ps = people(3), first = Math.random() < 0.5, sorted = ps.slice().sort((a, b) => a.l.localeCompare(b.l));
        const ans = sorted[first ? 0 : 2];
        return {
          text: `A works cited list is in alphabet order by the author's <b>last name</b>. Which entry is listed <b>${first ? "first" : "last"}</b>?`, visual: "📋",
          choices: shuf(ps.map(p => `${p.l}, ${p.f}`)), answer: `${ans.l}, ${ans.f}`,
          hints: ["In a bibliography you sort by the last name, not the first name.", "Look only at the word before the comma. Compare the first letters, and if they match, the next letters.", `Example: "Adams, Eve", "Moore, Sam" and "Young, Zed". Adams has the earliest first letter, so it is first and Young is last. Now do yours.`]
        };
      }
      const p = people(1)[0];
      return {
        text: `An author is named <b>${p.f} ${p.l}</b>. How is the name written at the start of a works cited entry?`, visual: "✍️",
        choices: shuf([`${p.l}, ${p.f}`, `${p.f} ${p.l}`, `${p.f[0]}. ${p.l}`]), answer: `${p.l}, ${p.f}`,
        hints: ["The name is flipped so the list can be sorted by last name.", "Put the last name first, then a comma, then the first name.", "Example: the author Ruth Gold is written as Gold, Ruth. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Names in a list", v: "Gold, Ruth", t: "In a works cited list or bibliography, an author's name is flipped: <b>last name, comma, first name</b>." },
      { h: "Sort by last name", v: "Adams → Moore → Young", t: "The entries go in alphabet order by the last name. Compare the first letters; if they match, compare the next ones." },
      { h: "Tip", v: "💡", t: "Say the last name first in your head. The comma tells you it has been flipped." }
    ];
    return { title: "Works cited in order", make };
  };

  const ageOfSource = () => {
    const make = () => {
      const Y = ri(2025, 2028), r = Math.random();
      if (r < 0.34) {
        const age = ri(2, 15);
        return {
          text: `It is the year ${Y}. A book was published in ${Y - age}. How many years old is it?`, visual: "📅", answer: age,
          hints: ["Age is the distance between two years.", "Subtract the publication year from the current year.", "Example: in 2012 a source from 2007 is 2012 − 2007 = 5 years old. Now do yours."]
        };
      }
      const N = pick([3, 5, 10]);
      if (r < 0.67) return {
        text: `It is ${Y}. Your teacher says sources can be <b>no more than ${N} years old</b>. What is the earliest publication year you may use?`, visual: "📅", answer: Y - N,
        hints: ["Go back in time from the current year.", "Subtract the number of allowed years from the current year.", "Example: in 2015 with sources no more than 4 years old, the earliest year is 2015 − 4 = 2011. Now do yours."]
      };
      const ok = Y - ri(0, N), olds = S([1, 2, 3, 4, 5, 6, 7, 8], 2).map(k => Y - N - k), cs = shuf([ok, ...olds]);
      return {
        text: `It is ${Y}. Your teacher says sources can be <b>no more than ${N} years old</b>. Which publication year is allowed?`, visual: "📅", choices: cs, answer: ok,
        hints: ["First work out the oldest year that is still allowed.", "Subtract the allowed number of years from the current year. A source from that year or newer is fine.", "Example: in 2015 with a limit of 4 years, 2011 or later works, so 2013 is allowed but 2009 is not. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "How old is a source?", v: "2026 − 2021 = 5", t: "To find a source's age, subtract the year it was published from the current year." },
      { h: "Age limits", v: "no more than 5 years", t: "Teachers often set a limit. Take the limit away from the current year to find the earliest year you may use." },
      { h: "Tip", v: "💡", t: "Fast-changing topics like technology need new sources. History topics can use older ones, too." }
    ];
    return { title: "How old is the source?", make };
  };

  const wordBudget = () => {
    const make = () => {
      const T = pick([500, 800, 1000, 1200, 1500, 2000]), p1 = pick([10, 15, 20]), p2 = pick([10, 15, 20]);
      const a = T * p1 / 100, c = T * p2 / 100;
      if (Math.random() < 0.4) return {
        text: `A report must be ${T} words. The introduction uses ${p1}% of the words. How many words is the introduction?`, visual: "📝", answer: a,
        hints: ["Turn the percent into a part of the whole.", "Find the percent of the total: divide the total by 100, then multiply by the percent.", "Example: 10% of 600 words is 600 ÷ 100 × 10 = 60 words. Now do yours."]
      };
      return {
        text: `A report must be ${T} words. The introduction uses ${p1}% and the conclusion uses ${p2}%. How many words are left for the body?`, visual: "📝", answer: T - a - c,
        hints: ["Find how many words the intro and conclusion use, then see what is left.", `Work out ${p1}% of the total and ${p2}% of the total, add them, and subtract from the total.`, "Example: in a 500-word report, an intro of 10% is 50 words and a conclusion of 20% is 100 words. 500 − 50 − 100 = 350 words for the body. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Budget your words", v: "10% + 80% + 10%", t: "A good report plans how many words each part gets: a short introduction, a long body and a short conclusion." },
      { h: "Percent of the total", v: "10% of 600 = 60", t: "To find a percent of the total, divide by 100 and multiply by the percent." },
      { h: "Tip", v: "💡", t: "Add the parts to check. Introduction + body + conclusion must equal the total." }
    ];
    return { title: "Plan the word count", make };
  };

  const marginError = () => {
    const make = () => {
      const m = pick([2, 3, 4, 5]), r = Math.random();
      if (r < 0.35) { const p = ri(30, 70); return {
        text: `A poll says ${p}% of students like the new schedule, with a margin of error of ±${m} points. What is the <b>lowest</b> the real number could be (in %)?`, visual: "📊", answer: p - m,
        hints: ["The margin of error tells how far the real number may be from the poll's number.", "The lowest value is the poll's number minus the margin.", "Example: a poll of 40% with ±3 points could be as low as 40 − 3 = 37%. Now do yours."]
      }; }
      if (r < 0.7) { const p = ri(30, 70); return {
        text: `A poll says ${p}% of students like the new schedule, with a margin of error of ±${m} points. What is the <b>highest</b> the real number could be (in %)?`, visual: "📊", answer: p + m,
        hints: ["The margin of error tells how far the real number may be from the poll's number.", "The highest value is the poll's number plus the margin.", "Example: a poll of 40% with ±3 points could be as high as 40 + 3 = 43%. Now do yours."]
      }; }
      const close = Math.random() < 0.5, gap = close ? ri(1, m - 1) : 2 * m + ri(1, 3), a = ri(40, 55), b = a - gap;
      const lead = pick(["Red plan", "Blue plan"]);
      const other = lead === "Red plan" ? "Blue plan" : "Red plan";
      return {
        text: `A poll gives the ${lead} ${a}% and the ${other} ${b}%. The margin of error is ±${m} points for each. What can you say?`, visual: "🗳️",
        choices: shuf(["Too close to call", `The ${lead} is clearly ahead`, `The ${other} is clearly ahead`]), answer: close ? "Too close to call" : `The ${lead} is clearly ahead`,
        hints: ["Each number could really be a bit higher or lower.", "Compare the gap between the two numbers with the margin. If the gap is small compared with the margin, the ranges overlap.", "Example: 52% and 50% with ±3 points. The gap is 2, smaller than 3, so the ranges overlap and it is too close to call. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Margin of error", v: "52% ± 3", t: "A poll asks only some people, so its number is an estimate. The <b>margin of error</b> shows how far off it could be." },
      { h: "Make a range", v: "49% to 55%", t: "Subtract the margin to get the low end and add it to get the high end. The real value is probably inside that range." },
      { h: "Close races", v: "🤝", t: "If two results are closer together than the margin of error, their ranges overlap, and you cannot say who is really ahead." }
    ];
    return { title: "Margin of error", make };
  };

  const TITLES = ["Rivers of the World", "The Story of Bridges", "Inside the Beehive", "Mapping the Stars", "A History of Libraries", "How Clocks Work", "Tides and Moons", "Wind Power Today", "Secrets of the Deep Sea"];
  const PUBS = ["Harbor Press", "Lakeside Books", "Summit House", "Orchard Publishing", "Bluebird Press", "Northgate Books"];
  const citeBuild = () => {
    const make = () => {
      const p = people(1)[0], T = pick(TITLES), P = pick(PUBS), Y = ri(1998, 2024);
      const good = `${p.l}, ${p.f}. <i>${T}</i>. ${P}, ${Y}.`;
      if (Math.random() < 0.55) {
        const bad = S([`${p.f} ${p.l}. <i>${T}</i>. ${P}, ${Y}.`, `${p.l}, ${p.f}. <i>${T}</i>. ${Y}, ${P}.`, `${p.l} ${p.f}, ${P}. <i>${T}</i>. ${Y}.`], 2);
        return {
          text: "A book citation follows this pattern:<br><b>Last, First. Title. Publisher, Year.</b><br>Which entry follows the pattern?", visual: "📋", choices: shuf([good, ...bad]), answer: good,
          hints: ["Check the author's name first: is the last name first, with a comma?", "Then check the order of the last two parts: the publisher comes before the year.", "Example: Gold, Ruth. <i>Old Maps</i>. Blue Press, 2010. fits: name flipped, then title, publisher, year. Now do yours."]
        };
      }
      const kinds = [[`${p.l}, ${p.f}`, "the author"], [T, "the title"], [P, "the publisher"], [String(Y), "the year"]], k = pick(kinds);
      return {
        text: `Look at this entry:<br>${good}<br>What part of the entry is <b>${k[0]}</b>?`, visual: "🔍", choices: kinds.map(x => x[1]), answer: k[1],
        hints: ["Each part of the entry has a job. Think about what the piece looks like.", "The title is in italics, the year is a number, and the author's name has a comma in it. The publisher is the company.", "Example: in 'Gold, Ruth. Old Maps. Blue Press, 2010.' Blue Press is the company that published the book. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Build a citation", v: "Last, First. Title. Publisher, Year.", t: "A works cited entry lists the same parts in the same order every time. Here is a common pattern for a book." },
      { h: "Read the parts", v: "Gold, Ruth. <i>Old Maps</i>. Blue Press, 2010.", t: "Author (flipped), title, publisher, then the year. Each part is ended by a period or comma." },
      { h: "Tip", v: "💡", t: "Your teacher or library may use a style with slight differences. Always follow the style you are asked to use, and keep it the same throughout." }
    ];
    return { title: "Build a book citation", make };
  };

  const pctPoints = () => {
    const make = () => {
      const r = Math.random();
      if (r < 0.5) {
        const a = ri(10, 60), d = ri(3, 15);
        return {
          text: `Library use rose from ${a}% of students to ${a + d}% of students. By how many <b>percentage points</b> did it rise?`, visual: "📈", answer: d,
          hints: ["Percentage points are the plain difference between two percents.", "Subtract the first percent from the second.", "Example: from 30% to 38% is 38 − 30 = 8 percentage points. Now do yours."]
        };
      }
      const a = pick([10, 20, 25, 40, 50]), rr = pick([0.2, 0.5]), b = a * (1 + rr);
      return {
        text: `The share of students who use e-books rose from ${a}% to ${b}%. By what <b>percent</b> did the share grow (compared with where it started)?`, visual: "📈", answer: rr * 100,
        hints: ["Percent growth compares the change with the starting value.", "Find the change in points, then divide it by the starting percent and multiply by 100.", "Example: from 40% to 60% is a change of 20 points. 20 ÷ 40 × 100 = 50% growth. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Percent or percentage points?", v: "20% → 30%", t: "A change from 20% to 30% is <b>10 percentage points</b>. That is the plain difference." },
      { h: "Growth in percent", v: "10 ÷ 20 = 50%", t: "But compared with where it started, the share grew by 10 ÷ 20 = <b>50 percent</b>. Both are true, so check which one a headline means." },
      { h: "Tip", v: "💡", t: "Points answer 'how far did it move?'. Percent growth answers 'how big is the move compared with the start?'." }
    ];
    return { title: "Points or percent?", make };
  };

  const pctSample = () => {
    const make = () => {
      let N, p, k;
      do { N = pick([200, 250, 400, 500, 800, 1000]); p = pick([10, 20, 25, 30, 40, 50, 60, 75]); k = N * p / 100; } while (k !== Math.floor(k));
      const w = pick(["use the library's online catalog", "prefer e-books", "read for fun every day", "visit the library each week"]);
      return {
        text: `A survey of ${N} students found that ${p}% ${w}. How many students is that?`, visual: "🧮", answer: k,
        hints: ["A percent is a part out of 100.", "Divide the total by 100 to find 1%, then multiply by the percent.", "Example: 20% of 300 students is 300 ÷ 100 × 20 = 60 students. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Percent of a sample", v: "20% of 300", t: "Survey results are often given as percents. You can turn a percent back into a number of people." },
      { h: "Find 1% first", v: "300 ÷ 100 = 3", t: "Then multiply by the percent: 3 × 20 = 60 people." },
      { h: "Tip", v: "💡", t: "Check: 50% should be half of the sample, and 25% should be a quarter." }
    ];
    return { title: "Percent of a sample", make };
  };

  // ================= LEVEL 16 =================
  const L16 = [
    PL("Peer review words", "🔬", "Careful research is checked by other experts before it is printed. These words describe that process.", "If a source is peer reviewed, other experts checked it first.", [
      "peer review::experts check a study before it is published::🧑‍🔬", "journal::a publication that prints research studies::📰", "abstract::a short summary at the start of a research article::📝", "retraction::a notice that a published paper should not be trusted::🚫", "editor::the person who decides what a publication prints::🖊️", "preprint::a study shared before peer review is finished::⏳"
    ], { qd: "Which term fits?", qt: "What does this term mean?" }),
    SC("Retractions and corrections", "🧯", "Good publishers fix mistakes in the open. A correction fixes a small error. A retraction says a whole article should not be trusted.", "A small mistake gets a correction. A work that can no longer be trusted gets a retraction.", "A newspaper fixes a wrong name in a story with a note. That is a correction.", [
      "A newspaper printed the wrong date for an event and then printed a note fixing it. This is a...|correction|retraction|preprint",
      "A journal finds that a study's data were made up and withdraws it. This is a...|retraction|correction|summary",
      "You find a notice saying 'This article has been retracted.' You should...|Not use it as evidence|Cite it as strong proof|Copy its numbers",
      "Why do reliable sites publish corrections?|To fix errors openly|To hide mistakes|To get more clicks",
      "A site never fixes errors and deletes complaints. That is...|A warning sign|A sign of quality|Proof it is true",
      "Search results can still show a retracted paper. What should you look for?|A retraction notice|A bigger font|More ads",
      "A correction usually fixes...|A specific mistake|A whole book|Nothing at all",
      "Before you cite a study, it is smart to check whether it was...|Retracted|Printed in color|Downloaded"
    ]),
    authorsOrder(),
    SC("Topic, question or thesis?", "🎯", "A topic is a subject. A research question asks something you can investigate. A thesis is a one-sentence claim that you will support with evidence.", "A topic is a few words. A question ends with a question mark. A thesis makes a claim.", "'Bees' is a topic. 'How do bees find flowers?' is a question. 'Bees find flowers by smell and by sight.' is a thesis.", [
      "'Volcanoes' is...|a topic|a research question|a thesis",
      "'How do volcanoes affect nearby farms?' is...|a research question|a topic|a thesis",
      "'Volcanic ash helps soil grow crops, but eruptions harm farms more.' is...|a thesis|a topic|a research question",
      "'Does screen time change how teens sleep?' is...|a research question|a thesis|a topic",
      "'Teens who use screens late at night sleep less, so schools should start later.' is...|a thesis|a topic|a research question",
      "'Ocean plastic' is...|a topic|a thesis|a research question",
      "A thesis should be...|A claim you can support with evidence|A fact everyone already knows|A list of sources",
      "Which one needs evidence to defend it?|A thesis|A topic word|A page number"
    ]),
    ageOfSource(),
    PL("Kinds of bias", "⚖️", "Bias is a lean toward one side. It can sneak into a source in different ways. Naming it helps you spot it.", "Ask: who made this, what did they leave out, and how are the words chosen?", [
      "confirmation bias::looking only for facts that match what you already think::🔍", "loaded language::words chosen to stir up strong feelings::🔥", "omission::leaving out facts that do not fit the story::✂️", "sampling bias::studying a group that does not represent everyone::👥", "funding bias::results shaped by who pays for the research::💰", "framing::the way a story is presented to shape how you see it::🖼️"
    ], { qd: "Which kind of bias is this?", qt: "What does this kind of bias mean?" }),
    SC("Cherry-picking and context", "🍒", "Cherry-picking means choosing only the facts or quotes that help one side. Context is the surrounding information that gives a fact its true meaning.", "Ask what was left out, and read the full source around a quote or number.", "A chart that starts at the best month for a claim may hide the months that show the opposite.", [
      "A writer quotes one sentence and leaves out the next one, which reverses its meaning. This is...|Taking it out of context|Good paraphrasing|Peer review",
      "A report shows only the 3 months when sales rose, not the 9 when they fell. This is...|Cherry-picking|Balanced reporting|A citation",
      "To check for context, you can...|Read the full source|Read only the headline|Read only the comments",
      "A chart starts in the best month for the writer's claim. What should you ask?|What do the other months show?|Is the chart colorful?|Who clicked it?",
      "A balanced report...|Includes evidence that does not fit its claim, too|Hides opposite evidence|Uses only one example",
      "A screenshot of a quote has no source. Your best step is to...|Find the original and read around it|Share it|Believe it",
      "'Crime fell 5% this week.' Which context would help most?|How it compares with past months and years|The font size|The author's age",
      "Why can one example mislead?|It may not be typical|It is always false|Examples are banned"
    ]),
    PL("Notes and credits in a paper", "🔗", "Writers show where information came from in several ways. Each way has its own name and place on the page.", "A footnote sits on the same page. An endnote waits at the end.", [
      "footnote::a note at the bottom of the same page::⬇️", "endnote::a note collected at the end of a chapter or book::📚", "in-text citation::a short credit in the sentence, such as an author's name and page::🔗", "bibliography::a list of the sources behind the work, at the end::📋", "superscript number::a small raised number that points to a note::🔢"
    ], { qd: "Which term fits?", qt: "What does this term mean?" }),
    SC("Too big or too small?", "🔭", "A topic can be too broad (too much to cover) or too narrow (too little to find). A good topic fits the length of your project.", "Add a place, a time or a group to narrow a topic. Widen it if you cannot find sources.", "'Sports' is too broad. 'Youth soccer leagues in one city in 1990' might be too narrow. 'How soccer grew in schools' may fit.", [
      "'The history of the world' is...|Too broad for a short report|Just right|Too narrow",
      "'What color socks did one student wear last Tuesday?' is...|Too narrow to research|Too broad|Just right",
      "Which topic fits a five-page report?|How lighthouses helped ships in the 1800s|Everything about the ocean|The whole history of travel",
      "You find 40,000 sources on your topic. You should...|Narrow it down|Read them all|Quit",
      "You find only one source on your topic. You should...|Widen it a little|Make things up|Use no sources",
      "A good way to narrow a topic is to add...|A place, a time or a group|More topics|A longer title",
      "Which topic is the narrowest?|Free diving records set in one year|Sports|Water",
      "Which is a good narrowed version of 'Space'?|How the Moon landings used computers|Space|All the stars"
    ]),
    wordBudget(),
    PL("Open access and paywalls", "🔓", "Not all research is free to read. Some of it sits behind a paywall, and some is open for everyone. Libraries often help you reach paid sources.", "If a paywall blocks you, ask your librarian what the library can get for you.", [
      "open access::research anyone can read free online::🔓", "paywall::a barrier that asks for payment or a subscription::💳", "subscription::a regular payment for access to a service::🔁", "full text::the whole article, not just a summary::📄", "abstract only::just the summary without the whole article::📝", "library access::many libraries pay for databases you can use with a card::🏛️"
    ], { qd: "Which term fits?", qt: "What does this term mean?" }),
    SC("Using AI tools honestly", "🤖", "AI tools can write smoothly and still be wrong, and they can invent sources. Follow your teacher's rules, say when you used a tool, and check every fact in a trusted source.", "Honest use means following the rules, being open about it, and checking the facts.", "If a tool names a book, look it up in the library catalog to see whether it exists.", [
      "An AI tool gives a source with a title and author. What must you do?|Check that the source really exists|Cite it without looking|Trust it because it sounds real",
      "Your teacher says no AI for the essay. You...|Follow the rule|Use it secretly|Use it and hide it",
      "Your teacher allows AI for brainstorming. Honest use means...|Saying how you used it|Hiding it|Copying its whole answer",
      "An AI tool states a surprising statistic. You...|Verify it in a trusted source|Quote it as fact|Round it up",
      "Turning in an AI-written essay as your own work is...|Dishonest|Smart research|Citing",
      "Why can AI tools give wrong answers?|They can produce confident text that is false|They always check libraries|They never use words",
      "A good use of AI, when allowed, is...|Asking for ideas, then researching them yourself|Skipping all reading|Getting a fake citation list",
      "An AI summary lists no sources. It is...|Hard to check, so be careful|Perfect proof|Peer reviewed"
    ]),
    SC("Pick the right chart", "📈", "Different charts tell different stories. A line graph shows change over time. A bar graph compares groups. A pie chart shows parts of a whole. A scatter plot shows how two things relate.", "Ask what the chart must show: change, comparison, parts of a whole or a relationship.", "To show how a town's population changed over 10 years, use a line graph.", [
      "Best chart for showing how a number changes over many months?|Line graph|Pie chart|Map",
      "Best chart for comparing books borrowed in four genres?|Bar graph|Line graph|Timeline",
      "Best chart for showing what share of a budget each item takes?|Pie chart|Line graph|Table of dates",
      "Best chart for showing where libraries are in a state?|Map|Pie chart|Bar graph",
      "Best chart for showing events in the order they happened?|Timeline|Pie chart|Bar graph",
      "Best chart for showing exact numbers people will look up?|Table|Map|Timeline",
      "Best chart for showing how study time relates to quiz scores?|Scatter plot|Pie chart|Timeline",
      "A pie chart works best when...|The slices add up to a whole|There are 40 tiny slices|The numbers have no connection"
    ]),
    SC("Is this person an expert?", "🧑‍🏫", "An expert has training and experience in the exact topic. Being famous or loud does not make someone an expert.", "Look for training, work in the field and the group the person belongs to.", "A bridge engineer is a better expert on bridges than a famous actor.", [
      "Who is the best expert on heart health?|A heart doctor|A famous singer|A video game streamer",
      "Who is best to explain how bridges stay up?|A structural engineer|A celebrity chef|A race car fan",
      "An expert in a field is someone who...|Is trained and experienced in that field|Has many followers|Talks loudly",
      "A famous athlete talks about a new medicine. Is that expertise?|Not necessarily, check their training|Yes, always|Yes, if they smile",
      "To check a writer's credentials, look at...|Their education, work and the group they belong to|Their profile picture|Their username",
      "A heart doctor writes about space rockets. Compared with a rocket scientist, they are...|Less of an expert on that topic|More of an expert|Exactly the same",
      "One person disagrees with most other experts. You should...|Look at what the evidence shows|Pick whoever is louder|Decide with a coin",
      "An anonymous post says 'trust me, I am an expert.' You should...|Look for proof of training|Believe it|Share it"
    ]),
    SC("Look at both sides", "⚖️", "A good researcher reads sources from more than one side of an issue, even when they hope for one answer.", "Read the other side fairly, and search with neutral words.", "Searching 'effects of homework' is fairer than searching 'why homework is awful'.", [
      "Why look at more than one side of an issue?|You understand the evidence better|It makes the work longer|It is only a custom",
      "You find sources that disagree with you. You...|Read them fairly|Throw them away|Pretend they do not exist",
      "A source only says good things about a product it sells. It is...|Likely one-sided|Balanced|Peer reviewed",
      "A fair summary of a debate...|Explains each side accurately|Mocks one side|Skips one side",
      "Which is a fair way to describe the other side?|They argue that this is true, and give this evidence|They are silly|They are all liars",
      "Strong evidence changes your mind. A good researcher...|Updates the conclusion|Hides the evidence|Ignores it",
      "A search for 'proof that X is great' mostly finds...|Pages that agree with X|Balanced results|Only peer-reviewed work",
      "Which search phrase is more balanced?|effects of X|why X is awful|X is amazing proof"
    ]),
    PL("Research tools", "🧰", "Digital tools can keep your research organized. They save time and help you give credit.", "Save the source details the moment you find a source.", [
      "citation manager::a tool that saves sources and builds citations::📋", "bookmark::a saved link that helps you find a page again::🔖", "tag::a label that helps you sort saved items::🏷️", "folder::a place to group related files::📁", "highlight::marking key words in a text to find them later::🖍️", "permalink::a stable link that keeps pointing to the same page::🔗"
    ], { qd: "Which tool or term fits?", qt: "What does this tool or term mean?" }),
    SC("Alt text and access for all", "♿", "Alt text describes an image for people who use screen readers. Captions and transcripts help people who cannot hear audio. Good contrast helps everyone read.", "Ask whether someone who cannot see or hear your work could still get the message.", "A photo of a library shelf could have the alt text 'Rows of books on wooden shelves'.", [
      "Alt text is...|A short description of an image for screen readers|A title for a book|A copyright notice",
      "Captions on a video help people who...|Cannot hear it or have the sound off|Cannot walk|Have no screen",
      "Which alt text is best for a photo of a library shelf?|Rows of books on wooden shelves|Image|Click here",
      "Light yellow text on a white page is hard to read because of...|Low contrast|High contrast|Large size",
      "Why add a transcript to a podcast?|Readers and deaf listeners can use it|It makes the podcast longer|It is a grammar rule",
      "Accessible design helps...|Many different people|Only a few people|No one",
      "A link that says 'click here' is worse than...|A link that names where it goes|A blank link|No link",
      "A chart shows meaning only through red and green colors. A better design also uses...|Labels or patterns|More red|Nothing"
    ]),
    SC("Honesty and consequences", "📜", "Academic honesty means your work is truly yours and your sources are real. Cheating can hurt your grade and other people's trust in you.", "Honest work is your own thinking, real sources and fair credit.", "Reusing your own old paper for a new class without asking is called self-plagiarism.", [
      "Reusing your own old paper for a new class without asking is called...|Self-plagiarism|Peer review|A citation",
      "A school finds copied work. A likely result is...|A lower grade or another consequence|A prize|Nothing ever",
      "You run out of time. The honest choice is to...|Ask your teacher for help or more time|Copy a classmate|Buy an essay",
      "Sharing your answers so a friend can copy them is...|Also academic dishonesty|Teamwork|Kindness",
      "Making up a quote to fit your point is...|Fabrication|Paraphrase|Summary",
      "Making up data for a project is...|Fabrication|Peer review|Neatness",
      "Why does academic honesty matter?|Others can trust your work|It makes you faster|It decorates the page",
      "You cited a source wrongly by accident. You should...|Fix it|Hide it|Delete all your sources"
    ])
  ];

  // ================= LEVEL 17 =================
  const L17 = [
    SC("Numbers or descriptions?", "🔢", "Quantitative data are numbers you can count or measure. Qualitative data are descriptions, such as words, opinions and observations.", "If you can count or measure it, it is quantitative. If it is described in words, it is qualitative.", "The number of books borrowed is quantitative. How a reader describes a book is qualitative.", [
      "The number of books borrowed each week|Quantitative|Qualitative",
      "How students describe their favorite reading spot|Qualitative|Quantitative",
      "Heights of 30 sunflowers in centimeters|Quantitative|Qualitative",
      "Interview answers about why people like audiobooks|Qualitative|Quantitative",
      "A tally of visitors by hour|Quantitative|Qualitative",
      "Notes about what a class did during a lesson, written while watching|Qualitative|Quantitative",
      "Test scores out of 100|Quantitative|Qualitative",
      "Quotes from people about how they feel about the library|Qualitative|Quantitative"
    ]),
    PL("Sampling", "👥", "A researcher usually cannot ask everyone, so they study a smaller group. How that group is chosen matters a lot.", "A sample that is picked at random is usually fairer than a sample that is just easy to reach.", [
      "population::the whole group you want to learn about::🌍", "sample::the smaller group you actually study::🧪", "random sample::a sample where everyone has an equal chance of being picked::🎲", "convenience sample::people who are just easy to reach::🚶", "representative::a sample that mirrors the whole group::⚖️", "sample size::how many people or items are in the sample::🔢"
    ], { qd: "Which term fits?", qt: "What does this term mean?" }),
    marginError(),
    PL("Metadata", "🗂️", "Metadata is data about data. It describes a file, a photo or a catalog record and helps you find and judge things.", "Check an item's metadata for who made it and when.", [
      "metadata::data that describes other data::🗂️", "creation date::when a file was made::📅", "file size::how much storage a file takes::💾", "tag::a label that describes what an item is about::🏷️", "format::the file type, such as PDF or MP3::📄", "creator::the person or group that made the item::🧑"
    ], { qd: "Which term fits?", qt: "What does this term mean?" }),
    SC("Which file format?", "💾", "The ending of a file name shows its format. A PDF keeps a page's layout. A CSV holds data in rows and columns. An MP3 is sound. A JPG is a photo.", "Look at the three letters after the dot.", "A file ending in .mp3 is audio, so a music player opens it.", [
      "Which format holds data in rows and columns that a spreadsheet can open?|CSV|MP3|JPG",
      "Which format usually holds a podcast's sound?|MP3|CSV|PDF",
      "Which format keeps a document looking the same on every device?|PDF|MP3|CSV",
      "Which format is usually a photograph?|JPG|CSV|MP3",
      "A file ending in .html is...|A web page|A song|A photo",
      "A file ending in .mp4 is usually...|A video|A spreadsheet|A text note",
      "A file ending in .csv is...|Data in rows and columns|A song|A photo",
      "A file ending in .docx opens in...|A word processor|A music player|A map"
    ]),
    PL("Read an LC call number", "🏷️", "Many college and large libraries use Library of Congress call numbers. Each line on the label gives part of the book's address.", "Read the lines from top to bottom: letters, number, cutter, year.", [
      "class letters::the first letters, which show the subject area::🔤", "class number::the number after the letters, read as a whole number::🔢", "cutter number::a letter and digits made from the author's or title's name::✍️", "year::often the last line, showing the publication date::📅", "call number::the shelf address of an item::📍"
    ], { qd: "Which term fits?", qt: "What does this term mean?" }),
    citeBuild(),
    SC("Satire and parody", "🎭", "Satire uses humor and exaggeration to comment on real life. A satire site is meant as a joke, but its headlines can be shared without the joke label.", "Check the site's About page and look for absurd details.", "A story called 'Town bans Mondays' from a humor site is satire, not news.", [
      "A news-style site posts 'Town bans Mondays.' Its About page says it is a humor site. This is...|Satire|Breaking news|A scientific study",
      "Why can satire fool people?|Headlines get shared without the joke label|Satire is always true|Satire has no words",
      "A clue that a story is satire is...|Absurd details and a humor label|Many citations to journals|A byline from a scientist",
      "You are unsure if a shocking story is a joke. You...|Check the site's About page and other sources|Share it first|Assume it is real",
      "Satire is meant to...|Entertain and comment through humor|Report exact facts|Sell a product",
      "Is satire a good source for facts in a research paper?|No, it is not meant to be factual|Yes, always|Yes, if it is funny",
      "A parody...|Imitates something for humor|Is peer reviewed|Is a citation",
      "A friend shares a funny headline as if it were real. A kind response is to...|Politely show them it is satire|Make fun of them|Ignore everything"
    ]),
    SC("Follow the money", "💰", "Who pays for research or for a site can shape what it says. A funding disclosure tells you who paid.", "Look for a disclosure or acknowledgments section and ask who benefits.", "A study about a drink paid for by the drink's maker deserves a closer look.", [
      "A study about a sugary drink was paid for by the company that makes it. Best step?|Look for other studies without that tie|Ignore all research|Trust it fully",
      "A funding disclosure tells you...|Who paid for the research|Who read it|How long it is",
      "Funding by a company means the results are...|Worth a closer look, not automatically false|Always false|Always true",
      "A think tank paper does not say who funds it. That makes it...|Harder to judge|Peer reviewed|Official",
      "Where might funding be listed?|In an acknowledgments or disclosure statement|In the index|On the spine",
      "A sponsored article is...|Paid for by an advertiser|Written by a librarian|A primary source",
      "Independent research means...|Not paid for by those who benefit from the result|Written alone|Very short",
      "Several studies by different groups agree. This is...|Stronger evidence than one funded study|Weaker evidence|Meaningless"
    ]),
    SC("Where did the news come from?", "📰", "Many news sites get stories from the same news agency, so ten matching stories may trace back to one report. First-hand reporting means the reporter saw or heard it directly.", "Trace a story back to its original report and check who is named.", "If a story says 'according to reports', look for the original report.", [
      "Ten sites print the same story word for word. This may mean...|They got it from the same news agency|Ten reporters saw it|It was ten different events",
      "First-hand reporting means...|A reporter saw or heard it directly|Copying another site|Guessing",
      "To trace a story, look for...|The original report it links to|The most ads|The longest comments",
      "A story says 'according to reports' and names nothing. You...|Look for the original reporting|Accept it|Share it",
      "A story with named, on-the-record sources is...|Easier to check|Less trustworthy|Unusable",
      "An unnamed source is quoted once with no other support. You should...|Be careful and look for confirmation|Take it as proven|Ignore the topic",
      "A byline tells you...|Who wrote the story|The price|The publisher's address",
      "Why check the date on a news story?|Facts may have changed since it was written|Dates are decoration|It shows the weather"
    ]),
    PL("The information cycle", "⏳", "When something big happens, information about it appears in a pattern: fast and rough first, slower and more checked later.", "Fast sources are good for what just happened. Slower sources are better for depth and checking.", [
      "first hours::social posts and breaking news reports appear::⚡", "next days::news articles add details and quotes::📰", "weeks later::magazines add analysis and background::🗞️", "months later::journal articles report studies::📑", "years later::books give deep, carefully checked coverage::📚", "much later::encyclopedias and textbooks sum up settled knowledge::🎓"
    ], { qd: "When does this usually appear?", qt: "What usually appears at this time?" }),
    PL("Ethical research", "🤝", "Research that involves people must be fair and safe. Always check with your teacher before you ask people for information.", "Respect people: ask first, protect privacy and do no harm.", [
      "informed consent::people agree to take part after learning what will happen::✍️", "confidentiality::keeping people's private information protected::🔒", "anonymous::no one can tell who gave the answers::🎭", "voluntary::people can say no or stop at any time::🚪", "permission::a clear yes from a person or parent when needed::✅", "do no harm::research should not hurt people::🛡️"
    ], { qd: "Which term fits?", qt: "What does this term mean?" }),
    SC("What is a literature review?", "📑", "A literature review summarizes what published research says about a topic. It groups sources by idea and shows what is known and what is still unknown.", "A review connects sources to each other. It does not just list them one by one.", "A review might group ten sources into 'causes', 'effects' and 'solutions'.", [
      "A literature review...|Summarizes what existing sources say on a topic|Collects brand new data|Is a novel",
      "In a literature review, 'literature' means...|Published research and writing on the topic|Only stories|Only poems",
      "Good reviews group sources by...|Theme or idea|Color|Page count",
      "A list of summaries one after another, with no links between sources, is...|Weak, because it does not connect ideas|The best style|Required",
      "A research gap is...|A question existing studies have not answered|A missing page|A broken link",
      "Why read a literature review first?|It maps what is already known|It replaces all sources|It is always short",
      "A synthesis...|Combines ideas from several sources|Copies one source|Lists only titles",
      "A review should say where sources agree and...|Where they disagree|Nothing else|Who is most famous"
    ]),
    SC("Inverted pyramid", "🔻", "News stories usually put the most important facts first, then add details. This is called the inverted pyramid. The opening is the lede.", "Ask who, what, where, when and why, and look for them near the top.", "A reader who stops after the first paragraph should still know the main news.", [
      "In a news story, the most important facts come...|First|Last|In the middle",
      "The lede is...|The opening sentence or two with the key facts|The last paragraph|The photo credit",
      "A reader who stops after the first paragraph should still know...|The main facts|Nothing|The ending",
      "The five Ws are who, what, where, when and...|why|which|wait",
      "Where does extra background usually go in a news story?|Later in the story|In the headline|Nowhere",
      "Details that can be cut from the end without losing the main news fit...|The inverted pyramid|A mystery plot|A poem",
      "Features and essays often...|Build up like a story|Always use the pyramid|Skip all details",
      "A headline should...|Tell the main point of the story accurately|Mislead|Be longer than the story"
    ]),
    SC("Freedom to read", "📚", "Libraries try to offer many viewpoints so that people can choose what to read. Intellectual freedom means people may read, think and ask questions for themselves.", "A library offering a book does not mean it agrees with every idea in it.", "Parents can guide their own children's reading without choosing for every family.", [
      "A library collection tries to include...|Many viewpoints and subjects|Only one opinion|Only the newest books",
      "Intellectual freedom means...|People can choose what they read and think|Everyone must read the same books|Nobody reads",
      "A parent does not want their child to read a book. A fair way is to...|Guide their own child's choices|Remove it for everyone|Hide all books",
      "Libraries add books because they...|Serve many readers' needs and interests|Agree with every idea in them|Dislike other books",
      "Having a book in the library means the library...|Offers it to readers|Agrees with every idea in it|Wrote it",
      "If someone disagrees with a book, one respectful step is to...|Use the library's review process|Tear out pages|Hide copies",
      "Why do libraries keep books on hard topics in history?|People need accurate information to understand the past|To scare people|They like trouble",
      "Choosing books for a collection uses...|Reviews, community needs and a policy|Coin flips|Cover colors"
    ]),
    SC("Privacy at the library", "🔒", "Libraries keep your borrowing records private so you can read freely. You can protect yourself, too, especially on shared computers.", "Treat your card number like a password and always log out.", "Before leaving a shared computer, close your accounts and log out.", [
      "A library keeps the list of books you borrowed...|Private|Posted on the wall|For sale",
      "Another student asks the librarian what you borrowed. The librarian says...|That is private|Sure, here it is|Here is your address",
      "On a shared computer, when you finish you...|Log out and close your accounts|Leave it open|Share your password",
      "A browser offers to save your password on a shared computer. You...|Say no|Say yes|Post it on the screen",
      "Your library card number should be treated like...|A password|A joke|A public sign",
      "A pop-up on a library computer asks you to install a program. You...|Ask the librarian|Install it|Enter your card number",
      "A private browsing window on a public computer...|Still needs you to log out of accounts|Makes you invisible everywhere|Deletes the internet",
      "Why does the library protect records?|So people can read freely without being watched|To hide the books|To save paper"
    ]),
    SC("How search results are ranked", "🔎", "Search engines sort results using many signals, such as how well the page matches your words and how popular it is. The top result is not always the most accurate.", "Look beyond the first result and notice which results are marked as ads.", "A page that is popular is not always true, so check who wrote it.", [
      "The top search result is...|Not always the most accurate|Always the most accurate|Always an ad",
      "Results marked 'Ad' or 'Sponsored' are...|Paid placements|Peer reviewed|Library records",
      "Search engines may rank pages by...|Relevance and popularity signals|Truthfulness alone|Page color",
      "A page with many links pointing to it is...|Popular, which does not prove it is accurate|Always true|Always new",
      "Search engines can show different results to different people because of...|Location and past searches|Magic|The weather only",
      "To see beyond the first results, you can...|Try different words and look further|Stop at the first one|Only click ads",
      "A catchy page with no author that repeats your words may be...|Made to attract clicks|The most trusted|A journal",
      "Searching the same words in a library database and on the open web gives...|Different kinds of results|Identical results|No results"
    ]),
    SC("Answer the other side", "🗣️", "A counterargument is a reason someone might disagree with your claim. A rebuttal answers it with evidence. Fair writers include both.", "Name the best opposing point, then answer it with evidence.", "Some argue that homework helps. However, the evidence in this study shows little change.", [
      "A counterargument is...|A reason someone might disagree with your claim|A fact that agrees with you|A citation",
      "A rebuttal...|Responds to a counterargument with evidence|Repeats your claim louder|Changes the topic",
      "Including the best opposing point makes an essay...|More convincing and fair|Weaker|Shorter always",
      "Which phrase introduces a counterargument?|Some people argue that...|In conclusion...|First of all...",
      "Which phrase starts a rebuttal?|However, the evidence shows...|My name is...|Once upon a time...",
      "Ignoring all opposing views makes writing...|Look one-sided|Unbeatable|Peer reviewed",
      "A strawman is...|Twisting the other side's view to make it easy to defeat|A fair summary|A kind of source",
      "A good rebuttal uses...|Evidence and reasoning|Insults|Capital letters"
    ])
  ];

  // ================= LEVEL 18 =================
  const L18 = [
    PL("Parts of a research proposal", "📝", "A proposal is a plan for a project. It tells your teacher what you will study and how.", "A clear proposal answers: what, why, how and when.", [
      "research question::what you want to find out::❓", "background::what is already known about the topic::📚", "method::how you will collect and study evidence::🔧", "timeline::dates for each step of the project::📅", "source list::the works you plan to rely on::📋", "limitations::things that may limit how far your results apply::⚠️"
    ], { qd: "Which part of a proposal is this?", qt: "What does this part do?" }),
    SC("Pick the method", "🧭", "Different questions need different methods. A survey reaches many people. An interview goes deep. Observation shows what people really do. An experiment tests cause and effect.", "Match the method to what you want to know.", "To learn how many people visit each hour, count them. To learn why they come, ask them.", [
      "To learn how many students use the library each hour, you could...|Count visits by observing|Write a poem|Guess",
      "To learn why students like a book club, you could...|Interview members|Count windows|Check the date",
      "To learn quickly what many people think, you could...|Run a short survey|Interview one person only|Read one blog",
      "To learn about a town in 1900, you could...|Study archives and primary sources|Take a poll today|Interview a first grader",
      "To test whether plants grow faster with more light, you need...|An experiment with a control|A rumor|An opinion poll",
      "Combining a survey and interviews is called...|Using mixed methods|A mistake|Plagiarism",
      "A survey is best for...|Reaching many people with the same questions|Deep personal stories|Testing medicines",
      "Observation is best for...|Seeing what people actually do|Learning secrets|Counting sources"
    ]),
    PL("How strong is the evidence?", "🪜", "Some kinds of evidence are stronger than others. A single story is weaker than a careful test, and a test is weaker than many tests put together.", "The more careful the method and the larger the sample, the stronger the evidence.", [
      "anecdote::one person's story::💬", "case study::a close look at one example or a small group::🔎", "observational study::watching groups without changing anything::👀", "experiment::a test where researchers change one thing and compare::🧪", "systematic review::a study that gathers and weighs many studies on one question::📚", "meta-analysis::a study that combines the numbers from many studies::➕"
    ], { qd: "Which kind of evidence is this?", qt: "What is this kind of evidence?" }),
    pctPoints(),
    SC("Ethics in real cases", "✅", "Respecting people is part of good research. Ask permission, protect privacy, let people stop, and talk to your teacher before you ask anyone for information.", "Choose the answer that protects people and respects their choices.", "If you want to interview a classmate, ask your teacher first and then ask for their permission.", [
      "You want to interview a classmate for a project. First you should...|Ask your teacher and then ask permission|Record secretly|Post their answers with their name",
      "A survey question could upset people or identify them. A better approach is to...|Avoid it or change it|Ask anyway|Publish names",
      "Participants should be able to...|Stop at any time|Never leave|Be forced to finish",
      "You want to use a photo of a person in your project. You need...|Their permission|Nothing|A secret camera",
      "Someone you interviewed asks you not to use their name. You...|Respect that|Use it anyway|Share it with friends",
      "Data with names removed is...|More private|Illegal|Useless",
      "Research that involves children needs...|Extra care and permission from a parent or teacher|No rules|Secret recording",
      "If your plan could hurt someone, you should...|Change the plan|Go ahead|Hide it"
    ]),
    PL("The rhetorical situation", "🎤", "Every piece of writing or speaking has a situation around it. Knowing the situation helps you make good choices.", "Before you write, ask who it is for and what you want it to do.", [
      "audience::the people who will read or listen::👥", "purpose::what you want the work to do::🎯", "context::the time, place and issue around the work::🌍", "genre::the kind of work, such as a report or speech::📄", "tone::the attitude shown by your word choices::🎚️", "medium::the way it is delivered, such as print, video or slides::📺"
    ], { qd: "Which term fits?", qt: "What does this term mean?" }),
    SC("Citing tricky sources", "🧩", "Some sources are harder to cite: charts, interviews, data, videos and quotes found inside another source. The rule is the same: give the creator, the title, where you found it and the date.", "Give your reader enough to find what you used.", "For a chart in a report, cite the report where you found the chart.", [
      "You use a chart from a report. You cite...|The report where you found the chart|Nothing|Only the chart's colors",
      "For an interview you did yourself, you include...|The person's name, the date and that it was an interview|Their home address|Nothing",
      "A video has no listed author. You can start the citation with...|The title or the channel|Your name|Random words",
      "You use a dataset from a government site. You cite...|The agency, dataset title, date and where to find it|Nothing, since data is free|The font",
      "A quote you found inside another book is cited by...|Saying who was quoted and which book you read it in|Pretending you read the original|Leaving it out",
      "A web page shows no date. You can write...|n.d. (no date) or the date you looked at it|A made-up date|Nothing",
      "A photo from a museum site needs...|Credit to the museum and the creator if listed|No credit|Only the word 'internet'",
      "Two works by the same author in one list are ordered...|By title after the author's name|Randomly|By length"
    ]),
    SC("Make a thesis stronger", "✏️", "A strong thesis is specific and arguable. It tells your reader your main claim and, often, your reasons. A plain fact or a topic is not a thesis.", "Ask whether someone could reasonably disagree and whether it is specific.", "'Libraries are good' becomes stronger as 'Public libraries help towns by giving free access to books, computers and classes.'", [
      "Which thesis is strongest?|Public libraries help towns by giving free access to technology, books and classes.|Libraries are good.|This paper is about libraries.",
      "Which is a weak thesis?|This essay will talk about space.|Space programs have led to inventions used on Earth.|Private space companies have lowered launch costs.",
      "A good thesis is...|Specific and arguable|A plain fact|Just a title",
      "'Dogs are mammals.' is a weak thesis because...|It is a plain fact nobody argues about|It is too detailed|It is too long",
      "Which revision makes 'Recycling is good' stronger?|Town recycling programs reduce landfill waste and save money.|Recycling is really, really good.|Recycling is nice.",
      "A thesis usually appears...|In the introduction|Only in the sources list|Never",
      "Your evidence does not support your thesis. You should...|Revise the thesis|Change the evidence to fit|Delete your sources",
      "Which thesis is arguable?|Schools should teach research skills every year.|Schools have teachers.|Books have pages."
    ]),
    PL("Data and repositories", "🗄️", "Researchers often share their data so others can check it and use it again. Knowing the words helps you find and read data.", "Always read the data dictionary, so you know what each column means.", [
      "dataset::an organized collection of data::📊", "repository::a place where data or papers are stored for sharing::🏛️", "open data::data anyone can use freely::🔓", "data dictionary::a guide that explains what each column or code in a dataset means::📖", "raw data::data as it was first collected, before cleaning::🧱", "cleaned data::data with errors and gaps fixed::🧹"
    ], { qd: "Which term fits?", qt: "What does this term mean?" }),
    SC("Poster or talk", "🖼️", "A strong presentation has one clear message, few words, labeled visuals and credited sources. Practice makes it smoother.", "Make it easy for the audience to understand in a few seconds.", "A slide with a clear title and one labeled chart beats a slide full of tiny text.", [
      "A good poster has...|A clear title, short text and labeled visuals|Paragraphs of tiny text|No title",
      "On a slide, aim for...|Few words and a clear image|A full page of text|Random clip art",
      "When presenting, you should...|Look at the audience and explain in your own words|Read every word|Whisper",
      "Where do sources go in a talk?|On a sources slide and in spoken mentions|Nowhere|Hidden",
      "A chart for a poster should have...|A title and labeled axes|No labels|Only rainbow colors",
      "If asked a question you cannot answer, you can say...|I am not sure, but I can look into that|Something made up|Nothing",
      "Practicing out loud helps you...|Check timing and clear wording|Skip research|Memorize all sources",
      "The key message should be...|Easy to say in one or two sentences|Hidden|Ten points long"
    ]),
    SC("Give and use feedback", "💬", "Feedback from others helps your work grow. Helpful feedback is specific and kind. When you get it, listen first, then decide what to change.", "Good feedback points to a place and suggests a next step.", "'Your second paragraph needs a source for the statistic' is helpful feedback.", [
      "Helpful feedback is...|Specific and kind|Vague|Harsh",
      "Which comment is most helpful?|Your second paragraph needs a source for the statistic.|It is bad.|I do not like it.",
      "When you get feedback, first...|Listen and think|Argue|Delete your work",
      "Feedback you disagree with is...|Still worth considering|Always to be ignored|Always to be copied",
      "A good question to ask a reviewer is...|Is my main point clear?|Do you hate it?|Who cares?",
      "After feedback, you...|Revise and check again|Never touch it again|Throw it away",
      "Praise plus a suggestion is...|A balanced comment|Rude|Useless",
      "Where should you save drafts?|As dated versions so you can compare|Only in one file written over each time|Nowhere"
    ]),
    PL("Can the result be repeated?", "🔁", "Good science can be checked. Other researchers should be able to follow the steps and see whether the results hold up.", "Clear steps and enough people in the study make a result easier to trust.", [
      "replication::repeating a study to see whether the results hold up::🔁", "reproducible::others can follow the same steps and get similar results::✅", "control group::the group that does not get the change, used for comparison::⚖️", "double-blind::neither the participants nor the researchers measuring know who gets which treatment::🙈", "variable::something that can change in a study::🔀", "sample size::how many are tested; bigger samples give steadier results::🔢"
    ], { qd: "Which term fits?", qt: "What does this term mean?" }),
    SC("Read an old source", "🕰️", "Old sources are valuable, but they belong to their time. Words change meaning, attitudes were different, and knowledge has grown. Ask who made it, when and why.", "Read old sources as evidence of their time and compare them with other sources.", "A diary from 1850 tells us what one person saw, not what everyone saw.", [
      "A letter from 1850 uses words in unfamiliar ways. You should...|Learn what the words meant then|Assume the writer was silly|Skip it",
      "An old source shows attitudes we now see as unfair. A researcher...|Reads it as evidence of its time and treats it carefully|Pretends it is modern|Ignores the context",
      "Who wrote it and why matter because...|They shape what was included|Dates are random|Handwriting decides",
      "A 1900 science book says something later shown to be wrong. This shows...|Knowledge changes, so check dates|Science is fake|Books always lie",
      "To understand an old map, look at...|Its date, maker and purpose|Only the colors|The frame",
      "An old newspaper reported a rumor as a fact. To check, use...|Other sources from the time and later research|Only that paper|Nothing",
      "A translated source can change meaning, so check...|Who translated it and when|The font|The weather",
      "A diary is a primary source, but it shows...|One person's view|Everyone's view|The final truth"
    ]),
    SC("Keep your files safe", "💽", "Digital files can be lost or become unreadable. Saving copies in more than one place and in common formats keeps your research safe for years.", "Keep more than one copy, in more than one place, in a common format.", "Save your project in a common format on your school drive and on a backup drive.", [
      "To keep a file readable for years, save it in...|A common format and in more than one place|One USB stick only|A rare format",
      "A simple backup rule is 3 copies...|On 2 kinds of storage, with 1 kept in another place|All in one folder|None",
      "Descriptive file names help because...|You can find files later|They are needed to open files|They make files smaller",
      "Links in your sources list can break. You should record...|The date you visited and, if you can, a saved copy|Nothing|Only the link text",
      "Old file formats become hard to open because...|Software changes over time|Files run away|Pixels expire",
      "Backing up means...|Making a copy in another place|Deleting a file|Renaming a file",
      "Archives save things for...|Future researchers|Only today|No one",
      "A cloud account as the only copy of a file is...|Risky if you lose the account|Perfectly safe|Illegal"
    ]),
    pctSample(),
    SC("Conflicts of interest", "🧩", "A conflict of interest happens when someone could gain from a result. Honest people tell readers about it so they can judge for themselves.", "Ask who could gain, and whether they said so.", "A reviewer rating a friend's book should say they are friends.", [
      "A reviewer rates a book written by their best friend. This is a...|Conflict of interest|Peer review|Citation",
      "The best way to handle a conflict of interest is to...|Disclose it|Hide it|Ignore it",
      "A doctor paid by a drug company recommends its drug. Readers should know about...|The payment|Her shoe size|Her car",
      "A website reviews products and earns money from sales through its links. This is...|Worth disclosing|Irrelevant|Impossible",
      "Why disclose a conflict of interest?|So readers can weigh the information|To bore readers|To earn fines",
      "A student is asked to judge a contest their sibling entered. They should...|Step aside|Judge anyway|Keep it quiet",
      "A statement like 'The author has no financial ties' is a...|Disclosure|Index|Citation",
      "A disclosed conflict means the information should be...|Checked more carefully|Always false|Always true"
    ]),
    SC("Plan the final project", "🗓️", "A big project works best in small steps: ask, search, read, take notes, draft, revise, present. Plan backward from the due date and leave a spare day.", "Put the steps in order and attach dates to them.", "With a due date of the 30th, you might plan to finish the draft by the 22nd.", [
      "Which step comes first?|Choose a question|Present|Proofread",
      "Which step comes right after finding sources?|Read and take notes|Proofread|Present",
      "Which step comes just before presenting?|Practice and proofread|Choose a topic|Search",
      "When do you build your works cited?|Throughout, as you take notes|Never|Only at the last minute",
      "If you are behind schedule, you should...|Talk to your teacher early|Copy something|Hide it",
      "Backward planning starts with...|The due date|The first source|The weather",
      "A buffer day is for...|Fixing surprises|Extra fun|Skipping steps",
      "A big project is easier when you break it into...|Small steps with dates|One giant task|Nothing"
    ]),
    SC("Say what you can claim", "🧭", "Honest researchers claim only as much as their evidence supports. Cautious words like 'suggests' fit when evidence points toward an answer but does not settle it.", "Match the strength of your words to the strength of your evidence.", "A small survey 'suggests' a trend. It does not 'prove' it for everyone.", [
      "A study of 20 students in one school cannot prove...|What all students everywhere do|That the study happened|Anything at all",
      "Words like 'suggests' are used when evidence...|Points toward a conclusion but is not final|Is completely certain|Is missing",
      "A good conclusion...|Matches what the evidence can support|Claims more than the evidence shows|Adds random new facts",
      "Which sentence is more careful?|The data suggest that most students prefer it.|This proves everyone loves it.|Obviously everyone knows it.",
      "Limitations are...|Things that limit how far your results apply|Mistakes to hide|Citations",
      "Saying 'more research is needed' shows...|There are still open questions|You did not try|Nothing",
      "A small, non-random sample limits...|How far you can generalize|Nothing|The font",
      "Admitting limits makes your work...|More trustworthy|Worse|Unfinished"
    ])
  ];

  Object.assign(LIBRARY_LEVELS, {
    16: lvl(16, L16, [0, 1, 3, 5, 6, 7, 10, 12]),
    17: lvl(17, L17, [0, 1, 3, 4, 7, 8, 10, 15]),
    18: lvl(18, L18, [1, 2, 4, 5, 8, 12, 13, 15])
  });
})();
