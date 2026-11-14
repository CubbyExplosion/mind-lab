// ext/coding-7-9.js  Mind Lab Coding levels 7-9 (60 lessons, unplugged pseudo-code)
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const mix = (...ms) => () => pick(ms)();
  const MIXS = t => [
    S("Review time!", "🔄", "This lesson mixes ideas you already know. Take your time and think about each one."),
    S("Remember", "🧠", t),
    S("Tip", "💡", "Go slowly. Trace the code one line at a time and write down the numbers as you go.")
  ];
  const ind = n => "&nbsp;&nbsp;&nbsp;".repeat(n);
  const code = lines => `<div style="text-align:left;display:inline-block;font-family:monospace;background:#eef2ff;color:#1a2a55;padding:8px 14px;border-radius:10px;line-height:1.5">${lines.join("<br>")}</div>`;
  const numChoices = (a, spread) => {
    const s = new Set([a]); let t = 0;
    while (s.size < 4 && t++ < 200) { const d = a + ri(-spread, spread); if (d !== a && d >= 0) s.add(d); }
    return shuf([...s]);
  };
  const nk = x => String(x).toLowerCase().replace(/[^a-z0-9]/g, "");
  const strChoices = (right, wrongs) => { const seen = new Set([nk(right)]), out = []; for (const w of wrongs) { if (!seen.has(nk(w))) { seen.add(nk(w)); out.push(w); } } return shuf([right, ...out.slice(0, 3)]); };
  const num = (text, answer, hints, visual) => ({ text, visual, answer, hints });
  const txt = (text, answer, hints, visual) => ({ text, visual, textInput: true, answer, hints });
  const mc = (text, right, wrongs, hints, visual) => ({ text, visual, choices: strChoices(right, wrongs), answer: right, hints });
  const nc = (text, answer, spread, hints, visual) => ({ text, visual, choices: numChoices(answer, spread), answer, hints });
  const lst = a => "[" + a.join(", ") + "]";
  const uniq = (n, lo, hi) => shuf(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, n);

  const facts = (items, nudge, example) => () => {
    const [q, r, w, c, v] = pick(items);
    return { text: q, visual: v, choices: strChoices(r, w), answer: r, hints: [nudge, c, example] };
  };

  // =====================================================================
  // LEVEL 7
  // =====================================================================
  const swapQ = () => {
    let a = ri(1, 30), b = ri(1, 30); while (a === b) b = ri(1, 30);
    const ask = pick(["a", "b", "temp"]);
    const ans = ask === "b" ? a : ask === "a" ? b : a;
    return num(`After all five lines run, what is <b>${ask}</b>?`, ans, [
      "Write each box on paper. Change only the box on the left of the = sign, one line at a time.",
      "The box named temp keeps a safe copy, so a number is not lost when a box gets a new value.",
      "Example: a = 100, b = 200. temp = a makes temp 100. a = b makes a 200. b = temp makes b 100. The two boxes traded. Now do yours."
    ], code([`a = ${a}`, `b = ${b}`, "temp = a", "a = b", "b = temp"]));
  };

  const forSum = () => {
    const a = ri(1, 3), b = a + ri(2, 4); let s = 0; for (let i = a; i <= b; i++) s += i;
    return num(`What is <b>total</b> when the loop is finished?`, s, [
      "The loop runs once for every value of i. Add each value of i to total.",
      "i starts at the first number and goes up by one each time, and it includes the last number too.",
      "Example: for i from 10 to 12, total = 0 + 10 = 10, then 10 + 11 = 21, then 21 + 12 = 33. Now do yours."
    ], code(["total = 0", `for i from ${a} to ${b}:`, ind(1) + "total = total + i"]));
  };

  const nestIf = () => {
    const a = ri(3, 9), b = ri(3, 9), x = ri(1, 14), y = ri(1, 14);
    const out = x > a ? (y > b ? "Gold" : "Silver") : "Bronze";
    return mc(`Here x = ${x} and y = ${y}. What does the program print?`, out, ["Gold", "Silver", "Bronze"], [
      "Start with the outer IF. Only if it is true do you even look at the inner IF.",
      "If the outer test fails, jump straight to the outer ELSE and skip everything inside.",
      "Example: x = 1, y = 100 with IF x &gt; 5 then (IF y &gt; 50 print A, ELSE print B), ELSE print C. The outer test is false, so it prints C, even though y is big. Now do yours."
    ], code([`IF x &gt; ${a}:`, ind(1) + `IF y &gt; ${b}: print "Gold"`, ind(1) + `ELSE: print "Silver"`, `ELSE: print "Bronze"`]));
  };

  const POOLS = [["cat", "dog", "fish", "bird", "frog", "horse", "mouse", "duck"], ["pizza", "apple", "bread", "cheese", "rice", "soup", "pasta", "grape"], ["Mars", "Venus", "Earth", "Saturn", "Jupiter", "Mercury", "Neptune"], ["soccer", "tennis", "hockey", "karate", "rugby", "baseball"]];
  const listIndex = () => {
    const items = shuf(pick(POOLS)).slice(0, 5), i = ri(0, 4);
    return mc(`Lists count from 0. What is <b>items[${i}]</b>?`, items[i], items.filter((_, k) => k !== i), [
      "The first item is number 0, not number 1. Point at it and count up from there.",
      "The number in the square brackets tells you how many steps to move from the first item.",
      `Example: colors = ["red", "green", "blue"]. colors[0] is "red", colors[1] is "green", colors[2] is "blue". Now do yours.`
    ], code([`items = [${items.map(w => `"${w}"`).join(", ")}]`]));
  };

  const listLen = () => {
    if (Math.random() < 0.5) {
      const n = ri(4, 12), a = Array.from({ length: n }, () => ri(1, 9));
      return num(`The list has ${n} items. What is the index of the <b>last</b> item?`, n - 1, [
        "Index numbers start at 0, so the last index is not the same as the number of items.",
        "The last index is always one less than the length of the list.",
        "Example: a list of 3 items has the indexes 0, 1 and 2, so its last index is 2. Now do yours."
      ], code([`list = ${lst(a)}`]));
    }
    const k = ri(4, 12);
    return num(`The last index of a list is ${k}. How many items does the list have?`, k + 1, [
      "Index numbers start at 0. So the first item has been counted by 0.",
      "The length is always one more than the last index.",
      "Example: if the last index is 2, the indexes are 0, 1, 2, which makes 3 items. Now do yours."
    ]);
  };

  const listOps = () => {
    for (;;) {
      const a = uniq(3, 1, 9), lines = [`list = ${lst(a)}`], cur = a.slice();
      for (let i = 0; i < 3; i++) {
        const k = pick(["append", "removeLast", "front", "removeFirst"]);
        if ((k === "removeLast" || k === "removeFirst") && cur.length < 2) continue;
        const v = ri(10, 20);
        if (k === "append") { cur.push(v); lines.push(`append(list, ${v})`); }
        else if (k === "front") { cur.unshift(v); lines.push(`insert ${v} at the front`); }
        else if (k === "removeLast") { cur.pop(); lines.push("remove the last item"); }
        else { cur.shift(); lines.push("remove the first item"); }
      }
      const ask = pick(["first", "last", "length"]);
      const ans = ask === "first" ? cur[0] : ask === "last" ? cur[cur.length - 1] : cur.length;
      const t = ask === "length" ? "How many items are in the list at the end?" : `What is the ${ask} item of the list at the end?`;
      return num(t, ans, [
        "Write the list after every line. Do not skip a line.",
        "Append and insert make the list longer. The two remove lines make it shorter.",
        "Example: list = [10, 20]. append 30 gives [10, 20, 30]. Remove the first item gives [20, 30]. Now do yours."
      ], code(lines));
    }
  };

  const modQ = () => {
    const b = ri(2, 9), a = ri(b + 3, 60), ans = a % b;
    const ex = pick([[50, 7], [83, 9], [29, 4], [44, 6], [71, 8], [37, 5]].filter(e => e[0] % e[1] !== ans));
    return num(`What is <b>${a} mod ${b}</b>?`, ans, [
      "mod gives the leftover after you divide. Think of sharing things into equal groups.",
      "Find the biggest multiple that fits without going over. Then see how much is left.",
      `Example: ${ex[0]} mod ${ex[1]}. ${ex[1]} fits ${Math.floor(ex[0] / ex[1])} times (that makes ${ex[1] * Math.floor(ex[0] / ex[1])}), and ${ex[0] % ex[1]} is left over. Now do yours.`
    ]);
  };

  const modUse = () => {
    if (Math.random() < 0.5) {
      const k = ri(3, 9);
      for (;;) {
        const ans = k * ri(2, 11), others = [];
        while (others.length < 3) { const v = ri(10, 90); if (v % k !== 0 && !others.includes(v)) others.push(v); }
        if (ans < 10) continue;
        return {
          text: `Which number gives <b>0</b> when you do <i>n</i> mod ${k}?`, choices: shuf([ans, ...others]), answer: ans, hints: [
            "A leftover of 0 means the number divides evenly, with nothing left over.",
            "Count by the number after mod: its times table. Which choice is on that list?",
            "Example: n mod 5 = 0 for 10, 15 and 20, because they are all in the 5 times table. Now do yours."]
        };
      }
    }
    const k = ri(3, 7), r = ri(1, k - 1);
    const ans = k * ri(2, 9) + r, others = [];
    while (others.length < 3) { const v = ri(8, 70); if (v % k !== r && !others.includes(v)) others.push(v); }
    return {
      text: `Which number gives <b>${r}</b> when you do <i>n</i> mod ${k}?`, choices: shuf([ans, ...others]), answer: ans, hints: [
        "Divide each choice and look at the leftover only.",
        "The right number is a multiple of the number after mod, plus the leftover.",
        "Example: n mod 4 = 3 for 7, 11 and 15, because each one is a multiple of 4 plus 3. Now do yours."]
    };
  };

  const rangeQ = () => {
    const a = ri(2, 8), b = a + ri(3, 8), x = ri(1, 18), y = ri(1, 18), c = ri(3, 12);
    const T = [
      [`(x &gt; ${a}) AND (x &lt; ${b})`, x > a && x < b],
      [`(x &lt; ${a}) OR (y &gt; ${c})`, x < a || y > c],
      [`NOT (x &gt; ${a})`, !(x > a)],
      [`(x &gt; ${a}) AND (y &gt; ${c})`, x > a && y > c],
      [`(x == ${a}) OR (y == ${c})`, x === a || y === c],
      [`NOT ((x &lt; ${b}) AND (y &lt; ${c}))`, !(x < b && y < c)]
    ];
    const [e, r] = pick(T), ans = r ? "true" : "false";
    const ex = r ? "n = 100: (n &gt; 50) AND (n &lt; 80) becomes true AND false, which is false." : "n = 60: (n &gt; 50) AND (n &lt; 80) becomes true AND true, which is true.";
    return mc(`With x = ${x} and y = ${y}, is this true or false?<br><b>${e}</b>`, ans, ["true", "false"].filter(z => z !== ans), [
      "Work out each small test in the brackets first. Write true or false under each one.",
      "AND needs both sides true. OR needs at least one side true. NOT flips the answer.",
      `Example: ${ex} Now do yours.`
    ]);
  };

  const funcLoop = () => {
    const F = [["n * n", n => n * n], ["n * 2 + 1", n => n * 2 + 1], ["n * 3", n => n * 3], ["n + 10", n => n + 10]];
    const [e, f] = pick(F), k = ri(3, 5); let t = 0; for (let i = 1; i <= k; i++) t += f(i);
    return num("What is <b>total</b> at the end?", t, [
      "The loop calls the function once for each value of i. Work out each answer, then add it on.",
      "Put the value of i in place of n inside the function, and then add the result to total.",
      "Example: f(n) returns n + 5, loop i from 1 to 2. total = 0 + f(1) = 6, then 6 + f(2) = 13. Now do yours."
    ], code([`function f(n): return ${e}`, "total = 0", `for i from 1 to ${k}:`, ind(1) + "total = total + f(i)"]));
  };

  const loopStep = () => {
    const a = ri(1, 5), s = ri(2, 5), b = a + s * ri(3, 7) + ri(0, s - 1), cnt = Math.floor((b - a) / s) + 1, last = a + s * (cnt - 1);
    const ask = Math.random() < 0.5;
    return num(ask ? "How many numbers does this loop print?" : "What is the <b>last</b> number it prints?", ask ? cnt : last, [
      "The loop does not go up by one. Each time, i jumps by the step size.",
      "List the numbers it prints: start, then keep adding the step until you would pass the end.",
      "Example: for i from 100 to 130 step 10 prints 100, 110, 120, 130: four numbers, and the last is 130. Now do yours."
    ], code([`for i from ${a} to ${b} step ${s}:`, ind(1) + "print i"]));
  };

  const bitsQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(2, 8); return num(`How many different patterns can <b>${n} bits</b> make?`, 2 ** n, [
      "Each bit has two choices, 0 or 1. Every extra bit doubles the number of patterns.",
      "Start with one bit (two patterns) and double once for every extra bit.",
      "Example: 1 bit makes 2 patterns, 2 bits make 4, 3 bits make 8. Now do yours."]); }
    if (t === 1) { const n = ri(2, 12); return num(`One <b>byte</b> is 8 bits. How many bits are in ${n} bytes?`, 8 * n, [
      "Every byte holds the same number of bits. How many groups do you have?",
      "Multiply the number of bytes by the bits in one byte.",
      "Example: 3 bytes have 3 groups of 8 bits, so 24 bits. Now do yours."]); }
    const n = ri(2, 6), v = 2 ** n;
    return nc(`A game has ${n} on/off switches. Each switch is 1 bit. Add one more switch: how many patterns now?`, v * 2, 8, [
      "Think about what one extra bit does to the number of patterns.",
      "Each extra bit doubles it.",
      "Example: with 3 bits there are 8 patterns. With 4 bits there are twice as many, 16. Now do yours."]);
  };

  const starsQ = () => {
    if (Math.random() < 0.5) {
      const r = ri(2, 7), c = ri(2, 7);
      return num("How many ⭐ does this code print in total?", r * c, [
        "The inner loop runs completely every time the outer loop runs once.",
        "Stars in one row times the number of rows.",
        "Example: 3 rows of 4 stars is 3 × 4 = 12 stars. Now do yours."
      ], code([`for row from 1 to ${r}:`, ind(1) + `for col from 1 to ${c}:`, ind(2) + "print ⭐"]));
    }
    const r = ri(3, 6);
    return num("How many ⭐ does this code print in total? (Row 1 has one star.)", r * (r + 1) / 2, [
      "The inner loop runs as many times as the number of the row.",
      "Row 1 prints a few stars, row 2 prints a few more. Add up all the rows.",
      "Example: 3 rows print 1 + 2 + 3 = 6 stars. Now do yours."
    ], code([`for row from 1 to ${r}:`, ind(1) + "for col from 1 to row:", ind(2) + "print ⭐"]));
  };

  const FLOW = facts([
    ["In a flowchart, which shape asks a yes/no question?", "a diamond", ["an oval", "a rectangle"], "It is the shape where the path splits into two ways.", "◇"],
    ["Which flowchart shape marks the start and the end?", "an oval", ["a diamond", "a rectangle"], "It has rounded ends, like a pill.", "⬭"],
    ["Which shape holds one step, like add 1 to score?", "a rectangle", ["a diamond", "an oval"], "It is the plain box for doing something.", "▭"],
    ["What do the arrows in a flowchart show?", "the order of the steps", ["the color of the steps", "how big each step is"], "Follow them and you know what comes next."],
    ["A diamond has two arrows leaving it. How are they usually labeled?", "yes and no", ["start and end", "up and down"], "They answer the question inside the shape.", "◇"],
    ["A flowchart arrow goes back to an earlier step. What does this make?", "a loop", ["a bug", "a comment"], "The same steps will be done again and again."],
    ["What is a flowchart?", "a picture of an algorithm", ["a list of passwords", "a type of battery"], "It draws the steps with shapes and arrows."],
    ["Why do programmers draw flowcharts?", "to plan the steps before coding", ["to make the computer faster", "to hide bugs"], "It helps you think before you type."],
    ["Which question belongs inside a diamond?", "Is the score over 10?", ["Add 1 to score", "Start"], "A diamond holds something you can answer with yes or no.", "◇"]
  ], "Think about what each shape is used for.", "Example: in a flowchart for brushing teeth, \"Teeth clean?\" goes in the shape with two ways out. Now do yours.");

  const newBest = () => {
    for (;;) {
      const a = Array.from({ length: 6 }, () => ri(1, 30));
      if (new Set(a).size < 6) continue;
      let best = a[0], c = 0; for (const v of a.slice(1)) if (v > best) { best = v; c++; }
      return num("How many times does <b>best</b> change after the first line?", c, [
        "best starts as the first number. It only changes when a bigger number shows up.",
        "Walk down the list. Each time an item beats the current best, count one change.",
        "Example: [20, 30, 25, 40, 50]. 30 beats 20 (1), 25 does not, 40 beats 30 (2), 50 beats 40 (3). That is 3 changes. Now do yours."
      ], code([`list = ${lst(a)}`, "best = list[0]", "for each item in list:", ind(1) + "IF item &gt; best:", ind(2) + "best = item"]));
    }
  };

  const boundary = () => {
    const T = ri(5, 30), k = ri(0, 2);
    const G = [["at least", ">=", ">", "Pass"], ["fewer than", "<", "<=", "Small"], ["more than", ">", ">=", "Big"]][k];
    const bad = G[2].replace(">", "&gt;").replace("<", "&lt;");
    return {
      text: `Goal: print "${G[3]}" if the number is ${G[0]} ${T}. The code says <b>IF n ${bad} ${T}</b>. For which n does the code give the wrong answer?`,
      choices: shuf([T, T - 4, T + 3, T + 8]), answer: T, hints: [
        "A bug like this hides where the number is exactly equal to the one in the test.",
        "Compare what the goal wants with what the symbol does at the border number.",
        "Example: goal is 'at least 10', code says n &gt; 10. At n = 10 the goal says yes but the code says no. The border number is where it goes wrong. Now do yours."]
    };
  };

  const NAMES = facts([
    ["Which is the best name for a box holding the number of lives?", "lives", ["x", "thing"], "A good name tells you what the box is for.", "📦"],
    ["What is a comment in code?", "a note for people that the computer skips", ["a command that runs twice", "an error"], "It is written for readers, not for the computer."],
    ["Why use clear names like playerScore?", "so people can read the code", ["so the code runs faster", "so the computer is happy"], "Think about who reads code later."],
    ["Which name is clearest for the speed of a car?", "carSpeed", ["cs", "zzz"], "You should understand it without guessing."],
    ["Which is the best comment for a line that adds a point?", "Add 1 point when the star is touched", ["asdf", "Hmm"], "A good comment explains why or what."],
    ["Does the computer run the words in a comment?", "no, it skips them", ["yes, it reads them out", "yes, it runs them twice"], "Comments are only for people."],
    ["Why do we push (indent) lines inside a loop to the right?", "to show which lines belong inside", ["to make the loop faster", "to hide the lines"], "It makes the shape of the code easy to see."],
    ["Which name is the best for a list of pet names?", "petNames", ["list1", "a"], "Pick the one that says what is in the list."],
    ["You come back to your code after a week. What helps most?", "clear names and comments", ["very short names", "no spaces at all"], "Your future self has to understand it."]
  ], "Think about someone reading your code for the first time.", "Example: a box called timeLeft is much clearer than a box called t. Now do yours.");

  const LANG = facts([
    ["Which of these is a coding language?", "Python", ["Pencil", "Marker"], "Programmers write programs in these.", "💻"],
    ["Scratch builds programs from what?", "colorful blocks you snap together", ["only long essays", "music notes"], "You drag pieces and fit them together.", "🧩"],
    ["Why do programmers use a coding language?", "to give a computer clear instructions", ["to make the screen bigger", "to charge the battery"], "A computer needs steps it can follow."],
    ["What is a syntax error?", "a mistake in the spelling or rules of the code", ["a computer that is too hot", "a slow internet"], "Every language has strict rules for how to write it."],
    ["What is HTML used for?", "building the parts of a web page", ["adding numbers only", "charging a phone"], "Think about what you see in a browser.", "🌐"],
    ["Which of these is a text-based language, not made of blocks?", "JavaScript", ["Scratch", "a flowchart"], "You have to type the code with a keyboard.", "⌨️"],
    ["A computer only understands 1s and 0s. What turns your code into that?", "a compiler or interpreter", ["a keyboard", "a mouse"], "It is a translator program."],
    ["Why are there many coding languages?", "different ones are good for different jobs", ["because computers get bored", "so nobody can learn them"], "Think of tools in a toolbox."],
    ["What do we call fixing the mistakes in a program?", "debugging", ["compiling", "saving"], "It is hunting for bugs.", "🐛"]
  ], "Think about how a person tells a computer what to do.", "Example: a recipe is written in a language the cook understands. Code is written in a language the computer can follow. Now do yours.");

  const L7 = [
    L("Swap two boxes", swapQ, [S("Swapping", "🔄", "How do you trade the numbers in two boxes? If you copy one over the other, the first number is lost!"), S("Use a helper", "📦📦📦", "A third box called <b>temp</b> keeps a safe copy of the first number while you do the trade."), S("Example", "a = 100, b = 200", "temp = a, a = b, b = temp. Now a is 200 and b is 100.")]),
    L("Sum with a for loop", forSum, [S("For loops", "🔁", "<b>for i from 1 to 4</b> runs the lines inside four times. The helper i is 1, then 2, then 3, then 4."), S("Collecting", "🧮", "Start a box called total at 0. Each time round the loop, add the new i to it."), S("Example", "i from 1 to 3", "total: 0, then 1, then 3, then 6.")]),
    L("IF inside IF", nestIf, [S("Nesting", "🪆", "You can put an IF <b>inside</b> another IF, like a small box inside a big box."), S("Outer first", "1️⃣", "Check the outer test first. If it is false, skip everything inside it and go to its ELSE."), S("Tip", "💡", "Trace with your finger: outer test, then the inner test only if you got inside.")]),
    L("Lists start at zero", listIndex, [S("Index", "🔢", "Every item in a list has an <b>index</b>, its position number. Computers start counting at <b>0</b>."), S("Example", `["cat","dog","fish"]`, "cat is at index 0, dog is at index 1, fish is at index 2."), S("Tip", "💡", "To get the 3rd item, ask for index 2.")]),
    L("Length and last index", listLen, [S("Length", "📏", "The <b>length</b> of a list is how many items it has."), S("Last index", "🔚", "Because we start at 0, the last index is always <b>length minus 1</b>."), S("Example", "5 items", "The indexes are 0, 1, 2, 3, 4. The last index is 4.")]),
    L("Changing a list", listOps, [S("Growing", "➕", "<b>append</b> adds a new item to the end of a list. You can also insert at the front."), S("Shrinking", "➖", "You can remove the last item or the first item. The list gets shorter."), S("Tip", "💡", "Write the whole list again after every line. It is easy to lose track.")]),
    L("Remainders (mod)", modQ, [S("What is mod?", "➗", "<b>a mod b</b> is the leftover after dividing a by b."), S("Example", "17 mod 5", "5 fits 3 times (that is 15). 2 is left over. So 17 mod 5 = 2."), S("Tip", "💡", "The answer is always smaller than the number after mod.")]),
    L("Using mod", modUse, [S("Even or odd", "2️⃣", "<b>n mod 2</b> is 0 for even numbers and 1 for odd numbers. Programs use this all the time."), S("Every third", "3️⃣", "<b>n mod 3 = 0</b> is true for 3, 6, 9, 12 and so on. It picks every third number."), S("Tip", "💡", "mod = 0 means that the number divides evenly.")]),
    L("Range checks", rangeQ, [S("Between", "↔️", "To check that x is between two numbers, join two tests with AND: (x &gt; 3) AND (x &lt; 8)."), S("Either", "🔀", "With OR only one test needs to pass. NOT flips the answer."), S("Tip", "💡", "Work out each small test first, then combine them.")]),
    L("Functions in loops", funcLoop, [S("Calls inside loops", "⚙️🔁", "A loop can call a function again and again, giving it a new value each time."), S("Example", "f(n) returns n × 2", "Loop i from 1 to 3 calls f(1), f(2), f(3): 2, 4, 6."), S("Tip", "💡", "Work out one call at a time, then add it to total.")]),
    L("Counting by steps", loopStep, [S("Steps", "👣", "A loop can jump by more than 1. <b>step 3</b> means i goes up by 3 each time."), S("Example", "from 2 to 11 step 3", "It prints 2, 5, 8, 11."), S("Tip", "💡", "Stop when the next number would go past the end.")]),
    L("Bits and bytes", bitsQ, [S("Bits", "0️⃣1️⃣", "A <b>bit</b> is one on/off switch: 0 or 1. A <b>byte</b> is 8 bits."), S("Patterns", "2 4 8 16", "1 bit makes 2 patterns. Every extra bit doubles the count: 2, 4, 8, 16, and so on."), S("Tip", "💡", "Doubling is the secret of bits.")]),
    L("Loops in loops", starsQ, [S("Nested loops", "🔁🔁", "A loop inside a loop is a <b>nested loop</b>. The inner loop runs fully each time the outer loop goes round once."), S("Rows and columns", "⭐⭐⭐<br>⭐⭐⭐", "2 rows of 3 stars: the outer loop makes the rows, the inner loop makes the stars in a row."), S("Tip", "💡", "Total = outer count × inner count, unless the inner count changes.")]),
    L("Flowcharts", FLOW, [S("Pictures of steps", "🗺️", "A <b>flowchart</b> draws an algorithm with shapes and arrows."), S("Shapes", "⬭ ▭ ◇", "Oval = start or end. Rectangle = a step. Diamond = a yes/no question."), S("Tip", "💡", "Arrows tell you the order. A diamond has two ways out.")]),
    L("Finding new records", newBest, [S("Running best", "🏆", "A box called <b>best</b> remembers the biggest number seen so far."), S("Update", "🔼", "When an item beats best, best takes the new value. Otherwise nothing changes."), S("Example", "[3, 9, 4]", "best: 3, then 9 (changed), then still 9.")]),
    L("Border bugs", boundary, [S("Borders", "🚧", "Many bugs hide at the border number, the exact number in the test."), S("Symbols", "&lt; ≤ &gt; ≥", "&gt; means more than. ≥ means at least. They treat the border number differently."), S("Tip", "💡", "Always test the border number itself.")]),
    L("Clear names and comments", NAMES, [S("Names", "🏷️", "Good names tell what a box is for: <b>lives</b>, not x."), S("Comments", "📝", "A <b>comment</b> is a note for people. The computer skips it."), S("Tip", "💡", "Write code that your future self can understand.")]),
    L("Coding languages", LANG, [S("Languages", "🗣️", "People write programs in coding languages like Scratch, Python and JavaScript."), S("Blocks and text", "🧩⌨️", "Scratch uses blocks you snap together. Python and JavaScript use typed text."), S("Translating", "🔁", "A computer only understands 1s and 0s, so a translator program changes your code into those.")])
  ];
  const M7 = [swapQ, forSum, nestIf, listIndex, listLen, listOps, modQ, modUse, rangeQ, funcLoop, loopStep, bitsQ, starsQ, FLOW, newBest, boundary, NAMES, LANG];
  L7.push(L("Mixed practice", mix(swapQ, forSum, nestIf, listIndex, listOps, modQ, modUse, rangeQ, funcLoop, starsQ), MIXS("swapping, for loops, IF inside IF, lists and indexes, mod, range checks, functions in loops and nested loops.")));
  L7.push(L("Level 7 Challenge", mix(...M7), MIXS("everything from level 7: loops, lists, mod, bits, flowcharts, border bugs, names and coding languages.")));

  // =====================================================================
  // LEVEL 8
  // =====================================================================
  const scopeQ = () => {
    const a = ri(2, 9), b = ri(10, 20), t = ri(0, 2);
    if (t === 0) return num("What does the last line print?", a, [
      "Boxes made inside a function live only inside that function.",
      "The n inside the function is a different box from the n outside.",
      "Example: n = 100, then a function sets its own n to 7. After the function, the outside n is still 100. Now do yours."
    ], code([`n = ${a}`, "function change():", ind(1) + `n = ${b}`, "change()", "print n"]));
    if (t === 1) return num("What does the last line print?", a + 1, [
      "The function gets a copy of the number. Changing the copy does not change the original box.",
      "m receives whatever the function returns.",
      "Example: n = 100, f(x) returns x + 5, m = f(n). m is 105, but n is still 100. Now do yours."
    ], code(["function addOne(x):", ind(1) + "return x + 1", `n = ${a}`, "m = addOne(n)", "print m"]));
    return num("What does the last line print?", a, [
      "The function gets a copy of the number. Changing the copy does not change the original box.",
      "Look at which box is printed: the original box, or the one that got the answer?",
      "Example: n = 100, f(x) returns x + 5, m = f(n). m is 105, but n is still 100. Now do yours."
    ], code(["function addOne(x):", ind(1) + "return x + 1", `n = ${a}`, "m = addOne(n)", "print n"]));
  };

  const RET = facts([
    ["What does <b>return</b> do in a function?", "sends a value back to where it was called", ["shows a picture", "deletes the function"], "The answer goes back to the code that called the function."],
    ["A function returns 4. Where can you keep that 4?", "in a variable", ["in the function's name", "nowhere"], "result = f(2) is one way to catch it."],
    ["A function only prints a message and has no return. What does result = f() hold?", "no useful value", ["the message", "the number 1"], "print shows text on the screen but does not hand a value back."],
    ["What happens to the lines after a return line?", "they do not run", ["they run twice", "they run first"], "return ends the function right there."],
    ["function double(x): return x * 2. What is double(7)?", "14", ["7", "49"], "Put 7 where x is."],
    ["What does <b>print</b> do?", "shows something on the screen", ["sends a value back", "makes a new variable"], "It is for people to see."],
    ["Which one can you use in a later calculation?", "a returned value", ["a printed message", "a comment"], "Programs can use a value they get back."],
    ["What is a parameter?", "a box that receives the input of a function", ["the output of a function", "a type of bug"], "It is named in the first line of the function."],
    ["Which line never runs?<br>function f(): return 5, then print \"hi\"", "print \"hi\"", ["return 5", "both lines run"], "Look at the order of the lines."]
  ], "Think about where the answer goes after the function finishes.", "Example: function plus(x): return x + 1. plus(9) hands back 10, so total = plus(9) puts 10 in total. Now do yours.");

  const loopFilter = () => {
    const a = Array.from({ length: 6 }, () => ri(1, 20)), t = ri(0, 2);
    let tot = 0, k = ri(6, 12);
    const rule = t === 0 ? "item is even" : t === 1 ? `item &gt; ${k}` : "item is odd";
    for (const v of a) if (t === 0 ? v % 2 === 0 : t === 1 ? v > k : v % 2 === 1) tot += v;
    return num("What is <b>total</b> at the end?", tot, [
      "Look at the items one at a time. Only the ones that pass the IF test are added.",
      t === 1 ? "Compare each item with the number in the test. Skip the ones that do not pass." : "An even number can be split into two equal groups. An odd number always has one left over.",
      "Example: [10, 3, 8] with the rule 'item is even' adds 10 and 8, and skips 3. Total 18. Now do yours."
    ], code([`list = ${lst(a)}`, "total = 0", "for each item in list:", ind(1) + `IF ${rule}:`, ind(2) + "total = total + item"]));
  };

  const avgQ = () => {
    for (;;) {
      const n = pick([4, 5]), m = ri(3, 15), a = Array.from({ length: n - 1 }, () => ri(1, 20)), last = n * m - a.reduce((x, y) => x + y, 0);
      if (last < 1 || last > 25) continue;
      a.push(last); const b = shuf(a);
      return num(`What is the <b>average</b> of ${lst(b)}? (Add them up, then divide by how many.)`, m, [
        "The average is what each item would be if the total were shared out equally.",
        "Add all the items, then divide the total by the number of items.",
        "Example: [10, 20, 30]. Total 60, shared between 3 items is 20 each. Now do yours."
      ]);
    }
  };

  const coordQ = () => {
    const x = ri(4, 9), y = ri(4, 9), a = ri(1, 4), b = ri(1, 4), dx = pick(["right", "left"]), dy = pick(["up", "down"]);
    const nx = dx === "right" ? x + a : x - a, ny = dy === "down" ? y + b : y - b, P = (u, v) => `(${u}, ${v})`;
    return mc(`A sprite starts at ${P(x, y)}, written (x, y). On the screen, x grows to the right and y grows <b>downward</b>. It moves ${dx} ${a} and ${dy} ${b}. Where is it now?`, P(nx, ny),
      [P(ny, nx), P(dx === "right" ? x - a : x + a, ny), P(nx, dy === "down" ? y - b : y + b)], [
        "Handle x and y separately. One is the sideways direction and one is the up-and-down direction.",
        "Right adds to x and left takes from x. Down adds to y and up takes from y, because y grows downward.",
        "Example: start (10, 10), move left 2 and up 3. x becomes 8 and y becomes 7, so (8, 7). Now do yours."
      ], "🖥️");
  };

  const binSearch = () => {
    if (Math.random() < 0.5) {
      const N = pick([15, 31, 63, 99]), g1 = Math.floor((1 + N) / 2);
      let t = ri(1, N); while (t === g1) t = ri(1, N);
      let lo = 1, hi = N; if (t > g1) lo = g1 + 1; else hi = g1 - 1;
      return num(`The secret number is ${t}, somewhere from 1 to ${N}. You always guess the middle (round down), and your first guess is ${g1}. What is your <b>second</b> guess?`, Math.floor((lo + hi) / 2), [
        "Was the first guess too high or too low? That tells you which half to throw away.",
        "Find the new smallest and biggest possible numbers, then guess the middle of them (round down).",
        "Example: range 1 to 7, first guess 4, secret is higher. The range is 5 to 7, so the next guess is 6. Now do yours."]);
    }
    const [n, a] = pick([[7, 3], [15, 4], [31, 5], [63, 6], [127, 7], [255, 8], [1023, 10]]);
    return nc(`You search a sorted list of ${n} items by always checking the middle. What is the most guesses you could need?`, a, 3, [
      "Each guess throws away about half of the items.",
      "How many times can you halve the list before only one item is left? Count the guesses.",
      "Example: 3 items need at most 2 guesses (check the middle, then one more). 7 items need at most 3. Now do yours."]);
  };

  const insertQ = () => {
    for (;;) {
      const s = uniq(4, 2, 30).sort((x, y) => x - y), v = ri(1, 31);
      if (s.includes(v)) continue;
      const pos = s.filter(z => z < v).length, ok = s.slice(); ok.splice(pos, 0, v);
      const wrong = [s.concat([v]), [v].concat(s), (() => { const w = s.slice(); w.splice(Math.min(s.length, pos + 1), 0, v); return w; })(), (() => { const w = s.slice(); w.splice(Math.max(0, pos - 1), 0, v); return w; })()].map(lst);
      return mc(`Insertion sort: the sorted part is ${lst(s)}. The next card is <b>${v}</b>. Put it in the right place. What is the new list?`, lst(ok), wrong, [
        "The list is already in order. Slide the new card along until it fits.",
        "The new card goes after every smaller number and before every bigger number.",
        "Example: sorted [3, 8, 12] and the new card 9. 9 is bigger than 3 and 8, smaller than 12: [3, 8, 9, 12]. Now do yours."
      ]);
    }
  };

  const bubblePass = () => {
    for (;;) {
      const a = uniq(5, 1, 20), b = a.slice(), part = a.slice(); let steps = 0;
      for (let i = 0; i < 4; i++) { if (b[i] > b[i + 1]) { [b[i], b[i + 1]] = [b[i + 1], b[i]]; } if (i === 1) part.splice(0, 5, ...b); }
      if (lst(b) === lst(a)) continue;
      const sorted = a.slice().sort((x, y) => x - y);
      return mc(`One <b>bubble sort pass</b>: go from left to right, and swap each pair of neighbors if the left one is bigger. Start with ${lst(a)}. What is the list after one pass?`, lst(b), [lst(a), lst(sorted), lst(part)], [
        "Compare the first two, then the next two, moving along one place each time.",
        "The biggest number keeps getting swapped to the right, so it ends up at the end after one pass.",
        "Example: [4, 2, 3]. Compare 4 and 2: swap [2, 4, 3]. Compare 4 and 3: swap [2, 3, 4]. Now do yours."
      ]);
    }
  };

  const sliceQ = () => {
    const W = ["planet", "rocket", "window", "garden", "purple", "monkey", "button", "orange", "castle", "pencil"], w = pick(W);
    if (Math.random() < 0.5) {
      const s = ri(0, w.length - 3), c = ri(2, Math.min(3, w.length - s));
      return txt(`In code, <b>substring("${w}", ${s}, ${c})</b> takes ${c} letters starting at index ${s} (the first letter is index 0). What does it give?`, w.substr(s, c), [
        "Find the starting letter first. The first letter is index 0.",
        "Then take the number of letters you are asked for, one after another.",
        "Example: substring(\"flower\", 1, 3). Index 1 is l, then take 3 letters: low. Now do yours."]);
    }
    const i = ri(0, w.length - 1);
    return mc(`What is <b>"${w}"[${i}]</b>, the letter at index ${i}?`, w[i], [...new Set(w.split("").filter(z => z !== w[i]))].slice(0, 5), [
      "Letters have index numbers too, and they start at 0.",
      "Touch each letter and count 0, 1, 2 ... until you reach the index.",
      "Example: \"bridge\"[3] is d: b is 0, r is 1, i is 2, d is 3. Now do yours."]);
  };

  const palin = () => {
    const P = ["mom", "dad", "noon", "level", "radar", "kayak", "civic", "racecar", "wow", "madam", "refer", "eye"], N = ["cat", "sun", "plane", "robot", "table", "apple", "tiger", "water", "green"];
    const R = [["stop", "pots"], ["star", "rats"], ["live", "evil"], ["tops", "spot"], ["bat", "tab"], ["god", "dog"], ["nap", "pan"], ["draw", "ward"], ["time", "emit"]];
    const t = ri(0, 2);
    if (t === 0) return mc("A <b>palindrome</b> reads the same forwards and backwards. Which word is one?", pick(P), shuf(N).slice(0, 3), [
      "Read each word from the end to the start and compare.", "The first letter must match the last letter, and so on toward the middle.",
      "Example: \"deed\" is a palindrome, but \"deer\" is not. Now do yours."]);
    if (t === 1) { const [w, r] = pick(R); return txt(`What do you get from <b>reverse("${w}")</b>?`, r, [
      "Write the letters from the last one to the first.", "Say the word backwards slowly, one letter at a time.",
      "Example: reverse(\"bus\") gives \"sub\". Now do yours."]); }
    const w = pick([...P, ...N]), r = w === w.split("").reverse().join("") ? "yes" : "no";
    return mc(`Is <b>reverse("${w}") == "${w}"</b> true?`, r, ["yes", "no"].filter(z => z !== r), [
      "Work out the reversed word first.", "Then check whether it is exactly the same as the starting word.",
      "Example: reverse(\"pop\") is \"pop\", the same. reverse(\"top\") is \"pot\", not the same. Now do yours."]);
  };

  const randQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const a = ri(1, 6), b = a + ri(3, 12); return num(`<b>random(${a}, ${b})</b> picks a whole number from ${a} to ${b}, including both ends. How many different results are possible?`, b - a + 1, [
      "Count every whole number from the first to the last, including both.", "Subtract, then add one, because both ends count.",
      "Example: random(5, 9) can give 5, 6, 7, 8 or 9: five results. Now do yours."]); }
    if (t === 1) { const s = pick([4, 6, 8, 10, 12, 20]); return mc(`A fair die has ${s} sides, numbered 1 to ${s}. Which line simulates one roll?`, `random(1, ${s})`, [`random(0, ${s})`, `random(1, ${s - 1})`, `random(2, ${s})`], [
      "Think about the lowest and highest numbers the die can show.", "The first number is the smallest result and the second is the biggest result.",
      "Example: a spinner with 5 equal parts numbered 1 to 5 uses random(1, 5). Now do yours."], "🎲"); }
    const a = ri(3, 8), b = a + ri(3, 6), out = pick([a - 1, b + 1, b + 2]);
    return mc(`A program uses random(${a}, ${b}). Which number can it <b>never</b> give?`, String(out), shuf([a, b, Math.floor((a + b) / 2)].map(String).filter((z, i, arr) => arr.indexOf(z) === i)), [
      "Look at the lowest and highest results it can give.", "A number outside that range is impossible.",
      "Example: random(2, 6) can give 2 to 6, but never 1 or 7. Now do yours."]);
  };

  const TT = [
    ["A AND B", (a, b) => a && b], ["A OR B", (a, b) => a || b], ["NOT A", a => !a], ["NOT B", (a, b) => !b],
    ["NOT (A AND B)", (a, b) => !(a && b)], ["A AND NOT B", (a, b) => a && !b], ["NOT A OR B", (a, b) => !a || b], ["(A OR B) AND NOT (A AND B)", (a, b) => (a || b) && !(a && b)]
  ];
  const truthQ = () => {
    const A = Math.random() < 0.5, B = Math.random() < 0.5, [e, f] = pick(TT), r = f(A, B) ? "true" : "false";
    return mc(`A = ${A}, B = ${B}. What is <b>${e}</b>?`, r, ["true", "false"].filter(z => z !== r), [
      "Fill in A and B with their values, then work out the inside brackets first.",
      "AND is true only when both are true. OR is true when at least one is true. NOT flips.",
      "Example: A = true, B = false. A AND B is false. A OR B is true. NOT A is false. Now do yours."]);
  };

  const infinite = () => {
    const n = ri(4, 9), good = [`i starts at 1; while i is less than ${n}, add 1 to i`, `i starts at ${n + 3}; while i is more than ${ri(1, 3)}, take 1 away from i`, `i starts at 0; while i is less than ${n + 5}, add 2 to i`];
    const bad = [`i starts at 1; while i is less than ${n}, print i (and do nothing else)`, `i starts at 1; while i is less than ${n}, take 1 away from i`, `i starts at 1; while i is more than 0, add 1 to i`];
    if (Math.random() < 0.5) return mc("Which loop <b>never stops</b>?", pick(bad), good, [
      "A loop stops when its test finally becomes false.", "Ask for each loop: does the change to i ever make the test false?",
      "Example: i starts at 5; while i is more than 0, add 1 to i. i just gets bigger, so the test stays true forever. Now do yours."], "♾️");
    return mc("Which loop <b>does stop</b>?", pick(good), bad, [
      "A loop stops when its test finally becomes false.", "Ask for each loop: does the change to i ever make the test false?",
      "Example: i starts at 5; while i is more than 0, take 1 away from i. i reaches 0 and the test fails. Now do yours."], "🛑");
  };

  const typeQ = () => {
    const V = [["42", "whole number"], ["-7", "whole number"], ["100", "whole number"], ["3.14", "decimal number"], ["0.5", "decimal number"], ["9.99", "decimal number"], ["\"hello\"", "text (string)"], ["\"42\"", "text (string)"], ["\"3.5\"", "text (string)"], ["true", "true or false (boolean)"], ["false", "true or false (boolean)"], ["5 &gt; 3", "true or false (boolean)"], ["2 == 4", "true or false (boolean)"]];
    const [v, k] = pick(V), ALL = ["whole number", "decimal number", "text (string)", "true or false (boolean)"];
    const h2 = { "whole number": "It is a number with no decimal point and no quote marks.", "decimal number": "It is a number with a decimal point.", "text (string)": "Look for the quote marks around it.", "true or false (boolean)": "It can only ever be one of two answers: yes or no." }[k];
    return mc(`What kind of data is <b>${v}</b>?`, k, ALL.filter(z => z !== k), [
      "Look for clues: quote marks, a dot, or a yes/no style answer.", h2,
      "Example: 8 is a whole number. 2.5 has a point so it is a decimal. \"8\" has quotes so it is text. 4 &lt; 1 gives true or false. Now do yours."]);
  };

  const stepsQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(5, 30), c = ri(2, 4); return num(`A program does ${c} steps for every item in a list. The list has ${n} items. How many steps in total?`, c * n, [
      "Each item costs the same number of steps.", "Multiply the steps for one item by the number of items.",
      "Example: 4 steps per item and 10 items is 4 × 10 = 40 steps. Now do yours."]); }
    if (t === 1) { const n = ri(5, 12); return num(`A nested loop goes through a list of ${n} items for every item in the list (n × n). How many steps?`, n * n, [
      "The inner loop runs fully once for each item of the outer loop.", "Multiply the list length by itself.",
      "Example: for 6 items it is 6 × 6 = 36 steps. Now do yours."]); }
    const k = ri(3, 8); return num(`A nested loop takes n × n steps. With n = ${k} it takes ${k * k} steps. How many steps if the list is <b>twice as long</b> (n = ${2 * k})?`, 4 * k * k, [
      "Do not just double the steps. Work out n × n again with the new n.",
      "Twice as long means 2 × as big in both loops, so the steps grow even faster.",
      "Example: n = 5 gives 25 steps. n = 10 gives 100 steps, which is 4 times as many. Now do yours."]);
  };

  const shiftWord = (w, k) => w.split("").map(c => String.fromCharCode(65 + (c.charCodeAt(0) - 65 + k + 26) % 26)).join("");
  const caesar = () => {
    const W = ["CAT", "DOG", "BIG", "FUN", "SUN", "HAT", "MAP", "JET", "PIG", "HEN", "COW", "BUG", "RED", "LION", "FISH", "BIRD"], w = pick(W), k = ri(1, 3);
    if (Math.random() < 0.5) return txt(`Caesar cipher: each letter moves <b>${k}</b> place${k > 1 ? "s" : ""} forward in the alphabet (A becomes ${shiftWord("A", k)}). Write ${w} in code.`, shiftWord(w, k), [
      "Go through the word one letter at a time.", "Say the alphabet and step forward the right number of letters from each one.",
      "Example: shift 2: A becomes C, B becomes D, so AB becomes CD. Now do yours."]);
    return txt(`Caesar cipher: every letter was moved <b>${k}</b> place${k > 1 ? "s" : ""} forward. The secret word is <b>${shiftWord(w, k)}</b>. What was the real word?`, w, [
      "To decode, move each letter the other way.", "Step backward in the alphabet, the same number of places, for every letter.",
      "Example: with shift 2, the code CD decodes to AB. Now do yours."]);
  };

  const vowels = () => {
    const W = ["banana", "balloon", "computer", "elephant", "rainbow", "pencil", "giraffe", "umbrella", "sandwich", "mississippi", "strawberry", "kangaroo", "butterfly", "volcano"], w = pick(W);
    if (Math.random() < 0.6) return num(`Count the vowels (a, e, i, o, u) in <b>${w}</b>. How many are there?`, (w.match(/[aeiou]/g) || []).length, [
      "Look at the word one letter at a time and keep a count.", "Only the letters a, e, i, o and u count here. The letter y does not.",
      "Example: \"paper\" has a, e: that is 2 vowels. Now do yours."]);
    const cnt = {}; for (const c of w) cnt[c] = (cnt[c] || 0) + 1;
    const letter = pick(Object.keys(cnt).filter(c => cnt[c] > 1 && /[a-z]/.test(c)).concat(w[0]));
    return num(`How many times does the letter <b>${letter}</b> appear in <b>${w}</b>?`, cnt[letter], [
      "Look at the word one letter at a time and keep a count.", "Make a mark each time you see that letter.",
      "Example: in \"letter\" the letter t shows up 2 times. Now do yours."]);
  };

  const coins = () => {
    const amt = ri(31, 99), a = amt; let c = 0, r = a; for (const v of [25, 10, 5, 1]) { c += Math.floor(r / v); r %= v; }
    const ex = pick([[43, 6], [77, 5], [68, 6], [91, 7], [58, 6]].filter(e => e[1] !== c));
    return num(`You have coins worth 25, 10, 5 and 1 cents. Using the <b>fewest</b> coins, how many coins make ${a} cents?`, c, [
      "A greedy plan: always take the biggest coin that still fits.",
      "After each coin, work out how much is left. Then take the biggest coin that fits into what is left.",
      `Example: ${ex[0]} cents. Take as many 25s as fit, then 10s, then 5s, then 1s. That needs ${ex[1]} coins. Now do yours.`
    ], "🪙");
  };

  const L8 = [
    L("Inside and outside", scopeQ, [S("Local boxes", "📦", "A box made <b>inside</b> a function lives only there. The same name outside is a different box."), S("Copies", "📋", "When you give a number to a function, it gets a <b>copy</b>. Changing the copy does not change the original."), S("Tip", "💡", "Always check which box a line is talking about.")]),
    L("Return or print?", RET, [S("Return", "↩️", "<b>return</b> hands a value back to the code that called the function. You can store it."), S("Print", "🖨️", "<b>print</b> only shows something on the screen. It does not hand anything back."), S("Tip", "💡", "return also ends the function, so lines after it never run.")]),
    L("Loops with a rule", loopFilter, [S("Filter", "🪣", "A loop can look at each item and only use the ones that pass an IF test."), S("Example", "[4, 7, 6] with even items", "total = 4 + 6 = 10. The 7 is skipped."), S("Tip", "💡", "Write down each item and tick the ones that pass.")]),
    L("Averages", avgQ, [S("Average", "⚖️", "The <b>average</b> is what each item would be if everything were shared out equally."), S("How", "➕➗", "Add all the items, then divide by how many items there are."), S("Example", "[2, 4, 6]", "Total 12, three items, so the average is 4.")]),
    L("Screen coordinates", coordQ, [S("x and y", "📍", "Positions are written as (x, y). <b>x</b> is how far across, <b>y</b> is how far down."), S("Upside down?", "⬇️", "On a screen, y gets bigger as you go <b>down</b>. So moving up makes y smaller."), S("Example", "(5, 5) up 2", "The sprite moves to (5, 3).")]),
    L("Binary search", binSearch, [S("Halve it", "✂️", "In a sorted list, check the middle. This throws away half the items every time."), S("Few guesses", "🎯", "1000 items need only about 10 guesses! Linear search could need 1000."), S("Example", "1 to 15", "Guess 8. If the secret is higher, the range becomes 9 to 15.")]),
    L("Insertion sort", insertQ, [S("Card sorting", "🃏", "Insertion sort works like putting cards in your hand in order: take the next card and slide it into place."), S("Place it", "↔️", "It goes after every smaller number and before every bigger number."), S("Example", "[2, 6, 9] + 7", "7 is after 6, before 9: [2, 6, 7, 9].")]),
    L("Bubble sort", bubblePass, [S("Neighbors", "🫧", "<b>Bubble sort</b> compares neighbors and swaps them if they are in the wrong order."), S("One pass", "➡️", "Go from the left to the right once. The biggest number bubbles up to the end."), S("Example", "[3, 1, 2]", "Swap 3 and 1: [1, 3, 2]. Swap 3 and 2: [1, 2, 3].")]),
    L("Slicing strings", sliceQ, [S("Index", "🔤", "Letters in a string have index numbers starting at 0, just like lists."), S("Substring", "✂️", "A <b>substring</b> is a piece of a string: a start index and how many letters to take."), S("Example", "substring(\"garden\", 1, 3)", "Start at index 1 (a) and take 3 letters: ard.")]),
    L("Palindromes", palin, [S("Same both ways", "🔁", "A <b>palindrome</b> reads the same forwards and backwards, like mom or racecar."), S("Reverse", "↩️", "reverse(\"stop\") gives \"pots\". A word is a palindrome if reverse(word) equals word."), S("Tip", "💡", "Compare the first and last letters, then work toward the middle.")]),
    L("Random numbers", randQ, [S("Random", "🎲", "<b>random(1, 6)</b> picks a whole number from 1 to 6. Games use it for dice, loot and surprises."), S("Both ends", "↔️", "The smallest and biggest numbers are both possible."), S("Count", "🔢", "Results from a to b: b − a + 1 of them.")]),
    L("Truth tables", truthQ, [S("Two inputs", "🔀", "Two true/false values A and B can be joined with AND, OR and NOT."), S("Rules", "📋", "AND: both must be true. OR: at least one true. NOT: flips true and false."), S("Tip", "💡", "Do the brackets first, one small piece at a time.")]),
    L("Loops that never stop", infinite, [S("Infinite loop", "♾️", "A loop that never ends is an <b>infinite loop</b>. The program gets stuck!"), S("Why", "🔧", "It happens when the loop never changes the thing it tests, or changes it the wrong way."), S("Tip", "💡", "Check: does the change in the loop move toward making the test false?")]),
    L("Types of data", typeQ, [S("Data types", "🧱", "Data comes in types: <b>whole numbers</b>, <b>decimals</b>, <b>text</b> (strings) and <b>true/false</b> (booleans)."), S("Quotes", "\"7\"", "Anything in quote marks is text, even if it looks like a number."), S("Comparing", "5 &gt; 3", "A comparison gives a true/false answer.")]),
    L("How many steps?", stepsQ, [S("Counting work", "⏱️", "Programmers count how many steps a program takes, because fewer steps is faster."), S("Loops in loops", "🔁🔁", "A loop inside a loop on n items takes n × n steps. That gets big fast!"), S("Example", "n = 10", "One loop: 10 steps. A nested loop: 100 steps.")]),
    L("Caesar cipher", caesar, [S("Secret code", "🔐", "A <b>cipher</b> hides a message. In the Caesar cipher, every letter moves a few places along the alphabet."), S("Shift", "A→C", "With shift 2: A becomes C, B becomes D, C becomes E."), S("Decode", "↩️", "To decode, shift the letters back the same number.")]),
    L("Counting letters", vowels, [S("Counting", "🔎", "Programs often loop over the letters of a string and count the ones they want."), S("Vowels", "a e i o u", "The vowels are a, e, i, o, u. All the other letters are consonants."), S("Tip", "💡", "Keep a tally as you read each letter.")]),
    L("Fewest coins", coins, [S("Greedy plan", "🪙", "A <b>greedy</b> algorithm always takes the biggest piece that fits right now."), S("Coins", "25 · 10 · 5 · 1", "To make change, take the biggest coin that fits, subtract, and repeat."), S("Example", "36 cents", "25 + 10 + 1 = 3 coins.")])
  ];
  const M8 = [scopeQ, RET, loopFilter, avgQ, coordQ, binSearch, insertQ, bubblePass, sliceQ, palin, randQ, truthQ, infinite, typeQ, stepsQ, caesar, vowels, coins];
  L8.push(L("Mixed practice", mix(scopeQ, loopFilter, avgQ, coordQ, binSearch, bubblePass, palin, truthQ, typeQ, coins), MIXS("scope, loops with rules, averages, coordinates, searching, sorting, strings, logic and data types.")));
  L8.push(L("Level 8 Challenge", mix(...M8), MIXS("everything from level 8: functions, searching and sorting, strings, random numbers, logic, data types and ciphers.")));

  // =====================================================================
  // LEVEL 9
  // =====================================================================
  const PEOPLE = ["Ana", "Ben", "Cy", "Dee", "Eli", "Fay", "Gus", "Hal"];
  const dictQ = () => {
    const names = shuf(PEOPLE).slice(0, 4), v = names.map(() => ri(3, 15)), d = `scores = {${names.slice(0, 3).map((n, i) => `"${n}": ${v[i]}`).join(", ")}}`, t = ri(0, 3), i = ri(0, 2);
    const H = ["A dictionary stores pairs: a key (the name tag) and a value (what is stored).", "Use the key to look up its value. You do not count positions.", "Example: ages = {\"Zoe\": 9, \"Max\": 12}. ages[\"Max\"] is 12. Now do yours."];
    if (t === 0) return num(`What is <b>scores["${names[i]}"]</b>?`, v[i], H, code([d]));
    if (t === 1) { const k = ri(2, 6); return num(`After the last line, what is <b>scores["${names[i]}"]</b>?`, v[i] + k, H, code([d, `scores["${names[i]}"] = scores["${names[i]}"] + ${k}`])); }
    if (t === 2) return num("After the last line, how many keys does the dictionary have?", 4, [H[0], "Adding a new key makes the dictionary one bigger. Count the pairs.", "Example: a dictionary with 2 keys gets a new key: it now has 3. Now do yours."], code([d, `scores["${names[3]}"] = ${v[3]}`]));
    return mc(`In the pair <b>"${names[i]}": ${v[i]}</b>, which part is the key?`, `"${names[i]}"`, [String(v[i])], [H[0], "The key is the name tag you use to look something up.", "Example: in \"Zoe\": 9, the key is \"Zoe\" and the value is 9. Now do yours."]);
  };

  const stackQ = () => {
    for (;;) {
      const lt = shuf("ABCDEFGH".split("")); let st = [], lines = [], popped = [], k = 0;
      const n = ri(5, 7);
      for (let i = 0; i < n; i++) {
        if (st.length >= 1 && Math.random() < 0.4) { popped.push(st.pop()); lines.push("pop"); }
        else { st.push(lt[k]); lines.push(`push ${lt[k]}`); k++; }
      }
      if (!popped.length || !st.length) continue;
      const pushed = lt.slice(0, k), t = ri(0, 2);
      const H = ["A stack works like a pile of plates: you add on top and take from the top.", "The last item pushed on is always the first one popped off.", "Example: push X, push Y, pop. The pop takes Y, so X is left. Now do yours."];
      const lines2 = code(lines);
      if (t === 0) return mc("What is on the <b>top</b> of the stack at the end?", st[st.length - 1], pushed, H, lines2);
      if (t === 1) return nc("How many items are in the stack at the end?", st.length, 2, H, lines2);
      return mc("What did the <b>last pop</b> take off the stack?", popped[popped.length - 1], pushed, H, lines2);
    }
  };

  const queueQ = () => {
    for (;;) {
      const nm = shuf(PEOPLE); let q = [], lines = [], served = [], k = 0;
      const n = ri(5, 7);
      for (let i = 0; i < n; i++) {
        if (q.length >= 1 && Math.random() < 0.4) { served.push(q.shift()); lines.push("dequeue (serve the front)"); }
        else { q.push(nm[k]); lines.push(`enqueue ${nm[k]}`); k++; }
      }
      if (!served.length || !q.length) continue;
      const pushed = nm.slice(0, k), t = ri(0, 2);
      const H = ["A queue is a line of people: new ones join at the back, and the front is served first.", "The first one to join is the first one to leave.", "Example: enqueue X, enqueue Y, dequeue. X leaves first and Y is left at the front. Now do yours."];
      const lines2 = code(lines);
      if (t === 0) return mc("Who is at the <b>front</b> of the queue at the end?", q[0], pushed, H, lines2);
      if (t === 1) return nc("How many people are still waiting at the end?", q.length, 2, H, lines2);
      return mc("Who was served by the <b>last dequeue</b>?", served[served.length - 1], pushed, H, lines2);
    }
  };

  const recPrint = () => {
    const n = ri(3, 5), dn = Array.from({ length: n }, (_, i) => n - i), up = dn.slice().reverse();
    if (Math.random() < 0.5) return mc(`What does <b>count(${n})</b> print?`, dn.join(" ") + " Go!", [up.join(" ") + " Go!", dn.join(" "), "Go! " + dn.join(" ")], [
      "A function that calls itself is recursive. Follow each call down until the stop rule.",
      "Each call prints its number first, then calls count with a smaller number.",
      "Example: count(1) prints 1, then calls count(0), which prints Go!. So it shows: 1 Go!. Now do yours."
    ], code(["function count(n):", ind(1) + "IF n == 0: print \"Go!\"", ind(1) + "ELSE:", ind(2) + "print n", ind(2) + "count(n - 1)"]));
    return mc(`What does <b>up(${n})</b> print?`, up.join(" "), [dn.join(" "), String(n), up.slice(0, -1).join(" ")], [
      "The call to up(n - 1) comes before the print line, so the printing waits.",
      "The smallest number reaches its print line first, then the others finish in turn on the way back.",
      "Example: up(2) calls up(1), which calls up(0) and does nothing. Then 1 prints, then 2 prints: 1 2. Now do yours."
    ], code(["function up(n):", ind(1) + "IF n &gt; 0:", ind(2) + "up(n - 1)", ind(2) + "print n"]));
  };

  const recVal = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(3, 7); return num(`What is <b>total(${n})</b>?`, n * (n + 1) / 2, [
      "total(n) adds n to the answer for the next smaller number.", "Keep going down until total(0), then add back up.",
      "Example: total(2) = 2 + total(1) = 2 + (1 + total(0)) = 2 + 1 + 0 = 3. Now do yours."
    ], code(["function total(n):", ind(1) + "IF n == 0: return 0", ind(1) + "ELSE: return n + total(n - 1)"])); }
    if (t === 1) { const n = ri(3, 5), f = [1, 1, 2, 6, 24, 120]; return num(`What is <b>fact(${n})</b>?`, f[n], [
      "fact(n) multiplies n by the answer for the next smaller number.", "Go down to fact(0), then multiply back up.",
      "Example: fact(2) = 2 × fact(1) = 2 × (1 × fact(0)) = 2 × 1 × 1 = 2. Now do yours."
    ], code(["function fact(n):", ind(1) + "IF n == 0: return 1", ind(1) + "ELSE: return n * fact(n - 1)"])); }
    const n = ri(3, 6); return num(`What is <b>twos(${n})</b>?`, 2 ** n, [
      "twos(n) doubles the answer for the next smaller number.", "Go down to twos(0), then double back up.",
      "Example: twos(2) = 2 × twos(1) = 2 × (2 × twos(0)) = 2 × 2 × 1 = 4. Now do yours."
    ], code(["function twos(n):", ind(1) + "IF n == 0: return 1", ind(1) + "ELSE: return 2 * twos(n - 1)"]));
  };

  const fibQ = () => {
    const a = ri(1, 4), b = ri(1, 4), s = [a, b]; for (let i = 2; i < 9; i++) s.push(s[i - 1] + s[i - 2]);
    const k = ri(4, 5), ahead = Math.random() < 0.5;
    return num(`Each number is the sum of the two before it. Here are the first ${k}: ${s.slice(0, k).join(", ")}, ... What is the ${ahead ? "number after the next one (two steps on)" : "next number"}?`, s[ahead ? k + 1 : k], [
      "Look at the pattern between neighbors. Add two numbers to get the next.",
      "Add the last two numbers you can see to get the next one.",
      "Example: 2, 3, ... The next is 2 + 3 = 5, and the one after is 3 + 5 = 8. Now do yours."]);
  };

  const CYC = [["red", "green", "yellow"], ["north", "east", "south", "west"], ["spring", "summer", "fall", "winter"], ["breakfast", "lunch", "dinner"], ["morning", "noon", "evening", "night"]];
  const cycleQ = () => {
    const c = pick(CYC), n = ri(c.length + 2, 22);
    return mc(`A pattern goes ${c.join(", ")}, then starts again from the beginning. It starts on <b>${c[0]}</b>. After ${n} changes, which one is it?`, c[n % c.length], c.filter((_, i) => i !== n % c.length), [
      "The pattern repeats, so only the leftover after full rounds matters.",
      "Divide the number of changes by the length of the pattern. Use the remainder (mod).",
      "Example: A, B, C repeating, starting on A, after 7 changes: 7 mod 3 = 1, so B. Now do yours."]);
  };

  const nestCount = () => {
    const a = ri(3, 6), b = ri(3, 6), t = ri(0, 3); let c = 0;
    const T = [["i == j", (i, j) => i === j], ["i &lt; j", (i, j) => i < j], [`i + j == ${a + 1}`, (i, j) => i + j === a + 1], ["(i * j) is even", (i, j) => (i * j) % 2 === 0]][t];
    for (let i = 1; i <= a; i++) for (let j = 1; j <= b; j++) if (T[1](i, j)) c++;
    return num("How many times does <b>count</b> go up by 1?", c, [
      "List every pair (i, j) the loops make. Then check the IF test on each pair.",
      "Go through i = 1 first with every j, then i = 2, and so on. Tick the pairs that pass.",
      "Example: i from 1 to 2, j from 1 to 2 with IF i &lt; j. Pairs: (1,1) no, (1,2) yes, (2,1) no, (2,2) no. That is 1. Now do yours."
    ], code(["count = 0", `for i from 1 to ${a}:`, ind(1) + `for j from 1 to ${b}:`, ind(2) + `IF ${T[0]}:`, ind(3) + "count = count + 1"]));
  };

  const binAdd = () => {
    for (;;) {
      const a = ri(1, 7), b = ri(1, 7), s = a + b, B = x => x.toString(2);
      const wrongs = [B(s + 1), B(s - 1), B(a ^ b), B(s + 2)];
      return mc(`Add these binary numbers: <b>${B(a)} + ${B(b)}</b>. What is the answer in binary?`, B(s), wrongs, [
        "Add from the right-hand column, just like normal adding.",
        "In binary there is no digit 2. When a column adds to two, write 0 and carry a 1 to the next column.",
        "Example: 1 + 1 = 10 in binary. And 11 + 1 = 100, because the carry keeps going. Now do yours."
      ]);
    }
  };

  const HX = "0123456789ABCDEF";
  const hexQ = () => {
    const t = ri(0, 2);
    if (t === 0) { const d = ri(10, 15); return num(`In <b>hexadecimal</b>, the digits go 0-9 and then A, B, C, D, E, F. What number does the hex digit <b>${HX[d]}</b> stand for?`, d, [
      "After 9, hex keeps counting using letters instead of 2-digit numbers.",
      "A comes right after 9, B comes after A, and so on.",
      "Example: counting 8, 9, A, B means A is the next after 9, and B the one after A. Now do yours."]); }
    if (t === 1) { const d = ri(10, 15); return mc(`Which hex digit stands for the number <b>${d}</b>?`, HX[d], [...new Set([HX[d - 1], HX[Math.min(15, d + 1)], HX[Math.max(10, d - 2)]])].filter(z => z !== HX[d]), [
      "Hex has 16 digits, 0 to 9 and then letters.",
      "A comes right after 9, B after A, and so on in alphabet order.",
      "Example: counting 8, 9, A, B, C... so A is the first number after 9. Now do yours."]); }
    const l = ri(1, 3), r = ri(1, 15);
    return num(`What number is the hex number <b>${HX[l]}${HX[r]}</b>? (The left digit counts groups of 16.)`, l * 16 + r, [
      "The left digit counts how many groups of sixteen. The right digit counts the singles.",
      "Multiply the left digit by sixteen, then add the right digit. Turn letters into numbers first (A comes after 9).",
      "Example: hex 2A = 2 × 16 + 10 = 42. Now do yours."]);
  };

  const bigBits = () => {
    const t = ri(0, 2);
    if (t === 0) { const n = ri(3, 8); return num(`What is the biggest number you can store in <b>${n} bits</b>? (They can count from 0.)`, 2 ** n - 1, [
      "n bits make 2 × 2 × 2 ... (n times) patterns. One of them is zero.",
      "The biggest number is the number of patterns minus 1, because counting starts at 0.",
      "Example: 3 bits make 8 patterns (0 to 7), so the biggest is 7. Now do yours."]); }
    if (t === 1) { const n = ri(3, 6), v = ri(2, 70), ok = v <= 2 ** n - 1; return mc(`A game saves lives in <b>${n} bits</b>. Can it store the number ${v}?`, ok ? "yes" : "no", ["yes", "no"].filter(z => z !== (ok ? "yes" : "no")), [
      "Work out the biggest number that fits in that many bits.", "Is the number you want bigger than that?",
      "Example: 4 bits hold 0 to 15. 12 fits, but 20 does not. Now do yours."]); }
    const [k, a] = pick([[5, 3], [10, 4], [20, 5], [40, 6], [100, 7], [200, 8], [250, 8], [30, 5]]);
    return nc(`What is the <b>fewest bits</b> you need to count from 0 up to ${k}?`, a, 2, [
      "Each extra bit doubles how many numbers you can count.", "Keep adding bits until the biggest number you can store is at least the one you need.",
      "Example: to reach 9 you need 4 bits, because 3 bits only reach 7 and 4 bits reach 15. Now do yours."]);
  };

  const rle = () => {
    const t = ri(0, 2), runs = [], LS = shuf("ABCXYZ".split(""));
    for (let i = 0; i < 3; i++) runs.push([LS[i], ri(1, 5)]);
    const plain = runs.map(([c, n]) => c.repeat(n)).join(""), enc = runs.map(([c, n]) => n + c).join("");
    if (t === 0) return mc(`<b>Run-length encoding</b> writes each run as a count and a letter, so AAB becomes 2A1B. How is <b>${plain}</b> encoded?`, enc, [runs.map(([c, n]) => c + n).join(""), runs.map(([c, n]) => n + 1 + c).join(""), runs.map(([c, n]) => (n + 1) + c).join("")], [
      "Count how many times each letter repeats in a row.", "Write the count first, then the letter, for each run.",
      "Example: WWWWB becomes 4W1B. Now do yours."]);
    if (t === 1) return num(`The code <b>${enc}</b> uses run-length encoding (count, then letter). How many letters long is the message after decoding?`, plain.length, [
      "Each count tells you how many copies of the letter.", "Add up all the counts.",
      "Example: 3Q2R is QQQRR, which is 5 letters. Now do yours."]);
    return mc(`Decode the run-length code <b>${enc}</b>.`, plain, [runs.map(([c, n]) => c.repeat(n === 1 ? 2 : n - 1)).join(""), runs.map(([c, n]) => c).join(""), runs.map(([c, n]) => c.repeat(n + 1)).join("")], [
      "Each pair is a count and then a letter.", "Write each letter as many times as its count says.",
      "Example: 2A3B decodes to AABBB. Now do yours."]);
  };

  const parity = () => {
    const n = ri(4, 6), bits = Array.from({ length: n }, () => ri(0, 1)), ones = bits.reduce((x, y) => x + y, 0), str = bits.join("");
    if (Math.random() < 0.5) return mc(`<b>Even parity</b>: add one extra bit so the total number of 1s is even. The data bits are <b>${str}</b>. What is the parity bit?`, String(ones % 2), ["0", "1"].filter(z => z !== String(ones % 2)), [
      "Count the 1s in the data bits first.", "The extra bit must make the total number of 1s come out even.",
      "Example: data 110 has two 1s, which is already even. Data 100 has one 1, so the parity bit must be a 1. Now do yours."]);
    const par = Math.random() < 0.5 ? ones % 2 : 1 - (ones % 2), ok = (ones + par) % 2 === 0;
    return mc(`A message arrives with <b>even parity</b>: data bits <b>${str}</b> and parity bit <b>${par}</b>. Is it OK, or was there an error?`, ok ? "OK" : "error", ["OK", "error"].filter(z => z !== (ok ? "OK" : "error")), [
      "Count all the 1s, including the parity bit.", "If the total number of 1s is even, nothing looks wrong. If it is odd, a bit changed on the way.",
      "Example: data 101 with parity bit 0 has two 1s in all: even, so OK. Data 100 with parity bit 0 has one 1: odd, so an error. Now do yours."]);
  };

  const objQ = () => {
    const nm = pick(["Zed", "Pip", "Max", "Lia"]), lives = ri(3, 6), x = ri(2, 9), sc = ri(0, 5) * 10, t = ri(0, 2);
    const o = `hero = {name: "${nm}", lives: ${lives}, x: ${x}, score: ${sc}}`, k1 = ri(1, 2), k2 = ri(2, 9), k3 = ri(1, 2) * 10;
    const lines = [o, `hero.lives = hero.lives - ${k1}`, `hero.x = hero.x + ${k2}`, `hero.score = hero.score + ${k3}`];
    const ans = t === 0 ? lives - k1 : t === 1 ? x + k2 : sc + k3, p = ["lives", "x", "score"][t];
    return num(`After all the lines, what is <b>hero.${p}</b>?`, ans, [
      "An object keeps several properties together. Use a dot and the property name to reach one.",
      "Only the property named on the left of the = sign changes. The others stay the same.",
      "Example: pet = {legs: 4, age: 2}. pet.age = pet.age + 1 makes pet.age 3, and pet.legs is still 4. Now do yours."
    ], code(lines));
  };

  const growQ = () => {
    const t = ri(0, 1);
    if (t === 0) { const n = ri(20, 300); let c = 0, m = n; while (m > 1) { m = Math.floor(m / 2); c++; } return num(`How many times can you halve ${n} (rounding down) before you reach 1?`, c, [
      "Halve, round down, and count each halving.", "Keep going until the number is 1. Count every step you took.",
      "Example: 20 → 10 → 5 → 2 → 1. That is 4 halvings. Now do yours."]); }
    const n = pick([100, 1000, 1000000]), a = { 100: 7, 1000: 10, 1000000: 20 }[n];
    return mc(`A sorted list has ${n.toLocaleString("en-US")} items. About how many checks does binary search need at most?`, String(a), shuf(["7", "10", "20", "50", "100"]).filter(z => z !== String(a)).slice(0, 3), [
      "Binary search halves the list each check. It does not look at every item.",
      "Count how many times the list size can be halved to reach one item.",
      "Example: 1000 items need about 10 checks, because 1000 halves down to 1 in 10 steps. Now do yours."]);
  };

  const testQ = () => {
    if (Math.random() < 0.5) {
      const k = ri(2, 5), r = ri(2, 6), c = r * (k - 1), others = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(v => v !== r)).slice(0, 3);
      return {
        text: `A function should return <b>x × ${k}</b>, but the coder wrote <b>x + ${c}</b>. Which test input will <b>not</b> show the bug?`, choices: shuf([r, ...others]), answer: r, hints: [
          "A test shows a bug when the right answer and the buggy answer are different.",
          "Try each input in both versions. Which one gives the same answer in both?",
          "Example: right is x × 2, buggy is x + 2. At x = 2 both give 4, so that test misses the bug. At x = 5 they give 10 and 7. Now do yours."]
      };
    }
    return facts([
      ["You wrote a function to find the biggest of 3 numbers. Which test is a good edge case?", "all three numbers the same", ["three different numbers in order", "one test with small numbers"], "Edge cases are the strange, extreme cases that can break code."],
      ["What is a test case?", "an input with the answer you expect", ["a box to store code", "a type of loop"], "It says what goes in and what should come out."],
      ["Why test with 0 and negative numbers?", "unusual numbers often reveal bugs", ["they are faster", "they are always wrong"], "Programs often only get tested with normal numbers."],
      ["Your test fails. What should you do?", "find the cause, fix the code, and test again", ["delete the test", "ignore it"], "A failing test is a helpful clue."],
      ["Which list is the best edge case for a function that finds the biggest item?", "an empty list", ["a list of ten numbers", "a list of 2, 4, 6"], "Think about what happens with nothing in the list."],
      ["Is one passing test enough to be sure code is correct?", "no, test many different inputs", ["yes, always", "yes, if it is a big number"], "One test might miss a bug."],
      ["What do we call checking that a program does what it should?", "testing", ["decorating", "saving"], "It is like checking your homework."],
      ["Which input is an edge case for a function that counts down from n?", "n = 0", ["n = 5", "n = 7"], "It is the smallest border case."]
    ], "Think about inputs that might break the code.", "Example: for a function that halves a number, try 0, 1 and an odd number. Now do yours.")();
  };

  const TOOL = facts([
    ["You need to store 30 test scores in order. Use...", "a list", ["a single variable", "an IF"], "One box is not enough for many items.", "📋"],
    ["You need to repeat an action exactly 10 times. Use...", "a for loop", ["an IF", "a comment"], "You know the count in advance.", "🔁"],
    ["Keep going until the player has no lives left. Use...", "a while loop", ["an IF", "a comment"], "You do not know in advance how many times.", "🔄"],
    ["Do something only when the score is high. Use...", "an IF", ["a loop", "a list"], "It is a yes/no decision.", "🔀"],
    ["Look up a phone number using a name. Use...", "a dictionary", ["a stack", "a loop"], "Names are tags that find a value.", "📖"],
    ["An undo button takes back the last move first. Use...", "a stack", ["a queue", "a dictionary"], "Last in, first out.", "↩️"],
    ["People waiting for a ride should go in order of arrival. Use...", "a queue", ["a stack", "a function"], "First in, first out.", "🎢"],
    ["You use the same steps in many places. Use...", "a function", ["a comment", "a bit"], "Write the steps once and give them a name.", "⚙️"],
    ["Remember the player's current score. Use...", "a variable", ["a loop", "a flowchart"], "It is one value that changes.", "📦"]
  ], "Think about what the job needs: remembering, repeating, deciding, or reusing.", "Example: to keep a list of friends' names, use a list. To repeat a dance move 5 times, use a for loop. Now do yours.");

  const NET = facts([
    ["What is the internet?", "a huge network of connected computers", ["one giant computer", "a type of game"], "Many computers all joined together.", "🌐"],
    ["What does a web server do?", "stores web pages and sends them when asked", ["draws pictures only", "charges phones"], "It answers when your browser asks for a page.", "🖥️"],
    ["What is a web browser?", "an app that shows web pages", ["a kind of wire", "a type of password"], "You use it to look at websites."],
    ["Why are messages split into small packets?", "so they can travel easily and be put back together", ["so they are hidden forever", "so they get lost"], "Small pieces are easy to send by many roads."],
    ["What does an IP address do?", "tells where a computer is on a network", ["stores your photos", "makes a computer faster"], "It works like a house address.", "🏠"],
    ["What does Wi-Fi do?", "connects devices to a network without wires", ["makes electricity", "cleans the screen"], "No cable needed.", "📶"],
    ["Which is a strong password?", "a long mix of letters, numbers and symbols", ["your pet's name", "1234"], "It should be very hard to guess."],
    ["Who should you share your password with?", "only a parent or trusted adult", ["any new online friend", "everyone in your game"], "Keep it secret from people you do not know."],
    ["What is a download?", "copying a file from another computer to yours", ["deleting a file", "turning off the computer"], "The file comes toward you.", "⬇️"],
    ["What does the lock sign or https in a web address mean?", "the connection is scrambled to keep it private", ["the page is always true", "the page is free"], "Others cannot easily read what travels across."]
  ], "Think about how computers talk to each other and how to stay safe.", "Example: when you open a website, your browser asks a web server, and the server sends the page back in packets. Now do yours.");

  const L9 = [
    L("Dictionaries", dictQ, [S("Key and value", "🔑", "A <b>dictionary</b> stores pairs. The <b>key</b> is a name tag. The <b>value</b> is what is stored with it."), S("Look up", "📖", "scores[\"Ana\"] finds Ana's value, with no counting positions needed."), S("Tip", "💡", "Each key appears only once.")]),
    L("Stacks", stackQ, [S("Pile of plates", "🍽️", "A <b>stack</b> adds (push) and removes (pop) only at the top, like a pile of plates."), S("Last in, first out", "⬆️", "The newest item is the first to come off."), S("Example", "push A, push B, pop", "B comes off. A is left.")]),
    L("Queues", queueQ, [S("A line", "🚶‍♂️🚶‍♀️", "A <b>queue</b> is a line. New items join at the back, and the front item is served first."), S("First in, first out", "➡️", "Enqueue adds at the back. Dequeue removes from the front."), S("Example", "enqueue A, enqueue B, dequeue", "A is served. B is at the front now.")]),
    L("Functions that call themselves", recPrint, [S("Recursion", "🪞", "A function can <b>call itself</b> with a smaller job. This is called <b>recursion</b>."), S("Stop rule", "🛑", "It needs a stopping case (like n == 0), or it would never end."), S("Order", "↕️", "Lines before the call run on the way down. Lines after the call run on the way back up.")]),
    L("Recursion values", recVal, [S("Build up", "🧱", "A recursive function often builds its answer from the answer for a smaller number."), S("Example", "total(3)", "total(3) = 3 + total(2) = 3 + 2 + total(1) = 3 + 2 + 1 + 0 = 6."), S("Tip", "💡", "Go down to the stopping case first, then add or multiply back up.")]),
    L("Number sequences", fibQ, [S("Sequences", "🌀", "Some sequences make each new number from the earlier ones."), S("Fibonacci", "1 1 2 3 5 8", "Add the last two numbers to get the next. The famous Fibonacci sequence works this way."), S("Tip", "💡", "Check the rule on the numbers you can see.")]),
    L("Patterns that repeat", cycleQ, [S("Cycles", "🔄", "Many programs repeat a pattern: traffic lights, seasons, turns in a game."), S("Use mod", "➗", "After n steps, the place in a cycle of length L is <b>n mod L</b>."), S("Example", "red, green, yellow", "After 4 changes: 4 mod 3 = 1, so green.")]),
    L("Loops in loops with IF", nestCount, [S("All the pairs", "🔢", "Two loops together make every pair (i, j)."), S("Test each", "✅", "An IF inside tests each pair. Only the pairs that pass count."), S("Tip", "💡", "Write the pairs in a neat list: i = 1 with every j, then i = 2, and so on.")]),
    L("Binary addition", binAdd, [S("Add in binary", "➕", "Binary adding works like normal adding, but with only 0 and 1."), S("Carry", "1+1=10", "1 + 1 is 10 in binary: write 0 and carry the 1."), S("Check", "✅", "You can check by changing each number to normal numbers first.")]),
    L("Hexadecimal", hexQ, [S("16 digits", "🔟", "<b>Hexadecimal</b> counts in sixteens. The digits are 0-9 then A, B, C, D, E, F."), S("Letters", "A=10", "A is ten, B is eleven, and F is fifteen."), S("Two digits", "2A", "The left digit counts groups of 16: 2A = 2 × 16 + 10 = 42. Programmers use hex for colors.")]),
    L("Biggest number in bits", bigBits, [S("Largest", "🔝", "With n bits you can count from 0 up to <b>2 × 2 × ... (n times) − 1</b>."), S("Examples", "3 bits: 7", "3 bits: 0 to 7. 4 bits: 0 to 15. 8 bits (a byte): 0 to 255."), S("Tip", "💡", "Each extra bit doubles the count of numbers.")]),
    L("Run-length encoding", rle, [S("Squeeze", "🗜️", "<b>Compression</b> makes data smaller. Run-length encoding writes a repeat as a count and a letter."), S("Example", "AAAABB", "That is 4A2B."), S("Decode", "↩️", "To decode, write each letter as many times as its count.")]),
    L("Parity bits", parity, [S("Checking", "🕵️", "When data travels, a bit might flip by mistake. A <b>parity bit</b> helps spot this."), S("Even parity", "1 0 1 1 + 1", "Add an extra bit so the total number of 1s is even."), S("Check", "🔍", "If the receiver counts an odd number of 1s, something went wrong.")]),
    L("Objects and properties", objQ, [S("Objects", "🧸", "An <b>object</b> keeps related facts together, like a game hero with lives, position and score."), S("Properties", "hero.lives", "Each fact is a <b>property</b>. A dot reaches it: hero.lives."), S("Change", "✏️", "hero.lives = hero.lives − 1 changes only that property.")]),
    L("How fast does it grow?", growQ, [S("Halving", "✂️", "Halving over and over gets to 1 very quickly: 1000 needs only 10 halvings."), S("Why it matters", "⚡", "Binary search halves the list each time, so it handles huge lists in just a few steps."), S("Compare", "🐢🐇", "Checking every item is slow for big lists. Halving is fast.")]),
    L("Testing your code", testQ, [S("Test cases", "🧪", "A <b>test case</b> is an input plus the answer you expect. Run it to see if the code agrees."), S("Edge cases", "🚧", "Test strange inputs too: 0, negatives, empty lists, the biggest and smallest values."), S("Tip", "💡", "One passing test is not proof. Many different tests find more bugs.")]),
    L("Picking the right tool", TOOL, [S("Toolbox", "🧰", "Lists, loops, IFs, dictionaries, stacks, queues and functions are tools. Each one is good at a job."), S("Match", "🎯", "Many items: list. Repeat: loop. Decide: IF. Look up by name: dictionary."), S("Order", "↕️", "Undo: stack. Waiting line: queue. Reuse steps: function.")]),
    L("How the internet works", NET, [S("Network", "🌐", "The internet is a huge network of computers joined together."), S("Asking", "🖥️", "Your browser asks a web server for a page. The server sends it back in small packets."), S("Safe", "🛡️", "Use strong passwords, keep them secret, and tell a parent if anything online worries you.")])
  ];
  const M9 = [dictQ, stackQ, queueQ, recPrint, recVal, fibQ, cycleQ, nestCount, binAdd, hexQ, bigBits, rle, parity, objQ, growQ, testQ, TOOL, NET];
  L9.push(L("Mixed practice", mix(dictQ, stackQ, queueQ, recVal, fibQ, cycleQ, nestCount, binAdd, hexQ, rle, objQ), MIXS("dictionaries, stacks, queues, recursion, sequences, cycles, binary and hex, compression and objects.")));
  L9.push(L("Level 9 Challenge", mix(...M9), MIXS("everything from level 9: data structures, recursion, binary and hex, parity, testing and the internet.")));

  Object.assign(CODING_LEVELS, { 7: L7, 8: L8, 9: L9 });
})();
