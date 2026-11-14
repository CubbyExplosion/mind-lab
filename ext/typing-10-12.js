// ext/typing-10-12.js  Mind Lab Typing & Computers, levels 10-12 (60 lessons)
(() => {
  const sl = a => () => a.map(([h, v, t]) => ({ h, v, t }));
  const big = (t, s = 2) => `<span style="font-size:${s}em;font-weight:bold">${t}</span>`;
  const code = lines => `<span style="font-family:monospace;font-size:1.15em;font-weight:bold;text-align:left;display:inline-block">${lines.join("<br>")}</span>`;
  const sp = "&nbsp;&nbsp;";
  const mc = (title, vis, rows, hints, slides) => {
    const rs = rows.map(r => r.split("|"));
    const make = () => { const [text, ans, ...wr] = pick(rs); return { text, visual: vis, choices: shuf([ans, ...wr]), answer: ans, hints: hints.slice() }; };
    make.teach = sl(slides);
    return { title, make };
  };
  const ty = (title, prompt, items, hints, slides, shown) => {
    const make = () => {
      const s = pick(items), n = s.split(" ").length;
      const h = hints.slice(); h[1] = h[1].replace("{n}", s.replace(/ /g, "").length).replace("{w}", n).replace("{f}", s[0]);
      return { text: prompt, visual: big(shown ? shown(s) : s, s.length > 70 ? 0.9 : s.length > 40 ? 1.05 : s.length > 14 ? 1.2 : 1.8), textInput: true, answer: s, hints: h };
    };
    make.teach = sl(slides);
    return { title, make };
  };
  // fn returns [text, answer, visual]; answer may be a number or a short word/string
  const num = (title, vis, fn, hints, slides, exA) => {
    const make = () => {
      let r, k = 0;
      do { r = fn(); k++; } while (exA !== undefined && String(r[1]) === String(exA) && k < 30);
      const [text, answer, v] = r;
      const q = { text, visual: v || vis, answer, hints: hints.slice() };
      if (typeof answer === "string") q.textInput = true;
      return q;
    };
    make.teach = sl(slides);
    return { title, make };
  };
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder of each one, then the quiz." }].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const sheet = vals => `<span style="font-size:1.3em;font-weight:bold">${vals.map((v, i) => "ABCDEF"[i] + "1 = " + v).join("&nbsp;&nbsp; ")}</span>`;
  const names = ["Maya", "Leo", "Sam", "Nia", "Omar", "Ella", "Ravi", "Zoe", "Ivan", "Lina"];
  const two = () => { const a = pick(names); let b; do { b = pick(names); } while (b === a); return [a, b]; };

  // =============== LEVEL 10 ===============
  const A1 = ty("Type a paragraph", "Type this short paragraph.",
    ["our school has a new garden. students plant seeds, water them, and write about how they grow.", "last weekend we visited the science museum. the space room was my favorite part.", "a good typist sits up straight, keeps eyes on the screen, and types with all ten fingers.", "the library has many books about animals. i borrowed one about whales and read it twice.", "our team built a small robot. it can roll across the floor and pick up light things.", "when the power went out, we lit a candle and played cards until the lights came back."],
    ["Take it one sentence at a time. Look at the screen, not the keys.", "There are {w} words and it starts with \"{f}\". Watch the commas and periods as you go.", "Example: for \"we ran home. it rained.\", type we ran home, a period, a space, then it rained and a period. Now type yours."],
    [["Longer text", "📝", "A paragraph is a few sentences about one idea. Type it <b>one sentence at a time</b>."], ["Keep a rhythm", "🥁", "A steady beat is faster than a rush of mistakes."], ["Tip", "💡", "Read a few words ahead of where you are typing."]], cap);
  const A2 = ty("Type with quotation marks", "Type this sentence. Include the quotation marks.",
    ["the sign said, \"wet paint.\"", "she asked, \"can i help you?\"", "my teacher said, \"great job today.\"", "he shouted, \"we won the game!\"", "dad called, \"dinner is ready.\"", "the note said, \"back in five minutes.\"", "\"let's go,\" said maya.", "\"it works!\" cried the builder."],
    ["Look for where each quotation mark starts and ends.", "There are {w} words and it starts with \"{f}\" or a quotation mark. Quotation marks need the Shift key and the apostrophe key.", "Example: for the line <b>he said, \"hi.\"</b>, type he said, a comma, a space, a quote mark, hi, a period, and a closing quote mark. Now type yours."],
    [["Quotation marks", "💬", "Quotation marks wrap the exact words someone says."], ["How to type them", "⌨️", "Hold <b>Shift</b> and press the key next to Enter, the apostrophe key."], ["Tip", "💡", "Type the opening mark, the words, then the closing mark."]], cap);
  const A3 = ty("Type an email address", "Type this made-up email address.",
    ["maya.reed@example.com", "team_blue@example.org", "sam.lee@example.net", "art.club@example.com", "leo2024@example.org", "science_fair@example.net", "ella.k@example.com", "robot.fans@example.org"],
    ["Email addresses have no spaces. Read it in small pieces.", "It has {n} characters and starts with \"{f}\". The at sign needs Shift and the number 2 key.", "Example: for <b>zed.p@site.com</b>, type zed, a dot, p, the at sign, site, a dot, and com. Now type yours."],
    [["Email address", "📧", "An address has a <b>name</b>, then <b>@</b>, then the <b>site</b>."], ["Dots and underscores", "🔣", "The dot is by the comma key. The underscore needs Shift and the key next to zero."], ["Exact only", "🎯", "One wrong character sends the email to the wrong place."]]);
  const A4 = num("Words per minute from seconds", "⏱️", () => {
    const s = pick([10, 15, 20, 30]), w = ri(5, 25), n = pick(names);
    return [`${n} typed ${w} words in ${s} seconds. How many words per minute (WPM) is that?`, w * 60 / s];
  }, ["A minute is longer than the time in the question. How many times does it fit?", "Find how many times the short time fits into one whole minute, then multiply the words by that.", "Example: 8 words in 30 seconds. Two of those fit in a minute, so 8 x 2 = 16 WPM. Now do yours."],
    [["Short tests", "⏱️", "Some typing tests last only 15 or 30 seconds."], ["Scale it up", "📏", "Find how many times the test fits in <b>60 seconds</b>, then multiply the words."], ["Check", "✅", "Half a minute gives half the words, so double it."]], 16);
  const A5 = num("Typing accuracy percent", "🎯", () => {
    let T, M, a;
    do { T = pick([20, 25, 40, 50, 100, 200]); M = ri(1, Math.min(12, T / 5)); a = (T - M) * 100 / T; } while (!Number.isInteger(a));
    return [`You typed ${T} characters and ${M} were wrong. Accuracy = correct characters / total characters x 100. What is your accuracy in percent?`, a];
  }, ["First find how many characters were right.", "Subtract the wrong ones from the total, divide by the total, then multiply by one hundred.", "Example: 50 characters, 5 wrong. 45 right. 45 / 50 = 0.9, and 0.9 x 100 = 90 percent. Now do yours."],
    [["Accuracy", "🎯", "<b>Accuracy</b> is the percent of characters you typed correctly."], ["Formula", "🧮", "(total - wrong) / total x 100."], ["Goal", "🏁", "Many typists aim for 95 percent or more."]], 90);
  const A6 = mc("Know your keyboard", "⌨️", [
    "Why is the standard keyboard called QWERTY?|the first six letters of the top row spell it|it was built by a company called Qwerty|it stands for Quick Writing Tool", "Which row is the home row?|the middle letter row|the number row|the bottom letter row", "Besides F and J, which key often has a bump?|the 5 on the number pad|the Enter key|the Tab key",
    "What is the number pad best for?|typing lots of numbers fast|typing long words|moving the mouse", "What do the F1 to F12 keys do?|shortcuts that depend on the program|type numbers|make capital letters", "Do all countries use the same layout?|no, some use layouts like AZERTY|yes, all use QWERTY|no layouts exist",
    "What does the Tab key do in a document?|jumps the cursor forward a set space|deletes a word|prints the page", "Which key do you hold to make a capital letter?|Shift|Tab|Ctrl"],
    ["Think about the name, the position or the job of the key.", "Keyboards have a standard pattern, but the layout and extra keys can differ.", "Example: the bumps on F and J let your fingers find the home row without looking. Now do yours."],
    [["QWERTY", "🔤", "The layout is named after the <b>first six letters</b> on the top letter row."], ["Number pad", "🔢", "The <b>number pad</b> on the right helps you type numbers quickly."], ["Other layouts", "🌍", "Some countries use different layouts, such as <b>AZERTY</b>."]]);
  const A7 = mc("More shortcuts", "🎛️", [
    "Which shortcut opens a new browser tab?|Ctrl + T|Ctrl + W|Ctrl + Q", "Which shortcut closes the current tab?|Ctrl + W|Ctrl + T|Ctrl + N", "Which shortcut switches between open windows on Windows?|Alt + Tab|Ctrl + Tab|Shift + Esc",
    "Which shortcut brings back a tab you just closed?|Ctrl + Shift + T|Ctrl + Shift + W|Ctrl + Alt + T", "Which shortcut jumps to the very top of a document?|Ctrl + Home|Ctrl + End|Ctrl + Enter", "Which shortcut jumps to the very bottom of a document?|Ctrl + End|Ctrl + Home|Ctrl + Del",
    "Which key refreshes (reloads) a web page?|F5|F1|F12", "Which shortcut bookmarks the page in most browsers?|Ctrl + D|Ctrl + B|Ctrl + M"],
    ["Many shortcuts use the first letter of the action, or a special key.", "Ctrl plus a letter often matches the action. Home and End point to the start and finish.", "Example: Ctrl + S saves, and Ctrl + P prints. Now do yours."],
    [["Tabs", "🗂️", "<b>Ctrl + T</b> opens a tab and <b>Ctrl + W</b> closes it."], ["Move around", "🧭", "<b>Ctrl + Home</b> goes to the top, <b>Ctrl + End</b> to the bottom."], ["Switch", "🔁", "<b>Alt + Tab</b> flips between open windows."]]);
  const A8 = num("Biggest and smallest", "📊", () => {
    const n = ri(4, 5), set = new Set(); while (set.size < n) set.add(ri(2, 60));
    const v = [...set], f = pick(["MAX", "MIN"]), last = "ABCDEF"[n - 1];
    return [`In the sheet, what does =${f}(A1:${last}1) give?`, f === "MAX" ? Math.max(...v) : Math.min(...v), sheet(v)];
  }, ["Look at all the cells in the range and compare them.", "MAX finds the largest number in the range. MIN finds the smallest.", "Example: with 4, 9 and 6, MAX gives 9 and MIN gives 4. Now do yours."],
    [["MAX", "⬆️", "<b>=MAX(A1:D1)</b> finds the biggest number."], ["MIN", "⬇️", "<b>=MIN(A1:D1)</b> finds the smallest number."], ["Use it", "🧰", "Find the highest score or the cheapest price in a second."]]);
  const A9 = num("Price times amount", "🛒", () => {
    const p = ri(2, 12), q = ri(2, 9), f = ri(1, 5);
    if (Math.random() < 0.5) return [`A1 is the price in dollars and B1 is how many you buy. What does =A1*B1 give?`, p * q, sheet([p, q])];
    return [`A1 is the price, B1 is how many you buy, and C1 is a delivery fee. What does =A1*B1+C1 give?`, p * q + f, sheet([p, q, f])];
  }, ["Read each cell value, then follow the formula in order.", "Multiplication happens before addition, so find the price times the amount first.", "Example: A1 = 3, B1 = 4, C1 = 2. =A1*B1+C1 is 3 x 4 = 12, then 12 + 2 = 14. Now do yours."],
    [["Price x amount", "🛒", "Spreadsheets are great for totals: <b>price x amount</b>."], ["Order", "🪜", "Multiply first, then add: that is the usual math order."], ["Update", "🔄", "Change a price and the total changes by itself."]], 14);
  const A10 = mc("Sort and filter", "🗃️", [
    "Sort these names A to Z. Which comes first: Maya, Ben, Leo?|Ben|Leo|Maya", "Sort these numbers smallest to largest: 12, 5, 30. Which is last?|30|5|12", "What does ascending order mean?|smallest to largest|largest to smallest|in a random order",
    "What does a filter do?|shows only the rows that match a rule|deletes the other rows forever|adds new rows", "You filter the Grade column to show only grade 5. What do you see?|only the rows for grade 5|all of the rows|no rows at all", "What does descending order mean?|largest to smallest|smallest to largest|alphabetical",
    "What is a row in a table?|one record going across|a list going down|the table title", "Sort these fruits A to Z. Which comes first: pear, apple, plum?|apple|pear|plum"],
    ["Think about what the word means: order, or showing only some rows.", "Sorting changes the order. Filtering hides rows that do not match, without erasing them.", "Example: sorting 3, 9, 1 from smallest to largest gives 1, 3, 9. Now do yours."],
    [["Sort", "🔃", "<b>Sorting</b> puts rows in order, like A to Z or smallest to largest."], ["Filter", "🔎", "A <b>filter</b> shows only the rows that match your rule."], ["Rows and columns", "📋", "A <b>row</b> goes across. A <b>column</b> goes down."]]);
  const A11 = mc("Present like a pro", "🎤", [
    "What is a slide transition?|the effect when moving to the next slide|a kind of font|a chart", "What are speaker notes?|reminders only the speaker sees|text printed on every slide|a slide background", "What is an animation on a slide?|movement of text or a picture|a spelling check|a file type",
    "Too many animations can...|distract the audience|help everyone focus|fix spelling", "Which view do you use to present to an audience?|slideshow, full screen|the file list|print preview", "What does a slide master do?|sets the look of all slides at once|deletes slides|spell checks",
    "Which picture is best on a slide?|a clear one that fits the topic|a blurry random one|a tiny one in the corner", "A good slide has...|one main idea|ten ideas|no idea"],
    ["Think about what helps the audience follow along.", "Slides support your talk. Keep the look simple and let your voice carry the ideas.", "Example: a title slide only needs the topic and your name. Now do yours."],
    [["Transitions and animations", "✨", "Use them <b>a little</b>. Too many are distracting."], ["Speaker notes", "🗒️", "Notes are for <b>you</b>. The audience does not see them."], ["One idea", "💡", "Each slide should have <b>one main idea</b>."]]);
  const A12 = num("Bits and bytes", "🔢", () => {
    const t = ri(0, 2);
    if (t === 0) { const b = ri(2, 9); return [`One byte is 8 bits. How many bits are in ${b} bytes?`, b * 8]; }
    if (t === 1) { const c = ri(3, 12); return [`One character takes one byte, and a byte is 8 bits. How many bits does a ${c}-character message use?`, c * 8]; }
    const k = ri(2, 9); return [`A file is ${k * 8} bits. A byte is 8 bits. How many bytes is that?`, k];
  }, ["Work out how many bits sit in each byte, then think multiply or divide.", "Going from bytes to bits means multiplying by eight. Going from bits to bytes means dividing by eight.", "Example: 3 bytes is 3 x 8 = 24 bits. And 40 bits is 40 / 8 = 5 bytes. Now do yours."],
    [["Bit", "💡", "A <b>bit</b> is one 0 or 1, the smallest piece of computer data."], ["Byte", "📦", "A <b>byte</b> is a group of <b>8 bits</b>. One letter often takes one byte."], ["Convert", "🔄", "Bytes x 8 = bits. Bits / 8 = bytes."]]);
  const A13 = num("Binary with 5 bits", "🔢", () => {
    const n = ri(3, 31), b = n.toString(2).padStart(5, "0");
    return [`Binary places from left to right are worth 16, 8, 4, 2, 1. What number is ${b}?`, n, big(b, 2.2)];
  }, ["Line up each digit with its place value. Only the 1s count.", "Add up the place values that have a 1 above them. The 0 places add nothing.", "Example: 01010 has 1s in the 8 and 2 places. 8 + 2 = 10. Now do yours."],
    [["Five places", "🧱", "Five bits have places worth <b>16, 8, 4, 2, 1</b>."], ["Add the ones", "➕", "Add the places that show a <b>1</b>."], ["Biggest", "🏔️", "With all five bits on, the number is 31."]], 10);
  const A14 = num("Trace a repeat loop", "🔁", () => {
    const k = ri(3, 8);
    if (Math.random() < 0.5) { const s = ri(2, 7); return ["What is total at the end?", k * s, code(["total = 0", `repeat ${k} times:`, `${sp}total = total + ${s}`])]; }
    const x = k + ri(1, 6); return ["What is lives at the end?", x - k, code([`lives = ${x}`, `repeat ${k} times:`, `${sp}lives = lives - 1`])];
  }, ["Run the loop in your head. How many times does it go around?", "Each time around, apply the line inside the loop to the value. Do this again and again.", "Example: n = 0, repeat 3 times: n = n + 4. That is 4, 8, then 12. Now do yours."],
    [["Loops", "🔁", "A <b>loop</b> repeats the lines inside it."], ["Trace", "👣", "Write the value after <b>each turn</b> of the loop."], ["Shortcut", "⚡", "Adding the same number again and again is multiplying."]], 12);
  const A15 = mc("Coding words", "💻", [
    "Which of these is a string?|'hello'|42|true", "Which of these is a number value?|7|'seven'|false", "What is a boolean value?|true or false|a long word|a picture",
    "What is a comment in code?|a note for people that the computer skips|a command that runs fast|an error", "What is input?|data that goes into a program|the final result|a bug", "What is output?|what a program shows or gives back|the keyboard|a loop",
    "What is a sequence?|steps that run in order|a random jump|a picture", "Why do programmers indent lines?|to show which lines belong together|to make code run faster|to hide bugs"],
    ["Think about the job of each coding word.", "Values come in kinds: words (strings), numbers and true or false. Programs take input and give output.", "Example: a game takes your button press as input and shows the jump as output. Now do yours."],
    [["Kinds of values", "🏷️", "A <b>string</b> is text, a <b>number</b> is a number, a <b>boolean</b> is true or false."], ["Input and output", "↔️", "<b>Input</b> goes in. <b>Output</b> comes out."], ["Comments", "📝", "A <b>comment</b> explains the code to people."]]);
  const A16 = mc("Privacy settings", "🔒", [
    "A public profile can be seen by...|anyone|only close family|nobody", "What is a good setting for a kid's account?|private, set up with a parent|public to all|no password", "Should you share your location in a post?|no, it shows where you are|yes, always|only with strangers",
    "Someone posts a photo of you that you don't like. What can you do?|ask them to remove it and tell an adult|post one back|say nothing ever", "Who should help you set privacy settings?|a parent or guardian|a stranger|a pop-up", "What can the background of a photo show?|clues like your school or street|nothing at all|only colors",
    "Who should be on your friends list?|people you know in real life|anyone who asks|every player you meet", "Before you post a photo of a friend, you should...|ask if it is okay|post it and say sorry later|tag everyone"],
    ["Think about who could see what you share, and how it could be used.", "Privacy settings choose who sees things. Keep personal details away from people you do not know.", "Example: before posting a picture in front of your house, think about whether strangers could find where you live. Now do yours."],
    [["Who can see?", "👀", "<b>Public</b> means anyone. <b>Private</b> means only people you pick."], ["Hidden clues", "🕵️", "Photos can show your <b>school, street or town</b>."], ["Ask first", "🙋", "Set things up with a <b>parent</b>, and ask before posting others."]]);
  const A17 = mc("Spot a phishing trick", "🎣", [
    "What is phishing?|a fake message that tries to trick you|a fishing game|a type of Wi-Fi", "Which is a phishing clue?|it says act now or your account will close|it comes from a friend you know and talks about last week|it is printed on paper", "An email from a sender with odd spelling in the name is...|a warning sign|a good sign|proof it is real",
    "A link promises free game coins. What should you do?|not click it and tell an adult|click it fast|share it with friends", "A real company will never ask you to email...|your password|your first name|your favorite color", "How can you check if a message is real?|ask a trusted adult or contact the company another way|reply and ask|click the link",
    "An unexpected attachment from someone you don't know should be...|left unopened|opened right away|forwarded", "After spotting a phishing message, you should...|tell an adult and delete it|reply to it|forward it to friends"],
    ["Think about how a trick message tries to rush or scare you.", "Tricks use pressure, odd spelling and links. Stop, do not click, and ask a trusted adult.", "Example: a message says your account is locked and to click now. A real company would not rush you like that. Now do yours."],
    [["Phishing", "🎣", "<b>Phishing</b> messages pretend to be real to steal information."], ["Clues", "🔍", "Look for <b>rushing</b>, odd spelling, strange links and requests for passwords."], ["Stop and ask", "🛑", "Do not click. <b>Tell an adult</b> and delete it."]]);
  const A18 = mc("Safe downloads", "⬇️", [
    "Which ending is often a program that runs on Windows?|.exe|.txt|.jpg", "Where should downloads come from?|official trusted places, with a parent's okay|pop-ups|strangers", "A pop-up says your computer is infected, click here. What is it?|probably a trick|a real alert|a prize",
    "What does antivirus software do?|checks for harmful software|speeds up typing|prints pages", "A free game from a strange site might contain...|malware|bonus levels|nothing", "What is malware?|software made to cause harm|a kind of keyboard|a safe app",
    "Who should approve new downloads?|a parent|nobody|the pop-up", "A file named homework.pdf.exe is...|suspicious|safe|a photo"],
    ["Think about where a file comes from and who made it.", "Harmful programs hide inside free downloads and pop-ups. Check the source and ask a parent.", "Example: a pop-up offers a free speed booster. That is a classic trick, so you close it. Now do yours."],
    [["Trusted places", "✅", "Download only from <b>official places</b>, with a parent's okay."], ["Malware", "🦠", "<b>Malware</b> is software that causes harm."], ["Look closely", "🔎", "File names with <b>two endings</b> can be a trick."]]);
  const L10 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18,
    MIX("Mixed practice", A1, A4, A5, A7, A8, A9, A10, A12, A13, A14, A16, A17),
    MIX("Level 10 Challenge", A2, A3, A5, A6, A8, A11, A12, A14, A15, A16, A17, A18)];

  // =============== LEVEL 11 ===============
  const B1 = ty("Type a longer paragraph", "Type this paragraph.",
    ["every morning, the bus picks us up at eight. we sing songs, read books, or look out the windows. the ride to school feels short.", "my grandmother keeps a small garden. she grows tomatoes, beans, and bright orange flowers. in summer, we pick them together.", "the class made a time capsule. we wrote letters, drew pictures, and sealed everything in a box. we will open it in ten years.", "good typing takes patience. start slowly, fix your mistakes, and practice a little every day. soon your fingers will remember the keys.", "our town has a small park with a pond. ducks swim there in spring, and children feed them bread crumbs on sunny days.", "we planned a surprise party for our teacher. we hid the cake in the closet, and everyone stayed very quiet."],
    ["Break it into sentences and type them one at a time.", "There are {w} words and it starts with \"{f}\". Keep your eyes on the screen and your fingers on the home row.", "Example: for \"we ran. we won. we cheered.\", type each short sentence, then a space after each period. Now type yours."],
    [["Stamina", "🏃", "Longer text builds <b>typing stamina</b>. Keep a steady speed."], ["Spaces", "␣", "Press space <b>once</b> after a comma or a period."], ["Tip", "💡", "Do not stop to fix every little slip. Finish the sentence, then check."]], cap);
  const B2 = ty("Type numbers and symbols", "Type this exactly.",
    ["the total is $12.50 today.", "sale: 25% off, now $30.", "5 + 4 = 9 and 9 - 3 = 6.", "mix 2 cups of flour & 1 cup of milk.", "the score was 15-12 at half time.", "call the office at ext. 4417 after 3:30.", "buy 3 for $9 or 6 for $15.", "the file is 256 mb (about 0.25 gb)."],
    ["Take it slowly and look for each symbol before you press it.", "There are {w} words and it starts with \"{f}\". Symbols above the numbers need the Shift key.", "Example: for <b>2 + 3 = 5</b>, type 2, a space, Shift and the equal key for the plus, a space, 3, and so on. Now type yours."],
    [["Shift symbols", "⬆️", "<b>Shift + 4</b> makes $, <b>Shift + 5</b> makes %, <b>Shift + 7</b> makes &."], ["Math keys", "➗", "The plus sign is on the equal key with Shift. The minus sign is next to zero."], ["Tip", "💡", "Say the symbol in your head as you press it."]]);
  const B3 = ty("Type lines of code", "Type this line of code exactly.",
    ["print(score + 1)", "if lives == 0:", "for i in range(5):", "total = total + price", "name = input('your name')", "def jump(height):", "while speed < 10:", "return a * b", "items = [1, 2, 3]", "else:"],
    ["Code must be exact. Check every bracket and symbol.", "The line has {n} characters without spaces and starts with \"{f}\". Round brackets use Shift and the 9 and 0 keys.", "Example: for <b>show(x)</b>, type show, Shift 9 for the open bracket, x, then Shift 0 for the close bracket. Now type yours."],
    [["Brackets", "🔣", "Round brackets <b>( )</b> are Shift + 9 and Shift + 0. Square brackets <b>[ ]</b> are next to P."], ["Colons and quotes", "💬", "The colon is Shift + the semicolon key. Quotes sit by the Enter key."], ["Exact", "🎯", "One missing bracket can stop a whole program."]]);
  const B4 = num("Compare two typists", "🏁", () => {
    const [a, b] = two(), x = ri(15, 40), y = x + ri(3, 15), m = pick([2, 3, 4, 5]);
    return [`${a} typed ${x * m} words in ${m} minutes. ${b} typed ${y * m} words in the same ${m} minutes. How many more WPM did ${b} type?`, y - x];
  }, ["Work out each person's WPM first. Then compare them.", "Divide each person's words by the minutes. Then take the smaller from the bigger.", "Example: 60 words and 90 words in 3 minutes. That is 20 WPM and 30 WPM. The gap is 10. Now do yours."],
    [["Fair test", "⚖️", "To compare, use the same time for both typists."], ["Two steps", "🪜", "Find each <b>WPM</b>, then <b>subtract</b>."], ["Racing yourself", "🏁", "The best comparison is with your own last score."]], 10);
  const B5 = num("Practice plan", "📅", () => {
    if (Math.random() < 0.6) { const d = pick([10, 15, 20, 25]), k = ri(3, 6), w = ri(2, 5); return [`Mia practices typing ${d} minutes a day for ${k} days each week. How many minutes does she practice in ${w} weeks?`, d * k * w]; }
    const d = pick([20, 30, 40, 60]); return [`Leo wants to practice 120 minutes each week. He practices ${d} minutes on each practice day. How many practice days does he need each week?`, 120 / d];
  }, ["Think about what happens each week, then how many weeks there are.", "Find the minutes in one week first. For weeks, multiply. For a target, divide.", "Example: 10 minutes a day for 4 days is 40 minutes a week, so 2 weeks is 80 minutes. Now do yours."],
    [["Small steps", "🐾", "Short, regular practice beats one long session."], ["Plan", "📅", "Minutes a day x days a week = <b>minutes a week</b>."], ["Track it", "📈", "Write your speed each week and watch it grow."]], 80);
  const B6 = mc("Email: To, Cc and Bcc", "📨", [
    "What does Cc mean?|send a copy that everyone can see|hide the message|delete the message", "What does Bcc do?|sends a copy without showing that name to others|shows everyone the name|blocks the email", "When is Cc a good choice?|when others should see the message too|when it is secret|never",
    "Which greeting is best for a teacher?|Dear Ms. Lopez,|Yo,|Hey you", "Why check the To line before sending?|so the message reaches the right person|to make it longer|to change the font", "What does 'Forward' do?|sends an email you got to someone else|deletes it|replies to the sender only",
    "Which is a good way to end an email?|Thank you, Sam|bye bye|nothing at all", "Before you hit Send, you should...|read it over once|send it twice|delete the subject"],
    ["Think about who sees the message and how polite it sounds.", "To is the main person. Cc adds people who should see it. Bcc adds people without showing their names.", "Example: you invite the class by email and use Cc for the teacher so she knows too. Now do yours."],
    [["To, Cc, Bcc", "📬", "<b>To</b> is the main reader. <b>Cc</b> shows copies. <b>Bcc</b> hides names."], ["Polite", "🙂", "Start with <b>Dear</b> and a name. End with <b>thank you</b>."], ["Check", "👀", "Read it and check the To line <b>before</b> Send."]]);
  const B7 = num("Order of operations", "🧮", () => {
    const a = ri(2, 12), b = ri(2, 9), c = ri(2, 6);
    if (Math.random() < 0.55) return ["What does =A1+B1*C1 give? Remember: multiply before adding.", a + b * c, sheet([a, b, c])];
    return ["What does =(A1+B1)*C1 give? Brackets go first.", (a + b) * c, sheet([a, b, c])];
  }, ["Spreadsheets follow the usual math order. Check for brackets first.", "Brackets first, then multiply and divide, then add and subtract.", "Example: A1 = 2, B1 = 3, C1 = 4. =A1+B1*C1 is 2 + 12 = 14, while =(A1+B1)*C1 is 5 x 4 = 20. Now do yours."],
    [["The order", "🪜", "<b>Brackets</b>, then <b>x and /</b>, then <b>+ and -</b>."], ["Brackets help", "🔲", "Brackets make a formula do the part you want first."], ["Check", "✅", "Test a formula with easy numbers to see if it is right."]], 14);
  const B8 = num("Discount in a sheet", "🏷️", () => {
    let p, pc, d;
    do { p = pick([20, 40, 50, 60, 80, 100, 120, 200]); pc = pick([10, 20, 25, 50]); d = p * pc / 100; } while (!Number.isInteger(d));
    return [`A1 is the price in dollars and B1 is the percent off. A shop uses =A1-A1*B1/100. What is the new price?`, p - d, sheet([p, pc])];
  }, ["First find how much is taken off, then take it away from the price.", "The money off is the price times the percent, divided by one hundred. Then subtract it from the price.", "Example: price 50, percent off 20. 50 x 20 / 100 = 10 off. 50 - 10 = 40. Now do yours."],
    [["Percent off", "🏷️", "Percent off means <b>part of the price</b> is taken away."], ["Two steps", "🪜", "Money off = price x percent / 100. New price = price - money off."], ["Check", "✅", "The new price is always less than the old price."]], 40);
  const B9 = mc("Tables of data", "🗒️", [
    "In a data table, what is a column?|a list of one kind of information going down|one full record going across|the table title", "What is a header?|the name at the top of a column|the last row|a picture", "What is a record?|one row with all the facts about one thing|a column of numbers|the table's file name",
    "A table has columns Name, Age and Grade. Which row holds the facts about one student?|any one row|the header only|the title", "Which column header best holds pet names?|Pet name|Stuff|Column 1", "Why keep a column to one kind of information?|so it is easy to sort and count|to waste space|to make it longer",
    "A cell is...|one box where a row and a column meet|a whole table|a file folder", "What do we call a collection of organized data on a computer?|a database|a printer|a window"],
    ["Picture the table with rows going across and columns going down.", "Headers name each column. Each row is one record about one thing.", "Example: a pet table has columns Name and Animal. One row might hold Rex and dog. Now do yours."],
    [["Rows and columns", "📋", "<b>Rows</b> go across. <b>Columns</b> go down."], ["Headers", "🏷️", "Each column has a <b>header</b> that says what it holds."], ["Records", "🗂️", "One row is one <b>record</b>, all about one thing."]]);
  const B10 = num("Will it fit?", "💾", () => {
    const p = pick([2, 4, 5, 8, 10]), g = ri(1, 4);
    if (Math.random() < 0.6) return [`A photo is ${p} MB. A card holds ${g} GB, and 1 GB is 1000 MB. How many photos fit?`, g * 1000 / p];
    const f = pick([50, 100, 250]), s = ri(2, 6); return [`Each video is ${f} MB. How many MB do ${s} videos use?`, f * s];
  }, ["Change the units to match first if you need to. Then think divide or multiply.", "A GB holds a thousand MB. To see how many fit, divide the space by the size of one.", "Example: 3 GB is 3000 MB. If a song is 5 MB, then 3000 / 5 = 600 songs fit. Now do yours."],
    [["Units", "📏", "<b>1 GB = 1000 MB</b>. Make the units match."], ["How many fit", "📦", "Space / size of one = <b>how many fit</b>."], ["Plan", "🗄️", "Check space before you save a big video."]], 600);
  const B11 = num("Write it in binary", "🔢", () => {
    const n = ri(3, 31);
    return [`Write ${n} in binary using five digits. Places are 16, 8, 4, 2, 1.`, n.toString(2).padStart(5, "0"), big(String(n), 2.4)];
  }, ["Find the biggest place value that fits, then see what is left.", "Put a 1 in each place you use and a 0 in each place you skip. Work from the left.", "Example: 10 = 8 + 2, so the 8 and 2 places get a 1: 01010. Now do yours."],
    [["Decimal to binary", "🔄", "Break the number into <b>16, 8, 4, 2, 1</b>."], ["1 or 0", "💡", "Use a <b>1</b> for each place you need and a <b>0</b> for each you skip."], ["Check", "✅", "Add your places back up to be sure."]], "01010");
  const B12 = num("Trace an if", "🔀", () => {
    const x = ri(5, 12), t = ri(3, 10), a = ri(2, 6), b = ri(1, 4);
    if (Math.random() < 0.5) return ["What is x at the end?", x > t ? x + a : x, code([`x = ${x}`, `if x > ${t}:`, `${sp}x = x + ${a}`])];
    return ["What is x at the end?", x > t ? x + a : x - b, code([`x = ${x}`, `if x > ${t}:`, `${sp}x = x + ${a}`, "else:", `${sp}x = x - ${b}`])];
  }, ["Check the condition first. Is it true for the starting value?", "If it is true, run the lines under the if. If it is false, skip them, or run the else lines.", "Example: x = 5, if x > 8: x = x + 1, else: x = x - 2. 5 is not more than 8, so the else runs and x is 3. Now do yours."],
    [["Condition", "❓", "An <b>if</b> checks something that is true or false."], ["Else", "↪️", "<b>Else</b> runs when the if is false."], ["Trace", "👣", "Check the condition, then follow only the path that runs."]], 3);
  const B13 = mc("Lists in code", "📃", [
    "Lists start counting at position 0. In [red, blue, green], what is at position 0?|red|blue|green", "In [red, blue, green], what is at position 1?|blue|red|green", "In [red, blue, green], what is at position 2?|green|blue|red",
    "A list has 5 items. What is the last position, counting from 0?|4|5|6", "What is a list in code?|a collection of values kept in order|a single number|a picture", "In [3, 8, 1], what is the item at position 1?|8|3|1",
    "How many items are in [a, b, c, d]?|4|3|5", "What do we call one value inside a list?|an item|a bug|a loop"],
    ["Remember that code usually starts counting at zero, not one.", "Position zero is the first item. Position one is the second item, and so on.", "Example: in [cat, dog, bird], position 0 is cat and position 2 is bird. Now do yours."],
    [["Lists", "📃", "A <b>list</b> keeps values in order, like [red, blue, green]."], ["Zero first", "0️⃣", "The first item is at position <b>0</b>."], ["Count", "🔢", "A list with 4 items ends at position 3."]]);
  const B14 = mc("How data travels", "📡", [
    "What does a domain name like example.com help with?|it is an easy name for a website address|it makes the internet faster|it stores your files", "What does DNS do?|turns a website name into a number address|checks your spelling|deletes cookies", "What is an ISP?|a company that gives you internet access|a type of keyboard|a game",
    "What is a packet?|a small piece of data sent over a network|a box of cookies|a kind of virus", "What does bandwidth tell you?|how much data can move at once|how big the screen is|how loud a speaker is", "Why is video slow on a weak connection?|it needs lots of data|videos hate Wi-Fi|the keys stick",
    "What is latency?|the delay before data arrives|the size of a file|a screen setting", "Data on the internet travels through...|cables, signals and many connected computers|only one big computer|the air only"],
    ["Think about how a request goes from your device to a faraway computer and back.", "Names are changed into number addresses. Data is cut into packets and sent through many connected computers.", "Example: when you open a site, DNS finds its number address and packets carry the page to you. Now do yours."],
    [["Names to numbers", "🔢", "<b>DNS</b> turns a website name into a number address."], ["Packets", "📦", "Data is split into small <b>packets</b> and put back together."], ["Speed", "⚡", "<b>Bandwidth</b> is how much can flow. <b>Latency</b> is the delay."]]);
  const B15 = mc("Search tricks", "🔎", [
    "What do quotation marks around words do in many search tools?|look for that exact phrase|hide the results|translate the words", "What does a minus sign before a word often do?|leaves out results with that word|makes it bold|adds the word twice", "Which search is most specific?|how tall is the Eiffel Tower in meters|tall|tower",
    "Many search tools can limit results by...|date|the weather|your shoe size", "Why add the year to a search about the latest model?|to find recent information|to change the spelling|to make results longer", "You search 'jaguar' and get cars. How do you find the animal?|add a word like animal or rainforest|search louder|give up",
    "Which part of a result tells you the website?|the web address|the font|the ad", "If results look wrong or not for kids, you should...|close them and tell an adult|read them anyway|share them"],
    ["Think about how to make the search words clearer.", "Exact phrases, extra words and filters narrow down results.", "Example: searching 'apple' gives fruit and computers. Adding 'tree' points to the fruit. Now do yours."],
    [["Exact phrase", "💬", "Put words in <b>quotation marks</b> to find that exact phrase."], ["Leave out", "➖", "A <b>minus sign</b> before a word often leaves it out."], ["Be specific", "🎯", "More exact words give better results."]]);
  const B16 = mc("Chat in online games", "🎮", [
    "A player you don't know asks where you live. What do you do?|stop replying and tell a parent|tell them|give a hint", "Someone online offers you free game gifts if you keep it secret. What now?|stop replying and tell a parent right away|accept|keep the secret", "Someone asks you to move to a private chat. What do you do?|stop replying and tell a parent|say yes|ask them to wait",
    "Is it OK to share your real name in a game chat?|no, use a game name instead|yes|only on weekends", "Someone is rude in the chat. What helps?|block or mute them and tell an adult|be rude back|ask for their address", "Who should you chat with online?|people you know in real life|anyone who asks|the best player",
    "Someone asks for a photo of you. What do you do?|stop replying and tell a parent|send one|send one of your pet", "A good game name is...|made up, with no real details|your full name|your school and age"],
    ["Think about keeping personal details private and who you can trust.", "If a stranger asks for details, a private chat, or a secret, stop replying and tell a parent straight away.", "Example: a stranger says they have a gift but it must be our secret. That is a warning sign, so you stop and tell a parent. Now do yours."],
    [["Private details", "🔒", "Never share your <b>real name, age, school, town or photos</b> online."], ["Warning signs", "🚩", "Gifts, secrets and private chats from strangers are <b>red flags</b>."], ["Tell a parent", "👪", "Stop replying and <b>tell a parent</b> straight away."]]);
  const B17 = mc("App permissions", "📲", [
    "A flashlight app asks for your contacts. What do you do?|say no, it doesn't need them|say yes|ignore it and click all", "Why does a map app need your location?|to show where you are on the map|to steal your password|to change the font", "What is a camera permission for?|letting an app use the camera|making photos bigger|charging the phone",
    "Who should say yes to new permissions on your device?|a parent|a pop-up|a stranger", "Can you take back a permission later?|yes, in the settings|no, never|only by buying a new device", "A game wants your microphone for no reason. This is...|something to question|normal|a prize",
    "What are cookies on a website?|small files that remember things about your visit|a snack|a kind of virus", "Why read what an app asks for?|to share only what is needed|to make it slower|to find ads"],
    ["Think about whether the app really needs what it is asking for.", "Apps should ask only for what they need to do their job. A parent can help you decide.", "Example: a calculator that asks for your photos does not need them, so the answer is no. Now do yours."],
    [["Only what's needed", "🎯", "An app should ask only for what it <b>needs</b> to do its job."], ["Settings", "⚙️", "You can <b>change permissions</b> later in the settings."], ["Ask a parent", "👪", "A parent helps decide what to allow."]]);
  const B18 = mc("Tech that helps everyone", "♿", [
    "What does a screen reader do?|reads the screen out loud|makes the screen brighter|cleans the screen", "What are captions for?|showing spoken words as text|making video shorter|changing the music", "What does zoom or magnify help with?|seeing small text and pictures|hearing better|typing faster",
    "What does high contrast do?|makes text stand out from the background|mutes sound|turns off Wi-Fi", "What does voice control let you do?|use the computer by speaking|print by voice only|make a louder fan", "Why add alt text to a picture?|so a screen reader can describe it|to make it smaller|to hide it",
    "Why use a big, clear font?|it is easier for many people to read|it uses less paper|it makes files smaller", "Why does accessibility matter?|so everyone can use technology|so only experts can use it|so it costs more"],
    ["Think about a person who needs help seeing, hearing or typing.", "Accessibility tools let more people use computers in the way that works for them.", "Example: captions help someone who cannot hear a video, and also help in a noisy room. Now do yours."],
    [["Tools", "🧰", "Screen readers, captions, zoom and voice control help many people."], ["Alt text", "🖼️", "<b>Alt text</b> describes a picture for people who cannot see it."], ["For everyone", "🌍", "Good design works for <b>everyone</b>."]]);
  const L11 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18,
    MIX("Mixed practice", B1, B2, B4, B5, B7, B8, B10, B11, B12, B13, B14, B16),
    MIX("Level 11 Challenge", B3, B4, B6, B8, B9, B11, B12, B15, B16, B17, B18, B10)];

  // =============== LEVEL 12 ===============
  const C1 = ty("Type a report paragraph", "Type this paragraph. Watch the numbers and punctuation.",
    ["the school library has 4,200 books. students borrowed 350 of them in march, and the most popular topic was space.", "in 2024, our class raised $215 for the animal shelter. we held a bake sale on friday, and 48 families came.", "a marathon is 26.2 miles long. runners train for months, drink water often, and rest the day before the race.", "the museum opens at 9:30 and closes at 4:00. tickets cost $8 for adults and $5 for children.", "our robot club meets on tuesdays at 3:15. we have 12 members, and we built 3 robots this year.", "the lake is 18 feet deep at its middle. in july, the water reaches about 75 degrees."],
    ["Type one sentence at a time and slow down on the numbers.", "There are {w} words and it starts with \"{f}\". Use the number row for digits, and the Shift key for the dollar sign.", "Example: for \"we sold 12 cups for $3.\", type the words, the digits 1 and 2, the dollar sign with Shift and 4, and the 3. Now type yours."],
    [["Reports", "📄", "Reports mix words with <b>numbers</b>, so you need both skills."], ["Commas in numbers", "🔢", "A comma separates thousands, like <b>4,200</b>."], ["Check", "🔍", "Read your numbers twice. A wrong digit changes the facts."]], cap);
  const C2 = ty("Type a formal sentence", "Type this sentence from a letter.",
    ["dear mr. lee, thank you for your time today.", "i am writing to ask about the science club.", "please find my report attached to this email.", "thank you for your help, and i look forward to your reply.", "we would like to invite you to our class show.", "dear ms. park, i am sorry that i missed class.", "sincerely, maya reed", "i have attached the file you asked for."],
    ["Look at where the commas and periods go, especially after titles like Mr. and Ms.", "There are {w} words and it starts with \"{f}\". Titles such as Mr. and Ms. end with a period.", "Example: for \"dear dr. cole, thanks.\", type dear, dr, a period, cole, a comma, and thanks with a period. Now type yours."],
    [["Formal writing", "🎩", "Letters to teachers and adults use <b>polite, complete sentences</b>."], ["Titles", "🏷️", "<b>Mr.</b>, <b>Ms.</b> and <b>Dr.</b> start with a capital and end with a period."], ["Closing", "✉️", "End with <b>Sincerely</b> or <b>Thank you</b> and your name."]], cap);
  const C3 = ty("Type a web address", "Type this made-up web address exactly.",
    ["www.example.com/news", "www.example.org/about", "https://example.com/games", "www.example.net/photos/trip", "https://example.org/club/join", "www.example.com/help/faq", "https://example.net/school/maps", "www.example.org/recipes/soup"],
    ["Web addresses have no spaces. Read it in small chunks.", "It has {n} characters and starts with \"{f}\". The slash key is next to the period key.", "Example: for <b>www.site.com/fun</b>, type www, a dot, site, a dot, com, a slash, and fun. Now type yours."],
    [["Parts", "🧩", "An address has a <b>site name</b>, a dot ending like <b>.com</b>, and maybe a page after a <b>slash</b>."], ["Slash", "➗", "The forward slash is next to the period key."], ["Exact", "🎯", "One wrong letter leads to a different place."]]);
  const C4 = num("Speed you need", "⏳", () => {
    const wpm = pick([20, 25, 30, 35, 40, 45, 50, 60]), m = ri(3, 8), n = pick(names);
    return [`${n} must type a ${wpm * m}-word story in ${m} minutes. How many words per minute (WPM) does ${n} need to type?`, wpm];
  }, ["Think of how the words are spread over the minutes.", "Divide the number of words by the number of minutes you have.", "Example: 150 words in 5 minutes needs 150 / 5 = 30 WPM. Now do yours."],
    [["Deadlines", "⏳", "Speed tells you if you can finish on time."], ["Divide", "➗", "Needed WPM = words / minutes."], ["Plan", "📅", "Leave extra time for checking your work."]], 30);
  const C5 = num("Speed with accuracy", "🎯", () => {
    let w, a, r;
    do { w = pick([20, 30, 40, 50, 60, 80]); a = pick([50, 75, 80, 90, 95]); r = w * a / 100; } while (!Number.isInteger(r));
    return [`Ivan types ${w} WPM with ${a} percent accuracy. His effective speed is WPM x accuracy percent / 100. What is it?`, r];
  }, ["Accuracy is a part of a whole. Think of it as a share of his speed.", "Multiply the WPM by the accuracy percent, then divide by one hundred.", "Example: 40 WPM at 50 percent is 40 x 50 / 100 = 20 effective WPM. Now do yours."],
    [["Effective speed", "🎯", "Only <b>correct</b> typing really counts."], ["Formula", "🧮", "WPM x accuracy / 100."], ["Better to be accurate", "✅", "A slower, careful typist can beat a fast, messy one."]], 20);
  const C6 = mc("Smart practice", "🏋️", [
    "Which practice helps most?|short, regular sessions focused on your weak keys|one huge session a month|only typing easy words", "What should you do after a typing test?|look at which letters you missed|forget it|retake it instantly ten times", "What is a good way to improve accuracy?|slow down until you make few mistakes|speed up|look at your hands",
    "Why use all ten fingers?|each finger covers a few keys, so you reach less|it is harder|it looks nice", "What is muscle memory?|your hands remembering key positions through practice|a gym machine|a keyboard setting", "What does a plateau mean in practice?|a time when progress slows down|your best score ever|a broken key",
    "What helps you get past a plateau?|keep practicing and try new texts|stop practicing|change keyboards daily", "Which goal is best?|a clear goal like 5 more WPM by next month|get fast|be perfect tomorrow"],
    ["Think about how athletes and musicians practice.", "Regular, focused practice on what is hard works better than random long sessions.", "Example: if you keep missing the letter Q, type words with Q for five minutes each day. Now do yours."],
    [["Focus", "🎯", "Practice the keys that give <b>you</b> trouble."], ["Regular", "📅", "<b>Short, regular</b> practice builds muscle memory."], ["Plateau", "⛰️", "Progress sometimes slows down. Keep going and it picks up again."]]);
  const C7 = num("A small budget", "🧾", () => {
    const a = ri(2, 9), b = ri(2, 6), c = ri(3, 12), d = ri(2, 5);
    return [`A1 is the price of a pen and B1 is how many pens. A2 is the price of a notebook and B2 is how many. What does =A1*B1+A2*B2 give in dollars?`, a * b + c * d,
      `<span style="font-size:1.2em;font-weight:bold">A1 = ${a}&nbsp;&nbsp; B1 = ${b}<br>A2 = ${c}&nbsp;&nbsp; B2 = ${d}</span>`];
  }, ["Find the cost of each item first, then put them together.", "Multiply price by amount for the pens, do the same for the notebooks, then add the two totals.", "Example: A1 = 2, B1 = 3, A2 = 4, B2 = 1. Then 2 x 3 = 6 and 4 x 1 = 4, so the total is 10. Now do yours."],
    [["Totals", "🧾", "A list of items and prices becomes a <b>budget</b>."], ["Each row", "➡️", "Multiply <b>price x amount</b> for each item."], ["Add up", "➕", "Then add the row totals together."]], 10);
  const C8 = num("The IF function", "🔀", () => {
    const op = pick([">", "<", ">="]), t = ri(8, 20), v = ri(t - 5, t + 5);
    const res = op === ">" ? v > t : op === "<" ? v < t : v >= t;
    return [`In the sheet, what does =IF(A1${op.replace(">", "&gt;").replace("<", "&lt;")}${t},"Pass","Fail") show? Type Pass or Fail.`, res ? "Pass" : "Fail", sheet([v])];
  }, ["Check the test inside the brackets against the cell value first. Is it true?", "IF shows the first word when the test is true and the second word when it is false.", "Example: A1 = 4 and =IF(A1&gt;5,\"Yes\",\"No\"). 4 is not more than 5, so it shows No. Now do yours."],
    [["IF", "🔀", "<b>=IF(test, if true, if false)</b> picks between two answers."], ["Test", "❓", "The test uses signs like <b>&gt;</b>, <b>&lt;</b> and <b>&gt;=</b>."], ["Use", "🧰", "Mark scores as pass or fail across a whole column at once."]], "No");
  const C9 = mc("Pro document tools", "📑", [
    "What is a header in a document?|text that repeats at the top of every page|the first word|a heading style", "What is a footer?|text that repeats at the bottom of every page|the last sentence|a bullet", "What do styles like Heading 1 help with?|a consistent look and a table of contents|spell checking|saving",
    "What is 'Track Changes' for?|showing the edits people make|stopping all edits|deleting the file", "What is a comment in a document?|a note beside the text for other readers|a spelling mistake|a font", "What does version history let you do?|go back to an earlier copy|print faster|change the font",
    "What is a template?|a ready-made layout you can start from|a virus|a spelling tool", "Why add page numbers?|so readers can find their place|to fill space|to save the file"],
    ["Think about what each tool does for the reader or the writer.", "Pro tools keep long documents tidy and let people work together.", "Example: a footer with the page number helps a reader find page 7 in a long report. Now do yours."],
    [["Header and footer", "📎", "Text in the <b>header</b> and <b>footer</b> repeats on every page."], ["Styles", "🔠", "Heading styles make a <b>consistent look</b> and a table of contents."], ["Together", "👥", "<b>Comments</b> and <b>Track Changes</b> help people edit together."]]);
  const C10 = mc("Sharing and teamwork", "👥", [
    "What does 'view only' mean on a shared file?|you can read it but not change it|you can change anything|you can delete it for everyone", "What does 'can edit' mean?|you can change the file|you can only look|you can only print", "Who should you share a school document with?|only the people who need it|everyone online|strangers",
    "Why use one shared file instead of many copies?|everyone works on the latest version|it is slower|it makes mistakes", "What should you do before editing a teammate's part?|ask or leave a comment|delete it|change it quietly", "What does a share link do?|lets people with the link open the file|deletes the file|locks everyone out",
    "If you share a link by mistake, what can you do?|change the sharing settings and tell an adult|ignore it|share it more", "A good team habit is...|saying thanks and giving clear feedback|taking all the credit|working in secret"],
    ["Think about who should see or change a file, and how teammates stay kind.", "Choose the right sharing level and share only with people who need the file.", "Example: a teacher wants to read your report, so you give 'view only' or 'comment', not edit rights. Now do yours."],
    [["Permissions", "🔑", "<b>View</b>, <b>comment</b> and <b>edit</b> give different powers."], ["Careful sharing", "🔗", "Share only with the people who <b>need</b> it."], ["Be kind", "🤝", "Leave clear, kind comments."]]);
  const C11 = num("How many patterns?", "🎰", () => {
    if (Math.random() < 0.6) { const n = ri(2, 7); return [`${n} bits can make different on and off patterns. Each extra bit doubles the number. 1 bit makes 2 patterns. How many patterns can ${n} bits make?`, 2 ** n]; }
    const n = ri(2, 6); return [`How many bits do you need to make ${2 ** n} different patterns? (1 bit makes 2, 2 bits make 4, 3 bits make 8...)`, n];
  }, ["Start with one bit and keep doubling for each extra bit.", "Each new bit doubles the patterns. Count how many doublings you need.", "Example: 3 bits make 8 patterns, because 2 doubled three times is 2, 4, 8. Now do yours."],
    [["Doubling", "✖️", "Each extra bit <b>doubles</b> the patterns."], ["The list", "🔢", "1 bit: 2, 2 bits: 4, 3 bits: 8, 4 bits: 16..."], ["Why", "💡", "More bits let computers store more colors, letters and sounds."]], 8);
  const C12 = num("Loop with a counter", "🔁", () => {
    const a = ri(1, 4), b = a + ri(2, 4);
    let s = 0; for (let i = a; i <= b; i++) s += i;
    if (Math.random() < 0.7) return ["What is sum at the end?", s, code(["sum = 0", `for i from ${a} to ${b}:`, `${sp}sum = sum + i`])];
    return ["What is sum at the end?", s * 2, code(["sum = 0", `for i from ${a} to ${b}:`, `${sp}sum = sum + i * 2`])];
  }, ["A loop with a counter changes the counter each time around. Follow it one turn at a time.", "Write down i for each turn, and add it into sum each time.", "Example: for i from 1 to 3, sum = sum + i. That gives 1, then 1 + 2 = 3, then 3 + 3 = 6. Now do yours."],
    [["Counter", "🔢", "In a <b>for loop</b>, the counter <b>i</b> changes each turn."], ["Running total", "➕", "<b>sum = sum + i</b> adds each i into the total."], ["Trace", "👣", "Write a little table: i, then sum."]], 6);
  const C13 = mc("True or false logic", "🧠", [
    "age = 10. Is (age &gt; 8) AND (age &lt; 12) true or false?|true|false|nothing", "age = 15. Is (age &gt; 8) AND (age &lt; 12) true or false?|false|true|nothing", "AND is true only when...|both parts are true|one part is true|neither is true",
    "OR is true when...|at least one part is true|both parts are false|never", "What does NOT do to true?|makes it false|keeps it true|makes it a number", "x = 5. Is (x &lt; 3) OR (x &gt; 4) true or false?|true|false|nothing",
    "x = 5. Is (x &lt; 3) AND (x &gt; 4) true or false?|false|true|nothing", "Is NOT (2 &gt; 5) true or false?|true|false|nothing"],
    ["Work out each small comparison on its own first.", "AND needs both parts to hold. OR needs only one to hold. NOT flips the result.", "Example: (4 &gt; 2) AND (4 &gt; 9) is true AND false, so the whole thing is false. Now do yours."],
    [["True or false", "✅", "Computers decide with <b>true</b> and <b>false</b>."], ["AND, OR", "🔗", "<b>AND</b>: both true. <b>OR</b>: at least one true."], ["NOT", "🔄", "<b>NOT</b> flips true to false and false to true."]]);
  const C14 = mc("Your data and companies", "🗄️", [
    "What is personal data?|facts that tell who you are, like your name and address|the color of your keyboard|a type of file", "Why do some apps collect data?|to run, to improve, and sometimes to show ads|to give you free computers|to fix your keys", "What is a privacy policy?|a page explaining how a site uses your data|a password|a game rule",
    "Why should you ask a parent before making an account?|they can check what data is asked for|it is a secret rule|accounts cost money", "Which is private information?|your home address|your favorite color|a joke you like", "What does 'data breach' mean?|private data was taken or leaked|a computer got faster|an update finished",
    "What can you do after a company says there was a breach?|change your password with a parent's help|ignore it|share the news with strangers", "Why use as little personal data as possible?|there is less to be lost or misused|it saves paper|it is boring"],
    ["Think about which facts could be used to find or trick you.", "The less personal data you share, the safer you are. Ask a parent before signing up.", "Example: a site asks for your home address to play a game. That is more than it needs, so you stop and ask a parent. Now do yours."],
    [["Personal data", "🪪", "Your <b>name, address, school and birthday</b> are personal data."], ["Policies", "📜", "A <b>privacy policy</b> explains what a site does with data."], ["Share less", "🔒", "Share only what is needed, and <b>ask a parent first</b>."]]);
  const C15 = mc("Check pictures and posts", "🕵️", [
    "Pictures can be edited. What should you do with a shocking picture?|check where it came from before believing it|share it fast|believe it", "What is a reverse image search for?|finding where else a picture appears|making it bigger|deleting it", "What does misinformation mean?|false information, spread by mistake or on purpose|information that is true|a spelling tool",
    "A post makes you very angry. What is a smart move?|pause and check it before sharing|share at once|comment angrily", "What is a good sign of a reliable report?|it names sources you can check|it has no author|it uses all capitals", "What is a headline's job?|to grab attention, so read the whole story|to tell the full truth|to be a source",
    "A photo looks too amazing to be real. This could mean...|it was edited or made by a computer|it is surely real|it is a map", "Before sharing news, you should...|check at least two good sources|ask no one|share it first"],
    ["Think about how to check whether something is true before passing it on.", "Check who made it, look for other good sources, and pause when something makes you react fast.", "Example: a video claims dogs can talk. You check a trusted pet site and find nothing, so it is probably fake. Now do yours."],
    [["Pause", "⏸️", "Strong feelings are a sign to <b>stop and check</b>."], ["Sources", "📚", "Look for <b>named sources</b> and other good reports."], ["Edited", "🖼️", "Pictures and videos can be <b>edited or made by computers</b>."]]);
  const C16 = mc("Post wisely", "📣", [
    "After you post something online, it can...|be copied or saved by others|disappear forever|be seen by only you", "What does a screenshot do?|saves a picture of your screen|deletes the screen|prints a book", "Before posting, you should ask yourself...|would I be okay if my family and teacher saw this?|will this get the most likes?|can I hide who I am?",
    "A friend asks you to post an unkind joke about someone. What do you do?|say no and be kind|post it|share it privately", "How can your posts affect your future?|people may look at them later|they can't|they vanish in a week", "Is it OK to post a classmate's embarrassing photo?|no, it could hurt them|yes|only if it is funny",
    "You posted something you regret. What should you do?|delete it and tell a parent if it spread|leave it|post a worse one", "Which post is kind?|congratulating a friend on a win|making fun of someone's mistake|sharing a secret"],
    ["Think about how long a post can last and who might see it.", "Posts can be copied and shared. Be kind, ask permission, and think before you send.", "Example: you want to post a funny picture of a friend. You ask them first, because it is their face and their feelings. Now do yours."],
    [["Stays online", "💾", "Posts can be <b>saved and shared</b>, even if you delete them."], ["Think first", "🧠", "Ask: would I be fine with <b>my family seeing this</b>?"], ["Be kind", "💛", "Do not post things that could <b>hurt</b> someone."]]);
  const C17 = mc("Jobs with computers", "👩‍💻", [
    "What does a programmer do?|writes the instructions that make software work|fixes only printers|draws on paper", "What does a web designer do?|plans how a website looks and feels|builds roads|repairs keyboards", "What does a network engineer do?|keeps computers connected to each other|writes poems|sells paper",
    "What does a data analyst do?|studies numbers to find useful patterns|only types letters|paints pictures", "What does a game artist make?|characters, scenes and pictures for games|batteries|electricity", "What does a cybersecurity expert do?|protects computers and data from harm|plays games all day|prints posters",
    "What does a tech support worker do?|helps people fix computer problems|designs cars|trains animals", "Which skill helps in many tech jobs?|solving problems step by step|never asking questions|skipping practice"],
    ["Think about what each job name says about the work.", "Many jobs use computers in different ways, from building apps to protecting data.", "Example: a game tester plays a game to find bugs before players do. Now do yours."],
    [["Many paths", "🛤️", "People work with computers as <b>builders, designers, helpers and protectors</b>."], ["Skills", "🧩", "<b>Problem solving</b> and <b>clear typing</b> help in almost every job."], ["Keep learning", "📚", "Tech changes, so good workers keep learning."]]);
  const C18 = mc("Plan with digital tools", "🗓️", [
    "What is a calendar app good for?|keeping track of dates and events|editing photos|printing", "What does a reminder do?|alerts you at a set time|deletes tasks|makes calls", "What is a to-do list for?|tracking what needs doing|storing songs|zooming in",
    "How can you name files to find them later?|use clear names with dates|use random letters|call everything file1", "What is a good habit for important school files?|keep a backup copy|keep one copy only|delete them when done", "Too many notifications can...|distract you from work|help you focus|fix bugs",
    "What is a good way to break a big project down?|split it into small tasks with dates|do it all at once|wait until the last night", "What does turning on 'do not disturb' help with?|focusing without alerts|making louder alerts|deleting notifications"],
    ["Think about how a tool helps you stay organized and calm.", "Calendars, lists and reminders help you plan. Small steps and backups keep work safe.", "Example: for a book report due in two weeks, split it into read, outline, draft and fix, and put each step on a date. Now do yours."],
    [["Plan", "🗓️", "Use a <b>calendar</b> and a <b>to-do list</b> to plan."], ["Small steps", "🪜", "Break big jobs into <b>small tasks with dates</b>."], ["Focus", "🔕", "Turn off extra alerts when you work."]]);
  const L12 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18,
    MIX("Mixed practice", C1, C2, C4, C5, C7, C8, C9, C11, C12, C13, C14, C15),
    MIX("Level 12 Challenge", C3, C5, C6, C7, C8, C10, C11, C12, C13, C16, C17, C18)];

  Object.assign(TYPING_LEVELS, { 10: L10, 11: L11, 12: L12 });
})();
