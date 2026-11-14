// ext/typing-28-30.js  Mind Lab Typing & Computers, levels 28-30 (60 lessons)
(() => {
  const sl = a => () => a.map(([h, v, t]) => ({ h, v, t }));
  const big = (t, s = 2) => `<span style="font-size:${s}em;font-weight:bold">${t}</span>`;
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
  const num = (title, vis, fn, slides) => {
    const make = () => { const [text, answer, v, hs] = fn(); return { text, visual: v || vis, answer, hints: hs }; };
    make.teach = sl(slides);
    return { title, make };
  };
  const mk = (title, fn, slides) => { const make = fn; make.teach = sl(slides); return { title, make }; };
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes ideas you already know. Here is a quick reminder of each one, then the quiz." }].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };

  // =============== LEVEL 28 ===============
  const A1 = ty("Type a pandas line", "Type this data-analysis line exactly.",
    [`df = pd.read_csv("sales.csv")`, "df.head(10)", `df["price"].mean()`, "df.dropna(inplace=True)", `df.groupby("city")["sales"].sum()`, `df[df["age"] > 18]`, `df.sort_values("score", ascending=False)`, "import pandas as pd"],
    ["Code lines need every bracket, quote and dot in the right place.", "It has {n} characters and begins with \"{f}\". Square brackets and quotation marks come in pairs.", "Example: for <b>df.tail(5)</b> type the name, a dot, the method, and the brackets with the number inside. Now type yours."],
    [["Data code", "🐼", "Analysts type short lines of code to load, clean and summarize data."], ["Pairs", "⌨️", "Brackets and quotes always come in pairs. Close each one."], ["Check", "🔍", "One missing quote makes the whole line fail."]]);
  const A2 = ty("Type a shell pipeline", "Type this command exactly.",
    ["cat log.txt | grep error | wc -l", "sort names.txt | uniq", "ls -l > files.txt", "echo done >> log.txt", "head -n 5 data.csv", "grep -c fail auth.log", "python clean.py data.csv", "cut -d, -f2 data.csv"],
    ["Shell commands are exact. Spaces separate the parts.", "It has {w} parts and begins with \"{f}\". The pipe key is Shift with the backslash key.", "Example: for <b>sort a.txt | head -n 3</b> type each command with a space, the pipe, then the next command. Now type yours."],
    [["Shell", "💻", "The <b>shell</b> runs typed commands, and you can chain them together."], ["Pipe", "🚰", "The pipe symbol sends one command's output into the next command."], ["Careful", "🎯", "Dashes and dots matter: <b>-n</b> and <b>-l</b> are options."]]);
  const A3 = ty("Type a results sentence", "Type this sentence from an analysis report.",
    ["The mean score was 72.4 (SD = 8.1).", "Sales rose 12.5 percent between 2022 and 2023.", "The correlation was strong (r = 0.82).", "Of 300 respondents, 65 percent preferred the new design.", "The median wait time was 14 minutes.", "No significant difference was found (p = 0.31).", "Column C contains 1,204 missing values.", "The model reached an accuracy of 91.5 percent."],
    ["Report sentences are full of exact numbers. Slow down on them.", "It has {w} words and begins with \"{f}\". Check each decimal point and bracket.", "Example: for <b>The median age was 31 (n = 80).</b> type the words, the number, the bracket, and the final period. Now type yours."],
    [["Report", "📑", "A good report states the result with the exact numbers."], ["Symbols", "🔣", "Letters like <b>r</b>, <b>p</b> and <b>n</b> have set meanings in statistics."], ["Proofread", "🔍", "A wrong digit changes the finding."]]);
  const A6 = mc("Scales of data", "📏", [
    "Eye color is which kind of data?|nominal|ordinal|interval|ratio",
    "Race finishing places (1st, 2nd, 3rd) are ...|ordinal|nominal|ratio|interval",
    "Temperature in Celsius is ...|interval|ratio|nominal|ordinal",
    "Height in centimeters is ...|ratio|nominal|ordinal|interval",
    "Which scale has a true zero, so 'twice as much' makes sense?|ratio|interval|ordinal|nominal",
    "A survey offers agree, neutral, disagree. This scale is ...|ordinal|nominal|ratio|interval",
    "Phone brand is ...|nominal|ordinal|interval|ratio",
    "Which scale only names categories, with no order?|nominal|ordinal|interval|ratio",
    "The number of siblings a person has is ...|ratio|nominal|ordinal|interval"],
    ["Ask whether the values are only names, can be put in order, have equal gaps, or have a true zero.", "The four scales build up in power: names, then order, then equal gaps, then a true zero.", "Example: shirt sizes small, medium and large can be ranked but the gaps are not equal, so that scale has order only. Now do yours."],
    [["Four scales", "📏", "Data comes in four scales: <b>nominal</b>, <b>ordinal</b>, <b>interval</b> and <b>ratio</b>."], ["Climb", "🪜", "Each scale adds a power: names, then order, then equal gaps, then a true zero."], ["Why", "🎯", "The scale decides which math makes sense, such as whether an average is meaningful."]]);
  const A4 = num("Z-scores", "📏", () => {
    const m = ri(50, 80), sd = pick([2, 4, 5, 10]), k = ri(1, 5);
    if (pick([0, 1])) return [`A test has a mean of ${m} and a standard deviation of ${sd}. A score of ${m + k * sd} is how many standard deviations above the mean?`, k, null,
      ["A z-score counts how many steps of one standard deviation a value sits above the mean.", "Subtract the mean from the score, then divide by the standard deviation.", "Example: mean 40, SD 5, score 70: (70 − 40) / 5 = 6. Now do yours."]];
    return [`A test has a mean of ${m} and a standard deviation of ${sd}. A student scores ${k} standard deviations above the mean. What is the score?`, m + k * sd, null,
      ["Each standard deviation is one step above the mean. Count how far up the student climbed.", "Multiply the number of steps by the size of one step, then add the mean.", "Example: mean 30, SD 2, 7 steps above: 30 + 7 × 2 = 44. Now do yours."]];
  }, [["Z-score", "📏", "A <b>z-score</b> tells how many standard deviations a value is from the mean."], ["Formula", "🧮", "z = (value − mean) ÷ standard deviation."], ["Meaning", "🔔", "A z-score near 0 is typical. A large one is unusual."]]);
  const A5 = num("Percent change", "📈", () => {
    let old, p, nw;
    do { old = pick([20, 40, 50, 80, 100, 200, 250, 400]); p = pick([10, 20, 25, 50, 100]); nw = old * (100 + p) / 100; } while (!Number.isInteger(nw));
    return pick([
      () => [`A website had ${old} visitors last week and ${nw} this week. By what percent did the visits increase?`, p, null,
        ["Find the change first, then compare it with where you started.", "Percent change = change ÷ the old value × 100.", "Example: from 40 to 52 is a change of 12, and 12 / 40 = 0.3, which is 30 percent. Now do yours."]],
      () => [`A game costs ${old} coins. The price rises by ${p} percent. What is the new price in coins?`, nw, null,
        ["Find the amount of the rise first, then add it to the old price.", "Rise = old price × percent ÷ 100. New price = old price + rise.", "Example: a 60-coin item rising 30 percent rises by 18, so it costs 78 coins. Now do yours."]],
      () => { const q = pick([10, 20, 25, 50]), o = pick([40, 80, 100, 200]), n2 = o * (100 - q) / 100; return [`A score falls from ${o} to ${n2}. By what percent did it decrease?`, q, null,
        ["Find how much it fell, then compare that drop with the starting value.", "Percent decrease = drop ÷ the old value × 100.", "Example: from 90 to 63 is a drop of 27, and 27 / 90 = 0.3, which is 30 percent. Now do yours."]]; }
    ])();
  }, [["Change", "📈", "Percent change compares the change with the <b>starting</b> value."], ["Formula", "🧮", "(new − old) ÷ old × 100."], ["Careful", "⚠️", "A rise of 50 percent followed by a fall of 50 percent does not return you to the start."]]);
  const A7 = mc("Working with a DataFrame", "🐼", [
    "In a pandas DataFrame, what does each row usually hold?|one record|a column name|the whole file|a chart",
    "What does df.head() show?|the first few rows|the last few rows|the column totals|a chart",
    "What does df.shape give?|the number of rows and columns|the colors|the file size|the average",
    "What does df.describe() give?|summary statistics for number columns|a chart|the file path|the first row",
    "What does df.dropna() do?|removes rows with missing values|adds missing values|sorts the data|saves the file",
    "What does df.groupby('city') prepare?|splitting rows by city to summarize each group|deleting the city column|sorting letters|sending email",
    "How do you select one column called price?|df['price']|df.drop('price')|df.sort('price')|df.head('price')",
    "What does df.info() tell you?|column names, types and counts of filled cells|only the first row|a picture|nothing",
    "What does df['age'].mean() give?|the average age|the oldest age|the number of rows|the column name"],
    ["Think about what the method name says in plain English.", "A DataFrame works like a spreadsheet in code: rows are records, columns are fields, and methods act on the whole table.", "Example: df.tail() shows the last few rows, in the same way that head shows the first few. Now do yours."],
    [["DataFrame", "🐼", "A <b>DataFrame</b> is a table in code, with rows and named columns."], ["Methods", "🧰", "Short calls like head, describe and groupby summarize the table."], ["Select", "🎯", "Square brackets pick a column, like <b>df['age']</b>."]]);
  const A8 = mk("Mean with missing values", () => {
    let vals, mu, k;
    for (;;) {
      k = ri(3, 6); mu = ri(5, 20); vals = []; let s = 0;
      for (let i = 0; i < k - 1; i++) { const v = ri(mu - 4, mu + 4); vals.push(v); s += v; }
      const last = k * mu - s;
      if (last >= 0 && last <= 40) { vals.push(last); break; }
    }
    const cells = shuf(vals.concat(Array(ri(1, 2)).fill("—")));
    return { text: "In this column, a dash means the value is missing. What is the mean of the values that are present?", visual: big(cells.join("&nbsp;&nbsp;&nbsp;"), 1.4), answer: mu,
      hints: ["Missing values must not count as zeros. Leave them out completely.", "Add up only the numbers that are really there, and divide by how many numbers there are, not by how many cells.", "Example: 30, a dash, 50 has two real numbers that add to 80, and 80 / 2 = 40. Now do yours."] };
  }, [["Missing", "❓", "A blank or dash means <b>missing</b>, not zero."], ["Mean", "🧮", "Add the values that exist and divide by how many exist."], ["Why", "⚠️", "Counting blanks as zero pulls the mean down and gives a false answer."]]);
  const A9 = mc("Reading a regular expression", "🔤", [
    "What does the pattern \\d+ match?|one or more digits|one letter|any space|the word d",
    "What does ^ mean at the start of a pattern?|the start of the text|the end of the text|any character|a space",
    "What does $ mean at the end of a pattern?|the end of the text|the start of the text|a dollar amount|a digit",
    "What does a single . match in a pattern?|any one character|only a dot|a space only|nothing",
    "What does [a-c] match?|one letter that is a, b or c|the text a-c|three letters|any digit",
    "What does * mean after a character?|zero or more of it|one or more of it|exactly one of it|none of it",
    "What does ? mean after a character?|it is optional|it repeats forever|it must appear twice|it is a digit",
    "Which pattern matches exactly five digits, like a postal code?|^\\d{5}$|\\d*|^\\w+$|[a-z]{5}",
    "What does \\s match?|a whitespace character|the letter s|a digit|a symbol"],
    ["Read the pattern one symbol at a time, from left to right.", "Special symbols stand for kinds of text, positions in the text, or how many times something repeats.", "Example: the pattern ab+ matches an a followed by one or more b letters. Now read yours."],
    [["Regex", "🔤", "A <b>regular expression</b> is a pattern that describes text to find."], ["Pieces", "🧩", "<b>\\d</b> = digit, <b>\\s</b> = space, <b>.</b> = any character, <b>[ ]</b> = a set."], ["Counts", "🔢", "<b>*</b> zero or more, <b>+</b> one or more, <b>?</b> optional, <b>{5}</b> exactly five."]]);
  const A13 = mc("Pipes and redirects", "🚰", [
    "What does the pipe symbol do in a shell?|sends one command's output into the next command|deletes a file|joins two files|ends the shell",
    "What does > file.txt do?|writes the output into the file, replacing it|adds to the end of the file|deletes the file|reads the file",
    "What does >> file.txt do?|adds the output to the end of the file|replaces the file|prints the file|renames it",
    "What does grep do?|finds lines that match a pattern|sorts numbers|copies files|ends programs",
    "What does wc -l count?|lines|letters|words|folders",
    "What does sort do?|puts lines in order|counts words|renames files|deletes duplicates",
    "What does cat file.txt do?|prints the file's contents|deletes it|edits it|zips it",
    "What does ls | wc -l tell you?|how many items are listed|the disk size|today's date|the user's name"],
    ["Think of data flowing from left to right through the line.", "Pipes pass output along to another command, and arrows send output to a file. The tool names say what they do.", "Example: sort a.txt | head -n 1 sorts the lines and then keeps only the first one. Now do yours."],
    [["Flow", "🚰", "A <b>pipe</b> connects commands: output of one becomes input of the next."], ["Redirect", "➡️", "<b>></b> writes to a file, replacing it. <b>>></b> adds to the end."], ["Build up", "🧱", "Small tools chained together can answer big questions about a file."]]);
  const A10 = mc("When to write a script", "🤖", [
    "A task is done once and takes two minutes. Should you automate it?|probably not, the script costs more time|yes, always|yes, with three scripts|never use computers",
    "A report is built the same way every Monday. What helps most?|a scheduled script|memorizing the steps|printing it|a bigger monitor",
    "Why is a script better than clicking for repeated work?|it does the same steps the same way every time|it is slower but nicer|it never needs testing|it avoids computers",
    "Before running a script that deletes files, you should ...|test it on a copy of the data|run it on the only copy|skip reading it|disable backups",
    "What makes a script easy to reuse later?|clear names and comments|one huge line|no comments|random variable names",
    "A script has a password typed into its code. What is the problem?|anyone who sees the code sees the password|nothing|it runs slower|it will not start",
    "Which task is best to automate?|a boring, repeated, rule-based task|a one-time decision needing judgment|a creative drawing|a private chat",
    "What should a script do when something unexpected happens?|report a clear error and stop safely|keep going and hope|delete everything|hide the error"],
    ["Ask how often the task repeats and how clear its steps are.", "Automation pays off when a clear job repeats many times, and it must be tested safely first.", "Example: renaming 500 photos by a fixed rule suits a script, while choosing the best photo does not. Now do yours."],
    [["Why script", "🤖", "A script does repeated steps quickly, the same way each time."], ["Worth it?", "⚖️", "Compare the time to write the script with the time it saves."], ["Safe", "🛡️", "Test on copies, keep secrets out of the code, and make errors loud."]]);
  const A11 = num("How many scheduled runs", "⏰", () => pick([
    () => { const m = pick([5, 10, 15, 20, 30]), h = ri(1, 6); return [`A script is scheduled to run every ${m} minutes. How many times does it run in ${h} hours?`, 60 * h / m, null,
      ["First turn the hours into minutes.", "Then see how many gaps between runs fit into that total time: divide.", "Example: a script that runs every 12 minutes for 5 hours has 300 minutes to fill, and 300 / 12 = 25 runs. Now do yours."]]; },
    () => { const w = ri(2, 9); return [`A backup script runs once every day. How many times does it run in ${w} weeks?`, 7 * w, null,
      ["Find how many days are in the time span.", "Days = weeks × days in a week. The script runs once on each day.", "Example: in 11 weeks there are 11 × 7 = 77 days, so 77 runs. Now do yours."]]; }
  ])(), [["Schedule", "⏰", "A scheduler runs a script at set times, such as every 15 minutes."], ["Count", "🔢", "Runs = total time ÷ time between runs."], ["Same units", "📏", "Change hours to minutes before dividing by minutes."]]);
  const A12 = mc("Reading a cron schedule", "🗓️", [
    "In cron, the line 0 9 * * * runs when?|every day at 9:00|every 9 minutes|at midnight on the 9th|once a year",
    "The line 30 14 * * * runs at ...|14:30 every day|14:00 every 30 days|every 14 minutes|3:30 in the morning",
    "The line */15 * * * * runs ...|every 15 minutes|at 15:00 daily|on the 15th of the month|every 15 hours",
    "The line 0 0 1 * * runs ...|at midnight on the first of each month|every minute|at 1:00 daily|only in January",
    "In the five fields of a cron line, the first field is the ...|minute|hour|month|year",
    "In cron, what does * in a field mean?|every possible value|zero|the star sign|skip it",
    "The line 0 8 * * 1 runs on ...|Mondays at 8:00|the first of the month at 8:00|every 8 hours|January 8",
    "Which line runs at 6:00 every day?|0 6 * * *|30 6 * * *|0 18 * * *|0 6 * * 1"],
    ["Cron lines have five fields in a fixed order.", "Read the fields left to right: they go from the smallest unit of time up to the weekday, and a star means every.", "Example: 15 3 * * * means the 15th minute of the third hour, so it runs at 3:15 every day. Now read yours."],
    [["Cron", "🗓️", "<b>Cron</b> is a scheduler on Linux. One line says when to run a command."], ["Fields", "🧩", "The five fields are minute, hour, day of month, month, day of week."], ["Star", "⭐", "A star means every value. <b>*/15</b> means every 15."]]);
  const A14 = num("Is automation worth it?", "⚖️", () => {
    const w = ri(1, 5), s = pick([5, 10, 12, 15, 20, 30]);
    return [`Writing a script takes ${w} hours. Each run saves ${s} minutes of manual work. After how many runs has the script saved as much time as it took to write?`, 60 * w / s, null,
      ["Put the writing time and the saved time in the same unit first.", "Change the hours into minutes, then see how many saved chunks add up to that.", "Example: a script that took 9 hours (540 minutes) and saves 20 minutes per run breaks even after 540 / 20 = 27 runs. Now do yours."]];
  }, [["Break-even", "⚖️", "The <b>break-even</b> point is when the time saved equals the time spent."], ["Formula", "🧮", "Runs = writing time ÷ time saved per run, in the same unit."], ["Beyond", "🎁", "After that point, every run is a gain. Scripts also reduce mistakes."]]);
  const A15 = mc("Reading JSON", "🧾", [
    `In {"name":"Ana","age":20}, what is the value of "age"?|20|"Ana"|"name"|2`,
    "Which symbols wrap a JSON object?|curly braces { }|square brackets [ ]|angle brackets < >|round brackets ( )",
    "Which symbols wrap a JSON array, which is a list?|square brackets [ ]|curly braces { }|quotation marks|slashes",
    `In {"pets":["cat","dog","fox"]}, how many items does pets hold?|3|2|1|4`,
    `In {"a":{"b":7}}, what is the value reached by a and then b?|7|a|b|{"b":7}`,
    "In JSON, keys must be written in what?|double quotes|single quotes|no quotes|angle brackets",
    "Which of these is NOT a JSON value type?|a function|a string|a number|a list, called an array",
    `In {"ok":true,"n":0}, what type is the value true?|boolean|string|number|array`,
    "Which symbol separates two pairs inside a JSON object?|a comma|a semicolon|a dot|a space"],
    ["Read the outer symbols first, then move inward one level at a time.", "JSON is made of keys and values, nested inside curly braces for objects and square brackets for lists.", "Example: in {\"t\":[5,6]}, the key t holds a list of two numbers. Now read yours."],
    [["JSON", "🧾", "<b>JSON</b> stores data as keys and values. Web services use it a lot."], ["Shapes", "🧩", "Objects use { }. Lists use [ ]. Keys use double quotes."], ["Nesting", "🪆", "Values can hold other objects or lists, so read level by level."]]);
  const A16 = mc("Metrics and KPIs", "🎯", [
    "What does KPI stand for?|key performance indicator|known process input|keyboard power index|key program interface",
    "A good KPI is ...|clearly defined and measurable|vague|impossible to change|secret",
    "Conversion rate is ...|the share of visitors who take the wanted action|the number of visits|the page size|the server speed",
    "Out of 2000 visitors, 100 bought something. What is the conversion rate?|5 percent|10 percent|2 percent|20 percent",
    "Churn rate measures ...|customers who stop using a service|new customers|server crashes|file sizes",
    "A shop wants more repeat buyers. Which metric tracks this?|repeat purchase rate|number of logo colors|page background|staff height",
    "A dashboard should ...|show the few numbers that matter most|show every number possible|hide the labels|use only decoration",
    "When a measure becomes a target, people may game it. This idea is ...|Goodhart's law|Moore's law|Ohm's law|Murphy's law",
    "Which is a vanity metric?|total page views that never connect to sales|sales per customer|customer return rate|cost per sale"],
    ["Think about what decision the number should help someone make.", "A good measure is clear, comparable over time, and tied to a goal.", "Example: a bakery that wants to sell more could track loaves sold each day, because the number links straight to the goal. Now do yours."],
    [["KPI", "🎯", "A <b>KPI</b> is one number that shows progress toward a goal."], ["Rates", "📈", "Rates like conversion and churn compare a count with a whole."], ["Honest", "⚖️", "A number can be gamed or can look good without meaning anything."]]);
  const A17 = mc("Reproducible analysis", "🔁", [
    "What does reproducible analysis mean?|someone else can repeat your steps and get the same results|the data are random|the chart is pretty|the file is large",
    "Why set a random seed?|so random steps give the same results every run|to make numbers bigger|to hide the code|to speed up the computer",
    "What is a computational notebook?|a document mixing code, results and notes|a paper diary|a type of laptop|a keyboard",
    "Why keep the raw data file unchanged?|you can redo the cleaning from the start|it uses less space|it is secret|it looks neat",
    "Where should cleaning steps be recorded?|in a script or notebook|in your memory|nowhere|on a sticky note",
    "Why record the versions of the tools and libraries you used?|new versions may give different results|it saves disk space|it is a law|it speeds up code",
    "Why comment your code?|so you and others can understand it later|to make it run faster|to hide errors|to shrink the file",
    "Why is hand-editing numbers in a spreadsheet cell risky?|the change leaves no record of what was done|spreadsheets cannot hold numbers|it is illegal|it is faster"],
    ["Ask whether another person could repeat the work from your notes alone.", "Write down the steps, keep the original data safe, and record the tools you used.", "Example: a recipe that lists every ingredient and step lets anyone cook the same dish. Analysis should be written the same way. Now do yours."],
    [["Repeatable", "🔁", "Good analysis can be run again, by you or anyone, with the same result."], ["Tools", "🧰", "Scripts and notebooks record the steps. Seeds fix random choices."], ["Original data", "🗄️", "Never overwrite the raw data. Save cleaned data as a new file."]]);
  const A18 = mc("Data file formats", "📂", [
    "Which format stores a table as plain text with commas between values?|CSV|JPEG|MP3|EXE",
    "Which format is common for data sent by web services?|JSON|BMP|WAV|PNG",
    "Which data format marks up data with named opening and closing tags?|XML|CSV|MP4|PDF",
    "What does a query language like SQL do?|asks questions of a database|draws pictures|plays sound|compresses video",
    "Which is best for a quick plain table to open in a spreadsheet?|CSV|a photo|a movie|a font",
    "Why is a PDF a poor format for data analysis?|the data is hard to extract|it cannot be opened|it has no text|it is always encrypted",
    "Which stores nested data, such as lists inside objects, most naturally?|JSON|CSV|BMP|WAV",
    "What is a delimiter in a CSV file?|the character that separates values|the file name|the last row|the title",
    "A CSV value contains a comma. How is it kept as one value?|put it in quotation marks|delete the comma|use a bigger font|add a new file"],
    ["Ask what shape the data has: a flat table, nested items, or tagged text.", "Different formats suit different jobs, and the best one is the one the next program can read easily.", "Example: a list of student names and scores is flat, so a plain table file fits it well. Now do yours."],
    [["Formats", "📂", "Data can be saved as <b>CSV</b>, <b>JSON</b>, <b>XML</b> or in a database."], ["Flat or nested", "🪆", "CSV is flat rows. JSON and XML can nest data inside data."], ["Choose", "🎯", "Pick the format that is easy to read, share and process."]]);
  const L28 = [A1, A2, A3, A6, A4, A5, A7, A8, A13, A10, A9, A11, A12, A14, A15, A16, A17, A18,
    MIX("Mixed practice", A1, A4, A5, A7, A8, A9, A11, A13, A15, A16),
    MIX("Level 28 Challenge", A2, A3, A6, A10, A12, A14, A17, A18, A4, A8)];

  // =============== LEVEL 29 ===============
  const B1 = ty("Type a network command", "Type this command exactly.",
    ["ping -c 4 10.0.0.1", "ssh admin@10.0.0.5", "traceroute 172.16.0.1", "arp -a", "ipconfig /flushdns", "netstat -ano", "ifconfig eth0", "nslookup host1"],
    ["Network commands are exact. One wrong character and nothing happens.", "It has {n} characters and begins with \"{f}\". Dots separate the numbers in an address.", "Example: for <b>ping -c 2 10.1.1.9</b> type the command, the option, then the address with its dots. Now type yours."],
    [["Tools", "🧰", "Admins use short commands to test and inspect networks."], ["Addresses", "🏷️", "IP addresses are four numbers joined by dots."], ["Exact", "🎯", "Spaces, dashes and slashes must all be right."]]);
  const B2 = ty("Type an HTML line", "Type this HTML exactly.",
    [`<a href="page.html">Home</a>`, `<img src="cat.png" alt="A cat">`, "<h1>Welcome</h1>", `<input type="password" name="pw">`, `<form action="/login" method="post">`, `<meta charset="utf-8">`, `<p class="note">Hello</p>`, `<link rel="stylesheet" href="style.css">`],
    ["HTML wraps content in tags with angle brackets and quotes.", "It has {n} characters and begins with \"{f}\". Angle brackets are Shift with the comma and period keys.", "Example: for <b>&lt;h2&gt;News&lt;/h2&gt;</b> type an opening tag, the word, then a closing tag with a slash. Now type yours."],
    [["Tags", "🏷️", "A <b>tag</b> is a word in angle brackets that tells the browser what something is."], ["Attributes", "🔧", "Extra settings go inside the tag, like <b>href=\"page.html\"</b>."], ["Pairs", "⌨️", "Opening tags usually have closing tags with a slash. Quotes come in pairs too."]]);
  const B3 = ty("Type a security policy line", "Type this sentence from a security policy.",
    ["Passwords must be at least 12 characters long.", "Report any suspicious email to the help desk.", "Lock your screen whenever you leave your desk.", "Two-factor sign-in is required for all staff accounts.", "Never share your password, even with technical support.", "Back up important files to the approved storage.", "Install security updates within seven days.", "Visitors must sign in and wear a badge."],
    ["Policy sentences are short and exact. Keep a steady beat.", "It has {w} words and begins with \"{f}\". Watch the commas, hyphens and final period.", "Example: for <b>Log out of shared computers.</b> type each word and the period. Now type yours."],
    [["Policy", "📜", "A <b>security policy</b> lists the rules everyone must follow."], ["Clear words", "🪟", "Rules work best when they are short and unmistakable."], ["Proofread", "🔍", "Policies are read by many people, so typos matter."]]);
  const B4 = num("Password entropy", "🔑", () => {
    const b = ri(1, 6), N = 2 ** b, L = ri(4, 12);
    return [`Each character of a password is picked at random from ${N} equally likely symbols. The password has ${L} characters. How many bits of entropy does it have?`, b * L, null,
      ["Each character adds the same number of bits. Work out one character first.", "The bits in one character is the power you raise 2 to in order to reach the symbol count. Multiply that by the password length.", "Example: 128 symbols is 2 to the power 7, so 7 bits per character, and 13 characters give 7 × 13 = 91 bits. Now do yours."]];
  }, [["Entropy", "🔑", "<b>Entropy</b> measures how unpredictable a password is, in bits."], ["One symbol", "🧮", "With 8 symbols (2 × 2 × 2), each character adds 3 bits."], ["Total", "➕", "Bits = bits per character × number of characters."]]);
  const B5 = num("Each extra bit doubles", "🔐", () => pick([
    () => { const n = ri(40, 128), k = ri(1, 8); return [`A key has ${n} bits. A newer key has ${n + k} bits. How many times more possible keys does the newer key have?`, 2 ** k, null,
      ["Find how many extra bits there are. Each one has the same effect.", "Every extra bit doubles the number of keys, so multiply 2 by itself once for each extra bit.", "Example: 9 extra bits give 2 × 2 × ... nine times, which is 512 times more keys. Now do yours."]]; },
    () => { const k = ri(3, 12); return [`How many different keys can a ${k}-bit key have?`, 2 ** k, null,
      ["Each bit has two possible values.", "Multiply 2 by itself once for each bit.", "Example: a 13-bit key has 2 × 2 × ... thirteen times, which is 8192 keys. Now do yours."]]; }
  ])(), [["Bits", "🔐", "A key with n bits has 2<sup>n</sup> possible values."], ["Doubling", "✖️", "One more bit doubles the number of keys. Ten more bits multiply it by 1024."], ["Why", "🛡️", "Longer keys make guessing every key far too slow."]]);
  const B6 = mc("Encrypting, hashing, encoding", "🔏", [
    "Which of these can be turned back into the original with the right key?|encryption|hashing|a checksum|salting",
    "Which one-way function is used to store passwords?|hashing|encoding|compressing|copying",
    "Base64 is an example of ...|encoding, which is not secret|encryption|hashing|a firewall",
    "Why add a random salt to a password before hashing?|so equal passwords give different hashes|so the password is shorter|so it can be decrypted|to speed it up",
    "Two different inputs give the same hash. This is called a ...|collision|backup|salt|key",
    "Which can check that a download was not changed?|a hash of the file|a screensaver|a font|a shortcut",
    "Is Base64 a safe way to hide a password?|no, anyone can decode it|yes, it is encrypted|yes, it is hashed|yes, if long",
    "A site can email you your old password in plain text. What does that suggest?|it stored the password in a recoverable form, which is bad|it used strong hashing|it is very safe|it used a salt"],
    ["Ask whether the process can be undone, and whether a secret key is involved.", "Some processes only change the form, some lock with a key, and some make a fixed fingerprint that cannot be reversed.", "Example: a sealed envelope you can open with the right key is like a reversible lock, while a fingerprint cannot be turned back into the finger. Now do yours."],
    [["Three ideas", "🔏", "<b>Encoding</b> changes form, <b>encryption</b> hides with a key, <b>hashing</b> makes a fingerprint."], ["One-way", "➡️", "A hash cannot be reversed, so it suits password storage."], ["Salt", "🧂", "A salt is random extra text that makes every hash different."]]);
  const B7 = mc("Kinds of malware", "🦠", [
    "Malware that locks your files and demands payment is called ...|ransomware|spyware|adware|a firewall",
    "Which malware pretends to be a useful program?|a trojan|a worm|a patch|a driver",
    "Which malware spreads by itself across a network?|a worm|a trojan|a cookie|a patch",
    "Which software secretly watches what you do and sends the information away?|spyware|firmware|freeware|middleware",
    "A network of infected computers controlled by an attacker is a ...|botnet|intranet|subnet|hotspot",
    "What does a keylogger record?|the keys you type|the screen brightness|the Wi-Fi name|the battery level",
    "Which is a sign of possible malware?|sudden slowness and unknown pop-ups|a wallpaper you picked|an update you started|a full recycle bin",
    "What is the best first response if you think a PC is infected?|disconnect it from the network and report it|keep working|share files|turn off updates"],
    ["Ask how the malware gets in and what it does once there.", "Names often describe the behavior: some trick you, some spread alone, some spy, and some lock things.", "Example: a program that spreads from computer to computer without help acts like a germ passing between people. Now do yours."],
    [["Malware", "🦠", "<b>Malware</b> is software made to harm or spy."], ["Types", "🧩", "Trojan = disguise. Worm = spreads alone. Ransomware = locks files. Spyware = watches."], ["Response", "🚨", "Disconnect, report, and do not pay or keep using the machine."]]);
  const B8 = mc("Attacks on websites", "🕸️", [
    "An attacker floods a site with traffic so real users cannot get in. This is ...|a denial-of-service attack|phishing|SQL injection|a patch",
    "Script code planted in a page that runs in other users' browsers is called ...|cross-site scripting|a denial-of-service attack|a brute-force attack|a backup",
    "A trick that makes your browser send an unwanted request to a site where you are logged in is ...|cross-site request forgery|brute force|ransomware|spoofing",
    "An attacker secretly sits between you and a website, reading the traffic. This is a ...|man-in-the-middle attack|backup|firewall|cookie",
    "How does escaping user input help against script planting?|it stops input being run as code|it makes input longer|it deletes the site|it speeds up pages",
    "What makes a DDoS different from a DoS?|the traffic comes from many machines|it is legal|it is slower|it uses paper",
    "Stealing a login cookie to pretend to be you is called ...|session hijacking|disk cleanup|compression|defragmenting",
    "Which helps protect against interception on public Wi-Fi?|using HTTPS|using a shorter password|turning up the volume|closing tabs"],
    ["Ask what the attacker wants: to block users, to run code, to trick the browser, or to listen in.", "Each attack has a name that hints at its trick, and a matching defense.", "Example: a mob blocking a shop door so customers cannot enter is like a flood of traffic that blocks a site. Now do yours."],
    [["Web attacks", "🕸️", "Sites face floods, planted scripts, forged requests and eavesdropping."], ["Defense", "🛡️", "Check input, use HTTPS, and keep session cookies protected."], ["Learn to defend", "🎓", "Knowing how attacks work helps you build safer sites."]]);
  const B9 = mc("How HTTPS works", "🔒", [
    "In HTTPS, what does the server's certificate help prove?|the server is who it claims to be|the user is old enough|the PC is virus-free|the page is fast",
    "What does TLS do to the data between browser and server?|encrypts it|deletes it|only compresses it|prints it",
    "Which kind of cryptography is often used at the start to agree on a shared secret?|public-key cryptography|no keys at all|a paper key|random typing",
    "After the handshake, which kind of encryption carries most of the data because it is fast?|symmetric encryption|none|hashing only|encoding only",
    "Who signs a website's certificate?|a certificate authority|the user|the router|the printer",
    "The browser warns that a certificate has expired. What should you do?|not continue unless you are sure it is safe|click through every time|disable the browser|share your password",
    "What does the S in HTTPS stand for?|secure|server|speed|site",
    "What does a certificate contain?|the site's name and public key|your password|your files|a virus list"],
    ["Think about two jobs: proving identity and keeping data secret.", "A trusted third party vouches for the site, then both sides agree on a secret to encrypt the rest of the conversation.", "Example: a passport proves who someone is, and a private whisper afterwards keeps the message secret. Now do yours."],
    [["Handshake", "🤝", "Browser and server first agree on how to talk securely."], ["Certificate", "📜", "A <b>certificate</b> ties a site's name to its public key, signed by a trusted authority."], ["Then", "🔐", "A fast shared key then encrypts the data for the rest of the visit."]]);
  const B10 = num("Counting packets", "📦", () => {
    const P = pick([500, 1000, 1500]), M = ri(8, 90) * 100;
    return [`A message of ${M} bytes is split into packets that each carry at most ${P} bytes. How many packets are needed?`, Math.ceil(M / P), null,
      ["A partly filled last packet still counts as a whole packet.", "Divide the message size by the packet size, and if anything is left over, round up to the next whole number.", "Example: 11000 bytes in packets of 2500 bytes is 4.4, which rounds up to 5 packets. Now do yours."]];
  }, [["Packets", "📦", "Networks cut messages into small <b>packets</b> and send each one separately."], ["Count", "🧮", "Packets = message size ÷ packet size, rounded up."], ["Reassemble", "🧩", "The receiver puts the packets back in order."]]);
  const B11 = num("Round-trip time", "🏓", () => pick([
    () => { const a = ri(5, 60), s = ri(1, 20); return [`A request needs ${a} ms to reach a server. The server takes ${s} ms to prepare the reply, and the reply needs ${a} ms to come back. How many milliseconds is the whole wait?`, 2 * a + s, null,
      ["Add up every part of the journey: there, the server's work, and back.", "The trip there and the trip back take the same time, so count that time twice and add the server's time.", "Example: 40 ms each way plus 10 ms of server work is 40 + 10 + 40 = 90 ms. Now do yours."]]; },
    () => { const a = ri(5, 90); return [`A ping shows a round-trip time of ${2 * a} ms. If the trip takes equally long each way, how many milliseconds is one way?`, a, null,
      ["The round trip covers the way there and the way back.", "Split the round trip into two equal halves.", "Example: a round trip of 170 ms is 170 / 2 = 85 ms each way. Now do yours."]]; }
  ])(), [["Latency", "🏓", "<b>Latency</b> is the delay before data arrives."], ["Round trip", "🔁", "Round-trip time = time there + time back (+ any work at the server)."], ["Ping", "📡", "The ping tool measures round-trip time."]]);
  const B12 = mc("Network layers", "🥞", [
    "Which layer does HTTP belong to?|application|transport|internet|link",
    "Which layer do IP addresses belong to?|internet|link|application|transport",
    "TCP and UDP work at the ...|transport layer|link layer|application layer|internet layer",
    "Wi-Fi and Ethernet work at the ...|link layer|application layer|transport layer|internet layer",
    "Routers mainly work with which layer?|internet|application|transport|none",
    "Why use layers in networking?|each layer can change without breaking the others|it makes cables longer|it deletes errors|it hides IP addresses",
    "What does encapsulation mean?|each layer wraps the data with its own header|data is deleted|data is compressed only|data is sent twice",
    "DNS is a service at which layer?|application|link|internet|transport"],
    ["Picture a stack, from the cable at the bottom to the programs at the top.", "Lower layers move bits between neighbors, middle layers route and deliver, and the top layer is what programs talk to.", "Example: mailing a letter has layers too: writing the letter, the postal address, the truck route, and the road. Now do yours."],
    [["Stack", "🥞", "The TCP/IP model has four layers: link, internet, transport, application."], ["Jobs", "🧩", "Link = neighbors. Internet = routing with IP. Transport = delivery with TCP/UDP. Application = HTTP, DNS."], ["Wrap", "🎁", "Each layer adds its own header as data goes down."]]);
  const B13 = mc("Cookies and sessions", "🍪", [
    "What is a cookie?|a small piece of data a site stores in your browser|a virus|a picture|a plug-in",
    "Why do sites use session cookies?|to remember that you are logged in|to cool the PC|to make fonts|to print pages",
    "A cookie marked HttpOnly cannot be read by ...|page scripts|the server|the browser|anyone ever",
    "Which cookie type tracks you across many sites?|a third-party cookie|a session cookie|a first-party cookie|a secure cookie",
    "What does the Secure flag on a cookie do?|sends it only over HTTPS|encrypts the PC|deletes it|doubles its size",
    "Closing the browser usually ends which cookie?|a session cookie|a persistent cookie|a tracking cookie|none of them",
    "Where is a session ID best kept?|in an HttpOnly, Secure cookie|in the page address|in a public post|in an email",
    "Clearing your cookies will usually ...|log you out of sites|delete your files|speed up Wi-Fi|reset the system"],
    ["Think about how a site can remember you between page loads.", "Browsers keep small pieces of data for sites, and flags control who may read them and how they travel.", "Example: a coat-check ticket lets the desk know which coat is yours without asking again. A session cookie does the same job. Now do yours."],
    [["Cookie", "🍪", "A <b>cookie</b> is a small note a site asks your browser to keep."], ["Session", "🎟️", "A session cookie holds a ticket that says you are logged in."], ["Flags", "🚩", "HttpOnly hides it from scripts. Secure sends it only over HTTPS."]]);
  const B14 = mc("Caching and CDNs", "🌍", [
    "What does a CDN do?|serves copies of content from servers near the user|writes web pages|blocks ads|encrypts hard drives",
    "What is a cache?|a stored copy kept to be reused faster|a virus|a password list|a router",
    "Why does caching speed up a page?|files do not need to be downloaded again|the screen is bigger|data is deleted|pages shrink",
    "A site changes its logo, but you still see the old one. A likely cause is ...|a cached copy|a broken keyboard|too much RAM|a loose cable",
    "A stateless server ...|does not remember earlier requests|stays off|deletes users|loses power",
    "A load balancer ...|spreads requests across several servers|weighs servers|blocks all users|prints logs",
    "What does scalable mean for a website?|it can handle growth in users|it fits on a scale|it has few pages|it is free",
    "Which shows the client-server model?|a browser asks and a server answers|two keyboards sharing|a printer talking to itself|a monitor sending mail"],
    ["Ask whether the idea is about copying, spreading work out, or remembering.", "Fast sites keep copies close to users and share the work across many machines.", "Example: a shop that opens branches in many towns lets customers walk a short way instead of traveling far. Now do yours."],
    [["Cache", "🗃️", "A <b>cache</b> keeps a copy so the same thing need not be fetched again."], ["CDN", "🌍", "A <b>content delivery network</b> keeps copies on servers around the world."], ["Scale", "📈", "Load balancers and stateless servers let a site grow."]]);
  const B15 = mc("Network defenses", "🧱", [
    "What does an intrusion detection system do?|watches traffic and raises alerts about suspicious activity|replaces the router|stores backups|fixes typos",
    "What does an intrusion prevention system add?|it can block suspicious traffic automatically|it paints icons|it makes backups|it prints reports",
    "Network segmentation means ...|splitting a network into parts so a problem stays contained|joining all devices into one|removing cables|using a single password",
    "A DMZ in networking is ...|a zone for public-facing servers kept apart from the inner network|a wireless router brand|a cable type|a disk",
    "A honeypot is ...|a decoy system that attracts and studies attackers|a sweet reward|a backup site|an antivirus",
    "Why put guest Wi-Fi on a separate network?|guests cannot reach internal devices|it is prettier|it saves electricity|it removes passwords",
    "What does deny by default mean for firewall rules?|block everything except what is allowed|allow everything|delete the firewall|allow only guests",
    "Why review logs regularly?|to spot unusual activity early|to use more disk|to slow servers|to print them"],
    ["Ask whether the tool watches, blocks, separates, or tricks.", "Strong networks use several layers: watching for trouble, keeping parts apart, and allowing only what is needed.", "Example: a school keeps the front office open to visitors but locks the classroom wing, which is how segments work. Now do yours."],
    [["Watch", "👀", "An <b>IDS</b> alerts on strange traffic. An <b>IPS</b> can also block it."], ["Separate", "🚧", "<b>Segmentation</b> and a <b>DMZ</b> keep a break-in from spreading."], ["Least", "🔑", "Allow only what is needed and block the rest."]]);
  const B16 = mc("Incident response", "🚒", [
    "What is the first thing to do after confirming a breach?|contain it so it does not spread|delete all logs|post it online|ignore it",
    "What happens in the eradicate step?|remove the cause, such as malware|celebrate|buy new desks|rename files",
    "What happens in the recover step?|restore systems and return to normal service|start a new attack|erase the evidence|ignore it",
    "Why keep logs and evidence?|to learn what happened|to fill disks|to hide the problem|to slow responders",
    "The lessons-learned step is for ...|improving defenses for next time|blaming one person|forgetting the event|deleting backups",
    "Which comes before an incident?|preparation, such as plans and training|containment|recovery|lessons learned",
    "Who should be told quickly about a serious incident?|the response team and those responsible for the system|only strangers|nobody|social media",
    "A computer shows a ransom message. What is the first step?|disconnect it from the network|pay at once|keep using it|plug in more drives"],
    ["Ask what must happen first to stop things getting worse.", "Responders go in order: prepare, spot it, contain it, remove the cause, restore service, then learn.", "Example: when a pipe bursts, you first turn off the water, then fix the pipe, then dry the floor. Incidents follow a similar order. Now do yours."],
    [["Plan", "📋", "Prepare before trouble: roles, contacts, backups."], ["Steps", "🪜", "Identify, contain, eradicate, recover."], ["Learn", "🎓", "Afterwards, write down what to improve."]]);
  const B17 = mc("Ethical hacking and permission", "🕵️", [
    "What makes penetration testing legal and ethical?|written permission from the system owner|being curious|a secret plan|good intentions alone",
    "A researcher finds a bug in a company's site. What is the responsible next step?|report it privately to the company|post it publicly first|sell it|exploit it",
    "What does a scope document list in a security test?|which systems may be tested and how|the tester's hobbies|the lunch menu|the logo",
    "Testing a system you do not own, without permission, is ...|usually illegal, even if you mean well|always fine|a school project|allowed after midnight",
    "What is a bug bounty program?|a company that invites bug reports and rewards them|a game|a type of virus|a school club",
    "Where can you safely practice security skills?|in practice labs built for learning, or on your own machines|on a stranger's website|on a school server|on a bank site",
    "After seeing private data during a test, what should an ethical tester do?|stop, protect it and report it|read it all|copy it|share it",
    "Which is black-hat behavior?|breaking in to steal data|testing with permission|reporting a flaw|patching a flaw"],
    ["Ask whether the owner of the system agreed and whether anyone could be harmed.", "Ethical security work needs clear permission, a defined scope, and honest reporting.", "Example: a locksmith may test your door lock only if you invite them, and they tell you what they find. Now do yours."],
    [["Permission", "✅", "Security testing needs the owner's <b>written permission</b>."], ["Scope", "🗺️", "A scope says exactly what may be tested and what is off limits."], ["Report", "📨", "Report flaws privately, and never keep or share data you stumble on."]]);
  const B18 = mk("Count log lines", () => {
    const us = ["ana", "ben", "cy", "dee"];
    let lines, u, c, total;
    for (;;) {
      lines = Array.from({ length: 8 }, () => [pick(["OK", "FAIL", "FAIL"]), pick(us)]);
      u = pick(us); c = lines.filter(l => l[0] === "FAIL" && l[1] === u).length; total = lines.filter(l => l[0] === "FAIL").length;
      if (c >= 1 && c <= 4 && total <= 6) break;
    }
    const vis = `<span style="font-family:monospace;font-weight:bold;font-size:1.1em;display:inline-block;text-align:left">${lines.map(l => l.join(" ")).join("<br>")}</span>`;
    const byUser = pick([true, false]);
    return { text: byUser ? `Each line shows a sign-in result and a user name. How many FAIL lines belong to the user ${u}?` : "Each line shows a sign-in result and a user name. How many FAIL lines are there in total?", visual: vis, answer: byUser ? c : total,
      hints: byUser ? ["Look for lines that have both the right word and the right user.", "Go down the list one line at a time and keep a tally of only the lines that match both.", "Example: for FAIL kim, OK kim, FAIL lee, FAIL kim, FAIL kim, the FAIL lines for kim number 3. Now count yours."]
        : ["Look at the first word of every line.", "Go down the list one line at a time and tally every line that starts with the failure word, whoever the user is.", "Example: for FAIL kim, OK kim, FAIL lee, FAIL kim, FAIL kim, the FAIL lines number 4. Now count yours."] };
  }, [["Logs", "📜", "A <b>log</b> records events, such as every sign-in and whether it worked."], ["Spot", "🔎", "Many FAIL lines for one user in a short time can mean someone is guessing passwords."], ["Count", "🧮", "Tally only the lines that match every condition."]]);
  const L29 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18,
    MIX("Mixed practice", B1, B4, B5, B6, B7, B10, B11, B13, B16, B18),
    MIX("Level 29 Challenge", B2, B3, B8, B9, B12, B14, B15, B17, B5, B10)];

  // =============== LEVEL 30 ===============
  const C1 = ty("Type an AI prompt", "Type this prompt exactly.",
    ["Summarize this article in three bullet points.", "Explain recursion to a ten-year-old using a simple example.", "List the pros and cons of electric buses in a table.", "Check my essay for spelling mistakes but do not rewrite it.", "Write a Python function that returns the largest number in a list.", "Give me five practice questions about fractions, then the answers.", "Act as a friendly tutor and ask me one question at a time.", "Answer only from the text below and say if it is not mentioned."],
    ["Good prompts are clear, so type each word with care.", "It has {w} words and begins with \"{f}\". Watch the hyphens, commas and final period.", "Example: for <b>Explain photosynthesis in two sentences.</b> type each word and the period. Now type yours."],
    [["Prompt", "💬", "A <b>prompt</b> is the instruction you give an AI tool."], ["Clear", "🎯", "Say the task, the format and any limits."], ["Check", "🔍", "A small typo can change what you ask for."]]);
  const C2 = ty("Type a machine-learning line", "Type this Python line exactly.",
    ["model = LinearRegression()", "model.fit(X_train, y_train)", "preds = model.predict(X_test)", "from sklearn.model_selection import train_test_split", "print(accuracy_score(y_test, preds))", "X_train, X_test, y_train, y_test = train_test_split(X, y)", "import numpy as np", `plt.plot(history.history["loss"])`],
    ["Machine-learning code has long names and exact brackets.", "It has {n} characters and begins with \"{f}\". Underscores are Shift with the hyphen key.", "Example: for <b>model.score(X_test, y_test)</b> type the name, a dot, the method, and both inputs inside brackets. Now type yours."],
    [["ML code", "🤖", "Short lines of code create a model, train it, and test it."], ["Names", "🔤", "Variable names like <b>X_train</b> use capital letters and underscores."], ["Exact", "🎯", "One wrong letter and Python reports an error."]]);
  const C3 = ty("Type an AI ethics line", "Type this sentence from an AI ethics policy.",
    ["Users must be told when they are talking to an AI system.", "AI-generated work must be clearly labeled as such.", "Personal data may only be used for the purpose it was collected.", "Always cite the sources you used, including AI tools.", "Decisions that affect people need a human who can review them.", "Report any bias you find in the system to the team.", "Respect the license of every library you use.", "Keep a record of how the model was trained and tested."],
    ["Policy sentences are long, so keep a smooth rhythm.", "It has {w} words and begins with \"{f}\". Check the hyphens and final period.", "Example: for <b>Test the system on many groups.</b> type each word and the period. Now type yours."],
    [["Ethics", "⚖️", "Teams write down rules so AI is built and used fairly."], ["Plain words", "🪟", "Good rules are short enough for everyone to follow."], ["Proofread", "🔍", "Read it once more after typing."]]);
  const goodPair = () => { for (;;) { const d = pick([4, 5, 10, 20, 25, 50]), p = pick([20, 25, 40, 50, 60, 75, 80, 90]), tp = d * p / 100; if (Number.isInteger(tp) && tp >= 1 && tp < d) return [d, p, tp]; } };
  const C4 = num("Accuracy", "🎯", () => {
    if (pick([0, 1])) {
      let N, p; do { N = pick([20, 25, 40, 50, 100, 200]); p = pick([55, 60, 65, 70, 75, 80, 85, 90, 95]); } while ((N * p) % 100 !== 0);
      return [`A model labels ${N} test pictures and ${N * p / 100} of the labels are correct. What is its accuracy in percent?`, p, null,
        ["Accuracy compares the correct answers with all the answers.", "Divide the number correct by the total, then multiply by 100.", "Example: 36 correct out of 40 is 36 / 40 = 0.9, which is 90 percent. Now do yours."]];
    }
    let tp, tn, fp, fn;
    do { tp = ri(30, 50); tn = ri(30, 50); fp = ri(2, 8); fn = 100 - tp - tn - fp; } while (fn < 2 || fn > 15);
    return [`A model's results on 100 test cases: true positives ${tp}, true negatives ${tn}, false positives ${fp}, false negatives ${fn}. What is its accuracy in percent?`, tp + tn, null,
      ["Correct results come in two kinds: right yes answers and right no answers.", "Add the two kinds of correct results, then compare with the total of 100.", "Example: with 40 right yes, 45 right no and 15 wrong results out of 100, the correct ones are 85, so accuracy is 85 percent. Now do yours."]];
  }, [["Accuracy", "🎯", "<b>Accuracy</b> = correct answers ÷ all answers."], ["Four boxes", "🔲", "True positive, true negative, false positive, false negative."], ["Careful", "⚠️", "When one class is rare, a high accuracy can hide poor results."]]);
  const C5 = num("Precision", "🔎", () => {
    const [d, p, tp] = goodPair();
    return [`A spam filter marked ${d} emails as spam. ${tp} of them really were spam. What is its precision in percent?`, p, null,
      ["Precision looks only at the items the model flagged. How many of those were right?", "Divide the correct flagged items by all the flagged items, then multiply by 100.", "Example: 18 right out of 24 flagged is 18 / 24 = 0.75, which is 75 percent. Now do yours."]];
  }, [["Precision", "🔎", "<b>Precision</b> asks: of the items flagged, how many were right?"], ["Formula", "🧮", "TP ÷ (TP + FP) × 100."], ["Useful when", "🛡️", "Wrong alarms are costly, such as blocking a real email."]]);
  const C6 = num("Recall", "🧲", () => {
    const [d, p, tp] = goodPair();
    return [`There were ${d} real spam emails in an inbox. The filter caught ${tp} of them. What is its recall in percent?`, p, null,
      ["Recall looks at all the real cases that existed. How many did the model catch?", "Divide the caught cases by all the real cases, then multiply by 100.", "Example: catching 21 of 28 real cases is 21 / 28 = 0.75, which is 75 percent. Now do yours."]];
  }, [["Recall", "🧲", "<b>Recall</b> asks: of all the real cases, how many did we catch?"], ["Formula", "🧮", "TP ÷ (TP + FN) × 100."], ["Useful when", "🏥", "Missing a real case is costly, such as a medical screening."]]);
  const C7 = mc("Kinds of machine learning", "🧠", [
    "A model learns from examples that already come with the right answers. This is ...|supervised learning|unsupervised learning|reinforcement learning|random guessing",
    "A model finds groups in data that has no answers attached. This is ...|unsupervised learning|supervised learning|reinforcement learning|encryption",
    "An agent learns by trying actions and receiving rewards. This is ...|reinforcement learning|supervised learning|unsupervised learning|hashing",
    "Predicting a house price is an example of ...|regression|classification|clustering|compression",
    "Deciding whether an email is spam or not is ...|classification|regression|clustering|rendering",
    "Grouping customers by similar habits, with no labels, is ...|clustering|classification|regression|encryption",
    "What are features in machine learning?|the input measurements used to predict|the final answers|the program's color|the cost",
    "What is a label?|the correct answer given with a training example|a sticker|a feature|a bug"],
    ["Ask whether the data comes with answers, and what kind of answer is wanted: a number, a category, or a group.", "The kind of learning depends on the feedback: answers given, no answers, or rewards.", "Example: teaching a model with flash cards that show the answer on the back is like learning with the answers provided. Now do yours."],
    [["Three ways", "🧠", "Learning can use answers, find patterns alone, or follow rewards."], ["Tasks", "🧩", "Regression predicts a number. Classification picks a category. Clustering finds groups."], ["Data", "📊", "Features are the inputs. A label is the known answer."]]);
  const C8 = mc("How language models work", "💬", [
    "A large language model is trained mainly to ...|predict the next piece of text|store a list of facts only|run a calculator|play videos",
    "What is a token?|a small chunk of text such as a word or part of a word|a password|a coin|a picture",
    "What is the context window?|how much text the model can consider at once|a screen|a browser tab|a sign-in",
    "Why can the same prompt give different replies?|the model samples from likely choices|the keyboard changes|it is broken|the time zone",
    "What are a model's parameters?|the numbers learned during training|the user's settings|the buttons|the cables",
    "Does a language model look up facts in a database by default?|no, it generates text from patterns it learned|yes, always|only on Tuesdays|it prints a manual",
    "What does fine-tuning do?|trains a model further for a particular task|repairs the screen|deletes its training|removes all tokens",
    "What is a system prompt?|instructions that set how the assistant should behave|a user's password|a bug report|a font"],
    ["Think about what the model is really asked to do each time it writes a word.", "It turns text into pieces, uses numbers learned from huge amounts of text, and picks likely continuations.", "Example: a phone's autocomplete suggests the next word from patterns, and a language model does this on a much larger scale. Now do yours."],
    [["Predict", "💬", "A language model predicts the next <b>token</b> again and again."], ["Learned numbers", "🔢", "Billions of <b>parameters</b> store what it learned from text."], ["Limits", "🚧", "It has a <b>context window</b>, so it can only see so much text at once."]]);
  const C9 = num("Token budget", "🪙", () => pick([
    () => { const t = ri(25, 250); return [`A rule of thumb says one token is about 4 characters. About how many tokens is a text of ${t * 4} characters?`, t, null,
      ["Each token covers a fixed number of characters.", "Divide the number of characters by the characters in one token.", "Example: 2000 characters at 4 characters per token is 2000 / 4 = 500 tokens. Now do yours."]]; },
    () => { const w = pick([4000, 8000, 16000, 32000]), p = ri(1, 30) * 100; return [`A model's context window is ${w} tokens. Your prompt uses ${p} tokens. How many tokens are left for the reply?`, w - p, null,
      ["The prompt and the reply share the same window.", "Subtract the tokens already used from the size of the window.", "Example: a window of 6000 tokens with 1500 used leaves 6000 − 1500 = 4500 tokens. Now do yours."]]; },
    () => { const w = ri(2, 40) * 2; return [`A rule of thumb says 2 words are about 3 tokens. About how many tokens is a ${w}-word text?`, w * 3 / 2, null,
      ["Find how many groups of two words are in the text.", "Halve the number of words, then multiply by the tokens in each group.", "Example: 50 words is 25 groups of two words, and 25 × 3 = 75 tokens. Now do yours."]]; }
  ])(), [["Token", "🪙", "Models read and write in <b>tokens</b>, roughly 4 characters or three quarters of a word."], ["Budget", "👛", "The prompt and the reply must fit in the context window together."], ["Cost", "💲", "Many services charge by the token."]]);
  const C10 = mc("Hallucinations and checking", "🧐", [
    "An AI gives a confident answer with a made-up book title. This is called a ...|hallucination|compile error|backup|firewall",
    "What should you do with a surprising fact from an AI tool?|check it in a reliable source|trust it|share it at once|delete it",
    "Why can AI text sound sure even when it is wrong?|it is built to produce fluent text, not to know the truth|it checks everything|it never errs|it reads minds",
    "Which is the best way to check a claimed quotation?|find the original source|ask the AI again|trust the style|count the words",
    "AI tools are most useful and safe when ...|you check the important results yourself|you use them alone for medical decisions|you never read the output|you copy blindly",
    "Asking an AI to cite sources is not enough because ...|the sources themselves can be invented|sources are always real|it makes the answer shorter|citations are banned",
    "Where do hallucinations come from?|the model fills gaps with likely-sounding text|the model lies on purpose|the screen|the Wi-Fi",
    "Giving the AI the actual document to use helps because ...|it can base its answer on real text|it makes the model bigger|it avoids every mistake|it deletes bias"],
    ["Ask whether the answer was checked against something real.", "Fluent writing is not proof. Important claims need a reliable source you can find yourself.", "Example: if a tool says a town has a famous bridge, you would look at a map or a trusted guide before repeating it. Now do yours."],
    [["Made up", "🌫️", "A <b>hallucination</b> is a confident answer that is false or invented."], ["Verify", "🔍", "Check names, numbers, quotes and sources before you rely on them."], ["Ground it", "📄", "Give the tool real text to work from, and still check the result."]]);
  const C11 = mc("Responsible AI principles", "🧭", [
    "Explainability means ...|people can understand why the system made a decision|the system is very fast|it uses rare words|it is free",
    "Transparency means ...|being open about when and how AI is used|hiding the model|using secret data|speed",
    "Accountability means ...|a person or organization is responsible for what the system does|the AI is blamed|nobody is responsible|only users are blamed",
    "Fairness checking asks whether ...|the system treats different groups equitably|the system is cheap|it is colorful|it has many users",
    "A hiring tool sorts resumes. Why keep a human reviewer?|to catch errors and unfair results|to make it slower on purpose|to hide results|to remove the tool",
    "Why test an AI system on people from many backgrounds?|to find failures that affect some groups more|to save time|to hide errors|to add logos",
    "Human in the loop means ...|a person can review or override the AI's decision|the AI is inside a person|no humans are involved|the AI only speaks",
    "A model card describes ...|what a model is for, how it was tested and its limits|its price|its color|its owner's address"],
    ["Ask which value the sentence describes: understanding, openness, blame, fairness, or oversight.", "Responsible teams explain the system, are open about it, test it widely, and keep people in charge.", "Example: a doctor who uses a tool must still be able to explain the advice to the patient. Now do yours."],
    [["Principles", "🧭", "Responsible AI is <b>fair</b>, <b>transparent</b>, <b>explainable</b> and <b>accountable</b>."], ["People", "🧑‍🤝‍🧑", "Keep a human able to review and change high-stakes decisions."], ["Documents", "📄", "A <b>model card</b> says what a model is for and where it fails."]]);
  const C12 = mc("Key privacy laws", "🏛️", [
    "Which US law protects the online privacy of children under 13?|COPPA|HIPAA|FERPA|GDPR",
    "Which US law protects student education records?|FERPA|COPPA|HIPAA|CCPA",
    "Which US law protects patients' health information?|HIPAA|FERPA|COPPA|GDPR",
    "Which European Union law sets broad rules for personal data?|GDPR|COPPA|HIPAA|FERPA",
    "Under GDPR, the data subject is ...|the person the data is about|the company|the server|the lawyer",
    "California's privacy law gives residents rights over personal data held by companies. Its short name is ...|CCPA|COPPA|HIPAA|FERPA",
    "Laws differ by country, so a global app must ...|follow the rules of each place it serves|ignore them|follow one at random|stop updating",
    "A data breach notification rule is ...|a duty to tell people when their data was exposed|a rule about passwords|a type of firewall|a cable standard"],
    ["Match the law to the group of people or the kind of data it protects.", "Some laws are named for a kind of data, such as health, school or children, and some cover a whole region.", "Example: a law for hospital records would be about health data, while a law for a whole continent covers everyone living there. Now do yours."],
    [["Rules", "🏛️", "Privacy laws set what organizations may collect, keep and share."], ["Names", "🔤", "COPPA = children. FERPA = school records. HIPAA = health. GDPR = European Union. CCPA = California."], ["Global", "🌍", "Apps used in many places must respect many laws."]]);
  const C13 = mc("Unauthorized access", "🚫", [
    "Logging into someone else's account without permission is ...|unauthorized access, which is illegal|fine if you know the password|a school project|a backup",
    "A classmate shares a password for one task. Using it for something else is ...|beyond the permission given|fine|encouraged|the same thing",
    "Which act is computer crime in most countries?|spreading ransomware|installing updates|making a backup|writing code",
    "Which is exceeding authorized access?|using work access to browse private records with no need|doing your assigned work|asking for access|resetting your password by the rules",
    "Does the intent to just look around make unauthorized access legal?|no, intent does not remove the need for permission|yes, always|yes, if free|yes, on weekends",
    "Who decides what access an employee has?|the organization, through its policies|the employee alone|a stranger|the keyboard",
    "Selling stolen passwords is ...|a crime|a business|allowed with credit|a hobby",
    "Why do laws cover computer misuse?|computers hold private and important data|computers are expensive|keyboards are loud|screens glow"],
    ["Ask whether the owner of the account or system gave permission for this exact act.", "Access is allowed only as far as the owner permits, no matter how easy it is to get in.", "Example: a house guest invited for dinner may not open the bedroom drawers, even though the door is open. Now do yours."],
    [["Permission", "🔑", "Having a password does not mean you have permission to use it however you like."], ["Law", "⚖️", "Most countries have laws against breaking into computer systems."], ["Intent", "💭", "Good intentions do not remove the need for permission."]]);
  const C14 = mc("Honest use of AI in school", "🎓", [
    "Your class allows AI for brainstorming only. Having it write the whole essay is ...|breaking the rule|fine|brainstorming|editing",
    "Presenting AI-generated work as entirely your own is ...|dishonest|originality|fair use|a citation",
    "If your class permits AI help, what should you do?|say how you used it|hide it|blame the tool|delete the history",
    "Why should you understand any code or text an AI gives you before submitting it?|you are responsible for what you submit|it is shorter|AI is always right|teachers like long files",
    "Which use of AI helps learning most?|asking it to explain a step you are stuck on|having it do the whole assignment|copying answers|asking for test answers",
    "If the assignment rules do not mention AI, the best step is to ...|ask the teacher|assume anything goes|guess|hide it",
    "AI detectors can be wrong, so decisions about cheating should rely on ...|several kinds of evidence and a conversation|the detector alone|a coin flip|one number",
    "Citing an AI tool means telling readers ...|which tool you used and for what|the tool's price|your password|nothing at all"],
    ["Ask whether the work shows your own understanding, and whether the rules allow the help.", "Use tools in ways your class allows, be open about it, and make sure you understand what you hand in.", "Example: using a calculator is fine on a homework page that allows it, but not on a test that forbids it. Rules decide. Now do yours."],
    [["Rules first", "📜", "Check what your school or teacher allows."], ["Be open", "🪟", "State which tool you used and what it did."], ["Learn", "🎓", "Use AI to understand, not to skip the thinking."]]);
  const C15 = mc("Agreements and contracts", "📝", [
    "What does NDA stand for?|non-disclosure agreement|new data archive|network device address|no digital access",
    "An NDA is used to ...|keep certain information secret|share files|speed up Wi-Fi|install software",
    "What does SLA stand for?|service level agreement|secure login access|software license archive|system load average",
    "An SLA says a service will be up 99.9 percent of the time. This is a promise about ...|reliability|color|the price of RAM|font size",
    "What is an EULA?|a license agreement between the software maker and the user|a virus|a backup tool|a printer driver",
    "Clicking I agree on terms of service usually means ...|you accept a binding agreement|nothing|you own the site|the site pays you",
    "Why read the privacy section before agreeing?|it says what data is collected and how it is used|it shows jokes|it lists prices only|it is empty",
    "Which clause limits what a company must pay if the service fails?|limitation of liability|a font choice|a logo rule|a mouse setting"],
    ["Spell out the letters and ask what promise or rule the agreement makes.", "Technology agreements say who may use what, what is promised, and what stays secret.", "Example: a gym membership says what you may use, what you pay, and what the gym promises in return. Software agreements work the same way. Now do yours."],
    [["Agreements", "📝", "Software and services come with written agreements."], ["Letters", "🔤", "NDA = secrecy. SLA = service promises. EULA = software license."], ["Read", "👓", "Clicking agree is a real choice. Look at data and liability parts."]]);
  const C16 = mc("Automated decisions", "🤖", [
    "A system automatically denies a loan. Which right is important?|to ask for a human review|to hide the decision|to change the law|to read the code only",
    "An algorithm decides who gets a job interview. A risk is ...|past bias in the training data being repeated|too few emails|too fast results|a bright screen",
    "Which makes an automated decision easier to challenge?|a clear explanation of the main factors|a secret formula|no records|a longer password",
    "Facial recognition works worse on some groups. What is the ethical response?|test, improve, and limit use until it is fair|ignore it|use it more|hide the results",
    "What is surveillance creep?|a tool collected for one purpose gradually used for more|a slow computer|a camera brand|a cable fault",
    "Which is a good safeguard for high-stakes AI decisions?|human oversight and regular audits|no oversight|only speed|bigger logos",
    "What does auditing an algorithm mean?|checking how it behaves and whether it is fair|painting it|selling it|deleting it",
    "Why keep records of an automated decision?|so it can be reviewed and explained later|to waste disk space|to speed up the system|to hide it"],
    ["Ask who could be harmed by a wrong decision and how they could challenge it.", "Decisions that change people's lives need explanations, records, checking for bias, and a person who can step in.", "Example: if a school's system marks a student absent by mistake, the family must be able to ask someone to look again. Now do yours."],
    [["High stakes", "⚠️", "Jobs, loans and safety decisions deserve extra care."], ["Safeguards", "🛡️", "Explanations, audits, records and human review."], ["Bias", "⚖️", "Old unfair patterns in data can be copied by a model."]]);
  const C17 = mc("Professional ethics", "🧑‍💻", [
    "Professional codes, like the ACM code of ethics, say computing professionals should ...|avoid harm and be honest|maximize profit only|keep all bugs secret|ignore users",
    "A manager asks you to hide a safety bug before launch. The ethical step is to ...|raise it through proper channels|hide it|quit silently|blame a tester",
    "What is a conflict of interest?|when personal gain could affect your professional judgment|a team meeting|a disagreement about fonts|a bug",
    "What is whistleblowing?|reporting wrongdoing inside an organization to those who can act|a loud alarm|an email filter|a game",
    "Why must engineers consider long-term effects of what they build?|products can affect many people for years|it is boring|nobody uses them|it adds code",
    "Giving credit to coworkers' work is part of ...|honesty and fairness|slowing down|marketing|bugs",
    "Competence in a code of ethics means ...|only taking work you are qualified to do well|doing anything|never learning|hiding mistakes",
    "Which shows respect for users' privacy?|collecting only what the feature needs|logging everything|selling data|ignoring settings"],
    ["Ask who could be helped or harmed, and what an honest professional would do.", "Professional codes value honesty, avoiding harm, fairness and respect for people's privacy.", "Example: an engineer who finds a flaw in a bridge design reports it right away, even if that delays the opening. Now do yours."],
    [["Codes", "📘", "Groups like the ACM publish codes of ethics for computing professionals."], ["Speak up", "📣", "Raise safety problems through the proper channels."], ["Respect", "🤝", "Be honest, give credit, and protect users."]]);
  const C18 = num("AI usage cost", "💲", () => pick([
    () => { const p = pick([2, 3, 5, 8, 10, 20]), k = ri(2, 30); return [`A service charges ${p} cents for every 1000 tokens. A job uses ${k * 1000} tokens. How many cents does it cost?`, p * k, null,
      ["Find how many blocks of 1000 tokens the job uses.", "Multiply the number of blocks by the price of one block.", "Example: 7000 tokens at 4 cents per 1000 is 7 blocks, and 7 × 4 = 28 cents. Now do yours."]]; },
    () => { const p = pick([2, 3, 5, 8, 10, 20]), r = ri(2, 20); return [`A service charges ${p} cents for every 1000 tokens. A program makes ${r} requests that each use 2000 tokens. How many cents does it cost in all?`, p * 2 * r, null,
      ["First count all the tokens, then the blocks of 1000.", "Each request is two blocks of 1000. Multiply the blocks by the number of requests and by the price per block.", "Example: 5 requests of 2000 tokens at 4 cents per 1000 use 10 blocks, and 10 × 4 = 40 cents. Now do yours."]]; }
  ])(), [["Price", "💲", "Many AI services charge a small price per 1000 tokens."], ["Method", "🧮", "Cost = blocks of 1000 tokens × price per block."], ["Plan", "📝", "Short prompts and replies cost less and run faster."]]);
  const L30 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18,
    MIX("Mixed practice", C1, C4, C5, C7, C8, C9, C10, C11, C12, C18),
    MIX("Level 30 Challenge", C2, C3, C6, C13, C14, C15, C16, C17, C4, C9)];

  Object.assign(TYPING_LEVELS, { 28: L28, 29: L29, 30: L30 });
})();
