// ext/coding-4-6.js  Mind Lab Coding levels 4-6 (60 lessons, unplugged pseudo-code)
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const mix = (...ms) => () => pick(ms)();
  const MIXS = t => [
    S("Review time!", "🔄", "This lesson mixes ideas you already know. Take your time and think about each one."),
    S("Remember", "🧠", t),
    S("Tip", "💡", "Go slowly. Trace the steps one line at a time and write down the numbers as you go.")
  ];
  const sp = "&nbsp;&nbsp;&nbsp;";
  const code = lines => `<div style="text-align:left;display:inline-block;font-family:monospace;background:#eef2ff;color:#1a2a55;padding:8px 14px;border-radius:10px;line-height:1.5">${lines.join("<br>")}</div>`;
  const big = h => `<span style="font-size:1.8em;font-family:monospace">${h}</span>`;
  const numChoices = (a, spread) => {
    const s = new Set([a]); let t = 0;
    while (s.size < 4 && t++ < 200) { const d = a + ri(-spread, spread); if (d !== a && d >= 0) s.add(d); }
    return shuf([...s]);
  };
  const nk = x => String(x).toLowerCase().replace(/[^a-z0-9]/g, "");
  const strChoices = (right, wrongs) => { const seen = new Set([nk(right)]), out = []; for (const w of wrongs) { if (!seen.has(nk(w))) { seen.add(nk(w)); out.push(w); } } return shuf([right, ...out.slice(0, 3)]); };
  const sameP = (a, b) => a[0] === b[0] && a[1] === b[1];

  // ---------- fact banks ----------
  const facts = (items, nudge, example) => () => {
    const [q, r, w, c, v] = pick(items);
    return { text: q, visual: v, choices: shuf([r, ...w]), answer: r, hints: [nudge, c, example] };
  };

  const ALGO = facts([
    ["What do we call a list of steps that solves a problem?", "an algorithm", ["a pixel", "a battery"], "It is like a recipe: step one, step two, step three."],
    ["Which word means the order of the steps?", "sequence", ["pixel", "battery"], "It is the word for first, next, then, last."],
    ["Which is the right order to make toast?", "put bread in, press the lever, take the toast out", ["take the toast out, press the lever, put bread in", "press the lever, take the toast out, put bread in"], "Think about what you must do before the toaster can work.", "🍞"],
    ["What is a program?", "an algorithm a computer can follow", ["a TV show", "a type of battery"], "A computer needs steps it can follow."],
    ["Who writes a program?", "a programmer", ["a pencil", "a window"], "It is a person who gives the computer its steps."],
    ["What does it mean to run a program?", "make the computer do the steps", ["delete the steps", "print the steps on paper"], "Think of pressing the start button."],
    ["Does a computer do exactly what the steps say?", "yes", ["no, it guesses what you meant"], "A computer cannot read your mind."],
    ["What is the best way to write steps for a computer?", "clear and exact", ["short and vague", "secret and silly"], "A computer cannot guess, so the steps must say just what to do."],
    ["Which one is an algorithm?", "steps to tie a shoe", ["a red shoe", "a loud sound"], "An algorithm is a list of steps, not a thing.", "👟"]
  ], "Think about steps that go in order, like a recipe.", "Example: the steps to wash a cup (fill the sink, scrub, rinse) are an algorithm. Now do yours.");

  const EVENTS = facts([
    ["A game says: when the space key is pressed, jump. What is the <b>event</b>?", "the space key is pressed", ["jump", "the game"], "The event is the thing that happens first.", "⌨️"],
    ["What is an event in a program?", "something that happens, like a click", ["a type of bug", "a battery"], "Clicks, taps and key presses are examples."],
    ["Which one is an event?", "tapping the screen", ["a blue square", "a number"], "An event is something a person or the computer does."],
    ["You click the green flag and a game starts. What starts the game?", "the click", ["a sleeping cat", "a loop"], "Look for the thing that happened."],
    ["When I press ⬆️, the player moves up. What is the <b>action</b>?", "the player moves up", ["press the up arrow", "the game"], "The action is what the program does in answer."],
    ["What is an action in a program?", "what the program does", ["a mistake", "a picture of a star"], "The event happens, then the program takes an action."],
    ["Which is an event: a button click or a purple background?", "a button click", ["a purple background"], "One of them is something that happens."],
    ["A game says: when I touch a coin, add one to the score. What is the event?", "touching the coin", ["adding one", "the score box"], "The event comes after the word when.", "🪙"],
    ["When the timer reaches zero, the screen says Time is up. What is the action?", "the screen says Time is up", ["the timer reaches zero", "a loop"], "The action is the answer the program gives.", "⏱️"]
  ], "Ask: what happens, and what does the program do about it?", "Example: when the doorbell rings (event), the dog barks (action). Now do yours.");

  const IFWORDS = facts([
    ["IF the light is red THEN stop. The light is red. What do you do?", "stop", ["go", "run"], "The rule matches what you see.", "🚦"],
    ["IF it is raining THEN take an umbrella. It is raining. What do you do?", "take an umbrella", ["leave it at home", "wear a swimsuit"], "Is the IF part true?", "🌧️"],
    ["IF you are hungry THEN eat a snack, ELSE drink water. You are not hungry. What happens?", "drink water", ["eat a snack", "do both"], "Is the IF part true? If not, look at the ELSE part.", "🥤"],
    ["IF the bell rings THEN line up. The bell rings. What do you do?", "line up", ["keep playing", "hide"], "The IF part is true, so do the THEN part.", "🔔"],
    ["IF it is cold THEN wear a coat, ELSE wear a T-shirt. It is hot. What do you wear?", "a T-shirt", ["a coat", "nothing"], "Is it cold? If not, ELSE happens.", "☀️"],
    ["IF the door is open THEN walk in, ELSE knock. The door is closed. What do you do?", "knock", ["walk in", "walk away forever"], "Is the door open? If not, ELSE happens.", "🚪"],
    ["IF the cup is empty THEN fill it, ELSE drink. The cup is full. What do you do?", "drink", ["fill it", "turn it upside down"], "Is the cup empty? If not, ELSE happens.", "🥛"],
    ["IF the game is over THEN show Game Over, ELSE keep playing. You still have lives left. What happens?", "keep playing", ["show Game Over", "the game turns off"], "Is the game over? If not, ELSE happens.", "🎮"],
    ["IF the score is 10 THEN you win. The score is 8. What happens?", "you do not win yet", ["you win", "the score is 10"], "Is the IF part true right now?", "🏆"]
  ], "Check if the IF part is true. If it is, do THEN. If not, do ELSE (if there is one).", "Example: IF the sun is out THEN wear a hat. The sun is out, so you wear a hat. Now do yours.");

  const BUGS = facts([
    ["What is a bug in a program?", "a mistake", ["a tiny helper", "a part of the screen"], "Think of something that is not right."],
    ["What does debugging mean?", "finding and fixing mistakes", ["making a program longer", "turning off the computer"], "A debugger fixes things."],
    ["A program should say Hello five times but says it only four times. What is the likely bug?", "the loop count is wrong", ["the screen is too big", "the keyboard is old"], "Which part controls how many times?"],
    ["Steps: put on your shoes, then put on your socks. What is the bug?", "the steps are in the wrong order", ["there are too many steps", "the shoes are small"], "Does the order make sense?", "🧦"],
    ["A good way to find a bug is to ...", "go line by line", ["close your eyes", "guess without checking"], "Slow and careful works best."],
    ["A program should add five but it subtracts five. What is the bug?", "the wrong operation", ["the program is too fast", "the loop is too long"], "Compare what it does with what it should do."],
    ["After you fix a bug, you should ...", "run it again and test", ["never run it again", "delete the program"], "How do you know it is fixed?"],
    ["Is it OK to make bugs when you code?", "yes, everyone makes them", ["no, only bad coders do", "no, never"], "Even expert programmers make bugs. What matters is fixing them."],
    ["A robot should turn right but it turns left. Where is the bug?", "in the turn command", ["in the robot's name", "nowhere"], "Which command sends it the wrong way?", "🤖"]
  ], "Think about what the program should do and what it really does.", "Example: a game should give 3 lives but gives 2. The bug is the number of lives. Now do yours.");

  const EFFIC = facts([
    ["You need to print a star one hundred times. What is smarter?", "use a loop", ["write print one hundred times", "do it by hand"], "Is there a tool that repeats things?", "⭐"],
    ["A short program that works is usually ...", "easier to read and fix", ["harder to read", "always full of bugs"], "Think about reading a short story or a long one."],
    ["To find a name in a sorted list, which is quicker?", "start in the middle and cut the list in half", ["look at every name from the start", "pick a name and stop"], "Can you throw away half of the names each time?", "📖"],
    ["Two programs give the same answer. One uses 5 steps, one uses 50. Which is more efficient?", "the 5-step one", ["the 50-step one", "they are the same"], "Efficient means less work."],
    ["What does efficient mean?", "doing the job with fewer steps", ["doing the job with more steps", "not doing the job"], "Think of the shortest good way."],
    ["The same code is written ten times. What could replace it?", "a loop or a function", ["a bug", "a bigger screen"], "Which tools let you reuse steps?"],
    ["What does a function help you do?", "reuse steps without rewriting them", ["make the screen brighter", "stop all loops"], "Think: write once, use many times."],
    ["A secret number is from 1 to 100. You always guess the middle. At most how many guesses do you need?", "7", ["50", "100"], "Each guess cuts the range in half. Halve a hundred again and again and count.", "🎯"],
    ["Which is the better name for a variable that holds the score?", "score", ["zzz", "it never matters"], "A good name tells you what is inside the box.", "📦"]
  ], "Think: which way does less work?", "Example: to color 20 squares, one loop is better than 20 separate lines. Now do yours.");

  const SAFE = facts([
    ["A website asks for your home address. What do you do?", "ask a grown-up first", ["type it right away", "post it for everyone"], "Private things need a grown-up's help.", "🏠"],
    ["A password should be ...", "kept secret", ["shared with friends", "written on the screen"], "A password is like the key to your house."],
    ["Which is a stronger password?", "a long mix of letters, numbers and symbols", ["1234", "your own name"], "Hard to guess is good."],
    ["Someone you do not know online asks to chat in private and keep it a secret. What do you do?", "stop and tell a parent", ["keep the secret", "send them a photo"], "Safe people do not ask kids to keep secrets.", "🛑"],
    ["Who should know your passwords?", "you and a parent", ["everyone at school", "anyone who asks"], "Only people you trust at home."],
    ["A pop-up says YOU WON A PRIZE, CLICK NOW. What do you do?", "do not click, tell a grown-up", ["click it fast", "type your name in"], "Tricks like this try to rush you.", "🎁"],
    ["Is everything you read online true?", "no, check with a grown-up or a trusted source", ["yes, always", "yes, if it has pictures"], "Anyone can write things online."],
    ["Should you send a photo of yourself to someone you do not know?", "no", ["yes"], "Keep your face and your details private."],
    ["When you finish on a shared computer you should ...", "log out", ["leave it open", "write your password on a note"], "Think about the next person who sits down.", "💻"]
  ], "Think about keeping yourself and your secrets safe.", "Example: if a game asks for your phone number, you ask a grown-up first. Now do yours.");

  // ---------- variables ----------
  const varTrace = (steps, kinds, two) => () => {
    for (let t = 0; t < 300; t++) {
      const v = { a: ri(2, 9), b: two ? ri(2, 9) : 0 };
      const lines = [`set a to ${v.a}`]; if (two) lines.push(`set b to ${v.b}`);
      let ok = true;
      for (let i = 0; i < steps && ok; i++) {
        const k = pick(kinds), x = two ? pick(["a", "b"]) : "a", y = x === "a" ? "b" : "a", n = ri(1, 5);
        if (k === "add") { v[x] += n; lines.push(`add ${n} to ${x}`); }
        else if (k === "sub") { if (v[x] - n < 0) { ok = false; break; } v[x] -= n; lines.push(`subtract ${n} from ${x}`); }
        else if (k === "copy") { v[x] = v[y]; lines.push(`set ${x} to ${y}`); }
        else if (k === "sum") { v[x] = v[x] + v[y]; lines.push(`set ${x} to ${x} + ${y}`); }
        else if (k === "dbl") { v[x] *= 2; lines.push(`double ${x}`); }
      }
      if (!ok || v.a > 40 || v.b > 40) continue;
      const tg = two ? pick(["a", "b"]) : "a";
      return {
        text: `What number is in <b>${tg}</b> at the end?`, visual: code(lines), answer: v[tg],
        hints: ["Go one line at a time from the top. Keep track of what is in each box.", "After each line, change only the box that line talks about. Say the new number out loud. \"set a to b\" copies b into a.", "Example: set a to 3, then add 2 to a. Now a holds 5. Do yours step by step."]
      };
    }
  };

  // ---------- loops ----------
  const EMO = ["⭐", "🍎", "🐱", "🌸", "🚀", "🍪", "🎈", "🐟"];
  const loopPrint = () => {
    const n = ri(2, 8), [e1, e2] = shuf(EMO), two = Math.random() < 0.5;
    const lines = [`repeat ${n} times`, `${sp}print ${e1}`]; if (two) lines.push(`${sp}print ${e2}`);
    const asE1 = two && Math.random() < 0.5;
    return {
      text: asE1 ? `How many ${e1} does this program print?` : "How many things does this program print in all?", visual: code(lines),
      answer: asE1 ? n : n * (two ? 2 : 1),
      hints: ["The lines inside the loop happen again and again. How many times does it repeat?", "Count the prints inside the loop for one trip. Then multiply by the number of trips (or count by that number).", "Example: repeat 3 times, print 🍎 and print 🍌. Each trip prints two things, so skip count: 2, 4, 6. Now do yours."]
    };
  };
  const loopNested = () => {
    const r = ri(2, 5), c = ri(2, 5);
    const lines = [`repeat ${r} times`, `${sp}repeat ${c} times`, `${sp}${sp}print ⭐`];
    return {
      text: "How many ⭐ does this program print in all?", visual: code(lines), answer: r * c,
      hints: ["There is a loop inside a loop. The inside loop runs again every time the outside loop runs.", "Work out how many ⭐ one trip of the outside loop makes. Then count that many for each outside trip.", "Example: repeat 2 times, and inside repeat 3 times print ⭐. Each outside trip prints three, so 3 + 3 = 6. Now do yours."]
    };
  };
  const loopAcc = modes => () => {
    const m = pick(modes); let n = ri(2, 5), k, s, j, lines, ans;
    if (m === "add") { k = ri(2, 6); s = ri(0, 8); lines = [`set total to ${s}`, `repeat ${n} times`, `${sp}add ${k} to total`]; ans = s + n * k; }
    else if (m === "sub") { k = ri(1, 4); s = n * k + ri(0, 6); lines = [`set total to ${s}`, `repeat ${n} times`, `${sp}subtract ${k} from total`]; ans = s - n * k; }
    else if (m === "dbl") { n = ri(2, 4); s = ri(1, 4); lines = [`set total to ${s}`, `repeat ${n} times`, `${sp}double total`]; ans = s * Math.pow(2, n); }
    else { k = ri(1, 4); j = ri(1, 4); s = ri(0, 5); lines = [`set total to ${s}`, `repeat ${n} times`, `${sp}add ${k} to total`, `${sp}add ${j} to total`]; ans = s + n * (k + j); }
    return {
      text: "What is in <b>total</b> when the program ends?", visual: code(lines), answer: ans,
      hints: ["Start with the first line. Then do the lines inside the loop, once for each trip.", "After each trip around the loop, write down the new total. Stop when you have done all the trips.", "Example: set total to 1, then repeat 3 times add 2 to total. It goes 3, 5, 7. Now do yours."]
    };
  };
  const loopFor = () => {
    const kind = ri(0, 2);
    if (kind === 0) {
      const n = ri(3, 6), lines = ["set total to 0", `for i from 1 to ${n}`, `${sp}add i to total`];
      return { text: "What is in <b>total</b> at the end?", visual: code(lines), answer: n * (n + 1) / 2,
        hints: ["The letter i is a counter. It takes a new value on every trip.", "On the first trip i is the starting number. It goes up by one each trip. Add each value into total.", "Example: for i from 1 to 3, add i to total. That is 1 + 2 + 3 = 6. Now do yours."] };
    }
    const a = ri(1, 5), b = a + ri(3, 7);
    if (kind === 1) {
      return { text: "How many numbers does this program print?", visual: code([`for i from ${a} to ${b}`, `${sp}print i`]), answer: b - a + 1,
        hints: ["Write out every number the counter i takes. Do not forget the first one.", "Both the first and last numbers are printed. Count them all.", "Example: for i from 2 to 4 prints 2, 3, 4. That is three numbers. Now do yours."] };
    }
    return { text: "What is the <b>last</b> number this program prints?", visual: code([`for i from ${a} to ${b}`, `${sp}print i`]), answer: b,
      hints: ["The counter i stops at the end number.", "The loop includes the end number, so look at the number after the word to.", "Example: for i from 1 to 6 prints up to the number after to. Now do yours."] };
  };
  const loopIf = () => {
    const n = ri(8, 14), c = pick([["i is even", i => i % 2 === 0], ["i is odd", i => i % 2 === 1], ["i is a multiple of 3", i => i % 3 === 0], [`i is bigger than ${ri(3, 6)}`, null]]);
    let test = c[1], label = c[0];
    if (!test) { const T = +label.split(" ").pop(); test = i => i > T; }
    let cnt = 0; for (let i = 1; i <= n; i++) if (test(i)) cnt++;
    return {
      text: "How many numbers does this program print?", visual: code([`for i from 1 to ${n}`, `${sp}if ${label}`, `${sp}${sp}print i`]), answer: cnt,
      hints: ["Go through the numbers from the start. Only print when the IF part is true.", "Check each number one by one. Write down the ones that pass the test, then count them.", "Example: for i from 1 to 5, if i is even print i. The numbers 2 and 4 pass. That is two prints. Now do yours."]
    };
  };
  const whileLoop = () => {
    const down = Math.random() < 0.4, k = ri(2, 4), askTimes = Math.random() < 0.5;
    let lines, times, fin;
    if (!down) {
      const s = ri(0, 4), lim = s + k * ri(2, 4) + ri(1, k - 1);
      times = Math.ceil((lim - s) / k); fin = s + times * k;
      lines = [`set x to ${s}`, `while x &lt; ${lim}`, `${sp}add ${k} to x`];
    } else {
      const lim = ri(4, 8), s = lim + k * ri(2, 4) + ri(1, k - 1);
      times = Math.ceil((s - lim) / k); fin = s - times * k;
      lines = [`set x to ${s}`, `while x &gt; ${lim}`, `${sp}subtract ${k} from x`];
    }
    return {
      text: askTimes ? "How many times does the loop run?" : "What is <b>x</b> when the loop stops?", visual: code(lines), answer: askTimes ? times : fin,
      hints: ["A while loop checks the test first. If the test is true it runs the lines inside, then checks again.", "Write x after each trip. As soon as the test is false, the loop stops and does not run again.", "Example: set x to 1, while x < 4, add 1 to x. x goes 2, 3, 4 and then the test is false. Now do yours."]
    };
  };
  const offByOne = () => {
    const n = ri(4, 9), le = Math.random() < 0.5;
    const lines = ["set i to 1", `while i ${le ? "≤" : "&lt;"} ${n}`, `${sp}print i`, `${sp}add 1 to i`];
    if (Math.random() < 0.5) {
      return { text: "What is the <b>last</b> number this program prints?", visual: code(lines), answer: le ? n : n - 1,
        hints: ["Look at the test very carefully. Does it allow the end number, or stop just before it?", "The sign < means smaller than, so the end number itself fails. The sign ≤ means smaller than or equal, so the end number passes.", "Example: while i < 3 prints 1 and 2. The 3 fails the test. Now do yours."] };
    }
    const lines2 = ["set i to 1", "while i ___ " + n, `${sp}print i`, `${sp}add 1 to i`];
    return { text: `We want to print the numbers 1 to ${n}. Which sign goes in the blank?`, visual: code(lines2), choices: ["≤", "&lt;", "&gt;"], answer: "≤",
      hints: ["The last number to print is the end number. It must pass the test.", "You need a sign that is true when i is smaller than the end number and also when it is equal to it.", "Example: to print 1 to 4, the test must still be true when i is 4. Now do yours."] };
  };

  // ---------- compare / if / logic ----------
  const OPS = {
    ">": ["&gt;", (a, b) => a > b, "greater than"], "<": ["&lt;", (a, b) => a < b, "less than"], "=": ["=", (a, b) => a === b, "equal to"],
    "≥": ["≥", (a, b) => a >= b, "greater than or equal to"], "≤": ["≤", (a, b) => a <= b, "less than or equal to"], "≠": ["≠", (a, b) => a !== b, "not equal to"]
  };
  const compareTF = ops => () => {
    const op = pick(ops), a = ri(1, 12), b = Math.random() < 0.25 ? a : ri(1, 12);
    return {
      text: "Is this true or false?", visual: big(`${a} ${OPS[op][0]} ${b}`), choices: ["true", "false"], answer: OPS[op][1](a, b) ? "true" : "false",
      hints: ["Look at the sign in the middle. Say it in words.", "Say the whole thing out loud, like: the first number is (the sign in words) the second number. Is that right?", "Example: 9 > 4 says nine is greater than four. That is true. Now do yours."]
    };
  };
  const ifElseNum = ops => () => {
    const op = pick(ops), T = ri(3, 12), x = Math.random() < 0.25 ? T : ri(1, 15);
    const [p, q] = pick([["big", "small"], ["yes", "no"], ["win", "try again"], ["high", "low"], ["go", "stop"]]);
    const t = OPS[op][1](x, T);
    return {
      text: "What does this program say?", visual: code([`set x to ${x}`, `if x ${OPS[op][0]} ${T}`, `${sp}say "${p}"`, "else", `${sp}say "${q}"`]),
      choices: [p, q], answer: t ? p : q,
      hints: ["First check the test after the word if. Is it true or false?", "If the test is true, do the lines under if. If it is false, do the lines under else.", "Example: x is 2 and the test is x > 5. That is false, so the else line runs. Now do yours."]
    };
  };
  const logic = kinds => () => {
    for (let t = 0; t < 100; t++) {
      const k = pick(kinds), a = ri(1, 10), b = ri(1, 10), t1 = ri(2, 9), t2 = ri(2, 9);
      const c1 = a > t1, c2 = b < t2; let ans, ex;
      if (k === "and") { ans = c1 && c2; ex = `(a &gt; ${t1}) and (b &lt; ${t2})`; }
      else if (k === "or") { ans = c1 || c2; ex = `(a &gt; ${t1}) or (b &lt; ${t2})`; }
      else { ans = !c1; ex = `not (a &gt; ${t1})`; }
      if (ans !== (Math.random() < 0.5)) continue;
      return {
        text: "Is this true or false?", visual: code([`set a to ${a}`, `set b to ${b}`]) + "<br>" + big(ex), choices: ["true", "false"], answer: ans ? "true" : "false",
        hints: ["Check each small test on its own first. Then put the answers together.", "and is true only when both parts are true. or is true when at least one part is true. not flips true to false and false to true.", "Example: (true and false) is false, (true or false) is true, and not true is false. Now do yours."]
      };
    }
  };
  const elseIf = () => {
    const t1 = ri(8, 12) * 5, t2 = t1 - ri(2, 4) * 5, s = ri(1, 20) * 5;
    const [g1, g2, g3] = pick([["gold", "silver", "bronze"], ["A", "B", "C"], ["big", "medium", "small"], ["hot", "warm", "cold"]]);
    const ans = s >= t1 ? g1 : s >= t2 ? g2 : g3;
    return {
      text: "What does this program say?", visual: code([`set score to ${s}`, `if score ≥ ${t1}`, `${sp}say "${g1}"`, `else if score ≥ ${t2}`, `${sp}say "${g2}"`, "else", `${sp}say "${g3}"`]),
      choices: [g1, g2, g3], answer: ans,
      hints: ["Check the tests from the top. Stop at the first one that is true.", "If the first test is false, move down to the next test. If every test is false, the else line runs.", "Example: score is 40. Test one is score ≥ 90 (false), test two is score ≥ 50 (false), so the else line runs. Now do yours."]
    };
  };

  // ---------- patterns ----------
  const patSeq = () => {
    const k = pick(["add", "add", "sub", "dbl", "grow"]); let seq = [], rule;
    if (k === "add") { const st = ri(2, 9), a = ri(1, 15); for (let i = 0; i < 5; i++) seq.push(a + i * st); rule = `add ${st}`; }
    else if (k === "sub") { const st = ri(2, 6), a = st * 6 + ri(0, 10); for (let i = 0; i < 5; i++) seq.push(a - i * st); rule = `subtract ${st}`; }
    else if (k === "dbl") { const a = ri(1, 4); for (let i = 0; i < 5; i++) seq.push(a * Math.pow(2, i)); rule = "double"; }
    else { const a = ri(1, 6); let c = a; for (let i = 0; i < 5; i++) { seq.push(c); c += i + 1; } rule = "add one more each time (+1, +2, +3 ...)"; }
    return { seq, rule, k };
  };
  const patNext = () => {
    const p = patSeq(), shown = p.seq.slice(0, 4);
    return {
      text: "What number comes next?", visual: big(shown.join(", ") + ", ?"), answer: p.seq[4],
      hints: ["Look at how far each number is from the one before it.", "Find the rule that turns each number into the next one: adding, subtracting, doubling, or growing steps. Then use it once more.", "Example: 2, 5, 8, 11 adds three each time, so next is 14. Now do yours."]
    };
  };
  const patRule = () => {
    const p = patSeq(), shown = p.seq.slice(0, 4), ruleWrong = ["add 2", "add 3", "add 5", "subtract 2", "subtract 3", "double", "add one more each time (+1, +2, +3 ...)"];
    return {
      text: "What is the rule for this pattern?", visual: big(shown.join(", ") + ", ..."), choices: strChoices(p.rule, shuf(ruleWrong)), answer: p.rule,
      hints: ["Compare the first two numbers. What happened to go from one to the other?", "Check that the same thing happens between the next pair too. A rule must work every time.", "Example: 3, 6, 12, 24. Each number is twice the one before, so the rule is double. Now do yours."]
    };
  };

  // ---------- sprite / coordinates ----------
  const coordsX = () => {
    for (let t = 0; t < 100; t++) {
      let x = ri(1, 8); const lines = [`set x to ${x}`]; const m = ri(2, 3);
      for (let i = 0; i < m; i++) {
        const n = ri(1, 5);
        if (Math.random() < 0.5) { x += n; lines.push(`move right ${n}`); } else { if (x - n < 0) continue; x -= n; lines.push(`move left ${n}`); }
      }
      if (lines.length < 3) continue;
      return {
        text: "A sprite starts at the x number shown. Where is it at the end? (Right means bigger, left means smaller.)", visual: code(lines), answer: x,
        hints: ["The x number tells how far across the screen the sprite is.", "Moving right makes x bigger. Moving left makes x smaller. Do each move in order.", "Example: x is 4, move right 3, move left 2. 4 → 7 → 5. Now do yours."]
      };
    }
  };
  const coordsXY = () => {
    for (let t = 0; t < 200; t++) {
      let x = ri(1, 6), y = ri(1, 6); const lines = [`set x to ${x}, set y to ${y}`]; const m = ri(2, 3); let ok = true;
      for (let i = 0; i < m; i++) {
        const n = ri(1, 4), d = pick(["right", "left", "up", "down"]);
        if (d === "right") x += n; else if (d === "left") x -= n; else if (d === "up") y += n; else y -= n;
        lines.push(`move ${d} ${n}`);
        if (x < 0 || y < 0 || x > 10 || y > 10) ok = false;
      }
      if (!ok) continue;
      const right = `(${x}, ${y})`, wr = [`(${y}, ${x})`, `(${x + 1}, ${y})`, `(${x}, ${y + 1})`, `(${x - 1}, ${y})`, `(${x}, ${y - 1})`];
      return {
        text: "Where is the sprite at the end? Positions are written (x, y).", visual: code(lines), choices: strChoices(right, shuf(wr)), answer: right,
        hints: ["Remember that x is across and y is up. Move left or right changes x. Move up or down changes y.", "Up makes y bigger and down makes y smaller. Right makes x bigger and left makes x smaller. Do one move at a time.", "Example: start (2, 3), move right 4, move up 1. x goes to 6 and y goes to 4, so (6, 4). Now do yours."]
      };
    }
  };

  // ---------- robot grid ----------
  const DIRS = { right: [0, 1], left: [0, -1], up: [-1, 0], down: [1, 0] };
  const AR = { right: "➡️", left: "⬅️", up: "⬆️", down: "⬇️" };
  const DN = ["up", "down", "left", "right"];
  const inb = (n, p) => p[0] >= 0 && p[1] >= 0 && p[0] < n && p[1] < n;
  const POOL = [["🍎", "apple"], ["🍌", "banana"], ["🍇", "grapes"], ["🍓", "strawberry"], ["🍊", "orange"], ["🍉", "melon"], ["🍒", "cherries"], ["🍑", "peach"], ["🍍", "pineapple"], ["🥝", "kiwi"], ["🍋", "lemon"], ["🥕", "carrot"], ["🌽", "corn"], ["🍄", "mushroom"], ["🌸", "flower"], ["🌟", "star"], ["🐱", "cat"], ["🐶", "dog"], ["🐸", "frog"], ["🦊", "fox"], ["🐼", "panda"], ["🐧", "penguin"], ["🚗", "car"], ["⚽", "ball"], ["🎈", "balloon"]];
  const gridRun = (n, blocks, maxRep, rep) => () => {
    for (let t = 0; t < 400; t++) {
      const cells = shuf(POOL).slice(0, n * n), s = [ri(0, n - 1), ri(0, n - 1)];
      let pos = s, ok = true; const prog = [];
      for (let b = 0; b < blocks; b++) {
        const d = pick(DN), c = rep ? ri(1, maxRep) : 1, np = [pos[0] + DIRS[d][0] * c, pos[1] + DIRS[d][1] * c];
        if (!inb(n, np)) { ok = false; break; }
        pos = np; prog.push([d, c]);
      }
      if (!ok || sameP(s, pos) || (rep && !prog.some(x => x[1] > 1))) continue;
      const lab = x => `${x[0]} ${x[1]}`, at = q => lab(cells[q[0] * n + q[1]]), right = at(pos), lines = [];
      prog.forEach(([d, c]) => { if (c > 1) { lines.push(`repeat ${c} times`); lines.push(`${sp}${AR[d]} ${d}`); } else lines.push(`${AR[d]} ${d}`); });
      const grid = `<div style="line-height:1.3;font-size:1.5em">` + Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => cells[r * n + c][0]).join("")).join("<br>") + "</div>";
      return {
        text: `The 🤖 starts on the <b>${at(s)}</b> and runs this program. Which picture is it on at the end?`, visual: grid + code(lines),
        choices: shuf([right, ...shuf(cells.map(lab).filter(x => x !== right)).slice(0, 3)]), answer: right,
        hints: ["Find the starting picture in the grid. Put your finger on it.", "Move your finger one square for each arrow. A repeat means do the arrow that many times in a row.", "Example: starting on a 🍎, \"repeat 2 times ➡️\" moves two squares to the right. Now do yours."]
      };
    }
  };

  // ---------- functions ----------
  const fnOne = kinds => () => {
    const k = pick(kinds), x = ri(2, 9), n = ri(2, 6);
    let body, ans;
    if (k === "add") { body = [`${sp}return x + ${n}`]; ans = x + n; }
    else if (k === "sub") { const xx = x + n; return mk([`${sp}return x − ${n}`], xx, xx - n); }
    else if (k === "mul") { body = [`${sp}return x × ${n}`]; ans = x * n; }
    else if (k === "two") { const m = ri(2, 3); body = [`${sp}set y to x × ${m}`, `${sp}return y + ${n}`]; ans = x * m + n; }
    else { body = [`${sp}set y to x + ${n}`, `${sp}return y × 2`]; ans = (x + n) * 2; }
    return mk(body, x, ans);
    function mk(b, xv, a) {
      return {
        text: `What does <b>f(${xv})</b> give?`, visual: code(["function f(x)", ...b]), answer: a,
        hints: ["The number in the brackets goes in where you see x.", "Put the number in for x, then do the lines inside the function one at a time. The number after return is the answer.", "Example: function f(x) returns x + 4. Then f(3) is 3 + 4 = 7. Now do yours."]
      };
    }
  };
  const fnNest = () => {
    const x = ri(1, 6), n = ri(1, 4), mul = Math.random() < 0.4;
    const body = mul ? `${sp}return x × 2` : `${sp}return x + ${n}`;
    const inner = mul ? x * 2 : x + n, ans = mul ? inner * 2 : inner + n;
    return {
      text: `What does <b>f(f(${x}))</b> give?`, visual: code(["function f(x)", body]), answer: ans,
      hints: ["Work from the inside out. Do the inner f first.", "The answer from the inner f goes into the outer f. So you use the function two times in a row.", "Example: f(x) returns x + 2. f(f(1)): the inner f(1) is 3, then f(3) is 5. Now do yours."]
    };
  };
  const fnTwo = () => {
    for (;;) {
      const a = ri(2, 9), b = ri(2, 9), k = pick(["a + b", "a × b", "a × 2 + b", "a + b + 1", "a − b"]);
      if (k === "a − b" && a <= b) continue;
      const ans = k === "a + b" ? a + b : k === "a × b" ? a * b : k === "a × 2 + b" ? a * 2 + b : k === "a + b + 1" ? a + b + 1 : a - b;
      return {
        text: `What does <b>g(${a}, ${b})</b> give?`, visual: code(["function g(a, b)", `${sp}return ${k}`]), answer: ans,
        hints: ["Two numbers go in. The first goes to a and the second goes to b.", "Swap a and b for their numbers in the return line. Then do the math in order.", "Example: if g(a, b) returns a × 2 + b, then g(3, 4) is 3 × 2 + 4 = 10. Now do yours."]
      };
    }
  };
  const fnIf = () => {
    const a = ri(1, 12), b = ri(1, 12); if (a === b) return fnIf();
    const k = pick(["bigger", "smaller", "gap"]);
    const body = k === "bigger" ? ["if a &gt; b", `${sp}return a`, "else", `${sp}return b`] : k === "smaller" ? ["if a &lt; b", `${sp}return a`, "else", `${sp}return b`] : ["if a &gt; b", `${sp}return a − b`, "else", `${sp}return b − a`];
    const ans = k === "bigger" ? Math.max(a, b) : k === "smaller" ? Math.min(a, b) : Math.abs(a - b);
    return {
      text: `What does <b>h(${a}, ${b})</b> give?`, visual: code(["function h(a, b)", ...body.map(x => sp + x)]), answer: ans,
      hints: ["Put the two numbers in for a and b. Then check the if test.", "If the test is true, use the first return line. If it is false, use the return line under else.", "Example: if a > b return a, else return b. With h(2, 9) the test is false, so it returns 9. Now do yours."]
    };
  };

  // ---------- lists ----------
  const rl = (len, lo, hi, distinct) => { const s = []; while (s.length < len) { const x = ri(lo, hi); if (!distinct || !s.includes(x)) s.push(x); } return s; };
  const lst = a => `set list to [${a.join(", ")}]`;
  const listItem = () => {
    const a = rl(ri(4, 6), 1, 30), p = ri(1, a.length);
    return {
      text: `What is item number <b>${p}</b> in the list? (Count from 1.)`, visual: code([lst(a)]), answer: a[p - 1],
      hints: ["Items in a list have numbers: the first item is number one.", "Put your finger on the first item and count along until you reach the number you need.", "Example: in [8, 3, 5], item number 2 is 3. Now do yours."]
    };
  };
  const listEdit = () => {
    for (let t = 0; t < 100; t++) {
      let a = rl(ri(3, 5), 1, 20); const lines = [lst(a)], m = ri(1, 2);
      for (let i = 0; i < m; i++) {
        const k = pick(["add", "removeLast", "removeFirst"]);
        if (k === "add") { const v = ri(1, 20); a = [...a, v]; lines.push(`add ${v} to the end`); }
        else if (k === "removeLast" && a.length > 1) { a = a.slice(0, -1); lines.push("remove the last item"); }
        else if (k === "removeFirst" && a.length > 1) { a = a.slice(1); lines.push("remove the first item"); }
      }
      if (lines.length < 2) continue;
      const q = pick(["len", "first", "last"]);
      return {
        text: q === "len" ? "How many items are in the list at the end?" : q === "first" ? "What is the <b>first</b> item at the end?" : "What is the <b>last</b> item at the end?",
        visual: code(lines), answer: q === "len" ? a.length : q === "first" ? a[0] : a[a.length - 1],
        hints: ["Change the list one line at a time. Write the new list after each line.", "Add puts a new item at the end of the list. Remove takes one away from the end or from the start.", "Example: [4, 7] then add 9 to the end gives [4, 7, 9]. Then remove the first item gives [7, 9]. Now do yours."]
      };
    }
  };
  const listSum = () => {
    const a = rl(ri(3, 5), 1, 9);
    return { text: "What do all the items in the list add up to?", visual: code([lst(a)]), answer: a.reduce((x, y) => x + y, 0),
      hints: ["Add the items one by one, from the left.", "Keep a running total. Add the next item to the total each time.", "Example: [2, 5, 3]. 2 + 5 = 7, then 7 + 3 = 10. Now do yours."] };
  };
  const listMaxMin = () => {
    const a = rl(ri(5, 7), 1, 40, true), mx = Math.random() < 0.5;
    return { text: `What is the ${mx ? "<b>biggest</b>" : "<b>smallest</b>"} number in the list?`, visual: code([lst(a)]), answer: mx ? Math.max(...a) : Math.min(...a),
      hints: ["Keep one number in your head as the best so far.", "Look at each item. If it beats your best so far, remember the new one instead.", "Example: [4, 9, 2]. Best so far is 4, then 9 is bigger so keep 9, then 2 is not bigger. Biggest is 9. Now do yours."] };
  };
  const listCount = () => {
    const a = rl(ri(6, 8), 1, 20), T = ri(5, 12), kind = pick(["gt", "even", "odd"]);
    const f = kind === "gt" ? x => x > T : kind === "even" ? x => x % 2 === 0 : x => x % 2 === 1;
    const lab = kind === "gt" ? `bigger than ${T}` : kind === "even" ? "even" : "odd";
    return { text: `How many items in the list are <b>${lab}</b>?`, visual: code([lst(a)]), answer: a.filter(f).length,
      hints: ["Look at the items one at a time. Ask the question about each one.", "Make a tally mark each time the answer is yes. At the end, count the marks.", "Example: [3, 8, 5, 6] and the question is even. 8 and 6 are even, so the count is two. Now do yours."] };
  };
  const listIndex = () => {
    const a = rl(ri(5, 8), 1, 30, true), p = ri(1, a.length);
    return { text: `At which position is <b>${a[p - 1]}</b> in the list? (Count from 1.)`, visual: code([lst(a)]), answer: p,
      hints: ["Find the number in the list first.", "Now count from the first item to it. The first item is position one.", "Example: in [6, 2, 9], the number 9 is at position 3. Now do yours."] };
  };
  const searchChecks = () => {
    const a = rl(ri(5, 8), 1, 30, true), found = Math.random() < 0.6;
    let v; if (found) v = pick(a); else { do { v = ri(1, 30); } while (a.includes(v)); }
    return { text: `You search for <b>${v}</b> by checking the items from left to right. You stop when you find it, or when the list ends. How many items do you check?`, visual: code([lst(a)]), answer: found ? a.indexOf(v) + 1 : a.length,
      hints: ["Start at the first item and check them one at a time.", "If the number is in the list, you stop as soon as you find it. If it is not in the list, you have to check every item.", "Example: look for 4 in [8, 4, 1]. You check 8, then 4 and stop. That is two checks. Now do yours."] };
  };
  const guessHalf = () => {
    const N = pick([10, 16, 20, 30, 40, 50, 100]);
    const rounds = ri(1, 2); let lo = 1, hi = N; const lines = [`The secret number is from 1 to ${N}. You always guess the middle (round down).`];
    for (let i = 0; i < rounds; i++) {
      const mid = Math.floor((lo + hi) / 2), low = Math.random() < 0.5;
      lines.push(`Guess ${mid}: the secret number is ${low ? "bigger" : "smaller"}.`);
      if (low) lo = mid + 1; else hi = mid - 1;
    }
    const wantMin = Math.random() < 0.5;
    return {
      text: `${lines.join("<br>")}<br>What is the ${wantMin ? "<b>smallest</b>" : "<b>biggest</b>"} the secret number can be now?`, answer: wantMin ? lo : hi,
      hints: ["Each guess lets you throw away a whole part of the range.", "If the secret is bigger, throw away the guess and everything below it. If it is smaller, throw away the guess and everything above it.", "Example: range 1 to 8, guess 4, the secret is bigger. Now it can only be 5 to 8. Now do yours."]
    };
  };
  const sortChoice = () => {
    const a = rl(ri(4, 5), 1, 30, true), up = Math.random() < 0.6;
    const srt = [...a].sort((x, y) => up - 0.5 > 0 ? x - y : y - x), s = x => x.join(", ");
    const asc = [...a].sort((x, y) => x - y), desc = [...asc].reverse();
    const sw = [...srt]; const i = ri(0, sw.length - 2); [sw[i], sw[i + 1]] = [sw[i + 1], sw[i]];
    return {
      text: `Which list is in order from ${up ? "smallest to biggest" : "biggest to smallest"}?`, choices: strChoices(s(srt), [s(up ? desc : asc), s(sw), s(a)]), answer: s(srt),
      hints: ["Sorted means each number is in its place, like a line from short to tall.", "Look at each pair of neighbors. In the right list, every neighbor pair goes the same way.", "Example: 2, 5, 8, 9 is sorted from smallest to biggest, because every number is bigger than the one before. Now do yours."]
    };
  };
  const selStep = () => {
    const a = rl(5, 1, 30, true), mi = a.indexOf(Math.min(...a)), b = [...a]; [b[0], b[mi]] = [b[mi], b[0]];
    const s = x => x.join(", "), asc = [...a].sort((x, y) => x - y);
    const wr = [s(a), s(asc)]; const c2 = [...a]; [c2[0], c2[4]] = [c2[4], c2[0]]; wr.push(s(c2));
    return {
      text: `A sorting step: find the <b>smallest</b> number and swap it with the first item. Start: [${s(a)}]. What is the list after this one step?`,
      choices: strChoices(`[${s(b)}]`, wr.map(x => `[${x}]`).concat([`[${s(a.slice(1))}]`])), answer: `[${s(b)}]`,
      hints: ["Look for the smallest number in the whole list first.", "Only two items change places: the smallest and the first item. Everything else stays where it is.", "Example: [5, 2, 7] has smallest 2. Swap 2 and 5 to get [2, 5, 7]. Now do yours."]
    };
  };

  // ---------- strings ----------
  const strLen = () => {
    const w = pick(["cat", "apple", "banana", "robot", "pizza", "computer", "sunshine", "dragon", "pencil", "rocket", "tree", "keyboard"]);
    return { text: `How many letters are in the word <b>${w}</b>?`, visual: big(`"${w}"`), answer: w.length,
      hints: ["Count each letter one at a time.", "Touch each letter as you count. Do not skip any.", "Example: the word \"sun\" has the letters s, u, n. That is three letters. Now do yours."] };
  };
  const JOINS = [["sun", "flower"], ["rain", "bow"], ["butter", "fly"], ["foot", "ball"], ["cup", "cake"], ["pop", "corn"], ["star", "fish"], ["snow", "man"], ["sail", "boat"], ["book", "mark"]];
  const strJoin = () => {
    const [a, b] = pick(JOINS);
    return { text: `What word does <b>join("${a}", "${b}")</b> make? (Type it.)`, textInput: true, answer: a + b,
      hints: ["Join means stick the two words together.", "Write the first word, then write the second word right after it with no space.", "Example: join(\"air\", \"port\") makes the word airport. Now do yours."] };
  };
  const strChar = () => {
    const w = pick(["apple", "robot", "planet", "tiger", "castle", "dragon", "rocket", "island", "puzzle"]), p = ri(1, w.length), ans = w[p - 1];
    const others = shuf([...new Set("abcdefghijklmnopqrstuvwxyz".split("").filter(x => x !== ans))]).slice(0, 3);
    return { text: `What is letter number <b>${p}</b> of the word <b>${w}</b>? (Count from 1.)`, choices: shuf([ans, ...others]), answer: ans,
      hints: ["Letters have numbers just like items in a list. The first letter is number one.", "Count along the word, one letter for each number, until you reach the number you need.", "Example: letter number 2 of \"moon\" is o. Now do yours."] };
  };
  const REVS = [["tap", "pat"], ["dog", "god"], ["tub", "but"], ["was", "saw"], ["pit", "tip"], ["net", "ten"], ["star", "rats"], ["draw", "ward"], ["part", "trap"], ["live", "evil"]];
  const strRev = () => {
    const [a, b] = pick(REVS);
    return { text: `What does <b>reverse("${a}")</b> give? (Type it.)`, textInput: true, answer: b,
      hints: ["Reverse means to flip the word around backward.", "Read the letters from the last letter back to the first letter and write them down in that order.", "Example: reverse(\"bus\") reads s, u, b, so it gives sub. Now do yours."] };
  };

  // ---------- binary ----------
  const PV = [16, 8, 4, 2, 1];
  const binVis = (nb, b) => {
    const pv = PV.slice(5 - nb), cell = x => `<span style="display:inline-block;width:1.8em;text-align:center">${x}</span>`;
    return `<div style="font-family:monospace;font-size:1.4em;line-height:1.4">${pv.map(cell).join("")}<br>${b ? b.split("").map(cell).join("") : ""}</div>`;
  };
  const pad = (n, nb) => n.toString(2).padStart(nb, "0");
  const bitsToNum = nb => () => {
    const n = ri(1, Math.pow(2, nb) - 1), b = pad(n, nb);
    return { text: "This is a binary number. A 1 means that place value counts. What number is it?", visual: binVis(nb, b), answer: n,
      hints: ["Each box has a place value on top. A 1 under it means you count that value.", "Find every 1. Add up the place values above the 1s. The 0s add nothing.", "Example: with places 4, 2, 1, the bits 1 0 1 mean 4 + 1 = 5. Now do yours."] };
  };
  const numToBin = nb => () => {
    const n = ri(1, Math.pow(2, nb) - 1), right = pad(n, nb), wr = [];
    for (let i = 0; i < nb; i++) { const c = right.split(""); c[i] = c[i] === "1" ? "0" : "1"; wr.push(c.join("")); }
    return { text: `Which binary number is <b>${n}</b>?`, visual: binVis(nb, ""), choices: strChoices(right, shuf(wr).filter(x => x !== "0".repeat(nb))), answer: right,
      hints: ["Use the place values on top. Which ones add up to the number?", "Start with the biggest place value that fits. Put a 1 there, then see what is left. Put 0 under any place value you do not use.", "Example: to make 6 with places 4, 2, 1: use 4 and 2. That is 1 1 0. Now do yours."] };
  };
  const binNext = nb => () => {
    const n = ri(1, Math.pow(2, nb) - 2), right = pad(n + 1, nb), wr = [pad(n, nb), pad(n + 2 > Math.pow(2, nb) - 1 ? n - 1 : n + 2, nb), pad(Math.max(n - 1, 0), nb)];
    return { text: `Counting in binary, what comes after <b>${pad(n, nb)}</b>?`, visual: binVis(nb, ""), choices: strChoices(right, wr), answer: right,
      hints: ["Change the binary number into a normal number first.", "Add one to the normal number. Then change that number back into binary with the place values.", "Example: with places 4, 2, 1: 0 1 1 is 3. The next is 4, which is 1 0 0. Now do yours."] };
  };

  // ---------- debugging ----------
  const debugCount = () => {
    const goal = ri(3, 9), bad = goal + pick([-2, -1, 1, 2]), e = pick(EMO);
    if (bad < 1) return debugCount();
    return { text: `The program should print ${goal} of ${e}. But it prints a different number. What number should go after <b>repeat</b>?`, visual: code([`repeat ${bad} times`, `${sp}print ${e}`]), answer: goal,
      hints: ["Compare how many it prints with how many it should print.", "The number after repeat is the number of times. Which number makes the right amount?", "Example: a program should print 4 stars but says repeat 5 times. It should say repeat 4. Now do yours."] };
  };
  const debugLines = () => {
    const s = ri(2, 9), n = ri(2, 5), m = ri(2, 5), goal = s + n + m, bugLine = ri(2, 3);
    const l = [`set x to ${s}`, `add ${n} to x`, `add ${m} to x`];
    l[bugLine - 1] = (bugLine === 2 ? `subtract ${n} from x` : `subtract ${m} from x`);
    return { text: `The program should end with x equal to <b>${goal}</b>. One line uses the wrong word (add or subtract). Which line has the bug?`, visual: code(l.map((x, i) => `${i + 1}: ${x}`)),
      choices: ["line 1", "line 2", "line 3"], answer: `line ${bugLine}`,
      hints: ["Trace the program and see where x ends up.", "The goal is bigger than the start number. Which line makes x go the wrong way?", "Example: set x to 3, then subtract 2 from x, but the goal is 5. The subtract line is wrong. Now do yours."] };
  };

  // ---------- number machines (functions) ----------
  const machineRuleFind = () => {
    const k = pick(["add", "mul", "sub"]), n = k === "mul" ? ri(2, 4) : ri(2, 6);
    const pairs = shuf([1, 2, 3, 4, 5, 6, 7]).slice(0, 3).map(x => [x + (k === "sub" ? n : 0), k === "add" ? x + n : k === "mul" ? x * n : x]);
    const right = k === "add" ? `add ${n}` : k === "mul" ? `multiply by ${n}` : `subtract ${n}`;
    return { text: "A number machine follows one rule. Which rule is it?", visual: pairs.map(p => `${p[0]} → ${p[1]}`).join("<br>"),
      choices: strChoices(right, [`add ${n + 1}`, `multiply by ${n + 1}`, `subtract ${n + 1}`, `add ${n}`.replace(right, `subtract ${n}`)]), answer: right,
      hints: ["Look at one pair. How did the number change?", "Check that the same rule works for all the pairs. Rules must work every time.", "Example: 2 → 5 and 4 → 7 follows the rule add 3. Now do yours."] };
  };

  // ---------- lessons ----------
  const L4 = [
    L("Steps and programs", ALGO, [S("Algorithms", "📋", "An <b>algorithm</b> is a list of steps that solves a problem. The steps go in a <b>sequence</b> (an order)."), S("Programs", "💻", "A <b>program</b> is an algorithm a computer can follow. A person called a <b>programmer</b> writes it."), S("Be exact", "🎯", "A computer cannot guess. Steps must be clear and exact.")]),
    L("Robot paths", gridRun(4, 3, 1, false), [S("Follow the arrows", "🤖⬜", "A robot program is a list of arrows. Put your finger on the start and move one square for each arrow."), S("Example", "🍎➡️🍌", "Starting on 🍎, the command ➡️ moves the robot onto the 🍌 next to it."), S("Tip", "💡", "Move one arrow at a time and never skip.")]),
    L("Robot loops", gridRun(4, 2, 3, true), [S("Repeat", "🔁", "<b>repeat 3 times</b> means do the command inside three times in a row."), S("Example", "🤖➡️➡️➡️", "repeat 3 times ➡️ is the same as ➡️ ➡️ ➡️. It saves writing."), S("Tip", "💡", "Do the whole repeat before moving on to the next line.")]),
    L("Count the prints", loopPrint, [S("Loops that print", "🖨️", "A loop does the lines inside it again and again. Each trip is one <b>iteration</b>."), S("Example", "repeat 3: print ⭐", "Three trips, one ⭐ each trip. That prints 3 stars."), S("Tip", "💡", "Count the prints in one trip, then count by that number for every trip.")]),
    L("Loops that add", loopAcc(["add"]), [S("A loop and a box", "📦🔁", "A loop can change a variable again and again. The box <b>total</b> grows each trip."), S("Example", "total = 2, repeat 3: add 4", "2 → 6 → 10 → 14. The loop ran three times."), S("Tip", "💡", "Write the total after every trip.")]),
    L("Boxes that change", varTrace(2, ["add", "sub"], false), [S("Variables", "📦", "A <b>variable</b> is a box with a name that holds a number. The number can change."), S("Add and subtract", "➕➖", "\"add 3 to a\" makes the number in a bigger by three. \"subtract 2 from a\" makes it smaller."), S("Tip", "💡", "Go line by line and say the new number after each line.")]),
    L("Two boxes", varTrace(3, ["add", "sub", "copy"], true), [S("Two variables", "📦📦", "A program can have more than one box, like a and b. Each box has its own number."), S("Copying", "📦➡️📦", "\"set a to b\" copies the number from b into a. Now both match."), S("Tip", "💡", "Only the box named after \"set\" changes.")]),
    L("True or false?", compareTF([">", "<", "="]), [S("Comparing", "⚖️", "Computers compare numbers. The answer is always <b>true</b> or <b>false</b>."), S("Signs", "&gt; &lt; =", "&gt; means greater than. &lt; means less than. = means the same."), S("Example", "7 &gt; 4", "Seven is greater than four. That is true.")]),
    L("If and else", ifElseNum([">", "<"]), [S("Choosing", "🔀", "<b>if</b> runs the lines below it only when the test is true. <b>else</b> runs when it is false."), S("Example", "x = 2, if x &gt; 5", "2 is not greater than 5, so the test is false and the else lines run."), S("Tip", "💡", "Check the test first, then pick one side only.")]),
    L("If in real life", IFWORDS, [S("If and then", "☔", "<b>IF</b> something is true, <b>THEN</b> do something. <b>ELSE</b> is what to do when it is not true."), S("Example", "IF raining THEN umbrella", "If it is raining, take an umbrella. If it is not, you do not need one."), S("Tip", "💡", "Always check: is the IF part true right now?")]),
    L("Number patterns", patNext, [S("Number patterns", "🔢", "Many number lists follow a rule, like add 3 each time."), S("Example", "2, 5, 8, 11, ?", "Each number is 3 more than the one before, so next is 14."), S("Tip", "💡", "Look at how far each number is from the next one.")]),
    L("Sprite moves", coordsX, [S("Sprites", "🧍➡️", "In a game, a <b>sprite</b> is a picture that moves. Its <b>x</b> number says how far across it is."), S("Moving", "⬅️ ➡️", "Move right: x gets bigger. Move left: x gets smaller."), S("Example", "x = 4, move right 3", "4 → 7. The sprite is at x = 7.")]),
    L("Lists and positions", listItem, [S("Lists", "📃", "A <b>list</b> keeps many items in order, like [4, 9, 2]. Each item has a position number."), S("Counting", "1️⃣2️⃣3️⃣", "In this lesson we count from <b>1</b>. In [4, 9, 2], item 2 is 9."), S("Tip", "💡", "Point at the first item and count along.")]),
    L("Growing lists", listEdit, [S("Changing lists", "➕📃", "You can <b>add</b> an item to the end of a list or <b>remove</b> one. The length changes."), S("Example", "[4, 7] add 9", "The list becomes [4, 7, 9]. Now it has 3 items."), S("Tip", "💡", "Write the new list after every line.")]),
    L("Fix the loop", debugCount, [S("Bugs in loops", "🐛🔁", "A loop with the wrong number prints too many or too few."), S("Fix it", "🔧", "Compare what it prints with what it should print. Change the number after repeat."), S("Tip", "💡", "Run the fixed program in your head to check.")]),
    L("Find the bad line", debugLines, [S("Bugs in lines", "🐛", "Sometimes one line has the wrong word, like subtract instead of add."), S("Trace", "🔍", "Trace the program line by line. Where does the number go the wrong way?"), S("Tip", "💡", "Compare the end number with the goal.")]),
    L("Function machines", machineRuleFind, [S("Rules", "⚙️", "A number machine takes a number in, follows a rule, and puts a number out."), S("Example", "2 → 5, 4 → 7", "The rule is add 3. It works on both pairs."), S("Tip", "💡", "Test the rule on every pair.")]),
    L("Events and actions", EVENTS, [S("Events", "🖱️", "An <b>event</b> is something that happens, like a click, a tap or a key press."), S("Actions", "🎬", "The <b>action</b> is what the program does about it."), S("Example", "when clicked → jump", "The click is the event. Jump is the action.")]),
    L("Mixed practice", mix(ALGO, loopPrint, loopAcc(["add"]), varTrace(2, ["add", "sub"], false), compareTF([">", "<", "="]), ifElseNum([">", "<"]), patNext, listItem, EVENTS), MIXS("Algorithms, loops, variables, true or false, if and else, patterns, lists and events.")),
    L("Level 4 Challenge", mix(gridRun(4, 2, 3, true), loopPrint, loopAcc(["add"]), varTrace(3, ["add", "sub", "copy"], true), ifElseNum([">", "<"]), IFWORDS, patNext, coordsX, listEdit, debugCount, debugLines, machineRuleFind, EVENTS), MIXS("Everything from level 4: robots, loops, variables, if and else, patterns, sprites, lists, bugs, machines and events."))
  ];

  const L5 = [
    L("Longer traces", varTrace(4, ["add", "sub", "copy", "sum"], true), [S("Tracing", "🔍", "Tracing means following a program by hand and writing the numbers after each line."), S("Adding boxes", "📦➕📦", "\"set a to a + b\" adds the two boxes and puts the answer in a."), S("Tip", "💡", "Draw two boxes and cross out old numbers.")]),
    L("Doubling and shrinking loops", loopAcc(["dbl", "sub", "two"]), [S("Loops that change a lot", "🔁📦", "A loop can double a box, subtract from it, or do two things each trip."), S("Example", "total = 1, repeat 3: double", "1 → 2 → 4 → 8."), S("Tip", "💡", "Write the total after every single trip.")]),
    L("Counting loops", loopFor, [S("The counter", "🔢", "<b>for i from 1 to 4</b> runs four times. The counter <b>i</b> is 1, then 2, then 3, then 4."), S("Using i", "i", "You can use i inside the loop, like \"print i\" or \"add i to total\"."), S("Example", "for i from 1 to 3: add i", "total = 1 + 2 + 3 = 6.")]),
    L("Loops in loops", loopNested, [S("Nested loops", "🔁🔁", "A loop inside another loop is a <b>nested loop</b>. The inside loop runs fully on every trip of the outside loop."), S("Example", "2 × 3", "Outside 2, inside 3: the inside lines run 3 + 3 = 6 times."), S("Tip", "💡", "Multiply the two repeat numbers.")]),
    L("More comparing", compareTF([">", "<", "=", "≥", "≤", "≠"]), [S("More signs", "≥ ≤ ≠", "≥ means greater than <b>or equal to</b>. ≤ means less than or equal to. ≠ means not equal."), S("Example", "5 ≥ 5", "Five is equal to five, so this is true."), S("Tip", "💡", "Say the sign in words, then decide.")]),
    L("And, or", logic(["and", "or"]), [S("Two tests", "🔗", "<b>and</b> joins two tests. Both must be true for the whole thing to be true."), S("Or", "🔀", "<b>or</b> needs only one of the two tests to be true."), S("Example", "(true and false)", "False. But (true or false) is true.")]),
    L("Not", logic(["not", "and", "or"]), [S("Not", "🚫", "<b>not</b> flips an answer: not true is false, and not false is true."), S("Example", "not (3 &gt; 5)", "3 &gt; 5 is false, so not (3 &gt; 5) is true."), S("Tip", "💡", "Work out the inside first, then flip it.")]),
    L("Else if", elseIf, [S("Many choices", "🎚️", "<b>else if</b> lets a program pick from more than two choices."), S("Order", "⬇️", "Tests are checked from the top. The first true test wins and the rest are skipped."), S("Tip", "💡", "If nothing matches, the last else runs.")]),
    L("Functions", fnOne(["add", "mul", "sub"]), [S("What is a function?", "⚙️", "A <b>function</b> is a named set of steps. You give it an input and it gives back an output."), S("Calling", "f(3)", "f(3) means: run function f with x = 3."), S("Example", "return x + 4", "f(3) = 3 + 4 = 7.")]),
    L("Two-step functions", fnOne(["two", "two2"]), [S("More steps", "⚙️⚙️", "A function can have several lines. It uses the answer of one line in the next line."), S("Example", "y = x × 2, return y + 1", "With x = 3: y = 6, so it returns 7."), S("Tip", "💡", "Do the lines in order.")]),
    L("Function inside a function", fnNest, [S("Calling twice", "f(f(x))", "f(f(2)) means run f on 2, then run f again on that answer."), S("Example", "f(x) = x + 3", "f(2) = 5, then f(5) = 8. So f(f(2)) = 8."), S("Tip", "💡", "Start with the inside brackets.")]),
    L("Add up a list", listSum, [S("Totals", "➕", "Programs often add up everything in a list."), S("Running total", "📦", "Start a total at 0. Look at each item and add it in."), S("Example", "[2, 5, 3]", "2 + 5 + 3 = 10.")]),
    L("Biggest and smallest", listMaxMin, [S("Finding the biggest", "🏆", "To find the biggest item, remember the best so far and compare each item."), S("Example", "[4, 9, 2]", "Best 4 → 9 is bigger, keep 9 → 2 is smaller. Biggest is 9."), S("Tip", "💡", "Smallest works the same way, but you keep the smaller one.")]),
    L("Words in code", mix(strLen, strJoin, strChar), [S("Strings", "🔤", "A word or sentence in code is called a <b>string</b>. It is a list of letters."), S("Length and join", "📏", "The <b>length</b> is how many letters. <b>join</b> sticks two strings together."), S("Letter numbers", "1️⃣2️⃣3️⃣", "Letters have positions like list items. In \"cat\", letter 1 is c.")]),
    L("Binary: bits to numbers", bitsToNum(4), [S("Bits", "0️⃣1️⃣", "Computers only use two digits: 0 and 1. Each one is a <b>bit</b>. Binary numbers use only bits."), S("Place values", "8 4 2 1", "From the right, the places are 1, 2, 4, 8. A 1 means that place counts."), S("Example", "1 0 1 1", "8 + 2 + 1 = 11.")]),
    L("Binary: numbers to bits", mix(numToBin(4), binNext(4)), [S("Going back", "🔁", "To write a number in binary, find the places that add up to it."), S("Example", "10", "10 = 8 + 2, so the bits are 1 0 1 0."), S("Counting", "0001, 0010, 0011", "Counting in binary: add 1 and carry, like in normal counting.")]),
    L("Sorting lists", sortChoice, [S("Sorting", "🗂️", "<b>Sorting</b> puts items in order. Computers sort lists all the time, like names or scores."), S("Example", "7, 2, 9", "Smallest to biggest: 2, 7, 9."), S("Tip", "💡", "Check each neighbor pair.")]),
    L("Kinds of bugs", BUGS, [S("Bugs", "🐛", "A <b>bug</b> is a mistake in a program. Finding and fixing it is <b>debugging</b>."), S("Common bugs", "🔍", "Wrong order, wrong number, wrong word (like add instead of subtract)."), S("Tip", "💡", "Everyone makes bugs. Test your program after you fix one.")]),
    L("Mixed practice", mix(varTrace(4, ["add", "sub", "copy", "sum"], true), loopAcc(["dbl", "sub", "two"]), loopFor, loopNested, logic(["and", "or", "not"]), elseIf, fnOne(["add", "mul", "two"]), listSum, listMaxMin, binNext(4), sortChoice, BUGS), MIXS("Longer traces, loops, nested loops, and/or/not, else if, functions, lists, binary, sorting and bugs.")),
    L("Level 5 Challenge", mix(varTrace(4, ["add", "sub", "copy", "sum"], true), loopFor, loopNested, loopAcc(["dbl", "sub", "two"]), compareTF([">", "<", "=", "≥", "≤", "≠"]), logic(["and", "or", "not"]), elseIf, fnOne(["add", "mul", "sub", "two"]), fnNest, listSum, listMaxMin, strLen, strJoin, bitsToNum(4), numToBin(4), sortChoice, patRule, BUGS), MIXS("Everything from level 5: traces, loops, logic, else if, functions, lists, strings, binary, sorting and bugs."))
  ];

  const L6 = [
    L("While loops: how many times", whileLoop, [S("While", "🔁❓", "A <b>while</b> loop keeps going as long as its test is true. It checks the test before every trip."), S("Example", "x = 1, while x &lt; 4: add 1", "x goes 2, 3, 4. The test fails at 4, so the loop ran 3 times."), S("Tip", "💡", "Write x after each trip and test again.")]),
    L("While loops: final value", whileLoop, [S("When it stops", "🛑", "The loop stops the moment the test is false. The variable keeps its last value."), S("Example", "x = 10, while x &gt; 3: subtract 4", "10 → 6 → 2. Now 2 &gt; 3 is false, so x ends at 2."), S("Tip", "💡", "The value that makes the test false is usually the final value.")]),
    L("Loops with if", loopIf, [S("If inside a loop", "🔁🔀", "A loop can have an <b>if</b> inside it. On each trip, the if decides whether to do something."), S("Example", "for i from 1 to 6, if i is even print i", "Prints 2, 4, 6."), S("Tip", "💡", "Check the if on every number.")]),
    L("Count in a list", listCount, [S("Counting items", "🧮", "Programs often count how many list items pass a test."), S("Tally", "|||", "Go through the list. Add one to your count for each item that passes."), S("Example", "[3, 8, 5, 6], even", "8 and 6 pass. Count = 2.")]),
    L("Find the position", listIndex, [S("Finding an item", "🔎", "To find where an item is, count its position from the start of the list."), S("Example", "[6, 2, 9]", "9 is at position 3."), S("Tip", "💡", "The first item is position 1.")]),
    L("Searching a list", searchChecks, [S("Linear search", "👀", "<b>Linear search</b> looks at the items one by one from the start."), S("Stopping", "🛑", "Stop when you find the item. If it is not there, you must look at every item."), S("Example", "find 4 in [8, 4, 1]", "Check 8, then 4: 2 checks.")]),
    L("Guess by halving", guessHalf, [S("Smart guessing", "🎯", "To guess a secret number fast, always guess the <b>middle</b> of the range."), S("Throw half away", "✂️", "If the secret is bigger, throw away the guess and everything below. If smaller, throw away everything above."), S("Example", "1 to 8, guess 4, bigger", "Now the range is 5 to 8.")]),
    L("A sorting step", selStep, [S("Selection sort", "🗂️", "One way to sort: find the smallest item and swap it into the first place."), S("Repeat", "🔁", "Then do the same on the rest of the list."), S("Example", "[5, 2, 7]", "Smallest is 2. Swap with 5: [2, 5, 7].")]),
    L("Functions with two inputs", fnTwo, [S("Two inputs", "⚙️", "A function can take more than one input, like g(a, b). The first goes to a, the second to b."), S("Example", "g(a, b) returns a × 2 + b", "g(3, 4) = 6 + 4 = 10."), S("Tip", "💡", "Replace a and b with the numbers, then do the math.")]),
    L("Functions that decide", fnIf, [S("If in a function", "⚙️🔀", "A function can use if and else to decide what to return."), S("Example", "bigger(a, b)", "bigger(2, 9) returns 9."), S("Tip", "💡", "Check the test, then follow only one return line.")]),
    L("Binary with five bits", bitsToNum(5), [S("More places", "16 8 4 2 1", "Five bits have the places 16, 8, 4, 2 and 1. They can make numbers from 0 to 31."), S("Adding", "➕", "Add up the place values that have a 1 under them."), S("Example", "1 0 1 0 1", "16 + 4 + 1 = 21.")]),
    L("Binary numbers", mix(numToBin(5), binNext(5)), [S("Writing binary", "0️⃣1️⃣", "To write a number in binary, find which place values add up to it."), S("Example", "19", "19 = 16 + 2 + 1, so the bits are 1 0 0 1 1."), S("Counting up", "➕1", "To add one, change the number to normal numbers, add 1, and change it back.")]),
    L("Sprite on a grid", coordsXY, [S("Coordinates", "📍", "A position has two numbers: (x, y). x is across and y is up."), S("Moving", "⬆️⬇️⬅️➡️", "Up makes y bigger. Down makes y smaller. Right makes x bigger. Left makes x smaller."), S("Example", "(2, 3) move right 4", "Now it is (6, 3).")]),
    L("Words, letters and reverse", mix(strChar, strRev, strJoin, strLen), [S("Strings", "🔤", "A string is a list of letters. You can find a letter by its number or flip the whole string."), S("Reverse", "↩️", "reverse(\"bus\") gives \"sub\". It reads the letters backward."), S("Join", "🔗", "join(\"sun\", \"set\") gives \"sunset\".")]),
    L("Off by one", offByOne, [S("Off by one", "1️⃣", "A very common bug is being off by one: the loop runs one too many or one too few times."), S("< or ≤", "&lt; ≤", "i &lt; 5 stops before 5. i ≤ 5 includes 5."), S("Example", "i from 1, while i &lt; 3", "Prints 1 and 2, but not 3.")]),
    L("Fast and slow ways", EFFIC, [S("Efficient", "⚡", "An <b>efficient</b> program does the job with fewer steps."), S("Tools", "🧰", "Loops and functions let you reuse steps instead of writing them again."), S("Halving", "✂️", "Cutting a range in half each time finds an answer very fast.")]),
    L("Robot with long programs", gridRun(5, 3, 3, true), [S("Longer programs", "🤖📜", "Programs can have several repeat blocks. Do them one after another."), S("Example", "repeat 2: ➡️, then ⬇️", "Move right twice, then down once."), S("Tip", "💡", "Keep your finger on the grid and never skip a block.")]),
    L("Staying safe online", SAFE, [S("Be safe", "🛡️", "Good coders keep themselves safe online. Keep passwords and personal details private."), S("Ask first", "🙋", "If a site asks for private things or someone you do not know wants a secret chat, stop and tell a parent."), S("Think", "🤔", "Not everything online is true or friendly.")]),
    L("Mixed practice", mix(whileLoop, loopIf, listCount, listIndex, searchChecks, guessHalf, selStep, fnTwo, fnIf, bitsToNum(5), numToBin(5), coordsXY, strRev, offByOne, EFFIC, SAFE), MIXS("While loops, loops with if, searching, guessing by halving, sorting, functions, binary, coordinates, strings, off-by-one bugs, efficiency and safety.")),
    L("Level 6 Challenge", mix(whileLoop, loopIf, loopNested, listCount, searchChecks, guessHalf, selStep, fnTwo, fnIf, fnNest, bitsToNum(5), numToBin(5), binNext(5), coordsXY, strChar, strRev, offByOne, debugLines, EFFIC, SAFE, gridRun(5, 3, 3, true), varTrace(4, ["add", "sub", "copy", "sum", "dbl"], true)), MIXS("Everything from level 6: loops, lists and searching, functions, binary, coordinates, strings, bugs, efficiency and safety."))
  ];

  Object.assign(CODING_LEVELS, { 4: L4, 5: L5, 6: L6 });
})();
