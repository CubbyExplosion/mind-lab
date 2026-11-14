// Mind Lab Logic & Puzzles. Levels 1-3, 20 lessons each.
// Needs math.js loaded first (uses ri, pick, shuf).
const LOGIC_LEVELS = (() => {
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const mix = (...ms) => () => pick(ms)();
  const MIXS = topics => [
    S("Review time!", "🔄", "This lesson mixes puzzles you already know. Take your time and think about each one."),
    S("Remember", "🧠", topics),
    S("Tip", "💡", "Read every clue. Cross out answers that cannot be right.")
  ];
  const NM = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
  const sameP = (a, b) => a[0] === b[0] && a[1] === b[1];
  const lab = x => `${x[0]} ${x[1]}`;
  const big = (t, s = 1.8) => `<span style="font-size:${s}em">${t}</span>`;
  const code = lines => `<div style="text-align:left;display:inline-block;font-family:monospace;background:#eef2ff;color:#1a2a55;padding:8px 14px;border-radius:10px;line-height:1.5">${lines.join("<br>")}</div>`;
  const G = (n, f) => `<div style="line-height:1.3;font-size:1.6em">` + Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => f(r, c)).join("")).join("<br>") + `</div>`;

  // ---------- generic builders ----------
  const facts = (items, nudge, example) => () => {
    const [q, r, w, c, v] = pick(items);
    return { text: q, visual: v, choices: shuf([r, ...w]), answer: r, hints: [nudge, c, example] };
  };
  const tf = (items, nudge, example) => () => {
    const [q, a, c, v] = pick(items);
    return { text: `True or false? ${q}`, visual: v, choices: ["true", "false"], answer: a ? "true" : "false", hints: [nudge, c, example] };
  };

  // ---------- same / different / odd one out ----------
  const POOL = [["🐶", "dog"], ["🐱", "cat"], ["🐭", "mouse"], ["🐰", "rabbit"], ["🍎", "apple"], ["🍌", "banana"], ["🚗", "car"], ["⭐", "star"], ["🔴", "red circle"], ["🔵", "blue circle"]];
  const sameDiff = () => {
    const a = pick(POOL), same = Math.random() < 0.5, b = same ? a : pick(POOL.filter(x => x !== a));
    return {
      text: "Look at the two pictures. Are they the same or different?", visual: big(`${a[0]} &nbsp; ${b[0]}`, 2.2), choices: ["same", "different"], answer: same ? "same" : "different",
      hints: ["Look at the first picture, then the second one.", "Are they exactly the same picture? Or can you see two different things?", "Example: 🐶 🐶 are the same. 🐶 🐱 are different. Now do yours."]
    };
  };
  const ORD = ["first", "second", "third", "fourth"];
  const oddEmoji = () => {
    const a = pick(POOL), b = pick(POOL.filter(x => x !== a)), pos = ri(0, 3);
    const row = [0, 1, 2, 3].map(i => i === pos ? b[0] : a[0]);
    return {
      text: "One picture is different. Which one is it?", visual: big(row.join(" &nbsp; ")), choices: ORD.slice(), answer: ORD[pos],
      hints: ["Look at all four pictures. Three are the same.", "Find the picture that does not match the others. Count from the left: first, second, third, fourth.", "Example: 🍎 🍎 🍌 🍎 → the third one is different. Now do yours."]
    };
  };
  const CAT = {
    animals: ["🐶 dog", "🐱 cat", "🐴 horse", "🐦 bird", "🐟 fish", "🐮 cow"],
    fruits: ["🍎 apple", "🍌 banana", "🍇 grapes", "🍓 strawberry", "🍊 orange", "🍉 watermelon"],
    vehicles: ["🚗 car", "🚌 bus", "🚲 bike", "✈️ airplane", "🚂 train", "⛵ boat"],
    clothes: ["👕 shirt", "👟 shoe", "🧦 sock", "🧥 coat", "🎩 hat", "👖 pants"],
    "school things": ["✏️ pencil", "📖 book", "🎒 backpack", "✂️ scissors", "📏 ruler", "🖍️ crayon"]
  };
  const MOVE = {
    "things that fly": ["🐦 bird", "🦋 butterfly", "🐝 bee", "🦉 owl", "🦅 eagle"],
    "things that swim": ["🐟 fish", "🐬 dolphin", "🐙 octopus", "🐳 whale", "🐠 tropical fish"],
    "things that walk": ["🐶 dog", "🐱 cat", "🐴 horse", "🐘 elephant", "🐮 cow"]
  };
  const oddKind = bank => () => {
    const ks = Object.keys(bank), a = pick(ks), b = pick(ks.filter(x => x !== a));
    const three = shuf(bank[a]).slice(0, 3), one = pick(bank[b]);
    return {
      text: "Which one does <b>not</b> belong with the others?", visual: big(three.concat(one).map(x => x.split(" ")[0]).sort(() => Math.random() - 0.5).join(" &nbsp; ")),
      choices: shuf(three.concat(one)), answer: one,
      hints: ["Say the name of each one. How are three of them alike?", "Three of them belong to the same group. Find the group, then find the one that is left out.", "Example: 🍎 🍌 🍇 🚗 → the car is not a fruit, so the car does not belong. Now do yours."]
    };
  };
  const classify = keys => () => {
    const k = pick(keys), it = pick(CAT[k]);
    return {
      text: `Which group does <b>${it}</b> go in?`, visual: big(it.split(" ")[0], 2.2), choices: shuf([k, ...shuf(keys.filter(x => x !== k)).slice(0, 2)]), answer: k,
      hints: ["Say what the thing is. What kind of thing is it?", "Think: is it something you eat, wear, ride, use at school, or an animal? Pick the group that fits.", "Example: a 🛴 scooter goes with the vehicles, because you ride it. Now do yours."]
    };
  };

  // ---------- counting and comparing ----------
  const CC = [["🔴", "red"], ["🔵", "blue"], ["🟢", "green"]];
  const countColor = (lo, hi) => () => {
    for (;;) {
      const n = ri(lo, hi), items = Array.from({ length: n }, () => pick(CC)), c = pick(CC), cnt = items.filter(x => x === c).length;
      if (cnt < 1) continue;
      return {
        text: `How many ${c[1]} circles (${c[0]}) are there?`, visual: big(items.map(x => x[0]).join(" ")), answer: cnt,
        hints: ["Look only at the color in the question. Ignore the others.", "Touch each one of that color and count out loud.", "Example: 🔴 🔵 🔴 🟢 has two red circles. Now count yours."]
      };
    }
  };
  const SH = [["🔴", "red", "circle"], ["🔵", "blue", "circle"], ["🟢", "green", "circle"], ["🟥", "red", "square"], ["🟦", "blue", "square"], ["🟩", "green", "square"]];
  const sortTwo = (lo, hi) => () => {
    for (;;) {
      const items = Array.from({ length: ri(lo, hi) }, () => pick(SH));
      const byColor = Math.random() < 0.5, w = byColor ? pick(["red", "blue", "green"]) : pick(["circle", "square"]);
      const cnt = items.filter(x => byColor ? x[1] === w : x[2] === w).length;
      if (cnt < 1) continue;
      return {
        text: byColor ? `How many <b>${w}</b> shapes are there (circles AND squares)?` : `How many <b>${w}s</b> are there (any color)?`, visual: big(items.map(x => x[0]).join(" ")), answer: cnt,
        hints: [byColor ? "Look at the color only. Squares and circles both count." : "Look at the shape only. Every color counts.", "Touch each shape that matches and count out loud.", "Example: 🔴 🟥 🔵 → there are 2 red shapes (a circle and a square) and 2 circles. Now do yours."]
      };
    }
  };
  const SZ = ["🐜 ant", "🐭 mouse", "🐱 cat", "🐶 dog", "🐴 horse", "🐘 elephant"];
  const biggerSmaller = () => {
    const i = ri(0, 5); let j = ri(0, 5); while (j === i) j = ri(0, 5);
    const bigger = Math.random() < 0.5, a = SZ[i], b = SZ[j], right = bigger ? (i > j ? a : b) : (i > j ? b : a);
    return {
      text: `Which one is ${bigger ? "<b>bigger</b>" : "<b>smaller</b>"}?`, visual: big(`${a.split(" ")[0]} &nbsp; ${b.split(" ")[0]}`, 2.2), choices: shuf([a, b]), answer: right,
      hints: ["Picture both animals standing next to each other.", `Which one would be ${bigger ? "taller and heavier" : "tiny next to the other"}?`, "Example: a 🐘 elephant is bigger than a 🐭 mouse. Now do yours."]
    };
  };
  const moreFewer = (hi) => () => {
    const e = pick(["🍎", "⭐", "🐟", "🎈"]), a = ri(1, hi), b = Math.random() < 0.25 ? a : ri(1, hi), more = Math.random() < 0.5;
    const right = a === b ? "same amount" : (more === (a > b)) ? "the left group" : "the right group";
    return {
      text: `Which group has ${more ? "<b>more</b>" : "<b>fewer</b>"}?`, visual: `<div style="font-size:1.5em">${e.repeat(a)}<br>— or —<br>${e.repeat(b)}</div><small>(top = left group, bottom = right group)</small>`,
      choices: ["the left group", "the right group", "same amount"], answer: right,
      hints: ["Count each group. Write down both numbers in your head.", more ? "The group with the bigger number has more." : "The group with the smaller number has fewer.", "Example: 3 apples and 5 apples. 5 is more than 3, so the 5 group has more. Now do yours."]
    };
  };
  const beforeAfter = (lo, hi) => () => {
    const n = ri(lo + 1, hi - 1), t = pick(["before", "after", "between"]);
    if (t === "before") return { text: `What number comes <b>just before</b> ${n}?`, answer: n - 1, hints: ["Count up from 1 and stop before your number.", "Just before means one less.", "Example: just before 8 is 7. Now do yours."] };
    if (t === "after") return { text: `What number comes <b>just after</b> ${n}?`, answer: n + 1, hints: ["Count up and say the next number.", "Just after means one more.", "Example: just after 8 is 9. Now do yours."] };
    return { text: `What number is <b>between</b> ${n - 1} and ${n + 1}?`, answer: n, hints: ["Count up slowly: ... " + (n - 1) + ", ?, " + (n + 1) + ".", "The number in the middle is one more than the first number.", "Example: between 4 and 6 is 5. Now do yours."] };
  };
  const nextNum = (steps, len, missing) => () => {
    const d = pick(steps), ad = Math.abs(d);
    const s = d > 0 ? ri(1, 8) : ri(ad * (len + 1) + 1, ad * (len + 1) + 6);
    const seq = Array.from({ length: len + 1 }, (_, i) => s + i * d);
    const ed = pick([2, 3, 5].filter(x => x !== ad)), exSeq = [1, 1 + ed, 1 + 2 * ed], exNext = 1 + 3 * ed;
    const hints = ["Look at how the numbers change from one to the next.", "Is it going up or down? By how much each time? Use that to find the missing number.", `Example: ${exSeq.join(", ")} goes up by ${ed} each time, so next is ${exNext}. Now do yours.`];
    if (!missing) return { text: "What number comes next?", visual: big(seq.slice(0, len).join(", ") + ", ?", 1.5), answer: seq[len], hints };
    const hole = ri(1, len - 1);
    return { text: "What number is missing?", visual: big(seq.map((x, i) => i === hole ? "?" : x).join(", "), 1.5), answer: seq[hole], hints: [hints[0], hints[1], `Example: 2, ?, 6, 8 goes up by 2 each time, so the missing number is 4. Now do yours.`] };
  };
  const wordProb = (hi, mode) => () => {
    const [e, w] = pick([["🍎", "apples"], ["⭐", "stars"], ["🍪", "cookies"], ["🎈", "balloons"], ["🐟", "fish"], ["🚗", "toy cars"]]), nm = pick(NM);
    if (mode === "add") {
      const a = ri(1, hi - 1), b = ri(1, hi - a);
      return { text: `${nm} has ${a} ${nounFor(a, w)}. ${nm} gets ${b} more. How many ${w} does ${nm} have now?`, visual: big(e.repeat(a) + " + " + e.repeat(b), 1.3), answer: a + b, hints: ["Start with how many there are at first.", "Getting more means you add. Count on from the first number.", "Example: 2 stars and 3 more stars is 2 + 3 = 5 stars. Now do yours."] };
    }
    if (mode === "mixed") {
      if (Math.random() < 0.5) { const a = ri(1, hi - 1), b = ri(1, hi - a); return { text: `${nm} has ${a} ${nounFor(a, w)}. ${nm} gets ${b} more. How many now?`, answer: a + b, hints: ["Start with how many there are at first.", "Getting more means you add.", "Example: 4 + 2 = 6. Now do yours."] }; }
      const a = ri(3, hi), b = ri(1, a - 1);
      return { text: `${nm} has ${a} ${w}. ${nm} gives away ${b}. How many are left?`, answer: a - b, hints: ["Start with how many there are at first.", "Giving away means you take some away. Count back.", "Example: 6 - 2 = 4. Now do yours."] };
    }
    const a = ri(3, hi - 4), b = ri(2, 4), c = ri(1, a + b - 1);
    return { text: `${nm} has ${a} ${w}. Then ${nm} gets ${b} more. Then ${nm} gives away ${c}. How many are left?`, answer: a + b - c, hints: ["Do the story one part at a time, in order.", "First add the ones that came. Then take away the ones that went.", "Example: 5, then 2 more is 7, then give away 3 leaves 4. Now do yours."] };
  };
  const makeTen = () => {
    const t = pick([5, 10]), a = ri(1, t - 1);
    return { text: `${a} + ? = ${t}. What number goes in the ?`, visual: big("⭐".repeat(a) + " + ❓", 1.4), answer: t - a, hints: ["How many more do you need to get to " + t + "?", "Count up from " + a + " until you reach " + t + ". How many steps did you take?", "Example: 3 + ? = 5. Count up from 3: 4, 5. That is 2 steps. Now do yours."] };
  };
  const missingEq = () => {
    const t = ri(0, 2), a = ri(2, 9), b = ri(2, 9), c = a + b;
    if (t === 0) return { text: `? + ${a} = ${c}. What number goes in the ?`, answer: b, hints: ["Which number plus " + a + " makes " + c + "?", "Start at " + a + " and count up to " + c + ". How many steps?", "Example: ? + 3 = 8. Count up from 3 to 8: that is 5 steps. Now do yours."] };
    if (t === 1) return { text: `${a} + ? = ${c}. What number goes in the ?`, answer: b, hints: ["Which number do you add to " + a + " to get " + c + "?", "Count up from " + a + " to " + c + ". How many steps?", "Example: 4 + ? = 9. Count up from 4 to 9: that is 5 steps. Now do yours."] };
    return { text: `${c} - ? = ${a}. What number goes in the ?`, answer: b, hints: ["What do you take away from " + c + " to get " + a + "?", "Count down from " + c + " until you reach " + a + ". How many steps?", "Example: 9 - ? = 4. Count down from 9 to 4: that is 5 steps. Now do yours."] };
  };

  // ---------- patterns ----------
  const PI = [["🔴", "red"], ["🔵", "blue"], ["🟢", "green"], ["🟡", "yellow"], ["🟣", "purple"], ["🟠", "orange"], ["⭐", "star"], ["🍎", "apple"], ["🍌", "banana"], ["🐶", "dog"], ["🐱", "cat"], ["🌞", "sun"], ["🌙", "moon"], ["⚽", "ball"]];
  const patternNext = units => () => {
    const u = pick(units), set = shuf(PI), m = {};
    [...new Set(u)].forEach((ch, i) => m[ch] = set[i]);
    const len = u.length * 2 + ri(0, u.length - 1);
    const shown = Array.from({ length: len }, (_, i) => m[u[i % u.length]]), nx = m[u[len % u.length]];
    return {
      text: "What comes next in the pattern?", visual: big(shown.map(x => x[0]).join(" ") + " &nbsp;?", 1.6),
      choices: shuf([lab(nx), ...shuf(set.filter(x => x !== nx)).slice(0, 2).map(lab)]), answer: lab(nx),
      hints: ["Look for the part that repeats over and over.", `The repeating part has ${u.length} things. Say them out loud, then keep going to see what is next.`, "Example: 🔴 🔵 🔴 🔵 🔴 → next is 🔵, because the pattern goes red, blue, red, blue. Now do yours."]
    };
  };
  const patternPos = units => () => {
    const u = pick(units), set = shuf(PI), m = {};
    [...new Set(u)].forEach((ch, i) => m[ch] = set[i]);
    const shownLen = u.length * 2, pos = ri(shownLen + 1, shownLen + 6);
    const shown = Array.from({ length: shownLen }, (_, i) => m[u[i % u.length]]), ans = m[u[(pos - 1) % u.length]];
    return {
      text: `The pattern keeps going. What is the <b>${pos}th</b> picture?`, visual: big(shown.map(x => x[0]).join(" ") + " ...", 1.6),
      choices: shuf([lab(ans), ...[...Object.values(m).filter(x => x !== ans), ...set.filter(x => !Object.values(m).includes(x))].slice(0, 2).map(lab)]),
      answer: lab(ans),
      hints: ["Keep the pattern going in your head, or draw more of it.", `The pattern starts over every ${u.length} pictures. Count by ${u.length}s to see where it lines up.`, "Example: in 🔴 🔵 🔴 🔵 the 5th picture is 🔴, because odd places are red. Now do yours."]
    };
  };
  const growing = (d1, d2) => () => {
    const d = ri(d1, d2), s = ri(1, 3), e = pick(["⭐", "🔵", "🍎", "🐟"]), sizes = [0, 1, 2, 3].map(i => s + i * d);
    return {
      text: "These groups grow. How many will be in the next group?", visual: `<div style="font-size:1.2em;line-height:1.6">${sizes.map(n => e.repeat(n)).join("<br>")}</div>`, answer: s + 4 * d,
      hints: ["Count each group. How many more is each group than the one before?", "The jump is always the same. Add that jump to the last group.", "Example: groups of 1, 3, 5 grow by 2 each time, so the next group has 7. Now do yours."]
    };
  };
  const patternRule = () => {
    const kinds = [{ n: "add", ds: [2, 3, 4, 5, 10] }, { n: "take away", ds: [2, 3, 4, 5] }];
    const k = pick(kinds), d = pick(k.ds), up = k.n === "add", s = up ? ri(1, 6) : ri(d * 4 + 1, d * 4 + 6);
    const seq = [0, 1, 2, 3].map(i => s + (up ? i : -i) * d);
    const right = `${k.n} ${d}`;
    const wr = shuf([2, 3, 4, 5, 10].filter(x => x !== d)).slice(0, 2).map(x => `${k.n} ${x}`);
    const swap = `${up ? "take away" : "add"} ${d}`;
    const ch = Math.random() < 0.5 ? [right, ...wr] : [right, wr[0], swap];
    return {
      text: "What is the rule of this number pattern?", visual: big(seq.join(", ") + ", ...", 1.5), choices: shuf(ch), answer: right,
      hints: ["Look at the first two numbers. How did you get from one to the other?", "Check the rule on the next pair of numbers too. Do the numbers go up or down?", "Example: 5, 8, 11, 14 goes up by 3 each time. The rule is add 3. Now do yours."]
    };
  };
  const oddNumber = () => {
    const t = ri(0, 2);
    let three, one, rule;
    if (t === 0) { three = shuf([2, 4, 6, 8, 10, 12, 14]).slice(0, 3); one = pick([1, 3, 5, 7, 9, 11, 13]); rule = "even numbers"; }
    else if (t === 1) { three = shuf([1, 3, 5, 7, 9, 11, 13]).slice(0, 3); one = pick([2, 4, 6, 8, 10, 12]); rule = "odd numbers"; }
    else { three = shuf([5, 10, 15, 20, 25, 30]).slice(0, 3); one = pick([6, 8, 12, 17, 22, 28]); rule = "numbers you say when you count by 5s"; }
    const all = shuf(three.concat(one));
    return {
      text: "Which number does <b>not</b> belong with the others?", visual: big(all.join(" &nbsp; "), 1.6), choices: all, answer: one,
      hints: ["Look at all four numbers. How are three of them alike?", "Think: are three of them even? Odd? Counting by 5s? Find the rule, then find the one left out.", "Example: 2, 4, 6, 9 → 9 is odd, and the others are even, so 9 does not belong. Now do yours."]
    };
  };

  // ---------- Venn ----------
  const venn = (l, r, nums) => {
    const cell = (x, y, w, t) => `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;text-align:center;font-size:1.2em">${t}</div>`;
    return `<div style="position:relative;width:260px;height:150px;margin:auto">
<div style="position:absolute;left:0;top:10px;width:150px;height:130px;border:3px solid #ef4444;border-radius:50%;box-sizing:border-box"></div>
<div style="position:absolute;left:110px;top:10px;width:150px;height:130px;border:3px solid #3b82f6;border-radius:50%;box-sizing:border-box"></div>
<div style="position:absolute;left:0;top:-6px;width:110px;font-size:.8em;color:#ef4444;text-align:left"><b>${l}</b></div>
<div style="position:absolute;right:0;top:-6px;width:110px;font-size:.8em;color:#3b82f6;text-align:right"><b>${r}</b></div>
${nums ? cell(20, 62, 70, nums[0]) + cell(95, 62, 70, nums[1]) + cell(170, 62, 70, nums[2]) : ""}</div>`;
  };
  const VA = [["🦆", "duck", 1, 1], ["🐦", "bird", 1, 0], ["🐟", "fish", 0, 1], ["🐶", "dog", 0, 0], ["🐳", "whale", 0, 1], ["🦋", "butterfly", 1, 0], ["🦅", "eagle", 1, 0], ["🐱", "cat", 0, 0], ["🐸", "frog", 0, 1], ["🐝", "bee", 1, 0], ["🐴", "horse", 0, 0], ["🐧", "penguin", 0, 1]];
  const vennChoices = (a, b) => ["only " + a, "only " + b, "both", "neither"];
  const vennAnimals = () => {
    const [e, n, f, s] = pick(VA), ans = f && s ? "both" : f ? "only fly" : s ? "only swim" : "neither";
    return {
      text: `Left circle: animals that can <b>fly</b>. Right circle: animals that can <b>swim</b>. Where does the <b>${n}</b> ${e} go?`, visual: venn("fly", "swim"),
      choices: vennChoices("fly", "swim"), answer: ans,
      hints: ["Ask two questions about the animal: can it fly? can it swim?", "If yes to both, it goes in the middle where the circles overlap. If yes to one, it goes in that circle only. If no to both, it goes outside.", "Example: a 🐸 frog can swim but cannot fly, so it goes in the swim circle only. Now do yours."]
    };
  };
  const vennShapes = () => {
    const color = pick(["red", "blue"]), shape = pick(["circle", "square"]), it = pick(SH.filter(x => x[1] === "red" || x[1] === "blue"));
    const c = it[1] === color, s = it[2] === shape, ans = c && s ? "both" : c ? `only ${color}` : s ? `only ${shape}s` : "neither";
    return {
      text: `Left circle: <b>${color}</b> shapes. Right circle: <b>${shape}s</b>. Where does a <b>${it[1]} ${it[2]}</b> ${it[0]} go?`, visual: venn(color, shape + "s"),
      choices: [`only ${color}`, `only ${shape}s`, "both", "neither"], answer: ans,
      hints: ["Ask two questions about the shape: is it the right color? is it the right shape?", "If yes to both, it goes where the circles overlap. If yes to one, it goes in that circle only. If no to both, it goes outside.", "Example: a green circle, with the circles for \"red\" and \"circles\": it is a circle but not red, so it goes in the circles part only. Now do yours."]
    };
  };
  const vennCount = () => {
    const a = ri(1, 5), b = ri(1, 4), c = ri(1, 5), pair = pick([["likes apples", "likes bananas"], ["has a dog", "has a cat"], ["likes soccer", "likes swimming"]]);
    const q = pick(["l", "r", "b"]);
    const text = q === "l" ? `How many kids are in the <b>${pair[0]}</b> circle in all (including the middle)?` : q === "r" ? `How many kids are in the <b>${pair[1]}</b> circle in all (including the middle)?` : "How many kids are in <b>both</b> circles (the middle)?";
    return {
      text, visual: venn(pair[0], pair[1], [a, b, c]), answer: q === "l" ? a + b : q === "r" ? b + c : b,
      hints: ["Find the part of the picture the question is about.", q === "b" ? "The middle part is where the two circles overlap." : "A whole circle includes its own part AND the middle part. Add them together.", "Example: if a circle has 2 on its own and 3 in the middle, the whole circle has 2 + 3 = 5. Now do yours."]
    };
  };

  // ---------- deduction ----------
  const taller = n => () => {
    const order = shuf(NM).slice(0, n); // tallest first
    const clues = [];
    for (let i = 0; i < n - 1; i++) { const a = order[i], b = order[i + 1]; clues.push(Math.random() < 0.5 ? `${a} is taller than ${b}.` : `${b} is shorter than ${a}.`); }
    const kinds = n === 2 ? ["shortest", "tallest"] : n === 3 ? ["shortest", "tallest", "middle"] : ["shortest", "tallest", "second"];
    const k = pick(kinds), ans = k === "tallest" ? order[0] : k === "shortest" ? order[n - 1] : k === "middle" ? order[1] : order[1];
    const q = k === "tallest" ? "Who is the <b>tallest</b>?" : k === "shortest" ? "Who is the <b>shortest</b>?" : k === "middle" ? "Who is in the <b>middle</b> (not tallest, not shortest)?" : "Who is the <b>second tallest</b>?";
    return {
      text: shuf(clues).join(" ") + "<br>" + q, choices: shuf(order.slice()), answer: ans,
      hints: ["Picture the people standing in a line, tallest to shortest.", "Each clue says who is above whom. Link the clues that share a name to build the whole line.", "Example: \"Zed is taller than Kim. Kim is taller than Lou.\" The line is Zed, Kim, Lou from tallest to shortest. Now do yours."]
    };
  };
  const PETS = [["🐶", "dog"], ["🐱", "cat"], ["🐰", "rabbit"], ["🐦", "bird"]];
  const PERMS = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
  const petPuzzle = nc => () => {
    for (let t = 0; t < 500; t++) {
      const ppl = shuf(NM).slice(0, 3), pets = shuf(PETS).slice(0, 3), truth = shuf([0, 1, 2]);
      const cands = [];
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) cands.push(truth[i] === j ? { k: "has", i, j } : { k: "not", i, j });
      const cl = shuf(cands).slice(0, nc);
      const ok = PERMS.filter(p => cl.every(c => c.k === "has" ? p[c.i] === c.j : p[c.i] !== c.j));
      if (ok.length !== 1) continue;
      const tgt = ri(0, 2);
      if (cl.some(c => c.k === "has" && c.i === tgt)) continue;
      const text = cl.map(c => c.k === "has" ? `${ppl[c.i]} has the ${pets[c.j][1]}.` : `${ppl[c.i]} does not have the ${pets[c.j][1]}.`).join(" ");
      return {
        text: `Three friends each have a different pet. ${text}<br>What pet does <b>${ppl[tgt]}</b> have?`, visual: big(pets.map(x => x[0]).join(" &nbsp; "), 1.8),
        choices: pets.map(lab), answer: lab(pets[truth[tgt]]),
        hints: ["Use the clues to cross out pets that each person cannot have.", "Start with a clue that says someone HAS a pet. That pet is taken, so nobody else has it. Then use the \"does not\" clues.", "Example: pets are a cat, a dog and a fish. Ann has the cat, so the cat is taken. Bo does not have the dog, so Bo must have the fish. Cy gets the dog. Now do yours."]
      };
    }
  };

  // ---------- true / false, riddles, if-then ----------
  const TF1 = [
    ["A dog has four legs.", true, "Think of a dog walking."], ["Fish live in water.", true, "Where do fish swim?"], ["Ice is hot.", false, "Think of an ice cube in your hand."],
    ["A bird has wings.", true, "How do birds fly?"], ["Snow is cold.", true, "Have you ever touched snow?"], ["A square has 5 sides.", false, "Count the sides of a square."],
    ["A cow can drive a car.", false, "Do cows drive?"], ["Apples grow on trees.", true, "Where do apples come from?"], ["People have two ears.", true, "Feel your ears."], ["The sun is cold.", false, "Is the sun hot or cold?"]
  ];
  const TF2 = [
    ["A week has 7 days.", true, "Count Monday to Sunday."], ["A spider has 6 legs.", false, "Spiders have more legs than insects do."], ["A triangle has 4 sides.", false, "Tri means three."],
    ["There are 12 months in a year.", true, "Count January to December."], ["The moon is made of cheese.", false, "The moon is rock."], ["A bicycle has 2 wheels.", true, "Think of a bike."],
    ["Penguins can fly.", false, "Penguins swim, but do they fly?"], ["Bees make honey.", true, "Where does honey come from?"], ["A dime is worth 10 cents.", true, "Think about coins."], ["Frogs can jump.", true, "Think of a frog at a pond."]
  ];
  const tfNum = () => {
    const t = ri(0, 1);
    if (t === 0) { const a = ri(1, 20); let b = ri(1, 20); if (a === b) b++; const more = Math.random() < 0.5; return { text: `True or false? ${a} is ${more ? "more" : "less"} than ${b}.`, choices: ["true", "false"], answer: (more ? a > b : a < b) ? "true" : "false", hints: ["Compare the two numbers.", "Which number is farther along when you count?", "Example: 9 is more than 6 is true, because 9 comes after 6. Now do yours."] }; }
    const a = ri(1, 9), b = ri(1, 9), good = Math.random() < 0.5, c = good ? a + b : a + b + pick([-1, 1]);
    return { text: `True or false? ${a} + ${b} = ${c}.`, choices: ["true", "false"], answer: good ? "true" : "false", hints: ["Work out " + a + " + " + b + " yourself first.", "Then compare your answer to the number after the equals sign.", "Example: 3 + 2 = 6 is false, because 3 + 2 = 5. Now do yours."] };
  };
  const andOr = () => {
    const mk = () => { const a = ri(1, 12); let b = ri(1, 12); if (a === b) b++; const more = Math.random() < 0.5; return { t: `${a} is ${more ? "more" : "less"} than ${b}`, v: more ? a > b : a < b }; };
    const x = mk(), y = mk(), op = pick(["AND", "OR"]), res = op === "AND" ? x.v && y.v : x.v || y.v;
    return {
      text: `True or false? ${x.t} <b>${op}</b> ${y.t}.`, choices: ["true", "false"], answer: res ? "true" : "false",
      hints: ["Decide if each part is true or false by itself first.", "AND needs both parts to be true. OR needs at least one part to be true.", "Example: \"2 is more than 1 AND 3 is less than 2\": the second part is false, so the whole thing is false. Now do yours."]
    };
  };
  const EM = { bird: "🐦", banana: "🍌", car: "🚗", sun: "☀️", snow: "❄️", cat: "🐱", elephant: "🐘", hat: "🎩", cow: "🐮", apple: "🍎", spider: "🕷️", bike: "🚲", book: "📖", triangle: "🔺", octopus: "🐙", penguin: "🐧", moon: "🌙", airplane: "✈️" };
  const RID1 = [["I have wings. I say tweet.", "bird"], ["I am yellow. Monkeys love to eat me.", "banana"], ["I have four wheels. I take you places.", "car"], ["I give light in the day. I am hot.", "sun"], ["I am cold and white. I fall in winter.", "snow"], ["I say meow. I like to chase mice.", "cat"], ["I have a trunk and big ears.", "elephant"], ["I go on your head. I keep the sun off.", "hat"]];
  const RID2 = [["I have four legs. I say moo. I give milk.", "cow"], ["I am a fruit. I am round and red. One a day keeps the doctor away.", "apple"], ["I have eight legs. I spin a web.", "spider"], ["I have two wheels. You pedal me. I have a bell.", "bike"], ["I have pages. You read me. I have a cover.", "book"], ["I am a shape. I have 3 sides and 3 corners.", "triangle"], ["I live in the ocean. I have eight arms.", "octopus"], ["I am a bird. I cannot fly. I live where it is icy.", "penguin"], ["I come out at night. I change shape in the sky.", "moon"], ["I am a vehicle. I fly. I have wings and a pilot.", "airplane"]];
  const riddle = (bank, all) => () => {
    const [cl, a] = pick(bank), lbl = x => `${EM[x]} ${x}`;
    return {
      text: `Who am I? ${cl}`, choices: shuf([lbl(a), ...shuf(all.filter(x => x !== a)).slice(0, 2).map(lbl)]), answer: lbl(a),
      hints: ["Read every clue. Each clue rules some answers out.", `Focus on the first clue: "${cl.split(". ")[0].replace(/\.$/, "")}". Which choices could fit it?`, "Example: \"I have wings. I say quack.\" The answer is a duck, because only a duck fits both clues. Now do yours."]
    };
  };
  const RID3 = [
    ["I am a season. I am hot. School is often out.", "summer", ["winter", "spring"]], ["I am a season. Leaves fall from the trees.", "fall", ["summer", "spring"]], ["I am a season. Flowers start to grow.", "spring", ["winter", "fall"]],
    ["I am a season. It is cold and it snows.", "winter", ["summer", "fall"]], ["I am a shape. I have 4 equal sides.", "square", ["triangle", "circle"]], ["I am a shape. I am perfectly round.", "circle", ["square", "triangle"]],
    ["I am a tool. I cut paper. I have two blades.", "scissors", ["hammer", "pencil"]], ["I am a tool. I pound nails.", "hammer", ["scissors", "pencil"]], ["I am a tool. You write with me. I have an eraser.", "pencil", ["hammer", "scissors"]],
    ["I am an animal. I have a very long neck. I eat leaves from tall trees.", "giraffe", ["cow", "frog"]], ["I am a day of the week. I come right after Monday.", "Tuesday", ["Friday", "Sunday"]], ["I am a day of the week. I come right before Saturday.", "Friday", ["Monday", "Tuesday"]]
  ];
  const wordRiddle = () => {
    const [cl, a, w] = pick(RID3);
    return {
      text: `Who am I? ${cl}`, choices: shuf([a, ...w]), answer: a,
      hints: ["Read every clue. Each clue rules some answers out.", `Focus on this clue: "${cl.split(". ")[cl.split(". ").length - 1].replace(/\.$/, "")}". Which choices could fit it?`, "Example: \"I am a season. It is the one right after winter.\" The answer is spring. Now do yours."]
    };
  };
  const numRiddle = () => {
    for (let t = 0; t < 300; t++) {
      const n = ri(2, 19), lo = ri(0, n - 1), hi = ri(n + 1, 20);
      const props = [
        { s: n % 2 === 0 ? "I am even" : "I am odd", f: x => (x % 2 === 0) === (n % 2 === 0) },
        { s: `I am more than ${lo}`, f: x => x > lo }, { s: `I am less than ${hi}`, f: x => x < hi },
        ...(n % 5 === 0 ? [{ s: "I am in the 5 times table", f: x => x % 5 === 0 }] : []),
        { s: n >= 10 ? "I have two digits" : "I have one digit", f: x => (x >= 10) === (n >= 10) }
      ];
      const cl = shuf(props).slice(0, ri(3, 4)), sols = []; for (let x = 1; x <= 20; x++) if (cl.every(c => c.f(x))) sols.push(x);
      if (sols.length !== 1 || sols[0] !== n) continue;
      return { text: `I am a number from 1 to 20. ${cl.map(c => c.s + ".").join(" ")} What number am I?`, answer: n, hints: ["Each clue crosses out some numbers. Think about which numbers are left.", "Start with the clue that crosses out the most numbers, like even or odd.", "Example: \"I am odd. I am more than 6. I am less than 9.\" Only 7 fits all three. Now do yours."] };
    }
  };
  const IFT3 = facts([
    ["If it is a bird, then it has wings. Tweety is a bird. Does Tweety have wings?", "yes", ["no", "can't tell"], "Tweety fits the IF part."],
    ["If it is a dog, then it has four legs. Rex is a dog. Does Rex have four legs?", "yes", ["no", "can't tell"], "Rex fits the IF part."],
    ["If it rains, the street gets wet. The street is wet. Did it rain?", "can't tell", ["yes", "no"], "Could something else make a street wet?"],
    ["If a shape is a square, it has 4 sides. This shape has 4 sides. Is it a square?", "can't tell", ["yes", "no"], "Other shapes can have 4 sides too."],
    ["If you are a fish, you live in water. Finn is a fish. Does Finn live in water?", "yes", ["no", "can't tell"], "Finn fits the IF part."],
    ["If it is Saturday, there is no school. Today is Saturday. Is there school today?", "no", ["yes", "can't tell"], "Today fits the IF part."],
    ["If it is a cat, it has whiskers. Max has whiskers. Is Max a cat?", "can't tell", ["yes", "no"], "Do only cats have whiskers?"],
    ["If a light is red, cars stop. The light is red. Do cars stop?", "yes", ["no", "can't tell"], "The light fits the IF part."],
    ["If it is a bee, it can fly. Sam is a bee. Can Sam fly?", "yes", ["no", "can't tell"], "Sam fits the IF part."],
    ["If you have a ticket, you can go in. Zoe has a ticket. Can Zoe go in?", "yes", ["no", "can't tell"], "Zoe fits the IF part."]
  ], "First check: does the second sentence match the IF part of the first sentence?", "Example: \"If it is a cow, it says moo. Bessie is a cow.\" Bessie fits the IF part, so Bessie says moo. But if the second sentence only matched the THEN part, you could not be sure. Now do yours.");
  const IFS = [
    ["If it rains, the grass gets wet. It rained. Is the grass wet?", "yes", "It rained, so the IF part happened."],
    ["If you drop a ball, it falls. You dropped a ball. Does it fall?", "yes", "You dropped it, so the IF part happened."],
    ["If you eat a snack, you are not hungry. You ate a snack. Are you hungry?", "no", "You ate a snack, so the IF part happened."],
    ["If the bell rings, class starts. The bell rang. Does class start?", "yes", "The bell rang, so the IF part happened."],
    ["If you turn on the lamp, the room gets light. You turned on the lamp. Is the room light?", "yes", "You turned it on, so the IF part happened."],
    ["If you put ice in the sun, it melts. You put ice in the sun. Does it melt?", "yes", "The IF part happened."],
    ["If it is a bike, it has wheels. This is a bike. Does it have wheels?", "yes", "This is a bike, so the IF part happened."],
    ["If you go to bed late, you feel sleepy. You went to bed very late. Do you feel sleepy?", "yes", "The IF part happened."]
  ];
  const ifThen = () => {
    const [q, a, c] = pick(IFS);
    return { text: q, choices: ["yes", "no"], answer: a, hints: ["Read the IF part. Did it happen?", c, "Example: \"If it snows, we wear coats. It snowed.\" Then we wear coats. Now do yours."] };
  };
  const matchBank = (() => {
    const P = [["🔑", "key", "🔒 lock"], ["✏️", "pencil", "📄 paper"], ["🪥", "toothbrush", "🦷 tooth"], ["🧦", "sock", "👟 shoe"], ["🥄", "spoon", "🥣 bowl"], ["🎩", "hat", "🙂 head"], ["☔", "umbrella", "🌧️ rain"], ["🐝", "bee", "🌸 flower"]];
    return () => {
      const [e, n, m] = pick(P);
      return {
        text: `Which one goes best with the <b>${n}</b>?`, visual: big(e, 2.2), choices: shuf([m, ...shuf(P.filter(x => x[2] !== m)).slice(0, 2).map(x => x[2])]), answer: m,
        hints: ["Think about how you use the thing in the picture.", "Which choice works together with it, like a team?", "Example: a 🔨 hammer goes with a nail, because you use them together. Now do yours."]
      };
    };
  })();
  const STG = [["seed", "sprout", "flower"], ["egg", "chick", "chicken"], ["baby", "child", "grown-up"], ["morning", "afternoon", "evening"], ["caterpillar", "cocoon", "butterfly"], ["tadpole", "froglet", "frog"]];
  const lifeOrder = () => {
    const i = ri(0, STG.length - 1), st = STG[i], t = pick(["after", "before", "between"]);
    const others = shuf(STG.filter((_, k) => k !== i).flat()).slice(0, 2);
    if (t === "after") { const j = ri(0, 1); return { text: `What comes right <b>after</b> the ${st[j]}?`, choices: shuf([st[j + 1], st[j === 0 ? 2 : 0], others[0]]), answer: st[j + 1], hints: ["Think of the story from the start to the end.", "Put the three steps in order in your head: first, next, last.", "Example: egg, chick, chicken. After the egg comes the chick. Now do yours."] }; }
    if (t === "before") { const j = ri(1, 2); return { text: `What comes right <b>before</b> the ${st[j]}?`, choices: shuf([st[j - 1], st[j === 1 ? 2 : 0], others[0]]), answer: st[j - 1], hints: ["Think of the story from the start to the end.", "Put the three steps in order in your head: first, next, last.", "Example: egg, chick, chicken. Before the chicken comes the chick. Now do yours."] }; }
    return { text: `What comes <b>between</b> the ${st[0]} and the ${st[2]}?`, choices: shuf([st[1], ...others]), answer: st[1], hints: ["Think of the story from the start to the end.", "Put the three steps in order in your head: first, next, last. Which one is in the middle?", "Example: between the egg and the chicken is the chick. Now do yours."] };
  };

  // ---------- mazes ----------
  const DIRS = { right: [0, 1], left: [0, -1], up: [-1, 0], down: [1, 0] };
  const AR = { right: "➡️", left: "⬅️", up: "⬆️", down: "⬇️" };
  const OPP = { right: "left", left: "right", up: "down", down: "up" };
  const DN = ["up", "down", "left", "right"];
  const inb = (n, p) => p[0] >= 0 && p[1] >= 0 && p[0] < n && p[1] < n;
  const mv = (p, d) => [p[0] + DIRS[d][0], p[1] + DIRS[d][1]];
  const run = (p, cmds) => cmds.reduce((a, d) => mv(a, d), p);
  const rnd = n => [ri(0, n - 1), ri(0, n - 1)];
  function randPath(n, k) {
    for (let t = 0; t < 500; t++) {
      const s = rnd(n); let p = s; const cmds = []; let ok = true;
      for (let i = 0; i < k; i++) {
        const opts = DN.filter(d => inb(n, mv(p, d)) && (!cmds.length || d !== OPP[cmds[cmds.length - 1]]));
        if (!opts.length) { ok = false; break; }
        const d = pick(opts); cmds.push(d); p = mv(p, d);
      }
      if (ok && !sameP(s, p)) return { s, cmds, e: p };
    }
    return { s: [0, 0], cmds: ["right"], e: [0, 1] };
  }
  const FOOD = [["🍎", "apple"], ["🍌", "banana"], ["🍇", "grapes"], ["🍓", "strawberry"], ["🍊", "orange"], ["🍉", "watermelon"], ["🍒", "cherries"], ["🍑", "peach"], ["🍍", "pineapple"], ["🥕", "carrot"], ["🌽", "corn"], ["🍋", "lemon"], ["🍐", "pear"], ["🍪", "cookie"], ["🍕", "pizza"], ["🥐", "croissant"]];
  const group = cmds => { const out = []; cmds.forEach(d => { if (out.length && out[out.length - 1][0] === d) out[out.length - 1][1]++; else out.push([d, 1]); }); return out; };
  const walkTxt = (cmds, style) => style === 0 ? cmds.map(d => AR[d]).join(" ") + " (" + cmds.join(", ") + ")" : style === 1 ? cmds.join(", then ") : group(cmds).map(([d, k]) => `${d} ${k}`).join(", then ");
  const mazeWalk = (n, kr, style) => () => {
    const f = shuf(FOOD), p = randPath(n, ri(kr[0], kr[1])), at = q => f[q[0] * n + q[1]];
    const ans = lab(at(p.e));
    return {
      text: `You are a mouse 🐭 in a maze. You start on the <b>${lab(at(p.s))}</b>. You go: ${walkTxt(p.cmds, style)}. What do you find at the end?`, visual: G(n, (r, c) => f[r * n + c][0]),
      choices: shuf([ans, ...shuf(f.filter(x => lab(x) !== ans)).slice(0, 2).map(lab)]), answer: ans,
      hints: ["Find the starting spot in the grid and put your finger on it.", "Move your finger one square for each step. Up and down change the row; left and right change the column.", "Example: if you start on the 🍌 and go down 1, you land on whatever is right under the 🍌. Now do yours."]
    };
  };
  const robotGrid = (n, s, g) => G(n, (r, c) => sameP([r, c], s) ? "🐭" : sameP([r, c], g) ? "🧀" : "⬜");
  const pathChoice = (n, kr) => () => {
    const p = randPath(n, ri(kr[0], kr[1])), wr = [], w = c => c.join(", ");
    for (let t = 0; t < 400 && wr.length < 2; t++) {
      const c = Array.from({ length: p.cmds.length }, () => pick(DN));
      if (sameP(run(p.s, c), p.e) || c.join() === p.cmds.join() || wr.some(x => x.join() === c.join())) continue;
      wr.push(c);
    }
    return {
      text: "Which path takes the mouse 🐭 to the cheese 🧀?", visual: robotGrid(n, p.s, p.e), choices: shuf([w(p.cmds), ...wr.map(w)]), answer: w(p.cmds),
      hints: ["Find the 🐭 and the 🧀. How many squares apart are they?", "Count how many squares across and how many up or down. Then test each path with your finger.", "Example: if the 🧀 is two squares to the right, then \"right, right\" works. Now do yours."]
    };
  };
  const fewest = n => () => {
    for (;;) {
      const s = rnd(n), g = rnd(n);
      if (sameP(s, g)) continue;
      return {
        text: "The mouse can only move up, down, left or right. What is the fewest steps to reach the cheese?", visual: robotGrid(n, s, g), answer: Math.abs(s[0] - g[0]) + Math.abs(s[1] - g[1]),
        hints: ["Count the squares between the 🐭 and the 🧀, one direction at a time.", "No diagonals! Count the squares across, then the squares up or down, then add them together.", "Example: if the cheese is 2 squares right and 1 square down, that is 2 + 1 = 3 steps. Now count yours."]
      };
    }
  };

  // ---------- 3x3 picture squares ----------
  const LATIN = (() => { const out = []; for (const a of PERMS) for (const b of PERMS) for (const c of PERMS) if ([0, 1, 2].every(k => new Set([a[k], b[k], c[k]]).size === 3)) out.push([a, b, c]); return out; })();
  const latin = blanks => () => {
    for (let t = 0; t < 500; t++) {
      const sq = pick(LATIN), set = shuf(PI).slice(0, 3);
      const cells = shuf([0, 1, 2, 3, 4, 5, 6, 7, 8]), hidden = cells.slice(0, blanks), tgt = hidden[0];
      const ok = LATIN.filter(l => cells.slice(blanks).every(c => l[Math.floor(c / 3)][c % 3] === sq[Math.floor(c / 3)][c % 3]));
      if (!ok.every(l => l[Math.floor(tgt / 3)][tgt % 3] === sq[Math.floor(tgt / 3)][tgt % 3])) continue;
      const ans = lab(set[sq[Math.floor(tgt / 3)][tgt % 3]]);
      return {
        text: "Each row and each column must have all three pictures, one time each. What goes in the ❓?",
        visual: G(3, (r, c) => { const i = r * 3 + c; return i === tgt ? "❓" : hidden.includes(i) ? "⬜" : set[sq[r][c]][0]; }),
        choices: set.map(lab), answer: ans,
        hints: ["Look at the row of the ❓. Which pictures are already there?", "The picture that is missing from that row is a good guess. Then check the column: does it fit there too?", "Example: a row has 🍎 🍌 ❓. The row needs a 🍇 too, so ❓ is 🍇 if the column does not have one. Now do yours."]
      };
    }
  };

  // ---------- lessons ----------
  const L1 = [
    L("Same or different?", sameDiff, [S("Same", "🐶 🐶", "Two things are the <b>same</b> when they look exactly alike."), S("Different", "🐶 🐱", "Two things are <b>different</b> when something about them is not alike."), S("Tip", "💡", "Look at each picture slowly before you decide.")]),
    L("Which one is different?", oddEmoji, [S("Odd one out", "🍎🍎🍌🍎", "Sometimes one picture is different from the rest. We call it the <b>odd one out</b>."), S("Find it", "🔍", "Look for the picture that does not match. Then say if it is first, second, third or fourth."), S("Tip", "💡", "Count from the left with your finger.")]),
    L("Does it belong?", oddKind(CAT), [S("Groups", "🍎🍌🍇", "Things that go together make a <b>group</b>. Apples, bananas and grapes are all fruit."), S("Does not belong", "🚗", "A car is not a fruit, so it does not belong in the fruit group."), S("Tip", "💡", "Ask: how are most of them alike?")]),
    L("Count by color", countColor(4, 7), [S("Sorting by color", "🔴🔵🟢", "You can sort things by color: red, blue and green."), S("Count one color", "🔴🔴", "To count just the red ones, only touch the red ones."), S("Tip", "💡", "Say each number out loud as you touch.")]),
    L("Big and small", biggerSmaller, [S("Comparing size", "🐘🐭", "Size tells how big or small something is. An elephant is much bigger than a mouse."), S("Bigger or smaller?", "📏", "<b>Bigger</b> means more size. <b>Smaller</b> means less size."), S("Tip", "💡", "Picture them standing side by side.")]),
    L("Patterns: AB", patternNext(["AB"]), [S("Patterns", "🔴🔵🔴🔵", "A <b>pattern</b> repeats the same way again and again."), S("Find the core", "🔴🔵", "Find the part that repeats. Here it is red, blue."), S("Tip", "💡", "Say the pattern out loud and keep going.")]),
    L("Longer patterns", patternNext(["AAB", "ABB"]), [S("Longer patterns", "🔴🔴🔵", "Some patterns repeat three things, like red, red, blue."), S("Find the core", "🔴🔴🔵", "Look for the part that comes back. That part is the core."), S("Tip", "💡", "Put your finger on the first picture. Where does the pattern start again?")]),
    L("More or fewer?", moreFewer(7), [S("Comparing groups", "🍎🍎🍎 vs 🍎🍎", "To compare groups, count each one."), S("More and fewer", "⚖️", "<b>More</b> means a bigger number. <b>Fewer</b> means a smaller number."), S("Tip", "💡", "Sometimes the groups are the same amount!")]),
    L("Before and after", beforeAfter(2, 10), [S("Number order", "1 2 3 4 5", "Numbers always go in the same order."), S("Before and after", "4 5 6", "Just before 5 is 4. Just after 5 is 6."), S("Tip", "💡", "Count up slowly to find your number.")]),
    L("What number comes next?", nextNum([1, -1], 3, false), [S("Counting patterns", "1, 2, 3, ?", "Numbers can make patterns too."), S("Counting up and down", "⬆️⬇️", "Counting up goes 1, 2, 3. Counting down goes 5, 4, 3."), S("Tip", "💡", "See if the numbers go up or down.")]),
    L("Matching", matchBank, [S("Things that go together", "🔑🔒", "Some things go together, like a key and a lock."), S("Think about use", "🧦👟", "Ask: which of these do I use with it?"), S("Tip", "💡", "Think of the pair working as a team.")]),
    L("Which group?", classify(["animals", "fruits", "vehicles"]), [S("Sorting", "🗂️", "Sorting means putting things in the group where they belong."), S("Example", "🐶🐱", "A dog and a cat both go in the animals group."), S("Tip", "💡", "Ask: what kind of thing is it?")]),
    L("True or false?", tf(TF1, "Think: is this really true?", "Example: \"A fish can ride a bike\" is false. \"Grass is green\" is true. Now do yours."), [S("True or false", "✅❌", "A sentence is <b>true</b> if it is right. It is <b>false</b> if it is not right."), S("Example", "🐶", "\"A dog has four legs\" is true."), S("Tip", "💡", "Picture it. Does it match what you know?")]),
    L("Who am I?", riddle(RID1, Object.keys(EM)), [S("Riddles", "🤔", "A riddle gives clues. You use the clues to find the answer."), S("Example", "🐦", "\"I have wings. I say tweet.\" The answer is a bird."), S("Tip", "💡", "Each clue rules some answers out.")]),
    L("Adding puzzles", wordProb(10, "add"), [S("Putting together", "🍎🍎 + 🍎", "When more come, we add them together."), S("Example", "2 + 1 = 3", "2 apples and 1 more apple make 3 apples."), S("Tip", "💡", "Start with the first number, then count on.")]),
    L("Follow the maze", mazeWalk(3, [1, 2], 0), [S("A maze grid", "🍎🍌🍇", "A mouse 🐭 walks in a maze. It follows steps like up, down, left and right."), S("Example", "🍌⬇️", "If the mouse starts on the 🍌 and goes down, it lands on the picture below."), S("Tip", "💡", "Use your finger and take one step at a time.")]),
    L("If this, then that", ifThen, [S("IF and THEN", "☔", "IF something happens, THEN something else follows. IF it rains, THEN the grass gets wet."), S("Check the IF", "🔎", "First check: did the IF part happen?"), S("Tip", "💡", "If it did, the THEN part follows.")]),
    L("Taller and shorter", taller(2), [S("Comparing people", "🧍🧒", "Clues can tell us who is taller or shorter."), S("Example", "Mia > Leo", "\"Mia is taller than Leo\" means Leo is shorter."), S("Tip", "💡", "Taller than and shorter than are two ways to say the same thing.")]),
    L("Mixed practice", mix(sameDiff, oddEmoji, patternNext(["AB"]), moreFewer(7), matchBank, ifThen), MIXS("Same and different, odd one out, patterns, more and fewer, matching and IF/THEN.")),
    L("Level 1 Challenge", mix(oddKind(CAT), countColor(4, 7), biggerSmaller, patternNext(["AB", "AAB", "ABB"]), nextNum([1, -1], 3, false), classify(["animals", "fruits", "clothes"]), riddle(RID1, Object.keys(EM)), wordProb(10, "add"), mazeWalk(3, [1, 2], 0), taller(2)), MIXS("Everything from level 1: sorting, counting, patterns, riddles, mazes and clues."))
  ];

  const L2 = [
    L("Patterns with 3", patternNext(["ABC", "AABB", "AAB"]), [S("Bigger patterns", "🔴🔵🟢", "Some patterns repeat three different things: red, blue, green, red, blue, green..."), S("Find the core", "🔴🔵🟢", "The core is the part that repeats. Say it out loud."), S("Tip", "💡", "Put your finger where the core starts again.")]),
    L("Growing patterns", growing(1, 1), [S("Growing patterns", "⭐ ⭐⭐ ⭐⭐⭐", "Some patterns grow. Each group gets bigger by the same amount."), S("Find the jump", "➕1", "Count each group. How many more is the next one?"), S("Tip", "💡", "Add the same jump to the last group.")]),
    L("Skip counting", nextNum([2, 5, 10], 4, false), [S("Skip counting", "2, 4, 6, 8", "You do not have to count by ones. You can count by 2s, 5s or 10s."), S("Find the jump", "➕", "Look at how much bigger each number is than the one before."), S("Tip", "💡", "Add the jump to the last number.")]),
    L("Odd one out", oddKind(MOVE), [S("Odd one out", "🐦🦋🐝🐟", "Look for what most of them have in common. The one that does not match is the odd one out."), S("Example", "🐦🦋🐝🐟", "Three can fly, but the fish swims. The fish is the odd one out."), S("Tip", "💡", "Find the group first.")]),
    L("Sort by color and shape", sortTwo(6, 9), [S("Two ways to sort", "🔴🟥", "Shapes have a color AND a shape. You can sort by either one."), S("Example", "🔴🟦", "The red circle is red AND a circle. The blue square is blue AND a square."), S("Tip", "💡", "Read the question carefully: color or shape?")]),
    L("Which group?", classify(["animals", "fruits", "vehicles", "clothes", "school things"]), [S("Groups", "🗂️", "Everything has a group it belongs to."), S("Example", "🍇🍌", "Grapes and bananas both go with fruits."), S("Tip", "💡", "Say what the thing is, then pick its group.")]),
    L("Who is taller?", taller(3), [S("Clues in a line", "🧍🧒👶", "Clues can help you put people in a line from tallest to shortest."), S("Link the clues", "🔗", "\"Zed is taller than Kim. Kim is taller than Lou.\" Zed, Kim, Lou."), S("Tip", "💡", "Link clues that share the same name.")]),
    L("Who has the pet?", petPuzzle(2), [S("Deduction", "🕵️", "Deduction means using clues to find what must be true."), S("Cross out", "❌", "If one friend has a pet, nobody else has it. Cross it out for the others."), S("Tip", "💡", "Use \"does not\" clues to cross out too.")]),
    L("Maze with words", mazeWalk(3, [3, 4], 1), [S("Word directions", "🧭", "Now the maze steps are in words: up, down, left, right."), S("Track it", "👆", "After each word, say what you land on."), S("Tip", "💡", "Take one step at a time.")]),
    L("Which path?", pathChoice(4, [2, 3]), [S("Choose the path", "🗺️", "Look at where the mouse is and where the cheese is. Plan the steps."), S("Count squares", "🐭➡️➡️🧀", "If the cheese is two squares to the right, the steps are right, right."), S("Tip", "💡", "Test each choice with your finger.")]),
    L("True or false?", mix(tf(TF2, "Think: is this really true?", "Example: \"A snake has wheels\" is false. \"A snake can slither\" is true. Now do yours."), tfNum), [S("True or false", "✅❌", "A statement is true if it is right and false if it is not."), S("Check it", "🔎", "Use what you know, or work it out."), S("Tip", "💡", "For math statements, work out the answer first.")]),
    L("If, then... or can't tell", IFT3, [S("IF and THEN", "🧠", "\"If it is a bird, it has wings.\" Tweety is a bird, so Tweety has wings."), S("Careful!", "⚠️", "But if you only know a thing has wings, you cannot be sure it is a bird."), S("Tip", "💡", "Check: does the second sentence match the IF part?")]),
    L("Who am I?", riddle(RID2, Object.keys(EM)), [S("Riddles", "🤔", "A riddle gives you a few clues. Use all of them."), S("Example", "🦆", "\"I swim. I say quack.\" The answer is a duck."), S("Tip", "💡", "Each clue rules out some choices.")]),
    L("Before, after, between", beforeAfter(2, 19), [S("Number neighbors", "4 5 6", "Every number has neighbors: one before and one after."), S("Between", "4 _ 6", "A number between two numbers sits in the middle."), S("Tip", "💡", "Count up slowly to check.")]),
    L("Story puzzles", wordProb(12, "mixed"), [S("Word problems", "📖", "Some puzzles tell a little story with numbers."), S("Add or take away?", "➕➖", "Getting more means adding. Giving away means taking away."), S("Tip", "💡", "Say the story in your own words.")]),
    L("Make 10", makeTen, [S("Making 10", "⭐⭐⭐⭐ + ?", "Make 10 means: what do you add to a number to reach 10?"), S("Count up", "🔢", "Start at your number and count up to 10. How many steps?"), S("Tip", "💡", "Use your fingers!")]),
    L("Missing numbers", nextNum([1, 2, 5, 10], 4, true), [S("Missing number", "2, 4, ?, 8", "In a number pattern, one number can be missing."), S("Find the jump", "➕2", "See how much the numbers change. Then fill in the gap."), S("Tip", "💡", "Check that your number fits before and after.")]),
    L("Picture squares", latin(1), [S("Picture squares", "🍎🍌🍇", "In a picture square, every row and column has each picture one time."), S("Find the missing one", "❓", "Look at the row: which picture is not there yet?"), S("Tip", "💡", "Check the column too.")]),
    L("Mixed practice", mix(patternNext(["ABC", "AAB"]), taller(3), petPuzzle(2), pathChoice(4, [2, 3]), IFT3, nextNum([2, 5, 10], 4, false)), MIXS("Patterns, clues, mazes, IF/THEN and number patterns.")),
    L("Level 2 Challenge", mix(growing(1, 1), oddKind(MOVE), sortTwo(6, 9), taller(3), petPuzzle(2), mazeWalk(3, [3, 4], 1), tfNum, riddle(RID2, Object.keys(EM)), wordProb(12, "mixed"), makeTen, latin(1)), MIXS("Everything from level 2: patterns, sorting, deduction, mazes, riddles and number puzzles."))
  ];

  const L3 = [
    L("What is the 9th picture?", patternPos(["AB", "ABC", "AAB"]), [S("Long patterns", "🔴🔵🔴🔵...", "You can find far away items in a pattern without drawing them all."), S("Use the core", "🔴🔵", "A core of 2 repeats every 2. A core of 3 repeats every 3."), S("Tip", "💡", "Count by the size of the core to see where it lines up.")]),
    L("Count by 3s, 4s, 5s", nextNum([3, 4, 5, 10, -2, -3], 4, false), [S("Number patterns", "3, 6, 9, 12", "Number patterns can go up by 3, 4, 5 or 10, or go down."), S("Find the jump", "➕3", "See how much each number changes."), S("Tip", "💡", "Going down means subtracting the jump.")]),
    L("Find the rule", patternRule, [S("The rule", "🔧", "A rule says how to get from one number to the next."), S("Example", "5, 8, 11, 14", "Each number is 3 more. The rule is add 3."), S("Tip", "💡", "Check the rule on every pair.")]),
    L("Odd number out", oddNumber, [S("Number groups", "2 4 6 7", "Numbers can be grouped: even, odd, or counting by 5s."), S("Example", "2 4 6 7", "7 is odd, and the others are even."), S("Tip", "💡", "Find the rule that fits three numbers.")]),
    L("Venn: animals", vennAnimals, [S("Venn diagrams", "⭕⭕", "A Venn diagram uses overlapping circles to sort things."), S("The middle", "🔀", "The middle is for things that fit BOTH circles."), S("Tip", "💡", "Outside both circles means it fits neither.")]),
    L("Venn: shapes", vennShapes, [S("Two things at once", "🔴🟦", "A shape can be a color AND a kind of shape."), S("Where it goes", "⭕⭕", "In the middle if it matches both. Outside if it matches neither."), S("Tip", "💡", "Ask two questions: right color? right shape?")]),
    L("Venn: counting", vennCount, [S("Numbers in a Venn", "3 | 2 | 4", "Numbers in a Venn diagram tell how many are in each part."), S("A whole circle", "➕", "A whole circle is its own part PLUS the middle part."), S("Tip", "💡", "Add the middle to the side.")]),
    L("Who is tallest?", taller(4), [S("Longer chains", "🔗", "With four people, link all the clues into one line."), S("Example", "A > B > C > D", "\"A is taller than B, B is taller than C...\" builds a line."), S("Tip", "💡", "Link clues with the same name.")]),
    L("Pet puzzle", petPuzzle(3), [S("Deduction", "🕵️", "Use every clue. Each one crosses out something."), S("Cross out", "❌", "If someone has a pet, cross it out for the others."), S("Tip", "💡", "Use \"does not\" clues to cross out too.")]),
    L("Long maze", mazeWalk(4, [4, 6], 2), [S("Longer mazes", "🧭", "In a bigger maze, steps can be grouped, like \"right 2\" or \"down 3\"."), S("Take it slow", "👆", "Move your finger one square at a time."), S("Tip", "💡", "right 2 means two squares to the right.")]),
    L("Shortest way", fewest(5), [S("Shortest path", "📏", "The shortest way uses the fewest steps."), S("Add them", "➕", "Squares across plus squares up or down."), S("Tip", "💡", "No diagonals!")]),
    L("Number riddles", numRiddle, [S("Number clues", "🔢", "A number riddle gives clues, like even, odd, more than or less than."), S("Cross out", "❌", "Each clue crosses out many numbers."), S("Tip", "💡", "Make a list of numbers and cross them out.")]),
    L("Word riddles", wordRiddle, [S("Longer riddles", "🤔", "Use every clue to find the answer."), S("Example", "🌷", "\"I am a season. Flowers start to grow.\" Spring!"), S("Tip", "💡", "Rule out choices one clue at a time.")]),
    L("AND and OR", andOr, [S("AND", "✅✅", "<b>AND</b> is true only when BOTH parts are true."), S("OR", "✅❌", "<b>OR</b> is true when AT LEAST ONE part is true."), S("Tip", "💡", "Decide each part first.")]),
    L("Put it in order", lifeOrder, [S("Life cycles", "🌱🌸", "Many things go through steps in order: a seed becomes a sprout, then a flower."), S("Before and after", "➡️", "Before means earlier. After means later."), S("Tip", "💡", "Put the steps in order in your head.")]),
    L("Two-step stories", wordProb(14, "two"), [S("Two steps", "📖", "Some stories have two parts. Do them in order."), S("Example", "5 + 2 - 3", "5, then 2 more is 7, then 3 go away leaves 4."), S("Tip", "💡", "Write the numbers down as you go.")]),
    L("Missing numbers", missingEq, [S("Find the missing", "? + 4 = 9", "Sometimes the missing number is in the problem. You find it."), S("Count up or down", "🔢", "To find ? in 4 + ? = 9, count up from 4 to 9."), S("Tip", "💡", "Check your answer by putting it back.")]),
    L("Picture squares", latin(3), [S("Hard picture squares", "🍎🍌🍇", "Every row and every column has each picture one time."), S("More blanks", "⬜⬜❓", "When many squares are empty, find the row or column with the most clues first."), S("Tip", "💡", "Fill in the easy ones in your head first.")]),
    L("Mixed practice", mix(patternRule, vennAnimals, vennCount, taller(4), petPuzzle(3), mazeWalk(4, [4, 6], 2), andOr, missingEq), MIXS("Patterns, Venn diagrams, clues, mazes, AND/OR and missing numbers.")),
    L("Level 3 Challenge", mix(patternPos(["AB", "ABC", "AAB"]), nextNum([3, 4, 5, 10, -2, -3], 4, false), oddNumber, vennShapes, petPuzzle(3), fewest(5), numRiddle, wordRiddle, lifeOrder, wordProb(14, "two"), latin(3), IFT3), MIXS("Everything from level 3: patterns, Venn diagrams, clues, mazes, riddles and number puzzles."))
  ];

  return { 1: L1, 2: L2, 3: L3 };
})();
