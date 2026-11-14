// ext/writing-22-24.js  Mind Lab Writing & Grammar, levels 22-24 (60 lessons)
(() => {
  // rows: "question|answer|wrong1|wrong2|..." (no | inside text)
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
  const bs = (q, rows) => rows.map(r => q + "<br><br>" + r);

  // =============== LEVEL 22 ===============
  const A1 = mk("Conjunctive adverbs", "🔀", [
    "Which sentence joins two full sentences correctly?|It was late; therefore, we left.|It was late; because we left.|It was late; so that we left.",
    "Which word needs a semicolon before it when it joins two full sentences?|however|because|and",
    "Choose the best word.<br><br><b>I love pizza; ___, I am too full to eat more.</b>|however|therefore|moreover",
    "Choose the best word.<br><br><b>The road was icy; ___, we drove slowly.</b>|consequently|nevertheless|otherwise",
    "Choose the best word.<br><br><b>Mia is kind; ___, she is very funny.</b>|moreover|however|otherwise",
    "Choose the best word.<br><br><b>Finish your homework now; ___, you will run out of time.</b>|otherwise|furthermore|therefore",
    "What mark goes BEFORE a conjunctive adverb that joins two full sentences?|a semicolon|a colon|an apostrophe",
    "What mark follows a conjunctive adverb such as <b>however</b> at the start of a clause?|a comma|a semicolon|a question mark"],
    ["Decide what the second part does: does it agree, contrast, or show a result? Then check the punctuation around the linking word.", "Words like however and therefore are not true joiners like 'and' or 'but'. To join two full sentences with one, you need a stronger mark before it and a small mark after it.", "Example: <b>It rained; ___, the game went on.</b> The game going on is a surprise, so the word must show contrast. Now do yours."],
    [["Adverbs that connect", "🔀", "<b>However, therefore, moreover, consequently, otherwise, nevertheless</b> are conjunctive adverbs. They link ideas and show how they relate."], ["The punctuation pattern", "✏️", "Between two full sentences: <b>sentence; however, sentence.</b> A semicolon before, a comma after."], ["Pick by meaning", "🎯", "Contrast: however, nevertheless. Result: therefore, consequently. Addition: moreover, furthermore. Warning: otherwise."]]);

  const A2 = mk("Redundancy", "♻️", [
    "Which phrase says the same thing twice?|free gift|gift card|wrapped gift",
    "Which phrase says the same thing twice?|past history|history book|local history",
    "Which phrase says the same thing twice?|end result|test result|final grade",
    "Which phrase says the same thing twice?|unexpected surprise|big surprise|happy surprise",
    "Which phrase says the same thing twice?|ATM machine|bank machine|ATM",
    "Which phrase says the same thing twice?|close proximity|nearby|in the neighborhood",
    "Best fix for <b>She returned back home.</b>|She returned home.|She returned back.|She went back return home.",
    "Best fix for <b>The reason is because I was sick.</b>|The reason is that I was sick.|The reason is because that I was sick.|Because the reason I was sick."],
    ["Look for a word that already carries the meaning of its neighbor. Is one of them doing nothing new?", "A redundant phrase repeats an idea inside itself, such as a modifier that is already part of the noun. Cut the part that adds nothing.", "Example: <b>a completely full cup</b>. 'Full' already means completely, so say 'a full cup'. Now do yours."],
    [["Saying it twice", "♻️", "<b>Redundancy</b> means repeating an idea in the same phrase, like <b>future plans</b> or <b>join together</b>."], ["Why cut it?", "✂️", "Extra words slow the reader and make you sound careless. Strong writing says each thing once."], ["Spot it", "🔍", "Ask: does this word add anything the other word does not already say? If not, delete it."]]);

  const A3 = mk("Cutting wordy phrases", "✂️", [
    "Which short word means the same as <b>due to the fact that</b>?|because|although|unless",
    "Which short word means the same as <b>at this point in time</b>?|now|later|never",
    "Which short word means the same as <b>in order to</b>?|to|so|for",
    "Which short word means the same as <b>in the event that</b>?|if|when|though",
    "Which short word means the same as <b>despite the fact that</b>?|although|because|so",
    "Which short word means the same as <b>has the ability to</b>?|can|must|will",
    "Which one word replaces <b>make a decision</b>?|decide|delay|decline",
    "Which one word replaces <b>a large number of</b>?|many|few|any"],
    ["Think about what the long phrase really does in the sentence. Is there a single small word that does the same job?", "Wordy phrases often hide a one-word idea: a reason, a time, a condition, a contrast, an ability or an action. Match the job, not the sound.", "Example: <b>in spite of the fact that</b> shows contrast, so one word does it: 'though'. Now do yours."],
    [["Fat phrases", "📏", "<b>Due to the fact that, at this point in time, in the event that</b>: long phrases that stand in for tiny words."], ["Trim them", "✂️", "because, now, if, to, can, although, many. Shorter writing is usually clearer writing."], ["Verb power", "💪", "<b>Make a decision</b> becomes <b>decide</b>. <b>Give consideration to</b> becomes <b>consider</b>. Let the verb do the work."]]);

  const A4 = mk("Double negatives", "🚫", [
    "Which sentence is standard English?|She didn't see anything.|She didn't see nothing.|She never saw nothing.",
    "Which sentence is standard English?|We can hardly see the stage.|We can't hardly see the stage.|We cannot barely see the stage.",
    "Choose the word.<br><br><b>He doesn't want ___ help.</b>|any|no|none",
    "Choose the word.<br><br><b>There isn't ___ milk left.</b>|any|no|nothing",
    "Which sentence is standard English?|I can barely hear you.|I can't barely hear you.|I cannot hardly hear you.",
    "Why is <b>I don't know nothing</b> nonstandard?|It has two negatives in one clause.|It has no verb.|It is too short.",
    "Which sentence uses two negatives on purpose for a gentle effect?|The result was not unexpected.|I ain't got nothing.|Nobody never came.",
    "Best fix for <b>Nobody never helped me.</b>|Nobody ever helped me.|Nobody never helped.|Somebody never helped me."],
    ["Count the negative words (no, not, never, nothing, nobody, hardly, barely) in the clause. How many are there?", "In standard English one negative per clause is enough. Swap the extra negative for a positive partner like any, ever or anything.", "Example: <b>We didn't go nowhere.</b> Two negatives, so change the second: 'We didn't go anywhere.' Now do yours."],
    [["Two is too many", "🚫", "A <b>double negative</b> puts two negatives in one clause: <b>I don't have no pens</b>. Standard English avoids it."], ["Hidden negatives", "🕵️", "<b>Hardly, barely, scarcely</b> are negative too. So <b>can't hardly</b> is a double negative."], ["On purpose", "🎭", "Writers sometimes use <b>not un-</b> (not unkind) as a mild, deliberate effect. That is a different, careful choice."]]);

  const A5 = mk("Denotation and connotation", "💭", [
    "Both words mean careful with money. Which has a negative connotation?|stingy|thrifty|careful",
    "Which word sounds the most positive?|curious|nosy|prying",
    "Which word sounds negative for a person who sticks to their ideas?|stubborn|determined|firm",
    "Which word carries warmer feelings?|home|house|building",
    "The dictionary meaning of a word is its...|denotation|connotation|tone",
    "The feelings and ideas a word suggests are its...|connotation|denotation|definition",
    "Critics call a confident leader...|arrogant|assured|poised",
    "Which word sounds the most negative for a low price?|cheap|affordable|budget"],
    ["Words can mean nearly the same thing but feel different. Which word leaves you with a good or bad feeling?", "Denotation is the plain dictionary meaning. Connotation is the emotion that comes along with it, positive, negative or neutral.", "Example: <b>slim</b> and <b>scrawny</b> both describe a thin body, but one is a compliment and the other is not. Now do yours."],
    [["Two layers", "💭", "<b>Denotation</b> = what the dictionary says. <b>Connotation</b> = what the word makes you feel."], ["Same meaning, different feeling", "🎨", "<b>Thrifty</b> and <b>stingy</b> both mean careful with money, but thrifty is praise and stingy is criticism."], ["Choose on purpose", "🎯", "Good writers pick the word whose feeling fits their goal. Check connotation before you choose."]]);

  const A6 = mk("Register and formality", "🎩", [
    "Which sentence is the most formal?|I would appreciate your assistance.|Gimme a hand.|Help me out, dude.",
    "Which message fits a quick text to a friend?|Running late, be there soon!|I regret to inform you of my delay.|Please pardon my tardiness.",
    "Contractions like <b>don't</b> are usually avoided in...|formal academic writing|texts to friends|casual chats",
    "Which word is more formal than <b>buy</b>?|purchase|grab|snag",
    "Which word is the most formal?|commence|start|kick off",
    "Slang such as <b>no cap</b> fits best in...|a chat with friends|a research paper|a cover letter",
    "<b>Register</b> in language means...|the level of formality|a list of words|a kind of poem",
    "Which word is more formal than <b>kids</b>?|children|youngsters|little guys"],
    ["Ask who will read it: a friend, a teacher or an employer? Pick the language that suits that reader.", "Register is how formal or casual your language is. Formal writing avoids slang and usually contractions, and chooses precise words.", "Example: for a letter to a principal, 'We need more books' becomes 'We respectfully request additional books.' Now do yours."],
    [["Dress your words", "🎩", "You wear different clothes for a party and an interview. Language works the same way: that is <b>register</b>."], ["Casual or formal", "👕", "Casual: slang, contractions, short bits. Formal: full words, precise vocabulary, careful grammar."], ["Match the moment", "📬", "Reports, essays and applications call for formal register. Texts and chats allow casual."]]);

  const A7 = mk("Dialect and vernacular", "🗣️", [
    "A dialect is...|a variety of a language used by a region or group, with its own words and grammar|a mistake in speaking|a completely different language",
    "Writers use dialect in dialogue to...|show where a character is from|make text shorter|confuse readers",
    "Which statement is true?|Dialects follow their own consistent rules|Dialects are lazy speech|Only some people speak dialects",
    "Standard English is...|the variety used in schools and formal writing|the only correct way to talk|the oldest dialect",
    "Vernacular means...|the everyday speech of ordinary people|formal legal language|a dead language",
    "When writing dialect in a story, it is best to...|use a light touch so it stays readable|spell every sound strangely|never use it",
    "Code-switching means...|changing how you speak to fit the situation|translating books|learning to program",
    "Words like <b>y'all</b> or <b>soda</b> versus <b>pop</b> show...|regional differences|spelling mistakes|errors in logic"],
    ["Think about how people in different places or groups speak. Is it wrong or just different?", "A dialect is a full, rule-governed variety of a language. Standard English is simply the one most used in formal settings.", "Example: some regions say 'sneakers' and others say 'tennis shoes'. Both are valid words used by different groups. Now do yours."],
    [["Many ways to speak", "🗣️", "A <b>dialect</b> is a variety of a language shared by a region or group. Every dialect has its own rules and words."], ["In stories", "📖", "Authors use dialect in dialogue to show who a character is. Spell it lightly so readers can still follow."], ["Switching", "🔁", "Skilled speakers <b>code-switch</b>, shifting between casual speech and formal English as the setting changes."]]);

  const A8 = mk("Iambic pentameter", "🎼", [
    "An <b>iamb</b> is a pair of syllables with...|an unstressed then a stressed beat|a stressed then an unstressed beat|two stressed beats",
    "<b>Pentameter</b> means a line has...|five feet|five lines|five syllables",
    "A perfect line of iambic pentameter has how many syllables?|10|8|12",
    "<b>Blank verse</b> is...|unrhymed iambic pentameter|rhymed couplets|poetry with no pattern at all",
    "Who wrote most of his plays in blank verse?|William Shakespeare|Charles Dickens|Mark Twain",
    "Who wrote the long poem <b>Paradise Lost</b> in blank verse?|John Milton|Walt Whitman|Langston Hughes",
    "Which word is an iamb (da-DUM)?|today|garden|silent",
    "A line with four feet is called...|tetrameter|pentameter|hexameter"],
    ["A foot is a small unit of syllables. Count how many syllables and which ones are stressed.", "Iambic means each foot goes da-DUM. The prefix in pentameter is like the one in pentagon. Blank means no rhyme.", "Example: the word <b>delay</b> sounds like de-LAY, so it is one iamb. Five of them in a row make a ten-syllable line. Now do yours."],
    [["Heartbeat poetry", "🎼", "An <b>iamb</b> is a soft beat then a strong beat: <b>da-DUM</b>, like a heartbeat."], ["Five feet", "5️⃣", "<b>Iambic pentameter</b> = five iambs in a line = ten syllables: da-DUM da-DUM da-DUM da-DUM da-DUM."], ["Blank verse", "📜", "<b>Blank verse</b> is iambic pentameter that does not rhyme. Shakespeare and Milton used it a great deal."]]);

  const A9 = mk("Sonnet forms", "🧩", [
    "A sonnet has how many lines?|14|12|16",
    "A Shakespearean sonnet ends with...|a rhyming couplet|a quatrain|a refrain",
    "Which rhyme scheme belongs to a Shakespearean sonnet?|ABAB CDCD EFEF GG|ABBAABBA CDECDE|AABBCCDD",
    "A Petrarchan sonnet splits into...|an octave and a sestet|three quatrains and a couplet|four tercets",
    "How many lines are in an octave?|8|6|4",
    "How many lines are in a sestet?|6|8|2",
    "A pair of rhyming lines is called a...|couplet|tercet|quatrain",
    "A group of four lines is a...|quatrain|couplet|sestet"],
    ["Count the lines or the groups of lines. Which form uses that layout?", "Both sonnets have 14 lines in iambic pentameter. They differ in how the lines are grouped: 'octa' and 'sex' are number clues, and 'quatr' means four.", "Example: a form with three groups of 4 lines plus a final 2 is Shakespearean; a form with 8 plus 6 is Petrarchan. Now do yours."],
    [["Fourteen lines", "🧩", "A <b>sonnet</b> is a 14-line poem, usually in iambic pentameter."], ["Shakespearean", "🎭", "Three <b>quatrains</b> (4 lines each) and a closing <b>couplet</b>: ABAB CDCD EFEF GG."], ["Petrarchan", "🇮🇹", "An <b>octave</b> (8 lines) poses a problem; a <b>sestet</b> (6 lines) answers or turns."]]);

  const A10 = mk("Kinds of novels", "📚", [
    "A <b>bildungsroman</b> follows...|a young person growing up and learning|a detective solving crimes|a trip through space",
    "An <b>epistolary</b> novel is told through...|letters or diary entries|poems|songs",
    "A <b>dystopian</b> novel shows...|a society gone badly wrong|a perfect society|a prehistoric world",
    "<b>Utopia</b> means...|an ideal, perfect society|a terrible place|a desert",
    "Which classic is told through letters, diary entries and news clippings?|Dracula|Treasure Island|Little Women",
    "George Orwell's <b>1984</b> is a ___ novel.|dystopian|epistolary|picaresque",
    "Which novel is a bildungsroman, following a boy's growth?|Great Expectations|Dracula|The Time Machine",
    "A <b>historical novel</b> is set in...|a real period of the past|the far future|a dream only"],
    ["Think about what the story is mostly about: growing up, a bad society, an ideal one, or how it is told.", "Novel types are named by their focus or form. 'Epistle' means a letter, and 'dys' means bad while 'u' with 'topia' names a place.", "Example: a story told only through emails and texts is an epistolary story, just like one told in letters. Now do yours."],
    [["Types of novels", "📚", "Teachers name novels by what they do. Knowing the names helps you talk about books."], ["Three big ones", "🔖", "<b>Bildungsroman</b>: growing up. <b>Epistolary</b>: told in letters or diaries. <b>Dystopian</b>: a society gone wrong."], ["And more", "➕", "<b>Utopian</b>: an ideal society. <b>Historical</b>: set in a real past time. <b>Picaresque</b>: a roguish hero's adventures."]]);

  const A11 = mk("Counterarguments", "⚖️", [
    "A <b>counterargument</b> is...|an opposing viewpoint|your thesis|an example",
    "A <b>concession</b> means...|admitting the other side has a fair point|giving up the whole argument|ending the essay",
    "Which word begins a concession?|Admittedly|Therefore|For example",
    "Which phrase begins a rebuttal after a concession?|However, this overlooks|In addition|Also",
    "Why include a counterargument?|It shows you considered other views, so you seem fairer|It confuses readers|It fills space",
    "Best order for a strong argument paragraph:|state the opposing view, then answer it|ignore the other side|only repeat your claim",
    "A <b>strawman</b> is...|making the opposing view sound weaker than it is|a farmer's scarecrow|a strong rebuttal",
    "Which word warns that an opposing view is coming?|Critics|Furthermore|Likewise"],
    ["Think about the two sides: what would someone who disagrees say, and how can you respond fairly?", "A strong argument names the opposing view honestly, may concede a fair point, and then explains why your claim still stands (a rebuttal).", "Example: 'Admittedly, homework takes time; however, it builds habits.' The first part concedes, the second rebuts. Now do yours."],
    [["Meet the other side", "⚖️", "A <b>counterargument</b> is what someone who disagrees would say. Mention it; do not hide it."], ["Concede, then rebut", "🤝", "<b>Concede</b> a fair point (Admittedly, It is true that). Then <b>rebut</b> it (However, yet, but)."], ["Be fair", "🌟", "Never twist the other side into a weak <b>strawman</b>. Fair arguments are more persuasive."]]);

  const A12 = mk("MLA and APA citations", "📎", [
    "Which is the MLA in-text citation for Lee, page 12?|(Lee 12)|(Lee, 2012)|(12 Lee)",
    "Which is the APA in-text citation for Lee, published in 2019?|(Lee, 2019)|(Lee 19)|(2019 Lee page)",
    "An MLA in-text citation uses the author and the...|page number|year|publisher",
    "An APA in-text citation uses the author and the...|year|page only|title",
    "The APA list of sources at the end is called...|References|Works Cited|Notes",
    "The MLA list of sources at the end is called...|Works Cited|References|Index",
    "You must cite a source when you...|use someone else's words or ideas|share your own opinion|state common knowledge",
    "Which fact usually needs no citation (common knowledge)?|Water freezes at 0 degrees Celsius|A 2021 study found 62% of teens sleep late|A scientist said the sea is rising by 3 mm a year"],
    ["Think of the pattern: who wrote it, then either where (page) or when (year). Which style asks for which?", "MLA points to the page (author and page, no comma). APA points to the date (author, comma, year). Their end lists are named differently too.", "Example: for Park, page 7, MLA is (Park 7); for Park in 2020, APA is (Park, 2020). Now do yours."],
    [["Give credit", "📎", "When you use another person's words or ideas, you <b>cite</b> them so readers can find the source."], ["MLA", "📘", "<b>MLA</b>: author and page, no comma: (Smith 45). The final list is called <b>Works Cited</b>."], ["APA", "📗", "<b>APA</b>: author, comma, year: (Smith, 2020). The final list is called <b>References</b>."]]);

  const A13 = mk("Wordplay and mix-ups", "🎲", [
    "<b>He is the pineapple of politeness</b> (instead of pinnacle) is a...|malapropism|spoonerism|palindrome",
    "<b>You have hissed all my mystery lectures</b> (instead of missed all my history lectures) is a...|spoonerism|malapropism|pun",
    "A <b>mondegreen</b> is...|a misheard phrase, like a song lyric|a word that reads the same backward|a joke with two meanings",
    "Which word is a palindrome?|racecar|rocket|carrot",
    "A <b>pun</b> is...|a joke that plays on a word's double meaning|a swapped sound pair|a repeated word",
    "The word <b>malapropism</b> comes from a character in a play named...|Mrs. Malaprop|Mr. Spoon|Dr. Slip",
    "A <b>spoonerism</b> swaps...|the starting sounds of words|the last letters of words|two whole sentences",
    "Which word is a palindrome?|level|garden|silver"],
    ["Say the phrase out loud. Is the problem a wrong word that sounds similar, swapped sounds, or a word that reads both ways?", "Malapropism: a similar-sounding wrong word. Spoonerism: first sounds of two words swapped. Mondegreen: misheard words. Palindrome: same forwards and backwards.", "Example: 'a blushing crow' for 'a crushing blow' swaps the first sounds, so it is a spoonerism. Now do yours."],
    [["Playing with sounds", "🎲", "English has names for funny language slips and tricks."], ["Slips", "🙈", "<b>Malapropism</b>: wrong word that sounds alike. <b>Spoonerism</b>: swapped first sounds. <b>Mondegreen</b>: misheard words."], ["Tricks", "🎩", "<b>Pun</b>: double-meaning joke. <b>Palindrome</b>: reads the same both ways, like racecar."]]);

  const A14 = mk("Word origins", "🧭", [
    "<b>Etymology</b> is the study of...|where words come from|how words are spelled|how words sound",
    "<b>Telephone</b> joins Greek parts meaning <b>far</b> and <b>sound</b>. The part <b>tele</b> means...|far|loud|near",
    "<b>Biology</b>: <b>bio</b> means life and <b>logy</b> means study. So biology is the study of...|life|bones|rocks",
    "The word <b>sandwich</b> comes from...|the Earl of Sandwich|a Greek word for bread|a Latin word for sand",
    "The word <b>robot</b> comes from a Czech word meaning...|forced labor|metal|machine",
    "The word <b>algebra</b> came into English from...|Arabic|Latin|Spanish",
    "A word borrowed from another language is a...|loanword|synonym|prefix",
    "The word <b>kindergarten</b> comes from German words meaning...|children's garden|small school|play yard"],
    ["Think about the parts of the word or the story of how it started. Origins often hide in the roots.", "Etymology traces a word back through history: roots from Greek and Latin, names of people, and loanwords from other languages.", "Example: <b>thermometer</b> = Greek 'thermo' (heat) + 'meter' (measure), so it measures heat. Now do yours."],
    [["Word detectives", "🧭", "<b>Etymology</b> tells you where a word came from and how its meaning changed."], ["Where words come from", "🌍", "From Greek and Latin roots, from names (sandwich), and from other languages (algebra from Arabic, robot from Czech)."], ["Use it", "📖", "Good dictionaries give the origin. Knowing it helps you remember meaning and spelling."]]);

  const A15 = mk("Coherence between sentences", "🧵", [
    "Smooth writing often begins a sentence with ___ information.|familiar|brand-new|unrelated",
    "Repeating a key word across sentences helps because it...|keeps the topic clear|wastes space|confuses readers",
    "A sentence that does not connect to its neighbors is a gap in...|coherence|rhyme|spelling",
    "The word <b>This</b> starting a sentence works best when...|a noun follows it, like this method|nothing follows it|a comma follows it",
    "Choose the transition.<br><br><b>The river flooded. ___, the town was evacuated.</b>|As a result|For instance|Instead",
    "Choose the transition.<br><br><b>Cats sleep a lot. ___, dogs sleep less.</b>|In contrast|Therefore|Similarly",
    "Which transition introduces an example?|For instance|Nevertheless|Meanwhile",
    "Which transition adds a similar idea?|Likewise|However|Otherwise"],
    ["Think about how each sentence links to the one before it: continuing, contrasting, giving a result or an example?", "Coherence means ideas are linked. Start with what the reader knows, repeat key words, and use transitions that fit the relationship.", "Example: 'Sam trained daily. ___, he won.' The second is a result, so 'As a result' fits. Now do yours."],
    [["Thread it together", "🧵", "<b>Coherence</b> means your sentences connect, like beads on a string."], ["Old to new", "🔗", "Start with something the reader already knows, then add the new idea. Repeat key words to keep the topic clear."], ["Transitions", "🚦", "Result: <b>as a result</b>. Contrast: <b>in contrast</b>. Example: <b>for instance</b>. Addition: <b>likewise</b>."]]);

  const A16 = mk("Who or whom?", "🙋", [
    "Which is correct?<br><br><b>To ___ should I send it?</b>|whom|who|whose",
    "Which is correct?<br><br><b>___ is knocking at the door?</b>|Who|Whom|Whose",
    "Which is correct?<br><br><b>The man ___ I met was kind.</b>|whom|who|whose",
    "Which is correct?<br><br><b>The woman ___ lives next door is a pilot.</b>|who|whom|whose",
    "Which is correct?<br><br><b>Give the prize to ___ deserves it.</b>|whoever|whomever|whom",
    "Which is correct?<br><br><b>With ___ did you go to the game?</b>|whom|who|whose",
    "If you can answer a question with <b>he</b> or <b>she</b>, use...|who|whom|whose",
    "If you can answer a question with <b>him</b> or <b>her</b>, use...|whom|who|whose"],
    ["Rephrase the question as a statement and try he or him in the gap. Which one sounds right?", "Who does the action (like he or she). Whom receives the action or follows a preposition (like him or her).", "Example: <b>___ wrote the note?</b> 'He wrote it' works, so use who. Now do yours."],
    [["Subject or object", "🙋", "<b>Who</b> is a subject (he, she). <b>Whom</b> is an object (him, her)."], ["The swap test", "🔁", "Try he/him. If <b>he</b> fits, use <b>who</b>. If <b>him</b> fits, use <b>whom</b>."], ["After prepositions", "➡️", "After words like to, with, for, from: use <b>whom</b> (to whom, with whom)."]]);

  const A17 = mk("Lab reports", "🔬", [
    "Which section says what you did, step by step?|Methods|Results|Introduction",
    "Where do you present your data and measurements?|Results|Discussion|Introduction",
    "Where do you explain what the results mean?|Discussion|Methods|Results",
    "Where does the hypothesis usually go?|Introduction|Results|Methods",
    "A short summary at the very beginning of a report is the...|abstract|appendix|index",
    "Scientific writing prefers...|precise, objective language|jokes and slang|strong opinions",
    "The Methods section is written so that others can...|repeat the experiment|admire the lab|guess the results",
    "The usual order of a lab report is...|Introduction, Methods, Results, Discussion|Discussion, Results, Methods, Introduction|Results, Introduction, Discussion, Methods"],
    ["Think about the story of an experiment: why you did it, how, what happened, what it means. Which part is this?", "Lab reports follow a standard order known as IMRaD. Each section answers one question: why, how, what, so what.", "Example: a table of plant heights belongs where findings are reported, not where the steps are listed. Now do yours."],
    [["Science writing", "🔬", "A lab report tells the story of an experiment in a standard order so scientists everywhere can follow it."], ["IMRaD", "📋", "<b>I</b>ntroduction (why, hypothesis), <b>M</b>ethods (how), <b>R</b>esults (what happened), <b>D</b>iscussion (what it means)."], ["Style", "🧪", "Be precise, objective and clear. Use numbers and units, and write so someone else could repeat your steps."]]);

  const A18 = mk("Lay or lie? Set or sit?", "🛏️", [
    "Choose the word.<br><br><b>Please ___ the book on the desk.</b>|lay|lie|lain",
    "Choose the word.<br><br><b>I need to ___ down for a rest.</b>|lie|lay|laid",
    "Choose the word.<br><br><b>Yesterday I ___ down for a nap.</b>|lay|laid|lain",
    "Choose the word.<br><br><b>She ___ the keys on the table an hour ago.</b>|laid|lay|lied",
    "Choose the word.<br><br><b>The dog is ___ on the rug.</b>|lying|laying|layed",
    "Choose the word.<br><br><b>___ the vase on the shelf, please.</b>|Set|Sit|Sat",
    "Choose the word.<br><br><b>Please ___ in this chair and wait.</b>|sit|set|sat",
    "Which sentence is correct?|He laid the book down.|He laid down to rest.|He is laying in bed."],
    ["Does the verb need a thing to act on (an object), or does the subject act alone? Also check the time: now or earlier?", "Lay and set take an object (you lay something, set something). Lie and sit do not (you lie down, sit down). Remember the odd past forms: lie becomes lay.", "Example: <b>He ___ the cards on the table.</b> 'Cards' is the object, so a form of lay: 'laid'. Now do yours."],
    [["Mixed-up pairs", "🛏️", "<b>Lay</b> (put something down) and <b>lie</b> (rest) confuse almost everyone. <b>Set</b> and <b>sit</b> work the same way."], ["Object or not", "🎯", "<b>Lay / set</b> need an object: lay the book, set the vase. <b>Lie / sit</b> do not: lie down, sit down."], ["Past forms", "⏪", "lay, laid, laid. lie, lay, lain. set, set, set. sit, sat, sat."]]);

  const L22 = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18];

  // =============== LEVEL 23 ===============
  const B1 = mk("Syllogisms", "🧮", [
    "All mammals breathe air. Whales are mammals. So whales breathe air. This syllogism is...|valid|invalid|unrelated",
    "All cats are animals. Rex is an animal. So Rex is a cat. This syllogism is...|invalid|valid|proven",
    "All squares are rectangles. Shape X is a rectangle. So Shape X is a square. This is...|invalid|valid|sound",
    "No reptiles have fur. Snakes are reptiles. What follows?|Snakes have no fur.|Snakes have fur.|Only snakes are fur-free.",
    "A syllogism is built from how many premises?|two|one|four",
    "<b>All birds can fly. Penguins are birds. So penguins can fly.</b> The form is valid, but the argument is not sound because...|a premise is false|the form is broken|there is no conclusion",
    "An argument that is valid AND has true premises is called...|sound|circular|emotional",
    "<b>All dogs bark. Fido is a dog. So Fido barks.</b> In this syllogism, <b>Fido is a dog</b> is the...|minor premise|major premise|conclusion"],
    ["Picture circles inside circles. Does the conclusion have to be true if the premises are true?", "Valid means the conclusion follows from the premises by form. Sound means valid and the premises are actually true. Watch for reversing a rule: 'all A are B' does not mean 'all B are A'.", "Example: <b>All fruits have seeds. A pear is a fruit. So a pear has seeds.</b> The conclusion must follow. Now do yours."],
    [["Logic in three steps", "🧮", "A <b>syllogism</b> has two <b>premises</b> and a <b>conclusion</b>: All A are B. C is A. So C is B."], ["Valid or not", "✅", "<b>Valid</b> = the conclusion really follows. Beware the backward trap: all cats are animals does NOT mean all animals are cats."], ["Sound", "🔊", "<b>Sound</b> = valid and the premises are true. A valid argument with a false premise can still lead you astray."]]);

  const B2 = mk("Rogerian argument", "🤝", [
    "A <b>Rogerian</b> argument aims to...|find common ground|win by attacking|avoid the topic",
    "Rogerian argument is named after the psychologist...|Carl Rogers|Carl Sagan|Roger Bacon",
    "A Rogerian essay usually starts by...|describing the other side fairly|attacking critics|shouting the thesis",
    "Which tone fits a Rogerian argument?|calm and respectful|hostile|mocking",
    "<b>Common ground</b> means...|beliefs or goals both sides share|the ground floor|a dispute",
    "Which opening fits a Rogerian essay?|We all want safe streets, and we differ on how to get them.|Anyone against my plan is wrong.|Safe streets are not worth discussing.",
    "Rogerian argument works best when...|people are strongly divided|everyone already agrees|nobody cares",
    "Compared with a classic argument, a Rogerian one stresses...|understanding and compromise|defeating the opponent|ignoring evidence"],
    ["Think about the goal: to beat the other side, or to understand them and reach agreement?", "Rogerian argument builds trust. It states the other view fairly, finds shared values, and then proposes a solution that both sides might accept.", "Example: 'Both teachers and students want fair grades.' That is a shared goal that starts the conversation. Now do yours."],
    [["A calmer kind of argument", "🤝", "<b>Rogerian argument</b>, based on ideas of psychologist Carl Rogers, tries to build understanding, not win a fight."], ["The steps", "🪜", "1. Show you understand the other side. 2. Find <b>common ground</b>. 3. Offer a solution that works for both."], ["When to use it", "🌉", "It shines when people are deeply divided, because listening first makes readers open to new ideas."]]);

  const B3 = mk("Quote, paraphrase or plagiarize?", "📋", [
    "Copying a paragraph word for word without credit is...|plagiarism|paraphrasing|summarizing",
    "Changing a few words in a sentence, keeping its structure, and not citing it is...|still plagiarism|fine|a quote",
    "A good paraphrase...|restates the idea in your own words and still cites the source|copies exactly|needs no citation",
    "Exact words copied from a source must be in...|quotation marks with a citation|italics only|nothing special",
    "A summary compared with a paraphrase is usually...|shorter|longer|identical",
    "Which usually needs a citation?|a statistic from a report|the fact that the sun is a star|your own opinion",
    "Handing in a friend's essay with your name on it is...|plagiarism|collaboration|paraphrasing",
    "The best way to avoid accidental plagiarism is to...|record source details in notes and mark direct quotes|memorize everything|copy and paste then rewrite later"],
    ["Ask: whose words and whose ideas are these? Have I shown that clearly to the reader?", "You may use others' ideas if you give credit. Exact words go in quotation marks. Paraphrase means new wording AND new sentence structure, plus a citation.", "Example: copying a sentence and swapping two words is a weak paraphrase; rewrite the idea fully and cite. Now do yours."],
    [["Borrowing fairly", "📋", "<b>Plagiarism</b> means presenting someone else's words or ideas as your own. It is serious in school and work."], ["Three honest ways", "✅", "<b>Quote</b>: exact words in quotation marks. <b>Paraphrase</b>: same idea in your own words. <b>Summary</b>: a short version of the main points. All need citations."], ["Protect yourself", "🛡️", "Keep notes with source details, mark every direct quote, and cite as you write."]]);

  const B4 = mk("Personal essays", "🖋️", [
    "A personal statement is strongest when it shows who you are through...|a specific story|a list of every award|only grades",
    "Which opening is strongest for a personal essay?|a vivid moment from your life|a dictionary definition|Since the dawn of time...",
    "<b>I am a hard worker.</b> This sentence is...|telling|showing|a story",
    "<b>I woke at 5 every morning to practice, even in the cold.</b> This sentence is...|showing|telling|bragging",
    "Which is a good essay topic?|a challenge you faced and what you learned|your sibling's life story|a famous speech copied",
    "The voice of a personal essay should be...|genuine and your own|stiff and fake|copied",
    "A strong ending to a personal essay...|reflects on what the experience means|repeats the first paragraph|adds a new unrelated story",
    "Before sending an application essay you should...|proofread and ask someone you trust to read it|skip editing|leave typos for style"],
    ["Think about what a reader should remember about you. Does the sentence give a picture or just a claim?", "Personal writing works best with specific details and reflection. Show moments, then say what you learned from them.", "Example: instead of 'I am brave', write 'My hands shook, but I stepped on stage.' Now do yours."],
    [["Your story", "🖋️", "A <b>personal essay</b> or application statement shows the reader who you are through one real experience."], ["Show, don't tell", "🎬", "Telling: 'I am determined.' Showing: 'I retried the problem until midnight.' Details prove the claim."], ["Reflect", "🪞", "End by saying what the experience taught you and how it shaped who you are. Then edit carefully."]]);

  const B5 = mk("Op-eds and editorials", "📰", [
    "An <b>op-ed</b> is...|an opinion piece by a writer outside the paper's editorial board|a news report|an advertisement",
    "The name <b>op-ed</b> comes from appearing...|opposite the editorial page|on the operating desk|in open editions",
    "An <b>editorial</b> expresses...|the newspaper's own official view|one reader's rant|only facts",
    "A strong op-ed usually opens with...|a hook and a clear position|a long list of sources|a table of data",
    "Op-eds are usually...|short and focused on one main argument|long and cover everything|made of data tables",
    "A <b>letter to the editor</b> is...|a reader's short response|a job application|a news story",
    "A straight news article should be...|objective and fact-based|full of opinion|aimed to persuade",
    "Which headline suggests an opinion piece?|We Must Fix Our Roads Now|City Spends $2 Million on Road Repairs|Road Work Begins Monday"],
    ["Is the piece reporting facts, or arguing for a position? Who is speaking: a reporter, the paper, or an outside voice?", "News reports inform. Editorials give the paper's view. Op-eds give a guest writer's argument, short and sharp, often with a call to action.", "Example: 'Council Votes on Budget' reports; 'The Council Must Fund Libraries' argues. Now do yours."],
    [["News or opinion?", "📰", "A <b>news report</b> informs and stays objective. An <b>editorial</b> is the paper's opinion. An <b>op-ed</b> is a guest writer's opinion."], ["Writing an op-ed", "✍️", "Hook the reader, state your position early, back it with evidence, answer an opposing view, and end with a call to action."], ["Keep it short", "⏱️", "Op-eds focus on <b>one</b> main argument and are brief, so every sentence must earn its place."]]);

  const B6 = mk("Writing a review", "⭐", [
    "A good review judges a work using...|clear criteria|only feelings|spoilers",
    "Which is a reasoned judgment?|The pacing dragged in the middle because three scenes repeated the same joke.|It was bad.|I hated it, so it is terrible.",
    "A review should usually avoid...|spoiling key plot twists|giving an opinion|mentioning the title",
    "A review's recommendation tells readers...|who would enjoy it|the whole plot|how long it took you",
    "For a restaurant review, good criteria are...|food, service and atmosphere|the building's paint color|the owner's name",
    "Specific evidence in a review means...|mentioning scenes, lines or details|empty praise|exaggeration",
    "A fair review can include...|strengths and weaknesses|only praise|only complaints",
    "For a book review, good criteria are...|characters, plot and writing style|font size and price|the author's age"],
    ["A review is an opinion with reasons. Which choice gives reasons or sensible standards rather than just feelings?", "Strong reviews name criteria, support the judgment with specific details, stay fair, and avoid ruining surprises for the next reader.", "Example: 'The soup was cold, so the meal felt careless' is a reason. 'It was bad' is not. Now do yours."],
    [["More than 'I liked it'", "⭐", "A <b>review</b> gives a reasoned judgment of a book, film, meal or game."], ["Criteria and evidence", "📏", "Choose standards (story, acting, flavor, service). Then support each judgment with a specific detail."], ["Be fair and kind", "🤝", "Mention strengths and weaknesses, avoid spoilers, and end by saying who might enjoy it."]]);

  const B7 = mk("Critical lenses", "🔭", [
    "Reading a story by looking at the author's life is the ___ lens.|biographical|formalist|reader-response",
    "Focusing on the text itself, its language, structure and imagery, is the ___ lens.|formalist|historical|biographical",
    "Asking how the time period shaped the work is the ___ lens.|historical|formalist|reader-response",
    "Focusing on how readers react and interpret is the ___ lens.|reader-response|biographical|historical",
    "A <b>lens</b> in literary criticism is...|a way of looking at a text|a type of camera|a kind of poem",
    "A psychological lens looks at...|characters' minds and motives|maps and locations|rhyme schemes",
    "Why use more than one lens?|Each reveals different meanings|To make an essay longer|To avoid using evidence",
    "The question <b>What was happening in society when this was written?</b> belongs to the ___ lens.|historical|formalist|psychological"],
    ["Notice what the question focuses on: the author, the time, the words, the reader, or the characters' minds.", "Each critical lens is a set of questions. Biographical asks about the writer, historical about the era, formalist about the text itself, reader-response about the reader, psychological about the mind.", "Example: 'How does the poem's rhyme create tension?' looks only at the poem's craft. Now do yours."],
    [["Looking through a lens", "🔭", "A <b>critical lens</b> is a way of asking questions about a text."], ["Common lenses", "🔍", "<b>Biographical</b>: the author's life. <b>Historical</b>: the era. <b>Formalist</b>: the text's craft. <b>Reader-response</b>: the reader. <b>Psychological</b>: the mind."], ["Combine them", "🧩", "No lens shows everything. Using several leads to richer, evidence-based interpretations."]]);

  const B8 = mk("Epic conventions", "🏛️", [
    "An <b>epic</b> is...|a long narrative poem about a hero's great deeds|a short love poem|a joke poem",
    "<b>In medias res</b> means...|starting in the middle of the action|ending with a surprise|telling events in order",
    "An <b>invocation</b> in an epic is...|a call to a muse for help at the start|a battle scene|a list of ships",
    "An <b>epic simile</b> is...|a long, detailed comparison|a short comparison|a rhyme",
    "The hero of Homer's <b>Odyssey</b> is...|Odysseus|Achilles|Hector",
    "Homer's <b>Iliad</b> is mostly about...|the Trojan War|a long voyage home|the building of Rome",
    "An epic hero usually...|shows great strength and the values of his culture|is an ordinary clerk|is a villain",
    "An <b>epithet</b> like <b>swift-footed Achilles</b> is...|a repeated descriptive phrase|a plot twist|a battle cry"],
    ["Think of the big, grand stories of heroes from long ago. What features did those poems share?", "Epics are long poems with a larger-than-life hero, a formal style, help asked from a muse, repeated descriptive phrases and a start in the thick of the action.", "Example: a poem that opens with 'Sing, Muse...' uses an invocation. Now do yours."],
    [["Grand old stories", "🏛️", "An <b>epic</b> is a long poem about a hero whose deeds matter to a whole people. Homer's <b>Iliad</b> and <b>Odyssey</b> are famous examples."], ["Epic features", "⚔️", "<b>Invocation</b> of a muse, starting <b>in medias res</b> (in the middle), <b>epic similes</b>, and <b>epithets</b> like 'swift-footed'."], ["The hero", "🦸", "An epic hero shows courage and the values of his culture, and often goes on a long journey."]]);

  const B9 = mk("Stanza names", "🧱", [
    "A <b>stanza</b> is...|a group of lines in a poem, like a paragraph|a single line|a rhyme",
    "A stanza of two lines is a...|couplet|tercet|quatrain",
    "A stanza of three lines is a...|tercet|couplet|sestet",
    "A stanza of four lines is a...|quatrain|couplet|octave",
    "A stanza of six lines is a...|sestet|quatrain|octave",
    "A stanza of eight lines is an...|octave|sestet|couplet",
    "A stanza of seven lines is a...|septet|sestet|quatrain",
    "A line or group of lines repeated in a poem is a...|refrain|couplet|stanza"],
    ["Count the lines. The name often comes from a number prefix.", "Stanza names follow numbers: couplet (two), tercet (three), quatrain (four), sestet (six), septet (seven), octave (eight). Quatr- hints at four, oct- at eight.", "Example: five-line stanzas are called quintains (or cinquains), from the number five. Now do yours."],
    [["Poem paragraphs", "🧱", "A <b>stanza</b> is a group of lines set apart by a space."], ["Number names", "🔢", "<b>Couplet</b> 2, <b>tercet</b> 3, <b>quatrain</b> 4, <b>sestet</b> 6, <b>septet</b> 7, <b>octave</b> 8."], ["Repeating", "🔁", "A <b>refrain</b> is a line or group of lines that returns, like the chorus of a song."]]);

  const B10 = mk("Assonance, consonance, sibilance", "🔊", [
    "<b>Mike likes biking</b> repeats the long <b>i</b> sound inside words. This is...|assonance|consonance|sibilance",
    "<b>Struck, black, clock</b> repeats the <b>k</b> sound at the ends. This is...|consonance|assonance|alliteration",
    "<b>The snake slid silently</b> repeats <b>s</b> sounds. This hissing effect is...|sibilance|assonance|meter",
    "<b>Alliteration</b> repeats...|consonant sounds at the start of words|vowel sounds only|whole lines",
    "<b>Assonance</b> repeats...|vowel sounds|only the first letter|rhyming endings",
    "<b>Consonance</b> repeats...|consonant sounds anywhere in nearby words|vowel sounds|whole words",
    "Soft <b>s</b> and <b>sh</b> sounds, as in <b>the sea sighs softly</b>, often create...|a calm, hushed feeling|a loud crash|a chaotic mood",
    "<b>The rain in Spain stays mainly in the plain</b> repeats the long <b>a</b>. This is...|assonance|sibilance|consonance"],
    ["Say the line aloud. Which kind of sound repeats: a vowel or a consonant, at the start or inside?", "Alliteration: same starting consonant sounds. Assonance: repeated vowel sounds. Consonance: repeated consonant sounds anywhere. Sibilance: s and sh sounds.", "Example: <b>fleet feet sweep</b> repeats the long e vowel sound, so that is assonance. Now do yours."],
    [["Music of words", "🔊", "Poets repeat sounds to create music and mood."], ["Four tools", "🎶", "<b>Alliteration</b>: starting consonants. <b>Assonance</b>: vowels. <b>Consonance</b>: consonants anywhere. <b>Sibilance</b>: hissing s/sh."], ["Effect", "🌊", "Soft sounds can calm; hard sounds like k and t can feel sharp. Ask what mood the sound makes."]]);

  const B11 = mk("Writing about data", "📈", [
    "A rate rises from 10% to 15%. By how many percentage points did it rise?|5|50|15",
    "A rate rises from 10% to 15%. What is the percent increase?|50%|5%|15%",
    "A rate rises from 20% to 30%. By how many percentage points did it rise?|10|50|30",
    "A rate falls from 40% to 20%. By how many percentage points did it fall?|20|50|60",
    "A rate falls from 40% to 20%. What is the percent decrease?|50%|20%|100%",
    "The <b>median</b> of a set of numbers is...|the middle value|the average|the most common value",
    "The <b>mean</b> of a set of numbers is...|the average|the middle value|the largest value",
    "The statement <b>sales doubled</b> means they increased by...|100 percent|50 percent|200 percent"],
    ["Compare the two numbers carefully. Are you asked about the plain difference or how large the change is compared with the start?", "A percentage-point change is the plain subtraction of two percents. A percent change compares the change with the starting amount: change divided by the start.", "Example: from 50% to 60% is 10 percentage points, but a 20 percent increase (10 divided by 50). Now do yours."],
    [["Percent traps", "📈", "<b>Percentage points</b> are the simple difference between two percents. A <b>percent change</b> is relative to the starting value."], ["Two ways to say it", "🗣️", "10% to 15% is up <b>5 percentage points</b> and also up <b>50 percent</b> (5 divided by 10). Be clear which you mean."], ["Averages", "📊", "<b>Mean</b>: add up and divide. <b>Median</b>: the middle. <b>Mode</b>: the most common. Name the one you use."]]);

  const B12 = mk("More capitalization rules", "🔠", [
    "In <b>We drove south to the lake</b>, should <b>south</b> be capitalized?|No, it is just a direction|Yes, it is a name|Yes, always",
    "In <b>She grew up in the South</b>, should <b>South</b> be capitalized?|Yes, it names a region|No, never|Only in poems",
    "In <b>My favorite season is spring</b>, should <b>spring</b> be capitalized?|No, seasons are lowercase|Yes, seasons are names|Yes, it ends the sentence",
    "In <b>I asked Mom for help</b>, why is <b>Mom</b> capitalized?|It is used as a name|It is a long word|It starts a clause",
    "In <b>I asked Mom, and my mom said yes</b>, why is the second <b>mom</b> lowercase?|The word my makes it a common noun|It is less important|It is a mistake",
    "Should <b>Civil War</b> be capitalized in <b>The Civil War ended in 1865</b>?|Yes, it names a historical event|No, never|Only the word War",
    "In <b>She studies Spanish and math</b>, why is only <b>Spanish</b> capitalized?|Languages are capitalized but school subjects are not|Spanish is longer|Math is a verb",
    "In <b>Mayor Cruz met the mayor of Austin</b>, why is only the first <b>Mayor</b> capitalized?|A title before a name is capitalized; used alone it is not|The first one is a city|Mayors are always capitalized"],
    ["Ask: is this the specific name of a particular person, place, event or language, or a general word?", "Capitalize specific names, titles used with names, languages, nationalities, regions as places and historical events. Keep general nouns, seasons, directions and school subjects lowercase.", "Example: <b>We visited Dr. Park, our dentist.</b> The title goes with the name, but 'dentist' is general. Now do yours."],
    [["Capital or not?", "🔠", "Capitals mark <b>specific</b> names: Aunt Rosa, Lake Erie, the Civil War, Spanish."], ["Stay lowercase", "🔡", "General words: seasons (spring), compass directions (go north), school subjects (math, biology), and titles used alone (the mayor)."], ["Tricky ones", "⚠️", "<b>The South</b> as a region is capitalized, but <b>drive south</b> is not. Family words are capital only when used as a name: <b>Mom</b> called, my <b>mom</b> called."]]);

  const B13 = mk("Interviews and primary sources", "🎙️", [
    "A good interview question is usually...|open-ended, so the person can explain|answered with yes or no|designed to trap them",
    "Which question is open-ended?|What was the hardest part of the project?|Was the project hard?|Did you like it?",
    "Before an interview you should...|research the person and prepare questions|memorize the answers|do nothing",
    "To quote someone accurately you should...|record or write their exact words (with permission)|guess what they said|rewrite it and call it a quote",
    "A <b>leading question</b>...|pushes the person toward a certain answer|asks for facts only|has no verb",
    "A <b>primary source</b> is...|firsthand evidence, like an interview or diary|a textbook summary|an encyclopedia",
    "After an interview, a polite step is to...|thank the person and check quotes if needed|ignore them|post it without telling them",
    "Asking permission before recording someone...|shows respect and is the right thing to do|wastes time|is never needed"],
    ["Think about which kind of question gets the person to tell you more, and which ones shut the conversation down.", "Open questions begin with how, why or what. Leading questions steer. Primary sources are firsthand; always be accurate and polite.", "Example: 'How did you start your garden?' invites a story, while 'Do you like gardens?' invites one word. Now do yours."],
    [["Asking well", "🎙️", "An <b>interview</b> is a primary source: you collect firsthand information from a person."], ["Better questions", "❓", "Ask <b>open-ended</b> questions (how, why, what). Avoid <b>leading</b> questions that put words in their mouth."], ["Be accurate and kind", "🤝", "Research first, ask permission to record, quote exactly, and say thank you."]]);

  const B14 = mk("Writing for different media", "📣", [
    "A <b>press release</b> is...|an announcement sent to news media|a poem|an essay",
    "In news writing, the most important facts go...|first, in the inverted pyramid|last|in the middle",
    "A press release usually answers...|who, what, when, where and why|only what you feel|how to rhyme",
    "Social media posts work best when they are...|short, clear and aimed at the audience|long essays|private diaries",
    "The tone of a blog post is often...|conversational but organized|legal and stiff|angry",
    "The <b>inverted pyramid</b> means...|big facts first, then smaller details|small details first|an upside-down picture",
    "A headline for a press release should...|state the news clearly|tease vaguely|tell a joke",
    "Before posting online, you should...|think about who might see it and how it reflects on you|post as fast as possible|share your personal details"],
    ["Think about who reads this kind of writing and how much time they have. What should come first?", "Each medium has its own style. News and press releases put key facts first and stay objective. Blogs are friendlier. Social posts are brief and public.", "Example: a press release about a school fair opens with what, when and where, not with a long story. Now do yours."],
    [["Different places, different style", "📣", "A text, a blog, a press release and a news story each need a different voice and shape."], ["Top-heavy news", "🔺", "News and press releases use the <b>inverted pyramid</b>: the biggest facts first, extra details after."], ["Think before you post", "🛑", "Online writing can be seen by many. Keep it clear, kind and free of private information."]]);

  const B15 = mk("Zeugma, bathos and friends", "🎭", [
    "<b>She lost her keys and her temper.</b> This figure is...|zeugma|simile|alliteration",
    "<b>He took his hat and his leave.</b> This figure is...|zeugma|bathos|oxymoron",
    "<b>The sky wept as she said goodbye.</b> Weather matching her mood is...|pathetic fallacy|zeugma|bathos",
    "<b>Bathos</b> is...|a sudden drop from the grand to the silly|a rise to something noble|a rhyme",
    "<b>He faced death, the dragon, and a parking ticket.</b> The last item creates...|bathos|zeugma|assonance",
    "<b>Pathetic fallacy</b> gives human feelings to...|nature or weather|a character's mind|a rhyme",
    "A <b>zeugma</b> uses one verb with...|two or more words, often in different senses|one noun only|no verb at all",
    "<b>Powerful you have become</b> uses unusual word order. This is called...|hyperbaton|zeugma|bathos"],
    ["Look at the way one word links to several, or how a grand moment turns silly, or how weather mirrors a mood.", "Zeugma: one word (usually a verb) governs two others in different ways. Bathos: a drop from serious to silly. Pathetic fallacy: nature mirrors feelings. Hyperbaton: unusual order.", "Example: <b>She broke his car and his heart.</b> One verb, two senses: that is a zeugma. Now do yours."],
    [["Rare figures", "🎭", "Besides simile and metaphor, writers use more unusual figures of speech."], ["Zeugma and bathos", "🪄", "<b>Zeugma</b>: one verb serves two ideas (lost her keys and her temper). <b>Bathos</b>: a sudden fall from grand to silly."], ["Mood and order", "🌧️", "<b>Pathetic fallacy</b>: weather mirrors feeling. <b>Hyperbaton</b>: reversed word order, like Yoda's speech."]]);

  const B16 = mk("Annotated bibliographies", "🗂️", [
    "An <b>annotated bibliography</b> follows each source with...|a short summary and evaluation|only the title|a full copy",
    "An annotation should answer...|what the source says and how useful it is|what the author ate|how long it took to read",
    "Sources in a bibliography are usually arranged...|alphabetically by the author's last name|by length|by color",
    "Which part of an annotation evaluates the source?|The author is a long-time researcher, so the data seem reliable.|The article covers three experiments.|The report has 20 pages.",
    "Why make an annotated bibliography?|To track and judge your sources|To decorate a paper|To avoid reading",
    "An annotation is usually...|a short paragraph|a whole chapter|a single word",
    "Which belongs in an annotation?|credibility and usefulness|favorite color|the price of the book",
    "An annotation should NOT be...|a copy of the source's abstract|written in your own words|specific"],
    ["Think about the two jobs of an annotation: telling what the source says and judging how good and useful it is.", "Annotations are brief paragraphs that summarize the source, evaluate its trustworthiness, and say how it helps your project. Use your own words.", "Example: 'This government report provides recent figures, making it ideal for my section on trends.' That evaluates and links to the project. Now do yours."],
    [["Notes on your sources", "🗂️", "An <b>annotated bibliography</b> lists sources and adds a short note about each one."], ["Three parts", "🧩", "<b>Summary</b> (what it says), <b>evaluation</b> (is it reliable?), <b>use</b> (how it helps your project)."], ["Keep it tidy", "📚", "Alphabetical order, correct citation format, and your own words, never copied from the source."]]);

  const B17 = mk("The turn: volta", "↩️", [
    "A <b>volta</b> is...|a turn in thought or tone, often in a poem|a type of rhyme|a kind of stanza",
    "In a Petrarchan sonnet the volta often comes...|after the octave|at the very first line|never",
    "In a Shakespearean sonnet the volta often comes...|before the final couplet|at line one|in the title",
    "Which words often signal a turn?|But, yet, however|And, also, then|First, next, last",
    "A shift in tone from joyful to sad suggests...|a turn in the speaker's feeling|a rhyme mistake|a new stanza name",
    "Why notice the turn in a poem?|It often carries the main message|It is only decoration|It never matters",
    "<b>I thought it would be easy. But it wasn't.</b> The turn word is...|But|thought|easy",
    "<b>Volta</b> is Italian for...|turn|rhyme|line"],
    ["Look for the spot where the speaker changes direction: a new idea, mood or answer.", "A volta is a pivot. Look for contrast words (but, yet, still) and for a change in tone. In sonnets it usually falls near line 9 or near the final couplet.", "Example: 'The night was dark; yet a single star shone.' The word 'yet' is the pivot. Now do yours."],
    [["The pivot", "↩️", "A <b>volta</b> (Italian for 'turn') is where a poem or speech shifts in thought, tone or argument."], ["Where to look", "🔎", "Petrarchan sonnet: after the 8-line octave. Shakespearean sonnet: often before the closing couplet. Also watch for <b>but, yet, however</b>."], ["Why it matters", "💡", "The turn usually carries the main insight. After finding it, ask what changed and why."]]);

  const B18 = mk("Synthesizing sources", "🧬", [
    "<b>Synthesis</b> means...|combining ideas from several sources into your own point|summarizing one source|copying a source",
    "In a synthesis, you should group sources by...|idea|the order you found them|their length",
    "A synthesis paragraph often...|connects what two or more sources say|uses a single source|has no sources",
    "Which sentence shows agreement between sources?|Similarly, both authors argue that sleep improves memory.|In contrast, Source A is longer.|My opinion is that sleep is nice.",
    "Which sentence shows disagreement?|Whereas Lee blames cost, Ortiz blames timing.|Both authors agree.|Lee and Ortiz wrote articles.",
    "Your voice in a synthesis...|stays in control with your own claim|disappears into the sources|is not allowed",
    "Why is synthesis valuable?|It builds new understanding from many viewpoints|It saves words|It avoids reading",
    "Each source you use in a synthesis must be...|cited|hidden|copied entirely"],
    ["Ask: is the writer just listing what each source said, or linking the sources to make a point?", "Synthesis groups sources by idea, shows how they agree or disagree, and uses them to support your own claim, while citing each one.", "Example: 'Both Park and Diaz found that exercise improves mood' links two sources into one point. Now do yours."],
    [["More than one voice", "🧬", "<b>Synthesis</b> means weaving ideas from several sources into one clear point of your own."], ["Build conversations", "💬", "Show where sources agree (<b>similarly</b>), disagree (<b>whereas</b>), or build on each other."], ["You lead", "🧭", "Your claim comes first. Sources support it. Cite every one."]]);

  const L23 = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, B16, B17, B18];

  // =============== LEVEL 24 ===============
  const C1 = mk("SOAPSTone", "🧼", [
    "In SOAPSTone, the letter <b>A</b> stands for...|Audience|Argument|Author",
    "In SOAPSTone, the letter <b>O</b> stands for...|Occasion|Opinion|Order",
    "In SOAPSTone, the letter <b>P</b> stands for...|Purpose|Persuasion|Point",
    "In SOAPSTone, the <b>Speaker</b> is...|the voice telling the text|what the text is about|the attitude of the writer",
    "In SOAPSTone, the <b>Occasion</b> is...|the time and event that prompted the text|the people reading it|the writer's feeling",
    "In SOAPSTone, the <b>Tone</b> is...|the speaker's attitude toward the subject|the topic|the readers",
    "What the text is mostly about is its...|Subject|Speaker|Purpose",
    "SOAPSTone is a tool for...|analyzing a text|memorizing facts|checking spelling"],
    ["SOAPSTone is a checklist of questions you ask about a text. Which question does this one answer?", "The letters are: Speaker, Occasion, Audience, Purpose, Subject, Tone. Match the description to the letter's word.", "Example: 'Why did the writer create this?' is the question for the P: Purpose. Now do yours."],
    [["Six questions", "🧼", "<b>SOAPSTone</b> helps you analyze any speech, essay or letter."], ["The letters", "🔤", "<b>S</b>peaker, <b>O</b>ccasion, <b>A</b>udience, <b>P</b>urpose, <b>S</b>ubject, <b>Tone</b>."], ["Use it", "🔎", "Ask each question as you read. Together the answers show how and why the text was shaped."]]);

  const C2 = mk("Unstated assumptions", "🧱", [
    "An <b>assumption</b> in an argument is...|an unstated belief the argument depends on|a proven fact|the conclusion",
    "<b>We should ban cars downtown because they make noise.</b> This assumes...|that the noise is a problem worth stopping|that cars are red|that everyone drives",
    "<b>She got an A, so she must have studied hard.</b> This assumes...|that grades come mainly from studying|that she is tall|that tests are hard",
    "<b>Everyone should buy this phone; it is the newest.</b> This assumes...|that newer is better|that phones are cheap|that nobody has one",
    "<b>The test must have been easy because everyone passed.</b> This assumes...|that passing means the test was easy|that tests are long|that nobody studied",
    "Finding assumptions helps you...|test whether an argument really holds|make it longer|avoid reading",
    "If a hidden assumption is false, the argument is...|weakened|stronger|unchanged",
    "<b>The shop is empty, so the food must be bad.</b> This assumes...|that crowds show quality|that the shop is large|that food is free"],
    ["Ask: what must also be true for the conclusion to follow? The answer is the hidden idea.", "An assumption is a bridge between the reason and the conclusion that the writer never states. If the bridge is shaky, the argument is shaky.", "Example: 'It is sunny, so we should go to the park' assumes that sunshine makes the park a good idea. Now do yours."],
    [["The hidden bridge", "🧱", "An <b>assumption</b> is a belief an argument needs but does not say out loud."], ["Find it", "🔦", "Ask: 'What would have to be true for this reason to prove this conclusion?'"], ["Test it", "🧪", "If the assumption is wrong or unproven, the whole argument can fall down."]]);

  const C3 = mk("Necessary or sufficient?", "🔑", [
    "A ticket is needed to enter, but alone does not guarantee entry. The ticket is...|necessary but not sufficient|sufficient but not necessary|both necessary and sufficient",
    "Being a dog is enough to be an animal, but you can be an animal without being a dog. Being a dog is...|sufficient but not necessary|necessary but not sufficient|both necessary and sufficient",
    "Water is needed for plants to grow, but water alone is not enough. Water is...|necessary but not sufficient|sufficient but not necessary|both necessary and sufficient",
    "Having four sides is ___ for being a square.|necessary but not sufficient|sufficient but not necessary|both necessary and sufficient",
    "Being divisible by 4 is ___ for a number to be even.|sufficient but not necessary|necessary but not sufficient|both necessary and sufficient",
    "<b>If it rains, the ground gets wet.</b> Rain is ___ for a wet ground.|sufficient but not necessary|necessary but not sufficient|both necessary and sufficient",
    "The phrase <b>if and only if</b> signals a condition that is...|both necessary and sufficient|only sufficient|only necessary",
    "Being a prime number is ___ for being greater than 1.|sufficient but not necessary|necessary but not sufficient|both necessary and sufficient"],
    ["Ask two questions. Can it happen without this condition? Does this condition guarantee the result?", "Necessary means the result cannot happen without it. Sufficient means it alone guarantees the result. A condition can be one, both or neither.", "Example: Being a mother is sufficient for being a parent, but not necessary (a father is a parent too). Now do yours."],
    [["Two kinds of conditions", "🔑", "<b>Necessary</b>: you cannot get the result without it. <b>Sufficient</b>: with it, the result is guaranteed."], ["Check both", "🔍", "Without it, can the result still happen? If not, it is necessary. With it, must the result happen? If so, it is sufficient."], ["Both or neither", "⚖️", "<b>If and only if</b> means both. Arguments often go wrong by treating a necessary condition as sufficient."]]);

  const C4 = mk("Timed essay strategy", "⏱️", [
    "The first step with a timed essay prompt is to...|read it and underline the key words|start writing right away|copy it out",
    "A few minutes of planning before writing...|organizes ideas and saves time|wastes time|is cheating",
    "If time is almost up, you should...|wrap up with a brief conclusion|stop mid-sentence|start a new big point",
    "Where does your thesis usually go?|in the introduction|only in the conclusion|nowhere",
    "The best use of the last minute or two is to...|proofread quickly|rewrite everything|add a new paragraph",
    "If you cannot recall a quotation exactly, you should...|paraphrase it accurately|invent a quote|skip evidence entirely",
    "A prompt word like <b>analyze</b> asks you to...|break down and explain how the parts work|retell the story|list facts",
    "A prompt word like <b>compare</b> asks you to...|show similarities and differences|choose a favorite|summarize one item"],
    ["Think about how to spend limited time wisely: reading the prompt, planning, writing, checking.", "Under time pressure, read the task words carefully, make a short outline, state your thesis early, use specific evidence and leave time to finish.", "Example: with 40 minutes, spend about 5 planning, 30 writing and 5 reviewing. Now do yours."],
    [["Beat the clock", "⏱️", "A timed essay rewards a clear plan more than speed."], ["Plan first", "🗺️", "Underline task words (analyze, compare, argue), jot a short outline, and write your thesis."], ["Finish well", "🏁", "Always write a conclusion, even a short one, and save a minute to proofread."]]);

  const C5 = mk("Intertextuality", "🔗", [
    "<b>Intertextuality</b> means...|connections between one text and others|a spelling rule|a poem type",
    "A story that retells Cinderella in outer space is a...|retelling or adaptation|dictionary|lab report",
    "A song lyric that mentions Romeo and Juliet to suggest tragic love uses...|an allusion|a lab report|a rhyme scheme",
    "Turning a novel into a film is an...|adaptation|abstract|index",
    "A <b>parody</b>...|imitates a work in order to make fun of it|copies a work exactly|summarizes a work",
    "A <b>pastiche</b> is a work that...|imitates the style of other works|rhymes|has no style",
    "Why do writers refer to older stories?|It adds layers of meaning for readers who recognize them|It makes the text shorter|It avoids having a theme",
    "A poem whose title is borrowed from a line by Shakespeare shows...|intertextuality|a lab report|bad spelling"],
    ["Think about how a new work talks to older works. What is the connection?", "Texts do not appear in a vacuum. Writers echo, retell, mock or honor earlier works, and readers who spot the link get extra meaning.", "Example: a movie that copies the plot of Robin Hood but moves it to a city is an adaptation. Now do yours."],
    [["Texts that talk", "🔗", "<b>Intertextuality</b> means a text connects to other texts through echoes, references or retellings."], ["Ways to connect", "🔄", "<b>Allusion</b> (a quick reference), <b>adaptation</b> (changing the medium), <b>parody</b> (mocking imitation), <b>pastiche</b> (imitating a style)."], ["Why it matters", "💡", "Recognizing the link adds layers: you compare the new work with the old and see what changed."]]);

  const C6 = mk("Modernist and postmodern writing", "🧩", [
    "Modernist writers often used...|fragmentation and stream of consciousness|strict rhyme only|simple morals",
    "<b>Stream of consciousness</b> shows...|a character's thoughts as they flow|a list of events|a news report",
    "<b>Metafiction</b> is...|fiction that points out it is fiction|a true story|a science report",
    "<b>Fragmentation</b> in a text means...|a broken, non-linear structure|perfect order|rhyming lines",
    "Postmodern works often...|play with form and blur real and fictional|follow the strictest rules|avoid all humor",
    "Which writer is famous for stream of consciousness in <b>Mrs Dalloway</b>?|Virginia Woolf|Jane Austen|Charles Dickens",
    "James Joyce's <b>Ulysses</b> is a...|modernist novel|medieval epic|fairy tale",
    "Modernism emerged mainly in the...|early 20th century|1400s|2010s"],
    ["Think about how these writers broke from old, tidy storytelling. What did they do with structure and thought?", "Modernists mirrored a changing world with fragmented structure and inner thoughts. Postmodern writers went further, playing with the idea of storytelling itself.", "Example: a novel that is one character's thoughts wandering through a single day uses stream of consciousness. Now do yours."],
    [["Breaking the pattern", "🧩", "In the early 1900s, <b>modernist</b> writers broke from traditional, tidy plots."], ["Modernist tools", "🌀", "<b>Fragmentation</b> (broken, jumpy structure) and <b>stream of consciousness</b> (thoughts flowing as they come)."], ["Postmodern play", "🎲", "<b>Postmodern</b> writers play with form: <b>metafiction</b> reminds you the story is a story."]]);

  const C7 = mk("Metrical feet", "👣", [
    "A <b>trochee</b> is a foot with...|a stressed then an unstressed beat (DUM-da)|an unstressed then a stressed beat|two stressed beats",
    "A <b>dactyl</b> is a foot with...|one stressed and two unstressed beats (DUM-da-da)|two unstressed and one stressed beat|two stressed beats",
    "An <b>anapest</b> is a foot with...|two unstressed beats then a stressed beat (da-da-DUM)|one stressed and two unstressed|two stressed beats",
    "A <b>spondee</b> is a foot with...|two stressed beats|two unstressed beats|three beats",
    "Which word is a trochee (DUM-da)?|garden|today|beyond",
    "Which word is a dactyl (DUM-da-da)?|beautiful|today|garden",
    "Which word is an anapest (da-da-DUM)?|understand|beautiful|garden",
    "The rhythm of <b>'Twas the night before Christmas</b> is mostly...|anapestic|iambic|trochaic"],
    ["Say the word aloud and tap the strong syllable. How many beats come before and after it?", "Feet are named by their pattern: iamb da-DUM, trochee DUM-da, dactyl DUM-da-da, anapest da-da-DUM, spondee DUM-DUM.", "Example: <b>happily</b> sounds like HAP-pi-ly, DUM-da-da, so it is a dactyl. Now do yours."],
    [["Beyond the iamb", "👣", "Besides the iamb (da-DUM), poems use other <b>feet</b>."], ["The family", "👨‍👩‍👧", "<b>Trochee</b> DUM-da. <b>Dactyl</b> DUM-da-da. <b>Anapest</b> da-da-DUM. <b>Spondee</b> DUM-DUM."], ["Feel the rhythm", "🎵", "Anapests gallop (Twas the night before Christmas); trochees march. The rhythm shapes the mood."]]);

  const C8 = mk("Summarizing paragraph by paragraph", "📝", [
    "A <b>précis</b> is...|a concise summary in your own words|a long quotation|a rhyme",
    "To summarize a paragraph, first find its...|main idea|longest word|last comma",
    "A good summary should not include...|your own opinion|the main points|the author's name",
    "Compared with the original, a summary is...|much shorter|longer|exactly the same",
    "A topic sentence helps you summarize because it...|usually states the main idea|always ends the paragraph|has no meaning",
    "A summary should keep the author's main points...|in order|in a mixed-up order|out of the text",
    "A summary should be written...|in your own words|by copying sentences|with long quotes",
    "Examples and statistics in a paragraph are usually...|supporting details|the main idea|titles"],
    ["Ask: if I could keep only one sentence from this paragraph, what would it say?", "Summarizing means keeping the main idea and the key supporting points, dropping small details, and using your own words without adding opinion.", "Example: a paragraph full of facts about bees pollinating crops could be summarized as 'Bees help crops grow by pollinating.' Now do yours."],
    [["Short and faithful", "📝", "A <b>summary</b> (or <b>précis</b>) states the main points briefly and fairly."], ["Steps", "🪜", "Read, find the main idea of each paragraph, note key support, and put it in your own words."], ["Stay neutral", "⚖️", "A summary tells what the author said, not what you think about it."]]);

  const C9 = mk("Whose voice is missing?", "👥", [
    "<b>Perspective</b> means...|the point of view from which something is told|the length of a text|a type of rhyme",
    "A history told only by the people who won a conflict may leave out...|other perspectives|all dates|every name",
    "Reading to ask whose view is left out helps you...|see a fuller picture|read faster|ignore evidence",
    "A story told by a single narrator is...|limited to that narrator's view|always complete|always false",
    "To check for missing voices, you can...|read sources from different viewpoints|read one source twice|skip sources",
    "A school described by a teacher will likely differ from one described by a...|student|map|clock",
    "<b>Bias by omission</b> means...|leaving out information that would change the story|adding too many facts|using humor",
    "Primary sources from several different people give...|a fuller picture|a shorter story|fewer details"],
    ["Ask: who is telling this, and who is not? What would they tell us if they spoke?", "Every account has a point of view. Looking for the voices that are missing reveals gaps, and comparing several perspectives gives a fuller, fairer picture.", "Example: a story about a storm told only by the captain does not show what the passengers felt. Now do yours."],
    [["Every story has a teller", "👥", "<b>Perspective</b> is the point of view that shapes what we are told."], ["Look for gaps", "🕳️", "Ask: who is speaking? Who is silent? What might they add?"], ["Fuller picture", "🧩", "Compare accounts from several people. Leaving out key viewpoints is called <b>bias by omission</b>."]]);

  const C10 = mk("Samples and surveys", "📋", [
    "A <b>sample</b> is...|a part of a group chosen to study|the whole group|a single guess",
    "A <b>population</b> is...|the whole group being studied|a small sample|a survey question",
    "A larger random sample generally gives...|more reliable results|less reliable results|no results",
    "A <b>random sample</b> means...|everyone in the group has a chance of being chosen|only friends are picked|only volunteers answer",
    "A survey about exercise that asks only people leaving a gym has a...|biased sample|perfect sample|random sample",
    "<b>Don't you agree our wonderful school deserves more money?</b> is a...|loaded question|neutral question|fact",
    "A poll of only 10 people is likely...|too small to generalize|huge|always right",
    "The <b>margin of error</b> shows...|how much results might vary|who wrote the survey|the price of the poll"],
    ["Think about who was asked and how the question was worded. Could either one push the answers?", "Good surveys use a large enough random sample from the whole population and ask neutral questions. Biased samples or loaded wording weaken the results.", "Example: asking only people at a pet store whether they like animals gives a biased sample. Now do yours."],
    [["Can we trust the poll?", "📋", "A <b>sample</b> is a small group used to learn about a larger <b>population</b>."], ["Good samples", "🎲", "Large and <b>random</b> beats small and hand-picked. Samples that leave out groups are <b>biased</b>."], ["Good questions", "❓", "Neutral wording matters. A <b>loaded question</b> pushes people toward an answer."]]);

  const C11 = mk("Rhetorical modes", "🎨", [
    "Telling a story about your first day at school is...|narration|exposition|argumentation",
    "Painting a vivid picture of a beach with sights and sounds is...|description|exposition|narration",
    "Explaining how a battery works is...|exposition|narration|description",
    "Persuading a council to build a new park is...|argumentation|description|narration",
    "<b>Exposition</b> means writing that...|explains or informs|tells a fantasy|rhymes",
    "<b>Argumentation</b> aims to...|persuade the reader with reasons|entertain only|describe scents",
    "A recipe or how-to guide is mostly...|exposition|narration|argumentation",
    "Many essays and books...|mix several modes|use only one mode|use none"],
    ["Ask what the writing is mainly trying to do: tell a story, paint a picture, explain, or persuade?", "The four classic modes are narration (a story), description (sensory details), exposition (explaining) and argumentation (persuading).", "Example: a paragraph describing the smell of a bakery is description. Now do yours."],
    [["Four purposes", "🎨", "Writers use four classic <b>modes</b>: narration, description, exposition and argumentation."], ["What each does", "🛠️", "<b>Narration</b> tells a story. <b>Description</b> paints with the senses. <b>Exposition</b> explains. <b>Argumentation</b> persuades."], ["Blend them", "🥣", "Real writing mixes modes. A strong essay may tell a story to support an argument."]]);

  const C12 = mk("Precise analysis verbs", "🔬", [
    "The poet ___ loneliness through bare, empty images. Best verb:|conveys|has|goes",
    "The narrator's silence ___ guilt without stating it. Best verb:|implies|likes|owns",
    "A second source ___ this claim by offering opposite evidence. Best verb:|contradicts|shows|has",
    "A story about a lost key ___ the idea that small things matter. Best verb:|illustrates|jumps|holds",
    "A weak example ___ the writer's argument. Best verb:|undermines|builds|decorates",
    "The author states a claim without proof; she ___ it. Best verb:|asserts|measures|proves",
    "The reader ___ meaning from clues in the text. Best verb:|infers|implies|asserts",
    "The repeated word ___ the speaker's anger by giving it extra weight. Best verb:|emphasizes|ignores|avoids"],
    ["Replace the dull verb with one that says exactly what the writer or text is doing. Which choice fits the action?", "Precise verbs show relationships: conveys (communicates), implies (suggests indirectly), contradicts (goes against), illustrates (shows by example), undermines (weakens), asserts (claims), infers (concludes from clues), emphasizes (stresses).", "Example: 'The graph ___ the claim by showing the numbers' fits 'supports'. Now do yours."],
    [["Verbs that analyze", "🔬", "Words like <b>says</b> and <b>shows</b> are weak in analysis. Precise verbs make your thinking clearer."], ["A toolbox", "🧰", "<b>Conveys, implies, illustrates, emphasizes, asserts, contradicts, undermines.</b>"], ["Writer vs reader", "↔️", "A writer <b>implies</b> (suggests). A reader <b>infers</b> (works it out from clues)."]]);

  const C13 = mk("Latin phrases in English", "🏺", [
    "What does <b>ad hoc</b> mean?|for a specific purpose|forever|for everyone",
    "What does <b>per se</b> mean?|by itself|for money|over again",
    "What does <b>et al.</b> mean?|and others|and so on|the end",
    "What does <b>status quo</b> mean?|the current state of things|a high rank|a quiet place",
    "What does <b>bona fide</b> mean?|genuine|expensive|ancient",
    "What does <b>vice versa</b> mean?|the other way around|very good|in the same way",
    "What does <b>quid pro quo</b> mean?|something given in exchange for something|a secret|a question",
    "What does <b>ad nauseam</b> mean?|repeated to a tiresome degree|in a hurry|very softly"],
    ["These phrases come from Latin but are used in English. Think of where you have seen them and what they do.", "Latin phrases are used as short, formal labels. Use them correctly or not at all: if a plain English phrase works, many readers will prefer it.", "Example: <b>ad lib</b> means to improvise, as when an actor invents a line. Now do yours."],
    [["Latin lives on", "🏺", "English borrowed many Latin phrases that still appear in essays, law and news."], ["A few to know", "📜", "<b>ad hoc</b> (for this purpose), <b>per se</b> (by itself), <b>et al.</b> (and others), <b>status quo</b> (the way things are)."], ["More", "➕", "<b>bona fide</b> (genuine), <b>vice versa</b> (the other way around), <b>quid pro quo</b> (a trade)."]]);

  const C14 = mk("Reading the fine print", "🔎", [
    "A <b>clause</b> in a contract is...|a section covering one point|a type of pet|the title",
    "<b>Terms and conditions</b> are...|the rules you agree to when using a service|a recipe|a joke",
    "In legal writing, <b>shall</b> usually means...|must|might|never",
    "<b>Void</b> means...|having no legal effect|very large|fully paid",
    "<b>Liable</b> means...|legally responsible|friendly|late",
    "<b>Terminate</b> means...|end|start|repeat",
    "A <b>party</b> in a contract is...|a person or group involved in the agreement|a celebration|a rule",
    "Before agreeing to long terms and conditions, you should...|read them and ask a trusted adult if unsure|click without reading|share your passwords"],
    ["Legal writing is full of special words. Think about the plain-English meaning of each term.", "Contracts and terms of use use formal words with exact meanings. Reading carefully and translating them into plain language protects you.", "Example: 'The tenant shall pay rent by the first' means 'must pay'. Now do yours."],
    [["Why read the fine print?", "🔎", "Contracts and terms of service explain the rules you agree to, including costs and limits."], ["Legal words", "⚖️", "<b>Party</b> (person involved), <b>clause</b> (a section), <b>shall</b> (must), <b>liable</b> (responsible), <b>void</b> (no legal effect), <b>terminate</b> (end)."], ["Be careful", "🛡️", "Translate hard parts into plain words, and ask a trusted adult before agreeing to anything big."]]);

  const C15 = mk("Free indirect discourse", "🧠", [
    "Which uses free indirect discourse?|Maria stared at the clock. Surely it was time to go by now?|Maria said, 'Is it time to go?'|Maria asked if it was time to go.",
    "Which is direct thought?|'I am hungry,' she thought.|She thought she was hungry.|She was hungry, surely?",
    "Free indirect discourse usually lacks...|quotation marks and tags like she thought|a narrator|any verbs",
    "Free indirect discourse brings readers close to a character's mind while...|keeping the third-person narration|switching to first person|ending the story",
    "Which sentence is indirect speech?|He said that he was late.|'I am late,' he said.|Late again! What would the boss say?",
    "Which is free indirect discourse?|Late again! What would the boss say?|He said he was late.|'I'm late,' he said.",
    "Which author is known for using free indirect discourse in novels?|Jane Austen|Homer|Dr. Seuss",
    "Free indirect discourse blends the voice of...|the narrator and the character|two narrators|the author and the reader"],
    ["Look for who is 'speaking' the thought. Is it marked with quote marks or tags, or does it slip into the narration?", "Direct thought has quotes or a tag (she thought). Indirect thought reports it (she thought that...). Free indirect discourse merges the character's thoughts into the narrator's voice with no tag.", "Example: 'Tom frowned. Why must it always rain on Saturdays?' The question is Tom's thought, with no tag. Now do yours."],
    [["Inside a mind", "🧠", "<b>Free indirect discourse</b> slips a character's thoughts into the narrator's voice, with no quotation marks or 'she thought'."], ["Compare three", "🔍", "Direct: <i>'I'm bored,' she thought.</i> Indirect: <i>She thought she was bored.</i> Free indirect: <i>She was bored. Would this never end?</i>"], ["Why use it", "✨", "It keeps the story in third person but lets readers feel the character's voice. Jane Austen made it famous."]]);

  const C16 = mk("Plain words and fancy words", "🌳", [
    "Which word has Old English (Anglo-Saxon) roots?|help|assist|aid",
    "Which word has Old English roots?|begin|commence|initiate",
    "Which word has Old English roots?|end|conclude|terminate",
    "Which word has Old English roots?|buy|purchase|acquire",
    "Which word has Old English roots?|show|demonstrate|exhibit",
    "Latinate words tend to sound...|more formal|more childlike|more rhythmic",
    "Anglo-Saxon words tend to be...|short and plain|long and technical|rare",
    "English has both word families largely because of...|the Norman French conquest of 1066|the invention of printing|the telephone"],
    ["Think about which word is short and everyday and which sounds more formal. Everyday words often come from the oldest layer of English.", "English mixes Old English words (short, plain: help, end, show) with French and Latin words (longer, more formal: assist, terminate, demonstrate). Choose by tone.", "Example: <b>ask</b> is Old English; <b>inquire</b> is the formal Latin-based partner. Now do yours."],
    [["Two layers", "🌳", "<b>Anglo-Saxon</b> (Old English) words are short and everyday: help, end, show, buy."], ["Latin and French", "🏛️", "After the Norman conquest of 1066, many French and Latin words joined English: <b>assist, terminate, demonstrate, purchase</b>."], ["Use both", "⚖️", "Plain words feel direct and warm. Latinate words feel formal. Pick the layer that fits your reader."]]);

  const C17 = mk("Abstracts and executive summaries", "📑", [
    "An <b>abstract</b> is...|a short summary at the start of a paper|a type of art|the references list",
    "An <b>executive summary</b> is...|a brief overview of a report for busy decision makers|a long appendix|a letter",
    "An abstract usually includes...|purpose, methods, findings and conclusion|a joke and a drawing|only the title",
    "An abstract is best written...|after the paper is finished|before any research|never",
    "An abstract is usually...|one short paragraph|ten pages|a single word",
    "An executive summary is placed...|at the beginning of the report|after the index|on the back cover",
    "Should an abstract include new information not in the paper?|No|Yes|Only sometimes",
    "Readers use an abstract to...|decide if the paper is worth reading|replace the paper|check spelling"],
    ["Ask: who reads this, and what do they need quickly? A summary should help a reader decide fast.", "Both are short summaries placed first. An abstract sums up a research paper: purpose, methods, results, conclusion. An executive summary sums up a report for leaders who need the key points.", "Example: a one-paragraph overview of an experiment, its method and its main result is an abstract. Now do yours."],
    [["Summaries up front", "📑", "An <b>abstract</b> and an <b>executive summary</b> are short overviews placed at the start."], ["Abstract", "🔬", "Sums up a research paper: purpose, methods, findings, conclusion, in one short paragraph."], ["Executive summary", "💼", "Sums up a report for busy decision makers: the problem, the key facts and the recommendation."]]);

  const C18 = mk("Writing strong titles", "🏷️", [
    "A good title should...|hint at the topic and catch interest|be as long as possible|have nothing to do with the text",
    "A <b>subtitle</b> is usually used to...|clarify the focus after the main title|replace the title|hide the topic",
    "Which title for an essay on sleep and memory is strongest?|Sleep and Memory: How Rest Shapes Learning|Essay 1|A Paper",
    "A vague title like <b>Stuff</b> is weak because it...|does not tell the reader what to expect|is too long|is a fact",
    "Which title includes a subtitle?|Dreams of Flight: A History of Gliders|Gliders|Flying",
    "Strong titles often use...|specific keywords|filler words|spelling errors",
    "A <b>clickbait</b> title...|promises more than the article delivers|is always accurate|is plain",
    "Many writers choose the final title...|after drafting, when they know the main point|before any thinking|never"],
    ["Think about a reader seeing only the title. Would they know what the piece is about?", "A strong title is specific, accurate and interesting. A subtitle after a colon can add detail. Avoid vague or misleading titles.", "Example: 'Bees' is vague; 'Buzz Off: Why Bees Matter to Our Food' is specific with a subtitle. Now do yours."],
    [["First impressions", "🏷️", "The <b>title</b> is the first thing a reader sees. It should be specific and accurate."], ["Add a subtitle", "➕", "A <b>subtitle</b> after a colon explains the angle: <i>Main Title: What it covers</i>."], ["Avoid traps", "🚫", "Skip vague titles (Essay 1) and misleading ones (clickbait). Try a title after you draft, when you know your point."]]);

  const L24 = [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, C17, C18];

  const lvl = (n, L) => L.concat([MIX("Mixed practice", ...L.slice(0, 6)), MIX("Level " + n + " Challenge", ...L.slice(6))]);
  Object.assign(WRITING_LEVELS, { 22: lvl(22, L22), 23: lvl(23, L23), 24: lvl(24, L24) });
})();
