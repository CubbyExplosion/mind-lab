// ext/typing-19-21.js  Mind Lab Typing & Computers, levels 19-21 (60 lessons)
(() => {
  const sl = a => () => a.map(([h, v, t]) => ({ h, v, t }));
  const big = (t, s = 2) => `<span style="font-size:${s}em;font-weight:bold">${t}</span>`;
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const code = lines => `<span style="font-family:monospace;font-size:1.1em;font-weight:bold;text-align:left;display:inline-block">${lines.map(l => esc(l).replace(/^( +)/, m => "&nbsp;".repeat(m.length))).join("<br>")}</span>`;
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
  const sumTo = a => a.reduce((x, y) => x + y, 0);
  const uniq = (n, lo, hi) => shuf(Array.from({ length: hi - lo + 1 }, (_, i) => i + lo)).slice(0, n);
  const GEN = ["Pick the answer that fits the question best.", "Cross out the choices that clearly do not fit, then compare what is left."];

  // =============== LEVEL 19 ===============
  const A1 = ty("Type a thesis statement", "Type this thesis statement. Keep your rhythm.",
    ["electric buses improve city life because they are quiet and clean.", "students should learn typing early because it saves time in every subject.", "libraries remain important because they give everyone free access to knowledge.", "regular exercise helps teenagers focus, sleep better, and feel happier.", "recycling programs work best when they are simple, clear, and convenient.", "video games can teach teamwork, planning, and problem solving.", "public parks make a town stronger by bringing neighbors together.", "learning to code is like learning a language that computers understand."],
    ["A thesis states your main point. Type it calmly, one word at a time.", "It has {w} words and begins with \"{f}\". Keep the commas steady.", "Example: for <b>dogs make good pets because they are loyal.</b> type each word, then the period. Now type yours."],
    [["Thesis", "🎯", "A <b>thesis statement</b> is one sentence that tells your reader your main point."], ["Typing it", "⌨️", "Long sentences need a steady beat. Do not stop at every word."], ["Check", "🔍", "When you finish, reread once. Look at commas and the final period."]], cap);
  const A2 = ty("Type big numbers and money", "Type this line exactly. Watch the commas, dollar signs and percent marks.",
    ["The school has 1,250 students and 85 teachers.", "The file is 3,400,000 bytes, or about 3.4 MB.", "The race ran from 2019 to 2024 across 12,500 miles.", "Sales rose from $4,500 to $12,750 in 2023.", "The stadium holds 45,000 fans; tickets cost $18.50.", "She typed 1,200 words in 20 minutes at 98% accuracy.", "The budget is $2,400,000 for the years 2025-2027.", "The code has 15,000 lines in 3 files."],
    ["Numbers, commas and symbols come one after another. Go slowly on the symbols.", "There are {w} chunks split by spaces and it starts with \"{f}\". The dollar sign and percent sign use Shift with a number key.", "Example: for <b>It cost $1,200 (up 5%).</b> type the word, the dollar sign, the number with its comma, then the bracket and percent sign. Now type yours."],
    [["Symbols", "💲", "Money, percent and big numbers use <b>$</b>, <b>%</b> and commas. Most need the Shift key."], ["Top row", "🔢", "Reach for the number row with the right finger and come back to the home row."], ["Accuracy first", "🎯", "One wrong digit changes the meaning of a number. Check each one."]]);
  const A3 = num("Words across sessions", "⌨️", () => {
    const n = pick(names), s = [0, 1, 2].map(() => [ri(2, 6) * 5, pick([20, 25, 30, 35, 40, 45, 50])]);
    return [`${n} did three typing sessions. How many words in total?`, sumTo(s.map(x => x[0] * x[1])), big(s.map(x => `${x[0]} min at ${x[1]} WPM`).join("<br>"), 1.05)];
  }, ["Each session gives (minutes x WPM) words. Do the sessions one at a time.", "Work out the words for each session first, then add the three results together.", "Example: 10 min at 30 WPM and 5 min at 20 WPM is 300 + 100 = 400 words. Now do yours."],
    [["Practice adds up", "📈", "Total words typed = the words from each session added together."], ["One session", "⏱️", "Words = <b>minutes x WPM</b>."], ["Example", "🧮", "4 min at 25 WPM is 100 words. 6 min at 10 WPM is 60 words. Total: 160."]]);
  const A4 = num("Errors per 100 words", "❌", () => {
    const w = pick([200, 300, 400, 500]), per = ri(1, 8), n = pick(names);
    return [`${n} typed ${w} words and made ${per * w / 100} mistakes. About how many mistakes per 100 words is that?`, per];
  }, ["Think of the words in groups of 100. How many groups are there?", "Divide the number of mistakes by the number of groups of 100.", "Example: 200 words with 6 mistakes is 2 groups of 100, so 6 / 2 = 3 per 100. Now do yours."],
    [["An error rate", "📏", "Errors per 100 words lets us compare short and long tests fairly."], ["The method", "➗", "Mistakes / (words / 100)."], ["Example", "🧮", "300 words with 9 mistakes: 9 / 3 = 3 mistakes per 100 words."]]);
  const A5 = mc("Task manager", "📊", [
    "Which tool lists running programs and how much memory they use?|Task manager (activity monitor)|Spell checker|Screen saver",
    "A program has frozen and will not respond. What can you do from the task manager?|End the task|Print the task|Rename the task",
    "What does very high CPU usage for a long time usually mean?|The processor is working as hard as it can|The battery is full|The screen is off",
    "What is a process?|A program that is currently running|A saved file|A type of cable",
    "Which resource holds the data a running program is using right now?|Memory (RAM)|Printer|Speaker",
    "Too many programs open at once usually makes the computer...|Slower|Faster|Quieter",
    "A laptop is slow because of many background programs. What is a sensible fix?|Close the ones you do not need|Type faster|Turn up the volume",
    "Disk usage in the task manager shows how busy the...|Storage drive|Monitor|Keyboard"],
    ["Think about what the operating system must keep track of while programs run.", "Think about what each answer would actually do inside a computer, and cross out ones that do not fit.", "Example: if a game stutters, a tool that shows what is running and how much it uses can reveal the cause. Now pick yours."],
    [["Watching the computer", "📊", "The <b>task manager</b> shows every program that is running and the resources it uses."], ["Resources", "🧠", "The computer shares <b>CPU</b> (thinking), <b>memory</b> (workspace) and <b>disk</b> (storage) between programs."], ["Fixing", "🛠️", "You can close programs you do not need, or end one that is stuck."]]);
  const A6 = num("AVERAGEIF", "📈", () => {
    const [c1, c2] = pick([["Math", "Art"], ["Cats", "Dogs"], ["Red", "Blue"], ["Home", "Away"]]);
    const k = pick([2, 3]), m = ri(60, 90), d = ri(1, 3) * 5, tg = k === 2 ? [m - d, m + d] : [m - d, m, m + d];
    const oth = Array.from({ length: ri(2, 3) }, () => ri(50, 95));
    const rows = shuf([...tg.map(s => [c1, s]), ...oth.map(s => [c2, s])]), n = rows.length;
    return [`Column A holds labels and column B holds scores. What does =AVERAGEIF(A1:A${n},"${c1}",B1:B${n}) show?`, m, code(rows.map((r, i) => `${i + 1}: ${r[0]}  ${r[1]}`))];
  }, ["AVERAGEIF only uses the rows whose label matches. Ignore the other rows.", "Add the scores of the matching rows, then divide by how many rows matched.", "Example: for rows Cat 10, Dog 20, Cat 30 and the label Cat, you average 10 and 30 to get 20. Now do yours."],
    [["AVERAGEIF", "📈", "<b>=AVERAGEIF(range, rule, average_range)</b> averages only the rows that pass the rule."], ["Steps", "🪜", "1. Find the rows that match. 2. Add their scores. 3. Divide by how many there are."], ["Why use it?", "💡", "It saves you from sorting the sheet by hand."]]);
  const A7 = num("Compound growth", "🚀", () => {
    const s = pick([5, 10, 20, 50, 100]), f = pick([2, 3]), d = pick([3, 4, 5, 6]);
    return [`A video gets ${s} views on day 1. Each day the views are ${f === 2 ? "double" : "triple"} the day before. How many views on day ${d}?`, s * Math.pow(f, d - 1)];
  }, ["Day 1 is the start. Each new day multiplies the last day by the same number.", "You multiply one fewer time than the day number. Do it step by step and write each day.", "Example: start 4 and triple each day. Day 1 is 4, day 2 is 12, day 3 is 36. Now do yours."],
    [["Growth", "🚀", "When something multiplies by the same number again and again, it grows very fast."], ["In a sheet", "📊", "If B1 is 5 and B2 is <b>=B1*2</b>, fill down and the numbers double each row."], ["Careful", "⚠️", "Day 1 is the start, so day 3 means you multiplied only twice."]]);
  const A8 = mc("Spreadsheet error codes", "⚠️", [
    "A formula divides by an empty cell. Which error appears?|#DIV/0!|#NAME?|#REF!",
    "You type =SUMM(A1:A5) by mistake. Which error appears?|#NAME?|#DIV/0!|#REF!",
    "You delete a column that a formula uses. Which error is likely?|#REF!|#NAME?|#DIV/0!",
    "Using text where a number is needed, like =\"cat\"+1, gives...|#VALUE!|#DIV/0!|#REF!",
    "What does #DIV/0! tell you?|You tried to divide by zero|A name is misspelled|A cell was deleted",
    "What does #NAME? tell you?|The sheet does not know a name or function you typed|You divided by zero|The column is too narrow",
    "What does #REF! tell you?|A formula points to a cell that no longer exists|The text is too long|You used a capital letter",
    "Cells filled with #### usually mean...|The column is too narrow for the number|The file is lost forever|The formula is perfect"],
    ["Error codes are short messages. Read what went wrong in the question.", "Match the cause in the question to a code. Cross out the ones that do not fit.", "Example: =5/0 shows #DIV/0! because dividing by zero is impossible. Match the cause to the code. Now pick yours."],
    [["Errors help", "⚠️", "A code starting with <b>#</b> is the sheet telling you what went wrong."], ["Common ones", "📋", "<b>#DIV/0!</b> divide by zero. <b>#NAME?</b> unknown name. <b>#REF!</b> missing cell. <b>#VALUE!</b> wrong kind of value."], ["Fix", "🔧", "Click the cell, read the formula, and fix the cause."]]);
  const A9 = num("Trace a range loop", "🐍", () => {
    const a = ri(1, 5), b = a + ri(3, 6), s = sumTo(Array.from({ length: b - a }, (_, i) => a + i));
    return ["What does this program print?", s, code(["total = 0", `for i in range(${a}, ${b}):`, "  total = total + i", "print(total)"])];
  }, ["range(a, b) starts at a and stops just BEFORE b.", "Write the numbers range gives you, then add them one at a time into total.", "Example: range(2, 5) gives 2, 3, 4, so the total is 9. Now do yours."],
    [["range", "🔢", "<b>range(2, 6)</b> gives 2, 3, 4, 5. It stops before the end number."], ["The total", "➕", "Each trip through the loop adds <b>i</b> into <b>total</b>."], ["Tip", "💡", "Write the values of i in a column, then add them up."]]);
  const A10 = num("Function return values", "🧩", () => {
    const m = ri(2, 5), c = ri(1, 9), k = ri(2, 9);
    return ["What does this program print?", m * k + c, code(["def f(x):", `  return ${m} * x + ${c}`, `print(f(${k}))`])];
  }, ["The number in the brackets goes into x. Then the function works out its answer.", "Put the number in place of x, multiply first, then add.", "Example: for def g(x): return 3 * x + 1, g(2) is 3 * 2 + 1 = 7. Now do yours."],
    [["Functions", "🧩", "A <b>function</b> takes an input, does a job, and <b>returns</b> an output."], ["Calling it", "📞", "<b>f(4)</b> puts 4 in place of <b>x</b> inside the function."], ["Order", "🔢", "Do multiplication before addition, as in math."]]);
  const A11 = mc("Comparison symbols", "⚖️", [
    "In many languages, which symbol asks if two things are equal?|Two equals signs together|One equals sign alone|An arrow pointing right",
    "What does x != 5 ask?|Is x NOT equal to 5?|Is x equal to 5?|Is x bigger than 5?",
    "What does x = 7 do in Python?|Stores 7 in x|Checks if x is 7|Prints 7",
    "What does &gt;= mean?|Greater than or equal to|Greater than only|Not equal to",
    "What does &lt;= mean?|Less than or equal to|Less than only|Equal to",
    "If x is 4, what is the result of x &gt;= 4?|True|False|Error",
    "If x is 4, what is the result of x != 4?|False|True|4",
    "If score is 10, what is the result of score &lt; 10?|False|True|10"],
    ["Some symbols store a value; others ask a yes or no question. Which job does this need?", "Say the symbol in words, then check it against the number in the question.", "Example: if y is 9, then y &gt; 3 asks 'is 9 bigger than 3?' so it gives True. Now pick yours."],
    [["Comparing", "⚖️", "A comparison asks a yes/no question and the answer is <b>True</b> or <b>False</b>."], ["The symbols", "🔣", "<b>==</b> equal, <b>!=</b> not equal, <b>&gt;</b> bigger, <b>&lt;</b> smaller, <b>&gt;=</b> and <b>&lt;=</b> include equal."], ["Careful", "⚠️", "One <b>=</b> stores a value. Two <b>==</b> compare."]]);
  const A12 = num("Whole-number division", "➗", () => {
    const st = ri(0, 2), b = ri(3, 9), q = ri(3, 12), r = ri(1, b - 1), a = b * q + r;
    if (st === 0) return ["What does this program print?", q, code([`print(${a} // ${b})`]), ["The // sign divides and throws away any leftover part.", "Ask yourself how many whole times the small number fits into the big one.", "Example: 17 // 5 is 3, because 5 fits into 17 three whole times (15). Now do yours."]];
    if (st === 1) return [`${a} students go on a trip. Each bus holds ${b}. How many buses can be filled completely?`, q, "🚌", ["Only count the buses that are completely full.", "Divide and ignore the leftover students.", "Example: 23 students, 5 per bus. 5 fits into 23 four times, so 4 full buses. Now do yours."]];
    return [`${a} students go on a trip. Each bus holds ${b}. How many buses are needed in total, so nobody is left behind?`, q + 1, "🚌", ["The leftover students still need a ride.", "Work out the full buses, then decide what to do about the leftover students.", "Example: 23 students, 5 per bus. 4 full buses plus 3 left over means 1 more bus. Now do yours."]];
  }, [], [["Whole-number division", "➗", "In Python, <b>//</b> gives how many whole times one number fits into another."], ["Leftovers", "🧮", "<b>%</b> gives what is left over. 17 // 5 is 3 and 17 % 5 is 2."], ["Real life", "🚌", "For 'how many are needed', a leftover means you round UP by one."]]);
  const WORDS = ["keyboard", "computer", "internet", "network", "program", "monitor", "browser", "desktop"];
  const A13 = mc("Debugging method", "🐞", [
    "Your program crashes. What should you read first?|The error message and its line number|The advertisements|Nothing, just run it again",
    "Why add a print line while debugging?|To see the value of a variable at that moment|To make the code longer|To hide mistakes",
    "What is a good way to find a bug in a long program?|Test small parts one at a time|Rewrite everything at once|Delete all comments",
    "After you fix a bug, you should...|Run the tests again|Never run it again|Restart the router",
    "What is rubber duck debugging?|Explaining your code out loud, line by line|Buying a toy for the computer|Typing very softly",
    "Changing five things at once while debugging is a bad idea because...|You will not know which change mattered|The computer gets tired|Code can only change once",
    "What is a reproducible bug?|One you can make happen again on purpose|One that never happens|One that only happens in games",
    "What is a breakpoint used for?|Pausing the program at a chosen line to look inside|Breaking the keyboard|Ending the school day"],
    ["Think about what a careful detective would do first.", GEN[1], "Example: if a score shows 0 when it should be 5, check the line that adds to the score and print the value before and after. Now pick yours."],
    [["Bugs happen", "🐞", "Every programmer meets bugs. Fixing them is a normal part of coding."], ["A method", "🔎", "Read the error, find where it happens, change ONE thing, and test again."], ["Tools", "🧰", "Printing values, breakpoints and explaining the code aloud all help."]]);
  const A14 = cu("Slicing a string", () => {
    const w = pick(WORDS), a = ri(0, 3), b = a + ri(2, 4), ans = w.slice(a, b);
    return { text: "What does this program print?", visual: code([`word = "${w}"`, `print(word[${a}:${b}])`]), textInput: true, answer: ans };
  }, ["Count the letters starting from 0, not from 1.", "word[a:b] starts at position a and stops just BEFORE position b.", "Example: for word = \"garden\", word[1:4] takes positions 1, 2 and 3, which gives \"ard\". Now do yours."],
    [["Positions", "🔢", "In code, the first letter of a word is at position <b>0</b>."], ["Slices", "✂️", "<b>word[1:4]</b> takes positions 1, 2 and 3. It stops before 4."], ["Example", "🧮", "For \"planet\", <b>[0:3]</b> gives \"pla\"."]]);
  const A15 = mc("Classes and objects", "🏗️", [
    "In code, a class is like a...|Blueprint for making objects|Finished house only|Keyboard shortcut",
    "An object is...|One thing made from a class|A comment|A cable",
    "If Car is a class, which is an object?|The red car in my driveway|All cars in the world|The word vehicle",
    "A value that belongs to an object, like its color, is called...|An attribute|A virus|A loop",
    "A function that belongs to an object, like bark(), is called...|A method|A pixel|A folder",
    "Why use classes?|To reuse a design and keep related data and actions together|To make the screen brighter|To avoid typing code",
    "Two objects made from the same class can have...|Different values, like different names|Nothing in common|Only one can exist",
    "What does player.score = 10 do?|Sets the score attribute of the player object|Deletes the player|Creates a keyboard"],
    ["A class and an object are not the same thing. Which is the plan and which is the real thing?", "Think about a general idea versus one real example of it.", "Example: Pet could be a class with a name and a sound. Your own cat Mia would be one object. Now pick yours."],
    [["Class", "🏗️", "A <b>class</b> is a plan that says what things of one kind have and can do."], ["Object", "🐶", "An <b>object</b> is one real thing made from that plan, with its own values."], ["Parts", "🧩", "Data inside an object are <b>attributes</b>. Actions it can do are <b>methods</b>."]]);
  const A16 = mc("Keys in a table", "🔑", [
    "In a table, a primary key is a column that...|Gives every row a unique ID|Holds the longest text|Is always a picture",
    "Which would make the best primary key for a students table?|A student ID number|First name|Favorite color",
    "Why is first name a poor primary key?|Two students can share the same name|Names are too short|Names cannot be stored",
    "A foreign key in an Orders table points to...|A row in another table, like a customer|The printer|The wifi password",
    "Why link two tables with keys instead of repeating data?|Less repeated data and fewer mistakes|Bigger files|Slower searches",
    "If every row has a unique ID, you can...|Find or update exactly one row|Skip backing up|Only store numbers",
    "Two rows with the same primary key would be...|Not allowed, because keys must be unique|Fine, it is just a copy|Required",
    "A customers table has ID, name and email. Which column must be unique for sure?|ID|Name|City"],
    ["Think about telling two things apart even when they look alike.", GEN[1], "Example: a library gives every book a barcode number so two copies of the same title can still be told apart. Now pick yours."],
    [["Unique ID", "🔑", "A <b>primary key</b> is a column where every row has a different value."], ["Linking", "🔗", "A <b>foreign key</b> stores another table's key so the two tables can be joined."], ["Why", "✅", "Keys stop repeats and mix-ups, so data stays clean."]]);
  const A17 = mc("DNS and networks", "📖", [
    "DNS is like a...|Phone book that turns names into addresses|Speaker for sound|Antivirus",
    "What does DNS turn a website name into?|An IP address|A password|A picture",
    "Why do we use names instead of number addresses?|Names are easier for people to remember|Computers cannot read numbers|Numbers are not allowed",
    "If DNS is not working, you might...|Reach sites by number but not by name|Lose your keyboard|Get faster internet",
    "A router at home mostly...|Sends data between your devices and the internet|Stores your homework|Draws pictures",
    "A LAN is a network that covers...|A small area like a home or school|The whole planet|Only space",
    "The biggest network of networks is the...|Internet|Desktop|Calculator",
    "What is a WAN?|A network spread over a large area|A network in one room|A kind of battery"],
    ["Think about how a computer finds a website when you only typed its name.", GEN[1], "Example: you look up a friend's name in a phone book to get a number. Something does that for website names. Now pick yours."],
    [["DNS", "📖", "<b>DNS</b> looks up a website name and returns its <b>IP address</b>."], ["Network sizes", "🌐", "A <b>LAN</b> is small (a home). A <b>WAN</b> is large (many cities)."], ["Router", "📡", "A <b>router</b> passes data between your devices and the wider network."]]);
  const A18 = mc("Your digital footprint", "👣", [
    "Your digital footprint is...|The trail of information you leave online|The size of your shoes|Your screen size",
    "Which action leaves a lasting footprint?|Posting a comment|Closing a book|Turning off a lamp",
    "Why can a post last a long time?|Others can copy or screenshot it|Posts always vanish|Only you can see it",
    "Before you post, a good test is...|Would I be okay if everyone saw this for years?|Is it fast?|Does it have emojis?",
    "Who may look at your online history one day?|Schools, employers, and others|Nobody ever|Only your keyboard",
    "What can you do to shape a good footprint?|Share kind, helpful things|Post when angry|Share passwords",
    "Deleting a post means it is...|Maybe still saved by someone else|Gone from the world for sure|Backed up by you",
    "Which is smart to keep private?|Your home address|Your favorite color|A book you liked"],
    ["Think about what stays behind after you have been online.", GEN[1], "Example: a photo you share with friends can be saved and sent on by one of them. Now pick yours."],
    [["Footprint", "👣", "Everything you post, like and search leaves a trail called a <b>digital footprint</b>."], ["It lasts", "⏳", "Others can copy or save things, so deleting does not always remove them."], ["Think first", "🤔", "Post things you would be proud of later, and keep private details private."]]);
  const L19 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18,
    MIX("Mixed practice", A1, A3, A4, A6, A7, A9, A10, A12, A14, A16),
    MIX("Level 19 Challenge", A2, A5, A8, A11, A13, A15, A17, A18, A9, A12)];

  // =============== LEVEL 20 ===============
  const B1 = ty("Type Markdown", "Type this Markdown text exactly.",
    ["# my first page", "## day 2: the plan", "**warning:** save your work", "*tip:* take small steps", "> practice makes progress", "`print(total)` shows the total", "- apples - pears - plums", "### step 3 - test it", "**bold** and *italic* are different"],
    ["Markdown uses small marks like # and * in front of or around words. Type them carefully.", "It has {w} chunks and starts with \"{f}\". The star uses Shift with 8, and the hash uses Shift with 3.", "Example: for <b>## my notes</b> type two hash marks, a space, then the words. Now type yours."],
    [["Markdown", "📝", "<b>Markdown</b> is a quick way to format text using plain characters."], ["Marks", "🔣", "<b>#</b> makes a heading. <b>**word**</b> makes bold. <b>*word*</b> makes italic."], ["Accuracy", "🎯", "The marks must match on both sides, so check your stars."]]);
  const B2 = ty("Type JavaScript lines", "Type this line of JavaScript exactly.",
    ["let score = 10;", "const name = \"Zoe\";", "console.log(total);", "if (x > 5) { y = 1; }", "for (let i = 0; i < 3; i++) {", "function add(a, b) { return a + b; }", "let big = x >= 100;", "items.push(\"pen\");", "const area = w * h;"],
    ["Code needs every bracket and semicolon. Go slowly on the symbols.", "It has {w} chunks and starts with \"{f}\". Brackets and braces need Shift, and the semicolon is right of the L.", "Example: for <b>let n = 5;</b> type let, a space, n, a space, an equals sign, a space, 5, and a semicolon. Now type yours."],
    [["JavaScript", "🟨", "<b>JavaScript</b> is the language that makes web pages move and respond."], ["Syntax", "🔣", "<b>let</b> makes a variable. Lines usually end with <b>;</b>."], ["Brackets", "🧱", "Every <b>(</b> needs a <b>)</b> and every <b>{</b> needs a <b>}</b>."]]);
  const B3 = ty("Type a professional email", "Type this line from an email.",
    ["Dear Ms. Lee, thank you for your quick reply.", "Hello Mr. Patel, I am writing to ask about the robotics club.", "Dear Coach, I would like to join the team this season.", "Subject: Question about homework 5", "Thank you for your time, and have a great day.", "Best regards, Jordan", "I have attached my report; please let me know if it opens.", "I look forward to hearing from you.", "Sorry for the late reply, and thanks for your patience."],
    ["Professional emails use capital letters and punctuation. Type them all.", "It has {w} words and starts with \"{f}\". Capital letters need Shift.", "Example: for <b>Dear Sam, thanks for helping.</b> type the capital D, the comma and the period. Now type yours."],
    [["Tone", "📧", "Emails to teachers or coaches are polite and clear."], ["Parts", "🧩", "A greeting, a short message and a friendly ending."], ["Check", "🔍", "Proofread names and punctuation before you send."]]);
  const B4 = num("Typing as a team", "👥", () => {
    const [a, b] = pick([[40, 20], [30, 30], [50, 25], [20, 10], [35, 25], [45, 15], [60, 30]]), m = ri(2, 10), [x, y] = shuf(names).slice(0, 2);
    return [`${x} types at ${a} WPM and ${y} types at ${b} WPM. They split a ${(a + b) * m}-word report and type at the same time, finishing together. How many minutes does it take?`, m];
  }, ["Both type at the same time, so their speeds add together.", "Find the team's words per minute, then divide the total words by that.", "Example: 15 WPM and 25 WPM is 40 words per minute together. A 200-word job takes 200 / 40 = 5 minutes. Now do yours."],
    [["Teamwork", "👥", "When two people work at once, add their speeds."], ["Method", "➗", "Minutes = total words / (WPM of one + WPM of the other)."], ["Example", "🧮", "20 and 10 WPM make 30 per minute. 120 words takes 4 minutes."]]);
  const HX = "0123456789ABCDEF";
  const B5 = num("Two-digit hex", "🔢", () => {
    let d1, d2, hx;
    do { d1 = ri(1, 15); d2 = ri(0, 15); hx = HX[d1] + HX[d2]; } while (hx === "1C");
    return [`Convert the hex number ${hx} to decimal.`, d1 * 16 + d2, big(hx, 2.4)];
  }, ["Letters stand for numbers: A is 10, B is 11, and so on up to F, which is 15.", "The left digit counts groups of 16. Multiply it by 16, then add the right digit.", "Example: hex 1C is 1 x 16 + 12 = 28. Now do yours."],
    [["Hex", "🔢", "<b>Hexadecimal</b> uses 16 digits: 0-9 then A-F (A = 10 ... F = 15)."], ["Two digits", "✌️", "In <b>2F</b> the 2 means two groups of 16, and F means 15 more."], ["Formula", "🧮", "Left digit x 16 + right digit."]]);
  const B6 = num("Video frames", "🎞️", () => {
    const st = ri(0, 2), fps = pick([24, 25, 30, 60]), s = ri(2, 10);
    if (st === 0) return [`A video plays ${fps} frames every second. How many frames are in ${s} seconds?`, fps * s, big("🎞️"), ["Each second holds the same number of frames.", "Multiply the frames per second by the number of seconds.", "Example: 20 frames per second for 3 seconds is 60 frames. Now do yours."]];
    if (st === 1) return [`A clip lasts ${ri(1, 3)} minute${""} at ${fps} frames per second. How many frames?`, 0];
    return [`A game shows ${fps * s} frames and runs at ${fps} frames per second. How many seconds is that?`, s, big("🎮"), ["Frames per second tells how many frames fit in one second.", "Divide the total frames by the frames in one second.", "Example: 120 frames at 30 per second is 120 / 30 = 4 seconds. Now do yours."]];
  }, [], [["Frames", "🎞️", "A video is many still pictures shown fast. Each picture is a <b>frame</b>."], ["FPS", "⏱️", "<b>Frames per second</b> (fps) says how many frames show each second."], ["Math", "🧮", "Frames = fps x seconds."]]);
  // Fix the minutes style properly (re-define B6 make without the placeholder)
  {
    const mk = () => {
      const st = ri(0, 2), fps = pick([24, 25, 30, 60]), s = ri(2, 10);
      if (st === 0) return { text: `A video plays ${fps} frames every second. How many frames are in ${s} seconds?`, visual: big("🎞️"), answer: fps * s, hints: ["Each second holds the same number of frames.", "Multiply the frames per second by the number of seconds.", "Example: 20 frames per second for 3 seconds is 60 frames. Now do yours."] };
      if (st === 1) { const m = ri(1, 3); return { text: `A clip lasts ${m} minute${m > 1 ? "s" : ""} at ${fps} frames per second. How many frames is that?`, visual: big("📽️"), answer: fps * 60 * m, hints: ["First change the minutes into seconds.", "Multiply seconds by the frames in each second.", "Example: 2 minutes at 10 frames per second is 120 seconds x 10 = 1,200 frames. Now do yours."] }; }
      return { text: `A game shows ${fps * s} frames and runs at ${fps} frames per second. How many seconds is that?`, visual: big("🎮"), answer: s, hints: ["Frames per second tells how many frames fit in one second.", "Divide the total frames by the frames in one second.", "Example: 120 frames at 30 per second is 120 / 30 = 4 seconds. Now do yours."] };
    };
    mk.teach = B6.make.teach;
    B6.make = mk;
  }
  const B7 = num("Megapixels", "📷", () => {
    const [w, h] = pick([[2000, 1500], [4000, 3000], [1000, 1000], [2000, 2000], [3000, 2000], [4000, 2000], [5000, 4000], [2500, 2000], [3000, 3000]]);
    return [`A photo is ${w} pixels wide and ${h} pixels tall. How many megapixels is it? (1 megapixel = 1,000,000 pixels)`, w * h / 1000000];
  }, ["First find the total number of pixels in the picture.", "Pixels = width x height. Then count how many millions that is.", "Example: 2,000 x 1,000 is 2,000,000 pixels, which is 2 megapixels. Now do yours."],
    [["Pixels", "🟦", "A picture is a grid of tiny dots called <b>pixels</b>."], ["Mega", "📏", "<b>Mega</b> means million. 1 megapixel is 1,000,000 pixels."], ["Math", "🧮", "Width x height, then divide by a million."]]);
  const B8 = num("COUNTIFS", "🔎", () => {
    const rows = Array.from({ length: 6 }, () => [pick(["Red", "Blue"]), ri(6, 18) * 5]), t = pick([50, 60, 70]), tm = pick(["Red", "Blue"]);
    const ans = rows.filter(r => r[0] === tm && r[1] > t).length;
    return [`What does =COUNTIFS(A1:A6,"${tm}",B1:B6,"&gt;${t}") show?`, ans, code(rows.map((r, i) => `${i + 1}: ${r[0]}  ${r[1]}`))];
  }, ["COUNTIFS counts only the rows where BOTH rules are true.", "Go down the rows one by one. Count a row only if the label matches and the number passes too.", "Example: rows Red 80, Blue 90, Red 40 with rules Red and above 50. Only the first row passes both, so the count is 1. Now do yours."],
    [["COUNTIFS", "🔎", "<b>COUNTIFS</b> counts rows that pass two or more rules at once."], ["Both rules", "✅", "A row counts only if <b>every</b> rule is true for it."], ["Tip", "💡", "Tick each row that passes. Then count the ticks."]]);
  const B9 = num("Simple interest", "🏦", () => {
    const P = pick([100, 200, 300, 400, 500, 1000]), r = pick([2, 4, 5, 10]), t = ri(2, 5);
    return [`You save $${P} at ${r}% simple interest per year. How many dollars of interest do you earn in ${t} years?`, P * r * t / 100];
  }, ["Simple interest earns the same amount each year.", "Find the interest for one year first, then multiply by the number of years.", "Example: $200 at 5% for 3 years. One year earns $10, so 3 years earn $30. Now do yours."],
    [["Interest", "🏦", "<b>Interest</b> is extra money a bank pays you for saving with them."], ["One year", "📅", "One year of interest = savings x rate / 100."], ["Many years", "🧮", "With <b>simple</b> interest, multiply the one-year amount by the years."]]);
  const B10 = mc("Pick the function", "📊", [
    "Which function looks up a matching row in a table?|VLOOKUP|ROUND|TODAY",
    "Which function gives the length of a text?|LEN|SUM|MAX",
    "Which function turns text into capital letters?|UPPER|LEN|ROUND",
    "Which function counts the cells that are not empty?|COUNTA|MAX|AVERAGE",
    "Which function gives a random number between 0 and 1?|RAND|ROUND|TODAY",
    "Which function rounds a number to chosen decimals?|ROUND|LEN|UPPER",
    "Which function shows the current date?|TODAY|RAND|UPPER",
    "Which function finds the smallest value?|MIN|MAX|LEN"],
    ["Say the job in your own words, then think of a short English word for it.", "Function names are short, and the name often looks like the job it does.", "Example: to join pieces of text you would use CONCAT, a short form of concatenate. Now pick yours."],
    [["Functions", "📊", "A <b>function</b> is a ready-made tool inside a spreadsheet."], ["Names", "🔤", "Many names are short forms: <b>MIN</b> minimum, <b>LEN</b> length."], ["Finding", "🔍", "When unsure, type = and the first letters. The sheet suggests matches."]]);
  const B11 = num("Nested function calls", "🪆", () => {
    const a = ri(1, 9), m = ri(2, 5), k = ri(2, 8), ord = ri(0, 1);
    const lines = ["def f(x):", `  return x + ${a}`, "def g(x):", `  return x * ${m}`, ord ? `print(g(f(${k})))` : `print(f(g(${k})))`];
    return ["What does this program print?", ord ? (k + a) * m : k * m + a, code(lines)];
  }, ["Work from the INSIDE out. The inner call runs first.", "Find the inside answer, then feed that result into the outer function.", "Example: with p(x) = x + 1 and q(x) = x * 3, q(p(4)) is q(5) = 15. Now do yours."],
    [["Nesting", "🪆", "<b>f(g(3))</b> means: run g(3) first, then give its result to f."], ["Inside out", "➡️", "Always start with the innermost brackets."], ["Check", "✅", "Write each step on its own line."]]);
  const B12 = num("Count loop trips", "🔁", () => {
    const a = ri(0, 4), s = ri(2, 5), n = ri(4, 10), b = a + s * n - ri(0, s - 1), cnt = Math.ceil((b - a) / s), last = a + (cnt - 1) * s;
    const c = code([`for i in range(${a}, ${b}, ${s}):`, "  print(i)"]);
    return ri(0, 1) ? [`How many numbers does this loop print?`, cnt, c] : ["What is the LAST number this loop prints?", last, c];
  }, ["The third number in range is the step. It tells you how much i grows each time.", "List the values: start, then add the step again and again, and stop before the end number.", "Example: range(1, 10, 3) gives 1, 4, 7. It has 3 numbers and the last is 7. Now do yours."],
    [["Step", "👣", "<b>range(start, stop, step)</b> counts up by <b>step</b> each time."], ["Stop", "🛑", "It stops before the <b>stop</b> number, never on it."], ["Listing", "📝", "Write the numbers out, then count them or find the last."]]);
  const B13 = num("Linear search steps", "🔦", () => {
    const l = uniq(8, 10, 99), found = Math.random() < 0.8, idx = ri(0, 7);
    const t = found ? l[idx] : pick([5, 6, 7, 8, 100, 101]);
    return [found ? `A program checks each item from left to right and stops when it finds ${t}. How many items does it check?` : `A program checks each item from left to right, looking for ${t}. The value is not in the list. How many items does it check?`, found ? idx + 1 : 8, big("[" + l.join(", ") + "]", 1.1)];
  }, ["Linear search looks at the items one by one, starting at the left.", "Count the items you look at, including the one that matches. If it is missing, you look at them all.", "Example: in [7, 3, 9, 2] searching for 9, you check 7, 3 and 9. Now do yours."],
    [["Linear search", "🔦", "<b>Linear search</b> checks items one at a time from the start."], ["Found it", "✅", "Stop as soon as you find the target. Count that item too."], ["Not there", "❌", "If it is missing, you check every item before you can say so."]]);
  const B14 = mc("Local and global variables", "📦", [
    "A variable made inside a function is usually...|Local, only usable inside that function|Global everywhere|Deleted by the keyboard",
    "A global variable can be seen...|Throughout the whole program|Only in one line|Never",
    "Two functions each have a local variable named count. They are...|Separate, with no clash|The same variable|An error always",
    "After a function ends, its local variables...|Disappear|Stay forever on the screen|Become global",
    "Why is it good to keep variables local?|Fewer surprises from other code changing them|The code is longer|It uses less keyboard",
    "A variable defined at the top of the file, outside functions, is usually...|Global|Local|Frozen",
    "A function tries to use a variable that only exists inside another function. What happens?|An error, the name is not defined|It works fine|The computer restarts",
    "A parameter like x in def f(x) is...|A local name that receives a value|A global password|A file"],
    ["Think about where in the program a name can be used.", GEN[1], "Example: a note on your desk is only for you, while a poster on the wall is for the whole room. Names in code can work like that. Now pick yours."],
    [["Scope", "📦", "<b>Scope</b> is the part of a program where a name can be used."], ["Local", "🏠", "A <b>local</b> variable lives inside one function and vanishes when it ends."], ["Global", "🌍", "A <b>global</b> variable is made outside functions and the whole program can see it."]]);
  const B15 = mc("Public and private keys", "🗝️", [
    "With public-key encryption, the key you share with everyone is the...|Public key|Private key|Spare key",
    "The key you must never share is the...|Private key|Public key|Website key",
    "Anyone can use your public key to...|Lock a message so only you can read it|Read your private messages|Log in as you",
    "Only your private key can...|Unlock messages sent to you|Be posted online|Be copied by anyone",
    "Why is public-key encryption useful?|People can send secrets without first meeting to swap a secret|It works without math|It makes files bigger",
    "A padlock in the browser address bar shows...|The connection is encrypted|The site is always safe|The site is free",
    "If you lose your private key, you...|Can no longer read messages locked for you|Can still read everything|Get a new internet",
    "Encryption that uses one shared secret key is called...|Symmetric encryption|Public-key encryption|No encryption"],
    ["Think about a mailbox that anyone can drop letters into but only one person can open.", GEN[1], "Example: a padlock you hand out open, but only you hold the key to unlock it. Now pick yours."],
    [["Two keys", "🗝️", "Public-key encryption gives each person a <b>public key</b> and a <b>private key</b>."], ["How it works", "🔒", "Anyone can lock a message with your public key. Only your private key unlocks it."], ["Keep safe", "🛡️", "Share the public key freely. Never share the private key."]]);
  const B16 = mc("Open source and licenses", "📜", [
    "Open-source software means its code is...|Available for people to read and often improve|Hidden forever|Only for adults",
    "A license tells you...|What you may and may not do with something|How fast it runs|The weather",
    "Creative Commons licenses let creators...|Share their work with set rules|Hide work|Delete work",
    "If a photo says 'CC BY', you must...|Give credit to the creator|Pay a fine|Change its color",
    "Copyright protects...|The creator's rights over their work|Your password|Your wifi",
    "A picture online with no license usually means...|You should ask before using it|It is free for everyone|It has no owner",
    "Public domain works are...|Free for anyone to use|Secret|Only for schools",
    "Why do many developers share code as open source?|Others can learn, fix bugs and build on it|To make bugs bigger|To avoid being seen"],
    ["Think about the rules that come with sharing and using other people's work.", GEN[1], "Example: a song might say 'free to use if you credit the artist'. That rule is the license. Now pick yours."],
    [["License", "📜", "A <b>license</b> says how others may use a piece of work."], ["Open source", "🔓", "<b>Open-source</b> code can be read, used and improved by anyone who follows its license."], ["Credit", "🏷️", "Many free licenses ask you to name the creator."]]);
  const B17 = mc("Wireless connections", "📶", [
    "Which wireless tech connects earbuds to a phone over a few meters?|Bluetooth|Ethernet|Fiber",
    "Which uses towers to give phone data across a wide area?|Cellular (4G or 5G)|Bluetooth|USB",
    "Which connects your laptop to a home router without a cable?|Wi-Fi|An Ethernet cable|HDMI",
    "Which is usually the steadiest connection for a gaming desktop?|A wired Ethernet cable|Weak Wi-Fi|Bluetooth",
    "Wi-Fi usually gets weaker when you...|Move far from the router|Sit close to it|Turn on a lamp",
    "NFC lets a phone pay by...|Tapping very close to a reader|Calling a number|Typing a long code",
    "What is a hotspot?|A device sharing its internet connection|A hot computer|A game level",
    "Why is open public Wi-Fi without a password risky?|Others may spy on unprotected traffic|It is too fast|It uses less data"],
    ["Think about the distance and the job: sharing a connection, paying, or listening.", GEN[1], "Example: a TV remote works across a room, but a phone call can travel for miles. Different wireless types cover different distances. Now pick yours."],
    [["Wireless", "📶", "Wireless means data travels through the air as radio waves."], ["Ranges", "📏", "<b>Bluetooth</b> is short range. <b>Wi-Fi</b> covers a building. <b>Cellular</b> covers whole regions."], ["Wired", "🔌", "A cable is often faster and steadier than any wireless link."]]);
  const B18 = mc("Version control words", "🌿", [
    "In Git, a commit is...|A saved snapshot of your project|A deleted file|A virus",
    "A branch is...|A separate line of work you can try ideas in|A tree|A password",
    "Merge means...|Combining changes from one branch into another|Erasing history|Printing",
    "What does a repository hold?|A project and the history of its changes|Only photos|Only passwords",
    "A good commit message says...|What changed and why|Nothing|Everything in capital letters",
    "Why make a branch for a new feature?|You can test without breaking the main code|It copies the internet|It speeds up the keyboard",
    "A merge conflict happens when...|Two changes touch the same lines and you must choose|The computer is angry|The internet is off",
    "Git lets you...|Go back to an earlier version|Make time pass|Type faster"],
    ["Think about saving your work in steps so you can go back.", GEN[1], "Example: a writer keeps drafts 1, 2 and 3 so an old idea is never lost. Version control does the same for code. Now pick yours."],
    [["Repository", "🗃️", "A <b>repository</b> stores your project and every saved change."], ["Commit and branch", "🌿", "A <b>commit</b> saves a snapshot. A <b>branch</b> is a safe side path for new ideas."], ["Merge", "🔀", "When a branch works well, you <b>merge</b> it back into the main line."]]);
  const L20 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18,
    MIX("Mixed practice", B1, B4, B5, B7, B8, B9, B11, B12, B13, B6),
    MIX("Level 20 Challenge", B2, B3, B10, B14, B15, B16, B17, B18, B5, B12)];

  // =============== LEVEL 21 ===============
  const C1 = ty("Type an in-text citation", "Type this line. Keep the brackets and commas.",
    ["(Garcia, 2020, p. 45)", "As Patel (2018) explains, practice builds skill.", "The study found steady growth (Nguyen, 2022).", "(Brown & Davis, 2017)", "According to the report (Kim, 2023, p. 8), usage doubled.", "(Lopez et al., 2021)", "The author argues for change (Reyes, 2016, p. 112).", "(Miller, 2015)", "Smith (2019) agrees with this view."],
    ["Citations use brackets, names, years and commas. Type each part with care.", "It has {w} chunks and starts with \"{f}\". Round brackets use Shift with 9 and 0.", "Example: for <b>(Cruz, 2014, p. 9)</b> type the bracket, the name, a comma, the year, a comma, p, a dot and 9, then the bracket. Now type yours."],
    [["Citing", "📚", "An <b>in-text citation</b> tells the reader which source an idea came from."], ["Format", "🧩", "Often: <b>(Author, Year)</b>, or with a page: <b>(Author, Year, p. 5)</b>."], ["Why", "🏷️", "Giving credit is honest and lets readers check your sources."]]);
  const C2 = ty("Type math with symbols", "Type this math line exactly.",
    ["a^2 + b^2 = c^2", "y = 3x + 7", "(x + 4) * 2 = 18", "area = pi * r^2", "50% of 80 = 40", "x >= 10 && y <= 20", "5 * (6 - 2) / 4 = 5", "3^3 = 27", "v = d / t"],
    ["On a keyboard, * means times, / means divide and ^ means power. Type each mark carefully.", "It has {w} chunks and starts with \"{f}\". The caret ^ is Shift with 6 and * is Shift with 8.", "Example: for <b>2^4 = 16</b> type 2, the caret, 4, then the equals sign and 16. Now type yours."],
    [["Math on a keyboard", "➗", "Use <b>*</b> for times, <b>/</b> for divide and <b>^</b> for power."], ["Brackets", "🧱", "Brackets show which part to work out first."], ["Spaces", "⌨️", "Spaces help you read, but keep your rhythm."]]);
  const C3 = ty("Type Git commands", "Type this command exactly.",
    ["git add .", "git commit -m \"fix typo\"", "git status", "git branch new-menu", "git checkout main", "git merge new-menu", "git log --oneline", "git pull origin main", "git push origin main"],
    ["Commands must be exact. A missing letter or space changes the meaning.", "It has {w} chunks and starts with \"{f}\". Two dashes are the key right of 0 pressed twice.", "Example: for <b>git diff</b> type git, a space and diff. Now type yours."],
    [["Git", "🌿", "<b>Git</b> is a tool that tracks changes to code."], ["Commands", "⌨️", "You type short commands like <b>git add</b> and <b>git commit</b>."], ["Exact", "🎯", "Commands do exactly what you type, so check before pressing Enter."]]);
  const C4 = num("Transcribing a talk", "🎙️", () => {
    const [ws, wt] = pick([[120, 30], [120, 40], [120, 60], [120, 20], [150, 30], [150, 50], [150, 25], [150, 75]]), m = ri(2, 12);
    return [`A speaker talks at ${ws} words per minute for ${m} minutes. You type at ${wt} WPM and type every word. How many minutes does it take you?`, ws * m / wt];
  }, ["First find how many words the speaker says in total.", "Then divide the total words by your typing speed.", "Example: 100 words per minute for 3 minutes is 300 words. Typing at 50 WPM takes 300 / 50 = 6 minutes. Now do yours."],
    [["Transcribing", "🎙️", "To <b>transcribe</b> is to type out spoken words."], ["Speed gap", "⚖️", "Most people talk faster than they type, so typing takes longer."], ["Method", "➗", "Minutes to type = total words / your WPM."]]);
  const C5 = num("Weighted average", "⚖️", () => {
    const w = pick([20, 30, 40, 50, 60, 70]), a = ri(6, 10) * 10;
    let b; do b = ri(6, 10) * 10; while (b === a);
    return [`Quizzes count ${w}% of a final grade and the project counts ${100 - w}%. The quiz average is ${a} and the project score is ${b}. What is the final grade?`, (w * a + (100 - w) * b) / 100];
  }, ["Each part counts for a different share of the grade.", "Turn each percent into a share, multiply it by that score, then add the two results.", "Example: tests 50%, homework 50%, scores 80 and 100. Half of 80 is 40 and half of 100 is 50, so 90. Now do yours."],
    [["Weights", "⚖️", "In a <b>weighted average</b>, some scores count more than others."], ["Method", "🧮", "Multiply each score by its share, then add them."], ["Example", "📘", "Tests 70% with 80, project 30% with 100: 56 + 30 = 86."]]);
  const C6 = num("LARGE in a sheet", "🥇", () => {
    const l = uniq(7, 10, 99), k = ri(2, 4), s = l.slice().sort((x, y) => y - x);
    return [`In a column A1:A7, what does =LARGE(A1:A7,${k}) show?`, s[k - 1], big("[" + l.join(", ") + "]", 1.1)];
  }, ["LARGE ranks the numbers from the biggest down. The second number says which place you want.", "Sort the list from biggest to smallest and count down to the place asked for.", "Example: for 12, 40, 7, 25, LARGE(...,2) ranks 40, 25, 12, 7 and takes the second, which is 25. Now do yours."],
    [["LARGE", "🥇", "<b>=LARGE(range, k)</b> gives the k-th biggest number."], ["SMALL", "🥉", "<b>=SMALL(range, k)</b> gives the k-th smallest."], ["Tip", "💡", "Write the list in order first, then pick by place."]]);
  const C7 = num("Break-even point", "⚖️", () => {
    const p = pick([3, 4, 5, 6]), c = pick([1, 2]), u = ri(2, 12) * 5, F = (p - c) * u;
    return [`A stand sells cups for $${p} each. Each cup costs $${c} to make. Setting up the stand costs $${F}. How many cups must it sell to break even?`, u];
  }, ["Break even means the money earned equals the money spent.", "Find the profit on one cup, then see how many of those profits cover the setup cost.", "Example: setup $60, each cup earns $4 profit after costs. 60 / 4 = 15 cups. Now do yours."],
    [["Break-even", "⚖️", "The <b>break-even point</b> is when you have earned back everything you spent."], ["Profit each", "💲", "Profit per item = selling price - cost to make."], ["Then divide", "➗", "Cups needed = setup cost / profit per cup."]]);
  const C8 = mc("Data validation", "✅", [
    "Data validation in a sheet can...|Limit what can be typed into a cell|Delete a sheet|Print faster",
    "A dropdown list in a cell helps because...|Everyone picks from the same spellings|It is prettier only|It saves electricity",
    "A rule allows only whole numbers from 1 to 10. Which entry is rejected?|15|7|3",
    "'Garbage in, garbage out' means...|Bad input data gives bad results|Garbage makes data|Computers throw data away",
    "A date cell should accept...|Only valid dates|Any emoji|Nothing",
    "Typing 'N/A' in a column of ages can break a formula because...|It is text, not a number|It is too short|Sheets dislike letters always",
    "Which is a good check for an email form?|Make sure there is an @ sign|Allow only the letter Z|Allow anything or nothing",
    "A drop-down for Yes or No prevents...|Typos like 'Yse'|Using the keyboard|Saving"],
    ["Think about mistakes that can happen when many people type into the same sheet.", GEN[1], "Example: a form that only accepts a month from 1 to 12 stops someone typing 13. Rules like that keep data clean. Now pick yours."],
    [["Validation", "✅", "<b>Data validation</b> checks what goes into a cell before it is accepted."], ["Why", "🧼", "Clean input means correct sums, charts and searches."], ["Tools", "📋", "Drop-down lists, number ranges and date checks are common rules."]]);
  const C9 = num("Filter a list", "🧪", () => {
    const arr = Array.from({ length: 6 }, () => ri(1, 30)), st = ri(0, 2);
    const list = `nums = [${arr.join(", ")}]`;
    if (st === 0) { const T = ri(8, 22); return ["What does this program print?", arr.filter(n => n > T).length, code([list, "count = 0", "for n in nums:", `  if n > ${T}:`, "    count = count + 1", "print(count)"]), ["The loop only adds 1 when the if rule is true.", "Check each number against the rule and tick the ones that pass. Count the ticks.", "Example: nums [3, 9, 12] with rule n > 8: 9 and 12 pass, so the count is 2. Now do yours."]]; }
    if (st === 1) return ["What does this program print?", sumTo(arr.filter(n => n % 2 === 0)), code([list, "total = 0", "for n in nums:", "  if n % 2 == 0:", "    total = total + n", "print(total)"]), ["n % 2 == 0 asks if n is even.", "Find the even numbers in the list and add only those.", "Example: nums [3, 8, 5, 4] has the even numbers 8 and 4, which add to 12. Now do yours."]];
    const T = ri(8, 18); return ["What does this program print?", sumTo(arr.filter(n => n > T)), code([list, "total = 0", "for n in nums:", `  if n > ${T}:`, "    total = total + n", "print(total)"]), ["The loop only adds a number when the if rule is true.", "Pick the numbers that pass the rule, then add them together.", "Example: nums [2, 9, 14] with rule n > 8: 9 and 14 pass, and 9 + 14 = 23. Now do yours."]];
  }, [], [["Filtering", "🧪", "An <b>if</b> inside a loop lets the program pick only the items it wants."], ["Count or add", "➕", "Inside the if you can add 1 to a counter or add the number to a total."], ["Trace", "📝", "Check each number in turn and note whether it passes."]]);
  const C10 = num("Stack or queue", "🥞", () => {
    const isS = Math.random() < 0.5, n = ri(3, 5), v = uniq(n, 1, 30), k = ri(2, n - 1);
    const last = isS ? v[n - k] : v[k - 1];
    return [isS ? `A stack gets these values added in order. Then it removes ${k} values from the top. What was the LAST value removed?` : `A queue gets these values added in order. Then it removes ${k} values from the front. What was the LAST value removed?`, last, big("add: " + v.join(", "), 1.1),
      isS ? ["A stack is last in, first out, like a pile of plates.", "The newest value comes off first. List the values in the order they leave.", "Example: add 5, 8, 2 to a stack and remove 2: first 2, then 8. The last removed is 8. Now do yours."]
        : ["A queue is first in, first out, like a line at a shop.", "The oldest value leaves first. List the values in the order they leave.", "Example: add 5, 8, 2 to a queue and remove 2: first 5, then 8. The last removed is 8. Now do yours."]];
  }, [], [["Stack", "🥞", "A <b>stack</b> is <b>last in, first out</b>. The newest item leaves first."], ["Queue", "🚶", "A <b>queue</b> is <b>first in, first out</b>. The oldest item leaves first."], ["Use", "💡", "Undo uses a stack. A printer line uses a queue."]]);
  const C11 = num("Merge two sorted lists", "🔀", () => {
    const v = uniq(6, 1, 40), A = v.slice(0, 3).sort((x, y) => x - y), B = v.slice(3).sort((x, y) => x - y), all = v.slice().sort((x, y) => x - y), k = ri(2, 5);
    return [`Two sorted lists are merged into one sorted list. What is item number ${k} of the merged list (counting from 1)?`, all[k - 1], big("[" + A.join(", ") + "]<br>[" + B.join(", ") + "]", 1.1)];
  }, ["Merging picks the smallest front item each time from the two lists.", "Write the merged list in order from smallest to biggest, then count to the place asked for.", "Example: [2, 9] and [4, 6] merge to [2, 4, 6, 9]. Item 3 is 6. Now do yours."],
    [["Merging", "🔀", "To <b>merge</b> two sorted lists, repeatedly take the smaller front item."], ["Result", "📋", "The merged list is also sorted."], ["Used in", "🧩", "Merge sort splits lists, sorts the halves and merges them back."]]);
  const C12 = mc("Smart devices and sensors", "🏠", [
    "A sensor in a thermostat measures...|Temperature|Spelling|The color of the door",
    "A smart device that connects to the internet to share data is part of the...|Internet of Things|Typing test|Paper network",
    "A small computer inside a microwave or washing machine is called...|An embedded system|A laptop|A supercomputer",
    "What does an actuator do?|Makes something move or switch, like a motor|Only measures light|Stores photos",
    "A motion sensor turns on a hallway light. This is...|Input from a sensor causing an output|A virus|Random luck",
    "Why can smart devices be a security risk?|They may have weak passwords or old software|They are too cold|They have no power",
    "What should you change on a new smart camera or speaker?|The default password|Its color|The room",
    "A fitness band counting steps uses...|A motion sensor|A printer|A power cable"],
    ["Think about devices that sense something and then do something.", GEN[1], "Example: an automatic door senses a person and then opens. Sensing, deciding and acting is the pattern. Now pick yours."],
    [["Sensors", "📡", "A <b>sensor</b> measures the world: heat, light, motion or sound."], ["IoT", "🏠", "The <b>Internet of Things</b> is everyday objects with sensors that connect online."], ["Safety", "🔐", "Change default passwords and keep device software updated."]]);
  const C13 = num("Data plan math", "📱", () => {
    if (Math.random() < 0.5) { const g = pick([10, 12, 15, 20, 24, 30]), u = pick([1, 2, 3]); return [`A phone plan has ${g} GB each month. Streaming video uses ${u} GB per hour. How many full hours can you stream before the data runs out?`, Math.floor(g / u), "📱", ["Each hour uses the same amount of data.", "Divide the plan size by the data used per hour, and keep only the whole hours.", "Example: 10 GB with 3 GB per hour gives 3 whole hours, because 3 more hours would need 9 and a bit is left over. Now do yours."]]; }
    const d = pick([2, 3, 4]), days = ri(2, 7), g = pick([20, 30, 40]), used = g - d * days;
    return [`A plan has ${g} GB. You have already used ${used} GB and use about ${d} GB each day. How many days of data are left?`, days, "📱", ["First find how much data is still left.", "Divide the data left by the data you use per day.", "Example: 30 GB plan, 12 GB used, 3 GB per day: 18 left, and 18 / 3 = 6 days. Now do yours."]];
  }, [], [["Data caps", "📱", "Many plans give a fixed number of <b>GB</b> per month."], ["Streaming", "🎬", "Video uses the most data. Wi-Fi does not count against your cap."], ["Plan ahead", "🧮", "Data left = plan - used. Days left = data left / daily use."]]);
  const C14 = mc("Training and test data", "🧠", [
    "Why do we split data into training and test sets?|To check the model on data it has not seen|To make the data smaller only|To hide the data",
    "Training data is used to...|Teach the model patterns|Show the final score|Print results",
    "A model that does great on training data but badly on new data has...|Overfitting|Cooling|Rebooting",
    "If all training photos are sunny days, the model may fail on...|Rainy-day photos|Sunny-day photos|Nothing",
    "Why does biased training data matter?|The model can treat some groups unfairly|The model gets faster|It costs nothing",
    "A label in training data is...|The correct answer attached to an example|A sticker on the screen|A password",
    "More varied, good-quality data usually makes a model...|More reliable|Worse|Louder",
    "Who should check an AI's important results?|A human who can spot mistakes|No one|Only the AI"],
    ["Think about how a student studies and then takes a test with new questions.", GEN[1], "Example: if you only practice the exact questions you will see, a test with new questions may surprise you. Models face the same problem. Now pick yours."],
    [["Two sets", "🧠", "<b>Training data</b> teaches the model. <b>Test data</b> checks it on new examples."], ["Labels", "🏷️", "Labeled examples include the correct answer so the model can learn from them."], ["Fair data", "⚖️", "Varied, balanced data helps the model work well for everyone."]]);
  const C15 = mc("Common cyber attacks", "🛡️", [
    "Trying thousands of passwords until one works is called...|Brute force|Phishing|Backup",
    "A DDoS attack tries to...|Flood a site with traffic so it cannot respond|Steal a pencil|Update the site",
    "Typing tricky code into a form to fool a database is called...|Injection|Compression|Scrolling",
    "Keeping software updated helps because updates...|Fix security holes|Make icons bigger|Slow things on purpose",
    "A firewall...|Blocks unwanted network traffic|Fixes spelling|Prints pages",
    "Reusing one password everywhere is risky because...|One leak can open many accounts|Passwords wear out|Sites charge for it",
    "A zero-day is...|A flaw nobody has fixed yet|A school holiday|A password length",
    "Ransomware...|Locks your files until money is paid|Cleans a disk|Plays music"],
    ["Think about what the attacker wants and how the defense stops it.", GEN[1], "Example: a lock on a door keeps strangers out, and an update is like fixing a broken lock. Now pick yours."],
    [["Attacks", "🛡️", "Attackers try to guess, flood, trick or lock systems."], ["Defenses", "🔒", "Strong unique passwords, updates, firewalls and backups protect you."], ["Report", "📣", "If something looks wrong, tell a trusted adult and stop clicking."]]);
  const C16 = mc("Reading terms of service", "📄", [
    "Terms of service are...|The rules you agree to when using a service|A game level|A phone plan",
    "Why read a privacy policy?|It says what data they collect and share|It hides secrets|It is a joke",
    "A free app asks for your contacts and location. What should you ask?|Does it really need these?|How loud is it?|Is it blue?",
    "A person under a site's age limit should...|Ask a parent and follow the age rule|Lie about their age|Make a secret account",
    "Clicking 'I agree' means...|You accept the rules|Nothing happens|You cancel",
    "'We may share your data with partners' means...|Your information might go to other companies|Your data is erased|Nothing leaves",
    "Where can you usually find how to delete your account?|In the settings or help pages|Under the keyboard|Nowhere ever",
    "A short summary of terms is helpful because...|Long legal text is hard to read|Summaries are always wrong|No one writes terms"],
    ["Think about what you promise when you start using a service, and what they promise back.", GEN[1], "Example: before borrowing a library book you agree to return it on time. Terms of service are rules like that. Now pick yours."],
    [["Terms", "📄", "<b>Terms of service</b> are the rules for using an app or site."], ["Privacy policy", "🔍", "It explains what data is collected, why, and who gets it."], ["Smart habits", "✅", "Follow age limits, ask a trusted adult, and share as little as you can."]]);
  const C17 = mc("The digital divide", "🌍", [
    "The digital divide is the gap between people who...|Have good access to technology and those who do not|Like games and those who do not|Use red or blue",
    "Which can cause the digital divide?|Cost, location, or lack of skills|Weather on Tuesdays|Too many keyboards",
    "A library offering free computers helps by...|Giving access to people without devices|Selling devices|Closing early",
    "Why is slow internet in remote areas a problem?|It makes study, work and finding information harder|It makes the sun hotter|Nothing changes",
    "Which helps close the gap?|Low-cost internet and digital skills classes|Raising prices|Hiding technology",
    "Websites that work with screen readers help...|People with low vision|Only gamers|Nobody",
    "Which is an example of a digital skill?|Judging if a website is trustworthy|Folding paper|Painting a fence",
    "Offline-friendly apps help people who...|Have little or no internet|Have too much internet|Hate apps"],
    ["Think about who can easily use technology and who finds it hard.", GEN[1], "Example: a village with no internet cannot easily use online lessons, while a city with fast internet can. Now pick yours."],
    [["Gap", "🌍", "Not everyone has the same access to devices, internet or skills."], ["Causes", "💰", "Cost, distance, age, disability and lack of training all play a part."], ["Solutions", "🤝", "Public computers, cheaper plans, training and accessible design shrink the gap."]]);
  const C18 = cu("Run-length encoding", () => {
    const L = uniq(3, 0, 25).map(i => String.fromCharCode(65 + i)), cnt = L.map(() => ri(1, 6));
    const enc = L.map((c, i) => c + cnt[i]).join("");
    if (Math.random() < 0.5) {
      const raw = L.map((c, i) => c.repeat(cnt[i])).join("");
      return { text: "Run-length encoding writes each letter followed by how many times it repeats. For example AAABB becomes A3B2. How many characters long is the encoded version of this text?", visual: big(raw, 1.6), answer: 6, hints: ["Each group of the same letter becomes a letter and a number.", "Count the groups of repeated letters. Each group takes two characters.", "Example: CCCDDEEEE has 3 groups, so it becomes C3D2E4 with 6 characters. Now do yours."] };
    }
    return { text: "Run-length encoding stores each letter then how many times it repeats. How many letters are in the text before encoding?", visual: big(enc, 1.8), answer: sumTo(cnt), hints: ["Each number tells how many times the letter before it repeats.", "Add up all the numbers in the code.", "Example: X2Y4 stands for XXYYYY, which is 2 + 4 = 6 letters. Now do yours."] };
  }, [], [["Compression", "🗜️", "<b>Run-length encoding</b> shrinks repeated letters: AAAA becomes A4."], ["Decode", "🔓", "A3B2 means AAABB: A three times, B two times."], ["Best for", "🖼️", "It works well when long runs repeat, like flat colors in simple pictures."]]);
  // C18 text-1 answer must be 6 only when exactly 3 groups: the generator always makes 3 distinct letters, but adjacent runs are always different, so encoded length is always 6.
  const L21 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18,
    MIX("Mixed practice", C1, C4, C5, C6, C7, C9, C10, C11, C13, C18),
    MIX("Level 21 Challenge", C2, C3, C8, C12, C14, C15, C16, C17, C5, C10)];

  Object.assign(TYPING_LEVELS, { 19: L19, 20: L20, 21: L21 });
})();
