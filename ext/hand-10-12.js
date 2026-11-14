// ext/hand-10-12.js  Mind Lab Handwriting, levels 10-12 (60 lessons)
(() => {
  const mk = (title, vis, rows, hints, slides) => {
    const rs = rows.map(r => r.split("|"));
    const make = () => {
      const [text, ans, ...wr] = pick(rs);
      return { text, visual: vis, choices: shuf([ans, ...wr]), answer: ans, hints: hints.slice() };
    };
    make.teach = () => slides.map(([h, v, t]) => ({ h, v, t }));
    return { title, make };
  };
  const calc = (title, vis, gen, slides) => {
    const make = () => { const q = gen(); q.visual = vis; return q; };
    make.teach = () => slides.map(([h, v, t]) => ({ h, v, t }));
    return { title, make };
  };
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of each idea, then the quiz." }].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };

  // =============== LEVEL 10 ===============
  const G1 = mk("Opinion paragraphs", "📣", [
    "Which sentence states an <b>opinion</b>?|Summer is the best season.|Summer follows spring.|Summer has three months.",
    "Which sentence is a <b>fact</b>?|A week has seven days.|Mondays are boring.|Rainy days are the worst.",
    "Which word links an opinion to its reason?|because|green|often",
    "Which is the strongest reason for 'We need a longer recess'?|Playing helps us focus when we return to class.|I just want it.|Recess is a word.",
    "What should the last sentence of an opinion paragraph do?|Restate your opinion|Start a new topic|Ask a math question",
    "Which opinion sentence is clear?|I believe our school should plant a garden.|Garden.|Maybe stuff.",
    "Which phrase adds one more reason?|Another reason is|Once upon a time|Long ago",
    "Why do writers give reasons for their opinion?|They help the reader agree|They make the paragraph shorter|They replace the topic"
  ],
    ["An opinion is what someone thinks or feels. A fact is something that can be checked.", "Opinions use judging words. Facts can be proven. Reasons explain why you think what you think.", "Example: 'Dogs make great pets because they are loyal.' The opinion is what you believe; the reason tells why. Now do yours."],
    [["Opinion or fact?", "🤔", "A <b>fact</b> can be proven. An <b>opinion</b> tells what a person thinks or feels."], ["Give reasons", "🧱", "A good opinion paragraph states your opinion, gives two or three reasons, and ends by saying it again."], ["Neat and clear", "✍️", "Start with an indent, write on the lines, and leave finger spaces so your reader can follow you."]]);

  const G2 = mk("Colons", "⏸️", [
    "Which mark belongs in the blank?<br><b>You will need three tools ___ a ruler, a pencil and an eraser.</b>|a colon|a question mark|an apostrophe",
    "Which mark belongs in the blank?<br><b>The bus leaves at 7___30.</b>|a colon|a hyphen|a comma",
    "In a business letter, what mark usually follows the greeting 'Dear Ms. Lee'?|a colon|an exclamation mark|a hyphen",
    "A colon often comes after...|a complete statement that introduces a list|any single word|the last word of a story",
    "How many dots make up a colon?|two|one|three",
    "A colon can introduce...|a list or an example|a goodbye|a title page",
    "Where do you put a colon in a time like 9:15?|between the hour and the minutes|after the minutes|before the hour",
    "A colon looks like...|one dot above another|a dot above a comma|a short flat line"
  ],
    ["A colon points ahead to what comes next.", "Think about the shape of the mark and where it is usually placed.", "Example: 'Bring four things: paper, pens, tape and glue.' The complete thought comes first, then the colon, then the list. Now do yours."],
    [["Meet the colon", "⏸️", "A <b>colon</b> is two dots, one above the other. It says, <i>look, here comes more.</i>"], ["Lists and examples", "📝", "Write a complete thought, then a colon, then the list: <b>You need: a pen, a ruler and paper.</b>"], ["Other jobs", "🕐", "A colon also goes between the hour and the minutes in a time, and after the greeting of a business letter."]]);

  const G3 = mk("Hyphens", "➖", [
    "Where does a hyphen belong in the number 'forty five'?|between forty and five|after five|a hyphen is never used",
    "A hyphen is...|a short line joining words or word parts|a long dash|a pair of dots",
    "At the end of a line, you may split a word...|between syllables, with a hyphen|anywhere you like|after any letter",
    "Which is a compound word that is joined with hyphens?|mother-in-law|sunshine|notebook",
    "How do you split 'pencil' at the end of a line?|pen- then cil|pe- then ncil|penc- then il",
    "How long is a hyphen compared with a dash?|shorter|longer|the same",
    "Which describes a person using a hyphen before a noun?|well-behaved|elephant|picture",
    "If a whole word fits on the line, you should...|write it all on one line|always split it|skip the word"
  ],
    ["A hyphen is a tiny joiner. Think about what it connects.", "Hyphens connect parts. Think about words or numbers made of two parts, and about where a word breaks into beats.", "Example: 'twenty-one' joins two number words into one. And 'but-ter' splits into its two beats at a line end. Now do yours."],
    [["The little joiner", "➖", "A <b>hyphen</b> is a short line. It joins words or parts of words: <b>well-known</b>, <b>sixty-two</b>."], ["Splitting words", "✂️", "When a word will not fit at the end of a line, split it between syllables and put a hyphen at the end of the line."], ["Try not to split", "👀", "If you can fit the whole word, do. Never split a one-syllable word."]]);

  const G4 = mk("Parentheses", "🔖", [
    "Parentheses are used to...|add a small extra detail|end a question|show a list's title",
    "Which marks go around the extra words?<br><b>My cousin ___ who is ten ___ plays piano.</b>|a pair of parentheses|two colons|two hyphens",
    "If you take out the part in parentheses, the sentence should...|still make sense|become a question|turn into a list",
    "Which part is extra detail that could go in parentheses?<br><b>We hiked to the lake, about two miles away, after lunch.</b>|about two miles away|We hiked|after lunch",
    "Which part is extra detail that could go in parentheses?<br><b>My dog, a small beagle, loves bones.</b>|a small beagle|My dog|loves bones",
    "Where does the end period go if the parentheses are inside the sentence?|after the closing parenthesis|inside, before the extra words|before the opening parenthesis",
    "Parentheses are different from commas because they...|set the extra idea apart more strongly|are used only in math|mean a question",
    "Parentheses always come as a...|matched set|single mark|triple mark"
  ],
    ["Parentheses wrap a small extra thought, like a whisper inside a sentence.", "Try reading the sentence without the extra words. The main sentence must still work on its own. They come as a matched set.", "Example: 'The museum (it opens at nine) is downtown.' The main sentence still works without the extra words. Now do yours."],
    [["Extra information", "🔖", "<b>Parentheses ( )</b> hold a small extra detail that is not needed for the main sentence."], ["The test", "🧪", "Cover the part in parentheses. If the sentence still makes sense, you used them well."], ["Careful handwriting", "✍️", "Make the curves of the two marks match in height and shape so they are easy to see."]]);

  const G5 = mk("Cursive letter families", "👪", [
    "Which cursive letter starts with a round c-curve?|d|k|t",
    "Which cursive letter starts with a round c-curve?|g|l|b",
    "Which cursive letter has a tall loop that reaches the top line?|l|a|o",
    "Which cursive letter has a loop that hangs below the line?|y|t|e",
    "Which cursive letter is made with a hill (arch) shape?|n|c|o",
    "Which cursive letter gets its dot only after the word is finished?|i|l|u",
    "Which cursive letter gets a cross-bar added after the word is finished?|t|n|m",
    "Which cursive letter does NOT start with a c-curve?|m|o|d"
  ],
    ["Cursive letters come in families. Letters in a family start the same way.", "Round letters begin by curving up and over to the left. Tall letters swing up in a loop. Hill letters begin with a short upstroke.", "Example: the cursive e starts with a small loop; the cursive o starts with a round c-curve. Which family does yours belong to?"],
    [["Letter families", "👪", "Cursive letters that start with the same stroke belong to the same <b>family</b>."], ["Round letters", "⭕", "<b>a, c, d, g, o</b> and <b>q</b> all begin with a round curve, up and over to the left."], ["Hills and loops", "⛰️", "<b>n, m, h</b> and <b>r</b> use hill shapes. <b>b, h, k, l</b> have tall loops. <b>g, j, y</b> have loops below the line."]]);

  const G6 = mk("Scribes and the printing press", "📜", [
    "Before printing presses in Europe, how were most books made?|copied by hand by scribes|printed by big machines|made by computers",
    "Gutenberg's printing press in Europe was developed in which century?|the 1400s|the 1800s|the 1100s",
    "A scribe is a person who...|copies writing by hand|builds printing machines|paints houses",
    "Why were hand-copied books rare and valuable?|each one took a long time to copy|they were made of gold|nobody wanted them",
    "The printing press made it easier to...|make many copies of a book|write with quills|avoid paper",
    "Many scribes in Europe worked in...|monasteries and writing rooms|toy shops|farm fields",
    "Which tool did scribes often use for writing?|a quill pen|a ballpoint pen|a keyboard",
    "After printing spread, handwriting was still needed for...|letters, notes and records|nothing|only drawing"
  ],
    ["Think about how books were made before big machines could copy pages.", "Making one book by hand was slow work. Then someone invented a way to copy pages quickly.", "Example: a monk spent months copying a single book with a quill. A press could print hundreds of pages in the same time. Now do yours."],
    [["Books by hand", "📜", "Long ago in Europe, <b>scribes</b> copied books by hand, one letter at a time, with quill pens."], ["A faster way", "⚙️", "In the 1400s, Johannes Gutenberg built a printing press in Europe that could print many copies of a page."], ["Handwriting lives on", "✍️", "Even after printing, people kept writing by hand for letters, diaries, lists and records."]]);

  const G7 = mk("Symbols in notes", "🔣", [
    "What does 'w/' mean in notes?|with|without|week",
    "What does 'w/o' mean in notes?|without|with|worry",
    "What does 'b/c' mean in notes?|because|before class|bus car",
    "What does the symbol '=' mean in notes?|equals or is the same as|more than|and",
    "What does the abbreviation 'e.g.' mean?|for example|every game|each group",
    "What does the abbreviation 'i.e.' mean?|that is|in english|inside",
    "What does 'etc.' mean?|and so on|end of text|every time",
    "What does an arrow '→' often mean in notes?|leads to or causes|go to bed|stop"
  ],
    ["Note-takers use short symbols to save time. Think about what the short form could stand for.", "Many of these are shortened forms of everyday words or short Latin phrases. Say the letters out loud and think.", "Example: 'vs.' in notes means against, and '#' means number. Short forms save time when you keep up with a speaker. Now do yours."],
    [["Why use symbols?", "⚡", "Writing fast by hand is hard. Short forms and symbols let you keep up and still read your notes later."], ["Common ones", "🔣", "<b>w/</b> with, <b>w/o</b> without, <b>b/c</b> because, <b>=</b> equals, <b>→</b> leads to, <b>e.g.</b> for example."], ["Keep it readable", "👀", "Use symbols you will remember. If you cannot read your notes tomorrow, the symbols did not help."]]);

  const G8 = mk("Choosing paper", "📄", [
    "Paper with a grid of small squares is best for...|graphs and math drawings|writing a long letter|painting",
    "Which paper has wide spaces between lines, good for big handwriting?|wide-ruled|graph|blank",
    "Which paper has narrower lines, so more fits on a page?|college-ruled|wide-ruled|none of them",
    "Paper with no lines at all is called...|blank (unlined)|ruled|graph",
    "Why put a dark-lined guide sheet under blank paper?|to keep your writing straight|to make paper heavier|to hide ink",
    "Which paper is best for drawing a bar graph?|graph paper|a paper bag|tissue paper",
    "Very thin paper can be a problem with ink because it may...|let ink show through|get heavier|smell",
    "For practicing cursive, which is the most helpful?|lined paper with a dotted middle line|a plain napkin|wrapping paper"
  ],
    ["Think about what you will do with the paper: write, graph or draw.", "The lines or squares on paper are guides. Choose the guide that fits your job.", "Example: for a poster with large letters, you might use blank paper with pencil guide lines. For a long essay you would choose lined notebook paper. Now do yours."],
    [["Paper has jobs", "📄", "Different paper does different jobs: lined for writing, graph for charts, blank for art and posters."], ["Line widths", "📏", "<b>Wide-ruled</b> lines are far apart. <b>College-ruled</b> lines are closer together, so more fits on a page."], ["Guide sheets", "🧾", "Slide a dark-lined sheet under thin or blank paper to keep your lines straight."]]);

  const G9 = mk("Neat math writing", "🔢", [
    "Why line up digits in columns when adding?|so ones, tens and hundreds match|to use more paper|it does not matter",
    "How do some people write a 7 so it is not confused with a 1?|add a short line across the stem|make it tiny|write it backwards",
    "To tell a zero from the letter O, the zero is often...|narrower and more oval|exactly the same|crossed out",
    "What helps you tell a 4 from a 9?|closing the top of the 9 into a loop|making both open|writing both small",
    "When showing your work, write each step...|on a new line|squeezed in a corner|upside down",
    "In a fraction, the line between the top and bottom numbers should be...|straight and level|wavy|missing",
    "A decimal point should be...|a clear dot sitting on the line|huge like a ball|invisible",
    "Neat number writing prevents...|mistakes in your answers|rain|noise"
  ],
    ["Numbers can look alike, so neat shapes matter. Think about which strokes make each number different.", "Columns, lines and dots each have a job. When they are clear, your math is easy to check.", "Example: a sloppy 5 and 6 can look the same, so a careful writer makes the flat top of the 5 clear. Now do yours."],
    [["Numbers must be clear", "🔢", "One unclear digit can change an answer. Make each number's shape clear and the size even."], ["Line them up", "📐", "In addition and subtraction, line up the digits so ones sit under ones, and tens under tens."], ["Easy to check", "✅", "Write one step per line. Then you or your teacher can find a mistake fast."]]);

  const G10 = mk("Formal and informal writing", "🎩", [
    "Which is more <b>formal</b>?|Dear Principal Garcia, I am writing to ask about the field trip.|Hey, what is up with the trip?|Yo, trip?",
    "Which is more <b>informal</b>?|Hey, thanks a ton!|Thank you very much for your assistance.|I truly appreciate your help.",
    "Who would you write to in a formal style?|a school principal|your best friend|your pet",
    "What should you avoid in a formal letter?|slang|a greeting|a closing",
    "A formal letter should end with...|Sincerely,|Later!!!|LOL",
    "Which is the best greeting for a formal letter?|Dear Mr. Evans,|Hey Evans,|Yo,",
    "When you write a note to a friend you can...|be casual and relaxed|never use their name|only use long words",
    "A text-message style like 'u r' belongs in...|a quick note to a friend|a school report|a job letter"
  ],
    ["Think about who will read your writing. A friend and a principal are not the same reader.", "Formal writing is polite and complete. Informal writing is relaxed. Match your words to your reader.", "Example: to a coach you might write 'Dear Coach Ray, may I miss practice on Friday?' To a teammate: 'Can't make it Friday!' Now do yours."],
    [["Know your reader", "🎩", "Write <b>formally</b> to adults you do not know well, and for school work. Write <b>informally</b> to friends and family."], ["Formal tools", "📝", "Use a greeting, full sentences, polite words and a closing such as <b>Sincerely,</b>."], ["Informal is fine too", "😀", "A friendly note can be casual, but it should still be readable and kind."]]);

  const G11 = mk("Fountain pens", "🖋️", [
    "What does a fountain pen use for writing?|liquid ink|graphite|wax",
    "Where is the ink kept in many fountain pens?|a cartridge or a converter|a battery|a candle",
    "The metal tip of a fountain pen is called the...|nib|cap|barrel",
    "The body of the pen that you hold is the...|barrel|nib|cartridge",
    "What should you do when you finish writing?|put the cap back on|leave it uncapped on the desk|shake it hard",
    "Compared with a ballpoint, a fountain pen needs...|lighter pressure|a very hard push|no ink",
    "If you smudge wet ink, you should...|wait for it to dry or blot it gently|add water|rub it hard",
    "At about what angle do many people hold a fountain pen to the page?|about 45 degrees|straight up and down|flat on the paper"
  ],
    ["Think about how a fountain pen is built and how to care for it.", "The ink flows to the tip by itself. That means you do not need to push down, and the tip needs protecting.", "Example: after writing, Lena twisted the cap on her pen so the ink would not dry up at the tip. Now do yours."],
    [["How it works", "🖋️", "A fountain pen holds liquid ink in a <b>cartridge</b>. The ink flows to the metal tip, the <b>nib</b>."], ["Light touch", "🪶", "You do not push hard. Let the pen glide at about a 45 degree angle."], ["Take care", "🧴", "Cap the pen when you stop. Let ink dry before you close your notebook."]]);

  const G12 = mk("What makes writing legible", "🔍", [
    "If your letters lean in different directions, what is inconsistent?|slant|color|paper",
    "If some letters are huge and others tiny, what is uneven?|size|slant|margin",
    "If words bump into each other, what needs fixing?|spacing|slant|grip",
    "If letters float above and below the line, what needs fixing?|alignment on the baseline|speed only|colors",
    "If your a looks like an o, what is the problem?|letter shape|spacing|slant",
    "Why does legibility matter?|so readers can understand you|so you can write faster only|so paper lasts",
    "A good test of legibility is...|asking someone to read it|counting pages|measuring the pen",
    "Which is NOT part of legible writing?|a different color for every word|correct letter shapes|steady spacing"
  ],
    ["Legible means easy to read. Picture a reader trying to read each line.", "Check these parts: letter shape, size, spacing, slant and sitting on the line. Which one is the problem?", "Example: if your words run together like thisandthat, the problem is spacing, not slant. Find the part that is off in yours."],
    [["Legible", "🔍", "<b>Legible</b> writing can be read easily. It is not about being fancy."], ["Five checks", "✅", "Check <b>shape, size, spacing, slant</b> and <b>alignment</b> (sitting on the line)."], ["Fix one at a time", "🔧", "If your writing is hard to read, find the one part that is off and practice that."]]);

  const G13 = mk("Writing a summary", "📋", [
    "A summary tells...|the main ideas in fewer words|every small detail|only the title",
    "Which is shorter?|a summary|the original text|they are equal",
    "Which belongs in a summary of 'The Three Little Pigs'?|the wolf blows down two houses but not the brick one|the pigs' favorite colors|how many bricks were in the wall",
    "A good summary uses...|your own words|every sentence copied|no words",
    "Which detail is too small for a summary?|the color of a minor character's sock|the main problem|the ending",
    "Where should the main idea go in a summary?|near the start|hidden at the end only|nowhere",
    "To find the main idea, you can ask...|what is this mostly about?|what color is the page?|how many words are there?",
    "A summary of a one-page article is usually...|a few sentences|ten pages|one word"
  ],
    ["A summary keeps only what matters most. Think about what the text is mostly about.", "Leave out small details. Say the big ideas in your own words.", "Example: for a paragraph about how bees make honey, a summary says 'Bees collect nectar and turn it into honey in the hive.' It skips side facts. Now do yours."],
    [["Short and clear", "📋", "A <b>summary</b> tells the main ideas of a text in a few sentences."], ["Your own words", "💬", "Read, close the book, and write what you remember. Do not copy sentences."], ["Leave out the small stuff", "✂️", "Skip tiny details. Keep the big ideas, the problem and the ending."]]);

  const G14 = mk("Writing in different places", "🪑", [
    "When you write on your lap, a clipboard helps by giving...|a firm flat surface|extra colors|more paper",
    "Which surface is best for neat handwriting?|a flat, steady desk|a wobbly lap in a moving car|a pillow",
    "If you have to write while standing, a good tip is to...|use a clipboard or a firm board|hold the paper in the air|use no pencil",
    "Outdoors on a windy day, what keeps paper from blowing away?|a clip on a clipboard|holding it with a straw|writing faster",
    "In a moving car, writing neatly is hard because...|the ride shakes your hand|there is too much light|pencils melt",
    "If your hand shakes from cold, you should...|warm it up and take a break|press harder|stop thinking",
    "On a bumpy ride, it is a good idea to...|save big writing jobs for later|write as fast as you can|press very hard",
    "Which place helps you write neatly?|a quiet, well-lit table|a dark corner|a crowded noisy hall"
  ],
    ["Think about what keeps your paper steady and your hand calm.", "A firm surface and good light help your pencil stay under control.", "Example: Ana had to take notes on a field trip, so she used a clipboard to give her paper a hard, flat base. Now do yours."],
    [["A steady base", "📋", "Neat writing needs a firm, flat surface. A <b>clipboard</b> gives you one almost anywhere."], ["Good conditions", "💡", "Light, quiet and a comfortable seat all help your handwriting."], ["When it is hard", "🚗", "If the place is shaky, write short notes now and write neatly later."]]);

  const wpmGen = () => {
    const t = ri(1, 3);
    if (t === 1) {
      const r = pick([4, 5, 6, 7, 8, 10, 12]), m = ri(2, 8);
      return { text: `Eli writes <b>${r * m}</b> words in <b>${m}</b> minutes. How many words per minute is that?`, answer: r,
        hints: ["Words per minute means how many words he writes in just one minute.", "Share the total words equally among the minutes: this is a division.", "Example: 90 words in 9 minutes is 90 ÷ 9 = 10 words per minute. Now do yours."] };
    }
    if (t === 2) {
      const r = ri(5, 14), m = ri(3, 9);
      return { text: `Nia writes <b>${r}</b> words every minute. How many words can she write in <b>${m}</b> minutes?`, answer: r * m,
        hints: ["Each minute adds the same number of words.", "Repeated adding of the same number is the same as multiplying.", "Example: 4 words a minute for 6 minutes is 4 × 6 = 24 words. Now do yours."] };
    }
    const r = pick([4, 5, 6, 8, 10]), m = ri(3, 9);
    return { text: `Sam needs to write <b>${r * m}</b> words. He writes <b>${r}</b> words per minute. How many minutes will it take?`, answer: m,
      hints: ["You know the total and how much he writes each minute.", "Ask: how many groups of his minute-amount fit into the total? That is a division.", "Example: 40 words at 5 words per minute takes 40 ÷ 5 = 8 minutes. Now do yours."] };
  };
  const G15 = calc("Words per minute", "⏱️", wpmGen,
    [["Writing speed", "⏱️", "Speed can be measured in <b>words per minute</b>. It tells how many words you write in one minute."], ["Do the math", "🧮", "Words ÷ minutes = words per minute. Words per minute × minutes = total words."], ["Neat first", "🐢", "Fast writing that nobody can read does not help. Get neat first, then build speed."]]);

  const G16 = mk("Index cards for speeches", "🗂️", [
    "What belongs on a speech index card?|key words and short notes|the whole speech word for word|a drawing only",
    "Why number your cards?|so they stay in order|to count pens|for fun",
    "How big should the writing on an index card be?|large enough to read at a glance|tiny|invisible",
    "Which is better on a card?|a short phrase|a full paragraph|a whole chapter",
    "Underlining a key word on a card helps you...|spot it quickly|hide it|erase it",
    "How many main ideas fit best on one card?|one|ten|none",
    "What should you do with your cards while speaking?|glance down, then look at the audience|read without looking up|hide them",
    "Index cards are small, so write on...|one side, big and clear|both sides, as small as possible|the edges only"
  ],
    ["A card is a small helper, not a script. Think about what you can read in a second.", "Short words and big letters help you glance and look back up at your audience.", "Example: instead of writing a whole sentence about the rainforest, a speaker writes 'rainforest: 3 layers' on a card. Now do yours."],
    [["Small helper", "🗂️", "An <b>index card</b> holds a few key words to remind you what to say."], ["Big and clear", "🔠", "Write large, print neatly and number your cards so you never lose your place."], ["Eyes up", "👀", "Glance at the card, then look at your listeners. Do not read it word for word."]]);

  const G17 = mk("Writing a how-to", "🧰", [
    "Which words show order in a how-to?|first, next, then|purple, tall, loud|however, maybe, if",
    "A how-to should list the steps...|in order|in any order|backward",
    "What usually comes first in a how-to?|a title and a list of materials|the last step|a thank-you",
    "Which is a good step?|Put two slices of bread on a plate.|Bread is good.|My lunch is sometimes big.",
    "Steps often begin with action words like...|cut, mix, fold|yesterday, soon, later|blue, soft, cold",
    "Why number the steps?|it helps readers follow along|it makes the page heavier|it hides mistakes",
    "How might a how-to end?|with a closing line like 'Now you are done!'|with a new list of unrelated steps|with nothing ever",
    "A good how-to includes...|clear, specific details|vague hints|jokes only"
  ],
    ["A how-to teaches someone to do something. Think about what a beginner needs.", "A beginner needs a clear order and exact details. Short action words help.", "Example: 'First, wash your hands. Next, crack one egg into a bowl. Then stir.' The order words and action words guide the reader. Now do yours."],
    [["How-to writing", "🧰", "A <b>how-to</b> shows the reader the steps to make or do something."], ["Order matters", "🔢", "Use <b>first, next, then</b> and <b>last</b>, or number the steps."], ["Be exact", "📏", "Give amounts and details. Test it by asking a friend to follow your steps."]]);

  const G18 = mk("Labeling diagrams", "🏷️", [
    "A label should point to...|the part it names|the edge of the paper|your name",
    "Label lines should...|not cross each other|cross as often as possible|be wavy",
    "Labels are easiest to read when written...|straight across, not upside down|in a spiral|upside down",
    "A diagram's title goes...|at the top, clearly visible|hidden inside|nowhere",
    "What should a label contain?|a short word or phrase|a long paragraph|nothing",
    "Why use a ruler for label lines?|to make them straight|to make them longer|to make them invisible",
    "In a diagram of a plant, which label points to the part that takes in water from the soil?|root|petal|seed pod",
    "Where should labels be placed?|in a neat column beside the drawing|on top of the drawing|inside the drawing in a mess"
  ],
    ["A label is a name tag for a part of your drawing. Think about what makes a tag easy to read.", "Labels should be short, neat and straight, and their lines should not tangle.", "Example: in a drawing of a flower, a straight line from the word 'stem' touches the stem and crosses nothing else. Now do yours."],
    [["Name each part", "🏷️", "A <b>label</b> is a short word that names part of a drawing. A line connects it to the part."], ["Keep it tidy", "📏", "Use a ruler for label lines. Do not let lines cross. Write labels straight across."], ["Title it", "📌", "Give your diagram a title so the reader knows what it shows."]]);

  const L10 = [G1, G2, G3, G4, G5, G6, G7, G8, G9, G10, G11, G12, G13, G14, G15, G16, G17, G18];

  // =============== LEVEL 11 ===============
  const H1 = mk("Semicolons", "🔗", [
    "A semicolon can join two...|related complete sentences|single letters|numbers",
    "Which mark is a dot above a comma?|semicolon|colon|hyphen",
    "Which mark belongs in the blank?<br><b>I like soccer ___ my sister likes tennis.</b>|a semicolon|an apostrophe|a hyphen",
    "A semicolon can also separate list items that...|already contain commas|are single letters|are numbers only",
    "After a semicolon, the next word usually begins with...|a small letter (unless it is a name)|a capital letter always|a number",
    "Which word often follows a semicolon to link two ideas?|however|banana|purple",
    "A semicolon is stronger than a...|comma|period|question mark",
    "Which pair could be joined by a semicolon?|It rained all day. The game was canceled.|Because it rained. The game.|Rained. Canceled."
  ],
    ["A semicolon is a middle-sized pause. Think about what it connects.", "It joins two complete thoughts that are closely related, without a joining word. It is stronger than a comma.", "Example: 'Dad cooked dinner; I washed the dishes.' Both parts could stand alone as sentences. Now do yours."],
    [["A half stop", "🔗", "A <b>semicolon</b> (dot over a comma) joins two complete sentences that belong together."], ["Both sides stand alone", "⚖️", "Before and after the semicolon you need a complete thought."], ["Neat marks", "✍️", "Make the dot and the comma small and clear so a semicolon does not look like a colon."]]);

  const H2 = mk("Dashes and ellipses", "…", [
    "An ellipsis is...|three dots|a long line|two dots",
    "How many dots are in an ellipsis?|three|five|one",
    "An ellipsis can show...|words left out or a pause|a question|the end of a book",
    "A dash is used to show...|a sudden break or an extra thought|the start of a list only|a title",
    "A dash is longer than a...|hyphen|colon|comma",
    "Which sentence ending shows a voice trailing off?|I wonder if...|I wonder if.|I wonder if!",
    "When you quote and skip some words, you can use...|an ellipsis|a dash|a hyphen",
    "Dashes should be used...|sparingly|in every sentence|never ever"
  ],
    ["Think about marks that show a pause or a break in a thought.", "One of these marks is a row of small dots; the other is a longer line. Picture how each one looks on the page.", "Example: 'The door opened... and nobody was there.' The dots show a pause. 'He ran — fast!' shows a sudden break. Now do yours."],
    [["Ellipsis", "…", "An <b>ellipsis</b> is three dots. It shows a pause, a trailing off, or words left out."], ["Dash", "—", "A <b>dash</b> is a long line that shows a sudden break or an extra thought."], ["Handwriting tip", "✍️", "Make exactly three dots with equal spacing. Draw a dash longer than a hyphen."]]);

  const H3 = mk("Names and initials", "🪪", [
    "A middle initial is...|the first letter of a middle name|a nickname|a last name",
    "Initials are usually written with...|a period after each letter|a star after each letter|no letters",
    "Initials for Maya Rose Lee are...|M.R.L.|M.L.R.|R.M.L.",
    "Initials for Omar James Patel are...|O.J.P.|J.O.P.|P.O.J.",
    "When a form says 'print', you should...|write clear, separate letters|use cursive only|write very small",
    "What does 'Jr.' after a name show?|junior, the younger person with the same name|a job title|a grade",
    "A title like Dr. before a name is...|capitalized, and often has a period|written in lowercase|dropped",
    "Names always begin with...|a capital letter|a small letter|a number"
  ],
    ["Names are written with care. Think about which letters get capitals and which parts get shortened.", "An initial is just the first letter, in capitals. Say the full name in order, then take each first letter.", "Example: for Ben Alan Cruz, take B, A and C in order: B.A.C. Now do yours."],
    [["Capitals for names", "🪪", "Every part of a name starts with a <b>capital letter</b>."], ["Initials", "🔤", "An <b>initial</b> is the first letter of a name, followed by a period: <b>J.K.</b>"], ["Forms", "📝", "When a form says <b>print</b>, write clear separate capitals and small letters, one box at a time."]]);

  const H4 = mk("Business letters", "💼", [
    "Which part comes first in a formal letter?|the heading with the sender's address|the closing|the postscript",
    "The line 'Dear Ms. Lee:' is the...|greeting|closing|signature",
    "The word 'Sincerely,' is part of the...|closing|heading|greeting",
    "The main message goes in the...|body|signature|date line",
    "Where does your handwritten signature go?|below the closing|above the heading|beside the date",
    "A business letter should be...|polite and clear|full of jokes|written in code",
    "The date is usually placed...|at the top, with the heading|at the very bottom|in the middle of the body",
    "In the body, short paragraphs are better than...|one huge block of text|two sentences|a clear request"
  ],
    ["A formal letter has parts in a fixed order. Picture the page from top to bottom.", "From top to bottom: who and where it is from, then the greeting, the message, a polite goodbye, and a signature.", "Example: heading, date, 'Dear Mr. Park:', body, 'Respectfully,', signature, printed name. Place yours in that order."],
    [["Parts of the letter", "💼", "Heading, date, greeting, body, closing and signature. Always in that order."], ["Polite words", "🙏", "Use <b>Dear ...:</b> to begin and <b>Sincerely,</b> to end."], ["Neat page", "📄", "Leave even margins. Put a blank line between paragraphs. Sign in ink under the closing."]]);

  const H5 = mk("Keeping track of sources", "📚", [
    "When you note a source, which detail names who wrote it?|the author|the page color|the font",
    "Which detail tells when a source was made?|the date or year|the page number of a map|the cover color",
    "Why write down your sources as you research?|so you can find and credit them later|to make notes longer|to fill space",
    "If you copy someone's exact words, you should...|use quotation marks and credit them|say they are yours|change nothing and hide the source",
    "Using someone's work without credit is called...|plagiarism|paraphrasing|summarizing",
    "Which belongs in a source note about a book?|the title and the author|the color of your pencil|how many pages you read today",
    "Where can you often find a book's publication year?|on the copyright page near the front|only on the spine|nowhere",
    "A source is...|where you got your information|a type of pen|a margin"
  ],
    ["Think about what a reader would need to find your source again.", "Write down who made it, what it is called and when it was made. Do this as you go, not later.", "Example: 'Rivers of the World, by A. Grant, 2015.' That note names the title, the author and the year. Now do yours."],
    [["Credit your sources", "📚", "When you use ideas or facts from a book or page, you write down where they came from."], ["What to write", "📝", "Write the <b>author</b>, the <b>title</b> and the <b>date</b>. Do it while you research."], ["Quotes", "💬", "Exact words go inside <b>quotation marks</b>, with the source named."]]);

  const H6 = mk("Writing around the world", "🌍", [
    "Arabic is written from...|right to left|left to right only|top to bottom only",
    "English is written from...|left to right|right to left|bottom to top",
    "Chinese characters are...|symbols that each stand for a word or part of a word|letters of a small alphabet|dots",
    "Hebrew is written from...|right to left|left to right|diagonally",
    "The Cyrillic alphabet is used to write...|Russian and some other languages|English|Spanish",
    "Many Indian scripts, such as Devanagari, have a...|line running along the top of the letters|no letters at all|only dots",
    "Japanese writing has used characters borrowed from...|China|Brazil|Egypt",
    "Braille is a writing system that is read by...|touch|smell|sound"
  ],
    ["People around the world write in different ways. Think about which direction and which shapes.", "Some scripts run right to left, some use letters, some use symbols for whole words. Picture each system.", "Example: Spanish and French use the same left-to-right direction as English, but Arabic and Hebrew run the other way. Now do yours."],
    [["Many scripts", "🌍", "People write in many <b>scripts</b>: letters, symbols, even raised dots you read with fingers."], ["Directions", "↔️", "English goes left to right. Arabic and Hebrew go right to left."], ["Shapes", "🈁", "Chinese uses characters; Cyrillic is an alphabet; Devanagari letters hang from a line on top."]]);

  const H7 = mk("Titles: underline or quotes", "🏷️", [
    "A book title in handwriting is shown with...|an underline|a smiley|nothing at all",
    "A song title is shown with...|quotation marks|an underline|an arrow",
    "A short poem title is shown with...|quotation marks|an underline|a star",
    "A movie title is shown with...|an underline (italics when typed)|quotation marks|colons",
    "A chapter title is shown with...|quotation marks|an underline|a hyphen",
    "A magazine title is shown with...|an underline|quotation marks|a dash",
    "Why do we underline book titles in handwriting?|handwriting cannot show italics easily|it saves ink|it is a rule for pencils",
    "Which words in a title are capitalized?|the first word and the important words|only the vowels|none of them"
  ],
    ["Titles are marked in special ways. Think about whether the work is long or short.", "Long works that stand alone get one kind of mark. Short works that are parts of something bigger get another.", "Example: you underline the book Charlotte's Web by hand, but put the chapter title in quotation marks. Now do yours."],
    [["Long works", "📖", "When typed, long works such as books, movies and magazines are in <b>italics</b>. By hand, <b>underline</b> them."], ["Short works", "🎵", "Songs, short poems, chapters and articles go in <b>quotation marks</b>."], ["Capital letters", "🔠", "Capitalize the first word and the important words."]]);

  const H8 = mk("Roman numerals", "🏛️", [
    "What number is the Roman numeral V?|5|10|50",
    "What number is the Roman numeral X?|10|5|100",
    "What number is IX?|9|11|6",
    "What number is XIV?|14|16|6",
    "What number is XX?|20|15|30",
    "Which Roman numeral is 8?|VIII|IIX|XIII",
    "Which Roman numeral is 3?|III|IIII|VI",
    "In an outline, Roman numerals usually mark...|the main topics|tiny details|page numbers"
  ],
    ["Roman numerals are letters that stand for numbers. Learn the key letters first.", "The letters I, V, X, L, C, D and M go up in value from one to a thousand. A smaller letter after a bigger one is added; before it, subtracted.", "Example: LX is L (50) plus X (10) = 60, and CD is 100 less than D (500) = 400. Use the same method for yours."],
    [["Letters as numbers", "🏛️", "Romans used letters: <b>I</b>=1, <b>V</b>=5, <b>X</b>=10, <b>L</b>=50, <b>C</b>=100."], ["Add or subtract", "➕", "<b>VI</b> = 5+1 = 6. <b>IV</b> = 5−1 = 4. A small letter before a big one subtracts."], ["In outlines", "📑", "Roman numerals label the main parts of an outline: I, II, III. Write them as clear capital letters."]]);

  const H9 = mk("Proofreading your own work", "🔎", [
    "Reading backward, word by word, helps you spot...|spelling mistakes|the plot|new ideas",
    "Reading aloud helps you hear...|missing words and awkward spots|colors|nothing",
    "Why wait a little before proofreading your own work?|you see mistakes better with fresh eyes|paper dries|ink fades",
    "Which should you check first?|big problems like missing ideas|tiny commas only|margins",
    "A different-colored pen is good for...|marking corrections|breaking the paper|hiding mistakes",
    "Which error is hardest to see when reading quickly?|a repeated word like 'the the'|a huge title|a picture",
    "Pointing at each word with your pen helps you...|slow down and see every word|read faster only|skip words",
    "A checklist (capitals, periods, spelling) helps you...|check one thing at a time|make the list longer|avoid reading"
  ],
    ["Mistakes hide from the person who wrote them. Think about tricks that make your eyes slow down.", "Slowing down, changing the way you read, and checking one thing at a time all help.", "Example: Lia read her story aloud and heard that one sentence was missing a word. She added it. Now do yours."],
    [["Fresh eyes", "👀", "Take a short break, then read again. You will spot more mistakes."], ["Tricks", "🔄", "Read aloud, read backward, or point at each word with your pencil."], ["One thing at a time", "☑️", "Check capitals, then end marks, then spelling. A checklist keeps you steady."]]);

  const H10 = mk("Writing stamina", "💪", [
    "Stamina means...|being able to keep going without getting worn out|speed|color",
    "To build writing stamina, you can...|write a little longer each day|never write|write only once a month",
    "If your hand cramps, you should...|stop, stretch and shake it out|write harder|bite the pen",
    "Which helps keep writing neat during a long task?|short breaks|pressing hard|racing",
    "A good short daily practice might last...|5 to 10 minutes|10 hours|1 second",
    "Which grip helps you write longer?|relaxed|squeezed|a fist",
    "Good posture helps stamina because...|your body stays relaxed|it makes pens longer|it makes paper thicker",
    "If neatness drops at the end of a long page, you should...|slow down and refocus|speed up|stop caring"
  ],
    ["Think about how an athlete builds strength little by little.", "Gentle practice, rest and a relaxed hand let you write for longer without pain.", "Example: Kai wrote for 5 minutes each day, then 7, then 10. After two weeks he could write a page without a cramp. Now do yours."],
    [["Build slowly", "📈", "<b>Stamina</b> grows when you add a little more time each day."], ["Rest and stretch", "🤲", "Pause, shake out your hand and stretch your fingers."], ["Stay relaxed", "😌", "A soft grip and good posture keep your hand from tiring."]]);

  const H11 = mk("Lab reports and units", "🧪", [
    "Which abbreviation means centimeters?|cm|km|mg",
    "What does 'kg' stand for?|kilograms|kilometers|keys",
    "What does 'mL' stand for?|milliliters|miles|meters",
    "Do metric unit abbreviations usually take a period?|no|yes|always",
    "A hypothesis is...|a guess you can test|a proven fact|a tool",
    "Data in a lab report is often shown in...|a table or chart|a poem|the margin only",
    "Always write the unit with a measurement, like...|12 cm|12|twelve",
    "Labels on a lab sketch should be...|neat and clear|decorated|tiny"
  ],
    ["A lab report records what you did and found. Think about what makes a number meaningful.", "A number needs its unit. Metric units have short standard abbreviations written without a dot.", "Example: '25 g' tells you the mass in grams. A plain '25' leaves the reader guessing. Now do yours."],
    [["Lab reports", "🧪", "A lab report has a title, a question or <b>hypothesis</b>, steps, data and a conclusion."], ["Units", "📏", "Write the unit with every number: <b>cm</b> (centimeters), <b>kg</b> (kilograms), <b>mL</b> (milliliters)."], ["Neat data", "📊", "Put numbers in a table with labeled columns. Print clearly so nothing is misread."]]);

  const H12 = mk("Graph labels", "📊", [
    "The title of a graph tells...|what the graph shows|who owns the pen|the pen color",
    "The horizontal line along the bottom is the...|x-axis|y-axis|title",
    "The vertical line on the left is the...|y-axis|x-axis|key",
    "A key (legend) explains...|what colors or symbols mean|the title|the date",
    "Axis labels should include...|what is measured and its units|a poem|only numbers",
    "Numbers along an axis should be...|evenly spaced|random|upside down",
    "Bars in a bar graph should be...|the same width|different widths|dotted",
    "Why use a ruler for graph axes?|to make straight, neat lines|to make longer lines|to make colorful lines"
  ],
    ["A graph tells a story with labels. Think about what a reader must know to understand it.", "Every graph needs a name, labeled lines and, if you use colors, a way to read them.", "Example: a graph titled 'Books Read in May' has the label 'Week' along the bottom and 'Books' up the side. Now do yours."],
    [["Label everything", "📊", "A good graph has a <b>title</b>, labeled <b>axes</b> and a <b>key</b> if it uses colors."], ["Two axes", "📐", "The <b>x-axis</b> runs along the bottom. The <b>y-axis</b> runs up the side."], ["Neat and even", "📏", "Use a ruler. Space the numbers evenly and keep bars the same width."]]);

  const H13 = mk("Flourishes and swashes", "🌀", [
    "A flourish is...|a decorative curve added to a letter|a mistake|a kind of pen",
    "A swash is...|an extended, decorative stroke on a letter|a smudge|a margin",
    "Flourishes work best when they are...|used sparingly|on every letter|tiny scribbles",
    "Too many flourishes can make writing...|hard to read|neater|shorter",
    "Where might you add a flourish?|on a capital letter or a title|in every word|on the page edge",
    "A good flourish flows from...|the shape of the letter|a random scribble|the margin",
    "What should beginners practice first?|basic letters before flourishes|flourishes before letters|nothing",
    "Drawing in pencil first helps you...|plan your curves|waste ink|break pens"
  ],
    ["A flourish is decoration. Think about when decoration helps and when it gets in the way.", "A little goes a long way. The letter must still be readable.", "Example: Mia added one curl to the capital M of a card title and left the rest plain. It looked elegant. Now do yours."],
    [["Decorative strokes", "🌀", "A <b>flourish</b> is a curl or extended stroke added to a letter. A <b>swash</b> is a long, graceful one."], ["Less is more", "⚖️", "Use one or two on titles or capitals. Too many make words hard to read."], ["Plan it", "✏️", "Sketch lightly in pencil first, then trace in ink."]]);

  const H14 = mk("Sketchnotes", "🎨", [
    "Sketchnotes combine...|words and simple drawings|only drawings|only numbers",
    "Simple icons in notes help you...|remember ideas|use more paper|hide text",
    "What kind of drawing is best in sketchnotes?|quick and simple|detailed and slow|photograph-like",
    "Arrows in sketchnotes can show...|connections between ideas|the end of the world|nothing",
    "Boxes and banners are good for...|headings|hiding|erasing",
    "You should still write...|key words clearly|nothing at all|everything in code",
    "Colors in notes should be used to...|group or highlight ideas|make it unreadable|replace words",
    "In sketchnotes, what matters most?|clear ideas, not perfect art|perfect art|using every color"
  ],
    ["Sketchnotes are notes with small pictures. Think about what helps your memory and keeps notes quick.", "Simple pictures, key words and arrows beat long sentences.", "Example: in notes about the water cycle, Jo drew a tiny sun, a cloud and raindrops, each with one word. Now do yours."],
    [["Words plus pictures", "🎨", "<b>Sketchnotes</b> mix key words with simple drawings, arrows and boxes."], ["Keep it quick", "⏱️", "Use simple shapes: circles, stars, stick figures. You are not drawing art."], ["Stay readable", "👀", "Write key words clearly. Use color to group ideas, not to decorate every line."]]);

  const H15 = mk("Practice routines", "📅", [
    "Short daily practice is better than...|one long cram session|no practice|a nap",
    "A good warm-up before writing is...|loops and lines|running a marathon|holding your breath",
    "To improve, compare your writing to...|a model alphabet|a random scribble|the wall",
    "When a letter is hard, what should you practice first?|the strokes that make it|the whole page quickly|your signature",
    "Keeping a sample from the start of the month helps you...|see your progress|prove your pen works|waste paper",
    "Practicing slowly helps because...|you control each stroke|it takes longer on purpose|it breaks pencils",
    "Which is best to repeat in practice?|tricky letters and joins|only easy letters|just your name",
    "When you practice, check...|shape, size and spacing|only color|only length"
  ],
    ["Skill grows with steady practice. Think about what athletes and musicians do.", "Small, focused practice done often builds muscle memory. Go slowly and aim at your weak spots.", "Example: Tess saw that her g was messy, so she wrote a line of g's slowly each day for a week. It improved. Now do yours."],
    [["Little and often", "📅", "Five minutes every day builds more skill than one long session."], ["Warm up", "🔥", "Start with loops, waves and lines to loosen your hand."], ["Aim at weak spots", "🎯", "Find your hardest letters and practice those slowly, then check your progress."]]);

  const H16 = mk("Digital pens and tablets", "📱", [
    "A stylus is used on...|a touchscreen or tablet|paper only|a chalkboard",
    "Turning handwriting on a screen into typed text uses...|handwriting recognition|photocopying|a ruler",
    "Handwriting recognition works best when your writing is...|clear and consistent|tiny and messy|all squashed together",
    "An advantage of digital notes is that you can...|search and move them easily|never need power|fold them",
    "A disadvantage of a device is that it may...|run out of battery|grow leaves|get hungry",
    "Writing with a stylus can feel different from a pencil because...|a glass screen is smoother than paper|the ink flows|the paper tears",
    "Backing up digital notes protects them from...|being lost|rain|noise",
    "Paper notes still help because they...|need no battery|connect to the internet|play music"
  ],
    ["Technology can capture handwriting. Think about what a computer needs to read your writing.", "Neat, consistent letters are easier for a program to turn into typed text. A device also needs power.", "Example: Ben's tablet turned his neat notes into text with a few mistakes, but it could not read his rushed scribbles at all. Now do yours."],
    [["Writing on screens", "📱", "A <b>stylus</b> lets you write by hand on a tablet. Some programs turn it into typed text."], ["Neat helps machines", "🤖", "Clear letters are easier for a program to read, just like they are for people."], ["Pros and cons", "⚖️", "Digital notes are easy to search but need power. Paper needs no battery."]]);

  const H17 = mk("Poem layout", "🪶", [
    "A group of lines in a poem is called a...|stanza|sentence|chapter",
    "A poem's title is usually written...|at the top|at the bottom, hidden|inside a stanza",
    "A blank line between stanzas shows...|a break between groups of lines|a mistake|the title",
    "Line breaks in a poem are chosen by...|the poet, for rhythm or meaning|the margin only|the pen",
    "Rhyming words often come at the...|ends of lines|middle of the paper|top of the page",
    "Indenting a line in a poem can...|add emphasis or shape|erase the line|ban capital letters",
    "How many lines does a traditional haiku have?|3|5|7",
    "A four-line stanza is called a...|quatrain|couplet|triplet"
  ],
    ["A poem has its own shape on the page. Think about lines and groups of lines.", "Poets choose where each line ends and group lines into blocks with space between them.", "Example: 'Roses are red' and 'Violets are blue' make a stanza of two lines, set apart from the next two by a blank line. Now do yours."],
    [["Lines and stanzas", "🪶", "A poem is written in <b>lines</b>. A group of lines is a <b>stanza</b>."], ["Space speaks", "↕️", "A blank line between stanzas gives the reader a pause."], ["Copy carefully", "✍️", "When you copy a poem, keep the same line breaks and stanzas as the original."]]);

  const H18 = mk("Writing time and money", "🕐", [
    "How do you write 3:45 in the afternoon?|3:45 p.m.|3:45 a.m.|3.45 pm",
    "Midnight to noon is written with...|a.m.|p.m.|o.m.",
    "Which shows five dollars and fifty cents?|$5.50|$55.0|50.5¢",
    "Which shows a quarter past seven?|7:15|7:45|7:30",
    "How do you write 'half past nine' in digits?|9:30|9:15|3:09",
    "Where does the dollar sign go?|before the number|after the number|in the middle",
    "Why write units like $ or p.m.?|so readers know exactly what you mean|to fill space|it is just for decoration",
    "What separates dollars from cents?|a decimal point|a colon|a hyphen"
  ],
    ["Time and money have standard ways of being written. Think about what each mark tells the reader.", "Hours and minutes go together with a colon. Money uses a symbol and a decimal point.", "Example: twenty past two in the afternoon is written 2:20 p.m., and three dollars and five cents is $3.05. Now do yours."],
    [["Writing time", "🕐", "Write the hour, a colon, then minutes: <b>4:30</b>. Add <b>a.m.</b> (morning) or <b>p.m.</b> (afternoon and evening)."], ["Writing money", "💵", "Put the symbol first, then dollars, a decimal point and cents: <b>$2.75</b>."], ["Clear digits", "🔢", "Space your digits evenly so a 1 is never mistaken for a 7."]]);

  const L11 = [H1, H2, H3, H4, H5, H6, H7, H8, H9, H10, H11, H12, H13, H14, H15, H16, H17, H18];

  // =============== LEVEL 12 ===============
  const I1 = mk("Writing dialogue", "💬", [
    "When a new person speaks in a story, you should...|start a new paragraph|keep going on the same line|stop writing",
    "Quotation marks go around...|the exact spoken words|the speaker's name|everything",
    "In 'I am hungry,' said Leo, the comma goes...|inside the quotation marks|outside the quotation marks|nowhere",
    "The first word of a spoken sentence is...|capitalized|lowercase always|a number",
    "What is 'said Maya' called?|a dialogue tag|a title|a heading",
    "Dialogue tags tell the reader...|who is speaking|the weather only|the page number",
    "If a quote is a question, where does the question mark go?|inside the quotation marks|after the tag|outside always",
    "What do we call words in a scene that are not spoken, like 'The room was quiet.'?|narration|dialogue|a title"
  ],
    ["Dialogue is what characters say out loud. Think about how to show who is speaking.", "Each new speaker gets a new paragraph. Spoken words go inside quotation marks with the end mark tucked inside.", "Example: 'Where is my hat?' asked Ravi. 'On your head,' laughed Dad. Two speakers means two paragraphs. Now do yours."],
    [["Speech marks", "💬", "Put the exact words a character says inside <b>quotation marks</b>."], ["New speaker, new paragraph", "↩️", "Start a new line and indent each time a different character speaks."], ["Tags and punctuation", "🏷️", "A <b>dialogue tag</b> like <i>said Leo</i> tells who speaks. The comma or end mark goes inside the closing quotation marks."]]);

  const I2 = mk("A persuasive letter", "✉️", [
    "A persuasive letter tries to...|convince the reader|confuse the reader|bore the reader",
    "What should a persuasive letter state clearly?|what you want or believe|a joke|the goodbye",
    "Strong support includes...|facts and reasons|only 'because I said so'|insults",
    "Which is the best tone?|respectful and polite|rude|silly",
    "Which is the strongest reason?|A park would give kids a safe place to play.|Parks are fun, just because.|I want it so bad.",
    "The ending of the letter should...|restate the request and say thanks|start a new topic|insult the reader",
    "Who is the audience of a letter to the principal?|the principal|your pet|nobody",
    "A good closing is...|Sincerely, then your name|Bye!!! lol|nothing"
  ],
    ["A persuasive letter wants the reader to agree or act. Think about what changes a person's mind.", "Clear requests, real reasons and a polite voice work better than pushing hard.", "Example: 'Dear Mayor Kim, our town needs a bike lane because it would keep riders safe. Thank you for listening.' Now do yours."],
    [["Ask clearly", "✉️", "Say what you want in the first part: <b>I am writing to ask...</b>"], ["Give reasons", "🧱", "Support your request with facts and real reasons."], ["Be polite", "🙏", "End by restating your request and thanking the reader. Sign in neat handwriting."]]);

  const I3 = mk("Main idea and details", "🎯", [
    "The main idea is...|what a text is mostly about|a tiny detail|the title's font",
    "Supporting details...|give facts and examples about the main idea|replace the main idea|are unrelated",
    "Which sentence is the main idea of a paragraph about ocean animals?|Many different animals live in the ocean.|Octopuses have eight arms.|Some fish are red.",
    "Which detail supports 'Exercise is good for you'?|It makes your heart stronger.|Pizza has cheese.|Socks are soft.",
    "Where is the main idea often found?|in the first or last sentence|only on the page number|nowhere",
    "To check a main idea, ask...|do the details all fit under it?|is it long?|is it blue?",
    "Which title best fits a paragraph about how to care for a pet?|Taking Care of Your Pet|Blue Sky|Math Facts",
    "A detail that does not fit is...|off-topic and should be cut|a main idea|a title"
  ],
    ["The main idea is the big point. Details are the small pieces that back it up.", "Ask: is this the whole point, or just one piece of it? The details should all fit under the main idea.", "Example: in a paragraph about dogs helping people, 'Guide dogs lead people who cannot see' is a detail, and 'Dogs do many jobs' is the main idea. Now do yours."],
    [["The big point", "🎯", "The <b>main idea</b> is what the paragraph is mostly about."], ["Details", "🧩", "<b>Supporting details</b> give facts, examples and reasons."], ["Stay on topic", "🚫", "If a sentence does not fit the main idea, cut it. Then the paragraph is clear."]]);

  const I4 = mk("Paraphrasing and quoting", "🗨️", [
    "To paraphrase is to...|say it in your own words|copy word for word|erase it",
    "A paraphrase keeps the same...|meaning|spelling|letters",
    "Which is a good paraphrase of 'The cat sat on the warm mat'?|A cat rested on the cozy rug.|The cat sat on the warm mat.|Dogs run fast.",
    "Do you still credit the source when you paraphrase?|yes|no|only for quotes",
    "When do you use quotation marks?|when copying exact words|when paraphrasing|never",
    "Changing only one word in a sentence is...|not a real paraphrase|perfect|a title",
    "A good way to paraphrase is to...|read, look away, then write what it means|copy fast|swap letters",
    "What is a direct quote?|the exact words from a source|your own words|a title"
  ],
    ["Think about the difference between copying words and saying the idea in your own way.", "A paraphrase changes the words but keeps the meaning. A quote keeps the exact words and is marked.", "Example: 'The sun sets in the west' could be paraphrased as 'Evening sunlight fades toward the western sky.' Now do yours."],
    [["Two ways to use ideas", "🗨️", "A <b>quote</b> uses the exact words. A <b>paraphrase</b> uses your own words for the same idea."], ["Mark quotes", "❝", "Put exact words inside quotation marks and name the source."], ["Still give credit", "📚", "Even when you paraphrase, tell where the idea came from."]]);

  const I5 = mk("Listing your sources", "🗃️", [
    "Sources in a bibliography are usually listed...|in alphabetical order|by color|by length",
    "They are sorted by the author's...|last name|first pet|favorite color",
    "A hanging indent means...|the first line starts at the margin and later lines are indented|the whole entry is indented|there is no indent",
    "Which comes first alphabetically?|Adams|Baker|they are the same",
    "What is a bibliography?|a list of sources you used|a story|a poem",
    "Which goes first in an entry?|usually the author|the page color|the date alone",
    "If there is no author, you may begin with...|the title|your name|nothing",
    "A bibliography goes...|at the end of the work|before the title|nowhere"
  ],
    ["A bibliography is an ordered list. Think about how a library or dictionary sorts things.", "Sort by the first letter of the author's last name. Start each entry at the left margin.", "Example: Chen, Davis and Moore are listed in that order, since C comes before D and M. Now do yours."],
    [["Source list", "🗃️", "A <b>bibliography</b> lists every source you used, at the end of your work."], ["ABC order", "🔤", "Sort entries alphabetically by the author's last name."], ["Neat layout", "📐", "Start each entry at the left margin. Indent the extra lines (a hanging indent)."]]);

  const I6 = mk("Test-day writing", "📝", [
    "Before writing on a test, you should first...|read the question carefully|start at random|pass in your paper",
    "If the question asks for a paragraph, write...|complete sentences|only single words|a drawing",
    "If you finish early, you should...|reread and check your work|leave without checking|tear the paper",
    "Neat writing on a test helps because...|the grader can read your answers|pens last longer|tests get shorter",
    "If your answer is too long for the space, you should...|make it shorter and clear|write on the desk|skip it",
    "Which comes first, planning or writing?|a quick plan|writing without thinking|neither",
    "A bubble answer should be...|filled in dark and completely|lightly dotted|drawn outside the circle",
    "Time is limited, so you should...|watch the clock calmly|ignore the time|stare at the page"
  ],
    ["Tests ask for clear thinking and clear writing. Think about the steps in order.", "Read, plan a little, write neatly, then check. Calm work is better than a rush.", "Example: Dev read the prompt twice, jotted three words on scrap paper, wrote his answer, and used the last minutes to check it. Now do yours."],
    [["Read first", "👀", "Read each question twice before you write. Underline key words."], ["Neat and complete", "✍️", "Write in full sentences and keep your handwriting readable under time pressure."], ["Check", "✅", "Use any spare time to reread, fix spelling and fill in every bubble clearly."]]);

  const I7 = mk("Your own handwriting style", "🖊️", [
    "Your handwriting style can be personal as long as it is...|legible|tiny|upside down",
    "Many people develop a style by...|practicing and adjusting letter shapes|never writing|copying one signature",
    "Changing small things like slant or letter shapes is...|fine if it stays readable|forbidden|always a mistake",
    "A style should never reduce...|readability|color|pen price",
    "Your style may change as...|you grow and practice|you eat lunch|it rains",
    "Which is a sign of a good personal style?|consistent and clear|different every word|unreadable",
    "For formal papers, your handwriting should be...|extra neat|covered in doodles|tiny",
    "Which choice shows consistency?|the same slant and spacing throughout|a new slant each line|random sizes"
  ],
    ["Everyone's writing is a little different. Think about what makes a style work for readers.", "A style is fine when it is steady and easy to read. Style never beats clarity.", "Example: Pia likes rounded letters and a slight slant, and she keeps both the same on every page. Her style is clear and her own. Now do yours."],
    [["Your own style", "🖊️", "Your handwriting is partly yours. Small choices like slant and letter shapes make it personal."], ["Clear first", "🔍", "A style is good when readers can read it without effort."], ["Be consistent", "⚖️", "Keep the same slant, size and spacing throughout a page."]]);

  const I8 = mk("Baseline and x-height", "📐", [
    "The baseline is...|the line letters sit on|the top edge|the page number",
    "The x-height is the height of...|the main body of lowercase letters|only capital letters|only tails",
    "An ascender is the part of a letter that rises above...|the x-height|the baseline|the page",
    "A descender is the part of a letter that drops below...|the baseline|the top of the page|the margin",
    "Which letter has a descender?|p|t|e",
    "Which letter has an ascender?|d|a|c",
    "Which letter has neither an ascender nor a descender?|o|b|g",
    "Guidelines help keep lettering...|even|crowded|slanted by accident"
  ],
    ["Lettering has parts with special names. Picture a letter between horizontal guide lines.", "The bottom guide is where letters stand. Parts that rise go above the main body, parts that dip go below the bottom guide.", "Example: in the word 'hug', h has an ascender, and g has a descender, but u has neither. Now do yours."],
    [["The lines", "📐", "<b>Baseline</b>: the line letters sit on. <b>X-height</b>: the height of letters like a, c, e, o."], ["Up and down", "↕️", "<b>Ascenders</b> (b, d, h, k, l) reach up. <b>Descenders</b> (g, j, p, q, y) drop below."], ["Use guides", "✏️", "Draw light pencil guides before lettering a poster. Erase them when the ink is dry."]]);

  const I9 = mk("Mind maps and organizers", "🗺️", [
    "In a mind map, the main idea goes...|in the center|in a corner only|hidden",
    "Branches in a mind map lead to...|related ideas|nothing|erasers",
    "Keywords on branches should be...|short|long paragraphs|invisible",
    "A graphic organizer is a tool for...|organizing ideas visually|decorating|erasing",
    "A Venn diagram shows...|how things are alike and different|the time of day|a list of words",
    "In a Venn diagram, what goes in the overlap?|what the two topics share|what is different|the title",
    "A timeline organizes events...|in order of time|alphabetically|by color",
    "A T-chart has how many columns?|two|one|five"
  ],
    ["Organizers turn ideas into pictures you can see. Think about how each one is laid out.", "Each organizer has a shape that fits a purpose: grouping, comparing or ordering.", "Example: to compare cats and dogs, draw two circles that overlap. Things both share go in the middle. Now do yours."],
    [["Map your ideas", "🗺️", "A <b>mind map</b> puts the main idea in the center and related ideas on branches."], ["Compare and order", "⚖️", "A <b>Venn diagram</b> compares. A <b>T-chart</b> has two columns. A <b>timeline</b> puts events in order."], ["Neat and short", "✏️", "Use short key words. Print clearly so you can read the map later."]]);

  const I10 = mk("Planners and calendars", "🗓️", [
    "A planner helps you...|keep track of tasks and due dates|play games|erase things",
    "Writing a due date in your planner helps you...|remember to finish on time|avoid homework forever|hide it",
    "Which should you do first when planning?|the most urgent tasks|the least important tasks|nothing",
    "A to-do list works best when tasks are...|specific|vague|huge",
    "What do you do when you finish a task?|check it off|tear the page|ignore it",
    "Breaking a big project into small steps...|makes it easier to finish|makes it impossible|is pointless",
    "A calendar square needs room for...|short notes|a whole novel|a big painting",
    "Priority means...|more important|less important|funny"
  ],
    ["A planner is a memory helper you write in. Think about what you need to remember.", "Write short, clear notes with dates. Do the urgent things first and cross off what is done.", "Example: 'Fri: science poster due. Wed: draw the title. Thu: add labels.' Small steps are easy to check off. Now do yours."],
    [["Write it down", "🗓️", "A <b>planner</b> or calendar helps you remember tasks and due dates."], ["Break it up", "🧩", "Split a big project into small steps with their own dates."], ["Check it off", "✅", "Do the most important tasks first and mark each one done."]]);

  const I11 = mk("Writing a recipe", "🍳", [
    "What does 'tsp' stand for?|teaspoon|tablespoon|tea soup",
    "What does 'tbsp' stand for?|tablespoon|teaspoon|ten bites",
    "Which is bigger?|a tablespoon|a teaspoon|they are the same",
    "What does 'oz' stand for?|ounce|pound|ounzo",
    "What does 'lb' stand for?|pound|liter|link",
    "What does 'min.' stand for in a recipe?|minutes|miles|many",
    "In a recipe, the ingredients are usually listed...|before the steps|after the thank-you|never",
    "Why write measurements clearly?|wrong amounts can change the dish|to fill space|to use ink"
  ],
    ["Recipes use short forms for measurements. Think about what kind of word each could stand for.", "Many are the first letters of the measure's name. Compare their sizes to keep them straight.", "Example: 'c.' means cup and 'pt.' means pint. A cup is smaller than a pint. Use the same careful thinking for yours."],
    [["Recipe parts", "🍳", "A recipe has a title, a list of <b>ingredients</b> with amounts, and numbered <b>steps</b>."], ["Short forms", "📏", "<b>tsp</b> teaspoon, <b>tbsp</b> tablespoon, <b>oz</b> ounce, <b>lb</b> pound."], ["Print clearly", "✍️", "A 1/2 that looks like a 1/3 could ruin the cake. Write fractions neatly."]]);

  const I12 = mk("Descriptive details", "🌈", [
    "Which sentence uses the sense of smell?|The bakery smelled of warm cinnamon.|The bakery was big.|The bakery closed.",
    "Which sentence uses the sense of hearing?|The door creaked loudly.|The door was brown.|The door is there.",
    "Which sentence uses the sense of touch?|The blanket felt soft and fuzzy.|The blanket was on the bed.|I have a blanket.",
    "Which sentence is more specific?|The golden retriever bounded across the grass.|The animal went.|The dog moved.",
    "Strong verbs help you...|show action clearly|confuse the reader|avoid sentences",
    "Which sentence shows rather than tells?|Her hands shook and she stared at the floor.|She was nervous.|She felt nervous.",
    "Adjectives describe...|nouns|verbs|dots",
    "Which is a vivid verb for 'walked slowly and tiredly'?|trudged|got|did"
  ],
    ["Details help a reader see, hear, smell and feel what you describe.", "Specific words beat general words. Pick the sentence that paints a clear picture.", "Example: 'The cold wind whistled through the empty street' is stronger than 'It was a cold day.' Now do yours."],
    [["Use your senses", "🌈", "Write what you see, hear, smell, taste and feel."], ["Specific words", "🔍", "Say <b>golden retriever</b>, not <b>animal</b>. Say <b>trudged</b>, not <b>went</b>."], ["Show, don't tell", "🎭", "Instead of 'she was nervous', show her shaking hands."]]);

  const I13 = mk("Handwriting facts and myths", "🧠", [
    "True or false: messy handwriting means a person is not smart.|false|true",
    "Handwriting improves with...|practice|luck only|never",
    "True or false: left-handed people can write as neatly as right-handed people.|true|false",
    "Is your handwriting the same forever?|no, it can change|yes, it never changes|only at night",
    "A relaxed grip usually makes writing...|more comfortable|painful|stuck",
    "Writing by hand and typing are both...|useful skills|useless|banned",
    "Dark ink on light paper is usually...|easiest to read|hardest to read|invisible",
    "Does pressing harder make your writing neater?|no, it mostly tires your hand|yes, always|only in pencil"
  ],
    ["Some things people say about handwriting are true and some are myths. Think about what you have learned.", "Handwriting is a skill, and skills grow with practice and a comfortable hand.", "Example: a student whose writing was hard to read practiced a few minutes each day and, after a month, her teacher could read it easily. Now do yours."],
    [["Skill, not talent", "🧠", "Handwriting is a skill. Anyone can improve it with practice."], ["Not about smartness", "💡", "Messy writing does not mean a person is not clever. It often means they need more practice or time."], ["Comfort matters", "🤲", "A light grip and good contrast between ink and paper make writing easier."]]);

  const I14 = mk("When a signature matters", "✍️", [
    "A signature is...|your name written in your own way|a drawing|the date",
    "Who should sign your permission slip?|a parent or guardian|a friend|your pet",
    "Should you sign someone else's name?|no, never|yes|if they are away",
    "A signature shows that...|you agree to or approve something|you are tired|it is Monday",
    "Where do you sign a letter?|below the closing|above the greeting|on the back of the envelope",
    "Why print your name beneath a signature?|so it is easy to read|to waste ink|to hide it",
    "Should you post a picture of your signature online?|no, keep it private|yes, everywhere|only for fun",
    "Before you sign, you should be...|sure you understand what you are signing|in a hurry|silent"
  ],
    ["A signature is serious because it means you agree. Think about who should sign what.", "Only the person whose name it is should sign it, and only after reading. Keep it private.", "Example: before signing his card to a friend, Omar read what he wrote. Adults read forms carefully before they sign, too. Now do yours."],
    [["Your mark", "✍️", "A <b>signature</b> is your name written your own way. It says, <b>I agree</b>."], ["Never sign for someone else", "🚫", "Only the person named should sign. Never copy another person's signature."], ["Keep it private", "🔒", "Do not share pictures of your signature online. Read before you sign."]]);

  const I15 = mk("Monoline and contrast lettering", "🖌️", [
    "Monoline lettering has strokes that are...|the same thickness|thick and thin|dotted",
    "Contrast lettering has...|thick and thin strokes|all strokes the same|no strokes",
    "A felt-tip pen usually makes which kind of line?|monoline|high contrast|dotted",
    "A broad-edge pen makes...|thick and thin lines depending on direction|one width only|no line",
    "On a brush pen, pressure changes...|line thickness|ink color|paper size",
    "A pencil held steady makes lines that are mostly...|one weight|rainbow-colored|dotted",
    "In pointed-pen scripts, thick strokes are usually on the...|downstrokes|upstrokes|joins",
    "Which would you choose for even, simple block labels?|monoline|high contrast|a mix of both without a plan"
  ],
    ["Think about how the thickness of the line changes, or does not.", "Some tools make the same line every time, and some make thick and thin lines depending on angle or pressure.", "Example: a marker makes the same width everywhere, but a calligraphy pen gives thick strokes one way and thin strokes the other. Now do yours."],
    [["Monoline", "➖", "<b>Monoline</b> letters have the same thickness everywhere. Markers and pencils often make them."], ["Contrast", "🖋️", "<b>Contrast</b> letters have thick and thin strokes. Broad-edge and brush pens make them."], ["Pick a tool", "🎯", "Choose the tool that suits the job. Simple labels often use monoline."]]);

  const pagesGen = () => {
    const t = ri(1, 3);
    if (t === 1) {
      const m = ri(4, 12), n = ri(3, 8);
      return { text: `Zoe writes one page in <b>${m}</b> minutes. How many minutes will <b>${n}</b> pages take?`, answer: m * n,
        hints: ["Each page takes the same amount of time.", "Combine equal groups of minutes: this is a multiplication.", "Example: 6 minutes per page for 5 pages takes 6 × 5 = 30 minutes. Now do yours."] };
    }
    if (t === 2) {
      const m = pick([4, 5, 6, 8, 10]), n = ri(3, 8);
      return { text: `Ravi has <b>${m * n}</b> minutes. He writes a page in <b>${m}</b> minutes. How many pages can he finish?`, answer: n,
        hints: ["Ask how many page-times fit into his total time.", "Share the total minutes into equal pieces the size of one page: this is a division.", "Example: 36 minutes at 9 minutes per page gives 36 ÷ 9 = 4 pages. Now do yours."] };
    }
    const m = ri(3, 9), n = ri(6, 10), k = ri(2, 4);
    return { text: `A report needs <b>${n}</b> pages. Mia has written <b>${k}</b> pages. Each page takes <b>${m}</b> minutes. How many minutes are left?`, answer: (n - k) * m,
      hints: ["First find how many pages are still missing.", "Subtract to find the pages left, then turn pages into minutes.", "Example: 8 pages needed, 3 done, 4 minutes each: 8 − 3 = 5 pages left, and 5 × 4 = 20 minutes. Now do yours."] };
  };
  const I16 = calc("Time to finish", "⏳", pagesGen,
    [["Estimate time", "⏳", "Knowing how long a page takes lets you plan your writing time."], ["Use rates", "🧮", "<b>Minutes per page × pages = total minutes.</b> To find pages, divide total minutes by minutes per page."], ["Plan ahead", "🗓️", "Start early. Leave time at the end to proofread and recopy neatly."]]);

  const I17 = mk("Writing precise instructions", "🧭", [
    "Good instructions are...|clear and exact|vague|secret",
    "Which instruction is more precise?|Draw a circle with a radius of 2 cm.|Draw something round.|Make a shape.",
    "If steps are out of order, the reader may...|get confused or fail|finish faster|win a prize",
    "Which action word is clearest in a step?|fold|do|handle",
    "A good way to test instructions is to...|have someone follow them exactly|read them once|throw them away",
    "Include numbers and units, like...|3 cm or 2 cups|some or a bit|stuff",
    "Writing one action per step helps...|avoid confusion|waste time|hide mistakes",
    "If testers get confused, you should...|rewrite the unclear step|blame them|do nothing"
  ],
    ["Instructions must work for someone who cannot ask you questions. Think about exact words.", "Exact numbers, one action per step and a clear order make instructions work.", "Example: 'Tape the card to the wall, 5 cm below the clock' is exact. 'Put it up somewhere' is not. Now do yours."],
    [["Be exact", "🧭", "Use numbers, units and clear action words."], ["One step at a time", "🪜", "Put one action in each step, in the right order."], ["Test it", "🧪", "Ask someone to follow your steps exactly. Fix any step that confused them."]]);

  const I18 = mk("Final copy checklist", "📑", [
    "A final copy should be...|neat and complete|rough|unfinished",
    "Before writing a final copy, you should have finished...|revising and proofreading|nothing|eating",
    "Margins should be...|even on all sides|missing|only on the left",
    "Your name and date go...|where the teacher asks, usually at the top|hidden|inside a paragraph",
    "If a page has heavy crossing out, you should...|recopy it neatly|leave it|add more scribbles",
    "Use ink or pencil as...|the teacher requires|you randomly choose|neither",
    "Check that every page is...|in order, and numbered if needed|torn|folded",
    "Reading it one last time helps you catch...|small errors|nothing|ink"
  ],
    ["The final copy is what your reader sees. Think about the steps before and after you write it.", "Fix the content first, then write neatly. Follow the teacher's rules and check the whole thing once more.", "Example: Nell fixed her mistakes in the draft, wrote her name and date at the top, used even margins, and read it one last time. Now do yours."],
    [["After the draft", "📑", "Revise and proofread <b>before</b> you write a final copy."], ["Neat page", "📄", "Name and date where asked, even margins, clear letters, and no heavy crossing out."], ["One last look", "👀", "Read it once more and check your page order."]]);

  const L12 = [I1, I2, I3, I4, I5, I6, I7, I8, I9, I10, I11, I12, I13, I14, I15, I16, I17, I18];

  Object.assign(HAND_LEVELS, {
    10: L10.concat([MIX("Mixed practice", L10[0], L10[3], L10[5], L10[8], L10[12]), MIX("Level 10 Challenge", L10[1], L10[2], L10[6], L10[9], L10[14], L10[17])]),
    11: L11.concat([MIX("Mixed practice", L11[0], L11[2], L11[6], L11[8], L11[11]), MIX("Level 11 Challenge", L11[1], L11[3], L11[7], L11[10], L11[14], L11[17])]),
    12: L12.concat([MIX("Mixed practice", L12[0], L12[2], L12[5], L12[7], L12[12]), MIX("Level 12 Challenge", L12[1], L12[3], L12[8], L12[10], L12[15], L12[17])])
  });
})();
