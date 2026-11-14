// ext/typing-7-9.js  Mind Lab Typing & Computers, levels 7-9 (60 lessons)
(() => {
  const sl = a => () => a.map(([h, v, t]) => ({ h, v, t }));
  const big = (t, s = 2) => `<span style="font-size:${s}em;font-weight:bold">${t}</span>`;
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
      return { text: prompt, visual: big(shown ? shown(s) : s, s.length > 40 ? 1 : s.length > 14 ? 1.2 : 1.8), textInput: true, answer: s, hints: h };
    };
    make.teach = sl(slides);
    return { title, make };
  };
  const num = (title, vis, fn, hints, slides) => {
    const make = () => { const [text, answer, v] = fn(); return { text, visual: v || vis, answer, hints: hints.slice() }; };
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

  // =============== LEVEL 7 ===============
  const D1 = ty("Type with punctuation", "Type this sentence. Include the commas and the period.",
    ["after lunch, we played outside.", "my brother, who is nine, loves robots.", "first, open the file; then, save it.", "it was cold, so i wore a coat.", "we need eggs, milk, and bread.", "when the bell rang, everyone lined up.", "the library opens at nine, and it closes at five.", "yes, i can help you today."],
    ["Type one word at a time and watch for the commas.", "There are {w} words and it starts with \"{f}\". The comma key sits just right of the M key.", "Example: for \"well, it works.\", type well, then the comma, a space, then it works and the period. Now type yours."],
    [["Punctuation", "✍️", "Commas, periods and semicolons are keys on the right side of the keyboard."], ["Right pinky", "🖐️", "Your <b>right ring finger</b> types the period and your <b>right middle finger</b> types the comma."], ["Tip", "💡", "Do not look down. Feel for the bumps on F and J, then reach."]], cap);
  const D2 = ty("Double letter words", "Type this word. Watch the double letters!",
    ["balloon", "address", "success", "little", "village", "summer", "happen", "tomorrow", "pizza", "coffee", "bubble", "carpet", "tennis", "puzzle", "classroom", "assistant", "rabbit", "message"],
    ["Say the word slowly. Where do you hear the same letter twice?", "The word has {n} letters and starts with \"{f}\". Press the same key twice for a double letter, with a smooth tap each time.", "Example: for the word <b>happy</b>, press H, A, then P two times, then Y. Now type yours."],
    [["Double letters", "🔁", "Some words repeat a letter, like <b>ball</b> and <b>moon</b>."], ["Rhythm", "🥁", "Tap the same key twice with the <b>same finger</b>. Keep an even beat."], ["Tip", "💡", "Slow down on doubles. Smooth is faster than rushed."]]);
  const D3 = num("Characters to words", "⏱️", () => {
    const w = ri(15, 45), m = ri(2, 5), c = w * 5 * m, n = pick(["Maya", "Leo", "Sam", "Nia", "Omar", "Ella"]);
    return [`${n} typed ${c} characters in ${m} minutes. A word counts as 5 characters. How many words per minute (WPM)?`, w];
  }, ["First turn characters into words by using 5 characters per word. Then think about the minutes.", "Characters divided by 5 gives words. Words divided by minutes gives words per minute.", "Example: 300 characters in 3 minutes. 300 / 5 = 60 words. 60 / 3 = 20 words per minute. Now do yours."],
    [["What is a word?", "🔤", "In typing tests a <b>word</b> is 5 characters, counting spaces and letters."], ["Two steps", "🧮", "Characters / 5 = words. Words / minutes = <b>WPM</b>."], ["Why 5?", "💡", "Long and short words even out, so every test is fair."]]);
  const D4 = num("Net typing speed", "🎯", () => {
    const m = ri(2, 5), k = ri(12, 40), e = ri(2, 8), w = m * k + e;
    return [`You typed ${w} words in ${m} minutes and made ${e} mistakes. Net WPM = (words - mistakes) / minutes. What is your net WPM?`, k];
  }, ["Mistakes cost you. Take them away from the words first.", "Subtract the mistakes from the words, then divide by the minutes.", "Example: 55 words, 5 mistakes, 2 minutes. 55 - 5 = 50. 50 / 2 = 25 net WPM. Now do yours."],
    [["Gross and net", "📊", "<b>Gross WPM</b> counts everything you typed. <b>Net WPM</b> takes away the mistakes."], ["Formula", "🧮", "Net WPM = (words - mistakes) / minutes."], ["Tip", "💡", "Being correct beats being fast. Fewer mistakes means a better net speed."]]);
  const D5 = mc("Sit and type well", "🪑", [
    "Where should your wrists be while typing?|straight and floating|bent up hard on the desk edge|twisted sideways", "What is the 20-20-20 rule?|every 20 minutes look 20 feet away for 20 seconds|type 20 words for 20 minutes|take 20 breaths", "Where should the top of the screen be?|at or just below eye level|far above your eyes|on your lap",
    "How should your feet rest?|flat on the floor|crossed under the chair|swinging high", "What can happen if you type for hours without a break?|your hands and eyes get tired and sore|you grow taller|the keys wear out faster", "How far should your eyes be from the screen?|about an arm's length|touching the screen|across the room",
    "Which back position is best?|sitting up with back supported|slouching low|leaning far forward", "What should you do when your hands feel sore?|stop and rest and tell a grown-up|type harder|ignore it"],
    ["Think about a comfortable, relaxed body.", "Good posture keeps your joints neutral and your eyes rested. Breaks are part of it.", "Example: if your neck hurts, you may be looking too far up or down, so you adjust the screen. Now do yours."],
    [["Posture", "🪑", "Sit up, feet flat, wrists straight, screen at eye level."], ["Breaks", "⏰", "Rest your eyes with the <b>20-20-20 rule</b>: every 20 minutes, look 20 feet away for 20 seconds."], ["Listen to your body", "👂", "If your hands hurt, <b>stop and tell a grown-up</b>."]]);
  const D6 = mc("Shortcut keys", "⌨️", [
    "Which shortcut makes selected text bold?|Ctrl + B|Ctrl + X|Ctrl + P", "Which shortcut selects everything?|Ctrl + A|Ctrl + S|Ctrl + Z", "Which shortcut prints?|Ctrl + P|Ctrl + C|Ctrl + F",
    "Which shortcut finds a word on a page?|Ctrl + F|Ctrl + V|Ctrl + N", "Which shortcut makes selected text italic?|Ctrl + I|Ctrl + U|Ctrl + Y", "Which shortcut underlines text?|Ctrl + U|Ctrl + B|Ctrl + D",
    "Which shortcut opens a new blank document?|Ctrl + N|Ctrl + O|Ctrl + W", "Which shortcut cuts selected text?|Ctrl + X|Ctrl + C|Ctrl + V", "Which shortcut redoes what you undid?|Ctrl + Y|Ctrl + Z|Ctrl + K"],
    ["Many shortcuts use a letter that matches the action's name.", "Hold Ctrl and press one letter. Try thinking of the first letter of what you want to do, or the odd one out.", "Example: Ctrl + S saves, S for Save. Ctrl + O opens, O for Open. Now do yours."],
    [["Ctrl shortcuts", "🎛️", "Hold <b>Ctrl</b>, then tap a letter. It is quicker than the mouse."], ["Format", "🅱️", "<b>B</b>old, <b>I</b>talic, <b>U</b>nderline: Ctrl + B, I or U."], ["Handy ones", "🧰", "Ctrl + A selects all, Ctrl + F finds, Ctrl + P prints, Ctrl + N is new."]]);
  const D7 = num("Spreadsheet sums", "📊", () => {
    const v = [ri(2, 20), ri(2, 20), ri(2, 20)];
    return [`In a spreadsheet, what does =A1+B1+C1 give?`, v[0] + v[1] + v[2], sheet(v)];
  }, ["A formula starts with =. Look up each cell it names.", "Find the value in each named cell, then add them all together.", "Example: A1 = 4, B1 = 6, C1 = 5. =A1+B1+C1 means 4 + 6 + 5 = 15. Now do yours."],
    [["Cells", "🔲", "Each box is a <b>cell</b>. Its name is a column letter and a row number, like <b>B1</b>."], ["Formulas", "🧮", "A formula starts with <b>=</b>. The spreadsheet does the math for you."], ["Change a number", "🔄", "If a cell changes, the formula answer changes too."]]);
  const D8 = mc("Parts of an email", "📧", [
    "Which part is for the person you are writing to?|To|Subject|Signature", "Which part tells what the email is about?|Subject|Attachment|Inbox", "What is an attachment?|a file sent with the email|the greeting|a spam message",
    "Which is a good subject line?|Homework due Friday|Hi|READ NOW!!!", "What does Reply do?|answers the person who sent it|deletes the email|sends it to everyone you know", "What is the Inbox?|where new emails arrive|where drafts are deleted|a type of attachment",
    "What is a Draft?|an email you have not sent yet|an email that bounced|a spam folder", "Which ending is polite?|Thank you, Sam|bye|whatever"],
    ["Think about the job of each part of an email.", "An email has an address line, a title line, a message, and sometimes a file.", "Example: the Subject line is like a title on a book cover. It tells what is inside. Now do yours."],
    [["To and Subject", "📬", "<b>To</b> is who gets it. <b>Subject</b> tells what it is about."], ["Body and files", "📎", "The <b>body</b> is your message. An <b>attachment</b> is a file you add."], ["Polite emails", "🙂", "Start with a greeting and end with <b>thank you</b> and your name."]]);
  const D9 = mc("Folder paths", "🗂️", [
    "In Documents/School/Math/test.docx, which is the file?|test.docx|School|Documents", "In Documents/School/Math/test.docx, which folder holds the file?|Math|School|Documents", "In Pictures/Trip/beach.jpg, what is the file type?|JPG picture|Word document|music",
    "What does .mp3 mean?|an audio file|a picture|a spreadsheet", "What does .pdf usually mean?|a document that looks the same everywhere|a song|a program", "What is a path?|the folders you go through to find a file|a type of virus|a game level",
    "In Music/Rock/song.mp3, how many folders are in the path?|2|1|3", "What does .xlsx mean?|a spreadsheet|a video|a photo"],
    ["A path lists folders from big to small and ends with the file.", "The last part is the file. The ending after the dot tells you its type.", "Example: in Games/Racing/car.png, car.png is the file, Racing is the folder holding it, and png is a picture. Now do yours."],
    [["Folders in folders", "📁", "A folder can hold other folders. Together they make a <b>path</b>."], ["Read it left to right", "➡️", "Start with the big folder. The <b>last name</b> is the file."], ["File endings", "🏷️", ".docx = document, .jpg = picture, .mp3 = sound, .xlsx = spreadsheet."]]);
  const D10 = num("Storage sizes", "💾", () => {
    const k = pick(["photo", "song", "video clip"]), per = pick([2, 3, 4, 5, 6]), n = ri(3, 9), gb = ri(1, 3);
    if (Math.random() < 0.5) return [`1 GB is 1000 MB. A phone has ${gb} GB free. How many MB is that?`, gb * 1000];
    return [`Each ${k} uses ${per} MB. How many MB do ${n} of them use?`, per * n];
  }, ["Work out what one thing takes, then count how many you have.", "Use multiplication. For GB to MB, a GB is made of a thousand MB.", "Example: 6 photos at 4 MB each use 6 x 4 = 24 MB. Now do yours."],
    [["Bytes", "🔢", "Computers measure storage in <b>bytes</b>. KB, MB and GB are bigger and bigger."], ["Bigger units", "📏", "1 GB = 1000 MB. A photo may be a few MB. A movie may be a few GB."], ["Full storage", "📦", "When storage is full, you must delete or move files."]]);
  const D11 = mc("If this then that", "🔀", [
    "if it is raining: take an umbrella. It is raining. What happens?|take an umbrella|nothing|stay inside", "if score > 10: show 'You win'. Score is 15. What shows?|You win|nothing|an error", "if score > 10: show 'You win'. Score is 4. What shows?|nothing|You win|15",
    "if door is open: walk in, else: knock. The door is closed. What do you do?|knock|walk in|run", "What do we call code that picks between two paths?|a condition|a bug|a window", "In 'if hungry: eat', what is the condition?|hungry|eat|if",
    "if age >= 8: allow the ride, else: say 'too young'. Age is 8. What happens?|allow the ride|say 'too young'|nothing", "What word starts a decision in many languages?|if|and|end"],
    ["A condition is checked first. Is it true or false?", "If the condition is true, do the first action. If it is false, do the else action or nothing.", "Example: if light is on: read. The light is off, so you do not read. Now do yours."],
    [["Conditions", "🔀", "An <b>if</b> checks something. If it is <b>true</b>, the code runs."], ["Else", "↪️", "<b>Else</b> says what to do when the if is false."], ["Computers decide", "🤖", "Games use ifs all the time, like 'if health is 0, game over'."]]);
  const D12 = mc("Computer variables", "📦", [
    "A variable is like...|a labeled box that holds a value|a keyboard key|a screen", "score = 5, then score = score + 2. What is score?|7|5|2", "lives = 3, then lives = lives - 1. What is lives?|2|3|1",
    "name = 'Zed'. What does name hold?|Zed|name|a number", "Why use variables in a game?|to keep track of things like score|to turn off the screen|to print paper", "coins = 10, then coins = coins + 5. What is coins?|15|10|5",
    "x = 4, y = 3. What is x + y?|7|12|1", "Which variable name is clearest?|playerScore|a|zzz"],
    ["A variable stores a value that can change.", "Work from the starting value. Apply each change one step at a time.", "Example: points = 8, then points = points + 3. 8 + 3 = 11, so points is 11. Now do yours."],
    [["Variable", "📦", "A <b>variable</b> is a named box that holds a value."], ["Change it", "✏️", "score = score + 1 means: take the old score, add one, store it again."], ["Names", "🏷️", "Pick clear names like <b>score</b> or <b>lives</b>."]]);
  const D13 = mc("Handling mean messages", "🛡️", [
    "Someone sends you a mean message online. What should you do first?|do not reply and tell a trusted adult|send a mean one back|delete everything quietly", "You see someone being bullied in a group chat. What is a good choice?|tell an adult and be kind to the person|join in|laugh", "Why save a mean message before blocking?|a grown-up can see it as proof|to feel sad|to share it with everyone",
    "What can you do to stop a person messaging you?|block them|answer them more|give them your number", "Is it OK to be mean online if nobody sees your name?|no, kindness always counts|yes|only on weekends", "A friend says they feel sad because of online messages. What helps?|listen and help them tell an adult|tell them to ignore feelings|laugh",
    "What is a good way to disagree online?|kindly and with respect|with insults|in ALL CAPS", "Who can help with online meanness?|parents, teachers and trusted adults|nobody|only strangers"],
    ["Think about staying safe and being kind.", "Do not fight back. Keep it as proof, block, and get help from someone you trust.", "Example: a game player calls you names. You do not answer, you block them, and you tell a parent. Now do yours."],
    [["Stay calm", "😌", "Do not reply to a mean message."], ["Save, block, tell", "🚫", "<b>Save</b> proof, <b>block</b> the person, and <b>tell</b> a trusted adult."], ["Be an upstander", "🦸", "Help others by being kind and telling an adult."]]);
  const D14 = mc("Operating systems and apps", "🧩", [
    "What does an operating system do?|manages the computer and runs apps|prints paper|plays only music", "Which is an operating system?|Windows|a mouse|a printer", "Which is an app?|a drawing program|the power cable|the screen",
    "What is a driver?|software that lets the computer use a device|a type of car|a keyboard shortcut", "Which one runs on a phone?|an app|a floppy disk|a typewriter", "Where do you usually get safe apps?|an official app store with a parent's okay|a pop-up ad|a stranger's message",
    "Why update the operating system?|to fix problems and stay safe|to erase files|to make it slower", "Which is NOT software?|keyboard|game|web browser"],
    ["Think about hardware you can touch and software you cannot.", "The operating system is the main program. Apps run on top of it.", "Example: a web browser is an app. The system underneath helps it use the screen and the keyboard. Now do yours."],
    [["Operating system", "🖥️", "The <b>operating system</b> (OS) is the main software that runs the computer."], ["Apps", "📱", "<b>Apps</b> are programs for jobs, like writing or drawing."], ["Safe installs", "✅", "Only install apps with a <b>parent's okay</b> from a trusted store."]]);
  const D15 = mc("Slide design", "🖼️", [
    "How much text is good on a slide?|a few key words|a whole page|none, ever", "Which text color is easiest to read on a white slide?|dark|light yellow|white", "Which is the best title size?|big and clear|tiny|same as the notes",
    "How many fonts should a slide use?|one or two|ten|a new one per word", "What makes a slide look cluttered?|too many pictures and words|plenty of space|one picture", "What is a bullet point?|a short item in a list|a type of picture|a font",
    "Why add a picture to a slide?|to help show the idea|to hide the words|to fill every gap", "Which is the best order for a talk?|beginning, middle, end|end, beginning, middle|random"],
    ["Think about what helps the audience read and understand.", "Short words, clear contrast and enough space make slides easy to read from far away.", "Example: a slide with only 'Frogs live near water' and one picture is clear. A slide full of paragraphs is not. Now do yours."],
    [["Less is more", "✨", "Use <b>short phrases</b>, not whole paragraphs."], ["Contrast", "🎨", "Dark text on a light background is easy to read."], ["Practice", "🎤", "Talk about your slide. Do not just read it out."]]);
  const D16 = mc("Search words", "🔍", [
    "Which search is best for the life cycle of frogs?|frog life cycle|frogs|animals", "Why use specific keywords?|they give better results|they make search slower|they are shorter", "What can quotation marks around words do?|search for that exact phrase|hide the page|translate",
    "What do you do if there are too many results?|add more specific words|give up|click a random ad", "Which result is probably an ad?|one marked 'Ad' or 'Sponsored'|the first sentence|the page title", "Which is a better keyword set for how tall is Mount Everest?|Mount Everest height|tall|mountain",
    "What should you check about a page?|who wrote it and when|how bright it is|how many pictures it has", "What do you do if a result looks scary or wrong for kids?|close it and tell an adult|read it anyway|share it"],
    ["Think about which words match exactly what you are looking for.", "Specific words narrow the results. Be careful with ads and strange pages.", "Example: for how volcanoes erupt, 'volcano eruption' beats just 'hot'. Now do yours."],
    [["Keywords", "🔑", "Choose the <b>most important words</b> for what you want."], ["Be specific", "🎯", "More exact words give better results."], ["Check results", "✅", "Ads are marked. Look at <b>who wrote it</b> and <b>when</b>."]]);
  const D17 = mc("Screens and sleep", "😴", [
    "Why avoid bright screens right before bed?|they can make it harder to sleep|they cure sleep|they fix eyes", "How can you rest tired eyes?|look far away for a moment|stare closer|rub them hard", "What is a good screen-free activity?|playing outside|more videos|more games",
    "What is a screen time limit for?|keeping a healthy balance|punishing you|breaking the device", "What can too much screen time do?|make you tired and less active|make you taller|help you sleep", "What should you do after long screen time?|move, stretch and drink water|stay seated|skip meals",
    "Where is a good place to charge devices at night?|outside the bedroom|under the pillow|in your bed", "Balance means...|a mix of screen and non-screen fun|only screens|no fun at all"],
    ["Think about what a healthy day looks like.", "Screens are fine in a balance with sleep, play, family and moving around.", "Example: after an hour of games, stretch and play outside for a while. Now do yours."],
    [["Balance", "⚖️", "A good day mixes screens with <b>play, sleep and family time</b>."], ["Move", "🏃", "Stand up and stretch often."], ["Sleep", "🌙", "Turn screens off before bed so you can <b>sleep well</b>."]]);
  const D18 = mc("Copy and share rules", "©️", [
    "Is it OK to copy a classmate's essay and say it is yours?|no, that is cheating|yes|only if it is short", "What do you do when you use a quote?|put it in quotation marks and say who said it|change one word|hide it", "Who owns a drawing someone made?|the person who made it|whoever finds it|nobody",
    "Can you use any picture from the internet?|only if you have permission or it says it is free to use|always|never", "What does 'credit' mean?|say who made the work|pay money|erase the name", "What is plagiarism?|using someone's work as your own|writing in your own words|reading a book",
    "What is a safe way to use ideas from a book?|write them in your own words and name the book|copy the pages|skip the title", "What should you do before sharing someone's photo?|ask their permission|post it fast|crop their face"],
    ["Think about being fair to the person who made the work.", "Make your own words, name your sources, and ask permission when you are not sure.", "Example: you read a fact in a book. Write it in your words and say the book name. Now do yours."],
    [["Respect work", "🎨", "Pictures, stories and music belong to the people who made them."], ["Credit", "🏷️", "Say <b>who made it</b> and where you found it."], ["Your own words", "✏️", "Write what you learned in <b>your own words</b>."]]);
  const L7 = [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18,
    MIX("Mixed practice", D1, D3, D4, D6, D7, D9, D10, D11, D12, D13, D16, D18),
    MIX("Level 7 Challenge", D2, D4, D5, D7, D8, D10, D12, D14, D15, D17, D18, D3)];

  // =============== LEVEL 8 ===============
  const E1 = ty("Type two sentences", "Type both sentences.",
    ["the bus arrived late. we waited by the gate.", "i found a coin. it was shiny and old.", "our class made a robot. it can roll and turn.", "the garden is green. bees buzz near the flowers.", "i practiced typing. now my speed is better.", "she drew a map. it shows the way home.", "the storm passed. the sun came out again.", "he saved his work. then he closed the file."],
    ["Type the first sentence, then press space and type the second.", "There are {w} words and it starts with \"{f}\". Each sentence ends with a period.", "Example: for \"go home. eat soup.\", type go home, a period, a space, then eat soup and a period. Now type yours."],
    [["Two sentences", "📝", "After a period, press <b>space once</b> and begin the next sentence."], ["Keep a rhythm", "🥁", "Steady taps beat fast, messy ones."], ["Tip", "💡", "Look at the screen words, not at your fingers."]], cap);
  const E2 = ty("Words with tricky letters", "Type this word carefully.",
    ["quick", "jacket", "quiz", "zigzag", "fizzy", "jungle", "exactly", "squeeze", "waxing", "puzzle", "mixture", "jewelry", "quality", "oxygen", "buzzing", "vacuum", "kayak", "gazelle"],
    ["Say the word slowly, then find the rare letters on the keyboard.", "The word has {n} letters and starts with \"{f}\". Reach for Q, Z, X, J and V without looking.", "Example: for the word <b>jazz</b>, reach with the right pointer finger for J, then A, then Z two times. Now type yours."],
    [["Rare letters", "🔠", "Q, Z, X, J, K and V are used less. They need practice."], ["Reaches", "🖐️", "Use the finger that is closest to the key, then <b>return home</b>."], ["Tip", "💡", "Practice the hard letters a little each day."]]);
  const E3 = num("How long will it take?", "⏳", () => {
    const wpm = pick([10, 15, 20, 25, 30, 40, 50]), m = ri(2, 6), w = wpm * m;
    return [`A story has ${w} words. You type ${wpm} words per minute. How many minutes will it take?`, m];
  }, ["Think about how many words you type each minute.", "Divide the total words by how many words you type in one minute.", "Example: 120 words at 20 words per minute is 120 / 20 = 6 minutes. Now do yours."],
    [["Plan your time", "📅", "Speed lets you guess how long a job will take."], ["Divide", "➗", "Total words / words per minute = <b>minutes</b>."], ["Real life", "🌟", "Faster typing leaves more time for ideas."]]);
  const E4 = num("Typing improvement", "📈", () => {
    const a = ri(10, 25), g = ri(2, 5), wk = ri(3, 6);
    return [`Ava types ${a} WPM now and improves by ${g} WPM every week. What will her speed be after ${wk} weeks?`, a + g * wk];
  }, ["Find how much she gains in total, then add that to where she starts.", "Multiply the gain each week by the number of weeks, then add the starting speed.", "Example: start at 12 WPM, gain 3 each week for 4 weeks. 3 x 4 = 12 more, so 12 + 12 = 24 WPM. Now do yours."],
    [["Practice pays", "🏋️", "A little practice each day makes you faster over time."], ["Math it out", "🧮", "Total gain = weekly gain x weeks."], ["Goal", "🎯", "Set a goal and track your speed every week."]]);
  const E5 = mc("Eyes on the screen", "👀", [
    "What is touch typing?|typing without looking at the keys|typing with one finger|typing on a touch screen only", "Why is looking at the screen better than the keys?|you spot mistakes as you type|the keys disappear|it is slower", "Which fingers press the space bar?|thumbs|pinkies|index fingers only",
    "What should your fingers do after reaching?|return to the home row|stay up high|rest on the mouse", "Which is better when learning?|accuracy first, then speed|speed first|neither", "What helps build muscle memory?|short daily practice|one long session a month|never practicing",
    "Which keys have small bumps?|F and J|A and S|Q and P", "What if you make a mistake?|fix it with Backspace and keep going|start the whole text over|give up"],
    ["Think about what good typists do with their eyes and fingers.", "Good typists use all ten fingers, keep eyes on the text, and return to the home row.", "Example: the bumps on F and J help you find the home row without looking. Now do yours."],
    [["Touch typing", "👆", "Type without looking at your hands."], ["Home row", "🏠", "Reach, press, and <b>return to the home row</b>."], ["Accuracy first", "🎯", "Speed comes naturally after accuracy."]]);
  const E6 = mc("Special keys", "🔑", [
    "Which key deletes the character to the left of the cursor?|Backspace|Tab|Esc", "Which key jumps to the start of a line?|Home|End|Enter", "Which key makes ALL letters capital until pressed again?|Caps Lock|Shift|Tab",
    "Which key often cancels a pop-up or menu?|Esc|Enter|Space", "Which key moves the cursor to the next tab stop or next box?|Tab|Alt|Delete", "Which key starts a new line or paragraph?|Enter|Esc|Ctrl",
    "Which key deletes the character to the right of the cursor?|Delete|Backspace|Home", "Which keys move the cursor around?|arrow keys|function keys|number pad only"],
    ["Think about what each special key's name says.", "Some keys move, some delete, and some change the next letters you type.", "Example: End jumps to the end of a line, while Home jumps to its start. Now do yours."],
    [["Edit keys", "✂️", "<b>Backspace</b> deletes to the left. <b>Delete</b> deletes to the right."], ["Move keys", "↔️", "<b>Home</b> and <b>End</b> jump across a line. Arrows move one step."], ["Other keys", "🗝️", "<b>Esc</b> cancels, <b>Tab</b> moves forward, <b>Caps Lock</b> locks capitals."]]);
  const E7 = mc("Symbols we use", "🔣", [
    "Which symbol is in every email address?|the at sign (@)|the hash sign (#)|the percent sign (%)", "Which symbol is used for hashtags?|the hash sign (#)|the at sign (@)|the and sign (&)", "Which symbol means 'and'?|the ampersand (&)|the percent sign (%)|the dollar sign ($)",
    "Which symbol means percent?|the percent sign (%)|the dollar sign ($)|the hash sign (#)", "Which one is a forward slash, found in web addresses?|the slash (/)|the backslash (\)|the colon (:)", "Which key do you press with Shift to make a question mark?|the slash key|the comma key|the number 5 key",
    "Which key combination types a dollar sign on many keyboards?|Shift + 4|Shift + 1|Shift + 9", "Which symbol is used in a username like cool_gamer?|the underscore|the tilde|the caret"],
    ["Think about where you have seen the symbol being used.", "Special symbols are made with Shift and a number key or are near the Enter key.", "Example: the star * is used in games to mean 'times' in math. Now do yours."],
    [["Shift symbols", "⬆️", "Hold <b>Shift</b> and press a number to get symbols above it."], ["At sign", "📧", "<b>@</b> goes in email addresses, between the name and the site."], ["Slashes", "➗", "A <b>forward slash</b> (/) is in web addresses. A backslash (\\) is in file paths."]]);
  const E8 = num("Cell references", "🧮", () => {
    const a = ri(3, 15), b = ri(2, 9), op = pick(["+", "*", "-"]), A = op === "-" ? a + b : a;
    const r = op === "+" ? A + b : op === "*" ? A * b : A - b;
    return [`In a spreadsheet, what does =A1${op}B1 give?`, r, sheet([A, b])];
  }, ["Read the two cell values first, then do the math the formula says.", "A plus adds, a star multiplies, and a minus takes away. The first cell goes first.", "Example: A1 = 6, B1 = 2. =A1*B1 is 6 x 2 = 12, and =A1-B1 is 6 - 2 = 4. Now do yours."],
    [["Cell names", "🔲", "A cell name is column letter + row number, like <b>B3</b>."], ["Operators", "➕", "<b>+</b> adds, <b>-</b> subtracts, <b>*</b> multiplies, <b>/</b> divides."], ["Update", "🔄", "Change a cell and every formula using it updates."]]);
  const E9 = num("Sum a range", "📊", () => {
    const n = ri(3, 5), v = Array.from({ length: n }, () => ri(2, 15));
    const s = v.reduce((x, y) => x + y, 0);
    if (Math.random() < 0.5) return [`=SUM(A1:${"ABCDEF"[n - 1]}1) adds the cells in the range. What is the answer?`, s, sheet(v)];
    return [`How many cells are in the range A1:${"ABCDEF"[n - 1]}1?`, n, sheet(v)];
  }, ["A range is a group of cells in a line. Count or add every cell from the first to the last.", "SUM adds all cells from the start to the end of the range. Count both ends.", "Example: A1 = 2, B1 = 5, C1 = 3. =SUM(A1:C1) is 2 + 5 + 3 = 10, and the range has 3 cells. Now do yours."],
    [["Range", "📏", "A <b>range</b> like A1:D1 means every cell from A1 to D1."], ["SUM", "➕", "<b>=SUM(A1:D1)</b> adds them all at once."], ["Other helpers", "🧰", "AVERAGE finds the mean, MAX the biggest, MIN the smallest."]]);
  const E10 = mc("Choosing a chart", "📈", [
    "Which chart is best to compare how many pets each friend has?|bar chart|pie chart|map", "Which chart shows how something changes over time?|line graph|pie chart|bar of soap", "Which chart shows parts of a whole, like how a pizza is split?|pie chart|line graph|table",
    "What does the height of a bar show?|the amount|the color|the title", "What is a chart title for?|to tell what the chart shows|to make it pretty|to hide data", "Why label the axes?|so people know what the numbers mean|to fill space|to hide the numbers",
    "Which chart best shows daily temperature all week?|line graph|pie chart|photo", "In a pie chart, the biggest slice is...|the most|the least|the oldest"],
    ["Think about what you want the chart to show.", "Bars compare amounts, lines show change over time, and pies show parts of a whole.", "Example: to show how your plant grows each week, a line graph works well. Now do yours."],
    [["Bar chart", "📊", "<b>Bars</b> compare amounts between groups."], ["Line graph", "📈", "A <b>line</b> shows change over time."], ["Pie chart", "🥧", "A <b>pie</b> shows parts of a whole."]]);
  const E11 = mc("Edit your writing", "📝", [
    "What is the first step of writing?|plan your ideas|print it|add pictures", "What is a draft?|your first try at writing|the final copy|a title", "What is proofreading?|checking for spelling and grammar mistakes|printing|choosing a font",
    "Why can spell check miss errors?|a real word can be the wrong word, like 'their' and 'there'|it is always perfect|it only checks numbers", "Which should you do after finishing a draft?|read it again and improve it|publish it right away|delete it", "Which comes last?|publish or share the final copy|plan|draft",
    "Which sentence needs fixing: 'Their going to the park'?|They're going to the park|Their going to the park.|Theyre going to a park", "Why read your writing out loud?|you hear mistakes you missed|it uses more paper|it is quicker"],
    ["Think of the order: plan, write, fix, share.", "Spell check helps but does not know what you mean. Read it yourself.", "Example: 'I can sea the boat' has a real word used wrongly. Spell check might miss it. Now do yours."],
    [["Steps", "🪜", "<b>Plan</b>, <b>draft</b>, <b>revise</b>, <b>proofread</b>, <b>publish</b>."], ["Spell check", "✅", "It catches many errors but not all. Read it yourself too."], ["Read aloud", "🗣️", "Reading out loud helps you hear what is wrong."]]);
  const E12 = mc("Web addresses", "🌐", [
    "In https://www.example.com, which part is the domain name?|example.com|https|www.", "What does the 's' in https mean?|the connection is secure|super fast|sports", "What is a URL?|a web address|a virus|a keyboard shortcut",
    "Which ending is often a school?|.edu|.com|.zip", "Which ending is often a government site?|.gov|.edu|.shop", "What does the padlock in the address bar mean?|the connection is protected|the page is always true|the page is for adults",
    "What should you check before typing a password on a site?|that the address is correct|that it has a colorful design|that it has ads", "A web address with odd spelling like examp1e.com might be...|fake or tricky|always safe|a school"],
    ["Think about the parts of a web address.", "The domain name is the main part of the site. Secure sites use https.", "Example: in https://www.school.edu, 'school.edu' is the domain and the .edu ending suggests a school. Now do yours."],
    [["Parts", "🧩", "A web address has a <b>protocol</b> (https), a <b>domain</b> (example.com) and sometimes a page."], ["Secure", "🔒", "<b>https</b> and a padlock mean the connection is protected."], ["Look closely", "🔎", "Odd spelling can mean a <b>fake site</b>."]]);
  const E13 = num("Code with variables", "💻", () => {
    const a = ri(3, 12), b = ri(2, 8), c = ri(2, 6), pat = ri(0, 2);
    if (pat === 0) return [`x = ${a}\nx = x + ${b}\nWhat is x now?`.replace(/\n/g, "<br>"), a + b];
    if (pat === 1) return [`score = ${a + b}\nscore = score - ${b}\nWhat is score now?`.replace(/\n/g, "<br>"), a];
    return [`n = ${b}\nn = n * ${c}\nWhat is n now?`.replace(/\n/g, "<br>"), b * c];
  }, ["Follow the code one line at a time, from top to bottom.", "Each line changes the variable. Use the new value for the next line.", "Example: y = 5, then y = y + 4. y becomes 9. Now do yours."],
    [["Step by step", "👣", "Computers run code <b>one line at a time</b>, top to bottom."], ["Update", "🔁", "x = x + 1 means: take x, add one, store it back."], ["Trace it", "🔎", "Write down the value after each line."]]);
  const E14 = mc("Is it true?", "🕵️", [
    "What should you check about a page?|the author and the date|the color|the font", "Which source is most reliable for facts?|a trusted encyclopedia or school site|a random comment|an ad", "What is a good first step if a claim sounds surprising?|check another trusted source|share it fast|believe it",
    "Why compare two sources?|to see if they agree|to save time|to get ads", "What does 'biased' mean?|leaning toward one side|very long|written in red", "Which is a red flag?|no author and many ads|a named expert|a clear date",
    "Which is an opinion?|This is the best game ever|The Earth orbits the Sun|Water boils at 100 C at sea level", "Where should you start research as a kid?|trusted sites a teacher or parent suggests|any link from a stranger|a pop-up"],
    ["Think about how you can check whether information is true.", "Trusted sources name the author and date and agree with other trusted sources.", "Example: if a site says dogs can fly, check a trusted animal book. They will not agree, so the site is wrong. Now do yours."],
    [["Who and when", "👤", "Find <b>who wrote it</b> and <b>when</b>."], ["Compare", "⚖️", "Check at least <b>two good sources</b>."], ["Facts vs opinions", "💭", "A fact can be checked. An opinion is what someone thinks."]]);
  const E15 = mc("File types for media", "🎞️", [
    "Which file type is usually a photo?|JPG|MP3|PDF", "Which file type is usually music?|MP3|PNG|DOCX", "Which file type is usually a video?|MP4|MP3|TXT",
    "Which is good for a document that looks the same on every device?|PDF|MP3|PNG", "What does zipping a file do?|makes it smaller or bundles files together|makes it louder|makes it a picture", "Which file ending is a plain text file?|TXT|JPG|MP4",
    "Which is the best choice for a picture with a see-through background?|PNG|MP3|TXT", "What happens to a very big video when you email it?|it may be too large to send|it gets smaller on its own|it changes into a song"],
    ["Think about what each ending stands for.", "The letters after the dot tell you the kind of file and what program opens it.", "Example: .wav is an audio file, so it makes sound, while .gif is a picture. Now do yours."],
    [["Endings", "🏷️", "The letters after the dot are the <b>file type</b>."], ["Common types", "🗃️", "<b>JPG/PNG</b> pictures, <b>MP3</b> sound, <b>MP4</b> video, <b>PDF</b> documents."], ["Zip", "🤐", "<b>Zip</b> bundles and squeezes files."]]);
  const E16 = mc("Strong accounts", "🔐", [
    "Which password is strongest?|blue-Tiger-Moon-42|password|abc123", "What is two-step verification?|a second check like a code, as well as a password|two passwords the same|a type of virus", "Should you use the same password everywhere?|no, use different ones|yes|only for games",
    "Who can you tell your passwords to?|a parent or trusted guardian|friends at school|anyone who asks", "What is a passphrase?|a few random words joined together|your pet's name only|a short number", "What should you do if someone learns your password?|change it and tell a parent|ignore it|post about it",
    "Where should you NOT write your password?|on a sticky note on the screen|in a safe place at home|nowhere", "What is a password manager?|a safe tool that stores passwords|a game|a type of keyboard"],
    ["Think about how hard a password is to guess.", "Long, unique passwords with different words, numbers and symbols are best. Never share them.", "Example: 'sun' is easy to guess, but 'Sun-Pickle-Rocket-19' is much harder. Now do yours."],
    [["Long and unique", "🧱", "Long passwords made of <b>several words</b> are strong."], ["Different each time", "🔁", "Use a <b>different password</b> for each account."], ["Keep secret", "🤫", "Only share with a parent or guardian."]]);
  const E17 = mc("Online manners", "🤝", [
    "What does typing in ALL CAPS often seem like?|shouting|whispering|singing", "Before posting, you should...|think about how it will make others feel|post fast|add more capitals", "What should you do if you are unsure what someone meant?|ask kindly|assume the worst|reply with an insult",
    "Is it polite to share someone's secret?|no|yes|only if it is funny", "What is 'Reply All' for?|answering everyone who got the email|answering one person|deleting the email", "When is it best to use 'Reply All'?|when everyone needs the answer|always|never ever",
    "Which message is kind?|Great job on your project!|That was awful.|Whatever.", "In a group chat, what is a good rule?|take turns and be respectful|talk over everyone|send many messages fast"],
    ["Think about how your words feel to the person reading them.", "Online, people cannot see your face, so clear, kind words matter.", "Example: 'Nice try! You can do it' sounds kind. 'You are bad' does not. Now do yours."],
    [["Netiquette", "💬", "<b>Netiquette</b> means good manners online."], ["Tone", "🎭", "CAPITALS can sound like shouting. Use them sparingly."], ["Think first", "🧠", "Think before you press Send."]]);
  const E18 = mc("Ports and storage", "🔌", [
    "Which port is commonly used for a USB drive?|USB|HDMI|headphone jack only", "Which port often sends video to a TV?|HDMI|USB-A|power only", "Which holds more, a GB or a MB?|GB|MB|they are equal",
    "What is cloud storage?|saving files on computers on the internet|saving on paper|a weather report", "Which keeps its files when powered off?|storage|memory (RAM) only|the screen", "What is a backup?|an extra copy of important files|a broken file|a game level",
    "What is Wi-Fi?|wireless internet|a type of battery|a keyboard", "What does a router do?|shares the internet with devices|prints|plays sound only"],
    ["Think about what each part connects or stores.", "Ports connect devices. Storage keeps files. A router shares the internet.", "Example: a headphone jack connects headphones so you can hear sound. Now do yours."],
    [["Ports", "🔌", "<b>USB</b> connects many devices. <b>HDMI</b> sends video."], ["Storage", "💾", "Your files live in storage. MB is small, GB is big."], ["Network", "📶", "A <b>router</b> shares the internet by Wi-Fi or cable."]]);
  const L8 = [E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17, E18,
    MIX("Mixed practice", E1, E3, E4, E6, E8, E9, E10, E12, E13, E14, E16, E17),
    MIX("Level 8 Challenge", E2, E4, E5, E7, E9, E11, E13, E15, E16, E18, E12, E3)];

  // =============== LEVEL 9 ===============
  const F1 = ty("Type with numbers", "Type this sentence exactly.",
    ["there are 24 hours in 1 day.", "i have 3 cats and 2 dogs.", "the game starts at 7 o'clock.", "we sold 15 cups for 2 dollars each.", "room 12 is on the 3rd floor.", "my new password has 8 characters.", "the trip is 45 miles long.", "she scored 90 points in 5 rounds."],
    ["Type word by word. When you reach a number, use the number row.", "There are {w} words and it starts with \"{f}\". Look for each digit before you type it.", "Example: for \"i am 9 and have 4 pens.\", type the words and use the number row for 9 and 4. Now type yours."],
    [["Number row", "1️⃣", "Reach up to the number row, then <b>return home</b>."], ["Mix it up", "🔀", "Switch between letters and numbers smoothly."], ["Tip", "💡", "Say the number in your head as you press it."]], cap);
  const F2 = ty("Type a line of code", "Type this line of code exactly.",
    ["print hello", "score = 10", "if lives == 0", "repeat 5 times", "let x = 3", "name = bob", "x = x + 1", "for i in range 4", "while true", "set speed to 8", "else", "move forward 10"],
    ["Code must be exact. Check every character before you press it.", "The line has {n} characters without spaces and starts with \"{f}\". Take care with equal signs and spaces.", "Example: for the line <b>y = 2</b>, type y, a space, the equal sign, a space, and 2. Now type yours."],
    [["Exact typing", "🎯", "Code needs <b>exact</b> spelling, spaces and symbols."], ["Symbols", "🔣", "The equal sign is to the right of the number row. Use Shift for + signs."], ["Check", "🔍", "Read what you typed before running it."]]);
  const F3 = num("Words per minute", "⏱️", () => {
    const w = ri(60, 300), m = pick([2, 3, 4, 5]), t = w * m;
    return [`Eli typed ${t} words in ${m} minutes. What is his WPM?`, w];
  }, ["Divide by the number of minutes to find the average per minute.", "Words per minute is the total words divided by the minutes.", "Example: 90 words in 3 minutes is 90 / 3 = 30 WPM. Now do yours."],
    [["WPM", "⏱️", "<b>Words per minute</b> measures how fast you type."], ["Formula", "🧮", "WPM = words / minutes."], ["Averages", "📊", "Your speed is an average over the whole test."]]);
  const F4 = num("Net speed and mistakes", "🎯", () => {
    const m = pick([2, 3, 4, 5]), k = ri(20, 60), e = ri(2, 10);
    return [`Zoe typed ${k * m + e} words in ${m} minutes and made ${e} errors. What is her net WPM? (net = (words - errors) / minutes)`, k];
  }, ["Errors reduce your score. Subtract them before you divide.", "Take the errors away from the words typed, then divide by the minutes.", "Example: 130 words, 10 errors, 4 minutes. 130 - 10 = 120. 120 / 4 = 30 net WPM. Now do yours."],
    [["Net WPM", "🎯", "<b>Net WPM</b> counts only the correct work."], ["Steps", "🪜", "Subtract errors, then divide by minutes."], ["Goal", "🏁", "Aim for high accuracy and then speed."]]);
  const F5 = num("Reach a goal", "🏁", () => {
    const s = ri(20, 40), g = ri(2, 5), wk = ri(3, 8), t = s + g * wk;
    return [`Noah types ${s} WPM and wants to reach ${t} WPM. He improves ${g} WPM each week. How many weeks will it take?`, wk];
  }, ["Find how many WPM he still needs to gain.", "Subtract the starting speed from the goal, then divide by the weekly gain.", "Example: from 20 to 50 WPM at 5 per week: 50 - 20 = 30, and 30 / 5 = 6 weeks. Now do yours."],
    [["Set goals", "🎯", "A clear goal keeps you motivated."], ["Gap", "📏", "The gap = goal - starting speed."], ["Weeks", "📅", "Weeks = gap / weekly gain."]]);
  const F6 = mc("Ways to enter text", "🎙️", [
    "Voice dictation turns what into text?|your spoken words|your thoughts|your mouse moves", "What can go wrong with voice dictation?|it may misunderstand words|it never works|it prints paper", "Why proofread after dictating?|to fix wrong words|to make it louder|to erase it",
    "Which layout is the standard English keyboard?|QWERTY|ABCDEF|ZYXWVU", "A phone keyboard on a touchscreen is called...|an on-screen keyboard|a wired keyboard|a mouse", "Which is quiet and good in a library?|typing|shouting dictation|speaking loudly",
    "What is a keypad?|a block of number keys|a printer|a charger", "What helps someone who cannot use a keyboard well?|dictation or other accessibility tools|nothing|quitting"],
    ["Think about the different ways to get words into a computer.", "Typing, tapping and speaking all work. Each one has strengths and limits.", "Example: dictation is fast but may mishear names, so you check it. Now do yours."],
    [["Typing", "⌨️", "Keyboards are accurate and quiet."], ["Voice", "🎙️", "<b>Dictation</b> turns speech into text, but needs checking."], ["Accessibility", "♿", "Many tools help people type in different ways."]]);
  const F7 = num("Sum of a column", "📊", () => {
    const n = ri(3, 5), v = Array.from({ length: n }, () => ri(3, 25)), s = v.reduce((a, b) => a + b, 0);
    const html = `<span style="font-size:1.2em;font-weight:bold">${v.map((x, i) => "A" + (i + 1) + " = " + x).join("&nbsp;&nbsp; ")}</span>`;
    return [`What does =SUM(A1:A${n}) give?`, s, html];
  }, ["A colon in a range means 'from this cell to that cell'.", "Add every cell from the first to the last in the column.", "Example: A1 = 5, A2 = 9, A3 = 2. =SUM(A1:A3) = 5 + 9 + 2 = 16. Now do yours."],
    [["Columns", "↕️", "A column goes up and down. Its cells are A1, A2, A3 and so on."], ["SUM", "➕", "<b>=SUM(A1:A5)</b> adds the whole range."], ["Why use it", "⏩", "It is faster than typing each plus sign."]]);
  const F8 = num("Average in a spreadsheet", "📏", () => {
    const n = pick([3, 4, 5]), avg = ri(5, 20), v = [];
    let left = avg * n;
    for (let i = 0; i < n - 1; i++) { const x = ri(Math.max(1, avg - 4), avg + 4); v.push(x); left -= x; }
    if (left < 1) { return [`What does =AVERAGE(A1:C1) give?`, 6, sheet([4, 6, 8])]; }
    v.push(left);
    return [`=AVERAGE(A1:${"ABCDEF"[n - 1]}1) adds the cells and divides by how many there are. What does it give?`, avg, sheet(v)];
  }, ["The average is the total shared fairly between the cells.", "Add all the values, then divide by how many cells there are.", "Example: 4, 7 and 10 add up to 21. 21 / 3 = 7. Now do yours."],
    [["Average", "⚖️", "The <b>average</b> is the total divided by how many numbers there are."], ["Function", "🧰", "<b>=AVERAGE(A1:C1)</b> does it for you."], ["Use", "📚", "Averages show what is typical."]]);
  const F9 = mc("Document layout", "📄", [
    "What is a heading for?|to show the topic of a section|to make text smaller|to delete text", "What does line spacing change?|the space between lines|the font|the file name", "What are margins?|the empty space around the edges of a page|the page numbers|the spelling",
    "What does 'justify' do?|lines up text on both sides|makes text bold|deletes extra spaces", "What does a table of contents show?|where sections can be found|the author's name|the font size", "Which makes a list easier to read?|bullet points|one long paragraph|small fonts",
    "What do page numbers help with?|finding your place|spell checking|saving", "What should a title look like?|bigger and clear|smaller than the text|the same color as the page"],
    ["Think about how a page is arranged.", "Headings, spacing and lists help readers find and understand things quickly.", "Example: a big heading above a paragraph tells readers what comes next. Now do yours."],
    [["Headings", "🔠", "<b>Headings</b> split a long document into parts."], ["Space", "↕️", "<b>Margins</b> and <b>line spacing</b> keep a page easy to read."], ["Lists", "📋", "Use <b>bullet points</b> for short items."]]);
  const F10 = mc("Find and fix", "🔎", [
    "What does Find do?|looks for a word in your document|deletes a word|prints", "What does Find and Replace do?|swaps one word for another everywhere|only counts words|saves", "What does Word Count show?|how many words you wrote|the font|the file size",
    "What does a red wavy line under a word usually mean?|a possible spelling mistake|the word is bold|the word is a title", "What does a blue or green wavy line often mean?|a possible grammar problem|a picture|a link", "What does Undo do?|reverses your last change|deletes the file|prints",
    "What should you do with a wavy line?|check if it is really wrong|always trust it|always ignore it", "Why use Find and Replace?|to fix the same mistake in many places|to change one letter|to close the file"],
    ["Think about the tool's name and what it would do.", "These tools save time, but you still need to check the results yourself.", "Example: if you wrote 'teh' many times, Find and Replace fixes all of them at once. Now do yours."],
    [["Find", "🔍", "<b>Find</b> jumps to every place a word appears."], ["Replace", "🔁", "<b>Replace</b> swaps words everywhere."], ["Check", "✅", "Wavy lines are <b>suggestions</b>. You decide."]]);
  const F11 = mc("Using other people's work", "📚", [
    "What does paraphrasing mean?|explaining an idea in your own words|copying exactly|deleting it", "When must you use quotation marks?|when you copy someone's exact words|when you paraphrase|never", "What is a source?|where you found information|a type of font|a file ending",
    "What is a citation?|a note saying where information came from|a mistake|a title", "What does 'free to use' usually mean for a picture?|the owner allows others to use it, sometimes with credit|you can say you made it|it has no author", "Why ask permission?|the creator may not want it shared|it is a rule only for adults|it makes files smaller",
    "Which is plagiarism?|copying a paragraph and not saying where it came from|using a fact and naming the book|writing from memory in your words", "Which is the best way to use a quote?|short, in quotation marks, with the name|long, with no name|changed so no one notices"],
    ["Think about being honest about whose ideas they are.", "Use your own words, put exact words in quotes, and say where information came from.", "Example: if you read that owls hunt at night, write it your way and name the book. Now do yours."],
    [["Source", "📖", "A <b>source</b> is where you found your information."], ["Quote or paraphrase", "💬", "Quote: exact words in <b>quotation marks</b>. Paraphrase: <b>your own words</b>."], ["Be honest", "🌟", "Always say where ideas came from."]]);
  const F12 = num("Binary numbers", "🔢", () => {
    const n = ri(2, 15), b = n.toString(2).padStart(4, "0");
    return [`Computers use binary. Each place is worth 8, 4, 2, 1 from left to right. What number is ${b}?`, n, big(b, 2.2)];
  }, ["Match each digit to its place value. A 1 means that place counts.", "Add the place values that have a 1 and ignore the places with a 0.", "Example: 0110 has 1s in the 4 and 2 places. 4 + 2 = 6. Now do yours."],
    [["Bits", "💡", "A computer stores everything with <b>0s and 1s</b> called bits."], ["Places", "🔢", "From the right the places are 1, 2, 4, 8..."], ["Add up", "➕", "Add the places that have a <b>1</b>."]]);
  const F13 = num("Bytes and bigger", "💾", () => {
    const t = ri(0, 2);
    if (t === 0) { const g = ri(2, 9); return [`A GB is 1000 MB. How many MB are in ${g} GB?`, g * 1000]; }
    if (t === 1) { const m = ri(2, 9); return [`A MB is 1000 KB. How many KB are in ${m} MB?`, m * 1000]; }
    const p = ri(2, 8), n = ri(3, 9); return [`A song file is ${p} MB. How many MB do ${n} songs use?`, p * n];
  }, ["Look for whether the question asks about a bigger or smaller unit.", "Bigger units are made of a thousand smaller ones. Multiply to go smaller.", "Example: 5 GB x 1000 = 5000 MB. And 4 songs at 3 MB each is 12 MB. Now do yours."],
    [["Units", "📏", "<b>KB</b> is small, <b>MB</b> is bigger, <b>GB</b> is bigger still."], ["1000 rule", "✖️", "Each unit is about <b>1000</b> of the one below."], ["Planning", "🗄️", "Check how much room you have before saving big files."]]);
  const F14 = mc("Big ideas in code", "🧠", [
    "A loop is code that...|repeats|stops forever|is a bug", "A function is...|a named set of steps you can reuse|a type of bug|a screen", "What is a bug?|a mistake in code|a feature|a keyboard",
    "What does debugging mean?|finding and fixing mistakes|writing more code|saving", "An algorithm is...|a set of steps to solve a problem|a computer part|a game level", "Repeat 3 times: clap. How many claps?|3|1|0",
    "What does 'if' do in code?|chooses what runs based on a condition|repeats code|prints", "Why use a function?|so you don't repeat the same steps|to make code bigger|to delete bugs"],
    ["Think about what each coding word means.", "Algorithms are steps, loops repeat, functions are reusable steps, and debugging fixes mistakes.", "Example: a loop that says 'jump 4 times' makes a character jump four times. Now do yours."],
    [["Algorithm", "📜", "An <b>algorithm</b> is step-by-step instructions."], ["Loop and function", "🔁", "A <b>loop</b> repeats. A <b>function</b> is a named set of steps."], ["Debug", "🐞", "<b>Debugging</b> means finding and fixing mistakes."]]);
  const F15 = mc("How the web works", "🕸️", [
    "What is a web server?|a computer that stores websites|a keyboard|a type of mouse", "What is a browser?|a program to view websites|a website|a cable", "What does clicking a link do?|loads another page|deletes the page|turns off Wi-Fi",
    "What does HTTPS add?|protection for your data on the connection|more ads|more colors", "Which is a popular web browser?|Chrome|Excel|Notepad", "What is HTML?|the code that structures a web page|a virus|a keyboard shortcut",
    "What is an IP address?|a number that identifies a device on a network|a postal address|a password", "Where do websites live?|on servers|inside the keyboard|in the mouse"],
    ["Think about how a page gets from a computer far away to your screen.", "A server holds the page, a browser asks for it, and the network carries it between them.", "Example: you type a web address, the browser asks a server, and the server sends the page back. Now do yours."],
    [["Server and browser", "🖥️", "A <b>server</b> stores websites. A <b>browser</b> shows them."], ["HTML", "🧱", "<b>HTML</b> is the code that builds a page."], ["Secure", "🔒", "<b>HTTPS</b> protects the connection."]]);
  const F16 = mc("Online security habits", "🛡️", [
    "Is public Wi-Fi safe for passwords?|not always, so avoid it|always|only at night", "What is social engineering?|tricking people into giving information|a school subject|a type of Wi-Fi", "A message says you won a prize and asks for your address. What now?|ignore it and tell an adult|send it|reply with a photo",
    "What should you do with a strange attachment?|do not open it and tell an adult|open it|forward it", "What does two-step verification protect?|your account even if the password leaks|your screen|your keyboard", "Why log out on a shared computer?|so others can't use your account|to save power|to clear the cache",
    "A friend's account suddenly sends a weird link. What should you do?|don't click and tell them|click it|share it", "What is a good habit with updates?|install them with an adult's help|never update|delay forever"],
    ["Think about how to keep your accounts and private information safe.", "Tricks try to rush you. Slow down, do not click, and ask a trusted adult.", "Example: an email says 'urgent, send your password'. That is a trick, so you tell a parent. Now do yours."],
    [["Think first", "🧠", "Tricks try to rush you. <b>Slow down</b>."], ["Protect accounts", "🔐", "Use <b>strong passwords</b> and two-step verification."], ["Tell an adult", "🧑‍🏫", "If something seems odd, <b>stop and ask</b>."]]);
  const F17 = mc("Smart helpers (AI)", "🤖", [
    "Can an AI helper make mistakes?|yes, so check important facts|never|only on Mondays", "Should you give an AI tool your address and school?|no, keep private details private|yes|only the school", "Is it OK to copy an AI answer for homework and say you wrote it?|no, that is not honest|yes|if it is long",
    "What is a good way to use AI for learning?|ask it to explain, then try it yourself|have it do all your work|never think", "Who should help you decide if an AI tool is safe?|a parent or teacher|a stranger|an ad", "How can you double-check an AI answer?|compare it with a trusted source|believe it|ignore it",
    "AI is trained on...|lots of examples and data|magic|a single book", "Who is responsible for your work?|you|the AI|nobody"],
    ["Think about being safe, honest and careful with smart tools.", "AI can help, but it can be wrong. Keep private information private and check facts.", "Example: if an AI says a strange fact, look it up in a trusted book to make sure. Now do yours."],
    [["Helpful", "🤝", "AI can help you learn when you use it with a grown-up's okay."], ["Not perfect", "⚠️", "AI can be <b>wrong</b>. Always check."], ["Be honest", "🌟", "Do your own thinking and keep <b>private info private</b>."]]);
  const F18 = mc("Healthy tech habits", "🌱", [
    "How often should you take screen breaks?|regularly, such as every 20 minutes for eyes|never|only on weekends", "Which is a healthy tech habit?|setting time limits with your family|staying up all night|skipping meals", "What is a good use of tech?|creating, learning and connecting safely|only scrolling|bothering others",
    "What should you do if tech makes you upset?|take a break and talk to someone|keep going|get angry at people", "Why keep devices out of bed?|screens can disturb sleep|they are heavy|they get cold", "What helps your posture?|sitting up with your back supported|lying on the floor|bending over",
    "What is a good rule at dinner?|put devices away|use games|watch videos", "What is digital balance?|mixing tech time with other activities|only tech|no tech ever"],
    ["Think about how tech fits into a healthy day.", "Balance, breaks and good sleep keep your body and mind well.", "Example: after an hour of homework on a laptop, stand up, stretch and look out a window. Now do yours."],
    [["Balance", "⚖️", "Mix tech with <b>play, sleep and friends</b>."], ["Breaks", "⏰", "Rest your eyes and body often."], ["Talk", "💬", "If tech upsets you, <b>talk to a trusted adult</b>."]]);
  const L9 = [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16, F17, F18,
    MIX("Mixed practice", F1, F2, F3, F4, F7, F8, F9, F11, F12, F13, F15, F16),
    MIX("Level 9 Challenge", F3, F5, F6, F7, F8, F10, F12, F13, F14, F16, F17, F18)];

  Object.assign(TYPING_LEVELS, { 7: L7, 8: L8, 9: L9 });
})();
