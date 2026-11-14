// ext/hand-7-9.js  Mind Lab Handwriting, levels 7-9 (60 lessons)
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
  const MIX = (title, ...ls) => {
    const f = () => pick(ls).make();
    f.teach = () => [{ h: "Review time!", v: "🔄", t: "This lesson mixes things you already know. Here is a quick reminder of each idea, then the quiz." }].concat(ls.map(l => l.make.teach()[0]));
    return { title, make: f };
  };

  // =============== LEVEL 7 ===============
  const D1 = mk("Cursive joins that climb", "🔗", [
    "In cursive, which letters leave a join from the <b>top</b> of the letter?|o, v, w and b|a, d and g|m, n and h",
    "In cursive, you lift your pen between...|words|every letter|every line only",
    "When should you add the dot on an <b>i</b> in cursive?|After you finish the whole word|Before you start the word|Never",
    "When should you cross a <b>t</b> in cursive?|After finishing the word|Before writing the word|Halfway through the letter",
    "Why do cursive letters join?|So the pen can flow without stopping|So words look longer|So you can skip spaces",
    "What should stay the same between cursive letters?|The slant|The color|The size of the paper",
    "A join from o to the next letter usually starts...|at the top of the o|at the bottom of the line|in the middle of the page",
    "What happens if you lift the pen too often in cursive?|The writing loses its flow|The writing gets faster|Nothing changes"
  ],
    ["Think about where the pen is when a letter ends: at the bottom, or up high?", "Letters rounded at the top finish with a swing up high. Dots and crosses come last, after the word.", "Example: write <b>to</b>. The t is finished, then the o ends high and joins on. Now do yours."],
    [["Joins", "🔗", "Cursive letters connect with small strokes called <b>joins</b>."], ["High exits", "↗️", "Some letters end at the top. They join to the next letter with a high stroke."], ["Last of all", "🎯", "Finish the whole word first. Then add dots on i and j and the cross on t."]]);
  const D2 = mk("Cursive speed and flow", "🌊", [
    "What makes cursive flow well?|A relaxed hand and steady rhythm|A very tight grip|Pressing hard",
    "If your cursive gets messy when you go fast, you should...|slow down a little|press harder|stop using lines",
    "Good flow means your pen...|keeps moving smoothly|stops after every stroke|jumps around",
    "Which is the best way to build speed?|Practice neat writing first, then go faster|Rush from the start|Skip the joins",
    "Which is better?|A little slower and clear|Fast and unreadable|They are the same",
    "A rhythm of even up-and-down strokes helps cursive look...|even|spiky|random",
    "How do you keep a steady speed in cursive?|Write in smooth, even strokes|Change speed every word|Hold your breath",
    "Who reads your writing?|Other people, so it must be clear|Only you|Nobody"
  ],
    ["Writing is for readers. Think about what helps them read it.", "Speed comes after control. Keep the hand loose and the strokes even.", "Example: Maya wrote one line slowly and neatly, then the next a bit faster at the same neatness. Her speed grew. Now do yours."],
    [["Flow", "🌊", "Smooth cursive moves like a wave. Keep your hand relaxed."], ["Slow first", "🐢", "Learn neat shapes first. Speed grows with practice."], ["Check", "👀", "If you cannot read it later, slow down."]]);
  const D3 = mk("Topic sentences", "📌", [
    "A topic sentence tells the reader...|what the paragraph is about|how to spell|what time it is",
    "Where does a topic sentence usually go?|At the beginning of the paragraph|Hidden in the middle|After the paragraph",
    "Which is a good topic sentence?|Dogs make wonderful pets.|Dogs.|I like it.",
    "Which is a good topic sentence?|Recycling helps our planet.|Yes.|The end.",
    "The sentences after the topic sentence give...|details and examples|a new topic|a different story",
    "Which sentence does NOT belong in a paragraph about bees?|My shoes are blue.|Bees make honey.|Bees live in hives.",
    "A paragraph should be about...|one main idea|ten ideas|no idea",
    "Which is the best topic sentence for a paragraph about winter?|Winter is a season with cold weather and snow.|Cold.|Banana.",
    "Which sentence is a detail that fits a paragraph about cats?|Cats can purr when they are happy.|Cars have four wheels.|The moon is round."
  ],
    ["Think about what the whole paragraph is about. Which sentence says that?", "A topic sentence is a complete sentence that names the main idea. Details come after it.", "Example: <b>Penguins are great swimmers.</b> is a topic sentence about penguins. Now do yours."],
    [["The big idea", "💡", "Every paragraph has one main idea. Say it in the first sentence."], ["Details", "🧩", "The next sentences add facts, examples and reasons."], ["Stay on topic", "🎯", "If a sentence is about something else, leave it out."]]);
  const D4 = mk("Proper nouns", "🏙️", [
    "Which word needs a capital letter?<br><b>We visited paris in July.</b>|paris|visited|July",
    "Which word needs a capital letter?<br><b>My friend sam lives in Canada.</b>|sam|friend|lives",
    "Which word needs a capital letter?<br><b>I read about the pacific Ocean.</b>|pacific|read|about",
    "Which word needs a capital letter?<br><b>We climbed mount Everest in a story.</b>|mount|climbed|story",
    "Which word needs a capital letter?<br><b>School is closed on monday.</b>|monday|closed|school",
    "Which needs a capital letter?|texas|table|garden",
    "Which is a proper noun?|Amazon River|river|mountain",
    "Which is NOT a proper noun?|city|Chicago|Japan",
    "Names of days and months start with...|a capital letter|a small letter|a number"
  ],
    ["A proper noun is the special name of one person, place or thing.", "Names of people, places, days, months and holidays start with a capital letter. Common words like city or river do not.", "Example: in <b>the city of Rome</b>, Rome is a special name but city is not. Now do yours."],
    [["Special names", "🏷️", "A <b>proper noun</b> names one special person, place or thing."], ["Capital letters", "🔠", "Start every proper noun with a capital: Lucy, Brazil, Friday, April."], ["Common nouns", "🪑", "Plain words like girl, country or day stay small, unless they start a sentence."]]);
  const D5 = mk("Contractions", "✂️", [
    "What does <b>don't</b> stand for?|do not|did not|does not",
    "What does <b>can't</b> stand for?|cannot|can it|can she",
    "What does <b>they're</b> stand for?|they are|their|they were",
    "What does <b>I'll</b> stand for?|I will|I all|I ill",
    "What does <b>isn't</b> stand for?|is not|is it|in not",
    "What does the apostrophe do in a contraction?|It shows where letters are missing|It adds extra letters|It makes the word plural",
    "Which is the contraction of <b>we are</b>?|we're|you're|they're",
    "Which is the contraction of <b>she is</b>?|she's|he's|it's",
    "Which is the contraction of <b>would not</b>?|wouldn't|couldn't|shouldn't",
    "Which letter does the apostrophe replace in <b>don't</b>?|o|n|t",
    "Which letters does the apostrophe replace in <b>I'm</b>?|a|m|I"
  ],
    ["Look at where the apostrophe sits. It takes the place of the missing letters.", "Join the two words, drop the letters the apostrophe replaces, and put the apostrophe in that exact spot.", "Example: <b>has not</b> becomes <b>hasn't</b>: the o is gone, and the apostrophe stands in its place. Now do yours."],
    [["Shortcuts", "✂️", "A <b>contraction</b> squeezes two words into one."], ["Apostrophe", "’", "The apostrophe goes exactly where letters were left out."], ["Write it neatly", "✍️", "Make the apostrophe a small, clear mark above the line."]]);
  const D6 = mk("Possessive apostrophes", "🏷️", [
    "One girl owns a bike. The girl___ bike. What do you add?|an apostrophe and s|only an apostrophe after the s|nothing, it is just a plural",
    "Many boys own toys. The boys___ toys. What do you add?|only an apostrophe after the s|an apostrophe and s|nothing, it is just a plural",
    "Three dogs are running in the park. The dogs___ are running. What do you add?|nothing, it is just a plural|an apostrophe and s|only an apostrophe after the s",
    "The cat owns a tail. The cat___ tail. What do you add?|an apostrophe and s|only an apostrophe after the s|nothing, it is just a plural",
    "Two teachers each have a desk. The teachers___ desks. What do you add?|only an apostrophe after the s|an apostrophe and s|nothing, it is just a plural",
    "My brother owns this room. My brother___ room. What do you add?|an apostrophe and s|only an apostrophe after the s|nothing, it is just a plural",
    "Five birds sit on a branch. Five birds___ sit there. What do you add?|nothing, it is just a plural|an apostrophe and s|only an apostrophe after the s",
    "The birds own the nests. The birds___ nests. What do you add?|only an apostrophe after the s|an apostrophe and s|nothing, it is just a plural",
    "Mia owns a hat. Mia___ hat. What do you add?|an apostrophe and s|only an apostrophe after the s|nothing, it is just a plural"
  ],
    ["Ask yourself: does something belong to someone, or are there just more than one?", "Is there an owner? Is it one owner, or many owners whose word already ends in s?", "Example: the ball of the child is <b>the child's ball</b>: one owner, so the apostrophe comes before the s. Now do yours."],
    [["Who owns it?", "🔑", "An apostrophe can show that something belongs to someone."], ["One owner", "1️⃣", "Add an apostrophe and s: the bird's nest."], ["Many owners", "👥", "If the word already ends in s, add only an apostrophe: the birds' nests."]]);
  const D7 = mk("Writing what people say", "💬", [
    "Which words go inside the quotation marks?<br><b>Sam said, \"Let's go.\" Then he left.</b>|Let's go.|Sam said|Then he left",
    "Which words go inside the quotation marks?<br><b>Ana asked, \"Can I help?\" Dad smiled.</b>|Can I help?|Ana asked|Dad smiled",
    "Which words go inside the quotation marks?<br><b>\"I am ready,\" said Ben.</b>|I am ready,|said Ben|Ben",
    "Which words go inside the quotation marks?<br><b>The coach shouted, \"Run faster!\" We ran.</b>|Run faster!|The coach shouted|We ran",
    "The words a person says go inside...|quotation marks|brackets|capital letters only",
    "In dialogue, a new speaker usually starts...|a new line|the same line|a new page",
    "What do quotation marks look like?|Small marks above the line, like \" \"|Small marks below the line|Big boxes",
    "The first word of a spoken sentence starts with...|a capital letter|a small letter|a number",
    "Which word in this sentence needs a capital?<br><b>Mia said, \"we can play now.\"</b>|we|said|play"
  ],
    ["Find the exact words someone says. Those go inside the marks.", "Quotation marks wrap only the spoken words, not the words like said or asked. A spoken sentence starts with a capital.", "Example: in <b>Lee said, \"Let's play.\"</b> the marks wrap only Let's play. Now do yours."],
    [["Quotation marks", "💬", "Write marks around the exact words someone says."], ["Punctuation inside", "❗", "The comma, period, question mark or exclamation mark goes inside the closing marks."], ["New speaker", "↩️", "Start a new line each time a different person talks."]]);
  const D8 = mk("Proofreader marks", "🖍️", [
    "A small caret (^) in a line means...|add something here|take something out|start a new paragraph",
    "A line through a word means...|delete it|add it|make it capital",
    "Three short lines under a letter mean...|make it a capital letter|make it bold|make it small",
    "The paragraph sign (¶) means...|start a new paragraph|add a period|delete a word",
    "What is proofreading?|Reading to find and fix mistakes|Writing the first draft|Drawing pictures",
    "Why use a different color to proofread?|So corrections stand out|It is required by law|To use up ink",
    "You see <b>the cat sat on mat</b> with a caret between on and mat. What was missing?|the|a period|a comma",
    "The best time to proofread is...|after you finish writing|before you start|never",
    "What do you check when proofreading?|Spelling, capitals and punctuation|Only the date|Only the title"
  ],
    ["These small marks are a code editors use. Think about what each tells the writer to do.", "A caret adds, a line through deletes, three lines make a capital, and a paragraph sign starts a new paragraph.", "Example: if you cross out an extra word, the line through it says delete. Now do yours."],
    [["Editing code", "🖍️", "Proofreaders use small marks so everyone understands the changes."], ["Common marks", "✏️", "^ add. Line through = delete. Three lines under a letter = capital. ¶ = new paragraph."], ["Read twice", "👀", "First read for meaning. Then read again for spelling and punctuation."]]);
  const D9 = mk("Writing a thank-you note", "💌", [
    "A thank-you note should say...|what you are thankful for|a joke only|nothing",
    "A thank-you note usually starts with...|a greeting like Dear Aunt Lee,|the date at the end|a long list",
    "How should the note end?|With a closing like Love, and your name|With no name|With a question about homework",
    "Which sentence is a good detail?|I love the blue scarf. It keeps me warm.|Thanks.|Whatever.",
    "Why write a thank-you note by hand?|It shows you took time and care|It is faster|Nobody can read it",
    "Which closing fits a note to a teacher?|Sincerely, Jo|Bye dude, Jo|Yo, Jo",
    "What comes right after the greeting?|The message|The closing|The envelope",
    "Which makes a note feel kind?|Saying how the gift helped you|Asking for more gifts|Complaining",
    "The note should be written...|neatly, so it is easy to read|as fast as possible|in tiny letters"
  ],
    ["Think about the parts of a note: greeting, message, closing, name.", "Say thank you, mention the gift or kindness, say how it helped, then close politely with your name.", "Example: Dear Grandpa, Thank you for the book. I read it twice! Love, Ben. Now do yours."],
    [["Greeting", "👋", "Begin with Dear, then the person's name and a comma."], ["Message", "📝", "Say thank you, name the gift, and tell why you like it."], ["Closing", "💌", "End with a kind closing and your name, written neatly."]]);
  const D10 = mk("Pencil grades", "✏️", [
    "On a pencil, the letter <b>B</b> stands for...|black (soft, dark)|big|bright",
    "On a pencil, the letter <b>H</b> stands for...|hard (light line)|happy|heavy",
    "Which pencil makes the darkest line?|6B|HB|4H",
    "Which pencil makes the lightest line?|4H|HB|2B",
    "Which grade is in the middle, often used for writing?|HB|9B|9H",
    "A softer pencil...|smudges more easily|never smudges|cannot write",
    "Which pencil is best for light guide lines you will erase?|2H|8B|6B",
    "A pencil marked 2B is...|softer than HB|harder than HB|the same as 4H",
    "What do you use to remove light pencil lines?|An eraser|Water|A pen"
  ],
    ["One letter means soft and dark. The other means hard and light. HB sits between.", "A bigger number next to B is softer and darker. A bigger number next to H is harder and lighter.", "Example: 4B is softer and darker than 2B. Now do yours."],
    [["Letters on pencils", "✏️", "<b>B</b> = black and soft. <b>H</b> = hard. <b>HB</b> = in the middle."], ["Numbers", "🔢", "More B = darker and softer. More H = lighter and harder."], ["Which to use", "🎨", "HB for writing. Hard pencils for light guide lines. Soft ones for dark shading."]]);
  const D11 = mk("Left-handed writers", "🤚", [
    "About how many people are left-handed?|About 1 in 10|About 9 in 10|Nobody",
    "A left-handed writer often tilts the paper...|to the right|to the left|so it is upside down",
    "Why can left-handers smudge ink?|Their hand drags across wet writing|Their pen is bigger|They write too small",
    "A good way to avoid smudging is to...|hold the pen a little higher up|press harder|write over the top of the ink",
    "Is left-handed writing worse than right-handed writing?|No, both can be neat|Yes always|Only on Mondays",
    "Which tool can help a left-hander?|Quick-dry ink or pencils|Wet paint|A broken pen",
    "Where should the writing hand stay?|Below the line being written|On top of the wet ink|In the air",
    "Left-handed and right-handed writers can both...|write beautifully|never write cursive|only use pencils",
    "Which helps avoid shadows on the page?|Light coming from the opposite side to the writing hand|Writing in the dark|Light right in your eyes"
  ],
    ["Think about how the hand moves across the page for left-handed writers.", "A slanted paper keeps the hand below the line, away from wet ink, and light from the other side avoids shadows.", "Example: Rosa tilted her paper and held her pencil a bit higher. Her hand stopped smudging. Now do yours."],
    [["Left and right", "🤝", "Left-handed and right-handed writers can both write beautifully."], ["Paper tilt", "📄", "A left-hander tilts the paper so the hand stays below the writing."], ["Smudge-free", "✨", "Hold the pen a bit higher up and use quick-dry ink or pencil."]]);
  const D12 = mk("Numbers in words", "🔢", [
    "How do you write <b>13</b> in words?|thirteen|thirten|threeteen",
    "How do you write <b>40</b> in words?|forty|fourty|fortty",
    "How do you write <b>15</b> in words?|fifteen|fiveteen|fifteene",
    "How do you write <b>18</b> in words?|eighteen|eightteen|eigtheen",
    "How do you write <b>45</b> in words?|forty-five|fourty-five|forty-fiv",
    "How do you write <b>90</b> in words?|ninety|ninty|nintey",
    "How do you write <b>21</b> in words?|twenty-one|twentyon|twenty-won",
    "Which number is spelled <b>twelve</b>?|12|20|2",
    "Which spells 80 correctly?|eighty|eigthy|eightty"
  ],
    ["Say the number out loud and listen for each part.", "Watch tricky spellings: the number 4 loses its u in some number words, and some endings change. Use a hyphen from 21 to 99.", "Example: 62 is sixty-two, with a hyphen between the tens and the ones. Now do yours."],
    [["Words, not digits", "🔢", "Some writing needs numbers spelled out, such as checks and formal letters."], ["Tricky ones", "⚠️", "<b>forty</b> has no u. <b>eighteen</b> and <b>eighty</b> share the same start."], ["Hyphens", "➖", "Use a hyphen from 21 to 99: twenty-one, sixty-five."]]);
  const D13 = mk("Writing the date", "📅", [
    "What is wrong with this date?<br><b>march 5, 2024</b>|march needs a capital letter|the year is wrong|nothing is wrong",
    "What is wrong with this date?<br><b>Friday june 12</b>|june needs a capital letter|Friday is not a day|nothing is wrong",
    "What is wrong with this date?<br><b>October 9 2026</b>|it needs a comma before the year|October needs a small letter|nothing is wrong",
    "What is wrong with this date?<br><b>monday, April 4</b>|monday needs a capital letter|April needs a small letter|nothing is wrong",
    "In <b>May 3, 2025</b>, what does the comma do?|It separates the day from the year|It ends the sentence|It shows a question",
    "Months always start with...|a capital letter|a small letter|an apostrophe",
    "What goes at the top of a letter?|The date|The stamp|The closing",
    "What is the first month of the year?|January|June|March",
    "What is wrong with this date?<br><b>January 1, 2030</b>|nothing is wrong|January needs a small letter|it needs no comma at all"
  ],
    ["Months and days are names, so think about capitals. Then think about where the comma goes.", "Write the month with a capital, then the day, then a comma, then the year.", "Example: <b>August 14, 2022</b>: capital A, the day, a comma, and the year. Now do yours."],
    [["Capital names", "🔠", "Days and months always start with a capital letter."], ["Comma", "🪄", "In a full date, put a comma between the day number and the year."], ["Where it goes", "📍", "Put the date at the top of a letter or your work so people know when you wrote it."]]);
  const D14 = mk("Neat crossing out", "🧹", [
    "When you make a mistake in ink, the neatest fix is...|one straight line through it|scribbling a big blob|tearing the page",
    "After crossing out, you should...|write the correction next to it|erase with your finger|leave a blank",
    "Why avoid scribbling over mistakes?|It is messy and hard to read|It saves time|It is required",
    "In pencil, the best way to fix a mistake is to...|erase it gently|poke a hole|cut the page",
    "A single line through a word still lets the reader...|see what was changed|see nothing|guess",
    "Which looks neater?|A single line through the word|A huge messy scribble|A hole in the paper",
    "If you press too hard with an eraser, you may...|tear the paper|improve the writing|add color",
    "Correction fluid is used to...|cover a mistake with white|add color|make a hole",
    "A very messy page can be fixed by...|rewriting it neatly|crumpling it|ignoring it"
  ],
    ["Mistakes happen to every writer. The goal is to fix them so the page stays easy to read.", "In pen, draw one straight line through the mistake and write the correction beside it. In pencil, erase gently.", "Example: she wrote <b>cat</b> but meant <b>hat</b>. One line through cat, then hat next to it. Now do yours."],
    [["Everyone slips", "😅", "Even expert writers make mistakes."], ["One line", "➖", "In pen, draw one straight line through the error."], ["Pencil", "🧽", "In pencil, erase gently, brush away the crumbs, and write again."]]);
  const D15 = mk("Writing an address", "📮", [
    "On an envelope, the address goes...|in the middle of the front|on the back only|on the stamp",
    "Where does the stamp go?|Top right corner|Bottom left corner|Inside the envelope",
    "The ZIP code (postal code) is written...|at the end of the address|at the start|nowhere",
    "Which address line is in the right order?|123 Oak Street|Oak Street 123 Street|Street 123",
    "What goes on the first line of an address?|The person's name|The stamp|The date",
    "Why must an address be written clearly?|So the mail carrier can read it|So it looks fancy|So it is longer",
    "The sender's return address goes...|in the top left corner|under the stamp|inside the stamp",
    "Which is the US state code for Texas?|TX|TE|XT",
    "In a US ZIP code, how many numbers are there?|5|2|10"
  ],
    ["Think about the mail carrier. What do they need to read first, and where?", "Name first, then street, then city, state and ZIP code. Write in dark ink with clear letters.", "Example: Ms. Kim, 7 Pine Road, Denver, CO 80202. Now do yours."],
    [["Line by line", "📝", "Write the name, then the street, then the city, state and ZIP code."], ["Where?", "📍", "Address in the middle. Stamp top right. Your return address top left."], ["Clear", "👁️", "Use dark ink and clear letters so the letter reaches the right house."]]);
  const D16 = mk("Fast note-taking", "⚡", [
    "A good note uses...|key words, not whole sentences|every word you hear|only pictures",
    "Which symbol is a handy shortcut for <b>and</b>?|the ampersand (&)|the question mark|the dollar sign",
    "What does <b>w/</b> usually mean in notes?|with|without|water",
    "Which is a handy shortcut for <b>for example</b>?|e.g.|a.m.|p.s.",
    "What is the best way to take notes?|Write the main ideas in your own words|Copy everything|Draw random doodles",
    "Which word is a keyword in <b>The Nile is the longest river in Africa</b>?|Nile|the|is",
    "Why leave space in your notes?|So you can add more later|To waste paper|Because it is a rule",
    "What should you do after class with your notes?|Read them again|Throw them away|Never look",
    "Which is the best short note about bees?|bees: 2 pairs of wings|bees are very small and they have two pairs of wings which are thin|zzz zzz"
  ],
    ["Notes are not copies. Keep the big ideas only.", "Use short words, symbols and abbreviations. Keep your handwriting neat enough to read tomorrow.", "Example: <b>Plants need sun and water</b> can become <b>plants: sun + water</b>. Now do yours."],
    [["Keywords", "🔑", "Write only the most important words."], ["Shortcuts", "✂️", "Use symbols like &amp;, + and w/ and e.g. to save time."], ["Read again", "🔁", "Review your notes soon so you remember them."]]);
  const D17 = mk("Hands need breaks", "🤲", [
    "How often should you rest your hand during long writing?|Every little while|Never|Once a year",
    "A good hand stretch is to...|open and close your fingers|squeeze very hard|bend them backwards hard",
    "If your hand hurts while writing, you should...|stop and rest|press harder|keep going without stopping",
    "A relaxed grip means...|holding the pen lightly|squeezing it as hard as you can|holding the tip",
    "Shaking out your hands helps them...|relax|get tired|turn blue",
    "Good posture while writing means...|sitting up with both feet on the floor|lying under the table|standing on the chair",
    "Why does a tight grip cause trouble?|It tires the hand and fingers|It makes you faster|It makes ink brighter",
    "Where should your eyes be when you write?|On the page|On the ceiling|Closed",
    "Which helps your wrist feel good?|Resting the side of your hand on the desk|Holding it in the air|Twisting it hard"
  ],
    ["Think about what makes hands tired when they work a long time.", "A light grip, good posture and regular stretch breaks keep your hand comfortable.", "Example: after a long page, Lee shook out his fingers and wrote again with a loose grip. Now do yours."],
    [["Rest", "😌", "Take a short break after long writing."], ["Stretch", "🤸", "Open and close your fingers, and shake your hands gently."], ["Light grip", "🪶", "A loose hold on the pencil keeps your hand from getting sore."]]);
  const D18 = mk("Handwriting on forms", "📋", [
    "When filling in a form, you should write in...|capital print letters if asked|tiny cursive only|invisible ink",
    "Why use one color of ink on a form?|It looks tidy and clear|It is a rule of math|It costs less",
    "A form box is small. What should you do?|Write small, neat letters inside the box|Write across the whole page|Write outside the box",
    "Which pen is best for forms?|A dark ink pen|A pale yellow pencil|A white crayon",
    "Before you write on a form, you should...|read the instructions|rush|guess",
    "A form asks for your first name. You write...|only your first name|your whole life story|a joke",
    "What should you do if you make a mistake on a form?|Fix it neatly with one line|Scribble over it|Rip it up",
    "Why print numbers clearly on forms?|So 1 and 7 are not mixed up|To make them bigger|To run out of room",
    "Always check your form...|before you hand it in|never|after losing it"
  ],
    ["Forms are read by other people, sometimes in a hurry. Make it easy for them.", "Read the instructions, stay inside the boxes, use dark ink, and print clearly.", "Example: Noor read the form, printed her name in capitals inside the box, and checked it. Now do yours."],
    [["Read first", "📖", "Read all the instructions before you write."], ["Inside the boxes", "⬜", "Print neatly and keep your letters inside the boxes."], ["Check", "✅", "Look over the form before you hand it in."]]);
  const L7 = [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18];

  // =============== LEVEL 8 ===============
  const E1 = mk("Cursive capital letters", "👑", [
    "Cursive capital letters are used for...|the start of sentences and names|the middle of every word|nothing",
    "In cursive, a capital letter is usually...|taller than most lowercase letters|smaller than lowercase letters|the same size as lowercase",
    "Which word should start with a cursive capital?|Monday|table|run",
    "Do all cursive capitals look like their print capitals?|No, many look different|Yes, exactly|There are no capitals",
    "Cursive capitals often start with...|a curved or looped stroke|a dot|a circle only",
    "When writing a name in cursive, the first letter is...|a capital|a number|a symbol",
    "Which needs a capital in cursive?|the word I|the word and|the word of",
    "What should you do if a capital is hard to write?|Practice it slowly many times|Skip it|Make it tiny",
    "After a cursive capital, the next letter...|may or may not join, depending on the style|never exists|is always a capital too"
  ],
    ["Capital letters mark the start of a sentence or a name, in print and in cursive.", "Cursive capitals rise above the small letters, and many start with a curve. Practice makes them smooth.", "Example: write <b>Anna</b>. Only the first A is a capital. Now do yours."],
    [["Big starts", "👑", "Use a capital to begin sentences and names."], ["Tall and fancy", "📏", "Cursive capitals rise above the small letters and often start with a curve."], ["Practice", "🔁", "Trace each capital slowly before you write it quickly."]]);
  const E2 = mk("Cursive letter heights", "📐", [
    "In cursive, which letters have tall loops going above the line?|b, h, k, l|a, c, e, o|m, n, r, s",
    "In cursive, which letters have loops going below the line?|g, j, y, z|b, d, h, k|a, c, e, o",
    "Which letters stay small, between the middle and base lines?|a, c, e, o, u|b, d, f, l|g, j, p, q",
    "Which of these has a tail below the line?|y|t|o",
    "Which of these has a tall loop above the line?|l|n|w",
    "If your tall loops and small letters are all the same height, your word will...|be hard to read|look perfect|be very fast",
    "The tall loops in cursive should be about...|twice as tall as small letters|the same as small letters|tiny like a dot",
    "Where is the baseline?|The line the letters sit on|The top of the page|The page border",
    "Which of these has a tail below the line?|g|d|i"
  ],
    ["Picture the three zones: loops up top, small letters in the middle, tails below.", "Tall letters touch the top line, small letters fill the middle, and tails drop below the baseline.", "Example: in <b>yell</b>, the y drops below and the two l's climb high, but e stays small. Now do yours."],
    [["Three zones", "📏", "Cursive uses a top zone, a middle zone and a tail zone."], ["Loops up", "🎈", "b, h, k and l reach the top."], ["Tails down", "🪂", "g, j, y and z drop below the baseline."]]);
  const E3 = mk("Writing on blank paper", "📄", [
    "To write straight on unlined paper, you can...|put a lined sheet underneath|write at random|use crayons",
    "A guide sheet is...|a lined page that shows through|a ruler for math only|a book",
    "If your lines slope up, you should...|use a ruler or guide to keep them level|write bigger|give up",
    "Why write straight lines of text?|It is easier to read|It saves ink|It is a secret code",
    "Light pencil lines drawn first help you...|keep the writing straight|keep it secret|spill ink",
    "Which tool helps draw straight guide lines?|A ruler|A magnet|A cup",
    "After writing with pencil guides, you should...|erase them gently|leave them dark|tear them off",
    "A page with wobbly lines is usually fixed by...|using a guide|pressing harder|writing faster",
    "Space between lines of writing should be...|even|different every line|zero"
  ],
    ["No lines on the page? Make your own, or borrow some.", "A lined sheet placed under thin paper shows through. Or draw light lines with a ruler and erase them later.", "Example: Ivy slid a lined guide under her blank paper, and her writing stayed straight. Now do yours."],
    [["Be your own lines", "📏", "On blank paper, make light guide lines first."], ["Guide sheet", "🔦", "A dark-lined sheet under thin paper shows through."], ["Erase", "🧽", "Erase pencil guides when the ink is dry."]]);
  const E4 = mk("Beginning, middle, end", "📖", [
    "A story's beginning usually tells...|who and where|how it ends|nothing",
    "The middle of a story usually has...|the problem or action|the title|a blank page",
    "The end of a story usually shows...|how the problem is solved|a new problem only|the author's name only",
    "Which sentence would likely start a story?|One sunny morning, a puppy woke up in a barn.|And they lived happily.|The end.",
    "Which sentence belongs near the end?|At last, the puppy found his family.|Once upon a time, a puppy slept.|The puppy was brown.",
    "What do you plan before writing a story?|The beginning, middle and end|Only the title|Only the last word",
    "Why do writers plan before they write?|It makes writing clearer|It uses less paper|It is a secret",
    "A short plan can be written as...|a few notes or a list|a long book|nothing",
    "Which sequence word helps order a story?|first|banana|soft"
  ],
    ["A story is like a journey with a start, a middle and a finish.", "Start with characters and setting, add a problem or event, then solve it at the end.", "Example: First a boy lost a kite. Then he looked everywhere. In the end he found it in a tree. Now do yours."],
    [["Three parts", "📖", "A story has a beginning, a middle and an end."], ["Plan", "🗒️", "Jot a few notes before writing so you know where you are going."], ["Order words", "➡️", "Use first, next, then and finally to connect the parts."]]);
  const E5 = mk("Paragraph layout", "🧾", [
    "To show a new paragraph by hand, you can...|indent the first line|write everything in one block|use all capitals",
    "An indent is...|a gap at the start of the first line|a gap at the end of the page|a line through words",
    "Another way to show a new paragraph is to...|leave a blank line between paragraphs|write it upside down|turn the page",
    "Why use paragraphs?|They make writing easier to read|They use more ink|They are required in math",
    "A new paragraph begins when...|you move to a new idea|every sentence|never",
    "How big is a usual indent?|About a thumb's width|The whole page|Zero",
    "Should every line in a paragraph be indented?|No, only the first|Yes, all of them|Only the last",
    "A page with no paragraphs is...|hard to read|easy to read|full of pictures",
    "What should you leave around the edges of your writing?|Margins|Pictures|Nothing"
  ],
    ["Paragraphs give the reader a breath. Think about how you show where they begin.", "Indent the first line a little, or leave a blank line. Start a new paragraph when the topic changes.", "Example: when Mia moved from describing her dog to describing her cat, she indented. Now do yours."],
    [["New idea", "💡", "Begin a new paragraph for each new idea."], ["Indent", "➡️", "Start the first line a small way in from the margin."], ["Margins", "🖼️", "Leave clear space around the edges."]]);
  const E6 = mk("Commas in a series", "🧺", [
    "Where does the first comma go?<br><b>I bought apples pears and plums.</b>|after apples|after pears|after bought",
    "Where does the first comma go?<br><b>We saw lions tigers and bears.</b>|after lions|after saw|after tigers",
    "Where does the first comma go?<br><b>Pack a hat a coat and a scarf.</b>|after hat|after Pack|after coat",
    "Where does the first comma go?<br><b>I like red blue and green.</b>|after red|after like|after blue",
    "Commas in a list separate...|the items|the title|the page",
    "How many commas are needed for a list of 4 items (with and before the last)?|3|1|7",
    "A comma is written...|low, near the line, with a small tail|high above the line|as a big dot",
    "Where does the comma go in <b>Yes I can</b>?|After Yes|After can|There is no comma",
    "Where does the comma go in <b>Mom can I go</b>?|After Mom|After can|After go"
  ],
    ["Count the items in the list. A comma separates them.", "Put a comma after each item except the last. Before the last item, use and.", "Example: <b>We ate rice, beans, and corn.</b> Two commas for three items. Now do yours."],
    [["Lists", "🧺", "A comma separates items in a list."], ["Last item", "➕", "Add and before the last item."], ["Neat comma", "✍️", "Write a small comma sitting on the line with a short tail."]]);
  const E7 = mk("Headings and subheadings", "🗂️", [
    "A heading tells the reader...|what the section is about|how to spell|the weather",
    "A title goes...|at the top of the page|at the bottom|in the margin",
    "A subheading is...|a smaller heading inside a section|the author name|the page number",
    "How can you make a heading stand out by hand?|Underline it or write it larger|Write it tiny|Hide it",
    "Which is better as a heading for a section about whales?|Whale Facts|and so|??",
    "How long should a heading be?|A few words|A whole page|None",
    "A report on frogs may have headings like...|Where Frogs Live and What Frogs Eat|ABCDEF|Hello",
    "Why use headings?|They organize the page|They use up ink|They are secret",
    "Where should headings start?|At the left margin or centered|Off the page|In the middle of a word"
  ],
    ["Think about a book's contents page. What lets you find a section fast?", "Headings are short, clear and stand out from the writing, with bigger letters or an underline.", "Example: under the title Frogs, the heading Frog Homes begins a new part. Now do yours."],
    [["Title", "🏷️", "The title goes at the top and says what the whole piece is about."], ["Headings", "🗂️", "Each heading names one section."], ["Stand out", "🔦", "Use bigger letters or an underline to show headings."]]);
  const E8 = mk("Lists and bullets", "📝", [
    "A bullet point is...|a small dot that starts each item in a list|a pencil|a type of paper",
    "When is a numbered list better than bullets?|When the order matters|Never|When you are tired",
    "Steps in a recipe should be a...|numbered list|random scribble|single long word",
    "A shopping list is usually...|bullets or a simple list|a poem|a letter",
    "Each item in a list should start...|on a new line|in the middle of a line|on a new page",
    "Why keep list items short?|They are easy to scan|They hide ideas|They need more paper",
    "How should you line up list items?|Start each at the same place on the left|Zigzag randomly|Write in a circle",
    "Which list needs numbers?|Steps to tie a shoe|Things in my bag|Favorite animals",
    "Should the bullets look the same?|Yes, so it looks tidy|No, change each|They don't matter"
  ],
    ["Does the order of the items matter, or are they just a collection?", "Use numbers for steps in order. Use bullets for things where order does not matter. Keep everything lined up.", "Example: steps to wash hands are numbered 1, 2, 3, but my favorite fruits can have bullets. Now do yours."],
    [["Bullets", "•", "Use small dots for lists where order does not matter."], ["Numbers", "1️⃣", "Use numbers for steps that must happen in order."], ["Line up", "📏", "Start every item at the same spot."]]);
  const E9 = mk("Keeping a journal", "📔", [
    "A journal entry usually starts with...|the date|the answer key|a stamp",
    "A journal is written in...|your own words, about your day|someone else's words|only math",
    "Which makes a good journal entry?|What happened and how you felt|One word|Nothing",
    "How often is it good to write in a journal?|Regularly, like a few times a week|Never|Once in 50 years",
    "Who reads your journal?|Whoever you choose to share it with|Everyone in town|Nobody ever",
    "Journal writing helps you practice...|writing and thinking|only math|only sleeping",
    "Does your journal have to be perfect?|No, it is for practicing and remembering|Yes, or you fail|Only on Sundays",
    "What can you add to a journal?|Drawings and small notes|Nothing|A broken pen",
    "Why write the date first?|To remember when it happened|To win a prize|To skip spelling"
  ],
    ["A journal keeps your memories. What helps you find them later?", "Start with the date, write what happened and how you felt, and keep going a little each day.", "Example: <b>May 4. Today I rode my bike to the park. I felt proud.</b> Now do yours."],
    [["Date first", "📅", "The date helps you find your entry later."], ["Your words", "💭", "Write what happened and how you felt."], ["A little often", "🔁", "A few minutes often is better than a huge entry once."]]);
  const E10 = mk("From quill to ballpoint", "🪶", [
    "Long ago, people wrote with a feather pen called a...|quill|crayon|marker",
    "Quill pens were dipped in...|ink|water|paint cans only",
    "Which came first?|Quill pen|Ballpoint pen|Gel pen",
    "A fountain pen holds ink in...|a built-in reservoir|a crayon|a magnet",
    "A ballpoint pen has a tiny rolling ball at the tip that...|spreads ink onto paper|cuts paper|glows",
    "Which machine was made for typing rather than writing?|The typewriter|The quill|The pencil",
    "A pencil has a core of...|graphite inside a case|ink only|a feather",
    "Quill pens were once made from...|bird feathers|plastic|metal wires only",
    "Why were quill tips trimmed?|To make a good writing point|To make them heavier|For no reason"
  ],
    ["Think of the order: feather, then metal nib, then built-in ink, then the rolling ball.", "Each new pen aimed to be faster, cleaner or easier than the one before.", "Example: the quill needed dipping again and again, but the fountain pen stored ink inside. Now do yours."],
    [["Quill", "🪶", "A quill was a feather with a cut tip, dipped in ink."], ["Fountain pen", "🖋️", "It stores ink inside, so you do not need to dip it."], ["Ballpoint", "🖊️", "A tiny rolling ball spreads quick-drying ink."]]);
  const E11 = mk("Where our letters came from", "🏛️", [
    "Our alphabet is based on the...|Roman (Latin) alphabet|Chinese characters|Musical notes",
    "How many letters are in the English alphabet?|26|20|30",
    "The word <b>alphabet</b> comes from the first two letters of the Greek alphabet. They are...|alpha and beta|alpha and zeta|beta and gamma",
    "Roman capital letters were often carved into...|stone|cloth|bread",
    "What are capital letters also called?|Uppercase|Lowercase|Mid-case",
    "Small letters are also called...|lowercase|uppercase|big case",
    "The names uppercase and lowercase come from old printers' trays called...|cases|boxes of fruit|bags",
    "Writing systems help people...|share ideas|forget things|stay silent",
    "Which came first?|Writing by hand|Printing presses|Computers"
  ],
    ["Think about how writing grew over thousands of years.", "Ancient peoples invented symbols. The Romans shaped capitals, and later lowercase letters developed for faster handwriting.", "Example: carved Roman capitals were strong and square, while quick handwriting made rounder small letters. Now do yours."],
    [["Alphabets", "🔤", "The English alphabet comes from the Latin one and has 26 letters."], ["Alpha-beta", "🏛️", "The word alphabet starts from the Greek letters alpha and beta."], ["Upper and lower", "🗄️", "Printers kept capitals in the upper case and small letters in the lower case."]]);
  const E12 = mk("Look-alike letters", "👀", [
    "Which pair of letters is easy to mix up if written carelessly?|a and o|a and z|b and x",
    "To keep <b>a</b> and <b>o</b> different, you should...|close the circle and add a stick for the a|leave both open|make them tiny",
    "To tell <b>e</b> and <b>l</b> apart in cursive, remember that l...|has a tall loop|has no loop|is the same size",
    "What can make <b>u</b> look like <b>v</b>?|Not curving the bottom|Writing too neatly|Using a pencil",
    "To make <b>n</b> and <b>h</b> different, h should be...|tall|small|crossed",
    "What can make <b>r</b> look like <b>n</b>?|Skipping the second hump|Writing neatly|Large size",
    "Which fix helps readers tell 1 and 7?|Add a flag on the 7|Make both the same|Write them tiny",
    "Which letters can look alike when sloppy?|u and v|q and k|x and w",
    "If a word is hard to read, you should...|rewrite it more clearly|ignore it|circle it in red"
  ],
    ["Which small detail makes one letter different from the other?", "Close loops, give tall letters their full height, and keep bottoms and tops curved the right way.", "Example: the letter t has a cross but l does not, so crossing it carefully tells them apart. Now do yours."],
    [["Small differences", "🔍", "A tiny loop or stick can change a letter completely."], ["Close the circle", "⭕", "Finish a and o properly."], ["Re-read", "👁️", "Read your own writing as if you were a stranger."]]);
  const E13 = mk("Copy or dictation", "🎧", [
    "Dictation means...|writing down words someone says|copying a page|drawing a picture",
    "When you copy from a book, you look at the page and...|write exactly what is there|write a different story|write backwards",
    "Which skill is practiced mostly by dictation?|Listening and spelling|Drawing|Running",
    "When taking dictation, it helps to...|listen carefully to each word|talk over the speaker|close your ears",
    "If you miss a word in dictation, you should...|leave a gap and carry on|stop writing completely|make up a long story",
    "Copying carefully helps with...|spelling and neat writing|speed running|painting",
    "After dictation, you should...|check your work|throw it away|lose the page",
    "A dictation passage is read...|slowly, a few words at a time|all in one breath|backwards",
    "When copying, you should check...|each word as you write|only the last word|nothing"
  ],
    ["Does the writer read the words from a page, or hear them?", "Dictation: listen, then write. Copying: look, then write. Both need care and checking at the end.", "Example: hearing the words 'The sun is hot' and writing them is dictation. Now do yours."],
    [["Copying", "📋", "You look at the text and write it carefully."], ["Dictation", "🎧", "You listen and write down what you hear."], ["Check", "✅", "Compare your work with the original to find slips."]]);
  const E14 = mk("Slant styles", "↗️", [
    "Writing that leans to the right has a...|forward slant|backward slant|upright slant",
    "Writing that stands straight up has a...|vertical (upright) slant|forward slant|backward slant",
    "Writing that leans to the left has a...|backward slant|forward slant|round slant",
    "What matters most about slant?|Keeping it the same|Changing it often|Making it extreme",
    "Cursive is usually written with a...|slight forward slant|backward slant|upside down slant",
    "A good way to check slant is to...|draw light slanted guide lines|measure with a spoon|ignore it",
    "If every letter leans a different way, the writing looks...|messy|neat|perfect",
    "Slant is the angle of...|the tall strokes|the page size|the pen color",
    "Some left-handers find which slant comfortable?|Whichever suits them, as long as it is steady|Only forward|None"
  ],
    ["Picture the tall strokes: do they lean right, left, or stand straight?", "Any slant can look good if it stays steady. Mixed slants look messy.", "Example: if all your tall strokes lean right by the same amount, the slant is steady. Now do yours."],
    [["Forward slant", "↗️", "Letters lean to the right."], ["Upright", "⬆️", "Letters stand straight."], ["Backward", "↖️", "Letters lean to the left. Whatever you choose, keep it the same."]]);
  const E15 = mk("One-minute writing", "⏱️", [
    "A timed writing drill helps you practice...|speed and control|only sleeping|only math",
    "If your hand gets sore in a timed drill, you should...|slow down and relax|press harder|keep gripping",
    "Which comes first in a speed drill?|Neat letters|Super speed|Messy letters",
    "A good drill is to write a sentence...|over and over, checking neatness|once and never read it|upside down",
    "After a timed drill, you should...|check that it is still readable|toss it|forget it",
    "Writing the same sentence for a minute and counting words tells you...|your speed|your age|your height",
    "What should stay the same as speed goes up?|Neatness|Nothing|Paper color",
    "A sentence with every letter of the alphabet is useful for practice because it...|uses many different letters|is very short|has no vowels",
    "Why take breaks between drills?|Hands need to rest|Pens need a nap|Paper needs air"
  ],
    ["Faster is only good if people can still read it.", "Start slow and neat, then speed up a little at a time, stopping if the writing gets messy.", "Example: Raj counted 20 words in a minute, then tried for 22 without losing neatness. Now do yours."],
    [["Drill", "⏱️", "A timer makes practice fun."], ["Neat first", "✨", "Neatness first, then speed."], ["Track", "📈", "Count words and watch your progress over weeks."]]);
  const E16 = mk("Making a chart or table", "📊", [
    "A table has...|rows and columns|only one dot|a drawing",
    "Rows go...|across|up and down|diagonally",
    "Columns go...|up and down|across|in circles",
    "Why label each column?|So readers know what it shows|To use more ink|To hide the data",
    "A table about pets might have columns for...|name and type|the moon|a recipe",
    "Use a ruler to...|draw straight lines|spill ink|tear paper",
    "Words in a table should be...|short and neat|very long|invisible",
    "A table with title and labels is...|easy to read|confusing|useless",
    "Where does the title of a chart go?|At the top|Under the last row|Nowhere"
  ],
    ["A table is a grid. Think about which direction is a row and which is a column.", "Rows go across, columns go down. Give each column a label, and keep the writing small and neat.", "Example: a pet table with columns Name and Pet, and a row for each animal. Now do yours."],
    [["Rows and columns", "🧱", "Rows go across; columns go down."], ["Labels", "🏷️", "Give every column a short heading."], ["Neat grid", "📏", "Use a ruler and keep each entry inside its box."]]);
  const E17 = mk("Use the right size", "🔍", [
    "Small writing is best for...|notes and labels|posters|billboards",
    "Large writing is best for...|posters and signs|tiny notes|footnotes",
    "If your writing is too big for the line, you should...|write smaller|write bigger|use two pages",
    "If your writing is too small to read, you should...|write bigger|write smaller|use light ink",
    "Your writing should fit...|the space it is given|any space but the right one|nowhere",
    "Which makes a good label on a small jar?|small, neat letters|huge letters|none",
    "Which fits a sign for a hallway?|big, clear letters|tiny letters|faded letters",
    "Writing the same size throughout shows...|control|carelessness|speed",
    "Before writing a long word on a sign, you should...|plan the space|ignore the space|write backwards"
  ],
    ["Match the size of your letters to the size of the space and to how far away the reader is.", "Small neat writing for notes. Big, bold letters for signs. Plan where the words will fit.", "Example: Sara counted the letters and spaced them before writing her door sign, so it fit. Now do yours."],
    [["Fit", "📐", "Letters should fit the space they are given."], ["Distance", "👁️", "The further away the reader, the bigger the letters."], ["Plan", "✏️", "Sketch lightly before you commit to ink."]]);
  const E18 = mk("Good habits for tidy pages", "🌟", [
    "A tidy page has...|even margins and clear spacing|squashed text|big smudges",
    "Before handing in work, you should...|read it once more|rip it|leave it",
    "How can you keep ink from smudging?|Let it dry before touching|Rub it quickly|Spill water on it",
    "Keeping paper flat on the desk helps...|writing stay steady|writing get messy|ink go away",
    "Where should you put your date and name?|In the same place every time|Wherever|Nowhere",
    "Which makes a page harder to read?|Words crowded together|Clear spaces|Margins",
    "What is a good habit with a pen cap?|Put it back to keep ink fresh|Chew it|Leave it off",
    "A neat page shows the reader that you...|care about your work|are bored|forgot",
    "Sharp pencils help you...|make clear lines|break paper|erase ink"
  ],
    ["Think of a tidy page from top to bottom: top, middle, edges.", "Name and date in the same place, even margins, space between words, and a quick check at the end.", "Example: Dev put his name at the top right, kept his left margin even, and checked the page before handing it in. Now do yours."],
    [["Same place", "📍", "Name and date go in the same spot each time."], ["Space", "↔️", "Leave room between words and lines."], ["Check", "✅", "A last look can catch small slips."]]);
  const L8 = [E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17, E18];

  // =============== LEVEL 9 ===============
  const F1 = mk("Italic hand strokes", "🅸", [
    "Italic letters are...|slanted and narrow|round and wide|upside down",
    "Italic writing usually leans only...|a little to the right|all the way flat|to the left",
    "In italic, the arches of <b>n, m, h</b> spring from...|the stem|the bottom line|the tail",
    "Italic letters are based on the shape of an...|oval|square|triangle",
    "A good italic hand needs steady...|slant, size and spacing|colors|ink only",
    "Which letters in italic often have an exit stroke?|a, d, i, u|none|only capitals",
    "Italic became popular in...|Renaissance Italy|ancient Egypt|the Stone Age",
    "Italic is a style of...|calligraphy|cooking|math",
    "In italic writing, the o is shaped like...|an oval|a square|a star"
  ],
    ["Italic letters are narrow and lean forward. Picture an oval, not a circle.", "Keep the slant steady, make the arches spring from partway up the stem, and keep spacing even.", "Example: write n. Draw the stem, retrace up a little, then branch out in an arch. Now do yours."],
    [["Oval shapes", "🥚", "Italic letters follow the shape of an oval."], ["Steady slant", "↗️", "Keep the same slight lean for every letter."], ["Branching", "🌿", "Arches in n, m and h spring from the stem."]]);
  const F2 = mk("Broad-edge pens", "🖋️", [
    "A broad-edge pen has a tip that is...|flat and wide|round and tiny|spiky",
    "A broad-edge pen makes thick and thin strokes depending on...|the angle and direction|the color only|the paper size",
    "Keeping a constant pen angle (often about 45 degrees) gives...|consistent thick and thin lines|random lines|no lines",
    "If you keep turning the pen angle while writing, the letters will...|look uneven|look the same|disappear",
    "Which gives the thinnest line from a broad nib?|Moving along the nib's flat edge|Pushing across the nib|Pressing hard",
    "The width of the nib is often used to...|measure the letter height in nib widths|stir ink|trace",
    "Calligraphers often warm up by drawing...|ladders and zigzags|a landscape|an apple",
    "Before using a new nib, you should...|follow the maker's directions to prepare it|bite it|toss it",
    "A calligraphy pen is held at...|a steady angle to the paper|a random angle|upside down"
  ],
    ["The shape of the nib matters. Think about which direction uses its wide face.", "Hold the pen at one steady angle. Strokes across the nib's width are thick, and strokes along the edge are thin.", "Example: with the nib at 45 degrees, a down stroke is thick and a diagonal in the other direction is thin. Now do yours."],
    [["Flat nib", "🖊️", "A broad-edge nib is flat, like a tiny chisel."], ["Constant angle", "📐", "Hold it at the same angle for each stroke."], ["Thick and thin", "〰️", "The angle and direction decide how thick the line is."]]);
  const F3 = mk("Blackletter and italic", "🔤", [
    "Blackletter (Gothic) writing was used in...|medieval Europe|the Stone Age|modern text messages",
    "Blackletter letters look...|dark, heavy and angular|round and soft|thin and wavy",
    "Which is easier to read in a long paragraph?|Italic|Heavy blackletter in all capitals|A fancy swirl",
    "Why is blackletter in ALL CAPITALS hard to read?|The capitals are very ornate and look alike|It uses small letters|It is too short",
    "Italic is based on...|oval shapes|sharp diagonals|solid black blocks",
    "Blackletter is best for...|short titles and special text|long stories|math",
    "Which style looks more open and light?|Italic|Blackletter|They are the same",
    "Copperplate and italic are both examples of...|calligraphy styles|math signs|computer languages",
    "A calligrapher chooses a style to match...|the message and mood|only the color of ink|the date"
  ],
    ["Think about which letterforms look heavy and which look light.", "Blackletter is dark and angular. Italic is lighter and flows. Choose the style that fits the message.", "Example: a certificate title might use a decorative style, while a letter uses a clear one. Now do yours."],
    [["Blackletter", "🏰", "A dark, angular style used in medieval Europe."], ["Italic", "🌊", "A lighter, flowing style from the Renaissance."], ["Choose", "🎯", "Match the style to the job: decorative for titles, clear for reading."]]);
  const F4 = mk("Copperplate script", "🪶", [
    "Copperplate is a style of...|pointed pen script|bold block letters|stone carving",
    "Copperplate letters lean at about...|55 degrees from the baseline|90 degrees|0 degrees",
    "Which tool is typical for copperplate?|A flexible pointed nib|A flat chisel marker|A crayon",
    "In pointed pen script, thick lines come from...|pressing down on a downstroke|moving fast|lifting the pen",
    "Thin lines come from...|light pressure|heavy pressure|no ink",
    "Copperplate got its name from...|engraved copper plates used for printing|a copper pen|a penny",
    "Copperplate is often used for...|invitations and certificates|road signs|math books",
    "The smooth thick-and-thin look is called...|shading|erasing|taping",
    "Beginners should practice copperplate by...|doing slow, steady drills|rushing|skipping drills"
  ],
    ["Think about how the pen's tip bends when you press on it.", "A flexible point opens on a downstroke for a thick line and closes on upstrokes for a thin one.", "Example: press on the way down in a loop and lift on the way up. Now do yours."],
    [["Flexible point", "🖋️", "A pointed nib spreads when you press and closes when you lift."], ["Slant", "↗️", "Copperplate lines lean at a steady, strong angle."], ["Used for", "💌", "Invitations, certificates and special cards."]]);
  const F5 = mk("Brush lettering", "🖌️", [
    "In brush lettering, thick lines come from...|pressing on downstrokes|pressing on upstrokes|never pressing",
    "In brush lettering, thin lines come from...|light pressure on upstrokes|heavy pressure|a dry brush",
    "A brush pen is good for...|signs, cards and decoration|math tests|measuring",
    "Brush pen tips are...|flexible|rock hard|made of glass",
    "To keep a brush pen healthy, you should...|put the cap on when done|chew it|leave it open",
    "What makes your brush letters smooth?|Slow, steady strokes|Quick jerks|Pressing wildly",
    "Brush lettering often uses a mix of...|thick and thin strokes|only thick|no strokes",
    "Which is the best first step in brush lettering?|Practice basic strokes|Make a poster|Skip warm-ups",
    "A brush pen should be stored...|with its cap on|open in the sun|in a freezer"
  ],
    ["Press on the way down, lift on the way up. Think of a bending tip.", "Heavy pressure makes thick downstrokes, and light pressure makes thin upstrokes. Slow and steady wins.", "Example: for a curve, press down on the downstroke and lighten on the way up. Now do yours."],
    [["Pressure", "👇", "Press down for thick lines and lift for thin lines."], ["Warm up", "🔥", "Practice basic strokes before letters."], ["Care", "🧴", "Cap your pens so they do not dry out."]]);
  const F6 = mk("Calligraphy, typography, lettering", "🎨", [
    "Calligraphy is...|beautiful handwriting made with a flowing hand|a type of font on a computer|a kind of music",
    "Typography is...|the art of arranging type|painting a house|cooking",
    "Lettering is...|drawing letters one at a time|only typing|only reading",
    "A <b>font</b> is...|a set of letter shapes for printing or screens|a type of pencil|a paper size",
    "Which is made by hand, stroke by stroke?|Calligraphy|A font|Autocorrect",
    "Which is done on a computer or press?|Typography|A brush stroke|A pencil sketch",
    "A designer who draws each letter of a logo is doing...|lettering|typing|printing",
    "Handwriting is mainly for...|everyday communication|decorating only|math only",
    "Why do people still learn calligraphy?|It is an art form and relaxing|It is illegal|It is useless"
  ],
    ["These words sound alike, but the tools and methods differ.", "Calligraphy writes letters with flowing strokes. Lettering draws them. Typography arranges ready-made type.", "Example: a wedding card with hand-written names is calligraphy; a poster set in a font is typography. Now do yours."],
    [["Calligraphy", "🖋️", "Beautiful writing, stroke by stroke."], ["Lettering", "✏️", "Drawing each letter as an image."], ["Typography", "🔠", "Choosing and arranging type for pages and screens."]]);
  const F7 = mk("Spacing by eye", "👁️", [
    "The space between two straight letters like <b>ll</b> should be...|wider than between round letters|the same as nothing|enormous",
    "Space between two round letters like <b>oo</b> should be...|smaller than between two straight ones|larger than for straight ones|nonexistent",
    "Good letter spacing aims to make the space look...|even|different every time|zero",
    "Spacing in a word is judged by...|the amount of white space|how fast you write|pen color",
    "Spacing letters unevenly makes a word look...|jumpy|calm|perfect",
    "A common spacing trick is to...|imagine pouring sand between letters evenly|measure with a ruler only|close your eyes",
    "Space between words should be about the width of...|a letter o|the whole page|one dot",
    "Too little space between words makes them...|run together|stand apart|disappear",
    "A <b>kern</b> is...|an adjustment of space between two letters|a pencil|a tab"
  ],
    ["Letters do not need equal measured gaps. They need equal-looking white space.", "Straight sides next to each other need the most room, round next to round the least, with straight next to round in between.", "Example: in the word <b>ill</b>, the two l's need more space than the two o's in <b>zoo</b>. Now do yours."],
    [["Even look", "⚖️", "Spacing is about how the white space looks."], ["Straight and round", "📏", "Straight-to-straight gets the most space, round-to-round the least."], ["Word gaps", "↔️", "Leave about one letter o between words."]]);
  const F8 = mk("Centering and layout", "🖼️", [
    "To center a line, you should...|leave equal space on both sides|start at the far left|start at the far right",
    "A quote on a card often looks best...|centered with margins|jammed to one corner|off the paper",
    "To find the middle of a page, you can...|fold it in half|spill ink|cut it",
    "Margins that are equal on all sides make a page look...|balanced|crooked|empty",
    "Before writing a centered line, count the letters and...|find the middle letter|ignore it|add ten",
    "A wide line above a short line is...|fine, if both are centered|forbidden|wrong always",
    "White space around text is useful because it...|gives the eye a rest|wastes paper|is a rule of math",
    "If you run out of space at the end of a line, you should...|plan ahead next time|write over the edge|write in the margin always",
    "A rough sketch of a layout is called...|a draft or thumbnail|a final print|a stamp"
  ],
    ["Think about the empty space on the left and the right. Should they match?", "Find the middle of the page and the middle of the line, then write outward from there.", "Example: a seven-letter word has its middle letter on the center of the page. Now do yours."],
    [["Find the middle", "➕", "Fold the page or mark the center lightly."], ["Balance", "⚖️", "Equal margins look calm and tidy."], ["Sketch first", "✏️", "Test the layout in pencil before using ink."]]);
  const F9 = mk("Color and contrast", "🌈", [
    "Which is easiest to read?|Black text on white paper|Yellow text on white paper|Pale gray on white",
    "Contrast means...|the difference between text and background|the size of text|the weight of paper",
    "Which has poor contrast?|Light blue text on a white card|Dark blue text on white|Black on yellow",
    "For a sign read from far away, you should use...|high contrast colors|similar colors|faded colors",
    "Gold ink on a dark card shows...|good contrast|poor contrast|no ink",
    "Red on green can be hard to see for people with some kinds of color blindness. A better choice is...|dark on light|red on green|green on gray",
    "Which pair has the best contrast?|Black and white|Yellow and white|Gray and light gray",
    "Why not use many colors in one line?|It can be hard to read|It uses less ink|It is faster",
    "Light writing on a dark background is best done with...|a bright pen or paint|a pale pencil|a dark pen"
  ],
    ["The reader's eyes need a clear difference between the letters and the paper.", "Pick colors far apart in lightness: dark on light, or light on dark.", "Example: navy letters on a cream card are easy to read, but cream letters on white are not. Now do yours."],
    [["Contrast", "◼️◻️", "Text must stand out from the background."], ["Light and dark", "🌗", "Pick one very light and one very dark color."], ["Everyone", "🤝", "Strong contrast helps all readers, including people with color blindness."]]);
  const F10 = mk("Planning a timed essay", "⏳", [
    "Before writing a timed essay, you should...|make a quick plan|start writing at once|read nothing",
    "A quick plan can be made of...|a few key points|a full copy|a drawing only",
    "If you only have 20 minutes, spend the first few minutes...|planning|doodling|sharpening pencils",
    "Neat handwriting in a test matters because...|the marker must read it|it doesn't matter|it wastes time",
    "A good essay has an introduction, body paragraphs and a...|conclusion|cover|title only",
    "What should you do with spare time at the end?|Re-read and fix errors|Sleep|Scribble",
    "If your hand gets tired in a long test, you should...|stretch it briefly and keep going|give up|write bigger",
    "Which helps keep writing readable under time pressure?|A steady, comfortable speed|Maximum speed|Tiny writing",
    "Answering the question well means you should...|read the prompt carefully|guess|ignore it"
  ],
    ["The first minutes you spend are an investment. What helps the rest go smoothly?", "Read the question, jot three or four points, write in order, and leave a minute to check.", "Example: Ana spent 3 of 20 minutes planning, wrote clearly, and checked for errors. Now do yours."],
    [["Read", "📖", "Read the question twice."], ["Plan", "🗒️", "Jot your main points in order."], ["Check", "✅", "Keep the last minutes for re-reading."]]);
  const F11 = mk("Quoting and naming sources", "📚", [
    "When you copy someone's exact words, you put them in...|quotation marks|brackets only|nothing",
    "If you use an idea from a book, you should...|say where it came from|pretend it is yours|hide it",
    "A source is...|where information comes from|a type of sauce|a pen",
    "Which is a good way to name a source?|According to the book Bees, by Sue Lee|Someone said|It is true",
    "Why mention your sources?|It is honest and helps readers find more|It makes the page longer|It is boring",
    "Copying a whole page without saying so is...|plagiarism (copying)|good writing|research",
    "A short quote should be...|exactly as the author wrote it|changed a lot|invented",
    "The author's name and title are often put...|before or after the quote|inside the paper|nowhere",
    "Putting an idea in your own words is called...|paraphrasing|copying|erasing"
  ],
    ["Be honest about where facts came from.", "Use quotation marks for exact words, and name the author or title. Rewrite ideas in your own words.", "Example: According to the book Birds, by Max Ray, \"owls hunt at night.\" Now do yours."],
    [["Quote", "💬", "Exact words go inside quotation marks."], ["Name it", "🏷️", "Say the title or author you used."], ["Own words", "🧠", "Paraphrase ideas so they sound like you."]]);
  const F12 = mk("Smart note layouts", "🗒️", [
    "In the Cornell method, the page is split into...|cue column, notes and summary|three poems|two pictures",
    "A mind map starts with...|a main idea in the center|a title at the bottom|a list of numbers",
    "In a mind map, branches show...|related ideas|nothing|only dates",
    "A summary box in notes is for...|the main points in a few lines|whole paragraphs|doodles only",
    "Why use headings in notes?|They help you find things|They waste ink|They are optional magic",
    "Color in notes can help by...|grouping ideas|hiding ideas|spilling ink",
    "Outlines use...|indented points and sub-points|random words|pictures only",
    "A good note page is...|organized and readable|crowded and messy|blank",
    "Which tool shows how ideas connect?|A mind map|A shopping list|A stamp"
  ],
    ["Think about how each layout is organized: by columns, by branches, or by levels.", "Cornell notes split the page; mind maps branch outward; outlines indent sub-points.", "Example: write 'Animals' in the center, then branches for mammals, birds and fish. That is a mind map. Now do yours."],
    [["Cornell", "📑", "Notes, cue words and a short summary on one page."], ["Mind map", "🕸️", "A center idea with branches."], ["Outline", "🪜", "Main points with indented sub-points."]]);
  const F13 = mk("Writing an outline", "🪜", [
    "An outline helps you...|organize ideas before writing|forget ideas|draw pictures only",
    "Main points in an outline are usually marked with...|Roman numerals like I, II, III|emoji only|nothing",
    "Sub-points are often marked with...|capital letters like A, B, C|music notes|colors",
    "What is the Roman numeral for 4?|IV|VI|XI",
    "What is the Roman numeral for 5?|V|X|L",
    "What is the Roman numeral for 10?|X|V|I",
    "Sub-points are usually...|indented under main points|written first|written at random",
    "Which comes first in a basic outline?|I. Introduction|III. Conclusion|B. Details",
    "An outline should be...|short, with key words|a full essay|blank"
  ],
    ["I, V and X are the building blocks of Roman numerals. Which is which?", "I is 1, V is 5, X is 10. A smaller one before a bigger one means subtract. A smaller one after means add.", "Example: VII is 5 and 1 and 1 added together, so 7. Now do yours."],
    [["Numerals", "🏛️", "I = 1, V = 5, X = 10."], ["Main points", "📌", "Mark main points I, II, III."], ["Sub-points", "🔹", "Mark smaller points A, B, C and indent them."]]);
  const F14 = mk("Revising a draft", "🔁", [
    "A first draft is...|your first try at writing|the final copy|a title",
    "Revising means...|improving your writing|erasing the page|handing it in blank",
    "If a sentence does not fit, you can...|delete it|add more of them|hide it",
    "To add a missing idea by hand, you can use...|a caret and write above the line|a blob|a stamp",
    "To move a sentence, you can...|draw an arrow to its new place|rip it|lose it",
    "After revising, you should...|copy it out neatly|burn it|ignore it",
    "Reading your draft aloud helps you...|hear mistakes|learn Spanish|rest",
    "Which is a revising step?|Make sentences clearer|Do nothing|Close the book",
    "A final copy should be...|neat and corrected|full of crossing-out|a rough sketch"
  ],
    ["Writers rarely get it perfect the first time. Revising is normal.", "Add with a caret, delete with a line, move with an arrow, then write a clean final copy.", "Example: Kai added a missing word with a caret, deleted a repeat, then copied it out neatly. Now do yours."],
    [["Add and cut", "✂️", "Insert what is missing and remove what is not needed."], ["Move", "➡️", "Use arrows to put ideas in a better order."], ["Final copy", "✨", "Write it again neatly."]]);
  const F15 = mk("Writing and memory", "🧠", [
    "Writing notes by hand can help you...|remember what you learn|forget everything|sleep",
    "Why can handwriting help memory?|You think about each idea as you write|It is quicker|It uses more ink",
    "Which is a good study habit?|Rewriting key ideas in your own words|Copying without thinking|Skipping practice",
    "Reading and then writing from memory is called...|self-testing|snoring|nothing",
    "Spacing out your practice over days helps you...|remember longer|forget sooner|learn nothing",
    "Writing a word several times and saying it helps with...|spelling|swimming|nothing",
    "Flash cards are written on...|small cards|walls|clouds",
    "Which helps more?|Writing the main idea in your own words|Copying every word|Neither",
    "Short, regular practice is better than...|one very long cram session|any practice|sleep"
  ],
    ["Thinking while you write helps ideas stick.", "Use your own words, test yourself from memory, and practice a little every day.", "Example: after reading, Tia covered the page and wrote what she remembered, then checked. Now do yours."],
    [["Own words", "💭", "Rewriting ideas helps you understand them."], ["Test yourself", "❓", "Write what you remember without looking."], ["Little and often", "📆", "Short practice every day beats one long session."]]);
  const F16 = mk("Writing on a whiteboard", "🧑‍🏫", [
    "When writing on a board for a class, letters should be...|large enough to see from the back|tiny|faint",
    "Which is best for a classroom board?|Dark marker with big letters|Pale marker with small letters|Pencil",
    "To keep lines level on a board, you can...|draw a light guide line first|ignore it|write in a circle",
    "While writing, you should stand...|to the side so people can see|in front of the writing|far away",
    "Print or cursive on a board?|Print is clearer for most people|Tiny cursive only|Neither",
    "Which should you do before the class sees it?|Check spelling|Add random scribbles|Wipe it clean",
    "Letters on a board need to be bigger than on paper because...|they are read from far away|ink is dry|boards are small",
    "Writing on a board is tiring on...|your arm, so keep your movements smooth|your eyes|your feet",
    "Which color is best for board titles?|A dark, bold color|A faint yellow|Clear"
  ],
    ["Imagine the reader at the back of the room.", "Write large and clear in dark marker, keep lines level, and stand to the side.", "Example: Mr. Lee used big dark print and stepped aside so students could read it. Now do yours."],
    [["Big and clear", "🔍", "Boards are read from far away."], ["Dark marker", "🖍️", "High contrast makes reading easy."], ["Step aside", "🚶", "Do not block your own writing."]]);
  const F17 = mk("Columns and alignment", "📏", [
    "Aligning text means...|lining it up along an edge|making it colorful|making it blurry",
    "Left-aligned text starts...|at the same left spot on every line|in a different place each line|at the right edge",
    "Numbers in a column are easiest to compare when they are...|lined up by place value|scattered|in different sizes",
    "In a list of prices, line up the...|decimal points|first letters|titles",
    "A column should have...|a heading|no label|three labels",
    "Why use a ruler in a table?|To keep lines straight|To measure ink|To cut paper",
    "Equal column widths help a table look...|neat|messy|unfinished",
    "Right-aligned numbers line up their...|last digits|first digits|colors",
    "When columns are crowded, you should...|make the columns wider|write smaller until it vanishes|erase them all"
  ],
    ["Neat columns let the eye move down the page easily.", "Left edges, digits or decimal points should line up in a column, and each column needs a label.", "Example: write 3.5 and 12.25 so their decimal points sit above each other. Now do yours."],
    [["Align", "📐", "Line things up along an edge or a point."], ["Label", "🏷️", "Every column gets a heading."], ["Space", "↔️", "Give each column enough room."]]);
  const F18 = mk("Hand-lettered cards and tags", "🎁", [
    "A gift tag should include...|who it is for and who it is from|only a drawing|nothing",
    "A card message is usually written...|inside the card|on the envelope stamp|under the table",
    "Before writing on a nice card, you should...|try it on scrap paper first|just start|erase it",
    "Which helps a hand-lettered message look balanced?|Light pencil guide lines|Random sizes|No planning",
    "A short message is best for a small tag because...|there is little space|it is rude to write more|ink runs out",
    "Which makes a card feel special?|Neat, careful handwriting|Messy scribbles|No words",
    "Pencil guide lines should be erased...|after the ink is dry|before the ink|never",
    "To avoid mistakes on a final card, you should...|practice the message first|write it fast|use a crayon",
    "Where do you put the name on a tag?|In the clearest, biggest space|Hidden|Upside down"
  ],
    ["A hand-lettered card is a small piece of art. Think about planning.", "Try the words on scrap paper, draw pencil guides, write in ink, and erase when dry.", "Example: Zoe practiced 'Happy Birthday, Gran' on scrap paper before writing the card. Now do yours."],
    [["Practice", "📝", "Try it on scrap paper first."], ["Guides", "📏", "Light pencil lines keep it level."], ["Finish", "✨", "Let the ink dry before erasing."]]);
  const L9 = [F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14, F15, F16, F17, F18];

  Object.assign(HAND_LEVELS, {
    7: L7.concat([MIX("Mixed practice", L7[0], L7[3], L7[5], L7[8], L7[12]), MIX("Level 7 Challenge", L7[1], L7[2], L7[6], L7[7], L7[10], L7[14])]),
    8: L8.concat([MIX("Mixed practice", L8[0], L8[3], L8[5], L8[8], L8[11]), MIX("Level 8 Challenge", L8[1], L8[2], L8[6], L8[9], L8[13], L8[15])]),
    9: L9.concat([MIX("Mixed practice", L9[0], L9[2], L9[6], L9[8], L9[12]), MIX("Level 9 Challenge", L9[1], L9[3], L9[7], L9[10], L9[13], L9[15])])
  });
})();
