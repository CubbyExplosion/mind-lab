// Mind Lab Math. Levels 1-3 have 20 lessons each (60 lessons).
// Each lesson makes fresh questions every time. Every question has 3 hints
// (nudge, clue, worked example) and NEVER shows the real answer.
const ri = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = arr => arr[ri(0, arr.length - 1)];
const em = (m, easy) => (easy ? Math.max(3, Math.ceil(m / 2)) : m);
const NAMES = ["Mia", "Leo", "Ava", "Sam", "Zoe", "Max", "Ivy", "Ben"];
const ITEMS = [["apples", "🍎"], ["stars", "⭐"], ["cookies", "🍪"], ["balloons", "🎈"], ["fish", "🐟"], ["bugs", "🐞"]];
const notSame = (list, test) => list.find(x => !test(x)) || list[0];

const MQ = {
  count(max) {
    return easy => {
      const m = em(max, easy), n = ri(2, m), it = pick(ITEMS);
      const e = n === 4 ? 3 : 4;
      return {
        text: "How many are there?", visual: it[1].repeat(n), answer: n,
        hints: [
          "Point at each one and say one number for each. Don't skip any!",
          n > 5 ? "Make a group of 5, then count the rest. 5, 6, 7…" : "Count slowly, and cross each one off in your head so you don't count it twice.",
          `Example: ${it[1].repeat(e)} has ${e} because 1, 2, 3${e === 4 ? ", 4" : ""}. Count yours the same way.`
        ]
      };
    };
  },
  add(max) {
    return easy => {
      const m = em(max, easy), a = ri(1, m - 1), b = ri(1, m - a), big = Math.max(a, b), small = Math.min(a, b);
      const [x, y] = notSame([[2, 3], [4, 1], [3, 3]], p => p[0] + p[1] === a + b);
      return {
        text: `${a} + ${b} = ?`, answer: a + b,
        wrong: g => (g === a - b ? "It looks like you took away. The + sign means we put the numbers together." : Math.abs(g - (a + b)) === 1 ? "So close! Count once more, carefully." : null),
        hints: [
          "The + sign means we put the two numbers together. Will the answer be bigger or smaller than each number?",
          `Start at the bigger number, ${big}, and count up ${small} more, one at a time. Use your fingers!`,
          `Example: ${x} + ${y}. Start at ${Math.max(x, y)} and count up ${Math.min(x, y)} more. You land on ${x + y}. Now do the same trick with your numbers.`
        ]
      };
    };
  },
  sub(max) {
    return easy => {
      const m = em(max, easy), a = ri(2, m), b = ri(1, a - 1);
      const [x, y] = notSame([[5, 2], [7, 3], [6, 1]], p => p[0] - p[1] === a - b);
      return {
        text: `${a} − ${b} = ?`, answer: a - b,
        wrong: g => (g === a + b ? "It looks like you added. The − sign means take away." : Math.abs(g - (a - b)) === 1 ? "So close! Count back once more, carefully." : null),
        hints: [
          `The − sign means take away. Will the answer be bigger or smaller than ${a}?`,
          `Start at ${a} and count backwards ${b} steps. Use your fingers to keep track.`,
          `Example: ${x} − ${y}. Start at ${x} and count back ${y}. You land on ${x - y}. Now try it with yours.`
        ]
      };
    };
  },
  missing(max) {
    return easy => {
      const m = em(max, easy), c = ri(3, m), a = ri(1, c - 1);
      const [x, z] = notSame([[3, 5], [2, 6], [4, 7]], p => p[1] - p[0] === c - a);
      return {
        text: `${a} + ? = ${c}`, answer: c - a,
        hints: [
          "One number is hiding! Think: how far is it from the first number up to the total?",
          `Start at ${a} and count up until you reach ${c}. How many jumps did you make?`,
          `Example: ${x} + ? = ${z}. Count up from ${x}: that takes ${z - x} jumps to reach ${z}. Try the same with yours.`
        ]
      };
    };
  },
  make10() {
    return easy => {
      const a = ri(1, 9), x = a === 7 ? 6 : 7;
      return {
        text: `${a} + ? = 10`, answer: 10 - a,
        hints: [
          `Picture a ten-frame with 10 boxes. ${a} boxes are filled. How many are empty?`,
          `Count up from ${a} to 10 on your fingers. How many fingers did you use?`,
          `Example: ${x} + ? = 10. Count up from ${x}: that takes ${10 - x} jumps to reach 10. Try yours.`
        ]
      };
    };
  },
  doubles(max) {
    return easy => {
      const n = ri(1, em(max, easy)), it = pick(ITEMS), x = n === 4 ? 3 : 4;
      return {
        text: `${n} + ${n} = ?`, visual: it[1].repeat(n) + "   " + it[1].repeat(n), answer: n * 2,
        hints: [
          "A double means the same number twice. Look at the two equal groups.",
          `Count all of the pictures, or count up ${n} more starting from ${n}.`,
          `Example: double ${x} is ${x} + ${x} = ${x * 2}. Now do double ${n}.`
        ]
      };
    };
  },
  compare(max, mode) {
    return easy => {
      const m = em(max, easy);
      let a = ri(1, m), b = ri(1, m);
      while (a === b) b = ri(1, m);
      const ans = mode === "bigger" ? Math.max(a, b) : Math.min(a, b);
      const bigger = mode === "bigger";
      return {
        text: `Which number is ${mode}?`, choices: [a, b], answer: ans,
        wrong: () => `Look at both numbers again. Which one is ${mode}?`,
        hints: [
          bigger ? "Bigger means more. Which number would have more dots?" : "Smaller means less. Which number would have fewer dots?",
          m > 20 ? "Look at the tens digit first. The bigger tens digit wins. If they match, look at the ones." : `Count up from 1. The number you say ${bigger ? "later" : "first"} is the ${bigger ? "bigger" : "smaller"} one.`,
          "Example: 7 and 4. You say 4 first and 7 later, so 7 is bigger and 4 is smaller. Now try yours."
        ]
      };
    };
  },
  nextTo(max, dir) {
    return easy => {
      const m = em(max, easy), after = dir === "after";
      const n = after ? ri(1, m - 1) : ri(2, m), x = n === 6 ? 8 : 6;
      return {
        text: `What number comes ${dir} ${n}?`, answer: after ? n + 1 : n - 1,
        hints: [
          "Say the numbers out loud in order, starting from 1.",
          `Find ${n} in your counting. ${after ? "The very next number you say" : "The number you said right before it"} is the answer.`,
          `Example: ${after ? `after ${x} comes ${x + 1}` : `before ${x} comes ${x - 1}`}. Use the same trick for ${n}.`
        ]
      };
    };
  },
  skip(step, max) {
    return easy => {
      const s = step * ri(1, step >= 10 ? 3 : 4), shown = ri(3, 5);
      const seq = Array.from({ length: shown }, (_, i) => s + i * step);
      const ex = notSame([[3, 6, 9, 12], [10, 20, 30, 40], [5, 10, 15, 20]], e => e[1] - e[0] === step);
      return {
        text: `${seq.join(", ")}, ?`, answer: s + shown * step,
        hints: [
          "Look at the numbers. Does each one grow by the same amount?",
          `Check the first two numbers. How far is it from ${seq[0]} to ${seq[1]}?`,
          `Example: ${ex.slice(0, 3).join(", ")} jumps by ${ex[1] - ex[0]}, so the next is ${ex[3]}. Add your jump to ${seq[seq.length - 1]}.`
        ]
      };
    };
  },
  evenOdd(max) {
    return easy => {
      const n = ri(2, em(max, easy));
      return {
        text: `Is ${n} even or odd?`, choices: ["Even", "Odd"], answer: n % 2 === 0 ? "Even" : "Odd",
        hints: [
          "Even numbers can be shared into two equal groups with nothing left over.",
          "Look at the last digit. 0, 2, 4, 6 and 8 are even. 1, 3, 5, 7 and 9 are odd.",
          "Example: 8 is even (4 and 4). 7 is odd (3 and 3 with one left over)."
        ]
      };
    };
  },
  wordAdd(max) {
    return easy => {
      const m = em(max, easy), a = ri(1, m - 1), b = ri(1, m - a), n = pick(NAMES), it = pick(ITEMS);
      return {
        text: `${n} has ${a} ${nounFor(a, it[0])} ${it[1]}. A friend gives ${n} ${b} more. How many does ${n} have now?`, answer: a + b,
        hints: [
          `Is ${n} getting more or giving some away?`,
          "When we get more, we add. Write it as a number sentence first.",
          "Example: Sam has 2 stars and gets 1 more. 2 + 1 = 3. Now write yours and solve it."
        ]
      };
    };
  },
  wordSub(max) {
    return easy => {
      const m = em(max, easy), a = ri(2, m), b = ri(1, a - 1), n = pick(NAMES), it = pick(ITEMS);
      return {
        text: `${n} has ${a} ${nounFor(a, it[0])} ${it[1]}. ${n} gives ${b} away. How many are left?`, answer: a - b,
        hints: [
          `Is ${n} getting more or losing some?`,
          "When some go away, we take away. Write it as a number sentence first.",
          "Example: Zoe has 5 stars and gives 2 away. 5 − 2 = 3. Now write yours and solve it."
        ]
      };
    };
  },
  placeValue(maxTens) {
    return easy => {
      const t = ri(1, em(maxTens, easy)), o = ri(1, 9), ex = t === 2 ? "3 tens and 6 ones: 30 and 6 is 36." : "2 tens and 5 ones: 20 and 5 is 25.";
      return {
        text: `${t} ${t === 1 ? "ten" : "tens"} and ${o} ${o === 1 ? "one" : "ones"} = ?`, visual: "🟦".repeat(t) + "  " + "🟨".repeat(o), answer: t * 10 + o,
        hints: [
          "A ten is a group of 10. The blue squares are tens and the yellow squares are ones.",
          `Count by tens for the tens part: 10, 20… Then add the ${o === 1 ? "one" : "ones"} on the end.`,
          `Example: ${ex} Do the same with yours.`
        ]
      };
    };
  },
  tenMore(max, more) {
    return easy => {
      const m = em(max, easy), n = more ? ri(1, m - 10) : ri(11, m), x = more ? 23 : 47;
      return {
        text: `What is 10 ${more ? "more" : "less"} than ${n}?`, answer: more ? n + 10 : n - 10,
        hints: [
          `10 ${more ? "more" : "less"} means ${more ? "add" : "take away"} one ten.`,
          "Only the tens digit changes by 1. The ones digit stays the same.",
          `Example: 10 ${more ? "more" : "less"} than ${x} is ${more ? x + 10 : x - 10}. The ones digit stayed the same.`
        ]
      };
    };
  },
  addTens() {
    return easy => {
      const a = ri(1, 5) * 10, b = ri(1, 5) * 10;
      return {
        text: `${a} + ${b} = ?`, answer: a + b,
        hints: [
          "These are all tens! Think of them as groups of ten.",
          `${a / 10} tens plus ${b / 10} tens. Add those small numbers first, then say "tens".`,
          "Example: 20 + 30. 2 tens + 3 tens = 5 tens = 50. Now do yours."
        ]
      };
    };
  },
  subTens() {
    return easy => {
      const a = ri(3, 9) * 10, b = ri(1, a / 10 - 1) * 10;
      return {
        text: `${a} − ${b} = ?`, answer: a - b,
        hints: [
          "These are all tens! Think of them as groups of ten.",
          `${a / 10} tens take away ${b / 10} tens. Subtract the small numbers first, then say "tens".`,
          "Example: 50 − 20. 5 tens − 2 tens = 3 tens = 30. Now do yours."
        ]
      };
    };
  },
  add2() {
    return easy => {
      const ta = ri(1, 7), tb = ri(1, 8 - ta), oa = ri(0, 8), ob = ri(0, 9 - oa), a = ta * 10 + oa, b = tb * 10 + ob;
      return {
        text: `${a} + ${b} = ?`, answer: a + b,
        hints: [
          "Split each number into tens and ones. Add the ones, then add the tens.",
          `Ones: ${oa} + ${ob}. Tens: ${ta} tens + ${tb} tens. Put the two answers together.`,
          "Example: 21 + 14. Ones: 1 + 4 = 5. Tens: 2 + 1 = 3 tens = 30. 30 + 5 = 35. Now do yours."
        ]
      };
    };
  },
  sub2() {
    return easy => {
      const ta = ri(2, 9), tb = ri(1, ta - 1), oa = ri(1, 9), ob = ri(0, oa), a = ta * 10 + oa, b = tb * 10 + ob;
      return {
        text: `${a} − ${b} = ?`, answer: a - b,
        hints: [
          "Split each number into tens and ones. Take away the ones, then take away the tens.",
          `Ones: ${oa} − ${ob}. Tens: ${ta} tens − ${tb} tens. Put the two answers together.`,
          "Example: 47 − 25. Ones: 7 − 5 = 2. Tens: 4 − 2 = 2 tens = 20. 20 + 2 = 22. Now do yours."
        ]
      };
    };
  },
  groups(per) {
    return easy => {
      const g = ri(2, 5), it = pick(ITEMS);
      return {
        text: `There are ${g} groups with ${per} ${nounFor(per, it[0])} in each group. How many in all?`,
        visual: Array.from({ length: g }, () => it[1].repeat(per)).join("  |  "), answer: g * per,
        hints: [
          "Equal groups: every group has the same amount.",
          `Add ${per} again and again, once for each group. You have ${g} groups.`,
          "Example: 3 groups of 2. 2 + 2 + 2 = 6. Now do yours."
        ]
      };
    };
  },
  times(k) {
    return easy => {
      const n = ri(1, 10), x = n === 3 ? 4 : 3;
      const clue = k === 2 ? `Doubling: ${n} groups of 2 is the same as ${n} + ${n}.`
        : k === 5 ? `Count by 5s, and use a finger for each group. Do it ${n} times.`
        : `Count by 10s, ${n} times. Or think: what does a number look like with a zero on the end?`;
      return {
        text: `${n} × ${k} = ?`, answer: n * k,
        hints: [
          `The × sign means equal groups. This is ${n} groups of ${k}.`,
          clue,
          `Example: ${x} × ${k}. Count by ${k}s, ${x} times: ${Array.from({ length: x }, (_, i) => k * (i + 1)).join(", ")}. The last one is ${x * k}. Now do yours.`
        ]
      };
    };
  },
  half() {
    return easy => {
      const n = ri(1, 20) * 2, x = n === 10 ? 12 : 10;
      return {
        text: `What is half of ${n}?`, answer: n / 2,
        hints: [
          "Half means splitting into 2 equal groups.",
          `Which number plus itself makes ${n}?`,
          `Example: half of ${x} is ${x / 2} because ${x / 2} + ${x / 2} = ${x}. Now try yours.`
        ]
      };
    };
  },
  mixed(...makers) {
    return easy => pick(makers)(easy);
  }
};

