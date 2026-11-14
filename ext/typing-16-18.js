// ext/typing-16-18.js  Mind Lab Typing & Computers, levels 16-18 (60 lessons)
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
  const nb = n => String(n).replace(/ /g, "&nbsp;");

  // =============== LEVEL 16 ===============
  const A1 = ty("Type a sentence with commas", "Type this sentence. Watch every comma.",
    ["studies show that sleep, food, and exercise all help us learn.", "the experiment, which lasted two weeks, produced clear results.", "although it was raining, the team finished the project on time.", "first, read the question; second, plan; finally, write it down.", "when you proofread, read slowly, check each comma, and fix typos.", "the museum, which opened in 1998, has over two thousand objects.", "our group chose a topic, found sources, and wrote an outline.", "however, accuracy matters more than speed when you are learning."],
    ["Pause at each comma, then keep your fingers on the home row.", "There are {w} words and it starts with \"{f}\". The comma is the key right of the M key.", "Example: for <b>first, mix; then, bake.</b>, type the word, a comma, a space, and keep going. Now type yours."],
    [["Commas", "✍️", "A <b>comma</b> separates items in a list and sets off words like <b>however</b> or <b>first</b>."], ["Where is it?", "⌨️", "The comma key sits to the right of <b>M</b>. Use your middle finger."], ["Rhythm", "🎵", "Keep a steady beat. Type the comma and the space without stopping."]], cap);
  const A2 = ty("Type a numbered list", "Type this list exactly, with the numbers and marks.",
    ["1. read chapter 4. 2. finish the quiz. 3. pack my bag.", "1) mix the dough; 2) let it rise; 3) bake it.", "step 1: open the file. step 2: type a title. step 3: save.", "a) 12 b) 15 c) 18 d) 21", "(1) plan (2) draft (3) edit (4) share", "1. warm up 2. type for ten minutes 3. check mistakes.", "tasks: 1) math sheet, 2) read 20 pages, 3) practice typing.", "q1: 24 q2: 36 q3: 48 q4: 60"],
    ["Numbers and punctuation come one after another. Take your time with each pair.", "There are {w} chunks split by spaces and it starts with \"{f}\". Round brackets use Shift with 9 and 0.", "Example: for <b>1) wash 2) dry</b>, type 1, then the bracket mark, a space, wash, a space, then 2 and its bracket. Now type yours."],
    [["Lists", "📝", "Numbered lists put a number and a mark (like <b>1.</b> or <b>1)</b>) before each item."], ["Reach", "🔢", "Use the top number row. Keep your eyes on the screen, not on the keys."], ["Check", "🔍", "After you type, look back at the numbers. They are easy to swap by mistake."]], cap);
  const A3 = num("Time to type a document", "⏱️", () => {
    const wpm = pick([20, 25, 30, 40, 50, 60]), m = ri(2, 12), n = pick(names);
    return [`${n} must type a ${wpm * m}-word essay at a steady ${wpm} WPM. How many minutes will it take?`, m];
  }, ["WPM tells how many words fit in ONE minute. How many one-minute chunks make the whole essay?", "Divide the total words by the words typed per minute.", "Example: 600 words at 30 WPM takes 600 / 30 = 20 minutes. Now do yours."],
    [["Plan your time", "📅", "Knowing your speed lets you guess how long a typing job takes."], ["The math", "➗", "Minutes = <b>total words / WPM</b>."], ["Example", "🧮", "300 words at 50 WPM is 300 / 50 = 6 minutes."]]);
  const A4 = mc("Voice typing", "🎤", [
    "Typing by speaking to the computer is called...|Dictation (speech to text)|Autocorrect|Copy and paste",
    "When you dictate, you often say the punctuation word, such as...|Comma or period|Banana|Backspace",
    "Dictation works best when you...|Speak clearly in a quiet place|Whisper from far away|Talk as fast as you can",
    "After dictating a paragraph, you should...|Proofread it, because it can mishear words|Skip checking|Delete it",
    "Who might use dictation a lot?|Anyone who finds typing hard or wants to rest their hands|Only robots|Nobody",
    "Which pair could dictation easily mix up?|to and too|cat and elephant|red and green",
    "Voice typing is a kind of...|Input, because you give the computer information|Output|Storage",
    "Typing and dictation both...|Turn your ideas into text|Need a mouse|Work with no power"],
    ["Think about how the computer hears you, and what it might get wrong.", "Speech to text is helpful but not perfect. Ask what you must do before you hand the work in.", "Example: if you dictate \"I want too go\", the computer heard the sound right but chose the wrong spelling. Now pick yours."],
    [["Dictation", "🎤", "<b>Dictation</b> changes your spoken words into typed text."], ["Say the marks", "🗣️", "You often have to say <b>comma</b>, <b>period</b> or <b>new line</b> out loud."], ["Always proofread", "🔍", "Sound-alike words such as <b>there</b> and <b>their</b> get mixed up, so check your text."]]);
  const A5 = num("Running totals", "➕", () => {
    const v = Array.from({ length: 5 }, () => ri(5, 20)), k = ri(3, 5);
    return [`Column A lists the minutes practiced each day. Column B is a running total (B1 is A1, B2 is B1 + A2, and so on). What does B${k} show?`, sumTo(v.slice(0, k)), big("A: " + v.join(", "), 1.2)];
  }, ["A running total adds each new number on top of everything before it.", "Add the numbers in column A from the first one down to the row you are asked about. Stop there.", "Example: for 4, 6, 5 the running totals are 4, 10, 15. Now work out yours."],
    [["Running total", "📈", "A <b>running total</b> keeps adding as you go down the column."], ["The formula", "🧮", "In B2 you type <b>=B1+A2</b>. Copy it down and each row builds on the one above."], ["Why?", "💡", "It shows growth, like how many minutes you have practiced so far."]]);
  const A6 = cu("Look up in a table", () => {
    const nm = shuf(["Ana", "Ben", "Cy", "Dee", "Eli", "Flo"]).slice(0, 5);
    const rows = nm.map(n => [n, ri(11, 15), ri(20, 99)]);
    const r = pick(rows), c = pick([2, 3]);
    const ans = r[c - 1];
    const tbl = code(rows.map(x => `${nb(x[0].padEnd(4, " "))}${x[1]}&nbsp;&nbsp;${x[2]}`));
    return { text: `The table is in cells A1:C5 (name, age, score). What does =VLOOKUP("${r[0]}", A1:C5, ${c}, FALSE) show?`, visual: tbl, answer: ans, hints: ["VLOOKUP finds the name in the first column, then goes across along that row.", `Find the row with the name, then count over to column number ${c}. Column 1 is the name itself.`, "Example: in a table with rows Zed 12 55 and Kay 13 80, looking up Kay with column 3 gives 80. Now do yours."] };
  }, [], [["VLOOKUP", "🔎", "<b>VLOOKUP</b> looks for a value in the first column of a table and returns something from the same row."], ["Four parts", "🧩", "=VLOOKUP(<b>what to find</b>, <b>the table</b>, <b>which column</b>, FALSE). FALSE means an exact match."], ["Count columns", "🔢", "Column 1 is where it searches. Column 2 is the next one over, and so on."]]);
  const A7 = num("Shift bits to double", "↔️", () => {
    const n = ri(3, 20), k = ri(1, 3);
    return [`The number ${n} is written in binary. Now ${k} zero${k > 1 ? "s are" : " is"} added to the end of its binary form. What ordinary number is it now?`, n * Math.pow(2, k), big(n.toString(2) + " + " + "0".repeat(k), 1.5)];
  }, ["In ordinary numbers, adding a zero at the end makes a number 10 times bigger. What does binary use instead of 10?", "Each zero added to the end of a binary number multiplies it by 2. Do that once for each zero.", "Example: 5 is 101 in binary. Adding one zero gives 1010, which is 10, double. Two zeros would be 5 x 2 x 2 = 20. Now do yours."],
    [["Binary place values", "🔟", "In binary every place is worth <b>twice</b> the place to its right."], ["Shift left", "⬅️", "Adding a <b>0</b> on the right slides every digit one place up, which <b>doubles</b> the number."], ["Example", "🧮", "11 in binary is 3. Add a zero: 110 is 6."]]);
  const A8 = num("Hex digits and bits", "🔠", () => {
    if (Math.random() < 0.6) {
      const L = ri(2, 6), s = Array.from({ length: L }, () => "0123456789ABCDEF"[ri(0, 15)]).join("");
      return [`Every hexadecimal digit stands for exactly 4 bits. How many bits does the hex number ${s} hold?`, L * 4, big(s)];
    }
    const d = ri(2, 8);
    return [`How many hexadecimal digits does it take to write a number that is ${d * 4} bits long?`, d, big(d * 4 + " bits", 1.6)];
  }, ["One hex digit holds the same amount of information as a small group of bits.", "Each hex digit equals 4 bits, so multiply or divide by 4 depending on the question.", "Example: the hex number 3F has 2 digits, so 2 x 4 = 8 bits; a 12-bit number needs 12 / 4 = 3 hex digits. Now do yours."],
    [["Why hex?", "🔟", "Long binary numbers are hard to read, so people write them in <b>hexadecimal</b>."], ["4 bits each", "4️⃣", "One hex digit (0-9, A-F) matches exactly <b>4 bits</b>. F is 1111."], ["A byte", "📦", "8 bits is a byte, which is just <b>2 hex digits</b>."]]);
  const A9 = cu("Trace a counting loop", () => {
    const n = ri(3, 8), k = pick([1, 1, 2, 3]);
    let t = 0; for (let i = 1; i <= n; i++) t += i * k;
    return { text: "What does this program print?", visual: code(["total = 0", `for i in range(1, ${n + 1}):`, sp + (k === 1 ? "total = total + i" : `total = total + i * ${k}`), "print total"]), answer: t, hints: ["range(1, N) counts 1, 2, 3 and stops just before N.", "Write down each value of i. Add it (or its multiple) to the total one pass at a time.", "Example: for range(1, 4) with total = total + i, i is 1, 2, 3 and total goes 1, 3, 6. Now do yours."] };
  }, [], [["For loop", "🔁", "<b>for i in range(1, 5)</b> sets i to 1, 2, 3, 4 and then stops. It never reaches 5."], ["Total", "🧮", "The line inside the loop runs once for every value of i, building up the total."], ["Trace it", "👣", "Make a small table of i and total. Fill it row by row."]]);
  const A10 = num("The remainder operator", "➗", () => {
    if (Math.random() < 0.7) {
      const b = ri(3, 9), a = ri(b + 2, 60);
      return [`In many languages, a % b gives the remainder after dividing a by b. What is ${a} % ${b}?`, a % b, big(`${a} % ${b}`)];
    }
    let h, k; do { h = ri(1, 12); k = ri(2, 30); } while ((h + k) % 12 === 0);
    return [`A clock shows ${h} o'clock. Using %, the hour ${k} hours later is (${h} + ${k}) % 12. What hour is it?`, (h + k) % 12, big(`(${h} + ${k}) % 12`, 1.4)];
  }, ["Divide, take away all the full groups that fit, and see what is left over.", "Find the biggest multiple of the second number that does not go over the first number. The leftover is the answer.", "Example: 14 % 4. Four fits 3 times (12), and 14 - 12 = 2 is left over. Now do yours."],
    [["Remainder", "🍕", "<b>%</b> is the remainder after dividing. 7 % 3 is 1, because 3 fits twice (6) with 1 left."], ["Even or odd", "🎯", "<b>n % 2</b> is 0 for even numbers and 1 for odd numbers."], ["Clocks", "🕒", "Clocks wrap around, just like %. After 12 comes 1 again."]]);
  const A11 = cu("One pass of sorting", () => {
    const pass = a => { a = a.slice(); for (let i = 0; i < a.length - 1; i++) if (a[i] > a[i + 1]) { const t = a[i]; a[i] = a[i + 1]; a[i + 1] = t; } return a; };
    for (;;) {
      const a = shuf([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 5);
      const right = pass(a), full = a.slice().sort((x, y) => x - y);
      const one = a.slice(); for (let i = 0; i < 4; i++) if (one[i] > one[i + 1]) { const t = one[i]; one[i] = one[i + 1]; one[i + 1] = t; break; }
      const rev = right.slice(); const t = rev[0]; rev[0] = rev[4]; rev[4] = t;
      const R = right.join(", "), ws = [...new Set([full.join(", "), one.join(", "), a.join(", "), rev.join(", ")].filter(x => x !== R))];
      if (ws.length < 2) continue;
      const w = shuf(ws).slice(0, 2);
      return { text: "A bubble sort pass goes left to right. If a number is bigger than its right neighbor, they swap. What does the list look like after ONE full pass?", visual: big(a.join(", "), 1.4), choices: shuf([R, ...w]), answer: R, hints: ["Look at the first two numbers. Is the left one bigger than the right one?", "Keep moving one step right. Every time the left number is bigger, swap, then compare the next pair. The pass ends at the last pair.", "Example: 3, 1, 2. Compare 3 and 1: swap to 1, 3, 2. Compare 3 and 2: swap to 1, 2, 3. Now do yours."] };
    }
  }, [], [["Sorting", "📶", "<b>Sorting</b> puts items in order. Computers sort names, scores and prices all day."], ["Bubble sort", "🫧", "Compare neighbors. If they are in the wrong order, <b>swap</b> them. Move along the list."], ["One pass", "👉", "One pass often does not finish the job, but the biggest number always bubbles to the end."]]);
  const A12 = mc("Tables in a database", "🗃️", [
    "In a database table, a row holds...|One record, such as one student|One kind of info for everyone|The whole database",
    "A column (field) holds...|One kind of information, such as every name|One whole record|A password",
    "A primary key is...|A value that is unique for each record|The first row only|A secret password",
    "Why give each student an ID number instead of using names alone?|Names can repeat but IDs are unique|IDs look prettier|IDs use less electricity",
    "A spreadsheet and a database table both...|Store information in rows and columns|Need no keyboard|Only hold pictures",
    "A table named Pets has the columns name, type and age. How many fields does each record have?|3|2|4",
    "Asking a database for all pets older than 5 is called a...|Query|Backup|Font",
    "Databases beat one huge spreadsheet when...|Many people and lots of linked data must be kept safe|You have just three numbers|You want to print one page"],
    ["Picture the table like a spreadsheet: which way do rows and columns run?", "Records go across a row. Each kind of fact (field) goes down a column.", "Example: in a table of books with columns title and year, one row is one book, and the column year lists every book's year. Now decide yours."],
    [["Tables", "🗃️", "A database stores information in <b>tables</b>, with <b>rows</b> (records) and <b>columns</b> (fields)."], ["Keys", "🔑", "A <b>primary key</b> is a value, like an ID number, that is different for every record."], ["Queries", "🔎", "A <b>query</b> asks the database a question, such as \"which pets are older than 5?\"."]]);
  const A13 = mc("IP addresses", "🌐", [
    "An IPv4 address has four numbers separated by dots. Each number can be from...|0 to 255|0 to 99|1 to 1000",
    "Which looks like a valid IPv4 address?|192.168.1.20|192.168.1.300|192.168.1",
    "Which is NOT a valid IPv4 address?|10.0.0.256|10.0.0.255|10.20.30.40",
    "Why do 8 bits give numbers from 0 to 255?|2 to the 8th power is 256 patterns, counting from 0|Because 8 times 8 is 64|Because computers like round numbers",
    "The job of DNS is to...|Turn a website name into an IP address|Block ads|Speed up typing",
    "An IP address is like a...|Street address for a device on a network|Password|Screen size",
    "A home router gives each device in the house a...|Private IP address on your network|New keyboard|Bigger battery",
    "IPv6 was created because...|IPv4 addresses were running out|Screens got bigger|Keyboards changed"],
    ["Think about what an address is for, and how many numbers each part can hold.", "One part of an IPv4 address uses 8 bits. Think about the smallest and largest 8-bit values.", "Example: 172.16.0.5 is valid because every part is between the smallest and largest 8-bit value; 172.16.0.999 is not. Now pick yours."],
    [["IP address", "📍", "Every device on a network has an <b>IP address</b>, like <b>192.168.1.20</b>."], ["Four parts", "4️⃣", "Each part is 8 bits, so it goes from <b>0 to 255</b>."], ["DNS", "📖", "<b>DNS</b> is the internet's phone book. It turns a site name into its IP address."]]);
  const A14 = mc("Two-factor sign-in", "🔐", [
    "Two-factor authentication asks for...|Something you know plus something you have|Two passwords you know|Your name twice",
    "Which is a \"something you have\" factor?|A code sent to your phone|Your pet's name|A password you remember",
    "Which is a \"something you know\" factor?|A password|A text-message code|A fingerprint",
    "A fingerprint or face scan counts as something you...|Are|Know|Have",
    "If someone steals your password but you use 2FA, they...|Still need the second factor|Can always get in|Get a new phone",
    "You should share your 2FA code with...|Nobody|A friend who asks|Anyone who says they are support",
    "Authenticator apps make codes that...|Change every half minute or so|Never change|Are the same for everyone",
    "Which account is best to protect with 2FA first?|Your main email, since it can reset other accounts|A trivia site you never visit|A site you use once a year"],
    ["Think about how many different kinds of proof the sign-in asks for.", "Factors come in groups: what you know, what you have, and what you are. Which group does your example belong to?", "Example: a bank card plus a PIN mixes something you have with something you know. Now pick yours."],
    [["Two factors", "🔐", "<b>2FA</b> needs two kinds of proof, so a stolen password alone is not enough."], ["Three kinds", "🧩", "Something you <b>know</b> (password), something you <b>have</b> (phone), something you <b>are</b> (fingerprint)."], ["Never share", "🤫", "A 2FA code is only for you. Real companies never ask you to read it to them."]]);
  const A15 = mc("How free apps make money", "💰", [
    "A free app often makes money by...|Showing ads or selling extras|Sending secret bills|Printing money",
    "If a service is free, you may be paying with...|Your attention and your data|Nothing at all|Your keyboard",
    "In-app purchases are...|Extras you buy inside an app with real money|Free bonus codes|Software updates",
    "A parent should approve in-app purchases because...|They cost real money|They are free|They break the app",
    "Targeted ads are chosen using...|Information about what you do online|Only the weather|Random colors",
    "A subscription means...|You pay again every month or year|You pay once forever|You never pay",
    "Sponsored content on a video or post means...|A company paid for it to be shown|The video is false|The video has no ads",
    "A game that says \"watch an ad for a bonus\" earns money from...|The advertiser who pays for the view|The bonus itself|Your battery"],
    ["Ask yourself who is paying, if you are not.", "Companies must earn money somehow. Think about ads, extras, and information.", "Example: a free puzzle app that shows a video ad between levels earns money from the company that made the ad. Now pick yours."],
    [["Ads", "📣", "Many free apps show <b>ads</b>. Advertisers pay the app maker."], ["Extras", "🛍️", "Others give the basic app free and sell extras with <b>in-app purchases</b>. Always ask a parent first."], ["Your data", "👀", "Some services also use what you do to pick ads. Read what an app asks to see."]]);
  const A16 = mc("Why a computer is slow", "🐢", [
    "Many programs open at once can slow a computer because they share...|Memory (RAM) and the processor|The keyboard|The wallpaper",
    "RAM is...|Short-term memory for programs that are running|Long-term storage for files|A type of screen",
    "Storage like an SSD is...|Where files stay when the power is off|Erased when the power goes off|Only used for sound",
    "A good first step when one app freezes is to...|Close that app or wait, then restart if needed|Press every key hard|Delete the operating system",
    "A tool that shows which programs use the most memory is the...|Task Manager (or Activity Monitor)|Spell checker|Paint program",
    "A nearly full drive can...|Slow things down and stop files from saving|Make files smaller|Make the screen brighter",
    "Restarting a computer helps because it...|Clears memory and stops stuck programs|Buys more RAM|Updates the keyboard",
    "The CPU is...|The processor that does the calculations|The screen|The speaker"],
    ["Think about what a computer shares between all the programs that run on it.", "Running programs live in short-term memory and use the processor. Files live in storage.", "Example: opening 30 browser tabs fills up RAM, so the computer slows down until you close some. Now pick yours."],
    [["Sharing", "🧮", "Every open program uses a bit of the <b>CPU</b> and <b>RAM</b>. Too many at once makes things slow."], ["Look and see", "🔎", "The <b>Task Manager</b> shows what is using the most power so you can close it."], ["Easy fixes", "🔄", "Close unused apps, free up storage, and <b>restart</b> now and then."]]);
  const A17 = num("How many passwords?", "🔢", () => {
    if (Math.random() < 0.6) { const n = ri(2, 5); return [`A PIN uses ${n} digits, and each digit can be 0 to 9. How many different PINs are possible?`, Math.pow(10, n), big("PIN: " + "_ ".repeat(n).trim(), 1.5)]; }
    const n = ri(2, 3); return [`A password is ${n} lowercase letters (a to z, 26 choices for each spot). How many different passwords are possible?`, Math.pow(26, n), big("_ ".repeat(n).trim(), 1.5)];
  }, ["Each spot can be filled in several ways. How many ways for the first spot, the second spot, and so on?", "Multiply the number of choices for each spot together.", "Example: a code of 2 spots with 5 choices each has 5 x 5 = 25 possible codes. Now do yours."],
    [["Counting codes", "🔢", "With <b>n</b> spots and <b>c</b> choices for each, there are c x c x ... (n times) codes."], ["PINs", "📟", "A 3-digit PIN has 10 x 10 x 10 = 1000 possibilities."], ["Longer is stronger", "💪", "Every extra spot multiplies the total, so longer passwords are much harder to guess."]]);
  const A18 = mc("Video call manners", "📹", [
    "Before a video call starts, check that your...|Microphone, camera and internet work|Printer is on|Mouse is blue",
    "When you are not speaking in a group call, it is polite to...|Mute your microphone|Shout hello|Turn up music",
    "A good place for a video call is...|A quiet spot with light in front of your face|A noisy room with a bright window behind you|A dark hallway",
    "If you want to speak in a big call, you can...|Use the raise-hand button or wait for a pause|Talk over everyone|Turn off your internet",
    "Sharing your screen means...|Others can see what is on your screen|Only you can see it|Files are deleted",
    "Recording a call without telling people is...|Not polite, so always ask first|Always fine|Required",
    "Looking at the camera lens instead of the screen makes it feel like you...|Look at the other person|Are asleep|Are far away",
    "Before sharing your screen, you should...|Close private tabs and messages|Open your email|Type your passwords"],
    ["Imagine how the people on the other side see and hear you.", "Good manners on a call make it easier for everyone to hear, see and feel respected.", "Example: muting your microphone while a friend talks stops your background noise from bothering everyone. Now pick yours."],
    [["Be ready", "🎧", "Test your <b>camera, microphone and sound</b> before the call starts."], ["Be polite", "🤝", "<b>Mute</b> when you are not talking. Wait your turn or use <b>raise hand</b>."], ["Be careful", "🔒", "Close private things before <b>sharing your screen</b>, and ask before recording."]]);
  const L16 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18,
    MIX("Mixed practice", A1, A3, A5, A6, A7, A8, A9, A10, A11, A13, A17, A14),
    MIX("Level 16 Challenge", A2, A4, A6, A8, A9, A10, A11, A12, A15, A16, A17, A18)];

  // =============== LEVEL 17 ===============
  const B1 = ty("Type an essay opener", "Type this sentence from an essay.",
    ["in my opinion, school should start later, because teens need more sleep.", "technology has changed how we learn, work, and talk to our friends.", "there are three main reasons why practice matters: time, focus, and feedback.", "although computers are fast, people still decide what they should do.", "to begin with, a good typist keeps their eyes on the screen, not the keys.", "in conclusion, careful typing saves time because you fix fewer mistakes.", "for example, a spreadsheet can add a long column of numbers in a second.", "according to the survey, 62 percent of students use a laptop every day."],
    ["Read a few words ahead so your fingers never have to stop.", "There are {w} words and it starts with \"{f}\". Watch the commas and the colon.", "Example: for <b>in short, practice helps.</b>, type in short, a comma, a space, then practice helps and a period. Now type yours."],
    [["Long sentences", "📄", "Essays use longer sentences with commas and sometimes a colon."], ["Read ahead", "👀", "Look at the next few words while you type the current one. It keeps you smooth."], ["Check", "✅", "Look back at the commas. They are the marks most often forgotten."]], cap);
  const B2 = ty("Type a line of JSON", "Type this data exactly, with every brace, quote and comma.",
    ["{\"pet\": \"dog\", \"legs\": 4}", "{\"game\": \"chess\", \"players\": 2}", "{\"color\": \"red\", \"hex\": \"#ff0000\"}", "{\"name\": \"mia\", \"score\": 95}", "{\"city\": \"paris\", \"country\": \"france\"}", "{\"fruits\": [\"apple\", \"pear\", \"plum\"]}", "{\"ok\": true, \"count\": 12}", "{\"day\": \"monday\", \"minutes\": 30}"],
    ["Curly braces and quotes come in pairs. Type the opener, then the closer.", "It has {n} characters without spaces and starts with \"{f}\". Braces are Shift with the square-bracket keys; quotes are Shift with the apostrophe key.", "Example: for <b>{\"a\": 1}</b>, type a brace, a quote, the letter a, a quote, a colon, 1, and a closing brace. Now type yours."],
    [["JSON", "🧾", "<b>JSON</b> is a way to write data as <b>\"name\": value</b> pairs inside curly braces."], ["Quotes", "💬", "Words go in <b>double quotes</b>. Numbers and true/false do not."], ["Pairs", "🤝", "Every <b>{</b> needs a <b>}</b>, every <b>[</b> needs a <b>]</b>, and every opening quote needs a closing one."]]);
  const B3 = ty("Type a command line", "Type this command exactly.",
    ["cd documents/school", "mkdir new_folder", "ls -a", "cp notes.txt backup.txt", "mv draft.txt final.txt", "cat story.txt", "pwd", "echo hello world"],
    ["Commands must be exact. One wrong letter and the computer will not understand.", "It has {n} characters without spaces and starts with \"{f}\". The underscore is Shift plus the minus key.", "Example: for <b>cd music</b>, type cd, a space, then music. Now type yours."],
    [["The command line", "🖥️", "A <b>command line</b> lets you control the computer by typing short commands."], ["Exact", "🎯", "Spelling, spaces and dashes all matter. <b>cd</b> changes folder, <b>mkdir</b> makes one."], ["No hurry", "🐢", "Accuracy first. Press Enter only after you check the line."]], s => esc(s));
  const B4 = num("Keystrokes per second", "⌨️", () => {
    if (Math.random() < 0.5) { const c = ri(3, 8); return [`A typist makes ${c * 60} keystrokes in one minute. How many keystrokes is that per second?`, c]; }
    const k = ri(2, 6), m = ri(1, 3);
    return [`Another typist hits ${k} keys every second. How many keys is that in ${m} minute${m > 1 ? "s" : ""}?`, k * 60 * m];
  }, ["There are 60 seconds in a minute. Which way do you need to go: seconds to minutes, or minutes to seconds?", "To go from per minute to per second, divide by 60. To go from per second to a number of minutes, multiply by 60 for each minute.", "Example: 120 keys in a minute is 120 / 60 = 2 per second; 3 per second for 2 minutes is 3 x 60 x 2 = 360. Now do yours."],
    [["Rates", "⏱️", "A <b>rate</b> says how much happens in one unit of time."], ["Change units", "🔄", "Per minute to per second: <b>divide by 60</b>. Seconds to minutes: <b>multiply by 60</b>."], ["Typing", "⌨️", "Fast typists often make 5 or more keystrokes every second."]]);
  const B5 = num("Score needed for an average", "🎯", () => {
    for (;;) {
      const T = ri(35, 60), s = Array.from({ length: 4 }, () => T + ri(-9, 9)), a = 5 * T - sumTo(s), n = pick(names);
      if (a >= 20 && a <= 90) return [`${n}'s first four typing tests were ${s.join(", ")} WPM. What must test 5 score to make the average of all five exactly ${T} WPM?`, a];
    }
  }, ["An average is the total divided by how many tests. What total do five tests need to reach the goal?", "First find the total needed (goal x 5). Then take away the four scores you already have.", "Example: three scores 10, 20, 30 and a goal average of 25 over four tests: 25 x 4 = 100, and 100 - 60 = 40. Now do yours."],
    [["Average", "📊", "Average = total / how many. So <b>total = average x how many</b>."], ["Work backwards", "🔙", "Find the total you need, then subtract what you already have."], ["Goal setting", "🎯", "It tells you exactly what you must score next to reach your target."]]);
  const B6 = cu("SUMIF", () => {
    const cats = shuf(["food", "games", "books", "bus"]).slice(0, 3);
    for (;;) {
      const rows = Array.from({ length: 6 }, () => [pick(cats), ri(2, 20)]), tgt = pick(cats);
      const m = rows.filter(r => r[0] === tgt);
      if (!m.length || m.length === 6) continue;
      const tbl = code(rows.map(r => `${nb(r[0].padEnd(6, " "))}${r[1]}`));
      return { text: `Cells A1:B6 hold a category and an amount. What does =SUMIF(A1:A6, "${tgt}", B1:B6) show?`, visual: tbl, answer: sumTo(m.map(r => r[1])), hints: ["SUMIF adds only the amounts whose category matches the word in quotes.", "Go down column A. Each time the word matches, take the amount beside it. Then add those amounts up.", "Example: for rows pens 3, glue 5, pens 4 and the word \"pens\", you add 3 + 4 = 7. Now do yours."] };
    }
  }, [], [["SUMIF", "🧮", "<b>=SUMIF(range, test, sum_range)</b> adds only the rows that pass a test."], ["Read it", "👀", "=SUMIF(A1:A6, \"food\", B1:B6) means: where column A says food, add column B."], ["Why?", "🛒", "It makes totals by category, like spending on food versus games."]]);
  const B7 = cu("Join text in a sheet", () => {
    const f = pick(["Maya", "Leo", "Sam", "Nia", "Omar", "Ella"]), l = pick(["Lee", "Park", "Cruz", "Diaz", "Ford", "Hall"]);
    const forms = [["A1&\" \"&B1", `${f} ${l}`], ["B1&\", \"&A1", `${l}, ${f}`], ["A1&\" \"&A1", `${f} ${f}`], ["B1&\" \"&B1", `${l} ${l}`]];
    const t = pick(forms), others = shuf(forms.filter(x => x !== t)).slice(0, 2);
    return { text: `A1 holds ${f} and B1 holds ${l}. The & sign joins text. What does =${t[0]} show?`, choices: shuf([t[1], ...others.map(x => x[1])]), answer: t[1], hints: ["The & sign sticks pieces of text together, in the order you write them.", "Read the formula from left to right. A space or comma inside quotes is also text that gets added.", "Example: if A1 is red and B1 is fox, =A1&\"-\"&B1 shows red-fox. Now do yours."] };
  }, [], [["Join", "🔗", "The <b>&</b> sign joins text in a formula: <b>=A1&B1</b>."], ["Extra text", "💬", "Put extra text in quotes, like <b>\" \"</b> for a space or <b>\", \"</b> for a comma and space."], ["Order", "🔀", "The pieces come out in the same order you write them."]]);
  const B8 = num("How big is a picture file?", "🖼️", () => {
    const w = pick([10, 20, 30, 40, 50]), h = pick([10, 20, 25, 30]);
    const b = pick([1, 3, 4]);
    return [`A picture is ${w} pixels wide and ${h} pixels tall. Each pixel uses ${b} byte${b > 1 ? "s" : ""}. How many bytes does the picture need?`, w * h * b];
  }, ["Count the pixels first, then think about how much memory each one needs.", "Total bytes = pixels x bytes per pixel. Pixels = width x height.", "Example: a 10 by 5 picture has 50 pixels. At 2 bytes each, that is 100 bytes. Now do yours."],
    [["Pixels", "🟦", "A picture is a grid of pixels. The number of pixels is <b>width x height</b>."], ["Bytes each", "📦", "A plain black-and-white pixel can use 1 byte. Full color often uses <b>3 bytes</b> (red, green, blue). A 4th byte can hold see-through."], ["File size", "📏", "Size = <b>pixels x bytes per pixel</b>. Real files are often compressed to be smaller."]]);
  const B9 = cu("Trace a loop with if", () => {
    const k = pick([2, 3, 4, 5]), N = ri(10, 25);
    return { text: "What does this program print?", visual: code(["count = 0", `for n in range(1, ${N + 1}):`, sp + `if n % ${k} == 0:`, sp + sp + "count = count + 1", "print count"]), answer: Math.floor(N / k), hints: ["The if only lets count go up on some of the numbers. Which ones?", `n % ${k} == 0 means n divides evenly by ${k} with nothing left over. List the numbers that do, counting up from 1 to the end.`, "Example: for range(1, 8) and n % 3 == 0, the matching numbers are 3 and 6, so count is 2. Now do yours."] };
  }, [], [["If inside a loop", "🔀", "The loop visits each number. The <b>if</b> decides whether to do the line inside."], ["== means equals", "🟰", "<b>n % 3 == 0</b> asks: is n a multiple of 3? One = stores a value; two == compares."], ["Trace", "👣", "Walk through the numbers one by one and mark which ones pass the test."]]);
  const B10 = cu("Functions that call themselves", () => {
    if (Math.random() < 0.5) {
      const n = ri(3, 5);
      let a = 1; for (let i = 2; i <= n; i++) a *= i;
      return { text: `What does f(${n}) return?`, visual: code(["def f(n):", sp + "if n == 1:", sp + sp + "return 1", sp + "return n * f(n - 1)"]), answer: a, hints: ["The function calls itself with a smaller number each time, until n reaches 1.", "Unroll it: f(n) is n times f(n-1), and so on down to f(1).", "Example: f(3) = 3 x f(2) = 3 x 2 x f(1) = 3 x 2 x 1 = 6. Now do yours with its own number."] };
    }
    const n = ri(2, 7);
    return { text: `How many lines does count(${n}) print?`, visual: code(["def count(n):", sp + "print n", sp + "if n > 0:", sp + sp + "count(n - 1)"]), answer: n + 1, hints: ["Each call prints one line, then maybe calls again with a smaller number.", "Calls happen for the starting number and every number down to 0. Count how many calls there are.", "Example: count(2) prints 2, then 1, then 0, so 3 lines. Now do yours."] };
  }, [], [["Recursion", "🪞", "A function that <b>calls itself</b> is recursive. Each call works on a smaller problem."], ["Base case", "🛑", "It needs a place to stop, like <b>if n == 1</b>. Without it, it would never end."], ["Unroll it", "📚", "Write the calls down one by one, then fill in the answers from the bottom up."]]);
  const B11 = mc("Think like a programmer", "🧠", [
    "A step-by-step set of instructions to solve a problem is an...|Algorithm|Icon|Bookmark",
    "In a flowchart, a diamond usually shows...|A yes/no decision|The start|A picture",
    "In a flowchart, an oval usually shows...|The start or end|A decision|A cable",
    "Pseudocode is...|Plain-language steps that look like code but are not a real language|A secret password|A broken program",
    "Before writing code, a good plan is to...|Break the problem into small steps|Type fast and hope|Delete the problem",
    "Breaking a big problem into smaller parts is called...|Decomposition|Compression|Streaming",
    "Spotting what repeats so you can reuse a solution is...|Pattern recognition|Pixel counting|Debugging",
    "Hiding details to focus on what matters is called...|Abstraction|Distraction|Compression"],
    ["Think about planning versus typing code. Which comes first?", "Programmers have names for their thinking skills: breaking up, spotting patterns, hiding details, and writing steps.", "Example: splitting \"make a game\" into drawing, moving and scoring is breaking the problem into smaller parts. Now match yours."],
    [["Algorithm", "📋", "An <b>algorithm</b> is a clear list of steps. A recipe is one."], ["Flowcharts", "🔷", "Ovals start and stop, rectangles do a step, <b>diamonds ask a yes/no question</b>."], ["Four skills", "🧩", "<b>Decomposition</b>, <b>pattern recognition</b>, <b>abstraction</b> and <b>algorithms</b>."]]);
  const B12 = mc("Parts of a web page", "🧱", [
    "Which language gives a web page its structure and content?|HTML|CSS|Python",
    "Which gives a page style, such as colors, fonts and layout?|CSS|HTML|SQL",
    "Which makes a page interactive, such as buttons that react?|JavaScript|CSS|HTTP",
    "The &lt;h1&gt; tag makes a...|Main heading|Picture|Hidden note",
    "The &lt;a href=...&gt; tag makes a...|Link|List|Table",
    "Which tag usually shows a picture?|&lt;img&gt;|&lt;ul&gt;|&lt;br&gt;",
    "A page with HTML but no CSS usually looks...|Plain, with default styles|Very colorful|Impossible to open",
    "A browser's job is to...|Read the page code and show the page|Write the code|Repair keyboards"],
    ["Think of a house: one part is the frame, one is the paint, one is the moving parts.", "HTML is the content, CSS is the look, JavaScript is the behavior.", "Example: changing a button's color from gray to green is a job for the language of looks. Now match yours."],
    [["HTML", "🧱", "<b>HTML</b> builds the page: headings, paragraphs, links and pictures, using tags."], ["CSS", "🎨", "<b>CSS</b> adds style: colors, fonts, spacing and layout."], ["JavaScript", "⚡", "<b>JavaScript</b> makes things happen, like a button that opens a menu."]]);
  const B13 = mc("What is an API?", "🔌", [
    "An API lets one program...|Ask another program for data or actions|Print a page|Cool the CPU",
    "A weather app gets today's forecast from a weather service through an...|API|Antenna|Alarm",
    "JSON is...|A text format for sending organized data|A picture format|A virus",
    "A request that asks a server for data over the web is often called a...|GET request|Hot request|Print request",
    "An API key is like...|A secret pass that identifies your app|A phone number to share|A screen name",
    "Why keep an API key secret?|Others could misuse it and cause charges|It is very long|It changes the page color",
    "In JSON, a pair looks like...|\"name\": \"Mia\"|name -> Mia|Mia(name)",
    "When an API replies with the code 404, it usually means...|Not found|Perfect|Too fast"],
    ["Think of a waiter who carries your order to the kitchen and brings back the food.", "An API is a way for programs to talk. Data comes back in an organized format, and some programs need a secret key.", "Example: a game asks a scores service for the top ten, and the service answers with a list of names and numbers. Now pick yours."],
    [["API", "🍽️", "An <b>API</b> is like a waiter: your program asks, the service answers."], ["JSON", "🧾", "Answers often come back as <b>JSON</b>, a tidy list of \"name\": value pairs."], ["Keys", "🔑", "Some APIs need an <b>API key</b>. Keep it secret and out of anything players can see."]]);
  const B14 = mc("Bandwidth and latency", "📡", [
    "Bandwidth is...|How much data can move per second|How far data travels|How big the screen is",
    "Latency (ping) is...|The delay before data starts to arrive|The size of a file|Battery life",
    "Which matters most for a fast online action game?|Low latency|A big monitor|A colorful keyboard",
    "Which helps most when downloading a huge file?|High bandwidth|A short username|A louder speaker",
    "In a highway picture, bandwidth is like the number of...|Lanes|Billboard signs|Cars' colors",
    "Ping is measured in...|Milliseconds|Megabytes|Pixels",
    "Being far from the Wi-Fi router usually makes...|The signal weaker and speeds lower|Speeds higher|The screen bigger",
    "Many people streaming on one network can...|Share the bandwidth, so each gets less|Increase screen size|Remove latency"],
    ["One word is about how much, the other is about how soon.", "Bandwidth is like the width of a pipe. Latency is like the time for the first drop to arrive.", "Example: a video call needs a quick reply, so lag matters more than size. Now pick yours."],
    [["Bandwidth", "🛣️", "<b>Bandwidth</b> is the size of the pipe: how much data fits through each second."], ["Latency", "⏳", "<b>Latency</b> is the wait before data starts to arrive. Low is better."], ["Which one?", "🎮", "Games and calls need <b>low latency</b>. Big downloads and videos need <b>high bandwidth</b>."]]);
  const B15 = mc("Social engineering", "🎭", [
    "Social engineering tricks people, not machines, to get...|Information or access|Better Wi-Fi|Faster typing",
    "A caller says \"I am from your bank, tell me your code now!\" This is likely...|A scam using pressure|A friendly helper|A software update",
    "Pretexting means...|Making up a believable story to get information|Typing in advance|Printing text",
    "Someone online asks for a photo to \"prove who you are\". You should...|Say no and tell a trusted adult|Send it|Share your address",
    "Scammers often add...|Urgency, like \"act now or lose your account\"|A friendly pause|Lots of patience",
    "A USB stick found in a parking lot should...|Not be plugged in; hand it to an adult|Be plugged in right away|Be opened with friends",
    "The safest way to check a surprising message from \"your bank\" is to...|Ask a parent and use an official number you already have|Reply to the message|Click the link inside",
    "A message says you won a prize but must pay a fee first. It is probably...|A scam|Real luck|A school notice"],
    ["Ask: is someone rushing me or asking for something private?", "Tricks often use fear, hurry, or a tempting prize. Real companies do not ask for secrets that way.", "Example: an email says \"your account will be closed in 1 hour, send your password\". The hurry and the secret request are red flags. Now pick yours."],
    [["Tricking people", "🎭", "<b>Social engineering</b> fools people into giving up information instead of breaking in with code."], ["Red flags", "🚩", "<b>Urgency</b>, <b>secrets</b>, <b>prizes</b> and pretending to be someone official."], ["What to do", "🛑", "Stop, do not reply, and <b>tell a parent or teacher</b>. Check using a number or site you already trust."]]);
  const B16 = mc("The 3-2-1 backup rule", "💾", [
    "The 3-2-1 rule keeps 3 copies, on 2 kinds of storage, with 1 copy...|Kept somewhere else (off-site)|Printed on paper only|In the same drawer",
    "How many copies of your data does the 3-2-1 rule suggest in all?|3|2|1",
    "Why keep one copy off-site, such as in the cloud?|A fire or flood at home could destroy every local copy|Clouds are free|It makes files smaller",
    "A backup that lives only on the same computer protects you from...|Deleting a file by mistake, but not from the computer failing|Everything|Nothing at all",
    "Ransomware locks your files. A recent offline backup lets you...|Restore your files without paying|Pay faster|Rename them",
    "Backups should be tested because...|A backup you cannot restore is useless|Tests make them bigger|They get younger",
    "Automatic backups are good because...|You do not have to remember|They need no storage|They delete the originals",
    "Two different kinds of storage could be...|An external drive and the cloud|Two folders on one drive|Two copies with the same name"],
    ["Think about all the different ways a copy could be lost.", "Spreading copies around is the idea. One place can fail, so use more than one kind and more than one location.", "Example: a school project saved on the laptop, a USB drive, and the cloud follows the idea. Now pick yours."],
    [["3-2-1", "🔢", "<b>3</b> copies, <b>2</b> kinds of storage, <b>1</b> copy far away from the others."], ["Why", "🔥", "A drive can break or be lost, and a home can have a fire. Spread out the risk."], ["Test it", "🧪", "Once in a while, try to open a backup to be sure it works."]]);
  const B17 = mc("AI mistakes and bias", "🤖", [
    "AI that learns from biased data can...|Give unfair or wrong results|Always be fair|Become a person",
    "A face-recognition system trained mostly on one kind of face may...|Work worse for other faces|Work perfectly for everyone|Stop running",
    "An AI chatbot saying something wrong in a very sure way is called a...|Hallucination|Backup|Pixel",
    "The best way to use an AI answer for homework facts is to...|Check it with a trusted source|Copy it without reading|Never think about it",
    "Who is responsible for work you hand in with AI help?|You|The AI|Nobody",
    "AI can be a good tool for...|Brainstorming and explaining, while you check the facts|Replacing all your learning|Hiding mistakes",
    "If a teacher says no AI on a test, you should...|Follow the rule|Use it quietly|Ask AI to hide it",
    "Training data for fair AI should be...|Varied and checked for fairness|From one group only|Random noise"],
    ["An AI is only as good as what it learned from, and it can still be wrong.", "People should check AI answers, use the tool honestly, and stay responsible for their own work.", "Example: a chatbot invents a book title that does not exist. A quick check in a trusted library catalog finds the problem. Now pick yours."],
    [["Bias", "⚖️", "If the data an AI learns from is unfair or missing groups, its results can be <b>unfair</b>."], ["Hallucinations", "🌀", "Chatbots can make up facts that sound right. Always <b>check</b>."], ["Honest use", "🤝", "Follow your school's rules and say when you used help. The work is still yours."]]);
  const B18 = num("Screen shapes", "📺", () => {
    const [a, b] = pick([[16, 9], [4, 3], [3, 2]]), k = ri(20, 100);
    if (Math.random() < 0.5) return [`A ${a}:${b} video is ${a * k} pixels wide. How many pixels tall is it?`, b * k, big(a + ":" + b)];
    return [`A ${a}:${b} video is ${b * k} pixels tall. How many pixels wide is it?`, a * k, big(a + ":" + b)];
  }, ["An aspect ratio like 16:9 compares width to height. Both sides are multiplied by the same number.", "Find the number that the ratio was multiplied by, using the side you know. Then use it on the other side.", "Example: a 4:3 picture that is 80 wide: 80 / 4 = 20, and 3 x 20 = 60 tall. Now do yours."],
    [["Aspect ratio", "📐", "<b>16:9</b> means for every 16 units of width there are 9 units of height."], ["Scale", "🔍", "Find the multiplier: known side / its ratio number. Then multiply the other number."], ["Common shapes", "📺", "Widescreen video is usually 16:9. Older TVs were 4:3."]]);
  const L17 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18,
    MIX("Mixed practice", B1, B4, B5, B6, B7, B8, B9, B10, B12, B14, B16, B18),
    MIX("Level 17 Challenge", B2, B3, B5, B6, B8, B10, B11, B13, B15, B16, B17, B18)];

  // =============== LEVEL 18 ===============
  const C1 = ty("Type a formal letter line", "Type this line from a letter.",
    ["dear mr. lee, thank you for the interview on friday morning.", "i am writing to ask about the volunteer job at the library.", "please find my resume attached; i look forward to hearing from you.", "i would be glad to answer any questions you may have.", "thank you for your time, and i hope to speak with you soon.", "i am a hard worker, a fast learner, and a good teammate.", "best regards, and thank you again for your help.", "my skills include typing, spreadsheets, and basic coding."],
    ["Formal writing is neat. Aim for no mistakes at all.", "There are {w} words and it starts with \"{f}\". Check every comma and the period at the end.", "Example: for <b>dear ms. hall, thank you.</b>, type dear, a space, ms and a period, and so on. Now type yours."],
    [["Formal letters", "✉️", "Letters to adults or companies use polite words like <b>dear</b>, <b>please</b> and <b>thank you</b>."], ["Accuracy", "🎯", "A letter with typos looks careless. Go slowly and be accurate."], ["Proofread", "🔍", "Read it once more before you send it."]], cap);
  const C2 = ty("Type a database query", "Type this query exactly.",
    ["select name from pets where age > 3;", "select * from games order by score;", "insert into scores values (1, 90);", "select count(*) from students;", "select name, grade from class where grade >= 90;", "select max(score) from games;", "select title from books where year = 2020;", "select avg(price) from items;"],
    ["Queries read like short sentences. Type word by word.", "It has {n} characters without spaces and starts with \"{f}\". The star is Shift + 8; the greater-than sign is Shift + the period key.", "Example: for <b>select name from pets;</b>, type the words with single spaces and finish with a semicolon. Now type yours."],
    [["SQL", "🗃️", "<b>SQL</b> is a language for asking databases questions."], ["Parts", "🧩", "<b>select</b> picks columns, <b>from</b> names the table, <b>where</b> filters rows."], ["The end", "🔚", "Many queries end with a <b>semicolon ;</b>."]], s => esc(s));
  const C3 = ty("Type Python lines", "Type this line of code exactly.",
    ["def add(a, b): return a + b", "def area(w, h): return w * h", "for i in range(10): print(i)", "total = sum([3, 5, 8])", "name = input('your name? ')", "if score >= 90: print('great')", "words = ['cat', 'dog', 'owl']", "while x < 5: x = x + 1"],
    ["Code needs every bracket and colon. Check each pair.", "It has {n} characters without spaces and starts with \"{f}\". Colons are Shift plus the semicolon key.", "Example: for <b>def hi(): print('x')</b>, type def, a space, hi and two brackets, a colon, then print and its brackets with quotes. Now type yours."],
    [["Code lines", "🐍", "Python lines use words, brackets, quotes and colons together."], ["Pairs", "🤝", "Every <b>(</b> needs <b>)</b>, every <b>[</b> needs <b>]</b>, every quote needs a partner."], ["Accuracy", "🎯", "Code works only if it is exact, so slow down for the symbols."]], s => esc(s));
  const C4 = num("Time saved by typing faster", "⏳", () => {
    for (;;) {
      const [s, f] = pick([[20, 30], [20, 40], [30, 60], [25, 50], [40, 60], [30, 50], [20, 60], [15, 30]]), W = pick([300, 600, 900, 1200]);
      if (W % s === 0 && W % f === 0) return [`A student types ${W} words a week. At ${s} WPM that takes ${W / s} minutes. After practice, they type at ${f} WPM. How many minutes does that save each week?`, W / s - W / f];
    }
  }, ["Find the time for the slow speed and the time for the fast speed. Then compare.", "Time = words / WPM. Work out the time for the new speed, then subtract it from the old time.", "Example: 120 words at 20 WPM is 6 minutes; at 40 WPM it is 3 minutes. Saved: 6 - 3 = 3 minutes. Now do yours."],
    [["Faster pays off", "⚡", "A faster typist uses fewer minutes for the same job."], ["Compare", "⚖️", "Time at each speed = <b>words / WPM</b>. The difference is the time saved."], ["Over a year", "📆", "Small savings every week add up to hours."]]);
  const C5 = num("Mean and mode", "📊", () => {
    if (Math.random() < 0.5) {
      const n = pick([4, 5]), v = Array.from({ length: n - 1 }, () => ri(20, 60));
      const last = ri(25, 60); let tot = sumTo(v) + last; const l2 = last - (tot % n);
      if (l2 >= 10) return [`Test scores: ${v.concat(l2).join(", ")}. What is the mean (average)?`, (sumTo(v) + l2) / n];
    }
    const m = ri(30, 70), v = shuf([m, m, m + ri(1, 9), m - ri(1, 9), m + ri(10, 15), m - ri(10, 15)]);
    return [`These are typing speeds in WPM: ${v.join(", ")}. What is the mode (the value that appears most often)?`, m];
  }, ["Mean means add and share. Mode means most common.", "For the mean, add all the numbers then divide by how many there are. For the mode, find the number that shows up more than once.", "Example: for 4, 6, 6, 8: the mean is (4 + 6 + 6 + 8) / 4 = 6 and the mode is 6. Now do yours."],
    [["Mean", "➗", "The <b>mean</b> is the total divided by how many numbers."], ["Mode", "🔁", "The <b>mode</b> is the number that appears <b>most often</b>."], ["Both", "📊", "Mean tells the typical size. Mode tells the most common value."]]);
  const C6 = cu("Query a table", () => {
    const animals = ["dog", "cat", "bird", "fish"], nm = ["Rex", "Kit", "Pip", "Bo", "Max", "Zed", "Fin"];
    for (;;) {
      const rows = shuf(nm).slice(0, 6).map(n => [n, pick(animals), ri(1, 9)]);
      const kind = pick(["gt", "lt", "type"]);
      let cond, f;
      if (kind === "gt") { const t = ri(2, 6); cond = `age > ${t}`; f = r => r[2] > t; }
      else if (kind === "lt") { const t = ri(4, 8); cond = `age < ${t}`; f = r => r[2] < t; }
      else { const t = pick(animals); cond = `type = '${t}'`; f = r => r[1] === t; }
      const c = rows.filter(f).length;
      if (c < 1 || c > 5) continue;
      const tbl = code(rows.map(r => `${nb(r[0].padEnd(4, " "))}${nb(r[1].padEnd(5, " "))}${r[2]}`));
      return { text: `The table pets has columns name, type and age. How many rows does select * from pets where ${esc(cond)}; return?`, visual: tbl, answer: c, hints: ["The where part is a test. Only rows that pass it are returned.", "Go down the rows one by one. Test each row against the condition, and tally the ones that pass.", "Example: for ages 2, 5, 7 and the test age > 4, two rows pass (5 and 7), so the count is 2. Now do yours."] };
    }
  }, [], [["Where", "🔎", "<b>where</b> keeps only rows that match a test."], ["Tests", "🧪", "<b>&gt;</b> means bigger than, <b>&lt;</b> means smaller than, <b>=</b> means equal to."], ["Count rows", "🔢", "Check each row against the test, and count the ones that pass."]]);
  const C7 = cu("Nested IF", () => {
    const [t1, t2] = pick([[90, 70], [80, 60], [85, 65], [95, 75]]), sets = [["gold", "silver", "bronze"], ["A", "B", "C"], ["high", "mid", "low"]], lab = pick(sets);
    const v = pick([t1 + ri(0, 5), t1 - ri(1, 5), t2 + ri(0, 5), t2 - ri(1, 10), ri(20, t2 - 3)]);
    const res = v >= t1 ? lab[0] : v >= t2 ? lab[1] : lab[2];
    return { text: `A1 holds ${v}. What does =IF(A1>=${t1}, "${lab[0]}", IF(A1>=${t2}, "${lab[1]}", "${lab[2]}")) show?`, choices: shuf(lab), answer: res, hints: ["The formula checks the first test. If it is true, it stops there.", "If the first test is false, the formula moves on to the second test. If that is false too, it uses the last value.", "Example: with =IF(A1>=50,\"x\",IF(A1>=20,\"y\",\"z\")) and A1 = 30, the first test fails and the second passes, so you get y. Now do yours."] };
  }, [], [["Nested IF", "🪆", "An <b>IF inside an IF</b> lets a formula choose between three or more results."], ["Order", "📋", "Tests run <b>top to bottom</b>. The first true one wins."], ["Last value", "🏁", "The final answer is used only if every test before it was false."]]);
  const C8 = num("Biggest number in n bits", "🔟", () => {
    if (Math.random() < 0.6) { const n = pick([3, 4, 5, 6, 7, 8, 10]); return [`What is the largest whole number that fits in ${n} bits (all bits are 1)?`, Math.pow(2, n) - 1, big("1".repeat(n), 1.6)]; }
    const n = pick([4, 5, 6, 7, 8, 10]); return [`The largest number you need to store is ${Math.pow(2, n) - 1}. What is the smallest number of bits that can hold it?`, n];
  }, ["With n bits there are two choices for each bit. How many patterns is that, and does the first pattern count as 0?", "n bits make 2 to the power n patterns, but counting starts at 0, so the biggest number is one less than that.", "Example: 3 bits give 2 x 2 x 2 = 8 patterns, from 0 up to 7. Now do yours."],
    [["Patterns", "🔢", "n bits make <b>2 x 2 x ... (n times)</b> different patterns."], ["Start at zero", "0️⃣", "The patterns count 0, 1, 2 and so on, so the biggest number is the pattern count minus 1."], ["A byte", "📦", "8 bits make 256 patterns, so the largest value is <b>255</b>."]]);
  const C9 = cu("Trace a list loop", () => {
    for (;;) {
      const arr = Array.from({ length: 5 }, () => ri(1, 20));
      const T = ri(5, 12), t = sumTo(arr.filter(x => x > T));
      if (t > 0 && arr.some(x => x <= T)) return { text: "What does this program print?", visual: code([`nums = [${arr.join(", ")}]`, "total = 0", "for x in nums:", sp + `if x > ${T}:`, sp + sp + "total = total + x", "print total"]), answer: t, hints: ["The loop looks at every number, but the if lets only some of them into the total.", `Go through the list. Add a number only if it is bigger than ${T}. Skip the others.`, "Example: for [2, 9, 4, 7] and the test x > 5, only 9 and 7 pass, so the total is 16. Now do yours."] };
    }
  }, [], [["Loop over a list", "📃", "<b>for x in nums</b> gives x each value in the list, one at a time."], ["Filter", "🧪", "The <b>if</b> inside decides which values get used."], ["Trace", "👣", "Write each x, whether it passed, and the total so far."]]);
  const C10 = cu("Trace a loop over letters", () => {
    const w = pick(["banana", "balloon", "keyboard", "computer", "success", "coffee", "letter", "mississippi", "programming", "bookkeeper"]);
    if (Math.random() < 0.5) {
      const c = pick(w.split(""));
      return { text: "What does this program print?", visual: code([`word = "${w}"`, "count = 0", "for ch in word:", sp + `if ch == "${c}":`, sp + sp + "count = count + 1", "print count"]), answer: w.split("").filter(x => x === c).length, hints: ["The loop visits each letter in the word, one at a time.", `Go through the word letter by letter. Count each time the letter is "${c}".`, "Example: in \"seed\" counting the letter e gives 2. Now count in yours."] };
    }
    return { text: "What does this program print?", visual: code([`word = "${w}"`, "count = 0", "for ch in word:", sp + 'if ch in "aeiou":', sp + sp + "count = count + 1", "print count"]), answer: w.split("").filter(x => "aeiou".includes(x)).length, hints: ["The loop visits each letter. The if checks whether the letter is a vowel.", "The vowels are a, e, i, o and u. Go through the word and count each one.", "Example: \"tree\" has the vowels e and e, so the count is 2. Now count in yours."] };
  }, [], [["Letters in a loop", "🔤", "<b>for ch in word</b> gives you each letter of a word, one at a time."], ["in", "🔍", "<b>ch in \"aeiou\"</b> asks: is this letter one of those five?"], ["Counter", "🧮", "A counter starts at 0 and goes up by 1 each time the test passes."]]);
  const C11 = mc("Lists and dictionaries", "📚", [
    "A list in code stores items in...|Order, found by position (index)|No order, found by name only|Just one item",
    "In most languages, the first item of a list has index...|0|1|10",
    "A dictionary stores...|Key and value pairs|Only numbers|Only lists",
    "To look up a phone number by a person's name, which is handier?|A dictionary|A list of numbers only|One variable",
    "scores = [7, 9, 4]. What is scores[1]?|9|7|4",
    "In {\"cat\": 4, \"bird\": 2}, what is the value for the key \"bird\"?|2|4|bird",
    "len([5, 6, 7, 8]) gives...|4|3|8",
    "Adding an item to the end of a list is called...|Appending|Deleting|Sorting"],
    ["Think about how you find an item: by its place in line, or by its label?", "Lists count positions starting from the beginning. Dictionaries use a key to find a value.", "Example: in [10, 20, 30] counting from index 0, the number at index 2 is 30. Now work out yours."],
    [["Lists", "📃", "A <b>list</b> keeps items in order. The first item is at <b>index 0</b>."], ["Dictionaries", "📖", "A <b>dictionary</b> stores pairs. You ask for a <b>key</b> and get its <b>value</b>."], ["Useful tools", "🛠️", "<b>len</b> counts items, and <b>append</b> adds one to the end of a list."]]);
  const C12 = mc("Sharing and credit", "©️", [
    "A Creative Commons license lets creators...|Share their work with clear rules for reuse|Hide their work|Charge forever",
    "CC BY means you may reuse the work if you...|Give credit to the creator|Say it is yours|Remove the name",
    "Public domain works are ones that...|Anyone may use freely|Cannot be seen|Must always be paid for",
    "Copyright automatically protects...|Original work as soon as it is made|Only items with a copyright sign|Nothing online",
    "Fair use may allow limited use of a work for things like...|Education, comment or criticism|Selling copies|Posting whole movies",
    "If you are not sure you may use a picture, you should...|Ask, or use one you made or have permission for|Use it anyway|Crop out the name",
    "Plagiarism is...|Passing off someone else's work as your own|Quoting with credit|Writing a summary with sources",
    "An NC license term means...|Non-commercial: not for making money|New computer|No credit"],
    ["Think about the creator: what would be fair to them?", "Creators own their work. Licenses and credits are how you can use it fairly.", "Example: using a classmate's drawing in your project, with their permission and their name on it, is the fair way. Now pick yours."],
    [["Copyright", "©️", "Original work is protected by <b>copyright</b> as soon as it is made."], ["Licenses", "🏷️", "A <b>Creative Commons</b> license says how others may reuse it, often with credit."], ["Be fair", "🤝", "Ask, give <b>credit</b>, and never pass off someone else's work as your own."]]);
  const C13 = mc("What is the cloud?", "☁️", [
    "Cloud computing means using...|Computers owned by a company, over the internet|Computers inside real clouds|Only your own laptop",
    "Which is an example of using the cloud?|Saving photos so you can open them on any device|Printing a page|Typing with no internet",
    "One benefit of cloud storage is...|You can reach files from many devices|It never needs internet|It lasts forever by magic",
    "A drawback of cloud tools is...|They usually need an internet connection|They cannot save|They have no keyboard",
    "SaaS stands for software as a...|Service|System|Setup",
    "Streaming a video means...|Playing it as it downloads, without keeping a full copy|Copying it onto a USB stick|Printing every frame",
    "Why do big companies rent cloud servers?|They can add more power quickly when they need it|Servers are shiny|It is the law",
    "Where are cloud files really stored?|On servers in data centers|In the sky|Inside your screen"],
    ["The cloud is a name for something very real. Where do the files live?", "Think about who owns the computers, how you reach them, and what you need to do that.", "Example: editing a shared document in your browser means the document lives on a server, not just on your laptop. Now pick yours."],
    [["The cloud", "☁️", "The <b>cloud</b> is computers in <b>data centers</b> that you use over the internet."], ["Good and bad", "⚖️", "You can reach files anywhere, but you usually need an <b>internet connection</b>."], ["SaaS", "🧰", "<b>Software as a Service</b> means using an app through the web instead of installing it."]]);
  const C14 = mc("Hashing passwords", "#️⃣", [
    "A hash function turns data into...|A short, fixed-size scrambled code|The original text|A picture",
    "Good websites store passwords as...|Hashes, not plain text|Plain text|Sticky notes",
    "Can you easily turn a hash back into the original password?|No, it is designed to be one-way|Yes, instantly|Only on weekends",
    "Changing one letter of the input changes the hash...|Completely|Not at all|By one letter",
    "A downloaded file's hash can show it was not changed if you...|Compare it with the published hash|Read it aloud|Rename the file",
    "Why do attackers try common passwords like 123456 first?|Many people use them|They are long|Hashes need them",
    "Salting a password means...|Adding random extra data before hashing|Eating snacks|Typing it twice",
    "A hash is useful for passwords because the site can...|Check your password without keeping the real one|Show the password to staff|Email it to you"],
    ["Think about a blender: you can mix things in, but you cannot unmix them.", "A hash is a one-way scramble. The same input always gives the same result, and a tiny change gives a very different result.", "Example: a site hashes \"cat\" when you sign up and hashes what you type later. If the two hashes match, you are in. Now pick yours."],
    [["Hash", "#️⃣", "A <b>hash</b> is a short scrambled code made from data. It is a <b>one-way</b> trip."], ["Passwords", "🔐", "Sites store the hash, not your password. They compare hashes when you sign in."], ["Salt", "🧂", "A <b>salt</b> is random extra data added first, so two people with the same password get different hashes."]]);
  const C15 = mc("Spot fake media", "🕵️", [
    "A deepfake is...|A fake video or audio made to look real with AI|A strong password|A deep folder",
    "A sign a picture might be edited or AI-made is...|Odd hands, odd text or blurry mismatched details|It is in color|It is large",
    "Before sharing a shocking video, you should...|Check where it came from and whether trusted sources report it|Share fast|Add a dramatic caption",
    "Misinformation spreads fast because people...|Share before checking|Check twice|Read slowly",
    "A trustworthy post usually...|Names its source so you can check it|Hides who made it|Says \"just trust me\"",
    "A caller sounds like your relative and asks for money in a panic. A smart move is...|Hang up and call them back on a number you know, or ask a parent|Send money|Share your passwords",
    "Labeling AI-made pictures helps because...|People know what is real and what is generated|It looks pretty|It uses less power",
    "If something makes you very angry or shocked, you should...|Pause and check before sharing|Share at once|Comment immediately"],
    ["Slow down. Fake things are often built to make you react fast.", "Look for the source, look closely at details, and check with trusted people or sources before you pass it on.", "Example: a photo of a sensational event with no source and no mention in the news is a reason to wait before sharing. Now pick yours."],
    [["Deepfakes", "🎭", "AI can make fake <b>photos, videos and voices</b> that look and sound real."], ["Clues", "🔍", "Look for odd details, no source, or a message that rushes you."], ["Pause", "⏸️", "Check the source and ask a trusted adult <b>before</b> you share."]]);
  const C16 = mc("Tech and the world", "🌍", [
    "E-waste means...|Old or broken electronics that are thrown away|Extra email|Wasted time online",
    "A good way to deal with old devices is to...|Recycle them at a proper collection point|Burn them|Bury them in the garden",
    "The digital divide is the gap between people who...|Have good access to technology and the internet, and those who do not|Like blue and those who like red|Have long names",
    "Data centers use lots of...|Electricity|Pencils|Sand",
    "Power-saving settings can...|Save energy|Break the device|Delete files",
    "Repairing a device to make it last longer helps because...|Fewer new devices need to be made|Brands get angry|Screens get cheaper",
    "Tech that helps people with low vision includes...|Screen readers and high-contrast displays|Louder keys|Longer cables",
    "Libraries and schools help the digital divide by...|Offering computers and internet to everyone|Closing early|Selling keyboards"],
    ["Think about people, the planet, and fairness.", "Devices are made from materials and use power, and not everybody has the same access to them.", "Example: a library lending laptops to families without one helps close the gap in access. Now pick yours."],
    [["E-waste", "♻️", "Old electronics should be <b>recycled</b>, not thrown in the trash. They hold useful materials."], ["Energy", "🔋", "Computers and data centers use <b>electricity</b>. Saving power helps."], ["Access", "🤝", "The <b>digital divide</b> is the gap in access to devices and internet. Libraries and schools help."]]);
  const C17 = num("Megabits and megabytes", "📶", () => {
    if (Math.random() < 0.4) { const m = ri(2, 100); return [`A connection is rated ${m * 8} Mbps (megabits per second). A byte is 8 bits. How many megabytes per second (MB/s) is that?`, m]; }
    const s = pick([1, 2, 5, 10]), t = ri(2, 30);
    return [`A connection is rated ${s * 8} Mbps. How many seconds will a ${s * t} MB file take to download?`, t];
  }, ["Internet speeds use megabits, but file sizes use megabytes. A byte holds several bits.", "Divide the Mbps by 8 to get MB per second. For a file, divide the file size by the MB per second.", "Example: 40 Mbps is 40 / 8 = 5 MB/s. A 50 MB file then takes 50 / 5 = 10 seconds. Now do yours."],
    [["Bits and bytes", "🔢", "<b>8 bits = 1 byte</b>. Speeds say <b>Mbps</b> (megabits), files say <b>MB</b> (megabytes)."], ["Convert", "➗", "MB/s = Mbps / 8."], ["Time", "⏱️", "Seconds = <b>file size in MB / MB per second</b>."]]);
  const C18 = cu("Logic gates", () => {
    const g = pick(["AND", "OR", "XOR", "NAND", "NOR", "NOT"]), a = ri(0, 1), b = ri(0, 1);
    const f = { AND: a & b, OR: a | b, XOR: a ^ b, NAND: 1 - (a & b), NOR: 1 - (a | b), NOT: 1 - a }[g];
    const text = g === "NOT" ? `A = ${a}. What does NOT A give?` : `A = ${a} and B = ${b}. What does A ${g} B give?`;
    const hs = {
      AND: "AND is 1 only when both inputs are 1.", OR: "OR is 1 when at least one input is 1.", XOR: "XOR is 1 when the inputs are different from each other.",
      NAND: "NAND is the opposite of AND. First decide what AND would give.", NOR: "NOR is the opposite of OR. First decide what OR would give.", NOT: "NOT flips the input: 1 becomes 0 and 0 becomes 1."
    };
    return { text, visual: big(g, 1.8), choices: [0, 1], answer: f, hints: ["Logic gates take bits (0 or 1) and give one bit back.", hs[g], "Example: with inputs 1 and 1, an OR gate gives 1, and a NOR gate (the opposite) gives 0. Now do yours."] };
  }, [], [["Gates", "🚪", "A <b>logic gate</b> takes bits in and gives a bit out. Chips are made of millions of them."], ["The basics", "🧩", "<b>AND</b>: both are 1. <b>OR</b>: at least one is 1. <b>NOT</b>: flips the bit."], ["More gates", "🔄", "<b>NAND</b> and <b>NOR</b> are the opposites of AND and OR. <b>XOR</b> is 1 when the inputs differ."]]);
  const L18 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18,
    MIX("Mixed practice", C1, C4, C5, C6, C7, C8, C9, C10, C11, C14, C17, C18),
    MIX("Level 18 Challenge", C2, C3, C5, C6, C8, C9, C10, C12, C13, C15, C16, C18)];

  Object.assign(TYPING_LEVELS, { 16: L16, 17: L17, 18: L18 });
})();
