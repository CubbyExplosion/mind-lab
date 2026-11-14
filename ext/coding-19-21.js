// ext/coding-19-21.js  Mind Lab Coding levels 19-21 (60 lessons): program design, testing, objects, recursion, Big-O, databases, networks, security, version control, software engineering
(() => {
  const S = (h, v, t) => ({ h, v, t });
  const L = (title, make, slides) => { make.teach = () => slides; return { title, make }; };
  const mix = (...ms) => () => pick(ms)();
  const MIXS = t => [
    S("Review time!", "🔄", "This lesson mixes ideas you already know. Take your time and think about each one."),
    S("Remember", "🧠", t),
    S("Tip", "💡", "Go slowly. Work one step at a time and write down the values as you go.")
  ];
  const code = lines => `<div style="text-align:left;display:inline-block;font-family:monospace;background:#eef2ff;color:#1a2a55;padding:8px 14px;border-radius:10px;line-height:1.5">${lines.join("<br>")}</div>`;
  const sp = "&nbsp;&nbsp;&nbsp;&nbsp;";
  const numChoices = (a, spread) => {
    const s = new Set([a]); let t = 0;
    while (s.size < 4 && t++ < 300) { const d = a + ri(-spread, spread); if (d !== a && d >= 0) s.add(d); }
    return shuf([...s]);
  };
  const nk = x => String(x).toLowerCase().replace(/[^a-z0-9]/g, "");
  const strChoices = (right, wrongs) => { const seen = new Set([nk(right)]), out = []; for (const w of wrongs) { if (!seen.has(nk(w))) { seen.add(nk(w)); out.push(w); } } return shuf([right, ...out.slice(0, 3)]); };
  const num = (text, answer, hints, visual) => ({ text, visual, answer, hints });
  const txt = (text, answer, hints, visual) => ({ text, visual, textInput: true, answer, hints });
  const mc = (text, right, wrongs, hints, visual) => ({ text, visual, choices: strChoices(right, wrongs), answer: right, hints });
  const nc = (text, answer, spread, hints, visual) => ({ text, visual, choices: numChoices(answer, spread), answer, hints });
  const yn = (text, ok, hints, visual) => ({ text, visual, choices: ["yes", "no"], answer: ok ? "yes" : "no", hints });
  const lst = a => "[" + a.join(", ") + "]";
  const uniq = (n, lo, hi) => shuf(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, n);
  const sum = a => a.reduce((x, y) => x + y, 0);
  const facts = (items, nudge, example) => () => {
    const [q, r, w, c, v] = pick(items);
    return { text: q, visual: v, choices: strChoices(r, w), answer: r, hints: [nudge, c || nudge, example] };
  };
  const table = (head, rows) => `<table style="border-collapse:collapse;margin:auto;font-size:0.95em"><tr>${head.map(h => `<th style="border:1px solid #889;padding:3px 10px;background:#dde4ff;color:#1a2a55">${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map(c => `<td style="border:1px solid #889;padding:3px 10px">${c}</td>`).join("")}</tr>`).join("")}</table>`;
  const NM = ["Ava", "Ben", "Cleo", "Dan", "Eli", "Fay", "Gus", "Hana", "Ivan", "Jo", "Kai", "Lia"];

  // =====================================================================
  // LEVEL 19
  // =====================================================================
  const DECOMP = [
    ["A game must load levels, move the player and draw the screen. What is the best way to organize the code?", "Separate functions: loadLevel, movePlayer, drawScreen", ["One huge function with all the code", "Copy the code again for each level", "Put everything on one very long line"], "Think about giving each job its own name."],
    ["Which is the best name for a function that adds up the prices in a cart?", "calculateTotal", ["x", "doStuff", "thing2"], "A good name tells you what the function does."],
    ["Two parts of a program both need to round a price to cents. What should you do?", "Write one roundPrice function and call it from both places", ["Paste the same code in both places", "Round by hand every time", "Skip rounding"], "Think about not repeating yourself."],
    ["What is decomposition?", "Breaking a big problem into smaller parts", ["Deleting old code", "Making code run faster", "Joining many files into one"], "Think about what you do with a very big task."],
    ["A good function usually has:", "One clear job", ["Every job in the program", "No name", "As many jobs as it can fit"], "Short, focused functions are easier to test."],
    ["You want to find the highest score and show a report. Which design is cleaner?", "findHighest returns a number; showReport prints it", ["One function that finds, prints and also saves a file", "A function that searches at random", "No functions, only comments"], "Keep calculating separate from showing."],
    ["What is a top-down design?", "Start with the big plan, then fill in the details", ["Write the smallest lines first and never plan", "Start with the bugs", "Design only the colors"], "Think of an outline before writing an essay."],
    ["A helper function is used inside one bigger function. Why create it?", "It makes the big function shorter and easier to read", ["It makes the computer faster by magic", "It stops all bugs", "Every language requires it"], "Think about the person reading the code."]
  ];
  const ENC = [
    ["What does encapsulation mean?", "Keeping data inside an object and controlling how it is used", ["Making every variable global", "Copying a class", "Deleting private data"], "Think about a protective shell around the data."],
    ["A BankAccount keeps its balance private. How should other code change it?", "Through methods like deposit and withdraw", ["By editing balance directly from anywhere", "By making a new bank", "By guessing"], "Think about a controlled doorway."],
    ["Why make a field private?", "So other code cannot set it to a bad value", ["So the program runs faster", "So everyone can edit it", "So it can never be used"], "Think about protecting the data."],
    ["A getter method is used to:", "Read a private value", ["Delete a class", "Start the program", "Color the screen"], "The name says what it does: it gets something."],
    ["A setter checks a value before saving it. Why is that useful?", "It can refuse bad values such as a negative age", ["It makes the object slower on purpose", "It copies the object", "It hides the method name"], "Think about rules for allowed values."],
    ["What is the public interface of a class?", "The methods that other code is allowed to use", ["Its private variables", "Its file size", "Its color"], "Think about what the outside world can see and call."],
    ["Encapsulation helps because:", "You can change the inside of a class without breaking code that uses it", ["It deletes the class", "It makes every variable public", "It removes the need to test"], "Think about keeping promises to other code."],
    ["Outside code tries to set a private balance directly to -500. What should a good design do?", "Block or refuse the direct access", ["Allow it silently", "Delete the object", "Change it to 500"], "The class should stay in control of its own data."]
  ];
  const trace1 = () => {
    const n = ri(8, 20), m = pick([2, 3, 4, 5]); let t = 0;
    for (let i = 1; i <= n; i++) if (i % m === 0) t += i;
    return num("What does this program print?", t, [
      "Keep a small table with the columns i and total. Update it for each i.",
      "Only add i to total when the if-test is true. Skip the other values of i.",
      "Example: total = 0; for i from 1 to 6; if i mod 3 = 0 then total = total + i. Only 3 and 6 pass, so it prints 9. Now do yours."
    ], code(["total = 0", `for i from 1 to ${n}:`, `${sp}if i mod ${m} = 0:`, `${sp}${sp}total = total + i`, "print total"]));
  };
  const trace2 = () => {
    const x0 = ri(20, 300); let x = x0, c = 0;
    while (x > 1) { x = Math.floor(x / 2); c++; }
    return num("What does this program print?", c, [
      "Write down x after each pass through the loop, and count the passes.",
      "Div means divide and drop the leftover. Stop as soon as x is no longer bigger than 1.",
      "Example: x = 9. Passes: 9 to 4, 4 to 2, 2 to 1. That is 3 passes, so it prints 3. Now do yours."
    ], code([`x = ${x0}`, "count = 0", "while x > 1:", `${sp}x = x div 2`, `${sp}count = count + 1`, "print count"]));
  };
  const trace3 = () => {
    const a = ri(2, 9), b = ri(2, 9), f = ri(0, 1);
    let t, ans, lines;
    if (f === 0) { t = a; const na = b + t, nb = t * 2; ans = na + nb; lines = [`a = ${a}`, `b = ${b}`, "t = a", "a = b + t", "b = t * 2", "print a + b"]; }
    else { const na = a + b, nb = na - a; ans = na * nb; lines = [`a = ${a}`, `b = ${b}`, "a = a + b", "b = a - b", "print a * b"]; }
    return num("What does this program print?", ans, [
      "Go one line at a time and write the current value of every variable.",
      "A line uses the values the variables have right now, not the original ones.",
      "Example: a = 2, b = 3; a = a + b makes a = 5; b = a - b makes b = 2; print a * b gives 10. Now do yours."
    ], code(lines));
  };
  const PARAM = [
    ["In def area(w, h), the names w and h are called:", "parameters", ["arguments", "returns", "loops"], "They are the names in the function's definition."],
    ["In the call area(4, 7), the values 4 and 7 are called:", "arguments", ["parameters", "classes", "comments"], "They are the real values handed to the function."],
    ["A function ends with return total. What does return do?", "Sends a value back to the code that called it", ["Prints the value on the screen", "Repeats the function", "Deletes the variable"], "Think about where the answer goes."],
    ["A variable made inside a function can be used:", "Only inside that function", ["Anywhere in the program", "Only in other files", "Only before the function exists"], "Think about scope."],
    ["Calling area(3) when the function needs two parameters causes:", "An error", ["A perfect answer", "An infinite loop that is always safe", "A new function"], "The function is missing something it needs."],
    ["A default parameter such as def greet(name = \"friend\") means:", "name is friend if no argument is given", ["name is always friend", "greet cannot be called", "name must be a number"], "Defaults fill in for missing arguments."]
  ];
  const paramQ = () => {
    const x = ri(2, 9), y = ri(2, 9), f = ri(0, 2);
    const defs = [["a * b + a", (a, b) => a * b + a], ["a * a - b", (a, b) => a * a - b], ["(a + b) * 2", (a, b) => (a + b) * 2]];
    const [src, fn] = defs[f];
    const xx = f === 1 ? Math.max(x, y + 1) : x;
    return num(`What does f(${xx}, ${y}) return?`, fn(xx, y), [
      "Put the first argument in place of a and the second in place of b.",
      "Replace a and b in the return line, then do the math in order.",
      "Example: for def g(a, b): return a + b * 2, the call g(1, 5) gives 1 + 10 = 11. Now do yours."
    ], code(["def f(a, b):", `${sp}return ${src}`]));
  };
  const UNIT = [
    ["What is a unit test?", "A small test that checks one function with a known input and expected output", ["A test that checks the whole company", "A test for the colors of a page", "Typing speed practice"], "Think small: one piece at a time."],
    ["A test says assert add(2, 2) == 5. The function is correct. What happens?", "The test fails and shows the mistake is in the test", ["The test passes", "The computer breaks", "The function changes itself"], "Compare the expected value with the true value."],
    ["Why run all your tests after every change?", "To catch things you accidentally broke", ["To make the code longer", "To delete old code", "Tests are only for the final day"], "Think about changes having side effects."],
    ["What is a regression?", "A feature that used to work and now is broken", ["A new feature", "A faster loop", "A type of list"], "The word means going backwards."]
  ];
  const unitQ = () => {
    const forms = [["x * 2 + 1", x => x * 2 + 1], ["x * x - 3", x => x * x - 3], ["x + 10", x => x + 10], ["x * 3 - 2", x => x * 3 - 2]];
    const [src, f] = pick(forms), k = ri(2, 9), v = f(k);
    const code1 = code(["def calc(x):", `${sp}return ${src}`]);
    if (Math.random() < 0.5) {
      return num(`A unit test checks calc(${k}). What value should the test expect?`, v, [
        "The expected value is what the function should give for that input.",
        "Put the input in place of x and do the math in order.",
        "Example: for def h(x): return x + 4, the test for h(3) should expect 7. Now do yours."
      ], code1);
    }
    const ok = Math.random() < 0.5, shown = ok ? v : v + pick([1, 2, 3]);
    return yn(`A test says: assert calc(${k}) == ${shown}. Will this test pass?`, ok, [
      "Work out what calc gives for that input yourself.",
      "Compare your result with the number after the double equals sign.",
      "Example: for def h(x): return x + 4, assert h(3) == 8 fails because h(3) is 7. Now do yours."
    ], code1);
  };
  const boundQ = () => {
    const t = ri(10, 90), f = ri(0, 3);
    if (f === 0) return mc(`A program says: access is allowed if age &gt;= ${t}. Which pair of test ages checks both sides of the edge?`, `${t - 1} and ${t}`, [`${t + 5} and ${t + 10}`, `${t - 10} and ${t - 5}`, `${t + 1} and ${t + 2}`], [
      "Edge tests use values right next to where the rule changes.",
      "One test should just fail the rule and one should just pass it.",
      "Example: for score &gt; 50, the best pair is 50 (fails) and 51 (passes). Now do yours."
    ]);
    if (f === 1) return mc(`A program says: you win if score &gt; ${t}. Which pair of test scores checks both sides of the edge?`, `${t} and ${t + 1}`, [`${t - 5} and ${t - 3}`, `${t + 5} and ${t + 9}`, `${t - 1} and ${t - 2}`], [
      "Edge tests use values right next to where the rule changes.",
      "Greater than is strict: the number itself does not win. Test the number and the very next one.",
      "Example: for score &gt;= 20, the best pair is 19 and 20. Now do yours."
    ]);
    if (f === 2) return mc(`A form accepts a length from 1 to ${t} letters, both ends included. Which test lengths are the most important edge cases?`, `0, 1, ${t} and ${t + 1}`, [`5, 6 and 7`, `${t - 20}, ${t - 10} and ${t - 5}`, `${t + 10}, ${t + 20} and ${t + 30}`], [
      "Check just outside and just inside each end of the allowed range.",
      "There are two ends, so you need tests around both.",
      "Example: for 1 to 8 letters, test 0, 1, 8 and 9. Now do yours."
    ]);
    const a = shuf(["empty list", "list with one item", "list with a million items", "list of negative numbers"]);
    return mc("A function finds the biggest number in a list. Which input is a classic edge case?", "an empty list", ["a list of 5 normal numbers", "the list 1, 2, 3", "a list of 10 normal numbers"], [
      "Edge cases are unusual or extreme inputs.",
      "What if there is nothing to look at?",
      "Example: for a function that adds up a list, an empty list is an edge case because there is nothing to add. Now do yours."
    ]);
  };
  const DBG = [
    ["Your program crashes with an error on line 12. What should you do first?", "Read the error message and look at line 12", ["Rewrite the whole program", "Delete line 12 right away", "Run it again and hope"], "The computer is trying to help you."],
    ["What is rubber duck debugging?", "Explaining your code line by line to find the problem", ["Buying a toy to fix hardware", "Running code on a slow computer", "Deleting all variables"], "Talking through a problem often shows the mistake."],
    ["A bug only appears sometimes. What helps most?", "Finding the exact steps that make it happen again", ["Ignoring it", "Rewriting everything", "Waiting for it to go away"], "You cannot fix what you cannot repeat."],
    ["Which is a good way to see a variable's value while the program runs?", "Print it or look at it in a debugger", ["Guess it", "Close the program", "Make the name longer"], "Look at the real value instead of imagining it."],
    ["What is a breakpoint?", "A spot where the debugger pauses the program", ["A line that deletes data", "A broken key", "The end of the file"], "It lets you stop and look around."],
    ["You changed five things and the bug is gone, but you do not know which change fixed it. What would have been better?", "Change one thing at a time", ["Change even more things", "Never test", "Delete the tests"], "Small steps show cause and effect."],
    ["Binary-search debugging means:", "Checking the middle of the code to see which half has the bug", ["Writing code in zeros and ones", "Only checking two lines", "Using only the names 0 and 1"], "Each check should cut the search area down."],
    ["After you fix a bug, what is a smart extra step?", "Add a test that would catch it if it came back", ["Do nothing", "Add another bug", "Make the variable names longer"], "Protect your fix for the future."]
  ];
  const exQ = () => {
    const a = pick(["A", "start", "hello", "open"]), b = pick(["B", "done", "next", "ok"]), c = pick(["C", "oops", "error", "bad"]), d = pick(["D", "end", "bye", "last"]);
    const bad = Math.random() < 0.5, den = bad ? 0 : ri(2, 5), n = ri(10, 40) * (den || 1);
    const printed = bad ? 3 : 3;
    const lines = [`try:`, `${sp}print "${a}"`, `${sp}x = ${n} / ${den}`, `${sp}print "${b}"`, `catch error:`, `${sp}print "${c}"`, `print "${d}"`];
    const ans = bad ? 3 : 3;
    // good path prints a, b, d = 3 lines; bad path prints a, c, d = 3 lines: ask which instead
    const which = bad ? c : b;
    return mc(`Which of these words does the program print as its <b>second</b> line?`, which, [bad ? b : c, d, a].filter(w => w !== which), [
      "A try block runs line by line until something goes wrong.",
      "If an error happens, the rest of the try block is skipped and the catch block runs. Dividing by zero is an error.",
      "Example: try prints X, then 5 / 0 fails, so the catch prints Y. The output is X then Y. Now do yours."
    ], code(lines));
  };
  const EXC = [
    ["Which error would dividing by zero cause?", "A divide-by-zero exception", ["A color error", "A spelling error", "No error ever"], "Math has a rule about dividing by nothing."],
    ["Reading item number 10 of a list with only 4 items causes:", "An index out of range error", ["A bigger list", "A new item", "A faster loop"], "Check that the position exists."],
    ["Why use try and catch?", "To handle an error without crashing the whole program", ["To make errors happen on purpose", "To speed up loops", "To hide variables"], "Think about a graceful recovery."],
    ["A user types hello when the program expects a number. A safe program should:", "Catch the error and ask again", ["Crash", "Use hello as a number", "Delete the input box"], "Plan for unexpected input."]
  ];
  const classQ = () => {
    const f = ri(0, 1);
    if (f === 0) {
      const s = ri(0, 10), a = ri(1, 9), b = ri(1, 9), c = ri(1, 9);
      return num("What is c.count at the end?", s + a + b + c, [
        "Each call to add changes the count that belongs to the object c.",
        "Start from the value given when the object was made, then apply each add in order.",
        "Example: Counter starts at 2, add(3), add(4) gives 9. Now do yours."
      ], code(["class Counter:", `${sp}count = start`, `${sp}add(k): count = count + k`, `c = Counter(${s})`, `c.add(${a})`, `c.add(${b})`, `c.add(${c})`]));
    }
    const s = ri(20, 60), d1 = ri(5, 15), w1 = ri(5, 30), d2 = ri(1, 10);
    let bal = s + d1; if (w1 <= bal) bal -= w1; bal += d2;
    return num("What is acct.balance at the end? (withdraw only works if there is enough money; otherwise nothing changes)", bal, [
      "Follow the calls in order. For each withdraw, check first if the balance is big enough.",
      "If the withdraw is bigger than the balance, the balance stays the same.",
      "Example: balance 10, deposit 5 makes 15, withdraw 20 is refused, so it stays 15. Now do yours."
    ], code(["acct = BankAccount(" + s + ")", `acct.deposit(${d1})`, `acct.withdraw(${w1})`, `acct.deposit(${d2})`]));
  };
  const objQ = () => {
    const f = ri(0, 2), s1 = ri(0, 9), s2 = ri(10, 20), x = ri(1, 9), y = ri(1, 9);
    if (f === 0) return num("What is a.count at the end?", s1 + x, [
      "a and b are two different objects. Each has its own count.",
      "Only the calls on a change a.count.",
      "Example: a starts at 1, b starts at 5. b.add(4) does not change a, so a.count is still 1. Now do yours."
    ], code(["class Counter: count, add(k)", `a = Counter(${s1})`, `b = Counter(${s2})`, `a.add(${x})`, `b.add(${y})`]));
    if (f === 1) return num("What is b.count at the end?", s2 + y, [
      "a and b are two different objects. Each has its own count.",
      "Only the calls on b change b.count.",
      "Example: a starts at 1, b starts at 5. a.add(4) does not change b, so b.count is still 5. Now do yours."
    ], code(["class Counter: count, add(k)", `a = Counter(${s1})`, `b = Counter(${s2})`, `a.add(${x})`, `b.add(${y})`]));
    return num("What is a.count at the end? (Careful with the line b = a)", s1 + x + y, [
      "b = a does not make a copy. Think about what b now points to.",
      "Both names now point to the very same object, so changing it through b also changes a.",
      "Example: a = Counter(3); b = a; b.add(2). Now a.count is 5, because there is only one object. Now do yours."
    ], code(["class Counter: count, add(k)", `a = Counter(${s1})`, "b = a", `a.add(${x})`, `b.add(${y})`]));
  };
  const POLY = [
    ["Dog.speak() prints Woof and Cat.speak() prints Meow. Calling speak() on each animal in a list shows:", "Each object does its own version", ["All print Woof", "All print Meow", "Nothing prints"], "Each class has its own speak."],
    ["Polymorphism means:", "Different classes can respond to the same method name in their own way", ["Many copies of one variable", "A loop that never ends", "Hiding all data"], "Poly means many; morph means form."],
    ["A Shape class has area(). Circle and Square both override area(). Why is that useful?", "Code can call area() on any shape without caring which kind", ["It makes every shape the same", "It deletes the Shape class", "It stops code from running"], "Think about one call that works on many kinds."],
    ["A child class defines its own version of a method of its parent. This is called:", "overriding", ["overloading the CPU", "deleting", "compiling"], "The child replaces the parent's behavior."],
    ["Which relationship fits: Car and Vehicle?", "Car is a kind of Vehicle (inheritance)", ["Vehicle is a kind of Car", "Car and Vehicle are the same thing", "Vehicle is a part of every wheel"], "Think about the sentence is-a."],
    ["Which relationship fits: Car and Engine?", "Car has an Engine (a part inside it)", ["Car is a kind of Engine", "Engine is a kind of Car", "They cannot be related"], "Think about the sentence has-a."]
  ];
  const polyQ = () => {
    const w = ri(2, 9), h = ri(2, 9), s = ri(2, 9), b = ri(1, 6) * 2, th = ri(2, 9);
    const f = ri(0, 1);
    const items = f === 0 ? [["Rectangle", w, h, w * h], ["Square", s, s, s * s]] : [["Rectangle", w, h, w * h], ["Triangle", b, th, b * th / 2], ["Square", s, s, s * s]];
    const lines = ["shapes = ["];
    items.forEach(it => lines.push(`${sp}${it[0]}(${it[0] === "Square" ? it[1] : it[1] + ", " + it[2]})${it === items[items.length - 1] ? "" : ","}`));
    lines.push("]", "total = sum of shape.area() for each shape");
    return num("Rectangle area is width times height. Square area is side times side. Triangle area is base times height divided by 2. What is total?", sum(items.map(i => i[3])), [
      "Each shape uses its own area rule. Find each area first.",
      "Work out each area on its own, then add all the areas.",
      "Example: Rectangle(2, 3) has area 6 and Square(2) has area 4, so the total is 10. Now do yours."
    ], code(lines));
  };
  const accQ = () => {
    const f = ri(0, 2), n = ri(4, 9);
    if (f === 0) {
      const acc = ri(0, 5); let s = acc; for (let i = 1; i <= n; i++) s += i;
      return num(`This function carries a running total with it. What does go(${n}, ${acc}) return?`, s, [
        "Each call adds the current n to the running total, then calls itself with a smaller n.",
        "When n reaches 0, the function returns the total it has collected.",
        "Example: go(2, 1) calls go(1, 3) then go(0, 4) and returns 4. Now do yours."
      ], code(["def go(n, total):", `${sp}if n = 0: return total`, `${sp}return go(n - 1, total + n)`]));
    }
    if (f === 1) {
      const a0 = ri(1, 3); let p = a0; for (let i = 0; i < n - 2; i++) p *= 2;
      const m = n - 2;
      return num(`What does grow(${m}, ${a0}) return?`, a0 * Math.pow(2, m), [
        "Each call doubles the second value and lowers the first by one.",
        "Count how many calls it takes for n to reach zero; that is how many doublings happen.",
        "Example: grow(2, 3) doubles twice: 3 to 6 to 12. It returns 12. Now do yours."
      ], code(["def grow(n, v):", `${sp}if n = 0: return v`, `${sp}return grow(n - 1, v * 2)`]));
    }
    const a = ri(3, 12), b = ri(2, 6); let c = 0, x = a;
    while (x >= b) { x -= b; c++; }
    return num(`This function counts how many times b fits into a. What does fit(${a}, ${b}) return?`, c, [
      "Each call takes one b away from a and adds one to the count.",
      "Stop when a is smaller than b. The count is the answer.",
      "Example: fit(7, 3) subtracts 3 twice (7 to 4 to 1), then stops. It returns 2. Now do yours."
    ], code(["def fit(a, b):", `${sp}if a &lt; b: return 0`, `${sp}return 1 + fit(a - b, b)`]));
  };
  const BASE = [
    ["Why does every recursive function need a base case?", "It tells the function when to stop", ["It makes the function slower on purpose", "It names the function", "It stores the answer in a file"], "Think about how the chain of calls ends."],
    ["factorial(n) = n times factorial(n - 1). Which base case is right?", "factorial(0) = 1", ["factorial(0) = 0", "factorial(n) = n", "factorial(-1) = 1"], "The smallest input needs no more calls. Multiplying by zero would ruin every answer."],
    ["What happens if a recursive function has no base case?", "It keeps calling itself until the program crashes (stack overflow)", ["It prints a friendly message", "It stops after exactly ten calls", "It deletes itself"], "Nothing ever tells it to stop."],
    ["countdown(n): if n = 0 stop; otherwise print n and call countdown(n - 1). What does countdown(3) print?", "3 2 1", ["3 2 1 0", "0 1 2 3", "3 2"], "Does the function print anything when n is zero?"],
    ["power(b, e) = b times power(b, e - 1). Which base case is right?", "power(b, 0) = 1", ["power(b, 0) = 0", "power(b, 1) = 0", "power(0, 0) = b"], "Anything to the zero power is the empty product."],
    ["Which recursive call can never reach its base case?", "f(n) calls f(n) again with the same n", ["f(n) calls f(n - 1)", "f(n) calls f(n div 2) while n is above 1", "f(n) calls f(n - 3) while n is at least 3"], "Each call must move closer to the base case."],
    ["To count the items in a list recursively, what is the base case?", "An empty list has 0 items", ["A list with 5 items has 5 items", "The first item", "A list of words"], "What is the smallest list there is?"],
    ["For a recursive palindrome check, which base case makes sense?", "A word with 0 or 1 letters is a palindrome", ["A word with 100 letters is not a palindrome", "Every word is a palindrome", "The first letter is the last letter"], "Which words are trivially the same reversed?"]
  ];
  const listRec = () => {
    const n = ri(3, 6), a = Array.from({ length: n }, () => ri(1, 20)), f = ri(0, 2);
    if (f === 0) return num(`sumList(a) = first item + sumList(rest of a), and sumList of an empty list is 0. What is sumList(${lst(a)})?`, sum(a), [
      "The function adds one item at a time until the list is empty.",
      "The result is the same as adding all the items together.",
      "Example: sumList([2, 5]) = 2 + sumList([5]) = 2 + 5 + sumList([]) = 7. Now do yours."
    ]);
    if (f === 1) return num(`best(a) = the bigger of the first item and best(rest of a). What is best(${lst(a)})?`, Math.max(...a), [
      "Each step keeps the bigger of two values.",
      "The result is a special item from the list. Which one?",
      "Example: best([3, 9, 4]) is bigger-of(3, bigger-of(9, 4)) = 9. Now do yours."
    ]);
    return num(`countList(a) calls itself once for each item and one more time for the empty list. How many calls happen in total for ${lst(a)} (the first call counts)?`, n + 1, [
      "Count one call per item first.",
      "Do not forget the last call, on the empty list.",
      "Example: for [7, 8], calls are on [7, 8], [8] and []. That is 3 calls. Now do yours."
    ]);
  };
  const depthQ = () => {
    const f = ri(0, 2), n = ri(3, 40);
    if (f === 0) return num(`f(n) calls f(n - 1) and stops at f(0). If you call f(${n}), how many calls are on the stack at the deepest moment? (count f(0) too)`, n + 1, [
      "Every call waits for the next one to finish, so they pile up.",
      "List the values of n from the starting number down to the base case and count them.",
      "Example: f(2) leads to f(2), f(1), f(0), so 3 calls pile up. Now do yours."
    ]);
    if (f === 1) { let c = 1, x = n; while (x > 1) { x = Math.floor(x / 2); c++; } return num(`f(n) calls f(n div 2) and stops at f(1). If you call f(${n}), how many calls are on the stack at the deepest moment? (count f(1) too)`, c, [
      "Keep halving n and write down every value until you reach the base case.",
      "Count how many values are in your list, including the first and the last.",
      "Example: f(10) leads to f(10), f(5), f(2), f(1), so 4 calls pile up. Now do yours."
    ]); }
    let c = 1, x = n; while (x > 0) { x -= 2; c++; }
    return num(`f(n) calls f(n - 2) and stops when n is 0 or less. If you call f(${n}), how many calls are on the stack at the deepest moment? (count the last call too)`, c, [
      "Subtract two each time and write down every value, even the last one that is zero or below.",
      "Count the values in your list.",
      "Example: f(5) leads to f(5), f(3), f(1), f(-1), so 4 calls pile up. Now do yours."
    ]);
  };
  const BO = (() => {
    const names = ["items", "scores", "data", "names"];
    const sn = [
      [v => ["first = " + v + "[0]", "print(first)"], "O(1)"],
      [v => ["for each item in " + v + ":", sp + "print(item)"], "O(n)"],
      [v => ["for each a in " + v + ":", sp + "for each b in " + v + ":", sp + sp + "print(a, b)"], "O(n squared)"],
      [v => ["i = length of " + v, "while i &gt; 1:", sp + "i = i div 2"], "O(log n)"],
      [v => ["total = 0", "for each x in " + v + ":", sp + "total = total + x", "print(total)"], "O(n)"],
      [v => ["for each a in " + v + ":", sp + "print(a)", "for each b in " + v + ":", sp + "print(b)"], "O(n)"],
      [v => ["for each a in " + v + ":", sp + "repeat 3 times:", sp + sp + "print(a)"], "O(n)"],
      [v => [v + "[2] = 9", "print(" + v + "[2])"], "O(1)"],
      [v => ["for i in 0 to length of " + v + " - 1:", sp + "for j in 0 to length of " + v + " - 1:", sp + sp + "compare " + v + "[i] with " + v + "[j]"], "O(n squared)"]
    ];
    return () => {
      const [f, r] = pick(sn), v = pick(names);
      return { text: `The list <b>${v}</b> has n items. How does the running time of this code grow?`, visual: code(f(v)), choices: ["O(1)", "O(n)", "O(n squared)", "O(log n)"], answer: r, hints: [
        "Count how many times the busiest line runs when n gets bigger.",
        "Never repeating with n: O(1). One pass over the list: O(n). A loop inside a loop over the list: O(n squared). Cutting the work in half each time: O(log n). Repeating a fixed number of times is just a constant.",
        "Example: a loop over n items with a print inside runs n times, so it is O(n). Now do yours."
      ] };
    };
  })();
  const growQ = () => {
    const f = ri(0, 3);
    if (f === 0) { const k = ri(6, 15); return num(`An algorithm takes n times n steps. How many steps for n = ${k}?`, k * k, [
      "Multiply n by itself.", "The input is given in the question, so put it in the formula.", "Example: for n = 9 the steps are 9 times 9 = 81. Now do yours."]); }
    if (f === 1) { const j = ri(1, 7), n = Math.pow(2, j); return num(`An algorithm takes n times log2(n) steps. How many steps for n = ${n}? (log2 asks: how many times can you halve n to get 1?)`, n * j, [
      "First find log2 of n by halving n until you reach 1 and counting.", "Then multiply that count by n.", "Example: n = 16, halving 16 to 8 to 4 to 2 to 1 takes 4 steps, so 16 times 4 = 64. Now do yours."]); }
    if (f === 2) { const fac = pick([2, 3, 4]), e = ri(1, 3); return num(`An algorithm takes about n${e === 1 ? "" : e === 2 ? " times n" : " times n times n"} steps. If the input becomes ${fac} times bigger, the running time becomes how many times bigger?`, Math.pow(fac, e), [
      "Imagine the old n and the new n and compare the two step counts.", "Each n in the formula becomes bigger by the same factor. Multiply the factors together.", "Example: for n times n steps and input 5 times bigger, the time is 5 times 5 = 25 times bigger. Now do yours."]); }
    const n = ri(3, 10); return num(`An algorithm takes 2 to the power n steps. How many steps for n = ${n}?`, Math.pow(2, n), [
      "Multiply 2 by itself n times.", "Doubling each time: it grows very fast.", "Example: 2 to the power 4 is 2 times 2 times 2 times 2 = 16. Now do yours."]);
  };
  const OPW = { more: ["is more than", "is at most"], less: ["is less than", "is at least"], eq: ["equals", "differs from"] };
  const OPK = ["more", "less", "eq"];
  const dm = (text, right, wrongs, hints) => ({ text, choices: shuf([right, ...new Set(wrongs.filter(w => w !== right))].slice(0, 4)), answer: right, hints });
  const deMorgan = () => {
    const k1 = pick(OPK), k2 = pick(OPK), s1 = Math.random() < 0.5 ? 0 : 1, s2 = Math.random() < 0.5 ? 0 : 1;
    const a = ri(2, 20), b = ri(2, 20), isAnd = Math.random() < 0.5;
    const o1 = OPW[k1][s1], n1 = OPW[k1][1 - s1], o2 = OPW[k2][s2], n2 = OPW[k2][1 - s2];
    const E = (p, q, w) => `x ${p} ${a} ${w} y ${q} ${b}`;
    const W = isAnd ? "and" : "or", V = isAnd ? "or" : "and";
    const right = E(n1, n2, V);
    const wrongs = [E(n1, n2, W), E(o1, o2, V), E(n1, o2, V)];
    return dm(`Which expression means exactly the same as <b>not (${E(o1, o2, W)})</b>?`, right, wrongs, [
      "Flip each comparison to its opposite and think about what happens to the and/or.",
      "De Morgan: not(A and B) becomes (not A) or (not B), and not(A or B) becomes (not A) and (not B). The opposite of 'is more than' is 'is at most'.",
      "Example: not (x is more than 3 and y is less than 5) means x is at most 3 or y is at least 5. Now do yours."
    ]);
  };

  const lessons19 = [
    L("Break it into functions", facts(DECOMP, "Think about small parts with clear jobs.", "Example: a recipe app can have findRecipe, scaleServings and showSteps as separate functions."), [
      S("Decomposition", "🧩", "Big programs are built from small parts. <b>Decomposition</b> means splitting a big problem into smaller ones that are easier to solve."),
      S("One job each", "🛠️", "Give each function <b>one clear job</b> and a good name, like <b>calculateTotal</b> or <b>drawScreen</b>."),
      S("Do not repeat", "♻️", "If the same code is needed in two places, write it once as a function and call it twice."),
      S("Plan first", "📝", "Top-down design: sketch the big steps, then fill in each step.")]),
    L("Tracing programs", mix(trace1, trace2, trace3), [
      S("Trace tables", "📋", "To trace a program, make a small table with a column for every variable. Update it line by line."),
      S("Loops", "🔁", "total = 0; for i from 1 to 4: if i mod 2 = 0 then total = total + i. Only 2 and 4 count, so total ends at 6. A while loop is checked <b>before</b> each pass."),
      S("Be exact", "🎯", "A line like <b>a = a + b</b> uses the values the variables have right now. The computer does exactly what the lines say, in order.")]),
    L("Parameters and return values", mix(facts(PARAM, "Remember the words: parameters are in the definition, arguments are in the call.", "Example: in def add(a, b), a and b are parameters. In add(1, 2), the 1 and 2 are arguments."), paramQ, paramQ), [
      S("Two words", "🏷️", "<b>Parameters</b> are the names in a function's definition. <b>Arguments</b> are the values you give in a call."),
      S("Return", "📤", "<b>return</b> sends a value back to the code that called the function."),
      S("Example", "🧮", "def f(a, b): return a * b. The call f(3, 4) puts 3 in a and 4 in b, so it returns 12.")]),
    L("Unit tests", mix(unitQ, unitQ, facts(UNIT, "Think about checking one small piece against a known answer.", "Example: assert double(4) == 8 checks that double gives 8 for 4.")), [
      S("What is a test?", "✅", "A <b>unit test</b> calls one function with a known input and checks that the output is what you expect."),
      S("assert", "🔬", "<b>assert add(2, 3) == 5</b> passes if add(2, 3) really is 5. If not, the test fails and shows you where to look."),
      S("Run them often", "🔁", "Run the tests after every change. A test that used to pass and now fails shows a <b>regression</b>.")]),
    L("Boundary tests", boundQ, [
      S("Edges matter", "📏", "Bugs love the edges of a rule, like exactly at the limit or one step beyond it."),
      S("Test both sides", "↔️", "For <b>age &gt;= 13</b>, test 12 (fails) and 13 (passes). One test just outside, one just inside."),
      S("Edge cases", "🕳️", "Also try empty input, a single item, zero, and very big values.")]),
    L("Debugging strategies", facts(DBG, "Think about how a detective would work: gather evidence.", "Example: if a loop prints too many lines, print the counter each time to see where it goes wrong."), [
      S("Be a detective", "🕵️", "Read the error message first. It often names the line and the kind of problem."),
      S("Repeat it, shrink it", "🔍", "First make the bug happen on purpose. Then cut away code until only the problem is left."),
      S("One change at a time", "1️⃣", "Change a single thing, then test. After the fix, add a test so it cannot sneak back.")]),
    L("Try and catch", mix(exQ, exQ, facts(EXC, "Think about what kind of mistake is happening.", "Example: reading item 9 from a list of 3 items gives an index error.")), [
      S("Errors happen", "💥", "Some mistakes only show up while the program runs: dividing by zero, a missing file, bad input."),
      S("try / catch", "🪤", "Put risky code in a <b>try</b> block. If an error happens, the program jumps to the <b>catch</b> block instead of crashing."),
      S("Skip the rest", "⏭️", "Lines in the try block after the error are skipped. The program then goes on after the catch.")]),
    L("Objects with methods", classQ, [
      S("Class and object", "🏗️", "A <b>class</b> is a blueprint. An <b>object</b> is one thing built from it, with its own data."),
      S("Methods", "⚙️", "A <b>method</b> is a function that belongs to the class. <b>acct.deposit(5)</b> changes acct's own balance."),
      S("Rules inside", "🔐", "A method can have rules, such as refusing to take out more money than the balance.")]),
    L("Separate objects, shared objects", objQ, [
      S("Own data", "📦", "Each object built from a class has its own copy of the data. Changing a does not change b."),
      S("Careful with =", "👯", "<b>b = a</b> does not copy the object. Both names point to the <b>same</b> object."),
      S("Example", "🧪", "a = Counter(3); b = a; b.add(2). Now a.count is 5 too, because there is only one counter.")]),
    L("Hiding the inside", facts(ENC, "Think about protecting the data inside an object.", "Example: a Clock keeps the time private and gives a setTime method that checks the hours are 0 to 23."), [
      S("Encapsulation", "💊", "<b>Encapsulation</b> keeps an object's data inside and lets other code use it only through methods."),
      S("Why", "🛡️", "A setter can refuse bad values, like a negative age. The inside can change without breaking other code."),
      S("Interface", "🔌", "The methods others may use are the class's <b>public interface</b>.")]),
    L("Many shapes, one method", mix(polyQ, polyQ, facts(POLY, "Think about the same method name doing different things.", "Example: Bird.move() flies and Fish.move() swims, but both are called move().")), [
      S("Polymorphism", "🔷", "Different classes can have a method with the same name that works in their own way."),
      S("Example", "📐", "Rectangle.area() is width times height. Triangle.area() is base times height divided by 2. Code just calls area()."),
      S("is-a and has-a", "🔗", "A Car <b>is a</b> Vehicle (inheritance). A Car <b>has an</b> Engine (a part).")]),
    L("Recursion with a running total", accQ, [
      S("Carry it along", "🎒", "A recursive function can carry a running total in an extra parameter."),
      S("Example", "➕", "go(2, 0): n = 2, total 0, then go(1, 2), then go(0, 3). When n is 0 it returns the total, 3."),
      S("Trace it", "📋", "Write each call on its own line with its values. Stop at the base case.")]),
    L("Base cases", facts(BASE, "Think about when the chain of calls must stop.", "Example: for sum(n) = n + sum(n - 1), the base case sum(0) = 0 stops the chain."), [
      S("The stop sign", "🛑", "Every recursive function needs a <b>base case</b>, an input it can answer without calling itself."),
      S("Move closer", "🪜", "Each recursive call must get closer to the base case, otherwise it never stops."),
      S("No base case", "💥", "Without one, the calls pile up until the program crashes with a <b>stack overflow</b>.")]),
    L("Recursion on lists", listRec, [
      S("First and rest", "✂️", "Split a list into its <b>first item</b> and the <b>rest</b>. Solve the rest by calling the function again."),
      S("Empty list", "🪹", "The empty list is the usual base case: its sum is 0 and its length is 0."),
      S("Example", "📝", "sumList([2, 5]) = 2 + sumList([5]) = 2 + 5 + sumList([]) = 7.")]),
    L("How deep is the stack?", depthQ, [
      S("Calls pile up", "📚", "A call that waits for another call stays on the <b>call stack</b>."),
      S("Count them", "🔢", "List the inputs of the calls, from the first to the base case. Count the list."),
      S("Example", "📏", "f(n) calls f(n - 1), stops at 0. f(3) leads to f(3), f(2), f(1), f(0): 4 calls at the deepest point.")]),
    L("Big-O names", BO, [
      S("Growth", "📈", "<b>Big-O</b> tells how running time grows when the input size n grows."),
      S("The common ones", "🏷️", "<b>O(1)</b>: same work always. <b>O(log n)</b>: halving. <b>O(n)</b>: one pass. <b>O(n squared)</b>: a loop inside a loop."),
      S("Ignore constants", "✂️", "Doing 3 steps for each item is still O(n). Big-O cares about the shape of the growth.")]),
    L("Comparing growth", growQ, [
      S("Count the steps", "🧮", "If an algorithm takes n times n steps, then for n = 10 it takes 100 steps."),
      S("When n grows", "🚀", "If n doubles, n times n steps becomes 4 times as many. Doubling n in a plain n algorithm only doubles the time."),
      S("Very fast growth", "💣", "2 to the power n doubles with every extra input. It becomes huge very quickly.")]),
    L("De Morgan's laws", deMorgan, [
      S("Flip a condition", "🔄", "<b>not (A and B)</b> is the same as <b>(not A) or (not B)</b>."),
      S("And the other way", "↔️", "<b>not (A or B)</b> is the same as <b>(not A) and (not B)</b>. Swap and/or and flip each test."),
      S("Opposites", "⚖️", "The opposite of x &gt; 3 is x &lt;= 3. The opposite of x == 3 is x != 3.")])
  ];
  const A19 = [trace1, trace2, trace3, paramQ, unitQ, boundQ, exQ, classQ, objQ, polyQ, accQ, listRec, depthQ, BO, growQ, deMorgan];
  lessons19.push(
    L("Mixed practice", mix(...A19, facts(DECOMP, "Think about small parts with clear jobs.", "Example: split a big job into named functions."), facts(DBG, "Think like a detective.", "Example: print values to see what the program really does.")), MIXS("tracing code, parameters, tests, try and catch, objects, recursion, Big-O and De Morgan's laws.")),
    L("Level 19 Challenge", mix(...A19, facts(DECOMP, "Think about small parts with clear jobs.", "Example: split a big job into named functions."), facts(DBG, "Think like a detective.", "Example: print values to see what the program really does."), facts(BASE, "Think about when the chain of calls must stop.", "Example: sum(0) = 0 is a base case."), facts(ENC, "Think about protecting data inside an object.", "Example: a setter can refuse bad values."), facts(POLY, "Think about the same method name doing different things.", "Example: Bird.move() flies, Fish.move() swims."), facts(PARAM, "Think about names versus values.", "Example: in add(1, 2), the 1 and 2 are arguments.")), MIXS("everything from level 19: program design, tracing, tests, errors, objects, recursion, Big-O and logic."))
  );

  // =====================================================================
  // LEVEL 20
  // =====================================================================
  const mkRows = n => { const nm = shuf(NM).slice(0, n), sc = uniq(n, 40, 99); return nm.map((x, i) => [x, ri(8, 10), sc[i]]); };
  const tbl = r => table(["name", "grade", "score"], r);
  const dmlQ = () => {
    const n = ri(5, 7), r = mkRows(n), f = ri(0, 2);
    if (f === 0) {
      const t = pick([55, 60, 65, 70]), keep = r.filter(x => x[2] >= t).length;
      return num(`How many rows are left in <b>students</b> after this?<br><code>DELETE FROM students WHERE score &lt; ${t};</code>`, keep, [
        "DELETE removes the rows that match the WHERE test. The others stay.",
        "Check each row's score against the test and count the rows that do NOT match.",
        "Example: scores 50, 70, 90 and DELETE WHERE score &lt; 60 removes only the 50 row, so 2 rows remain. Now do yours."
      ], tbl(r));
    }
    if (f === 1) {
      const row = pick(r), k = ri(2, 9);
      return num(`What is ${row[0]}'s score after this?<br><code>UPDATE students SET score = score + ${k} WHERE name = '${row[0]}';</code>`, row[2] + k, [
        "UPDATE changes the rows that match the WHERE test.",
        "Find the row for that name, then add the number to its score.",
        "Example: a row with score 40 after SET score = score + 5 has score 45. Now do yours."
      ], tbl(r));
    }
    const a = ri(1, 2), t = pick([55, 60, 65, 70]);
    const rows = r.length + a - (r.filter(x => x[2] < t).length);
    return num(`${a === 1 ? "One new row with a score of 99 is added" : "Two new rows with a score of 99 are added"} using INSERT. Then <code>DELETE FROM students WHERE score &lt; ${t};</code> runs. How many rows are in the table at the end?`, rows, [
      "Do the INSERT first, then the DELETE, in the order they run.",
      "New rows with a score of 99 do not match the delete test. Count the old rows that do match.",
      "Example: 4 rows, insert 1 row (score 99) makes 5, then delete removes 2 old rows, leaving 3. Now do yours."
    ], tbl(r));
  };
  const whereQ = () => {
    const r = mkRows(7), f = ri(0, 2);
    if (f === 0) {
      const a = pick([8, 9]), b = 10;
      return num(`How many rows does <code>SELECT * FROM students WHERE grade IN (${a}, ${b});</code> return?`, r.filter(x => x[1] === a || x[1] === b).length, [
        "IN checks if the value is in the list in the brackets.",
        "Count the rows whose grade is one of the two listed numbers.",
        "Example: WHERE grade IN (1, 3) matches rows with grade 1 or grade 3, but not 2. Now do yours."
      ], tbl(r));
    }
    if (f === 1) {
      const lo = pick([50, 55, 60]), hi = lo + pick([15, 20, 25]);
      return num(`How many rows does <code>SELECT * FROM students WHERE score BETWEEN ${lo} AND ${hi};</code> return? (BETWEEN includes both ends)`, r.filter(x => x[2] >= lo && x[2] <= hi).length, [
        "BETWEEN keeps scores from the low number up to the high number.",
        "Both end numbers count as matches. Check each row.",
        "Example: BETWEEN 10 AND 20 matches 10, 15 and 20 but not 9 or 21. Now do yours."
      ], tbl(r));
    }
    const end = Math.random() < 0.5, ch = end ? "a" : pick(["A", "B", "C", "D", "E", "F", "G", "H"]);
    const pat = end ? "'%a'" : `'${ch}%'`;
    const cnt = r.filter(x => end ? x[0].endsWith("a") : x[0].startsWith(ch)).length;
    return num(`How many rows does <code>SELECT * FROM students WHERE name LIKE ${pat};</code> return? (% stands for any letters)`, cnt, [
      "LIKE matches text patterns. The percent sign stands for any number of any letters.",
      `A percent sign at the ${end ? "start" : "end"} means anything can be ${end ? "before" : "after"} the letter you can see.`,
      "Example: LIKE 'B%' matches Ben and Bo, and LIKE '%n' matches Ben and Dan. Now do yours."
    ], tbl(r));
  };
  const limitQ = () => {
    const r = mkRows(6), f = ri(0, 2);
    if (f === 0) {
      const k = ri(2, 4), s = [...r].sort((x, y) => y[2] - x[2]).slice(0, k), ans = s[s.length - 1][0];
      return mc(`Which name is the <b>last</b> row of the result?<br><code>SELECT name FROM students ORDER BY score DESC LIMIT ${k};</code>`, ans, r.map(x => x[0]).filter(x => x !== ans), [
        "ORDER BY score DESC puts the highest scores first, then LIMIT keeps only the first few rows.",
        "Sort by score from biggest to smallest, keep the number of rows named after LIMIT, and look at the last one you kept.",
        "Example: scores Al 90, Bo 70, Cy 80 with DESC and LIMIT 2 gives Al then Cy. The last row is Cy. Now do yours."
      ], tbl(r));
    }
    if (f === 1) {
      const d = new Set(r.map(x => x[1])).size;
      return num("How many rows does <code>SELECT DISTINCT grade FROM students;</code> return? (DISTINCT removes repeated values)", d, [
        "DISTINCT gives each different value only once.",
        "List the grade values you see and count the different ones.",
        "Example: the values 8, 9, 8, 8, 9 have 2 different values. Now do yours."
      ], tbl(r));
    }
    const s = [...r].sort((x, y) => x[2] - y[2]), ans = s[1][0];
    return mc("Which name does this return?<br><code>SELECT name FROM students ORDER BY score ASC LIMIT 1 OFFSET 1;</code> (OFFSET 1 skips the first row)", ans, r.map(x => x[0]).filter(x => x !== ans), [
      "ASC sorts from the smallest score upward. OFFSET skips rows from the start of the sorted result.",
      "Sort by score, skip the first row, then keep one row.",
      "Example: scores Al 5, Bo 3, Cy 9 sorted ascending are Bo, Al, Cy. OFFSET 1 LIMIT 1 gives Al. Now do yours."
    ], tbl(r));
  };
  const joinQ = () => {
    const cn = shuf(NM).slice(0, 4), orders = [];
    const items = ["pen", "book", "lamp", "mug", "bag", "map"];
    for (let i = 0; i < ri(6, 9); i++) orders.push([i + 1, pick(cn), pick(items)]);
    const who = pick(cn), cnt = orders.filter(o => o[1] === who).length;
    if (cnt === 0) return joinQ();
    const vis = `<div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">${table(["customer"], cn.map(c => [c]))}${table(["order_id", "customer", "item"], orders)}</div>`;
    return num(`A JOIN matches every order to its customer. How many rows does this return?<br><code>SELECT * FROM customers JOIN orders ON customers.customer = orders.customer WHERE customers.customer = '${who}';</code>`, cnt, [
      "A join gives one result row for each matching pair. One customer can match many orders.",
      "Count the rows in the orders table that belong to that customer.",
      "Example: if Al has orders 1 and 4 only, the join for Al has 2 rows. Now do yours."
    ], vis);
  };
  const OM = [
    ["Students take many classes and each class has many students. How should this be stored?", "A third table that links student ids and class ids", ["One table with a very long list in each cell", "Only the students table", "Only one student per class"], "Think about a table whose rows are the connections."],
    ["The table enrollments has the columns student_id and class_id. What does one row mean?", "One student is in one class", ["One class has no students", "One student is deleted", "One class is deleted"], "Each row records one connection."],
    ["Which pair is a one-to-many relationship?", "One author and the books they wrote", ["Students and classes they all share", "One person and their one passport", "Two numbers"], "One thing on one side, several on the other."],
    ["Which pair is a one-to-one relationship?", "One person and their one passport number", ["One author and many books", "Students and classes", "A shop and its many orders"], "Exactly one on each side."],
    ["In an orders table, the column customer_id points to the customers table. It is a:", "foreign key", ["primary key", "sort key", "random number"], "A key that refers to another table."],
    ["Why not copy the customer's address into every order row?", "It repeats data and the copies can get out of sync", ["It saves space", "It makes the data safer", "It is not possible"], "Think about changing the address later."],
    ["A customer is deleted but their orders stay. What problem can this cause?", "Orphan rows that point to nobody", ["The orders become faster", "The database gets smaller on its own", "Nothing can happen"], "Think about a foreign key that points nowhere."],
    ["A primary key must be:", "Unique for every row", ["The same in every row", "Always a word", "Empty"], "It is the row's identity."]
  ];
  const IDX = [
    ["What does a database index do?", "Helps the database find rows faster, like the index of a book", ["Deletes old rows", "Adds colors to a table", "Makes the data private"], "Think about the index at the back of a book."],
    ["Without an index, finding one row might mean reading:", "Every row in the table (a full scan)", ["Only the first row", "No rows", "Only the last row"], "Without a shortcut, the database must look everywhere."],
    ["What is a downside of adding many indexes?", "They take space and slow down inserts and updates", ["They delete data", "They make searches impossible", "They have no downside at all"], "Every change must also update every index."],
    ["Which column is a good choice for an index?", "One you search by often, such as email", ["A column nobody ever uses", "A column that is always empty", "A column with a big picture inside"], "Index what you look up."],
    ["An index keeps values sorted so the database can use:", "Fast jumps, like binary search", ["Random guessing", "A full scan", "Colors"], "Sorted data allows halving."],
    ["A primary key column is usually:", "Indexed automatically", ["Never indexed", "Always secret", "Always text"], "It must be found and checked quickly."]
  ];
  const idxQ = () => {
    const k = ri(4, 16), n = Math.pow(2, k);
    if (Math.random() < 0.5) return num(`A table has ${n} rows and an index that lets the database halve the search space each step. About how many steps does it need? (the answer is log2 of ${n})`, k, [
      "Count how many times you can halve the number of rows to get down to 1.",
      "The number of halvings is the exponent when the row count is written as a power of 2.",
      "Example: 32 rows can be halved 5 times (32, 16, 8, 4, 2, 1). So about 5 steps. Now do yours."
    ]);
    return num(`A table has ${n} rows. A full scan, in the worst case, reads all the rows. A scan with the index takes about ${k} steps. How many rows does the index let the database skip reading? (rows minus steps)`, n - k, [
      "The full scan reads every row. Compare it to the index steps.",
      "Subtract the number of steps from the number of rows.",
      "Example: 64 rows, 6 steps leaves 58 rows not read. Now do yours."
    ]);
  };
  const ipQ = () => {
    const f = ri(0, 3), n = ri(24, 30);
    if (f === 0) return num(`How many addresses are in a /${n} block? (A /${n} block fixes ${n} bits, so the other ${32 - n} bits can change.)`, Math.pow(2, 32 - n), [
      "Count the bits that are free to change.",
      "Each free bit doubles the number of addresses.",
      "Example: a /29 block has 3 free bits, so 2 times 2 times 2 = 8 addresses. Now do yours."
    ]);
    if (f === 1) return num(`In a /${n} block, the first address names the network and the last one is for broadcasting, so they cannot be used for devices. How many usable device addresses are there?`, Math.pow(2, 32 - n) - 2, [
      "First find the total number of addresses from the free bits.",
      "Take away the two addresses that cannot be used.",
      "Example: a /29 block has 8 addresses, minus 2 gives 6 usable. Now do yours."
    ]);
    if (f === 2) { const a = ri(0, 255), same = Math.random() < 0.5, b = same ? a : (a + ri(1, 5)) % 256;
      return yn(`With the mask 255.255.255.0 (/24), are 192.168.${a}.${ri(1, 100)} and 192.168.${b}.${ri(101, 200)} on the same network?`, same, [
        "A /24 mask means the first three numbers name the network.",
        "Compare the first three numbers of both addresses. Only the last one may differ.",
        "Example: 10.0.5.20 and 10.0.5.99 share 10.0.5, so they are on the same /24 network. Now do yours."
      ]); }
    return num(`In a /${n} network, how many bits are left over for the host (device) part?`, 32 - n, [
      "An IPv4 address has 32 bits in total.",
      "The number after the slash is how many bits name the network. The rest name the device.",
      "Example: in a /26 network, 32 minus 26 = 6 bits are for hosts. Now do yours."
    ]);
  };
  const PORTS = [
    ["Which port does plain HTTP use by default?", "80", ["443", "22", "25"], "HTTPS has its own number. Plain web traffic uses the other famous web port."],
    ["Which port does HTTPS use by default?", "443", ["80", "22", "53"], "The S stands for secure, so it is not the plain web port."],
    ["What does a port number identify?", "Which program or service on a computer should receive the data", ["The color of the cable", "The name of the user", "The size of the file"], "An IP address finds the computer; the port finds something inside it."],
    ["Which protocol resends lost packets and keeps them in order?", "TCP", ["UDP", "PNG", "RGB"], "Think about reliable delivery."],
    ["Which is better for a live video call, where speed matters more than perfect delivery?", "UDP", ["TCP", "FTP", "HTML"], "A late packet is worse than a lost one."],
    ["SMTP is a protocol used for:", "Sending email", ["Loading web pages", "Finding IP addresses", "Playing music"], "The M stands for mail."],
    ["Which protocol is used by web browsers to ask for pages?", "HTTP", ["SMTP", "SSH", "DNS"], "Think about the letters at the start of a web address."],
    ["SSH (port 22) is used to:", "Log in to another computer securely", ["Watch videos", "Send tweets", "Print photos"], "S stands for secure and the second letter for shell."]
  ];
  const DNSF = [
    ["What does DNS do?", "Turns a domain name into an IP address", ["Makes the internet faster", "Stores your passwords", "Blocks viruses"], "Computers need numbers; people like names."],
    ["In the address www.example.com, which part is the top-level domain?", "com", ["www", "example", "www.example"], "It is the very last part."],
    ["In blog.example.net, the word blog is a:", "subdomain", ["top-level domain", "port", "protocol"], "It sits in front of the main name."],
    ["Why do browsers remember (cache) DNS answers for a while?", "To avoid asking again, so pages load faster", ["To make the answers wrong", "To use more memory", "To hide the page"], "Think about asking the same question over and over."],
    ["A DNS lookup fails. What is the most likely effect?", "The browser cannot find the server's address", ["The page appears but smaller", "The keyboard stops working", "The page loads faster"], "No address means no way to reach the server."],
    ["What is localhost?", "A name that means your own computer", ["The newest web server", "A kind of virus", "A cloud storage service"], "Developers use it to test their own programs."],
    ["An IPv4 address is made of how many bits?", "32", ["16", "64", "128"], "It is four numbers, each from 0 to 255, each stored in 8 bits."],
    ["Why was IPv6 created?", "IPv4 does not have enough addresses for all devices", ["IPv4 was too slow to type", "IPv6 removes domain names", "IPv4 had no numbers"], "Think about how many phones and gadgets exist."]
  ];
  const pktQ = () => {
    const f = ri(0, 2);
    if (f === 0) { const sz = pick([1000, 500, 1500]), F = ri(2, 9) * 500 + ri(1, 4) * 100;
      return num(`A file of ${F} bytes is sent in packets that carry up to ${sz} bytes of data each. How many packets are needed?`, Math.ceil(F / sz), [
        "Divide the file size by the data in one packet.",
        "A leftover piece still needs its own packet, so round up.",
        "Example: 2500 bytes with 1000 bytes per packet makes 2 full packets and 1 small one, so 3. Now do yours."
      ]); }
    if (f === 1) { const N = ri(10, 40), k = pick([5, 10]);
      return num(`A message is sent as ${N} packets. Every ${k}th packet is lost (that is ${Math.floor(N / k)} packets) and is sent again once. How many packets are sent in total?`, N + Math.floor(N / k), [
        "Start with the packets of the first try, then add the resends.",
        "Total sent = original packets + resent packets.",
        "Example: 12 packets and 2 lost ones means 14 packets are sent. Now do yours."
      ]); }
    const n = ri(3, 12), p = pick([960, 460]), h = 1000 - p;
    return num(`Each packet has ${h} bytes of header plus ${p} bytes of data. How many bytes travel on the network for ${n} packets?`, n * 1000, [
      "Find how many bytes one whole packet has.",
      "Multiply the size of one whole packet by the number of packets.",
      "Example: a packet of 100 bytes header plus 400 bytes data is 500 bytes; 3 packets are 1500 bytes. Now do yours."
    ]);
  };
  const latQ = () => {
    const f = ri(0, 2);
    if (f === 0) { const r = ri(2, 6), t = pick([20, 30, 50, 80]);
      return num(`A web page needs ${r} round trips to the server, one after the other. Each round trip takes ${t} ms. How many ms is that in total?`, r * t, [
        "Round trips happen one after another, so their times add up.",
        "Multiply the number of round trips by the time of one.",
        "Example: 3 round trips of 10 ms take 30 ms. Now do yours."
      ]); }
    if (f === 1) { const h = ri(4, 12), t = ri(2, 9);
      return num(`A packet crosses ${h} routers and each one adds ${t} ms of delay on the way there. A ping measures there and back, assuming the same delay on the way back. How many ms is the ping?`, 2 * h * t, [
        "Ping measures a round trip: the way there and the way back.",
        "Find the one-way delay first, then double it.",
        "Example: 3 routers at 5 ms is 15 ms one way, and a ping of 30 ms. Now do yours."
      ]); }
    const k = ri(5, 20), t = pick([10, 20, 40]), par = 4;
    return num(`A browser fetches ${k} files. Each fetch takes ${t} ms. It can fetch ${par} at the same time, in groups. How many ms does it take in total? (groups run one after another)`, Math.ceil(k / par) * t, [
      "Make groups of 4 files. Each group takes the time of one fetch.",
      "Count the groups, and round up if the last group is not full.",
      "Example: 9 files in groups of 4 makes 3 groups; at 10 ms each that is 30 ms. Now do yours."
    ]);
  };
  const LAYERS = [
    ["In the four-layer internet model, which layer includes HTTP and email protocols?", "Application", ["Link", "Transport", "Internet"], "It is the layer closest to the programs you use."],
    ["Which layer breaks data into pieces and uses TCP or UDP?", "Transport", ["Application", "Link", "Internet"], "It decides how to deliver data between programs."],
    ["Which layer handles IP addresses and routing between networks?", "Internet", ["Application", "Transport", "Link"], "It finds a path across many networks."],
    ["Which layer sends the actual bits over Wi-Fi or an Ethernet cable?", "Link", ["Application", "Transport", "Internet"], "It is the layer closest to the wire or the radio."],
    ["Why does the internet use layers?", "Each layer does one job and can change without breaking the others", ["Layers make packets smaller", "Layers hide the internet from everyone", "Layers are required for wires"], "Think about teamwork with clear jobs."],
    ["What does a router do?", "Forwards packets between networks using IP addresses", ["Stores web pages", "Types passwords", "Prints files"], "It decides where the packet goes next."],
    ["What is a packet?", "A small chunk of data with a header saying where it goes", ["A whole movie", "A kind of cable", "A password"], "Big messages are cut up into pieces."],
    ["Packets from one message can take different routes. What does the receiver do?", "Puts them back in the right order", ["Throws them all away", "Waits for the same route", "Counts only the first one"], "Each packet has a number."]
  ];
  const ENCR = [
    ["Symmetric encryption uses:", "The same key to lock and unlock", ["A different key for every letter of the alphabet", "No key", "Only a password you can read"], "The word symmetric means both sides are the same."],
    ["Public-key encryption uses:", "A public key to lock and a private key to unlock", ["The same key to lock and unlock", "Two public keys", "No keys at all"], "There are two different keys in a pair."],
    ["Who should know the private key?", "Only its owner", ["Everyone", "The first person who asks", "Every website"], "The name tells you."],
    ["You want to send a secret message using public-key encryption. Which key do you use to lock it?", "The receiver's public key", ["Your own private key", "The receiver's private key", "No key"], "You lock with something anybody may have, and only the owner of the pair can open it."],
    ["What does HTTPS add to HTTP?", "Encryption so others cannot read the data on the way", ["More colors", "Faster computers", "Free downloads"], "The S stands for secure."],
    ["A digital certificate shows:", "That a website's public key really belongs to that site", ["The site's favorite color", "How many visitors it has", "Nothing important"], "Think about an ID card for websites."],
    ["Without the key, encrypted data looks like:", "Random-looking nonsense", ["A clear message", "A picture of a lock", "An empty file"], "That is the whole point."],
    ["Why is public-key encryption useful on the web?", "Strangers can start a secure chat without first sharing a secret", ["It makes pages shorter", "It removes the need for servers", "It makes passwords unnecessary forever"], "Think about two computers meeting for the first time."]
  ];
  const ATTACK = [
    ["What is SQL injection?", "Sneaking database commands into an input box", ["Adding more tables", "A way to speed up a query", "A drawing tool"], "The attack hides inside what a user types."],
    ["What is a brute-force attack?", "Trying many passwords until one works", ["Breaking a screen", "Sending a gift", "Stealing a laptop"], "Think of trying every key on a ring."],
    ["What is a DDoS attack?", "Flooding a server with so much traffic that real users cannot get in", ["Stealing one password", "Writing a better program", "Cleaning data"], "Too many requests at once."],
    ["What is social engineering?", "Tricking people instead of breaking into computers", ["Building social websites", "Repairing servers", "Making computer chips"], "The target is a person."],
    ["What is malware?", "Software made to cause harm", ["A kind of keyboard", "A free game", "A backup"], "Mal means bad."],
    ["What is a man-in-the-middle attack?", "Secretly sitting between two parties and reading or changing their messages", ["Hiding in a server room", "Sending a lot of email", "Writing slow code"], "The attacker listens in the middle."],
    ["Ransomware is software that:", "Locks your files and demands payment", ["Speeds up your computer", "Updates games", "Compresses photos"], "Think of a ransom."],
    ["What is cross-site scripting (XSS)?", "Getting a website to run an attacker's script in other users' browsers", ["Copying a website's colors", "Linking two websites", "Measuring website speed"], "Unsafe input shows up on a page that others view."]
  ];
  const DEFEND = [
    ["How do you prevent SQL injection when a user types a name into a query?", "Use parameterized queries so input stays data", ["Join the text straight into the command", "Hope nobody tries", "Make the input box smaller"], "Keep commands and data separate."],
    ["Why add a random salt before hashing a password?", "So two equal passwords get different hashes", ["So the password is shorter", "So the hash can be turned back", "So the user can see it"], "Think about identical hashes being a clue to attackers."],
    ["The principle of least privilege says:", "Give each program or person only the access they need", ["Give everyone full access", "Give access to nobody", "Share one password with all"], "Less power means less damage."],
    ["Why keep software updated?", "Updates fix known security holes", ["Updates delete your files", "Updates make passwords shorter", "Updates stop the internet"], "Attackers know about old holes."],
    ["What is the safest way for a website to store passwords?", "Store only salted hashes", ["Store them in plain text", "Email them to the user", "Print them on the page"], "A stolen database should not reveal them."],
    ["What is two-factor authentication?", "Using two different kinds of proof, like a password and a code from a phone", ["Typing the password twice", "Using two usernames", "Having two computers"], "Something you know plus something you have."],
    ["Never trust user input means:", "Check and clean everything users send", ["Delete all inputs", "Believe everyone", "Skip testing"], "Treat it as possibly unsafe."],
    ["Why make backups?", "To recover after loss, damage or ransomware", ["To fill the disk", "To slow down the computer", "To hide files"], "Think about getting your data back."]
  ];
  const chkQ = () => {
    const n = ri(3, 5), a = Array.from({ length: n }, () => ri(10, 99)), m = pick([10, 100]);
    const cs = sum(a) % m;
    if (Math.random() < 0.55) return num(`A checksum is the sum of the bytes divided by ${m}, keeping only the remainder. What is the checksum of ${lst(a)}?`, cs, [
      "First add up all the byte values.",
      `Divide the total by ${m} and keep the leftover.`,
      `Example: bytes [57, 60] add to 117; with ${m === 10 ? "10, the remainder is 7" : "100, the remainder is 17"}. Now do yours.`
    ]);
    const ok = Math.random() < 0.5, shownCs = ok ? cs : (cs + ri(1, m - 1)) % m;
    const rcv = [...a]; if (!ok && shownCs === cs) rcv[0] += 1;
    return yn(`Data ${lst(a)} arrives with the checksum ${shownCs} (checksum = sum mod ${m}). Is the data probably intact?`, ok && shownCs === cs, [
      "Calculate the checksum yourself from the bytes that arrived.",
      "Compare your checksum to the one that came with the data. If they differ, something changed.",
      "Example: bytes [10, 25] have the checksum 35 mod 100 = 35. If the sent checksum says 30, the data was changed. Now do yours."
    ]);
  };
  const BR = [
    ["What is a branch in version control?", "A separate line of work that does not disturb the main version", ["A deleted file", "A kind of bug", "A copy of the internet"], "Think of a side road off a main road."],
    ["What does merging do?", "Combines the changes from one branch into another", ["Deletes a branch", "Renames a file", "Makes the code run faster"], "Two lines of work become one."],
    ["A merge conflict happens when:", "Two branches changed the same lines in different ways", ["Two people use the same username", "The internet is down", "A file is too big"], "Git cannot choose between the two versions."],
    ["What is a pull request?", "A request for others to review and merge your branch", ["A request for a password", "A command that deletes files", "A way to download music"], "It starts a conversation before merging."],
    ["What does cloning a repository do?", "Copies the whole repository to your computer", ["Deletes the original", "Turns it into a picture", "Locks it"], "You get your own working copy."],
    ["What is a commit message for?", "To explain what changed and why", ["To make the file smaller", "To hide the author", "To run the tests"], "Future readers will want to know the reason."],
    ["Why use a separate branch for a new feature?", "Unfinished work does not break the working version", ["Branches make code shorter", "It is not allowed on main", "It deletes old features"], "Keep the main version working."],
    ["Which is a good habit with commits?", "Small commits that each do one thing", ["One giant commit a month", "Commits with the message 'stuff'", "Never committing"], "Small steps are easy to review and undo."]
  ];
  const brQ = () => {
    const k = ri(3, 10), m = ri(1, 5), p = ri(1, 5);
    return num(`The main branch has ${k} commits. You create a branch and add ${m} commit${m === 1 ? "" : "s"}. Meanwhile main gets ${p} more commit${p === 1 ? "" : "s"}. You merge your branch into main and the merge creates 1 extra merge commit. How many commits does main have now?`, k + m + p + 1, [
      "Add up the commits from all the lines of work that end up in main.",
      "Do not forget the extra merge commit.",
      "Example: main has 4 commits, the branch adds 2, main adds 1 more, and the merge adds 1. That is 4 + 2 + 1 + 1 = 8. Now do yours."
    ]);
  };
  const TESTLV = [
    ["What does an integration test check?", "That several parts work together", ["The color of the screen", "A single line in isolation", "How fast you type"], "Integration means putting parts together."],
    ["What does a system test check?", "The whole finished program working from end to end", ["Only one function", "Only the comments", "Only the file names"], "The word system means the entire thing."],
    ["What is an acceptance test?", "A check that the program does what the customer asked for", ["A test of the computer's power", "A test of the keyboard", "A test with no inputs"], "Who must be happy at the end?"],
    ["What is regression testing?", "Running old tests again to check that nothing old broke", ["Testing only new features", "Testing without code", "Deleting all tests"], "Look back to see if old things still work."],
    ["Black-box testing means:", "Testing inputs and outputs without looking at the inside", ["Testing in the dark", "Only testing black text", "Testing the hardware box"], "You cannot see inside the box."],
    ["White-box testing means:", "Testing with knowledge of the code inside", ["Testing white pages", "Testing without a keyboard", "Testing with no code"], "You can see inside the box."],
    ["In test-driven development you:", "Write a failing test first, then write code to make it pass", ["Write all the code, then never test", "Write tests only at the end", "Delete the tests when they fail"], "Tests come before code."],
    ["Which test is usually the fastest to run and the most numerous?", "Unit tests", ["System tests", "Acceptance tests", "Tests done by hand once a year"], "They check one small piece each."]
  ];
  const A20 = [dmlQ, whereQ, limitQ, joinQ, idxQ, ipQ, pktQ, latQ, chkQ, brQ];
  const lessons20 = [
    L("Changing rows: INSERT, UPDATE, DELETE", dmlQ, [
      S("Three changers", "✏️", "<b>INSERT</b> adds a row, <b>UPDATE</b> changes rows, <b>DELETE</b> removes rows."),
      S("Always WHERE", "🎯", "UPDATE and DELETE use <b>WHERE</b> to pick which rows. Without WHERE they change every row!"),
      S("Example", "🧮", "UPDATE students SET score = score + 5 WHERE name = 'Al' adds 5 only to Al's score.")]),
    L("Filtering: IN, BETWEEN, LIKE", whereQ, [
      S("IN", "📋", "<b>grade IN (8, 9)</b> matches rows where the grade is 8 or 9."),
      S("BETWEEN", "↔️", "<b>score BETWEEN 50 AND 70</b> includes 50 and 70 and everything in between."),
      S("LIKE", "🔎", "<b>name LIKE 'A%'</b> matches names that start with A. The percent sign stands for any letters. '%a' means ends with a.")]),
    L("DISTINCT, LIMIT and OFFSET", limitQ, [
      S("DISTINCT", "🧹", "<b>SELECT DISTINCT grade</b> lists each different value once."),
      S("LIMIT", "✂️", "<b>LIMIT 3</b> keeps only the first 3 rows of the result. Use it with ORDER BY for a top 3."),
      S("OFFSET", "⏭️", "<b>OFFSET 1</b> skips the first row of the result first. Great for pages of results.")]),
    L("Joining one-to-many", mix(joinQ, joinQ, facts(OM, "Think about how tables point to each other.", "Example: each order stores the id of one customer, but a customer can have many orders.")), [
      S("One to many", "🔗", "One customer can have many orders. Each order row stores the customer it belongs to."),
      S("JOIN", "🧩", "A JOIN gives one result row for each matching pair. A customer with 3 orders appears in 3 rows."),
      S("Count rows", "🔢", "To count the join rows for one customer, count their rows in the orders table.")]),
    L("Tables that link", facts(OM, "Think about how tables point to each other.", "Example: each order stores the id of one customer, but a customer can have many orders."), [
      S("Many to many", "🕸️", "Students take many classes and classes have many students. Use a <b>link table</b> with student_id and class_id."),
      S("One row, one link", "1️⃣", "Each row of the link table says: this student is in this class."),
      S("Keys", "🔑", "A <b>primary key</b> is unique per row. A <b>foreign key</b> points to a row in another table.")]),
    L("Indexes", mix(idxQ, facts(IDX, "Think about finding things faster.", "Example: a phone book is sorted so you can jump straight to a name.")), [
      S("A shortcut", "📖", "An <b>index</b> works like the index of a book: it helps you jump to the right place."),
      S("Full scan", "🐢", "Without an index the database may need to read <b>every row</b>."),
      S("Cost", "⚖️", "Indexes take space and make changes slower, so index only what you search often.")]),
    L("Subnets and address blocks", ipQ, [
      S("32 bits", "🔢", "An IPv4 address has 32 bits. A <b>/24</b> network fixes the first 24 bits, leaving 8 for devices."),
      S("Count addresses", "📦", "Free bits double the count: 8 free bits give 2 to the power 8 = 256 addresses."),
      S("Usable", "🚫", "The first address names the network and the last is for broadcast, so usable devices = total minus 2.")]),
    L("Ports and protocols", facts(PORTS, "Think about what each protocol is used for.", "Example: email uses SMTP to send, and web pages use HTTP."), [
      S("Port numbers", "🚪", "An IP address finds a computer. A <b>port</b> finds the program inside it."),
      S("Famous ports", "📌", "HTTP uses 80, HTTPS uses 443, SSH uses 22."),
      S("TCP and UDP", "📦", "<b>TCP</b> is careful: it resends lost data in order. <b>UDP</b> is fast: it does not wait, good for live video.")]),
    L("Domain names and DNS", facts(DNSF, "Think about names and numbers.", "Example: DNS is like a phone book that turns a name into a number."), [
      S("Phone book", "📒", "<b>DNS</b> turns a name like example.com into an IP address that computers can use."),
      S("Parts of a name", "🏷️", "In blog.example.com the last part, com, is the <b>top-level domain</b>, and blog is a <b>subdomain</b>."),
      S("IPv4 and IPv6", "🔢", "IPv4 addresses have 32 bits and are running out. IPv6 has 128 bits.")]),
    L("Packets", pktQ, [
      S("Little pieces", "📦", "Big files are cut into <b>packets</b>. Each packet has a header with where it goes."),
      S("Round up", "⬆️", "If the last piece does not fill a packet, it still needs its own packet."),
      S("Lost packets", "🔁", "TCP asks for lost packets again, so the total sent is more than the original.")]),
    L("Delay on the network", latQ, [
      S("Latency", "⏱️", "<b>Latency</b> is how long a message takes to travel. Ping measures the round trip."),
      S("One after another", "➡️", "Steps that wait for each other add up. Steps done at the same time take the time of the longest group."),
      S("Example", "🧮", "5 round trips of 20 ms take 100 ms.")]),
    L("Network layers", facts(LAYERS, "Think about the job each layer does.", "Example: the link layer sends bits over a wire, the application layer is where web browsers work."), [
      S("Four layers", "🥞", "<b>Application</b> (HTTP, email), <b>Transport</b> (TCP, UDP), <b>Internet</b> (IP, routing), <b>Link</b> (Wi-Fi, cables)."),
      S("Why layers", "🧱", "Each layer has one job. You can change Wi-Fi to a cable without changing a web browser."),
      S("Routers", "🧭", "A <b>router</b> passes packets between networks using IP addresses.")]),
    L("Encryption", facts(ENCR, "Think about keys and who has them.", "Example: with public-key encryption, anyone can lock a box with your public key but only you can open it."), [
      S("Keys", "🔑", "<b>Symmetric</b> encryption uses one key for both locking and unlocking."),
      S("Key pairs", "🗝️", "<b>Public-key</b> encryption has two keys. Anyone may use the public key to lock; only the owner's private key unlocks."),
      S("HTTPS", "🔒", "HTTPS uses encryption and certificates so that others cannot read or change what you send.")]),
    L("Common attacks", facts(ATTACK, "Think about what the attacker is trying to do.", "Example: phishing tricks you into giving a password, which is social engineering."), [
      S("Know the names", "🛡️", "Knowing how attacks work helps you build safe programs."),
      S("Examples", "⚠️", "Brute force tries many passwords. SQL injection sneaks commands into input. DDoS floods a server."),
      S("Be a defender", "🧑‍💻", "Learn this to protect people. Never try it on others' computers.")]),
    L("Defending your code", facts(DEFEND, "Think about how to limit the damage.", "Example: salted hashes keep passwords safe even if a database is stolen."), [
      S("Never trust input", "🚧", "Check and clean everything users send. Use parameterized queries."),
      S("Passwords", "🧂", "Store only <b>salted hashes</b>, never the passwords themselves."),
      S("Layers of safety", "🧅", "Use least privilege, updates, backups and two-factor authentication.")]),
    L("Checksums", chkQ, [
      S("Did it change?", "🔍", "A <b>checksum</b> is a small number worked out from the data. If the data changes, the checksum usually changes."),
      S("A simple one", "➕", "Add the bytes together and keep the remainder after dividing, such as the last digit."),
      S("Compare", "⚖️", "Send the checksum with the data. The receiver works it out again and compares.")]),
    L("Branches and merges", mix(brQ, facts(BR, "Think about working safely with others.", "Example: a branch lets you try an idea without changing the main code.")), [
      S("Branch", "🌿", "A <b>branch</b> is a separate line of work. Try an idea without breaking the main version."),
      S("Merge", "🔀", "<b>Merging</b> joins the branch back. A <b>conflict</b> happens when two branches changed the same lines differently."),
      S("Pull requests", "📬", "A <b>pull request</b> asks teammates to review the changes before they are merged.")]),
    L("Kinds of testing", facts(TESTLV, "Think about how big the thing being tested is.", "Example: a unit test checks a small piece; a system test checks the whole program."), [
      S("Big and small", "🔬", "<b>Unit</b> tests check small pieces. <b>Integration</b> tests check pieces together. <b>System</b> tests check the whole program."),
      S("Acceptance", "🤝", "An <b>acceptance test</b> checks that the program does what the customer asked."),
      S("Regression", "↩️", "<b>Regression</b> tests run old tests again to make sure nothing old broke.")])
  ];
  const F20 = [facts(OM, "Think about how tables point to each other.", "Example: a foreign key points to a row in another table."), facts(IDX, "Think about finding things faster.", "Example: an index is like a book's index."), facts(PORTS, "Think about each protocol's job.", "Example: SMTP sends email."), facts(DNSF, "Think about names and numbers.", "Example: DNS turns a name into an address."), facts(LAYERS, "Think about the job of each layer.", "Example: the link layer sends bits."), facts(ENCR, "Think about keys.", "Example: only the owner has the private key."), facts(ATTACK, "Think about the attacker's goal.", "Example: ransomware locks files."), facts(DEFEND, "Think about limiting damage.", "Example: salt a password hash."), facts(BR, "Think about working safely with others.", "Example: a branch keeps unfinished work apart."), facts(TESTLV, "Think about how big the tested thing is.", "Example: a unit test checks one small piece.")];
  lessons20.push(
    L("Mixed practice", mix(...A20, ...F20.slice(0, 4)), MIXS("SQL changes and filters, joins, indexes, subnets, ports, DNS, packets, delay, checksums and version control.")),
    L("Level 20 Challenge", mix(...A20, ...F20), MIXS("everything from level 20: SQL, networks, security, version control and testing."))
  );

  // =====================================================================
  // LEVEL 21
  // =====================================================================
  const REQ = [
    ["'The app must let users log in with a password' is what kind of requirement?", "Functional", ["Non-functional", "Hardware", "Decoration"], "Does it say something the app does?"],
    ["'Pages must load in under 2 seconds' is a:", "Non-functional requirement", ["Functional requirement", "Bug report", "Test result"], "It says how well the app works, not what it does."],
    ["Why gather requirements before coding?", "So you build what people actually need", ["So the code is longer", "So nobody can change anything", "So you can skip testing"], "Think about building the wrong thing."],
    ["Who are stakeholders?", "People who care about or are affected by the project", ["Only the programmers", "Only the bosses", "Only the computers"], "Users, owners, teachers, customers..."],
    ["'The app should be fast' is vague. How can you improve it?", "Make it measurable, like under 2 seconds on a normal phone", ["Say it twice", "Remove it", "Add the word very"], "Can you test it with a number?"],
    ["Scope creep means:", "Extra features keep being added beyond the plan", ["The code got shorter", "The team got smaller", "The project finished early"], "The project quietly grows."],
    ["What is a prototype?", "An early, simple version used to try out ideas", ["The final product", "A bug", "A backup"], "Try it before you build all of it."],
    ["Which is a non-functional requirement?", "The site must work for 1000 users at once", ["A user can add an item to a cart", "The site shows a list of products", "A user can reset a password"], "Look for a quality like speed, safety or capacity."]
  ];
  const STORY = [
    ["A user story is usually written like:", "As a [user], I want [goal] so that [reason]", ["Fix the thing", "Use the blue color", "Do it in a hurry"], "It names who, what and why."],
    ["What are acceptance criteria?", "Conditions that must be true for a story to count as done", ["The programmers' lunch plans", "The color of the buttons", "Bug names"], "How will you know it works?"],
    ["Which is the best user story?", "As a player, I want to save my game so that I can continue later", ["Make the database better", "Use more memory", "Fix stuff"], "It names a person, a goal and a reason."],
    ["Which acceptance criterion can be tested?", "Entering a wrong password shows the message 'Try again'", ["The login is nice", "Users are happy", "It feels fast"], "A tester must be able to say pass or fail."],
    ["For a story, 'done' should mean:", "Coded, tested and meeting the acceptance criteria", ["Typed once", "The programmer thinks it is fine", "It compiles"], "Done means really done."],
    ["Why keep user stories small?", "Small stories can be finished, tested and reviewed quickly", ["Small stories are less important", "Big stories never fail", "Small stories need no tests"], "Think about finishing in a sprint."],
    ["What is a backlog?", "A list of work still to do, ordered by priority", ["A list of bugs only", "A finished product", "A server"], "It is a to-do list for the whole team."],
    ["What does it mean to prioritize?", "Decide which work is most important to do first", ["Delete the hard work", "Do the easiest work last always", "Work faster"], "You cannot do everything at once."]
  ];
  const pointsQ = () => {
    const f = ri(0, 2), v = ri(5, 12);
    if (f === 0) { const sprints = ri(2, 6), T = v * (sprints - 1) + ri(1, v);
      return num(`A team finishes ${v} story points per sprint. The backlog has ${T} points. How many sprints will they need? (a sprint can be only partly full)`, sprints, [
        "Divide the total points by the points done per sprint.",
        "If there is a remainder, the team needs one more sprint for it, so round up.",
        "Example: 20 points at 8 per sprint needs 2.5 sprints, which rounds up to 3. Now do yours."
      ]); }
    if (f === 1) { const s = ri(2, 5), T = v * s + ri(3, 15);
      return num(`The backlog has ${T} points. The team has finished ${s} sprints at ${v} points each. How many points are left?`, T - v * s, [
        "First work out how many points were finished in all.",
        "Subtract the finished points from the total.",
        "Example: a backlog of 50, with 2 sprints of 12 points, leaves 50 - 24 = 26. Now do yours."
      ]); }
    const cap = ri(8, 14), tasks = [ri(2, 5), ri(2, 5), ri(3, 6), ri(1, 4)];
    let best = 0;
    for (let m = 0; m < 16; m++) { let s = 0; for (let i = 0; i < 4; i++) if (m & (1 << i)) s += tasks[i]; if (s <= cap && s > best) best = s; }
    return num(`A sprint has room for ${cap} points. The tasks are worth ${lst(tasks)} points. What is the most points the team can fit (each task is all-or-nothing)?`, best, [
      "Try combinations of tasks. The total must not go over the room in the sprint.",
      "Find the combination with the biggest total that still fits.",
      "Example: room for 9 with tasks [5, 4, 3]: 5 + 4 = 9 fits exactly, so the answer is 9. Now do yours."
    ]);
  };
  const critQ = () => {
    const f = ri(0, 1);
    if (f === 0) { const a = ri(1, 4), b = ri(2, 7), c = ri(2, 7), d = ri(1, 4);
      return num(`Tasks: Plan takes ${a} days. Then Build takes ${b} days and Art takes ${c} days at the same time (both only need Plan). Test needs both and takes ${d} days. What is the shortest total time?`, a + Math.max(b, c) + d, [
        "Tasks that can happen at the same time only cost the time of the longer one.",
        "Add Plan, the longer of Build and Art, and then Test.",
        "Example: Plan 1 day, then Build 3 and Art 5 together, then Test 2. Total is 1 + 5 + 2 = 8 days. Now do yours."
      ]); }
    const x1 = ri(1, 5), x2 = ri(1, 5), y1 = ri(1, 5), y2 = ri(1, 5), z = ri(1, 4);
    return num(`Two teams work at the same time. Team 1 does two tasks one after another taking ${x1} and ${x2} days. Team 2 does two tasks one after another taking ${y1} and ${y2} days. When both are done, a final task takes ${z} days. What is the shortest total time?`, Math.max(x1 + x2, y1 + y2) + z, [
      "Find how long each team takes on its own first.",
      "The final task can only start when the slower team is done.",
      "Example: Team 1 takes 2 + 3 = 5 days, Team 2 takes 1 + 2 = 3 days, final task 2 days. Total 5 + 2 = 7. Now do yours."
    ]);
  };
  const orderQ = () => {
    const names = shuf(["Design", "Code", "Test", "Ship", "Plan", "Docs"]).slice(0, 4);
    for (let tries = 0; tries < 200; tries++) {
      const base = names, edges = [];
      for (let j = 1; j < 4; j++) { const k = ri(1, Math.min(2, j)); const from = shuf(base.slice(0, j)).slice(0, k); from.forEach(f => edges.push([f, base[j]])); }
      const ok = p => edges.every(([a, b]) => p.indexOf(a) < p.indexOf(b));
      const perms = []; const gen = (cur, rest) => { if (!rest.length) { perms.push(cur); return; } rest.forEach((r, i) => gen([...cur, r], rest.filter((_, j) => j !== i))); }; gen([], base);
      const valid = perms.filter(ok), bad = perms.filter(p => !ok(p));
      if (valid.length !== 1 || bad.length < 3) continue;
      const right = valid[0].join(", ");
      const need = base.slice(1).map(t => { const f = edges.filter(e => e[1] === t).map(e => e[0]); return f.length ? `${t} needs ${f.join(" and ")}` : null; }).filter(Boolean).join(". ");
      return { text: `${need}. Which order of work is allowed?`, choices: shuf([right, ...shuf(bad).slice(0, 3).map(p => p.join(", "))]), answer: right, hints: [
        "Every task must come after the tasks it needs.",
        "Find the task that needs nothing. It must come first. Then check each other task against what it needs.",
        "Example: B needs A and C needs B. The only allowed order is A, B, C. Now do yours."
      ] };
    }
    return orderQ();
  };
  const CLEAN = [
    ["Which variable name is best for the number of students?", "studentCount", ["n2", "x", "thing"], "A good name says what the value means."],
    ["Good comments mostly explain:", "Why the code does something", ["The same thing the code already says", "Nothing, never comment", "The color of the editor"], "The code already shows what happens."],
    ["Magic numbers in code (like 86400) should be:", "Replaced by a named constant such as SECONDS_PER_DAY", ["Made longer", "Hidden in a comment only", "Left alone"], "Give numbers a meaning."],
    ["What is a code review?", "Teammates read your changes to find problems and share ideas", ["A speed test", "A way to delete code", "A computer scan"], "Fresh eyes spot mistakes."],
    ["A helpful code review comment is:", "Kind, specific and about the code", ["About the person", "Just the word bad", "Silent"], "Be useful and polite."],
    ["A function with 300 lines should probably be:", "Split into smaller functions", ["Made longer", "Deleted at once", "Left forever"], "It probably has several jobs."],
    ["Why use one consistent style (spacing, naming) in a team?", "It makes the code easier for everyone to read", ["It makes the code run faster", "It is required to compile", "It hides bugs"], "Think about reading code written by others."],
    ["Deeply nested if statements can be clearer if you:", "Return early or split the code into functions", ["Add more nesting", "Remove all names", "Use only one letter names"], "Flatter code is easier to follow."]
  ];
  const REFACT = [
    ["What is refactoring?", "Improving the structure of code without changing what it does", ["Adding a feature", "Fixing the display colors", "Deleting all tests"], "The behavior stays the same."],
    ["DRY stands for:", "Don't Repeat Yourself", ["Do Run Yearly", "Debug Rarely, Yes", "Data Rotates Yearly"], "It is a rule about duplicates."],
    ["Before refactoring, you should:", "Have tests so you can check nothing broke", ["Delete the tests", "Rewrite everything", "Change the requirements"], "How will you know you did not break anything?"],
    ["The same 5 lines appear in 4 places. What is the best fix?", "Move them into one function and call it four times", ["Add 4 more copies", "Delete 3 of the places", "Write a comment about them"], "Write once, use often."],
    ["A code smell is:", "A sign that code may have a deeper problem", ["A bug that prints a smell", "A kind of variable", "A color"], "It is a warning, not a certain bug."],
    ["Which is a refactoring?", "Renaming a confusing variable", ["Adding a new feature", "Changing what the program prints", "Fixing a crash by removing the test"], "The program still does the same job."],
    ["Technical debt means:", "Quick shortcuts now that cost extra work later", ["Money borrowed from a bank", "Broken hardware", "A very long program"], "Shortcuts must be paid back."],
    ["When is refactoring most risky?", "When there are no tests to catch mistakes", ["When the code is short", "When variable names are good", "When everything is tested"], "Safety nets matter."]
  ];
  const SORTS = [
    ["Which sort takes about n log n steps in the typical case?", "Merge sort", ["Bubble sort", "Selection sort", "Linear search"], "It splits the list in halves."],
    ["Which sort takes about n times n steps in the worst case?", "Bubble sort", ["Merge sort", "Heap sort", "Binary search"], "It compares neighbors over and over."],
    ["Which simple sort is very fast on a list that is already almost sorted?", "Insertion sort", ["Selection sort", "Reversing the list", "Shuffling"], "It does little work when items are already close to their place."],
    ["A stable sort:", "Keeps equal items in their original order", ["Never changes the list", "Sorts only numbers", "Always takes the same time"], "Think about two students with the same score."],
    ["An in-place sort:", "Uses almost no extra memory beyond the list itself", ["Sorts a list in one place on the screen", "Copies the list many times", "Needs a second computer"], "Think about memory."],
    ["Merge sort needs:", "Extra memory for merging the halves", ["No memory", "Only one variable", "A sorted list to begin with"], "Merging builds a new list."],
    ["Counting sort works well when:", "The values are small whole numbers in a limited range", ["The values are long sentences", "The values are random pictures", "The list is empty"], "It counts how many of each value there are."],
    ["The best that any comparison-based sort can do in the worst case is about:", "n log n", ["n", "1", "log n"], "Not even a clever sort can do better than this using only comparisons."]
  ];
  const DSC = [
    ["You need to check quickly whether a username is taken. What fits best?", "A set or hash table", ["A sorted paper list", "A queue", "A stack"], "You need fast membership checks."],
    ["An undo button needs to take back the most recent action first. What fits?", "A stack", ["A queue", "A set", "A graph"], "Last in, first out."],
    ["Print jobs should be printed in the order they arrived. What fits?", "A queue", ["A stack", "A set", "A tree"], "First in, first out."],
    ["Looking up a phone number by name. What fits?", "A dictionary (hash map)", ["A stack", "A queue", "A plain unsorted list scan"], "Keys point to values."],
    ["Towns connected by roads. What fits?", "A graph", ["A stack", "A queue", "A set"], "Things connected to many other things."],
    ["Folders inside folders. What fits?", "A tree", ["A queue", "A stack", "A set of numbers"], "One parent, many children."],
    ["You always need the smallest item next (like the most urgent job). What fits?", "A heap (priority queue)", ["A stack", "A plain queue", "A set"], "Priority decides the order."],
    ["You store scores by position and read them by index. What fits?", "An array (list)", ["A graph", "A tree", "A queue"], "Position decides where it is."]
  ];
  const knapQ = () => {
    const nm = shuf(["tent", "food", "water", "radio", "lamp", "rope"]).slice(0, ri(3, 4));
    const it = nm.map(n => [n, ri(1, 5), ri(2, 9)]), cap = ri(5, 9);
    let best = 0;
    for (let m = 0; m < (1 << it.length); m++) { let w = 0, v = 0; it.forEach((x, i) => { if (m & (1 << i)) { w += x[1]; v += x[2]; } }); if (w <= cap && v > best) best = v; }
    return num(`A backpack holds a total weight of ${cap}. Each item can be taken once or left. What is the biggest total value you can carry?`, best, [
      "Try different groups of items. The total weight must stay within the limit.",
      "For each group that fits, add the values. Keep the best.",
      "Example: limit 5, items (w2, v3), (w3, v4), (w4, v5). Best fit is w2 + w3 = 5 with value 7. Now do yours."
    ], table(["item", "weight", "value"], it));
  };
  const greedyQ = () => {
    const n = ri(5, 6), m = [];
    for (let i = 0; i < n; i++) { const s = ri(8, 15); m.push([String.fromCharCode(65 + i), s, s + ri(1, 3)]); }
    const sorted = [...m].sort((a, b) => a[2] - b[2]); let last = 0, c = 0;
    sorted.forEach(x => { if (x[1] >= last) { c++; last = x[2]; } });
    return num("One room, many meetings. Two meetings can both be held if one ends when or before the other starts. What is the biggest number of meetings that can be held?", c, [
      "Greedy idea: always pick the meeting that ends earliest among those that still fit.",
      "Sort by end time. Take the first, then the next one that starts after the last chosen one ends. Keep going.",
      "Example: meetings 9-10, 9-12, 10-11. Take 9-10, then 10-11. That is 2 meetings. Now do yours."
    ], table(["meeting", "starts", "ends"], m));
  };
  const postQ = () => {
    const ex = d => {
      if (d === 0 || Math.random() < 0.3) { const v = ri(2, 9); return { t: [String(v)], v }; }
      for (let i = 0; i < 40; i++) {
        const l = ex(d - 1), r = ex(d - 1), op = pick(["+", "*", "-"]);
        if (op === "-" && l.v < r.v) continue;
        return { t: [...l.t, ...r.t, op], v: op === "+" ? l.v + r.v : op === "*" ? l.v * r.v : l.v - r.v };
      }
      const v = ri(2, 9); return { t: [String(v)], v };
    };
    let e; do { e = ex(2); } while (e.t.length < 5 || e.v > 300);
    return num("In postfix notation, the operator comes after its two numbers. Use a stack: numbers are pushed, and an operator pops two numbers and pushes the result. What is the value?", e.v, [
      "Read left to right. Each time you see an operator, it works on the two numbers just before it.",
      "Keep a pile of numbers. When you see an operator, take off the top two, apply it (the older one is on the left) and put the result back.",
      "Example: 2 3 4 * + means 3 * 4 = 12, then 2 + 12 = 14. Now do yours."
    ], `<b>${e.t.join(" ")}</b>`);
  };
  const REX = [
    ["^a.c$", "abc a-c ac abbc".split(" ")],
    ["^[0-9]+$", ["2024", "20x4", "", "7"]],
    ["^ab*c$", ["ac", "abbbc", "abd", "bc"]],
    ["^colou?r$", ["color", "colour", "colouur", "colr"]],
    ["^[A-Z][a-z]+$", ["Hello", "hello", "HELLO", "Hi", "H"]],
    ["^(cat|dog)s?$", ["cats", "dog", "cow", "dogss", "catdog"]],
    ["^.{3}$", ["abc", "ab", "abcd", "123"]],
    ["^\\d{3}-\\d{4}$", ["555-1234", "5551234", "55-12345", "123-4567"]]
  ];
  const rexQ = () => {
    const [p, ss] = pick(REX), s = pick(ss), ok = new RegExp(p).test(s);
    return yn(`Does the pattern <code>${p}</code> match the text "<b>${s}</b>"?`, ok, [
      "^ means the start of the text and $ means the end, so the whole text must fit the pattern.",
      ". is any one character, * is zero or more of the item before it, + is one or more, ? is zero or one, [a-z] is one character from the range, \\d is a digit, {3} means exactly 3.",
      "Example: ^ab+$ matches abb (an a, then one or more b) but not a. Now do yours."
    ]);
  };
  const ovfQ = () => {
    const f = ri(0, 2);
    if (f === 0) { const a = ri(200, 255), b = ri(10, 120);
      return num(`An 8-bit counter holds 0 to 255. After 255 it wraps around to 0. It shows ${a} and we add ${b}. What does it show?`, (a + b) % 256, [
        "Add the numbers first, then see if the total is over the limit.",
        "256 is one too many for 8 bits, so subtract 256 from totals that are too big.",
        "Example: 250 + 10 = 260, which is 4 more than the 256 steps in the loop, so it shows 4. Now do yours."
      ]); }
    if (f === 1) { const n = ri(3, 10);
      return num(`How many different values can an unsigned ${n}-bit number hold (from 0 up)?`, Math.pow(2, n), [
        "Each bit has two possible states.",
        "Multiply 2 by itself once for each bit.",
        "Example: 3 bits give 2 times 2 times 2 = 8 values (0 to 7). Now do yours."
      ]); }
    const n = ri(3, 10);
    return num(`What is the biggest number an unsigned ${n}-bit number can hold?`, Math.pow(2, n) - 1, [
      "Count how many values there are, starting from 0.",
      "The biggest value is one less than the number of values.",
      "Example: 3 bits hold 8 values (0 to 7), so the biggest is 7. Now do yours."
    ]);
  };
  const FLOAT = [
    ["Why can 0.1 + 0.2 give 0.30000000000000004 in many languages?", "Computers store decimals in binary, which cannot hold 0.1 exactly", ["The computer cannot add", "The language has a bug in every program", "Decimals are not numbers"], "Think about how the numbers are stored."],
    ["How should you compare two decimal numbers for equality?", "Check whether they are very close to each other", ["Never compare them", "Always use ==", "Compare their names"], "Tiny errors can hide in the last digits."],
    ["How should a shop program store money safely?", "As whole cents (integers)", ["As very long decimals", "As text only", "As negative numbers"], "Whole numbers do not drift."],
    ["Integer overflow happens when:", "A value gets too big for the bits reserved for it", ["A number is negative", "A variable is empty", "A loop ends"], "Think of a counter that runs out of digits."],
    ["Why might a huge video site count views with 64 bits instead of 32?", "A larger range avoids overflow", ["64 is a lucky number", "It makes videos shorter", "32 bits cannot store numbers"], "How big can the count get?"],
    ["Rounding errors matter most when:", "A small error is repeated millions of times", ["You add 1 + 1", "A list is empty", "You print a word"], "Tiny mistakes pile up."],
    ["A floating-point number can store:", "Very large and very small numbers, but only approximately", ["Only whole numbers", "Exact decimals always", "Only positive numbers"], "It trades exactness for range."],
    ["In an unsigned 8-bit counter, 255 + 1 usually wraps to:", "0", ["256", "-1", "255"], "There is no room for a ninth bit."]
  ];
  const concQ = () => {
    const s = ri(0, 10), k = ri(1, 5);
    if (Math.random() < 0.5) return num(`Two threads each add ${k} to a shared counter that starts at ${s}. Both read the counter first (so both see ${s}), then both write back. This is a race condition. What is the counter at the end?`, s + k, [
      "Each thread computes its new value from what it read before the other wrote.",
      "Both threads calculate the same new value and write it. One update is lost.",
      "Example: counter 4, each adds 2. Both read 4, both write 6. The final value is 6, not 8. Now do yours."
    ]);
    return num(`Two threads each add ${k} to a shared counter that starts at ${s}. A lock makes the second thread wait until the first has finished. What is the counter at the end?`, s + 2 * k, [
      "With a lock, one thread finishes before the other begins.",
      "Both additions really happen, one after the other.",
      "Example: counter 4, each adds 2 with a lock: 4 to 6 to 8. Now do yours."
    ]);
  };
  const CONC = [
    ["A race condition happens when:", "The result depends on which thread happens to run first", ["Two threads are fast", "A loop runs forever", "A file is missing"], "Timing decides the outcome."],
    ["A lock (mutex) is used to:", "Let only one thread use shared data at a time", ["Hide data from users", "Speed up the CPU", "Close a program"], "Take turns."],
    ["A deadlock is:", "Two threads each waiting forever for the other", ["A crashed disk", "A very fast program", "A locked folder"], "Nobody can move."],
    ["What is a thread?", "A separate path of execution inside a program", ["A cable", "A kind of variable", "A web link"], "A program can have several."],
    ["Why use concurrency?", "A program can do other work while it waits", ["It makes bugs impossible", "It removes the need for memory", "It makes code shorter"], "Waiting for a file or network wastes time."],
    ["Which data is safest to share between threads?", "Data that never changes (read-only)", ["Data that many threads change", "Data with no name", "Data in a loop"], "Nobody can step on anyone else."],
    ["Why are race conditions hard to debug?", "They happen only with unlucky timing", ["They always happen", "They only occur on Mondays", "They print errors"], "You cannot always repeat the bug."],
    ["Parallelism means:", "Doing several things at the same moment on different cores", ["Doing one thing at a time", "Writing code twice", "Copying files"], "Several workers, same moment."]
  ];
  const txQ = () => {
    const a = ri(20, 90), b = ri(10, 80), t = ri(5, Math.min(a, 40)), f = ri(0, 2);
    if (f === 0) return num(`Account A has ${a} coins and account B has ${b}. A transaction moves ${t} coins from A to B and then <b>commits</b>. How many coins does B have?`, b + t, [
      "A commit makes all the steps of the transaction permanent.",
      "B receives the coins that A gives.",
      "Example: A has 10, B has 5, a transfer of 3 commits. B has 8. Now do yours."
    ]);
    if (f === 1) return num(`Account A has ${a} coins and account B has ${b}. A transaction takes ${t} coins from A, then an error happens and the transaction is <b>rolled back</b>. How many coins does A have?`, a, [
      "A rollback undoes everything the transaction did.",
      "After the rollback, the accounts look as they did before it began.",
      "Example: A has 10, a transfer of 3 starts and rolls back. A is back to the starting amount. Now do yours."
    ]);
    return num(`Account A has ${a} coins and account B has ${b}. A transfer of ${t} coins from A to B commits. How many coins do A and B have <b>in total</b>?`, a + b, [
      "A transfer moves coins from one account to another.",
      "Think about whether any coins are created or destroyed.",
      "Example: A has 10 and B has 5. After a transfer of 3 they have 7 and 8, and together still the same total. Now do yours."
    ]);
  };
  const TX = [
    ["What does a database transaction guarantee?", "All its steps happen, or none of them do", ["It runs faster", "It copies the database", "It stops all users"], "All or nothing."],
    ["In ACID, the A stands for:", "Atomicity", ["Accuracy", "Adding", "Alphabet"], "Atoms cannot be split."],
    ["In ACID, the C stands for consistency, which means:", "The data rules stay true after the transaction", ["Many copies exist", "Everything is fast", "Data is deleted"], "Rules like 'balance cannot be negative' must hold."],
    ["In ACID, the I stands for isolation, which means:", "Transactions running at the same time do not mess each other up", ["Data is hidden from everyone", "Only one user exists", "The computer is offline"], "Each transaction behaves as if it were alone."],
    ["In ACID, the D stands for durability, which means:", "Once committed, the data survives a crash", ["Data lasts one second", "Data is deleted after use", "Data is always in a cloud"], "Committed means kept."],
    ["COMMIT does:", "Makes the changes of the transaction permanent", ["Undoes the changes", "Deletes the table", "Starts a game"], "Think of saving."],
    ["ROLLBACK does:", "Undoes all the changes of the current transaction", ["Makes the changes permanent", "Adds a table", "Sorts the rows"], "Think of going back."],
    ["Why use a transaction when moving money between accounts?", "So money is never taken from one account without being added to the other", ["To make it feel safer", "To avoid using accounts", "To make the numbers bigger"], "A crash in the middle must not lose money."]
  ];
  const LICENSE = [
    ["Open-source software means:", "Its source code can be read, and often changed and shared, under a license", ["It is always free to sell as your own", "It has no code", "Only the author may look at it"], "The code is open for people to see."],
    ["You find code online with no license. What is the safest approach?", "Do not copy it without permission, because by default you may not be allowed", ["Copy it, it is online", "Sell it", "Remove the author's name"], "Where does permission come from?"],
    ["What does attribution mean?", "Giving credit to the creator", ["Deleting the creator's name", "Selling the code", "Hiding the code"], "Credit where it is due."],
    ["Copyright protects:", "The creator's original work", ["Only ideas in your head", "Only paper", "Only free things"], "Original creations."],
    ["A permissive license such as MIT lets you:", "Use the code in almost any project if you keep the notice", ["Never use the code", "Claim you wrote it", "Use it only in secret"], "Few rules, keep the credit."],
    ["Plagiarism is:", "Presenting someone else's work as your own", ["Sharing with credit", "Writing your own code", "Using a library with credit"], "It is a form of dishonesty."],
    ["Why do open-source projects matter?", "Many people can check, fix and learn from the code", ["They are never updated", "They are never used", "They are all secret"], "Many eyes."],
    ["A library license says: credit the authors. What do you do?", "Follow the license and credit the authors", ["Ignore it", "Remove the credit", "Claim it as yours"], "Licenses are agreements to respect."]
  ];
  const semQ = () => {
    const X = ri(1, 4), Y = ri(0, 9), Z = ri(0, 9), cur = `${X}.${Y}.${Z}`, f = ri(0, 2);
    const fix = `${X}.${Y}.${Z + 1}`, feat = `${X}.${Y + 1}.0`, brk = `${X + 1}.0.0`;
    const [lbl, right] = [["a bug fix that changes no behavior", fix], ["a new feature that does not break old code", feat], ["a change that breaks old code (a breaking change)", brk]][f];
    return mc(`The current version is ${cur}. Using semantic versioning (MAJOR.MINOR.PATCH), what should the next version be after ${lbl}?`, right, [fix, feat, brk, `${X}.${Y + 2}.${Z}`], [
      "Semantic versioning has three numbers: major, minor and patch.",
      "A patch is for small fixes, a minor is for new features that still work with old code, and a major is for changes that break old code. Lower numbers to the right reset to 0 when a bigger one goes up.",
      "Example: from 1.2.3, a bug fix gives 1.2.4, a new feature gives 1.3.0 and a breaking change gives 2.0.0. Now do yours."
    ]);
  };
  const REL = [
    ["What does CI (continuous integration) do?", "Runs tests automatically every time code is changed", ["Prints the code", "Deletes old code", "Makes the code longer"], "Automatic checks."],
    ["What is a staging environment?", "A practice copy of the real site used to test before release", ["The real site", "A broken site", "A game"], "Rehearse before the show."],
    ["A rollback in deployment means:", "Going back to the last good version", ["Moving forward", "Deleting the project", "Renaming a file"], "Undo the release."],
    ["A hotfix is:", "A quick, urgent fix released outside the normal schedule", ["A planned new feature", "A slow redesign", "A kind of test"], "Think of something urgent."],
    ["A feature flag is:", "A switch that turns a feature on or off without a new release", ["A picture", "A type of bug", "A server"], "Control from a switch."],
    ["What is a changelog?", "A list of what changed in each version", ["A list of passwords", "A kind of backup", "A test"], "A history for readers."],
    ["Why release small changes often?", "They are easier to test and to find the cause of a problem", ["There is no reason", "Big changes never fail", "It avoids all bugs"], "Small steps make mistakes easy to find."],
    ["A canary release means:", "Giving the new version to a few users first", ["Releasing a bird game", "Releasing to nobody", "Releasing to all users at once"], "Test the water."]
  ];
  const A21 = [pointsQ, critQ, orderQ, knapQ, greedyQ, postQ, rexQ, ovfQ, concQ, txQ, semQ];
  const F21 = [
    facts(REQ, "Think about what the app does and how well it does it.", "Example: 'the app must send an email' says what it does."),
    facts(STORY, "Think about who wants what and why.", "Example: acceptance criteria say how to tell that a story is done."),
    facts(CLEAN, "Think about the next person who will read the code.", "Example: a name like totalPrice tells more than x."),
    facts(REFACT, "Think about changing the structure, not the behavior.", "Example: renaming a variable is a refactoring."),
    facts(SORTS, "Think about how each sort works.", "Example: merge sort splits a list in halves and merges them."),
    facts(DSC, "Think about how the data is used.", "Example: a queue is first in, first out."),
    facts(FLOAT, "Think about how numbers are stored.", "Example: 8 bits hold 256 values."),
    facts(CONC, "Think about timing and taking turns.", "Example: a lock lets one thread use data at a time."),
    facts(TX, "Think about all-or-nothing.", "Example: rollback undoes the steps of a transaction."),
    facts(LICENSE, "Think about permission and credit.", "Example: attribution means crediting the creator."),
    facts(REL, "Think about releasing safely.", "Example: a changelog lists the changes in a version.")
  ];
  const lessons21 = [
    L("Requirements", facts(REQ, "Think about what the app does and how well it does it.", "Example: 'the app must send an email' says what it does."), [
      S("What to build", "📋", "<b>Requirements</b> describe what a program must do. Gather them before you code."),
      S("Two kinds", "⚖️", "<b>Functional</b>: what it does (log in, save). <b>Non-functional</b>: how well (fast, safe, handles 1000 users)."),
      S("Measure it", "📏", "'Fast' is vague. 'Under 2 seconds' can be tested. Watch out for <b>scope creep</b>.")]),
    L("User stories", facts(STORY, "Think about who wants what and why.", "Example: acceptance criteria say how to tell that a story is done."), [
      S("A story", "📖", "A <b>user story</b> says: As a [user], I want [goal] so that [reason]."),
      S("Done means done", "✅", "<b>Acceptance criteria</b> are clear tests for done. 'Wrong password shows an error message' can be tested."),
      S("Backlog", "🗂️", "The team keeps a <b>backlog</b> of stories and decides what is the most important.")]),
    L("Estimating work", pointsQ, [
      S("Story points", "🎯", "Teams guess the size of a task in <b>story points</b>. Bigger points mean more work."),
      S("Velocity", "🚀", "<b>Velocity</b> is how many points the team finishes in one sprint. It helps to plan."),
      S("Round up", "⬆️", "If the last sprint is only partly full, it still takes a whole sprint.")]),
    L("Task order and the critical path", critQ, [
      S("In a chain", "⛓️", "When tasks wait for each other, their times add up."),
      S("At the same time", "↔️", "Tasks that can happen at the same time cost only the longest one's time."),
      S("Critical path", "🧭", "The longest chain of waiting tasks is the <b>critical path</b>. It decides the shortest finish time.")]),
    L("Which order is allowed?", orderQ, [
      S("Dependencies", "🔗", "'Test needs Code' means Code must come first."),
      S("Find the start", "🚦", "A task that needs nothing can go first. Then add tasks whose needs are done."),
      S("Check the list", "✔️", "Check every need: the task it needs must appear earlier in the order.")]),
    L("Clean code and reviews", facts(CLEAN, "Think about the next person who will read the code.", "Example: a name like totalPrice tells more than x."), [
      S("Readable", "👓", "Write code people can read: clear names, short functions and a consistent style."),
      S("Comments", "💬", "Comment the <b>why</b>, not what the code already says. Give magic numbers names."),
      S("Reviews", "🤝", "In a code review teammates read each other's changes. Be kind and specific.")]),
    L("Refactoring", facts(REFACT, "Think about changing the structure, not the behavior.", "Example: renaming a variable is a refactoring."), [
      S("Same job, tidier", "🧹", "<b>Refactoring</b> improves the code's structure without changing what it does."),
      S("DRY", "💧", "<b>Don't Repeat Yourself</b>: if code is repeated, put it in one function."),
      S("Safety net", "🕸️", "Have tests first so you can check that nothing broke. Shortcuts that pile up are <b>technical debt</b>.")]),
    L("Sorting algorithms compared", facts(SORTS, "Think about how each sort works.", "Example: merge sort splits a list in halves and merges them."), [
      S("Speed", "⏱️", "Bubble, selection and insertion sort take about n times n steps. Merge sort takes about n log n."),
      S("Stable and in place", "⚖️", "<b>Stable</b>: equal items keep their order. <b>In place</b>: little extra memory."),
      S("Special case", "🔢", "Counting sort is fast for small whole numbers. No comparison sort can beat n log n in the worst case.")]),
    L("Choosing a data structure", facts(DSC, "Think about how the data is used.", "Example: a queue is first in, first out."), [
      S("Fit the job", "🧰", "The best structure depends on what you do most: look up, undo, wait in line, find the smallest."),
      S("Quick guide", "📚", "<b>Set / dictionary</b>: fast lookup. <b>Stack</b>: undo. <b>Queue</b>: waiting in line. <b>Heap</b>: next most urgent."),
      S("Connections", "🕸️", "<b>Tree</b>: folders in folders. <b>Graph</b>: things connected to many things.")]),
    L("Best choice: the backpack problem", knapQ, [
      S("Fit and value", "🎒", "Each item has a weight and a value. You want the most value without going over the weight limit."),
      S("Try groups", "🔎", "With few items, list the groups that fit and add up their values."),
      S("Bigger problems", "🧠", "For many items, programmers use <b>dynamic programming</b>, which remembers smaller answers.")]),
    L("Greedy choices", greedyQ, [
      S("Greedy", "🧲", "A <b>greedy</b> algorithm makes the choice that looks best right now."),
      S("Meetings", "📅", "To fit the most meetings, always take the one that <b>ends earliest</b> among those that still fit."),
      S("Careful", "⚠️", "Greedy does not always work, but for this scheduling problem it gives the best answer.")]),
    L("Postfix and stacks", postQ, [
      S("Operator after", "🔄", "In postfix, <b>3 4 +</b> means 3 + 4. The operator comes after its numbers."),
      S("Use a stack", "📚", "Push numbers. On an operator, pop two numbers, calculate and push the result."),
      S("No brackets", "✨", "Postfix needs no brackets or order rules. Computers like it.")]),
    L("Regular expressions", rexQ, [
      S("Patterns", "🔍", "A <b>regular expression</b> describes a pattern of text. ^ is the start, $ is the end."),
      S("Symbols", "🔣", ". any character, * zero or more, + one or more, ? zero or one, [0-9] a digit, {3} exactly three."),
      S("Whole text", "📏", "With ^ and $, the whole text must fit the pattern.")]),
    L("Overflow and limits", mix(ovfQ, facts(FLOAT, "Think about how numbers are stored.", "Example: 8 bits hold 256 values.")), [
      S("Fixed room", "📦", "A number with n bits can hold 2 to the power n values: 0 up to 2 to the power n minus 1 if unsigned."),
      S("Wrap-around", "🔄", "If a value goes past the top, it can wrap back to 0. That is <b>overflow</b>."),
      S("Decimals", "🔢", "Decimals are stored approximately, so 0.1 + 0.2 may not equal 0.3 exactly. Store money as whole cents.")]),
    L("Threads and races", mix(concQ, facts(CONC, "Think about timing and taking turns.", "Example: a lock lets one thread use data at a time.")), [
      S("Threads", "🧵", "A program can have several <b>threads</b> doing work at once."),
      S("Race", "🏁", "If two threads change the same data, the result can depend on timing. This is a <b>race condition</b> and updates can be lost."),
      S("Locks", "🔒", "A <b>lock</b> lets one thread at a time use shared data. Two threads waiting for each other forever is a <b>deadlock</b>.")]),
    L("Transactions", mix(txQ, facts(TX, "Think about all-or-nothing.", "Example: rollback undoes the steps of a transaction.")), [
      S("All or nothing", "🎯", "A <b>transaction</b> groups steps so that either all happen or none do."),
      S("Commit and rollback", "💾", "<b>COMMIT</b> keeps the changes. <b>ROLLBACK</b> undoes them."),
      S("ACID", "🧪", "Atomicity, Consistency, Isolation, Durability: four promises of a safe database.")]),
    L("Licenses and credit", facts(LICENSE, "Think about permission and credit.", "Example: attribution means crediting the creator."), [
      S("Not free by default", "©️", "Code that someone wrote is protected by copyright. You need permission to use it."),
      S("Licenses", "📜", "An open-source <b>license</b> gives permission with rules, such as keep the notice and credit the authors."),
      S("Be honest", "🤝", "Never claim someone else's work as your own. That is plagiarism.")]),
    L("Versions and releases", mix(semQ, semQ, facts(REL, "Think about releasing safely.", "Example: a changelog lists the changes in a version.")), [
      S("Three numbers", "🔢", "<b>MAJOR.MINOR.PATCH</b>, like 2.4.1. Patch: bug fix. Minor: new feature that still works with old code. Major: breaking change."),
      S("Reset", "0️⃣", "When a bigger number goes up, the smaller numbers reset to 0. From 2.4.1, a new feature gives 2.5.0."),
      S("Safe releases", "🚦", "Test in <b>staging</b>, release to a few users first, and be ready to <b>roll back</b>.")])
  ];
  lessons21.push(
    L("Mixed practice", mix(...A21, ...F21.slice(0, 5)), MIXS("estimating, task order, sorting and data structures, greedy choices, postfix, patterns, limits, threads, transactions and versions.")),
    L("Level 21 Challenge", mix(...A21, ...F21), MIXS("everything from level 21: planning, clean code, algorithm choices, patterns, numbers in memory, threads, databases, licenses and releases."))
  );

  Object.assign(CODING_LEVELS, { 19: lessons19, 20: lessons20, 21: lessons21 });
})();
