// ext/typing-13-15.js  Mind Lab Typing & Computers, levels 13-15 (60 lessons)
(() => {
  const sl = a => () => a.map(([h, v, t]) => ({ h, v, t }));
  const big = (t, s = 2) => `<span style="font-size:${s}em;font-weight:bold">${t}</span>`;
  const code = lines => `<span style="font-family:monospace;font-size:1.15em;font-weight:bold;text-align:left;display:inline-block">${lines.join("<br>")}</span>`;
  const sp = "&nbsp;&nbsp;";
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const mc = (title, vis, rows, hints, slides) => {
    const rs = rows.map(r => r.split("|"));
    const make = () => { const [text, ans, ...wr] = pick(rs); return { text, visual: vis, choices: shuf([ans, ...wr]), answer: ans, hints: hints.slice() }; };
    make.teach = sl(slides);
    return { title, make };
  };
  const ty = (title, prompt, items, hints, slides, shown) => {
    const make = () => {
      const s = pick(items), n = s.split(" ").length;
      const h = hints.slice(); h[1] = h[1].replace("{n}", s.replace(/ /g, "").length).replace("{w}", n).replace("{f}", esc(s[0]));
      return { text: prompt, visual: big(shown ? shown(s) : esc(s), s.length > 70 ? 0.9 : s.length > 40 ? 1.05 : s.length > 14 ? 1.2 : 1.8), textInput: true, answer: s, hints: h };
    };
    make.teach = sl(slides);
    return { title, make };
  };
  // fn returns [text, answer, visual, hints?]
  const num = (title, vis, fn, hints, slides) => {
    const make = () => {
      const [text, answer, v, hs] = fn();
      const q = { text, visual: v || vis, answer, hints: (hs || hints).slice() };
      if (typeof answer === "string") q.textInput = true;
      return q;
    };
    make.teach = sl(slides);
    return { title, make };
  };
  // fn returns a full question (may include its own hints)
  const cu = (title, fn, hints, slides) => {
    const make = () => { const q = fn(); if (!q.hints) q.hints = hints.slice(); return q; };
    make.teach = sl(slides);
    return { title, make };
  };
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder of each one, then the quiz." }].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };
  const cap = s => esc(s.charAt(0).toUpperCase() + s.slice(1));
  const names = ["Maya", "Leo", "Sam", "Nia", "Omar", "Ella", "Ravi", "Zoe", "Ivan", "Lina"];
  const AL = "abcdefghijklmnopqrstuvwxyz";

  // =============== LEVEL 13 ===============
  const A1 = ty("Type dates and times", "Type this sentence. Watch the slashes and colons.",
    ["the field trip is on 04/22/2027 at 9:15 am.", "school starts at 8:05 am and ends at 3:20 pm.", "the club met on 02/09/2026 at 4:45 pm.", "the movie starts at 7:30 pm on 12/05/2026.", "the library closes at 6:00 pm on fridays.", "the test is on 10/17/2026 from 1:00 pm to 2:30 pm.", "practice is at 5:45 pm on 09/12/2026.", "our project is due 05/30/2027 by 11:59 pm."],
    ["Dates use slashes and times use colons. Go slowly on the numbers.", "There are {w} words and it starts with \"{f}\". The colon needs Shift and the semicolon key.", "Example: for <b>lunch is at 12:10 pm on 03/04/2026.</b>, type the words, then the time with a colon, then the date with two slashes. Now type yours."],
    [["Dates and times", "📅", "Dates often look like <b>04/22/2027</b>. Times look like <b>9:15 am</b>."], ["Which keys?", "⌨️", "The slash is at the bottom right, beside the period. The colon is <b>Shift</b> plus the semicolon key."], ["Tip", "💡", "Say the numbers quietly in your head as you type them. Look at the screen, not your hands."]], cap);
  const A2 = ty("Colons and semicolons", "Type this sentence exactly.",
    ["i packed three things: a map, a flashlight, and water.", "it was late; we went home.", "the rule is simple: be kind.", "she likes math; he likes art.", "you will need: paper, glue, and scissors.", "the sky grew dark; the storm was near.", "we have two choices: stay or go.", "the bell rang; class was over."],
    ["Find the colon or semicolon first, then type around it.", "There are {w} words and it starts with \"{f}\". Both marks share one key, and Shift gives the colon.", "Example: for <b>we had one goal: win.</b>, type we had one goal, then Shift with the semicolon key, a space, win and a period. Now type yours."],
    [["Colon", "🔎", "A <b>colon :</b> says \"here comes a list or an explanation\"."], ["Semicolon", "🔗", "A <b>semicolon ;</b> joins two sentences that go together."], ["Same key", "⌨️", "The semicolon is to the right of L. Hold <b>Shift</b> for the colon."]], cap);
  const A3 = ty("Parentheses and brackets", "Type this exactly, with every bracket.",
    ["the total (with tax) is $12.50.", "call me later (after lunch).", "the list [apples, pears, plums] is long.", "use the formula (a + b) * c.", "the cat (a gray one) sat down.", "press the button (the red one) now.", "the array [1, 2, 3] has three items.", "x = (4 + 6) / 2"],
    ["Every opening bracket needs a closing bracket. Count them.", "There are {w} chunks split by spaces and it starts with \"{f}\". Round brackets use Shift with 9 and 0.", "Example: for <b>two (small) cats [a, b]</b>, type two, then round brackets around small, cats, then square brackets around a comma list. Now type yours."],
    [["Round brackets", "( )", "Parentheses are <b>Shift + 9</b> to open and <b>Shift + 0</b> to close."], ["Square brackets", "[ ]", "Square brackets sit to the right of the P key. No Shift needed."], ["Pairs", "🤝", "Always close what you open. Type both marks first, then go back inside if it helps."]], cap);
  const A4 = num("Words in a typing test", "⏱️", () => {
    const w = ri(25, 70), m = ri(2, 6), n = pick(names);
    return [`${n} types at a steady ${w} WPM. How many words does ${n} type in ${m} minutes?`, w * m];
  }, ["WPM already means words for ONE minute. What do you do for more minutes?", "Multiply the speed by the number of minutes.", "Example: at 20 WPM for 3 minutes, 20 x 3 = 60 words. Now do yours."],
    [["Words per minute", "📈", "<b>WPM</b> is how many words you type in one minute."], ["More minutes", "✖️", "For several minutes, <b>multiply</b>: words = WPM x minutes."], ["Example", "🧮", "30 WPM for 4 minutes is 30 x 4 = 120 words."]]);
  const A5 = mc("Keyboard layouts", "⌨️", [
    "The usual English keyboard layout is named after the first six letters on its top letter row. What is it called?|QWERTY|ASDFGH|ZXCVBN",
    "French keyboards often use a layout with a different name. Which one?|AZERTY|QWERTY|ABCDEF",
    "Which row of letter keys is called the home row?|The row with A S D F and J K L|The row with Q W E R T Y|The row with Z X C V B N",
    "Why do F and J have little bumps?|They help fingers find home position without looking|They show broken keys|They make the keys louder",
    "Which fingers usually press the space bar?|Either thumb|The pinky|The ring finger",
    "The Shift key is used to...|Type capitals and the top symbols on keys|Delete a whole word|Turn the computer off",
    "Which keys are on the top row of numbers?|1 2 3 4 5 6 7 8 9 0|A S D F G H J K L|Z X C V B N M",
    "Caps Lock does what?|Keeps letters in capitals until you press it again|Closes the window|Saves your work"],
    ["Picture the keyboard in front of you and where your fingers rest.", "Think about what the key or layout is meant to help you do.", "Example: the Backspace key sits above Enter and erases the letter you just typed. Pick the choice that fits your question's key or layout."],
    [["Layouts", "⌨️", "Most English keyboards use the <b>QWERTY</b> layout, named after the first six letters in the top row."], ["Home row", "🏠", "Fingers rest on <b>A S D F</b> and <b>J K L ;</b>. The bumps on F and J help you find them."], ["Other places", "🌍", "Other languages use other layouts, such as <b>AZERTY</b> in France."]]);
  const A6 = mc("Move around text", "🖱️", [
    "Which key jumps the cursor to the start of the line?|Home|End|Page Down",
    "Which key jumps the cursor to the end of the line?|End|Home|Esc",
    "Hold Ctrl and press the Left Arrow. The cursor moves...|One whole word to the left|To the top of the page|One letter to the right",
    "Ctrl + Home does what?|Jumps to the very start of the document|Deletes the line|Opens the home page",
    "Ctrl + Backspace deletes...|The word before the cursor|The whole document|The word after the cursor",
    "Holding Shift while pressing arrow keys will...|Select text as the cursor moves|Move the window|Change the font",
    "Page Down does what?|Scrolls down about one screen|Deletes a page|Closes the page",
    "Ctrl + A does what?|Selects everything|Adds a page|Opens a new file"],
    ["Picture where the cursor is now and which way it needs to go.", "Home and End work on a line. Ctrl makes a key work on bigger pieces such as words or the whole document.", "Example: Ctrl + End jumps to the very end of a document, and Page Up scrolls up one screen. Now decide yours."],
    [["Move fast", "🚀", "You can move the cursor without the mouse, which keeps your hands on the keys."], ["Line keys", "↔️", "<b>Home</b> and <b>End</b> go to the ends of a line. Add <b>Ctrl</b> to go to the ends of the document."], ["Words", "🔤", "<b>Ctrl + Arrow</b> jumps a whole word. Add <b>Shift</b> to select as you go."]]);
  const A7 = cu("Counting cells", () => {
    const words = shuf(["apple", "pear", "cat", "blue", "hi", "dog", "sun"]);
    const k = ri(6, 7), nn = ri(2, k - 2), arr = [];
    for (let i = 0; i < k; i++) arr.push(i < nn ? "n" : "w");
    const vals = shuf(arr).map(t => t === "n" ? ri(1, 99) : words.pop());
    const last = String.fromCharCode(64 + k);
    return { text: `Cells A1 to ${last}1 hold the values shown. What does =COUNT(A1:${last}1) show?`, visual: big(vals.join(", "), 1.2), answer: nn, hints: ["COUNT only counts cells that hold numbers. What about words?", "Go through the list and tally only the real numbers. Ignore anything made of letters.", "Example: for 5, dog, 12, cat the numbers are 5 and 12, so COUNT shows 2. Now count yours."] };
  }, [], [["COUNT", "🔢", "<b>=COUNT(A1:E1)</b> counts how many cells in the range hold a <b>number</b>."], ["Words don't count", "🔤", "Words and blanks are skipped by COUNT. <b>COUNTA</b> counts every cell that is not empty."], ["Example", "🧮", "In 4, hi, 9, 2, sun: the numbers are 4, 9 and 2, so COUNT shows 3."]]);
  const A8 = cu("Copy a formula", () => {
    const cols = ["A", "B", "C", "D"], c1 = pick(cols.slice(0, 3)), c2 = cols[cols.indexOf(c1) + 1];
    const r = ri(1, 4), k = ri(1, 3), op = pick(["+", "*", "-"]);
    const f = rr => `=${c1}${rr}${op}${c2}${rr}`;
    const right = f(r + k), wrong1 = f(r), wrong2 = `=${c1}${r + k}${op}${c2}${r}`;
    return { text: `In cell E${r} the formula is ${f(r)}. You copy it down ${k} ${k === 1 ? "row" : "rows"}. What does the copy say?`, choices: shuf([right, wrong1, wrong2]), answer: right, hints: ["When you copy a formula down, the cell names move with it.", "Copying down changes row numbers for every cell name in the formula. Columns stay put.", "Example: =A2+B2 copied down 1 row becomes =A3+B3. Now do yours."] };
  }, [], [["Relative copies", "📋", "A cell name like <b>A1</b> is <b>relative</b>. It moves when you copy the formula."], ["Down means rows", "⬇️", "Copy <b>down</b> and the row numbers go up. Copy <b>right</b> and the column letters move over."], ["Example", "🧮", "=A1+B1 copied down two rows becomes =A3+B3."]]);
  const A9 = num("Hexadecimal digits", "🔟", () => {
    const hx = "0123456789ABCDEF";
    if (Math.random() < 0.4) { const d = ri(10, 15); return [`In hexadecimal the digits go 0-9, then A=10, B=11, C=12, D=13, E=14, F=15. What number is the digit ${hx[d]}?`, d, big(hx[d])]; }
    const a = ri(1, 12), b = ri(0, 15), s = hx[a] + hx[b];
    return [`Hex counts in 16s. The first digit is worth 16 each, so 2B means 2 x 16 + 11. What is the hex number ${s} in ordinary numbers?`, a * 16 + b, big(s)];
  }, ["Hexadecimal has 16 digits. Letters stand for numbers bigger than 9.", "For two digits, multiply the first digit's value by 16, then add the second digit's value.", "Example: 3C is 3 x 16 + 12 = 60. Now do yours."],
    [["Base 16", "🔟", "<b>Hexadecimal</b> uses 16 digits: 0-9 and then <b>A B C D E F</b>."], ["Letter values", "🔤", "A=10, B=11, C=12, D=13, E=14, F=15."], ["Two digits", "✌️", "The first digit counts groups of 16. <b>1F</b> = 1 x 16 + 15 = 31."]]);
  const A10 = num("Pixels in a picture", "🖼️", () => {
    const w = pick([20, 30, 40, 50, 60, 80, 100]), h = pick([10, 20, 25, 30, 40, 50]);
    if (Math.random() < 0.65) return [`A small picture is ${w} pixels wide and ${h} pixels tall. How many pixels does it have in all?`, w * h];
    return [`A picture has ${w * h} pixels in all and is ${w} pixels wide. How many pixels tall is it?`, h];
  }, ["Pixels sit in rows and columns, like squares on a grid.", "Total pixels = width x height. For a missing side, divide the total by the side you know.", "Example: a picture 10 wide and 6 tall has 10 x 6 = 60 pixels; one with 60 pixels and 10 wide is 60 / 10 = 6 tall. Now do yours."],
    [["Pixels", "🟦", "A picture is a grid of tiny colored squares called <b>pixels</b>."], ["Count them", "✖️", "Pixels in all = <b>width x height</b>."], ["More pixels", "🔍", "More pixels means more detail, and a bigger file."]]);
  const A11 = num("Trace a function", "🧩", () => {
    const a = ri(2, 5), x = ri(2, 7), op = pick(["+", "-"]), b = op === "+" ? ri(1, 9) : ri(1, 3);
    const r = op === "+" ? x * a + b : x * a - b;
    return [`What does f(${x}) return?`, r, code(["def f(x):", sp + `return x * ${a} ${op} ${b}`])];
  }, ["Replace x with the number in the brackets, then follow the math.", "Do the multiplication first, then the plus or minus.", "Example: for return x * 2 + 1 with x = 5, 5 x 2 = 10 and 10 + 1 = 11. Now do yours."],
    [["Functions", "🧩", "A <b>function</b> is a mini-program with a name. You give it a value and it gives one back."], ["Return", "↩️", "<b>return</b> sends the answer back to where the function was called."], ["Trace it", "👣", "Swap x for the number, then do the math one step at a time."]]);
  const A12 = num("Loops inside loops", "🔁", () => {
    const a = ri(2, 6), b = ri(2, 6);
    if (Math.random() < 0.6) return ["How many stars are printed in all?", a * b, code([`repeat ${a} times:`, sp + `repeat ${b} times:`, sp + sp + 'print "*"'])];
    return ["How many things are printed in all?", a * b + a, code([`repeat ${a} times:`, sp + `repeat ${b} times:`, sp + sp + 'print "*"', sp + 'print "-"'])];
  }, ["The inside loop runs fully each time the outside loop goes once.", "Count how many prints happen per trip of the outside loop, then multiply by the outside count.", "Example: outside 3, inside 2, one print inside = 3 x 2 = 6 prints. Add the outside prints if there are any. Now do yours."],
    [["Nested loops", "🪆", "A loop inside another loop is a <b>nested loop</b>."], ["Full inside", "🔄", "Every time the outside loop goes once, the inside loop runs <b>all</b> its turns."], ["Multiply", "✖️", "Outside 4, inside 3 gives 4 x 3 = 12 inside runs."]]);
  const A13 = mc("Kinds of code errors", "🐞", [
    "A program has a missing closing bracket and will not start. This mistake is a...|Syntax error|Logic error|Battery error",
    "A program runs but adds two numbers when it should multiply them. This mistake is a...|Logic error|Syntax error|Screen error",
    "You typed prnt instead of print and the computer shows an error message. That is a...|Syntax error|Logic error|Power error",
    "Finding and fixing mistakes in code is called...|Debugging|Streaming|Zipping",
    "Printing values while the program runs to see where it goes wrong helps with...|Debugging|Downloading|Formatting",
    "Which kind of error does the computer usually report to you?|Syntax errors|Logic errors|Neither",
    "Explaining your code line by line out loud to a toy or friend to find a bug is...|A helpful debugging trick|Cheating|A syntax error",
    "A program says the average of 2 and 4 is 6 because it forgot to divide. This is a...|Logic error|Syntax error|Spelling error"],
    ["Ask: does the program refuse to run, or does it run and give the wrong result?", "A syntax error breaks the rules of the language. A logic error follows the rules but does the wrong thing.", "Example: forgetting a quote mark so the program will not start is a syntax error; adding when you meant to subtract is a logic error. Now decide yours."],
    [["Syntax errors", "🚫", "A <b>syntax error</b> breaks the grammar of the code, like a missing bracket. The computer tells you."], ["Logic errors", "🧠", "A <b>logic error</b> runs fine but gives the wrong answer. You must find it yourself."], ["Debugging", "🔍", "Read the error, test small parts, and print values to track the bug down."]]);
  const A14 = num("How long to download?", "⬇️", () => {
    const s = pick([2, 4, 5, 8, 10, 20]), t = ri(4, 40), n = pick(names);
    return [`${n} downloads a ${s * t} MB game at ${s} MB per second. How many seconds will it take?`, t];
  }, ["Think: how many seconds of downloading to fill the whole file?", "Divide the file size by the speed per second.", "Example: a 60 MB file at 3 MB per second takes 60 / 3 = 20 seconds. Now do yours."],
    [["Speed", "📶", "Download speed tells how much data arrives <b>each second</b>."], ["The math", "➗", "Time = <b>file size / speed</b>."], ["Careful", "⚠️", "Make sure the units match. Both must be MB, or both must be GB."]]);
  const A15 = mc("What are cookies?", "🍪", [
    "What is a web cookie?|A small piece of data a website stores in your browser|A program that deletes files|A picture on a page",
    "Cookies can help a shop site remember...|What is in your shopping cart|Everything on your computer|Your friends' phone numbers",
    "Some cookies track which sites you visit so ads can follow you. They are called...|Tracking cookies|Safety cookies|Speed cookies",
    "A cookie banner on a site asks you to...|Choose which cookies the site may use|Pay money|Update your computer",
    "To reduce tracking you can...|Clear cookies or block third-party cookies in your browser settings|Share your password|Type your name in every box",
    "Do cookies by themselves usually contain a virus?|No, they are just data files|Yes, always|Yes, they run programs",
    "A session cookie usually goes away when...|You close the browser|The year ends|You press Shift",
    "A third-party cookie comes from...|A different site than the one you are on, often an advertiser|Your keyboard|Your own computer's fan"],
    ["Think about what a website needs to remember between page visits.", "A cookie is just saved information. Ask what job it does, and who put it there.", "Example: a game site might save your chosen language in a cookie so it does not ask every time. Now pick your answer."],
    [["Cookies", "🍪", "A <b>cookie</b> is a small bit of data a website saves in your browser."], ["Helpful ones", "🛒", "Cookies can remember your cart or language so you don't start over."], ["Tracking ones", "👀", "Some cookies follow you across sites for ads. You can choose which to allow."]]);
  const A16 = mc("Inside the computer", "🖥️", [
    "Which part is the brain that follows instructions?|CPU|Monitor|Speaker",
    "RAM is...|Short-term memory for programs that are running|Long-term file storage|The screen",
    "A hard drive or SSD is used for...|Storing files long term|Cooling the CPU|Playing sound",
    "A GPU is especially good at...|Drawing graphics and images|Keeping the time|Charging the battery",
    "Which loses what it holds when the power goes off?|RAM|An SSD|A USB drive",
    "The motherboard...|Connects all the main parts together|Prints pages|Stores only photos",
    "Which of these is an output device?|Monitor|Mouse|Keyboard",
    "More RAM usually helps a computer...|Run many programs at once|Have a bigger screen|Use shorter cables"],
    ["Ask: does this part think, remember for a moment, store for keeps, or connect things?", "Short-term memory forgets when the power is off. Storage keeps files.", "Example: a speaker turns sound data into noise you can hear, so it is an output device. Now decide yours."],
    [["CPU", "🧠", "The <b>CPU</b> is the computer's brain. It does the calculating."], ["Memory", "🧮", "<b>RAM</b> holds what you are using right now. A <b>drive</b> keeps files when the power is off."], ["Connected", "🔌", "The <b>motherboard</b> joins everything. <b>Input</b> devices send data in, <b>output</b> devices show it."]]);
  const A17 = num("Guess by halving", "🎯", () => {
    const [n, g] = pick([[7, 3], [15, 4], [31, 5], [63, 6], [10, 4], [100, 7], [1000, 10], [127, 7]]);
    return [`I think of a number from 1 to ${n}. You guess, and I say higher or lower. If you always guess the middle, what is the most guesses you could need?`, g];
  }, ["Each good guess removes about half of the numbers that are left.", "Keep halving the amount left until only one number remains. Count each guess, including the last one.", "Example: for numbers 1 to 3, guess the middle (2). If it is wrong you know the answer, so the most is 2 guesses. Now do yours."],
    [["A smart strategy", "🎯", "Always guess the <b>middle</b>. Each answer lets you throw away half."], ["Halving", "✂️", "1 to 15 goes 15, 7, 3, 1 numbers left, so about 4 guesses."], ["In computers", "💻", "This idea is called <b>binary search</b>. It finds things in huge lists very fast."]]);
  const A18 = mc("Making files smaller", "🗜️", [
    "Zipping a folder usually makes it...|Smaller|Louder|Older",
    "Making a file smaller without losing any data is called...|Lossless compression|Lossy compression|Copying",
    "JPG photos use lossy compression, which...|Throws away a little detail to save space|Keeps every pixel exactly|Adds extra detail",
    "Why compress files before emailing them?|They are smaller to send and store|They turn into videos|They type faster",
    "To use a zipped file you first...|Extract (unzip) it|Print it|Turn it upside down",
    "Which image type is usually lossless?|PNG|JPG|MP3",
    "A ZIP file can hold...|Many files packed into one|Only one letter|A screen",
    "A pattern like aaaaaaaa can be stored as 8a. This idea is...|Compression|Deleting|Copying"],
    ["Think about whether the goal is a smaller file, and whether anything is lost.", "Lossless keeps everything. Lossy throws some away. Both aim for a smaller size.", "Example: writing 10z instead of zzzzzzzzzz saves space and loses nothing. Now pick yours."],
    [["Compress", "🗜️", "<b>Compression</b> makes files smaller so they send and store easily."], ["Lossless", "🔒", "<b>Lossless</b> compression, like ZIP, gives back the exact original."], ["Lossy", "🎨", "<b>Lossy</b> compression, like JPG, drops tiny details you will hardly notice."]]);
  const L13 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18,
    MIX("Mixed practice", A1, A3, A4, A6, A7, A8, A9, A10, A11, A12, A14, A17),
    MIX("Level 13 Challenge", A2, A5, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18)];

  // =============== LEVEL 14 ===============
  const B1 = ty("Type story dialogue", "Type this line from a story. Include every quotation mark.",
    ["\"watch out!\" yelled mia, and she jumped aside.", "\"i think we are lost,\" said the guide, \"but the river is close.\"", "the door creaked open. \"hello?\" whispered ben.", "\"what a great view,\" said grandma, smiling.", "\"we can do this,\" said the captain. \"stay together.\"", "\"it's time,\" she said, picking up her bag.", "after the show, tom said, \"that was the best night ever.\"", "\"please sit down,\" said the teacher, \"and open your books.\""],
    ["Spot each quotation mark pair and type the spoken words inside it.", "There are {w} words and it starts with \"{f}\". Quotes are Shift plus the apostrophe key.", "Example: for <b>\"run,\" said sam, \"now!\"</b>, type a quote, run, a comma, a quote, said sam, a comma, a quote, now, an exclamation mark, a quote. Now type yours."],
    [["Dialogue", "💬", "In stories, <b>quotation marks</b> wrap the words a character says."], ["Punctuation inside", "✍️", "The comma or period usually goes <b>inside</b> the closing quote when the speech ends."], ["Rhythm", "🥁", "Type the spoken part, tap the closing quote, then keep your rhythm."]], cap);
  const B2 = ty("Type a book citation", "Type this made-up book citation exactly.",
    ["smith, jo. the story of space. new york: star books, 2019.", "lee, ana. ocean animals. boston: blue press, 2021.", "garcia, tim. how plants grow. chicago: green books, 2018.", "patel, rina. the world of robots. london: gear press, 2020.", "jones, max. rivers of the world. denver: map house, 2017.", "nguyen, kim. volcano days. seattle: peak books, 2022.", "brown, lee. all about bees. austin: hive press, 2016.", "khan, sara. the science of sound. toronto: echo books, 2023."],
    ["A citation has parts in a set order. Type one part at a time.", "There are {w} words and it starts with \"{f}\". Watch each comma, period and colon.", "Example: for <b>doe, al. big cats. paris: lion press, 2015.</b>, type author, title, city with a colon, publisher, year. Now type yours."],
    [["Citations", "📚", "A <b>citation</b> tells readers which source you used."], ["The order", "🔢", "Author, title, city, publisher, year. Each piece has its own punctuation."], ["Be exact", "🎯", "One missed comma or period makes a citation incorrect."]], cap);
  const B3 = ty("Fractions and units", "Type this sentence. Include the slashes and decimals.",
    ["mix 1/2 cup of flour with 3/4 cup of milk.", "add 2 1/2 tsp of salt.", "the trail is 3.5 km long and 120 m high.", "stir in 1/4 cup of sugar for 2 min.", "cut the rope into 4 pieces, each 2.5 m long.", "pour 250 ml of water into a 1.5 l jar.", "the box weighs 12.5 kg and is 40 cm wide.", "bake at 350 f for 25 min."],
    ["Numbers, slashes and dots can look alike. Go slowly on them.", "There are {w} words and it starts with \"{f}\". The slash key is at the bottom right, near the period.", "Example: for <b>use 1/3 cup and 4.5 cm</b>, type 1, slash, 3 and the number 4, a dot, 5. Now type yours."],
    [["Fractions", "➗", "On a keyboard a fraction like one half is typed <b>1/2</b>."], ["Decimals", "⚫", "Use the <b>period</b> as the decimal point: 2.5."], ["Units", "📏", "Short unit names like <b>cm, kg, ml</b> follow the number after a space."]], cap);
  const B4 = ty("Type a file path", "Type this file path. The slashes lean backward.",
    ["c:\\school\\science\\notes.txt", "d:\\photos\\2026\\trip.jpg", "c:\\projects\\robot\\code.py", "c:\\music\\favorites\\song1.mp3", "c:\\homework\\math\\week3.xlsx", "d:\\games\\maze\\save1.dat", "c:\\docs\\reports\\final.pdf", "c:\\art\\drawings\\cat.png"],
    ["A file path has the drive, folders, then the file name with a dot and ending.", "It has {n} characters and starts with \"{f}\". The backslash key is above Enter.", "Example: for <b>c:\\pics\\dog.png</b>, type c, a colon, a backslash, pics, a backslash, then dog, a dot and png. Now type yours."],
    [["File path", "🗺️", "A <b>path</b> shows where a file lives: drive, then folders, then the file."], ["Backslash", "⌨️", "On Windows, paths use the backslash <b>\\</b>. It's usually above the Enter key."], ["File ending", "🔚", "The letters after the last dot, like .txt or .png, tell the type of file."]]);
  const B5 = num("Target accuracy", "🎯", () => {
    const n = pick([200, 300, 400, 500, 1000]), p = pick([90, 95, 98]);
    return [`A test has ${n} characters. To keep at least ${p}% accuracy, what is the most mistakes you can make?`, n * (100 - p) / 100];
  }, ["Accuracy 95% means 5% of the characters can be wrong. Find that part.", "Subtract the target from 100 to get the allowed error percent, then take that percent of the total.", "Example: 200 characters at 90% allows 10% mistakes, which is 200 x 10 / 100 = 20. Now do yours."],
    [["Accuracy", "✅", "<b>Accuracy</b> is the percent of characters you typed correctly."], ["Allowed mistakes", "🧮", "100% minus the target gives the <b>error percent</b> you may have."], ["Example", "💡", "98% on 500 characters allows 2%, which is 10 mistakes."]]);
  const B6 = cu("Range and median of scores", () => {
    const v = []; while (v.length < 5) { const x = ri(20, 60); if (!v.includes(x)) v.push(x); }
    const s = v.slice().sort((a, b) => a - b);
    if (Math.random() < 0.5) return { text: "These are five typing scores in WPM. What is the range (highest minus lowest)?", visual: big(v.join(", "), 1.3), answer: s[4] - s[0], hints: ["The range tells how far apart the biggest and smallest scores are.", "Find the biggest and the smallest score, then subtract.", "Example: for 30, 50, 40, 35, 45 the biggest is 50, the smallest is 30, so the range is 20. Now do yours."] };
    return { text: "These are five typing scores in WPM. What is the median (the middle one when sorted)?", visual: big(v.join(", "), 1.3), answer: s[2], hints: ["Put the scores in order from smallest to largest first.", "With five scores, the median is the third one in the sorted list.", "Example: 9, 3, 7, 5, 1 sorts to 1, 3, 5, 7, 9 and the middle is 5. Now do yours."] };
  }, [], [["Range", "↔️", "<b>Range</b> = highest - lowest. It shows how spread out the scores are."], ["Median", "🎯", "<b>Median</b> is the middle value after you sort the scores."], ["Why care", "📈", "A small range means steady typing. Big swings mean you are still learning."]]);
  const B7 = num("Percent of the total", "📊", () => {
    let t, p, part;
    do { t = pick([20, 40, 50, 100, 200]); p = pick([10, 20, 25, 40, 50, 60, 75]); part = t * p / 100; } while (!Number.isInteger(part));
    return [`In a sheet, B2 = ${part} (the part) and B3 = ${t} (the total). What percent does =B2/B3*100 show?`, p];
  }, ["Percent means \"out of 100\". Compare the part with the whole.", "Divide the part by the total, then multiply by 100.", "Example: 15 out of 60 is 15 / 60 = 0.25, and 0.25 x 100 = 25 percent. Now do yours."],
    [["Part and whole", "🥧", "A percent compares a <b>part</b> to the <b>whole</b>."], ["Formula", "🧮", "<b>=part/total*100</b> gives the percent."], ["Example", "💡", "12 of 48 is 12 / 48 = 0.25, which is 25%."]]);
  const B8 = mc("Locked cell references", "🔒", [
    "In =B2*$E$1, what do the $ signs do?|They lock E1 so it does not change when copied|They add dollars|They make the number bigger",
    "You want every row to multiply by the tax rate in cell F1. Which formula is best in C2?|=B2*$F$1|=B2*F2|=B3*F1",
    "If =A2*$D$1 in B2 is copied down to B3, it becomes...|=A3*$D$1|=A3*$D$2|=A2*D1",
    "Which key toggles the $ signs while you edit a cell name?|F4|F1|Esc",
    "A reference without $ signs, like A1, is called...|Relative|Absolute|Frozen",
    "A reference like $A$1 is called...|Absolute|Relative|Hidden",
    "Why lock a tax-rate cell with $ signs?|So every row uses the same rate cell|So the sheet prints|So the numbers turn red",
    "In $A1 the dollar sign locks...|Only the column A|Only the row 1|Nothing"],
    ["Think about which parts of the cell name must stay the same when you copy.", "A dollar sign in front of a letter or number keeps that part from moving.", "Example: =A1*$C$1 copied down becomes =A2*$C$1, because only the unlocked part moves. Now decide yours."],
    [["Relative", "↕️", "A normal reference like <b>A1</b> shifts when you copy the formula."], ["Absolute", "🔒", "<b>$A$1</b> never changes, no matter where you copy it."], ["Use it", "⌨️", "Press <b>F4</b> while editing to add the dollar signs. Perfect for a tax rate or price in one cell."]]);
  const B9 = num("Add in binary", "💡", () => {
    const a = ri(3, 7), b = ri(3, 7);
    return [`Add these binary numbers and give the answer in binary.`, (a + b).toString(2), big(`${a.toString(2)} + ${b.toString(2)}`, 1.8)];
  }, ["Turn each binary number into an ordinary number first.", "Add the two ordinary numbers, then change the sum back into 1s and 0s using 8, 4, 2, 1.", "Example: 10 + 1 means 2 + 1 = 3, and 3 is 2 + 1, so the binary answer is 11. Now do yours."],
    [["Binary values", "💡", "Binary places are worth <b>1, 2, 4, 8</b> from the right."], ["Add two ways", "➕", "Easy way: change to regular numbers, add, then change back."], ["Example", "🧮", "101 is 5 and 11 is 3. 5 + 3 = 8, and 8 in binary is 1000."]]);
  const B10 = mc("Colors from RGB", "🎨", [
    "On a screen, (255, 0, 0) in red-green-blue values shows...|Red|Green|Blue",
    "(0, 0, 255) in red-green-blue values shows...|Blue|Red|Yellow",
    "(0, 255, 0) in red-green-blue values shows...|Green|Purple|Black",
    "(0, 0, 0) shows...|Black|White|Red",
    "(255, 255, 255) shows...|White|Black|Green",
    "(255, 255, 0), full red and full green, shows...|Yellow|Purple|Cyan",
    "(0, 255, 255), full green and full blue, shows...|Cyan|Orange|Pink",
    "(128, 128, 128) shows a middle...|Gray|Red|Black",
    "Each of the three color numbers goes from 0 up to...|255|100|10"],
    ["The three numbers are the amounts of red light, green light and blue light, in that order.", "0 means none of that light and 255 means the most. Mixing lights adds brightness.", "Example: (255, 0, 255) has full red and full blue but no green, which gives a pinkish purple called magenta. Now decide yours."],
    [["RGB", "🌈", "Screens make every color by mixing <b>R</b>ed, <b>G</b>reen and <b>B</b>lue light."], ["0 to 255", "🔢", "Each part is a number from 0 (none) to 255 (full)."], ["Light mixes", "💡", "All lights full makes white. All off makes black."]]);
  const B11 = num("Trace a while loop", "🔁", () => {
    let s, k, t, c, x;
    do { s = ri(12, 30); k = ri(2, 5); t = ri(0, 8); x = s; c = 0; while (x > t) { x -= k; c++; } } while (c < 2 || c > 9 || x < 0);
    const lines = [`x = ${s}`, `while x > ${t}:`, sp + `x = x - ${k}`];
    if (Math.random() < 0.55) return ["How many times does the loop run?", c, code(lines)];
    return ["What is x after the loop ends?", x, code(lines)];
  }, ["A while loop keeps going as long as its check is true. Check before each turn.", "Do one turn at a time, writing the new x each time, and stop when the check is false.", "Example: x = 10, while x > 4, x = x - 3: x becomes 7, then 4, then stops, so 2 turns and x ends at 4. Now do yours."],
    [["While", "🔁", "<b>while</b> repeats its lines for as long as the check stays true."], ["Check first", "❓", "The check runs <b>before</b> every turn, even the first."], ["Trace", "👣", "Write the value of x after each turn until the check fails."]]);
  const B12 = cu("Text in code", () => {
    const ws = ["robot", "planet", "pizza", "banana", "keyboard", "sunshine", "rocket", "puzzle"], w1 = pick(ws);
    if (Math.random() < 0.5) return { text: `What does len("${w1}") return? (len counts the characters.)`, answer: w1.length, hints: ["len counts every character in the quotes, one by one.", "Count each letter. A space would count too.", "Example: len(\"cat\") returns 3 because c, a and t are three characters. Now do yours."] };
    const p = ["sun", "star", "moon", "snow", "back", "sea"], q = ["flower", "dust", "light", "ball", "pack", "shell"], i = ri(0, 5);
    return { text: `In code, + between two strings joins them. What does "${p[i]}" + "${q[i]}" make? (Type the new word.)`, textInput: true, answer: p[i] + q[i], hints: ["Joining strings puts them side by side, with nothing between.", "Write the first string, then write the second right after it.", "Example: \"cup\" + \"cake\" makes cupcake. Now do yours."] };
  }, [], [["Strings", "🔤", "Text in code is called a <b>string</b> and sits in quote marks."], ["Length", "📏", "<b>len(\"hi\")</b> counts the characters. It gives 2."], ["Joining", "🔗", "The <b>+</b> sign joins strings: \"ice\" + \"cream\" makes icecream."]]);
  const B13 = mc("Good coding habits", "🧼", [
    "Clear names like total_score help because...|People can read the code more easily|The computer runs faster|The screen gets brighter",
    "A comment in code is...|A note for people that the computer ignores|A command that runs twice|An error",
    "Breaking a big problem into small parts is called...|Decomposition|Deletion|Delay",
    "Indenting lines helps by...|Showing which lines belong together|Making code run faster|Removing bugs",
    "Testing your code with several inputs helps you...|Find mistakes early|Make it longer|Remove comments",
    "Copying code you do not understand is...|Risky, because you can't fix it if it breaks|Always the best way|Required",
    "Which is the best variable name for a player's age?|player_age|x1|thing",
    "Saving versions of your code lets you...|Go back if something breaks|Delete bugs automatically|Type faster",
    "A function you can reuse saves you from...|Repeating the same code again and again|Buying a keyboard|Using variables"],
    ["Ask: would this make the code easier for a person to read, fix or reuse?", "Good habits help people (including future you) understand the code. They don't change what the computer can do.", "Example: naming a variable lives_left instead of n tells readers what it holds. Now decide yours."],
    [["Readable code", "📖", "Pick <b>clear names</b> and use <b>comments</b> to explain the tricky parts."], ["Small parts", "🧩", "Split big jobs into <b>small functions</b>. Each one does one thing."], ["Test often", "🧪", "Run your code after each small change so bugs are easy to find."]]);
  const B14 = mc("Clients and servers", "🌐", [
    "When your browser asks for a web page, it is acting as the...|Client|Server|Router",
    "The computer that stores a page and sends it back is the...|Server|Client|Mouse",
    "A router...|Sends data between networks, like your home and the internet|Stores your photos|Draws pictures",
    "An IP address is like...|A street address for a device on a network|A password|A game score",
    "DNS turns...|A website name into an IP address|Photos into text|Files into zips",
    "A LAN is a network that covers...|A small area like a home or school|The whole planet|Outer space",
    "The internet is...|Many networks connected together|One giant computer|A single cable",
    "Wi-Fi sends data using...|Radio waves|Sound|Paper"],
    ["Picture who asks for something and who answers.", "Think about what each device or system is for: asking, answering, directing or naming.", "Example: a phone sends a request for a video and a computer far away sends it back, so the phone is the client. Now decide yours."],
    [["Request and reply", "🔁", "A <b>client</b> asks for something. A <b>server</b> answers."], ["Addresses", "🏠", "Every device has an <b>IP address</b>. <b>DNS</b> turns site names into those addresses."], ["Routers", "📡", "A <b>router</b> passes data between your network and the wider internet."]]);
  const B15 = cu("Secret codes (Caesar)", () => {
    const ws = ["code", "moon", "bird", "tree", "lamp", "fish", "star", "book", "wolf", "rain", "maze", "wave"];
    const w = pick(ws), k = ri(1, 4);
    const shift = (s, n) => s.split("").map(c => AL[(AL.indexOf(c) + n + 26) % 26]).join("");
    if (Math.random() < 0.6) return { text: `A Caesar cipher moves each letter ${k} ${k === 1 ? "place" : "places"} forward in the alphabet (z wraps to a). Encode the word:`, visual: big(w), textInput: true, answer: shift(w, k), hints: ["Take the letters one at a time. Each one moves forward the same number of steps.", `Count ${k} ${k === 1 ? "letter" : "letters"} onward in the alphabet for every letter.`, "Example: with a shift of 2, cab becomes ecd (c to e, a to c, b to d). Now do yours."] };
    return { text: `A secret word was shifted ${k} ${k === 1 ? "place" : "places"} forward to make this. What was the original word?`, visual: big(shift(w, k)), textInput: true, answer: w, hints: ["To undo a shift forward, move each letter backward.", `Move every letter back ${k} ${k === 1 ? "place" : "places"} in the alphabet (a wraps back to z).`, "Example: with a shift of 2, ecd goes back to cab (e to c, c to a, d to b). Now do yours."] };
  }, [], [["Ciphers", "🔐", "A <b>cipher</b> scrambles a message so only people who know the trick can read it."], ["Caesar shift", "🔤", "Move every letter the same number of steps. With a shift of 1, a becomes b."], ["Wrap around", "🔄", "After z, start again at a. To decode, shift <b>backward</b>."]]);
  const B16 = mc("Public Wi-Fi safety", "☕", [
    "At a cafe on public Wi-Fi, which choice is safest?|Wait to log in to important accounts until you are on a trusted network|Share your password with the person next to you|Turn off all updates",
    "A fake hotspot with a name that looks like the cafe's is a trick that...|Tries to capture what you send|Boosts your speed|Charges your battery",
    "A padlock in the address bar means...|The connection to the site is encrypted|The site is always honest|The site has no ads",
    "Auto-connecting to any open network is...|Risky, so turn it off|A great idea|Needed for updates",
    "Before joining an unknown network, you should...|Ask a trusted adult|Type your passwords|Turn up the volume",
    "Which is not a good thing to send over a network you don't trust?|A bank password|A weather question|A song title",
    "Turning Wi-Fi off when you don't need it...|Keeps your device from joining unknown networks|Deletes your apps|Makes the device lighter",
    "Home Wi-Fi should be protected with...|A strong password|No password|A sticker"],
    ["Ask yourself who else might be on this network, and what could they see.", "Open networks are shared with strangers. Think about what you would protect and when you'd wait.", "Example: it's fine to check a bus timetable on public Wi-Fi, but wait to enter a password for something important. Now decide yours."],
    [["Shared networks", "☕", "Public Wi-Fi is shared with <b>strangers</b>. Be careful what you do on it."], ["Fakes", "🎭", "Criminals can make a hotspot with a <b>believable name</b>. Check with staff first."], ["Smart habits", "🛡️", "Look for the <b>padlock</b>, turn off auto-join, and ask an adult before joining."]]);
  const B17 = mc("Computer history", "🏛️", [
    "The first big electronic computers, like ENIAC in the 1940s, were...|As big as a room|Small enough for a pocket|Made of paper",
    "Which invention replaced bulky vacuum tubes and made computers smaller?|The transistor|The mouse|The speaker",
    "Ada Lovelace is remembered for writing early ideas for...|A computer program for Babbage's machine|The first video game|The first phone",
    "Charles Babbage designed...|A mechanical computer called the Analytical Engine|The first smartphone|The first emoji",
    "A microchip packs many tiny parts onto...|A small piece of silicon|A sheet of paper|A glass of water",
    "The idea for the World Wide Web was proposed by Tim Berners-Lee in...|The late 1980s|The 1800s|The 1920s",
    "Home computers became popular around...|The 1980s|The 1880s|The 1780s",
    "Smartphones became common in...|The 2000s and 2010s|The 1950s|The 1850s"],
    ["Think about when each thing could have been built, and what came before.", "Computers started huge and got smaller as new parts were invented.", "Example: the first cars came long before computers, so a question about steam engines would point to the 1800s. Now decide yours."],
    [["Giants", "🏢", "Early computers like <b>ENIAC</b> filled whole rooms."], ["Smaller", "🔬", "The <b>transistor</b> and then the <b>microchip</b> made computers tiny and cheap."], ["Early ideas", "📜", "<b>Babbage</b> planned a mechanical computer, and <b>Ada Lovelace</b> wrote ideas for programming it, over a century before modern computers."]]);
  const B18 = mc("Alt text and access", "♿", [
    "Alt text is...|A written description of a picture for screen readers|A bigger font|A password",
    "Captions on a video help people who...|Need to read the words instead of hearing them|Cannot type|Have no mouse",
    "Which is the best alt text for a photo of a dog jumping to catch a ball?|A brown dog jumping to catch a red ball|IMG_4021|Click here",
    "Strong contrast between text and background makes the text...|Easier to read|Smaller|Louder",
    "Color alone should not carry the meaning because...|Some people cannot tell certain colors apart|Colors use more battery|Screens are too dim",
    "A screen reader...|Reads the text on the screen out loud|Prints the screen|Turns the screen on",
    "Voice typing lets someone...|Speak words that the computer turns into text|Hear the keyboard|Print words",
    "Zooming in or a larger font helps people who...|Find small text hard to see|Own a big screen|Type very fast"],
    ["Think about who might have trouble with a page and what would help them.", "Accessibility tools give another way to see, hear or use something.", "Example: a sound-only video alert gets a text caption so people who can't hear it get the message too. Now decide yours."],
    [["For everyone", "🌍", "<b>Accessible</b> design lets people with different needs use the same page."], ["Alt text", "🖼️", "<b>Alt text</b> describes a picture in words so screen readers can say it out loud."], ["More tools", "🛠️", "Captions, strong contrast, zoom and voice typing all help."]]);
  const L14 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18,
    MIX("Mixed practice", B1, B3, B5, B6, B7, B8, B9, B11, B12, B13, B15, B16),
    MIX("Level 14 Challenge", B2, B4, B6, B8, B9, B10, B11, B12, B14, B15, B17, B18)];

  // =============== LEVEL 15 ===============
  const C1 = ty("Type a mixed paragraph", "Type this paragraph. It has numbers, symbols and punctuation.",
    ["on march 4, our class raised $120 for the animal shelter. we baked 36 cookies, sold 48 muffins, and thanked 12 helpers.", "the science fair has 24 projects this year. judges visit at 10:30 am, and winners are announced at 2:15 pm in the gym.", "our robot weighs 2.5 kg and moves 3 m in 6 seconds. we tested it 15 times and fixed 4 small bugs.", "the school garden grew 18 tomatoes, 40 beans, and 7 pumpkins. we shared half of them with 3 neighbors.", "a good typist can reach 60 words per minute with 98% accuracy, but it takes weeks of calm, steady practice.", "for the trip, bring a lunch, a water bottle, and $5. the bus leaves at 8:00 am sharp and returns by 3:30 pm.", "the library added 250 new books in may. fiction filled 3 shelves, and science books filled 2 more."],
    ["Type one sentence at a time, and look ahead for numbers and symbols.", "There are {w} words and it starts with \"{f}\". Dollar signs and percent signs need Shift.", "Example: for <b>we sold 12 cakes for $30, a 20% gain.</b>, type the words, then 12, then $30 with Shift and 4, then 20 and Shift 5 for the percent sign. Now type yours."],
    [["Mixed text", "📝", "Real writing mixes words, numbers and symbols. Stay calm and steady."], ["Symbols", "💲", "<b>$</b> is Shift + 4, <b>%</b> is Shift + 5, and <b>:</b> is Shift + semicolon."], ["Goal", "🎯", "Aim for few mistakes first. Speed follows."]], cap);
  const C2 = ty("Type HTML tags", "Type this line of web page code.",
    ["<p>hello world</p>", "<h1>my page</h1>", "<b>bold text</b>", "<i>slanted</i>", "<ul><li>apples</li></ul>", "<title>our site</title>", "<h2>our club</h2>", "<button>click</button>", "<p>welcome!</p>"],
    ["Tags come in pairs: one that opens and one that closes with a slash.", "It has {n} characters and starts with the mark \"{f}\". The angle brackets are Shift with the comma and period keys.", "Example: for <b>&lt;h3&gt;hi&lt;/h3&gt;</b>, type less-than, h3, greater-than, hi, less-than, slash, h3, greater-than. Now type yours."],
    [["HTML", "🌐", "<b>HTML</b> uses tags to tell the browser what each part of a page is."], ["Pairs", "🤝", "An opening tag like &lt;p&gt; is closed by &lt;/p&gt;."], ["Which keys?", "⌨️", "&lt; is <b>Shift + comma</b> and &gt; is <b>Shift + period</b>. The slash is at the bottom right."]]);
  const C3 = ty("Type a CSS rule", "Type this style rule.",
    ["h1 { color: blue; }", "p { font-size: 18px; }", "body { background: white; }", "h2 { color: green; }", "p { margin: 10px; }", ".box { width: 200px; }", "img { width: 100%; }", "a { color: red; }"],
    ["A rule has a name, curly brackets, a property, a colon, a value and a semicolon.", "There are {w} chunks split by spaces and it starts with \"{f}\". Curly brackets are Shift with the square-bracket keys.", "Example: for <b>div { color: gray; }</b>, type div, a curly bracket, color, a colon, gray, a semicolon, and the closing curly bracket. Now type yours."],
    [["CSS", "🎨", "<b>CSS</b> describes how a web page looks: colors, sizes and spacing."], ["Curly brackets", "{ }", "<b>{</b> is Shift + [ and <b>}</b> is Shift + ]."], ["Pattern", "🧩", "<b>property: value;</b> Always end the line with a semicolon."]]);
  const C4 = ty("Type spreadsheet formulas", "Type this formula exactly.",
    ["=sum(b2:b9)", "=average(a1:a5)", "=max(c1:c10)", "=min(d2:d8)", "=count(a1:a20)", "=b2*c2", "=(a1+a2)/2", "=round(b4,2)"],
    ["Formulas start with an equals sign. Type the rest in small pieces.", "It has {n} characters and starts with \"{f}\". Brackets use Shift with 9 and 0, and the colon needs Shift.", "Example: for <b>=SUM(A1:A4)</b>, type equals, sum, an open bracket, a1, a colon, a4 and a close bracket. Now type yours."],
    [["Formulas", "🧮", "Every formula begins with <b>=</b>."], ["Ranges", "↔️", "<b>B2:B9</b> means every cell from B2 down to B9."], ["Case", "🔤", "Capitals do not matter in formulas. Type them lowercase if you like."]], s => esc(s.toUpperCase()));
  const C5 = num("Predict your speed", "📈", () => {
    const st = ri(18, 40), g = ri(2, 5), wk = ri(3, 8), n = pick(names);
    if (Math.random() < 0.6) return [`${n} types ${st} WPM now and gains ${g} WPM every week. What will the speed be after ${wk} weeks?`, st + g * wk];
    return [`${n} types ${st} WPM now and gains ${g} WPM every week. After how many weeks will the speed reach ${st + g * wk} WPM?`, wk];
  }, ["Each week adds the same amount. Think of it as repeated adding.", "Total gain = weekly gain x weeks. Add it to the start, or divide the gain needed by the weekly gain.", "Example: start 20, gain 4 a week: after 3 weeks it is 20 + 4 x 3 = 32. Reaching 36 needs 16 more, and 16 / 4 = 4 weeks. Now do yours."],
    [["Growth", "🌱", "Steady practice adds a little speed each week."], ["Plan", "🗓️", "Speed later = start + (gain per week x weeks)."], ["Goals", "🎯", "Work backward: weeks needed = speed to gain / gain per week."]]);
  const C6 = cu("Count with COUNTIF", () => {
    const opts = ["red", "blue", "green"], n = ri(6, 8), tgt = pick(opts);
    let arr; do { arr = Array.from({ length: n }, () => pick(opts)); } while (!arr.includes(tgt));
    return { text: `Cells A1 to A${n} hold the colors shown. What does =COUNTIF(A1:A${n},"${tgt}") return?`, visual: big(arr.join(", "), 1.15), answer: arr.filter(x => x === tgt).length, hints: ["COUNTIF counts only the cells that match what is in the quotes.", "Go through the list and tally each match for that one word. Ignore the other words.", "Example: for red, blue, red, red and \"blue\", only one cell matches, so it returns 1. Now count yours."] };
  }, [], [["COUNTIF", "🔎", "<b>=COUNTIF(range, \"word\")</b> counts the cells that match."], ["Exact match", "🎯", "Only cells equal to the word in quotes are counted."], ["Example", "🧮", "In cat, dog, cat, cat, COUNTIF with \"cat\" returns 3."]]);
  const C7 = num("Rounding numbers", "🔢", () => {
    let ip, d1, d2, d3, k;
    do { ip = ri(1, 30); d1 = ri(1, 9); d2 = ri(1, 9); d3 = ri(1, 9); k = ri(0, 2); } while (k === 2 && d3 === 5);
    const n = ip * 1000 + d1 * 100 + d2 * 10 + d3, div = Math.pow(10, 3 - k);
    const r = Math.round(n / div) / Math.pow(10, k), x = `${ip}.${d1}${d2}${d3}`;
    return [`What does =ROUND(${x},${k}) show? The second number says how many digits to keep after the point.`, r];
  }, ["Look at the first digit you would cut off. Is it 5 or more?", "If the digit just after your last kept place is 5 or more, round the last kept digit up. If it is 4 or less, keep it.", "Example: ROUND(6.382,1) keeps 6.3 and the next digit is 8, so it rounds up to 6.4. Now do yours."],
    [["ROUND", "🎯", "<b>=ROUND(number, digits)</b> keeps that many digits after the decimal point."], ["The rule", "📏", "Look at the next digit. <b>5 or more</b> rounds up, <b>4 or less</b> stays."], ["Zero digits", "0️⃣", "ROUND(7.6,0) gives a whole number: 8."]]);
  const C8 = num("Percent change", "📉", () => {
    let o, p, up, nw;
    do { o = pick([20, 25, 40, 50, 80, 100, 200]); p = pick([10, 20, 25, 50]); up = Math.random() < 0.5; nw = o * (up ? 100 + p : 100 - p) / 100; } while (!Number.isInteger(nw));
    return [`A price went ${up ? "up" : "down"} from ${o} to ${nw}. By what percent did it ${up ? "increase" : "decrease"}?`, p];
  }, ["Percent change compares the change to the starting amount.", "Find the difference between the two numbers, divide by the starting number, then multiply by 100.", "Example: from 50 to 60 is a change of 10, and 10 / 50 = 0.2, which is 20 percent. Now do yours."],
    [["Change", "🔄", "First find how much it changed: new minus old, ignoring the sign."], ["Compare to start", "➗", "Percent change = <b>change / starting amount x 100</b>."], ["Example", "💡", "From 40 to 30 is a change of 10, and 10 / 40 = 25%, so it dropped 25%."]]);
  const C9 = num("The value of a byte", "💾", () => {
    const wts = [128, 64, 32, 16, 8, 4, 2, 1]; let bits, v;
    do { bits = wts.map(() => ri(0, 1)); v = bits.reduce((s, b, i) => s + b * wts[i], 0); } while (bits.reduce((s, b) => s + b, 0) < 2);
    return ["This byte has eight bits. The places are worth 128, 64, 32, 16, 8, 4, 2, 1. What number is it?", v, big(bits.join(""), 2)];
  }, ["A 1 means \"count this place\" and a 0 means \"skip it\".", "Line the bits up under 128, 64, 32, 16, 8, 4, 2, 1 and add up the places that have a 1.", "Example: 00010101 has 1s under 16, 4 and 1, so 16 + 4 + 1 = 21. Now do yours."],
    [["Byte", "💾", "A <b>byte</b> is 8 bits. It can hold a number from 0 to 255."], ["Place values", "🔢", "From the left the places are 128, 64, 32, 16, 8, 4, 2, 1."], ["Add", "➕", "Add the places that have a 1. 00000110 is 4 + 2 = 6."]]);
  const C10 = cu("Letters as numbers", () => {
    const up = Math.random() < 0.5, base = up ? 65 : 97, A = up ? "A" : "a", i = ri(1, 12), L = (up ? AL.toUpperCase() : AL)[i];
    if (Math.random() < 0.55) return { text: `In ASCII, the letter ${A} is stored as ${base}, and the letters follow in order. What number is the letter ${L}?`, visual: big(L), answer: base + i, hints: ["Letters are numbered in alphabet order, one after the other.", `Count how many letters ${L} is after ${A}, then add that to ${base}.`, "Example: if A is 65, then D is three letters later, so it is 68. Now do yours."] };
    const cd = base + i, set = new Set([L]); while (set.size < 4) set.add((up ? AL.toUpperCase() : AL)[ri(0, 25)]);
    return { text: `In ASCII, ${A} is ${base} and the letters follow in order. Which letter is stored as ${cd}?`, choices: shuf([...set]), answer: L, hints: ["Subtract the starting code to see how many letters past the start it is.", "Move that many letters forward in the alphabet from the first one.", "Example: if A is 65, then 67 is two past it, so the letter is C. Now do yours."] };
  }, [], [["ASCII", "🔤", "Computers store letters as numbers. <b>ASCII</b> is a famous code."], ["In order", "🔢", "Capital <b>A is 65</b>, B is 66, C is 67. Small <b>a is 97</b>, b is 98."], ["Small vs big", "🔠", "A capital and its small letter have different codes, 32 apart."]]);
  const C11 = num("Trace the variables", "📦", () => {
    const a = ri(2, 9), k = ri(1, 5), m = ri(2, 4), b = a + k, a2 = b * m;
    const ask = pick(["a", "b"]);
    return [`What is ${ask} at the end?`, ask === "a" ? a2 : b, code([`a = ${a}`, `b = a + ${k}`, `a = b * ${m}`])];
  }, ["Go line by line. A variable keeps its value until a line changes it.", "Work out b first using the old a. Then the last line changes a using the b you found.", "Example: a = 3, b = a + 1 (so b is 4), a = b * 2 makes a 8 while b stays 4. Now do yours."],
    [["Variables", "📦", "A <b>variable</b> is a named box that holds a value."], ["Changing", "🔄", "Putting a new value in the box replaces the old one."], ["Order", "👣", "Code runs top to bottom. Trace it line by line."]]);
  const C12 = cu("Which branch runs?", () => {
    if (Math.random() < 0.5) {
      const t = pick([[90, 80, 70], [85, 75, 60], [95, 85, 70]]), s = ri(50, 100);
      const g = s >= t[0] ? "A" : s >= t[1] ? "B" : s >= t[2] ? "C" : "D";
      return { text: `The score is ${s}. What grade is printed?`, visual: code([`if score >= ${t[0]}: print "A"`, `else if score >= ${t[1]}: print "B"`, `else if score >= ${t[2]}: print "C"`, `else: print "D"`]), choices: ["A", "B", "C", "D"], answer: g, hints: ["Check the lines from the top. The first true check wins and the rest are skipped.", "Compare the score with each number in order. Stop at the first one it reaches or beats.", "Example: with checks >= 90 then >= 70 then else, a score of 75 fails the first and passes the second. Now do yours."] };
    }
    const lim = pick([5, 10, 12, 15]), age = ri(3, 25), r = age < lim ? "child" : age < 18 ? "teen" : "adult";
    return { text: `The age is ${age}. What is printed?`, visual: code([`if age < ${lim}: print "child"`, 'else if age < 18: print "teen"', 'else: print "adult"']), choices: ["child", "teen", "adult"], answer: r, hints: ["Check the lines from the top. The first true check wins and the rest are skipped.", "Test the first condition, then the next one only if the first was false.", "Example: with checks < 10 then < 18 and an age of 14, the first fails and the second passes. Now do yours."] };
  }, [], [["Else if", "🔀", "<b>else if</b> gives more than two paths."], ["Top down", "⬇️", "The computer checks in order and runs <b>only the first</b> true branch."], ["Else", "🏁", "<b>else</b> catches everything that failed all the checks."]]);
  const C13 = mc("Data types", "🔣", [
    "The value 42 is an...|Integer|String|Boolean",
    "The value \"42\" with quotes around it is a...|String|Integer|Boolean",
    "A True or False value is called a...|Boolean|String|Float",
    "The value 3.14 is a...|Float (decimal number)|Integer|String",
    "What type is \"hello\"?|String|Integer|Boolean",
    "If \"5\" and \"3\" are strings, then \"5\" + \"3\" joins them into...|53|8|an error",
    "If 5 and 3 are integers, then 5 + 3 gives...|8|53|an error",
    "A list holds...|Many values in order|Only one value|Only pictures"],
    ["Look for quote marks, a decimal point, or the words True and False.", "Quotes make something text. A decimal point makes it a float. True and False are special.", "Example: 7.5 has a decimal point so it is a float, and \"seven\" is text because of the quote marks. Now decide yours."],
    [["Types", "🔣", "Every value has a <b>type</b>: <b>integer</b> (whole), <b>float</b> (decimal), <b>string</b> (text), <b>boolean</b> (True or False)."], ["Quotes", "💬", "\"7\" in quotes is text, but 7 without them is a number."], ["Why it matters", "⚠️", "The same + sign adds numbers but <b>joins</b> strings."]]);
  const C14 = mc("HTTPS and encryption", "🔒", [
    "HTTPS is safer than HTTP because it...|Encrypts the data between you and the site|Loads pages twice as fast|Blocks all ads",
    "Encryption scrambles data so that...|Only someone with the key can read it|Everyone can read it|It gets bigger",
    "The S in HTTPS stands for...|Secure|Speedy|Simple",
    "A site with HTTPS can still be...|A scam, so you still need to be careful|Never a scam|A game",
    "What do you need to unscramble encrypted data?|The right key|A bigger screen|A printer",
    "Turning scrambled data back into readable form is called...|Decryption|Compression|Backup",
    "Messages only the sender and receiver can read are protected by...|End-to-end encryption|Free storage|A bigger screen",
    "Data that is not encrypted is called...|Plain text|Hidden text|Locked text"],
    ["Think about what happens if someone could look at your data on its way across the internet.", "Encryption scrambles data. Only a matching key can unscramble it. It does not prove a site is good.", "Example: a secret note written in a code is useless to anyone who doesn't have the code. Now decide yours."],
    [["HTTPS", "🔒", "<b>HTTPS</b> sites encrypt data. Look for the padlock."], ["Keys", "🗝️", "Encrypted data needs the right <b>key</b> to be read again (decrypted)."], ["Not magic", "⚠️", "A padlock means the connection is private, not that the site is trustworthy."]]);
  const C15 = mc("Types of malware", "🦠", [
    "Malware means...|Software made to harm or annoy|A type of keyboard|A free game",
    "A virus spreads by...|Attaching itself to files or programs|Making a phone call|Cooling the computer",
    "Ransomware locks files and demands money. The best protection is...|Regular backups and not clicking strange links|Paying quickly|Hiding the computer",
    "Spyware secretly...|Watches what you do|Cleans your files|Speeds up Wi-Fi",
    "A worm is malware that...|Spreads itself across networks|Needs you to open it only|Helps antivirus",
    "Antivirus software helps by...|Finding and removing known bad software|Giving you a bigger screen|Typing for you",
    "Where should you download apps from?|Official app stores or trusted sites|Any pop-up ad|A stranger's message",
    "A software update often includes...|Fixes for security holes|More pop-ups|Slower speed"],
    ["Think about what the bad software wants to do and how to stop it.", "Defenses are habits (backups, updates, careful clicking) and tools (antivirus).", "Example: if a pop-up says your computer is infected and tells you to download a fix, close it and tell an adult, because it's a trick. Now decide yours."],
    [["Malware", "🦠", "<b>Malware</b> is harmful software: viruses, worms, spyware and ransomware."], ["Stay safe", "🛡️", "Keep <b>updates</b> on, use <b>antivirus</b>, and download only from trusted places."], ["Backups", "💾", "A <b>backup</b> means you can recover even if something goes wrong."]]);
  const C16 = mc("How AI learns", "🤖", [
    "An AI learns by finding patterns in...|Lots of example data|Nothing at all|Only one picture",
    "Training data means...|Examples used to teach an AI|Typing practice|Exercise for the computer fan",
    "If training data leaves out many kinds of people, the AI may be...|Biased (unfair)|Perfect|Faster",
    "Can an AI make mistakes?|Yes, so check important answers|Never|Only on Mondays",
    "A video app that recommends clips mostly uses...|What you watched before|Your secret thoughts|The weather",
    "A chatbot writes answers by...|Predicting likely words from patterns it learned|Calling a person|Searching your brain",
    "Before trusting an AI answer for homework, you should...|Check it with a reliable source|Copy it straight in|Believe it right away",
    "Sharing private details such as your address with an AI chatbot is...|Not a good idea|Required|Always safe"],
    ["Think about where an AI gets what it knows.", "AI learns from data made by people, so it can copy their gaps and mistakes.", "Example: an AI trained only on pictures of cats and dogs would get confused by a picture of a horse. Now decide yours."],
    [["Learning", "📚", "AI finds <b>patterns</b> in huge amounts of example data."], ["Bias", "⚖️", "If the examples are unfair or missing, the AI can be <b>biased</b>."], ["Check it", "🔍", "AI can be wrong or make things up. <b>Check</b> important facts and never share private details."]]);
  const C17 = num("Data use", "📶", () => {
    if (Math.random() < 0.6) { const r = pick([1, 2, 3]), h = ri(2, 12); return [`Streaming a video uses about ${r} GB each hour. How many GB are used in ${h} hours?`, r * h]; }
    const lim = pick([20, 50, 100]), u = ri(5, lim - 3);
    return [`A phone plan allows ${lim} GB of data a month. ${u} GB are used so far. How many GB are left?`, lim - u];
  }, ["Is the question about repeating the same amount, or about taking some away?", "For rates, multiply the amount per hour by the hours. For what is left, subtract what has been used.", "Example: 2 GB per hour for 5 hours is 10 GB. A 30 GB limit with 12 GB used leaves 18 GB. Now do yours."],
    [["Data use", "📶", "Videos, games and downloads use <b>data</b>. Plans often have a monthly limit."], ["Rate times time", "✖️", "GB per hour x hours = GB used."], ["What is left", "➖", "Limit - used = left."]]);
  const C18 = mc("Versions and teamwork", "🗂️", [
    "Version history lets you...|See and restore earlier copies of a file|Make the file read itself aloud|Delete everyone's work",
    "Naming files essay_v1, essay_v2 helps you...|Tell which copy is newest|Make them smaller|Hide them",
    "When people edit a shared document, suggestions mode...|Shows who changed what|Deletes the document|Blocks typing",
    "Before a big edit, a smart habit is to...|Save a copy or version|Delete the old copy|Turn off the computer",
    "In version control tools such as Git, a commit is...|A saved snapshot of your work with a note|A deleted file|An email",
    "A branch in version control is...|A separate line of work where you can try ideas|A tree|A cable",
    "A merge means...|Combining changes together|Splitting a file|Printing",
    "Comments in a shared doc are for...|Discussing without changing the text|Making text red|Printing"],
    ["Think about how to keep earlier work safe while you change things.", "Versions and copies are about being able to go back. Teamwork tools show who changed what.", "Example: saving report_v2 before rewriting means report_v1 is still there if you change your mind. Now decide yours."],
    [["Save versions", "🗂️", "Keep earlier copies so you can <b>go back</b> if a change goes wrong."], ["Team edits", "👥", "Shared docs show <b>who changed what</b>, with suggestions and comments."], ["Git", "🌿", "Programmers use <b>commits</b>, <b>branches</b> and <b>merges</b> to manage versions."]]);
  const L15 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18,
    MIX("Mixed practice", C1, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C17),
    MIX("Level 15 Challenge", C2, C3, C5, C8, C9, C10, C12, C14, C15, C16, C17, C18)];

  Object.assign(TYPING_LEVELS, { 13: L13, 14: L14, 15: L15 });
})();