// ---------- TEACHING SLIDES ----------
// Every lesson teaches first (a few short slides with a worked example), then quizzes.
// A slide is { h: heading, v: big picture (emoji), t: text }.
const TEACH = {
  count: max => [
    { h: "What is counting?", v: "🍎🍎🍎", t: "Counting means saying <b>one number for each thing</b>. Touch each apple and say <b>1, 2, 3</b>. The last number you say tells you <b>how many</b>. Here there are <b>3 apples</b>." },
    { h: "Count in groups", v: "🍎🍎🍎🍎🍎 &nbsp; 🍎🍎", t: "Bigger numbers are easier in groups! Count a group of 5 first: <b>5</b>. Then keep going: <b>6, 7</b>. So there are 7." + (max > 10 ? " For numbers up to 20 you can use a group of 10 too." : "") },
    { h: "Count each one only once", v: "👆", t: "Touch each one one time. Don't skip any and don't count one twice. Now you're ready for the quiz!" }
  ],
  add: max => [
    { h: "What does + mean?", v: "🍎🍎 ➕ 🍎🍎🍎", t: "The <b>+</b> sign means <b>put together</b>. 2 apples and 3 apples together make <b>5 apples</b>. So 2 + 3 = 5." },
    { h: "Count on", v: "3 → 4 → 5", t: "Start at the <b>bigger</b> number and count up the smaller one. For 2 + 3, start at 3 and count up 2 more: <b>4, 5</b>. The answer is 5!" },
    { h: "Handy tricks", v: "🖐️", t: "Use your fingers to keep track of your counting. The order doesn't matter: 2 + 3 and 3 + 2 are both 5. Adding makes the number <b>bigger</b>." + (max > 10 ? " For bigger sums, <b>make 10 first</b>: 8 + 5 is 8 + 2 = 10, then 3 more is 13." : "") }
  ],
  sub: max => [
    { h: "What does − mean?", v: "🍎🍎🍎🍎🍎 → 🍎🍎🍎❌❌", t: "The <b>−</b> sign means <b>take away</b>. You have 5 apples and 2 go away. Cross them out and count what's left: <b>3</b>. So 5 − 2 = 3." },
    { h: "Count back", v: "5 → 4 → 3", t: "Start at the first number and count <b>backwards</b>. For 5 − 2, start at 5 and count back 2: <b>4, 3</b>. The answer is 3!" },
    { h: "Check your answer", v: "✅", t: "Subtracting makes the number <b>smaller</b>. You can check by adding back: 3 + 2 = 5. It matches, so you're right!" + (max > 10 ? " For bigger numbers, think: 14 − 4 = 10, then take 1 more away is 9." : "") }
  ],
  missing: max => [
    { h: "A hidden number", v: "2 + ❓ = 5", t: "Sometimes one number is hiding. You know where you start (<b>2</b>) and where you end (<b>5</b>). The question is: <b>how many jumps</b> is that?" },
    { h: "Count up to find it", v: "2 → 3 → 4 → 5", t: "Start at 2 and count up until you reach 5: <b>3, 4, 5</b>. That's <b>3 jumps</b>, so the hidden number is 3." },
    { h: "Check it", v: "2 + 3 = 5 ✅", t: "Put your answer back in the problem. If it makes the total, you found it!" }
  ],
  make10: () => [
    { h: "Pairs that make 10", v: "🟦🟦🟦🟦🟦🟦🟦⬜⬜⬜", t: "A ten-frame has 10 boxes. Here 7 are filled and 3 are empty. So <b>7 + 3 = 10</b>. The empty boxes are the missing number!" },
    { h: "The pairs to remember", v: "1+9 · 2+8 · 3+7 · 4+6 · 5+5", t: "These pairs always make 10. Say them until they feel easy. They help with lots of other math later!" },
    { h: "Find the partner", v: "6 + ❓ = 10", t: "Count up from 6 to 10: <b>7, 8, 9, 10</b>. That's 4 jumps. So the partner of 6 is 4." }
  ],
  doubles: () => [
    { h: "What is a double?", v: "🍎🍎🍎 &nbsp; 🍎🍎🍎", t: "A double is the <b>same number added to itself</b>: 3 + 3. Two equal groups of 3 make <b>6</b>." },
    { h: "Doubles to remember", v: "1+1=2 · 2+2=4 · 3+3=6 · 4+4=8 · 5+5=10", t: "Doubles are special because they're easy to remember. Learn them and you can solve lots of problems fast." },
    { h: "Even numbers", v: "✨", t: "Every double is an <b>even</b> number. Look: 2, 4, 6, 8, 10!" }
  ],
  compare: (max, mode) => [
    { h: "Bigger and smaller", v: "🍎🍎🍎🍎🍎🍎🍎 &nbsp; 🍎🍎🍎🍎", t: "7 apples is <b>more</b> than 4 apples. So <b>7 is bigger</b> and <b>4 is smaller</b>." },
    max > 20
      ? { h: "Two-digit numbers", v: "47 vs 52", t: "Look at the <b>tens digit first</b>. 4 tens is less than 5 tens, so <b>52 is bigger</b>. If the tens match, look at the ones." }
      : { h: "Use counting", v: "1 2 3 4 5 6 7", t: "When you count, the number you say <b>later</b> is <b>bigger</b>. You say 4 first and 7 later, so 7 is bigger." },
    { h: "Today you'll find the " + mode + " number", v: "🔍", t: "Read the question carefully. It asks for the <b>" + mode + "</b> number. Look at both and choose!" }
  ],
  nextTo: (max, dir) => [
    { h: "Numbers in order", v: "1 2 3 4 5 6 7 8 9 10", t: "Numbers always go in the same order. Each number comes <b>after</b> the one before it." },
    dir === "after"
      ? { h: "After means next", v: "6 → <b>7</b>", t: "The number <b>after</b> comes when you count up by one more. After 6 comes <b>7</b>. That's the number plus 1." }
      : { h: "Before means just earlier", v: "<b>5</b> ← 6", t: "The number <b>before</b> is the one you said right before. Before 6 comes <b>5</b>. That's the number minus 1." },
    { h: "Say it out loud", v: "🗣️", t: "If you're not sure, say the numbers out loud from the start. You'll hear the answer!" }
  ],
  skip: step => [
    { h: "Skip counting", v: step === 2 ? "2, 4, 6, 8" : step === 5 ? "5, 10, 15, 20" : "10, 20, 30, 40", t: `Skip counting means counting by jumps. This one jumps by <b>${step}</b> every time.` },
    { h: "Find the jump", v: step === 2 ? "2 → 4 (+2)" : step === 5 ? "5 → 10 (+5)" : "10 → 20 (+10)", t: "Look at the first two numbers. How far apart are they? That's the jump. Then add the jump to the last number to find the next." },
    { h: "Tip", v: "🖐️", t: step === 5 ? "Counting by 5s: the numbers end in 5 or 0!" : step === 10 ? "Counting by 10s: the ones digit is always 0." : "Counting by 2s: you're counting the even numbers!" }
  ],
  evenOdd: () => [
    { h: "Even numbers", v: "🍎🍎 🍎🍎 &nbsp;= 4", t: "A number is <b>even</b> if you can share it into two equal groups with nothing left over. 4 is even: 2 and 2." },
    { h: "Odd numbers", v: "🍎🍎 🍎🍎 🍎 &nbsp;= 5", t: "A number is <b>odd</b> if there's one left over. 5 is odd: 2 and 2 with 1 extra." },
    { h: "The last-digit trick", v: "0 2 4 6 8 = even", t: "Look only at the <b>last digit</b>. If it's 0, 2, 4, 6 or 8 the number is even. If it's 1, 3, 5, 7 or 9 it's odd. That works for any size number!" }
  ],
  wordAdd: () => [
    { h: "Read the story", v: "📖", t: "Story problems tell a little story. Read it slowly and find the <b>numbers</b>. Ask: what is happening?" },
    { h: "Getting more means add", v: "Sam has 2 ⭐ and gets 1 more", t: "When someone <b>gets more</b>, you <b>add</b>. 2 + 1 = 3. Sam has <b>3</b> stars." },
    { h: "Write a number sentence", v: "2 + 1 = 3", t: "First write the numbers and the + sign. Then solve it. Always check that your answer makes sense in the story!" }
  ],
  wordSub: () => [
    { h: "Read the story", v: "📖", t: "Story problems tell a little story. Read it slowly and find the <b>numbers</b>. Ask: what is happening?" },
    { h: "Going away means take away", v: "Zoe has 5 ⭐ and gives 2 away", t: "When some <b>go away</b>, you <b>take away</b>. 5 − 2 = 3. Zoe has <b>3</b> stars left." },
    { h: "Write a number sentence", v: "5 − 2 = 3", t: "First write the numbers and the − sign. Then solve it. Check that your answer makes sense in the story!" }
  ],
  placeValue: () => [
    { h: "Tens and ones", v: "🟦 = ten &nbsp; 🟨 = one", t: "Big numbers are made of <b>tens</b> and <b>ones</b>. A blue square is a group of <b>10</b>. A yellow square is just <b>1</b>." },
    { h: "Build a number", v: "🟦🟦 🟨🟨🟨", t: "2 tens and 3 ones. Count by tens: <b>10, 20</b>. Then add the ones: <b>21, 22, 23</b>. The number is <b>23</b>." },
    { h: "Read the digits", v: "23 → 2 tens, 3 ones", t: "In 23 the <b>2</b> is in the tens place and the <b>3</b> is in the ones place. The digit's place tells you what it's worth!" }
  ],
  tenMore: (max, more) => [
    { h: "Tens go up and down", v: more ? "23 → 33" : "47 → 37", t: `${more ? "10 more means adding one more ten." : "10 less means taking away one ten."} Look at the number's <b>tens digit</b>.` },
    { h: "Only the tens digit changes", v: more ? "<b>2</b>3 → <b>3</b>3" : "<b>4</b>7 → <b>3</b>7", t: `The tens digit goes ${more ? "up" : "down"} by 1. The <b>ones digit stays the same</b>.` },
    { h: "Pattern", v: more ? "5, 15, 25, 35" : "45, 35, 25, 15", t: "Go up or down by tens and the ones digit never changes. Cool pattern!" }
  ],
  addTens: () => [
    { h: "Tens are groups of 10", v: "🟦🟦 + 🟦🟦🟦", t: "20 is <b>2 tens</b>. 30 is <b>3 tens</b>. Adding tens is just like adding small numbers!" },
    { h: "Add the tens", v: "2 tens + 3 tens = 5 tens", t: "2 + 3 = 5, so 2 tens + 3 tens = <b>5 tens</b>. And 5 tens is <b>50</b>. So 20 + 30 = 50." },
    { h: "Your trick", v: "💡", t: "Cover the zeros, add the small numbers, then put the zero back!" }
  ],
  subTens: () => [
    { h: "Tens are groups of 10", v: "🟦🟦🟦🟦🟦 − 🟦🟦", t: "50 is <b>5 tens</b>. 20 is <b>2 tens</b>. Subtracting tens is like subtracting small numbers!" },
    { h: "Take away the tens", v: "5 tens − 2 tens = 3 tens", t: "5 − 2 = 3, so 5 tens − 2 tens = <b>3 tens</b>. And 3 tens is <b>30</b>. So 50 − 20 = 30." },
    { h: "Your trick", v: "💡", t: "Cover the zeros, subtract the small numbers, then put the zero back!" }
  ],
  add2: () => [
    { h: "Split into tens and ones", v: "21 = 20 + 1 &nbsp; 14 = 10 + 4", t: "To add big numbers, break each one into <b>tens</b> and <b>ones</b>." },
    { h: "Add the ones, then the tens", v: "1 + 4 = 5 &nbsp; 20 + 10 = 30", t: "Ones: 1 + 4 = <b>5</b>. Tens: 20 + 10 = <b>30</b>." },
    { h: "Put them together", v: "30 + 5 = 35", t: "So 21 + 14 = <b>35</b>. Adding the ones and tens separately makes it easy!" }
  ],
  sub2: () => [
    { h: "Split into tens and ones", v: "47 = 40 + 7 &nbsp; 25 = 20 + 5", t: "To subtract big numbers, break each one into <b>tens</b> and <b>ones</b>." },
    { h: "Subtract the ones, then the tens", v: "7 − 5 = 2 &nbsp; 40 − 20 = 20", t: "Ones: 7 − 5 = <b>2</b>. Tens: 40 − 20 = <b>20</b>." },
    { h: "Put them together", v: "20 + 2 = 22", t: "So 47 − 25 = <b>22</b>. Check by adding back: 22 + 25 = 47 ✅" }
  ],
  groups: per => [
    { h: "Equal groups", v: Array.from({ length: 3 }, () => "🍎".repeat(per)).join(" | "), t: `Equal groups means every group has the <b>same</b> number. Here there are <b>3 groups</b> with <b>${per}</b> in each.` },
    { h: "Add them up", v: Array.from({ length: 3 }, () => per).join(" + "), t: `Adding the same number again and again is called <b>repeated addition</b>. 3 groups of ${per}: ${Array.from({ length: 3 }, () => per).join(" + ")} = <b>${per * 3}</b>.` },
    { h: "Remember", v: "👥", t: "How many groups? How many in each? Add the group size once for each group." }
  ],
  times: k => [
    { h: "What does × mean?", v: "3 × " + k + " = 3 groups of " + k, t: "The <b>×</b> sign means <b>equal groups</b>. 3 × " + k + " means 3 groups with " + k + " in each." },
    { h: "Count by " + k + "s", v: Array.from({ length: 5 }, (_, i) => k * (i + 1)).join(", "), t: `Counting by ${k}s is the same as times ${k}. 3 × ${k}: count by ${k}s three times: <b>${k}, ${2 * k}, ${3 * k}</b>.` },
    { h: "A pattern to remember", v: "✨", t: k === 2 ? "Times 2 is just doubling! Every answer is even." : k === 5 ? "Times 5 always ends in 5 or 0." : "Times 10 just puts a <b>0</b> after the number: 4 × 10 = 40." }
  ],
  half: () => [
    { h: "What is half?", v: "🍎🍎🍎🍎 | 🍎🍎🍎🍎", t: "Half means splitting something into <b>2 equal groups</b>. 8 apples split into 2 equal groups is 4 and 4. <b>Half of 8 is 4</b>." },
    { h: "Use doubles", v: "4 + 4 = 8", t: "To find half, ask: <b>what number plus itself makes this number?</b> 4 + 4 = 8, so half of 8 is 4." },
    { h: "Halving", v: "✂️", t: "Half is the opposite of doubling. Double 4 is 8, and half of 8 is 4." }
  ]
};

