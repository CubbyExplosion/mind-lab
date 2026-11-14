// ext/hand-16-18.js  Mind Lab Handwriting, levels 16-18 (60 lessons)
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

  // =============== LEVEL 16 ===============
  const A1 = mk("Fast but legible", "⚡", [
    "When you speed up, which habit keeps writing readable?|Keep letter shapes and spacing consistent|Make every letter much smaller|Skip all the vowels",
    "Your fast notes are unreadable tomorrow. What was the likely problem?|Speed beat clarity|The paper was too white|The pen was too new",
    "Which is the best way to build speed?|Practice at a steady pace you can still read|Scribble as quickly as possible|Press down harder",
    "Which part of writing is safest to simplify when going fast?|Joins between letters|The first letter of every word|Every vowel",
    "Which pair of letters most often gets confused when rushed?|a and o|b and z|k and w",
    "A good test of a fast note is...|Can you read it a day later?|Is it very small?|Is it all in capitals?",
    "What usually happens to handwriting when you are very rushed?|It gets bigger and looser|It becomes perfect|It never changes",
    "Which tip helps when you must write fast for a long time?|Relax your grip and move from the whole hand|Squeeze the pen tightly|Write with your wrist locked"
  ],
    ["Think about what you need from your notes later, not just how quickly you can make them.", "Speed is only useful if you can still read the result. Look for the choice that protects clarity.", "Example: a student who rushes may let every 'e' turn into a flat line and then cannot tell words apart. A steady pace keeps shapes distinct. Now do yours."],
    [["Speed versus clarity", "⚖️", "Fast writing is a skill, but notes you cannot read are wasted. Aim for <b>fast and readable</b>."], ["Keep the shapes", "🔤", "Even when you hurry, keep letter <b>shapes</b>, <b>slant</b> and <b>spacing</b> steady."], ["Relax", "🖐️", "A tight grip slows you and tires your hand. A loose, relaxed grip lets you write faster for longer."]]);

  const A2 = mk("The charting method", "📊", [
    "The charting method puts notes in...|rows and columns|one long paragraph|a circle",
    "Which topic suits a chart best?|Comparing three planets by size, moons and temperature|A story you heard|Your favorite song",
    "In a chart, what usually goes across the top row?|The categories you compare|Your name|The date only",
    "What is one big advantage of charting?|You can compare items at a glance|It uses the most paper|It needs no pen",
    "A chart for three explorers would likely have columns such as...|name, dates, route|favorite food, shoe size, color|nothing at all",
    "Which is a poor choice for the charting method?|A long story with no categories|A list of facts with repeating features|Facts that compare several things",
    "The speaker jumps between topics while you chart. What helps?|Leave some cells blank and fill them in later|Stop writing|Start a brand new chart each minute",
    "What do you call the boxes where a row and a column meet?|cells|margins|footnotes"
  ],
    ["Think about the shape of the page when information repeats the same kinds of facts.", "A chart works when several things share the same kinds of details. Look for the choice that matches that.", "Example: for four animals you could list diet, habitat and size in columns, one animal per row. Now do yours."],
    [["Rows and columns", "📊", "The <b>charting method</b> sorts notes into a table, so each row is one item and each column is one kind of fact."], ["Good for comparing", "🔍", "Use it for facts that repeat: dates, causes, features, people, formulas."], ["Fill in later", "✏️", "If you miss something, leave the cell blank and add it afterward. A chart makes gaps easy to spot."]]);

  const A3 = mk("Outline or sentence notes", "🗂️", [
    "Which note style uses indents to show main ideas and details?|Outline method|Charting method|Doodle method",
    "The sentence method writes each new idea as...|a separate numbered line|a drawing|a single capital letter",
    "A speaker moves fast with no clear structure. Which style copes best?|Sentence method, one line per idea|A detailed chart|A perfect outline",
    "In an outline, details under a main point are...|indented|written in the margin only|crossed out",
    "Which marking is typical for the biggest ideas in an outline?|Roman numerals like I and II|Small dots only|Question marks",
    "Which sign shows that a lecturer follows a clear structure?|Headings and numbered points|Long silences|Jokes",
    "A weakness of the sentence method is that...|it can be hard to see how ideas connect|it uses a chart|it needs color",
    "When is an outline easiest to write?|When the speaker is well organized|When the speaker rambles|When there is no speaker"
  ],
    ["Think about how the speaker's ideas are arranged, and which note style copies that arrangement.", "Each style copies a different arrangement of ideas. Match the speaker or situation in the question to the style.", "Example: a teacher with three clear sections and sub-points suits a tidy indented layout; a rapid, mixed-up talk suits quick numbered lines. Now do yours."],
    [["Outline method", "🗂️", "<b>Outline notes</b> use indents: big ideas on the left, details tucked under them."], ["Sentence method", "📝", "<b>Sentence notes</b> put each new idea on its own numbered line. It is fast when the talk is messy."], ["Choose wisely", "🧭", "A tidy speaker suits an outline. A hurried or jumbled one suits sentence notes."]]);

  const A4 = mk("The 24-hour review", "⏰", [
    "When is the best time to review new notes?|Within a day|After a month|Never",
    "Why does a quick review soon after class help?|It slows how fast you forget|It erases the notes|It changes the date",
    "What should you do first during a review?|Read the notes and fix unclear parts|Throw them away|Copy them in a new color only",
    "A word in your notes that you cannot read should be...|rewritten while you still remember|ignored forever|made smaller",
    "Which is the quickest useful review?|Cover the notes and try to recall the key points|Look at the cover of the notebook|Count the pages",
    "What does research on forgetting say about learning?|We lose a lot of new information quickly without review|We never forget anything|Only teachers forget",
    "Which small action helps notes work for a future test?|Add a few key questions in the margin|Add stickers|Remove all dates",
    "How long can a good first review take?|About 5 to 10 minutes|Two hours|A full week"
  ],
    ["Think about when memory fades fastest and when a short refresh helps most.", "Think about the timing and the length of the review, and what happens to memory while you wait.", "Example: after a science lesson, spend a few minutes tidying messy words and writing two questions. That small effort beats rereading everything the night before the test. Now do yours."],
    [["Fresh is best", "🌱", "New information fades fast. Reviewing notes the <b>same day or next day</b> keeps more of it."], ["Fix and add", "🔧", "Rewrite unreadable words, fill gaps, and add <b>key questions</b> in the margin."], ["Short and often", "⏱️", "Five to ten minutes is enough. Short reviews beat one long cram."]]);

  const A5 = mk("Highlighting and margins", "🖍️", [
    "What is the best way to use a highlighter?|Mark only key words and phrases|Color every line|Color the margins",
    "Why can highlighting a whole page be unhelpful?|Nothing stands out any more|It wastes the page|It makes it heavier",
    "Where do margin notes usually go?|In the blank space beside the text|On the back cover|Inside the spine",
    "A question mark in the margin often means...|I do not understand this|This is finished|This is perfect",
    "Which margin mark often shows an important idea?|A star|A smiley face|A zigzag",
    "Which helps memory more?|Highlighting plus a short summary in your own words|Highlighting alone|Neither",
    "Where should you NOT write in the margins?|A borrowed library book|Your own workbook|A photocopy you own",
    "Short margin comments should be...|brief and clear|as long as possible|in secret code nobody can read"
  ],
    ["Think about what makes one thing stand out from everything else.", "Marks help only when they are rare and meaningful. Choose the option that keeps notes useful.", "Example: marking one key definition per paragraph and adding a three-word comment beside it works better than coloring a whole page. Now do yours."],
    [["Mark less", "🖍️", "Highlight only <b>key terms and short phrases</b>. If everything is colored, nothing stands out."], ["Talk to the page", "💬", "Margin notes can say <b>?</b> for confusing, a <b>star</b> for important, or a quick summary."], ["Respect books", "📚", "Never write in library or borrowed books. Use sticky notes or your own paper instead."]]);

  const A6 = mk("Color-coding notes", "🌈", [
    "What is the main benefit of a color code in notes?|Quicker scanning of the page|Prettier ink only|Heavier paper",
    "How many colors keep a code easy to remember?|Three or four|Fifteen|Just one",
    "A good color key is...|written on the first page or inside the cover|kept secret|changed every day",
    "Which use of color is the clearest?|Blue for definitions, green for examples|A random color for every line|Pale yellow text on white paper",
    "Which ink is hardest to read on white paper?|Light yellow|Dark blue|Black",
    "Why stay consistent with the code?|So you can find the same type of info fast|So the pens last longer|So the pages match the cover",
    "With only one pen, you can still organize notes by...|underlining, boxes and symbols|nothing at all|using only scribbles",
    "Which is NOT a smart reason to change colors?|Because you felt like it, with no plan|To mark a new kind of information|To separate questions from answers"
  ],
    ["Think about what you want your eyes to do when you glance back at a page.", "A color code works only if it follows a plan and stays easy to read. Choose the option that fits a plan.", "Example: red for vocabulary, blue for dates and green for examples lets you find the dates in a second. Now do yours."],
    [["A simple code", "🌈", "Pick <b>three or four</b> colors and give each a job, like terms, examples and dates."], ["Add a key", "🗝️", "Write a small <b>color key</b> on the first page so you never forget it."], ["Readable first", "👓", "Avoid pale colors like yellow for text. With one pen, use <b>underlines, boxes and symbols</b> instead."]]);

  const A7 = mk("Sketchnote building blocks", "🧱", [
    "Which is a basic sketchnote building block?|Containers like boxes and banners|Only photographs|Only typed text",
    "A line or arrow joining two ideas is a...|connector|margin|footnote",
    "Why use simple icons in sketchnotes?|They are quick to draw and easy to recognize|They must look like art|They replace all words",
    "A banner is mostly used for...|headings or titles|page numbers|the date only",
    "What should you draw first when time is short?|Key words, then icons if there is time|A detailed portrait|The border",
    "Which icon best stands for 'idea'?|A light bulb|A shoe|A cloud of smoke",
    "What makes a sketchnote different from a normal page of notes?|It mixes words and simple drawings|It uses no words|It is always colored",
    "Do you need to be a good artist to make sketchnotes?|No, simple shapes are enough|Yes, always|Only if you use color"
  ],
    ["Think about the small parts you could reuse to build a note page quickly.", "Sketchnotes use basic parts: words, simple icons, containers and connectors. Match the part to its job.", "Example: a box around a key term, an arrow to its example, and a tiny drawing next to it make a fast mini sketchnote. Now do yours."],
    [["Mix words and pictures", "🧱", "<b>Sketchnotes</b> blend short words with simple drawings to help you remember."], ["Parts you can reuse", "📦", "Use <b>containers</b> (boxes, banners), <b>connectors</b> (arrows, lines) and small <b>icons</b>."], ["Not about art", "✏️", "Stick figures and simple shapes are fine. Clear ideas matter more than pretty drawings."]]);

  const A8 = mk("Faux calligraphy", "✒️", [
    "How do you make faux calligraphy with a regular pen?|Write normally, then thicken the downstrokes|Use only a ruler|Write backwards",
    "In many scripts, which strokes are thick?|Downstrokes|Upstrokes|Dots only",
    "You add thickness in faux calligraphy by...|drawing a second line beside the stroke and filling the gap|pressing as hard as you can|tearing the paper",
    "What does 'faux' mean?|Fake or imitation|Fancy|Fast",
    "Which tool lets you do faux calligraphy?|Any ordinary pen or pencil|Only a quill|Only a chisel",
    "Which stroke stays thin?|Upstrokes|Downstrokes|Fills",
    "Why is faux calligraphy useful?|You get the look without special pens|It needs no letters|It is always faster",
    "What should you do before adding thickness?|Write the word in a neat, simple script|Cut the paper|Erase everything"
  ],
    ["Think about how a real flexible pen changes thickness, and how you could imitate that.", "Think about what a flexible pen does with pressure, and what an ordinary pen can still do if you add lines yourself.", "Example: write 'hello' smoothly, then trace beside each downstroke and color between the two lines. Now do yours."],
    [["Fake the look", "✒️", "<b>Faux</b> means imitation. You can fake calligraphy with a normal pen or pencil."], ["Thick down, thin up", "↕️", "In many scripts, <b>downstrokes are thick</b> and <b>upstrokes are thin</b>."], ["Steps", "🪜", "Write the word in a relaxed script, mark each downstroke, add a second line beside it, and fill the gap."]]);

  const A9 = mk("Command words on tests", "🧭", [
    "What does 'compare' ask you to do?|Show how things are alike and different|List one fact|Draw a picture",
    "What does 'list' usually ask for?|A set of items, not long explanations|A long essay|A drawing",
    "What does 'explain' usually ask for?|Give reasons or how something works|Just one word|A yes or no",
    "What does 'describe' ask you to do?|Tell what something is like with details|Prove it wrong|Calculate it",
    "What does 'justify' ask you to do?|Give reasons or evidence for your answer|Copy the question|Skip it",
    "What does 'summarize' ask for?|The main points in fewer words|Every detail|A long quote",
    "What does 'contrast' focus on?|Differences|Similarities|Spelling",
    "Why underline the command word in a question?|So you answer what is actually asked|To use up time|To decorate"
  ],
    ["Look at the action word at the start of the question, not just the topic.", "Each command word asks for a different kind of answer. Match the word to its job.", "Example: 'outline' asks for the main points in order, not every detail. A different word, 'illustrate', asks you to give examples. Now do yours."],
    [["Read the verb", "🧭", "The <b>command word</b> (compare, explain, describe) tells you what kind of answer to write."], ["Underline it", "✏️", "Underline the command word and the topic before you start. This stops you from answering a different question."], ["Match length", "📏", "A 'list' needs a few short items; an 'explain' needs sentences with reasons."]]);

  const A10 = mk("Show your work", "🧮", [
    "Why show steps in math on a test?|The teacher can see your thinking and give partial credit|It uses more paper|It looks fancy",
    "Where should each new step go?|On its own line, lined up|All squeezed on one line|In the margin only",
    "How should you fix a mistake in math?|Draw one neat line through it and write the fix nearby|Scribble it into a black blob|Tear out the page",
    "Which sign should line up in a column of equations?|The equals signs|The numbers' colors|The first letters",
    "A digit that looks like both 1 and 7 can be fixed by...|writing each number in a clear, consistent way|writing smaller|writing in pencil only",
    "What should you write with your final answer?|The units, if the problem has them|Nothing|A joke",
    "Why is it risky to do long steps in your head?|You may make a mistake and have nothing to check|It is too quick|It makes the pen run out",
    "What makes it easy to check your work later?|Neat, spaced steps|Tiny crowded steps|Steps written in a circle"
  ],
    ["Think about how another person, or you later, could follow what you did.", "Clear steps help you and the grader. Look for the choice that makes the process easy to follow.", "Example: write one step per line with the equals signs lined up, and put a box around the final answer with units. Now do yours."],
    [["Steps count", "🧮", "Showing your steps lets a teacher award <b>partial credit</b> and lets you find errors."], ["Line them up", "📐", "One step per line, with <b>equals signs lined up</b>. Leave space between problems."], ["Fix cleanly", "✂️", "Cross out an error with <b>one line</b>, rewrite nearby, and box the final answer with its units."]]);

  const A11 = mk("Short answers: RACE", "🏁", [
    "In RACE, what does the R stand for?|Restate the question|Read the next page|Repeat the answer five times",
    "In RACE, what does the A stand for?|Answer the question|Add decorations|Argue loudly",
    "In RACE, what does the C stand for?|Cite evidence|Copy a neighbor|Change the question",
    "In RACE, what does the E stand for?|Explain how the evidence supports your answer|Erase everything|End the test",
    "Which step comes first in RACE?|Restate|Explain|Cite",
    "Why restate the question?|It shapes a complete sentence answer|It adds a drawing|It saves ink",
    "Which is the best evidence?|A specific detail from the text|A guess|A rumor",
    "What does RACE help you do?|Write a complete short response|Run faster|Choose a pen"
  ],
    ["RACE is an acronym. Think about the order in which a good short answer is built.", "Each letter of RACE is one step in building a short written answer. Recall what the step asks you to do.", "Example: for the question 'Why did the pioneers move west?', begin with 'The pioneers moved west because...', give the answer, cite a detail, then explain it. Now do yours."],
    [["Four steps", "🏁", "<b>R</b>estate, <b>A</b>nswer, <b>C</b>ite, <b>E</b>xplain. It builds a short, full response."], ["Start with the question", "🔁", "Turn the question into the first part of your answer: 'The author uses ... because ...'."], ["Evidence plus reasoning", "🔗", "Cite a specific detail, then explain <b>why</b> it proves your point."]]);

  const A12 = mk("Block capitals on forms", "🔠", [
    "Why do many forms ask for block capitals?|They are clearer to read and scan|They save ink|They look fancy",
    "Block capitals are...|plain capital letters, not joined|cursive only|tiny letters",
    "When you fill out a paper form, which pen is usually best?|A dark ink pen|A pale pencil|A glitter pen",
    "Where should each letter go in a form with boxes?|One letter per box|Several in one box|Outside the boxes",
    "What should you do before filling a form?|Read all the instructions|Write fast|Ask someone else to fill it",
    "If you make an error on an official form, you should...|cross out neatly with one line and add initials if asked|use heavy scribbles|throw it away without telling anyone",
    "Why leave a blank rather than guess an answer?|Wrong information can cause problems later|Blanks look nicer|It always saves time",
    "Which is better on a form?|A clear 7 with a small crossbar|A 7 that looks like a 1|Either, it does not matter"
  ],
    ["Think about who has to read your form and what could go wrong if they cannot.", "Forms are read by other people and sometimes by scanners. Clear, separate letters in dark ink help them.", "Example: on an application with letter boxes, write one tidy capital in each box and keep to the lines. Now do yours."],
    [["Clear for readers", "🔠", "<b>Block capitals</b> are plain, separate capital letters. They are easiest for others to read."], ["Prepare", "👀", "Read all the instructions first. Use dark ink, one letter per box, and stay inside the lines."], ["Be accurate", "🎯", "Do not guess. Check names, dates and numbers carefully before you hand anything in."]]);

  const A13 = mk("Posture and 20-20-20", "🪑", [
    "What does the 20-20-20 rule say?|Every 20 minutes look at something 20 feet away for 20 seconds|Write 20 words, 20 times|Sit 20 feet away",
    "Why take regular breaks while working?|To rest your eyes and muscles|To waste time|To lose your place",
    "Where should your feet be when you write?|Flat on the floor|Dangling|Crossed under you in a tight knot",
    "Your forearms are best...|supported on the desk|hanging in the air|behind your back",
    "Where should the desk light come from for a right-handed writer?|From the left|From the right, casting a shadow on the page|From below",
    "If your neck aches after writing, what might help?|Raise the paper by tilting the writing surface|Bend lower|Squeeze the pen",
    "Which is a healthy writing habit?|Shake out and stretch your hand regularly|Press down hard|Never move",
    "How far should your eyes be from the page, roughly?|About a forearm's length away|Nose to the page|Across the room"
  ],
    ["Think about eyes, neck, back and hands, and how each can get tired.", "Good ergonomics means a supported body and regular breaks. Choose the habit that protects you.", "Example: sit back with feet flat, support your forearms, and every 20 minutes glance at something far away. Now do yours."],
    [["Set up your seat", "🪑", "Feet flat, back supported, and forearms resting on the desk."], ["The 20-20-20 rule", "👀", "Every <b>20 minutes</b>, look at something <b>20 feet</b> away for <b>20 seconds</b>."], ["Good light", "💡", "Light a right-handed writer from the left (and a left-handed writer from the right) so your hand makes no shadow."]]);

  const A14 = mk("Papyrus and parchment", "📜", [
    "Which ancient writing material was made from a river plant?|Papyrus|Parchment|Slate",
    "Where was papyrus mostly made in ancient times?|Egypt|Greenland|Peru",
    "Parchment is made from...|animal skin|tree bark|cotton",
    "Which lasted better in damp climates?|Parchment|Papyrus|Neither lasted",
    "A scroll is...|writing rolled up on a long strip|a flat clay tablet|a bound book",
    "What replaced scrolls for many uses in Europe?|The codex, with pages bound together|Plastic sheets|Typewriters",
    "Why did parchment help the book form spread?|It could be folded and sewn into pages|It was bright green|It was transparent",
    "Which ancient material gave us the word 'paper'?|Papyrus|Parchment|Pottery"
  ],
    ["Think about what each material is made from and where people could find it.", "Think about what each material is made from, then match the clue.", "Example: stalks of a reed were sliced, pressed and dried into sheets in Egypt. A different material, vellum, comes from calf skin. Now do yours."],
    [["Papyrus", "🌿", "<b>Papyrus</b> was made from a river reed in ancient Egypt. Sheets were joined into <b>scrolls</b>."], ["Parchment", "🐑", "<b>Parchment</b> is made from prepared animal skin. It is strong and can be folded into pages."], ["The codex", "📖", "Pages sewn together make a <b>codex</b>, the ancestor of the modern book. Our word 'paper' comes from papyrus."]]);

  const A15 = mk("Typing vs handwriting", "⌨️", [
    "Which tends to help you remember a lesson better?|Writing key ideas by hand in your own words|Copying every word you hear on a keyboard|Doing neither",
    "A common issue with typing everything is...|you may copy word for word without thinking|you cannot spell|the paper runs out",
    "Handwriting is slower, which can...|force you to pick the main ideas|erase the lesson|stop learning",
    "Which job is typing usually better for?|Writing a long report|Drawing a diagram|Making a quick sketch",
    "Which is usually easier to do on a keyboard?|Editing and rearranging text|Drawing a labeled arrow|Writing a math fraction",
    "What is writing by hand especially good for?|Quick sketches and diagrams with arrows|Sending a long email|Searching a database",
    "Why do young learners practice letter shapes by hand?|It helps them recognize letters|It makes them run faster|It helps them hear better",
    "Which choice is best?|Match the tool to the task|Always use only typing|Always use only handwriting"
  ],
    ["Think about what each tool makes you do with your mind as you work.", "Both are useful. Each has strengths for different jobs. Choose the answer that fits the job or what research suggests.", "Example: for a lecture, handwriting forces you to pick main ideas; for a long essay, typing lets you revise quickly. Now do yours."],
    [["Different strengths", "⚖️", "Handwriting makes you <b>choose and shorten</b> ideas. Typing is fast and easy to edit."], ["A trap", "🪤", "Typing everything word for word can turn you into a copy machine without much thinking."], ["Use both", "🤝", "Hand-write to learn and sketch; type to draft, revise and share. <b>Match the tool to the task.</b>"]]);

  const A16 = mk("Designing a signature", "🖊️", [
    "A good signature is...|consistent and quick to write|different every time|impossible to repeat",
    "Why keep your signature fairly consistent?|So others can recognize it|So it fits the line|To hide it",
    "Which feature can make a signature personal?|A distinctive first-letter shape|Writing it on someone else's paper|Copying a friend's",
    "A signature is different from a printed name because it...|is your own handwritten mark|is always typed|is always in capitals",
    "Should a signature be easy for anyone to copy?|No, hard to copy but easy for you to repeat|Yes|It does not matter",
    "Where is a signature used?|Contracts and official papers|Only on birthday cards|Nowhere",
    "Which is a smart habit with a signature?|Practice it until it flows naturally|Change it daily|Post it online",
    "Should you sign a paper you have not read?|No, read it first|Yes, always|Only on Fridays"
  ],
    ["Think about who has to recognize your signature and why.", "Think about why someone would ask for your signature and what makes it trustworthy.", "Example: a signature with a bold first letter and a smooth flowing last stroke is easy to repeat and hard to imitate. Now do yours."],
    [["Your mark", "🖊️", "A <b>signature</b> is your personal handwritten mark. It is used to agree to things."], ["Make it repeatable", "🔁", "Choose a style you can write the same way every time, quickly and comfortably."], ["Read first", "📖", "Never sign something you have not read and understood. Keep signature practice on paper, not in public posts."]]);

  const A17 = mk("Outlines, shadows, highlights", "🎨", [
    "A drop shadow on lettering is added...|behind and slightly to one side|on the roof|only inside",
    "What is the usual shadow direction rule?|Keep it the same direction for the whole piece|Switch it for every letter|Put it in the middle",
    "What does an outline around a letter do?|Makes it stand out from the background|Hides the letter|Makes it smaller",
    "A small white highlight on a letter suggests...|shiny light hitting it|rain|a mistake",
    "Which color pair gives the strongest contrast?|Dark navy and bright yellow|Light gray and white|Beige and cream",
    "Why keep lettering effects simple?|Too many effects make words hard to read|Effects are illegal|Pens run out",
    "Which effect adds a feeling of depth to letters?|A shadow|A margin|A dot",
    "What should you do before adding effects?|Draw the basic letters clearly|Add every effect at once|Color the paper black"
  ],
    ["Think about how a light source would fall on objects.", "Think about what makes lettering effects look believable and still readable.", "Example: if light is from the top left, put every shadow to the lower right of its letter. Now do yours."],
    [["Add depth", "🎨", "A <b>drop shadow</b> sits behind a letter to one side and makes it pop off the page."], ["One light source", "💡", "Keep every shadow and highlight in the same direction, as if one light shines on the whole piece."], ["Keep it readable", "👓", "Draw clear base letters first. Choose high-contrast colors and avoid too many effects."]]);

  const A18 = mk("Ballpoint, gel, rollerball", "🖋️", [
    "Which pen uses thick, oil-based ink and dries quickly?|Ballpoint|Gel|Fountain",
    "Which pen glides smoothly with water-based gel ink?|Gel pen|Pencil|Chalk",
    "Which kind is most likely to smudge under a hand?|A wet-ink pen like a rollerball|A pencil that is hard|A dry crayon",
    "Which pen needs light pressure and is easy on the hand?|Gel or rollerball|A hard ballpoint pressed firmly|A dry marker",
    "Which pen is often best for forms because its ink is fast-drying?|Ballpoint|Watercolor brush|Chalk",
    "Which tool is easiest to erase?|Pencil|Gel pen|Rollerball",
    "Which is fine-tipped and good for sketchnote lines?|A fineliner|A big paint roller|A highlighter",
    "Tip size 0.5 mm versus 1.0 mm: which writes a thinner line?|0.5 mm|1.0 mm|They are the same"
  ],
    ["Think about how thick or watery the ink is and what that does to speed and smudging.", "Different pens suit different jobs. Match the pen features in the clue to the type.", "Example: a quick-drying thick ink is good for forms; a smooth watery ink is lovely for long notes but can smudge. Now do yours."],
    [["Ballpoint", "🖊️", "<b>Ballpoint</b> pens use thick, quick-drying ink. They last long and work well for forms."], ["Gel and rollerball", "💧", "<b>Gel</b> and <b>rollerball</b> pens use wetter ink. They glide with light pressure but can smudge."], ["Tip size", "📏", "A <b>0.5 mm</b> tip writes thin and detailed lines; <b>1.0 mm</b> writes bold and smooth."]]);

  const L16 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18];

  // =============== LEVEL 17 ===============
  const B1 = mk("Telegraphic note style", "📟", [
    "Which is the telegraphic version of 'The meeting will be held on Tuesday at noon'?|Meeting Tue noon|The meeting will be held|Tuesday",
    "Telegraphic style drops...|small helper words like 'the' and 'is'|all the nouns|all the dates",
    "Which word is usually safe to cut in quick notes?|the|Napoleon|1066",
    "Which word must stay in notes?|The key term, like 'photosynthesis'|The word 'a'|The word 'of'",
    "Which note is clearer?|Plants make food, need light|Plants the they it is|Light light light",
    "What does 'w/' commonly stand for?|with|without|word",
    "Why keep numbers and names in quick notes?|They are hard to guess later|They are decoration|They use less ink",
    "Which is the best test of a telegraphic note?|Can you rebuild the full idea from it?|Is it as short as possible?|Is it all abbreviations?"
  ],
    ["Think about which words carry the meaning and which only hold the sentence together.", "Keep the facts, names, numbers and key terms. Drop the small helper words. Check that the idea survives.", "Example: 'The river flooded the town in 1927' becomes 'River flood town 1927'. Names and numbers remain. Now do yours."],
    [["Cut the glue", "📟", "<b>Telegraphic style</b> drops small helper words (a, the, is, of) and keeps the meaning words."], ["Keep the facts", "🔑", "Always keep <b>names, numbers, dates and key terms</b>. They are hard to guess later."], ["Rebuild test", "🧩", "A good note lets you rebuild the whole idea after a day. If you cannot, you cut too much."]]);

  const B2 = mk("Retrieval practice", "🧠", [
    "Retrieval practice means...|trying to recall information without looking|rereading the page again and again|copying the page neatly",
    "Which is retrieval practice?|Writing what you remember about a topic on blank paper|Highlighting a page|Staring at the cover",
    "Why does recall help memory?|Pulling information out strengthens it|It uses up the information|It erases mistakes",
    "What should you do after a recall attempt?|Check your notes and fix gaps|Throw everything away|Never look again",
    "A 'brain dump' is...|writing everything you remember on a topic|dropping your notebook|a type of pen",
    "Which is the weaker study method?|Only rereading|Self-quizzing|Teaching a friend",
    "Writing practice questions in the margin helps because...|you can quiz yourself later|they make the page heavier|they cover the notes",
    "Is struggling to recall something a bad sign?|No, effort can help learning|Yes, always|It means you are done"
  ],
    ["Think about whether the information is going in or coming out of your head.", "Retrieval means pulling information out of memory. Choose the option where you bring it out yourself.", "Example: close the book, write three facts about volcanoes from memory, then check. That effort is retrieval. Now do yours."],
    [["Pull it out", "🧠", "<b>Retrieval practice</b> means recalling information without looking. It strengthens memory."], ["Brain dump", "📝", "Write all you remember on a blank page, then compare it with your notes and fix the gaps."], ["Effort helps", "💪", "It feels harder than rereading, but that effort is what makes the memory stick."]]);

  const B3 = mk("Two-column Q&A notes", "❓", [
    "In two-column Q&A notes, what goes in the left column?|Questions or cues|Long answers|Your name",
    "What goes in the right column?|The answers and details|Only drawings|Nothing",
    "How can you study from two-column notes?|Cover one column and test yourself|Cut them in half|Read them backward",
    "When is it best to write the questions?|During or just after class|Years later|Never",
    "A good cue question is...|short and prompts the answer|a long paragraph|a joke",
    "Which cue fits the answer 'It makes food from sunlight'?|What does a plant do in photosynthesis?|What time is lunch?|Who painted this?",
    "Why leave a wide left column?|Room for cue words and later additions|To save paper|For color samples",
    "How is this like flashcards?|Each cue-answer pair can be self-tested|It is exactly the same as a typewriter|It uses a computer"
  ],
    ["Think about how a question and its answer sit side by side so you can test yourself.", "Cues go on one side and details on the other. Cover one side and try to recall the other.", "Example: cue 'Capital of France?' on the left, 'Paris' on the right. Cover the right side and say the answer. Now do yours."],
    [["Cue and detail", "❓", "Draw a line down the page. Put <b>cues or questions</b> on the left and <b>answers and details</b> on the right."], ["Self-test", "🫣", "Cover the right column, read a cue, and try to recall the answer before you peek."], ["Good cues", "🎯", "Short, specific cues work best, like 'Cause of the war?' or 'Define: erosion'."]]);

  const B4 = mk("The SQ3R reading method", "📚", [
    "In SQ3R, what does S stand for?|Survey|Sleep|Stop",
    "In SQ3R, what does Q stand for?|Question|Quiet|Quote",
    "In SQ3R, what are the three Rs?|Read, Recite, Review|Rush, Rewrite, Repeat|Rest, Relax, Run",
    "What do you do in the 'Survey' step?|Skim headings, pictures and summaries|Read every word slowly|Write a long summary",
    "What do you do in the 'Question' step?|Turn headings into questions|Close the book|Underline everything",
    "What do you do in the 'Recite' step?|Say or write the answers in your own words|Copy the page|Skip the section",
    "Which step comes last?|Review|Survey|Question",
    "Why survey before reading?|It gives you a map of what is coming|It makes the book shorter|It is required by law"
  ],
    ["SQ3R is a five-step reading method. Try to recall the order of the letters.", "Think of the steps in the order you would work through a chapter: before, during and after reading.", "Example: before a history chapter, skim the headings; turn 'Causes of the Revolt' into 'What caused the revolt?'; read for the answer; then say it aloud. Now do yours."],
    [["Five steps", "📚", "<b>S</b>urvey, <b>Q</b>uestion, <b>R</b>ead, <b>R</b>ecite, <b>R</b>eview. A method for studying a chapter."], ["Before reading", "🗺️", "Skim headings and pictures, then turn each heading into a <b>question</b>."], ["After reading", "🗣️", "<b>Recite</b> the answer in your own words, jot short notes, then <b>review</b> everything at the end."]]);

  const B5 = mk("Spaced review", "📆", [
    "Spaced review means...|studying in several short sessions over days|studying all at once the night before|never studying",
    "Which schedule is spaced?|Review after 1 day, 3 days and 1 week|Review ten times in one hour|Review once a year",
    "Why does cramming often fail?|You forget it again quickly|You learn too much|It uses too many pens",
    "What happens to memory each time you review?|It tends to last longer|It disappears|It gets smaller",
    "Which is a spaced study plan?|20 minutes on Monday, Wednesday and Friday|Three hours on Sunday only|One minute a month",
    "What can you write on a note to help spacing?|The date you should review it next|A random doodle|Nothing",
    "A 'forgetting curve' shows...|memory fading over time without review|a type of handwriting|a pen shape",
    "Handwritten flashcards can be sorted into...|piles that you review more or less often|colors that cannot be read|nothing",
  ],
    ["Think about whether the practice is bunched together or spread out.", "Think about when each study session happens and how many days sit between them.", "Example: study a vocabulary list today, again in two days, and again next week. The gaps are what make it spaced. Now do yours."],
    [["Little and often", "📆", "<b>Spaced review</b> means short study sessions with gaps between them."], ["Beat the curve", "📉", "Memory fades over time. Each review slows the fade, so the gaps can get longer."], ["Plan it", "🗓️", "Write the next review date on your notes or sort cards into piles for 'often' and 'sometimes'."]]);

  const B6 = mk("Sketchnote layouts", "🧭", [
    "Which layout flows in a circle from a central idea?|Radial|Linear|Vertical column",
    "Which layout reads in rows from left to right like a book?|Linear|Radial|Modular",
    "Which layout is made of separate boxes you can fill in any order?|Modular|Linear|Spiral",
    "A radial sketchnote begins with...|the main idea in the center|the end of the talk|a blank corner",
    "Which layout suits a speaker who jumps between topics?|Modular|Strictly linear|Mirror",
    "Which layout suits a clear step-by-step process?|Linear or vertical flow|A random scatter|A sealed envelope",
    "Why plan a layout loosely before the talk starts?|You can fit titles and boxes in better|It uses up time|To waste paper",
    "A vertical (skyscraper) layout stacks ideas...|down the page|across the ceiling|inside a circle"
  ],
    ["Think about the shape in which ideas arrive: one after another, around a center, or in separate chunks.", "Think about how the speaker's ideas connect: in a line, around a center, or in separate chunks.", "Example: a talk with a start, middle and end in order fits a page that moves in one direction. Now do yours."],
    [["Match the talk", "🧭", "Choose a layout that fits how ideas arrive: <b>linear</b>, <b>radial</b>, <b>vertical</b> or <b>modular</b>."], ["Radial", "🎯", "Put the main idea in the <b>center</b> and branch outward. Good for one big topic."], ["Modular", "🧱", "Draw separate boxes and fill them in any order. Good when a speaker jumps around."]]);

  const B7 = mk("Layout of a lettered quote", "🖼️", [
    "What is 'visual hierarchy'?|Showing which words matter most by size and style|Putting words in a row|Drawing a frame only",
    "In a lettered quote, which words are usually the biggest?|The key words|The punctuation|The page number",
    "How do you make a key word stand out?|Make it bigger, bolder or a different style|Make it the same as the others|Hide it",
    "What is 'white space'?|Empty space that lets the design breathe|Spilled ink|A stain",
    "Why avoid mixing too many styles?|It looks messy and hard to read|Pens break|It is not allowed",
    "A common rule is to use...|two or three styles at most|ten styles|none",
    "How can you center a line of lettering?|Mark the middle of the page and measure the line|Guess and hope|Start in the corner",
    "What helps you plan before inking?|A light pencil sketch|Nothing|Ink directly with no plan"
  ],
    ["Think about where the eye lands first and why.", "Think about where the eye lands first and what the artist did to put it there.", "Example: in the quote 'Dream big', making 'big' larger and bolder tells readers it is the key word. Now do yours."],
    [["Key words first", "🖼️", "Make the most important words <b>bigger or bolder</b>. That is visual hierarchy."], ["Let it breathe", "🌬️", "Leave <b>white space</b> around lettering. Crowded designs are hard to read."], ["Plan in pencil", "✏️", "Sketch lightly, check the spacing and centering, then ink the final version. Use only two or three styles."]]);

  const B8 = mk("Pointed, broad and brush pens", "🖌️", [
    "Which pen has a flexible tip that makes thick and thin lines with pressure?|Pointed pen|Ballpoint|Pencil crayon",
    "Which pen has a flat, chisel-shaped tip?|Broad-edge pen|Pointed pen|Fineliner",
    "In a broad-edge pen, stroke thickness depends on...|the angle you hold the pen|how hard you squeeze|the color of the pen",
    "A brush pen makes thick and thin lines by...|pressing more or less on the brush tip|changing the paper size|flipping the pen",
    "Which script is usually written with a pointed pen?|Copperplate|Blackletter|Uncial",
    "Which is the best choice to learn italic calligraphy?|A broad-edge pen|A rollerball|A highlighter",
    "What is a nib?|The metal tip of a dip or fountain pen|The pen's cap|The ink bottle",
    "Which pen needs light pressure for thin upstrokes and more pressure for thick downstrokes?|Pointed pen|Broad-edge pen|Ballpoint"
  ],
    ["Think about what shape the tip is and how it creates thick and thin lines.", "Think about what part of your hand movement changes the line: your pressure, your angle, or something else.", "Example: a flat felt-tip marker held at one steady tilt makes thick lines in one direction and thin in another. Now do yours."],
    [["Pointed pen", "✒️", "A <b>pointed pen</b> has a flexible nib. Press for thick lines, relax for thin ones (Copperplate)."], ["Broad-edge pen", "📏", "A <b>broad-edge</b> pen has a flat tip. Thickness changes with the <b>angle</b> you hold it (italic, blackletter)."], ["Brush pen", "🖌️", "A <b>brush pen</b> has a soft tip. Pressure controls thickness."]]);

  const B9 = mk("Ink and paper pairing", "📄", [
    "What is 'bleeding' in writing?|Ink spreading through the paper to the back|Ink drying fast|Ink running out",
    "What is 'feathering'?|Ink spreading into fuzzy lines along the paper fibers|A fancy flourish|A type of pencil",
    "Which paper is smooth and good for fine nibs?|Hot-pressed or smooth paper|Rough paper|Paper towels",
    "Which paper is likely to cause feathering?|Cheap, absorbent paper|Smooth, coated paper|Glossy paper",
    "What is 'ghosting'?|A faint mark of ink visible through the other side|A ghost drawing|Ink on a window",
    "How do you test a new ink and paper pair?|Write a few strokes on a corner or scrap|Use it on a final project at once|Do not test it",
    "Heavier paper is usually better for...|wet inks and watercolor|only pencil|tracing",
    "What does 'gsm' tell you about paper?|Its weight (grams per square meter)|Its color|Its price"
  ],
    ["Think about how absorbent the paper is and how wet the ink is.", "Think about how much the paper soaks up and how thick it is.", "Example: before a final poster, test the marker on a scrap corner to see what happens on the back. Now do yours."],
    [["Bleed, feather, ghost", "📄", "<b>Bleeding</b> soaks through, <b>feathering</b> makes fuzzy edges, and <b>ghosting</b> shows marks from the other side."], ["Test first", "🧪", "Try your pen on a scrap of the same paper before the final piece."], ["Weight", "⚖️", "Paper weight is given in <b>gsm</b>. Heavier paper handles wet ink better."]]);

  const B10 = mk("Budgeting time on written tests", "⏳", [
    "A test has 40 minutes and 4 equal written questions. About how long for each?|10 minutes|1 minute|40 minutes",
    "Which question should you usually answer first?|One you know well|The hardest|The last",
    "What if you run out of time on a question?|Write a short outline of the rest and move on|Spend all remaining time on it|Stop writing",
    "Why note start times on your paper?|To keep track of the pace|To decorate|To confuse the teacher",
    "A question is worth 20 percent of the marks. How much of your time should it get?|About 20 percent|About 80 percent|None",
    "How long is a good planning step for a 30-minute essay?|About 3 to 5 minutes|25 minutes|0 minutes",
    "If you finish with spare time, what should you do?|Check and improve your answers|Leave early without looking|Redo the first page in a new pen",
    "Which marks a time-wise plan?|Writing a rough time next to each question|Starting immediately without reading|Starting at the back"
  ],
    ["Work out how much time each question deserves compared to the whole test.", "Share time in proportion to marks. Do the easy ones first and keep a pace.", "Example: a 60-minute test with 3 equal questions gives 20 minutes each; one worth double marks gets double the time. Now do yours."],
    [["Divide the time", "⏳", "Split the time by marks. A test with <b>4 equal questions</b> in <b>40 minutes</b> gives about 10 each."], ["Start with strengths", "🚀", "Answer questions you know first for quick marks and confidence."], ["Keep moving", "🏃", "If time runs out, jot the main points and go on. Leave a few minutes to check."]]);

  const B11 = mk("The final-five-minutes check", "🔍", [
    "What is the first thing to check at the end of a test?|That every question is answered|The color of your pen|The clock's brand",
    "Which kind of mistake does a final check often catch?|Missing words and small slips|Mistakes in the question|Typing errors on a keyboard",
    "How do you read your own writing to check it?|Slowly, line by line|At top speed|Backwards, letter by letter",
    "What should you do if you find an unclear word?|Rewrite it neatly above or beside|Leave it|Cross out the page",
    "How should you add a missed sentence?|Use a caret mark and write it above|Squeeze it in unreadably|Skip it",
    "Why check names and numbers?|They are easy to get wrong when rushed|They are optional|They do not matter",
    "Should you change an answer you are unsure about?|Only if you have a clear reason|Always|Never",
    "Where should corrections go?|Neatly nearby, with a single-line cross-out|In big scribbles|In another notebook"
  ],
    ["Think about the cheapest ways to protect marks with a few minutes left.", "Think about what is cheapest to fix at the end, and how to read your own writing carefully.", "Example: with two minutes left, glance down the page for gaps, then reread one answer for slips. Now do yours."],
    [["Blank first", "📋", "First make sure <b>every question has an answer</b>, even a short one."], ["Read slowly", "🐢", "Read line by line for missing words, wrong numbers and unreadable letters."], ["Fix cleanly", "✂️", "Use a <b>caret mark ^</b> to add a missed word, and cross out with one neat line."]]);

  const B12 = mk("Bubble sheets", "⭕", [
    "How should you fill in a bubble?|Completely and darkly|With a tiny dot|Only the outline",
    "Which pencil is usually required for scan sheets?|A #2 pencil|A red pen|A crayon",
    "If you change an answer on a bubble sheet, you should...|erase fully and fill in the new one|draw a circle around|fill both",
    "What is a risk of skipping a question on a bubble sheet?|Your answers may shift out of line|Nothing|Extra marks",
    "Why check the question number against the row?|To keep each answer in the correct place|To use time|It is decoration",
    "Stray marks on the sheet can...|be read by the scanner as answers|make it prettier|do nothing at all",
    "What do you do if you skip a question?|Skip the same row on the sheet|Fill any bubble in the next row|Fill in all rows",
    "How often should you check your row number?|Every few questions|Never|Only at the end"
  ],
    ["Think about how a machine reads the page: what does it see as a mark?", "Scanners read dark, full bubbles and any stray mark. Keep everything clean and aligned with the question.", "Example: if you skip question 7, leave row 7 empty and move to row 8 for question 8. Now do yours."],
    [["Fill fully", "⭕", "Fill each bubble <b>completely and darkly</b> with the correct pencil. Light marks may be missed."], ["Erase cleanly", "🧼", "Erase old answers fully. Smudges and stray marks can be read as answers."], ["Stay aligned", "📏", "Check that question and row numbers match, especially after skipping one."]]);

  const B13 = mk("Reading date formats", "📅", [
    "In the US, 03/04/2026 usually means...|March 4, 2026|April 3, 2026|March 4, 2062",
    "In much of Europe, 03/04/2026 usually means...|3 April 2026|4 March 2026|April 3, 2062",
    "What is the ISO date format order?|Year-month-day|Day-month-year|Month-day-year",
    "How would you write 5 July 2026 in ISO format?|2026-07-05|2026-05-07|05-07-2026",
    "Why spell out the month on important forms?|It prevents mix-ups between formats|It uses less space|It looks old-fashioned",
    "What does 'DD/MM/YYYY' stand for?|Day/Month/Year|Date/Moon/Year|Digit/Minute/Year",
    "Which date can only be one format?|25/12/2026, since there is no month 25|03/04/2026|01/02/2026",
    "Which is the clearest way to write a date for a global reader?|12 Oct 2026|10/12/26|12-10"
  ],
    ["Look at the order of the parts and think about which region writes it that way.", "The same numbers can mean different dates. Spelling the month or using year-month-day avoids confusion.", "Example: 04/05/2026 is April 5 in the US but 4 May in much of Europe, so 'May 4, 2026' avoids the mix-up. Now do yours."],
    [["Different orders", "📅", "The US writes <b>month/day/year</b>. Much of the world writes <b>day/month/year</b>."], ["ISO format", "🌍", "<b>Year-month-day</b> (2026-07-05) is the international standard and sorts well."], ["Spell it out", "🔤", "On forms and letters, write the month as a word (12 Oct 2026) to avoid mix-ups."]]);

  const B14 = mk("Addressing international mail", "🌐", [
    "Which line should be on a separate last line of an international address?|The country name|Your hobbies|The stamp price",
    "In which language is the country name best written?|The language of the sending country, in capitals|Any random language|Left off",
    "Where does the return address go?|Top left of the envelope|Under the stamp|On the flap only",
    "Why write the postal code carefully?|Sorting machines read it|It is only decoration|It is optional",
    "Why use block capitals for the country?|It stands out for sorters|It saves ink|It is polite",
    "Which tool avoids smudges on an envelope?|A quick-drying pen|A wet paintbrush|A water pen",
    "What should the main address ink be?|Dark on a light background|Gold on yellow|Pale gray",
    "How should you write a 1 and a 7 on an address?|Distinctly, with a crossbar on the 7 if you use one|Identically|As letters"
  ],
    ["Think about who and what has to read the address on its journey.", "Sorting staff and machines read the address lines, so neatness, order and the country line matter.", "Example: for a letter to a friend in another country, check each line in order, from the person to the place. Now do yours."],
    [["Order of lines", "🌐", "Name, street, city and postal code, then the <b>country on its own last line</b>."], ["Make it readable", "🔤", "Use dark ink, clear numbers, and capitals for the country. Machines read postal codes."], ["Return address", "↖️", "Put your return address at the <b>top left</b> so the mail can come back if needed."]]);

  const B15 = mk("The invention of paper", "🏮", [
    "In which country was paper first made?|China|Iceland|Brazil",
    "Who is traditionally credited with improving papermaking around 105 CE?|Cai Lun|Johannes Gutenberg|Leonardo",
    "What early papers were made from...|plant fibers, rags and bark|metal sheets|clay",
    "How did papermaking spread west?|Along trade routes through the Islamic world to Europe|By airplane|In one year",
    "What helped paper replace parchment in Europe?|It was cheaper|It was made of gold|It was invisible",
    "What did paper make easier?|Spreading writing and later printing|Building bridges|Growing food",
    "A papermaker pulps fibers in water and then...|lays them on a screen to dry into sheets|bakes them like bread|melts them like ice",
    "Modern paper is usually made from...|wood pulp|stone|sand"
  ],
    ["Think about where the invention began and what materials were cheap and plentiful there.", "Think about where an invention started, how it traveled, and why people adopted it.", "Example: for a handmade card, you could soak scrap paper into pulp, scoop it onto a screen, press it and let it dry. Now do yours."],
    [["From China", "🏮", "<b>Paper</b> was made in China about 2,000 years ago. Cai Lun is traditionally credited with improving it around 105 CE."], ["How it is made", "🥣", "Fibers are soaked into pulp, spread on a screen, pressed and dried into sheets."], ["Traveling west", "🐪", "Papermaking spread along trade routes to the Islamic world and then Europe, where paper replaced parchment."]]);

  const B16 = mk("Cuneiform and hieroglyphs", "🏺", [
    "Cuneiform was written by pressing a reed into...|wet clay|stone only|sand paper",
    "Cuneiform marks look like...|wedges|circles|clouds",
    "Cuneiform began in...|Mesopotamia|Canada|Australia",
    "Egyptian hieroglyphs were often carved on...|stone walls and monuments|ice|clouds",
    "What helped scholars read hieroglyphs?|The Rosetta Stone|A computer|A typewriter",
    "The Rosetta Stone had the same text in...|three scripts|one script|no script",
    "A scribe was...|a trained writer|a type of pen|a soldier",
    "Hieroglyphs mix pictures with...|sound signs|musical notes only|no meanings"
  ],
    ["Think about the material and shape that each ancient system used.", "Think about the material and the tool each ancient writer used, and the shape of the marks.", "Example: a Roman soldier might scratch a message in a wax tablet, but a scribe in another land would use a different tool and material. Compare the tools. Now do yours."],
    [["Cuneiform", "🏺", "<b>Cuneiform</b> began in Mesopotamia. Scribes pressed a reed into wet clay to make wedge-shaped marks."], ["Hieroglyphs", "𓂀", "<b>Hieroglyphs</b> were Egyptian picture and sound signs, carved in stone and written on papyrus."], ["Rosetta Stone", "🪨", "The <b>Rosetta Stone</b> carries one text in three scripts. It helped scholars decode hieroglyphs."]]);

  const B17 = mk("Handwriting and the brain", "🧠", [
    "Writing letters by hand uses...|fine motor skills and visual memory|only your ears|only your feet",
    "Why can drawing a letter help you recognize it?|Moving your hand builds a memory of its shape|Letters disappear|It is magic",
    "Handwriting engages which senses?|Touch, sight and movement|Smell only|None",
    "Which activity uses more hand-brain coordination?|Writing by hand|Tapping a single key|Staring at a screen",
    "Taking notes in your own words encourages...|thinking about the ideas|ignoring the ideas|going faster",
    "What does 'fine motor' mean?|Small, precise hand movements|Big arm swings|Running",
    "Handwriting practice is helpful for...|control and focus|nothing at all|only artists",
    "What is a good short daily habit?|A few minutes of careful handwriting|One hour of stress|Never writing"
  ],
    ["Think about how many parts of the body and mind a hand-written stroke connects.", "Writing by hand links sight, touch, movement and thinking. Choose the answer that shows those links.", "Example: tracing a new letter helps your eyes, hand and memory all learn its shape together. Now do yours."],
    [["Hand and mind", "🧠", "Writing by hand connects <b>movement, touch, sight and thinking</b>."], ["Fine motor skills", "🤏", "Small, careful hand movements build control that helps with drawing, music and sports too."], ["Own words", "💭", "Putting ideas in your own words makes your brain work on them, which helps learning."]]);

  const B18 = mk("The parts of your style", "🔬", [
    "Which is a feature of handwriting style?|Slant|Weather|Pen price",
    "Slant means...|the lean of letters to the right or left|how loud you write|paper color",
    "Which describes spacing?|The gaps between letters and words|The page number|The ink color",
    "Pressure is...|how hard you press on the page|how quickly you walk|paper brand",
    "x-height is...|the height of lowercase letters like x and a|the height of capitals|the length of a tail",
    "Which change makes writing look more consistent?|Keeping slant and size the same|Changing each letter|Writing tiny then huge",
    "A way to see your own style is to...|write the same sentence and compare traits|ask a stranger|burn the page",
    "Which trait would you change to make writing easier to read?|Uneven spacing|Pen color",
  ],
    ["Think about what you notice when you compare two people's handwriting.", "Style is built from traits like slant, size, spacing and pressure. Match the trait to the clue.", "Example: letters leaning right, medium size and even gaps describe a slant, size and spacing. Now do yours."],
    [["Traits", "🔬", "Handwriting style comes from <b>slant, size, spacing, pressure</b> and letter shapes."], ["Look closely", "🔍", "Write one sentence a few times and compare traits to see what you do naturally."], ["Improve one", "🎯", "Choose one trait, like spacing, to improve at a time. Small changes add up."]]);

  const L17 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18];

  // =============== LEVEL 18 ===============
  const C1 = mk("An exam-day writing kit", "🎒", [
    "Which item belongs in an exam writing kit?|Two working pens and a pencil|A loud toy|Ten different notebooks",
    "Why bring a spare pen?|One may run out or fail|To trade with a friend|It is a rule for all pens",
    "What should you do first when the exam starts?|Write your name and read the instructions|Start the last question|Chat with a neighbor",
    "Which pen color is usually safest unless told otherwise?|Blue or black|Light green|Glitter silver",
    "A good pre-exam habit for your hand is to...|warm up with loops and relaxed strokes|clench your fist|skip breakfast",
    "Why write your name clearly on the paper?|So your work can be matched to you|To fill space|For fun",
    "What should you do if your hand cramps mid-exam?|Pause, shake it out, and relax your grip|Squeeze harder|Stop trying",
    "Before handing in, you should check that...|your name is on every page that needs it|your pen is sharpened|your desk is polished"
  ],
    ["Think about what could go wrong in the middle of a timed test, and how to be ready.", "A prepared writer has working tools, clear information on the paper, and a way to deal with tired hands.", "Example: pack two pens, check your name is on each sheet, and take a calm breath before starting. Now do yours."],
    [["Be ready", "🎒", "Pack <b>two working pens</b> and a pencil. Use blue or black ink unless told otherwise."], ["Start smart", "📝", "Put your name on the paper, read the instructions, and plan your time."], ["Look after your hand", "🖐️", "Warm up with easy strokes. If you cramp, shake it out and loosen your grip."]]);

  const C2 = mk("Keeping up with a fast speaker", "🏃", [
    "What should you do when the speaker is too fast?|Write key words and leave gaps to fill later|Write every word|Stop writing",
    "How can you mark a gap you plan to fill?|With a blank or a special symbol like ???|With a drawing of a house|With nothing",
    "Which kind of words are worth catching first?|Names, dates and numbers|Words like 'um'|Jokes",
    "After class you should...|fill in the gaps while you remember|never look again|erase it all",
    "Which clue words tell you something important is coming?|'The key point is...' and 'remember that...'|'Um' and 'so'|Page numbers",
    "Is it okay to ask the speaker to repeat something?|Yes, politely|Never|Only by shouting",
    "What should you do with a missed point?|Mark it and ask a classmate or check the book|Make something up|Tear the page",
    "A tip for speed is to...|use your own consistent abbreviations|invent a new one each line|write backward"
  ],
    ["Think about what to do when you cannot keep up without losing the whole lesson.", "Think about how to protect the lesson even when you cannot write everything, and how to fix it later.", "Example: write 'cause: ???' when you miss a word, then check the textbook after class and fill it in. Now do yours."],
    [["Catch the key points", "🏃", "When you cannot write everything, capture <b>names, dates, numbers and key terms</b>."], ["Mark the gaps", "❔", "Leave a blank or write <b>???</b>, then fill it in after class from a classmate or the book."], ["Signal phrases", "📣", "Listen for clue phrases like 'the key point is...' and 'remember that...'."]]);

  const C3 = mk("One-idea index cards", "🗃️", [
    "A good note card holds...|one idea|an entire chapter|nothing",
    "Why keep one idea per card?|You can sort and combine cards later|It saves cards|It looks nice",
    "What should you write on each card besides the idea?|Where it came from|Your favorite color|A random number",
    "Cards can be linked by writing...|the number or title of a related card|a joke|nothing",
    "A sociologist who famously used a card system was...|Niklas Luhmann|Albert Einstein|Mozart",
    "What can you do with many cards on one subject?|Sort them to plan an essay|Throw them away|Eat them",
    "Which card note is best?|A clear idea in your own words|A copied paragraph|A single word with no meaning",
    "Why write the date on a card?|It helps you track when you learned it|It is required by law|To decorate"
  ],
    ["Think about how small separate pieces can be rearranged into something bigger.", "Think about how small separate pieces can be rearranged, and what you need to remember about each.", "Example: five cards on 'causes of erosion' can be shuffled into an essay outline. Now do yours."],
    [["One idea each", "🗃️", "Write <b>one idea per card</b> in your own words, and note the <b>source</b>."], ["Link them", "🔗", "Add the title or number of related cards so ideas connect."], ["Build with them", "🏗️", "Sort the cards into a plan for an essay or project."]]);

  const C4 = mk("Bullet journal basics", "🔵", [
    "In a bullet journal, a dot usually means...|a task|an event|a note",
    "What does an X over a dot usually mean?|The task is done|The task is new|The task is cancelled forever",
    "What does a dash usually mean?|A note|A task|An event",
    "What does an open circle usually mean?|An event|A task|A note",
    "What does the > mark mean?|The task was moved to a later date|The task is complete|The task is an idea",
    "'Rapid logging' means...|writing short bulleted entries|writing full essays|drawing portraits",
    "Why use an index page?|To find topics quickly|To store pens|To hold stickers",
    "What are 'collections'?|Pages for a single topic, like books to read|Pencil sets|Coin albums"
  ],
    ["Think about how short symbols can say what kind of entry each line is.", "Bullet journals use a small sign at the start of each line. Think about what each sign tells you about the entry.", "Example: a homework item would get one sign when you write it, and another when you finish it. Notes and events would use their own signs. Now do yours."],
    [["Short entries", "🔵", "<b>Rapid logging</b> uses short lines marked with signs: a dot is a <b>task</b>, an open circle an <b>event</b>, a dash a <b>note</b>."], ["Mark progress", "✖️", "Cross a task with <b>X</b> when done. Use <b>&gt;</b> when you move it to a later day."], ["Index and collections", "📑", "An <b>index</b> lists page topics, and <b>collections</b> are pages for one subject."]]);

  const C5 = mk("Drawing people and icons fast", "🙂", [
    "What is the simplest way to draw a person in a sketchnote?|A stick figure or circle and lines|A photo-realistic portrait|A full painting",
    "How can you show a happy face quickly?|A circle with a curved smile|A square|A triangle",
    "How can you show a confused person?|A face with a wavy mouth and a question mark|A smile|A star",
    "Which five shapes can build most icons?|Circle, square, triangle, line, dot|Oval, spiral, heart, star, cloud|Only circles",
    "Which shape makes a good house roof?|Triangle|Circle|Dot",
    "What can you add to a stick figure to show action?|Bent arms and legs|A larger head|Color only",
    "Why keep icons simple?|They are fast to draw during a talk|Complex icons are illegal|Paper is expensive",
    "How do you practice icons?|Doodle a few every day|Never practice|Draw only once a year"
  ],
    ["Think about the simplest shapes that make something recognizable.", "Icons are built from basic shapes. Keep it simple so you can draw it in seconds.", "Example: a circle for a head, a line for a body, and curved lines for arms make a person in under ten seconds. Now do yours."],
    [["Basic shapes", "🔺", "Most icons are built from a <b>circle, square, triangle, line and dot</b>."], ["Stick people", "🙂", "A circle head, line body, and bent arms and legs show action. Change the mouth to show feelings."], ["Practice", "✏️", "Doodle a few icons daily so they are quick when you need them."]]);

  const C6 = mk("Bounce lettering", "🏀", [
    "Bounce lettering means letters...|sit slightly above and below the baseline|are perfectly level|are upside down",
    "What does the baseline do in bounce lettering?|It becomes a guide, not a strict line|It disappears|It becomes a circle",
    "Which makes bounce lettering look playful?|Varying the height of each letter|Making all letters identical|Writing tiny",
    "What should stay consistent in bounce lettering?|Size and slant, roughly|Nothing|The pen color only",
    "Which type of text suits bounce lettering?|Fun quotes and titles|Legal forms|Phone numbers",
    "Why would you avoid bounce lettering for a form?|It is harder to read|It is too fancy|It uses ink",
    "How can you begin practicing?|Draw a baseline and move letters up and down gently|Draw a spiral|Write vertically",
    "What can overdo bounce?|Too much movement makes words unreadable|Using a pen|Using paper"
  ],
    ["Think about how a ball moves above and below a floor line.", "Bounce lettering lets letters hop around the baseline while staying readable. Choose the answer that keeps that balance.", "Example: the word 'jump' with each letter nudged up or down, but similar in size and slant, feels like bouncing. Now do yours."],
    [["Playful letters", "🏀", "<b>Bounce lettering</b> lets letters sit a little above or below the baseline."], ["Keep control", "🎯", "Keep letter <b>size and slant</b> similar so the word stays readable."], ["Use it wisely", "🧭", "It suits posters and cards, but not forms or serious documents where clear writing matters most."]]);

  const C7 = mk("Pressure in pointed-pen writing", "✒️", [
    "In pointed-pen script, you press for the...|downstroke|upstroke|pause",
    "In pointed-pen script, you stay light on the...|upstroke|downstroke|paper",
    "Why does pressure open the nib tines?|They spread to let more ink flow|They close|They disappear",
    "What happens if you press on an upstroke?|The nib may catch or spatter|It writes better|Nothing",
    "How should you move the pen on an upstroke?|Light and smooth|With force|Backward",
    "What is a good habit with a dip nib?|Wipe it clean and dry after use|Leave it dirty|Hit it on the desk",
    "What does the term 'shade' mean in calligraphy?|The thick part of a stroke made with pressure|A cloudy day|A cover for ink",
    "Which is the correct pair for pointed pen?|Hairline up, shade down|Shade up, hairline down|No difference"
  ],
    ["Think about which direction of stroke the nib is pulled with its tines open.", "Think about which direction the nib is pushed with its tines spread, and which direction should stay light.", "Example: in a looped 'e', the stroke going up stays hairline thin while the stroke coming down can be heavier. Now do yours."],
    [["Down is heavy", "⬇️", "Press on the <b>downstroke</b> to open the nib's tines and make a thick <b>shade</b>."], ["Up is light", "⬆️", "Keep the <b>upstroke</b> light for a thin <b>hairline</b>. Pressing on an upstroke can catch the paper."], ["Care", "🧽", "Wipe the nib clean and dry after use so it does not rust or clog."]]);

  const C8 = mk("Slant guidelines", "📐", [
    "What is a slant guide?|Angled lines that keep letters leaning the same way|A horizontal ruler|A circle",
    "Copperplate script is usually written at about...|55 degrees|90 degrees|0 degrees",
    "Which slant means letters stand straight up?|90 degrees (vertical)|55 degrees|20 degrees",
    "A common reason to use a guide sheet is to...|keep slant consistent|change the ink|dry the page",
    "How do you use a guide sheet with thin paper?|Place it under your paper so lines show through|Paste it on top|Fold it",
    "Why does consistent slant matter?|It makes writing look neat and even|It changes the meaning|It has no effect",
    "If your letters lean differently each time, the issue is...|inconsistent slant|wrong ink|wrong pen color",
    "Which tool helps draw slant lines?|A protractor or ruler|A spoon|A compass needle on its own"
  ],
    ["Think about how an angle is measured and what 'straight up' would be.", "Think about how an angle is measured and what tool can keep letters parallel.", "Example: a sheet of evenly spaced diagonal lines slid under your paper keeps every letter parallel. Now do yours."],
    [["Angle of lean", "📐", "<b>Slant</b> is how much letters lean. Copperplate uses about <b>55 degrees</b> and upright writing uses 90."], ["Guide sheets", "🧾", "Slide a printed guide with slanted lines <b>under</b> thin paper to keep every letter parallel."], ["Consistency", "🔁", "Neatness comes from using the <b>same slant</b> all the time."]]);

  const C9 = mk("Ligatures and alternates", "🔗", [
    "A ligature is...|two letters joined into one shape|a type of pen|a margin",
    "Which pair is a common ligature?|fi|zq|xv",
    "Why use ligatures in lettering?|They avoid awkward collisions and look smooth|They shorten ink|They hide mistakes",
    "An 'alternate' letter is...|a different version of the same letter|a wrong letter|a color",
    "Why use alternate forms of a letter?|To make repeated letters look natural|To confuse readers|To save paper",
    "Which ligature joins an f and an f?|ff|oo|ll",
    "What should you remember about ligatures?|They must stay readable|They must be tiny|They must be colored",
    "A swash is...|an extended decorative stroke|a pen cap|a margin line"
  ],
    ["Think about two letters whose shapes would bump into each other.", "Think about letters that bump into each other and how lettering artists solve it.", "Example: in 'flow' the f and l can be drawn with one shared stem to avoid a clash. Now do yours."],
    [["Joined letters", "🔗", "A <b>ligature</b> joins two letters into one shape, like <b>fi</b> or <b>ff</b>."], ["Alternates", "🔀", "An <b>alternate</b> is another version of a letter, so repeated letters do not look copied."], ["Stay readable", "👓", "Decorative strokes called <b>swashes</b> are fun, but always keep the word clear."]]);

  const C10 = mk("Thumbnail sketches", "🖼️", [
    "A thumbnail sketch is...|a tiny quick draft of a layout|a thumb-shaped pen|a finished painting",
    "Why make several thumbnails?|To compare layout ideas quickly|To use more paper|To test the ink",
    "How big is a typical thumbnail?|A few centimeters across|The size of a poster|As big as a table",
    "What do you decide in a thumbnail?|Where the words and images go|The color of the sun|The weather",
    "After thumbnails, what comes next?|A larger rough sketch of the best one|Throwing all away|Final ink immediately",
    "Why keep thumbnails rough?|You can try ideas fast without fuss|They must be hidden|Pencils are broken",
    "Which is a good question to ask about a thumbnail?|Does the main word stand out?|What did I eat for lunch?|Is the paper cheap?",
    "How many thumbnails are useful?|Several, then pick the best|Only one|Hundreds with no choice"
  ],
    ["Think about how to test an idea cheaply before spending time on a final version.", "Think about a cheap, fast way to test layout ideas.", "Example: sketch three small boxes with different arrangements for a poster title, then pick the clearest. Now do yours."],
    [["Small and quick", "🖼️", "A <b>thumbnail</b> is a tiny, rough sketch of a layout. It takes seconds."], ["Compare", "⚖️", "Draw several, then check which makes the <b>main message stand out</b>."], ["Then enlarge", "🔎", "Redraw the best one bigger in pencil before inking the final piece."]]);

  const C11 = mk("Application forms", "📋", [
    "What should you do before writing on a volunteer or club form?|Read it through and gather information|Write immediately|Ask someone else to fill it in",
    "Why use a draft first for long answers?|You can fix mistakes before the final copy|It uses more paper|It is a rule",
    "Which tone suits an application?|Polite and clear|Silly|Rude",
    "Why check spelling of names and places?|Errors look careless and can cause problems|Nobody cares|They are optional",
    "What if a question does not apply to you?|Write 'N/A' or follow the instructions|Leave it unexplained|Make something up",
    "Why use the exact name on your ID?|The form can match your records|It looks nicer|It is shorter",
    "Should you keep a copy of a form you submit?|Yes, if you can|Never|Only if it is blue",
    "What should you do if the form asks for a parent signature?|Ask your parent to read and sign it|Sign for them|Skip it"
  ],
    ["Think about how to avoid mistakes you cannot undo once you hand a form in.", "Think about the order of steps before, during and after filling in the form.", "Example: for a sports club form, jot your short answers on scrap paper first, then copy them neatly. Now do yours."],
    [["Read first", "📋", "Read the <b>whole form</b> and gather what you need before writing."], ["Draft", "✏️", "Write long answers on scrap paper first, then copy them neatly in dark ink."], ["Check and keep", "🔍", "Check spelling and numbers, get the right signatures from the right people, and keep a copy."]]);

  const C12 = mk("Writing numbers and codes clearly", "🔢", [
    "How can you make a 7 clearer?|Add a short crossbar|Make it look like a 1|Make it tiny",
    "How can you tell a 1 from a 7?|The 7 has a top bar, the 1 does not|They are the same|Color",
    "How can you avoid confusing 0 and O in codes?|Slash or dot the zero if the form says to|Write them the same|Make them tiny",
    "Why do some people cross their Z?|To tell it from 2|To save ink|For style only",
    "Which pair gets mixed up most in handwriting?|5 and S|M and 8|K and 3",
    "What is a safe way to write a long number?|Group digits and leave small gaps|Run them together with no gaps|Write them in a spiral",
    "A phone number should be checked...|digit by digit before sending|never|only once a year",
    "Why write codes in block style?|Clearer for others to read|It uses less paper|It is required in all schools"
  ],
    ["Think about which digits and letters look alike, and what little marks separate them.", "Think about tiny marks and gaps that make look-alike characters different.", "Example: write a 4 with a closed top and a 9 with a straight tail so they do not look alike. Now do yours."],
    [["Look-alikes", "🔢", "Pairs like <b>1/7</b>, <b>0/O</b>, <b>5/S</b> and <b>2/Z</b> are easy to mix up when written fast."], ["Add marks", "✏️", "A crossbar on the <b>7</b>, a slash on the <b>zero</b>, or crossing the <b>Z</b> can help."], ["Check twice", "☎️", "Group long numbers with small gaps and check them digit by digit before you send."]]);

  const C13 = mk("Labeling files and containers", "🏷️", [
    "A good label is...|short, clear and in a consistent place|long and curly|hidden",
    "Where should a label usually go on a folder?|On the tab or front edge|On the inside|Nowhere",
    "Why use the same style for all labels?|It is easy to scan quickly|It uses less ink|It looks old",
    "What should lab sample labels include?|Name or code, date and contents|Only a smiley|A secret code with no key",
    "Which marker is better for plastic or glass?|A permanent marker|A pencil|Chalk",
    "How big should label letters be?|Large enough to read from where you stand|Microscopic|Wall-sized",
    "What if you keep many similar boxes?|Use short unique labels or numbers|Label every box the same|No labels",
    "Why add dates to labels on stored items?|To know how old they are|To decorate|To confuse"
  ],
    ["Think about who will look for the item, from how far, and how fast.", "A good label is readable, consistent and matches what it is stuck on. Choose the answer that helps the finder.", "Example: the label 'Science - Notes - 2026' in capital letters on the tab lets you spot the right folder at a glance. Now do yours."],
    [["Short and clear", "🏷️", "Use <b>block capitals</b>, a consistent place and enough size to read from where you stand."], ["Right tool", "🖍️", "Use a <b>permanent marker</b> on plastic or glass, and pencil or pen on paper labels."], ["Add the key facts", "📅", "Include a name or code and a date so you know what it is and how old it is."]]);

  const C14 = mk("Strain and tool fit", "🧤", [
    "Which is a sign you should rest your hand?|Aching, tingling or numbness|A sharp pencil|A clean desk",
    "What can help a tight grip on a thin pen?|A thicker pen or a soft grip|Squeezing harder|A smaller pen",
    "What should you do if writing causes steady pain?|Stop, rest and tell a parent or doctor|Push through|Ignore it",
    "How often should you take a short writing break?|Every 20 to 30 minutes|Never|Only after three hours",
    "Which stretch is good for your hands?|Gently open and close your fist|Pull your fingers backward hard|Crack all your knuckles",
    "What is 'RSI'?|Repetitive strain injury|Really Sharp Ink|Regular Spelling Index",
    "A relaxed grip uses...|just enough pressure to control the pen|your whole arm's strength|no touch at all",
    "Which helps prevent strain?|Varying tasks and taking breaks|Writing for hours without moving|Using the smallest pen"
  ],
    ["Think about what your body tells you when a task is too much, and what you can change.", "Think about what your body tells you and what you can change about the tool or habit.", "Example: if your fingers cramp with a thin pen, a thicker pen with a soft grip can reduce the squeeze. Now do yours."],
    [["Listen to your hand", "🧤", "Aching, tingling or numbness means <b>rest</b>. Tell a parent or doctor if pain keeps coming back."], ["Fit the tool", "🖊️", "A thicker pen or a soft grip can lessen squeezing. Keep the grip relaxed."], ["Move and vary", "🔁", "Take a short break every 20 to 30 minutes and gently stretch your hands."]]);

  const C15 = mk("Wax tablets and slates", "🪧", [
    "What was written on a Roman wax tablet?|Wax, using a pointed stylus|Paper, using a keyboard|Metal, using a laser",
    "How could you erase a wax tablet?|Smooth the wax with the flat end of the stylus|Wash it with water|Throw it away",
    "Why were wax tablets popular?|They could be reused many times|They were edible|They were invisible",
    "A stylus is...|a pointed tool for writing in soft material|a type of ink|a type of paper",
    "What are slates mainly made of?|Stone|Wax|Cloth",
    "School slates were written on with...|a slate pencil or chalk|a keyboard|a quill",
    "Why were slates useful in old classrooms?|They could be wiped and reused|Paper was banned|They glowed",
    "Which is closest to a modern reusable writing surface?|A whiteboard|A stamp|A postcard"
  ],
    ["Think about which surfaces could be written on and then wiped or smoothed for the next use.", "Think about what these surfaces let a writer do after they finish.", "Example: a student writes sums on a slate, shows the teacher, wipes it and starts again. Now do yours."],
    [["Wax tablets", "🪧", "Romans wrote on <b>wax</b> with a pointed <b>stylus</b>. The flat end smoothed the wax to reuse it."], ["Slates", "🪨", "<b>Slates</b> are thin stone boards. Students wrote with chalk or slate pencil and wiped them clean."], ["Reusable", "♻️", "Reusable surfaces saved paper, and the idea lives on in whiteboards."]]);

  const C16 = mk("How document examiners compare writing", "🔎", [
    "What do forensic document examiners compare?|Many features of handwriting together|Only the color of ink|Only the page size",
    "Why do examiners need a good sample of known writing?|To compare against the questioned writing|To rip it up|To make it prettier",
    "Does a person's writing vary a little each time?|Yes, there is natural variation|No, never|Only on Mondays",
    "Which feature might be compared?|Letter shapes, spacing and slant|The brand of the pen cap|The weight of the examiner",
    "Is one feature alone usually enough?|No, they look at the combination|Yes, always|It does not matter",
    "What does a copied signature often lack?|Smooth, natural flow|Letters|A name",
    "Why is it good to have your own consistent signature?|It is easier to confirm as yours|It is easier to forget|It is slower",
    "Graphology (guessing personality from writing) is...|not supported by good evidence|a proven science|a legal test"
  ],
    ["Think about the careful, fair way an expert would compare two samples.", "Think about how a careful expert stays fair when two samples are never exactly the same.", "Example: an examiner compares slant, spacing and letter shapes across several known samples, not a single letter. Now do yours."],
    [["Compare many features", "🔎", "Examiners study <b>slant, spacing, letter shapes, pressure and flow</b> together."], ["Natural variation", "🌊", "Your writing varies a little each time, so examiners need <b>several known samples</b>."], ["Not a fortune teller", "🚫", "Graphology, which claims to read personality, is not supported by good evidence."]]);

  const C17 = mk("Choosing the right tool", "🧰", [
    "You need to take quick notes in a lecture with diagrams. Best tool?|Pen and paper|A phone game|A calculator",
    "You must write and revise a 1,000-word essay. Best tool?|A keyboard|A stamp|A chalkboard",
    "You want to remember a list of facts. A strong choice is...|handwritten flashcards you self-test with|only reading once|a loud song",
    "You need to share notes with a group. Best choice?|Typed or scanned notes|One paper copy locked away|A secret code",
    "No power is available. What works?|Pencil and paper|A laptop|A tablet",
    "You are sketching an idea with arrows and boxes. Best choice?|Paper or a stylus on a tablet|A spreadsheet cell|A voice message",
    "A long email to a teacher is best...|typed|chiseled in stone|painted on a wall",
    "A handwritten thank-you note shows...|personal care|haste|nothing"
  ],
    ["Think about the job: how long, how editable, how shareable, and whether there is power.", "Think about which tool fits each job: how long, how editable, how shareable.", "Example: a 2,000-word report needs fast edits so a keyboard fits; a lab sketch with arrows suits pen and paper. Now do yours."],
    [["Think about the job", "🧰", "Ask: how long is it, will I edit it, do I need to share it, and is there power?"], ["Paper strengths", "📝", "Great for <b>sketches, diagrams, quick notes</b>, and remembering by writing."], ["Keyboard strengths", "⌨️", "Great for <b>long drafts, easy editing and sharing</b>. A handwritten note adds a personal touch."]]);

  const C18 = mk("Your personal writing toolkit", "🧭", [
    "A personal writing system should be...|something you actually use and keep up|as complicated as possible|changed every day",
    "Which is a good way to test a new method?|Try it for a week and see|Judge it after one minute|Never try anything new",
    "What should you keep from old methods?|What works for you|Everything, even what does not work|Nothing",
    "Why save samples of your writing over time?|To see your progress|To fill the shelf|To lose them",
    "A good set of habits includes...|a warm-up, good posture and regular reviews|working in the dark|no breaks",
    "What is a sensible goal for handwriting?|Legible, comfortable and fast enough|Perfect every time|The tiniest letters",
    "If a method keeps failing, you should...|adjust it or try another|blame yourself|stop writing",
    "Your handwriting style is best when it is...|clear, comfortable and yours|a copy of someone else's|unreadable on purpose"
  ],
    ["Think about the long game: a habit you will stick with, and how you will know it works.", "Think about how to improve a habit over time without wasting effort.", "Example: try a new planner layout for a week; if it helps, keep it, and if not, change one thing. Now do yours."],
    [["Build your system", "🧭", "Pick methods, pens and habits that you will <b>actually keep using</b>."], ["Test and tweak", "🧪", "Try a method for a <b>week</b>, keep what works and adjust what does not."], ["Aim for the right goal", "🎯", "Good handwriting is <b>legible, comfortable and fast enough</b>, with a style that is yours."]]);

  const L18 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18];

  Object.assign(HAND_LEVELS, {
    16: L16.concat([MIX("Mixed practice", L16[0], L16[2], L16[5], L16[8], L16[12]), MIX("Level 16 Challenge", L16[1], L16[3], L16[7], L16[10], L16[14], L16[17])]),
    17: L17.concat([MIX("Mixed practice", L17[0], L17[2], L17[5], L17[7], L17[12]), MIX("Level 17 Challenge", L17[1], L17[3], L17[8], L17[10], L17[15], L17[17])]),
    18: L18.concat([MIX("Mixed practice", L18[0], L18[2], L18[5], L18[7], L18[12]), MIX("Level 18 Challenge", L18[1], L18[3], L18[8], L18[10], L18[15], L18[17])])
  });
})();
