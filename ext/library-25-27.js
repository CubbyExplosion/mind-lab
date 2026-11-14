// ext/library-25-27.js  Mind Lab Library & Research, levels 25-27 (60 lessons): college research methods, information literacy, scholarly communication, data management
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
  const fmt = v => String(+Number(v).toFixed(6));

  // ---------- numeric makers (no people names are built here) ----------
  const pageRange = () => NUM("How many pages?", () => {
    const s = ri(20, 950), n = ri(7, 32), e = s + n - 1;
    if (Math.random() < 0.6) return {
      text: `A journal article runs from page <b>${s}</b> to page <b>${e}</b>. How many pages long is it?`, visual: "📄", answer: n,
      hints: ["Both the first page and the last page belong to the article, so be careful about being off by one.", "Take the first page away from the last page, then add one more so the first page is counted.", "Example: pages 40 to 45. 45 − 40 = 5, and 5 + 1 = 6 pages. Now do yours."]
    };
    return {
      text: `An article starts on page <b>${s}</b> and is <b>${n}</b> pages long. On which page does it end?`, visual: "📄", answer: e,
      hints: ["The first page counts as the article's page one.", "Add the length to the start page, then take one away.", "Example: starts on page 20 and is 5 pages long. 20 + 5 − 1 = 24. Now do yours."]
    };
  }, [
    { h: "Page ranges", v: "pp. 245–261", t: "Citations often give a <b>page range</b>: the first and last page of an article. Both ends count." },
    { h: "Count both ends", v: "45 − 40 + 1 = 6", t: "Pages 40 to 45 is six pages, not five. Subtract, then add one." },
    { h: "Find the end page", v: "start + length − 1", t: "An article that starts on page 20 and is 5 pages long ends on page 24." }
  ]);

  const citesPerYear = () => NUM("Citations per year", () => {
    const Y = pick([2, 3, 4, 5, 6, 8, 10]), k = ri(3, 40), C = Y * k;
    if (Math.random() < 0.65) return {
      text: `A paper came out <b>${Y}</b> years ago and has been cited <b>${C}</b> times. On average, how many citations per year is that?`, visual: "📈", answer: k,
      hints: ["An average per year spreads the total evenly across the years.", "Divide the total citations by the number of years.", "Example: 60 citations over 4 years is 60 ÷ 4 = 15 per year. Now do yours."]
    };
    return {
      text: `A paper gets about <b>${k}</b> citations each year. It has been out for <b>${Y}</b> years. About how many citations in all?`, visual: "📈", answer: C,
      hints: ["The yearly rate repeats every year.", "Multiply the citations per year by the number of years.", "Example: 12 per year for 5 years is 12 × 5 = 60. Now do yours."]
    };
  }, [
    { h: "Fair citation counts", v: "total ÷ years", t: "An old paper has had more time to be cited. Dividing by the years gives a fairer <b>rate</b>." },
    { h: "Worked example", v: "60 ÷ 4 = 15", t: "60 citations in 4 years is 15 citations per year." },
    { h: "Tip", v: "💡", t: "Use rates to compare an old paper with a new one." }
  ]);

  const fileSize = () => NUM("Bytes, MB and GB", () => {
    const x = ri(2, 9), r = Math.random();
    if (r < 0.34) return {
      text: `A research dataset is <b>${x}</b> GB. How many MB is that? (Use 1 GB = 1000 MB.)`, visual: "💾", answer: x * 1000,
      hints: ["A GB is a bigger unit than an MB, so the number of MB will be larger.", "Multiply the GB by one thousand.", "Example: 3 GB = 3 × 1000 = 3000 MB. Now do yours."]
    };
    if (r < 0.67) return {
      text: `A folder of interview audio is <b>${x * 1000}</b> MB. How many GB is that? (Use 1 GB = 1000 MB.)`, visual: "💾", answer: x,
      hints: ["A GB is a bigger unit than an MB, so the number of GB will be smaller.", "Divide the MB by one thousand.", "Example: 6000 MB = 6000 ÷ 1000 = 6 GB. Now do yours."]
    };
    return {
      text: `A photo of a manuscript page is <b>${x * 1000}</b> KB. How many MB is that? (Use 1 MB = 1000 KB.)`, visual: "💾", answer: x,
      hints: ["An MB is a bigger unit than a KB, so the number of MB will be smaller.", "Divide the KB by one thousand.", "Example: 4000 KB = 4000 ÷ 1000 = 4 MB. Now do yours."]
    };
  }, [
    { h: "Units of data", v: "KB → MB → GB", t: "Data sizes climb in steps. In this lesson, <b>1 MB = 1000 KB</b> and <b>1 GB = 1000 MB</b>. (Some computers use 1024, but 1000 is a good rule of thumb.)" },
    { h: "Going up and down", v: "÷ 1000 or × 1000", t: "Going to a bigger unit, divide by 1000. Going to a smaller unit, multiply by 1000." },
    { h: "Why it matters", v: "💾", t: "Data plans ask how much storage you need. Large audio, video and image files add up quickly." }
  ]);

  const pagesWords = () => NUM("Pages and words", () => {
    const P = ri(3, 30), r = Math.random();
    if (r < 0.4) return {
      text: `A double-spaced page holds about <b>250</b> words. About how many words is a <b>${P}</b>-page double-spaced paper?`, visual: "📝", answer: P * 250,
      hints: ["Each page holds about the same number of words.", "Multiply the number of pages by the words on one page.", "Example: 4 pages × 250 words = 1000 words. Now do yours."]
    };
    if (r < 0.7) return {
      text: `A paper is about <b>${P * 250}</b> words. A double-spaced page holds about 250 words. About how many pages is that?`, visual: "📝", answer: P,
      hints: ["Ask how many pages of 250 words fit into the whole paper.", "Divide the total words by the words on one page.", "Example: 1500 words ÷ 250 = 6 pages. Now do yours."]
    };
    return {
      text: `A single-spaced page holds about <b>500</b> words. About how many words is a <b>${P}</b>-page single-spaced paper?`, visual: "📝", answer: P * 500,
      hints: ["Single-spaced pages hold more words than double-spaced pages.", "Multiply the pages by the words on one single-spaced page.", "Example: 3 pages × 500 words = 1500 words. Now do yours."]
    };
  }, [
    { h: "Page and word limits", v: "250 words ≈ 1 page", t: "Assignments give lengths in pages or words. A double-spaced page is about <b>250 words</b>; a single-spaced page is about <b>500</b>." },
    { h: "Convert", v: "pages × 250", t: "A 6-page double-spaced paper is about 6 × 250 = 1500 words." },
    { h: "Tip", v: "💡", t: "Check the assignment for the exact rule. Fonts and margins change the real number." }
  ]);

  const rSquared = () => NUM("How much is shared? (r squared)", () => {
    const T = [[0.2, 4], [0.3, 9], [0.4, 16], [0.5, 25], [0.6, 36], [0.7, 49], [0.8, 64], [0.9, 81]];
    if (Math.random() < 0.7) {
      const [r, p] = pick(T), sg = Math.random() < 0.4 ? "−" : "";
      return {
        text: `Two measures have a correlation of <b>r = ${sg}${r}</b>. About what percent of the variation in one is shared with the other (r² × 100)?`, visual: "📊", answer: p,
        hints: ["Squaring a number makes it positive, even if it started negative.", "Square r, then multiply by 100 to turn it into a percent.", "Example: r = 0.5 gives 0.5 × 0.5 = 0.25, which is 25%. Now do yours."]
      };
    }
    const two = S(T, 2), a = two[0], b = two[1], big = a[0] > b[0] ? a : b;
    const sa = Math.random() < 0.5 ? "−" : "", sb = Math.random() < 0.5 ? "−" : "";
    const A = `r = ${sa}${a[0]}`, B = `r = ${sb}${b[0]}`;
    return {
      text: `Which correlation shares more variation between the two measures?`, visual: "📊", choices: shuf([A, B, "They share the same amount"]), answer: a[0] > b[0] ? A : B,
      hints: ["A minus sign shows the direction of the link, not its strength.", "Strength depends on how far r is from zero, ignoring the sign.", "Example: r = −0.8 shares more than r = 0.3, because 0.8 is farther from zero. Now do yours."]
    };
  }, [
    { h: "Squaring r", v: "r² × 100", t: "The <b>coefficient of determination</b>, r², tells how much of the variation in one variable goes along with the other." },
    { h: "Worked example", v: "0.5 × 0.5 = 0.25", t: "r = 0.5 gives r² = 0.25, so about 25% of the variation is shared. The other 75% is explained by other things." },
    { h: "Careful", v: "⚠️", t: "Shared variation is not the same as cause. A strong link can still have other explanations." }
  ]);

  const bonf = () => NUM("Many tests, smaller threshold", () => {
    const M = [[2, 0.025], [4, 0.0125], [5, 0.01], [10, 0.005], [20, 0.0025], [25, 0.002], [50, 0.001], [100, 0.0005]];
    const [m, a] = pick(M);
    if (Math.random() < 0.6) {
      const ws = [0.05, a / 2, a / 4, a * 4].map(fmt).filter(x => x !== fmt(a)).slice(0, 3);
      return {
        text: `A study runs <b>${m}</b> tests and wants the overall false-alarm limit to stay at 0.05. Using the Bonferroni correction, what is the threshold for each single test?`, visual: "🧪", choices: shuf([fmt(a), ...ws]), answer: fmt(a),
        hints: ["Running many tests gives many chances for a false alarm, so each test needs a stricter threshold.", "Divide the overall limit by the number of tests.", "Example: 0.05 split across 5 tests gives 0.05 ÷ 5 = 0.01 for each. Now do yours."]
      };
    }
    return {
      text: `A study kept an overall limit of 0.05. Each test used a Bonferroni threshold of <b>${fmt(a)}</b>. How many tests were run?`, visual: "🧪", answer: m,
      hints: ["The overall limit was shared equally among the tests.", "Divide 0.05 by the single-test threshold.", "Example: a threshold of 0.01 from 0.05 means 0.05 ÷ 0.01 = 5 tests. Now do yours."]
    };
  }, [
    { h: "Why many tests are risky", v: "🎰", t: "Each test has a small chance of a false alarm. Run lots of tests and a false alarm becomes likely." },
    { h: "Bonferroni correction", v: "0.05 ÷ tests", t: "A simple fix is to divide the overall limit by the number of tests. For 5 tests, each must pass 0.05 ÷ 5 = 0.01." },
    { h: "Tip", v: "💡", t: "Better still, say your tests in advance so you do not go fishing for a result." }
  ]);

  const sdHand = () => NUM("Standard deviation by hand", () => {
    const r = Math.random(), m = ri(30, 80);
    if (r < 0.4) {
      const k = ri(1, 3), d = [m - 7 * k, m - k, m + k, m + 7 * k];
      return {
        text: `Treat these four numbers as the whole group: <b>${d.join(", ")}</b>. The mean is ${m}. What is the standard deviation (divide the squared gaps by 4)?`, visual: "📐", answer: 5 * k,
        hints: ["Standard deviation tells the typical distance from the mean.", "Find each gap from the mean, square the gaps, average them, then take the square root.", "Example: 4, 4, 8, 8 has mean 6. Gaps are 2, so squares are 4, the average is 4, and the square root is 2. Now do yours."]
      };
    }
    if (r < 0.75) {
      const d = ri(2, 9);
      return {
        text: `Treat these four numbers as the whole group: <b>${m - d}, ${m - d}, ${m + d}, ${m + d}</b>. The mean is ${m}. What is the standard deviation?`, visual: "📐", answer: d,
        hints: ["Look at how far every number is from the mean.", "Every number is the same distance from the mean, so the typical distance is that distance.", "Example: 4, 4, 8, 8 has mean 6. Every gap is 2, so the standard deviation is 2. Now do yours."]
      };
    }
    const s = ri(2, 9), add = pick([10, 20, 50]);
    return {
      text: `A set of scores has a standard deviation of ${s}. Every score goes up by ${add} points. What happens to the standard deviation?`, visual: "📐", choices: shuf(["It stays the same", "It goes up by the same amount", "It becomes zero"]), answer: "It stays the same",
      hints: ["Think about what happens to the gaps between the scores when all of them move together.", "The standard deviation measures spread, not position.", "Example: 1, 3, 5 and 11, 13, 15 are spread out in exactly the same way. Now do yours."]
    };
  }, [
    { h: "Spread", v: "σ", t: "The <b>standard deviation</b> (SD) tells how far values typically fall from the mean. Small SD means tightly bunched; large SD means spread out." },
    { h: "Steps", v: "gap → square → average → root", t: "Find each gap from the mean, square them, average the squares, then take the square root. For 4, 4, 8, 8 (mean 6) the SD is 2." },
    { h: "Tip", v: "💡", t: "Adding the same amount to every value moves the mean but does not change the spread." }
  ]);

  const dataCells = () => NUM("Cells in a dataset", () => {
    const P = ri(12, 60), V = ri(3, 12), r = Math.random();
    if (r < 0.45) return {
      text: `A spreadsheet has one row for each of <b>${P}</b> participants and <b>${V}</b> columns of variables. How many data cells hold answers?`, visual: "🗃️", answer: P * V,
      hints: ["Each row is crossed with each column, making a grid.", "Multiply the number of rows by the number of columns.", "Example: 10 rows and 4 columns make 10 × 4 = 40 cells. Now do yours."]
    };
    if (r < 0.75) return {
      text: `A dataset has <b>${P * V}</b> cells and <b>${V}</b> columns, with one row per participant. How many participants are there?`, visual: "🗃️", answer: P,
      hints: ["The cells fill a grid of rows and columns.", "Divide the number of cells by the number of columns.", "Example: 60 cells in 5 columns means 60 ÷ 5 = 12 rows. Now do yours."]
    };
    return {
      text: `A dataset has <b>${P * V}</b> cells and <b>${P}</b> participants, one per row. How many variables (columns) are there?`, visual: "🗃️", answer: V,
      hints: ["The cells fill a grid of rows and columns.", "Divide the number of cells by the number of rows.", "Example: 60 cells with 12 rows means 60 ÷ 12 = 5 columns. Now do yours."]
    };
  }, [
    { h: "Tidy data", v: "rows × columns", t: "In a tidy dataset, each <b>row</b> is one case (such as a participant) and each <b>column</b> is one variable." },
    { h: "Count the cells", v: "10 × 4 = 40", t: "Rows times columns gives the number of cells. Know the size of your data before you analyze it." },
    { h: "Tip", v: "💡", t: "If a count of cells does not match, a row or column may be missing." }
  ]);

  const regLine = () => NUM("Predict with a line", () => {
    const C = pick([["exam score", "hours of study", "points", "hours"], ["books borrowed", "visits to the library", "books", "visits"], ["words written", "hours of writing", "words", "hours"], ["articles read", "days of research", "articles", "days"]]);
    const a = pick([10, 15, 20, 25, 30, 40, 50]), b = ri(2, 9), x = ri(1, 8), r = Math.random();
    const eq = `${C[0]} = ${a} + ${b} × ${C[1]}`;
    if (r < 0.5) return {
      text: `A regression line is <b>${eq}</b>. What does it predict for <b>${x}</b> ${C[3]}?`, visual: "📉", answer: a + b * x,
      hints: ["Put the number of " + C[3] + " in place of the second part of the line.", "Multiply the amount by the number in front, then add the starting number.", "Example: score = 10 + 3 × hours, with 2 hours: 10 + 6 = 16. Now do yours."]
    };
    if (r < 0.75) return {
      text: `A regression line is <b>${eq}</b>. By how many ${C[2]} does the prediction rise for each extra ${C[3] === "hours" ? "hour" : C[3].replace(/s$/, "")}?`, visual: "📉", answer: b,
      hints: ["The number multiplied by the x-value is the slope.", "The slope tells the change in the prediction for one more step in the x-value.", "Example: score = 10 + 3 × hours rises 3 points per extra hour. Now do yours."]
    };
    return {
      text: `A regression line is <b>${eq}</b>. What does it predict when there are <b>0</b> ${C[3]}?`, visual: "📉", answer: a,
      hints: ["Put zero in place of the amount.", "Anything multiplied by zero is zero, so only the starting part is left.", "Example: score = 10 + 3 × hours, with 0 hours: 10 + 0 = 10. Now do yours."]
    };
  }, [
    { h: "Prediction lines", v: "y = a + b × x", t: "A <b>regression line</b> predicts one measure from another. <b>a</b> is the starting value; <b>b</b> is the slope, the change for each one-step increase in x." },
    { h: "Worked example", v: "10 + 3 × 2 = 16", t: "If score = 10 + 3 × hours, then 2 hours predicts 10 + 6 = 16." },
    { h: "Careful", v: "⚠️", t: "Predictions work best inside the range of the data. A line is a pattern, not proof of cause." }
  ]);

  const missPct = () => NUM("Share of missing data", () => {
    const N = pick([50, 100, 200, 250, 400, 500]), p = pick([2, 4, 5, 10, 20, 25]), M = N * p / 100;
    if (!Number.isInteger(M)) return missPct().make();
    if (Math.random() < 0.55) return {
      text: `A dataset has <b>${N}</b> survey responses and <b>${M}</b> are missing an answer to one question. What percent are missing?`, visual: "🕳️", answer: p,
      hints: ["Compare the missing responses with all of the responses.", "Divide the missing count by the total, then change the decimal to a percent.", "Example: 10 missing out of 200 is 10 ÷ 200 = 0.05, or 5%. Now do yours."]
    };
    return {
      text: `A dataset has <b>${N}</b> survey responses. <b>${p}%</b> are missing an answer to one question. How many responses have that answer?`, visual: "🕳️", answer: N - M,
      hints: ["First find how many are missing, then think about what is left.", "Find the percent of the total that is missing, then subtract that from the total.", "Example: 200 responses with 10% missing: 20 missing, so 200 − 20 = 180 remain. Now do yours."]
    };
  }, [
    { h: "Missing data", v: "🕳️", t: "Real datasets have gaps: people skip questions or a sensor fails. You should report how much is missing." },
    { h: "Worked example", v: "10 ÷ 200 = 5%", t: "If 10 of 200 answers are missing, 5% are missing." },
    { h: "Tip", v: "💡", t: "A small share missing at random is easier to handle than a large share missing for a reason." }
  ]);

  const transferT = () => NUM("How long to copy?", () => {
    const G = pick([1, 2, 3, 4, 5, 10]), sp = pick([50, 100, 125, 200, 250, 500]), t = G * 1000 / sp;
    if (!Number.isInteger(t)) return transferT().make();
    if (Math.random() < 0.65) return {
      text: `You copy a <b>${G}</b> GB dataset to a backup drive at <b>${sp}</b> MB per second. How many seconds does it take? (1 GB = 1000 MB.)`, visual: "⏱️", answer: t,
      hints: ["Change the size into the same unit as the speed first.", "Turn GB into MB, then divide by the speed in MB per second.", "Example: 2 GB = 2000 MB at 100 MB per second takes 2000 ÷ 100 = 20 seconds. Now do yours."]
    };
    const copies = ri(3, 5);
    return {
      text: `Your project data are <b>${G}</b> GB. Under a backup plan you keep <b>${copies}</b> copies in total, including the original. How many GB of storage do the copies need altogether?`, visual: "⏱️", answer: G * copies,
      hints: ["Every copy is the same size as the original.", "Multiply the size by the number of copies in total.", "Example: 4 GB kept in 3 copies needs 4 × 3 = 12 GB. Now do yours."]
    };
  }, [
    { h: "Copy time", v: "size ÷ speed", t: "Time = size ÷ speed, as long as both use the same unit. Change GB to MB first." },
    { h: "Worked example", v: "2000 ÷ 100 = 20", t: "2 GB is 2000 MB. At 100 MB per second, copying takes 20 seconds." },
    { h: "Plan storage", v: "copies × size", t: "More copies need more room. Three copies of 4 GB need 12 GB." }
  ]);

  const filesFit = () => NUM("How many files fit?", () => {
    const T = pick([1, 2, 4, 5, 8, 10]), f = pick([2, 5, 10, 20, 25, 50, 100, 200, 250]), n = T * 1000 / f;
    if (!Number.isInteger(n)) return filesFit().make();
    if (Math.random() < 0.65) return {
      text: `A drive holds <b>${T}</b> GB. Each scanned document is <b>${f}</b> MB. How many documents fit? (1 GB = 1000 MB.)`, visual: "🗄️", answer: n,
      hints: ["Compare the size of the drive with the size of one file, in the same unit.", "Turn GB into MB, then divide by the size of one file.", "Example: a 2 GB drive is 2000 MB. With 100 MB files, 2000 ÷ 100 = 20 files. Now do yours."]
    };
    return {
      text: `You have <b>${n}</b> files that are each <b>${f}</b> MB. How many GB of space do they use in all? (1 GB = 1000 MB.)`, visual: "🗄️", answer: T,
      hints: ["Find the total in MB first.", "Multiply the files by their size, then divide by one thousand to get GB.", "Example: 40 files of 50 MB make 2000 MB, which is 2 GB. Now do yours."]
    };
  }, [
    { h: "Plan your storage", v: "🗄️", t: "Before a project begins, estimate how much space your files will need." },
    { h: "Worked example", v: "2000 ÷ 100 = 20", t: "A 2 GB drive is 2000 MB. If each file is 100 MB, 20 files fit." },
    { h: "Tip", v: "💡", t: "Leave extra room for backups and for files you did not expect." }
  ]);

  // ================= LEVEL 25 =================
  const L25 = [
    PL("Parts of a research article", "🧱", "Most scientific articles follow the same pattern, called <b>IMRaD</b>: Introduction, Methods, Results and Discussion. Knowing the parts helps you find what you need fast.", "Match the question you have to the section that answers it.", [
      "Abstract::A short summary of the whole article::📝",
      "Introduction::Explains the problem, earlier work and the research question::🚪",
      "Methods::Tells exactly how the study was done::🔧",
      "Results::Reports what was found, with data and no opinion::📊",
      "Discussion::Explains what the results mean and their limits::💬",
      "Conclusion::Wraps up the main point and what comes next::🏁",
      "References::Lists the sources the authors used::📚",
      "Keywords::Words that help databases and readers find the article::🔑"
    ]),
    SC("Read an article strategically", "🧭", "Scholarly articles are dense. You do not have to read them from top to bottom. Choose what to read and in what order, based on what you need.", "Match the reading job to the part of the article that does that job.", "You need the sample size, so you scan the Methods section instead of reading every word.", [
      "You have many articles and little time. Best first step?|Read each abstract to decide which are useful|Read every article in full|Read only the titles of the references",
      "You are lost in a very technical Methods section. A smart move is to...|read the Introduction and Discussion first for the big picture|give up on the article|skip to the reference list",
      "Which part usually states what the authors think their results mean?|Discussion|Methods|Keywords",
      "Scanning an article for one number, such as the sample size, is quickest if you check...|the Methods section|the acknowledgments|the title",
      "When reading critically, you should ask of each claim...|what evidence supports it|how long it is|what font it uses",
      "Writing one line of notes on each article you read helps you...|remember how each source fits your project|avoid reading it|make the page count bigger",
      "Figures and tables in an article are useful because...|they often show the main results at a glance|they replace the text entirely|they are always the same",
      "Reading a paper twice, once quickly and once slowly, helps because...|the second pass can focus on details you flagged|it doubles the length|it is required by law"
    ]),
    SC("Scholarly, popular or trade?", "📰", "Sources are written for different readers. <b>Scholarly</b> articles are for experts, <b>popular</b> magazines are for the general public, and <b>trade</b> publications are for people who work in one industry.", "Ask who the writer is and who the reader is.", "A glossy magazine with short, colorful stories for everyone is popular, not scholarly.", [
      "A magazine for nurses with news about hospital equipment and jobs is a...|trade publication|scholarly journal|personal diary",
      "An article with an abstract, methods and a long reference list, reviewed by experts, is most likely...|scholarly|popular|an advertisement",
      "A glossy magazine with many photos, written by staff for the general public, is...|popular|scholarly|peer-reviewed",
      "Which is written for experts in the same field?|a scholarly journal article|a celebrity magazine feature|a store flyer",
      "Trade publications are written for...|people who work in one industry|readers of comic books|only young children",
      "Which source is usually best for finding original research?|a scholarly journal|a popular magazine|a billboard",
      "A newspaper is most useful for...|current events and local news|peer-reviewed experiments|methods details",
      "Scholarly articles are often long because...|they explain methods and evidence in detail|they use big photos|they are meant to entertain"
    ]),
    pageRange(),
    PL("Wildcards and truncation", "✂️", "Databases have special symbols that make searches smarter. The symbols differ a little between databases, so check the Help page.", "Use a symbol when a word has many endings or spellings.", [
      "Truncation (*)::Searching educ* finds educate, education and educator::✂️",
      "Wildcard (?)::Stands for one letter, so wom?n finds woman and women::🃏",
      "Quotation marks::Search for an exact phrase in order::❝",
      "AND::Narrows results because both words must appear::➕",
      "OR::Widens results because either word may appear::🔀",
      "NOT::Removes results that contain a word::🚫",
      "Parentheses::Group terms so the database reads them in the right order::🧮",
      "Proximity (NEAR)::Finds words close to each other, not always side by side::📏"
    ]),
    SC("Reference managers", "🗃️", "A <b>reference manager</b> is a tool that saves your sources, notes and PDFs and builds citations in a chosen style. It saves time, but you are still responsible for accuracy.", "Think about what a tool can do for you and what only you can do.", "A manager can switch your bibliography from one style to another in seconds.", [
      "A reference manager helps you...|store sources and build citations in a chosen style|write the paper for you|avoid reading",
      "After a manager makes a citation, you should still...|check it against the style guide for mistakes|never look at it|delete the source",
      "If your teacher switches the required style, a manager can...|reformat your bibliography in the new style|erase your notes|change your thesis",
      "A saved PDF named 'download(3).pdf' is a problem because...|you will not remember what it is|PDFs are illegal|it uses no space",
      "A good habit is to save each source's details...|when you first find it|the night before it is due|never",
      "Citation tools read the web page, and sometimes miss...|the author or date, so you must check|nothing ever|the internet",
      "Tags or folders in a manager help you...|group sources by topic or chapter|print faster|skip reading",
      "Which is the right way to use a generated citation?|Proofread it and fix errors|Paste it without looking|Ignore the style"
    ]),
    PL("Lateral reading and SIFT", "↔️", "Fact-checkers do not stay on a page to judge it. They leave and see what others say. <b>SIFT</b> is a set of four moves: Stop, Investigate the source, Find better coverage, Trace claims to the original.", "When something surprises you, stop and check before you trust or share it.", [
      "Stop::Pause before sharing and ask if you know the source::✋",
      "Investigate the source::Find out who is behind the information::🔎",
      "Find better coverage::Look for other trusted reports on the same claim::📰",
      "Trace claims::Go back to the original source of a quote, number or picture::🧭",
      "Lateral reading::Leaving the page to see what others say about it::↔️",
      "Vertical reading::Staying on one page and judging it by how it looks::⬇️",
      "About page::What a site says about itself, which may be biased::ℹ️",
      "Original context::The full story around a quote or an image::🖼️"
    ]),
    citesPerYear(),
    SC("Preprints", "🌱", "A <b>preprint</b> is a paper shared publicly before peer review is finished. Preprints let new findings spread fast, but experts may not have checked them yet.", "Ask whether experts have finished judging the work.", "A news story about a new preprint should say that the result is early and not yet reviewed.", [
      "A preprint is a paper shared...|before peer review is finished|after it wins a prize|only in print",
      "How should you treat a preprint's findings?|with caution, since experts may not be done reviewing|as final proof|as fiction",
      "A preprint server is useful because...|new research becomes available quickly|it guarantees correctness|it removes errors",
      "Before citing a preprint, check whether...|a peer-reviewed version has since been published|it has pictures|it is long",
      "When you cite a preprint, you should...|say that it is a preprint|hide that fact|call it a journal article",
      "A news story reports a 'new study' that is a preprint. A smart reaction is to...|note it is not yet peer reviewed and look for more evidence|treat it as settled|share it at once",
      "Peer review usually adds...|expert checks of methods and claims|more advertisements|longer titles",
      "The final published version of a paper is often called the...|version of record|first draft|rough note"
    ]),
    PL("Study designs", "🧬", "The <b>design</b> of a study is its overall plan. Different designs answer different questions and give different strength of evidence.", "Ask: did the researchers assign people to groups, or just watch what happened?", [
      "Randomized controlled trial::Participants are randomly put into a treatment or control group::🎲",
      "Cohort study::Follows a group over time to see who develops an outcome::⏳",
      "Case-control study::Compares people who have an outcome with similar people who do not::🔍",
      "Cross-sectional study::Measures many people at a single point in time::📸",
      "Case study::An in-depth look at one person, place or event::🏘️",
      "Meta-analysis::Combines the results of many studies using statistics::➕",
      "Ethnography::The researcher spends time in a community to observe daily life::🏕️",
      "Quasi-experiment::Compares groups without random assignment::⚖️"
    ]),
    fileSize(),
    SC("From question to search terms", "🔤", "A research question is a sentence. A database search needs <b>keywords</b>: the main ideas, plus synonyms and related words that other authors might use.", "Pick out the important nouns and ideas, and try other words for each one.", "For 'How does sleep affect teen grades?' you could search sleep, adolescents and academic performance.", [
      "Question: How does sleep affect teen grades? Which are the best keywords?|sleep, adolescents, academic performance|how, does, affect|teen, the, of",
      "Why list synonyms for each key idea?|different authors use different words|to make the search longer|it is a rule",
      "'Adolescents' and 'teenagers' are examples of...|synonyms to try in a search|citations|titles",
      "A search with too few results can often be fixed by...|using broader or alternate terms|adding more AND words|quitting",
      "A search with thousands of results can be fixed by...|adding a specific term or filter|removing all the words|searching a blank box",
      "Which part of a question is NOT useful as a keyword?|filler words like 'how' and 'does'|the main topic|the group studied",
      "Subject headings (controlled vocabulary) help because...|they group items on one topic under one agreed term|they hide articles|they cost money",
      "A good article you found lists keywords. You can...|reuse them as search terms|ignore them|erase them"
    ]),
    SC("Reading error bars", "📏", "Many charts add <b>error bars</b> to show how uncertain or spread out a result is. Reading them stops you from reading too much into small differences.", "Look at how much the bars overlap and how long they are.", "Two bars that are different in height but have long, overlapping error bars may not be truly different.", [
      "On a chart, error bars show...|how uncertain or spread out the measurement is|the title|the color key",
      "Two bars whose error bars overlap a lot probably show...|a difference that may be due to chance|a big certain difference|a mistake in the axis",
      "Longer error bars mean...|more uncertainty or spread|more certainty|a different chart type",
      "A bar chart with no error bars leaves out...|a sense of how uncertain the values are|the bars|the labels",
      "Always check what error bars represent, because they might show...|standard deviation, standard error or a confidence interval|the date|the font",
      "A y-axis that starts at 50 instead of 0 can...|make small differences look big|make the chart more honest|hide the title",
      "Before trusting a chart, read...|the axis labels and units|only the color|the artist's name",
      "A tiny difference with very large error bars is probably...|not meaningful|a major breakthrough|proof"
    ]),
    pagesWords(),
    PL("Ways of reading", "👓", "Different reading jobs need different reading methods. Good researchers switch between them.", "Name your goal first, then pick the reading method that fits.", [
      "Skimming::A quick look to get the main idea::👀",
      "Scanning::Hunting for one specific fact::🎯",
      "Close reading::Slow, careful reading of a short passage::🔬",
      "Critical reading::Questioning the author's claims and evidence::🧐",
      "Annotating::Writing notes in the margins as you read::✏️",
      "Previewing::Looking at headings, abstract and figures before reading::🗺️",
      "Re-reading::Reading again to catch details::🔁",
      "Summarizing::Writing the main points in your own words::📝"
    ]),
    SC("Read a syllabus", "📋", "A <b>syllabus</b> is the plan for a college course. It lists due dates, grading, rules and the citation style. Reading it carefully saves trouble later.", "Ask what the syllabus can tell you before you ask anyone else.", "The syllabus says papers use APA style and are due on the 15th, so you plan your citations in APA.", [
      "Where do you find the due dates for papers in a course?|the syllabus|the cafeteria menu|a library receipt",
      "Office hours are times when...|your instructor is available to answer questions|the library is closed|exams are given",
      "If the syllabus names 'Chicago style', your citations should...|follow Chicago style|use any style you like|have no format",
      "A late-work policy tells you...|what happens if you turn work in after the deadline|when class ends|where to park",
      "Learning outcomes on a syllabus tell you...|what you should be able to do by the end|what lunch is|your final grade already",
      "A paper worth 30% of the grade means...|it counts for 30 out of every 100 points|it is optional|it must be 30 pages",
      "You are unsure what a syllabus rule means. Best step?|ask the instructor early|ignore it|guess after the due date",
      "An academic integrity policy in a syllabus says...|what counts as cheating and what happens|nothing important|the weather"
    ]),
    SC("Honesty in college work", "🎓", "College courses have an honor code or integrity policy. Rules differ between classes, so always check what is allowed: working together, sharing notes, or using tools.", "When a rule is unclear, ask your instructor before you act.", "A professor says 'work alone'. Sharing your answers would break that rule even if it feels friendly.", [
      "A professor says 'work alone'. You should...|not share your answers or write together|share with friends|copy drafts",
      "Studying together before an assignment is...|usually fine unless the rules forbid it|always cheating|illegal",
      "Handing in the same paper for two classes without permission is...|duplicate submission, which is often not allowed|good time management|always allowed",
      "Making up a source or data is called...|fabrication|collaboration|paraphrase",
      "If you are unsure whether a tool, such as an AI helper, is allowed, you should...|ask your instructor before using it|use it in secret|assume yes",
      "Giving a friend your finished paper to copy is...|not allowed and can get you both in trouble|kind and harmless|good citing",
      "Collusion means...|working together when you were told to work alone|working alone|citing well",
      "A writing center can help with...|planning, structure and clarity without writing it for you|writing the final paper for you|changing grades"
    ]),
    rSquared()
  ];

  // ================= LEVEL 26 =================
  const L26 = [
    PL("From manuscript to journal", "🛤️", "Publishing a scholarly paper takes many steps and often months. Knowing the path helps you plan and stay patient.", "Follow the paper in order: write, submit, review, revise, accept, publish.", [
      "Manuscript::The paper an author writes and sends to a journal::📄",
      "Submission::Sending the manuscript to a journal's editor::📨",
      "Desk rejection::The editor turns the paper down before sending it to reviewers::🚪",
      "Peer review::Experts in the field judge the quality of the paper::🔬",
      "Revise and resubmit::The editor asks for changes before deciding again::🔁",
      "Acceptance::The journal agrees to publish the paper::✅",
      "Proofs::The final typeset version authors check for small errors::🔍",
      "Embargo::A waiting period before a work can be shared openly::⏳"
    ]),
    SC("Answering reviewers", "📬", "Reviewers' comments can feel harsh, but they help make a paper stronger. A good <b>response letter</b> thanks reviewers, answers every point and shows what changed.", "Think of reviewers as people trying to help improve the work.", "A reply such as 'Thank you. We added the missing detail to the Methods on page 6' is clear and polite.", [
      "A reviewer points out a real flaw in your methods. A good reply is to...|thank them and explain how you fixed it|ignore it|argue that they are rude",
      "If you disagree with a reviewer's comment, you should...|respectfully explain your reasons with evidence|insult them|disappear",
      "A response letter should address...|every comment, one by one|only the easy ones|none of them",
      "A rejected paper can still help you because...|the feedback can improve your next version|it proves you cannot write|it must be deleted",
      "'Major revisions' means...|substantial changes are needed before acceptance is possible|accepted as is|never submit again",
      "Reviewer comments are best seen as...|help to make the work stronger|personal attacks|orders to obey without thinking",
      "The tone of a response letter should be...|polite and professional|angry|joking",
      "When you change the paper, you should show reviewers...|where the changes were made|nothing|only the title"
    ]),
    PL("Authors and credit", "🏅", "Research is often teamwork. Papers show who did what through author order and extra notes. Fair credit is part of research honesty.", "Ask: who did the work, who handles questions, and who only helped?", [
      "First author::Usually the person who did the most work on the project::🥇",
      "Corresponding author::The author who handles questions and talks with the journal::✉️",
      "Last author::In many sciences, often the senior researcher who led the lab::🧭",
      "Co-author::Someone who made a major contribution and shares credit and responsibility::🤝",
      "Acknowledgments::Thanks to people who helped but did not earn authorship::🙏",
      "Funding statement::Tells who paid for the research::💰",
      "Contributor roles::A list showing who did what, such as data collection or writing::📋",
      "Ghost authorship::Hiding someone who did major work from the author list, which is dishonest::👻"
    ]),
    SC("Who counts as an author?", "✍️", "Authorship should go to people who made a real intellectual contribution and who take responsibility for the work. Others who helped are thanked in the acknowledgments.", "Ask who made a real intellectual contribution and who helped from the side.", "A friend who lent a printer is thanked, but a teammate who designed and analyzed the study is an author.", [
      "Someone only lent you equipment. They usually belong in...|the acknowledgments|the author list|the title",
      "Someone helped design, analyze and write the study. They should be...|listed as an author|left out|paid a fee",
      "Adding a famous name who did no work just to look good is...|dishonest (honorary authorship)|smart|good practice",
      "Authors agree to share...|responsibility for the work|nothing|only the credit",
      "Disagreements about author order are best handled...|early, with an open conversation|after publication|in secret",
      "Which belongs in an acknowledgments section?|a librarian who helped find sources|the main data analyst|the lead writer",
      "Why does listing contributor roles matter?|readers can see who did what|it makes the paper longer|it hides people",
      "If a mistake is found after publication, authors should...|tell the journal so it can issue a correction|hope nobody notices|delete the paper silently"
    ]),
    PL("Identifiers", "🪪", "Identifiers are codes that point to exactly one thing. They are more reliable than titles or web addresses, which can change.", "Match the code to what it names: a person, a book, a journal, an article, or a shelf spot.", [
      "DOI::A permanent code that links to one online article or dataset::🔗",
      "ORCID iD::A number that identifies a researcher and keeps their work together::🪪",
      "ISBN::An international number that identifies a particular book edition::📕",
      "ISSN::A number that identifies a journal or other series::📰",
      "PMID::An ID number for an article in the PubMed biomedical database::🧬",
      "URL::A web address that can change or break::🌐",
      "Accession number::A code that identifies an item in an archive, museum or data repository::🏷️",
      "Call number::A shelf code that tells where a library item lives::📚"
    ]),
    bonf(),
    SC("Signposting your writing", "🪧", "<b>Signposts</b> guide readers through your argument. Transitions such as however, therefore and for instance show how ideas connect, and topic sentences say what a paragraph is about.", "Ask what relationship the next idea has to the last one: contrast, result, addition or example.", "'However' warns the reader that a contrast is coming.", [
      "Words like 'however' and 'therefore' are called...|transitions|citations|titles",
      "'However' signals...|a contrast or turn|an addition of the same idea|the end of the paper",
      "'Furthermore' signals...|another point in the same direction|an opposite idea|a quotation",
      "'Consequently' signals...|a result or effect|a contrast|an example",
      "A topic sentence tells the reader...|what the paragraph is about|the page number|the author's age",
      "A roadmap sentence in an introduction...|previews the order of the paper|lists the references|hides the thesis",
      "Which sentence is better signposting?|'Next, I show how the second study differs.'|'Stuff happened.'|'Okay so.'",
      "'For instance' introduces...|an example|a contrast|a conclusion"
    ]),
    SC("Write for a general reader", "🗣️", "A <b>plain-language summary</b> explains research to people outside the field. It uses everyday words, starts with why the work matters, and is honest about limits.", "Imagine explaining to a smart friend who has never taken the course.", "'People who slept more scored higher' is clearer than 'sleep duration was positively associated with performance'.", [
      "A plain-language summary is written for...|people outside the field|only experts|only the editor",
      "To explain 'statistically significant' to the public, you might say...|the pattern was unlikely to be just chance|p below .05 rejects the null at alpha|it is important",
      "Jargon in a plain-language summary should be...|replaced with everyday words or explained|used as much as possible|hidden in footnotes",
      "A good plain-language summary leads with...|why the research matters and what was found|the full list of methods|the reference list",
      "Overstating results to sound exciting is...|misleading|honest|required",
      "Which sentence is better for a general reader?|People who slept more scored higher on the test.|Sleep duration was positively correlated with performance.|Zzz.",
      "An analogy can help explain an idea if it is...|accurate and familiar|confusing|very long",
      "Adding limitations to a plain-language summary shows...|honesty about what the study cannot say|weakness only|nothing"
    ]),
    sdHand(),
    SC("Synthesis matrix", "🧩", "A <b>synthesis matrix</b> is a table that compares your sources side by side: sources down one side and themes or questions across the top. It helps you combine ideas instead of just summarizing each source.", "Look for patterns across sources, not just facts about each one.", "A table row for each source and a column for 'sample size' helps you compare quickly.", [
      "A synthesis matrix is a table that...|compares sources across the same questions or themes|lists page numbers only|hides sources",
      "In a matrix, rows are often...|sources|page margins|fonts",
      "A matrix helps you see...|where sources agree, disagree or leave gaps|font sizes|word counts",
      "Synthesis is different from summary because it...|combines ideas across sources to make a new point|retells each source separately|copies sources",
      "A paragraph that says 'Source A says…, Source B says…, Source C says…' with no links is mostly...|summary, not synthesis|synthesis|a citation",
      "Which sentence shows synthesis?|Both studies found the same effect, but they differ on why.|Study 1 is about reading.|I read three studies.",
      "Grouping sources by theme instead of by source helps you...|build an argument|avoid reading|add pages",
      "When two sources disagree, a good writer...|explains possible reasons for the difference|hides one|picks randomly"
    ]),
    SC("Slides that work", "🖥️", "Slides support your talk; they are not your script. Good slides are simple, readable and honest about sources.", "Picture someone in the back of the room trying to read your slide.", "One chart with a clear title and large labels beats a slide full of small text.", [
      "A good slide has...|little text and one main idea|full paragraphs|ten fonts",
      "Reading your slides word for word is...|dull; talk to the audience instead|best|required",
      "Charts on slides should have...|clear labels and large text|tiny labels|no title",
      "Colors on slides should have...|strong contrast so everyone can read|similar colors|flashing effects",
      "Sources on slides should be...|credited briefly on the slide or a final slide|never mentioned|hidden",
      "How many main ideas per slide is best?|one|fifteen|none",
      "To prepare for questions, you should...|practice and think of likely questions|memorize nothing|skip rehearsal",
      "If you run out of time, you should...|summarize the key point and stop|speak faster and faster|skip your conclusion silently"
    ]),
    dataCells(),
    SC("Methods others can follow", "🔁", "A good <b>methods section</b> is a recipe. It tells readers enough about participants, materials and steps that another researcher could repeat the study.", "Imagine someone else trying to repeat your work with only your words to guide them.", "'We surveyed 120 first-year students in March' is better than 'we asked some students'.", [
      "Methods should be written so that...|another researcher could repeat the study|nobody understands|only you know",
      "A methods section should include...|participants, materials and steps|opinions only|jokes",
      "Leaving out the exact survey questions makes a study...|harder to check or repeat|easier to check|stronger",
      "Writing 'we used a few students' is weak because...|it does not give the actual number|it is too exact|it is too long",
      "Past tense is common in methods because...|it describes what was already done|it is about the future|it is a joke",
      "Software and its version should be listed because...|results can differ between versions|it fills space|it is required in all papers",
      "Which detail helps replication most?|exact steps and measurements|a pretty cover|the author's pet",
      "Describing how you excluded data points...|keeps the study honest|is not needed|hides bias"
    ]),
    PL("Creative Commons and other licenses", "🔓", "A <b>license</b> tells others what they may do with your work. Creative Commons (CC) licenses use short codes. Always check the license before you reuse something.", "Read the letters: BY means credit, NC means no commercial use, ND means no changes, SA means share alike.", [
      "CC BY::Others may reuse the work if they give credit to the creator::©️",
      "CC BY-NC::Reuse with credit, but not for commercial use::🚫",
      "CC BY-SA::Reuse with credit, and new works must use the same license::🔄",
      "CC BY-ND::Reuse with credit, but no changes to the work::🔒",
      "CC0::The creator gives up rights as far as the law allows::🕊️",
      "Public domain::Work whose rights have ended or never applied, free for anyone::🌍",
      "All rights reserved::The owner keeps all rights unless they give permission::📕",
      "Open license::A statement that lets people reuse a work under stated conditions::📜"
    ]),
    SC("Similarity reports", "🕵️", "Schools may use a tool that compares your paper with other texts and gives a <b>similarity report</b>. It highlights matching text. A person must still judge whether the matches are a problem.", "Ask what matched, and whether it was credited properly.", "A matched passage that is in quotation marks and cited is fine; a matched passage with no credit is a problem.", [
      "A similarity report shows...|text that matches other sources|your grade|your typing speed",
      "Does a high similarity score always mean plagiarism?|No, quotes and references can match too|Yes, always|Only on short papers",
      "Does a low similarity score prove the paper is honest?|No, ideas can be taken without matching words|Yes, always|Only for long papers",
      "A teacher reviewing a report should look at...|what is matched and whether it is cited|only the percent|the font",
      "If a report flags your properly quoted passage, it...|is expected because the quote is cited|means you cheated|should be deleted",
      "To stay honest, you should...|cite sources and put quotes in quotation marks|add random words|change fonts",
      "Do checkers always catch ideas used without credit?|not always, so citing ideas matters|always|never matter",
      "The best use of a similarity checker, if allowed, is to...|catch missing citations before submitting|trick your teacher|write your paper"
    ]),
    SC("Citing data and software", "💽", "Data and software are sources too. Cite the dataset or program you used, with its creator, year, title, version and a link or DOI, so readers can find the same thing.", "Treat data and code like any other source you must credit.", "A dataset citation lists the creators, year, title, repository and DOI.", [
      "If you use a public dataset, you should...|cite the dataset like any other source|not mention it|claim you collected it",
      "A dataset citation often includes...|creator, year, title, repository and a DOI or link|only the title|a photo",
      "If you used special software, you should mention...|its name and version|nothing|your computer's color",
      "Citing data lets readers...|find and check the same data|ignore it|pay for it",
      "Using someone's data without credit is...|a form of plagiarism|fine|required",
      "A repository record with a DOI gives data a...|stable, citable address|longer file|nickname",
      "Code you reused from a public project should be...|credited and used under its license|claimed as yours|deleted",
      "Readers need the dataset version because...|data can be updated and results change|versions are decorations|nobody cares"
    ]),
    SC("Citations and attention", "📣", "<b>Citation counts</b> measure how often scholars cite a paper. <b>Altmetrics</b> measure attention such as news, social posts and downloads. Neither one proves a paper is good.", "Ask what each number really counts.", "A paper can get lots of attention because it is surprising, even if it is weak.", [
      "Altmetrics measure...|attention such as news, social posts and downloads|only citations|page count",
      "Citation counts measure...|how often other scholarly works cite a paper|how many pictures it has|how many pages it has",
      "High online attention means the research is good?|not necessarily; attention is not quality|yes, always|only on weekends",
      "A paper can have many citations because...|it is important, or because people criticize it|it is always right|it is short",
      "A new paper has few citations probably because...|it is too new to have been cited yet|it is wrong|nobody can read",
      "Download counts show...|interest, not proof of quality|quality|truth",
      "The best way to judge a paper's quality is to...|read it and check methods and evidence|count likes|check the font",
      "Metrics like these should be used...|carefully, with other evidence|as the only judge|never"
    ]),
    regLine()
  ];

  // ================= LEVEL 27 =================
  const L27 = [
    PL("Data management plan", "📋", "A <b>data management plan</b> (DMP) says how you will collect, store, protect, share and eventually remove your data. Many funders and colleges ask for one before research starts.", "Walk through the life of the data: collect, store, protect, share, keep or delete.", [
      "Data management plan::A document describing how data will be collected, stored, shared and kept::📋",
      "Data types::What kinds of data you will collect, such as surveys or recordings::🧾",
      "Storage::Where the data will be kept safely while you work::💾",
      "Backup::Extra copies in other places in case one is lost::🛟",
      "Access rules::Who is allowed to see or change the data::🔑",
      "Sharing plan::How and when the data will be made available to others::📤",
      "Retention::How long the data will be kept before being deleted::⌛",
      "Documentation::Notes explaining what the data mean so others can use them::📝"
    ]),
    SC("Name your files well", "🏷️", "Good <b>file names</b> and folders save hours. Make names clear, consistent and sortable, with no spaces or odd symbols, and keep versions in the name.", "A good name lets a stranger guess what is inside.", "2026-03-14_interviews_v2.csv says when, what and which version.", [
      "Which file name is best?|2026-03-14_interviews_v2.csv|final FINAL new!!.csv|data (3).csv",
      "Dates written year-month-day (2026-03-14) are useful because...|files sort in time order|they look fancy|they use less space",
      "Spaces and odd symbols in file names can...|cause errors in some software|make files safer|speed things up",
      "A good file name tells you...|what, when and which version|only a mood|nothing",
      "Using v1, v2 in names helps you...|track versions|hide files|save space",
      "Which folder layout is clearer?|Project > Data > Raw|Stuff > New > Misc2|Folder > Folder > Folder",
      "Why agree on naming rules in a team?|everyone can find files fast|it looks neat only|it is the law",
      "File names should be...|short but descriptive|as long as a paragraph|just a number like 1"
    ]),
    SC("The 3-2-1 backup rule", "🛟", "Computers fail, drives break and files get deleted. The <b>3-2-1 rule</b> is a famous guide: keep 3 copies of your data, on 2 different kinds of storage, with 1 copy kept somewhere else.", "Remember the three numbers in the rule's name, in order.", "Copies on a laptop, an external drive and a school cloud account follow the rule.", [
      "In the 3-2-1 rule, how many copies are kept in a different place?|1|2|3",
      "One copy of your data on a single laptop is...|risky; if it breaks you lose everything|safe|a real backup",
      "Cloud storage can be...|one possible copy kept somewhere else|never allowed anywhere|always private by default",
      "A backup you never test is...|not trustworthy until you check that it restores|perfect|illegal",
      "A second copy on the same drive protects you from...|accidentally deleting a file, but not drive failure|drive failure|fire",
      "When should you back up your data?|regularly, on a schedule|only after a disaster|never",
      "Sensitive data in backups should be...|protected, for example with encryption and passwords|left open|emailed around",
      "Syncing to the cloud is not a real backup if...|deleting a file also deletes it everywhere|files are small|you use wifi"
    ]),
    SC("Raw data vs processed data", "🧼", "<b>Raw data</b> are the untouched originals. <b>Processed data</b> have been cleaned or calculated. Keep the raw files safe and make every change on a copy, with notes on what you did.", "Ask: could someone trace every number back to the original?", "Keep the raw spreadsheet as it was, clean a copy, and write down each step.", [
      "Raw data should be...|kept untouched in a separate folder|edited directly|deleted after cleaning",
      "Cleaning steps should be done on...|a copy, with notes on what you changed|the raw file|memory",
      "Why keep a record of every cleaning step?|so others can repeat and check your work|it is boring|to fill space",
      "Processed data are...|data after cleaning or calculating|the first recording|a backup",
      "If you fix a typo in the raw file and forget, then...|nobody can tell what changed|the file improves|it is documented",
      "A script or log of changes is better than...|doing edits by hand and forgetting them|writing them down|keeping the raw file",
      "Final results should come from...|processed data you can trace back to the raw data|numbers from memory|guesses",
      "Which folder layout is good?|raw, processed and results kept apart|everything in one pile|only one file"
    ]),
    PL("Data cleaning words", "🧹", "Before analysis, data need checking. <b>Data cleaning</b> finds and handles gaps, typos and strange values, and notes every choice.", "Look first, fix second, and write down what you did.", [
      "Missing value::An empty spot where an answer or measurement should be::🕳️",
      "Duplicate::A record that appears more than once by mistake::👯",
      "Outlier::A value far from the others that should be checked::📍",
      "Data entry error::A typo made when typing in a value::⌨️",
      "Coding::Turning answers into labels or numbers for analysis::🔢",
      "Recoding::Changing categories, such as grouping ages into bands::🔄",
      "Validation::Checking that values are sensible and in range::✅",
      "Imputation::Filling a missing value with an estimate, using a stated method::🧩"
    ]),
    missPct(),
    SC("Versions and tracked changes", "🕰️", "Documents and data change over time. <b>Version control</b> and tracked changes record who changed what and when, so you can compare drafts and undo mistakes.", "Think of a history you can look back through.", "Before a big edit, save a new version so you can return to the old one.", [
      "Why keep older versions of a draft?|you can return to an earlier idea or fix a mistake|to fill the disk|it is required",
      "Version control tools record...|who changed what and when|only passwords|only titles",
      "Two people editing separate emailed copies of one file risks...|conflicting versions|speed|better work",
      "A good way for several people to draft together is...|one shared document with tracked changes or history|ten emailed copies|a USB stick left behind",
      "Tracked changes help because...|you can see and accept or reject edits|they hide edits|they delete text",
      "Naming a file 'final', then 'final2', shows...|a weak versioning habit|great practice|an error in the file",
      "Before making big edits, you should...|save a new version first|delete the old one|close the file",
      "A change log...|lists what changed between versions|erases changes|names the font"
    ]),
    PL("Documenting your data", "📘", "Data without notes are hard to use, even for you six months later. Documentation tells people what each column means and where the data came from.", "Write the notes for a stranger who has never seen your project.", [
      "README::A file that explains what a folder or dataset contains::📄",
      "Codebook::A guide that lists each variable, its meaning and its codes::📘",
      "Data dictionary::A table describing each field, its type and allowed values::🗂️",
      "Variable label::A readable name that explains what a column measures::🏷️",
      "Units::What a number measures, like minutes or kilograms::📏",
      "Provenance::Where the data came from and how they were collected::🧭",
      "Change log::A list of edits made to a file over time::🧾",
      "License::Tells others how they may reuse the data::📜"
    ]),
    SC("De-identifying data", "🕶️", "Data about people must protect them. <b>De-identifying</b> means removing or changing details that could point to a person, such as names, contact details and rare traits.", "Ask whether a stranger could work out who a person is from the details left.", "Replacing a name with P01 helps, but a rare job plus a small town could still point to someone.", [
      "De-identifying data means...|removing details that could point to a person|adding names|making it public",
      "Which is a direct identifier?|a full name|the year of the study|the topic",
      "A combination such as age, small town and job can...|identify someone even without a name|never matter|be shared freely",
      "Replacing names with codes like P01 is...|a start, but the key linking codes to names must be kept apart and safe|all you ever need|illegal",
      "Rare details in quotes, like a unique job, can be...|changed or removed to protect privacy|highlighted|required",
      "Small groups are risky because...|few people share the same traits, making them easy to spot|they are fun|they have more data",
      "Who should see the file linking codes to real names?|only people who need to, as approved|everyone|the public",
      "Before sharing a dataset publicly, you should...|check it for identifying details|post it right away|add names"
    ]),
    PL("FAIR data", "♻️", "Open science asks that data be <b>FAIR</b>: Findable, Accessible, Interoperable and Reusable. FAIR data are useful long after the first project ends.", "Say the four words in order and think of one thing that makes data fit each.", [
      "Findable::Data have a unique ID and good descriptions so people can locate them::🔎",
      "Accessible::People can get the data, perhaps after a login, by a clear method::🔓",
      "Interoperable::Data use common formats so different tools can work together::🔌",
      "Reusable::Data have clear licenses and documents so others can use them again::♻️",
      "Persistent identifier::A lasting ID such as a DOI that does not change::🔗",
      "Open format::A file type anyone can open without special paid software::📂",
      "Restricted access::Data shared only with approved people because of privacy::🛑",
      "Repository::A trusted online archive where data are deposited::🏛️"
    ]),
    PL("Experimental design words", "🧪", "How you build a study changes what it can show. These words describe how people are placed in groups and how bias is reduced.", "Ask: who is in each group, who knows what, and what is left to chance?", [
      "Between-subjects::Different people are in each group::👥",
      "Within-subjects::The same people take part in every condition::🔂",
      "Control group::The group that does not get the treatment, for comparison::⚖️",
      "Random assignment::Chance decides who goes into which group::🎲",
      "Counterbalancing::Changing the order of conditions across people to balance order effects::🔀",
      "Blinding::Participants (and sometimes researchers) do not know who gets what::🙈",
      "Placebo::A look-alike treatment with no real effect::🎭",
      "Pilot study::A small trial run to find problems before the real study::🧭"
    ]),
    SC("Confounding variables", "🌀", "A <b>confounder</b> is an outside factor linked to both the cause and the effect, so it can create a link that is not real or hide one that is. Good design and analysis try to deal with confounders.", "Ask what else could explain the pattern.", "Ice cream sales and swimming accidents both rise in summer; hot weather is the confounder.", [
      "Ice cream sales and swimming accidents both rise in summer. Hot weather is a...|confounding variable|dependent variable|citation",
      "Random assignment helps reduce confounding because...|it spreads other differences evenly across groups by chance|it removes all people|it hides data",
      "Coffee drinkers have more heart problems, but they also smoke more. Smoking is a possible...|confounder|result|hypothesis",
      "To handle a known confounder you can...|measure it and adjust for it in the analysis|ignore it|delete it",
      "Matching participants means...|pairing people alike on key traits across groups|picking friends|using random names",
      "Why can an observational study not fully rule out confounders?|unmeasured factors may still exist|it is illegal|it uses numbers",
      "Students who study in the library get better grades. A possible confounder is...|how motivated they already are|the color of the walls|the day of the week",
      "A confounder is dangerous because it can...|make a false link look real or hide a real one|add citations|fix the study"
    ]),
    SC("Preregistration and replication", "📌", "<b>Preregistration</b> means writing your plan and analyses before you see the data. It guards against changing the question to fit the results. <b>Replication</b> means repeating a study to see if it holds up.", "Ask what was decided before the data and what was decided after.", "Marking an analysis you thought of later as 'exploratory' keeps the report honest.", [
      "Preregistration means...|writing your plan and analyses before collecting data|publishing after the fact|hiding data",
      "Preregistering helps prevent...|changing the question after seeing the results|collecting data|reading",
      "If you do an analysis that was not in your plan, you should...|label it exploratory|pretend it was planned|delete the plan",
      "Replication means...|repeating a study to see if results hold|copying text|citing",
      "A failed replication suggests...|the original finding may be weaker than thought|nothing at all|the field is over",
      "Registered reports are accepted...|based on the plan, before results exist|after results are known|by lottery",
      "Sharing your materials and code helps others...|check and repeat your work|steal it|ignore it",
      "HARKing means...|presenting a hypothesis made after seeing results as if it were planned|hiring a writer|looking back at old notes"
    ]),
    SC("Ethics review (IRB)", "🏛️", "At colleges, research involving people is reviewed by an ethics board, often called an <b>IRB</b>, before it begins. The board checks that risks are small and that participants are protected.", "Ask what protects the people taking part.", "A plan that explains consent, privacy and the right to stop is what an ethics board looks for.", [
      "An ethics board (IRB) at a college reviews...|research involving people before it begins|library fines|dorm rules",
      "You must get ethics approval...|before collecting data from people|after publication|never",
      "An IRB asks about risks to participants and how...|you will protect them|your hobbies|your age",
      "Research with minors often needs extra protection, such as...|permission from a parent or guardian plus the child's agreement|nothing|payment",
      "A class assignment that only practices a method may follow different rules than real research, so...|ask your instructor|assume none apply|do not read the rules",
      "If you change your study plan after approval, you should...|tell the board and get approval for the change|ignore it|hide it",
      "Participants have the right to...|stop at any time|be forced|be tricked",
      "Data from people should be stored...|securely, following the approved plan|on a public site|on a sticky note"
    ]),
    transferT(),
    SC("Working with an advisor", "🧑‍🏫", "In college you may work with a research advisor or mentor. They guide you, but you do the work. A good relationship uses clear questions, short updates and honest talk about progress.", "Think about what helps an advisor help you.", "Sending a short summary after each meeting keeps both of you on the same page.", [
      "A research advisor is someone who...|guides and gives feedback on your project|writes it for you|grades other students",
      "Before a meeting with your advisor, bring...|a short list of questions and progress notes|nothing|complaints only",
      "After a meeting, a smart habit is to...|send a short summary of what was agreed|forget it|argue about it",
      "If you are behind schedule, you should tell your advisor...|early, with a plan to catch up|never|after the due date",
      "Feedback from an advisor is best used by...|making revisions and asking about unclear points|arguing every point|ignoring it",
      "A good question for an advisor is...|specific and shows what you already tried|'What should I do?' with no context|'Is it good?'",
      "Office hours are often best for...|questions about ideas, sources and feedback|asking for free printing|napping",
      "A research log shared with an advisor helps...|show progress and decisions over time|hide mistakes|add length"
    ]),
    PL("Kinds of variables", "🎚️", "Researchers name variables by the job they do in a study. Naming them clearly helps you design a fair test and read other people's results.", "Ask what is changed, what is measured, what is held steady, and what could muddy the link.", [
      "Independent variable::What the researcher changes or compares::🎚️",
      "Dependent variable::What is measured to see the effect::📏",
      "Control variable::Something kept the same so it cannot change the results::🔒",
      "Confounding variable::An outside factor that mixes up the link between two things::🌀",
      "Mediator::A step in between that explains how one thing affects another::🌉",
      "Moderator::A factor that changes how strong the link is::🎛️",
      "Covariate::A variable measured and adjusted for in the analysis::➗",
      "Dummy variable::A 0 or 1 code that marks a group in analysis::0️⃣"
    ]),
    filesFit()
  ];

  Object.assign(LIBRARY_LEVELS, {
    25: lvl(25, L25, [0, 1, 2, 4, 7, 8, 10, 15]),
    26: lvl(26, L26, [0, 1, 3, 5, 8, 9, 12, 14]),
    27: lvl(27, L27, [0, 1, 3, 6, 8, 10, 12, 15])
  });
})();
