// ext/library-4-6.js  Mind Lab Library Skills, levels 4-6 (60 lessons)
(() => {
  const S = (a, n) => shuf(a).slice(0, n);
  const lead = s => String(s).replace(/<[^>]+>/g, "").replace(/^[^A-Za-z0-9]+/, "")[0].toUpperCase();

  // pairs lesson: rows are "term::description::emoji"
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
        hints: ["Think back to the lesson. What did you learn about this word?", `The right answer starts with "${lead(cur.d)}".`, exh]
      };
    };
    make.teach = () => [
      { h: title, v, t: intro },
      { h: "Remember these", v: pairs.map(p => `${p.e ? p.e + " " : ""}<b>${p.t}</b>: ${p.d}`).join("<br>"), t: "Read each one slowly, out loud." },
      { h: "Tip", v: "💡", t: tip }
    ];
    return { title, make };
  };
  // scenario lesson: rows are "question|right|wrong|wrong(|wrong)"
  const SC = (title, v, intro, clue, example, rows) => {
    const items = rows.map(r => r.split("|"));
    const make = () => {
      const [q, a, ...ws] = pick(items);
      return { text: q, choices: shuf([a, ...S(ws, 2)]), answer: a, hints: ["Read every choice slowly and picture it.", clue, `Example: ${example} Now do yours.`] };
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
  const LAST = ["Adams", "Baker", "Clark", "Davis", "Evans", "Foster", "Green", "Hill", "Jones", "King", "Lopez", "Moore", "Nelson", "Owens", "Parker", "Reed", "Scott", "Turner", "Young", "Wood"];
  const authorOrder = () => {
    const make = () => {
      const ws = S(LAST, 3), srt = ws.slice().sort(), last = Math.random() < 0.4;
      const ans = last ? srt[2] : srt[0];
      return {
        text: `On the fiction shelf, books go in ABC order by the author's <b>last name</b>. Which author comes <b>${last ? "last" : "first"}</b>?`, choices: shuf(ws), answer: ans,
        hints: ["Look only at the last names, and think of the alphabet song.", `The first letters are ${shuf(ws.map(w => w[0])).join(", ")}. Which one is ${last ? "latest" : "earliest"} in the alphabet?`, `Example: Ames comes before Bell, because A comes before B. Now do yours.`]
      };
    };
    make.teach = () => [
      { h: "Fiction shelves", v: "📚 A B C ...", t: "Story books (fiction) are in ABC order by the <b>last name</b> of the author." },
      { h: "Find your book", v: "Adams · Clark · Young", t: "Look at the first letter of the last name. A is near the start of the shelf, and Y is near the end." },
      { h: "Tip", v: "💡", t: "If two authors start with the same letter, look at the second letter." }
    ];
    return { title: "Fiction shelf order", make };
  };
  const numOrder = () => {
    const make = () => {
      let ns; do { ns = [0, 0, 0].map(() => ri(1, 9) * 100 + ri(0, 99)); } while (new Set(ns).size < 3 || new Set(ns.map(n => Math.floor(n / 100))).size < 3);
      const srt = ns.slice().sort((a, b) => a - b), last = Math.random() < 0.4;
      return {
        text: `Nonfiction books go on the shelf in number order. Which book comes <b>${last ? "last" : "first"}</b>?`, choices: shuf(ns), answer: last ? srt[2] : srt[0],
        hints: ["Compare the numbers. Start with the hundreds digit, the first one.", `The hundreds digits are ${shuf(ns.map(n => Math.floor(n / 100))).join(", ")}. Which is ${last ? "biggest" : "smallest"}?`, "Example: 245, 612 and 380. The smallest hundreds digit is 2, so 245 comes first. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Nonfiction shelves", v: "📗 120 · 340 · 590", t: "Fact books (nonfiction) have a number on the spine. They go on the shelf from the smallest number to the biggest." },
      { h: "Compare numbers", v: "245 < 612", t: "Look at the first digit first. A small first digit means the book comes earlier on the shelf." },
      { h: "Tip", v: "💡", t: "If the first digits match, check the next digit." }
    ];
    return { title: "Nonfiction number order", make };
  };
  const CH = ["The Big Storm", "A New Friend", "The Lost Key", "The Secret Door", "Under the Sea", "The Race", "A Surprise", "Home at Last"];
  const tocPages = () => {
    const make = () => {
      const ts = S(CH, 4); let p = ri(1, 5); const pages = ts.map(() => (p += ri(5, 14)));
      const list = ts.map((t, i) => `Chapter ${i + 1}: ${t} ...... ${pages[i]}`).join("<br>");
      if (Math.random() < 0.5) {
        const k = ri(0, 2), len = pages[k + 1] - pages[k];
        return {
          text: `<b>Table of Contents</b><br>${list}<br><br>Chapter ${k + 1} starts on page ${pages[k]} and chapter ${k + 2} starts on page ${pages[k + 1]}. How many pages are in chapter ${k + 1}?`, answer: len,
          hints: ["A chapter runs from its first page up to the page where the next chapter starts.", "Take away the smaller page number from the bigger page number.", "Example: a chapter starts on page 10 and the next starts on page 17. 17 - 10 = 7 pages. Now do yours."]
        };
      }
      const k = ri(0, 3);
      return {
        text: `<b>Table of Contents</b><br>${list}<br><br>Which chapter starts on page ${pages[k]}?`, choices: shuf(ts.map((t, i) => `Chapter ${i + 1}: ${t}`)), answer: `Chapter ${k + 1}: ${ts[k]}`,
        hints: ["The table of contents lists each chapter with its starting page.", "Find the page number at the end of a line. Then read the chapter name on that line.", "Example: if the line says 'The Zoo ...... 99', then page 99 starts 'The Zoo'. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Table of contents", v: "📑", t: "It lists each chapter and the page where it starts." },
      { h: "How long is a chapter?", v: "17 - 10 = 7", t: "A chapter ends where the next one begins. Subtract the starting pages to count its pages." },
      { h: "Tip", v: "💡", t: "Chapter numbers and page numbers both go up as you go down the list." }
    ];
    return { title: "Use the table of contents", make };
  };
  const IDXG = [["bat", "bear", "bird", "bug"], ["cat", "cow", "crab", "cub"], ["deer", "dingo", "dog", "duck"], ["fish", "fox", "frog", "fur"], ["hawk", "hen", "hippo", "horse"], ["lamb", "lemur", "lion", "lobster"], ["panda", "pig", "pony", "puppy"], ["seal", "sheep", "snake", "swan"]];
  const indexAbc = () => {
    const make = () => {
      const ws = S(pick(IDXG), 3), srt = ws.slice().sort(), last = Math.random() < 0.4;
      return {
        text: `<b>Index</b><br>${ws.map(w => `${w}, ${ri(3, 60)}`).join("<br>")}<br><br>An index puts topics in ABC order. Which topic would be <b>${last ? "last" : "first"}</b> in this index?`, choices: shuf(ws), answer: last ? srt[2] : srt[0],
        hints: ["All the words start with the same letter, so look at the second letter.", `The second letters are ${shuf(ws.map(w => w[1])).join(", ")}. Which one is ${last ? "latest" : "earliest"} in the alphabet?`, "Example: bat comes before bug because a comes before u. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Index in ABC order", v: "📖 a b c", t: "An index lists topics in ABC order, each with its page numbers." },
      { h: "Same first letter", v: "ba · be · bi · bu", t: "When the first letters match, look at the second letter. Then the third, if you need to." },
      { h: "Tip", v: "💡", t: "Say the alphabet song quietly to check which letter is earlier." }
    ];
    return { title: "Index in ABC order", make };
  };
  const GW = ["acorn", "apple", "badge", "bake", "beach", "cabin", "candy", "chair", "daisy", "dance", "dream", "eagle", "earth", "fairy", "feast", "flame", "giant", "glove", "grape", "happy", "honey", "house", "igloo", "jelly", "jewel", "kitten", "ladder", "lemon", "magic", "mango", "novel", "ocean", "olive", "paint", "piano", "queen", "quilt", "river", "robot", "salad", "sugar", "table", "tiger", "umbrella", "violin", "water", "yellow", "zebra"].sort();
  const guidePick = () => { const i = ri(1, GW.length - 10), j = i + ri(4, 8); return { i, j, a: GW[i], b: GW[j] }; };
  const guideWords = () => {
    const make = () => {
      const { i, j, a, b } = guidePick();
      const ans = GW[ri(i + 1, j - 1)], wr = [GW[ri(0, i - 1)], GW[ri(j + 1, GW.length - 1)]];
      return {
        text: `A dictionary page has the guide words <b>${a} - ${b}</b>. Which word is on this page?`, choices: shuf([ans, ...wr]), answer: ans,
        hints: ["Guide words show the first and last word on the page. Your word must fit between them in ABC order.", `It must come after "${a}" and before "${b}". Check the first letter, then the second.`, "Example: guide words 'cat - dog'. The word 'cow' comes after cat and before dog, so it is on that page. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Guide words", v: "📘 cat - dog", t: "The two words at the top of a dictionary page are the <b>guide words</b>. They show the first and last word on the page." },
      { h: "Is it on the page?", v: "cat < cow < dog", t: "A word is on the page if it comes after the first guide word and before the last guide word." },
      { h: "Tip", v: "💡", t: "Use the first letter, then the second letter, to compare words." }
    ];
    return { title: "Guide words", make };
  };
  const guideYN = () => {
    const make = () => {
      const { i, j, a, b } = guidePick(), r = ri(0, 2);
      let w, ans;
      if (r === 0) { w = GW[ri(0, i - 1)]; ans = "Before this page"; }
      else if (r === 1) { w = GW[ri(i + 1, j - 1)]; ans = "On this page"; }
      else { w = GW[ri(j + 1, GW.length - 1)]; ans = "After this page"; }
      return {
        text: `The guide words on a dictionary page are <b>${a} - ${b}</b>. Where is the word <b>${w}</b>?`, choices: ["Before this page", "On this page", "After this page"], answer: ans,
        hints: ["Compare your word with both guide words in ABC order.", `Is "${w}" earlier than "${a}", later than "${b}", or in the middle?`, "Example: guide words 'cat - dog'. 'Ant' is before the page, 'cow' is on it, and 'fish' is after it. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Where is my word?", v: "⬅️ 📖 ➡️", t: "Guide words tell you if you are on the right page. Your word can be before it, on it, or after it." },
      { h: "Three cases", v: "ant | cow | fish", t: "Earlier than the first guide word: go back. In between: you found it. Later than the last guide word: go forward." },
      { h: "Tip", v: "💡", t: "Flip toward the front if your word is earlier in the alphabet, and toward the back if it is later." }
    ];
    return { title: "Which way to flip?", make };
  };
  const FN = ["Amy", "Ben", "Cora", "Dan", "Eli", "Fay", "Gus", "Ivy", "Jay", "Kim", "Leo", "Mia", "Noah", "Pam", "Ron", "Sam", "Tia", "Zoe"];
  const SPL = ["Rivera", "Cruz", "Lee", "Patel", "Ortiz", "Nguyen", "Brown", "Hall", "Kim", "Gray", "Lopez", "Young", "Diaz", "Ward", "Fox", "Stone"];
  const spineLabel = () => {
    const make = () => {
      const f = pick(FN), l = pick(SPL), a = l.slice(0, 3).toUpperCase(), fa = f.slice(0, 3).toUpperCase();
      const wr = [`F ${fa}`, `${a} F`].filter(x => x !== `F ${a}`);
      return {
        text: `A fiction book is written by <b>${f} ${l}</b>. Fiction spine labels have an <b>F</b>, then the first three letters of the author's <b>last name</b>. Which label is right?`, choices: shuf([`F ${a}`, ...wr]), answer: `F ${a}`,
        hints: ["Which of the author's names do you use for the label, the first or the last?", `Use the last name "${l}". Take its first three letters, and put the F first.`, "Example: for Ana Torres the label is F TOR: F, then T-O-R from Torres. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Spine labels", v: "🏷️ F TOR", t: "Sticker labels on the spine tell you where a book lives on the shelf." },
      { h: "Fiction labels", v: "F + 3 letters", t: "A fiction label has <b>F</b> and the first three letters of the author's last name. Ana Torres gets <b>F TOR</b>." },
      { h: "Tip", v: "💡", t: "The label and the shelf both use the last name, so the books stay in ABC order." }
    ];
    return { title: "Read a spine label", make };
  };
  const betweenNums = () => {
    const make = () => {
      const a = ri(10, 90) * 10, b = a + 10, c = a + 20;
      return {
        text: `A shelf has a book numbered <b>${a}</b> and a book numbered <b>${c}</b> next to each other, with a gap. Which book fits in the gap?`, choices: shuf([b, a - 10, c + 10]), answer: b,
        hints: ["The book in the gap has a number bigger than the left book and smaller than the right book.", `It is more than ${a} and less than ${c}. Count up by tens from ${a}.`, "Example: a gap between 330 and 350. Counting by tens, 340 fits. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Numbers on the shelf", v: "510 · ? · 530", t: "Nonfiction numbers go from smaller to bigger. A book that fits in a gap must be in the middle." },
      { h: "Count by tens", v: "510, 520, 530", t: "Count up by tens from the smaller number. The number right before the next one fits." },
      { h: "Tip", v: "💡", t: "Check: is it bigger than the left number and smaller than the right number?" }
    ];
    return { title: "Fill the shelf gap", make };
  };
  const VOLS = [["A-C", "ABC"], ["D-F", "DEF"], ["G-I", "GHI"], ["J-L", "JKL"], ["M-O", "MNO"], ["P-R", "PQR"], ["S-U", "STU"], ["V-Z", "VWXYZ"]];
  const EW = ["apple", "bear", "cactus", "dolphin", "eagle", "frog", "giraffe", "horse", "island", "jungle", "kangaroo", "lion", "moon", "nest", "ocean", "penguin", "queen", "rabbit", "snow", "tiger", "umbrella", "volcano", "whale", "yak", "zebra"];
  const encyVol = () => {
    const make = () => {
      const w = pick(EW), vi = VOLS.findIndex(v => v[1].includes(w[0].toUpperCase()));
      const table = VOLS.map((v, i) => `Volume ${i + 1}: ${v[0]}`).join("<br>");
      const wr = S(VOLS.map((_, i) => i).filter(i => i !== vi), 2);
      return {
        text: `An encyclopedia has volumes by letter:<br>${table}<br><br>Which volume has the topic <b>${w}</b>?`, choices: shuf([vi, ...wr].map(i => `Volume ${i + 1}`)), answer: `Volume ${vi + 1}`,
        hints: ["Encyclopedia topics are in ABC order, so start with the first letter of your topic.", `Your topic starts with "${w[0].toUpperCase()}". Which volume's letters include it?`, "Example: the topic 'cactus' starts with C. C is in A-C, so look in the A-C volume. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Encyclopedia volumes", v: "📚 A-C · D-F ...", t: "An encyclopedia is split into volumes. Each volume covers a few letters of the alphabet." },
      { h: "Find the volume", v: "cactus → C → A-C", t: "Look at the first letter of your topic. Pick the volume whose letters include it." },
      { h: "Tip", v: "💡", t: "The letters printed on the spine of each volume tell you what is inside." }
    ];
    return { title: "Pick the encyclopedia volume", make };
  };
  const SURN = [["Brown", "Baker"], ["Clark", "Cole"], ["Miller", "Moore"], ["Smith", "Scott"], ["Taylor", "Thomas"], ["Wells", "Wood"]];
  const sortNames = () => {
    const make = () => {
      let ls; if (Math.random() < 0.6) { const pr = pick(SURN); ls = [...pr, pick(SPL.filter(x => x[0] !== pr[0][0]))]; } else ls = S(SPL, 3);
      const ns = ls.map(l => `${l}, ${pick(FN)}`), srt = ns.slice().sort(), last = Math.random() < 0.4;
      return {
        text: `A library lists people as <b>Last name, First name</b>. Which name comes <b>${last ? "last" : "first"}</b> in ABC order?`, choices: shuf(ns), answer: last ? srt[2] : srt[0],
        hints: ["Use the last name first. It is the word before the comma.", `Compare the last names ${shuf(ls).join(", ")}. If the first letters match, check the second letter.`, "Example: 'Cole, Ana' comes before 'Cruz, Ben' because the second letters are o and r, and o comes first. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Last name first", v: "Cruz, Ben", t: "Catalogs write the <b>last name</b> first, then a comma, then the first name." },
      { h: "ABC order by last name", v: "Cole < Cruz", t: "Sort by the last name. If the first letters match, use the second letter." },
      { h: "Tip", v: "💡", t: "Ignore the first name unless two people have the same last name." }
    ];
    return { title: "Last name, first name", make };
  };
  const TT = ["The Moon Garden", "A Cat Named Pepper", "The Silly Goose", "An Egg for Ollie", "The Kite Race", "A Frog in the Pond", "The Lost Mitten", "A Tiny Dragon", "An Owl at Night", "The Ice Castle", "A Happy Hippo", "The Dancing Bear"];
  const key = t => t.replace(/^(The|A|An) /, "");
  const sortTitles = () => {
    const make = () => {
      const ts = S(TT, 3), srt = ts.slice().sort((x, y) => key(x).localeCompare(key(y))), last = Math.random() < 0.4;
      return {
        text: `In a library list, we skip the first word if it is <b>A</b>, <b>An</b> or <b>The</b>. Which title comes <b>${last ? "last" : "first"}</b>?`, choices: shuf(ts), answer: last ? srt[2] : srt[0],
        hints: ["Cross out A, An or The at the start of each title. Then compare what is left.", `After skipping those words, the first letters are ${shuf(ts.map(t => key(t)[0])).join(", ")}. Which is ${last ? "latest" : "earliest"}?`, "Example: 'The Zoo Trip' and 'A Big Cat'. Skip The and A. Big comes before Zoo, so 'A Big Cat' is first. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Skip the small first word", v: "The · A · An", t: "When we put titles in ABC order, we do not use <b>A</b>, <b>An</b> or <b>The</b> at the start." },
      { h: "Example", v: "The Zoo Trip → Zoo", t: "'The Zoo Trip' is filed under <b>Z</b>. 'A Big Cat' is filed under <b>B</b>." },
      { h: "Tip", v: "💡", t: "Cover the first word if it is A, An or The. Then compare." }
    ];
    return { title: "Titles in ABC order", make };
  };
  const decimals = () => {
    const make = () => {
      let ns; do { const same = Math.random() < 0.5, w = ri(2, 9) * 100 + ri(0, 9) * 10; ns = [0, 0, 0].map(() => (same ? w : ri(2, 9) * 100 + ri(0, 9) * 10) + "." + ri(1, 9)); } while (new Set(ns).size < 3 || new Set(ns.map(Number)).size < 3);
      const srt = ns.slice().sort((a, b) => a - b), last = Math.random() < 0.4;
      return {
        text: `Some nonfiction call numbers have a dot, like 598.2. Which book comes <b>${last ? "last" : "first"}</b> on the shelf?`, choices: shuf(ns), answer: last ? srt[2] : srt[0],
        hints: ["Compare the numbers before the dot first. Only if they match, compare the digits after the dot.", `Look at the whole numbers: ${shuf(ns.map(n => n.split(".")[0])).join(", ")}. Which is ${last ? "biggest" : "smallest"}? If two tie, check the digit after the dot.`, "Example: 636.3 and 636.8 have the same whole number. 3 is less than 8, so 636.3 comes first. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Numbers with a dot", v: "598.2", t: "Many call numbers have a dot. The part before the dot is the main shelf. The part after it shows a smaller topic." },
      { h: "Comparing", v: "636.3 < 636.8", t: "Compare the numbers before the dot first. If they match, compare the digit after the dot." },
      { h: "Tip", v: "💡", t: "Smaller numbers go earlier on the shelf, just like in counting." }
    ];
    return { title: "Call numbers with a dot", make };
  };
  const STEPS = ["Ask a question", "Find books and sources", "Read and take notes", "Write facts in your own words", "List your sources", "Share what you learned"];
  const stepOrder = () => {
    const make = () => {
      const after = Math.random() < 0.5, i = after ? ri(0, 4) : ri(1, 5), ans = STEPS[after ? i + 1 : i - 1];
      const wr = S(STEPS.filter(s => s !== ans && s !== STEPS[i]), 2);
      return {
        text: `Research has steps in order:<br>${STEPS.map((s, k) => `${k + 1}. ${s}`).join("<br>")}<br><br>Which step comes right <b>${after ? "after" : "before"}</b> "${STEPS[i]}"?`, choices: shuf([ans, ...wr]), answer: ans,
        hints: ["Look at the numbered list and find the step in the question.", `Find "${STEPS[i]}". Then look at the step ${after ? "just below" : "just above"} it.`, "Example: in the list 'wake up, get dressed, eat', the step right after 'wake up' is 'get dressed'. Now do yours."]
      };
    };
    make.teach = () => [
      { h: "Research steps", v: "🔬", t: "A good researcher goes step by step: ask, find, read, write, list sources, share." },
      { h: "The order matters", v: "1 → 2 → 3", t: "You need a question before you can find books. You need notes before you write." },
      { h: "Tip", v: "💡", t: "Keep a list of your steps and tick each one off." }
    ];
    return { title: "Research steps in order", make };
  };
  const T = (q, label) => {
    const all = ["Sequence (order)", "Compare and contrast", "Cause and effect", "Problem and solution", "Description"];
    return [q, label, ...all.filter(x => x !== label)].join("|");
  };

  // ================= LEVEL 4 =================
  const L4 = [
    authorOrder(),
    numOrder(),
    PL("Inside the front of a book", "📖", "The first pages of a book tell you who made it and when.", "Look at the title page and the copyright page to learn about a book.", [
      "title page::shows the title, author and publisher::📄", "copyright date::the year the book was made::©️", "publisher::the company that prints and sells the book::🏢", "dedication::a page where the author thanks someone special::💌", "spine label::a sticker on the spine with the call number::🏷️", "glossary::a mini dictionary at the back of the book::📘"
    ], { qd: "Which book part is this?", qt: "What is this book part?" }),
    tocPages(),
    SC("Glossary and bold words", "📘", "Some nonfiction books print hard words in bold. The glossary near the back tells what those words mean. It is in ABC order.", "A glossary is a mini dictionary for one book. The index is different: it tells you pages.", "If I read the bold word 'habitat', I can check the glossary at the back of the book.", [
      "A book has a hard word in bold. Where can you find what it means?|In the glossary|In the index|On the cover",
      "Where is the glossary usually found?|Near the back of the book|Before the title|Inside the cover picture",
      "A glossary lists words in...|ABC order|Size order|Color order",
      "A glossary is like a small...|Dictionary|Map|Calendar",
      "Which book part tells you the page for a topic?|The index|The glossary|The cover",
      "Words in bold in a fact book are often...|Words you can find in the glossary|Mistakes|Page numbers",
      "You do not know the word 'predator' in a fact book. You...|Look in the glossary|Skip the whole book|Count the pages"
    ]),
    indexAbc(),
    guideWords(),
    PL("Parts of a dictionary entry", "📘", "A dictionary entry gives lots of help about one word.", "Read the whole entry, not just the first part.", [
      "entry word::the bold word you look up::🔤", "definition::what the word means::💬", "example sentence::shows how the word is used::✏️", "respelling::shows how to say the word::🗣️", "guide words::two words at the top of the page::📌"
    ], { qd: "Which dictionary part is this?", qt: "What is this dictionary part?" }),
    SC("Story or fact book?", "🔎", "Fiction is made up. Nonfiction is true. Some nonfiction books teach you how to do things or tell about real lives.", "Ask: is it made up, or could I check it in the real world? Real facts mean nonfiction.", "A book about how a clock works is nonfiction. A tale about a clock that talks is fiction.", [
      "A book about how to build a birdhouse|Nonfiction|Fiction",
      "A folktale about a clever fox who tricks a crow|Fiction|Nonfiction",
      "A book of true facts about volcanoes|Nonfiction|Fiction",
      "A story about a girl who talks to the wind|Fiction|Nonfiction",
      "A book about the life of a real inventor|Nonfiction|Fiction",
      "A story about a squirrel who runs a bakery|Fiction|Nonfiction",
      "A book that explains how the heart works|Nonfiction|Fiction",
      "A mystery about a missing cookie|Fiction|Nonfiction"
    ]),
    PL("Kinds of stories", "🎭", "Stories come in many kinds called genres. Knowing the genre helps you pick a book you will enjoy.", "Think: what happens in the story? Magic, a puzzle, a lesson, or real life?", [
      "fairy tale::a story with magic, castles or dragons::🧚", "mystery::a story where someone solves a puzzle or a secret::🔎", "fable::a short story with animals that teaches a lesson::🦊", "science fiction::a made-up story about space, robots or the future::🚀", "realistic fiction::a made-up story that could really happen::🏠"
    ], { qd: "Which kind of story is this?", qt: "What kind of story is this?" }),
    SC("Search the catalog", "💻", "A library catalog lists every book. You can search by title, author or topic. It also shows a call number, which tells you where the book sits on the shelf.", "Pick the search that matches what you know: a title, an author or a topic.", "If I know the book name, I search by title. If I only know the topic, I search by subject.", [
      "To find a book when you know its name, search by...|Title|Author|Shelf color",
      "To find books by one writer, search by...|Author|Title|Page number",
      "To find books about a topic, search by...|Subject or topic|Spine color|Price",
      "The catalog shows a call number. It tells you...|Where the book sits on the shelf|How old the book is|Who owns it",
      "The catalog says a book is checked out. It means...|Someone has it right now|It is brand new|It is on the cover",
      "You spell a word wrong in the catalog search. What may happen?|It may find nothing|It finds everything|The library closes",
      "You cannot work the catalog. Who can help?|A librarian|A stranger|The wall"
    ]),
    SC("Fact or opinion?", "⚖️", "A fact is true and can be checked. An opinion is what someone thinks or feels. Words like best, prettiest, awful and boring often show an opinion.", "Can you check it in a book? Then it is a fact. If it is a feeling, it is an opinion.", "'A spider has eight legs' is a fact. 'Spiders are creepy' is an opinion.", [
      "A frog is an amphibian.|Fact|Opinion",
      "Frogs are gross.|Opinion|Fact",
      "Owls hunt at night.|Fact|Opinion",
      "The ocean is the prettiest place.|Opinion|Fact",
      "Bees make honey.|Fact|Opinion",
      "Winter is the best season.|Opinion|Fact",
      "A triangle has three sides.|Fact|Opinion",
      "Broccoli tastes awful.|Opinion|Fact",
      "The Earth moves around the sun.|Fact|Opinion",
      "Rainy days are boring.|Opinion|Fact"
    ]),
    PL("Helpers inside nonfiction", "🧩", "Fact books have special features that help you understand them.", "Look at these features first. They tell you a lot before you read.", [
      "heading::big words that name a section::🔠", "caption::words under a picture::💬", "bold word::a dark word that shows it is important::🅱️", "diagram::a drawing with labels::📐", "label::a word that names a part of a picture::🏷️"
    ], { qd: "Which feature is this?", qt: "What is this feature?" }),
    SC("Main idea", "💡", "The main idea is what a paragraph is mostly about. The small facts, called details, all help to explain it.", "Ask: what are all the sentences about? That big idea is the main idea.", "Sentences: Ducks swim. Ducks paddle. Ducks float. The main idea: Ducks move on water.", [
      "Bees visit flowers. Bees collect nectar. Bees make honey. What is the main idea?|Bees make honey from flowers|Flowers are red|Honey is sticky",
      "Dogs need food. Dogs need water. Dogs need walks. What is the main idea?|Dogs need care|Dogs are brown|Dogs like balls",
      "Plants need sun. Plants need water. Plants need soil. What is the main idea?|Plants need things to grow|Plants are green|The sun is hot",
      "Penguins swim well. Penguins slide on ice. Many live in cold places. What is the main idea?|Penguins are birds that suit the cold|Penguins can fly high|Penguins live in the desert",
      "Rain fills lakes. Rain helps seeds grow. Rain gives us water to drink. What is the main idea?|Rain is helpful|Rain is loud|Rain is purple",
      "Pigs roll in mud. Mud keeps pigs cool. Mud protects their skin from the sun. What is the main idea?|Mud helps pigs|Pigs are pink|Pigs eat apples",
      "The main idea of a book is...|What the book is mostly about|The first word|The page count"
    ]),
    SC("Good research questions", "❓", "A good research question can be answered by reading good sources. It often starts with who, what, where, when, why or how.", "Choose the question that a book can answer, not one about feelings.", "'How do frogs grow?' is a good research question. 'Are frogs cute?' is an opinion.", [
      "Which question can you answer by reading a book?|How do frogs grow?|Do you like frogs?|Is a frog cute?",
      "Which question can you answer by reading a book?|Where do camels live?|Which camel is silliest?|Is sand fun?",
      "Which question can you answer by reading a book?|What do rabbits eat?|Are rabbits the best?|Do you like carrots?",
      "Which question can you answer by reading a book?|Why do birds fly south?|Which bird is nicest?|Is a nest pretty?",
      "Which question can you answer by reading a book?|How tall is a giraffe?|Is a giraffe silly?|Would you ride a giraffe?",
      "Which question can you answer by reading a book?|When does a seed sprout?|Is a seed boring?|Do you like seeds?",
      "A research question is best answered by...|Good sources|Guessing|Flipping a coin"
    ]),
    SC("Pick key words", "🔑", "Key words are the most important words in your question. Use them to search a catalog or an index. Leave out small words like the, how and a.", "Pick the words that name the topic. Skip the small words.", "For 'How do owls hunt at night?' I search owls hunt.", [
      "To learn about whale songs, good key words are...|whale songs|how the is|my a it",
      "To learn how frogs grow, good key words are...|frogs grow|how do the|a an the",
      "To learn about the planet Mars, good key words are...|planet Mars|and so very|is it a",
      "To learn about shark teeth, good key words are...|shark teeth|the of a|very much",
      "To learn about volcanoes erupting, key words are...|volcano erupt|now then so|the and or",
      "Key words are...|The most important words|The smallest words|Silly words"
    ]),
    SC("Trusted helpers", "🧑‍🏫", "Trusted helpers can help you find true facts: a librarian, a teacher and a parent. They know good places to look.", "A trusted helper is someone you know who cares about you and is good at finding facts.", "If I need facts about frogs, I can ask my teacher or a librarian.", [
      "Who can help you find a true answer?|A librarian|A stranger online|A pop-up",
      "Who can help you with research at school?|Your teacher|A stranger online|A pop-up ad",
      "Who can help at home?|A parent|A person you never met|A robot you do not know",
      "You are not sure a fact is true. You...|Ask a trusted grown-up|Believe it right away|Ignore it",
      "A pop-up says 'Click here to win!' You...|Close it and tell a grown-up|Click it|Type your name",
      "A librarian can help you find...|Good books|Free candy|A new house"
    ]),
    SC("Stay safe online", "🛡️", "Library computers and the internet are great for facts. Keep safe: use them with a grown-up, keep private things private, and tell a grown-up if something feels wrong.", "Private things (address, phone, school, passwords) stay secret. Tell a grown-up about anything that feels strange.", "A pop-up asks for my address. I close it and tell a grown-up.", [
      "Your password is private. You should...|Keep it secret|Share it with friends|Write it on the door",
      "Someone you do not know asks where you live. You...|Do not answer and tell a grown-up|Reply with your street|Send a photo",
      "A pop-up says 'Free game! Download now!' You...|Close it and tell a grown-up|Download it|Click yes",
      "Before downloading anything, you...|Ask a grown-up|Do it quickly|Do it in secret",
      "Which is private and should stay secret?|Your phone number|Your favorite color|Your favorite animal",
      "Someone online asks you to keep a secret from your parents. You...|Stop and tell a grown-up|Keep the secret|Say yes",
      "A page makes you feel scared or yucky. You...|Close it and tell a grown-up|Keep looking|Share it with friends"
    ])
  ];

  // ================= LEVEL 5 =================
  const L5 = [
    spineLabel(),
    PL("Books about people", "🧑", "Some nonfiction books tell about real people. Each kind has its own name.", "Who tells the story: the author about someone else, or the author about themselves?", [
      "biography::a true story of a person's life, told by someone else::🧑", "autobiography::a person's own life story, written by that person::✍️", "how-to book::teaches you to make or do something::🔧", "reference book::a book you look things up in::📚", "folktale::an old story passed down by people::🏰"
    ], { qd: "Which kind of book is this?", qt: "What kind of book is this?" }),
    PL("The Dewey number shelves", "🔢", "Many libraries sort fact books with the Dewey Decimal System. Each hundreds number is a big subject.", "Think about the subject first, then the number.", [
      "500::science and math::🔬", "600::technology, health and cooking::🔧", "700::art, music and sports::🎨", "800::stories, poems and plays (literature)::📜", "900::history and geography::🌍", "400::languages::🗣️"
    ], { qd: "Which Dewey number fits?", qt: "Which subject is on these shelves?" }),
    betweenNums(),
    PL("Reference tools", "📚", "Reference books are for looking things up. You usually do not read them from start to end.", "Think about your job: a meaning, a map, a fact, or another word.", [
      "dictionary::tells what words mean::📘", "thesaurus::gives words that mean the same::🔁", "atlas::a book of maps::🗺️", "encyclopedia::facts about many topics in ABC order::📚", "almanac::a yearly book of facts, lists and dates::📅"
    ], { qd: "Which reference book is this?", qt: "What is this reference book for?" }),
    SC("Which tool do I need?", "🧰", "Different jobs need different books. Choose the tool that matches your question.", "Say your job out loud: a meaning, another word, a place, or many facts?", "To see where Egypt is, I use an atlas.", [
      "You want to know what 'bold' means. Use a...|Dictionary|Atlas|Almanac",
      "You want another word for 'happy'. Use a...|Thesaurus|Atlas|Calendar",
      "You want a map of Africa. Use an...|Atlas|Dictionary|Thesaurus",
      "You want facts on many topics, from A to Z. Use an...|Encyclopedia|Atlas|Thesaurus",
      "You want yearly facts and lists. Use an...|Almanac|Dictionary|Storybook",
      "You want to know how to say a word. Use a...|Dictionary|Thesaurus|Atlas",
      "You want to read about a famous person's life. Use a...|Biography|Atlas|Thesaurus"
    ]),
    SC("Words that mean the same", "🔁", "A synonym is a word that means almost the same as another word. A thesaurus lists synonyms to help you find a better word.", "A synonym means the same, not the opposite.", "Synonyms for 'glad' are 'happy' and 'cheerful'.", [
      "Which word means almost the same as big?|large|tiny|thin",
      "Which word means almost the same as small?|little|huge|loud",
      "Which word means almost the same as fast?|quick|slow|tall",
      "Which word means almost the same as happy?|glad|sad|angry",
      "Which word means almost the same as begin?|start|stop|finish",
      "Which word means almost the same as pretty?|beautiful|ugly|sour",
      "Which word means almost the same as tired?|sleepy|awake|noisy",
      "A thesaurus helps you find...|Words with similar meanings|Maps|Phone numbers"
    ]),
    guideYN(),
    encyVol(),
    SC("Book series", "📚", "A series is a group of books about the same characters or ideas. A sequel is a book that comes after one and carries on the story.", "Think of books that go together, like part 1, part 2 and part 3.", "If I loved book 1 of a series, I can look for book 2 on the shelf.", [
      "Books about the same characters, one after another, are a...|Series|Dictionary|Map",
      "A sequel is a book that...|Comes after and continues a story|Is the very first book|Is a dictionary",
      "Book 2 in a series often shows its number on the...|Spine or cover|Index|Ceiling",
      "You loved book 1 of a series. What can you do next?|Look for book 2|Skip all books|Rip the cover",
      "Why do people read a series in order?|The story builds from book to book|The covers match|The books are heavier",
      "Who can help you find the next book in a series?|A librarian|A stranger online|A pop-up",
      "Characters that appear in many books of a series are...|The same|Always new|Made of paper"
    ]),
    SC("Why was it written?", "🎯", "Authors write for a reason. Some want to inform (teach facts). Some want to entertain (give fun). Some want to persuade (get you to agree or do something).", "Ask: does it teach, make me laugh, or try to change my mind?", "A book of facts about bats is written to inform.", [
      "A book that teaches how volcanoes work|Inform (teach)|Entertain (give fun)|Persuade (convince)",
      "A funny story about a goat who cannot stop sneezing|Entertain (give fun)|Inform (teach)|Persuade (convince)",
      "A poster: 'Read every day! It makes you smarter!'|Persuade (convince)|Inform (teach)|Entertain (give fun)",
      "A book of facts about the planets|Inform (teach)|Entertain (give fun)|Persuade (convince)",
      "An ad: 'Buy this toy, it is the best!'|Persuade (convince)|Inform (teach)|Entertain (give fun)",
      "A silly rhyme about a dancing hen|Entertain (give fun)|Inform (teach)|Persuade (convince)",
      "Directions that show how to plant a seed|Inform (teach)|Entertain (give fun)|Persuade (convince)",
      "A letter that asks people to recycle|Persuade (convince)|Inform (teach)|Entertain (give fun)"
    ]),
    SC("Fact or opinion?", "⚖️", "A fact can be checked. An opinion tells what someone thinks or feels. Clue words for opinions are best, worst, prettiest, I think and should.", "Can you prove it? That is a fact. Is it a feeling or a belief? That is an opinion.", "'A dime is worth ten cents' is a fact. 'Dimes are the nicest coins' is an opinion.", [
      "A giraffe is the tallest land animal.|Fact|Opinion",
      "Giraffes are the most beautiful animals.|Opinion|Fact",
      "I think math is the easiest subject.|Opinion|Fact",
      "A dime is worth ten cents.|Fact|Opinion",
      "Dogs make the best pets.|Opinion|Fact",
      "Ice melts when it gets warm.|Fact|Opinion",
      "Reading is the most fun hobby.|Opinion|Fact",
      "A day has 24 hours.|Fact|Opinion",
      "That movie was too scary.|Opinion|Fact",
      "You should eat more pasta.|Opinion|Fact"
    ]),
    PL("More nonfiction helpers", "🧩", "Nonfiction books have more features that show facts in clear ways.", "Find these in real books and see how they help.", [
      "sidebar::a box beside the text with extra facts::🧾", "timeline::a line that shows events in time order::⏳", "map key::explains the symbols on a map::🗝️", "table::facts in rows and columns::📋", "bar graph::bars that compare amounts::📊"
    ], { qd: "Which feature is this?", qt: "What is this feature?" }),
    SC("Take notes", "📝", "Notes are short. Write key words and facts in your own words. Also write the title of your source.", "Short, own words, key facts. Never copy long pieces.", "Book says: Owls hunt at night using sharp hearing. My note: owls hunt at night, good hearing.", [
      "When you take notes, you should write...|Key words and short facts|Every word|Nothing",
      "Notes should be in...|Your own words|Copied sentences|A secret code",
      "Which is a good short note?|Owls hunt at night|Owls are fascinating nocturnal predators that hunt in dark forests|I like owls",
      "Why write the book title in your notes?|To know where the fact came from|To make notes longer|For decoration",
      "Short notes use...|Key words|Long paragraphs|Whole pages",
      "After reading a paragraph, you can...|Close the book and write what you remember|Copy it word for word|Skip it",
      "Which is NOT a good way to take notes?|Copying the whole page|Writing key words|Writing in your own words"
    ]),
    SC("Pick the best source", "🏆", "The best source depends on your question. Match the source to the job.", "What do you need: facts, a map, a life story, a meaning?", "To learn how tall giraffes are, I read a nonfiction book about giraffes.", [
      "You want to know how tall a giraffe is. Best source?|A nonfiction book about giraffes|A fairy tale|A comic about talking giraffes",
      "You want a map of Asia. Best source?|An atlas|A poetry book|A story",
      "You want to learn about a real president. Best source?|A biography|A mystery novel|A fairy tale",
      "You want to read how a plant grows. Best source?|A science book about plants|A story about a magic bean|A cookbook",
      "You want to know what 'habitat' means. Best source?|A dictionary|An atlas|A comic",
      "You want a fun story to read. Best place?|The fiction shelves|The atlas|The almanac",
      "You want facts about this year. Best source?|An almanac|A fairy tale|A song book"
    ]),
    SC("Is it up to date?", "📅", "Facts about some topics change, like space or computers. Check the date of a book or page. The copyright date shows when a book was made.", "Check the date. Newer is better for things that change.", "A book from last year has newer facts about space than a book from long ago.", [
      "A book about computers is very old. Is it best for newest facts?|Not always, newer sources may have updates|Yes, it is always newest|Old books have no facts",
      "Where do you find the year a book was made?|Copyright page|Index|Glossary",
      "A website has no date and no author. You should...|Be careful and ask a grown-up|Trust it fully|Copy it",
      "Facts about space discoveries change. Which is probably better?|A newer book|A very old book|A joke book",
      "The date on a web page tells you...|When it was made or updated|How long it is|Its color",
      "A fact that never changes, like 'a week has seven days'...|Is fine in an old book too|Is wrong in old books|Must be new",
      "Knowing who wrote a source is important because...|An author who knows the topic is more trustworthy|Names are fun|It makes it longer"
    ]),
    SC("Search smarter", "🔍", "If a search finds too much or too little, change your words. Check your spelling. Add a more exact word to get fewer results. Try a synonym to get more.", "Spelling, exact words and synonyms are your search tools.", "Searching 'dogs' gives too many. 'dog training' is more exact.", [
      "A search finds nothing. Try...|Checking your spelling|Typing more silly words|Closing the library",
      "Too many results. You can...|Add a more exact word|Type fewer letters|Give up",
      "Searching 'dogs' gives too many. A better search is...|dog training|dog|d",
      "Not enough results. You could try...|A synonym|Your address|A longer password",
      "To find books about how frogs grow, the best key words are...|frogs grow|how do the|a an the",
      "In the catalog search box, you should type...|Topic words|Your home address|Your phone number"
    ]),
    SC("Online safety and kindness", "🛡️", "Be safe and kind online. Keep private things private, ask a grown-up when unsure, and be as kind as you would be in person.", "If it feels wrong, stop and tell a grown-up. Be kind with your words.", "A game asks for my birthday and address. I stop and ask a grown-up.", [
      "A classmate posts an unkind comment about someone. You...|Do not join in and tell a grown-up|Add a meaner one|Share it",
      "Pictures of you or your family should be...|Shared only with a grown-up's OK|Posted anywhere|Sent to strangers",
      "A game asks for your birthday and address. You...|Stop and ask a grown-up|Type it|Ask a friend to type it",
      "Someone you do not know sends you a friend request. You...|Ignore it and tell a grown-up|Accept it|Reply",
      "A strong password is...|Hard to guess and kept secret|Your name|1234",
      "You clicked a strange link by mistake. You...|Tell a grown-up right away|Hide it|Click more",
      "Being kind online means...|Using the kind words you would say face to face|Saying anything|Hiding who you are"
    ])
  ];

  // ================= LEVEL 6 =================
  const L6 = [
    PL("Ways to search the catalog", "💻", "The catalog has different search boxes. Pick the one that fits what you know.", "Title for a book name, author for a writer, subject for a topic.", [
      "title search::finds a book when you know its name::🏷️", "author search::finds books by one writer::✍️", "subject search::finds books about a topic::💡", "keyword search::finds your words anywhere in the record::🔑", "call number::the label that tells where the book sits::📍"
    ], { qd: "Which search fits?", qt: "What does this do?" }),
    SC("Find it on the shelf", "📍", "A call number is the book's address. Fiction labels use F and letters from the author's last name. Fact books use numbers. Shelves go from left to right, and from the top shelf down.", "Read the label, find the right shelf, then scan the spines.", "The label 590 means a fact book. I look in the 500s and find the 590s.", [
      "The label F LEE means the book is...|Fiction by an author named Lee|A fact book about a lee|A map",
      "Fiction books are shelved by...|The first letters of the author's last name|The cover color|The number of pages",
      "Nonfiction books are shelved by...|Their number|Their color|Their weight",
      "A call number is like the book's...|Home address in the library|Birthday|Favorite food",
      "A book labeled 595 goes...|Between 590 and 600|Before 590|After 600",
      "Where is the call number on a book?|On the spine label|In the dedication|On the last page only",
      "The label 636 is a...|Fact book number|Fiction label|Phone number"
    ]),
    sortNames(),
    sortTitles(),
    decimals(),
    PL("Science shelves", "🔬", "The 500s are the science shelves. Smaller numbers inside the 500s are for smaller topics.", "Think of the subject first, then the number.", [
      "510::math::🔢", "520::space and stars::🌌", "550::rocks, weather and Earth::🌍", "560::fossils and dinosaurs::🦕", "580::plants::🌱", "590::animals::🐾"
    ], { qd: "Which number fits?", qt: "What is on these shelves?" }),
    PL("How writers organize facts", "🧱", "Nonfiction writers organize facts in patterns. Spotting the pattern helps you understand and remember.", "Look for clue words like first, next, because, both, but.", [
      "sequence::facts in the order they happen::1️⃣", "compare and contrast::how things are alike and different::⚖️", "cause and effect::one thing happens because of another::💥", "problem and solution::a trouble and how it is fixed::🛠️", "description::tells what something is like::🎨"
    ], { qd: "Which pattern is this?", qt: "What is this pattern?" }),
    SC("Spot the pattern", "🔎", "Clue words show the pattern. First, next and then show sequence. Both, but and different show compare and contrast. Because and so show cause and effect.", "Look for the clue words in the sentence.", "'Because it rained, the road was wet' has a cause and an effect.", [
      T("First, mix the flour. Next, add the eggs. Then bake it. Which pattern?", "Sequence (order)"),
      T("Frogs and toads both lay eggs, but frogs have smooth skin and toads have bumpy skin. Which pattern?", "Compare and contrast"),
      T("Because a lot of rain fell, the river rose. Which pattern?", "Cause and effect"),
      T("The garden had too many weeds. We pulled them out and it looked better. Which pattern?", "Problem and solution"),
      T("The beach was sunny, with warm sand and blue waves. Which pattern?", "Description"),
      T("Wake up, brush your teeth, then eat breakfast. Which pattern?", "Sequence (order)"),
      T("Cats and dogs are alike because both are pets, but cats climb more. Which pattern?", "Compare and contrast"),
      T("The ice melted, so the puddle grew. Which pattern?", "Cause and effect")
    ]),
    SC("Main idea and details", "💡", "The main idea is the big point. The details are small facts that support it. A title or heading often hints at the main idea.", "Details answer questions about the main idea. The main idea covers them all.", "Main idea: Owls are good hunters. Details: sharp eyes, quiet wings, strong claws.", [
      "Main idea: Camels live in hot deserts. Which is a detail?|They store fat in their humps|Camels are fun|Deserts are pretty",
      "Main idea: Recycling helps Earth. Which is a detail?|It means less trash|Recycling is boring|I like blue bins",
      "Main idea: Bats are helpful. Which is a detail?|Some eat many insects|Bats are scary|Night is dark",
      "Main idea: Seeds travel in many ways. Which is a detail?|Wind can carry some seeds|Seeds are all green|Plants grow in pots",
      "Details in a paragraph...|Give facts that support the main idea|Replace the main idea|Are always opinions",
      "Which is the main idea? Whales are big. Whales swim. Whales live in the sea.|Whales are sea animals|Sea is blue|Swimming is hard",
      "Where might you find a hint about the main idea?|The heading|The page number|The spine label"
    ]),
    SC("Make a summary", "📝", "A summary tells the main points in a few short sentences, in your own words. Leave out small details and opinions.", "A summary is short, true to the text, and in your own words.", "Text: Sam planted seeds, watered them and waited. Summary: Sam grew plants from seeds.", [
      "A summary is...|A short retelling of the main points|The whole book copied|A picture only",
      "A good summary has...|Main ideas only|Every tiny detail|Your opinions only",
      "Which is the best summary? Ben lost his dog. He looked all day. A neighbor found the dog and brought it home.|Ben lost his dog, and a neighbor helped him get it back|Ben has a dog|The neighbor is nice",
      "Which is the best summary? Mia planted seeds. She watered them each day. Soon flowers grew.|Mia grew flowers by planting and watering seeds|Mia likes water|Flowers are pretty",
      "Which is the best summary? The team practiced hard. On Saturday they played. They won.|The team practiced and then won their game|The team has a ball|Saturday is a day",
      "A summary should be...|Shorter than the original|Longer than the original|Totally different",
      "Should a summary use your own words?|Yes|No, copy it|Only pictures"
    ]),
    PL("Parts of a map", "🗺️", "Atlases and maps have parts that help you read them.", "Look for these parts first when you open a map.", [
      "compass rose::shows north, south, east and west::🧭", "map key::explains what the symbols mean::🗝️", "scale::shows how map distance matches real distance::📏", "map title::tells what the map shows::🏷️", "symbol::a small picture that stands for a real thing::📍"
    ], { qd: "Which map part is this?", qt: "What is this map part?" }),
    SC("List your sources", "📋", "A bibliography (source list) shows the books and pages you used. For a book, write the author's name and the title. Put them in ABC order at the end of your report.", "Author, title, in ABC order, at the end.", "Cruz, Ben. Ocean Life. This tells readers the author and the title.", [
      "A list of sources you used is called a...|Bibliography (source list)|Glossary|Index",
      "Why list sources?|To show where facts came from|To make the paper longer|To hide facts",
      "Which tells a book source?|Title: Giraffes, by Ana Lee|Giraffes are tall|I like giraffes",
      "For a book source, what must you include?|The title and the author|Only the color|Only the price",
      "Where does the source list go?|At the end of your report|Nowhere|On the cover only",
      "Sources in a list are put in...|ABC order|Random order|Size order"
    ]),
    SC("Use your own words", "✍️", "Copying someone else's words and saying they are yours is called plagiarism. It is not honest. Say ideas in your own words and name your source.", "Own words plus a source is honest. Copying is not.", "Book: Owls turn their heads. My words: Owls can turn their heads far. Source: the book Owls.", [
      "Copying someone's words and saying they are yours is...|Not okay|Fine if it is short|A great idea",
      "To use a fact without copying, you...|Say it in your own words and name the source|Copy it exactly|Change one word",
      "If you use a quote, you...|Use quotation marks and say who said it|Hide it|Skip it",
      "A picture from a book should be...|Credited to its source|Said to be yours|Torn out",
      "Giving credit to the source means...|Saying where the information came from|Paying a fee|Hiding the book",
      "You find a great paragraph. What do you do?|Write the idea in your own words|Copy it all|Print and hand it in",
      "Why is it important to give credit?|It is honest and fair to the author|It is boring|It makes you slow"
    ]),
    SC("Is this website trustworthy?", "🌐", "Anyone can post on the internet, so check. A good page names its author, shows a date and has facts you can check in other places. Always use the internet with a grown-up's OK.", "Look for an author, a date and agreement with other trusted sources.", "A page by a museum with a named expert and a date is a good start, but I still check another source.", [
      "Which clue shows a page may be trustworthy?|It names an expert author and a date|It has lots of pop-ups|It asks for your address",
      "A page shouts: 'You won! Click now!' It is probably...|Not trustworthy|A reliable source|A library",
      "The school library catalog and library databases are...|Safe, trusted places to start|Always unsafe|Full of ads",
      "A page by a museum is often...|A good source, but still check|Always fake|Only jokes",
      "A page has no author and no date. You should...|Look for a better source|Trust it|Share it",
      "Who can help you check a page?|A librarian or teacher|A stranger online|A pop-up",
      "If two trusted sources agree, the fact is probably...|True|Silly|Secret",
      "A page that tries to sell you things might...|Be one-sided, so check more|Always tell everything|Be a book"
    ]),
    SC("Big questions, small questions", "❓", "Some questions need long answers (how or why). Some can be answered with yes or no. Good research questions are not too big and not too small.", "Look for how or why. Make sure the question is about facts.", "'Why do leaves change color?' needs a longer answer. 'Is it fall?' is yes or no.", [
      "Which question needs more than a yes or no answer?|Why do leaves change color?|Is it fall?|Do you like leaves?",
      "Which is a better research question?|How do bats find food at night?|Are bats cool?|Is a bat a bat?",
      "A question starting with how or why usually...|Needs a longer answer|Needs yes or no|Has no answer",
      "Which question is too big for a short report?|Everything about animals|How do polar bears keep warm?|What do frogs eat?",
      "Which question has an answer in a book?|What do pandas eat?|Which panda is cutest?|Do you like pandas?",
      "Which is best for a report on volcanoes?|What makes a volcano erupt?|Is a volcano cute?|Do you like Fridays?"
    ]),
    stepOrder(),
    PL("Parts of a report", "📄", "A short report has parts. Each part has a job.", "Think: start, middle, end, and where facts came from.", [
      "title::the name of your report::🏷️", "introduction::the start, which tells the topic::🚪", "body::the middle, with facts and details::🧱", "conclusion::the end, which wraps up your report::🏁", "source list::shows where your facts came from::📋"
    ], { qd: "Which report part is this?", qt: "What is this report part?" }),
    SC("Good digital citizens", "🛡️", "A digital citizen is kind, honest and careful online. Respect others, protect private things, and tell a grown-up when something is wrong.", "Be kind, be careful, and ask for help when unsure.", "If someone is mean to me online, I do not reply and I tell a grown-up.", [
      "Before sharing a photo with your friend in it, you...|Ask your friend and a grown-up|Post it fast|Post it anywhere",
      "A kind digital citizen...|Is polite and honest online|Teases others|Shares secrets",
      "Someone is mean to you online. You...|Do not reply, and tell a grown-up|Are mean back|Hide it",
      "Your username should not have your...|Real name or birthday|Favorite color|Favorite animal",
      "Someone you only met online asks for a picture of you. You...|Say no and tell a grown-up right away|Send one|Send a silly one",
      "A friend asks for your password. You...|Keep it private|Share it|Write it on a sticky note",
      "Before leaving a library computer, you should...|Log out and close your pages|Leave it open|Turn the volume up"
    ])
  ];

  Object.assign(LIBRARY_LEVELS, {
    4: lvl(4, L4, [0, 1, 6, 8, 15]),
    5: lvl(5, L5, [0, 3, 6, 9, 14]),
    6: lvl(6, L6, [2, 3, 7, 9, 15])
  });
})();
