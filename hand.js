// Mind Lab Handwriting. Levels 1-3, 20 lessons each (60 lessons).
// Quiz-based and visual (kids don't write on screen). Needs math.js loaded first (ri, pick, shuf).
const HAND_LEVELS = (() => {
  const T = (h, v, t) => ({ h, v, t });
  const rest = (arr, x, n) => shuf(arr.filter(y => y !== x)).slice(0, n);
  const mkL = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [T("Review time!", "🔄", "This lesson mixes things you already know. Here is a quick reminder of each idea, then the quiz.")].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };
  // statics: rows are [text, answer, [wrong choices], optional visual, optional hint 2, optional hint 3]
  const statics = (rows, h1, h2, h3) => () => {
    const [text, ans, wr, vis, x2, x3] = pick(rows);
    const q = { text, choices: shuf([ans, ...wr]), answer: ans, hints: [h1, x2 || h2, x3 || h3] };
    if (vis) q.visual = vis;
    return q;
  };
  // classify: map {label: [items]}
  const classify = (map, tmpl, h1, h2, h3) => {
    const labels = Object.keys(map);
    return () => {
      const lab = pick(labels), w = pick(map[lab]);
      return { text: tmpl.replace("{w}", w), choices: shuf(labels), answer: lab, hints: [h1, h2, typeof h3 === "function" ? h3(w, lab) : h3] };
    };
  };
  const big = (s, px = 60) => `<span style="font-size:${px}px;font-family:Arial,sans-serif;line-height:1.1">${s}</span>`;

  // ---------- visuals ----------
  const BASE = "#7a8a99";
  const bars = kinds => {
    const W = 24 + kinds.length * 34;
    const rects = kinds.map((k, i) => {
      const y = k === "tall" ? 20 : 60, h = k === "tall" ? 80 : k === "short" ? 40 : 70;
      return `<rect x="${22 + i * 34}" y="${y}" width="18" height="${h}" rx="4" fill="#4a90e2"/>`;
    }).join("");
    return `<svg width="${W}" height="135" viewBox="0 0 ${W} 135" aria-hidden="true"><line x1="4" x2="${W - 4}" y1="20" y2="20" stroke="${BASE}" stroke-width="2"/><line x1="4" x2="${W - 4}" y1="60" y2="60" stroke="${BASE}" stroke-width="2" stroke-dasharray="5 5"/><line x1="4" x2="${W - 4}" y1="100" y2="100" stroke="#d9534f" stroke-width="3"/>${rects}</svg>`;
  };
  const lines = () => `<svg width="200" height="125" viewBox="0 0 200 125" aria-hidden="true"><line x1="4" x2="196" y1="20" y2="20" stroke="${BASE}" stroke-width="2"/><line x1="4" x2="196" y1="60" y2="60" stroke="${BASE}" stroke-width="2" stroke-dasharray="5 5"/><line x1="4" x2="196" y1="100" y2="100" stroke="#d9534f" stroke-width="3"/><text x="8" y="14" font-size="11" fill="${BASE}">top line</text><text x="8" y="54" font-size="11" fill="${BASE}">middle line</text><text x="8" y="118" font-size="11" fill="#d9534f">bottom line</text></svg>`;
  const svg = d => `<svg width="100" height="64" viewBox="0 0 90 60" fill="none" stroke="#4a90e2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const SHAPES = {
    "straight line": svg('<path d="M45 6 L45 54"/>'),
    "slanted line": svg('<path d="M20 54 L70 6"/>'),
    "curve": svg('<path d="M12 52 Q45 -14 78 52"/>'),
    "loop": svg('<path d="M6 50 C26 50 44 22 50 10 C56 -2 38 -2 38 12 C38 28 62 50 86 50"/>'),
    "wave": svg('<path d="M5 30 C18 6 32 6 45 30 C58 54 72 54 85 30"/>'),
    "circle": svg('<circle cx="45" cy="30" r="22"/>'),
    "zigzag": svg('<path d="M8 50 L28 10 L48 50 L68 10 L84 50"/>')
  };

  // ---------- letter data ----------
  const ABC = "abcdefghijklmnopqrstuvwxyz".split("");
  const TALL = "bdfhkl".split(""), TAIL = "gjpqy".split("");
  const SHORT = "acemnorsuvwxz".split("");
  const kindOf = c => (TALL.includes(c) ? "tall" : TAIL.includes(c) ? "tail" : "short");
  const STR_CAP = {
    L: "Start at the top and go straight down. Then go across to the right at the bottom.",
    T: "Make a straight line across the top. Then start in the middle of that line and go straight down.",
    E: "Go straight down. Then make three lines going across to the right: one at the top, one in the middle and one at the bottom.",
    H: "Go straight down. Go straight down again, a little way to the right. Then make a line across the middle to join them.",
    O: "Start at the top and go around in a big round circle until you meet where you started.",
    C: "Start near the top right, curve around to the left, and finish at the bottom right. It is a circle that is not closed.",
    A: "Start at the top point and slant down to the left. Go back to the top and slant down to the right. Then make a line across the middle.",
    V: "Slant down to a point at the bottom. Then slant back up to the right.",
    X: "Make two slanting lines that cross each other in the middle.",
    Z: "Make a line across the top. Slant down to the bottom left. Then make a line across the bottom.",
    F: "Go straight down. Then make a line across the top and a shorter line across the middle.",
    S: "Make a curvy snake: curve to the left at the top, then curve to the right at the bottom.",
    M: "Go straight down. Slant down to the middle, slant back up, then go straight down on the right side.",
    N: "Go straight down. Slant down to the bottom right. Then go straight up on the right side.",
    B: "Go straight down from the top. Go back to the top and make a bump (curve) to the middle, then another bump to the bottom.",
    D: "Go straight down from the top. Go back to the top and make one big curve to the bottom.",
    P: "Go straight down from the top. Go back to the top and make one bump (curve) that stops at the middle.",
    R: "Go straight down. Go back to the top, make a bump to the middle, then slant down to the bottom right.",
    J: "Go straight down from the top and curve to the left at the bottom, like a hook.",
    U: "Go down, curve around the bottom, and go back up.",
    W: "Go down, up, down, up. It looks like two Vs side by side.",
    Y: "Make a slanting line and another slanting line that meet in the middle. Then go straight down.",
    G: "Make a big letter C. Then add a short line going in at the middle on the right.",
    K: "Go straight down. Then make a slanting line in toward the middle and another slanting line out to the bottom right.",
    Q: "Make a big round circle. Then add a short slanted tail at the bottom right."
  };
  const STR_LOW = {
    o: "Make a small round circle. It sits on the bottom line and only goes up to the middle line.",
    l: "Make a tall straight line from the top line down to the bottom line.",
    i: "Make a short straight line down from the middle line. Then add a dot on top.",
    t: "Make a tall straight line down. Then add a short line across it, from left to right.",
    c: "Make a small curve. Start near the top right, go around to the left, and finish at the bottom right. The circle is not closed.",
    a: "Make a small circle. Then add a short straight line down on the right side of the circle.",
    b: "Make a tall straight line down. Then make a round belly on the right side, at the bottom.",
    d: "Make a small circle first. Then add a tall straight line on the right side of the circle.",
    p: "Make a straight line that starts at the middle line and goes down below the bottom line. Then make a round belly on the right, at the top.",
    q: "Make a small circle first. Then add a straight line on its right side that goes down below the bottom line.",
    h: "Make a tall straight line down. Then go up a little and make a small arch on the right.",
    n: "Make a short straight line down from the middle line. Then go up a little and make a small arch on the right.",
    u: "Make a short line down from the middle line, curve around at the bottom, and go back up. Then add a short straight line down on the right.",
    e: "Start in the middle with a short line across to the right. Then curve up and around to the left, and finish at the bottom with a little tail to the right.",
    f: "Make a tall curve at the top like a hook, go straight down to the bottom line, then add a short line across the middle.",
    g: "Make a small circle first. Then add a straight line on its right that goes down below the line and curls to the left.",
    j: "Make a straight line that goes down below the bottom line and curls to the left. Then add a dot on top.",
    k: "Make a tall straight line down. Then make a slanting line in toward the middle and another slanting line out to the bottom right.",
    m: "Make a short straight line down. Then make two small arches, one after the other.",
    r: "Make a short straight line down from the middle line. Then go back up and make a small curl to the right at the top.",
    s: "Make a small curvy snake: curve to the left at the top, then curve to the right at the bottom.",
    v: "Slant down to the bottom line, then slant back up. It looks like a small pointy cup.",
    w: "Make two small Vs side by side: down, up, down, up.",
    x: "Make two short slanting lines that cross in the middle.",
    y: "Make a short slanting line down. Then make a second slanting line that goes down below the bottom line. They meet like a V with a tail.",
    z: "Make a short line across the top. Slide down slanting to the left. Then make a short line across the bottom."
  };
  const STR_DIG = {
    "0": "Start at the top, go around in a big round oval, and come back to where you started.",
    "1": "Start near the top and go straight down.",
    "2": "Start with a curve at the top, slant down to the bottom left, then go across the bottom to the right.",
    "3": "Make a bump (curve) at the top, then another bump below it. Both bumps are on the right side.",
    "4": "Go down and across to the right to make a corner. Then make a second line straight down on the right side that crosses the first.",
    "5": "Go down a short way, make a big round belly at the bottom, then add a flat line across the top.",
    "6": "Curve down from the top like a long hook, then loop around into a round circle at the bottom.",
    "7": "Make a line across the top, then slant down to the bottom.",
    "8": "Make two round circles, one on top of the other, joined in the middle.",
    "9": "Make a small round circle at the top, then a straight line down on its right side."
  };
  const descQ = (dict, keys, kind) => () => {
    const k = pick(keys), wr = rest(keys, k, 2), ex = pick(keys.filter(x => x !== k && !wr.includes(x)).concat(rest(keys, k, 1)));
    return { text: `Which ${kind} is this? Trace it in the air with your finger.<br><br><i>${dict[k]}</i>`, choices: shuf([k, ...wr]), answer: k,
      hints: ["Follow each step with your finger in the air. What shape do you get?", "Look at the first step. Which choices start that way? Cross out the ones that don't.", `Example: <i>${dict[ex]}</i> That makes the ${kind} <b>${ex}</b>. Now trace yours.`] };
  };
  const strokeSlides = (name, ex) => [
    T(name, ex, "Every letter is made of a few strokes: straight lines, slanting lines and curves. We make them in a certain order."),
    T("Start at the top", "⬇️", "Most letters start at the top and go down. Follow the words step by step."),
    T("Trace in the air", "☝️", "Use your finger to trace the letter in the air while you read. The shape will show you which letter it is.")
  ];

  // ---------- pair / case questions ----------
  const LOOK = [["b", "d", "p", "q"], ["m", "n", "h", "r", "u"], ["g", "q", "y", "j"], ["a", "e", "o", "c", "s"], ["f", "t", "l", "i"], ["v", "w", "x", "z", "k"]];
  const pairQ = (pool, mode, lookalike) => () => {
    const L = pick(pool), toLow = mode === "low" ? true : mode === "up" ? false : Math.random() < 0.5;
    const ans = toLow ? L : L.toUpperCase();
    let others = [];
    if (lookalike) { const g = LOOK.find(x => x.includes(L)) || []; others = g.filter(x => x !== L && pool.includes(x)); }
    const wr = shuf(others.concat(shuf(pool.filter(x => x !== L && !others.includes(x))))).slice(0, 2);
    const ex = L === "b" ? "d" : "b";
    return { text: toLow ? `Which small letter is the partner of the capital letter below?` : `Which capital letter is the partner of the small letter below?`,
      visual: big(toLow ? L.toUpperCase() : L, 72), choices: shuf([ans, ...wr.map(x => (toLow ? x : x.toUpperCase()))]), answer: ans,
      hints: ["Every letter has two forms: a big capital and a small letter. They are partners.", "Some partners look alike (Oo, Ss, Cc) and some look different (Aa, Dd, Gg). Think about how you write the other one.", `Example: ${ex.toUpperCase()} and ${ex} are partners, big and small. Find the partner of yours.`] };
  };
  const pairSlides = [
    T("Big and small partners", "A a &nbsp; B b &nbsp; C c", "Every letter has two forms: a <b>capital</b> (big) letter and a <b>small</b> (lowercase) letter."),
    T("Look alike or not", "O o &nbsp; S s &nbsp; D d &nbsp; G g", "Some partners look the same, just a different size (Oo, Ss, Cc). Some look different (Dd, Gg, Qq, Rr)."),
    T("When to use them", "<b>M</b>ia has a cat.", "Use a capital to start a sentence and a name. Use small letters for everything else.")
  ];
  const SAME = "cosvwxz".split(""), DIFF = "abdeghqr".split("");
  const sameQ = () => () => {
    const ans = pick(SAME), wr = shuf(DIFF).slice(0, 2);
    return { text: "Which small letter looks <b>just like its capital</b>, only smaller?", visual: big("Aa Bb Cc", 40), choices: shuf([ans, ...wr]), answer: ans,
      hints: ["Think of the capital and the small letter side by side. Which pair looks the same?", "These pairs only change size, not shape. Say the capital, then picture the small one.", "Example: <b>O</b> and <b>o</b> look the same, only the size is different. But <b>D</b> and <b>d</b> look different. Now do yours."] };
  };
  const SMALLSLIDES = [
    T("Same shape, new size", "C c &nbsp; O o &nbsp; S s", "A few letters look exactly the same as capitals and small letters, only the size changes: <b>c, o, s, v, w, x, z</b>."),
    T("Others change", "A a &nbsp; B b &nbsp; D d &nbsp; G g", "Most letters change shape. The small a does not look like the capital A!"),
    T("Practice", "✏️", "When you learn a new letter, learn both the big one and the small one.")
  ];

  // ---------- straight or curvy ----------
  const STRAIGHT = "EFHLTAKMNVWXYZ".split(""), CURVY = "BCDGJOPQRSU".split(""), ONLYCURVE = ["C", "O", "S"];
  const curvyQ = () => () => {
    const style = ri(1, 3);
    let text, ans, wr;
    if (style === 1) { ans = pick(STRAIGHT); wr = shuf(CURVY).slice(0, 2); text = "Which capital letter is made with <b>only straight lines</b>?"; }
    else if (style === 2) { ans = pick(CURVY); wr = shuf(STRAIGHT).slice(0, 2); text = "Which capital letter has a <b>curve</b> in it?"; }
    else { ans = pick(ONLYCURVE); wr = shuf(STRAIGHT).slice(0, 2); text = "Which capital letter is made with <b>only a curve</b> (no straight lines)?"; }
    return { text, choices: shuf([ans, ...wr]), answer: ans,
      hints: ["Picture the letter. Draw it in the air with your finger. Do you ever go around in a curve?", "Straight letters have no round parts at all. Curvy letters have at least one round part.", "Example: <b>T</b> is made of two straight lines. <b>S</b> is one curvy snake. Now picture yours."] };
  };
  const curvySlides = [
    T("Straight lines", "E F H L T", "Some capital letters are made of <b>straight lines</b> only, like E, F, H, L and T."),
    T("Curves", "C O S", "Some letters are made with <b>curves</b>. C, O and S are all curves, with no straight lines at all."),
    T("Both!", "B D P R", "Some letters use both: a straight line and a curve, like B, D, P and R.")
  ];

  // ---------- tall / short / tail ----------
  const tstH3 = (w, lab) => {
    const pool = [TALL, SHORT, TAIL].map(a => a.filter(x => x !== w));
    const exT = pick(pool[0]), exS = pick(pool[1]), exL = pick(pool[2]);
    return `Example: <b>${exT}</b> is tall (it reaches the top line), <b>${exS}</b> is short (it stays small), and <b>${exL}</b> has a tail (it goes below the line). Now do yours.`;
  };
  const tstQ1 = classify({ "tall letter": "bdhkl".split(""), "short letter": "aceosu".split(""), "tail letter": "gpy".split("") }, "Is the small letter <b>{w}</b> a tall letter, a short letter or a tail letter?",
    "Picture the letter on writing lines: top line, middle line and bottom line.", "A <b>tall</b> letter reaches the top line. A <b>short</b> letter only reaches the middle line. A <b>tail</b> letter goes below the bottom line.", tstH3);
  const tstQ2 = classify({ "tall letter": TALL, "short letter": SHORT, "tail letter": TAIL }, "Is the small letter <b>{w}</b> a tall letter, a short letter or a tail letter?",
    "Picture the letter on writing lines: top line, middle line and bottom line.", "A <b>tall</b> letter reaches the top line. A <b>short</b> letter only reaches the middle line. A <b>tail</b> letter goes below the bottom line.", tstH3);
  const tstSlides = [
    T("Three sizes of letters", "b &nbsp; a &nbsp; g", "Small letters come in three sizes: <b>tall</b> letters, <b>short</b> letters and <b>tail</b> letters."),
    T("Tall, short, tail", "<b>b d f h k l</b> tall · <b>a c e o s u</b> short · <b>g j p q y</b> tail", "Tall letters reach the top line. Short letters stay between the middle and bottom lines. Tail letters dip <b>below</b> the bottom line."),
    T("Where they sit", "All letters sit on the bottom line", "Every letter sits on the bottom line, except tails, which hang down from it.")
  ];
  const barsQ = pool => () => {
    const k = pick(["tall", "short", "tail"]), cand = pool.filter(c => kindOf(c) === k), ans = pick(cand);
    const wr = shuf(pool.filter(c => kindOf(c) !== k)).slice(0, 2);
    const exs = { tall: "The bar from the top line to the bottom line is a <b>tall</b> letter, like l.", short: "A short bar from the middle line to the bottom line is a <b>short</b> letter, like o.", tail: "A bar that goes past the bottom line is a <b>tail</b> letter, like y." };
    const ex = Object.keys(exs).filter(x => x !== k)[0];
    return { text: "The blue bar shows how tall a small letter is. Which letter fits the bar?", visual: bars([k]), choices: shuf([ans, ...wr]), answer: ans,
      hints: ["Look at where the bar starts and where it ends. Does it go past the red bottom line?", "A bar from the top line down is tall. A bar from the dotted middle line is short. A bar that goes below the red line has a tail.", "Example: " + exs[ex] + " Now match yours."] };
  };
  const barsSlides = [
    T("Reading the lines", "top · middle · bottom", "Writing paper has a <b>top line</b>, a dotted <b>middle line</b> and a <b>bottom line</b>. Letters live on these lines."),
    T("Bars show the height", "▮ ▮ ▮", "A bar from the top line to the bottom line shows a tall letter. A bar from the middle line is a short letter. A bar that dips below the bottom line has a tail."),
    T("Match them", "🎯", "Look at the bar, then think: which letters are that size?")
  ];
  const PATW2 = ["dog", "bed", "hen", "cup", "sun", "fox", "pen", "yes", "hug", "man", "bug", "log"];
  const PATW3 = ["hello", "puppy", "happy", "lemon", "wagon", "jelly", "queen", "candy", "flag", "bunny", "sheep", "plane"];
  const pat = w => w.split("").map(kindOf).join("-");
  const wordShapeQ = bank => () => {
    const right = pick(bank), chosen = [right];
    shuf(bank).forEach(w => { if (chosen.length < 3 && !chosen.some(c => pat(c) === pat(w))) chosen.push(w); });
    return { text: "The blue bars show the shape of a word. Which word fits?", visual: bars(right.split("").map(kindOf)), choices: shuf(chosen), answer: right,
      hints: ["Count the bars first. How many letters does the word have?", "Match the bars one by one: a tall bar for letters like b, d, h, l; short bars for letters like a, e, o; a bar below the line for g, p, y.", "Example: the bars short, short, tail fit the word <b>cap</b>: c and a are short and p has a tail. Now match yours."] };
  };
  const wordShapeSlides = [
    T("Word shapes", "d o g → tall · short · tail", "Every word has a shape. Look at the tall letters, short letters and tails in a row."),
    T("Using the shape", "▮ ▮ ▮", "The shape of a word can help you read it and write it neatly, with every letter sitting on the line."),
    T("Count the bars", "1 2 3", "Each bar is one letter. First count them, then match the heights.")
  ];

  // ---------- statics banks ----------
  const BDPQ = statics([
    ["Which letter has a tall stick on the <b>left</b> and a round belly on the <b>right</b>, with the belly at the bottom?", "b", ["d", "p", "q"]],
    ["Which letter has a round circle on the <b>left</b> and a tall stick on the <b>right</b>?", "d", ["b", "p", "q"]],
    ["Which letter has a stick that goes <b>down below the line</b> on the left, with a belly on the right at the top?", "p", ["b", "d", "q"]],
    ["Which letter has a circle on the left and a stick that goes <b>down below the line</b> on the right?", "q", ["b", "d", "p"]],
    ["In the word <b>bed</b>, which letter comes first?", "b", ["d", "p", "q"]],
    ["In the word <b>bed</b>, which letter comes last?", "d", ["b", "p", "q"]],
    ["What is the first letter of <b>pig</b>?", "p", ["b", "d", "q"]],
    ["What is the first letter of <b>queen</b>?", "q", ["b", "d", "p"]],
    ["What is the first letter of <b>dog</b>?", "d", ["b", "p", "q"]],
    ["What is the first letter of <b>ball</b>?", "b", ["d", "p", "q"]]
  ], "These four letters look alike, so look at which way the round part faces and where the stick goes.", "Ask two questions: Is the round part on the left or the right? Does the stick go up tall or down below the line?", "Example: in <b>bed</b>, hold up both thumbs. Your left hand makes a <b>b</b> and your right hand makes a <b>d</b>, like the letters in bed. Now do yours.");
  const bdpqSlides = [
    T("Look-alike letters", "b &nbsp; d &nbsp; p &nbsp; q", "<b>b, d, p</b> and <b>q</b> all use a stick and a circle. They just face different ways."),
    T("Check two things", "stick ⬆️ or ⬇️ &nbsp; belly ⬅️ or ➡️", "Does the stick go up tall (b, d) or down below the line (p, q)? Is the round part on the left or the right?"),
    T("The bed trick", "b ✊ e d ✊", "Make two fists with thumbs up. Your left hand looks like b and your right hand looks like d, like the letters of the word <b>bed</b>.")
  ];

  const spaceSents = ["The cat sat.", "I see a dog.", "We can run.", "My hat is red.", "The sun is up.", "Mom has a pen.", "I like to play.", "A bird can fly."];
  const spaceQ = () => () => {
    const s = pick(spaceSents), ws = s.split(" ");
    const versions = shuf([["good", s], ["tight", ws.join("")], ["wide", ws.join("&emsp;&emsp;&emsp;")]]);
    const lab = "ABC", right = versions.findIndex(v => v[0] === "good");
    return { text: "Which line has a good <b>finger space</b> between the words?<br><br>" + versions.map((v, i) => `<b>${lab[i]}</b> &nbsp; <span style="font-size:1.15em;font-family:Arial,sans-serif;white-space:nowrap">${v[1]}</span>`).join("<br>"),
      choices: ["A", "B", "C"], answer: lab[right],
      hints: ["Look at the space between the words in each line. Not too small, not too big.", "A good space is about the width of one finger, or the size of a small letter o.", "Example: <b>Thecat</b> has no space, and <b>The&emsp;&emsp;&emsp;cat</b> has too much space. <b>The cat</b> is just right. Now look at yours."] };
  };
  const spaceSlides = [
    T("Space between words", "The cat sat.", "Leave a small gap between words so people can read your writing. The gap is called a <b>space</b>."),
    T("Finger space", "☝️ The ☝️ cat ☝️ sat.", "A good space is about as wide as <b>one finger</b>, or the size of a small letter <b>o</b>."),
    T("Not too small, not too big", "Thecatsat. ❌ &nbsp; The&emsp;&emsp;cat ❌", "No space makes words run together. Too much space makes the words hard to read as a sentence.")
  ];
  const WORDS_LS = ["cat", "sun", "pig", "dog", "frog", "moon", "bird", "fish"];
  const letterSpaceQ = () => () => {
    const w = pick(WORDS_LS), lab = "ABC";
    const v = shuf([["good", `<span style="letter-spacing:1px">${w}</span>`], ["wide", `<span style="letter-spacing:14px">${w}</span>`], ["tight", `<span style="letter-spacing:-6px">${w}</span>`]]);
    const right = v.findIndex(x => x[0] === "good");
    return { text: "Which word has good space between its <b>letters</b>?<br><br>" + v.map((x, i) => `<b>${lab[i]}</b> &nbsp; <span style="font-size:1.6em;font-family:Arial,sans-serif">${x[1]}</span>`).join("<br>"),
      choices: ["A", "B", "C"], answer: lab[right],
      hints: ["Letters in a word sit close together, but they should not touch or overlap.", "Too much space makes the letters look like separate pieces. Too little makes them bump into each other.", "Example: <b>c a t</b> has too much room, <b>cat</b> is just right. Now look at yours."] };
  };
  const spaceMix = () => () => pick([spaceQ(), letterSpaceQ()])();

  const GRIP = statics([
    ["Which two fingers pinch the pencil?", "thumb and pointer finger", ["thumb and pinky finger", "ring finger and pinky finger"], null, "Your pointer finger is the one right next to your thumb.", "Example: when you pick up a tiny bead you pinch it. Use the same pinching fingers on a pencil."],
    ["Where does the pencil rest?", "on your middle finger", ["on your pinky finger", "on your palm"], null, "The pencil leans on the tall finger in the middle of your hand, beside the pinching fingers.", "Example: a bridge needs something to rest on. The pencil needs a resting finger, too."],
    ["How tightly should you hold your pencil?", "gently, not too tight", ["as tight as you can", "so loose it falls"], null, "If your fingers turn white, you are holding it too hard. If it slips, too loose.", "Example: hold it like a small, soft bird: safe, but not squeezed."],
    ["What does your other hand do when you write?", "holds the paper still", ["waves in the air", "covers your eyes"], null, "Your writing hand is busy. Your helper hand has a different job.", "Example: when you cut with scissors, your other hand holds the paper. Same idea here."],
    ["Where should your fingers hold the pencil?", "a little way up from the sharp tip", ["on the sharp tip", "at the very top end"], null, "Too close to the point and you cannot see your letters. Too high and you lose control.", "Example: hold it about one finger-width above where the sharp part starts."],
    ["Which way should the sharp tip point?", "down toward the paper", ["up toward your face", "up to the ceiling"], null, "Writing happens where the tip touches the paper.", "Example: when you write on a board, the chalk points at the board. A pencil points at the paper."],
    ["What do you use to fix a mistake in pencil?", "an eraser", ["a crayon", "a ruler"], null, "Think of the tool that takes pencil marks away.", "Example: if you draw a wobbly line, you can rub it out with the pink end of a pencil."],
    ["What should you do if your hand gets tired?", "stop, shake it out and rest", ["squeeze the pencil harder", "throw the pencil"], null, "Tired hands need a break, not more squeezing.", "Example: after a long walk you rest your legs. Your hand needs rest after long writing, too."]
  ], "Think about what feels comfortable and keeps your hand from getting tired.", "A good grip is gentle and relaxed. Your hand should be able to move easily.", "Example: pinch the pencil lightly, rest it on your middle finger, and keep the tip down on the paper. Now do yours.");
  const gripSlides = [
    T("The pencil grip", "✏️ 👍 ☝️ 🖕", "Pinch the pencil with your <b>thumb</b> and <b>pointer finger</b>. Let it rest on your <b>middle finger</b>."),
    T("Gentle hands", "🐦", "Hold it gently, like a small bird. A squeezed pencil makes your hand tired and your letters wobbly."),
    T("Helper hand", "✋", "Your other hand holds the paper still, so it doesn't slide around.")
  ];

  const POSTURE = statics([
    ["How should you sit when you write?", "feet flat on the floor, back straight", ["lying on the floor", "with your head on the desk"], null, "Your body should be comfortable and steady, not slumped.", "Example: sit like a tall tree: feet on the ground and back straight."],
    ["Where should your paper be?", "right in front of you on the desk", ["on the floor", "behind you"], null, "You need to see it and reach it easily.", "Example: your lunch is in front of you when you eat. Your paper is, too."],
    ["Where should your eyes look when you write?", "at your paper", ["at the ceiling", "out the window"], null, "Look at the place where your letters appear.", "Example: when you pour juice, you look at the cup. Writing is the same."],
    ["Where should your feet be?", "flat on the floor", ["up on the chair", "wrapped around the chair"], null, "Your feet help keep your body steady.", "Example: a chair with all four legs on the ground is steady. Your feet help the same way."],
    ["How far should your chair be from the desk?", "close enough to reach, not squished", ["far across the room", "right on top of the desk"], null, "You want your arms to move freely.", "Example: not so far that you stretch, and not so close that you are squeezed."],
    ["What is good light for writing?", "enough light to see your paper clearly", ["total darkness", "a light shining in your eyes"], null, "You need to see your letters.", "Example: a room with a lamp or a window is good for working."],
    ["Where should your arm be when you write?", "resting on the desk", ["held high in the air", "hanging down behind you"], null, "A resting arm gets less tired.", "Example: resting your arm is like leaning on a pillow: much easier."],
    ["Before you start writing, what should you do?", "get ready: sit well, hold your pencil right", ["rush and scribble", "close your eyes"], null, "Being ready helps writing go well.", "Example: before you run a race, you get ready. Before writing, you get ready, too."]
  ], "Think about sitting in a way that is comfortable, steady and lets you see your work.", "Good posture helps your hand write neatly. Feet on the floor, back straight, paper in front of you.", "Example: sit tall, put your paper in front of you, and rest your arm on the desk. Now do yours.");
  const postureSlides = [
    T("Sit ready", "🪑 🧒", "Sit with your <b>feet flat on the floor</b> and your <b>back straight</b>. It helps you write neatly."),
    T("Paper position", "📄", "Put your paper <b>right in front of you</b>. Rest your arm on the desk."),
    T("Eyes on the work", "👀", "Look at your paper and take a break if you feel tired.")
  ];

  const HABIT1 = statics([
    ["Where do most letters start?", "at the top", ["at the bottom", "in the air"], null, "Think about how L, T, E, H start.", "Example: to write L you put your pencil at the top and go down. Most letters work that way."],
    ["Which line do all letters sit on?", "the bottom line", ["the top line", "the middle line"], null, "Letters stand on the ground, like people.", "Example: people stand on the floor, and letters stand on the bottom line."],
    ["What goes between words?", "a finger space", ["a star", "a number"], null, "Words need a little room to breathe.", "Example: <b>I see</b> has a small gap between I and see."],
    ["What makes writing easy to read?", "neat, even letters", ["big mess", "tiny scribbles"], null, "Think about writing that others can read right away.", "Example: letters that are the same size and sit on the line look neat."],
    ["What should you do before you hand in your work?", "look it over and fix mistakes", ["throw it away", "hide it"], null, "Good writers check their work.", "Example: after you build a block tower, you check that it is straight. Check your writing, too."],
    ["What is the best way to fix a mistake?", "erase it and try again", ["scribble it out hard", "tear the paper"], null, "Fix the mistake without making a mess.", "Example: a gentle rub with an eraser makes the paper clean again."],
    ["Where do you begin a line of words?", "on the left side", ["on the right side", "in the middle"], null, "We read from left to right, so we write that way.", "Example: when you read a book, your eyes start on the left of the line."],
    ["Which is neater?", "letters of the same size sitting on the line", ["letters jumping all over the page", "letters bigger and smaller each time"], null, "Neat writing is steady and easy to read.", "Example: a row of soldiers all standing straight looks neat."]
  ], "Think about what helps other people read your writing.", "Neat writing has letters of the same size that sit on the line, with finger spaces between words.", "Example: put a finger space between words, start on the left, and make your letters sit on the line. Now do yours.");
  const habitSlides = [
    T("Neat writing habits", "✏️ ✨", "Neat writing is easy for you and others to read. A few good habits make it happen."),
    T("Your checklist", "⬆️ ➖ ☝️", "Start letters at the <b>top</b>. Sit letters on the <b>line</b>. Leave a <b>finger space</b> between words."),
    T("Slow is smooth", "🐢", "Go slowly. Neat writing takes time. It is better to be neat than fast.")
  ];

  const GRIP2 = statics([
    ["What tool makes a dull pencil sharp again?", "a pencil sharpener", ["an eraser", "a ruler"]],
    ["What do you use to rub out a mistake?", "an eraser", ["a sharpener", "a crayon"]],
    ["What can you use to draw a straight line?", "a ruler", ["an eraser", "a sharpener"]],
    ["Which pencil makes a neat, thin line?", "a sharp pencil", ["a very dull pencil", "a pencil with no tip"]],
    ["A good grip uses the thumb, the pointer finger and the ___ finger.", "middle", ["pinky", "ring"]],
    ["While you write, the paper is held still by your ___.", "other (helper) hand", ["writing hand", "elbow"]],
    ["If you press too hard, your hand gets ___.", "tired", ["extra neat", "cooler"]],
    ["Which grip lets you make small, neat moves?", "a relaxed pinch grip", ["a tight fist", "two hands on the pencil"]]
  ], "Think about what helps your pencil and your hand work well together.", "A sharp pencil, a relaxed pinch grip and a still sheet of paper all help.", "Example: before you write, check that your pencil is sharp and your fingers are relaxed. Now do yours.");
  const POSTURE2 = statics([
    ["When you write, your back should be ___.", "straight", ["curled up", "lying flat"]],
    ["Your elbow should be ___.", "close to your body, resting", ["far out in the air", "behind your head"]],
    ["Your chair should let your feet ___.", "touch the floor", ["swing in the air", "stand on the desk"]],
    ["Should you lean your head on your hand while writing?", "no, sit up", ["yes, always", "only with your eyes shut"]],
    ["Where should your paper lie?", "flat on the desk", ["in your lap", "on the floor"]],
    ["Where do your eyes look when you write?", "at your letters", ["at the ceiling", "at the door"]],
    ["What should you do if you start to slouch?", "sit up tall again", ["slide down more", "lie on the desk"]],
    ["A good writing spot is ___.", "quiet and well lit", ["dark and noisy", "far from the desk"]]
  ], "Think about sitting in a way that keeps your body steady and your eyes on your work.", "Sit tall, feet down, paper flat in front of you, arm resting.", "Example: sit like a tall tree with your feet on the ground and your paper in front of you. Now do yours.");
  const HABIT2 = statics([
    ["After each word, you should ___.", "leave a finger space", ["draw a star", "start a new page"]],
    ["Tall letters should all be about ___.", "the same height", ["different every time", "as tiny as a dot"]],
    ["Tail letters should hang ___.", "below the line", ["above the line", "on top of the next word"]],
    ["Letters in a line should lean ___.", "the same way", ["a different way each time", "all over the place"]],
    ["Before you write, you should know ___.", "what you want to say", ["nothing at all", "only the last word"]],
    ["After you write, you should ___.", "read it and check it", ["never look at it", "fold it up"]],
    ["A good pencil mark is ___.", "clear but not too dark", ["invisible", "a hole in the paper"]],
    ["When you finish your work, you should ___.", "put your pencil away", ["break the pencil", "hide it in a book"]]
  ], "Think about what you can do to make your writing easy for other people to read.", "Neat writers are careful and patient: even letters, finger spaces, and a quick check at the end.", "Example: after writing <b>I see a cat</b>, a neat writer reads it again and checks each word. Now do yours.");
  const LINESQ = statics([
    ["Which line do <b>all</b> letters sit on?", "the bottom line", ["the top line", "the middle line"], lines(), null, "Example: the letter l is tall and reaches way up, but it still stands on one line, like a person standing on the floor. Which line is the floor?"],
    ["Tall letters (like b and l) reach up to which line?", "the top line", ["the bottom line", "the middle line"], lines(), null, "Example: the letter o is short, so it only fills the space in the bottom half. Tall letters fill all the space. Now look at yours."],
    ["Short letters (like a and o) reach up to which line?", "the middle line (dotted)", ["the top line", "the bottom line"], lines(), null, "Example: the letter l is tall, so it reaches the top line. Short letters do not reach that high. Now look at yours."],
    ["Letters with tails (like g and p) go ___ the bottom line.", "below", ["above", "just on"], lines(), null, "Example: the letter l is tall and reaches up from the bottom line. A tail letter goes the other way, away from the top. Now look at yours."],
    ["A capital letter reaches up to which line?", "the top line", ["the bottom line", "the middle line"], lines(), null, "Example: the letter o is short, but its capital O is big and fills all the space. Now look at yours."],
    ["Where do you put your pencil to start a tall stick letter like l?", "on the top line", ["on the bottom line", "below the page"], lines(), null, "Example: to make an l you pull your pencil down. So where must you begin? Now look at yours."],
    ["Which letters stretch from the top line all the way down to the bottom line?", "tall letters", ["short letters", "tail letters"], lines(), null, "Example: the letter b is a stick with a belly. Its stick goes all the way up. Now look at yours."],
    ["Which letters hang below the red bottom line?", "tail letters", ["tall letters", "short letters"], lines(), null, "Example: the letter y has a tail. Which kind of letter is that? Now look at yours."]
  ], "Look at the picture. Read the names on the three lines.", "Tall letters and capitals use all the space. Short letters use the bottom half. Tails dip below the red line.", "Example: the letter o is short, so it fills the space between the dotted line and the red line. Now look at your question.");
  const linesSlides = [
    T("Three lines", "top · middle (dotted) · bottom (red)", "Writing paper has a <b>top line</b>, a dotted <b>middle line</b> and a <b>bottom line</b>."),
    T("Who goes where", "b · a · g", "Tall letters reach the top line. Short letters reach the middle line. Tail letters hang below the bottom line."),
    T("The ground line", "🧍", "All letters stand on the <b>bottom line</b>, like people standing on the floor.")
  ];

  const DOTS = statics([
    ["Which small letter needs a <b>dot</b> on top?", "i", ["l", "t", "o"]],
    ["Which small letter has a dot on top <b>and</b> a tail below the line?", "j", ["i", "g", "y"]],
    ["Which small letter needs a short <b>line across</b> it?", "t", ["l", "i", "o"]],
    ["The word <b>pig</b> has a letter with a dot. Which one?", "i", ["p", "g"]],
    ["The word <b>jump</b> has a letter with a dot. Which one?", "j", ["u", "m", "p"]],
    ["The word <b>cat</b> has a letter that needs a cross line. Which one?", "t", ["c", "a"]],
    ["The word <b>lid</b> has a letter with a dot. Which one?", "i", ["l", "d"]],
    ["The word <b>ant</b> needs a line across one letter. Which one?", "t", ["a", "n"]]
  ], "Some letters need an extra mark after you make the main part.", "<b>i</b> and <b>j</b> have dots. <b>t</b> gets a line across. Look for those letters.", "Example: in the word <b>kit</b>, the letter <b>i</b> gets a dot and the letter <b>t</b> gets a cross line. Now do yours.");
  const dotsSlides = [
    T("Dots", "i &nbsp; j", "The small letters <b>i</b> and <b>j</b> each get a <b>dot</b> on top. Make the dot last, after the line."),
    T("Crosses", "t &nbsp; f", "The letter <b>t</b> gets a short line across it. The letter <b>f</b> does, too."),
    T("Finish the letter first", "✏️ → •", "Finish the whole letter first, then add the dot or the cross.")
  ];

  const CAPNAME = ["Ben", "Mia", "Sam", "Zoe", "Leo", "Max", "Eli", "Kai", "Ivy", "Jack", "Ruby", "Tom", "Dan", "Nora", "Hugo"];
  const capNameQ = () => () => {
    const n = pick(CAPNAME), chars = n.split(""), ans = chars[0], wr = chars.slice(1).filter(c => c.toLowerCase() !== ans.toLowerCase()), uniq = [...new Set(wr)].slice(0, 2);
    return { text: `In the name <b>${n}</b>, which letter is the big (capital) letter?`, choices: shuf([ans, ...uniq]), answer: ans,
      hints: ["Names start with a capital letter. A capital letter is the big one.", "The capital goes first in a name. The rest of the letters are small.", "Example: in the name <b>Dina</b>, the big letter is <b>D</b>, the first one. Now look at yours."] };
  };
  const capNameSlides = [
    T("Writing a name", "<b>S</b>am", "A name starts with a <b>capital</b> letter. The other letters in the name are small."),
    T("Big first, then small", "<b>M</b>ia", "Only the first letter of a name is big: M, then i, a."),
    T("Sentences too", "<b>T</b>he cat sat.", "The first letter of a sentence is a capital letter, too.")
  ];

  const SENTLINES = statics([
    ["Where does a sentence start on the line?", "on the left side", ["on the right side", "in the middle of the page"]],
    ["Which mark goes at the end of a telling sentence?", "a period", ["a star", "a number"]],
    ["When you reach the end of the line, where do you start the next line?", "on the left, just below", ["on the right", "back at the top of the page"]],
    ["What is the first letter of a sentence?", "a capital letter", ["a small letter", "a number"]],
    ["What goes between each word?", "a finger space", ["a picture", "a dot"]],
    ["Which way do you write along a line?", "left to right", ["right to left", "bottom to top"]],
    ["Which line do you write on?", "on the line, not above it", ["above the line", "below the line"]],
    ["What does a good sentence start with?", "a capital letter", ["a period", "a space"]]
  ], "Think about how you read a book. Writing follows the same path.", "We write from the left to the right, on the line, and start new lines on the left.", "Example: read <b>The cat sat.</b> You start on the left with a capital T and end on the right with a period. Now do yours.");
  const sentLineSlides = [
    T("Writing a sentence", "→ →  →", "Start on the <b>left</b> and write to the <b>right</b>, one word after another."),
    T("New line", "↩️", "When you run out of room, start the next line on the <b>left</b>, just below."),
    T("Begin and end", "<b>T</b>he cat sat<b>.</b>", "Start with a capital letter. End with a mark, like a period.")
  ];

  const CIRCLE = "abdgpq".split(""), NOCIRCLE = "cemnsuvwxz".split(""), MAGICC = "adgoq".split("c");
  const MAGIC_C = ["a", "c", "d", "g", "o", "q"], NOT_C = ["b", "h", "l", "m", "n", "p", "r", "t", "u", "v", "w", "x", "y", "z", "k", "i", "j", "f"];
  const circleStickQ = () => () => {
    if (Math.random() < 0.5) {
      const ans = pick(CIRCLE), wr = shuf(NOCIRCLE).slice(0, 2);
      return { text: "Which small letter is made with a <b>circle and a stick</b>?", choices: shuf([ans, ...wr]), answer: ans,
        hints: ["Picture each letter. Does it have a round part and a straight line?", "Letters like these have a round part AND a straight line stuck to it. Letters like c, e, s and v do not.", "Example: <b>b</b> is a stick with a round belly, so it is a circle-and-stick letter. <b>s</b> is just a curvy snake. Now do yours."] };
    }
    const ans = pick(MAGIC_C), wr = shuf(NOT_C).slice(0, 2);
    return { text: "Which small letter <b>starts with a c-curve</b>, going up and around to the left?", choices: shuf([ans, ...wr]), answer: ans,
      hints: ["For these letters, you start like you are making the letter c.", "The letters that start with a c-curve are c, a, o, d, g and q. All the others start with a straight line.", "Example: <b>d</b> starts with a c-curve, then adds a stick. <b>l</b> starts with a straight line. Now do yours."] };
  };
  const circleSlides = [
    T("Circle and stick", "a &nbsp; b &nbsp; d &nbsp; g &nbsp; p &nbsp; q", "Many small letters are a <b>circle</b> and a <b>stick</b> joined together."),
    T("The c-curve", "c &nbsp; o &nbsp; a &nbsp; d &nbsp; g &nbsp; q", "Letters <b>c, o, a, d, g</b> and <b>q</b> all start by making a c-curve: up and around to the left."),
    T("The stick letters", "l &nbsp; i &nbsp; t &nbsp; b &nbsp; h", "Letters that start with a straight line are different: they go down first.")
  ];

  const FLIPS = statics([
    ["Which letter looks like <b>b</b> flipped to face the other way (a mirror)?", "d", ["p", "n", "u"]],
    ["Which letter looks like <b>p</b> flipped to face the other way (a mirror)?", "q", ["b", "n", "u"]],
    ["Which letter looks like <b>n</b> if you turn the page upside down?", "u", ["m", "h", "r"]],
    ["Which letter looks like <b>m</b> if you turn the page upside down?", "w", ["n", "u", "v"]],
    ["Which letter looks like <b>d</b> if you turn the page upside down?", "p", ["b", "q", "u"]],
    ["Which letter looks like <b>b</b> if you turn the page upside down?", "q", ["d", "p", "h"]],
    ["Which letter looks like <b>u</b> if you turn the page upside down?", "n", ["m", "h", "v"]],
    ["Which letter looks like <b>d</b> flipped to face the other way (a mirror)?", "b", ["p", "q", "h"]]
  ], "Picture the letter, then picture it turned or flipped.", "A mirror flip swaps left and right. Turning upside down swaps top and bottom.", "Example: take the letter <b>a</b>. A mirror flip swaps left and right, so the circle ends up on the other side of the stick. Picture your letter that way. Now do yours.");
  const flipSlides = [
    T("Look-alike letters", "b d p q &nbsp; n u &nbsp; m w", "Some letters are the <b>same shape</b> turned or flipped. That is why they are easy to mix up."),
    T("Mirror and upside down", "b ↔ d &nbsp; p ↔ q &nbsp; n ↕ u", "Flip a b like a mirror and it looks like a d. Turn an n upside down and it looks like a u."),
    T("Check carefully", "🔍", "Check which way the round part and the stick face before you write.")
  ];

  const FIRSTSTROKE = statics([
    ["To write <b>L</b>, what do you do first?", "go straight down from the top", ["make a line across the bottom", "make a circle"]],
    ["To write <b>T</b>, what do you do first?", "make a line across the top", ["go straight down", "make a curve"]],
    ["To write <b>E</b>, what do you do first?", "go straight down from the top", ["make a line across the middle", "make a curve"]],
    ["To write <b>H</b>, what do you do first?", "go straight down from the top", ["make a line across the middle", "make a circle"]],
    ["To write <b>O</b>, where do you start?", "at the top, going around to the left", ["at the bottom, going right", "in the middle, going straight down"]],
    ["To write <b>F</b>, what do you do first?", "go straight down from the top", ["make a line across the bottom", "make a curve"]],
    ["To write <b>Z</b>, what do you do first?", "make a line across the top", ["go straight down", "slant up"]],
    ["To write <b>l</b>, what do you do first?", "go straight down from the top line", ["make a curve", "make a dot"]],
    ["To write <b>i</b>, what do you do before the dot?", "make a short line down", ["make a circle", "make a curve"]]
  ], "Think about which part comes before all the other parts.", "Most letters start at the top. T and Z start with a line across the top. O starts at the top and curves around.", "Example: to write <b>I</b> in a word, you start at the top and go straight down. Now think about yours.");
  const firstSlides = [
    T("Where do you start?", "⬇️", "Most letters start at the <b>top</b>. Starting in the right place makes the letter come out right."),
    T("Down, then across", "L → ⬇️ ➡️", "L is a line down, then a line across. First stroke: down."),
    T("Across first", "T → ➡️ ⬇️", "T starts with a line across the top, then a line down the middle.")
  ];

  const tailWords = ["pig", "yes", "jump", "happy", "puppy", "giraffe", "gym", "jelly", "yellow", "penguin", "queen", "jet"], noTailWords = ["cat", "sun", "bed", "hat", "moon", "tree", "ball", "leaf", "door", "bus", "mom"];
  const tailWordQ = () => () => {
    const ans = pick(tailWords), wr = shuf(noTailWords).slice(0, 2);
    return { text: "Which word has a letter that goes <b>below the bottom line</b>?", choices: shuf([ans, ...wr]), answer: ans,
      hints: ["Tail letters hang down below the line: g, j, p, q and y.", "Check each word, letter by letter. Look for g, j, p, q or y.", "Example: in <b>dog</b> the g has a tail. But <b>sun</b> has no tail letters. Now check yours."] };
  };
  const tailSlides = [
    T("Tail letters", "g &nbsp; j &nbsp; p &nbsp; q &nbsp; y", "<b>g, j, p, q</b> and <b>y</b> have tails that hang below the bottom line."),
    T("In words", "p<b>i</b>g &nbsp; ju<b>m</b>p", "A word like <b>pig</b> has a tail letter. A word like <b>sun</b> does not."),
    T("Tip", "🔍", "Check every letter, not just the first.")
  ];
  const countQ = (bank, chars, nameTxt, ex) => () => {
    const w = pick(bank), n = w.split("").filter(c => chars.includes(c)).length;
    const wr = shuf([n - 1, n + 1, n + 2, n - 2].filter(x => x >= 0)).slice(0, 2);
    return { text: `How many ${nameTxt} letters are in the word <b>${w}</b>?`, choices: shuf([n, ...wr]), answer: n,
      hints: [`Say the letters of the word one at a time.`, `Count only the ${nameTxt} letters: ${chars.join(", ")}. Skip the others.`, ex] };
  };
  const TALLW = ["ball", "bed", "dog", "hello", "bell", "bake", "hand", "lamp", "doll", "duck", "cold", "fold", "flag", "shell", "leaf", "barn", "bold", "house"];
  const TAILW = ["puppy", "happy", "jump", "yes", "python", "gym", "queen", "pig", "dog", "penguin", "giraffe", "jelly", "yellow", "pony"];
  const tallCount = countQ(TALLW, TALL, "tall", "Example: in <b>bake</b>, the tall letters are b and k, so there are 2. Now count yours.");
  const tailCount = countQ(TAILW, TAIL, "tail", "Example: in <b>jelly</b>, the tail letters are j and y, so there are 2. Now count yours.");
  const talltailSlides = [
    T("Counting letters by size", "b a l l → 3 tall", "You can count how many tall letters or tail letters a word has."),
    T("Tall letters", "b &nbsp; d &nbsp; f &nbsp; h &nbsp; k &nbsp; l", "These are the tall letters. They reach the top line."),
    T("Tail letters", "g &nbsp; j &nbsp; p &nbsp; q &nbsp; y", "These are the tail letters. They go below the bottom line.")
  ];

  const mirrorHtml = (w, idx) => `<span style="display:inline-block;font-size:56px;font-family:Arial,sans-serif;letter-spacing:6px">${w.split("").map((c, i) => `<span style="display:inline-block${i === idx ? ";transform:scaleX(-1);color:#d9534f" : ""}">${c}</span>`).join("")}</span>`;
  const mirrorQ = () => {
    const bank = ["bed", "dog", "pen", "cup", "sad", "bus", "pig", "jet", "dig", "sun", "map", "fish", "bird", "duck"], flips = "bdpqgsejkrz";
    return () => {
      const w = pick(bank), cands = w.split("").map((c, i) => [c, i]).filter(([c]) => flips.includes(c)), [c, i] = pick(cands);
      const others = w.split("").filter((x, j) => j !== i && x !== c);
      return { text: "One letter in this word is <b>backwards</b> (flipped like in a mirror). Which letter is it?", visual: mirrorHtml(w, i), choices: shuf([c, ...shuf([...new Set(others)]).slice(0, 2)]), answer: c,
        hints: ["Read the word out loud. Look at each letter. Which one faces the wrong way?", "Look at the round parts and the little tails. Which letter would look right if you turned it around?", "Example: in <b>bad</b> with a backwards d, the d looks like a b. The letter facing the wrong way is the d. Now look at yours."] };
    };
  };
  const mirrorSlides = [
    T("Backwards letters", "b d p q", "Sometimes a letter gets written <b>backwards</b>, like a b that looks like a d. It happens to all of us at first."),
    T("Spot it", "🔍", "Look at each letter in the word. A backwards letter faces the wrong way, like in a mirror."),
    T("Fix it", "✅", "Check which way the stick and the round part go, then write the letter the right way.")
  ];

  const messyHtml = w => `<span style="display:inline-block;font-size:34px;font-family:Arial,sans-serif;white-space:nowrap">${w.split("").map(c => `<span style="display:inline-block;font-size:${ri(20, 44)}px;transform:translateY(${ri(-12, 12)}px) rotate(${ri(-30, 30)}deg)">${c}</span>`).join("")}</span>`;
  const neatHtml = w => `<span style="display:inline-block;font-size:34px;font-family:Arial,sans-serif;white-space:nowrap">${w}</span>`;
  const NEATW = ["happy day", "my cat", "the sun", "a big dog", "I can run", "good job", "blue sky", "red hat"];
  const neatQ = () => () => {
    const w = pick(NEATW), neatFirst = Math.random() < 0.5;
    const A = neatFirst ? neatHtml(w) : messyHtml(w), B = neatFirst ? messyHtml(w) : neatHtml(w);
    return { text: `Which writing is <b>neater</b>?<br><br><b>A</b> &nbsp; ${A}<br><br><b>B</b> &nbsp; ${B}`, choices: ["A", "B"], answer: neatFirst ? "A" : "B",
      hints: ["Look at both lines. Which one is easier to read?", "Neat writing has letters that are the same size, standing straight, and sitting on the line.", "Example: a row of letters that are all the same size, like fence posts, looks neat. Letters that tilt and change size look messy. Now compare yours."] };
  };
  const neatSlides = [
    T("What makes it neat?", "A. neat &nbsp; B. mess", "Neat writing is easy to read. The letters are about the same size and stand up straight."),
    T("On the line", "▁▁▁▁▁", "Every letter sits on the bottom line. Only tails go below it."),
    T("Be proud", "⭐", "Check your writing. If you can read it easily, so can others.")
  ];

  const nameLowercase = c => c;
  const COUNTCAP = ["Sam ran home.", "Mia and Sam ran.", "We saw Ben and Zoe.", "The dog ran.", "Max and Leo play ball.", "Today Dad and I went to the park.", "Ava is my friend.", "On Monday, Ben ran.", "Ivy and I sat.", "Zoe has a red kite."];
  const capCountQ = () => () => {
    const s = pick(COUNTCAP), n = (s.match(/[A-Z]/g) || []).length;
    const wr = shuf([n - 1, n + 1, n + 2, n - 2].filter(x => x > 0)).slice(0, 2);
    return { text: `How many capital (big) letters are in this sentence?<br><br><b>${s}</b>`, choices: shuf([n, ...wr]), answer: n,
      hints: ["A capital letter is a big letter, like A, B or C.", "Look at the first letter of each word. Which ones are big? Names and the word I are big, too.", "Example: <b>Dan and I ran.</b> has 2 capitals: the D in Dan and the word I. Now count the big letters in yours."] };
  };
  const capCountSlides = [
    T("Where capitals go", "<b>S</b>am <b>a</b>nd <b>I</b>", "A capital letter starts a sentence. Names get capitals. The word <b>I</b> is always a capital."),
    T("Count them", "Sam and I ran. → S, I = 2", "Look at each word. If it starts with a big letter, count it."),
    T("Tip", "☝️", "Use your finger to touch each capital as you count.")
  ];

  const SPEC = statics([
    ["A good space between words is about as wide as ___.", "the letter o", ["a whole page", "nothing at all"], null, "Think of a small, round letter.", "Example: if you put a small o between two words, it should fit just right. Now do yours."],
    ["Words that run together with no space are ___.", "hard to read", ["easy to read", "pretty"], null, "Imagine reading Thecatsat. all in one lump.", "Example: <b>ilikecats</b> is harder to read than <b>I like cats</b>."],
    ["Too much space between words makes the sentence ___.", "look broken apart", ["look perfect", "look like one word"], null, "Think about words that float far apart.", "Example: <b>I&emsp;&emsp;&emsp;like&emsp;&emsp;&emsp;cats</b> is spread out too far."],
    ["Space between letters in a word should be ___.", "small and even", ["very big", "different each time"], null, "Letters in a word belong together.", "Example: the letters in <b>cat</b> are close but do not touch."],
    ["What can help you measure a space between words?", "your finger", ["your foot", "your nose"], null, "You can use a part of your hand.", "Example: put a finger down after a word, then start the next one after it."],
    ["Where does a space go?", "between words", ["inside words", "on top of letters"], null, "Spaces separate words from each other.", "Example: <b>the cat</b> has a space between the and cat, not inside them."]
  ], "Think about how easy a line is to read.", "Not too close, not too far. A finger space or about the width of the letter o.", "Example: the line <b>I see a dog</b> has the same small space between every word. Now do yours.");
  const specSlides = [
    T("Spacing facts", "I▢see▢a▢dog", "A good space between words is about the size of the small letter <b>o</b>, or one finger."),
    T("Even spaces", "I &nbsp; see &nbsp; a", "Make every space about the same size, so your writing looks smooth."),
    T("Letters too", "c a t ❌ &nbsp; cat ✅", "Letters inside a word are close together, but not touching.")
  ];

  const COMFORT = statics([
    ["What helps your hand feel good while you write?", "a relaxed grip", ["a tight squeeze", "a hard push on the paper"], null, "Think of a hand that is relaxed, not tense.", "Example: if you press very hard, your hand tires out fast."],
    ["What should you do if your hand feels tired?", "take a short break", ["write faster", "press harder"], null, "Rest helps your hand.", "Example: shake your hand out like you are drying it, then start again."],
    ["How hard should you press your pencil?", "just enough to make a clear line", ["as hard as you can", "so light you cannot see it"], null, "Not too hard, not too light.", "Example: a clear gray line is just right."],
    ["Where should your wrist be?", "resting lightly on the desk", ["held up in the air", "bent back hard"], null, "A resting wrist gets less tired.", "Example: leaning on a table is easier than holding your arm in the air."],
    ["What can you do to warm up your hand before writing?", "open and close your fingers", ["bang the desk", "hold your breath"], null, "Easy stretches get your hand ready.", "Example: wiggle your fingers like you are playing a piano."],
    ["If your pencil is dull, what can you do?", "sharpen it", ["chew it", "write harder"], null, "A dull pencil makes thick, messy lines.", "Example: a sharp pencil makes thin, neat lines."]
  ], "Think about what is comfortable for your hand.", "Relaxed fingers and gentle pressure make writing easier and neater.", "Example: hold your pencil lightly and make clear lines without pressing hard. Now do yours.");
  const comfortSlides = [
    T("Comfy hands", "✋ 😊", "Writing should not hurt. Hold your pencil gently and press just enough to see your line."),
    T("Take breaks", "⏸️", "If your hand feels tired, stop, shake it out, and rest."),
    T("Sharp pencils", "✏️", "A sharp pencil makes neat lines without needing a hard push.")
  ];

  // ---------- cursive & shapes ----------
  const shapeQ = () => {
    const names = Object.keys(SHAPES);
    return () => {
      const n = pick(names), wr = rest(names, n, 2);
      const exOptions = { "straight line": "A straight line goes in one direction without bending.", "slanted line": "A slanted line leans to one side.", "curve": "A curve bends smoothly, like a hill.", "loop": "A loop makes a little circle that crosses itself.", "wave": "A wave goes up and down smoothly, over and over.", "circle": "A circle is round and closed.", "zigzag": "A zigzag has sharp corners, up and down." };
      const exName = pick(names.filter(x => x !== n));
      return { text: "What is the name of this stroke shape?", visual: SHAPES[n], choices: shuf([n, ...wr]), answer: n,
        hints: ["Follow the shape with your finger. Does it bend smoothly or have sharp corners?", "A loop crosses itself. A wave is smooth and goes up and down. A zigzag has sharp points. A curve is just one smooth bend.", `Example: ${exOptions[exName]} That is a <b>${exName}</b>. Now look at yours.`] };
    };
  };
  const shapeSlides = [
    T("Stroke shapes", "straight · slanted · curve", "Letters are made from a few simple shapes: <b>straight lines</b>, <b>slanted lines</b>, <b>curves</b>, <b>loops</b> and <b>waves</b>."),
    T("Loops and waves", "loop · wave · zigzag", "A <b>loop</b> makes a little circle that crosses itself. A <b>wave</b> goes smoothly up and down. A <b>zigzag</b> has sharp corners."),
    T("Cursive uses them", "✍️", "In cursive writing, these shapes join together without lifting your pencil much.")
  ];
  const LOOPUP = "bhkl".split(""), LOOPDOWN = "gjy".split(""), NOLOOP = "acmnorsuvwx".split("");
  const loopQ = () => () => {
    if (Math.random() < 0.5) {
      const ans = pick(LOOPUP), wr = shuf(NOLOOP).slice(0, 2);
      return { text: "In <b>cursive</b>, which small letter is made with a <b>loop at the top</b>, reaching up to the top line?", choices: shuf([ans, ...wr]), answer: ans,
        hints: ["In cursive, tall letters like these have a loop at the top.", "Four tall cursive letters have a loop at the top: b, h, k and l. Short letters do not reach the top.", "Example: the cursive <b>l</b> goes up in a loop and comes back down. The cursive <b>o</b> stays small and round. Now check yours."] };
    }
    const ans = pick(LOOPDOWN), wr = shuf(NOLOOP).slice(0, 2);
    return { text: "In <b>cursive</b>, which small letter has a <b>loop going below the line</b>?", choices: shuf([ans, ...wr]), answer: ans,
      hints: ["In cursive, tail letters have a loop that hangs down below the line.", "Three cursive letters swing a loop below the line: g, j and y.", "Example: the cursive <b>y</b> goes down below the line and loops back up. The cursive <b>o</b> never goes below. Now check yours."] };
  };
  const loopSlides = [
    T("Loops in cursive", "ℓ &nbsp; b &nbsp; h &nbsp; k", "In cursive, the tall letters <b>b, h, k</b> and <b>l</b> have a <b>loop</b> at the top."),
    T("Loops below the line", "g &nbsp; j &nbsp; y", "In cursive, the tail letters <b>g, j</b> and <b>y</b> have a <b>loop</b> that hangs below the line."),
    T("Small letters", "a c o s", "Small round letters like a, c, o and s stay small, with no big loop.")
  ];

  const CURSIVE1 = statics([
    ["Cursive writing is when the letters are ___.", "joined together", ["separate with big gaps", "only capital letters"]],
    ["Which kind of writing do you use when you write letters one at a time, not joined?", "print", ["cursive", "wavy"]],
    ["Which kind of writing is joined together with connecting strokes?", "cursive", ["print", "capital"]],
    ["In cursive, do you lift your pencil after every letter?", "no, letters join so you lift less", ["yes, after every single letter", "you do not use a pencil"]],
    ["Cursive letters usually lean a little ___.", "forward (slanted)", ["backward only", "upside down"]],
    ["Print writing letters are usually ___.", "separate from each other", ["all connected in one stroke", "all slanted"]],
    ["Another name for joined handwriting is ___.", "cursive", ["print", "scribble"]],
    ["Why do people learn cursive?", "it is a joined, flowing way to write", ["it uses no paper", "it is only for numbers"]]
  ], "Think about the difference between letters that stand alone and letters that connect.", "<b>Print</b> letters are separate. <b>Cursive</b> letters flow and join together.", "Example: a word in print has gaps between its letters. A word in cursive looks like one flowing line. Now do yours.");
  const cursiveSlides = [
    T("What is cursive?", "✍️ ~~~", "<b>Cursive</b> is joined-up handwriting. The letters connect with small strokes."),
    T("Print vs cursive", "cat &nbsp; vs &nbsp; <i>cat</i> (joined)", "<b>Print</b> letters are separate. <b>Cursive</b> letters flow into each other."),
    T("Shapes", "curves · loops · slants", "Cursive is made of curves, loops and slanted lines. It looks like it is dancing across the page.")
  ];
  const PRINTCUR = statics([
    ["Which writing has letters that are <b>not joined</b>?", "print", ["cursive", "both"]],
    ["Which writing has letters that are <b>joined</b> together?", "cursive", ["print", "neither"]],
    ["Which writing do most books for young kids use?", "print", ["cursive", "wavy lines"]],
    ["Which kind of writing usually needs fewer pencil lifts?", "cursive", ["print", "drawing"]],
    ["Which writing do you learn first?", "print", ["cursive", "neither"]],
    ["In which kind of writing do letters lean and flow?", "cursive", ["print", "none of them"]]
  ], "Think about letters standing alone or joining their neighbors.", "<b>Print</b> letters stand alone. <b>Cursive</b> letters join with connecting strokes.", "Example: print is like beads on a table, cursive is like beads on a string. Now do yours.");
  const CURS2 = statics([
    ["Where does a cursive word begin?", "on the left, on the line", ["on the right", "above the page"]],
    ["What connects cursive letters?", "small connecting strokes", ["glue", "big gaps"]],
    ["How often do you lift your pencil inside one cursive word?", "not very often", ["after every letter", "you cannot lift it"]],
    ["Cursive letters sit on which line?", "the bottom line", ["the top line", "no line"]],
    ["True or false: cursive uses curves and loops.", "true", ["false"]],
    ["True or false: cursive letters are separate with big spaces.", "false", ["true"]],
    ["Cursive is built from which kinds of strokes?", "curves, loops and slants", ["only dots", "only squares"]],
    ["A cursive word looks like ___.", "one flowing line", ["lots of separate dots", "a pile of boxes"]]
  ], "Think about how cursive letters flow into one another.", "Cursive writing starts at the left on the line and flows to the right with connecting strokes.", "Example: in cursive, <b>cat</b> is written as one flowing word with joined letters. Now do yours.");

  const DIRQ = statics([
    ["To make the straight line of <b>l</b>, which way does your pencil go?", "down", ["up only", "sideways"]],
    ["To make the cross on a <b>t</b>, which way does your pencil go?", "left to right", ["right to left", "down"]],
    ["To make the circle of an <b>o</b>, where do you start?", "at the top and go around to the left", ["at the top and go right", "at the bottom"]],
    ["To make the top line of a <b>T</b>, where do you start?", "on the left end", ["on the right end", "in the middle"]],
    ["To write <b>E</b>, which line do you make first?", "the straight line down", ["the middle line", "the bottom line"]],
    ["To write the number <b>1</b>, which way does your pencil go?", "down", ["sideways", "in a circle"]],
    ["To write <b>V</b>, where does the first slanting line start?", "at the top left", ["at the bottom", "at the top right"]],
    ["When you write along a line, which way do you go?", "left to right", ["right to left", "bottom to top"]]
  ], "Trace the letter in the air with your finger and watch which way you go.", "Remember: start at the top, go down for straight lines, and go across from left to right.", "Example: to write <b>I</b>, you start at the top and pull down. Lines across, like on the letter Z, go from left to right. Now trace yours.");
  const LINECOUNT = statics([
    ["How many straight lines does <b>H</b> have?", "3", ["2", "4"]],
    ["How many lines does <b>A</b> have?", "3", ["2", "4"]],
    ["How many lines does <b>X</b> have?", "2", ["1", "3"]],
    ["How many straight lines does <b>N</b> have?", "3", ["2", "4"]],
    ["How many straight lines does <b>E</b> have?", "4", ["3", "5"]],
    ["How many lines does <b>T</b> have?", "2", ["1", "3"]],
    ["How many straight lines does <b>K</b> have?", "3", ["2", "4"]],
    ["How many lines does <b>Z</b> have?", "3", ["2", "4"]],
    ["How many lines does <b>F</b> have?", "3", ["2", "4"]]
  ], "Trace the letter in the air with your finger. Count each new line you make.", "Each time you lift your pencil or change direction in a straight way, that is a new line. Go slowly and count.", "Example: <b>L</b> has 2 lines: one down and one across. Now trace yours and count.");
  const dirSlides = [
    T("Stroke directions", "⬇️ ➡️", "Most straight lines go <b>down</b>. Lines across go from <b>left to right</b>."),
    T("Circles", "o → ↺", "To make an o, start at the top and go around to the <b>left</b>."),
    T("Counting lines", "H = 3, A = 3, X = 2", "You can count the lines in a letter: H has 3, A has 3, X has 2, E has 4.")
  ];

  const digitsQ = keys => descQ(STR_DIG, keys, "number");
  const digitSlides = [
    T("Writing numbers", "1 2 3 4 5", "Numbers are made of lines and curves, like letters. Each number has its own steps."),
    T("Start at the top", "⬇️", "Most numbers start at the top. Follow the steps in order."),
    T("Trace in the air", "☝️", "Use your finger to trace the number while you read. The shape tells you which number it is.")
  ];

  // ---------- lessons ----------
  const AL = "abcdefghijklm".split(""), NZ = "nopqrstuvwxyz".split("");
  const DIFFER = "abdeghnqrf".split("");
  const A = [
    mkL("Big and small letters A-M", pairQ(AL, "either", false), pairSlides),
    mkL("Big and small letters N-Z", pairQ(NZ, "either", false), pairSlides),
    mkL("Straight or curvy?", curvyQ(), curvySlides),
    mkL("Capital strokes 1", descQ(STR_CAP, ["L", "T", "E", "H", "O", "C"], "capital letter"), strokeSlides("Capital letter strokes", "L T E H")),
    mkL("Capital strokes 2", descQ(STR_CAP, ["A", "V", "X", "Z", "F", "S", "M", "N"], "capital letter"), strokeSlides("Capital letter strokes", "A V X Z")),
    mkL("Small letter strokes 1", descQ(STR_LOW, ["o", "l", "i", "t", "c", "a"], "small letter"), strokeSlides("Small letter strokes", "o l i t")),
    mkL("Small letter strokes 2", descQ(STR_LOW, ["b", "d", "p", "q", "h", "n", "u"], "small letter"), strokeSlides("Small letter strokes", "b d p q")),
    mkL("Tall, short or tail?", tstQ1, tstSlides),
    mkL("What size is the bar?", barsQ("bdhklaceosugpy".split("")), barsSlides),
    mkL("b, d, p and q", BDPQ, bdpqSlides),
    mkL("Space between words", spaceQ(), spaceSlides),
    mkL("Holding a pencil", GRIP, gripSlides),
    mkL("Sitting to write", POSTURE, postureSlides),
    mkL("Neat writing habits", HABIT1, habitSlides),
    mkL("Number strokes", digitsQ(["0", "1", "2", "3", "4", "5"]), digitSlides),
    mkL("Top, middle and bottom lines", LINESQ, linesSlides),
    mkL("Same shape, new size", sameQ(), SMALLSLIDES),
    mkL("Dots and crosses", DOTS, dotsSlides)
  ];
  const B = [
    mkL("Big and small: tricky pairs", pairQ(DIFFER, "low", true), pairSlides),
    mkL("Small to big letters", pairQ(ABC, "up", true), pairSlides),
    mkL("Capital strokes 3", descQ(STR_CAP, ["B", "D", "P", "R", "J", "U", "W", "Y", "G", "K", "Q"], "capital letter"), strokeSlides("Capital letter strokes", "B D P R")),
    mkL("Small letter strokes 3", descQ(STR_LOW, ["e", "f", "g", "j", "k", "m", "r", "s", "v", "w", "x", "y", "z"], "small letter"), strokeSlides("Small letter strokes", "e f g j")),
    mkL("What do you write first?", FIRSTSTROKE, firstSlides),
    mkL("Tall, short or tail? 2", tstQ2, tstSlides),
    mkL("Words with tails", tailWordQ(), tailSlides),
    mkL("Count the tall letters", tallCount, talltailSlides),
    mkL("Number strokes 2", digitsQ(["6", "7", "8", "9", "0", "1"]), digitSlides),
    mkL("Spacing letters and words", spaceMix(), spaceSlides),
    mkL("Word shapes", wordShapeQ(PATW2), wordShapeSlides),
    mkL("Pencil grip and tools", GRIP2, gripSlides),
    mkL("Sitting and paper", POSTURE2, postureSlides),
    mkL("Neat writing checklist", HABIT2, habitSlides),
    mkL("Writing names", capNameQ(), capNameSlides),
    mkL("Writing sentences on lines", SENTLINES, sentLineSlides),
    mkL("Circles and sticks", circleStickQ(), circleSlides),
    mkL("Letters that flip", FLIPS, flipSlides)
  ];
  const C = [
    mkL("Capital strokes review", descQ(STR_CAP, Object.keys(STR_CAP), "capital letter"), strokeSlides("Capital letter strokes", "A B C D")),
    mkL("Small strokes review", descQ(STR_LOW, Object.keys(STR_LOW), "small letter"), strokeSlides("Small letter strokes", "a b c d")),
    mkL("What is cursive?", CURSIVE1, cursiveSlides),
    mkL("Stroke shapes", shapeQ(), shapeSlides),
    mkL("Cursive loops", loopQ(), loopSlides),
    mkL("Print or cursive?", PRINTCUR, cursiveSlides),
    mkL("Count the tail letters", tailCount, talltailSlides),
    mkL("Word shapes 2", wordShapeQ(PATW3), wordShapeSlides),
    mkL("Spacing facts", SPEC, specSlides),
    mkL("Comfortable writing", COMFORT, comfortSlides),
    mkL("Count the capitals", capCountQ(), capCountSlides),
    mkL("All the numbers", digitsQ(Object.keys(STR_DIG)), digitSlides),
    mkL("Which is neater?", neatQ(), neatSlides),
    mkL("Big and small letter pairs", pairQ(ABC, "either", true), pairSlides),
    mkL("Count the lines in a letter", LINECOUNT, dirSlides),
    mkL("Which way to go?", DIRQ, dirSlides),
    mkL("Spot the backwards letter", mirrorQ(), mirrorSlides),
    mkL("Cursive basics", CURS2, cursiveSlides)
  ];

  return {
    1: A.concat([MIX("Mixed practice", A[0], A[3], A[7], A[9]), MIX("Level 1 Challenge", A[2], A[5], A[10], A[11], A[14], A[15])]),
    2: B.concat([MIX("Mixed practice", B[2], B[5], B[9], B[14]), MIX("Level 2 Challenge", B[3], B[6], B[10], B[15], B[16], B[17])]),
    3: C.concat([MIX("Mixed practice", C[2], C[4], C[8], C[10]), MIX("Level 3 Challenge", C[3], C[6], C[11], C[12], C[16], C[17])])
  };
})();
