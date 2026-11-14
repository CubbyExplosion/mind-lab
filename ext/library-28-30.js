// ext/library-28-30.js  Mind Lab Library & Research, levels 28-30 (60 lessons): upper-level research methods, scholarly communication, information organization and retrieval, data curation, digital humanities, research ethics and open science
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
  const NUM = (title, gen, slides) => { const make = gen; make.teach = () => slides; return { title, make }; };

  // ---------- numeric makers (no people names are built anywhere in this file) ----------
  const setCounts = () => NUM("Search sets: AND, OR, NOT", () => {
    const a = ri(30, 90), b = ri(25, 80), c = ri(5, Math.min(a, b) - 5), r = Math.random();
    if (r < 0.34) return {
      text: `Search A finds <b>${a}</b> records and search B finds <b>${b}</b>. <b>${c}</b> records are in both. How many records does <b>A OR B</b> return?`, visual: "🔎", answer: a + b - c,
      hints: ["OR returns a record if it is in either set, but each record is counted once.", "Records in both sets were counted twice when you added the sets, so take the overlap away once.", "Example: A has 40, B has 30, 10 are in both. 40 + 30 − 10 = 60 records. Now do yours."]
    };
    if (r < 0.67) return {
      text: `Search A finds <b>${a}</b> records and search B finds <b>${b}</b>. <b>${c}</b> records are in both. How many records does <b>A NOT B</b> return?`, visual: "🔎", answer: a - c,
      hints: ["NOT keeps records from A and throws out any that are also in B.", "Start with the size of A and remove the records that overlap with B.", "Example: A has 50, 12 of them are also in B, so A NOT B is 50 − 12 = 38. Now do yours."]
    };
    return {
      text: `Search A finds <b>${a}</b> records and search B finds <b>${b}</b>. Together <b>A OR B</b> returns <b>${a + b - c}</b>. How many records are in <b>both</b> sets?`, visual: "🔎", answer: c,
      hints: ["If you add A and B, any record in both is counted twice.", "Add A and B, then compare that sum with the OR total. The gap is the overlap.", "Example: A is 40, B is 30, A OR B is 62. 40 + 30 = 70, and 70 − 62 = 8 are in both. Now do yours."]
    };
  }, [
    { h: "Sets of results", v: "A ∩ B  ·  A ∪ B", t: "Each search makes a <b>set</b> of records. <b>AND</b> keeps the overlap, <b>OR</b> joins the sets, and <b>NOT</b> removes one set from another." },
    { h: "Counting without double counting", v: "A + B − both", t: "A OR B = A + B − overlap. A record in both sets must be counted only once." },
    { h: "Tip", v: "💡", t: "A Venn diagram makes the three regions easy to see: only A, only B and both." }
  ]);

  const prismaNum = () => NUM("Counts in a review flow", () => {
    const n = ri(30, 150) * 10, d = ri(3, 20) * 10, s = ri(5, Math.floor((n - d - 30) / 5)) * 5, e = ri(2, 6) * 5;
    if (Math.random() < 0.5) return {
      text: `A review finds <b>${n}</b> records. <b>${d}</b> are duplicates and are removed. How many records are left to screen?`, visual: "🧾", answer: n - d,
      hints: ["Duplicates are extra copies of the same record, so they are taken out.", "Subtract the duplicates from the records found.", "Example: 500 found, 40 duplicates, 500 − 40 = 460 left. Now do yours."]
    };
    return {
      text: `A review finds <b>${n}</b> records. After removing <b>${d}</b> duplicates, <b>${s}</b> are excluded by title and abstract, and <b>${e}</b> more are excluded after reading the full text. How many studies are included?`, visual: "🧾", answer: n - d - s - e,
      hints: ["Each step removes records, so the number only goes down.", "Subtract the duplicates, then the title-and-abstract exclusions, then the full-text exclusions.", "Example: 600 found, 50 duplicates, 400 screened out, 20 excluded in full text. 600 − 50 − 400 − 20 = 130. Now do yours."]
    };
  }, [
    { h: "A review flow", v: "found → screened → included", t: "Systematic reviews report how many records were found, removed and kept at every step. Readers can then check your work." },
    { h: "Subtract at each step", v: "500 − 40 = 460", t: "Start with all records. Remove duplicates, then those excluded by title and abstract, then those excluded after full-text reading." },
    { h: "Tip", v: "💡", t: "Write the count after every step. The last number is the studies you actually include." }
  ]);

  const precisionN = () => NUM("Precision of a search", () => {
    const N = pick([10, 20, 25, 50, 100]), R = ri(1, N - 1), p = R * 100 / N, r = Math.random();
    if (r < 0.5) return {
      text: `A search returns <b>${N}</b> results and <b>${R}</b> of them are relevant. What is the <b>precision</b>, as a percent?`, visual: "🎯", answer: p,
      hints: ["Precision asks: of the results I got, how many were useful?", "Divide the relevant results you got by all the results returned, then multiply by 100.", "Example: 20 results with 5 relevant is 5 ÷ 20 = 0.25, so 25%. Now do yours."]
    };
    if (r < 0.8) return {
      text: `A search returns <b>${N}</b> results. Its precision is <b>${p}%</b>. How many results are relevant?`, visual: "🎯", answer: R,
      hints: ["Precision is the share of returned results that are relevant.", "Find that percent of the number returned.", "Example: 40 results at 50% precision means 50% of 40 = 20 relevant. Now do yours."]
    };
    return {
      text: `A search returns <b>${N}</b> results and <b>${R}</b> are relevant. How many results are <b>not</b> relevant?`, visual: "🎯", answer: N - R,
      hints: ["Every returned result is either relevant or not.", "Take the relevant ones away from the total returned.", "Example: 30 returned, 12 relevant, 30 − 12 = 18 not relevant. Now do yours."]
    };
  }, [
    { h: "Precision", v: "relevant found ÷ results", t: "<b>Precision</b> measures how clean your results are: what share of the results you got are relevant?" },
    { h: "Worked example", v: "5 ÷ 20 = 25%", t: "If a search returns 20 results and 5 are relevant, precision is 25%." },
    { h: "Tip", v: "💡", t: "Adding specific terms or limits usually raises precision, but it may lower recall (next lesson)." }
  ]);

  const recallN = () => NUM("Recall of a search", () => {
    let T, R, p;
    do { T = pick([10, 20, 25, 40, 50, 100]); R = ri(1, T - 1); p = R * 100 / T; } while (!Number.isInteger(p));
    const r = Math.random();
    if (r < 0.5) return {
      text: `A collection has <b>${T}</b> relevant documents in all. Your search finds <b>${R}</b> of them. What is the <b>recall</b>, as a percent?`, visual: "🧲", answer: p,
      hints: ["Recall asks: of all the relevant documents that exist, how many did I find?", "Divide the relevant documents you found by all the relevant documents that exist, then multiply by 100.", "Example: 20 exist, 15 found, 15 ÷ 20 = 0.75, so 75%. Now do yours."]
    };
    if (r < 0.8) return {
      text: `A collection has <b>${T}</b> relevant documents in all. Your search finds <b>${R}</b> of them. How many relevant documents did it <b>miss</b>?`, visual: "🧲", answer: T - R,
      hints: ["The missed ones are relevant documents your search did not return.", "Take the ones you found away from the total that exist.", "Example: 50 exist, 35 found, 50 − 35 = 15 missed. Now do yours."]
    };
    return {
      text: `Your search found <b>${R}</b> relevant documents. That is a recall of <b>${p}%</b>. How many relevant documents exist in all?`, visual: "🧲", answer: T,
      hints: ["The documents you found are only a part of all that exist.", "Divide the number found by the recall (as a decimal).", "Example: 12 found at 60% recall means 12 ÷ 0.6 = 20 exist. Now do yours."]
    };
  }, [
    { h: "Recall", v: "found ÷ all relevant", t: "<b>Recall</b> measures completeness: of all the relevant documents that exist, what share did you find?" },
    { h: "Worked example", v: "15 ÷ 20 = 75%", t: "If 20 relevant documents exist and you found 15, your recall is 75%." },
    { h: "Trade-off", v: "⚖️", t: "Broad searches raise recall but lower precision. Narrow searches do the opposite. Reviews often aim for high recall." }
  ]);

  const indexCons = () => NUM("Do indexers agree?", () => {
    let a, b, c, u, p;
    do { a = ri(6, 20); b = ri(6, 20); c = ri(2, Math.min(a, b)); u = a + b - c; p = c * 100 / u; } while (!Number.isInteger(p));
    if (Math.random() < 0.6) return {
      text: `Indexer A picks <b>${a}</b> subject terms for an article and indexer B picks <b>${b}</b>. They share <b>${c}</b> terms. How many different terms were chosen by <b>either</b> indexer?`, visual: "🏷️", answer: u,
      hints: ["Terms both indexers chose should be counted once.", "Add the two lists, then take the shared terms away once.", "Example: 8 and 10 terms with 4 shared: 8 + 10 − 4 = 14 different terms. Now do yours."]
    };
    return {
      text: `Two indexers choose subject terms for one article. Together they used <b>${u}</b> different terms and <b>${c}</b> of those were chosen by both. What is the <b>consistency</b> (shared ÷ different terms), as a percent?`, visual: "🏷️", answer: p,
      hints: ["Consistency compares the shared terms with all the different terms used.", "Divide the shared terms by the total number of different terms, then multiply by 100.", "Example: 20 different terms, 5 shared, 5 ÷ 20 = 0.25, or 25%. Now do yours."]
    };
  }, [
    { h: "Indexing consistency", v: "shared ÷ different", t: "Two people describing the same article often pick different subject terms. <b>Consistency</b> measures how much they agree." },
    { h: "Worked example", v: "5 ÷ 20 = 25%", t: "If 20 different terms were used and 5 were chosen by both indexers, consistency is 25%." },
    { h: "Why it matters", v: "📚", t: "Controlled vocabularies and clear guidelines raise consistency, which makes searching more reliable." }
  ]);

  const wordFreq = () => NUM("Word frequency per 1000", () => {
    const W = pick([2000, 4000, 5000, 8000, 10000, 20000]), k = ri(2, 15), c = k * W / 1000;
    if (Math.random() < 0.6) return {
      text: `A word appears <b>${c}</b> times in a corpus of <b>${W}</b> words. How many times is that <b>per 1000 words</b>?`, visual: "🔤", answer: k,
      hints: ["Per 1000 words means the rate for every block of 1000 words.", `First work out how many blocks of 1000 words the corpus holds, then divide the count by that number.`, "Example: 12 times in 4000 words is 4 blocks, and 12 ÷ 4 = 3 per 1000. Now do yours."]
    };
    return {
      text: `A word occurs <b>${k}</b> times per 1000 words. About how many times would it appear in a text of <b>${W}</b> words?`, visual: "🔤", answer: c,
      hints: ["The rate repeats for every block of 1000 words.", "Find how many blocks of 1000 words the text holds, then multiply by the rate.", "Example: 5 per 1000 in a 6000-word text is 6 blocks, and 5 × 6 = 30. Now do yours."]
    };
  }, [
    { h: "Fair comparisons of texts", v: "per 1000 words", t: "Long texts contain more of every word. In text mining we compare <b>rates</b> such as occurrences per 1000 words." },
    { h: "Worked example", v: "12 ÷ 4 = 3", t: "A word that appears 12 times in 4000 words occurs 3 times per 1000 words." },
    { h: "Tip", v: "💡", t: "Rates let you compare a short letter with a long novel fairly." }
  ]);

  const scanTime = () => NUM("Digitization time", () => {
    if (Math.random() < 0.6) {
      let p, s, m;
      do { p = ri(3, 40) * 10; s = pick([6, 10, 12, 15, 20, 30]); m = p * s / 60; } while (!Number.isInteger(m));
      return {
        text: `A project scans <b>${p}</b> pages. Each page takes <b>${s}</b> seconds to scan. How many <b>minutes</b> will the scanning take?`, visual: "🖨️", answer: m,
        hints: ["Find the total seconds first, then change to minutes.", "Multiply pages by seconds per page, then divide by 60.", "Example: 120 pages at 30 seconds each is 3600 seconds, and 3600 ÷ 60 = 60 minutes. Now do yours."]
      };
    }
    const s = pick([10, 12, 15, 20, 30]), m = ri(2, 20) * 5, p = m * 60 / s;
    return {
      text: `A scanner takes <b>${s}</b> seconds per page. In <b>${m}</b> minutes, how many pages can it scan?`, visual: "🖨️", answer: p,
      hints: ["Change the minutes into seconds first.", "Multiply minutes by 60, then divide by the seconds each page takes.", "Example: 10 minutes at 20 seconds per page is 600 seconds, and 600 ÷ 20 = 30 pages. Now do yours."]
    };
  }, [
    { h: "Plan digitization", v: "pages × seconds", t: "Digitizing a collection takes time. Estimate it before you start so you can plan staff and deadlines." },
    { h: "Worked example", v: "3600 ÷ 60 = 60", t: "120 pages at 30 seconds each is 3600 seconds, which is 60 minutes." },
    { h: "Tip", v: "💡", t: "Add time for handling fragile items, quality checks and metadata, not only for scanning." }
  ]);

  // ================= LEVEL 28 =================
  const L28 = [
    setCounts(),
    PL("Research paradigms", "🧭", "A <b>paradigm</b> is a set of beliefs about what knowledge is and how to study it. Your paradigm shapes the questions you ask and the methods you pick.", "Ask: what counts as knowledge here, and what do I believe is real?", [
      "Positivism::The view that knowledge comes from measurable, observable facts::📏",
      "Interpretivism::The view that people build meaning, so research studies their views and context::🗣️",
      "Pragmatism::Choose whatever methods best answer the question::🛠️",
      "Critical theory::An approach that asks who holds power and how research can lead to fairer change::⚖️",
      "Epistemology::The study of what counts as knowledge and how we know::🧠",
      "Ontology::The study of what exists and what is real::🌍",
      "Methodology::The reasoning behind your choice of methods, not just the tools::🧭",
      "Constructivism::The idea that people actively build their own understanding::🧱"
    ]),
    SC("Choosing a research design", "🧪", "A <b>design</b> is the overall plan of a study. The question you ask points to the design that fits best.", "Match the wording of the question (cause, change over time, deep meaning, snapshot) to the design built for it.", "A question about how one person experienced a rare event calls for an in-depth look, not a giant poll.", [
      "You want to know whether a new tutoring program causes better grades, and you can assign students at random. Best design?|randomized controlled trial|ethnography|content analysis",
      "You want to follow the same group of graduates for ten years. Best design?|longitudinal study|one-time quiz|focus group",
      "You want a quick snapshot of study habits of first-year and fourth-year students this month. Best design?|cross-sectional survey|ten-year follow-up|single-person diary",
      "You want rich detail on how a few teachers experience a new rule. Best design?|in-depth interviews|huge online poll|randomized trial",
      "You cannot ethically expose people to a harm, but want to compare those already exposed with those not exposed. Best design?|observational cohort study|trial that exposes people|no study at all",
      "You want to understand one unique event, such as how one library handled a flood, in depth. Best design?|case study|large random sample|laboratory experiment",
      "You want to find themes in 500 old newspaper editorials. Best design?|content analysis|randomized trial|blood test",
      "You want to see how loans changed in one town using 30 years of old records. Best design?|historical records analysis|one-day survey|taste test"
    ]),
    PL("Kinds of validity", "🎯", "<b>Validity</b> asks whether a study measures and shows what it claims to. There are several kinds, and each answers a different worry.", "Match the worry (cause? other settings? the right idea measured?) to the kind of validity.", [
      "Internal validity::How well a study shows that the cause really produced the effect::🔬",
      "External validity::How well the results apply to other people and places::🌐",
      "Construct validity::Whether a measure really captures the idea it claims to measure::📐",
      "Content validity::Whether a test covers all parts of the topic::📚",
      "Criterion validity::Whether a measure agrees with an outside standard::🎯",
      "Face validity::Whether a measure looks reasonable at first glance::👀",
      "Test-retest reliability::Getting similar scores when the same test is given again::🔁",
      "Inter-rater reliability::Different observers giving similar scores::🤝"
    ]),
    SC("Who answers, and who doesn't?", "📮", "Even a careful survey can mislead if some people are missing or answer unfairly. Naming the kind of <b>bias</b> helps you spot and report it.", "Ask who is left out, who chose to answer, and whether people answered honestly.", "A poll posted only on a gym's door tends to miss people who never go to the gym.", [
      "A survey about library use is posted only at the library door. The problem is...|selection bias, because non-users are missed|too many questions|no title",
      "Only upset customers fill out a long complaint form. This is...|self-selection (volunteer) bias|random sampling|a control group",
      "Studying only companies that survived, ignoring those that failed, is...|survivorship bias|careful sampling|replication",
      "Many people sent a survey never reply. If they differ from those who do, this is...|nonresponse bias|measurement of height|peer review",
      "A phone-only poll leaves out people without phones, causing...|undercoverage|perfect coverage|replication",
      "People answering to look good instead of honestly is...|social desirability bias|survivorship bias|selection bias",
      "A researcher notices only results that match their hopes. This is...|confirmation bias|random error|sample size",
      "A larger random sample mostly helps reduce...|random sampling error|every kind of bias|the need for ethics"
    ]),
    PL("Kinds of literature reviews", "📚", "Reviews differ in their purpose and in how strict their method is. Naming the type tells readers what to expect.", "Think about purpose (summary, map, combine numbers) and how strict the method is.", [
      "Narrative review::A broad summary that tells the story of a topic, often without a strict method::📖",
      "Systematic review::A review with a set protocol, full searches and clear rules for choosing studies::🧾",
      "Scoping review::A review that maps what research exists on a broad topic::🗺️",
      "Meta-analysis::A review that combines results from several studies with statistics::➕",
      "Integrative review::A review that blends different kinds of evidence into new ideas::🧩",
      "Rapid review::A faster, simpler review with some shortcuts to meet a deadline::⏱️",
      "Umbrella review::A review of reviews::☂️",
      "Critical review::A review that judges strengths and weaknesses and argues a position::🧐"
    ]),
    prismaNum(),
    PL("Effect sizes and intervals", "📏", "A result can be \"significant\" but tiny. Good researchers report how <b>big</b> an effect is and how <b>certain</b> they are.", "Ask: how large? how uncertain? could unpublished studies be hiding?", [
      "Effect size::How big a difference or relationship is, not just whether it exists::📏",
      "Confidence interval::A range of values that likely includes the true value::↔️",
      "Cohen's d::An effect size that tells how many standard deviations apart two group means are::📐",
      "Odds ratio::A number that compares the odds of an outcome in two groups::⚖️",
      "Statistical power::The chance a study will detect a real effect::🔋",
      "Heterogeneity::Differences in results between studies being combined::🌈",
      "Funnel plot::A chart used to look for signs of publication bias::🔻",
      "Publication bias::The tendency to publish positive results more than null ones::📰"
    ]),
    PL("Qualitative traditions", "💬", "Qualitative research has several traditions, each with its own purpose and ways of collecting data.", "Match the tradition to its main focus: a community, an experience, a theory, a story, or language.", [
      "Ethnography::Studying a group by spending time inside its community::🏘️",
      "Phenomenology::Exploring how people experience a particular event::💭",
      "Grounded theory::Building a theory step by step from the data itself::🌱",
      "Case study::A close look at one person, group, place or event::🔍",
      "Narrative inquiry::Studying the stories people tell about their lives::📜",
      "Discourse analysis::Studying how language is used in speech or text::🗣️",
      "Content analysis::Counting and coding themes in texts or media::🗂️",
      "Action research::Studying a problem while working to fix it in practice::🔧"
    ]),
    SC("Using data someone else collected", "🗃️", "<b>Secondary data analysis</b> means studying a dataset that someone else gathered. It saves time but needs care.", "Think about what you must read, follow and credit before using any existing dataset.", "Before using a national survey file, read its codebook so you know what each code means.", [
      "Secondary data analysis means...|using data someone else collected|collecting data twice|studying only second-year students",
      "Before using an existing dataset, read its...|codebook and documentation|cover only|price tag only",
      "A benefit of secondary data is that it...|saves time and may offer large samples|lets you control every question asked|needs no citation",
      "A limit of secondary data is that it...|may not measure exactly what you want|is always wrong|can never be cited",
      "If a dataset has a license or use agreement, you should...|follow its terms|ignore it|delete it",
      "When you use someone's dataset, you should...|cite it|claim you collected it|hide the source",
      "Survey data may include weights. They are used to...|adjust the sample to better match the population|make files smaller|rename columns",
      "Before analysis, check how the original team handled...|missing values and coding|the cover color|their lunch break"
    ]),
    PL("Theory and frameworks", "🏛️", "Research is built on ideas. A <b>framework</b> shows which ideas guide your study and how they connect.", "Ask: what idea guides me, what do I measure, and what are the limits?", [
      "Theory::An organized explanation of how and why something happens::🧠",
      "Conceptual framework::A map of the main ideas in your study and how you think they connect::🗺️",
      "Theoretical framework::The existing theory that guides your study's questions and analysis::🏛️",
      "Construct::An abstract idea, like motivation, that researchers study::💭",
      "Operational definition::A statement of exactly how a construct will be measured::📐",
      "Assumption::Something taken as true without being tested::☝️",
      "Scope::The boundaries of what a study covers::🔲",
      "Model::A simplified picture or equation of how a system works::🧮"
    ]),
    PL("Peer review models", "🔍", "Journals run peer review in different ways. Each model tries to balance fairness, openness and quality.", "Ask who knows whose name, and when the review happens.", [
      "Single-blind review::Reviewers know the authors, but authors do not know the reviewers::🕶️",
      "Double-blind review::Neither authors nor reviewers know each other's names::🙈",
      "Open peer review::Review reports or reviewer names are made public::📢",
      "Registered report::The plan is reviewed and accepted before the data are collected::📝",
      "Post-publication review::Experts comment on a paper after it is published::💬",
      "Desk rejection::An editor turns down a paper before sending it to reviewers::🚪",
      "Reviewer report::A written evaluation with comments and a recommendation::📄",
      "Editorial decision::The editor's final choice such as accept, revise or reject::⚖️"
    ]),
    SC("Proposals and budgets", "💼", "A research <b>proposal</b> asks others to support your project. Reviewers want a clear aim, a realistic plan and a fair budget.", "Think about what convinces reviewers that the project matters and can be finished.", "A timeline with milestones and some spare time shows reviewers you have planned for delays.", [
      "A budget justification explains...|why each cost is needed for the project|how to spend money freely|the author's hobbies",
      "Specific aims should be...|clear, focused and achievable|as many as possible|vague",
      "A realistic timeline...|includes milestones and time for delays|assumes nothing goes wrong|has no dates",
      "Reviewers of a proposal often ask about...|significance and feasibility|your favorite color|font brand",
      "Broader impacts describe...|how the work could benefit society|how long the title is|the length of the budget",
      "A good proposal's literature review shows...|the gap your project will fill|everything ever written|only your own work",
      "If a funder sets strict page limits, you should...|follow them exactly|ignore them|use tiny unreadable fonts",
      "Letters of support show that...|others are ready to help with the project|the work is already done|the budget is bigger"
    ]),
    SC("Choosing a journal", "📰", "Where you send a paper matters. The right journal reaches the right readers and follows good publishing practice.", "Think about topic fit, trustworthy practice and what the journal asks of authors.", "Reading a journal's aims and scope tells you whether your topic belongs there.", [
      "A journal's aims and scope tell you...|what topics the journal publishes|the editor's salary|the price of coffee",
      "A journal listed in major indexes is usually...|easier for readers to find|illegal|unreadable",
      "An article processing charge (APC) is...|a fee some open access journals charge authors|a reader's subscription|a library fine",
      "Before submitting, check that the journal...|fits your topic and follows good publishing practice|promises instant acceptance|demands payment before any review",
      "Submitting the same paper to two journals at the same time is generally...|not allowed|required|encouraged",
      "Author guidelines tell you about...|format, length and submission steps|the editor's pets|the lunch menu",
      "A journal's turnaround time matters if you...|have a deadline for a decision|dislike reading|want a bigger font",
      "A good way to find suitable journals is to see...|where similar papers in your reference list were published|a random list|nothing"
    ]),
    SC("Hedging and strong claims", "🪜", "<b>Hedging</b> means matching the strength of your words to the strength of your evidence. Too bold is wrong; too timid is weak.", "Pick the wording that your evidence can truly support.", "One small survey supports 'suggests', not 'proves'.", [
      "Which claim is best supported by one small survey?|The results suggest a link between sleep and grades|Sleep always decides grades|Sleep proves everything",
      "'May' and 'appears to' are examples of...|hedging|plagiarism|citation",
      "Too much hedging can make writing...|vague and weak|more certain|illegal",
      "A study found a correlation. A careful writer says the two are...|associated|proven to cause each other|identical",
      "'This study shows that all teachers...' based on 12 teachers is...|an overgeneralization|well supported|a citation",
      "To make a claim stronger, add...|evidence and specific limits|exclamation marks|more adjectives",
      "Which phrase is the most cautious?|The data may indicate|The data prove|It is obvious that",
      "Words like 'always' and 'never' are risky because...|a single exception can disprove them|they are too short|they are rude"
    ]),
    PL("Question frameworks", "❓", "Frameworks such as <b>PICO</b> help you turn a vague topic into a question that is easy to search and answer.", "Break the question into parts: who, what is done, compared with what, and what result.", [
      "PICO::Population, Intervention, Comparison, Outcome::🧪",
      "Population::The group or problem you are studying::👥",
      "Intervention::The treatment, program or action being tested::🎯",
      "Comparison::What the intervention is measured against::⚖️",
      "Outcome::The result you measure::📏",
      "FINER::Feasible, Interesting, Novel, Ethical, Relevant::✅",
      "SPIDER::A framework for qualitative questions: Sample, Phenomenon of Interest, Design, Evaluation, Research type::🕷️",
      "PEO::Population, Exposure, Outcome::🌤️"
    ]),
    SC("Working across fields", "🔀", "<b>Interdisciplinary</b> research combines ideas from more than one field. It is powerful but each field has its own habits.", "Think about words, standards and credit that may differ between fields.", "Two fields may use different words for the same idea, so check the other field's vocabulary.", [
      "Interdisciplinary research combines...|methods and ideas from more than one field|only one field|only libraries",
      "A challenge in interdisciplinary work is that fields may use...|different words and standards for similar ideas|identical journals|no methods",
      "To read outside your field, a good start is...|a review article or textbook chapter|the most technical paper you can find|random websites",
      "When searching across fields, try...|the other field's vocabulary for your idea|only your own jargon|a single word",
      "Teammates from different fields should agree early on...|terms, roles and how credit will be shared|nothing|who is smartest",
      "A jargon problem is solved by...|defining specialized terms for your readers|using more jargon|hiding the terms",
      "Different fields value different outputs, such as...|books in some humanities and conference papers in computing|identical outputs everywhere|no outputs",
      "When citing across fields, use...|the style your audience or journal expects|any style at random|no style"
    ]),
    SC("Misconduct and gray areas", "🚦", "<b>Research misconduct</b> includes making up data, changing data and copying. There are also questionable practices that damage trust even if they are not outright fraud.", "Decide whether the act makes up, changes, copies, or bends good practice.", "Making up numbers that were never measured is fabrication.", [
      "Making up data is called...|fabrication|falsification|paraphrasing",
      "Changing or leaving out data to get a desired result is...|falsification|fabrication|citation",
      "Using someone's words or ideas without credit is...|plagiarism|summary|peer review",
      "Testing many ways until something looks significant, then reporting only that, is...|p-hacking|preregistration|replication",
      "Writing your hypothesis after seeing the results, as if it came first, is...|HARKing|preregistering|blinding",
      "Altering a result image in ways that change its meaning is...|image manipulation|good editing|proofreading",
      "If you suspect misconduct, a good step is to...|report it to the proper office or integrity officer|spread rumors|ignore it forever",
      "A questionable research practice differs from outright fraud because it...|bends good practice and hurts trust even if it is not fraud|is always perfectly fine|is never harmful"
    ])
  ];

  // ================= LEVEL 29 =================
  const L29 = [
    precisionN(),
    recallN(),
    PL("How search systems match", "🧲", "Behind every search box is a method for matching your words to records and ranking them.", "Think: does it match rules, count words, weight rare words, or shorten words?", [
      "Boolean retrieval::Matching records that satisfy AND, OR and NOT rules::🔗",
      "Relevance ranking::Sorting results by how well they seem to match the query::📊",
      "Term frequency::How often a word appears in one document::🔢",
      "Inverse document frequency::A weight that gives rare words across the collection more value::🧂",
      "Stemming::Cutting a word to its root so forms like 'learns' and 'learning' match::🌿",
      "Stop words::Very common words, such as 'the', that a system may ignore::🚫",
      "Proximity search::Finding words within a set distance of each other::📏",
      "Relevance feedback::Using the user's choices to improve the next results::🔁"
    ]),
    PL("Controlled vocabulary and thesauri", "📚", "A <b>controlled vocabulary</b> gives each idea one official name, so different words for the same idea lead to the same place.", "Look for the direction: more general, more specific, or side by side.", [
      "Controlled vocabulary::An approved list of terms used to describe things consistently::📚",
      "Preferred term::The official word chosen for a concept::✅",
      "Broader term::A more general term, such as 'Mammals' above 'Dogs'::⬆️",
      "Narrower term::A more specific term below another::⬇️",
      "Related term::A connected concept at the same level::↔️",
      "Non-preferred term::A synonym that points users to the preferred term::➡️",
      "Authority control::Keeping one consistent form for each name or subject::🛡️",
      "Scope note::A short explanation of how a term should be used::📝"
    ]),
    PL("Describing resources", "🗃️", "Catalogs describe resources at different levels, from the idea to the single copy on a shelf.", "Go from the big idea to the single copy you can hold.", [
      "Work::The abstract idea of a creation, such as a novel::💡",
      "Expression::A particular form of a work, such as a translation::🌐",
      "Manifestation::A published version, such as one edition::📕",
      "Item::A single copy you can hold::📖",
      "Cataloging::Describing resources so people can find them::🗃️",
      "Classification::Grouping resources by subject and giving them a shelf place::🏷️",
      "Authority record::A record that sets the standard form of a name or subject::🪪",
      "Holdings::The copies and locations a library owns::📍"
    ]),
    PL("Metadata standards", "🧱", "Different communities use different <b>metadata standards</b>. They are shared rules for describing things so that systems can talk to each other.", "Match the standard to who uses it: libraries, archives, the web, or everyone.", [
      "Dublin Core::A simple set of basic descriptive fields such as title and creator::🧱",
      "MARC::A format libraries use for catalog records::🗄️",
      "EAD::An XML standard for describing archival collections in finding aids::📦",
      "Schema.org::A shared vocabulary for marking up web pages so search engines understand them::🌐",
      "Descriptive metadata::Information that helps people find and identify a resource::🔎",
      "Administrative metadata::Information about rights, creation and management of a file::🛠️",
      "Structural metadata::Information about how parts relate, such as page order::📑",
      "Crosswalk::A map that converts fields from one metadata standard to another::🔀"
    ]),
    PL("Linked data words", "🕸️", "<b>Linked data</b> connects facts across the web with shared identifiers so that computers can follow the links.", "Think in statements: a subject, a relationship, and an object.", [
      "URI::A web identifier for a thing or concept::🔗",
      "RDF::A way to express data as subject-predicate-object statements::🧩",
      "Triple::One statement made of a subject, a predicate and an object::3️⃣",
      "Ontology::A formal set of concepts and the relationships among them::🌳",
      "SPARQL::A language for querying linked data::❓",
      "Knowledge graph::A network of connected entities and facts::🕸️",
      "Taxonomy::A hierarchy of categories::🌲",
      "Folksonomy::Tags freely chosen by users::🏷️"
    ]),
    SC("Designing a good taxonomy", "🌲", "A <b>taxonomy</b> sorts things into categories. A good one helps people find things without having to guess how its maker thought.", "Think about users, clear labels and categories that do not overlap.", "If an item fits two categories, a cross-reference helps people find it either way.", [
      "A good category label is...|clear and uses words users know|clever and mysterious|very long",
      "Categories that do not overlap are called...|mutually exclusive|messy|hidden",
      "Too many levels deep can make a taxonomy...|hard to navigate|easier always|shorter",
      "Before building a taxonomy, learn how...|your users think and search|you like to decorate|computers are made",
      "A card sorting activity asks users to...|group items in ways that make sense to them|memorize categories|pay fees",
      "If one item fits two categories, a good solution is...|cross-references or tags|delete it|make up random labels",
      "Using different names for the same concept, like 'cars' and 'autos', causes...|inconsistent searching|better results|no problems",
      "You should review a taxonomy...|regularly as topics change|never|only on the day it is made"
    ]),
    PL("Routes to open access", "🔓", "There are several ways to make research free to read. They differ in who pays and where the paper lives.", "Think of colors and costs: where is it published, who pays, and when is it free?", [
      "Gold open access::Published open to everyone on the journal's site::🥇",
      "Green open access::Authors share a version in a repository::🟢",
      "Diamond open access::Open and free for both readers and authors::💎",
      "Hybrid journal::A subscription journal that offers open access for a fee on single articles::🔀",
      "APC::An article processing charge paid for open publication::💳",
      "Embargo::A waiting period before a paper can be shared openly::⏳",
      "Institutional repository::A university's archive of its researchers' work::🏛️",
      "Read-and-publish deal::A contract in which a library pays for both reading and open publishing::🤝"
    ]),
    SC("Author rights", "✍️", "When a paper is accepted, the author usually signs an agreement. It decides who may copy, share and reuse the work.", "Think about reading the agreement, keeping rights, and checking policies before sharing.", "Checking a publisher's policy first tells you which version you may put in a repository.", [
      "Before signing a publishing agreement, you should...|read what rights you keep and give away|sign instantly|ignore it",
      "Transferring copyright means the publisher...|owns the rights you transferred|gives you money back|deletes your paper",
      "A license to publish usually lets authors...|keep copyright while allowing the journal to publish|lose everything|skip peer review",
      "The accepted manuscript is the version...|accepted after peer review but before typesetting|before any writing|printed on the cover",
      "To put the accepted manuscript in a repository, you should...|check the publisher's policy|never ask|upload anything",
      "An author addendum is...|an added agreement that lets you keep certain rights|a footnote|a title page",
      "To reuse your own figure in your thesis, you should...|check the agreement for permission|assume it is fine|delete the figure",
      "Creative Commons licenses on articles tell readers...|what they may do with the work|the price|the page count"
    ]),
    PL("Measuring research", "📈", "Numbers about research are tempting but easy to misuse. Knowing what each measure counts helps you read them wisely.", "Ask what exactly is counted, over what time, and by whom.", [
      "Journal impact factor::A journal-level average of recent citations per article::📈",
      "Altmetrics::Measures of attention such as news mentions and social media shares::📣",
      "Field normalization::Adjusting citation counts to compare across subjects::⚖️",
      "Self-citation::An author citing their own earlier work::🔁",
      "Citation window::The time period over which citations are counted::🪟",
      "DORA::A declaration urging that research be judged on quality, not journal impact factors alone::📜",
      "Goodhart's law::When a measure becomes a target, it stops being a good measure::🎯",
      "Responsible metrics::Using numbers together with expert judgment::🧭"
    ]),
    PL("Roles on a paper", "🏅", "Many journals use a list of contributor roles called <b>CRediT</b>. It shows who did which job instead of only listing names.", "Think of the stages of a project, from the first idea to the final edit.", [
      "Conceptualization::Shaping the main ideas and aims::💡",
      "Methodology::Designing the methods::🧭",
      "Investigation::Carrying out experiments or data collection::🔬",
      "Data curation::Organizing and maintaining the data::🗂️",
      "Formal analysis::Applying statistics or other methods to study the data::📊",
      "Supervision::Guiding and overseeing the project::🧑‍🏫",
      "Funding acquisition::Winning the money to support the work::💰",
      "Writing - review and editing::Improving the draft after the first version::✏️"
    ]),
    PL("Bibliometrics words", "🕸️", "<b>Bibliometrics</b> studies publications and citations with statistics. It can show how a field is built and who influences whom.", "Think of links between papers: citing together, sharing references, or following a pattern.", [
      "Bibliometrics::Using statistics to study publications and citations::📚",
      "Co-citation::Two papers cited together by a later paper::🤝",
      "Bibliographic coupling::Two papers that share references::🧷",
      "Citation network::A map of papers linked by who cites whom::🕸️",
      "Lotka's law::A few authors write many papers while most write only one or two::✍️",
      "Bradford's law::A few core journals hold a large share of the articles on a subject::📓",
      "Zipf's law::A few words are used very often and most words are rare::🔠",
      "Citation lag::The time between publication and when citations start to arrive::⏳"
    ]),
    SC("Comparing databases", "🗄️", "No single database has everything. Knowing what each one covers helps you search well and explain your choices.", "Think about coverage, updates, and what each tool is designed to do.", "A database for one subject usually indexes that subject's journals more deeply.", [
      "Two databases overlap in coverage. To be thorough, you should...|search more than one|use only the biggest|avoid databases",
      "Before trusting a database for your topic, check its...|coverage of journals, dates and subjects|logo|color",
      "Searching full text rather than abstracts usually finds...|more matches, including some less relevant|fewer matches only|only titles",
      "A subject-specific database is useful because it...|has specialized indexing for the field|has every subject|has no records",
      "Citation databases help you see...|who has cited a paper|the author's address|the paper's weight",
      "A database's last-updated date matters because...|you may miss recent studies|it has no effect|it changes the color",
      "A search interface that lets you save and export results helps you...|record and manage your search|lose time|avoid citations",
      "A general web search engine is useful, but a limit is that...|its ranking and coverage are less transparent than a library database|it has no pages|it never changes"
    ]),
    SC("Document your search", "📓", "A thorough search should be written down so that others, and you, can repeat it. This is part of good research method.", "Think about what someone would need to run your search again exactly.", "Saving the exact search string lets another researcher repeat the search later.", [
      "A search log should record...|databases, dates, search strings and limits|only the winning result|nothing",
      "Recording the date of a search matters because...|databases change over time|dates are decoration|it uses less memory",
      "Saving the exact search string lets others...|repeat the search|guess at it|ignore it",
      "Grey literature is...|material outside commercial publishing, like reports and theses|banned books|gray-colored books",
      "Including grey literature in a thorough review helps...|reduce missing studies that are not in journals|make it shorter|avoid reading",
      "Having a librarian check your search strategy can...|catch missing terms and errors|steal your idea|lower your grade",
      "When you change your search, you should...|note the change and why|erase old searches|hide them",
      "Reporting limits such as language and date lets readers see...|what your search could and could not include|your pet's name|the page color"
    ]),
    indexCons(),
    PL("How people look for information", "🫐", "Researchers study how people really search. It is rarely a straight line: needs change as people learn.", "Think about whether the person knows what they want, or is still finding out.", [
      "Information need::The gap between what you know and what you need to know::❓",
      "Known-item search::Looking for one specific thing you already know exists::🎯",
      "Exploratory search::Searching to learn about a topic while the goal is still forming::🧭",
      "Berrypicking::A model where your search changes and gathers bits from many places::🫐",
      "Query reformulation::Rewording or changing a search after seeing results::✏️",
      "Serendipity::Finding something useful by happy accident::🍀",
      "Information overload::Having more information than you can process::🌊",
      "Satisficing::Choosing the first option that is good enough::✔️"
    ]),
    SC("Fixing a search that isn't working", "🛠️", "Good searchers revise. They read what comes back and change the words, operators and limits.", "Look at what the results tell you, then change one thing at a time.", "Too many results? Add a specific term. Too few? Try broader or alternative words.", [
      "A search returns 12,000 results. The best move is to...|add specific terms or limits|give up|read every one",
      "A search returns zero results. Try...|broader or alternative terms|adding more AND terms|retyping the same query",
      "The results use the wrong meaning of your word. Add...|a word that clarifies the context|nothing|random symbols",
      "You find one great article. A smart next step is to check its...|reference list and subject terms|cover color|page margins",
      "Different authors use different words for one idea. Join the synonyms with...|OR|AND|nothing",
      "To exclude an unwanted topic, you can use...|NOT (or a minus sign)|OR|a longer question",
      "Phrase searching with quotation marks is useful when...|you need the words together in order|you want every word form|you have no idea",
      "The same query in two databases may give different results because...|each has its own indexing and syntax|they are identical|search is random"
    ])
  ];

  // ================= LEVEL 30 =================
  const L30 = [
    wordFreq(),
    scanTime(),
    PL("The data lifecycle", "♻️", "Data have a life: they are made, cared for, shared and used again. <b>Data curation</b> is the work of looking after them through every stage.", "Follow the stages in order, from collecting to reuse.", [
      "Collect::Gather or create the data::🧺",
      "Process::Clean, organize and transform the data::🧹",
      "Analyze::Study the data to answer questions::📊",
      "Preserve::Store the data safely for the long term::🗄️",
      "Share::Make the data available under clear terms::📤",
      "Reuse::Others, or you, use the data for new work::♻️",
      "Appraisal::Deciding which data are worth keeping::⚖️",
      "Curation::Active care of data throughout their useful life::🌿"
    ]),
    PL("Digital preservation", "🏛️", "Digital files are fragile. Keeping them readable for decades needs a plan, not just storage.", "Match the problem (damage, old formats, lost history) to the fix.", [
      "Bit rot::Slow, silent damage that corrupts stored digital files::🦠",
      "Format obsolescence::When software can no longer open an old file type::📼",
      "Migration::Moving data to newer formats or systems::🚚",
      "Emulation::Recreating an old software environment to run old files::🖥️",
      "Fixity::Proof that a file has not changed::🔒",
      "Provenance::The record of where an item came from and who handled it::🧾",
      "OAIS::A standard model for how an archive takes in, stores and provides digital material::🏛️",
      "Redundancy::Keeping several copies in different places::📚"
    ]),
    SC("Checksums and fixity", "🔐", "A <b>checksum</b> is a short code calculated from a file's contents. If even one bit changes, the code changes, so it proves a file is intact.", "Think about what the code depends on: the contents, not the name.", "Compare today's checksum with the one saved at deposit to see whether anything changed.", [
      "A checksum is...|a short code calculated from a file's contents|a file's name|a password",
      "If a file's checksum changes, the file...|has changed or been corrupted|is better|is bigger",
      "You should record a checksum...|when the file is deposited|never|only at the end of time",
      "Checking fixity regularly helps you...|catch corruption early|choose colors|save space",
      "Two identical files will have...|the same checksum|different checksums|no checksum",
      "If a copy's checksum does not match the original's, you should...|replace it with a good copy and investigate|ignore it|delete the original",
      "Renaming a file without changing its contents will...|not change its checksum|always change its checksum|erase the file",
      "A checksum can show that a file changed, but not...|what exactly changed or why|that any change happened|the file's size"
    ]),
    SC("Choose a lasting format", "💾", "Some file formats are easier to keep readable than others. <b>Open</b>, well-documented formats are safest for the long term.", "Prefer formats with public rules that many programs can read.", "A plain CSV can be opened by almost any software, even decades from now.", [
      "For long-term storage of a spreadsheet's data, a good open format is...|CSV|a locked proprietary format|a screenshot",
      "For plain notes, a good lasting format is...|TXT or Markdown|a game save|a locked app file",
      "For archival page images, a common uncompressed format is...|TIFF|a tiny low-quality image only|a screenshot of a screenshot",
      "A PDF/A is...|a PDF version designed for long-term archiving|a PDF for animals|a draft",
      "Open formats are good for preservation because...|their specifications are public and many programs can read them|nobody can open them|they never change",
      "Compressing with lossy methods, like very low-quality JPEG, may...|permanently throw away detail|restore detail|add detail",
      "Keeping both the original and a converted copy lets you...|check the conversion and keep the source|waste time|hide the original",
      "Structured data are often kept in...|XML or JSON|a photo of a table|a drawing"
    ]),
    SC("Choosing and using a repository", "🏦", "A <b>repository</b> is a trusted place to deposit research outputs. A good deposit is easy to find, cite and reuse.", "Think about identifiers, documentation, licenses and versions.", "A README in the deposit tells a stranger what the files are and how to use them.", [
      "A trusted repository gives your dataset...|a persistent identifier such as a DOI|a new author|no description",
      "A README file in your deposit explains...|what files are there and how to use them|nothing|your lunch",
      "Before depositing, choose a license so reusers know...|what they may do with the data|the file size|the day of the week",
      "A subject repository is useful because...|people in your field search it|it has no rules|it is always private",
      "If you update the dataset, a good repository...|keeps versions with clear labels|deletes the old one without note|hides the change",
      "An embargo on a dataset...|delays public access for a set time|deletes it|makes it larger",
      "Putting data only on a personal website is risky because...|it may disappear and has no lasting identifier|it is too safe|it is required",
      "A good dataset title is...|descriptive and specific|just the word data|blank"
    ]),
    PL("CARE and FAIR", "🪶", "<b>FAIR</b> principles make data easy to use. The <b>CARE</b> principles remind us that data about people and communities, especially Indigenous peoples, also need ethics and respect.", "Remember: FAIR is about the data's usefulness; CARE is about people's rights.", [
      "CARE principles::Guidelines for ethical data use that center the rights of Indigenous peoples::🪶",
      "Collective benefit::Data should help the community they come from::🤲",
      "Authority to control::Communities decide how data about them are used::🗝️",
      "Responsibility::Data users must share how data are used and support communities::🤝",
      "Ethics (in CARE)::Minimizing harm and maximizing benefit through the data's life::💚",
      "Data sovereignty::A group's right to govern data about itself::🧭",
      "FAIR principles::Findable, Accessible, Interoperable, Reusable::♻️",
      "Open as appropriate::Sharing data openly only when it is safe and respectful::🚪"
    ]),
    SC("Sensitive data", "🔒", "Some data could harm people if shared carelessly. Curators balance openness with protection.", "Think about who could be identified or harmed, and what controls fit.", "Combining age, place and job can single out one person even when the name is removed.", [
      "Even with names removed, data can sometimes be re-identified when...|details are combined, like age, place and job|names are removed|data are printed",
      "k-anonymity aims to make sure each person...|looks like at least k-1 others in the data|is named|has the highest score",
      "A data use agreement is...|a contract that sets rules for accessing sensitive data|a recipe|a cover page",
      "The safest way to share very sensitive data is often...|controlled access through a secure system|posting on a public page|emailing everyone",
      "Participants' consent should say...|whether their data may be shared and how|nothing about sharing|only the color",
      "A small group in a table, such as 2 people in one town, may need to be...|combined or hidden to protect privacy|bolded|moved",
      "Locations of rare species or sacred sites may be...|generalized to protect them|published exactly|printed big",
      "If unsure whether data can be shared, ask...|your ethics board or data steward|a random website|nobody"
    ]),
    PL("Open science", "🔓", "<b>Open science</b> is a set of practices that make research more transparent and shareable.", "Ask what is being opened: data, code, methods, plans, papers or participation.", [
      "Open data::Data shared so others can use them::📂",
      "Open source::Software whose code is shared for others to use and improve::💻",
      "Open methods::Clear sharing of protocols and materials::🧪",
      "Preregistration::Posting your plan before collecting data::📌",
      "Citizen science::Projects where volunteers help collect or analyze data::🧑‍🌾",
      "Open educational resources::Teaching materials shared freely::🎓",
      "Open access::Research articles free to read online::🔓",
      "Data paper::A publication that describes a dataset so it can be reused::📄"
    ]),
    PL("Reproducible research", "🔁", "Others should be able to check your work. These words describe different ways results can hold up.", "Same data and code, or new data? Same setup, or different?", [
      "Reproducible::Same data and code give the same results::🔁",
      "Replicable::New data, same methods, give consistent findings::🧪",
      "Robust::Results hold up under different reasonable analysis choices::🏗️",
      "Generalizable::Findings apply beyond the original sample::🌐",
      "Version control::Tracking changes to code and files over time::🕰️",
      "Computational environment::The software and versions needed to run an analysis::⚙️",
      "Container::A packaged environment that runs the same on different computers::📦",
      "Random seed::A starting number that makes random steps repeatable::🎲"
    ]),
    SC("Handling an integrity problem", "🧭", "Researchers face hard choices. Honest, open and fair actions protect people and the record of science.", "Pick the choice that is open, honest and fair, even if it is harder.", "If you spot an error in your published paper, telling the journal helps everyone.", [
      "You find an error in your published paper. The best action is to...|tell the journal and request a correction|hide it|blame others",
      "A colleague asks you to delete inconvenient data. You should...|refuse and report your concerns|do it|say nothing",
      "Two authors disagree about name order. A good first step is to...|discuss using agreed criteria and involve an advisor if needed|fight online|remove one name",
      "Who owns research data is usually decided by...|institution and funder policies|a coin flip|the oldest student",
      "Whistleblowing means...|reporting suspected wrongdoing in good faith|spreading gossip|ignoring a problem",
      "A good lab keeps notebooks so that...|work can be checked and reproduced|no one can read them|they look nice",
      "Pressure to publish can lead to rushed or questionable work, so you should...|slow down and stay honest|cut corners|hide data",
      "A conflict of interest should be...|disclosed openly|hidden|ignored"
    ]),
    PL("Digital humanities methods", "🔭", "<b>Digital humanities</b> uses computers to study books, art, history and culture. The tools add new questions, but they do not replace careful reading.", "Think of scale: one text up close, or thousands from far away.", [
      "Distant reading::Using computers to study patterns across many texts::🔭",
      "Close reading::Careful study of the details of one text::🔍",
      "Text mining::Using software to find patterns in large amounts of text::⛏️",
      "Topic modeling::A method that finds groups of words that appear together across documents::🗂️",
      "Network analysis::Studying connections among people, places or texts::🕸️",
      "GIS mapping::Using digital maps to show where things happen::🗺️",
      "Digital edition::A carefully prepared online version of a text with notes::💻",
      "OCR::Software that turns scanned images of printed text into editable text::🔤"
    ]),
    SC("Digitization choices", "🖨️", "Digitizing means making digital copies of physical items. Good choices protect the original and make the copy useful.", "Think about quality, care for the original, and permission.", "OCR can misread old print, so important text needs proofreading.", [
      "A preservation master is...|the highest quality digital copy kept safe|a small copy for the web|a paper copy",
      "An access copy is...|a smaller version made for easy viewing|the only original|a deleted file",
      "OCR on old print can make errors, so you should...|proofread important text|trust it blindly|delete the image",
      "Scanning fragile books requires...|careful handling, often by trained staff|pressing hard on the page|tearing out pages",
      "Before putting a collection online, check...|copyright and permissions|nothing|the weather",
      "Each digital object should get...|descriptive metadata|no description|a random nickname only",
      "Higher resolution means...|more detail but larger files|less detail|smaller files",
      "Quality control after scanning means...|checking for missing, blurry or skewed images|deleting everything|adding filters"
    ]),
    PL("Markup and encoding", "🏷️", "To study texts on computers, scholars often <b>encode</b> them with tags that mark structure and meaning.", "Think of tags as labels placed around parts of a text.", [
      "Markup::Tags added to text to describe its structure or meaning::🏷️",
      "XML::A flexible markup language for structured data::📄",
      "TEI::A standard for encoding texts in the humanities::📜",
      "Element::A tagged part of a document, like a paragraph or title::🧱",
      "Attribute::Extra information inside a tag, such as a date::🔖",
      "Schema::A set of rules that says what tags and structure are allowed::📐",
      "Plain text::Text with no formatting that nearly any program can read::📝",
      "Unicode::A standard that gives a code to characters from many writing systems::🔡"
    ]),
    SC("Respecting community materials", "🪶", "Cultural heritage belongs to communities, not only to the archives that hold it. Digital projects should listen to the people the materials come from.", "Think about permission, credit, and who has the right to decide.", "Asking the community before digitizing their materials respects their authority over their own heritage.", [
      "Before digitizing materials from a community's cultural heritage, you should...|consult the community and get permission|just post it|sell it",
      "Traditional knowledge labels help communities...|state how their cultural materials should be used|hide libraries|raise fines",
      "Some items may be restricted because they are...|sacred or sensitive to a community|too colorful|too short",
      "Outdated or hurtful terms in collection descriptions can be fixed by...|updating descriptions with community input|leaving them forever|deleting all records",
      "Repatriation means...|returning cultural items or data to the people they came from|selling them|copying them",
      "Giving credit means naming...|the community and creators when known|only the collector|nobody",
      "Asking whose stories are missing is a question about...|gaps and bias in archives|font size|prices",
      "When community members say no to sharing, researchers should...|respect that decision|find a way around it|go ahead anyway"
    ]),
    SC("Bias in algorithms and search", "⚙️", "Search engines, recommenders and AI tools are built from data and design choices, so they can carry bias. Information professionals ask how they work and who they serve.", "Think about whose data trained the tool, who checks it, and how to verify answers.", "A tool trained mostly on one group's data may work poorly for others.", [
      "Training data that leave out some groups can lead to...|tools that work worse for those groups|perfect fairness|faster tools",
      "A ranking algorithm that favors popular pages can...|hide less popular but useful sources|improve all results|remove ads",
      "Transparency in an algorithm means...|people can learn how it works and is used|it is secret|it is slow",
      "An audit of a system checks...|whether it treats groups fairly and works as claimed|its color|its logo",
      "Autocomplete suggestions are shaped by...|what many people have searched|only experts|nothing",
      "If a tool gives an answer without sources, you should...|verify it with trusted sources|trust it|share it",
      "A human in the loop means...|a person reviews or can override the automated decision|robots take over|no review happens",
      "To reduce harm, designers can...|test with diverse users and fix problems|hide complaints|avoid testing"
    ]),
    SC("What goes in a data package", "📦", "A deposit is more than a spreadsheet. A good <b>data package</b> lets a stranger understand, trust and reuse the data years later.", "Think about what a newcomer would need to open, understand and cite the data.", "A README plus a codebook turns raw files into data someone else can use.", [
      "A data package should include the data and...|documentation such as a README and codebook|nothing else|jokes",
      "A codebook lists...|variable names, meanings and codes|passwords|authors' addresses",
      "Code used for analysis should be...|included or linked with its version|hidden|deleted",
      "Participant identifying information should be...|removed or protected before sharing|included|printed",
      "The license tells reusers...|what they can do with the data|nothing|the file size",
      "A citation for the dataset helps...|others credit you when they reuse it|nobody|lawyers only",
      "Ethics approval documents should be...|referenced, and consent terms respected|ignored|rewritten",
      "Before sharing, test that...|a fresh user can open the files and follow the README|files are huge|they are hidden"
    ])
  ];

  Object.assign(LIBRARY_LEVELS, {
    28: lvl(28, L28, [1, 2, 3, 4, 7, 8, 11, 15]),
    29: lvl(29, L29, [2, 3, 5, 6, 8, 11, 13, 17]),
    30: lvl(30, L30, [2, 4, 7, 9, 11, 14, 15, 17])
  });
})();
