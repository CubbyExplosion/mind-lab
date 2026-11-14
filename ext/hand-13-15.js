// ext/hand-13-15.js  Mind Lab Handwriting, levels 13-15 (60 lessons)
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

  // =============== LEVEL 13 ===============
  const A1 = mk("Compound sentences", "✌️", [
    "Which sentence is <b>compound</b>?|The sun set, and the stars came out.|The sun set behind the hills.|When the sun set, we went home.",
    "Which word can join two complete thoughts after a comma?|but|because|although",
    "Add the missing mark: <b>We practiced all week but we still lost.</b>|a comma before 'but'|a comma after 'week'|a colon before 'we'",
    "How many complete thoughts does a compound sentence have?|two or more|just one|none",
    "Which list holds only joining words from FANBOYS?|and, but, so|since, when, if|after, until, while",
    "Where does the comma belong? <b>Mia drew a map and Leo wrote the notes.</b>|before 'and'|after 'drew'|after 'Leo'",
    "Which is NOT a compound sentence?|Mia drew a map and wrote the notes.|Mia drew a map, and Leo wrote the notes.|Mia drew a map, but Leo lost it.",
    "Which joining word fits? <b>He studied hard, ___ he passed the test.</b>|so|or|nor"
  ],
    ["Look for two thoughts that could each stand alone as a sentence.", "Look at whether each half could stand alone. One subject doing two actions is not enough.", "Example: 'Dad cooked, and I washed up.' Both halves could stand alone, so a comma and a joiner connect them. 'Dad cooked and washed up' has only one subject, so it is not compound. Now do yours."],
    [["Two thoughts, one sentence", "✌️", "A <b>compound sentence</b> joins two complete thoughts: <b>The rain stopped, and we went out.</b>"], ["FANBOYS", "🧷", "Joiners: <b>F</b>or, <b>A</b>nd, <b>N</b>or, <b>B</b>ut, <b>O</b>r, <b>Y</b>et, <b>S</b>o. Put a <b>comma</b> before the joiner."], ["Careful", "⚠️", "<b>She sang and danced</b> has one subject, so it is not compound and needs no comma."]]);

  const A2 = mk("Commas after opening clauses", "🧩", [
    "Where does the comma go? <b>When the bell rang we ran outside.</b>|after 'rang'|after 'bell'|after 'ran'",
    "Where does the comma go? <b>Although it was cold we played outside.</b>|after 'cold'|after 'it'|after 'played'",
    "Where should the comma go in <b>After dinner we washed the dishes.</b>?|after 'dinner'|after 'we'|after 'washed'",
    "Which sentence needs NO comma?|We went home after the rain stopped.|After the rain stopped we went home.|If you are ready we can leave.",
    "A group of words at the start that begins with 'because', 'when' or 'if' is an...|introductory clause|ending|title",
    "Which word starts an introductory clause?|Although|Pencil|Seven",
    "Where should the comma go in <b>Because I studied I felt ready.</b>?|after 'studied'|after 'I'|after 'felt'",
    "Why put a comma after an opening clause?|It shows where the main part begins.|It makes the word longer.|It replaces a period."
  ],
    ["Find the point where the opening idea ends and the main sentence starts.", "The opening group of words cannot stand alone. The comma goes right where it ends, just before the part that can stand alone.", "Example: 'Since the road was icy we drove slowly.' The opening group is 'Since the road was icy', so the comma sits right after 'icy'. Now do yours."],
    [["Opening clauses", "🧩", "Words like <b>when, if, because, although, since</b> start a clause that cannot stand alone."], ["Comma after it", "✂️", "<b>Because it was late, we left.</b> The comma comes where the opening clause ends."], ["Flip it", "🔄", "If the clause comes last, no comma is needed: <b>We left because it was late.</b>"]]);

  const A3 = mk("Run-ons and comma splices", "🚧", [
    "Which is a <b>comma splice</b>?|I was tired, I went to bed.|I was tired, so I went to bed.|I was tired. I went to bed.",
    "Which is a <b>run-on</b>?|It rained we stayed in.|It rained, so we stayed in.|It rained. We stayed in.",
    "How can you fix a run-on?|Add a period or a joining word.|Add more words.|Remove all punctuation.",
    "How can you fix <b>The movie ended we left.</b> with punctuation?|Add a semicolon between the thoughts|Add a hyphen between them|Add a colon after 'we'",
    "A comma splice joins two complete thoughts with...|only a comma|a period|a semicolon",
    "How can you fix <b>Jo ran fast, she won.</b>?|Add 'and' after the comma|Delete the comma and add nothing|Put a comma after 'Jo'",
    "How do you fix <b>The bus came, we got on.</b> with a period?|Change the comma to a period and capitalize 'we'|Add a second comma|Remove the word 'the'",
    "A run-on has two complete thoughts and...|no proper stop or joiner|too many commas|only one verb"
  ],
    ["Count the complete thoughts, then look at what sits between them.", "Look at what separates the two complete thoughts: nothing, only a comma, or something strong enough to hold them apart.", "Example: 'The lake froze, we skated.' Two thoughts, only a comma. Fix: 'The lake froze, so we skated.' or 'The lake froze. We skated.' Now do yours."],
    [["Run-on", "🏃", "A <b>run-on</b> sticks two complete thoughts together with nothing between: <b>It was late we left.</b>"], ["Comma splice", "✂️", "A <b>comma splice</b> uses only a comma: <b>It was late, we left.</b> A comma alone is too weak."], ["Fixes", "🔧", "Use a period, a semicolon, or a comma plus a joiner: <b>It was late, so we left.</b>"]]);

  const A4 = mk("Thesis statements", "🎯", [
    "What is a thesis statement?|The main point of an essay in one sentence|The title of the essay|A list of sources",
    "Which is the strongest thesis?|School uniforms should be optional because they limit self-expression.|School uniforms are things.|I will write about uniforms.",
    "Where does a thesis usually go?|At the end of the introduction|In the bibliography|Between the title and the date",
    "Which is only a topic, not a thesis?|Pets|Pets teach children responsibility.|Dogs need daily walks to stay healthy.",
    "A good thesis should be...|clear and arguable|a question|a quote from a book",
    "Which is a question, so it is a weak thesis?|Why do we need sleep?|Sleep helps students learn.|Teens need about nine hours of sleep.",
    "What do the body paragraphs do?|Prove the thesis|Repeat the title|Replace the thesis",
    "Which thesis is too vague?|Recycling is good.|Recycling saves energy and reduces landfill waste.|Our school should add recycling bins to every classroom."
  ],
    ["A thesis tells the reader your position, not just your subject.", "It takes a stand that someone could agree or disagree with. Naming a subject is not the same as taking a stand.", "Example: 'Libraries' is only a topic. 'Libraries help communities by offering free books and quiet places to study' takes a stand, so it is a thesis. Now do yours."],
    [["The big idea", "🎯", "A <b>thesis statement</b> is the main point of your essay, in one sentence."], ["Strong or weak?", "💪", "Strong: <b>Cities should plant more trees to cool the streets.</b> Weak: <b>Trees.</b>"], ["Placement", "📍", "Put it at the <b>end of the introduction</b>. Every body paragraph then supports it."]]);

  const A5 = mk("Transition words", "🌉", [
    "Which transition shows <b>contrast</b>?|However|Also|Finally",
    "Which transition adds another idea?|Furthermore|However|Instead",
    "Which transition shows a <b>result</b>?|As a result|For example|On the other hand",
    "Which transition shows time order?|Next|Therefore|In contrast",
    "<b>The trail was steep; ___, we reached the top.</b> (contrast)|nevertheless|moreover|similarly",
    "Which transition introduces an example?|For instance|Consequently|Nevertheless",
    "<b>First we mixed the paint. ___, we spread it on the board.</b>|Then|However|Instead",
    "Where do transitions help most?|Between sentences and paragraphs|Only in titles|Only in lists"
  ],
    ["Ask how the two ideas are connected: more of the same, opposite, cause, or order?", "Each transition has a job. Match the job (adding, contrasting, showing a result, ordering, giving an example) to the one that fits.", "Example: 'It rained all day. ___, the game was cancelled.' The second idea is a result of the first, so a result word fits. Now do yours."],
    [["Bridges", "🌉", "<b>Transitions</b> are words that link one idea to the next so writing flows."], ["Their jobs", "🧰", "Add: <b>also, furthermore</b>. Contrast: <b>however, but</b>. Result: <b>so, therefore</b>. Order: <b>first, next, finally</b>."], ["Examples", "💡", "<b>For example</b> and <b>for instance</b> introduce a sample that backs up your point."]]);

  const A6 = mk("Print-cursive hybrid", "🖋️", [
    "What is hybrid handwriting?|A mix of print and joined letters|Only printed capitals|Writing with both hands",
    "Why do many writers join only some letters?|It can be quick and still easy to read|It is a rule for all adults|It prevents spelling mistakes",
    "Which part of a word is often joined in hybrid writing?|Common pairs like 'er' and 'ing'|Only the first letter|Nothing at all",
    "Which matters most in any handwriting style?|Being legible|Having the most loops|Looking old-fashioned",
    "If a joined letter turns unclear, you should...|lift your pen and print that letter|keep going anyway|write it much smaller",
    "Many hybrid writers still print...|capital letters|the whole page in loops|nothing",
    "A hybrid style helps speed because...|you lift your pen less|you press harder|you write bigger",
    "The best test of a hybrid hand is...|someone else can read it easily|it matches a font|it is the slowest possible"
  ],
    ["Think about what each style is good at: print is clear, joined writing is quick.", "A hybrid borrows from both styles, and the writer decides letter by letter.", "Example: a student prints her capitals and joins 'th' and 'ing' to save time, but prints any letter that would get messy. Blending like this is hybrid writing. Now do yours."],
    [["Best of both", "🖋️", "<b>Hybrid</b> writing mixes clear print shapes with some joined letters."], ["Where to join", "🔗", "Join the easy, common pairs (<b>th, er, ing</b>). Print letters that get messy when joined."], ["Check", "✅", "Always ask: can someone else read it? Legible comes first, speed second."]]);

  const A7 = mk("Cornell notes", "📓", [
    "In Cornell notes, where do the main notes go?|In the large right-hand column|In the bottom strip|In the top margin",
    "What goes in the narrow left column?|Cue words and questions|Only the date|Doodles",
    "What goes in the bottom section?|A short summary|The title|Page numbers",
    "When do you usually write the cues?|After class, while reviewing|Before you know the topic|Never",
    "Cornell notes were designed at...|Cornell University|Oxford University|a museum",
    "How can you study with the cue column?|Cover the notes and answer the cues|Cover the cues|Erase the notes",
    "The notes in the right column should be...|short phrases and key points|every word the teacher says|only drawings",
    "Why write the summary in your own words?|It checks that you understood|It fills the space|It is easier to copy"
  ],
    ["Picture the page split into three zones, each with its own job.", "The page has a wide area, a narrow strip beside it and a strip below; each has its own job.", "Example: in a science lesson on plants, notes might say 'roots take in water'. The cue beside it asks 'What do roots do?' and the bottom summary pulls it together. Now do yours."],
    [["Three parts", "📓", "A <b>Cornell page</b> has a wide note column, a narrow cue column, and a summary at the bottom."], ["Notes and cues", "❓", "Write key points on the right. Later, write questions or keywords on the left."], ["Study it", "🧠", "Cover the notes, read a cue, and try to answer from memory. Then write your summary."]]);

  const A8 = mk("Shorthand systems", "⚡", [
    "Shorthand is...|a fast way of writing using symbols|a very short story|a small notebook",
    "Which system was created by Isaac Pitman in 1837?|Pitman shorthand|Gregg shorthand|Braille",
    "Who created Gregg shorthand in 1888?|John Robert Gregg|Isaac Pitman|Thomas Edison",
    "Who used shorthand a lot in the past?|Secretaries and news reporters|Only astronauts|Only toddlers",
    "Which system uses thick and thin strokes to show different sounds?|Pitman|Gregg|Roman capitals",
    "Shorthand writers mostly write by...|sound, not spelling|spelling every letter|copying print",
    "Why did shorthand help reporters?|They could keep up with fast speakers|They could draw maps|They could skip listening",
    "Personal shorthand like 'w/' for 'with' is...|an abbreviation|a thesis|a paragraph"
  ],
    ["Think about why anyone would want to write faster than spelling allows.", "Shorthand records sounds with simple strokes. Two famous systems were named after the men who made them, and one used thick and thin lines.", "Example: a reporter at a speech writes a few quick curves for each word instead of every letter, so she keeps up. That speed is the point of shorthand. Now do yours."],
    [["Speed writing", "⚡", "<b>Shorthand</b> uses quick strokes and symbols so you can write as fast as people talk."], ["Famous systems", "🏷️", "<b>Pitman</b> (1837) uses thick and thin strokes. <b>Gregg</b> (1888) uses smooth, flowing curves."], ["Your own", "✏️", "You can invent personal shorthand: <b>w/</b> for with, <b>b/c</b> for because."]]);

  const A9 = mk("Title case", "🔠", [
    "In 'The Cat in the Hat', which word is NOT capitalized?|in|Cat|Hat",
    "In title case, which word stays lowercase in the middle of a title?|of|Journey|Brave",
    "Which word is always capitalized in a title?|The first word|'and' in the middle|'the' in the middle",
    "How should 'the' in the middle of 'Return of the King' be written?|with a lowercase t|with a capital T|with all capitals",
    "Which small word in 'a wrinkle in time' must be capitalized?|a|in|neither one",
    "In a title, short words like 'a', 'an', 'the' and 'and' are...|lowercase unless first or last|always capitalized|never written",
    "In 'fun in the sun', which words stay lowercase?|in and the|fun and sun|all of them",
    "The last word of a title is...|always capitalized|always lowercase|skipped"
  ],
    ["Decide which words are the important ones and which are tiny helpers.", "Capitalize the first and last words and the important words between them. Small joining words stay lowercase in the middle.", "Example: 'Rise and Shine at the Zoo' capitalizes Rise, Shine, Zoo, while 'and', 'at' and 'the' stay small. Now do yours."],
    [["Big and small", "🔠", "<b>Title case</b> capitalizes the important words in a title."], ["The rule", "📏", "Always capitalize the <b>first</b> and <b>last</b> words. Keep short words like <b>a, an, the, and, of, in</b> lowercase in the middle."], ["Try it", "✍️", "<b>Harry Potter and the Goblet of Fire</b>: the small words stay small."]]);

  const A10 = mk("Superscripts and subscripts", "🔬", [
    "In x², where is the small 2 written?|Small and raised above the line|Small and lowered below the line|Full size on the line",
    "In H₂O, the small 2 is a...|subscript|superscript|baseline",
    "Which one is a superscript?|The 3 in 5³|The 2 in CO₂|The 2 in H₂O",
    "What does the small 2 in 4² mean?|Multiply 4 by itself|Add 2 to 4|Divide 4 by 2",
    "Where is a subscript written?|Slightly below the line|Slightly above the line|Far from the letters",
    "Why write a small raised number clearly?|It could be misread as part of the number|It is only decoration|It changes the pen",
    "What does 10⁶ mean?|Six tens multiplied together|10 times 6|10 plus 6",
    "In H₂O, the small 2 shows that there are...|two hydrogen atoms|two oxygen atoms|two liters"
  ],
    ["Look at whether the small number sits above or below the main line.", "Two words to know are superscript and subscript. One sits higher than the line, the other lower. Both are written smaller than the main text.", "Example: in 7², the small 2 is raised and says to use 7 two times (7 × 7). In N₂, the lowered 2 says two atoms. Now do yours."],
    [["Up and down", "🔬", "A <b>superscript</b> sits slightly above the line (x²). A <b>subscript</b> sits slightly below (H₂O)."], ["Powers", "⚡", "<b>5³</b> means 5 × 5 × 5. The small number tells how many times to multiply."], ["Clear writing", "✅", "Write them small and well-spaced so <b>5³</b> is never mistaken for <b>53</b>."]]);

  const A11 = mk("Illuminated manuscripts", "📜", [
    "What is an illuminated manuscript?|A handwritten book decorated with gold and color|A book printed by machine|A scroll of blank paper",
    "Who often copied books by hand in the Middle Ages?|Monks in monasteries|Machine operators|Shopkeepers",
    "Why were these books called 'illuminated'?|Gold and bright colors made pages seem to shine|They were only read by candle|They glowed in the dark",
    "Many pages were made from...|vellum or parchment, made from animal skin|plastic|cotton T-shirts",
    "What is a large decorated first letter called?|An initial|A footnote|An index",
    "Drawings and patterns beside the text are found in the...|margin|title|spine",
    "Why were hand-copied books so valuable?|Each took a very long time to make|Printing presses were everywhere|Paper was free",
    "What did scribes write with?|Quills and ink|Markers|Pencils with erasers"
  ],
    ["Think about how books were made before printing machines.", "Think about what people did to make a precious book special when there were no printing machines.", "Example: a monk copies a page, then paints a big decorated first letter with a thin layer of gold, so the page seems to glow. That is illumination. Now do yours."],
    [["Books by hand", "📜", "Before printing, books were copied by hand, often by <b>monks</b> using <b>quills and ink</b>."], ["Gold and color", "✨", "<b>Illuminated</b> pages had gold leaf, bright paint, decorated first letters and little pictures in the margins."], ["Treasures", "🏛️", "Each book took months or years, so they were very valuable. Many are in museums and libraries today."]]);

  const A12 = mk("Carolingian minuscule", "🏰", [
    "Carolingian minuscule was a script of...|small, clear lowercase letters|only capital letters|picture symbols",
    "Which ruler helped spread it?|Charlemagne|Cleopatra|Napoleon",
    "About when did it spread?|Around the year 800|Around the year 1990|Around 3000 BC",
    "Which helpful feature does it show?|Spaces between words|Emoji|Keyboards",
    "Why was it a good script?|It was clear and easy to read in many lands|It was a secret code|It was only for children",
    "Our modern lowercase letters grew partly from...|Carolingian minuscule|computer fonts|Egyptian pictures",
    "Minuscule means...|small letters|huge capitals|colored ink",
    "Majuscule means...|capital letters|tiny letters|slanted letters"
  ],
    ["Think about what the word minuscule means and who ordered writing to be cleaner.", "Think about what minuscule and majuscule mean, and what early medieval writers did to help readers.", "Example: a text with no spaces is hard to read. A scribe in the year 800 who adds gaps and small, round letters makes it much easier. Now do yours."],
    [["A clear script", "🏰", "Around the year <b>800</b>, a script of small, round, clear letters spread across the lands of <b>Charlemagne</b>."], ["Lowercase letters", "🔡", "<b>Minuscule</b> = small letters. <b>Majuscule</b> = capitals. Our lowercase grew from this style."], ["Spaces", "⬜", "Readers could finally see where each word began and ended."]]);

  const A13 = mk("Book reviews", "📚", [
    "What does a book review include?|A short summary and your opinion with reasons|The whole book retyped|Only the cover price",
    "Should a review give away the ending?|No, avoid spoilers|Yes, always|Only in the title",
    "Which is a good reason?|The dialogue made the characters feel real.|It was good.|I liked it because yes.",
    "What is a summary?|A short retelling of the main events|Your opinion|A list of page numbers",
    "Which sentence gives an opinion?|The plot was exciting from the first chapter.|The book has 200 pages.|The author wrote three books.",
    "Who is a review written for?|Readers deciding whether to read the book|The author only|No one",
    "What can support your opinion?|An example from the story|The price of another book|The date you bought it",
    "Which starts a review well?|Title, author and a short hook|The last page|A shopping list"
  ],
    ["A review answers two questions: what is it about, and what do I think?", "Readers want to know what the book is about and whether it is worth reading, without losing the surprises.", "Example: 'In Island Quest, Mia finds a map. I loved how the map clues kept me guessing.' That is a summary plus an opinion with a reason. Now do yours."],
    [["Two parts", "📚", "A <b>book review</b> has a short <b>summary</b> and your <b>opinion</b> with reasons."], ["No spoilers", "🤐", "Do not reveal the ending. Tell just enough to make a reader curious."], ["Back it up", "🧱", "Give a reason and an example: <b>The humor kept me laughing, like when...</b>"]]);

  const A14 = mk("Invitations and RSVP", "💌", [
    "What does RSVP mean?|Please reply|Please bring food|Return soon",
    "Which details belong on an invitation?|Who, what, when and where|Only the host's name|Only a joke",
    "What tells guests where the party is?|The address or place|The stamp|The border",
    "What helps guests plan their day?|The start and end time|A secret code|A long poem",
    "Which date is the clearest?|Saturday, May 10 at 2:00 p.m.|Next time|Soon",
    "Why include a reply-by date?|The host needs to plan|To scare guests|It is decoration",
    "A polite reply to an invitation should...|say whether you can come|ignore the invitation|argue about the time",
    "What else might guests need to know?|Whether to bring something or dress a certain way|The host's passwords|Nothing at all"
  ],
    ["Imagine you are the guest: what would you need to know?", "Think about the questions a guest would ask about the event, and what the host needs to hear back.", "Example: 'Join us for Sam's picnic, Sunday, June 3, 1:00 p.m., Oak Park. Please reply by May 28.' Event, date, time, place and reply date are all there. Now do yours."],
    [["Key details", "💌", "An invitation tells <b>who, what, when and where</b>, in neat, clear writing."], ["RSVP", "✉️", "<b>RSVP</b> comes from French and means <b>please reply</b>. Add a reply-by date."], ["Be kind", "😊", "Reply promptly and say thank you, whether you can come or not."]]);

  const A15 = mk("Reading old cursive", "🔎", [
    "Old documents are often hard to read because...|letter shapes and spellings were different|they are written in code|the ink is invisible",
    "The 'long s' in old writing looks like...|an f without a full crossbar|a capital Z|a dot",
    "What is a good first step with hard handwriting?|Find letters you know and work out the rest|Give up|Read it upside down",
    "Words you cannot read yet can be guessed from...|the sentence around them|the paper color|the page number",
    "Why compare a mystery letter with other places in the text?|The same writer forms it the same way|All letters are identical|It hides the word",
    "Who studies old handwriting?|Historians and archivists|Only chefs|Only pilots",
    "The handwritten copy of the Declaration of Independence is in...|elegant, flowing cursive|emoji|printed type",
    "Why read slowly, letter by letter?|Old forms can differ from today's|It makes pages heavier|It erases ink"
  ],
    ["Treat it like a puzzle: start with what you can already read.", "Letters that look odd at first usually appear again elsewhere on the page.", "Example: if you can read 'The mo_n was bright', the missing letter is likely 'o' from the sense of the sentence, and you can check the same shape elsewhere. Now do yours."],
    [["Puzzle solving", "🔎", "Old handwriting can look strange: <b>different shapes, spellings and fancy loops</b>."], ["Long s", "🔤", "Old texts often use a <b>long s</b> that looks like an <b>f</b> but without a full crossbar."], ["Tips", "🧩", "Find easy letters first, compare repeated shapes, and use the meaning of the sentence."]]);

  const A16 = mk("Parallel lists", "📏", [
    "Which list is parallel?|She likes swimming, running and hiking.|She likes swimming, to run and hiking.|She likes swimming, runs and hike.",
    "Which is parallel?|We will clean, cook and relax.|We will clean, cooking and relax.|We will cleaning, cook and relax.",
    "Parallel means items in a list...|share the same grammar form|are all the same word|are all very long",
    "Which fixes <b>He likes to read, swim and playing chess.</b>?|He likes to read, to swim and to play chess.|He likes to read, swim and playing chess.|He like read, swim and playing.",
    "Which is parallel?|The room was bright, clean and quiet.|The room was bright, cleaning and quiet.|The room was brightness, clean and quiet.",
    "Why use parallel structure?|It makes sentences smooth and clear|It makes them longer|It removes verbs",
    "Which is NOT parallel?|Pack a tent, a lamp and hiking.|Pack a tent, a lamp and a map.|Pack tents, lamps and maps.",
    "<b>Our goals are to improve, to practice and ___.</b>|to learn|learning|learned"
  ],
    ["Say each item in the list and check that they all follow the same pattern.", "Read each item aloud after the lead-in words and notice whether one sounds different from its neighbors.", "Example: 'We saw lions, a zebra and swimming' mixes things. 'We saw lions, zebras and giraffes' matches. Now do yours."],
    [["Match the pattern", "📏", "<b>Parallel</b> means list items share the same form: <b>running, jumping, swimming</b>."], ["Mismatch", "🚫", "<b>She likes running, to jump and swim</b> mixes forms. Make them match."], ["Smooth reading", "🎵", "Parallel lists sound smooth and are easier to understand and to write by hand."]]);

  const A17 = mk("News articles and the 5 W's", "📰", [
    "What are the 5 W's of news?|Who, what, when, where, why|Words, wonders, wishes, walls, winds|Warm, wet, wild, windy, white",
    "What is the 'lead' of an article?|The first sentence that gives key facts|The closing joke|The byline",
    "What is a headline?|A short title that tells the story|The last paragraph|A photo caption",
    "What is a byline?|The line naming the writer|A picture|The weather report",
    "News writers put the most important facts...|first|last|nowhere",
    "Which belongs in a news article?|Facts that have been checked|Rumors|Secret guesses",
    "What is the 'inverted pyramid'?|Big facts first, details later|Details first, big news last|Only pictures",
    "What does a quotation in an article show?|Exactly what a person said|The headline|A price"
  ],
    ["Think about a reader who only has time for the first lines.", "Think about how a busy reader wants news delivered, and what a reader needs first.", "Example: 'On Friday, the school choir won first prize at the city contest.' The first line already answers who, what and when. Now do yours."],
    [["The 5 W's", "📰", "A news article answers <b>who, what, when, where, why</b>."], ["Inverted pyramid", "🔻", "Put the <b>biggest facts first</b>, then smaller details. A reader can stop anywhere and still know the news."], ["Parts", "🧱", "<b>Headline</b> (title), <b>byline</b> (writer), <b>lead</b> (first sentence), <b>quotes</b> (exact words)."]]);

  const A18 = mk("Peer feedback on handwriting", "🤝", [
    "Which is helpful feedback on handwriting?|Your letters are clear; try closing the 'a' loops.|It's bad.|I don't care.",
    "A good way to start feedback is to...|say something that works well|list every mistake|stay silent",
    "Good feedback should be...|specific and kind|vague and loud|secret",
    "What should you do with feedback?|Think about it and try the helpful parts|Ignore all of it|Argue about every point",
    "Which comment is specific?|Your spacing between words is even.|Nice.|Fine.",
    "A useful suggestion says...|what to try next|what you dislike|nothing",
    "If a friend asks 'Can you read my writing?', you should...|honestly say which parts are hard|always say it is perfect|laugh",
    "Why practice with a partner?|A fresh pair of eyes spots things you miss|It saves ink|It is required"
  ],
    ["Think about feedback that would help you improve if you received it.", "Think about what makes a comment useful rather than hurtful or empty.", "Example: 'Your capitals are tall and clear. Next, try leaving a little more space between lines.' It praises something and gives one clear step. Now do yours."],
    [["Kind and clear", "🤝", "Good <b>feedback</b> is kind and specific, not just 'good' or 'bad'."], ["Praise, then ask", "🌟", "Name one thing that works, then give one idea: <b>Try keeping your letters the same height.</b>"], ["Receiving", "👂", "Listen, say thanks, and try the useful ideas. It helps your writing grow."]]);

  const L13 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18];

  // =============== LEVEL 14 ===============
  const B1 = mk("Active and passive voice", "🎬", [
    "Which sentence is in the <b>active</b> voice?|The dog chased the ball.|The ball was chased by the dog.|The ball was chased.",
    "Which sentence is <b>passive</b>?|The cake was baked by Mom.|Mom baked the cake.|Mom bakes cakes every week.",
    "In an active sentence, the subject...|does the action|receives the action|is missing",
    "Which is the active version of <b>The window was broken by Sam.</b>?|Sam broke the window.|The window broke Sam.|Sam was breaking by the window.",
    "Which sentence is passive?|The game was won by our team.|Our team won the game.|Our team plays well.",
    "Active voice is usually...|shorter and more direct|longer and slower|harder to read",
    "Which is the passive version of <b>Maya wrote the report.</b>?|The report was written by Maya.|Maya was written by the report.|Maya writes the report.",
    "When might passive voice be useful?|When the doer is unknown or unimportant|Never|Every time"
  ],
    ["Ask who or what is doing the action in the sentence.", "Look at where the doer of the action appears in the sentence, and whether a helper like 'was' or 'were' shows up.", "Example: 'The teacher praised Ella' is active (the teacher acts). 'Ella was praised by the teacher' is passive (Ella receives the action). Now do yours."],
    [["Who does what?", "🎬", "<b>Active</b>: the subject does the action. <b>Alex kicked the ball.</b>"], ["Passive", "🔁", "<b>Passive</b>: the subject receives the action. <b>The ball was kicked by Alex.</b>"], ["Choose well", "🎯", "Active is usually clearer and shorter. Passive helps when the doer is unknown: <b>My bike was stolen.</b>"]]);

  const B2 = mk("Sentence variety", "🎶", [
    "Why vary sentence length?|It keeps writing interesting to read|It uses less ink|It hides mistakes",
    "Which is a very short sentence for emphasis?|Silence fell.|The room, which was dark and cold, grew quieter as the clock ticked.|When the storm finally passed, we walked outside.",
    "Which starts with a different pattern than 'The dog ran'?|Quickly, the dog ran home.|The dog ran home.|The dog ran away.",
    "A paragraph of only short sentences can sound...|choppy|smooth|too long",
    "Which can combine <b>It was late. We were tired.</b> into one?|It was late, and we were tired.|It was late we were tired.|It late tired.",
    "Which sentence opener is a question?|Have you ever seen a comet?|Comets are bright.|Look up.",
    "Starting many sentences with 'I' or 'The' in a row makes writing...|repetitive|exciting|shorter",
    "Mixing short and long sentences gives writing...|rhythm|errors|fewer words"
  ],
    ["Read the lines aloud and listen to the beat. Is it all the same?", "Listen to the beat of the sentences and think about what readers enjoy.", "Example: 'I ran. I ran home. I ran to my room.' sounds choppy. 'I ran, and when I reached home I dashed to my room.' flows better. Now do yours."],
    [["Rhythm", "🎶", "Mix <b>short</b> and <b>long</b> sentences, like music with fast and slow notes."], ["New openers", "🚪", "Begin sentences differently: with a time, a place, an <b>-ing</b> word, or a question."], ["Combine", "🔗", "Join choppy sentences: <b>It was late, and we were tired.</b>"]]);

  const B3 = mk("Strong verbs", "💪", [
    "Which verb is stronger than 'walked'?|stomped|went|moved",
    "Which is the most precise verb for 'said very quietly'?|whispered|talked|shouted",
    "Which sentence is stronger?|The cat pounced on the mouse.|The cat went at the mouse.|The cat moved to the mouse.",
    "Why choose a strong verb?|It paints a clearer picture|It uses more adverbs|It is longer",
    "Which verb means 'ate quickly'?|devoured|nibbled|tasted",
    "Which verb fits <b>The wind ___ through the trees.</b>?|howled|was|did",
    "Instead of 'very tired', which is stronger?|exhausted|a bit sleepy|not awake",
    "A strong verb can replace..|a weak verb plus an adverb|a title|a period"
  ],
    ["Picture the action. Which word shows it most clearly?", "Strong verbs carry the action and the feeling, so you need fewer extra words. Boring verbs like 'is', 'went' and 'got' are the weak ones.", "Example: 'She walked slowly and sadly' can be 'She trudged'. One strong verb does the work of three words. Now do yours."],
    [["Weak and strong", "💪", "Weak: <b>went</b>, <b>said</b>, <b>got</b>. Strong: <b>sprinted</b>, <b>whispered</b>, <b>grabbed</b>."], ["Fewer words", "✂️", "<b>Walked slowly</b> becomes <b>strolled</b>. One strong verb can replace a verb plus an adverb."], ["Be exact", "🎯", "Choose the verb that matches the mood: <b>stomped</b> is angry, <b>tiptoed</b> is careful."]]);

  const B4 = mk("Cutting wordiness", "✂️", [
    "Which is more concise?|We left at noon.|We made the decision to leave at the hour of noon.|We did leave at noon time.",
    "'Due to the fact that' can be shortened to...|because|since the reason of|although",
    "Which phrase is redundant?|past history|history|ancient history",
    "'At this point in time' means...|now|never|yesterday",
    "Which sentence has no wasted words?|The team won.|The team was the winner of the game.|The team did win it.",
    "Why cut extra words?|The meaning becomes clearer|The page looks emptier|You write less neatly",
    "Which is redundant?|free gift|gift|birthday gift",
    "Which is the better edit of <b>in my own personal opinion</b>?|in my opinion|in my own opinion personally|my personal own"
  ],
    ["Look for words that repeat an idea the sentence already has.", "Cross out filler and repeated meaning, then check that the sentence still says the same thing in fewer words.", "Example: 'Each and every student' can be 'every student'. 'Return back' can be 'return'. The shorter versions say the same thing. Now do yours."],
    [["Trim it", "✂️", "<b>Concise</b> writing says the same thing in fewer words."], ["Repeated ideas", "🔁", "<b>Past history</b>, <b>free gift</b> and <b>end result</b> repeat themselves. Cut one word."], ["Short swaps", "⚡", "<b>Due to the fact that</b> = <b>because</b>. <b>At this point in time</b> = <b>now</b>."]]);

  const B5 = mk("Claim, evidence, reasoning", "🧱", [
    "In CER writing, what is the <b>claim</b>?|Your answer or main point|A quote from a book|Your signature",
    "What is <b>evidence</b>?|Facts, data or quotes that support the claim|Your feelings only|The title",
    "What does <b>reasoning</b> do?|Explains how the evidence supports the claim|Repeats the claim|Lists page numbers",
    "Which is evidence?|The plant given light grew 8 cm taller.|Plants are my favorite.|I think so.",
    "Which is a claim?|Plants need light to grow well.|The plant grew 8 cm.|Figure 2 shows heights.",
    "Which sentence is reasoning?|This shows that light helps plants make food and grow.|The plant grew 8 cm.|Plants are green.",
    "What order does CER follow?|Claim, evidence, reasoning|Reasoning, claim, evidence|Evidence only",
    "Which evidence best supports 'Exercise helps mood'?|Students who ran daily reported feeling happier.|Running shoes are expensive.|The gym opens at six."
  ],
    ["Sort each sentence: is it the answer, the proof, or the explanation?", "Some parts are the answer itself, some are facts that back it, and some explain why those facts matter.", "Example: Claim: 'Ice melts faster in the sun.' Evidence: 'The ice in the sun melted in 10 minutes.' Reasoning: 'Sunlight adds heat, so melting speeds up.' Now do yours."],
    [["Three steps", "🧱", "<b>C</b>laim = your answer. <b>E</b>vidence = facts that back it. <b>R</b>easoning = why the evidence proves it."], ["Example", "🧊", "<b>Claim</b>: ice melts faster in sun. <b>Evidence</b>: it melted in 10 minutes. <b>Reasoning</b>: sunlight adds heat."], ["Handwriting tip", "✏️", "Start each part on a clear new line or with a signal phrase like <b>For example</b> and <b>This shows</b>."]]);

  const B6 = mk("Counterclaims", "⚖️", [
    "What is a <b>counterclaim</b>?|An opposing view|A spelling rule|A kind of title",
    "Why include a counterclaim?|It shows you considered other sides|It makes the essay shorter|It hides your opinion",
    "Which phrase introduces a counterclaim?|Some people argue that|In conclusion|First of all",
    "After stating a counterclaim, a good writer...|responds with a rebuttal|stops writing|changes the topic",
    "Which is a rebuttal?|However, studies show that the benefits are greater.|Some say it costs too much.|My essay is about costs.",
    "Which shows respect for the other side?|Some people feel this way, and here is why I disagree.|Those people are silly.|Nobody agrees with them.",
    "A strong argument is more convincing when it...|answers opposing views|ignores them|insults them",
    "What word often begins a rebuttal?|However|Because|Once"
  ],
    ["Think about what someone who disagrees would say, and how you could answer.", "Think about what someone who disagrees would say, and how you could answer respectfully.", "Example: 'Some argue homework wastes time. However, practice builds memory, so short homework helps.' The first sentence is the counterclaim, the second the rebuttal. Now do yours."],
    [["The other side", "⚖️", "A <b>counterclaim</b> is a view that disagrees with yours: <b>Some people say...</b>"], ["Rebuttal", "🛡️", "A <b>rebuttal</b> answers it politely: <b>However, evidence shows...</b>"], ["Why it works", "💪", "Facing opposing views makes your argument stronger and more fair."]]);

  const B7 = mk("Honest writing", "🔒", [
    "What is plagiarism?|Using someone else's words or ideas as your own|Writing your own thoughts|Using a dictionary",
    "How can you use another writer's idea honestly?|Give credit to the source|Pretend it is yours|Change one word",
    "If you copy exact words, you should use...|quotation marks and name the source|nothing|a smaller pen",
    "Is a paraphrase without credit okay?|No, the idea still needs a source|Yes, always|Only on Mondays",
    "Which is honest?|According to the article, owls hunt at night.|Owls hunt at night. (copied, no source)|I invented the facts about owls.",
    "Why does honest writing matter?|It respects other writers and builds trust|It makes pages longer|It uses less ink",
    "Common knowledge, like 'the sun is a star', usually...|does not need a source|always needs a source|is a quote",
    "If you are unsure whether to credit something, you should...|ask your teacher or credit it|hide it|delete the page"
  ],
    ["Ask whose idea or words these are, and whether the reader can tell.", "Honest writers make clear where words and ideas come from, and which words are not their own.", "Example: 'Bees dance to share where flowers are, says the museum guide.' The source is named, so it is honest. Without that credit it would be plagiarism. Now do yours."],
    [["Give credit", "🔒", "<b>Plagiarism</b> is passing off someone else's words or ideas as yours."], ["How to be honest", "✅", "Use <b>quotation marks</b> for exact words and <b>name your source</b> for ideas too."], ["Your voice", "🗣️", "Write in your own words, show what you learned, and trust your own thinking."]]);

  const B8 = mk("Annotating a text", "🖍️", [
    "What does annotating mean?|Marking and writing notes on a text|Erasing a text|Translating a text",
    "What is underlining used for?|Key ideas or important facts|Decoration only|Page numbers",
    "What might you write in the margin?|Questions or short comments|The whole text again|Your address",
    "A question mark in the margin often shows...|something confusing|a joke|the end",
    "Circling unknown words helps you...|look them up later|forget them|skip the page",
    "Why use symbols like a star or check mark?|To find important parts quickly|To waste time|To change meaning",
    "Should you annotate in a library book?|No, use sticky notes or a notebook|Yes, with a pen|Yes, with paint",
    "Annotating helps you...|think while you read|read faster without understanding|avoid reading"
  ],
    ["Think about a reader leaving a trail of thoughts behind them.", "Annotating means leaving your own marks and short notes while you read. Use only your own copies.", "Example: you underline the main idea of a paragraph, circle the word 'drought', and write 'no rain?' in the margin. That is annotating. Now do yours."],
    [["Talk to the text", "🖍️", "<b>Annotating</b> means marking and writing notes while you read."], ["Your toolkit", "🧰", "<b>Underline</b> key ideas, <b>circle</b> new words, <b>?</b> for confusion, <b>!</b> for surprise, short margin notes."], ["Be kind to books", "📚", "Only write on your own copies. For borrowed books use sticky notes or a notebook."]]);

  const B9 = mk("Compare and contrast", "🆚", [
    "To <b>compare</b> means to find...|how things are alike|how things are different|nothing",
    "To <b>contrast</b> means to find...|how things are different|how things are alike|a title",
    "Which word signals a <b>similarity</b>?|Likewise|However|Unlike",
    "Which word signals a <b>difference</b>?|Unlike|Similarly|Both",
    "A Venn diagram's overlap shows...|what both share|what is different|the title",
    "<b>Cats and dogs both have fur; ___, cats climb better.</b>|however|likewise|also",
    "In a block structure you...|describe all of one subject, then the other|swap subjects every sentence|only list differences",
    "In a point-by-point structure you...|discuss one feature for both subjects at a time|write all of one then the other|skip the topic"
  ],
    ["Ask yourself: is this showing how things are the same, or how they differ?", "Some signal words show sameness and others show difference. A Venn diagram can help you plan.", "Example: 'Apples and pears are both fruit; but pears are softer.' 'Both' shows a likeness, 'but' a difference. Now do yours."],
    [["Alike and different", "🆚", "<b>Compare</b> = how things are alike. <b>Contrast</b> = how they are different."], ["Signal words", "🚦", "Alike: <b>both, similarly, likewise</b>. Different: <b>unlike, however, while</b>."], ["Venn", "⭕", "Draw two circles. Differences go in each outer part. Likenesses go in the <b>overlap</b>."]]);

  const B10 = mk("Cause and effect writing", "🔗", [
    "What is a <b>cause</b>?|The reason something happens|What happens as a result|The title",
    "What is an <b>effect</b>?|What happens as a result|The reason it happens|A question",
    "<b>The ice melted because the sun was hot.</b> What is the cause?|The sun was hot|The ice melted|The ice",
    "<b>It rained, so the game was cancelled.</b> What is the effect?|The game was cancelled|It rained|The weather report",
    "Which word signals a cause?|because|therefore|consequently",
    "Which word signals an effect?|as a result|since|due to",
    "Which pair is cause then effect?|He studied, so he passed.|He passed, so he studied.|He passed, but he studied.",
    "A single cause can have...|more than one effect|no effect|only a title"
  ],
    ["Ask 'what happened?' and then 'why did it happen?'", "The cause is the reason; the effect is the result. Some linking words point back to a reason and others point forward to a result.", "Example: 'The road was icy, so we drove slowly.' Cause: the road was icy. Effect: we drove slowly. Now do yours."],
    [["Why and what", "🔗", "A <b>cause</b> is why something happens. An <b>effect</b> is what happens next."], ["Signal words", "🚦", "Cause: <b>because, since, due to</b>. Effect: <b>so, therefore, as a result</b>."], ["Chains", "⛓️", "One effect can become the cause of the next event, like links in a chain."]]);

  const B11 = mk("Chinese brush calligraphy", "🖌️", [
    "What are the 'Four Treasures of the Study'?|Brush, ink, paper and inkstone|Pen, pencil, eraser and ruler|Chalk, board, duster and desk",
    "What is an inkstone used for?|Grinding and holding ink|Cutting paper|Holding the brush",
    "In Chinese characters, strokes are written in a set...|order|color|size",
    "What kind of brush is used?|A soft hair brush|A hard pencil|A stamp",
    "Writing characters follows rules, such as...|top to bottom and left to right|random order|right to left every time",
    "Chinese calligraphy is considered...|a respected art form|just doodling|only for machines",
    "Why does stroke order matter?|It makes characters balanced and quicker to write|It changes the language|It decides the ink color",
    "Calligraphers control the brush with...|pressure and movement of the whole arm|only the fingertip tip|a ruler"
  ],
    ["Think about the tools you would need to write with ink and a brush.", "Calligraphy uses special traditional tools and follows rules for how strokes are made.", "Example: to write a simple character, a calligrapher first grinds ink on the inkstone, loads the brush, then makes the strokes in order. Now do yours."],
    [["Four Treasures", "🖌️", "Brush, ink, paper and <b>inkstone</b>: the traditional tools of Chinese calligraphy."], ["Stroke order", "🔢", "Each character is made of strokes written in a set order, usually <b>top to bottom, left to right</b>."], ["An art", "🎨", "Calligraphy is a respected art. Brush pressure makes thick and thin lines."]]);

  const B12 = mk("Capitals or lowercase?", "🔡", [
    "Which is usually easier to read in a long sentence?|Mixed upper and lowercase|ALL CAPITALS|All tiny letters",
    "Why are ALL CAPS harder to read in long text?|Words lose their shapes|They are too small|They use more ink only",
    "When are all capitals useful?|Short labels and warnings|Long paragraphs|Spelling lists",
    "Which gives words a distinct shape?|Ascenders and descenders in lowercase|Same-height capitals|Dots",
    "Capital letters start...|sentences and names|every word|every line",
    "A sign that says STOP in capitals works because...|it is short and needs to be seen fast|capitals are always better|it uses fewer letters",
    "Mixed case helps readers by...|showing word outlines|hiding spaces|adding color",
    "In a title in all capitals, readers may...|read more slowly|read faster|not see anything"
  ],
    ["Think about the outline each word makes. Which kind of text gives words more shape?", "Lowercase letters have tall and dropping parts that give each word a shape. All capitals make every word a flat block, which is fine for a short label but slow for long reading.", "Example: a warning label like DANGER works in capitals because it is short. A story in all capitals would tire the reader. Now do yours."],
    [["Word shapes", "🔡", "Lowercase letters have <b>tall</b> and <b>dropping</b> parts, so each word has its own outline."], ["All caps", "🔠", "ALL CAPITALS look like boxes. They are fine for <b>short</b> labels and warnings."], ["Long text", "📖", "Use normal mixed case for sentences and paragraphs so they are easy to read."]]);

  const B13 = mk("Reflective journaling", "🪞", [
    "What is reflective writing?|Thinking about what you did and learned|Copying a text|Listing words",
    "Which question helps reflection?|What did I learn from this?|What time is it?|Where is my pen?",
    "A reflection often describes...|an experience and what it meant to you|only facts from a book|only numbers",
    "Which sentence is reflective?|I realized that practicing a little each day helped me improve.|The sky is blue.|Write the date here.",
    "How often can a journal be written?|Whenever you like, regularly if possible|Only once a year|Never",
    "A journal entry should include...|the date|a bibliography|a thesis",
    "Reflective writing uses words like...|I felt, I noticed, I learned|according to, therefore|first, second",
    "Why reflect?|It helps you understand yourself and grow|It makes pages heavier|It prevents homework"
  ],
    ["Think about looking at your own day the way you would look in a mirror.", "Reflection tells what happened and then what you learned or felt about it.", "Example: 'Today I messed up my map. I realized that I rushed, so next time I will plan first.' It says what happened and what was learned. Now do yours."],
    [["Mirror", "🪞", "<b>Reflective writing</b> looks back: what happened, how I felt, what I learned."], ["Starters", "🌱", "<b>I noticed...</b>, <b>I realized...</b>, <b>Next time I will...</b>"], ["Habit", "📅", "Write the date, keep it private if you like, and write a little often."]]);

  const B14 = mk("Hand-drawn maps and legends", "🗺️", [
    "What is a map <b>legend</b> (key)?|It explains the symbols|It is the map's title|It is the border",
    "What does a compass rose show?|Directions|Distances|Colors",
    "What does a scale tell you?|How map distance matches real distance|Who drew the map|The weather",
    "North is usually shown...|at the top|at the bottom|in the middle",
    "A good map needs a...|title|signature only|joke",
    "Why write map labels clearly?|So readers can find places|To fill space|To hide places",
    "A small drawing of a tree on a map is a...|symbol|scale|border",
    "Which should always be on a map you draw?|A key for your symbols|Every house's color|A recipe"
  ],
    ["Imagine a stranger using your map. What would they need to understand it?", "A map needs helper parts: something to name it, explain symbols, show direction and show distance. Labels must be neat.", "Example: a hand-drawn park map uses a tree symbol; the key says 'tree = picnic area', and a small N arrow points up. Now do yours."],
    [["Map parts", "🗺️", "A good map has a <b>title</b>, <b>key</b> (legend), <b>compass rose</b> and <b>scale</b>."], ["Symbols", "🌳", "Small pictures stand for places. The <b>key</b> explains each symbol."], ["Neat labels", "✏️", "Print labels clearly, in a consistent size, so no one has to guess."]]);

  const B15 = mk("Timelines", "⏳", [
    "What does a timeline show?|Events in the order they happened|Places on a map|A list of words",
    "On a timeline, earlier events are placed...|to the left|to the right|in the middle",
    "Which should be written next to each event?|The date or year|The weather|A joke",
    "Why use equal spacing for equal time?|It keeps the timeline accurate|It looks nice only|It saves ink",
    "A timeline from 1900 to 2000 spans...|100 years|10 years|1000 years",
    "Which is a good timeline label?|1969: First Moon landing|Moon|Happened sometime",
    "Which year comes first?|1776|1812|1914",
    "Short labels on a timeline help because...|there is not much room|they are required by law|they hide dates"
  ],
    ["Think about an arrow running from the past toward today.", "A timeline lists events in order with equal spaces for equal time. Keep labels short so they fit.", "Example: on a school timeline: 2019 Joined school, 2021 Won science fair, 2023 Moved to middle school. Earliest goes first. Now do yours."],
    [["In order", "⏳", "A <b>timeline</b> puts events in the order they happened, earliest first."], ["Equal spacing", "📏", "Equal amounts of time get equal space on the line, so the picture is true."], ["Short labels", "🏷️", "Write the <b>date</b> and a few words: <b>1969: first Moon landing</b>."]]);

  const B16 = mk("Handwritten flashcards", "🃏", [
    "What goes on one side of a flashcard?|A question or term|Your whole notebook|A recipe",
    "What goes on the other side?|The answer or definition|Your name|Nothing",
    "A good flashcard has...|one fact only|ten facts|a long essay",
    "Why write flashcards by hand?|Writing helps you remember|It makes cards heavier|It is required",
    "How do you use flashcards well?|Test yourself and shuffle|Read only the answers|Never review",
    "Which card is best?|Front: Capital of France? Back: Paris|Front: Everything about Europe|Front: Hi Back: Hi",
    "Cards you miss should be...|reviewed more often|thrown away|hidden",
    "Writing big and clearly on cards helps because...|you can read them quickly|they are pretty|they last longer"
  ],
    ["Think of a card as a tiny quiz you can flip.", "Each card is like a small quiz: one side prompts and the other checks. Keep each card simple.", "Example: Front: '7 × 8'. Back: '56'. One small fact per card keeps it easy to check. Now do yours."],
    [["Tiny quizzes", "🃏", "A <b>flashcard</b> has a question or term on the front and the answer on the back."], ["One fact", "1️⃣", "Keep it to <b>one fact per card</b>. Write big and neat so you can read it fast."], ["Practice", "🔀", "Shuffle, test yourself, and keep missed cards for more practice."]]);

  const B17 = mk("Tone in writing", "🎭", [
    "What is the <b>tone</b> of writing?|The writer's attitude|The paper's color|The length",
    "Which sentence has a formal tone?|I would appreciate your reply by Friday.|Write back soon!!|Yo, reply fast.",
    "Which sentence has a friendly, casual tone?|Hey, can't wait to see you!|Your attendance is requested.|Kindly confirm receipt.",
    "A letter to a principal should usually be...|polite and formal|slangy|all emoji",
    "A note to a close friend can be...|casual and warm|always formal|rude",
    "Which word changes the tone to more serious?|regrettably|totally|whoa",
    "Which word choice is more polite?|Could you please help?|Help me now.|Do it.",
    "Why match tone to your reader?|It helps your message be received well|It makes writing longer|It hides the topic"
  ],
    ["Imagine who will read it, then ask how you would speak to that person.", "Formal tone uses polite, full words. Casual tone is relaxed and friendly. Choose the one that suits your reader and your purpose.", "Example: to a teacher, 'Could I please have an extension?' fits. To a friend, 'Can I get more time?' is fine. Same message, different tone. Now do yours."],
    [["Attitude", "🎭", "<b>Tone</b> is the feeling your words give: friendly, serious, excited, polite."], ["Formal or casual", "👔", "Formal: <b>I would appreciate your help.</b> Casual: <b>Can you help me out?</b>"], ["Match the reader", "🎯", "Use polite, formal tone for adults and official notes. Use friendly tone for friends."]]);

  const B18 = mk("Haiku and syllables", "🌸", [
    "A traditional English haiku has how many lines?|3|5|2",
    "What is the syllable pattern of a haiku?|5-7-5|7-5-7|3-3-3",
    "How many syllables are in 'butterfly'?|3|2|4",
    "How many syllables are in 'rainbow'?|2|1|3",
    "Haiku are often about...|nature and moments|long stories|math problems",
    "How many syllables are in 'cat'?|1|2|3",
    "A syllable is...|a beat of sound in a word|a kind of letter|a punctuation mark",
    "How many syllables are in 'elephant'?|3|2|4"
  ],
    ["Tap out the word with your finger: each beat is a syllable.", "Say the word slowly and count the beats, with a hand under your chin. A haiku follows a short-long-short pattern.", "Example: 'pumpkin' has two beats (pump-kin). 'banana' has three (ba-na-na). Now do yours."],
    [["Short poem", "🌸", "A <b>haiku</b> has three lines. English haiku often follow <b>5-7-5</b> syllables."], ["Count beats", "👏", "A <b>syllable</b> is one beat of sound: <b>but-ter-fly</b> has 3."], ["Nature", "🍃", "Haiku often catch a small moment in nature: a frog, a breeze, falling snow."]]);

  const L14 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18];

  // =============== LEVEL 15 ===============
  const C1 = mk("Participial phrases", "🏃", [
    "Which sentence has a participial phrase?|Running down the hill, Sam waved.|Sam waved.|Sam waved and smiled.",
    "Where does the comma go?<br><b>Smiling at the crowd the singer bowed.</b>|after 'crowd'|after 'Smiling'|after 'singer'",
    "A participle is a verb form that works as...|an adjective|a period|a title",
    "Which word is a participle?|Exhausted (in 'The exhausted hiker sat')|hiker|sat",
    "Which phrase describes the dog? <b>Wagging its tail, the dog greeted us.</b>|Wagging its tail|greeted us|the dog",
    "Where does the comma go in <b>Tired from the trip we slept early.</b>?|after 'trip'|after 'we'|after 'Tired'",
    "Which phrase is a participial phrase?|painted by a famous artist|and then left|is very old",
    "What should the phrase right at the start be followed by?|a comma|a colon|nothing"
  ],
    ["Look for a phrase built on a verb form that describes a noun.", "Verb forms can describe people and things, not only show action. Think about how a phrase at the start is separated from the main part.", "Example: 'Opening the box, Lena gasped.' The phrase 'Opening the box' describes Lena and is set off by a comma. Now do yours."],
    [["Verb forms that describe", "🏃", "A <b>participle</b> is a verb form used like an adjective: <b>a running dog</b>, <b>a broken toy</b>."], ["Phrases", "🧩", "<b>Climbing the tree, Ben spotted a nest.</b> The phrase tells about Ben."], ["Comma", "✂️", "When the phrase opens the sentence, put a <b>comma</b> after it."]]);

  const C2 = mk("Appositives", "🏷️", [
    "What is an appositive?|A noun phrase that renames another noun|A kind of verb|A mark at the end",
    "Which sentence has an appositive?|My cat, a tabby named Luna, loves boxes.|My cat loves boxes.|My cat sleeps and eats.",
    "How is a nonessential appositive set off?|By commas|By colons|By nothing",
    "In <b>Ms. Ortiz, our principal, spoke first.</b> what is the appositive?|our principal|spoke first|Ms. Ortiz",
    "Where do the commas go in <b>Mt. Everest the tallest mountain is in Asia.</b>?|after 'Everest' and 'mountain'|only after 'is'|after 'Mt.' and 'tallest'",
    "An appositive is placed...|right next to the noun it renames|at the end of the page|before the title",
    "Which words are the appositive? <b>The author, Rick Riordan, visited.</b> (a name)|Rick Riordan|The author|visited",
    "Why use an appositive?|To add information in fewer words|To make a sentence longer|To replace the verb"
  ],
    ["Ask: what noun is being renamed or explained by the words beside it?", "Look at the words that sit beside a noun and tell more about the same person or thing. Think about how extra information is set apart.", "Example: 'Our dog, a small terrier, barked.' 'a small terrier' renames 'Our dog' and is set off by two commas. Now do yours."],
    [["Renaming", "🏷️", "An <b>appositive</b> renames the noun beside it: <b>My uncle, a baker, makes bread.</b>"], ["Commas", "✂️", "If the extra information is not needed, use a <b>comma before and after</b>."], ["Why", "💡", "Appositives pack two ideas into one sentence, which keeps writing short and smooth."]]);

  const C3 = mk("Essential and extra clauses", "🔍", [
    "Which clause is <b>essential</b> (needed for meaning)?|The runner who won the race is my cousin.|My cousin, who won the race, is a runner.|The race, which was long, ended.",
    "Essential clauses are written...|without commas|with commas|in parentheses only",
    "Extra (nonessential) clauses are written...|with commas|without any punctuation|with a colon",
    "Which word usually begins an essential clause about things?|that|which|whom",
    "Which sentence has a nonessential clause?|My bike, which is red, is in the garage.|The bike that is red is mine.|The bike is fast.",
    "Does <b>The book that I borrowed is due Friday.</b> need commas around 'that I borrowed'?|No, the clause is essential|Yes, the clause is extra|Yes, but only one comma",
    "If you remove a nonessential clause, the main sentence...|still makes complete sense|stops making sense|turns into a question",
    "Does <b>Our school which opened in 1990 is large.</b> need commas around 'which opened in 1990'?|Yes, it is extra information|No, it is essential|Yes, but only one comma"
  ],
    ["Ask: if I remove this clause, does the sentence lose its meaning?", "Think about whether the clause tells you which one is meant, or only adds a bonus fact. That decides the punctuation.", "Example: 'Students who study improve' needs its clause. 'Mia, who studies daily, improved' only adds a fact, so it has commas. Now do yours."],
    [["Needed or extra?", "🔍", "<b>Essential</b> clauses tell which one. <b>Nonessential</b> clauses only add extra facts."], ["Commas", "✂️", "Essential: <b>no commas</b>. Extra: <b>commas around it</b>."], ["That and which", "🔤", "Use <b>that</b> for essential clauses and <b>which</b> (with commas) for extra ones."]]);

  const C4 = mk("Ethos, pathos, logos", "🏛️", [
    "Who first described these three appeals?|Aristotle|Shakespeare|Leonardo",
    "<b>Ethos</b> appeals to...|trust and credibility|emotion|logic",
    "<b>Pathos</b> appeals to...|emotion|credibility|numbers only",
    "<b>Logos</b> appeals to...|logic and facts|friendship|fear only",
    "Which uses logos?|Studies show 80% of students improved.|Imagine how sad the puppy feels.|As a doctor with 20 years of experience, I recommend it.",
    "Which uses ethos?|As a nurse with 20 years of experience, I advise rest.|This will make you cry.|Two plus two is four.",
    "Which uses pathos?|Picture the lonely puppy waiting at the door.|The report lists 12 graphs.|The author has a degree.",
    "Why use all three appeals?|They make an argument more convincing|They make it shorter|They remove facts"
  ],
    ["Ask what the writer is trying to move: your trust, your feelings or your thinking?", "The three appeals work on different parts of a listener: trust, feelings and thinking. Match the example to what it targets.", "Example: 'As a coach for ten years' shows experience. 'Imagine the joy of winning' stirs feelings. 'Teams that practice win more' uses a fact. Now do yours."],
    [["Three ways to persuade", "🏛️", "The ancient Greek thinker <b>Aristotle</b> described <b>ethos, pathos and logos</b>."], ["What they mean", "🧠", "<b>Ethos</b> = trust and credibility. <b>Pathos</b> = emotion. <b>Logos</b> = logic and facts."], ["Mix", "🎚️", "Good persuasive writing blends all three, like a recipe."]]);

  const C5 = mk("Hooks and introductions", "🎣", [
    "What is a hook?|An opening that grabs the reader's attention|The last line|A title page",
    "Which is a question hook?|Have you ever wondered why the sky is blue?|The sky is blue.|This essay is about the sky.",
    "Which is a surprising-fact hook?|A single lightning bolt is five times hotter than the surface of the sun.|Lightning is a topic.|I will explain lightning.",
    "Which is a weak opening?|My essay is going to be about dogs.|Dogs can understand over 150 words.|Imagine a dog waiting by the door.",
    "After the hook, an introduction usually gives...|background and the thesis|the sources list|a closing thank-you",
    "Which hook uses a short story?|Last summer, a storm knocked out our power for two days.|Storms exist.|In conclusion, storms.",
    "A hook should...|connect to your topic|have nothing to do with the topic|replace the thesis",
    "Where does the hook go?|At the very start|At the end|In the bibliography"
  ],
    ["Imagine you have two seconds to get a reader interested. What would you say?", "Openings that make you curious beat openings that just announce what is coming, and they must still fit the topic.", "Example: for an essay on sleep, 'Did you know teenagers need about nine hours of sleep?' hooks the reader. 'This is my essay about sleep' does not. Now do yours."],
    [["Catch the reader", "🎣", "A <b>hook</b> is a first sentence that makes readers want to keep reading."], ["Kinds", "🧰", "A <b>question</b>, a <b>surprising fact</b>, a <b>short story</b> or a <b>vivid picture</b> in words."], ["Then what?", "➡️", "After the hook add a little background, then finish with your <b>thesis</b>."]]);

  const C6 = mk("Strong conclusions", "🏁", [
    "What does a conclusion do?|Wraps up the essay and restates the main idea|Starts a new topic|Lists page numbers",
    "Which should NOT go in a conclusion?|Brand new evidence|A restated thesis|A final thought",
    "Which phrase can begin a conclusion?|In conclusion|For example|On the other hand",
    "A restated thesis should be...|in new words|copied exactly|left out",
    "A strong last sentence might...|leave the reader with something to think about|say 'The end'|apologize",
    "Which is a weak ending?|That is all I have to say.|Together, we can make our school greener.|Small habits can add up to big change.",
    "A conclusion should be...|short and focused|longer than the body|full of new quotes",
    "Which is the best restatement of 'Recess helps students focus'?|Giving students time to play helps them concentrate.|Recess is a word.|I like recess."
  ],
    ["Think about what you want your reader to remember after they finish.", "Think about what belongs at the very end of an essay and what is better placed earlier.", "Example: 'In short, regular practice makes handwriting clearer. Start with ten minutes today.' It restates the idea and gives a final push. Now do yours."],
    [["Finish strong", "🏁", "A <b>conclusion</b> reminds the reader of your main idea and leaves a final thought."], ["Do and don't", "✅", "Do restate your thesis in new words. Don't add brand-new evidence or say <b>that is all</b>."], ["Starter phrases", "🔑", "<b>In conclusion</b>, <b>In short</b>, <b>All in all</b>."]]);

  const C7 = mk("PEEL paragraphs", "🍊", [
    "In PEEL, what does <b>P</b> stand for?|Point|Paper|Pencil",
    "In PEEL, what does the first <b>E</b> stand for?|Evidence|Edit|Echo",
    "In PEEL, what does the second <b>E</b> stand for?|Explain|Enjoy|End",
    "In PEEL, what does <b>L</b> stand for?|Link|Letter|Line",
    "Which sentence is the Point?|Rain forests are important to Earth's climate.|The trees in a rain forest absorb carbon dioxide.|This links back to the climate.",
    "Which sentence is the Link?|So protecting rain forests protects our climate.|Rain forests are important.|Trees absorb carbon dioxide.",
    "What does 'Explain' do?|Shows how the evidence proves the point|Starts a new paragraph|Lists sources",
    "A PEEL paragraph is useful for...|organizing one idea clearly|drawing maps|memorizing dates"
  ],
    ["Each letter is a step in a single paragraph, in order.", "Each letter is one job in the paragraph. Think about the order in which a paragraph usually does its jobs.", "Example: Point: 'Reading builds vocabulary.' Evidence: 'Readers meet thousands of new words.' Explain: 'Seeing words in context makes them stick.' Link: 'So reading helps writing.' Now do yours."],
    [["Peel the paragraph", "🍊", "<b>P</b>oint, <b>E</b>vidence, <b>E</b>xplain, <b>L</b>ink."], ["Example", "🌳", "<b>P</b>: Trees help the planet. <b>E</b>: They absorb carbon dioxide. <b>E</b>: This slows warming. <b>L</b>: So planting trees helps."], ["Handwriting", "✏️", "Indent the first line and keep each step to a sentence or two so the paragraph stays tidy."]]);

  const C8 = mk("Primary and secondary sources", "🗃️", [
    "A <b>primary source</b> is...|first-hand evidence from the time|a book about it written later|a summary",
    "A <b>secondary source</b> is...|a later account that explains or interprets|a diary from the time|a photo from the time",
    "Which is a primary source?|A soldier's letter written at the time|A modern textbook chapter|An encyclopedia entry",
    "Which is a secondary source?|A textbook about ancient Rome|A Roman coin|A letter from a Roman",
    "A diary written by a student in 1920 is...|a primary source|a secondary source|neither",
    "A biography written last year is...|a secondary source|a primary source|a first-hand account",
    "An old photograph from the event is...|a primary source|a secondary source|a summary",
    "Why compare both kinds of sources?|You get first-hand facts and expert explanation|They are always identical|To fill space"
  ],
    ["Ask who made it and when: was the person there, at that time?", "Decide whether the source was made at the time by someone who was there, or later by someone studying it.", "Example: a sailor's logbook from 1850 was made then, so it is primary. A book written in 2020 about sailors is a later account. Now do yours."],
    [["First-hand", "🗃️", "A <b>primary source</b> comes from the time: diaries, letters, photos, speeches, objects."], ["Later", "📘", "A <b>secondary source</b> explains or studies it afterward: textbooks, encyclopedias, biographies."], ["Use both", "🤝", "Primary sources give you the voice of the time. Secondary sources help you understand the big picture."]]);

  const C9 = mk("Research questions", "❓", [
    "Which is the best research question?|How did the printing press change who could read?|What is the printing press?|Printing press.",
    "A good research question is...|open-ended and focused|answered by yes or no|a single word",
    "Which is too broad?|The history of everything|How did ink change in the 1800s?|Why did monks use quills?",
    "Which is too narrow (one fact)?|What year was the Penny Black issued?|How did postage change letter writing?|Why did mail become cheaper?",
    "Question words that invite deeper answers include...|how and why|yes and no|who and when only",
    "Why write the question before researching?|It guides what you look for|It makes notes shorter|It replaces sources",
    "If your question is too broad, you should...|narrow it to a smaller topic|add more topics|delete it",
    "Which question can be explored with sources?|Why did scribes copy books by hand?|Is purple the best color?|What is my favorite pen?"
  ],
    ["Think about a question that needs reading and thinking, not a one-word answer.", "A strong question needs real investigation, is not too huge or too tiny, and cannot be answered with one word.", "Example: 'Food' is too broad. 'How did refrigerators change what families eat?' is focused and open. Now do yours."],
    [["Start with a question", "❓", "A <b>research question</b> guides everything you look up."], ["Just right", "🥣", "Not too <b>broad</b> (all of history) and not too <b>narrow</b> (one fact). Use <b>how</b> or <b>why</b>."], ["Write it down", "📝", "Put it at the top of your notes and check your reading against it."]]);

  const C10 = mk("Spencerian script", "🪶", [
    "Spencerian script was developed by...|Platt Rogers Spencer|Isaac Pitman|Austin Palmer",
    "Spencerian script was popular in the...|1800s|1500s|2000s",
    "Spencerian letters look...|flowing and oval-based with a slant|blocky and straight|like a computer font",
    "It was widely taught to students and used in...|business and letters|only maps|only computers",
    "Spencerian writers moved their...|arm and fingers together smoothly|only the toes|nothing",
    "Compared to print, Spencerian looks...|more decorative|more square|harder to join",
    "It used thin and thick lines made by...|pressure on a flexible steel pen|a computer|a marker",
    "Today Spencerian is mostly used for...|calligraphy and decoration|tests|keyboards"
  ],
    ["Think about the century, the elegant oval shapes and the steel pens involved.", "Spencerian is a decorative, flowing script from long before computers.", "Example: an 1860s bookkeeper writes a ledger in a slanted flowing hand with thin and thick lines, in Spencerian style. Now do yours."],
    [["Flowing hand", "🪶", "<b>Spencerian script</b> was created by <b>Platt Rogers Spencer</b> in the 1800s."], ["Look", "🌀", "Slanted, flowing, oval-based letters with thin and thick lines from a flexible steel pen."], ["Today", "🎨", "You can still see it in calligraphy and old-style logos and certificates."]]);

  const C11 = mk("The Palmer Method", "📏", [
    "The Palmer Method was created by...|Austin Palmer|Platt Spencer|Isaac Pitman",
    "It was widely taught in American schools in the...|early 1900s|1400s|2020s",
    "Palmer writing is mostly...|plain and simple, with few flourishes|full of flourishes|written in capitals only",
    "A big goal of the Palmer Method was...|fast, easy-to-read writing|fancy ornament|secret writing",
    "Palmer teachers often practiced...|ovals and push-pull drills|typing|drawing maps",
    "Compared with Spencerian, Palmer is...|plainer and faster|more decorative|slower",
    "Palmer writers used the movement of...|the arm, not just the fingers|only the eyes|the feet",
    "Why was a plain style useful in offices?|It could be written quickly and read easily|It was colorful|It was secret"
  ],
    ["Think about a style made for busy schools and offices rather than for decoration.", "This method aimed at writing that suited busy schools and offices.", "Example: a clerk in 1915 writes pages of orders in plain, rounded letters at a steady pace. That plain, fast style is Palmer. Now do yours."],
    [["Plain and quick", "📏", "The <b>Palmer Method</b> was made by <b>Austin Palmer</b> and taught widely in the <b>early 1900s</b>."], ["Drills", "🔁", "Students practiced ovals and push-pull lines, using the <b>whole arm</b> to move smoothly."], ["Compare", "⚖️", "Spencerian was ornate. Palmer was <b>plainer and faster</b>, good for business."]]);

  const C12 = mk("The typewriter", "⌨️", [
    "The typewriter was patented by Sholes and colleagues in...|1868|1268|1988",
    "What does a typewriter do?|Prints letters when keys are pressed|Records sound|Projects pictures",
    "The QWERTY layout helped...|keep typebars from jamming|make typing slower on purpose for fun|hide letters",
    "Before typewriters, office documents were...|handwritten|printed by laser|sent by email",
    "How did typewriters change offices?|Documents became neat and uniform|Everyone stopped writing|Paper disappeared",
    "Typewriters print letters by...|striking an inked ribbon|using a laser|using a camera",
    "Why do people still learn handwriting?|It is personal, always available and aids memory|It is required for all jobs|Typewriters are banned",
    "A typed page and a handwritten page differ because typed letters are...|all the same shape|all different|invisible"
  ],
    ["Think about what offices did before machines helped with writing.", "Think about how a machine changes the look of a page compared with the human hand.", "Example: a clerk before 1870 copies a contract by hand. Later, a typist types it with identical letters in less time. That is the typewriter's effect. Now do yours."],
    [["Writing machines", "⌨️", "The first useful <b>typewriter</b> was patented in <b>1868</b> (Christopher Latham Sholes and partners)."], ["QWERTY", "🔤", "The <b>QWERTY</b> layout was designed to help keep the typebars from jamming."], ["Still handwriting", "✍️", "Typing is fast and even, but handwriting is personal and always available."]]);

  const C13 = mk("Renaissance italic", "🇮🇹", [
    "Italic handwriting began in...|Italy|Norway|Egypt",
    "It grew in the...|1400s and 1500s (Renaissance)|1900s|stone age",
    "Compared with older formal scripts, italic is...|faster and narrower|slower and wider|made of capitals only",
    "The word 'italic' comes from...|Italy|Italian food|an Italian dog",
    "Italic letters lean...|slightly to the right|to the left|upside down",
    "Ludovico degli Arrighi published a famous writing manual in...|1522|1022|1922",
    "Why did scribes like italic?|It could be written quickly and still looked elegant|It was secret|It needed no pens",
    "Modern italic type in books comes from...|slanted handwriting|map symbols|math signs"
  ],
    ["Think about where and when people wanted a faster, narrower style of writing.", "Think about where and when this quick, graceful hand began and what it inspired later.", "Example: a scribe in 1500s Florence uses a narrow, slightly slanted hand to copy a letter in less time than a wide formal script. That is the italic idea. Now do yours."],
    [["From Italy", "🇮🇹", "<b>Italic</b> handwriting came from Italy in the <b>1400s-1500s</b> (the Renaissance)."], ["Quick and elegant", "🪶", "Narrow, slightly slanted letters were faster to write than older wide scripts."], ["Printing", "📖", "<b>Italic type</b>, the slanted type in books, grew out of this handwriting."]]);

  const C14 = mk("Iron gall ink", "🖋️", [
    "Iron gall ink was made from oak galls and...|iron salts|sugar|milk",
    "Oak galls are...|growths on oak trees|rocks|berries",
    "Iron gall ink starts pale and then...|turns dark as it dries|disappears|turns green",
    "Iron gall ink was used for...|many centuries in Europe|only a few days|only on computers",
    "A disadvantage of iron gall ink is that it can...|slowly damage paper over a long time|dissolve glass|glow",
    "Iron gall ink was often written with...|quill pens|crayons|brush markers",
    "Why was the ink valued?|It was permanent and hard to wash away|It was cheap plastic|It was invisible",
    "Many old manuscripts we study were written with...|iron gall ink|ballpoint pens|felt-tip pens"
  ],
    ["Think about a recipe from nature plus a metal.", "Think about the natural source plus the metal in the recipe, and how the writing changed after it dried.", "Example: a scribe crushes galls, mixes in iron salts and water, and writes with a quill; the pale marks darken to near-black. Now do yours."],
    [["Old recipe", "🖋️", "<b>Iron gall ink</b> was made from <b>oak galls</b> (growths on oak trees) and <b>iron salts</b>."], ["Permanent", "🕰️", "It turned dark as it dried and was hard to wash away, so it was used for centuries."], ["Side effect", "📜", "Over very long times it can slowly eat into paper, so old pages need careful care."]]);

  const C15 = mk("Lecture note-taking", "🎧", [
    "While listening, you should write...|key ideas, not every word|everything word for word|nothing",
    "Which phrase signals something important?|The main point is...|By the way|Anyway",
    "What can you use to write faster?|Abbreviations and symbols|Longer words|Fancy capitals",
    "What should you do right after class?|Review and fill in gaps|Throw away the notes|Rewrite in a code",
    "If you miss something, you should...|leave a gap and ask later|stop writing|make something up",
    "Why leave space on the page?|You can add details later|It saves paper|It is required",
    "Which note is better?|Photosynthesis: plants make food from light|The teacher talked a lot about a thing|Plants are green and nice",
    "Listening for repeated words helps you find...|what the speaker thinks is important|the next recess|the bell"
  ],
    ["Imagine you can only write a few words for each idea. Which ones matter?", "Think about speed: you cannot copy everything, so you must choose and shorten.", "Example: the teacher says 'The main cause was drought.' You write 'main cause = drought' and leave a gap below for details. Now do yours."],
    [["Listen and write", "🎧", "Write <b>key ideas</b>, not every word. Use abbreviations like <b>w/</b>, <b>b/c</b>, <b>→</b>."], ["Signals", "🚦", "Phrases like <b>the main point</b>, <b>remember</b>, <b>there are three</b> flag important ideas."], ["After class", "🔁", "Review within a day, fill gaps and add a one-line summary."]]);

  const C16 = mk("Concept maps", "🕸️", [
    "A concept map shows...|ideas connected by lines|only a list|a timeline of dates",
    "In a concept map, the main idea is usually placed...|in the center or top|hidden|at the edge only",
    "What do linking words on lines do?|Explain how ideas are connected|Hide the idea|Add color",
    "Which linking phrase is best between 'Plants' and 'Sunlight'?|need|banana|slowly",
    "Ideas are usually written in...|circles or boxes|long paragraphs|invisible ink",
    "Why use a concept map?|To see how ideas relate|To avoid learning|To fill a page",
    "Which linking word fits between 'Bees' and 'Honey'?|make|jump|green",
    "Arrows on a concept map show...|the direction of the relationship|the page number|the author"
  ],
    ["Think about a spider web where each idea is a dot and each line says how two dots are related.", "Think about what the map needs so that every connection can be read out loud as a sentence.", "Example: Birds → have → feathers. Reading the line with its word forms a sentence. Now do yours."],
    [["Web of ideas", "🕸️", "A <b>concept map</b> puts ideas in circles or boxes and joins them with lines."], ["Linking words", "🔗", "Write a word on each line, such as <b>need</b>, <b>cause</b> or <b>make</b>. It turns each link into a sentence."], ["Neat maps", "✏️", "Keep words short, write the main idea in the middle, and use arrows to show direction."]]);

  const C17 = mk("Handwriting goals and portfolios", "📈", [
    "What is a handwriting portfolio?|A collection of your writing over time|A single lucky page|A computer file only",
    "Why save samples from different months?|You can see your progress|They take up space|They must be graded",
    "A good handwriting goal is...|specific, like 'keep letters the same size'|vague, like 'be better'|impossible",
    "Which goal is measurable?|Write one clean page every day for a week|Be perfect|Do it better",
    "To check progress you can...|compare an old sample with a new one|guess|ignore",
    "After reaching a goal, a good next step is...|set a new goal|stop writing forever|throw away your pens",
    "Why add the date to each sample?|To order your samples|To make it prettier|To avoid writing",
    "Reflecting on your portfolio helps you...|see what to practice next|forget what you did|hide mistakes"
  ],
    ["Think about how athletes track their scores over time. How could you track your writing?", "Think about how a goal can be checked and how you could see change over time.", "Example: 'This month I will keep all my tall letters the same height.' Compare October's page with September's to see the difference. Now do yours."],
    [["Track it", "📈", "A <b>portfolio</b> is a collection of dated samples of your writing."], ["Goals", "🎯", "Pick a <b>specific</b> goal you can check: <b>same size letters</b>, <b>even spacing</b>, <b>one neat page a day</b>."], ["Look back", "🔙", "Compare old and new samples, enjoy your growth and choose the next goal."]]);

  const C18 = mk("Letters and the Penny Black", "📮", [
    "The Penny Black, issued in 1840, was the world's first...|adhesive postage stamp|telephone|printing press",
    "The Penny Black was introduced in...|the United Kingdom|Brazil|Japan",
    "Who proposed the postal reform that led to it?|Rowland Hill|Isaac Newton|Louis Braille",
    "Before stamps, who often paid for a letter?|The person receiving it|No one|The post office",
    "A stamp on an envelope shows that...|the postage has been paid|the letter is a secret|the writer is famous",
    "Cheaper postage meant more people could...|write and send letters|stop writing|avoid reading",
    "A letter's address helps the post...|deliver it to the right place|pick a color|choose a stamp",
    "Where does a stamp go on an envelope?|The top right corner|The back flap|The bottom left"
  ],
    ["Think about how a letter used to be paid for, and what changed in 1840.", "Think about who paid for letters long ago and how that changed when postage was reformed.", "Example: before reform, a family might refuse a letter because it cost too much to receive. With a stamp already paid, sending was easy. Now do yours."],
    [["First stamp", "📮", "The <b>Penny Black</b> (1840, United Kingdom) was the first adhesive postage stamp."], ["Pre-paid", "💷", "Before, the person receiving a letter often paid. With stamps, the <b>sender paid</b> a small fixed price."], ["Letter boom", "✉️", "Cheaper postage meant many more people wrote letters, so neat addresses and handwriting mattered more."]]);

  const L15 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18];

  Object.assign(HAND_LEVELS, {
    13: L13.concat([MIX("Mixed practice", L13[0], L13[3], L13[5], L13[8], L13[12]), MIX("Level 13 Challenge", L13[1], L13[2], L13[6], L13[9], L13[14], L13[17])]),
    14: L14.concat([MIX("Mixed practice", L14[0], L14[2], L14[5], L14[7], L14[12]), MIX("Level 14 Challenge", L14[1], L14[3], L14[8], L14[10], L14[15], L14[17])]),
    15: L15.concat([MIX("Mixed practice", L15[0], L15[2], L15[5], L15[7], L15[12]), MIX("Level 15 Challenge", L15[1], L15[3], L15[8], L15[10], L15[15], L15[17])])
  });
})();
