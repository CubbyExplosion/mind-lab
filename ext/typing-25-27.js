// ext/typing-25-27.js  Mind Lab Typing & Computers, levels 25-27 (60 lessons)
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
  const ty = (title, prompt, items, hints, slides) => {
    const make = () => {
      const s = pick(items), n = s.split(" ").length;
      const h = hints.slice(); h[1] = h[1].replace("{n}", s.replace(/ /g, "").length).replace("{w}", n).replace("{f}", esc(s[0]));
      return { text: prompt, visual: big(esc(s), s.length > 70 ? 0.9 : s.length > 40 ? 1.05 : s.length > 14 ? 1.2 : 1.8), textInput: true, answer: s, hints: h };
    };
    make.teach = sl(slides);
    return { title, make };
  };
  // num: fn returns [text, answer, visual, hints]
  const num = (title, vis, fn, slides) => {
    const make = () => {
      const [text, answer, v, hs] = fn();
      return { text, visual: v || vis, answer, hints: hs };
    };
    make.teach = sl(slides);
    return { title, make };
  };
  // mk: fn returns a full question object
  const mk = (title, fn, slides) => { const make = fn; make.teach = sl(slides); return { title, make }; };
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder of each one, then the quiz." }].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };

  // =============== LEVEL 25 ===============
  const A1 = ty("Type a lab report line", "Type this sentence from a lab report.",
    ["The sample was heated to 60 degrees and stirred for ten minutes.", "Figure 2 shows that plant height increased steadily each week.", "We repeated each trial three times to reduce random error.", "The results support our hypothesis that light affects growth.", "Table 1 lists the mass of each sample in grams.", "A control group was kept in the dark for the whole experiment.", "The average temperature rose by 4 degrees after one hour.", "In conclusion, the data suggest a strong link between the two variables."],
    ["Lab reports use plain, exact sentences. Keep a steady rhythm.", "It has {w} words and begins with \"{f}\". Watch the numbers and the final period.", "Example: for <b>We measured the water twice.</b> type each word, then the period. Now type yours."],
    [["Lab report", "🔬", "A lab report tells what you tested, what you saw, and what it means."], ["Exact words", "🎯", "Numbers and units must be typed exactly, or the result is wrong."], ["Proofread", "🔍", "Read it once more after typing. Missing words hide easily."]]);
  const A2 = ty("Type a spreadsheet formula", "Type this formula exactly.",
    ["=SUM(B2:B9)", "=AVERAGE(C2:C20)", "=IF(D2>=60,\"Pass\",\"Fail\")", "=COUNTIF(B:B,\">10\")", "=ROUND(E5/F5,2)", "=MAX(A1:A50)-MIN(A1:A50)", "=VLOOKUP(A2,Data!A:C,3,FALSE)", "=$B$1*C2"],
    ["Formulas start with the equals sign and use brackets, commas and colons.", "It has {n} characters and starts with \"{f}\". Brackets use Shift with 9 and 0, and the colon is Shift with the semicolon key.", "Example: for <b>=SUM(A1:A5)</b> type the equals sign, SUM, a bracket, A1, a colon, A5 and a closing bracket. Now type yours."],
    [["Formula", "🧮", "A formula starts with <b>=</b>. Without it, the sheet treats your typing as plain text."], ["Ranges", "📊", "A colon joins two cells into a range, like <b>B2:B9</b>."], ["Quotes", "⌨️", "Text inside a formula goes in quotation marks."]]);
  const A18 = ty("Type a file path", "Type this file path exactly.",
    ["C:\\Users\\Sam\\Documents\\essay.docx", "D:\\Projects\\site\\index.html", "/home/ana/code/main.py", "C:\\Temp\\data\\scores.csv", "~/Downloads/report.pdf", "/var/log/system.log", "E:\\Backup\\2025\\photos.zip", "C:\\Program Files\\Notes\\notes.exe"],
    ["Paths use slashes or backslashes between folder names.", "It has {n} characters and starts with \"{f}\". The backslash key sits above Enter, and the forward slash is next to the right Shift.", "Example: for <b>D:\\Music\\jazz\\song.mp3</b> type the drive, a colon, then each folder with a backslash. Now type yours."],
    [["Path", "📁", "A path is the address of a file: drive, folders, then the file name."], ["Two styles", "↔️", "Windows uses <b>\\</b> between folders. Linux and Mac use <b>/</b>."], ["Extension", "📄", "The letters after the last dot, like <b>.docx</b>, tell what kind of file it is."]]);
  const A3 = num("Reading time", "⏱️", () => {
    const wpm = pick([200, 250]), w = wpm * ri(2, 12);
    return [`A ${w}-word article is read at ${wpm} words per minute. How many minutes does it take?`, w / wpm, null,
      ["Time equals the amount to read divided by the reading speed.", "Divide the number of words by the words read per minute.", "Example: 1500 words at 300 words per minute is 1500 / 300 = 5 minutes. Now do yours."]];
  }, [["Reading time", "📖", "Reading time = words ÷ words per minute. Most adults read 200 to 250 words per minute."], ["Plan ahead", "🗓️", "Knowing the time lets you plan study blocks and breaks."], ["Check", "✅", "Your answer should be in minutes, so divide, do not multiply."]]);
  const A4 = mc("Lookup functions", "🔎", [
    "Which function searches the first column of a table and returns a value from a column to its right?|VLOOKUP|HLOOKUP|COUNTIF|CONCAT",
    "Which function looks across the top row of a table?|HLOOKUP|VLOOKUP|SUMIF|ROUND",
    "In VLOOKUP, what does FALSE as the last argument mean?|exact match only|approximate match|sort the table|ignore blanks",
    "Which newer function can search one column and return from any other column?|XLOOKUP|SUM|TODAY|ROUND",
    "MATCH returns what?|the position of a value in a list|the value itself|the sum of a list|the average",
    "INDEX(A1:A10,3) returns what?|the third item in the range|the tenth item|A1 plus 3|the position of 3",
    "A VLOOKUP shows #N/A. What most likely happened?|the lookup value was not found|the sheet is too big|the file is locked|the font is wrong",
    "In VLOOKUP(A2,B:D,3,FALSE), which column is returned?|column D|column B|column C|column A"],
    ["Think about what the function name tells you. V stands for vertical and H for horizontal.", "A lookup takes a key, finds it in a table, and then returns something from the same row or column.", "Example: =VLOOKUP(5,A:C,2,FALSE) finds 5 in the first column and returns the matching value from the second column of the table. Now do yours."],
    [["Lookup", "🔎", "A lookup function finds a key in a table and brings back related data."], ["Pieces", "🧩", "VLOOKUP needs: what to find, where to look, which column to return, and exact or not."], ["Errors", "⚠️", "<b>#N/A</b> means the key was not found. Check spelling and spaces."]]);
  const A5 = mc("Dollar signs in formulas", "💲", [
    "In the reference $C$4, what is locked when the formula is copied?|both the column and the row|only the column|only the row|nothing",
    "In the reference B$2, what is locked when the formula is copied?|only the row|only the column|both the column and the row|nothing",
    "In the reference $D5, what is locked when the formula is copied?|only the column|only the row|both the column and the row|nothing",
    "What does pressing F4 do while you type a cell reference in Excel?|cycles through the dollar-sign versions|deletes the cell|saves the file|opens help",
    "A tax rate sits in one cell, and formulas that use it are copied both down and across. How should the reference be locked?|lock both the column and the row|lock nothing|lock only the column|lock only the row",
    "What does a $ sign in a cell reference do?|locks that part when copied|turns the value into money|adds dollars|hides the cell",
    "The formula =A2*B$1 is copied from row 2 down to row 5. What happens to B$1?|it stays B$1|it moves to row 4|it moves to column C|it is deleted",
    "Copy =$A2+B2 one column to the right. What changes?|only the B2 part, which becomes C2|the $A2 part, which becomes $B2|both parts shift one column|nothing changes"],
    ["Ask which part of the reference has a dollar sign. That part is locked.", "A relative reference moves when copied. A locked row or column stays put, and only the unlocked part changes.", "Example: copying =$X5 one column right and one row down gives =$X6, because the column is locked and the row is not. Now do yours."],
    [["Relative", "↔️", "A reference like <b>B2</b> is relative. It shifts when you copy the formula."], ["Absolute", "🔒", "<b>$B$2</b> is locked, so it always points to the same cell."], ["Mixed", "🔀", "<b>$B2</b> locks the column. <b>B$2</b> locks the row."]]);
  const A6 = num("Percentile rank", "📈", () => {
    const n = pick([10, 20, 25, 50, 100]), k = ri(1, n - 1);
    return [`In a class of ${n} students, you scored higher than ${k} of them. What percent of the class scored below you?`, k * 100 / n, null,
      ["Turn the part into a fraction of the whole class, then into a percent.", "Divide the number you beat by the class size, then multiply by 100.", "Example: beating 150 students in a group of 200 is 150 / 200 = 0.75, which is 75 percent. Now do yours."]];
  }, [["Percentile", "📈", "Percentile rank tells what share of the group scored below you."], ["Method", "🧮", "(people below you ÷ group size) × 100."], ["Careful", "⚠️", "A high percentile is not the same as a high score. It compares you to others."]]);
  const A7 = mc("Types of JOIN", "🔗", [
    "Which join keeps only rows that have a match in both tables?|INNER JOIN|LEFT JOIN|CROSS JOIN|FULL JOIN",
    "Which join keeps every row from the left table, even with no match?|LEFT JOIN|INNER JOIN|RIGHT JOIN|CROSS JOIN",
    "A join connects two tables using what?|a matching column such as a key|the file names|the colors|the table sizes",
    "Customers has 3 rows and Orders has 4 rows, and every order matches exactly one customer. How many rows does an INNER JOIN give?|4|3|7|12",
    "Which join pairs every row of one table with every row of the other?|CROSS JOIN|INNER JOIN|LEFT JOIN|RIGHT JOIN",
    "In a LEFT JOIN, what do the right table's columns show for an unmatched left row?|NULL|an error|a copy of the left row|the word JOIN",
    "Which column usually links Orders to Customers?|customer_id in both tables|the order color|the row number|the table name",
    "Table A has 2 rows and table B has 5 rows. How many rows does a CROSS JOIN give?|10|7|5|2"],
    ["Picture the two tables side by side and ask which rows must appear in the result.", "Think about what happens to rows that have no partner in the other table.", "Example: with 2 authors and 3 books where each book has one author, an inner join gives one row per book. Now think about yours."],
    [["Join", "🔗", "A <b>JOIN</b> combines rows from two tables using a shared column."], ["Kinds", "🧩", "INNER keeps matches. LEFT keeps all left rows. CROSS pairs everything."], ["NULL", "❓", "<b>NULL</b> means no value. Unmatched rows in a LEFT JOIN get NULLs."]]);
  const A8 = mc("Normalizing data", "🗄️", [
    "Why split a database into several tables?|to avoid repeating the same data|to make files bigger|to hide the data|to slow queries",
    "A table repeats a customer's full address in every order row. What problem can happen?|the address may be updated in some rows but not others|the table will have no rows|orders will vanish|the keyboard locks",
    "What is the main idea of normalization?|store each fact once|store everything in one cell|delete old data|encrypt each column",
    "A cell holds red, blue, green. Normalization says each cell should hold what?|one value|a whole list|a picture|a formula",
    "Which fix follows normalization?|put customers in their own table and link by ID|copy customers into every table|merge all tables|remove all keys",
    "What is a downside of having many small tables?|queries need more joins|data is stored twice|there are no keys|rows are lost",
    "An update anomaly means what?|changing one fact must be done in many places|a table is too small|a key is missing|the database is offline",
    "Which ID would you add to link Orders to Products?|product_id|order color|page number|file size"],
    ["Ask whether the same fact is written down more than once.", "Good design keeps one place for each fact and links to it with IDs.", "Example: a school stores each teacher's phone once in a Teachers table, and classes point to the teacher by ID. Now think about yours."],
    [["Repeats", "♻️", "Repeated data wastes space and causes mistakes when one copy is changed."], ["Normalize", "🧱", "Split data into tables so each fact lives in exactly one place."], ["Link", "🔗", "Use keys, like IDs, to connect the tables again."]]);
  const A9 = mc("What an OS does", "🖥️", [
    "Which part of the operating system sits closest to the hardware?|the kernel|the wallpaper|the browser|the printer",
    "What does the OS do when many apps run at once?|shares processor time between them|deletes all but one|turns off memory|closes the screen",
    "Which of these is an operating system?|Linux|Photoshop|Firefox|Zoom",
    "What is a driver?|software that lets the OS talk to a device|a person who fixes PCs|a kind of cable|a type of virus",
    "What does a file system do?|organizes how data is stored and found on a drive|draws icons|speeds up Wi-Fi|blocks viruses",
    "What is multitasking?|running several programs in turns or together|typing with two hands|using two screens|having two users",
    "Which task does the OS handle?|managing memory for programs|spell checking a letter|editing photos|designing a logo",
    "An app asks to read a file. Who checks permission and does the reading?|the operating system|the monitor|the mouse|the speaker"],
    ["Think about the job that sits between apps and the hardware.", "The OS manages the processor, memory, storage and devices so apps do not fight over them.", "Example: when two apps both want to print, the OS lines up the jobs so they do not collide. Now think about yours."],
    [["Manager", "🧑‍💼", "The <b>operating system</b> manages the hardware and runs your apps."], ["Kernel", "❤️", "The <b>kernel</b> is its core. It controls memory, processes and devices."], ["Drivers", "🔌", "A <b>driver</b> teaches the OS how to use one particular device."]]);
  const A10 = mc("Files and paths", "📁", [
    "Which is an absolute path?|C:\\Users\\Sam\\notes.txt|notes.txt|..\\notes.txt|.\\notes.txt",
    "What does .. mean in a path?|the parent folder|the current folder|the root drive|a hidden file",
    "What does a single . mean in a path?|the current folder|the parent folder|the desktop|the trash",
    "In report.final.pdf, what is the file extension?|pdf|report|final|report.final",
    "You are in /home/ana/docs. Where does ../photos point?|/home/ana/photos|/home/ana/docs/photos|/home/photos|/photos",
    "On Linux, what is the top folder of the whole file system called?|root, written /|home|desktop|drive C",
    "Which is a relative path?|docs/notes.txt|C:\\docs\\notes.txt|/home/ana/notes.txt|D:\\notes.txt",
    "Why avoid odd symbols in file names?|some programs and commands handle them badly|files get bigger|the file turns red|the file is deleted"],
    ["Does the path start from the very top of the drive, or from where you are now?", "Absolute paths start at the root. Relative paths depend on the current folder, and two dots mean go up one level.", "Example: from /a/b, the path ../c points to /a/c, because the two dots climb from b up to a. Now do yours."],
    [["Absolute", "🧭", "An <b>absolute path</b> starts at the root, so it works from anywhere."], ["Relative", "📍", "A <b>relative path</b> starts from your current folder."], ["Dots", "⬆️", "<b>.</b> is here and <b>..</b> is one level up."]]);
  const A11 = num("Two's complement range", "➖", () => {
    const n = ri(4, 10);
    return pick([
      [`A computer stores signed whole numbers in ${n} bits using two's complement. What is the largest positive number it can hold?`, 2 ** (n - 1) - 1, null,
        ["One bit is used as the sign bit, so it cannot help with size.", `That leaves ${n - 1} bits for size. The biggest value fills all of them with ones.`, "Example: with 3 bits, the sign bit leaves 2 bits. Binary 11 is 3, so the biggest positive is 3. Now do yours."]],
      [`In ${n}-bit two's complement, how many different negative numbers can be stored?`, 2 ** (n - 1), null,
        ["The first bit tells the sign. Half of the patterns have it set.", `There are 2 to the power ${n} patterns in all, and half of them are negative.`, "Example: 3 bits make 8 patterns. Half are negative, so 4 negative numbers. Now do yours."]]
    ]);
  }, [["Signed", "➖", "To store negative numbers, computers use <b>two's complement</b>. The first bit is the sign."], ["Range", "↔️", "With n bits you get 2<sup>n</sup> patterns: half negative and half zero or positive."], ["Biggest", "🔝", "The largest positive is 2<sup>n−1</sup> − 1."]]);
  const A12 = mc("Memory and storage", "💾", [
    "Which memory loses its contents when the power goes off?|RAM|SSD|hard disk|USB flash drive",
    "Which is usually the fastest?|CPU cache|hard disk|USB drive|DVD",
    "Which keeps your files when the computer is off?|SSD|RAM|cache|CPU registers",
    "Which has no moving parts?|SSD|hard disk drive|DVD drive|tape drive",
    "More RAM mostly helps with what?|running more programs at once|storing more photos|a bigger screen|faster Wi-Fi",
    "What happens when RAM is full and the OS leans on the disk instead?|the computer slows down|it speeds up|nothing changes|files are deleted",
    "Which holds the data and programs the computer is using right now?|RAM|DVD|backup drive|cloud archive",
    "Cache is small but quick. What is it for?|keeping often-used data close to the CPU|storing movies|printing|cooling the PC"],
    ["Ask two things: does it keep data without power, and how fast is it?", "Fast memory is small and costs more. Big storage is slower but keeps data when switched off.", "Example: a desk is quick to use but small, while a warehouse is huge but slow to reach. Memory and storage work in a similar way. Now do yours."],
    [["Short-term", "⚡", "<b>RAM</b> is the computer's fast working memory. It is wiped when power goes off."], ["Long-term", "💽", "<b>Storage</b> (SSD or hard disk) keeps files without power."], ["Layers", "🪜", "Registers, cache, RAM, then storage: faster is smaller and costlier."]]);
  const A13 = num("Energy use in kWh", "🔌", () => {
    const [w, st] = pick([[100, 10], [200, 5], [250, 4], [500, 2], [1000, 1]]), h = st * ri(1, 6);
    return [`A ${w}-watt computer runs for ${h} hours. How many kilowatt-hours (kWh) does it use? (1 kWh = 1000 watt-hours)`, w * h / 1000, null,
      ["Multiply the watts by the hours first, then change watt-hours into kilowatt-hours.", "Watts × hours gives watt-hours. Divide by 1000 to get kilowatt-hours.", "Example: a 2000-watt heater for 3 hours uses 2000 × 3 = 6000 watt-hours, which is 6 kWh. Now do yours."]];
  }, [["Watts", "💡", "A watt measures power. A kilowatt (kW) is 1000 watts."], ["kWh", "🔋", "Energy = power × time. A 1 kW device running for 1 hour uses 1 kWh."], ["Why care?", "🌍", "Electricity bills and data-center energy are measured in kWh."]]);
  const A14 = mc("Types of information systems", "🏢", [
    "A shop's cash register records each sale. Which system is this?|transaction processing system|decision support system|game engine|email system",
    "Which system helps managers choose using reports and models?|decision support system|transaction processing system|keyboard driver|word processor",
    "What does a CRM system manage?|customer relationships|computer RAM|CPU temperature|network cables",
    "What does an ERP system do?|joins a company's finance, stock and staff data in one system|edits photos|plays music|blocks viruses",
    "A school stores grades, attendance and timetables. This is a ...|student information system|video game|3D printer|web font",
    "What are the five parts of an information system?|hardware, software, data, people, processes|only screens|mouse and keyboard|apps and games",
    "Which is raw data, not yet information?|the number 85 on its own|The class average is 85 this week|Scores rose by five points|Most students passed",
    "An inventory system reorders stock when it runs low. Which part decides that?|the software rules|the monitor|the cable|the desk"],
    ["Ask what the system is used for: recording events, helping decisions, or running a whole company.", "Data becomes information when it is organized so it means something to a person.", "Example: a library's checkout desk records each loan, and its monthly report helps the librarian decide what to buy. Now do yours."],
    [["Information system", "🏢", "An <b>information system</b> collects, stores and processes data to help people do work."], ["Kinds", "🧩", "TPS records transactions, DSS supports decisions, CRM tracks customers, ERP joins the business."], ["Data to information", "💡", "Data is raw facts. Information is data with meaning."]]);
  const A15 = mc("Firewalls and updates", "🧱", [
    "What does a firewall do?|filters network traffic by rules|cleans the screen|stores passwords|speeds up the CPU",
    "A rule blocks all incoming traffic to port 23. What happens to a request for that port?|it is stopped|it is sped up|it is encrypted|it is saved",
    "Which tool scans your computer for known malicious programs?|antivirus software|a spreadsheet|a monitor|a printer",
    "Why keep your operating system updated?|updates fix known security holes|updates make the screen bigger|updates remove antivirus|updates add RAM",
    "Where can a firewall run?|on a router or on a single computer|only inside a mouse|only on paper|only in a printer",
    "What is defense in depth?|using several layers of protection|using one very strong password|turning off the network|trusting every user",
    "Which is a good habit with software installers?|download only from the maker's official source|open every attachment|turn off updates|share your password",
    "Which is malware?|a virus that hides in a program|a spell checker|a backup file|a font"],
    ["Ask whether each choice blocks, finds, repairs or does something unrelated to security.", "Security works in layers: filters, scanners, updates and careful habits all help.", "Example: a lock, an alarm and a camera on one house are three layers of security. Now do yours."],
    [["Firewall", "🧱", "A <b>firewall</b> allows or blocks network traffic using rules."], ["Updates", "🔄", "Updates patch holes that attackers already know about."], ["Layers", "🧅", "No single tool is enough. Use several together."]]);
  const A16 = mc("Data privacy principles", "🔏", [
    "Data minimization means what?|collect only the data you need|collect everything|never use data|delete the app",
    "Consent means what?|a person clearly agrees to how their data is used|data is collected silently|the app decides alone|the website is free",
    "Anonymizing data means what?|removing details that point to one person|making data bigger|selling it|copying it",
    "A rule lets people ask a company to delete their data. This is the right to ...|erasure|upload|compress|print",
    "What does PII stand for?|personally identifiable information|public Internet interface|private image index|program input instruction",
    "Which is PII?|a full name with a home address|the weather today|the word blue|the number 7",
    "Why should apps state a purpose for collecting data?|users should know why it is needed|to fill space|to slow the app|to hide the data",
    "Which is the safest way to store collected personal data?|encrypted, with limited access|in a public folder|in an email to everyone|on a sticky note"],
    ["Ask what protects the person the data is about.", "Good privacy practice collects little, explains why, gets agreement, and protects what it keeps.", "Example: a library card form that asks only for a name and an email, not a birthday or home address, collects the minimum it needs. Now do yours."],
    [["Privacy", "🔏", "<b>Personal data</b> belongs to the person it describes."], ["Principles", "📜", "Collect little, say why, ask permission, keep it safe, delete when asked."], ["PII", "🪪", "PII is any detail that can point to a real person."]]);
  const A17 = mc("Tech ethics", "⚖️", [
    "A company finds a security bug in its app. What is the most ethical step?|fix it and tell affected users|hide it|sell the bug|blame users",
    "Before using someone's code from the web, you should ...|check its license|assume it is free|remove the author's name|claim you wrote it",
    "Which is an example of informed consent?|users read a clear explanation and choose yes or no|a hidden pre-ticked box|no choice at all|a tiny unreadable note",
    "A feature helps most users but shuts out blind users. What is the fairer fix?|add screen-reader support|remove their accounts|ignore it|make the text smaller",
    "Why can moving fast clash with ethics?|safety and fairness checks take time|ethics makes code faster|it never does|fast code is always safe",
    "A tester privately reports a bug that could leak data to the company. This is called ...|responsible disclosure|public shaming|hacking|spam",
    "Which is an ethical use of a shared school computer?|following the acceptable-use rules|installing games secretly|reading others' files|sharing logins",
    "An AI tool wrongly rejects many applicants from one group. What should the team do?|test, find the cause and fix the bias|ignore it|add more rejections|hide the results"],
    ["Ask who could be helped or harmed by each choice.", "The ethical choice is honest, respects people's rights and safety, and fixes problems openly.", "Example: if a shop finds it charged customers twice, the ethical choice is to tell them and refund the extra. Now choose yours."],
    [["Ethics", "⚖️", "Tech ethics asks not only <i>can</i> we build it, but <i>should</i> we."], ["Who is affected?", "👥", "Think about users, workers, and people who never chose to take part."], ["Be open", "🪟", "Honest reporting and clear choices build trust."]]);

  const L25 = [A1, A2, A18, A12, A9, A10, A3, A13, A6, A11, A5, A4, A7, A8, A14, A15, A16, A17,
    MIX("Mixed practice", A1, A3, A5, A6, A9, A10, A11, A12, A13, A15),
    MIX("Level 25 Challenge", A2, A4, A7, A8, A14, A16, A17, A18, A11, A13)];

  // =============== LEVEL 26 ===============
  const B1 = ty("Type an abstract line", "Type this sentence from a research abstract.",
    ["This study tested how screen time affects sleep in 120 students.", "Participants were randomly assigned to one of two groups.", "The results showed a small but significant improvement in scores.", "Further research is needed to confirm these findings.", "Data were collected through an online survey over four weeks.", "We found that regular practice improved accuracy by 18 percent.", "These findings suggest that short breaks can raise focus.", "The sample included 240 adults between the ages of 18 and 65."],
    ["Abstract sentences are formal and packed with facts.", "It has {w} words and begins with \"{f}\". Numbers and the final period matter.", "Example: for <b>The survey had 50 questions.</b> type each word, the number, then the period. Now type yours."],
    [["Abstract", "📑", "An <b>abstract</b> is a short summary of a research paper."], ["Past tense", "⏳", "Reports say what <i>was</i> done and what <i>was</i> found."], ["Accuracy", "🎯", "A wrong number in a report can change its meaning."]]);
  const B2 = ty("Type a longer formula", "Type this formula exactly.",
    ["=IF(B2>=90,\"A\",\"B\")", "=IF(AND(A2>5,B2<10),1,0)", "=SUMIF(A:A,\"Pass\",B:B)", "=IFERROR(A2/B2,0)", "=TEXT(C2,\"0.00\")", "=INDEX(A1:A9,MATCH(5,B1:B9,0))", "=LEN(TRIM(A2))", "=COUNTIFS(A:A,\"Yes\",B:B,\">50\")"],
    ["Longer formulas nest brackets inside brackets. Keep every pair matched.", "It has {n} characters and starts with \"{f}\". Count your opening and closing brackets when you finish.", "Example: for <b>=IF(OR(A1=1,B1=2),\"Yes\",\"No\")</b> type each function, its brackets, the commas and the quotes. Now type yours."],
    [["Nesting", "🪆", "A function can sit inside another function, like <b>IF(AND(...),...)</b>."], ["Brackets", "⌨️", "Every opening bracket needs a closing one."], ["Check", "✅", "Read your formula left to right once before pressing Enter."]]);
  const B3 = ty("Type a command line", "Type this command exactly.",
    ["ping 192.168.0.1", "ipconfig /all", "cd Documents", "mkdir projects", "dir C:\\Users", "copy notes.txt backup.txt", "tracert 10.0.0.1", "netstat -an"],
    ["Commands are exact. One wrong letter and the computer will not understand.", "It has {w} parts and begins with \"{f}\". Spaces matter between parts.", "Example: for <b>ping 10.1.1.1</b> type the command, a space, then the number with dots. Now type yours."],
    [["Command line", "💻", "A <b>command line</b> lets you control the computer by typing."], ["Exact", "🎯", "Spaces, dots and slashes must all be right."], ["Common tools", "🧰", "<b>ping</b> tests a connection. <b>cd</b> changes folder. <b>mkdir</b> makes a folder."]]);
  const B4 = num("Subnet sizes", "🌐", () => {
    const p = ri(22, 30);
    return pick([
      [`A network uses the prefix /${p}. How many usable host addresses does it have? (Two addresses are reserved.)`, 2 ** (32 - p) - 2, null,
        ["First find how many bits are left for hosts, then count the addresses.", "Host bits = 32 minus the prefix. Total addresses = 2 to the power of the host bits. Then take away the two reserved ones.", "Example: a /20 has 12 host bits, so 4096 addresses, and 4096 − 2 = 4094 usable. Now do yours."]],
      [`A network uses the prefix /${p}. How many addresses are in the whole block, counting the reserved ones?`, 2 ** (32 - p), null,
        ["Find how many bits are left over after the network part.", "Host bits = 32 minus the prefix. Total addresses = 2 to the power of the host bits.", "Example: a /20 has 12 host bits, so 2 to the power 12 = 4096 addresses. Now do yours."]]
    ]);
  }, [["Prefix", "🌐", "In <b>/24</b>, the first 24 of 32 bits name the network. The rest name the hosts."], ["Count", "🔢", "Host bits = 32 − prefix. Addresses = 2<sup>host bits</sup>."], ["Reserved", "🚫", "The first address names the network and the last is the broadcast, so usable = total − 2."]]);
  const B5 = num("RAID capacity", "💽", () => {
    const s = pick([1, 2, 4, 8, 10]);
    return pick([
      () => { const n = ri(3, 8); return [`A RAID 5 set uses ${n} drives of ${s} TB each. RAID 5 gives up one drive's worth of space for safety. How many TB are usable?`, (n - 1) * s, null,
        ["One drive's worth of space goes to protection.", "Usable space = (number of drives minus one) × size of one drive.", "Example: 5 drives of 3 TB in RAID 5 give (5 − 1) × 3 = 12 TB. Now do yours."]]; },
      () => { const n = ri(2, 6); return [`A RAID 0 set joins ${n} drives of ${s} TB each, with no protection. How many TB are usable?`, n * s, null,
        ["RAID 0 uses every drive for space.", "Usable space = number of drives × size of one drive.", "Example: 4 drives of 3 TB in RAID 0 give 4 × 3 = 12 TB. Now do yours."]]; },
      () => { const n = pick([4, 6, 8]); return [`A RAID 10 set mirrors pairs of drives, using ${n} drives of ${s} TB each. Half the space is spent on copies. How many TB are usable?`, n / 2 * s, null,
        ["Every drive has a mirror copy, so only half is new space.", "Usable space = half the number of drives × size of one drive.", "Example: 6 drives of 3 TB in RAID 10 give 3 × 3 = 9 TB. Now do yours."]]; },
      () => [`A RAID 1 mirror uses 2 drives of ${s} TB each, and both hold the same data. How many TB are usable?`, s, null,
        ["Both drives keep identical copies.", "Usable space equals the size of just one drive.", "Example: two 3 TB drives in RAID 1 hold only 3 TB of data. Now do yours."]]
    ])();
  }, [["RAID", "💽", "<b>RAID</b> joins several drives for speed, safety, or both."], ["Types", "🧩", "RAID 0 = all space, no safety. RAID 1 = a mirror. RAID 5 = one drive's worth of protection."], ["Not a backup", "⚠️", "RAID protects against a drive failing, not against deleting a file by mistake."]]);
  const B6 = mc("Pick the right chart", "📊", [
    "Which chart is best for showing change over time?|line chart|pie chart|map|word cloud",
    "Which chart shows parts of a whole when there are only a few parts?|pie chart|line chart|scatter plot|histogram",
    "Which chart shows the relationship between two numbers, like height and weight?|scatter plot|pie chart|timeline|word cloud",
    "Which chart compares sales across 5 stores?|bar chart|scatter plot|timeline|flow chart",
    "Which chart shows how test scores are spread across ranges?|histogram|pie chart|line chart|org chart",
    "Why should a bar chart's value axis usually start at zero?|bar heights show size, so a cut axis exaggerates|it saves ink|it is the law|it speeds up charts",
    "A pie chart has 15 tiny slices. What is the better choice?|a bar chart|more colors|a 3D pie|a smaller font",
    "What does a chart title do?|says what the chart shows|adds data|hides axes|changes the data"],
    ["Ask what the chart must show: a trend, a comparison, parts of a whole, a relationship, or a spread.", "Each job has a usual chart type. Match the job to the picture that shows it most clearly.", "Example: to show the steps of a process in order, you would use a flow chart, because it shows sequence. Now pick yours."],
    [["Match job", "🎯", "Pick the chart from the question you want it to answer."], ["Keep it honest", "⚖️", "Start bar charts at zero and label the axes."], ["Keep it simple", "✨", "Too many slices, colors or effects make a chart hard to read."]]);
  const GATES = { AND: (a, b) => a & b, OR: (a, b) => a | b, XOR: (a, b) => a ^ b, NAND: (a, b) => 1 - (a & b), NOR: (a, b) => 1 - (a | b) };
  const GRULE = { AND: "AND gives 1 only when both inputs are 1.", OR: "OR gives 1 when at least one input is 1.", XOR: "XOR gives 1 when the two inputs are different.", NAND: "NAND is AND turned upside down: it gives 0 only when both inputs are 1.", NOR: "NOR is OR turned upside down: it gives 1 only when both inputs are 0." };
  const B7 = mk("Logic gates", () => {
    const g = pick(Object.keys(GATES)), a = ri(0, 1), b = ri(0, 1);
    let a2, b2; do { a2 = ri(0, 1); b2 = ri(0, 1); } while (a2 === a && b2 === b);
    return {
      text: `Inputs: A = ${a} and B = ${b}. What does a ${g} gate output?`, visual: big(`${a} ${g} ${b}`, 1.6), choices: ["0", "1"], answer: String(GATES[g](a, b)),
      hints: ["A gate takes bits in and gives one bit out. Think about what its name means.", GRULE[g], `Example: for a ${g} gate with A = ${a2} and B = ${b2}, the output is ${GATES[g](a2, b2)}. Now do yours.`]
    };
  }, [["Gates", "🚪", "A <b>logic gate</b> turns input bits (0 or 1) into one output bit."], ["Basic three", "🔧", "AND needs both. OR needs at least one. NOT flips the bit."], ["More", "🧩", "XOR means different. NAND and NOR are AND and OR flipped."]]);
  const B8 = mc("Cloud service models", "☁️", [
    "Using an online email service in a browser is an example of which model?|SaaS|IaaS|PaaS|FaaS",
    "Renting virtual servers and storage is called ...|IaaS|SaaS|PaaS|FaaS",
    "A platform where developers run their apps without managing servers is ...|PaaS|SaaS|IaaS|HTML",
    "What does SaaS stand for?|software as a service|storage as a server|security as a system|speed as a service",
    "What does IaaS stand for?|infrastructure as a service|internet as a service|input as a source|image as a stream",
    "Which model gives you the most control over the system?|IaaS|SaaS|PaaS|all are equal",
    "A public cloud is ...|shared infrastructure rented from a provider|a server in your bedroom only|a weather map|a type of keyboard",
    "Elasticity in the cloud means ...|resources grow or shrink with demand|the cable stretches|data is free|servers never fail"],
    ["Think about how much the provider manages for you and how much you manage yourself.", "The more the provider handles, the less you control. A finished app you just log into is the most hands-off.", "Example: renting an empty workshop gives you freedom but lots of work, while renting a finished office is ready to use. Now decide yours."],
    [["Service models", "☁️", "Cloud providers rent computing at different levels."], ["Three levels", "🪜", "<b>IaaS</b> = raw machines. <b>PaaS</b> = a platform to run apps. <b>SaaS</b> = a finished app."], ["Elastic", "📈", "You use more at busy times and pay for what you use."]]);
  const B9 = mc("RPO and RTO", "💾", [
    "RPO is the most data you can afford to lose, measured in what?|time|colors|pixels|volts",
    "RTO is how long a system may be down. What does RTO stand for?|recovery time objective|restart timer option|remote transfer order|recovery tool online",
    "Backups run every 24 hours. In the worst case, how much data could be lost?|up to 24 hours of work|none|one minute|a week",
    "A shop needs its website back within 1 hour. That is its ...|RTO|RPO|ISP|CPU",
    "A bank can lose at most 5 minutes of data. That is its ...|RPO|RTO|RAM|ROM",
    "To lower your RPO you should ...|back up more often|back up less often|buy a bigger screen|delete backups",
    "Which backup copies only what changed since the previous backup?|incremental|full|printed|none",
    "Why should you test restoring from a backup?|a backup that cannot be restored is useless|to fill the disk|to speed up Wi-Fi|to delete data"],
    ["Ask whether the question is about how much data is lost or how long things are down.", "RPO looks backward to the last good copy. RTO looks forward to when service returns.", "Example: if a library's catalog is copied every night, a crash at noon can lose that morning's changes. Now do yours."],
    [["Disasters happen", "🌪️", "Drives fail, files get deleted, and attacks happen. Plan for recovery."], ["Two numbers", "⏱️", "<b>RPO</b> = how much data loss is acceptable. <b>RTO</b> = how fast you must be back."], ["Test it", "🧪", "Practice restoring before you need to."]]);
  const B10 = mc("Authentication or authorization", "🛂", [
    "Proving who you are is called ...|authentication|authorization|compression|streaming",
    "Deciding what you are allowed to do is called ...|authorization|authentication|hashing|caching",
    "Typing a password and a code from your phone is part of ...|authentication|authorization|formatting|caching",
    "A student can read grades but not change them. This is ...|authorization|authentication|a virus|a bug",
    "Which is something you are?|a fingerprint|a password|a phone code|a key card",
    "Which is something you know?|a PIN|a fingerprint|a face scan|a hardware key",
    "Which is something you have?|a security key|a PIN|a pet's name|a birthday",
    "Logging in with a second proof as well as a password is called ...|multi-factor authentication|single sign-off|data mining|pairing"],
    ["Ask whether it is about who you are or about what you may do.", "Authentication happens first at the door. Authorization happens after, inside.", "Example: showing your ticket at a concert gate proves you belong there, and your seat number says where you may sit. Now do yours."],
    [["Who", "🪪", "<b>Authentication</b> checks who you are."], ["What", "🔑", "<b>Authorization</b> decides what you may do once inside."], ["Factors", "🧩", "Something you know, have or are. Using two or more is stronger."]]);
  const B11 = num("Brute-force time", "🔓", () => {
    const d = ri(3, 7), m = ri(1, Math.min(4, d));
    return [`A PIN has ${d} digits (each 0 to 9). A program tries ${10 ** m} PINs every second. How many seconds will it take to try every possible PIN?`, 10 ** (d - m), null,
      ["First count how many different PINs exist, then divide by the speed.", "Each digit has 10 choices, so multiply 10 by itself once for each digit. Then divide by the tries per second.", "Example: 2-digit codes have 100 possibilities. At 10 tries per second, that takes 100 / 10 = 10 seconds. Now do yours."]];
  }, [["Brute force", "🔓", "A <b>brute-force</b> attack tries every possible code."], ["Count", "🔢", "A code with d digits has 10<sup>d</sup> possibilities."], ["Defense", "🛡️", "Longer codes and limits on wrong tries make this attack far too slow."]]);
  const B12 = mc("Data at rest and in transit", "🔐", [
    "Data stored on a laptop's drive is called data ...|at rest|in transit|in flight|in motion",
    "Data moving across Wi-Fi is called data ...|in transit|at rest|archived|stored",
    "What protects data while it moves between your browser and a website?|HTTPS|plain HTTP|a screensaver|a bigger monitor",
    "Why encrypt the drive of a laptop that could be lost?|thieves cannot read the files|it makes the laptop lighter|it speeds up boot|it removes the battery",
    "Encryption turns readable plaintext into ...|ciphertext|cleartext|metadata|pixels",
    "What do you need to turn ciphertext back into plaintext?|the correct key|a bigger monitor|a faster printer|more RAM",
    "Is renaming a file secret the same as encrypting it?|no, anyone can still read it|yes, it is locked|yes, it is scrambled|yes, but only in Word",
    "What does a padlock icon in the browser mostly mean?|the connection to the site is encrypted|the site is guaranteed honest|the site is free|the PC is virus-free"],
    ["Ask whether the data is sitting still or moving.", "Stored data is protected by encrypting the disk. Moving data is protected by an encrypted connection.", "Example: a letter in a locked drawer is like data at rest, and a letter inside a sealed envelope in the mail is like data in transit. Now do yours."],
    [["Two states", "🔁", "Data is either <b>at rest</b> (stored) or <b>in transit</b> (moving)."], ["Encrypt both", "🔐", "Disk encryption protects stored data. HTTPS protects data in transit."], ["Key", "🗝️", "Without the key, encrypted data looks like random noise."]]);
  const B13 = mc("Creative Commons", "©️", [
    "CC BY means you may reuse the work if you ...|give credit to the creator|pay the creator|ask for a signature|delete the original",
    "What does NC stand for in a Creative Commons license?|non-commercial|new copy|no credit|network control",
    "What does ND mean?|no derivatives, so do not change the work|no download|new design|no deadline",
    "What does SA mean?|share alike, so share your version under the same license|stop all|save always|sell any",
    "CC0 means ...|the creator gives up rights as far as the law allows|all rights reserved|credit is always required|only for schools",
    "A photo is CC BY-NC. May you use it in a paid advertisement?|no, NC means non-commercial|yes, always|yes, if cropped|only on weekdays",
    "A work has no license at all and is not public domain. Can you reuse it freely?|no, default copyright applies|yes, it is on the web|yes, if you credit|yes, if under 10 percent",
    "Where do you usually find a work's license?|on the page near the work or in its description|inside your keyboard|in the monitor settings|nowhere"],
    ["Think about what permission each little code gives you, and what it asks in return.", "Creative Commons letters are short rules: whether you must credit, whether money is allowed, whether changes are allowed.", "Example: to decide whether you may reuse a song in a video, find its license and read each rule. Now do yours."],
    [["Licenses", "©️", "<b>Creative Commons</b> licenses tell you what reuse is allowed."], ["Letters", "🔤", "BY = credit, NC = no money-making, ND = no changes, SA = share alike."], ["Rule", "📜", "If there is no license, assume you must ask first."]]);
  const B14 = mc("Designing for everyone", "♿", [
    "Captions on a video help who?|deaf viewers and people in noisy places|only teachers|only people with big screens|nobody",
    "Alt text describes a picture for whom?|people using screen readers|people with printers|nobody|only search robots",
    "Which color choice is most readable?|dark text on a light background|light gray text on white|yellow on white|red on green",
    "Why not use color alone to show an error?|some people cannot tell the colors apart|colors cost money|screens ignore color|red is banned",
    "Which helps people with limited hand movement?|voice control and large click targets|tiny buttons|faster timers|hidden menus",
    "What does a screen reader do?|reads page text aloud|prints pages|makes text smaller|plays games",
    "Universal design means designing ...|so as many people as possible can use it|only for experts|only for one group|only for phones",
    "Which is best for text size?|let users enlarge the text|fix it tiny|use images of text|hide it"],
    ["Ask who might be left out by each choice.", "Good design works for people who see, hear, move and think in different ways.", "Example: a ramp helps wheelchair users, but it also helps parents with strollers and people with heavy bags. Now do yours."],
    [["Everyone", "♿", "<b>Accessible</b> design means more people can use it."], ["Tools", "🧰", "Captions, alt text, strong contrast, and keyboard control."], ["Bonus", "🎁", "Features built for access often help all users."]]);
  const B15 = num("Compression", "🗜️", () => {
    const c = pick([5, 10, 12, 20, 25]);
    return pick([
      () => { const r = ri(2, 10); return [`A file shrinks from ${c * r} MB to ${c} MB with compression. The compression ratio is original size ÷ compressed size. What is the ratio?`, r, null,
        ["Divide the big size by the small size.", "Ratio = original ÷ compressed. Both sizes are in the same unit.", "Example: 90 MB squeezed to 30 MB is 90 / 30 = 3. Now do yours."]]; },
      () => { const r = pick([2, 4, 5, 10]); return [`A file shrinks from ${c * r} MB to ${c} MB. What percent of the space was saved?`, 100 - 100 / r, null,
        ["Find how much space disappeared, then compare it with the original.", "Saved = original − compressed. Percent saved = saved ÷ original × 100.", "Example: 80 MB squeezed to 60 MB saves 20 MB, and 20 / 80 = 25 percent. Now do yours."]]; }
    ])();
  }, [["Compression", "🗜️", "<b>Compression</b> makes files smaller so they store and send faster."], ["Ratio", "➗", "Compression ratio = original size ÷ compressed size."], ["Lossy or lossless", "🎞️", "Lossless keeps every detail (ZIP). Lossy throws some away (JPEG, MP3)."]]);
  const B16 = mc("Pick the right tool", "🧰", [
    "Which tool is best for writing a report with headings?|word processor|spreadsheet|slide software|database",
    "Which is best for calculating totals and making charts from numbers?|spreadsheet|word processor|photo editor|chat app",
    "Which is best for a talk with a few key points on screen?|presentation software|spreadsheet|database|text editor",
    "Which is best for storing thousands of related customer records you can query?|database|word processor|slide software|calendar",
    "Which is best for drafting a quick plain-text note or a code snippet?|text editor|presentation software|photo editor|spreadsheet",
    "Which is best when several people must edit one document at once?|a shared online document|a printed page|a locked PDF|a screenshot",
    "Which is best for turning a finished document into a fixed-layout file to send?|PDF export|raw database|CSV file|photo editor",
    "Which is best for tracking tasks with owners and due dates?|a task or project board|a photo editor|a font|a spell checker"],
    ["Ask what the main material is: words, numbers, slides, records, or tasks.", "Pick the tool made for that kind of material instead of forcing another tool to do it.", "Example: for drawing a family tree you would reach for a diagram tool, not a spreadsheet. Now do yours."],
    [["Right tool", "🧰", "Each app is built for one kind of work."], ["Common set", "🗂️", "Word processor = text. Spreadsheet = numbers. Slides = talks. Database = records."], ["Share", "🤝", "For teamwork, choose tools that let many people edit together."]]);
  const B17 = num("Size of a table", "📦", () => {
    const b = pick([100, 200, 250, 500]);
    return pick([
      () => { const r = ri(1, 9) * 1000; return [`A table has ${r} rows. Each row uses about ${b} bytes. About how many kilobytes is that? (1 KB = 1000 bytes)`, r * b / 1000, null,
        ["First find the total bytes, then change bytes into kilobytes.", "Total bytes = rows × bytes per row. Divide by 1000 to get kilobytes.", "Example: 4000 rows of 300 bytes is 1,200,000 bytes, which is 1200 KB. Now do yours."]]; },
      () => { const mb = ri(1, 4); return [`About how many rows of ${b} bytes each fit in ${mb} MB? (1 MB = 1,000,000 bytes)`, mb * 1000000 / b, null,
        ["Change the megabytes to bytes first.", "Rows = total bytes ÷ bytes per row.", "Example: 3,000,000 bytes divided into rows of 300 bytes gives 10,000 rows. Now do yours."]]; }
    ])();
  }, [["Size matters", "📦", "Databases grow fast. Estimating size helps you plan storage."], ["Estimate", "🧮", "Size ≈ number of rows × bytes per row."], ["Units", "📏", "1 KB = 1000 bytes and 1 MB = 1000 KB."]]);
  const B18 = mc("Boolean search", "🔍", [
    "A search for cats AND dogs finds pages with ...|both words|either word only|neither word|only cats",
    "A search for cats OR dogs finds pages with ...|at least one of the words|both words only|neither word|a different word",
    "A search for cats NOT kittens finds pages about cats ...|without the word kittens|with the word kittens|only about kittens|about neither",
    "Quotation marks around \"solar energy\" search for ...|that exact phrase|either word|neither word|a misspelling",
    "Which operator usually narrows your results the most?|AND|OR|a synonym|a wildcard",
    "Which operator widens results by adding synonyms?|OR|AND|NOT|quotation marks",
    "A wildcard like comput* matches ...|computer, computing and computation|only comput|only computer|nothing",
    "Too many unrelated results. A good next step is ...|add more specific keywords|remove all keywords|search for the letter a|give up"],
    ["Think about which pages stay in the results after you add the operator.", "AND, OR and NOT each tell the search tool how to combine words. Quotes keep words together.", "Example: reading tea NOT milk as pages about tea with the milk ones removed shows how an operator filters. Now read yours."],
    [["Operators", "🔍", "<b>AND</b>, <b>OR</b> and <b>NOT</b> combine search words."], ["Phrases", "💬", "Quotation marks search for the exact phrase."], ["Wildcard", "✳️", "A star stands for any ending."]]);

  const L26 = [B1, B2, B3, B6, B16, B10, B12, B7, B4, B15, B17, B5, B11, B8, B9, B13, B14, B18,
    MIX("Mixed practice", B1, B3, B4, B5, B6, B7, B10, B11, B15, B17),
    MIX("Level 26 Challenge", B2, B8, B9, B12, B13, B14, B16, B18, B4, B11)];

  // =============== LEVEL 27 ===============
  const C1 = ty("Type a reference entry", "Type this reference entry.",
    ["Smith, J. (2023). Learning online. Campus Press.", "Lee, A. (2021). Data and society. Harbor Books.", "Garcia, M. (2022). Safe networks. Tech Press.", "Brown, T. (2020). Thinking in code. River Press.", "Khan, S. (2024). The cloud explained. Summit Books.", "Novak, P. (2019). Human computers. Oak Publishing.", "Chen, L. (2023). Fair algorithms. Lakeside Press.", "Ortiz, R. (2022). Study skills today. Bridge Books."],
    ["A reference entry lists the author, year, title and publisher in a fixed order.", "It has {w} words and begins with \"{f}\". Note the commas, the brackets around the year, and the periods.", "Example: for <b>Hall, B. (2020). Maps of the web. Pine Press.</b> type the author, the year in brackets, the title, then the publisher. Now type yours."],
    [["References", "📚", "A reference entry tells readers exactly where your information came from."], ["Order", "🔢", "Author, year, title, publisher. Styles differ a little, so follow the one your class uses."], ["Details", "🔍", "Commas, brackets and periods are part of the style."]]);
  const C2 = ty("Type pseudocode", "Type this pseudocode line.",
    ["FOR i FROM 1 TO 10", "IF score > 50 THEN", "WHILE NOT done DO", "SET total TO total + price", "PRINT name", "RETURN count", "END IF", "ELSE IF age >= 18 THEN"],
    ["Pseudocode is plain, readable steps, but the spelling still must match.", "It has {w} words and begins with \"{f}\". Capital letters mark the keywords.", "Example: for <b>WHILE n < 5 DO</b> type each word, the symbol and the number. Now type yours."],
    [["Pseudocode", "📝", "<b>Pseudocode</b> describes an algorithm in simple steps that any programmer can follow."], ["Keywords", "🔑", "IF, WHILE, FOR and RETURN are written in capitals."], ["Why", "🧭", "Planning in pseudocode helps you before you write real code."]]);
  const C3 = ty("Type a Linux command", "Type this command exactly.",
    ["ls -l", "grep error log.txt", "chmod 755 run.sh", "cat notes.txt", "cd ..", "rm -i old.txt", "mkdir -p a/b", "cp data.csv backup.csv"],
    ["Linux commands are lowercase and exact. Spaces separate the parts.", "It has {w} parts and begins with \"{f}\". The dash key is next to the zero.", "Example: for <b>mv a.txt b.txt</b> type the command, a space, and each file name. Now type yours."],
    [["Terminal", "🐧", "The Linux <b>terminal</b> runs typed commands."], ["Parts", "🧩", "A command, then options like <b>-l</b>, then names."], ["Careful", "⚠️", "Commands like <b>rm</b> delete files for good. Check before you press Enter."]]);
  const C4 = num("Binary search steps", "🔢", () => pick([
    () => { const k = ri(4, 10), n = 2 ** k - 1; return [`A sorted list has ${n} items. Binary search checks the middle and throws away half each time. At most how many comparisons find any item?`, k, null,
      ["Each check cuts the list roughly in half.", "Count how many times you can halve the list until nothing is left. That count is the number of checks.", "Example: a list of 3 items needs at most 2 checks, because the middle one goes first and then one more. Now do yours."]]; },
    () => { const k = ri(3, 10), n = 2 ** k; return [`You halve a group of ${n} items again and again until only 1 remains. How many halvings is that?`, k, null,
      ["Ask how many times 2 multiplies to reach the number.", "Count the powers of 2 that make up the group size.", "Example: 8 items become 4, then 2, then 1, which is 3 halvings. Now do yours."]]; }
  ])(), [["Binary search", "🔢", "On a <b>sorted</b> list, check the middle, then keep the half that could hold your item."], ["Fast", "🚀", "1000 items need only about 10 checks."], ["Rule", "📐", "n items need about log<sub>2</sub>(n) checks."]]);
  const fact = n => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
  const C5 = num("Recursion", "🔁", () => pick([
    () => { const n = ri(3, 7); return [`What is ${n}! (${n} factorial)? It means ${n} × ${n - 1} × ... × 1.`, fact(n), null,
      ["Multiply the whole numbers from the starting number down to 1.", "Each step multiplies the result so far by the next smaller number.", "Example: 4! = 4 × 3 × 2 × 1 = 24. Now do yours."]]; },
    () => { const n = ri(3, 12); return [`A function is defined: f(0) = 0, and f(n) = n + f(n − 1). What is f(${n})?`, n * (n + 1) / 2, null,
      ["The function calls itself with a smaller number until it reaches 0.", "Add every number from the starting number down to 1.", "Example: f(2) = 2 + f(1) = 2 + 1 + f(0) = 3. Now do yours."]]; },
    () => { const n = ri(3, 6); return [`What does f(${n}) return?`, fact(n), code(["def f(n):", "  if n <= 1:", "    return 1", "  return n * f(n - 1)"]),
      ["The function calls itself with a smaller number until n is 1 or less.", "It multiplies n by the result for n − 1, all the way down.", "Example: f(2) = 2 × f(1) = 2 × 1 = 2. Now do yours."]]; }
  ])(), [["Recursion", "🔁", "A <b>recursive</b> function calls itself on a smaller problem."], ["Base case", "🛑", "It needs a stopping point, or it never ends."], ["Trace", "🧵", "Follow the calls down to the base case, then multiply or add back up."]]);
  const C6 = num("Zero-based indexing", "0️⃣", () => {
    const arr = shuf(Array.from({ length: 80 }, (_, i) => i + 10)).slice(0, 6), i = ri(0, 5);
    const lst = `A = [${arr.join(", ")}]`;
    return pick([
      [`In Python, what is A[${i}]?`, arr[i], code([lst]), ["Counting starts at 0, not 1.", "Index 0 is the first item, index 1 the second, and so on.", "Example: for B = [5, 8, 2], B[1] is 8, because B[0] is 5. Now do yours."]],
      [`In Python, which index holds the value ${arr[i]}?`, i, code([lst]), ["Count the positions, but start counting at 0.", "The first item sits at index 0, the next at index 1, and so on.", "Example: in B = [5, 8, 2], the value 2 sits at index 2, because 5 is at index 0 and 8 at index 1. Now do yours."]],
      [`A has ${arr.length} items. What is the index of its last item?`, arr.length - 1, code([lst]), ["The first index is 0, so the last one is a little lower than the count.", "The last index is one less than the number of items.", "Example: a list of 4 items has indexes 0, 1, 2 and 3. Now do yours."]]
    ]);
  }, [["Zero-based", "0️⃣", "Most languages start counting list positions at <b>0</b>."], ["Example", "📋", "In [10, 20, 30], index 0 is 10 and index 2 is 30."], ["Last", "🔚", "A list with n items ends at index n − 1."]]);
  const C7 = mc("Data types", "🔤", [
    "What type is the value 42?|integer|string|boolean|float",
    "What type is the value 3.14?|float|integer|string|boolean",
    "What type is the value \"hello\" (in quotes)?|string|integer|float|boolean",
    "What type is the value true?|boolean|string|integer|float",
    "In Python or JavaScript, what is the result of joining the strings \"5\" and \"5\" with +?|the text 55|the number 10|the text 10|the number 55",
    "Which type stores only true or false?|boolean|integer|string|float",
    "Which type fits a price like 19.99?|float or decimal|boolean|integer only|string only",
    "What do you get when you add the integer 2 and the float 0.5?|the float 2.5|the text 2.5|the integer 2|a boolean"],
    ["Look at whether the value has quotes, a decimal point, or is only a yes or no.", "Each value has a type that decides what you can do with it.", "Example: 7 is an integer, 7.5 is a float, \"7\" is a string, and false is a boolean. Now do yours."],
    [["Types", "🔤", "Every value has a <b>type</b>: integer, float, string or boolean."], ["Quotes", "💬", "\"5\" in quotes is text, but 5 is a number."], ["Mixing", "🧪", "Adding text to text joins them. Adding numbers adds them."]]);
  const C8 = mc("Relational or NoSQL", "🗃️", [
    "Which kind of database stores data in tables with rows and columns?|relational database|document database|key-value store|plain text note",
    "Which language queries relational databases?|SQL|HTML|CSS|JPEG",
    "A document database often stores data as ...|JSON-like documents|only tables|only images|sound waves",
    "A key-value store works like ...|a dictionary of keys and values|a spreadsheet with formulas|a photo album|a calendar",
    "When is NoSQL a good fit?|each record can have different fields|every record is identical|no data exists|data is never read",
    "Which suits bank transfers that need exact consistency?|a relational database with transactions|an unchecked spreadsheet|a text file in email|a chat log",
    "What does a primary key do?|uniquely identifies each row|opens the database|encrypts data|sorts colors",
    "What does NoSQL mean?|not only SQL|never SQL|no SQL servers|new open source license"],
    ["Ask whether the data has one fixed shape or a changing shape.", "Tables suit data with a fixed shape and strong rules. Other models trade some rules for flexibility.", "Example: a school gradebook has the same columns for every student, so a table fits well. Now do yours."],
    [["Relational", "📋", "<b>Relational</b> databases store tables linked by keys and use SQL."], ["NoSQL", "🧩", "<b>NoSQL</b> databases use other shapes: documents, key-value pairs, graphs."], ["Choose", "⚖️", "Pick by the data's shape and how strict the rules must be."]]);
  const C9 = mc("TCP and UDP", "📡", [
    "Which protocol checks that data arrives in order and resends lost parts?|TCP|UDP|BMP|PNG",
    "Which transport is faster but may drop packets?|UDP|TCP|HTTPS|SMTP",
    "A live video call usually prefers which transport protocol?|UDP|TCP|FTP|SMTP",
    "Loading a web page needs every byte correct. Which transport protocol does it usually use?|TCP|UDP|neither|Bluetooth",
    "What is a packet?|a small chunk of data sent over a network|a lunch|a cable|a screen",
    "What does the TCP three-way handshake do?|sets up a connection before data is sent|encrypts data|deletes packets|prints a page",
    "Does UDP set up a connection first?|no|yes|always|only for web pages",
    "What does IP do?|addresses and routes packets|draws pages|stores passwords|compresses video"],
    ["Ask whether it is more important to be complete or to be quick.", "One protocol double-checks everything. The other just sends and hopes.", "Example: registered mail asks for a signature, while a flyer through the door is just dropped off. Now think about yours."],
    [["Packets", "📦", "Data travels the Internet in small <b>packets</b>."], ["TCP", "🤝", "<b>TCP</b> is reliable: it orders packets and resends lost ones."], ["UDP", "⚡", "<b>UDP</b> is quick and light, good for live calls and games."]]);
  const C10 = mc("Network devices", "📶", [
    "Which device forwards packets between different networks?|router|switch|printer|webcam",
    "Which device connects devices inside one local network?|switch|modem|monitor|speaker",
    "Which device converts your ISP's signal for your home network?|modem|printer|keyboard|SSD",
    "Which device lets wireless devices join a wired network?|wireless access point|printer|hard drive|webcam",
    "A home router often includes a built-in ...|firewall and Wi-Fi|monitor|keyboard|SSD",
    "What does a MAC address identify?|a network card|a website|a person's name|a file",
    "What does DHCP do?|hands out IP addresses automatically|encrypts mail|speeds up fans|prints pages",
    "What is a LAN?|a network in a small area like a home or school|the whole Internet|a type of cable only|a phone plan"],
    ["Ask what the device connects: devices to each other, or one network to another.", "Switches work inside a network. Routers link networks. A modem talks to the provider.", "Example: a street's local road is like a switch, while the highway ramp to another town is like a router. Now do yours."],
    [["Local", "🏠", "A <b>switch</b> connects devices within one network."], ["Between", "🌉", "A <b>router</b> passes packets between networks."], ["Addresses", "🏷️", "MAC addresses label network cards. IP addresses label devices on a network."]]);
  const C11 = mc("Port numbers", "🚪", [
    "Which port does normal HTTP web traffic use?|80|443|22|25",
    "Which port does HTTPS use?|443|80|22|53",
    "Which port does SSH (secure remote login) use?|22|80|443|110",
    "Which port does DNS use?|53|22|443|25",
    "Which port does classic SMTP use for sending email?|25|53|80|443",
    "What is a port number for?|choosing which service on a computer gets the data|naming a person|counting RAM|picking a screen size",
    "How many port numbers exist, since a port is a 16-bit number?|65536|256|1024|100",
    "Why close ports you do not use?|fewer open doors for attackers|they cost money|they stop Wi-Fi|they use RAM"],
    ["Think of the IP address as a building and the port as a door.", "Well-known services have standard port numbers. Memorize the common ones.", "Example: the FTP file service uses port 21, so a request for file transfers goes to that door. Now do yours."],
    [["Doors", "🚪", "An IP address finds the computer. A <b>port</b> finds the service on it."], ["Well-known", "📒", "Web, secure web, email, DNS and SSH each have a standard number."], ["Closed", "🔒", "Closing unused ports shrinks the attack surface."]]);
  const C12 = num("Network address", "🏷️", () => {
    let x, p, blk, ans;
    do { p = ri(25, 28); blk = 2 ** (32 - p); x = ri(1, 254); ans = Math.floor(x / blk) * blk; } while (ans === 0 || ans === blk);
    return [`A computer has the IP address 192.168.1.${x}/${p}. What is the last number of its network address?`, ans, null,
      ["The network starts at the nearest block boundary below your address.", `The last octet is split into equal blocks. The size of each block comes from the host bits left over after the prefix. Find the block start at or below ${x}.`, "Example: 10.0.0.45/27 uses blocks of 32, so 45 falls between 32 and 64 and the network address ends in 32. Now do yours."]];
  }, [["Subnet", "🏷️", "Every address belongs to a <b>subnet</b>. Its first address is the network address."], ["Blocks", "🧱", "Block size = 2<sup>(32 − prefix)</sup>. A /26 makes blocks of 64: 0, 64, 128, 192."], ["Find it", "🔍", "Round the host number down to the nearest block start."]]);
  const C13 = mc("The CIA triad", "🔺", [
    "Confidentiality means ...|only the right people can see the data|systems are always available|data never changes|data is big",
    "Integrity means ...|data is accurate and not changed without permission|data is secret|data is fast|data is old",
    "Availability means ...|systems and data can be used when needed|data is encrypted|data is deleted|data is public",
    "Encrypting files mainly protects which part?|confidentiality|availability|bandwidth|resolution",
    "A hash check that finds a file was altered protects ...|integrity|confidentiality|availability|color",
    "A DDoS attack mostly harms ...|availability|secrecy only|integrity only|nothing",
    "Backups and spare servers mainly support ...|availability|encryption|style|speed tests",
    "What does CIA stand for in the CIA triad?|confidentiality, integrity, availability|code, internet, apps|cable, input, audio|cloud, index, archive"],
    ["Ask what could go wrong: someone sees it, someone changes it, or no one can use it.", "Each of the three goals guards against one kind of problem.", "Example: a locked diary protects secrecy, a seal that shows tampering protects accuracy, and an open library protects access. Now do yours."],
    [["Three goals", "🔺", "Security aims to protect <b>confidentiality</b>, <b>integrity</b> and <b>availability</b>."], ["Match", "🧩", "Secret = confidentiality. Correct = integrity. Usable = availability."], ["Trade-offs", "⚖️", "Strong locks can make data harder to reach, so balance matters."]]);
  const C14 = mc("Injection attacks and patches", "💉", [
    "SQL injection happens when ...|user input is run as part of a database command|a screen cracks|a cable is cut|a password is long",
    "How do parameterized queries help?|they keep input as data, not code|they make passwords longer|they speed up Wi-Fi|they delete data",
    "Cross-site scripting (XSS) lets an attacker ...|run a script in other users' browsers|print pages|cut cables|reset routers",
    "Which input handling stops many attacks?|validate and sanitize input|trust all input|hide the form|use bigger fonts",
    "What is a zero-day vulnerability?|a flaw with no fix released yet|a flaw fixed yesterday|a harmless bug|a game level",
    "What do patches do?|fix known flaws|add ads|remove firewalls|slow computers",
    "A form asks for a name, but someone types database commands into it. What is this?|an injection attempt|a normal name|a spell check|a file path",
    "Why do developers keep libraries updated?|old versions may have known flaws|new versions are free|old ones are bigger|updates delete code"],
    ["Ask whether the problem is untrusted input or an old, unfixed flaw.", "Programs should treat everything a user types as plain data, never as instructions.", "Example: a form that prints a visitor's name straight into the page can be tricked if the name contains page code. Now do yours."],
    [["Injection", "💉", "Attackers type commands where a program expects plain text."], ["Defense", "🛡️", "Validate input and use safe, parameterized queries."], ["Patch", "🩹", "Updates close flaws that attackers already know."]]);
  const C15 = mc("Risk words", "⚠️", [
    "A weakness that could be exploited is a ...|vulnerability|threat|asset|patch",
    "Something that could cause harm, such as an attacker, is a ...|threat|vulnerability|asset|backup",
    "Something valuable you protect, like customer data, is an ...|asset|exploit|threat|firewall",
    "Risk is usually thought of as likelihood times what?|impact|color|speed|age",
    "A risk is very likely and would cause huge damage. Its priority is ...|high|low|none|ignored",
    "Buying insurance against a loss is risk ...|transfer|elimination|ignoring|creation",
    "Choosing not to use a risky feature at all is risk ...|avoidance|acceptance|transfer|growth",
    "Adding locks and monitoring to lower the chance of harm is risk ...|mitigation|acceptance|transfer|avoidance"],
    ["Ask whether the word names something valuable, something dangerous, a weak spot, or a way of dealing with it.", "Risk combines how likely harm is with how bad it would be.", "Example: an unlocked shed is a weak spot, a thief is the danger, and the tools inside are what you protect. Now do yours."],
    [["Vocabulary", "📖", "<b>Asset</b> = what you protect. <b>Threat</b> = what could hurt it. <b>Vulnerability</b> = a weak spot."], ["Risk", "🎲", "Risk = likelihood × impact."], ["Responses", "🧭", "Avoid it, reduce it, transfer it, or accept it."]]);
  const C16 = mc("E-waste and green computing", "♻️", [
    "What is e-waste?|discarded electronic devices|extra email|fast Wi-Fi|a game level",
    "Which is best for an old but working laptop?|donate or reuse it|throw it in a river|bury it|burn it",
    "Why should e-waste be recycled properly?|it holds both useful and harmful materials|it is made of paper|it is lighter|it is free",
    "Which helps reduce e-waste?|repairing devices instead of replacing them|replacing them yearly|dropping them|buying duplicates",
    "Before recycling a phone, what should you do?|back up and erase your personal data|post the passcode|stay logged in to accounts|nothing",
    "Data centers use a lot of ...|electricity for computing and cooling|only paper|only snow|nothing",
    "Which choice lowers a PC's energy use?|sleep mode when idle|leaving it at full power|opening more tabs|always full brightness",
    "Software that runs well on older hardware helps by ...|keeping devices useful longer|making them explode|raising e-waste|forcing upgrades"],
    ["Ask which choice is kinder to the planet and to your own data.", "Reuse, repair and responsible recycling cut waste. Saving energy cuts pollution too.", "Example: fixing a cracked screen keeps a phone out of the trash for years. Now do yours."],
    [["E-waste", "♻️", "Old electronics contain metals and chemicals that need careful handling."], ["Reduce", "🔧", "Repair, reuse, donate, then recycle."], ["Data first", "🧹", "Always erase personal data before a device leaves your hands."]]);
  const C17 = num("Critical path", "🗓️", () => pick([
    () => { const a = ri(2, 9), b = ri(2, 9), c = ri(1, 6); return [`A project has Task A (${a} days) and Task B (${b} days) that run at the same time. Task C (${c} days) starts only when both are done. How many days does the whole project take?`, Math.max(a, b) + c, null,
      ["Tasks that run at the same time do not add up. Think about which one finishes last.", "The longer of the two parallel tasks decides when Task C can start. Then add Task C.", "Example: parallel tasks of 3 and 5 days, then a 2-day task: 5 + 2 = 7 days. Now do yours."]]; },
    () => { const a = ri(1, 5), b = ri(1, 5), c = ri(1, 5), d = ri(1, 5);
      return [`Path 1 has two tasks in a row: ${a} days then ${b} days. Path 2 has two tasks in a row: ${c} days then ${d} days. The paths run at the same time. How many days until both are finished?`, Math.max(a + b, c + d), null,
        ["First find the length of each path on its own.", "Add the tasks along each path, then take the longer path.", "Example: path 1 is 2 + 4 = 6 days, path 2 is 3 + 5 = 8 days, so the project takes 8 days. Now do yours."]]; }
  ])(), [["Dependencies", "🔗", "Some tasks must wait for others to finish."], ["Critical path", "🛤️", "The longest chain of dependent tasks decides the project length."], ["Parallel", "⏩", "Tasks that run side by side take as long as the slowest one."]]);
  const PH = ["plan", "analyze", "design", "build", "test", "deploy", "maintain"];
  const C18 = mk("Software life cycle", () => {
    const i = ri(0, PH.length - 2), after = Math.random() < 0.5;
    const ans = after ? PH[i + 1] : PH[i], ref = after ? PH[i] : PH[i + 1];
    return {
      text: after ? `In the software development life cycle (plan, analyze, design, build, test, deploy, maintain), which phase comes right after "${ref}"?` : `In the software development life cycle (plan, analyze, design, build, test, deploy, maintain), which phase comes right before "${ref}"?`,
      visual: "🔄", choices: shuf([ans, ...shuf(PH.filter(x => x !== ans && x !== ref)).slice(0, 3)]), answer: ans,
      hints: ["Think of building a house: decide what is needed, draw plans, build, check, move in, then look after it.", "The phases run in a sensible order, and each one needs the one before it to be finished.", "Example: in baking, you mix before you bake, so mixing comes right before baking. Now find yours."]
    };
  }, [["Life cycle", "🔄", "Software is made in phases, from the first idea to years of upkeep."], ["Order", "📋", "Planning and analysis come first, then design, building, testing, release and maintenance."], ["Loops", "♾️", "Teams repeat the cycle: feedback leads to new plans."]]);

  const L27 = [C1, C2, C3, C6, C7, C4, C5, C17, C10, C9, C11, C12, C8, C13, C14, C15, C16, C18,
    MIX("Mixed practice", C1, C2, C4, C5, C6, C7, C9, C10, C11, C17),
    MIX("Level 27 Challenge", C3, C8, C12, C13, C14, C15, C16, C18, C4, C5)];

  Object.assign(TYPING_LEVELS, { 25: L25, 26: L26, 27: L27 });
})();
