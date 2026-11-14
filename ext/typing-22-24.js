// ext/typing-22-24.js  Mind Lab Typing & Computers, levels 22-24 (60 lessons)
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
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder of each one, then the quiz." }].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };
  const cap = s => esc(s.charAt(0).toUpperCase() + s.slice(1));
  const sumTo = a => a.reduce((x, y) => x + y, 0);
  const uniq = (n, lo, hi) => shuf(Array.from({ length: hi - lo + 1 }, (_, i) => i + lo)).slice(0, n);
  const GEN = ["Pick the answer that fits the question best.", "Cross out the choices that clearly do not fit, then compare what is left."];

  // =============== LEVEL 22 ===============
  const A1 = ty("Type a resume line", "Type this resume line. Keep your rhythm.",
    ["Led a team of 5 students to build a school website.", "Organized a food drive that collected 400 cans.", "Improved typing speed from 35 to 70 WPM in six months.", "Tutored younger students in math for two years.", "Managed a budget of $500 for the robotics club.", "Created a spreadsheet to track 120 library books.", "Designed posters that raised attendance by 25%.", "Volunteered 60 hours at the community garden."],
    ["A resume line starts with a strong action word. Type it steadily.", "It has {w} words and begins with \"{f}\". Numbers, dollar signs and percent marks need the right reach.", "Example: for <b>Built a game with 3 levels.</b> type each word, the digit, then the period. Now type yours."],
    [["Resume", "📄", "A <b>resume</b> is a short page that lists your skills, projects and experience."], ["Action words", "💪", "Good lines start with a verb like <b>led</b>, <b>built</b> or <b>organized</b>, and include a number."], ["Typing it", "⌨️", "Resumes must be perfect. Type smoothly, then proofread once."]]);
  const A2 = ty("Type a CSV row", "Type this line of comma-separated data exactly.",
    ["id,item,price,qty", "101,pencil,0.50,20", "102,notebook,2.25,8", "item,color,size", "pen,blue,medium", "date,steps,miles", "2025-03-14,9500,4.2", "team,wins,losses", "Hawks,12,3"],
    ["CSV rows have no spaces. Only commas split the pieces.", "It begins with \"{f}\" and has {n} characters including commas. Do not add spaces after commas.", "Example: for <b>cat,4,brown</b> type cat, a comma, 4, a comma, brown. Now type yours."],
    [["CSV", "🧾", "<b>CSV</b> means comma-separated values. Each line is a row and commas split the columns."], ["Why it matters", "🌍", "Spreadsheets and databases can both open CSV files, so it is a simple way to share data."], ["Exact", "🎯", "An extra space or missing comma shifts everything into the wrong column."]]);
  const A3 = num("Key presses with Shift", "⇧", () => {
    const pool = ["Maya", "school", "Paris", "lab", "River", "code", "Monday", "Tokyo", "math", "Brazil", "notes", "Friday"];
    const p = shuf(pool).slice(0, 3).join(" "), caps = (p.match(/[A-Z]/g) || []).length;
    return ["Count every key press. Each capital letter needs 2 presses (Shift plus the letter). A space is 1 press. How many presses to type this?", p.length + caps, big(p, 1.6)];
  }, ["Count the characters first, including the spaces.", "Then find the capital letters. Each one costs one extra press for Shift.", "Example: Go Home has 7 characters and 2 capitals, so 7 + 2 = 9 presses. Now do yours."],
    [["Shift", "⇧", "A capital letter needs <b>Shift</b> held down while you press the letter."], ["Counting", "🔢", "Total presses = all characters + one extra for each capital."], ["Why it matters", "⏱️", "Texts with many capitals and symbols take more key presses than plain lowercase."]]);
  const A4 = mc("Pivot tables", "🧮", [
    "What does a pivot table do?|Summarizes many rows into a small table of totals|Draws a picture on the page|Locks the sheet with a password",
    "To see totals for each month, which field goes in Rows?|Month|The file name|Page number",
    "Which setting adds up the Sales numbers in a pivot table?|Values set to Sum|Filters set to blank|Rows set to bold",
    "A pivot table can show the average instead of the total by changing...|The summary type in Values|The font|The page color",
    "When the source data changes, a pivot table usually needs you to...|Refresh it|Print it|Rename it",
    "Why does the source data need column headings?|The headings become the field names|They make it print faster|They protect the file",
    "To count how many orders each region has, Values should use...|Count|Bold|Merge",
    "Which question is a pivot table best for?|What are the total sales for each product?|What does this word mean?|How do I make the text red?"],
    ["Think about how a big list of rows can be squeezed into a short summary.", GEN[1], "Example: 500 rows of snack sales become a 5-row table showing the total for each snack. Now pick yours."],
    [["Summaries", "🧮", "A <b>pivot table</b> groups rows and calculates totals, averages or counts for you."], ["Fields", "🧩", "Drag a field to <b>Rows</b> or <b>Columns</b> to group, and to <b>Values</b> to calculate."], ["Refresh", "🔄", "A pivot table is a snapshot. Refresh it after the data changes."]]);
  const A5 = num("RANK in a sheet", "🏅", () => {
    const l = uniq(6, 10, 99), t = pick(l), r = l.filter(x => x > t).length + 1;
    return [`In a column A1:A6, what does =RANK(${t}, A1:A6) show? (Rank 1 is the biggest.)`, r, big("[" + l.join(", ") + "]", 1.1)];
  }, ["Rank 1 goes to the biggest number. Think about how many numbers beat yours.", "Count how many numbers in the list are bigger than the one asked for, then add 1.", "Example: in 40, 25, 60, 10 the number 25 has two bigger (40 and 60), so its rank is 3. Now do yours."],
    [["RANK", "🏅", "<b>=RANK(value, range)</b> tells you the place of a value in the list, with 1 as the biggest."], ["Method", "🪜", "Rank = how many numbers are bigger + 1."], ["Use", "💡", "Ranks make leaderboards and grade lists quick to build."]]);
  const A6 = mc("Conditional formatting", "🎨", [
    "What does conditional formatting do?|Changes how a cell looks when a rule is true|Turns formulas into words|Closes the sheet",
    "A rule colors a cell red when its value is above 90. Which cell turns red?|95|90|85",
    "You want every score below 50 shown in red. Which rule fits?|Cell value is less than 50|Cell value equals 500|Cell is empty",
    "A color scale shows...|Low to high values as a gradient of color|Only text|The file size",
    "A 'duplicate values' rule helps you...|Spot repeated entries|Add numbers|Make charts",
    "If you change a number so the rule is no longer true, the color...|Goes away on its own|Stays forever|Becomes a formula",
    "Why is color alone not enough to show something important?|Some readers cannot tell certain colors apart|Colors cost money|Sheets cannot print colors",
    "Which is a good extra clue besides color?|An icon or a word like LOW|A smaller font|A hidden column"],
    ["Think about a sheet that highlights things for you automatically.", GEN[1], "Example: a rule that turns late homework dates orange makes them stand out without any clicking. Now pick yours."],
    [["Rules", "🎨", "<b>Conditional formatting</b> changes a cell's look only when a rule you set is true."], ["Kinds", "🌈", "You can use colors, color scales, icons and bars."], ["Access", "♿", "Add words or icons too, so people who cannot see all colors still get the message."]]);
  const A7 = num("Bitwise AND", "🔗", () => {
    const a = ri(1, 63), b = ri(1, 63), p = x => x.toString(2).padStart(6, "0");
    return ["Each column of the binary numbers is compared. A result bit is 1 only if BOTH bits are 1. What is the result in decimal?", a & b, code([`   ${p(a)}`, `AND ${p(b)}`])];
  }, ["AND is strict. A result bit is 1 only when both numbers have a 1 in that column.", "Write the result column by column, then turn the result into a decimal number using 32, 16, 8, 4, 2, 1.", "Example: 1100 AND 1010 gives 1000 because only the first column has two 1s, and 1000 is 8. Now do yours."],
    [["Bitwise AND", "🔗", "<b>AND</b> compares two binary numbers one column at a time."], ["The rule", "📏", "1 AND 1 is 1. Anything else is 0."], ["Use", "🎛️", "Programs use AND to check or mask single bits, like settings stored in one number."]]);
  const WORDS = ["keyboard", "computer", "internet", "program", "monitor", "desktop", "network", "browser", "printer", "spreadsheet"];
  const A8 = (() => {
    const make = () => {
      const w = pick(WORDS), st = ri(0, 3);
      if (st === 0) return { text: "What does this program print?", visual: code([`word = "${w}"`, "print(word.upper())"]), textInput: true, answer: w.toUpperCase(), hints: ["Look at the method name. What does upper do to letters?", "It changes every letter, but it does not add or remove any letters.", "Example: \"cat\".upper() gives CAT. Now do yours."] };
      if (st === 1) return { text: "What does this program print?", visual: code([`word = "${w}"`, "print(len(word))"]), answer: w.length, hints: ["len stands for length. It counts things.", "Count every letter in the word, one at a time.", "Example: len(\"tree\") counts t, r, e, e and gives 4. Now do yours."] };
      const l = pick(w.split(""));
      if (st === 2) { const nw = pick(["x", "z"]); return { text: "What does this program print?", visual: code([`word = "${w}"`, `print(word.replace("${l}", "${nw}"))`]), textInput: true, answer: w.split(l).join(nw), hints: ["replace swaps one piece of text for another.", `Every "${l}" in the word is swapped. Other letters stay where they are.`, "Example: \"banana\".replace(\"a\", \"o\") gives bonono. Now do yours."] }; }
      return { text: "What does this program print?", visual: code([`word = "${w}"`, `print(word.count("${l}"))`]), answer: w.split(l).length - 1, hints: ["count tells you how many times something appears.", `Go through the word and tally every "${l}" you see.`, "Example: \"banana\".count(\"a\") finds 3 letters a. Now do yours."] };
    };
    make.teach = sl([["String methods", "🧵", "A <b>method</b> is a tool attached to text, written with a dot, like <b>word.upper()</b>."], ["Four helpers", "🧰", "<b>upper()</b> makes capitals. <b>len()</b> counts letters. <b>replace(a, b)</b> swaps text. <b>count(a)</b> tallies matches."], ["Careful", "⚠️", "The original word does not change unless you save the new result."]]);
    return { title: "String methods", make };
  })();
  const A9 = mc("CSS selectors", "🎨", [
    "In CSS, what does the selector p choose?|All paragraph elements|The page title|One image",
    "In CSS, .menu selects elements that have...|class='menu'|id='menu'|the word menu in their text",
    "In CSS, #header selects the element with...|id='header'|class='header'|a link to a header",
    "Which rule makes all paragraphs blue?|p { color: blue; }|blue { p: color; }|color p = blue",
    "In color: red; the word color is the...|Property|Selector|Tag",
    "In color: red; the word red is the...|Value|Selector|Comment",
    "If two rules clash, which usually wins?|The more specific rule, or the later one if equal|The shorter rule|The first one always",
    "Why do many sites use one shared CSS file?|One file can style many pages|It deletes the HTML|It makes pages louder"],
    ["Think about what each part of a CSS rule is for: who, what, and how.", GEN[1], "Example: in h1 { font-size: 30px; } the selector h1 says WHO, font-size says WHAT, and 30px says HOW MUCH. Now pick yours."],
    [["Selectors", "🎯", "A <b>selector</b> says which elements to style: <b>p</b> for a tag, <b>.name</b> for a class, <b>#name</b> for an id."], ["Declarations", "🧱", "Inside the braces, <b>property: value;</b> pairs say what to change."], ["Conflicts", "⚖️", "A more specific selector beats a general one. If equal, the later rule wins."]]);
  const A10 = mc("Spreadsheet or database?", "🗄️", [
    "Which is better for a small list of 20 class snacks?|A spreadsheet|A huge database server|Neither works",
    "Which fits an online store with millions of orders and many users at once?|A database|A printed list|A sticky note",
    "A database table has rows and columns. The columns are called...|Fields|Slides|Folders",
    "In a database table, one row is called a...|Record|Field|Table",
    "Why can many people safely update a database at the same time?|It manages simultaneous changes with rules|It ignores everyone|It turns off the internet",
    "What is easier in a spreadsheet for a beginner?|Typing numbers and making a quick chart|Handling millions of records|Linking many tables",
    "A spreadsheet starts to struggle when...|The data is huge and linked across many tables|It has three rows|It has a title",
    "Storing a customer's address once and linking it from many orders helps avoid...|Repeated, mismatched copies|Having any orders|Typing"],
    ["Think about how big the data is and how many people use it.", GEN[1], "Example: a recipe list for one family is fine in a sheet, but a bank with millions of accounts needs something stronger. Now pick yours."],
    [["Spreadsheets", "📊", "Great for small data, quick math and charts that one person or team edits."], ["Databases", "🗄️", "Built for lots of data, many users, and tables linked together."], ["Choosing", "🧭", "Match the tool to the size of the job."]]);
  const A11 = mc("HTTP status codes", "🌐", [
    "Which status code means the page loaded fine?|200|404|500",
    "What does 404 mean?|Page not found|Server crashed|Done successfully",
    "A 500 error means...|The server had a problem|You typed a wrong password|The page is perfect",
    "403 means...|You are not allowed to see it|The page was found|The page moved",
    "Codes starting with 2 mean...|Success|Not found|Server error",
    "Codes starting with 3 mean...|Redirect, go somewhere else|Success|Server crashed",
    "401 means...|You need to log in first|Success|Not found",
    "You typed a wrong web address and see an error. Which code is likely?|404|200|301"],
    ["Think about the first digit: it tells the group of the message.", GEN[1], "Example: a code starting with 5 means the server itself failed, not you. Use the first digit to sort the group. Now pick yours."],
    [["Status codes", "🌐", "Every web response starts with a <b>status code</b>, a number that tells how it went."], ["Groups", "🗂️", "<b>2xx</b> success. <b>3xx</b> redirect. <b>4xx</b> a problem with the request. <b>5xx</b> a server problem."], ["Famous ones", "⭐", "<b>200</b> OK, <b>404</b> not found, <b>403</b> forbidden, <b>500</b> server error."]]);
  const A12 = num("Audio file size", "🎵", () => {
    const k = pick([64, 128, 160, 192, 256, 320]), s = ri(20, 300);
    return [`A song lasts ${s} seconds and is saved at ${k} kilobits per second. How big is the file in kilobytes? (8 bits make 1 byte.)`, k * s / 8, big(`${k} kbps for ${s} s`, 1.2)];
  }, ["First find the total number of kilobits: speed times seconds.", "Then convert bits to bytes by dividing by 8.", "Example: 16 kbps for 10 seconds is 160 kilobits, and 160 / 8 = 20 kilobytes. Now do yours."],
    [["Audio data", "🎵", "Sound files store a stream of bits, and <b>kbps</b> tells how many thousand bits per second."], ["Size", "📏", "Kilobits = kbps x seconds. Then divide by 8 to get kilobytes."], ["Trade-off", "⚖️", "Higher kbps sounds better but makes a bigger file."]]);
  const A13 = mc("Be an upstander", "🤝", [
    "A classmate is mocked in a group chat. A good upstander...|Does not join in and supports the person|Joins the jokes|Shares screenshots with everyone",
    "Before reporting meanness, it helps to keep...|Screenshots of what happened|Nothing at all|Only the jokes",
    "To help someone left out online, you can...|Include them or send a kind message|Laugh about it|Make a new group without them",
    "If online meanness feels too big, tell...|A trusted adult|Only strangers|No one",
    "Is it okay to forward a mean private message 'just for fun'?|No, it can hurt and spread|Yes, if it is funny|Yes, if many people have it",
    "Most apps let you...|Report and block unkind accounts|Delete the internet|Never block anyone",
    "What is a bystander?|Someone who sees it happen and may or may not help|The person who started it|A computer program",
    "Blocking someone who is unkind to you is...|A fine way to protect yourself|Always wrong|A crime"],
    ["Think about what would make the targeted person feel safer.", GEN[1], "Example: if a friend is teased in a chat, a message like 'that is not okay' and telling an adult helps more than staying silent. Now pick yours."],
    [["Upstander", "🤝", "An <b>upstander</b> speaks up or helps when someone is treated badly. A <b>bystander</b> just watches."], ["Safe steps", "🛟", "Do not join in. Save proof. Report and block. Tell a trusted adult."], ["Kindness", "💛", "A kind message to the person who was hurt can mean a lot."]]);
  const A14 = mc("Password managers", "🔐", [
    "A password manager stores...|Your passwords in an encrypted vault|Your passwords on a sticky note|Your keyboard layout",
    "How many passwords do you need to remember with a manager?|One strong master password|Fifty|None, ever",
    "Why is using the same password everywhere risky?|One leak opens every account|It is too long|Sites forbid it",
    "A passphrase of four random words is good because...|It is long and easier to remember|It is very short|Everyone uses it",
    "Which is the strongest choice?|lamp-river-ninety-cloud-tiger|password123|myname2010",
    "A manager can create...|Long random passwords for each site|Free websites|Wi-Fi",
    "A manager refuses to fill in a password on a fake site because...|The web address does not match the saved one|It is broken|It likes to hide",
    "Should you share your master password?|No, never|Yes with friends|Yes with websites"],
    ["Think about what makes a password hard to guess and easy to keep safe.", GEN[1], "Example: a vault with one very strong lock can protect many smaller secrets inside it. Now pick yours."],
    [["The vault", "🔐", "A <b>password manager</b> keeps all your passwords locked behind one master password."], ["Unique and long", "🧬", "Use a different long password for every site. The manager remembers them."], ["Guard the master", "🛡️", "Never share your master password."]]);
  const A15 = mc("Keyboard access", "♿", [
    "Some people cannot use a mouse. Which key moves focus to the next link or button?|Tab|Caps Lock|Print Screen",
    "Which key usually presses a focused button?|Enter (or Space)|Esc|F12",
    "A screen reader...|Reads the screen aloud|Prints screens|Only makes text bigger",
    "Captions on a video help people who...|Cannot hear or are in a noisy place|Have no screen|Want faster internet",
    "Good color contrast means...|Text is easy to see against its background|All colors are the same|Text is hidden",
    "Which text is easiest to read?|Dark text on a light background|Light gray text on white|Yellow text on white",
    "Why should a link say 'Read the report' instead of 'Click here'?|Screen readers can read links out of context|It is longer|It is prettier",
    "Headings in a document help screen reader users...|Jump to the section they want|Print|Change fonts"],
    ["Think about people who use only a keyboard, or hear the page instead of seeing it.", GEN[1], "Example: a video with captions can be understood with the sound off. Accessible design helps many people. Now pick yours."],
    [["Everyone can use it", "♿", "<b>Accessible</b> design works for people with different eyes, ears, hands and tools."], ["Keyboard", "⌨️", "<b>Tab</b> moves between items and <b>Enter</b> presses them."], ["Clear text", "🔤", "Good contrast, captions and descriptive links make pages easier for all."]]);
  const A16 = mc("Kanban and deadlines", "📌", [
    "A kanban board has columns such as...|To do, Doing, Done|Red, Green, Blue|Monday, Tuesday",
    "Moving a card to Done means...|The task is finished|The card is deleted|The task is hidden",
    "Why limit how many cards are in Doing?|To focus on finishing before starting more|To use fewer colors|To fit small screens",
    "A deadline is...|The date a task must be finished|A broken computer|A time zone",
    "Breaking a big project into small tasks helps because...|Each step is clear and easier to track|The project disappears|The deadline moves",
    "A milestone is...|An important checkpoint in a project|A heavy rock|A password",
    "Who should know what each team member owns?|Everyone on the team|Nobody|Only the printer",
    "When a task will be late, a good teammate...|Says so early and asks for help|Hides it|Deletes the card"],
    ["Think about how a team stays organized and honest about progress.", GEN[1], "Example: a 4-step school project becomes 4 cards that move from To do to Done as each step ends. Now pick yours."],
    [["Boards", "📌", "A <b>kanban board</b> shows tasks as cards that move through columns."], ["Plan", "🗓️", "Split work into small tasks with owners and <b>deadlines</b>."], ["Communicate", "💬", "Tell the team early if something is late so the plan can change."]]);
  const A17 = mc("Misleading charts", "📉", [
    "A bar chart's axis starts at 90 instead of 0. This can...|Make small differences look huge|Make every bar equal|Delete the data",
    "A pie chart's slices should add up to...|100 percent, the whole|50 percent|Any number",
    "Which chart best shows change over time?|Line chart|Pie chart|Word cloud",
    "A chart with no title or labels is...|Hard to understand|Perfect|Faster",
    "Cutting off the start of a time graph can...|Hide important earlier data|Make it more honest|Add data",
    "3D effects on bars can...|Make values harder to compare|Make values exact|Add data",
    "A good chart tells the reader...|What is measured and in what units|Nothing|Only the color",
    "Two lines use different scales on left and right axes. The risk is...|A false sense that they match or move together|A printing problem|A smaller file"],
    ["Think about how a chart could trick the eye even when each number is true.", GEN[1], "Example: if one bar is 51 and another is 50 but the axis starts at 49, the first looks twice as tall. Check the axis. Now pick yours."],
    [["Honest charts", "📉", "Charts should show data fairly. A tricky axis can change the story."], ["Check", "🔎", "Look at the title, labels, units and where the axis starts."], ["Choose well", "🧭", "Lines show time, bars compare groups, pies show parts of a whole."]]);
  const A18 = mc("Prompting AI well", "🤖", [
    "A clear AI prompt usually includes...|The task, the topic and the format you want|Only the word 'help'|Random emoji",
    "Why add 'explain it for a 9th grader' to a prompt?|It sets the level of the answer|It speeds up Wi-Fi|It changes the AI's name",
    "After an AI gives facts, you should...|Check them with a trusted source|Trust them blindly|Delete them",
    "A vague prompt like 'Tell me stuff' leads to...|A vague answer|A perfect answer|No answer",
    "If the answer is not quite right, you can...|Reply with details about what to change|Give up|Restart the computer",
    "Should you paste your home address into a prompt?|No, keep personal details private|Yes, always|Yes, in capital letters",
    "Is it honest to hand in AI-written work as entirely your own?|No, follow your school's rules and say if you used help|Yes, always|Only if it is long",
    "AI sometimes states wrong things in a confident voice. This is called...|A hallucination|A reboot|A shortcut"],
    ["Think about how a helper does better when you give it clear details.", GEN[1], "Example: 'Write 3 bullet points about volcanoes for 8th graders' works better than 'volcanoes'. Now pick yours."],
    [["Good prompts", "🤖", "Say what you want, about what, for whom, and in what shape."], ["Check it", "🔍", "AI can be wrong. Verify important facts."], ["Be honest", "🤝", "Keep private details out and follow your school's rules about AI help."]]);
  const L22 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18,
    MIX("Mixed practice", A1, A3, A4, A5, A7, A8, A9, A11, A12, A17),
    MIX("Level 22 Challenge", A2, A6, A10, A13, A14, A15, A16, A18, A5, A12)];

  // =============== LEVEL 23 ===============
  const B1 = ty("Type a regex", "Type this pattern exactly. Watch the slashes and brackets.",
    ["^[a-z]+$", "\\d{3}-\\d{4}", "[A-Z][a-z]*", "^\\w+@\\w+\\.com$", "colou?r", "(cat|dog)s?", "\\bthe\\b", "[0-9]+"],
    ["A regular expression is a pattern. Every symbol counts, so go slowly.", "It has {n} characters and starts with \"{f}\". The backslash key sits above Enter.", "Example: for <b>^[0-9]+$</b> type the caret (Shift 6), the brackets, the plus and the dollar sign. Now type yours."],
    [["Patterns", "🧩", "A <b>regular expression</b> (regex) describes a pattern of text to find."], ["Symbols", "🔣", "<b>^</b> start, <b>$</b> end, <b>+</b> one or more, <b>[a-z]</b> any lowercase letter, <b>\\d</b> a digit."], ["Exact", "🎯", "One wrong symbol changes what the pattern matches."]]);
  const B2 = ty("Type a cover letter line", "Type this sentence from a cover letter.",
    ["I am writing to apply for the summer internship at your library.", "Thank you for considering my application.", "I enjoy solving problems and learning new tools quickly.", "My experience with spreadsheets would help me track your orders.", "I would welcome the chance to discuss the position with you.", "I have attached my resume for your review.", "Working in a team has taught me to listen and to meet deadlines.", "Please let me know if you need any further information."],
    ["Cover letters sound polite and clear. Type with a steady beat.", "It has {w} words and begins with \"{f}\". Check the capital and the final period.", "Example: for <b>I look forward to hearing from you.</b> type each word, then the period. Now type yours."],
    [["Cover letter", "✉️", "A <b>cover letter</b> introduces you and says why you want a job or place."], ["Tone", "🤝", "Be polite, specific and short."], ["Proofread", "🔍", "Spelling mistakes in a letter can cost you an opportunity, so reread it."]]);
  const B3 = num("Break reminders", "⏰", () => {
    const h = ri(2, 6), m = pick([20, 30, 60]);
    return [`A timer rings every ${m} minutes to remind you to rest your eyes and stretch. It runs for ${h} hours of computer work. How many times does it ring?`, h * 60 / m];
  }, ["First change the hours into minutes.", "Then see how many times the break length fits into the total minutes.", "Example: 2 hours is 120 minutes. A timer every 40 minutes rings 120 / 40 = 3 times. Now do yours."],
    [["Take breaks", "⏰", "Long screen sessions tire your eyes and body. Short breaks help."], ["20-20-20", "👀", "Every 20 minutes, look at something 20 feet away for 20 seconds."], ["The math", "🧮", "Rings = total minutes / minutes between breaks."]]);
  const B4 = num("SUMPRODUCT", "🛒", () => {
    const q = [ri(2, 9), ri(2, 9), ri(2, 9)], p = [ri(1, 9), ri(1, 9), ri(1, 9)];
    return ["Column A holds quantities and column B holds prices. What does =SUMPRODUCT(A1:A3,B1:B3) show?", q[0] * p[0] + q[1] * p[1] + q[2] * p[2], code(q.map((x, i) => `${i + 1}:  ${x}   ${p[i]}`))];
  }, ["SUMPRODUCT multiplies matching rows, then adds the results.", "Multiply A by B on row 1, row 2 and row 3, then add the three products.", "Example: rows (2, 5) and (3, 4) give 10 + 12 = 22. Now do yours."],
    [["SUMPRODUCT", "🛒", "<b>=SUMPRODUCT(range1, range2)</b> multiplies pairs and adds the products."], ["Shopping", "🧾", "With quantities in one column and prices in another it gives the grand total."], ["Same size", "📏", "Both ranges must have the same number of cells."]]);
  const B5 = num("Linear forecast", "📈", () => {
    const a = ri(10, 60), d = ri(2, 9), n = ri(5, 12);
    return [`A site had ${a} visitors in week 1 and gained ${d} more each week in a steady line. How many visitors in week ${n}?`, a + d * (n - 1)];
  }, ["The first week is the start. How many weeks of growth happened before week n?", "Multiply the weekly gain by the number of growth steps, then add the starting number.", "Example: start 20, gain 3 per week, week 5 has 4 steps: 20 + 12 = 32. Now do yours."],
    [["Trend", "📈", "A <b>linear</b> trend goes up by the same amount each step."], ["Formula", "🧮", "Value = start + gain x (steps from the start)."], ["Careful", "⚠️", "Week 1 is the start, so week 6 has only 5 steps of growth."]]);
  const B6 = (() => {
    const T = ["spreadsheet", "keyboard", "notebook", "calendar", "password", "download", "elephant", "database"];
    const make = () => {
      const w = pick(T), st = ri(0, 3), cell = code([`A1: ${w}`]);
      if (st === 0) { const n = ri(2, 4); return { text: `What does =LEFT(A1,${n}) show?`, visual: cell, textInput: true, answer: w.slice(0, n), hints: ["LEFT takes letters from the start of the text.", `Take the first ${n} letters, counting from the left end.`, "Example: =LEFT(\"garden\",3) gives gar. Now do yours."] }; }
      if (st === 1) { const n = ri(2, 4); return { text: `What does =RIGHT(A1,${n}) show?`, visual: cell, textInput: true, answer: w.slice(-n), hints: ["RIGHT takes letters from the end of the text.", `Take the last ${n} letters, counting from the right end.`, "Example: =RIGHT(\"garden\",3) gives den. Now do yours."] }; }
      if (st === 2) { const s = ri(2, 5), n = ri(2, 4); return { text: `What does =MID(A1,${s},${n}) show?`, visual: cell, textInput: true, answer: w.slice(s - 1, s - 1 + n), hints: ["MID starts at a position and takes some letters. The first letter is position 1.", `Find position ${s}, then take ${n} letters going right.`, "Example: =MID(\"garden\",2,3) starts at a and takes 3 letters, giving ard. Now do yours."] }; }
      return { text: "What does =LEN(A1) show?", visual: cell, answer: w.length, hints: ["LEN counts the characters in the text.", "Count every letter in the word.", "Example: =LEN(\"tree\") gives 4. Now do yours."] };
    };
    make.teach = sl([["Text functions", "✂️", "Sheets can cut text. <b>LEFT(text, n)</b> takes n letters from the start. <b>RIGHT(text, n)</b> takes from the end."], ["MID and LEN", "📏", "<b>MID(text, start, n)</b> starts at a position (the first letter is 1). <b>LEN(text)</b> counts characters."], ["Use", "💡", "They split codes like AB-1234 into parts without retyping."]]);
    return { title: "LEFT, RIGHT, MID", make };
  })();
  const B7 = num("Shift bits right", "➡️", () => {
    const n = ri(20, 250), k = ri(1, 3);
    return ["In many languages, n >> k shifts the bits of n to the right by k places and drops the ones that fall off. What does this print?", Math.floor(n / Math.pow(2, k)), code([`n = ${n}`, `print(n >> ${k})`])];
  }, ["Shifting right by one place halves a number and drops any remainder.", "Halve the number once for each place shifted, dropping a leftover each time.", "Example: 13 >> 2 is 13, then 6, then 3, so the result is 3. Now do yours."],
    [["Right shift", "➡️", "<b>n >> 1</b> slides every bit one place to the right. That is the same as halving and dropping the remainder."], ["More places", "🔁", "<b>n >> 3</b> halves three times."], ["Left shift", "⬅️", "Shifting left doubles instead. They are opposite moves."]]);
  const B8 = num("Sorting comparisons", "🔀", () => {
    const n = ri(4, 15);
    return [`A simple sort compares every pair of items once. How many comparisons does it make for a list of ${n} items?`, n * (n - 1) / 2];
  }, ["Each item is compared with every other item, but each pair is only counted once.", "Multiply the number of items by one fewer, then halve it.", "Example: with 5 items, 5 x 4 = 20, and half of that is 10 comparisons. Now do yours."],
    [["Pairs", "🔀", "With <b>n</b> items there are <b>n x (n - 1) / 2</b> different pairs."], ["Grows fast", "🚀", "Double the list and the number of pairs roughly quadruples."], ["Why it matters", "⏱️", "Programmers count steps like these to compare sorting methods."]]);
  const B9 = mc("Big O thinking", "⏱️", [
    "Reading item 5 of a list takes the same time however long the list is. This is...|Constant time|Linear time|Quadratic time",
    "Checking every item once in a list of n items is...|Linear time|Constant time|Quadratic time",
    "Comparing every item with every other item is usually...|Quadratic time|Constant time|Linear time",
    "Binary search on a sorted list of n items grows...|Very slowly (logarithmic)|Like n x n|Like n x n x n",
    "A linear method takes 1 second for 1,000 items. About how long for 2,000?|2 seconds|1 second|4 seconds",
    "Which grows slowest as the list gets bigger?|Constant time|Linear time|Quadratic time",
    "Big O describes...|How the work grows as the input grows|Exact seconds on your laptop|How loud the fan is",
    "Two nested loops over n items, each running n times, take about...|n x n steps|n + n steps|just n steps"],
    ["Think about what happens to the work when the list gets much longer.", GEN[1], "Example: finding one name by checking everyone grows with the crowd, but opening a numbered locker takes the same time for any number. Now pick yours."],
    [["Growth", "⏱️", "<b>Big O</b> tells how the number of steps grows as the input gets bigger."], ["Common ones", "📚", "Constant stays flat. Linear grows with n. Quadratic grows with n x n."], ["Not seconds", "🧠", "It compares ideas, not particular computers."]]);
  const B10 = mc("Inheritance", "👪", [
    "A class Dog that gets features from class Animal uses...|Inheritance|Deletion|Printing",
    "In inheritance, the class that passes features down is the...|Parent (base) class|Child class|Local class",
    "A child class can...|Reuse parent methods and add its own|Only copy files|Never have methods",
    "Encapsulation means...|Keeping data and the code that uses it together, hiding details|Making all data public|Deleting objects",
    "Overriding a method means a child class...|Provides its own version of a parent method|Deletes the parent|Renames the file",
    "Why use inheritance?|To avoid repeating the same code|To make programs slower|To hide errors",
    "A method is...|A function that belongs to a class|A variable only|A comment",
    "If Cat and Dog both inherit from Animal, what do they share?|Whatever is defined in Animal|Their names automatically|Nothing"],
    ["Think about family traits passed from a parent to a child.", GEN[1], "Example: every Vehicle can move, so Car and Bike can inherit move() and add their own features. Now pick yours."],
    [["Parent and child", "👪", "A <b>child class</b> inherits the methods and data of its <b>parent class</b>."], ["Override", "✏️", "A child can replace a method with its own version."], ["Encapsulation", "📦", "Objects keep their data together with the code that works on it."]]);
  const B11 = mc("HTTP methods", "📬", [
    "Which HTTP method asks the server to send data back, like loading a page?|GET|POST|DELETE",
    "Which usually sends new data to the server, like submitting a form?|POST|GET|HEAD",
    "DELETE asks the server to...|Remove something|Show something|Save a copy",
    "PUT or PATCH are used to...|Update existing data|Open a page|Print",
    "Why should a password not go in a GET web address?|Addresses can be saved in history and seen|GET is too slow|Addresses cannot have letters",
    "A request has a method, an address (URL) and sometimes...|A body of data|A battery|A speaker",
    "A response has a status code and usually...|Data (the body)|A keyboard|A printer",
    "REST APIs often use a URL like /users/5 to mean...|User number 5|Page 5 of a book|5 megabytes"],
    ["Think about what the client wants the server to do: read, create, change or remove.", GEN[1], "Example: opening a news page reads data, while posting a comment creates new data. Now pick yours."],
    [["Methods", "📬", "A web request has a <b>method</b> that says what to do."], ["Main four", "🧰", "<b>GET</b> read, <b>POST</b> create, <b>PUT/PATCH</b> update, <b>DELETE</b> remove."], ["Privacy", "🔒", "Keep secrets out of the web address, because addresses can be stored."]]);
  const B12 = mc("Network protocols", "📡", [
    "Which protocol carries web pages?|HTTP and HTTPS|SMTP|VGA",
    "Which protocol is mainly for sending email?|SMTP|HTTP|JPEG",
    "TCP makes sure data arrives complete and in order, so it is...|Reliable|Fast but may lose data|Only for video",
    "UDP is often used for live games and calls because it is...|Fast and does not wait to resend lost pieces|Always slower|Used for email only",
    "A protocol is...|An agreed set of rules for communicating|A type of cable|A password",
    "Which protocol's name literally means File Transfer?|FTP|SMTP|VGA",
    "HTTPS differs from HTTP by...|Encrypting the connection|Being older|Working offline",
    "Data sent over a network is split into small pieces called...|Packets|Planets|Pixels"],
    ["Think about the job each set of rules was made for.", GEN[1], "Example: a postal system has rules for stamps and addresses, and networks have rules for how data is packed and checked. Now pick yours."],
    [["Protocols", "📡", "A <b>protocol</b> is a set of rules that lets different machines understand each other."], ["Examples", "🧰", "<b>HTTP</b> web, <b>SMTP</b> email, <b>FTP</b> files, <b>TCP</b> reliable delivery, <b>UDP</b> fast delivery."], ["Packets", "📦", "Data travels as small packets that are put back together at the end."]]);
  const B13 = num("Battery life", "🔋", () => {
    const y = pick([100, 200, 250, 500, 1000]), h = ri(2, 20);
    return [`A device uses ${y} mA of current. Its battery holds ${y * h} mAh. For how many hours can it run?`, h];
  }, ["mAh means milliamp-hours. It is the current times the hours the battery lasts.", "Divide the battery capacity by the current the device uses.", "Example: a 600 mAh battery and a 100 mA device last 600 / 100 = 6 hours. Now do yours."],
    [["Battery size", "🔋", "<b>mAh</b> tells how much charge a battery holds."], ["Current", "⚡", "<b>mA</b> tells how fast the device uses it."], ["Hours", "⏳", "Hours = mAh / mA. Brighter screens use more current and shorten the time."]]);
  const B14 = mc("Designed to hold attention", "📱", [
    "Infinite scroll keeps a feed loading so you...|Have no natural stopping point|Run out of data|Cannot read",
    "Notifications are often designed to...|Get your attention and bring you back|Save battery|Delete apps",
    "A good habit is to turn off notifications that...|Are not important to you right now|Warn you about real security problems|Come from your family in an emergency",
    "Autoplay on video sites makes it...|Easy to keep watching longer than planned|Impossible to watch|Quicker to switch off",
    "Streaks in apps use...|The wish not to lose progress to bring you back daily|Free money|Calculators",
    "To stay in control you can...|Set time limits and stop on purpose|Delete sleep|Add more apps",
    "Why do many apps want your attention?|More time can mean more ads shown|They get lonely|The law says so",
    "Putting your phone away while studying helps because...|Fewer interruptions let you focus|Studying needs a phone|Batteries last"],
    ["Think about who gains when you keep scrolling.", GEN[1], "Example: a video that starts the next one by itself removes the moment where you could choose to stop. Now pick yours."],
    [["Attention", "📱", "Many apps are built to keep you using them for as long as possible."], ["Tricks", "🪤", "Infinite scroll, autoplay, streaks and alerts all pull you back."], ["You decide", "🧭", "Set limits, mute what you do not need, and stop on purpose."]]);
  const B15 = mc("Your online profile", "🪪", [
    "A good username for school or work sites is usually...|Simple and appropriate|Full of jokes about others|Your password",
    "Colleges and employers may look at...|Public posts and profiles|Only your locker|Nothing at all",
    "A 'headline' on a professional profile is...|A short line saying who you are and what you do|A news article|An ad",
    "Which belongs on a professional profile?|Skills, projects and goals|Your password|Private secrets",
    "Setting an account to private lets you...|Control who sees your posts|Delete the account|Speed up the app",
    "Is something deleted online always gone?|Not always, copies may exist|Always|It never existed",
    "Before posting, a smart question is...|Would I be fine with a future teacher or boss seeing this?|How many likes will I get?|What color is it?",
    "Which should NOT go on a public profile?|Your home address and phone number|Your favorite school subject|A project you built"],
    ["Think about who might see your profile now and in the future.", GEN[1], "Example: a post that is funny to friends might look different to a stranger years later. Pause before posting. Now pick yours."],
    [["Public face", "🪪", "Your profiles tell people who you are before they meet you."], ["Keep it safe", "🔒", "Use privacy settings and never post private details."], ["Think ahead", "🔮", "Posts can be copied and last for years."]]);
  const B16 = mc("Least privilege", "🔑", [
    "Least privilege means giving a user...|Only the access needed for their job|Full access to everything|No password",
    "Why not let every student account edit the grade book?|Mistakes or misuse could change grades|It would be too fast|Printers need paper",
    "A firewall...|Filters network traffic by rules|Cools the computer|Backs up files",
    "Software updates (patches) matter because they...|Fix security holes|Change the wallpaper|Add ads",
    "An admin account should be used...|Only when admin tasks are needed|For everything|Never locked",
    "Authentication proves...|Who you are|How fast you type|Where you live",
    "Authorization decides...|What you are allowed to do|Your name|The weather",
    "Logging out of a shared computer prevents...|The next person using your account|Updates|Wi-Fi"],
    ["Think about giving each person the smallest set of keys they need.", GEN[1], "Example: a cashier can use the register but cannot open the safe. That limit protects everyone. Now pick yours."],
    [["Smallest access", "🔑", "<b>Least privilege</b> means each person or program gets only the access it needs."], ["Two questions", "🛂", "<b>Authentication</b> asks who you are. <b>Authorization</b> asks what you may do."], ["Defenses", "🛡️", "Firewalls, updates and logging out all reduce risk."]]);
  const B17 = mc("Recommendation algorithms", "🎬", [
    "A recommendation algorithm suggests videos based on...|What you and similar people watched|The weather|Your password",
    "Why might your feed show more of one topic?|You engaged with it before|The algorithm is broken|It is the law",
    "A filter bubble is when...|You mostly see views like your own|The screen has a filter|Wi-Fi is slow",
    "Tapping 'not interested' can...|Teach the system to show less of that|Delete your account|Lock the phone",
    "Recommendations are often built to...|Keep you using the service|Teach every subject|Charge you money",
    "To see different views you can...|Search for several sources on purpose|Follow only the same accounts|Block the news",
    "Data used to recommend often includes...|Likes, watch time and searches|Your shoe size|Your handwriting",
    "Is the most recommended video always the best or truest?|No, popular is not the same as accurate|Yes|Only on Fridays"],
    ["Think about what the system learns from your clicks.", GEN[1], "Example: if you watch three cooking videos, the next suggestions will be about cooking, whether or not they are good. Now pick yours."],
    [["Suggestions", "🎬", "Apps guess what you will like from your history and from similar people."], ["Bubbles", "🫧", "You can end up seeing only one kind of idea."], ["Your move", "🧭", "Search widely and check sources, not just the top suggestion."]]);
  const B18 = mc("Cleaning data", "🧼", [
    "Removing duplicate rows is part of...|Cleaning data|Printing|Coloring",
    "'New York' and 'New York ' with a trailing space are a problem because...|The computer may count them as different|They look too neat|They are short",
    "Empty cells in a column of numbers can...|Skew an average or cause errors|Make it smarter|Do nothing ever",
    "A value of 999 in an age column is probably...|An error to check|A correct age|A date",
    "The TRIM function in a sheet removes...|Extra spaces|Whole rows|Colors",
    "Before cleaning the original data, you should...|Keep a backup copy|Delete it|Share the password",
    "Standardizing dates means...|Writing all dates in one format|Deleting dates|Making them bold",
    "Why clean data first?|Results are only as good as the data|It makes files bigger|Charts need color"],
    ["Think about small differences that a human ignores but a computer notices.", GEN[1], "Example: 'Cat' and 'cat ' look nearly the same but a count would treat them as two different items. Now pick yours."],
    [["Messy data", "🧼", "Real data has duplicates, spaces, blanks and typos."], ["Fixes", "🛠️", "Remove duplicates, trim spaces, fill or flag blanks, and use one format."], ["Backup first", "💾", "Work on a copy so the original is safe."]]);
  const L23 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18,
    MIX("Mixed practice", B1, B3, B4, B5, B6, B7, B8, B9, B13, B18),
    MIX("Level 23 Challenge", B2, B10, B11, B12, B14, B15, B16, B17, B4, B8)];

  // =============== LEVEL 24 ===============
  const C1 = ty("Type a college essay line", "Type this sentence from an essay.",
    ["I discovered my love of problem solving while building a small robot.", "Working on the school newspaper taught me to listen carefully.", "My goal is to study computer science and help my community.", "Each challenge I faced made me more patient and curious.", "I learned that teamwork often beats talent alone.", "Volunteering at the library showed me how technology can include everyone.", "I want to use data to find better answers to real problems.", "Losing my first coding contest taught me to keep trying."],
    ["An essay sentence is long, so keep a smooth rhythm.", "It has {w} words and begins with \"{f}\". Check the capital letters and the final period.", "Example: for <b>I enjoy learning by doing.</b> type each word with a space, then the period. Now type yours."],
    [["Essay", "🎓", "A personal essay shows who you are through a short story or idea."], ["Typing long text", "⌨️", "Keep your eyes on the screen and let your fingers find the keys."], ["Proofread", "🔍", "Read it out loud once. Your ears catch mistakes your eyes miss."]]);
  const C2 = ty("Type SQL changes", "Type this SQL command exactly.",
    ["INSERT INTO pets (name, age) VALUES ('Rex', 3);", "UPDATE pets SET age = 4 WHERE name = 'Rex';", "DELETE FROM pets WHERE age > 15;", "CREATE TABLE books (id INT, title TEXT);", "SELECT COUNT(*) FROM orders;", "ALTER TABLE pets ADD color TEXT;", "SELECT * FROM books ORDER BY title;", "UPDATE stock SET qty = qty - 1 WHERE id = 7;"],
    ["SQL commands need every bracket, quote and semicolon.", "It has {w} chunks and starts with \"{f}\". Round brackets use Shift with 9 and 0, and the quote key sits right of L.", "Example: for <b>DELETE FROM cars WHERE id = 2;</b> type each word, the equals sign, the number and the semicolon. Now type yours."],
    [["SQL changes", "🗄️", "<b>INSERT</b> adds a row, <b>UPDATE</b> changes rows, <b>DELETE</b> removes rows."], ["WHERE", "🎯", "Always add <b>WHERE</b> to UPDATE and DELETE, or every row changes."], ["Exact", "⌨️", "Keep quotes around text values and end with a semicolon."]]);
  const C3 = num("Transcription earnings", "💼", () => {
    const w = pick([30, 35, 40, 45, 50, 55, 60, 70, 80]), h = ri(1, 4), p = pick([1, 2, 3, 5]);
    return [`A freelancer is paid $${p} for every 100 words typed. She types at ${w} words per minute with no breaks for ${h} hour${h > 1 ? "s" : ""}. How many dollars does she earn?`, (w * 60 * h / 100) * p];
  }, ["Start with how many words she types in the whole time.", "Words = WPM x 60 x hours. Then see how many groups of 100 words that makes and multiply by the pay.", "Example: 50 WPM for 1 hour is 3,000 words, which is 30 groups of 100. At $2 each that is $60. Now do yours."],
    [["Paid typing", "💼", "Typists and transcribers are often paid per word or per minute of audio."], ["Method", "🧮", "Words = WPM x 60 x hours. Pay = (words / 100) x pay per 100."], ["Real life", "⏱️", "Accuracy matters too. Mistakes cost time to fix."]]);
  const C4 = num("Rule of 72", "💰", () => {
    const r = pick([2, 3, 4, 6, 8, 9, 12, 18, 24]);
    return [`The rule of 72 says money in an account that grows by r percent a year doubles in about 72 / r years. About how many years to double at ${r}% a year?`, 72 / r];
  }, ["The rule gives a quick estimate with one division.", "Divide 72 by the percent rate.", "Example: at 6 percent, 72 / 6 = 12 years. Now do yours."],
    [["Doubling", "💰", "Savings that grow by a percent each year take a certain time to double."], ["Rule of 72", "🧮", "Years to double is about <b>72 / rate</b>."], ["Estimate", "🔭", "It is a shortcut that is close to the exact math, not exact."]]);
  const C5 = num("Count in a bin", "📊", () => {
    let sc, b, c;
    do { sc = Array.from({ length: 10 }, () => ri(50, 99)); b = pick([50, 60, 70, 80, 90]); c = sc.filter(x => x >= b && x < b + 10).length; } while (c < 1);
    return [`A histogram groups scores into bins of 10. How many of these scores fall in the bin ${b} to ${b + 9}?`, c, big("[" + sc.join(", ") + "]", 1.1)];
  }, ["A bin is a range. Include the first number and the last number of the bin.", "Go through the list and count only the scores inside the range.", "Example: for 62, 71, 75, 88 and the bin 70 to 79, two scores (71 and 75) fit. Now do yours."],
    [["Histograms", "📊", "A <b>histogram</b> groups numbers into ranges called <b>bins</b> and shows how many are in each."], ["Counting", "🔢", "Go through the data and put each number in its bin."], ["Use", "💡", "Histograms show the shape of data: where most values are and how spread out they are."]]);
  const C6 = mc("Correlation or cause?", "🔗", [
    "Ice cream sales and sunburns both rise in summer. What is the best conclusion?|Hot sunny weather affects both, so ice cream does not cause sunburn|Ice cream causes sunburn|Sunburn causes ice cream sales",
    "Correlation means two things...|Tend to change together|Always cause each other|Are the same thing",
    "A hidden third factor that affects both things is called a...|Confounding variable|Cable|Keyboard",
    "To show that something causes an effect, scientists often use...|A controlled experiment|A guess|A bigger chart",
    "On a scatter plot the points go up from left to right. The correlation is...|Positive|Negative|Zero",
    "One value goes up as the other goes down. The correlation is...|Negative|Positive|Hidden",
    "Dots scattered with no pattern suggest...|No correlation|Perfect correlation|A broken sheet",
    "Two lines on a chart move together. What should you say?|They are related, but more evidence is needed for cause|One must cause the other|Delete one of them"],
    ["Think about whether two things moving together proves that one makes the other happen.", GEN[1], "Example: people who carry umbrellas are more often wet, but umbrellas do not cause rain. Rain causes both. Now pick yours."],
    [["Correlation", "🔗", "<b>Correlation</b> means two things change together, in the same direction or opposite directions."], ["Not always cause", "⚠️", "Together does not mean one causes the other. A hidden factor may cause both."], ["Proof", "🧪", "Controlled experiments help show real causes."]]);
  const C7 = num("Bytes in UTF-8", "🔤", () => {
    const L = ri(10, 60), E = ri(1, 6);
    return [`In UTF-8 text, a plain character (letter, digit or space) uses 1 byte and an emoji uses 4 bytes. A message has ${L} plain characters and ${E} emoji${E > 1 ? "s" : ""}. How many bytes is it?`, L + 4 * E];
  }, ["Handle the plain characters and the emojis separately.", "Plain characters count 1 byte each. Multiply the emojis by 4, then add the two parts.", "Example: 10 plain characters and 2 emojis is 10 + 8 = 18 bytes. Now do yours."],
    [["Unicode", "🔤", "<b>Unicode</b> gives a number to nearly every character in every writing system and to emoji."], ["UTF-8", "💾", "<b>UTF-8</b> stores plain English characters in 1 byte and others in 2 to 4 bytes."], ["Size", "📏", "Messages with emoji take more space than plain text of the same length."]]);
  const C8 = (() => {
    const make = () => {
      const S = pick([5, 7, 8, 10, 11, 12]);
      if (Math.random() < 0.5) {
        const k = ri(20, 200);
        return { text: `A hash table has ${S} slots numbered from 0. A key is stored in slot (key mod ${S}), meaning the remainder after dividing by ${S}. Which slot does key ${k} go in?`, visual: "🗃️", answer: k % S, hints: ["The slot is the remainder when the key is divided by the number of slots.", `Divide the key by ${S} and keep only what is left over.`, "Example: key 29 in a table with 6 slots: 29 = 4 x 6 + 5, so the slot is 5. Now do yours."] };
      }
      const keys = uniq(4, 10, 99), t = keys[0] % S, c = keys.filter(x => x % S === t).length;
      return { text: `A hash table has ${S} slots and stores each key in slot (key mod ${S}). How many of these keys land in the same slot as key ${keys[0]}, counting ${keys[0]} itself?`, visual: big("[" + keys.join(", ") + "]", 1.1), answer: c, hints: ["Find the slot for the first key, then check the others.", "Work out the remainder for each key and count the ones that match the remainder of the first key.", "Example: with 5 slots, keys 12, 17, 9 and 22 have remainders 2, 2, 4 and 2, so 3 keys share the slot of 12. Now do yours."] };
    };
    make.teach = sl([["Hash tables", "🗃️", "A <b>hash table</b> stores items in slots chosen by a rule, so they can be found very fast."], ["A simple rule", "➗", "Slot = <b>key mod slots</b>, the remainder after division."], ["Collision", "💥", "When two keys land in the same slot it is called a <b>collision</b>, and the table needs a way to handle it."]]);
    return { title: "Hash table slots", make };
  })();
  const C9 = num("Steps as input grows", "🚀", () => {
    const n = ri(2, 9) * 5, m = ri(2, 4), N = n * m, q = Math.random() < 0.5;
    return [q ? `A program does n x n steps for n items. How many steps for ${N} items?` : `A program does n steps for n items. It does ${n} steps for ${n} items. How many steps for ${N} items?`, q ? N * N : N, q ? "🐢" : "🚶"];
  }, ["Read how the steps depend on the number of items.", "Put the new number of items in place of n, then work out the steps.", "Example: for n x n steps and 6 items, the steps are 6 x 6 = 36. Now do yours."],
    [["Growth", "🚀", "How the steps grow with the items tells how well a program handles big jobs."], ["Linear", "🚶", "If steps = n, then 10 times as many items means 10 times as many steps."], ["Quadratic", "🐢", "If steps = n x n, then 10 times as many items means 100 times as many steps."]]);
  const C10 = mc("Compiled or interpreted?", "🛠️", [
    "A compiler translates...|The whole program into machine code before it runs|One line while you sleep|Pictures into text",
    "An interpreter runs a program by...|Reading and carrying it out step by step|Deleting it|Printing it",
    "Which is usually compiled before running?|C|A JPEG picture|A word document",
    "Machine code is...|Binary instructions the CPU runs directly|Python|English",
    "A syntax error is usually found...|When the code is read, before it fully runs|After one year|Never",
    "A benefit of interpreted languages is...|Quick to try and change code|They are always the fastest|They never have bugs",
    "A benefit of compiled programs is...|They often run faster|They never need a computer|They have no syntax",
    "Source code is...|Code written by humans in a programming language|The CPU's electricity|A web link"],
    ["Think about when the code gets turned into something the CPU understands.", GEN[1], "Example: a compiler is like translating a whole book before anyone reads it, while an interpreter is like a live translator speaking as you go. Now pick yours."],
    [["Two ways", "🛠️", "A <b>compiler</b> translates the whole program first. An <b>interpreter</b> runs it step by step."], ["Machine code", "🔢", "The CPU only understands <b>machine code</b>, made of binary instructions."], ["Trade-offs", "⚖️", "Compiled programs often run faster. Interpreted ones are quick to test."]]);
  const C11 = mc("Virtual machines", "🖥️", [
    "A virtual machine is...|A computer simulated inside another computer|A broken computer|A game console",
    "Why use a VM to test risky software?|It stays separated from your real system|It is louder|It gives free internet",
    "A container packages...|An app with what it needs to run|A cardboard box|A monitor",
    "The program that creates and runs virtual machines is called a...|Hypervisor|Keyboard|Router",
    "Many virtual machines can run on...|One physical computer|Zero computers|Only a phone battery",
    "Cloud companies rent out...|Slices of big servers as virtual machines|Real clouds|Keyboards",
    "A snapshot of a VM lets you...|Return to a saved state|Take a photo|Speed up Wi-Fi",
    "Compared with a full VM, a container is usually...|Lighter and quicker to start|Always bigger|A phone"],
    ["Think about one real computer pretending to be several.", GEN[1], "Example: a test lab can run a copy of a different operating system in a window, and closing it leaves the real computer untouched. Now pick yours."],
    [["Pretend computers", "🖥️", "A <b>virtual machine</b> acts like a whole separate computer inside a real one."], ["Hypervisor", "🎛️", "Special software shares the real CPU and memory between virtual machines."], ["Containers", "📦", "A <b>container</b> is a lighter way to run an app with everything it needs."]]);
  const C12 = num("Clock speed and cores", "⚙️", () => {
    const c = pick([1, 2, 3, 4]), m = ri(1, 4), cores = ri(2, 8);
    return [`A CPU has ${cores} cores. Each core runs at ${c * m} GHz (billions of cycles per second) and each instruction takes ${c} cycle${c > 1 ? "s" : ""}. With all cores busy, how many billion instructions per second is that?`, cores * m];
  }, ["Find how many instructions one core finishes each second, then think about all the cores.", "One core does GHz divided by cycles per instruction. Multiply by the number of cores.", "Example: 2 cores at 6 GHz with 3 cycles per instruction: 6 / 3 = 2 per core, so 4 billion in total. Now do yours."],
    [["Clock", "⚙️", "A CPU's <b>clock speed</b> in GHz is how many billions of cycles it makes each second."], ["Instructions", "🧮", "An instruction can take one or more cycles, so instructions per second = GHz / cycles."], ["Cores", "🧩", "More <b>cores</b> do more work at once, if the job can be shared."]]);
  const C13 = mc("After a data breach", "🚨", [
    "A company says your password leaked. What should you do first?|Change that password and any copy of it|Ignore it|Share it",
    "Why watch for scam emails after a breach?|Attackers may use leaked details to seem real|Breaches stop scams|Emails vanish",
    "A website you use gets hacked. Who should you tell?|A parent or trusted adult|Everyone online|Nobody",
    "An email says 'Verify your account after the breach'. The safest step is...|Go to the official site yourself, not the link|Click the link fast|Reply with your password",
    "Using separate passwords for each site limits damage because...|Only one account is affected|Accounts merge|It has no effect",
    "Incident response means...|A plan for noticing, containing and fixing a security problem|Running faster|Replying to mail",
    "Logs help investigators by...|Recording what happened and when|Making wood|Hiding evidence",
    "After a breach, turning on extra sign-in checks helps because...|A stolen password alone is no longer enough|Passwords vanish|It deletes the site"],
    ["Think about what an attacker can do with leaked information, and how to stop it.", GEN[1], "Example: if one site leaks a password you used on two sites, change both, because attackers try leaked passwords everywhere. Now pick yours."],
    [["Breach", "🚨", "A <b>data breach</b> is when private information is taken from a company."], ["Your steps", "🪜", "Change passwords, turn on extra sign-in checks, and be careful with emails."], ["Tell someone", "🧑‍🤝‍🧑", "Tell a parent or trusted adult. Do not click links in surprise messages."]]);
  const C14 = mc("Copyright, trademark, patent", "©️", [
    "Copyright automatically protects...|Original creative work like writing, music and code|Everyday facts|Weather",
    "A trademark protects...|Names and logos that identify a brand|Recipes|Jokes",
    "A patent protects...|A new invention|A song|A name",
    "Fair use may allow...|Limited use like quoting for review or teaching|Copying whole movies|Selling others' work",
    "Plagiarism is...|Presenting someone else's work as your own|Quoting with credit|Writing from scratch",
    "Which can protect a song you wrote?|Copyright|Patent|Trademark",
    "Which protects a new machine design?|Patent|Copyright|Trademark",
    "About how long does a patent last?|About 20 years|A few days|Forever"],
    ["Think about what kind of thing each protection is made for: art, brands or inventions.", GEN[1], "Example: a logo on shoes is a brand mark, a story is a creative work, and a new type of engine is an invention. Now pick yours."],
    [["Three kinds", "©️", "<b>Copyright</b> protects creative work. <b>Trademarks</b> protect brand names and logos. <b>Patents</b> protect inventions."], ["Fair use", "📖", "Small, fair uses such as a short quote with credit may be allowed."], ["Credit", "🏷️", "Passing off others' work as yours is plagiarism."]]);
  const C15 = mc("Signatures and certificates", "🖊️", [
    "A digital signature shows a message...|Really came from the sender and was not changed|Is long|Is secret",
    "A digital signature is made with the sender's...|Private key|Public key|Printer",
    "Anyone can check a signature using the sender's...|Public key|Private key|Password",
    "A digital certificate links a website to...|Its public key and verified identity|A color|A game",
    "Who issues certificates?|A certificate authority|A keyboard|A TV",
    "Your browser warns that a certificate expired. A wise action is...|Leave the site and do not enter private details|Click proceed fast|Type your password",
    "The hash of a file changes if...|Even one bit of the file changes|The file is renamed|The screen is dimmed",
    "Why check a file hash after a download?|To confirm it matches the original|To rename it|To speed up the file"],
    ["Think about how a computer can prove who made something and that it was not altered.", GEN[1], "Example: a wax seal on a letter shows who sent it and that no one opened it. Digital signatures work in a similar way. Now pick yours."],
    [["Signing", "🖊️", "The sender signs with a <b>private key</b>. Anyone checks with the <b>public key</b>."], ["Certificates", "📜", "A <b>certificate</b> from a trusted authority shows a site is who it says it is."], ["Hashes", "🔎", "A <b>hash</b> changes completely if a file changes, so it checks for tampering."]]);
  const C16 = mc("Building software in steps", "🏗️", [
    "Which is the usual order of building software?|Plan, design, build, test, release|Release, plan, test, build|Test, release, plan, design",
    "Testing finds...|Bugs before users do|Money|Wi-Fi",
    "Requirements say...|What the software must do|Which keyboard to use|Colors only",
    "Maintenance means...|Fixing and improving software after release|Throwing it away|Printing it",
    "Agile teams work in...|Short cycles with frequent feedback|One giant step over five years|Silence",
    "A prototype is...|An early model to try ideas|The final product|A virus",
    "User feedback helps by...|Showing what to improve|Slowing computers|Hiding bugs",
    "Why write down a design before building?|The team agrees on a plan and avoids confusion|It makes files huge|It hides the plan"],
    ["Think about the steps a team takes from an idea to a finished program.", GEN[1], "Example: a team builds a rough app, asks five users to try it, and fixes what confused them before the real launch. Now pick yours."],
    [["The cycle", "🏗️", "Software goes through planning, design, building, testing, release and maintenance."], ["Agile", "🔁", "<b>Agile</b> teams build in small steps and ask for feedback often."], ["Prototype", "🧪", "A quick early version helps find problems cheaply."]]);
  const C17 = mc("Fair surveys", "📋", [
    "To learn what the whole school thinks, asking only the chess club gives...|A biased sample|A random sample|A full count",
    "A random sample means...|Everyone has a fair chance of being chosen|Only friends are asked|Only volunteers answer",
    "An online poll where people choose to vote can be biased because...|People with strong opinions are more likely to respond|Polls are illegal|Votes are random",
    "A bigger random sample usually gives...|Results closer to the truth|Worse results|The same results always",
    "The question 'Don't you agree homework is awful?' is...|Leading and biased|Neutral|Perfect",
    "The whole group you want to study is the...|Population|Sample|Chart",
    "The part of the group you actually ask is the...|Sample|Population|Title",
    "A survey of 5 people is probably...|Too small to trust|Perfect|Huge"],
    ["Think about whether the people asked are a fair picture of the whole group.", GEN[1], "Example: asking only basketball fans if the school needs a new gym will not show what everyone thinks. Now pick yours."],
    [["Population and sample", "📋", "The <b>population</b> is everyone you care about. The <b>sample</b> is the part you ask."], ["Fair sampling", "🎲", "A <b>random</b> sample gives everyone a fair chance."], ["Good questions", "❓", "Questions should be neutral, not pushing people toward an answer."]]);
  const C18 = mc("What-if models", "🧪", [
    "What-if analysis lets you...|Change an input and see how results change|Predict the lottery|Delete data",
    "Goal Seek finds...|The input needed to reach a target result|Wi-Fi networks|A lost file",
    "If a model adds a percent to cost, where should the percent be stored?|In a separate input cell|Inside every formula|On paper only",
    "Why avoid typing numbers inside formulas?|Changing one input cell updates everything|Formulas get shorter|They stop working",
    "A scenario table compares...|Best case, expected case and worst case|Fonts|Keyboards",
    "If B1 = 200 and B2 = 0.1, what does =B1*(1+B2) show?|220|202|300",
    "Sensitivity means...|How much the results change when an input changes|Being easily upset|Typing speed",
    "A model is only as good as...|Its assumptions|Its font|Its file name"],
    ["Think about changing one number at a time to see what happens.", GEN[1], "Example: a lemonade stand sheet lets you change the price in one cell and instantly see profit change. Now pick yours."],
    [["Inputs", "🧪", "Put your assumptions, like price or growth rate, in <b>input cells</b>."], ["What if", "🔀", "Change an input and the formulas show the new result, so you can compare scenarios."], ["Goal Seek", "🎯", "<b>Goal Seek</b> works backward from a target to the input you need."]]);
  const L24 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18,
    MIX("Mixed practice", C1, C3, C4, C5, C7, C8, C9, C12, C6, C18),
    MIX("Level 24 Challenge", C2, C10, C11, C13, C14, C15, C16, C17, C5, C12)];

  Object.assign(TYPING_LEVELS, { 22: L22, 23: L23, 24: L24 });
})();