// Attach the right teaching slides to every question maker.
for (const key of Object.keys(MQ)) {
  if (key === "mixed") continue;
  const orig = MQ[key];
  MQ[key] = (...args) => {
    const f = orig(...args);
    f.teach = () => TEACH[key](...args);
    return f;
  };
}
// A mixed lesson reviews each idea it uses, one slide each.
MQ.mixed = (...makers) => {
  const f = easy => pick(makers)(easy);
  f.teach = () => {
    const slides = [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here's a quick reminder of each idea, then the quiz." }];
    makers.forEach(m => { if (m.teach) slides.push(m.teach()[0]); });
    return slides;
  };
  return f;
};

const L = (title, make) => ({ title, make });

const MATH_LEVELS = {
  1: [ // 1st grade, first half: numbers to 10
    L("Counting to 5", MQ.count(5)), L("Counting to 10", MQ.count(10)),
    L("What comes after?", MQ.nextTo(9, "after")), L("What comes before?", MQ.nextTo(10, "before")),
    L("Which is bigger?", MQ.compare(10, "bigger")), L("Which is smaller?", MQ.compare(10, "smaller")),
    L("Adding to 5", MQ.add(5)), L("Adding to 10", MQ.add(10)),
    L("Taking away to 5", MQ.sub(5)), L("Taking away to 10", MQ.sub(10)),
    L("Adding story problems", MQ.wordAdd(6)), L("Taking away story problems", MQ.wordSub(8)),
    L("Make 10", MQ.make10()), L("Doubles", MQ.doubles(5)),
    L("The missing number", MQ.missing(10)), L("Even or odd?", MQ.evenOdd(10)),
    L("Counting to 20", MQ.count(20)), L("Count by 2s", MQ.skip(2)),
    L("Mixed practice", MQ.mixed(MQ.add(10), MQ.sub(10))), L("Level 1 Challenge", MQ.mixed(MQ.add(10), MQ.sub(10), MQ.make10(), MQ.compare(10, "bigger"), MQ.wordAdd(8)))
  ],
  2: [ // 1st grade, second half: numbers to 20
    L("Adding to 20", MQ.add(20)), L("Taking away from 20", MQ.sub(20)),
    L("Teen numbers", MQ.placeValue(1)), L("Doubles to 10", MQ.doubles(10)),
    L("The missing number to 20", MQ.missing(20)), L("Adding story problems to 20", MQ.wordAdd(20)),
    L("Taking away story problems to 20", MQ.wordSub(20)), L("Count by 10s", MQ.skip(10)),
    L("Count by 5s", MQ.skip(5)), L("Count by 2s to 20", MQ.skip(2)),
    L("Which is bigger? (to 20)", MQ.compare(20, "bigger")), L("Which is smaller? (to 20)", MQ.compare(20, "smaller")),
    L("Even or odd? (to 20)", MQ.evenOdd(20)), L("What comes after? (to 20)", MQ.nextTo(20, "after")),
    L("What comes before? (to 20)", MQ.nextTo(20, "before")), L("Make 10 again", MQ.make10()),
    L("Tens and ones to 50", MQ.placeValue(5)), L("10 more", MQ.tenMore(40, true)),
    L("Mixed practice", MQ.mixed(MQ.add(20), MQ.sub(20), MQ.missing(20))), L("Level 2 Challenge", MQ.mixed(MQ.add(20), MQ.sub(20), MQ.wordAdd(20), MQ.wordSub(20), MQ.placeValue(5), MQ.doubles(10)))
  ],
  3: [ // 2nd grade, first half: numbers to 100
    L("Tens and ones to 99", MQ.placeValue(9)), L("Adding tens", MQ.addTens()),
    L("Taking away tens", MQ.subTens()), L("Adding 2-digit numbers", MQ.add2()),
    L("Taking away 2-digit numbers", MQ.sub2()), L("10 more", MQ.tenMore(99, true)),
    L("10 less", MQ.tenMore(99, false)), L("Which is bigger? (to 99)", MQ.compare(99, "bigger")),
    L("Which is smaller? (to 99)", MQ.compare(99, "smaller")), L("Count by 5s to 100", MQ.skip(5)),
    L("Count by 10s to 100", MQ.skip(10)), L("Count by 2s to 100", MQ.skip(2)),
    L("Even or odd? (to 99)", MQ.evenOdd(99)), L("Adding story problems (big)", MQ.wordAdd(40)),
    L("Taking away story problems (big)", MQ.wordSub(50)), L("Equal groups of 2", MQ.groups(2)),
    L("Times 2", MQ.times(2)), L("Times 5", MQ.times(5)),
    L("Times 10", MQ.times(10)), L("Half of a number", MQ.half())
  ]
};
